
## Sicurezza locale della macchina


Potrebbe essere utile di tanto in tanto lanciare alcuni comandi,
per poter capire quali file per via di una configurazione
sbagliata dei permessi potrebbero essere a rischio sulla nostra
macchina.

Solitamente quello che potrebbe costituire un problema di
sicurezza a livello di permessi potrebbe essere:

 * impostazione del bit SUID per eseguibili non desiderati
 * impostazione del bit SGID per eseguibili non desiderati
 * file senza proprietario
 * file senza gruppo di appartenenza
 * link a file sconosciuti o sospetti

Vediamo alcuni esempi di comandi che possiamo lanciare ogni
qualvolta volessimo verificare la sicurezza della macchina in
termini di permessi:

```sh
 sudo find / -user root -perm -4000 -print
 # visualizza tutti i
 # file, con il SUID impostato, questi file possono essere
 # pericolosi in quanti vengono eseguiti da qualsiasi utente come
 # se venissero lanciati dall'utente root
```
```sh
 sudo find / -group root -perm 2000 -print
 # visualizza tutti i
 # file, con il SGID impostato, questi file possono essere
 # pericolosi in quanti vengono eseguiti da qualsiasi utente come
 # se venissero lanciati dal gruppo root
```
```sh
 sudo find / -nouser -print | more
 # visualizza i file senza
 # proprietario, questi file possono costituire problemi per la
 # sicurezza della macchina
```
```sh
 sudo find / -nogroup -print | more
 # visualizza i file senza
 # gruppo, questi file possono costituire problemi per la
 # sicurezza della macchina
```
Nota che anzichè utilizzare SUID ed SGID, un approccio migliore
consigliato è quello di utilizzare "capabilities", possiamo
saperne di più utilizzando:

```sh
 man capabilities
```
scenari di utilizzo sono ad esempio tcpdump/net perl library con
la creazione di un gruppo, ad esempio se volessimo utilizzare
determinate funzionalità della scheda di rete come il packet
capturing senza però essere root.

### Capabilities

Il vantaggio offerto dalle capabilities e' quello di segmentare le
possibilita' dell'utente di root in tanti piccoli sottomoduli.
In questo modo riusciamo ad evitare l'assegnazione dei diritti totali di root
ad un account anche nel momento in cui a quest'ultimo serve solo una
o alcune delle cose che serve a root. Le capabilities costituiscono
un *fine-grained set of privileges*.
Generalmente le capabilities costituiscono un meccanismo migliore rispetto
agli sticky bit (i.e., suid bit), quindi ogni qualvolta pensiamo di dover
utilizzare uno sticky bit, molto probabilmente possiamo utilizzare le
capabilities.

Un altro scenario di utilizzo e' quando dobbiamo fornire i permessi di
root ad un utente, la domanda che dobbiamo farci e':
"l'utente ha veramente bisogno di tutti i permessi di root?",
in molti casi in realta' basta assegnare qualche capability.

Un esempio comune in cui personalmente utilizzo le capabilities
e' quando voglio dare la possibilita' ad un programma di sniffare
pacchetti o di generare pacchetti (e.g., scapy eccetera).

Vediamo come gestire le capabilities:
```sh
 cat /proc/sys/kernel/cap_last_cap
 # fornisce il numero di capabilities supportate
 # dal nostro kernel
 # in genere piu' o meno vengono supportate dai correnti
 # kernel circa una quarantina di capabilities
```

Per mostrare i nomi delle varie capabilities supportate usiamo:
```sh
 capsh --print
 # stampa tutte le capabilities supportate
```

Un utente normale (se non diversamente configurato) non ha nessuna capability
attiva, mentre per l'utente di root vedremo le varie capabilities attive.

Possiamo controllare le capabilities associate ad un determinato
processo con:
```sh
 cat /proc/1234/status | grep Cap
 # mostra le capabilities per il processo con id 1234
```
L'ultimo comando ritornera' 5 righe:

* CapInh = Inherited capabilities
* CapPrm – Permitted capabilities
* CapEff = Effective capabilities
* CapBnd = Bounding set
* CapAmb = Ambient capabilities set

Un esempio di output potrebbe essere:
```text
CapInh: 0000000000000000
CapPrm: 0000003fffffffff
CapEff: 0000003fffffffff
CapBnd: 0000003fffffffff
CapAmb: 0000000000000000
```
questi numeri in esadecimale potrebbero non aver senso
ma possiamo decodificarli eseguendo:
```sh
 capsh --decode=0000003fffffffff
 # mostra in modo human-friendly le capabilities del processo in questione
```
tutto questo sembra un casino, un modo molto piu' semplice e' invece
utilizzare direttamente il PID del processo con il programma
`getpcaps`, ad esempio:

```sh
 getpcaps 1234
 # mostra le capabilities per il processo 1234, questo
 # programma utilizza la chiamata di sistema capget()
```

```sh
 getcap /usr/bin/ping
 # mostra le capabilities per il file/eseguibile indicato
```

Ora vediamo un esempio in cui aggiungiamo delle capabilities:
```sh
 sudo setcap cap_net_raw,cap_net_admin,cap_dac_override+eip /usr/bin/dumpcap
 # in questo caso impostiamo le capabilities chiamate
 # cap_net_raw, cap_net_admin e cap_dac_override
 # sul programma `dumpcap` e impostiamo i bit
 # effective, inherited e permitted a 1
```

possiamo anche rimuovere tutte le capabilities contenute su un programma con:
```sh
 setcap -r tracewalk
 # rimuove tutte le capabilities dal programma tracewalk
```

Capability sets

* Effective: the capabilities used by the kernel to perform permission checks
    for the thread, in the practice the process can choose to use or not the capability
* Permitted: the capabilities that the thread may assume (i.e., a limiting
    superset for the effective and inheritable sets). If a thread drops a
    capability from its permitted set, it can never re-acquire that capability
    (unless it exec()s a set-user-ID-root program).
    If a certain capability is permitted but not effective, it is temporarily
    disabled
* Inheritable:  the capabilities preserved across an execve(2). A child created
    via fork(2) inherits copies of its parent’s capability sets. See below for a
    discussion of the treatment of capabilities during exec(). Using capset(2),
    a thread may manipulate its own capability sets, or, if it has the
    CAP_SETPCAP capability, those of a thread in another process.


So, what's the meaning of the strange `=eip` suffix? This requires a brief
digression into the nature of capabilities. Each process has three sets of
capabilities -- inheritable, permitted and effective:

* Effective capabilities are those which define what a process can actually
do. For example, it can’t deal with raw sockets unless `CAP_NET_RAW` is in the
effective set.
Effective file capability is actually just a single bit
rather than a set, and if set then it indicates that the
entire permitted set is also copied to the effective set
of the new process. This can be used to add capabilities
to processes which weren’t specifically written to
request them. Since it is a single bit, if you set it
for any capability then it must be set for all
capabilities. You can think of this as the “legacy” bit
because it’s used to allow capabilities to be used for
applications which don’t support them.
* Permitted capabilities are those which a process is allowed to have
should it ask for them with the appropriate call. These don’t allow a
process to actually do anything unless it’s been specially written to
ask for the capability specified. This allows processes to be written to
add particularly sensitive capabilities to the effective set only for
the duration when they’re actually required.
Permitted file capabilities are those which are always available
to the executable, even if the parent process which invoked it
did not have them. These used to be called "forced"
capabilities.
* Inheritable capabilities are those which can be inherited into the
permitted set of a spawned child process. During a fork() or clone()
operation the child process is always given a duplicate of the
capabilities of the parent process, since at this point it’s still
running the same executable. The inheritable set is used when an
exec() (or similar) is called to replace the running executable with
another. At this point the permitted set of the process is masked
with the inheritable set to obtain the permitted set that will be
used for the new process.
Inheritable file capabilities specifies an additional mask
which can also be used to remove capabilities from the
calling process’s set. It applies in addition to the calling
process’s inheritable set, so a capability is only inherited
if exists in both sets.

