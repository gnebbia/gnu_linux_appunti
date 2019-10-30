

## SSH

L'accesso remoto ha molteplici vantaggi e utilità, in passato a
questo scopo veniva molto utilizzato Telnet, ma siccome il
protocollo è oggigiorno altamente insicuro, è stato sostituito
con SSH, che utilizza algoritmi per criptare le comunicazioni. Il
client SSH, è installato di default su tutte le moderne distro,
ma nel caso ci dovesse servire un server SSH, facciamo:

```sh
 apt-get install openssh-server
 # installa il server ssh, in una
 # distro Red-Hat based avremmo eseguito yum install
 # openssh-server
```
Per avviare il servizio ssh, una volta installato eseguiamo:

```sh
 /etc/init.d/ssh restart
 # riavvia o lancia il servizio ssh,
 # nota che in alcune distro, come le Red-Hat based, il servizio è
 # chiamato sshd
```

Vediamo ora alcuni comandi per eseguire accesso con ssh:

```sh
 ssh -l nomeUtente 192.168.1.100
 # esegue l'accesso ssh, con
 # l'utente nomeUtente all'indirizzo ip indicato
```
```sh
 ssh nomeUtente@192.168.1.100
 # analogo al comando precedente
```

```sh
 ssh -p 4444 nomeUtente@192.168.1.100
 # analogo al comando precedente
 # ma si connette ad un server ssh sulla porta 4444
```

```sh
 ssh -l nomeUtente -v 192.168.1.100
 # esegue ssh in modalità
 # verbose, mostrando più info per quanto riguarda la connessione,
 # utile per risolvere problemi
```
```sh
 ssh nomeUtente@192.168.1.114 -t 'command; bash -l'
 # si
 # connette alla macchina ed esegue il comando specificato, dopo
 # il comando apre una shell
```
```sh
 ssh -l nomeUtente -vv 192.168.1.100
 # esegue ssh in modalità +
 # verbose, mostrando più info per quanto riguarda la connessione,
 # utile per risolvere problemi
```
```sh
 ssh -l nomeUtente -vvv 192.168.1.100
 # esegue ssh in modalità
 # ancora + verbose della precedente, mostrando più info per
 # quanto riguarda la connessione, utile per risolvere problemi
```
```sh
 ssh -i deployment_key.txt demo@192.237.248.66
 # effettuo il
 # login, specificando la chiave privata ssh dell'account demo,
 # nota che sul file devono essere applicati i permessi 600, per
 # farlo prima di eseguire il login eseguiamo:
```

```sh
 chmod 600 deployment_key.txt
```

In genere la configurazione del demone ssh e' gestibile tramite il file presente
in `/etc/ssh/sshd_config`, alcune configurazioni comuni qui sono:
* il numero di porta su cui e' in ascolto il demone, `Port 2222`
* disabilitare l'accesso per l'account root, `PermitRootLogin no`
* abilitare un flessibile remote forwarding delle porte, `GatewayPorts clientspecified`

Per poter testare la correttezza di un file di configurazione possiamo eseguire:
```sh
/usr/sbin/sshd -t
# testa la correttezza del file di connfigurazione
```

Ricorda inoltre che da un client ssh e' possibile interagire premendo la
combinazione di tasti `Shift+~+c`, dopo aver loggato su una macchina, infatti e'
anche possibile decidere dinamicamente quali porte forwardare.

## SSH: Tunnels

Possiamo creare tre tipi di tunnel con ssh:
* Forward Tunnel (-L)
* Reverse Tunnel (-R)
* Dynamic Tunnel (-D)


### SSH: Forward Tunnel (Local Port Forwarding)
Questo tipo di tunnel e' utilizzato per avere sulla nostra macchina un servizio
solo accessibile da una macchina remota, ad esempio, se una macchina remota a
noi accessibile puo' accedere ad un servizio solo sul suo localhost o
all'interno di un'altra sottorete non accessibile quindi dalla nostra macchina
locale direttamente allora e' lo scenario perfetto per utilizzare un forward
tunnel.

In questo caso rendiamo disponibile un servizio remoto sulla nostra macchina.

La notazione per i "forward tunnel" e':
`-L indirizzolocale:portalocale:indirizzoremoto:portaremota`

se il primo indirizzo locale e' localhost (127.0.0.1) allora questo puo' essere
omesso, quindi e' possibile una notazione del tipo:
`-L portalocale:indirizzoremoto:portaremota`