So, the setcap utility allows us to add capabilities to these three
sets independently for a given executable. Note that the meaning of
the groups is interpreted slightly different for file permissions,
however:


When specifying capabilities via setcap the three
letters e, i and p refer to the effective, inhertable
and pemitted sets respectively.


## Antivirus

###  Premessa sugli antivirus nei sistemi GNU/Linux

Do you need a virus scanner on Linux/Unix?

Short answer, it depends on your situation.

Long answer: You might want to run a virus scanner on a server
where files are uploaded, or where users login and manipulate
files. Lets say you host a file upload site, you want to run a
scan on the upload folder which auto removes infected files. It
can also be that your mailserver runs Linux, but people sometimes
mail executables or infected pdf files. Then you also want a
scanner. Or you might run a source control server (gitolite,
mercurial) where sometimes binary files are checked in. (although
ClamAV might not find things in bare-git repositories, only in
working directories.)

If you however only run a static HTML website, or an rsync backup
server, or a Rougelike via telnet, where there are no uploads or
like, you might be wasting resources.

My advice is to look at your situation and then decide if you
need ClamAV, and if you only need to scan a few folders, the
entire system and if you want to auto-remove the virusses or not.

### ClamAV Antivirus


Uno dei più famosi antivirus per i sistemi GNU/Linux è ClamAV,
possiamo installarlo attraverso

```sh
 apt-get install clamav
 # installa clamav, la base e le librerie
 # e l'aggiornatore di virus
```
```sh
 apt-get install clamav-daemon
 # installa il demone di clamav
```
Un programma importante che viene installato con clamAV è "
freshclam" che si occupa di tenere aggiornato il database dei
virus, e automaticamente si aggiorna una volta al giorno,
almenochè non venga richiesto un aggiornamento manualmente.
Possiamo startare il demone dell'antivirus attraverso:

```sh
 service clamav-daemon start
 # abilita il demone di clamav, a
 # differenza della distro è anche possibile effettuare questa
 # operazione attraverso "systemctl enable clamav-daemon"
```
L'antivirus clamAV possiede diversi front-end ma di per se non è
un virus in tempo reale, questa caratteristica gli permette di
non essere invasivo. Vediamo alcuni esempi di comandi:

```sh
 clamscan -r /home/andrea
 # esegue una scansione nella directory
 # "/home/andrea" attraverso il flag "-r"
```
```sh
 clamscan -r --bell -i /home
 # esegue una scansione nella
 # directory "/home" attraverso il flag "-r" e se trova dei virus
 # li elenca con "-i" e fa sounare una campana "--bell" nel caso di
 # ritrovamento virus
```
```sh
 clamscan -r --remove --bell -i /home
 # è uguale al comando
 # precedente ma grazie all'opzione "--remove" rimuove i virus se
 # ne trova
```
```sh
 # clamscan -r --move=/home/andrea/.infectedFiles --bell -i /home

 # è uguale al comando precedente ma anzichè rimuovere i virus
 # grazie all'opzione "--move" sposta i file all'interno di una
 # specifica directory
```
Per eseguire un aggiornamento manuale del database dei virus si
effettua:

```sh
 # sudo /etc/init.d/clamav-freshclam restart
```
E' buona norma eseguire periodicamente attraverso il sistema Cron
scansioni di determinate directory.


## Rootkit

Un rootkit, termine letteralmente traducibile in lingua italiana
con equipaggiamento da amministratore (in ambiente Unix per
"root" access si intende accesso di livello amministrativo), in
informatica, è un programma software prodotto per avere il
controllo sul sistema senza bisogno di autorizzazione da parte di
un utente o di un amministratore. Recentemente alcuni virus
informatici si sono avvalsi della possibilità di agire come
rootkit (processo, file, chiave di registro, porta di rete)
all'interno del sistema operativo.


### chkrootkit

Un programma abbastanza comune su sistemi Unix-based è "
chkrootkit" (Check Rootkit) che permette agli amministratori di
rivelare la presenza di alcuni noti rootkit. Vediamo subito
alcuni esempi:

```sh
 sudo chkrootkit
 # esegue una scansione del sistema
```


## Linux Security Auditing Tool (LSAT)

Il Linux Security Auditing Tool (LSAT) è uno strumento per la
sicurezza molto importante e dovrebbe essere installato sempre,
soprattutto quando avviene l'installazione e la configurazione di
una macchina server. LSAT è uno strumento atto ad effettuare una
serie di controlli su file di configurazione di sistema e sulla
rete locale o sul sistema per comuni errori di configurazione che
possono ledere la sicurezza del sistema o per pacchetti che non
sono necessari. Per installarlo eseguiamo:

```sh
 apt-get install lsat
```
Vediamo ora invece alcuni esempi applicativi:

```sh
 lsat
 # esegue una scansione del sistema per errori nei file di
 # configurazione che potrebbero ledere la sicurezza della
 # macchina
```

* in automatico dopo la scansione viene creato un file chiamato
    "lsat.out", è da notare che il check di un modulo chiamato "
    md5" potrebbe richiedere molto molto tempo, possiamo quindi
    terminarla con "Ctrl+C", la scansione di questo modulo è
    consigliata solo la prima volta, poi viene rieseguita in
    genere solo se avvengono significativi cambiamenti sul
    sistema

```sh
 lsat -o mioFile.out -m debian -x modules.exclude
 # in questo
 # esempio, avviene una scansione del sistema, ma l'output "-o"
 # non viene messo in "lsat.out" ma in "mioFile.out", inoltre
 # indichiamo che la nostra distro "-m" è Debian, in questo modo
 # riusciamo ad ottenere un controllo maggiore sul comando, poi
 # indichiamo con "-x" di escludere nel controllo i moduli inclusi
 # nel file "modules.exclude"
```
```sh
 lsat -m debian -w output.html
 # in questo esempio eseguiamo una
 # scansione su una distro Debian, specificandolo col flag "-m" e
 # inoltre l'output viene salvato in un file html chiamato "
 # output.html"
```
Una lista dei moduli utilizzati è possibile consultare
[Lista Moduli LSAT](http://www.ubuntugeek.com/linux-security-auditing-tool-lsat-post-install-security-auditing-tool.html)


## Cracking di Password

Talvolta è buona norma provare ad effettuare crack delle password
degli utenti sul nostro sistema, in modo da capire se possono
esserci vulnerabilità, uno strumento molto utilizzato è "John the
Ripper", anche se esistono alternative come "hashcat".


## John the Ripper

Per installare "John the Ripper", eseguiamo:

```sh
 sudo apt-get install john john-data
```
una volta installato, dovremo trovare un file che contiene
parole, i cosiddetti file di "wordlist", in quanto questo
strumento di password cracking utilizza la tecnica "brute force",
cioè prova tutte le parole contenute nella wordlist, john the
ripper di default senza wordlist non è efficiente in quanto prova
solo poche combinazioni con codici alfanumerici. Una wordlist di
dimensioni contenute ma comunque abbastanza efficiente può ad
esempio essere [Wordlist](http://download.openwall.net/pub/wordlists/all.gz)
. Una volta scaricata la wordlist, nel nostro caso dovremo
eseguire per scompattarla:

```sh
 gunzip all.gz
 # scompatta la wordlist
```
Ora, consideriamo un utente chiamato "testuser" presente sulla
macchina con propria password, John the ripper per lavorare ha
bisogno di un file formattato in una modalità specifica, per
poter adempiere a questa formattazione allora eseguiamo:

```sh
 sudo unshadow /etc/passwd /etc/shadow > password.list
 # crea il
 # file password.list leggibile da John, ricorda che il programma
 # unshadow viene installato con l'installazione di john the
 # ripper
```
Ora vediamo alcuni esempi di cracking di password:

```sh
 touch john.ini
 # prima di eseguire john dobbiamo creare un file
 # di configurazione, anche se vuoto, quest'ultimo è richiesto
 # necessariamente per l'esecuzione
```
```sh
 john -users:-testuser -wordlist:all password.list
 # in questo
 # esempio eseguiamo un cracking della password sull'utente
 # chiamato "testuser", utilizzando la wordlist chiamata "all" e
 # utilizzando il file chiamato "password.list" generato
 # precedentemente attraverso "unshadow"
```
```sh
 john --show -wordlist:all password.list
 # in questo caso viene
 # eseguito un tentativo di cracking di tutte le password e
 # l'opzione "--show" serve ad indicare il fatto, di mostrare le
 # password trovate a fine operazione
```
Se conosciamo un determinato utente, possiamo aggiungere
determinate parole al file wordlist, in modo da rendere più
probabile la scoperta della password. Per altri esempi di
utilizzo di "John the Ripper" è consigliata la visualizzazione
della pagina web [John The Ripper: Esempi di Utilizzo](http://www.openwall.com/john/doc/EXAMPLES.shtml).



## Nmap

Il programma "nmap" è utilizzato per effettuare scansioni di rete
(network scanning), quindi avere informazioni sulla rete a cui la
nostra macchina è collegata. Per installare nmap, eseguiamo:

```sh
 apt-get install nmap sysstat
```
Vediamo ora alcuni esempi applicativi, tenendo a mente che dove
non viene specificato un port-range, nmap esegue una scansione
solo sulle 1000 porte più utilizzate (che comunque costituiscono
solo 1.5% della totalità delle possibilità):

```sh
 nmap localhost
 # esegue uno scan sul localhost, e determina
 # quali porte sono aperte, di default, nmap scansiona le 1000
 # porte più usate, quindi la scansione non avviene su tutte le
 # porte
```
```sh
 nmap -p22 localhost
 # verifica se la porta 22 è aperta su
 # localhost
```
```sh
 nmap -p1-80 localhost
 # verifica quali porte sono aperte,
 # considerando il range dalla porta 1 alla porta 80
```
```sh
 nmap -p22,23,80,443, 389, 3489,4000 192.168.1.173
 # verifica se
 # le porte 22(ssh), 23(telnet), 80(http), 443(https), 389(ldap),
 # 3489, 4000 sono aperte all'indirizzo 192.168.1.173
```
```sh
 nmap 192.168.1.104
 # esegue una scansione all'ip 192.168.1.104
 # sulle porte di default
```
```sh
 nmap -p 1-65535 192.168.1.193
 # esegue una scansione su TUTTE
 # le porte all'indirizzo 192.168.1.193
```
```sh
 nmap 192.168.1.0/24
 # esegue una scansione a tutti gli ip della
 # rete 192.168.1.0 con subnet mask 255.255.255.0
```
```sh
 nmap -sP 192.168.1.0/24 > results.txt
 # esegue una scansione di
 # tipo "Ping", in modo da visualizzare quali host esistono nella
 # rete con indirizzo 192.168.1.0 con subnet mask 255.255.255.0, i
 # risultati vengono salvati poi nel file "results.txt"
```
```sh
 nmap -p1-340 -sV 192.168.1.250
 # esegue una scansione delle
 # porte dalla 1 alla 340 sull'indirizzo IP 192.168.1.250 e mostra
 # il servizio attivo e la relativa versione sulle specifiche
 # porte aperte
```
```sh
 nmap -O 192.168.1.250
 # cerca di capire il sistema operativo
 # utilizzato dalla macchina all'indirizzo IP 192.168.1.250
```
```sh
 nmap -oA scanresults 192.168.1.105
 # anzichè mostrare i
 # risultati solo sullo standard output, li salva anche
 # all'interno di file di testo che iniziano per "scanresults",
 # salva 3 file di testo
```

* il primo, è in formato human-readable
* il secondo, è in formato facilmente utilizzabile con grep
* il terzo, è in formato xml

```sh
 nmap -vv -oA scanresults 192.168.1.250
 # esegue la stessa cosa
 # del precedente ma include più informazioni attraverso una
 # modalità verbose, è possibile ottenere ancora più informazioni
 # inserendo "-vvv" come flag al posto di "-vv".
```
E' da ricordare che nmap è più utilizzato per test su macchine
remote, mentre sono molto più efficienti sulla macchina stessa
strumenti come netstat, sockstat ed fstat.

## Wireshark


Il programma wireshark è un packet-analyzer, e risulta molto
utile quando vogliamo capire cosa sta succedendo nella rete a cui
siamo connessi o per capire e risolvere determinati problemi di
rete (legati ad esempio alla congestione della rete). Possiamo
installare wireshark attraverso:

```sh
 sudo apt-get install wireshark
```
Una volta installato, abbiamo bisogno di impostare l'interfaccia
di rete utilizzata in modalità "promiscua", questo ci permetterà
di sniffare tutti i pacchetti che girano nell'ethernet e non solo
quelli diretti a noi. Possiamo avviare l'applicazione lanciando:

```sh
 wireshark
 # lancia wireshark, un'alternativa è "wireshark &"
```
E' utile utilizzare la risoluzione degli indirizzi IP, attraverso
le impostazioni, abilitando la voce "Enable network name
resolution", altri strumenti utili sono i filtri, possiamo usare
filtri per selezionare ad esempio i protocolli che vogliamo
monitorare o ad esempio solo cookie, eccetera.

Un test di sicurezza per la rete potrebbe essere chiedere al
mantenitore dell'infrastruttura di rete (e.g., Network Engineer)
il traffico ammesso, ad esempio ipotizziamo il traffico in uscita
ammesso sia verso la porta 80, 443 (http/https) e sulla porta 389
(LDAP), allora possiamo inserire come filtro:

not (tcp.port==80) and not (tcp.port==443) and not
(tcp.port==389)
ovviamente ci sono configurazioni più avanzate, ma per tutto il
resto è una buona idea impratichirsi con la costruzione di filtri
di wireshark.

Un display filter utile per fare detection di arp poisoning è:

```sh
 arp.duplicate-address-detected
```


## Tcpdump

Tcpdump costituisce un'ottima alternativa a wireshark, molto più
frequente tra chi si occupa di sicurezza informatica, essendo un
programma che offre molte possibilità, vedremo solo alcuni
comandi d'esempio, e andremo ad arricchire mano a mano il lancio
del comando:

```sh
 tcpdump -D
 # mostra l'elenco delle interfacce disponibili per
 # catturare pacchetti
```
```sh
 tcpdump -i any
 # cattura pacchetti su qualsiasi interfaccia di
 # rete, il flag "-i" è utilizzato per indicare l'interfaccia di
 # rete
```
```sh
 tcpdump -i wlan0
 # cattura pacchetti sull'interfaccia di rete
 # wlan0
```
```sh
 tcpdump -i wlan0 -n
 # non risolve gli hostname, mostrando gli
 # indirizzi IP grazie al flag "-n"
```
```sh
 tcpdump -i wlan0 -nn
 # non risolve gli hostname e i nomi dei
 # servizi associati alle porte più comuni
```
```sh
 tcpdump -i wlan0 -nn -q
 # è più quiet (quindi meno verbose),
 # con il flag "-q"
```
```sh
 tcpdump -i wlan0 -nn -q -t
 # non stampa il timestamp col flag "
 # -t"
```
```sh
 tcpdump -i wlan0 -nn -q -tttt
 # stampa un timestamp più
 # completo contenente anche la data utilizzando il flag "-tttt"
```
```sh
 tcpdump -i wlan0 -nn -q -X
 # è conciso sulle informazioni di
 # testa del pacchetto "-q" ma stampa anche il contenuto di ogni
 # pacchetto "-X"
```
```sh
 tcpdump -i wlan0 -nn -X
 # stampa informazioni sul pacchetto di
 # default + contenuto
```
```sh
 tcpdump -i wlan0 -nn -v --number
 # mostra più informazioni, il
 # flag "-v" sta per verbose, e possiamo essere ancora più verbose
 # utilizzando "-vv" o "-vvv", a differenza di quante informazioni
 # vogliamo sui pacchetti, numera i pacchetti
```
```sh
 tcpdump -i wlan0 -nn -v -e --number
 # in questo modo mostriamo
 # anche le informazioni sull'header ethernet, utile ad esempio
 # per visualizzare indirizzi MAC, inoltre numera i pacchetti
```
```sh
 tcpdump -i wlan0 -nn -v -e -X -c10
 # cattura pacchetti
 # includendo più informazioni "-v" (incluse quelle relative
 # all'header ethernet "-e"), cattura anche il contenuto dei
 # pacchetti "-X" ma cattura solo 10 pacchetti grazie al flag "-c"
```
```sh
 tcpdump -i wlan0 -vvv -tttt -nn -e -X -w capture_file.pcap

 # esegue una scansione, salvando anche informazioni su header
 # ethernet "-e" e sul contenuto "-X" in un file ".pcap" grazie al
 # flag "-w", questo è utile per fare analisi a posteriori
```
```sh
 tcpdump -r capture_file.pcap
 # con il flag "-r" riusciamo a
 # leggere ed analizzare un file .pcap
```
```sh
 tcpdump -r capture_file.pcap -X
 # anche in modalità lettura si
 # applicano gli stessi flag, quindi possiamo ad esempio
 # visualizzare il contenuto dei pacchetti col flag "-X"
```

Queste sono solo alcuni flag di base di tcpdump, ma il cuore è
costituito dalla possibilità di inserire capture filters che
utilizzano la notazione "Berkeley Packet Filter" notation,
vediamo qualche esempio di filtro:

```tcpdump
src 2.3.4.5 # cattura solo il traffico che ha come sorgente l'ip specificato
dst 3.4.5.6 # cattura solo il traffico che ha come destinazione l'ip specificato
net 1.2.3.0/24 # cattura solo il traffico appartenente alla rete specificata
port 3600
src port 3333
icmp
ip6
portrange 21-23
less 32 # cattura solo pacchetti più piccoli di 32 byte
greater 64 # cattura solo pacchetti più grandi di 64 byte

`<=` 128 # cattura solo pacchetti più piccoli o uguali alla dimensione
# di 128 byte

# possiamo combinare filtri con operatori come and (o &&), or (o ||) o not (o !)
dst 192.168.0.2 and src net and not icmp
src 10.0.2.4 and (dst port 3389 or 22)
```

Vediamo un semplice esempio di come unire questi filtri con i
flag visti prima:

```sh
 tcpdump -i wlan0 -nn -X -w capture_file.pcap 'port 80'

 # combiniamo diverse opzioni e utilizziamo un filtro in BPFN,
 # gli apici sono opzionali, ma per questioni di leggibilità
 # preferisco inserirli, in modo da separare il filtro in BPFN dal
 # resto dei flag
```
```sh
 tcpdump -i wlan0 -vvv -tttt -nn -e -X -w capture_file.pcap 'src
 # 10.0.2.4 and (dst port 3389 or 22)'
```
vediamo alcuni esempi per isolare specifici pacchetti TCP con
determinati flag:

```sh
 tcpdump 'tcp[13] & 32!=0'
 # mostrami solo i pacchetti con il
 # flag URG settato
```
```sh
 tcpdump 'tcp[13] & 16!=0'
 # mostrami solo i pacchetti con il
 # flag ACK settato
```
```sh
 tcpdump 'tcp[13] & 8!=0'
 # mostrami solo i pacchetti con il
 # flag PSH settato
```
```sh
 tcpdump 'tcp[13] & 4!=0'
 # mostrami solo i pacchetti con il
 # flag RST settato
```
```sh
 tcpdump 'tcp[13] & 2!=0'
 # mostrami solo i pacchetti con il
 # flag SYN settato
```
```sh
 tcpdump 'tcp[13] & 1!=0'
 # mostrami solo i pacchetti con il
 # flag FIN settato
```
```sh
 tcpdump 'tcp[13]=18'
 # mostrami solo i pacchetti SYN/ACK
```
comunque esistono anche notazioni funzionalmente analoghe ma più
semplici da leggere come ad esempio:

```sh
 tcpdump 'tcp[tcpflags] == tcp-syn'
```
```sh
 tcpdump 'tcp[tcpflags] == tcp-rst'
```
```sh
 tcpdump 'tcp[tcpflags] == tcp-fin'
```
Altri filtri utili in reti con macchine Windows, è evitare questi
protocolli (smb || nbns || dcerpc || nbss || dns).

Possiamo fare diverse prove con tcpdump, magari mettendoci in
ascolto su una porta specifica e provando a mandare traffico, con
specifici programmi, oppure con netcat. Una combinazione
interessante è accoppiare tcpdump con un packet crafter (e.g.,
scapy), e farli comunicare su una porta specifica magari
sull'interfaccia di loopback, in modo da poter fare tutti i
nostri esperimenti.

Possiamo anche utilizzare tcpdump per fare detection di arp
poisoning, ad esempio guardando dispositivi che seguono questa
logica:

192.168.1.100 is 00:00:00:00

192.168.1.100 is ff:ff:ff:ffcioè se lo stesso IP compare con due
indirizzi MAC diversi in breve tempo, allora la situazione è
sospettosa e probabilmente ci troviamo in una situazione di ARP
cache poisoning. In genere se questo comportamento è associato
all'indirizzo di un gateway allora MOLTO probabilmente siamo in
una situazione di ARP cache poisoning.

Altri tool per monitorare il traffico di rete in stile top o htop,
sono:
* iftop
* nethogs
* bmon

In particolare nethogs e' molto utile per capire quale processo sta utilizzando
piu' banda; oppure poter capire se c'e' un processo non autorizzato che sta mandando
dati sulla rete.

Possiamo avviare nethogs facendo:
```sh
sudo nethogs wlp1s0
```
consultare la chiarissima pagina di man per ulteriori informazioni su come
ordinare/visualizzare il traffico.


## Eseguire tcpdump e tante altre utility senza permessi di root

```sh
 groupadd pcap
```
```sh
 usermod -a -G pcap giuseppe
 # sostituire giuseppe col nome
 # utente
```
```sh
 chgrp pcap /usr/sbin/tcpdump
```
```sh
 chmod 750 /usr/sbin/tcpdump
```
```sh
 setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump
```
```sh
 ln -s /usr/sbin/tcpdump /usr/local/bin/tcpdump
```
a volte (quindi solo su alcune distro ad esempio su alcune
OpenSUSE) è anche necessario aggiungere in alcune distribuzioni
l'opzione "file_caps=1" come kernel line nel boot manager.

Una volta eseguite queste operazioni, nel caso volessimo ad
esempio usare scapy, quello che dobbiamo fare è assegnare le
capabilities a python e a scapy, con:

```sh
 setcap cap_net_raw=eip /path/to/pythonX.X
```

```sh
 setcap cap_net_raw=eip /path/to/scapy
```
un altro esempio è quello di dare capabilities a perl per la
cattura di pacchetti eccetera.


## IpTables (Firewall)

Il programma IpTables un'interfaccia per gli amministratori di
sistema vincolata al kernel Linux e costituisce un programma di
gestione "firewall" (e altro) per sistemi GNU/Linux. Nei sistemi Debian
based, esistono delle applicazioni di front-end come ad esempio
"ufw" non esistono script o eseguibili per lanciare iptables,
mentre su distro Red-Hat based esistono degli script nella
directory `/etc/init.d/`, possiamo visualizzarli con: "ls -al
`/etc/init.d/ip*`, e possiamo quindi gestire il processo con:

```sh
 sudo service iptables start
 # inizia il processo iptables
```
```sh
 sudo service iptables stop
```

Nelle distro Debian-based invece si abilita il firewall
attraverso:

```sh
 sudo ufw enable
```
e si può verificare lo stato del firewall con:

```sh
 sudo ufw status
```
inoltre i log di ufw vengono salvati in "/var/log/ifw.log".

Vediamo ora, una volta installato e avviato iptables, il suo funzionamento e
come utilizzarlo.

Innanzitutto e' utile sapere che il kernel Linux possiede un framework per il
packet filtering chiamato netfilter. Questo ci permette di rimuovere/permettere
o modificare il traffico sia in ingresso che in uscita dal sistem.
Iptables non e' altro che un'interfaccia per netfilter configurabile attraverso
regole.
Nota che alcuni programmi come fail2ban si appoggiano a loro volta su IPtables.

Il meccanismo di packet filtering implementato da iptables e' organizzato in 3
strutture:
* Tables, una struttura che ci permette di processare pacchetti in modi
  specifici
* Chains, ci permettono di ispezionare traffico in punti diversi della loro vita
* Targets (o policies), un target decide il destino di un pacchetto, quindi il "cosa fare"

Quando un pacchetto arriva o lascia la macchina (dipendentemente dalla chain),
iptables prova a matchare le condizioni del pacchetto con le regole all'interno
della chain, una per una. Se non viene matchata nessuna regola, allora esegue la
policy di default.
By default, tutte le chain hanno come default policy quella di permettere
l'accesso dei pacchetti.

E' importante ricordare che comunque iptables e' solo un frontend a quello che
viene chiamato `netfilter`, infatti netfilter e' necessario per implementare
firewall su GNU/Linux.
Netfilter di per se' non contiene utility user-space per gestire il firewall di
sistema, ma esistono molte opzioni tra cui scegliere come frontend, le piu'
comuni:
* iptables (il piu' vecchio), piu' diffuso, ma contiene molte utility user space
  per fare cose diverse, ad esempio regole per IPv6 vengono gestite con un
  programma diverso eccetera
* xtables (non vecchio ma neanche tanto nuovo),
* nftables (il piu' recente), piu' flessibile, contiene un linguaggio abbastanza
  complesso ed avanzato per la definizione di regole

Additional material on iptables can be found here:
[IPTables links and best practices](https://gist.github.com/Thermi/70c9d77dc96523885e81e3f86f59f587)

### Iptables: Tables

Le tabelle permettono di effettuare uno specifico procedimento sui
pacchetti, in genere gli utenti non creano nuove tabelle, in quanto queste sono
specificate lato kernel.
Sui sistemi GNU/Linux moderni esistono 4 tabelle in genere:

* filter table: questa tabella e' quella di default e la piu' utilizzata in
  genere, permette di effettuare decisioni sui pacchetti e gestire il traffico
  in genere dei pacchetti
* mangle table: questa tabella permette di modificare gli header dei pacchetti,
* nat table: questa tabella permette di effettuare routing dei pacchetti ad host
  diversi su reti NAT cambiando gli innidirizzi source e destination, in genere
  viene utilizzata per fornire servizi esterni a processi che non potrebbero
* raw table: questa tabella implementa uno stateful firewall, quindi permette
  l'ispezione di pacchetti in funzione del loro stato. Ad esempio potremmo avere
  politiche specifiche solo per pacchetti di apertura della connessione oppure per
  pacchetti di un tipo particolare.

In aggiunta, alcuni kernel hanno una tabella aggiuntiva chiamata "security" che
viene usata da software o meccanismi di sicurezza ed hardening come ad esempio SELinux.
Infatti SELinux puo' utilizzare questa tabella per implementare politiche basate
sui suoi seucirty contexts.

Nota che di default, se nessuna tabella viene specificata (attraverso l'opzione
"-t"), viene utilizzata la tabella di default "filter".


### Iptables: Chains

Ogni table e' composta di alcune chain di default. Queste chain ci permettono di
filtrare i pacchetti in vari punti. La lista di chain che iptables fornisce e':

* PREROUTING chain: le regole in questa chain si applicano appena i pacchetti
    arrivano all'interfaccia di rete, questa chain e' presente nelle tabelle: nat,
    mangle, raw.
* The INPUT chain: le regole in questa chain si applicano appena prima che il
    pacchetto venga fornito ad un processo locale, questa chain e' presente nelle
    tabelle: mangle, filter.
* OUTPUT chain: le regole in questa chain si applicano quando il pacchetto e' in
    uscita da un processo e sta per arrivare all'interfaccia di rete per essere
    mandato verso l'esterno. Questa chain e' presente nelle tabelle: raw, mangle,
    nat e filter.
* FORWARD chain: le regole in questa chain si applicano se il pacchetto viene
    solo forwardato dall'host corrente ma non e' destinato all'host. Questa chain
    e' presente nelle tabelle: mangle, filter.
* POSTROUTING chain: le regole in questa chain si applicano prima che il pacchetto
    venga mandato dall'interfaccia di rete verso l'esterno. Questa chain e'
    presente nelle tabelle: nat, mangle.



            PREROUTING  INPUT   FORWARD     OUTPUT  POSTROUTING
raw         +                               +
mangle      +           +       +           +       +
nat         +           n                   +           +
filter                  +       +           +
security                +       +           +

n - Older versions of the kernel and iptables donot provide the nat/INPUT
hook, so always check your documentation.


### Iptables: Targets

Chains permettono di filtrare il traffico attraverso regole. Quindi possiamo ad
esempio aggiungere una regola sulla table "filter" e sulla chain "INPUT" per
matchare il traffico sulla porta 22, e attraverso i "target" possiamo decidere
cosa fare una volta che i pacchetti sono stati matchati.
Quindi i target decidono "l'azione", alcuni target vengono chiamati
"terminating" in quanto possono decidere il fato del pacchetto in esame
immediatamente quindi senza controllare altre regole.
I terminating target piu' comunemente utilizzati sono:

* ACCEPT: accetta il pacchetto
* DROP: droppa il pacchetto, sembrera' che il sistema non esiste nemmeno
* REJECT: fa un "reject" del pacchetto, chiudendo quindi la connessione con un
  "connection reset" in caso di protocollo TCP o con un "destination host unreachable" nel caso
  di protocollo UDP o ICMP

Ad ogni modo pero' esistono anche non-terminating targets, cioe' target che
nonostante vengano eseguiti, iptables continua ad eseguire controlli sul match
di altre regole.
Un esempio di questi non-terminating targets e' "LOG" che permette di loggare
pacchetti specifici nei log del kernel.


### Iptables: Esempi

Nota che iptables e' composto da due interfacce command line, una omonima
`iptables` e l'altra utilizzata per IPv6 chiamata `ip6tables`, ad ogni modo le
i concetti e le opzioni da riga di comando per questi comandi non sono significativamente diversi.

Ora verranno mostrati alcuni esempi di comandi per mostrare le regole vigenti
sul sistema, nota che nonostante vengono mostrati comandi con `iptables -L`, in
realta' non e' una best practice utilizzare questo, in quanto a volte ci
potrebbe dare del filo da torcere in fase di debugging o troubleshooting.
Il modo migliore per mostrare le regole vigenti e' usando `iptables-save`, come
verra' mostrato in seguito.

```sh
 iptables -L
 # elenca le regole presenti sul firewall sulla tabella "filter", in
 # output, in input e in forwarding
```
Possiamo mostrare le regole anche con i numeri identificativi con:

```sh
 iptables -L --line-numbers
 # elenca le regole presenti sul firewall sulla tabella "filter", in
 # output, in input e in forwarding
 # anche mostrando il numero identificativo per ogni regola
```

In genere per ogni IP iptables prova anche ad effettuare un DNS lookup, questo
potrebbe rallentare il tutto, per evitare queste query DNS possiamo utilizzare
il flag -n, ad esempio:

```sh
 iptables -L -n --line-numbers
```

Possiamo mostrare le regole sulle altre tabelle selezionando le apposite tabelle
col flag -t, ad esempio:

```sh
 iptables -t mangle -L -n --line-numbers
 # visualizziamo le regole attive sulla tabella "mangle"
```
Possiamo anche selezionare l'interfaccia con "-i", ad esempio:

```sh
 iptables -i lo -t mangle -L -n --line-numbers
 # in questo caso selezioniamo l'interfaccia di loopback
```

In generale in realta' un'alternativa piu' efficace nel mostrare le regole e'
utilizzare  `iptables-save -c`, infatti l'output di `iptables -L` puo' essere
confusionario o mentire su alcune cose (come le porte su cui realmente opera).
Inoltre una parte dell'output di `iptables-save` e' in formato comandi, quindi
facilmente replicabile/salvabile/parsabile/scriptabile.

Per mostrare le regole utilizzando le best practice possiamo utilizzare:
```sh
iptables-save -c
```

Per isolare completamente un computer dalla rete, eseguiamo:

```sh
 iptables -P INPUT DROP
 # disabilita su tutte le porte richieste
 # di input
```
```sh
 iptables -P OUTPUT DROP
 # disabilita il traffico di output su
 # tutte le porte
```
```sh
 iptables -P FORWARDING DROP
 # disabilita l'inoltro dei
 # pacchetti su tutte le porte
```

Possiamo eliminare le regole con:
* Specificando l'intera regola
* Specificando l'id della regola
Ad esempio:
```sh
 iptables -D INPUT -s 221.194.47.0/24 -j REJECT
```
oppure:
```sh
 iptables -D INPUT 2
```


Se volessimo invece bloccare il traffico da uno specifico IP o network, possiamo
eseguire:

```sh
 iptables -A INPUT -s 11.22.33.44 -j DROP

```

Possiamo anche specificare una interfaccia di rete e una porta specifica con:
```sh
 iptables -A INPUT -s 11.22.33.44 -i eth0 -j DROP
```

mentre per abilitare ad esempio la porta "22" TCP, in
ingresso eseguiamo:

```sh
 iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```
mentre per abilitare il traffico di uscita sulla stessa porta
con TCP, eseguiamo:

```sh
 iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
```
Comandi utili per salvare e caricare le configurazioni sono:

```sh
 iptables-save > fileName
 # salva la configurazione attuale in
 # un file
```
```sh
 iptables-restore < fileName
 # ripristina la configurazione
 # salvata in fileName
```
Un'altro programma che fa da interfaccia front-end per iptables
molto utilizzato e con ottima documentazione è "shorewall",
inoltre per salvare la configurazione, si può installare "
iptables-persistent".

Per cancellare regole facciamo:

```sh
 sudo iptables -F
 # si cancellano tutte le regole
```

Questo talvolta potrebbe non bastare se abbiamo impostato delle chain
aggiuntive ad INPUT/OUTPUT/FORWARD, in quel caso possiamo eseguire
la seguente sequenza di comandi:

```sh
iptables --flush
iptables --table nat --flush
iptables --table mangle --flush
iptables --delete-chain
iptables --table nat --delete-chain
iptables --table mangle --delete-chain
```


#### Bloccare un IP

Per bloccare il traffico proveniente dall'IP 1.1.1.1 facciamo
```sh
iptables -t filter -A INPUT -s 1.1.1.1 -j REJECT
```
Siccome la tabella "filter" e' quella di default, questo comando e' analogo a:

```sh
iptables -A INPUT -s 1.1.1.1 -j REJECT
```

Possiamo anche utilizzare la notazione CIDR per indicare set di IP con:
```sh
iptables -A INPUT -s 1.1.1.1/24 -j REJECT
```

Possiamo anche bloccare solo il traffico in uscita verso uno specifico IP con:

```sh
iptables -A OUTPUT -d 1.1.1.1 -j DROP
```

#### Whitelisting di Singoli IP

E' utile ricordare che le regole piu' in alto sono quelle che hanno precedenza.
Possiamo utilizzare l'inserimento delle regole per effettuare whitelisting, ad
esempio se stiamo bloccando tutto il traffico in input dalla rete 59.45.175.0/24
ma vogliamo accettare il traffico dell'indirizzo 59.45.175.10, allora possiamo
inserire come regola al primo posto quella relativa all'accettare il traffico da
questo IP, in questo modo:

```sh
 iptables -I INPUT 1 -s 59.45.175.10 -j ACCEPT
```

#### Bloccare Protocolli

Per quanto possa essere inutile, possiamo in principio bloccare tutto il
traffico TCP attraverso:
```sh
 iptables -A INPUT -p tcp -j DROP
```

Nel momento in cui volessimo bloccare traffico specifico, ad esempio su porte
specifiche dobbiamo caricare i moduli con "-m", vediamo un esempio di blocco del
traffico tcp sulla porta 22, come tentativo di bloccare accessi SSH:

```sh
 iptables -A INPUT -p tcp -m tcp --dport 22 -s 59.45.175.0/24 -j DROP
 # ora blocchiamo tutto il traffico TCP che ha come destinazione la porta 22
 # nel range di IP menzionato
```

Possiamo anche specificare piu' porte caricando il modulo "multiport", ad esempio:
```sh
iptables -A INPUT -p tcp -m multiport --dports 22,5901 -s 59.45.175.0/24 -j DROP
```

Un altro modulo molto importante e' il "connection tracking", che ci permette di
comunicare con host in blacklist nel momento in cui siamo noi ad iniziare la
comunicazione.

Una guida molto ben fatta su IPtables si puo' trovare qui:
[IPtables Tutorial](https://www.booleanworld.com/depth-guide-iptables-linux-firewall/)

### Configurare una macchina Linux da Forwarder NAT

Nel caso avessimo una rete interna 192.168.1.0/24 in cui vogliamo trasformare
una delle macchine GNU/Linux in forwarder NAT (anche se la gente in genere li
chiama router, tecnicamente sarebbe sbagliato) possiamo farlo in pochi comandi.

Innanzitutto ipotizziamo che la nostra macchina linux ha una scheda di rete con
accesso a Internet eth0 e una scheda di rete interna ethint a cui e' collegata
alla rete 192.168.1.0/24.

A questo punto dobbiamo prima abilitare sulla macchina l'IP forwarding tramite:
```sh
sysctl -w net.ipv4.ip_forward=1
# possiamo rendere la modifica permanente andando decommentare la riga
# relativa a questa configurazione in /etc/sysctl
```

poi aggiungiamo queste regole ad iptables:
```sh
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
# con questa regola abilitiamo il NAT
iptables -A FORWARD -i eth0 -o ethint -m state --state RELATED,ESTABLISHED -j ACCEPT
# con questa facciamo in modo che solo pacchetti nello stato RELATED ed
# ESTABLISHED possano passare come risposta, in pratica dall'esterno non possiamo
# aprire connessioni con le macchine dietro al NAT
iptables -A FORWARD -i ethint -o eth0 -j ACCEPT
# l'ultima regola non sarebbe necessaria in realta', in quanto e' gia' il
# comportamento di default
```

E' da notare che questa e' una configurazione abbastanza classica per un
firewall con configurazione NAT.


## Hosts Deny e Hosts Allow (Deprecati)

Dei file che costituiscono una blacklist (o whitelist) per le
connessioni sono i file "hosts.allow" e "hosts.deny", questi file
venivano usati come firewall, ma oggigiorno non costituiscono un
buon firewall, in quanto iptables è un meccanismo più a basso
livello ed è più sicuro, riuscendo a negare direttamente i
tentativi di connessione, mentre questi due file permettono lo
scambio di informazioni con un altro host fino a quando non si
scopre che l'host è nella blacklist (o la whitelist); pertanto
non vengono usati come firewall.

  Principio di funzionamento di hosts.allow e hosts.deny

Questi due file, hanno un ordine di lettura, viene prima letto "
hosts.allow" e successivamente "hosts.deny", quindi dobbiamo fare
attenzione a non scrivere impostazioni che possono andare in
conflitto. Configurare questi file è molto semplice comunque,
prendiamo come esempio "hosts.allow", basta scrivere:

```conf
ssh: LOCAL 192.168.1.195
# imponiamo il diritto di potersi connettere in ssh all
# 'indirizzo ip indicato, il servizio ssh, su sistemi RH-based è sshd
```

avremmo potuto scrivere in alternativa nel file "hosts.deny":

```conf
ssh: ALL EXCEPT 192.168.1.195
# imponiamo il diritto di potersi connettere in ssh all'indirizzo
# ip indicato e lo neghiamo a tuti gli altri indirizzi IP
```

Al posto di ssh, avremmo potuto inserire "httpd", "mysqld", "ALL",
e tanti altri servizi. Una volta effettuate le modifiche,
dobbiamo riavviare i servizi coinvolti nella modifica, o
riavviare semplicemente il sistema.


## Netstat

Il programma netstat è molto utile per monitorare la rete sul
nostro sistema. Vediamo alcuni esempi applicativi:

```sh
 netstat -a | more
 # elenca tutte le porte (listening e non
 # listening)
```
```sh
 netstat -at | more
 # elenca tutte le porte tcp
```
```sh
 netstat -t | more
 # elenca tutte le porte tcp in uno stato
 # aperto ma non in listening (come ad esempio "established")
```
```sh
 netstat -au | more
 # elenca tutte le porte udp
```
```sh
 netstat -aw | more
 # mostra tutte le porte RAW
```
```sh
 netstat -ax | more
 # mostra tutte le porte unix usate per l'IPC
 # (InterProcess Communication) sulla macchina locale
```
```sh
 netstat -l | more
 # elenca tutti i socket che sono in "
 # Listening"
```
```sh
 netstat -lt | more
 # mostra tutte le porte TCP in "Listening"
```
```sh
 netstat -lu | more
 # mostra tutte le porte UDP in "Listening"
```
```sh
 netstat -ie
 # visualizza le interfaccie di rete, come "ifconfig"
 # , "-i" sta per interface e "-e" per extended, in quanto viene
 # visualizzato un insieme esteso di informazioni
```
```sh
 netstat -i
 # visualizza le interfaccie di rete, con un insieme
 # esiguo di informazioni
```
```sh
 netstat -rn
 # visualizza le tabelle di routing, dove "-r",
 # significa mostrami le tabelle di routing e "-n" non risolvere i
 # nomi di dominio per gli indirizzi ip
```
```sh
 netstat -a
 # visualizza tutte le connessioni presenti sul
 # sistema
```
```sh
 netstat -uta
 # visualizza tutte "-a" le connessioni UDP "-u" e
 # TCP "-t" sul sistema
```
```sh
 netstat -aute
 # è analogo al precedente, ma grazie al flag "-e"
 # , visualizza informazioni estese, mostrandoci anche a quale
 # processo è legata ogni connessione
```
```sh
 netstat -lp
 # visualizza le applicazioni, come ssh, apache,
 # eccetera sul sistema
```
```sh
 netstat -s
 # visualizza un summary "-s", cioè un resoconto
 # delle statistiche e dei dati riguardanti la rete
```
```sh
 netstat -pt
 # visualizza informazioni sui programmi che
 # gestiscono connessioni, il loro stato e il PID del processo
 # legato al programma
```
```sh
 nestat -c
 # visualizza le informazioni di netstat con
 # aggiornamento periodico
```
```sh
 netstat -ap
 # visualizza tutte le applicazioni che sono in
 # esecuzione con il relativo stato
```
```sh
 netstat -ap | grep ssh
 # visualizza informazioni sulle porte
 # utilizzate dal programma "ssh"
```
```sh
 netstat -an
 # visualizza tutti i processi di rete con relativa
 # porta utilizzata
```
```sh
 netstat -an | grep ':80'
 # visualizza solo i processi relativi
 # alla porta "80"
```
```sh
 netstat --inet
 # visualizza solo i socket di rete IPv4e non
 # quelli per l'IPC (interprocess communication), in quanto questi
 # ultimi nell'ambito del networking, non ci interessano
```
```sh
 netstat --tcp --listening --programs
 # visualizza i programmi in
 # ascolto per il protocollo TCP, è equivalente ad "-tlp"
```
```sh
 netstat -ntlp
 # molto usato per vedere programmi in ascolto
 # sulle porte, è una delle configurazioni di flag per netstat a
 # mio parere più utili
```
```sh
 netstat -ntu
 # mostra gli utenti collegati alla mia macchina in
 # termini di IP
```
```sh
 sudo netstat --inet -lnp
 # visualizza i processi che utilizzano
 # determinate porte in listening riguardo i socket di rete, a
 # volte è bene utilizzare netstat con i diritti di
 # amministratore, in quanto si potrebbero non avere i diritti di
 # visualizzare le applicazioni in ascolto, in questo modo invece
 # si ha un quadro completo di chi sta occupando cosa
```
```sh
 sudo netstat -ntlp4
 # visualizza tutte le porte in listening
 # utilizzanti protocollo IPv4 con annessi processi
```
```sh
 sudo netstat -ntlp4e
 # visualizza tutte le porte in listening
 # utilizzanti protocollo IPv4 con annessi processi ed inode,
 # infatti a volte potrebbe capitare di non poter visualizzare un
 # nome processo, possiamo scoprire l'inode relativo utilizzando
 # il flag "-e" e poi andandolo a cercare in /proc oppure possiamo
 # utilizzare un "lsof | grep <inodenumber>" per poter
 # visualizzare il nome del processo, ad ogni modo in alcuni casi
 # anche questo approccio ci porterà ad un inode fantasma, in
 # quanto il processo è morto e le informazioni che mostra il
 # kernel non sono aggiornate, comunque non è nulla di allarmante
```
un'alternative è quella di usare lsof, con:

```sh
 sudo lsof -iTCP:631 -sTCP:LISTEN
 # guarda chi è in ascolto
 # sulla porta TCP 631, citando il process name
```
Quindi per visualizzare le porte di rete aperte e in "LISTEN"
(cioè quelle potenzialmente pericolose) su una macchina, (se
abbiamo l'accesso) possiamo eseguire:

```sh
 sudo netstat -pnl --inet | grep LISTEN
 # visualizza le porte di
 # rete in ascolto sulla macchina locale, cioè le porte TCP in
 # listening e le porte UDP, che per loro natura sono sempre in
 # LISTEN e accettano dati, in quanto "UDP is stateless so it's
 # always LISTENING and accepting data at the same time"
```
che è equivalente ad un:

```sh
 nmap -sS -p 1-65535 -T 5 localhost; nmap -sU -p 1-65535 -T 5 localhost
 # una scansione nmap su tutte le porte TCP e UDP, il
 # flag "-T 5" è utilizzato per effettuare una scansione veloce
 # (ergo, molto traffico, è anche un po' più impreciso, nel caso
 # dovessimo avere risultati completamente diversi è meglio
 # toglierlo o al posto di "5" inserire "4"), ma non è importante
 # in quanto siccome la scansione è locale, non ci importa di
 # creare molto traffico, senza l'opzione "-T 5" la scansione UDP
 # potrebbe risultare ancora più lenta
```
Ma netstat avvierà una scansione moooolto più veloce in quanto è
lo sturmento adatto da usare in locale, mentre nmap è fatto per
scansioni su un pc remoto in LAN o all'esterno della rete locale.

Netstat, oggigiorno è deprecato in favore di "ss". La sintassi di
"ss" è identica a quella di netstat, in modo da favorire la
transizione (per fortuna), inoltre supporta aggiuntivi filtri,
vediamo alcuni esempi:

```sh
 ss -nt '( dst :443 or dst :80 )'
 # in questo caso stiamo
 # cercando le connessioni di tipo TCP "-t" e senza risolvere i
 # domini "-n" con porta di destinazione 443 o 80
```
```sh
 ss -nt dst :443 or dst :80
 # equivalente al comando sopracitato
```
```sh
 ss -nt dport = :80
 # mostra solo i dati relativi a connessioni
 # che hanno come porta di destinazione la "80"
```
```sh
 ss -at '( dport = :ssh or sport = :ssh )'
 # in questo caso
 # stiamo tutte le connessioni, cioè in qualsiasi stato "-a", di
 # tipo TCP, "-t", che hanno come porta sorgente o di destinazione
 # il processo "ssh"
```
```sh
 ss dst 192.168.1.5
 # mostra tutte le connessioni associate
 # all'indirizzo IP menzionato come destinatario
```
```sh
 ss dst 192.168.1.5:http
 # mostra tutte le connessioni associate
 # all'indirizzo IP e porta menzionati come destinatario, al posto
 # di "http" avrei anche potuto specificare un numero di porta
```
```sh
 ss -np -f inet
 # è l'equivalente di netstat -np --inet e mostra
 # solo i socket di rete associati ad IPv4 (che nella maggior
 # parte dei casi è quello che ci interessa), guardare il man per
 # le altre opzioni
```
```sh
 ss src 75.126.153.214
 # mostra tutte le connessioni associate
 # all'indirizzo IP menzionato come sorgente
```
```sh
 ss src 75.126.153.214:80
 # mostra tutte le connessioni
 # associate all'indirizzo IP e porta menzionati come sorgente
```
N.B.: Possiamo notare la differenza in velocità dei due comandi
attraverso il programma "time", proviamo ad esempio ad effettuare
un:

```sh
 time netstat -at
```
e successivamente un:

```sh
 time ss -atr
 # il flag "-r" è utilizzato per risolvere gli
 # indirizzi in nomi di dominio, in quanto netstat lo esegue di
 # default, mentre "ss" no, infatti per non farlo eseguire a
 # netstat, dobbiamo passare il flag "-n"
```
Per quanto riguarda l'output, possiamo notare che:

The "Recv-Q" and "Send-Q" columns tell us how much data is in
the queue for that socket, waiting to be read (Recv-Q) or sent
(Send-Q). In short: if this is 0, everything’s ok, if there are
non-zero values anywhere, there may be trouble. If you look
closely at the example, you’ll see that two sockets have a
Recv-Q with 38 unread bytes in them. We’ll look into those
connections once we know what the other columns mean.
In detail, Send-Q is the amount of data sent by the application,
but not yet acknowledged by the other side of the socket.
Recv-Q is the amount of data received from the NIC,
but not yet consumed by the application.


## Iptraf

Il programma iptraf costituisce uno strumento utilizzato per
monitorare il traffico locale di una macchina, è simile al
programma wireshark. Vediamo alcuni esempi:

```sh
 iptraf
 # esegue il programma iptraf
```
```sh
 iptraf -s eth0 -B &
 # avvia in background iptraf
 # sull'interfaccia di rete eth0, possiamo visualizzare i log in "
 # /var/log/iptraf/"
```