Vediamo alcuni esempi:
```sh
ssh -p 22 nemo@192.168.1.220 -L 127.0.0.1:2000:127.0.0.1:2222
# in questo caso apriamo la porta 2000 sulla nostra macchina locale che sara'
# connessa alla porta 2222 sulla machina remota (che e' anche il server ssh)
# quindi la notazione e' indirizzolocale:portalocale:indirizzoremoto:portaremota
# quindi tutto il traffico mandato ora sulla nostra porta 2000 andra' sulla
# macchina remota alla porta 2222
# ricorda che la seconda parte di indirizzi (indirizzoremoto:portaremota) sono
# relativi alla macchina a cui siamo collegati in SSH
```

Ipotizziamo ora che la macchina remota abbia una sottorete disponibile su cui
c'e' un server a cui vogliamo connetterci, questo e' possibile facendo:
```sh
ssh -p 22 nemo@192.168.1.220 -L 127.0.0.1:2000:<other_ip>:80
# in questo caso apriamo la porta 2000 sulla nostra macchina locale che sara'
# connessa alla porta 80 sulla machina remota accessibile solo al server ssh
# quindi la notazione e' indirizzolocale:portalocale:indirizzoremoto:portaremota
# quindi tutto il traffico mandato ora sulla nostra porta 2000 andra' sulla
# macchina remota alla porta 80
# tutto il traffico quindi passera attraverso il server ssh .220 per poi
# arrivare alla macchina remota sulla porta 80
```
Ricorda che il primo indirizzo IP puo' anche essere omesso nel caso sia
127.0.0.1 infatti la notazione portalocale:indirizzoremoto:portaremota e'
equivalente a localhost:portalocale:indirizzoremoto:portaremota.

Un'altra applicazione classica dei forward tunnel e' quella di accedere a
pannelli di controllo che per questioni di sicurezza dovrebbero essere
accessibili solo dai server che le hostane (o al massimo da un numero ristretto
di macchine specifiche), ad esempio un pannello di
amministrazione/management/login.
In genere possiamo infatti limitare l'accesso a specifici path all'interno di
una web application attraverso configurazioni su web server, e.g., su nginx:
```txt
server {
    # ...
    # ...
    # this will require access from 127.0.0.1 through an SSH tunnel to access
    location /admin {
        proxy_pass http://127.0.0.1/admin;
        allow 127.0.0.1;
    }

    # this will require access from 127.0.0.1 through an SSH tunnel to access
    location /super_secret {
        proxy_pass http://127.0.0.1/super_secret;
        allow 127.0.0.1;
    }
    # ...
}
```

anche in questo caso attraverso un forward tunnel possiamo accedere al pannello
di configurazione eseguendo:
```sh
ssh -p joshua@example.com -L 127.0.0.1:3000:127.0.0.1:80
# ora possiamo accedere all'interfaccia andando su
# 127.0.0.1:3000
```

un'alternativa e' semplicemente fare accesso ssh sul server e poi entrare nella
command line di ssh attraverso la combinazione `shift+~+c` e poi eseguire:
```ssh
-L 3000:127.0.0.1:80
```


Inoltra nota che e' possibile impostare anche piu' di un port-forward ad
esempio:
```sh
ssh -p 22 joshua@192.168.1.220 -L 4450:192.168.1.210:445 \
-L 135:192.168.1.210:135 \
-L 2636:192.168.1.210:59188
# in questo caso avremo sulla nostra macchina le porte 4450 135 e 2636
# disponibili, mappate a delle porte remote appartenenti a una macchina .210
# il cui accesso e' effettuato tramite .220
```

Nel caso dovessimo utilizzare piu' di un port forward per collegarci in ssh ad
una catena di macchine allora l'opzione '-J' puo' tornare utile, vediamo un
esempio:
```sh
ssh -J joshua@192.168.1.220:22,frank@192.168.1.221:2222,\
john@192.168.1.222:2222,joe@192.168.1.223:22 joe@192.168.1.230
# in questo caso ci connettiamo alla macchina .230 tramite la lista di macchine
# elencate 
```

Nota che la notazione host:porta va bene solo per le jumpbox, infatti per
specificare la porta di destinazione finale dobbiamo comunque utilizzare
l'opzione -p, ad esempio:
```sh
ssh -J joshua@192.168.1.220:22,frank@192.168.1.221:2222,\
john@192.168.1.222:2222,joe@192.168.1.223:22 joe@192.168.1.230 -p 2220
# in questo caso ci connettiamo alla macchina .230 sulla porta 2220 passandoci 
# tramite la lista di macchine elencate
```

### SSH: Reverse Tunnel (Remote Port Forwarding)

Mentre i tunnel "forward" visti in precedenza servono a portare dei servizi
remoti in locale tramite un server SSH, i "reverse" tunnel (discussi in questa
sezione) servono a portare un servizio locale in remoto tramite un server SSH.

La notazione per i "reverse tunnel" e':
`-R indirizzoremoto:portaremota:indirizzolocale:portalocale`

se il primo indirizzo remoto e' localhost (127.0.0.1) allora questo puo' essere
omesso, quindi e' possibile una notazione del tipo:
`-R portaremota:indirizzolocale:portalocale`

Vediamo un esempio:
```sh
ssh -p 22 nemo@192.168.1.220 -R 127.0.0.1:5000:127.0.0.1:5555
# in questo caso ci rendiamo disponibile sul server SSH alla porta 5000 il
# servizio che abbiamo sulla nostra porta 5555, quindi in questo scenario se
# qualcuno su quel server interagira' sulla porta 5000 in realta' stara'
# interagendo con la porta 5555 della nostra macchina locale
# in questo caso comunque senza configurazioni aggiuntive
# solo chi e' sul server remoto potra' interagire con la porta 5000
# e chiunque altro provera' ad accedere al .220 sulla porta 5000 non avra'
# risposta, nemmeno noi dalla nostra macchina locale che abbiamo aperto il
# tunnel, insomma solo accessibile a chi e' gia' su .220
# Nota che se la porta remota 5000 e' gia' occupata da un'altro servizio allora
# il forwarding non sara' possibile
```

Comunque eccetto casi particolari avere un remote port forwarding o reverse
tunnel che utilizza 127.0.0.1 non e' molto comune (eccetto casi simili a
scantron), quello che e' piu' comune e' utilizzare un reverse tunnel su
un'interfaccia non di loopback per rendere disponibile un servizio locale su una
macchina remota ad altri host e non solo al server sul suo localhost.

Ad ogni modo quindi il vero utilizzo dei reverse tunnel (-R) e' possibile solo
se nella configurazione del server ssh e' abilitata l'opzione
`GatewayPorts clientspecified` in `/etc/ssh/sshd_config`.


Vediamo un esempio:
```sh
ssh -p 22 user@192.168.1.220 -R 192.168.1.220:5000:127.0.0.1:5555
# in questo caso ora tutti quelli che accedono alla porta 5000 di .220
# staranno interagendo con la porta 5555 che ho sul localhost
```

Vediamo un altro esempio in cui avviene un redirect:
```sh
ssh -p 22 user@192.168.1.220 -R 192.168.1.220:443:google.com:443
# in questo caso chiunque provera' a connettersi al .220 sulla porta 443 sara'
# reindirizzato sulla porta 443 di google.com e questo avverra' attraverso una
# richiesta che partira' dal server SSH, che in questo caso e' lo stesso .220
```

Vediamo un esempio piu' complicato che combina -L (forward tunnel) e -R (reverse
tunnel):
```sh
ssh -p 22 root@192.168.1.220 -L 4450:192.168.1.240:445 \
-L 135:192.168.1.240:135 \
-R 192.168.1.220:443:127.0.0.1:4430
# in questo caso:
# ci portiamo in localhost:4450 la porta 445 del .240
# ci portiamo in localhost:135 la porta 135 del .240
# esponiamo la porta 4430 sul .220 raggiungibile alla porta 443
```


Nota: Da quanto ne so non e' valido mettere indirizzi ip non appartenenti alla
macchina subito dopo il -R o il -L, cioe' o mettiamo il localhost o un indirizzo IP
appartenente ad una delle interfacce di rete.


### SSH: Dynamic Tunnel (SOCKS Proxy)

Un'altra feature molto utile di SSH e' quella relativa ai tunnel dinamici,
questa tipologia di tunnel e' molto utile ogniqualvolta non vogliamo effettuare
un tunneling su una singola porta specifica, ma abbiamo una porta in localhost
che appoggiata ad un server SSH agira' da proxy e su cui possiamo redirigere
qualsiasi tipologia di traffico.

Vediamo un esempio:
```sh
ssh -D 127.0.0.1:9050 -N -f user@mexample.com -p2222
# in questo caso il proxy sara' disponibile sulla porta 9050
# molte applicazioni possono essere configurate per usare proxy come
# ad esempio i browser o altre utility di rete, possiamo navigare
# con una maggiore sicurezza per quanto riguarda la privacy se ci fidiamo del
# server SSH
# anche in questo caso il localhost puo' ossere omesso e potevamo anche solo
# scrivere:
# ssh -D 9050 -N -f user@mexample.com -p2222
```



Nota che alcune in applicazioni non e' possibile configurare un proxy, in questi
casi possiamo fare uso di qualche proxifier, uno dei piu' famosi in circolazione
e' **proxychains**, possiamo trovarlo su diversi sistemi operativi.

Ora vedremo un esempio di utilizzo di proxychains per lanciare nmap, visto che in
genere nmap non supporta opzioni per configurare un proxy nativamente.

Nota che il proxy (o la lista di proxy) in proxychains puo' essere configurata
in fondo al suo file di configurazione che e' chiamato `proxychains.conf` ed
e' generalmente trovato in `/etc/`.
Una volta installato e configurato se il nostro tunnel SSH sta utilizzando la
porta 9050 non dovremo fare altro che avere in fondo al file di configurazione
una voce del tipo: `socks4  127.0.0.1 9050` e possiamo adesso eseguire sotto
proxy qualsiasi programma, ad esempio, nmap:
```sh
proxychains nmap 192.168.1.221 -sT -p 80,443
# nota che quando nmap viene lanciato con proxy, non e' possibile eseguire
# scansioni del tipo -sS (half-open) perche' la connessione al proxy deve
# terminare l'handshake
```


## SSH: Il file `known_hosts`

Il file `known_hosts` e' presente lato client SSH e contiene le chiavi pubbliche
dei server a cui il client si collega.
Una volta eseguito per la prima volta l'accesso, ci verrà chiesto
se vogliamo salvare la chiave pubblica del server, questa chiava verrà
salvata in un file chiamamto `known_hosts` e ci permetterà di verificare
le successive connessioni alla macchina. Dopo il primo utilizzo di ssh,
troveremo nella nostra home directory una directory chiamata ".ssh/", in
questa directory sara' presente il file `known_hosts`, che
conterrà le chiavi pubbliche dei server a cui ci siamo connessi.
Nel caso dovessimo avere problemi a connetterci ad una macchina a cui
siamo stati collegati in passato, allora la soluzione è
cancellare il file `known_hosts` o cancellare la voce
corrispettiva alla macchina.

Se abbiamo la chiave pubblica del server nel file `known_hosts`, ma ad un nostro
tentativo di connessione otteniamo un messaggio di errore relativo alle chiavi,
i motivi possono essere molteplici:

1. La chiave del sever e' cambiata per qualche motivo, ad esempio una
   reinstallazione del sistema operativo o un aggiornamento di ssh o
   una rigenerazione delle chiavi
2. L'hostname o l'indirizzo IP a cui ci stiamo connettendo ora appartengono ad
   un altro server, questo potrebbe avvenire in ambienti con DHCP o in ogni
   scenario in cui vengono riassegnati gli indirizzi
3. Siamo vittime di un attacco Man-In-The-Middle, questo e' l'attacco principale
   da cui il check delle chiavi cerca di proteggerci, quindi qualcuno che fa
   spoofing dell'identita' del server

NOTA BENE: Nel caso in cui dopo la prova d'accesso non vedo
nessun messaggio, cioè nemmeno messaggi d'errore, il problema potrebbe
essere il firewall, dovremo infatti aprire la porta su cui vogliamo
servire il servizio ssh.


## SSH: Il file `authorized_keys`

Il file `authorized_keys` presente sulle macchine che fanno da server ssh e
contenuto nella sottodirectory `.ssh/` contenuta nella home directory,
contiene le chiavi pubbliche delle macchine a cui e' stato dato il permesso di
connettersi attraverso l'autenticazione via chiave.

Come abbiamo visto esistono diverse modalita' per effettuare login attraverso
ssh, le principali sono:
* Basato su Password Authentication
* Basato su Public Key Authentication, che e' un approccio piu' sicuro in quanto

Il file `authorized_keys` conterra' le chiavi pubbliche corrispondenti alle
macchine che possono fare l'accesso in ssh attraverso questo meccanismo di
crittografia a chiave pubblica



## SSH: Configurazioni Utili


Possiamo anche effettuare automaticamente un doppio login ssh attraverso un po'
di configurazione nel file .ssh/config, impostandolo in questo modo:

```txt
TCPKeepAlive yes
ServerAliveInterval 30

Host mynestedhost
User nebbione
ProxyCommand ssh -q john@reachable.host.it nc %h %p
```
A questo punto possiamo raggiungere mynestedhost attraverso un:
```sh
ssh -l nomeutente mynestedhost
```


### Chiavi DSA e RSA

Un metodo di accesso più semplice è quello di utilizzare chiavi
per il login anzichè password degli utenti sulla macchina remota,
in quanto le password degli utenti sono hackabili attraverso
bruteforce, non c'è un meccanismo di encryption ma solo una
verifica degli hash, mentre utilizzando una chiave si riesce ad
avere un sistema di sicurezza maggiore attraverso un'encrypting
della passphrase. SSH supporta chiavi DSA e RSA, ma la scelta più
sicura è RSA, in quanto più casuale, quindi più difficile da
crackare con un brute-force. Possiamo decidere sia algoritmo che
grandezza della chiave, vediamo come generare una chiave:

```sh
 ssh-keygen -t dsa
 # crea una chiave di tipo "-t" DSA, questo
 # genera due file, uno chiamato "id_dsa" e l'altro chiamato "
 # id_dsa.pub", il secondo costituisce la chiave pubblica che
 # viene trasmessa quando deve avvenire un exchange di chiavi, ed
 # è quello che viene utilizzato per decriptare la chiave privata
```
Se avessimo voluto creare una chiave rsa, avremmo fatto:

```sh
 ssh-keygen -t rsa
 # crea una chiave RSA, anche in questo caso
 # vengono generati due file
```
Una volta generate le chiavi, eseguiamo:

```sh
 ssh-copy-id nomeUtenteConCuiCiVogliamoConnettere@192.168.1.195
 # copia le chiavi generate e presenti sull'account da cui viene
 # eseguito il comando, (è possibile usare il flag "-i" per
 # specificare file diversi da quello di default), se l'utente ha
 # sia file di chiavi DSA che RSA, viene automaticamente scelta la
 # chiave RSA, in quanto più sicura, richiederà la password
 # dell'utente. Attenzione, l'utente indicato nel comando indica
 # un'utente presente sulla macchina remota, e l'indirizzo ip
 # rappresenta la macchina remota
```
Una volta eseguito lo scambio di chiavi, possiamo effettuare il
login, senza specificare l'utente, facendo:

```sh
 ssh 192.168.1.195
 # effettua il login, chiedendoci la password
 # relativa alla chiave scambiata
```
Una volta eseguito il login, possiamo notare sulla macchina
remota la generazione di un file chiamato "authorized keys" nella
directory dell'utente ssh ".ssh/", questo file regola gli accessi
attraverso le chiavi, o meglio contiene la chiave pubblica
`id_rsa.pub` che possiede il client. Infatti nel caso lo
eliminassimo, allora il login sarebbe ancora disponibile ma solo
attraverso la password dell'utente, cioè login classico. Per una
spiegazione dettagliata del funzionamento di SSH, fare
riferimento a [www.slashroot.in/secure-shell-how-does-ssh-work||Guida ad SSH].

### Password Authentication vs Public Key Authentication

There are pro's and con's for either pw or key-based authentication.

In some cases, for example, key-based authentication is less secure
than password authentication. In other cases, its pw-based that's less
secure. In some cases, one is more convenient, in others, less.

It all boils down to this: When you do key-based authentication, you
must secure your key with a passphrase. Unless you don't have ssh-agent
running that frees you from entering your passphrase every time,
you've gained nothing in terms of convenience. Security is disputable:
the attack vector now shifted from the server to YOU, or your account,
or your personal machine, (...) - those may or may not be easier to break.

Think outside of the box when deciding this. Whether you gain or loose
in terms of security depends on the rest of your environment and other
measures.

edit: Oh, just saw that you're talking about a home server. I was in
the same situation, "password" or "USB stick with key on it" always
with me? I went for the former but changed the SSH listening port to
something different than 22. That stops all those lame script kiddies
brute forcing whole network ranges.


Another reason is:


If your SSH service allows password based authentication, then
your Internet connected SSH server will be hammered day and night by
bot-nets trying to guess user-names and passwords. The bot net needs no
information, it can just try popular names and popular passwords. There's
an awful lot of people named john with a password of qwerty123. Apart
from anything else this clogs your logs.

If your SSH service only allows public-key authentication, an attacker
needs a copy of a private key corresponding to a public key stored on
the server. They can't just make random attacks, they have to have prior
knowledge of your users and have to be able to steal a private key from
the PC of an authorized user of your SSH server.

The fact that private keys are often protected by a long pass-phrase is
of secondary significance.

Update:

As comments point out, and as I have experienced, moving your SSH service
from port 22 to a high numbered port makes a dramatic difference in the
number of unauthorized login attempts appearing in your logs. This is
worth doing but I do regard it as a form of security by obscurity (a false
sense of security) - sooner or later bot-nets will implement slow stealthy
port-scanning or you will be deliberately targeted. Better to be prepared.

I always use a long pass-phrase to protect my private key, I guess this
is of particular importance on mobile devices that could more easily be
lost or stolen.

REFERENCES:
[authentication methods comparison](https://serverfault.com/questions/334448/why-is-ssh-password-authentication-a-security-risk)
[authentication methods comparison 2](https://superuser.com/questions/303358/why-is-ssh-key-authentication-better-than-password-authentication)


### SSH-Agent

E' possibile tenere in memoria le password attraverso ssh-agent,
questo è un demone che basilarmente tiene salvate le password in
memoria, in modo che non è necessario reinserire la chiave tutte
le volte, possiamo lanciarlo attraverso:

```sh
 eval `ssh-agent -s`
 # esegue in background il programma
 # ssh-agent, con shell BASH
```
ora possiamo aggiungere le chiavi possedute all'agent eseguendo:

```sh
 ssh-add
 # aggiunge le chiavi presenti nella home directory
 # dell'utente all'agent
```
Ora, per tutto il tempo per cui saremo connessi, non dovremo più
usare la passphrase, possiamo verificare la corretta
memorizzazione delle password, eseguendo un:

```sh
 ssh-add -l
 # visualizza gli utenti ssh per cui è memorizzata la
 # password
```
  SSH Config Files

Nella directory "/etc/ssh" troviamo file di configurazione di
ssh, e una serie di chiavi utilizzate dal sistema come seme per
generare le chiavi dei vari utenti; i due file principali sono:

```sh
 /etc/ssh/ssh_config
 # costituisce il file di configurazione per
 # il client SSH, ad esempio se usiamo di default una porta
 # diversa dalla 22, per l'ssh, qui possiamo inserire "Port 34213"
 # nel caso volessimo usare la porta 34213 di default, in questo
 # modo non dobbiamo tutte le volte inserire il flag "-p" per
 # specificare la porta
```
```sh
 /etc/ssh/sshd_config
 # costituisce il file di configurazione
 # per il server SSH
```
una configurazione utile lato client, se non volessimo che la
connessione cadesse con un server ssh, è quella di configurare
l'invio periodico di pacchetti null, possiamo effettuare questa
configurazione andando a mettere la stringa: "ServerAliveInterval
10" all'interno di `/etc/ssh/ssh_config` o `/etc/ssh_config`.

Inoltre per chiudere una connessione ssh bloccata possiamo
utilizzare il carattere di escape di ssh che è "~.".


### SSH ed X

E' possibile utilizzare ssh e poter runnare programmi grafici,
per poter effettuare questo, lato server dobbiamo abilitare la
voce "X11Forwarding yes" nel file `/etc/ssh/sshd_config`, mentre
lato client ci basterà eseguire:

```sh
 export DISPLAY=:0.0
```
```sh
 ssh -X nomeUtente@192.168.1.114
 # in questo caso stiamo
 # abilitando l'X forwarding lato client
```
ora potremo avviare qualsiasi applicazione grafica, quindi ad
esempio "firefox" o qualsiasi altra cosa, e vedremo una finestra
separata aprirsi, lato client ssh.


### Check dei Log di SSH

La posizione dei log varia in base alla distro, possiamo trovarli comunque su
a seguenti path:

* `/var/log/secure`
* `/var/log/auth`
* `/var/log/btmp`, keeps track of failed login attempts.


oppure nelle distribuzioni utilizzanti systemctl e journalctl possiamo usare:

```sh
 journalctl -l -u sshd
 # check dei log ssh attraverso il demone
```
puo' essere utile impostare il demone ssh su una porta diversa da quella
standard 22, per evitare traffico inutile e superfluo di utenti con scopi
malevoli che provano il bruteforce delle password.


### SSHFS

SSHFS è un file system per i sistemi operativi unix-like (Mac OS
X, Linux, BSD). Questo file system permette di montare in locale
una directory posizionata su un server remoto in cui gira SSH,
similmente a quanto avviene con le cartelle condivise di
netbios/samba ma con il vantaggio di avere una connessione
cifrata non intercettabile (tramite ssh). Questo software
implementa il modulo del kernel FUSE. Possiamo installarlo,
eseguendo:

```sh
 sudo apt-get install sshfs fuse
```
poi ci assicuriamo che il modulo fuse sia caricato all'interno
del kernel:

```sh
 lsmod | grep fuse
 # visualizza se il modulo del kernel "fuse" è
 # caricato o meno, se non caricato, dobbiamo caricarlo
```
poi dobbiamo aggiungere l'utente di root al gruppo fuse,
eseguendo ad esempio:

```sh
 useradd root fuse
 # aggiunge l'utente root al gruppo fuse, se
 # il gruppo fuse non esiste, dobbiamo crearlo
```
Poi creiamo la directory in cui vogliamo montare il filesystem
con:

```sh
 sudo mkdir /mnt/sshfs_home_milano
 # crea una directory, questa
 # directory verrà usata per hostare la directory remota
```
```sh
 chown root /backup
```
Vediamo il comando per effettuare il mount:

```sh
 sshfs -o idmap=user andrew@192.168.0.69:/home/utente_remoto /mnt/sshfs_home_milano
 # montiamo la directory /etc della
 # macchina remota all'indirizzo IP indicato nella directory in
 # /mnt/etc_on_server/, nota che l'opzione -o idmap=user deve
 # essere ricopiata così com'è, cioè NON dobbiamo sostituire a "
 # user" il nostro nome utente.
```
Possiamo eventualmente (opzionale) aggiungere la partizione ad
fstab, con una voce del tipo:

```conf
sshfs://user@remote.machine.net:/remote/dir /work fuse user,_netdev,reconnect,uid=1000,gid=1000,idmap=user,allow_other 0 0
```


### SCP

Per copiare file attraverso ssh, possiamo utilizzare il comando "
scp", la sintassi è questa:

```sh
 scp nomeFile nomeUtente@ipAddress:/path/to/Dir
 # in questo caso
 # copiamo un file dalla nostra macchina ad un server remoto
```
```sh
 scp -r /media/disk/estate_pics/ mike@192.168.1.1:"/var/www/Estate 2014/"
 # in questo caso viene
 # copiata una directory attraverso il flag "-r"
```


### SFTP

Per avere un'interfaccia più comoda per il trasferimento file,
possiamo utilizzare il protocollo "sftp", cioè una versione
criptata del protocollo "ftp", solitamente è installato in
automatico, una volta installato un server ssh, possiamo accedere
alla comoda interfaccia per il trasferimento file, attraverso:

```sh
 sftp linus@kernel.org
 # si connette all'sftp del dominio
 # specificato
```
oppure se è stato impostato un server ssh, possiamo utilizzare:

```sh
 sftp nomeUtente@ipAddress
 # cioè proprio come un normale
 # accesso ssh, infatti il trasferimento file avviene nei termini
 # del protocollo ssh
```
```sh
 sftp -P 4555 nomeUtente@ipAddress
 # avvia sftp sulla porta
 # specificata
```
una volta effettuato l'accesso possiamo eseguire diverse
operazioni interessanti, ad esempio:

```sh
 ls
 # mostra i file sulla macchina remota
```
```sh
 lls
 # mostra i file sulla macchina locale, è da notare che i
 # noti comandi preceduti da "l", indicano un'esecuzione sulla
 # nostra macchina
```
```sh
 cd nome/dir
 # cambia directory sulla macchina remota
```
```sh
 lcd nome/dir
 # cambia directory sulla nostra macchina locale
```
```sh
 get nomeFile
 # scarica il file dalla presente nella macchina
 # remota e lo mette sulla macchina locale nella directory
 # corrente (visualizzabile con lpwd)
```
```sh
 get nomeFile /home/giuseppe/miaDir/mioFile
 # scarica il file
 # dalla presente nella macchina remota e lo mette sulla macchina
 # locale nella directory specificata nel comando
```
```sh
 get -r percorso/nomeDir
 # scarica in locale la directory, "-r"
 # sta per recursively, ed è utilizzato per trasferire directory
 # intere
```
```sh
 put nomeFile
 # fa l'upload di un file presente sulla macchina
 # locale nella directory corrente della macchina remota
 # (visualizzabile con pwd)
```
```sh
 put nomeFile /nomeDir/remota/nomeFile
 # fa l'upload di un file
 # presente sulla macchina locale nella directory specificata
 # sulla macchina remota
```
```sh
 put -r percorso/nomeDir
 # fa l'upload della directory, "-r" sta
 # per recursively, ed è utilizzato per trasferire directory
 # intere, attenzione la directory deve esistere sul server
 # remoto, se non esiste la copia non avviene, infatti in genere
 # uqesto comando è preceduto da "mkdir percorso/nomeDir"
```
```sh
 !nomeComando
 # esegue il comando "nomeComando" sulla macchina
 # locale
```
```sh
 ?
 # mostra l'help, utile per quando non ricordiamo alcuni
 # comandi o la loro sintassi
```
E' da notare che la maggior parte dei comandi (forse tutti)
funzionano anche per il protocollo ftp e quindi la maggior parte
(forse tutti) i client ftp, anche se l'utilizzo di un sistema
ftp, è fortemente sconsigliato per i noti problemi di sicurezza.
Una valida ed equivalente alternativa (sotto certi aspetti) al
protocollo SFTP è il protocollo FTPS.


## Alcuni Trucchi con SSH

```sh
 ssh nomeUtente@macchina cat "Videos/Path/To/Video.mp4" | vlc -
 # questo ci permette di visualizzare un video in locale senza
 # dover effettuare il forwarding di X o avviare sftp/scp, una
 # cosa simile può essere fatta anche per le immagini, con un
 # adeguato lettore di immagini, dobbiamo stare attenti a
 # specificare bene il percorso
```


## OpenPGP

OpenPGP è uno standard Internet per l'interoperabilità dei
messaggi protetti tramite crittografia asimmetrica. I due più
comuni programmi che utilizzano OpenPGP sono:

- Pretty Good Privacy (PGP), erede diretto della versione
  iniziale di Phil Zimmermann e ora prodotto commerciale della
  PGP Corporation
- GNU Privacy Guard (GPG), alternativa con licenza GPL

PGP e' uno strumento fondamentale per permettere agli utenti di operare
con la criptografia assimetrica ed in genere viene utilizzato per:
- Mandare email in modo sicuro
- Utilizzo di firme digitali, per permettere a terze parti di verificare
  l'autenticita' di un documento
- Criptare file

Possiamo condividere la nostra chiave pubblica attraverso diverso opzioni,
due directory pubbliche famose sono:
- PGP Global Directory
- MIT Key Server. 


## Principio di funzionamento

Un utente può generare attraverso PGP una chiave composta da una
parte pubblica e una parte privata, lui condivide al mondo la
parte pubblica, ma deve proteggere e salvaguardare la sua parte
privata. Riporto una conversazione IRC che spiega qual'è il
meccanismo di base di PGP:

```text
<nebbia> can somebody explain me how GPG works ?

<BasketCase> nebbia: it is the same key pair concept where one
key decrypts what the other encrypts <BasketCase> this is one of
the better explanations I have seen:
http://maths.straylight.co.uk/archives/108

<BasketCase> essentially, if someone wants to send you a secret
they encrypt it with your public key. now only you with your
private key can decrypt it.

<BasketCase> if someone wants to verify that you signed something
they decrypt the signature with your public key verifying that it
was made by your private key (this is close to key authentication
in ssh)

<BasketCase> ooh, there is a video version of that explanation:
http://www.youtube.com/watch?&v=3QnD2c4Xovk

<nebbia> BasketCase i was thinking about what you said...

<nebbia> but the first case is clear

<nebbia> but the second... how can somebody verify that i signed
something ?

<nebbia> with only my public key ?

<BasketCase> ok, you take a hash of the "something". say an
sha256 hash. Then you encrypt that hash with your private key.
<nebbia> ok what is this something ? my signature ?

<BasketCase> the other person hashes the same something, decrypts
your encrypted hash using your public key and compares them. If
the hashes match you signed it AND it hasn't been modified

<BasketCase> "something" in that context means whatever data you
are signing

<nebbia> ohh ok ... thank you !

<BasketCase> so, if I make a file, sha256sum it, then encrypt the
hash with my private key you only need my public key and the
sha256sum tool to verify that I sent you that file
```

Un video esplicativo, è questo [PGP](https://www.youtube.com/watch?&v=3QnD2c4Xovk||Spiegazione).


## GnuPG su sistemi GNU/Linux

Per installare GnuPG, eseguiamo:

```sh
 apt-get install gnupg
 # installa gnupg
```
Vediamo ora alcuni esempi di comandi:

```sh
 gpg --gen-key
 # esegue una procedura guidata per generare le
 # chiavi, alla fine di questa procedura verrà chiesta una
 # passphrase e successivamente viene creata una directory
 # chiamata ".gnupg/" dove saranno contenute le chiavi
```
```sh
 gpg --list-keys
 # elenca le chiavi possedute
```
```sh
 gpg --export -a "Giuseppe Nebbione" > public.key
 # attenzione,
 # il nome deve essere uguale a quello inserito all'interno della
 # procedura guidata per la chiave privata
```
```sh
 # gpg --send-keys 'Giuseppe Nebbione' --keyserver
  hkp:#subkeys.pgp.net
 # invia le chiavi ad un sito che
 # raccoglie tutte le chiavi pubbliche
```
```sh
 gpg --import pubkey.txt
 # importa una chiave pubblica
```
```sh
 gpg --recv-keys user@mail.net --keyserver hkp://subkeys.pgp.net
 # importa dal sito raccoglitore di chiavi la chiave pubblica
 # corrispondente alla mail "user@mail.net"
```
```sh
 gpg --encrypt --recipient "Nome Destinatario" nome_file_da_cifrare
 # esempio di cifratura di un file
```
```sh
 gpg --delete-key "Giuseppe Nebbione"
 # rimuove la chiave
 # pubblica menzionata
```
```sh
 gpg --delete-secret-keys "Giuseppe Nebbione"
 # rimuove la chiave
 # privata menzionata
```

Un sito utile per ricercare chiavi pubbliche al momento è
[Chiavi Pubbliche PGP](https://keyserver.pgp.com/vkd/GetWelcomeScreen.event)


