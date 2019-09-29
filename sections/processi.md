
In soldoni un processo è un programma, i processi possono
esistere in diversi stati, e possono comunicare tra loro
attraverso i cosiddetti "segnali", che non sono altro che
notifiche asincrone mandate ad un processo. Gli strumenti
principali per visualizzare i processi attivi su una macchina
sono:

* Top (Programma interattivo e dinamico)
* Ps (Programma statico)

N.B.: Esiste una categoria particolare di processi chiamata "
demoni" (Su altri sistemi operativi possono essere chiamati
servizi), sono processi che vengono lanciati in background
automaticamente e non sono interattivi, non hanno un terminale di
controllo. I demoni effettuano determinate azioni in determinati
tempi o in risposta a determinati eventi. Nei sistemi GNU/Linux e
derivati da Unix i nomi dei processi demone finiscono in "d" o in
'd[0,x]' come ksyslogd, kswapd0 o kthreadd.


## Differenza tra PID e TID

It is complicated: pid is process identifier; tid is thread
identifier.

But as it happens, the kernel doesn't make a real distinction
between them: threads are just like processes but they share some
things (memory, file descriptors and so on...) with other
instances of the same group.

So, a tid is actually the identifier of the schedulable object in
the kernel (thread), while the pid is the identifier of the group
of schedulable objects that share memory and fds (process).

But to make things more interesting, when a process has only one
thread (the initial situation and in the good old times the only
one) the pid and the tid are always the same. So any function
that works with a tid will automatically work with a pid.

It is worth noting that many functions/system calls/command line
utilities documented to work with pid actually use tids. But if
the effect is process-wide you will simply not notice the
difference.


## Top

Top è un programma interattivo e dinamico per la gestione dei
processi. Per avviarlo basta scrivere in un terminale "top", a
questo punto comparirà una schermata in cui:

* "Load average" tiene conto della media di utilizzo della CPU,
  il primo numero è al minuto, il secondo ogni 5 minuti e il
  terzo ogni 15 minuti, possiamo fare delle considerazioni su
  questi, ad esempio se il primo è molto alto e l'ultimo basso,
  allora c'è stato un picco nell'ultimo minuto di risorse
  richieste e viceversa, inoltre è da tenere a mente che possono
  essere un buono strumento per valutare se un server è troppo
  debole o troppo forte per il suo lavoro, ad esempio su una
  macchina con 4 processori ho una media costante molto più bassa
  rispetto al numero 4 allora, tutti quei processori sono
  sprecati per il mio sistema
* Con "Shift+P" ordina i processi per utilizzo cpu
* Con "Shift+M" ordina i processi per utilizzo della memoria RAM
* La colonna "NI" rappresenta la priorità di un processo: più è
  basso il numero più è alta la priorità assegnata al processo.
* Le priorità vanno da -20 a +19; -20 costituisce la priorità più
  alta che un processo possa avere, viceversa +19 è la più bassa.
* Con "r" posso cambiare la priorità di un processo, mi basta
  inserire il PID (Process ID) da ri-prioritarizzare e
  schiacciando invio posso inserire la nuova priorità.
* Con "k" termino un processo, anche in questo caso mi basta
  inserire il PID e il segnale con cui terminarlo.
    * Segnale 15 chiusura normale
    * Segnale -9 chiusura forzata
* Con "q" esce dal programma
* Con "m" mostra o nasconde informazioni sulla memoria
* Con "s" cambia il tempo di aggiornamento della schemata di top (di default questo tempo è 3 secondi)

La schermata di top si aggiorna automaticamente ogni 3 secondi,
ad ogni modo esistono altre modalità con cui lanciarlo per poter
cambiare questa impostazione o richiedere feature specifiche:

```sh
 top -d 1
 # aggiorna lo stato dei processi ogni secondo
```

```sh
 top -p 1
 # si ottiene una versione di top con focus sul
 # processo avento PID = 1
```

```sh
 top -p 1,2,3
 # come il caso precedente, ma ora il focus è sui
 # processi 1, 2 and 3
```

```sh
 top -b
 # avvio top in modalità "batch", in questa modalità
 # visualizzo solo i processi senza informazioni aggiuntive
```

Possiamo vedere una descrizione dettagliata del significato dei
campi visualizzati da top, nella pagina di man di top, nella
sezione "DESCRIPTIONS". Una variante molto comoda e più avanzata
a "top" è "htop".

Con htop, possiamo abilitare/disabilitare la visualizzazione dei
diversi thread associati allo stesso processo con "Shift+H", a
common suggestion is, enabling "Display threads in a different
color" and "Show custom thread names" under F2 / Display.


## PS

Ps è un programma statico per la gestione dei processi, viene
molto utilizzato nella stesura di programmi o script che devono
in qualche modo interagire con i processi, ps mi fornisce una
fotografia al tempo in cui viene lanciato dei processi attivi
sulla macchina. Lanciando il programma con "ps" mi mostrerà solo
i processi attivi all'interno del mio terminale, dovremo quindi
aggiungere dei parametri per effettuare operazioni più complesse.
I'll have many columns, and terminals are identified by TTY
(Teletype code), identifies the terminal that the process is
running on. Other cases are:

```sh
 ps -e
 # mostra i processi in running sul sistema
```
```sh
 ps -x
 # mostra tutti i processi in running dell'utente che ha
 # lanciato il comando
```
```sh
 ps -U username
 # mostra tutti i processi in running dell'utente
 # username
```
```sh
 ps -aux
 # mostra tutti i processi in running mostrando anche
 # informazioni aggiuntive come uso CPU, uso memoria, è la più
 # comune applicazione di ps
```
```sh
 ps w > alldata.txt
 # scrive i risultati sul file alldata.txt
```
```sh
 ps -ef --forest | less
 # this willl explore and see which are
 # the parents of the processes, this is useful in order to see
 # who generated certain processes
```
```sh
 ps -U root --forest
 # mostra l'albero gerarchico di tutti i
 # processi
```
```sh
 ps -l
 # mostra informazioni dettagliate sui processi, ad
 # esempio qui possiamo visualizzare con VSZ quanto occupano in
 # memoria (totale) (in kiB), mentre con RSS quanto stanno
 # attualmente occupando in RAM (in KiB), nota che queste due
 # possono essere diverse in quanto un processo può avere una
 # parte in memoria e l'altra sull'area di swap
```

## Altre Informazioni sui processi

E' possibile reperire altre informazioni sui processi attraverso
altri programmi; ad esempio:

```sh
 pwdx processID
 # mi fornisce la directory in cui sta lavorando
 # il processo con PID processID
```
```sh
 pidof processName
 # mi fornisce il PID del processo con nome "
 # processName"
```
```sh
 pgrep processName
 # mi fornisce il PID o i PID del processo con
 # nome "processName"
```
un sommario sull'utilizzo dei processi è dato da:

```sh
 procinfo
 # mostra sommari e statistiche sui processi, vedere il
 # "man procinfo" per la spiegazione di ogni singola stringa e per
 # varie opzioni
```

## Nice e Renice

E' possibile lanciare programmi specificando il grado di priorità
attraverso il comando "nice", ad esempio:

```sh
 nice programName
 # in questo modo lanceremo il programma con
 # una priorità default che è uguale a 10
```
```sh
 nice -n 10 programName
 #  = al caso precedente
```
```sh
 nice -10 programName
 #  = al caso precedente
```
Molto utile è anche il comando "renice" che ci permette di
cambiare la priorità di un processo già in running, alcuni esempi
applicativi possono essere:

```sh
 renice -n -20 -p processID
 # cambia la priorità del processo
 # associato al PID processID ad un valore di -20
```
```sh
 renice -n -20 -u root
 # cambia la priorità di tutti i processi
 # attivi dall'utente root ad un valore di -20
```
## Background e Foreground


I programmi attivi che stiamo utilizzando interattivamente
davanti al terminale si dicono in "foreground", mentre quelli
attivi nascosti vengono detti in "background", può essere utile
mandare processi in background nel momento in cui vogliamo
effettuare operazioni lunghe con cui non c'è bisogno di
interagire molto.

E' possibile mandare processi in background attraverso la
combinazione di tasti "Ctrl+z". Ad esempio possiamo provare ad
avviare da terminale il programma "nano", lanciandolo con "nano
nomeFile", in questo momento nano è in foreground, nel momento in
cui vogliamo passare ad un altra operazione, lo possiamo mettere
in background attraverso la combinazione "Ctrl+z", alcuni comandi
per gestire i processi in background/foreground sono:

```sh
 jobs
 # mi mostra tutti i programmi in background del terminale
 # corrente
```
```sh
 fg processCode
 # mi riporta il programma associato al PID
 # processCode in foreground, per poter visualizzare il PID del
 # programma interessato, mi basta avviare prima "jobs"
```
E' possibile anche avviare direttamente un programma inserendolo
in background:

```sh
 ./myProgram &
 # avvia myProgram direttamente in background,
 # possiamo quindi continuare ad utilizzare il terminale per
 # effettuare altre operazioni
```
oppure è possibile portare un comando in background anche con:

```sh
 bg processCode
 # dove processCode è il PID del processo
 # visualizzabile con "jobs"
```
N.B.: E' bene tenere a mente che tutti i processi del terminale
vengono terminati con nel momento in cui usciamo dal terminale,
nel caso volessimo far sopravvivere i nostri processi anche una
volta usciti dal terminale dobbiamo effettuare un'operazione di "nohup".


## Uccidere Processi

E' possibile uccidere un processo mandandogli dei segnali,
esistono tre tipi di segnali utili per la terminazione di un
processo:

* 1 - sigup
  termina il programma e chiede al demone di
  rileggere i file di configurazione, solitamente questo è
  utilizzato con i demoni, visto che la loro particolarità è
  quella di riavviarsi una volta uccisi
* 9 - sigterm
  forza l'uscita
* 15 - quit with shutdown
  chiude prima tutti i file aperti dal
  processo, è una terminazione meno brusca rispetto al segnale 9

Esempi di utilizzo possono essere:

```sh
 kill -s 9 processID
 # uccide il processo con PID processID
 # utilizzando il signale 9, è equivalente a "kill -9 processID",
 # il comando "kill" ha bisogno del PID del processo
```
```sh
 pidof nomeProcess
 # visualizza il PID del processo chiamato "
 # nomeProcesso"
```
```sh
 pkill nomeProcesso
 # uccide il processo chiamato "nomeProcesso"
```
```sh
 xkill
 # uccide il processo legato ad una determinata finestra
 # grafica, dopo averlo lanciato, ci basta clickare sulla finestra
 # del processo da terminare, potrebbe essere utile associarlo ad
 # una determinata combinazione di tasti da tastiera+
```
Possiamo anche interrompere processi per farli procedere in un
secondo momento con:

```sh
 kill -STOP processID
 # interrompi il processo attraverso il
 # segnale "STOP"
```
```sh
 kill -CONT processID
 # continua il processo interrotto con "
 # -STOP" attraverso il segnale "CONT"
```

Questa procedura torna molto utile con processi che durano giorni o in genere
molto tempo.
possiamo mostrare i processi stoppati (attraverso l'opzione -STOP con:

```sh
ps -e -j | grep 'T'
```

Alcune distro hanno il comando "killall", ad esempio:

```sh
 killall -9 apache2
 # manda il segnale 9 a tutti i processi
 # associati ad apache2, è da notare che al comando "killall"
 # possiamo anche passare il nome del processo a differenza del
 # comando "kill"
```
Nel caso volessi chiudere tutti i programmi legati al mio
terminale, mi basta lanciare il comando "exit".

Inoltre spesso capita di lanciare in background processi ad esempio con:
```sh
programma1 arg1 arg2 &> /dev/null &
programma2 arg1 arg2 &> /dev/null &
```

si ricorda che questi processi possono essere visualizzati col comando:
```sh
jobs
# visualizza i processi in background
```
e possiamo eliminarli attraverso l'identificativo mostrato da `jobs` con kill
utilizzando il simbolo percentuale, ad esempio:
```sh
kill %1
# questo terminera' il processo in background identificato come `1` da jobs
```


## Nohup

Nel caso volessimo lanciare un programma e assicurarci che
continui la sua esecuzione anche nel caso in cui il nostro
sistema ci forza l'uscita, o veniamo sloggati o accidentalmente
chiudiamo il nostro terminale, allora in questi casi si rivela
utile l'utilizzo del comando "nohup":

```sh
 nohup commandName
 # lancia il comando in modalità "nohup", il
 # programma continua a essere in "running", possiamo comunque
 # concludere la sua esecuzione con un'operazione di kill come ad
 # esempio: kill -9 processID
```
E' da tenere a mente che nohup creerà un file chiamato nohup.out
che conterrà il contenuto dello standard output e dello standard
error prodotto

```sh
 nohup commandName >/dev/null 2>&1
 # in questo caso redirigo
 # stdout e stderr in /dev/null
```
Per lanciare un processo in background, in modalità "nohup"
possiamo effettuare:

```sh
 nohup programName &
 # lancia programName in background in
 # modalità "nohup"
```
```sh
 nohup perl myscript.pl > out.txt 2>err.txt &
 # esegue lo script in perl e redirege l'output
 # sul file out.txt e lo standard error sul file
 # err.txt inoltre lo script parte in background
 # quindi intanto possiamo fare altro e anche effettuare
 # logout dalla macchina, tanto lo script continuera'
 # la sua esecuzione
```

Un altro comando utile può essere:

```sh
 disown -a && exit
 # in questo caso tutti i processi attivi
 # nella shell verranno lasciati in runnning e la shell verrà
 # chiusa
```
La differenza tra nohup e disown, è che nohup è utilizzato
all'avvio di un processo, mentre se un processo è già in running
(ed è stato lanciato senza nohup) e vogliamo assicurarci che
continui a runnare anche dopo la chiusura del terminale, allora
possiamo sganciarlo dal terminale con "disown".

```sh
 # disown -h [job-spec] where [job-spec] is the job number (like
 # %1 for the first running job; find about your number with the
 # jobs command) so that the job isn't killed when the terminal
 # closes.
```
Suppose for some reason Ctrl+Z is also not working, go to another
terminal, find the process id (using ps) and run:

```sh
 kill -20 PID && kill -18 PID
 # kill -20 (SIGTSTP) will suspend
 # the process and kill -18 (SIGCONT) will resume the process, in
 # background. So now, closing both your terminals won't stop your
 # process.
```


## Lsof

Il programma lsof permette di capire quali file sono aperti dai
vari processi, infatti lsof sta per "list opened files", vediamo
alcuni esempi applicativi:

```sh
 lsof
 # elenca i file aperti col relativo proprietario e PID
```

```sh
 lsof -u cindy | wc -l
 # mostra il numero di file aperti dall'utente "cindy"
```

```sh
 lsof -u^cindy | wc -l
 # mostra il numero di file aperti da tutti eccetto l'utente "cindy"
 # nota che il carattere '^' e' usato per la negazione
```

```sh
 lsof -cpython | head -15
 # mostra tutti i file aperti dai processi che iniziano per "python"
 # in questo caso con "head -15" mostriamo i primi 15 file
```

```sh
 lsof -cpython -c^python2.7
 # mostra tutti i file aperti dai processi che iniziano per "python"
 # ma che non iniziano per python2.7
```

```sh
 lsof +d /usr/bin
 # mostra tutti i file aperti nella directory e nelle sue top level
 # directory
```

```sh
 lsof -p 1839
 # mostra tutti i file aperti dal processo 1839
```

```sh
 lsof -iUDP
 # mostra tutte le connessioni UDP attive
```

```sh
 lsof -i 6
 # mostra tutte le connessioni IPv6 attive
```

```sh
 lsof -t /var/log/dummy_svc.log
 # mostra solo i PID dei processi che tengono aperto il file menzionato
 # questo e' utile soprattutto quando bisogna usare kill o chiudere i processi
 # che operano (o tengono aperto) su un file
```

```sh
 lsof /percorso/nomeFile
 # mostra il programma che tiene aperto
 # il file indicato nel comando con relative informazioni, utile
 # quando vogliamo smontare device ad esempio e non ci riusciamo,
 # in quanto bloccati da qualche processo
```
```sh
 lsof -p 2589
 # mostra informazioni relative ai file aperti dal
 # processo con PID 2589
```
```sh
 lsof -i
 # mostra informazioni su tutti i processi attivi su
 # tutte le porte, utile alternativa veloce a netstat/ss, se al
 # posto di numeri di porta vediamo nomi relativi a servizi, ad
 # esempio "nomeServizio" o "rtsp", allora cerchiamo questa
 # stringa all'interno del file "/etc/services", ad esempio con un
 # comodo grep oppure vedere il comando successivo
```
```sh
 lsof -i -n -P
 # mostra informazioni su tutti i processi attivi
 # su tutte le porte, utile alternativa veloce a netstat/ss, in
 # questo caso ci viene mostrato il nome della porta senza
 # eventuale associazione del servizio basata sul file
 # /etc/services
```
```sh
 lsof -i :80
 # mostra tutti i processi attivi sulla porta "80"
```
```sh
 lsof -i :80 | grep LISTEN
 # mostra tutti i processi attivi
 # sulla porta "80" nello stato "LISTEN"
```
```sh
 lsof -i -P -n :80
 # visualizza quali processi stanno
 # ascoltandando sulla porta 80
```
```sh
 lsof -i@172.16.12.5
 # mostra connessioni aperte con l'indirizzo
 # ip specificato
```
```sh
 lsof -i@172.16.12.5:22
 # mostra connessioni aperte con
 # l'indirizzo ip e la porta specificati
```
```sh
 lsof -iTCP
 # mostra solo le connessioni TCP
```
```sh
 lsof -iUDP
 # mostra solo le connessioni UDP
```
```sh
 lsof -i 6
 # mostra solo il traffico ipv6
```
```sh
 lsof -i | grep -i LISTEN
 # mostra porte in ascolto che
 # aspettanno connessioni
```
```sh
 lsof -i | grep -i ESTABLISHED
 # mostra connessioni stabilite
```
```sh
 lsof -u daniel
 # mostra i file aperti dall'utente "daniel"
```
```sh
 lsof -u ^daniel
 # mostra i file aperti da tutti gli utenti
 # eccetto l'utente "daniel"
```
```sh
 kill -9 `lsof -t -u daniel`
 # killiamo tutti i processi aperti
 # dall'utente "daniel"
```
```sh
 lsof -c nomeprogramma
 # vediamo l'elenco dei file e delle
 # connessioni aperte dal programma specificato
```
```sh
 lsof +D /directory/
 # mostra per ogni file aperto della
 # directory indicata il processo che lo sta utilizzando con le
 # relative informazioni
```
```sh
 lsof -u nomeUtente
 # mostra tutti i file aperti dall'utente "
 # nomeUtente"
```
```sh
 kill -9 `lsof -t -u nomeUtente`
 # il flag "-t" permette di
 # mostrare solo il PID relativo ai processi richiesti in questo
 # modo riusciamo ad eseguire comandi sui processi, come in questo
 # caso che viene usato kill per uccidere tutti i processi
 # appartenenti all'utente "nomeUtente"
```
```sh
 lsof -n -P -c nomeComando
 # elenca tutti i file aperti dal
 # comando "nomeComando"
```
```sh
 lsof -n -P -u nomeUtente
 # elenca tutti i file aperti
 # dall'utente menzionato
```
```sh
 sudo lsof -iTCP:631 -sTCP:LISTEN
 # guarda chi è in ascolto
 # sulla porta TCP 631, citando il process name
```
un'alternativa ad lsof è "fuser", vediamo alcuni esempi:

```sh
 fuser -v /mnt/myUsb
 # visualizza tutti i processi aperti (PID)
 # relativi alla directory menzionata
```
```sh
 fuser -v -k /mnt/myDir
 # termina tutti i processi utilizzanti
 # una determinata directory/file
```
```sh
 fuser -v -k -i /mnt/usb
 # termina tutti i processi utilizzanti
 # una determinata directory/file interattivamente
```
nelle tabelle presentate da fuser, la simbologia è:

* `c` current directory
* `e` executable being run
* `f` open file. f is omitted in default display mode
* `F` open file for writing. F is omitted in default display mode
* `r` root directory
* `m` mmap’ed file or shared library


## Gestione dei demoni e dei processi

Storicamente (e ancora su alcune distro) il gestore di
inizializzazione dei servizi su GNU/Linux è stato "sysVinit", che
prevedeva un processo iniziale con PID=1 chiamato init, padre di
tutti i processi e un insieme di 6 runlevel (stati del sistema)
tra cui switchare. Oggigiorno la maggior parte delle distro più
famose usa un gestore di inizializzazione dei servizi chiamato "
systemd", che ha una gestione dei processi e dei demoni molto più
complessa. Per capire quale systema di inizializzazione dei
processi utilizza il nostro sistema possiamo effettuare:

```sh
 cat /proc/1/comm
 # stampa sullo standard output il comando
 # relativo al processo con PID=1
```
Possiamo capire quale gestore dei demoni abbiamo anche attraverso
questa strategia:

Before proceeding, you need to determine your system’s version of
init. If you’re not sure, check your system as follows:

1. If your system has /usr/lib/systemd and /etc/systemd
   directories, you have systemd. Go to 6.4 systemd.
2. If you have an /etc/init directory that contains several .conf
   files, you’re probably running Upstart (unless you’re running
   Debian 7, in which case you probably have System V init). Go to
   6.5 Upstart.
3. If neither of the above is true, but you have an /etc/inittab
  file, you’re probably running System V init. Go to 6.6 System V
  init. If your system has manual pages installed, viewing the
  init(8) manual page should help identify your version.


## SysVinit

Il sistema di gestione servizi sysVinit è molto semplice, in
pratica è basato su 6 runlevel del sistema, ad ogni runlevel
possiamo associare degli script. In pratica la totalità degli
script vive nella directory "/etc/init.d/" questa directory
contiene gli script che si occupano di lanciare o terminare i
processi; in pratica l'inizio, il riavvio o la terminazione di un
processo possono coinvolgere tutta una serie di passi da seguire,
da qui la necessità di associare degli script ai processi. Però
uno script associato ad un servizio che viene messo in questa
directory non combinerà nulla, infatti se vogliamo runnare un
determinato servizio, allora dovremmo creare un link simbolico in
una delle directory "/etc/rc.x/" (dove "x" rappresenta il
runlevel).


## Systemd

Systemd permette all'utente di creare diversi "stati" che
forniscono all'utente un meccanismo flessibile per creare diverse
configurazioni in cui effettuare "boot", questi stati sono
composti da più "unit file" che messi assieme formano i
cosiddetti "target", i target hanno nomi significativi al posto
di semplici numeri come avveniva in sysVinit, e gli "unit file"
gestiscono servizi, socket, e mount. Gli "unit file" sono
collocati in due directory:


```sh
 /etc/systemd/sytem/
 # directory delegata a contenere gli unit
 # file creati dall'utente e ha priorità sulla seconda
```
```sh
 /usr/lib/systemd/system/
 # directory delegata a contenere gli
 # unit file non creati dall'utente
```
```sh
 /lib/systemd/system/
 # directory delegata a contenere gli unit
 # file non creati dall'utente
```
Al boot systemd attiva di default il runlevel inteso dal file "
default.target".

I classici 6 runlevel di "sysVinit" sono sostituiti generalmente
dai cosiddetti "target", vediamo i principali:

```sh
 systemd.unit=rescue.target
 # è un runlevel special per
 # impostare le configurazioni di base o effettuare un recovery
 # del sistema
```
```sh
 systemd.unit=emergency.target
 # è una bash shell, con la
 # possibilità di avviare l'intero sistema
```
```sh
 systemd.unit=multi-user.target
 # avvia un sistema multi utente
 # non grafico;
```
```sh
 systemd.unit=graphical.target
 # avvia un sistema multi utente
 # grafico;
```
Per ulteriori dettagli su questi target e su altri target è
consigliato eseguire un:

```sh
 man systemd.special
 # visualizza un man con la descrizione dei
 # vari target possibili
```
Lo strumento principale per gestire i servizi con systemd è
costituito dal programma "systemctl", vediamone alcuni esempi:

```sh
 systemctl
 # visualizza lo stato ed una breve descrizione di
 # tutti i servizi presenti, è utilie se utilizzato in
 # combinazione con "systemd-analyze blame" per capire cosa parte
 # all'avvio
```
```sh
 systemctl start foo
 # avvia il servizio foo
```
```sh
 systemctl stop foo
 # ferma il servizio foo
```
```sh
 systemctl restart foo
 # riavvia il servizio foo
```
```sh
 systemctl status foo
 # visualizza lo stato del servizio foo
```
```sh
 systemctl enable foo
 # abilita il servizio foo, in questo modo,
 # anche se riavvio il sistema, il servizio foo si avvia in
 # automatico
```
```sh
 systemctl disable foo
 # disabilita il servizio foo, in questo
 # modo, non si avvierà in automatico per i prossimi riavvi di
 # sistema
```
```sh
 systemctl reload foo
 # ricarica i file di configurazione del
 # servizio foo, utile quando cambiamo qualche configurazione
```
```sh
 systemctl daemon-reload
 # riavvia tutti i servizi e ricrea
 # tutto l'albero di dipendenze dei servizi
```
```sh
 systemctl mask foo
 # nasconde un servizio, prevenendo quindi
 # l'avvio automatico dinamico o anche manuale
```
```sh
 systemctl list-dependencies foo
 # elenca le dipendenze del
 # servizio foo
```
```sh
 systemctl is-enabled foo
 # controlla se il servizio foo è
 # attivo
```



E' da notare che systemd è compatibile con sysVinit, quindi i
servizi possono anche essere gestiti attraverso i comandi start,
stop, restart ecc... ad esempio:

```sh
 service NetworkManager stop
 # ferma il servizio chiamato "
 # NetworkManager"
```
può essere usato al posto di:

```sh
 systemctl stop NetworkManager
 # ferma il servizio chiamato "
 # NetworkManager"
```
Possiamo passare dinamicamente da un target all'altro durante una
sessione attraverso:

```sh
 systemctl isolate multi-user.target
 # entra nel target
 # multi-user, che è simile al classico runlevel 3 di sysVinit
```
```sh
 systemctl isolate graphical.target
 # entra nel target
 # graphical, che è simile al classico runlevel 5 di sysVinit
```
per cambiare il target default possiamo invece effettuare:

```sh
 systemctl set-default <nome del target>.target
 # cambia il
 # target di default a "nome del target", è l'operazione analoga
 # al cambio del runlevel di default su sysVinit
```

E' da notare che quello che viene effettuato in realtà quando
viene lanciato questo comando è:
```sh
ln -sf /lib/systemd/system/<nome del target>.target /etc/systemd/system/default.target
```

Altre istruzioni utili sono:

```sh
 systemctl get-default
 # mostra il target presente
```

Mentre un'altra directory utile in alcune distro è /etc/init.d/,
questa directory viene dal sistema sysVinit e contiene gli script
che si occupano di lanciare o terminare i processi; in pratica
l'inizio, il riavvio o la terminazione di un processo possono
coinvolgere tutta una serie di passi da seguire, da qui la
necessità di associare degli script ai processi. Vediamo ora
alcuni altri comandi che utilizzano systemd:

```sh
 systemd-analyze
 # analizza i tempi di boot, nel caso in cui non
 # si usi systemd, questo comando può essere sostituito attraverso
 # il programma "bootchart" o programmi che raccolgono e
 # analizzano dati dal processo di boot
```

ATTENZIONE: su sistemi con firmware BIOS systemd
non può ottenere come dato il tempo che questo ci ha messo ad
inizializzarsi e a fare le sue cose, mentre con sistemi con
firmware UEFI, il firmware fornisce dati al kernel come il
tempo di avvio, vedremo infatti sui sistemi UEFI una voce
aggiuntiva chiamata "firmware" questa si riferisce proprio al
tempo di caricamento del firmware UEFI, un'altra voce
aggiuntiva che incontriamo sui sistemi UEFI è "loader" questo
è il tempo impiegato dal bootloader.

```sh
 systemd-analyze blame
 # visualizza i tempi di boot per ogni
 # servizio al boot
```
```sh
 systemd-analyze plot > graph.svg
 # mi salva un'immagine con un
 # grafico dei tempi di boot
```
```sh
 systemd-analyze crotical-chain
 # mi mostra il collo di
 # bottiglia del sistema, visualizzando i target di systemd più
 # esosi
```
```sh
 journalctl -u nomeServizio
 # visualizza il log relativo al
 # servizio indicato
```
```sh
 systemctl status nomeServizio
 # fornisce informazioni sul
 # servizio, come il file che lo avvia, il PID, eccetera
```
```sh
 systemctl list-dependencies --reverse nomeServizio
 # mostra in
 # quale target è avviato il servizio indicato nel comando
```
```sh
 sudo systemctl show NetworkManager|grep FragmentPath
 # mostra
 # il nome dello script che avvia il servizio
```
Attraverso i comandi sopracitati, possiamo quindi tenere sotto
controllo il sistema, sapendo cosa viene avviato, quando viene
avviato e da cosa (quale script, programma) viene avviato.


### Consultare i Servizi Correnti

Possiamo avere una panoramica generale dei servizi presenti sul sistema con:

```sh
systemctl list-units
```

Oppure andare nello specifico visualizzando tutte le unita' installate sul
sistema:

```sh
systemctl list-unit-files
```

Possiamo visualizzare la lista di servizi in enabled con:

```sh
 systemctl list-units --type=service --state=active
```

Possiamo visualizzare la lista di servizi in running con:

```sh
 systemctl list-units --type=service --state=running
```

```sh
 systemctl list-units --type=service --state=failed
```

Possiamo anche applicare filtri con grep, ad esempio:

```sh
 systemctl list-units | grep -E 'service.*running'
```

Possiamo visualizzare anche quali sono i servizi che si devono avviare prima di
un altro servizio con:

```sh
 systemctl list-dependencies --reverse NetworkManager-wait-online.service
 # mostra i servizi che aspettano NetworkManager sia avviato prima di avviarsi
```
Oppure possiamo capire di quali unita' o servizi ha bisogno un servizio prima di
avviarsi con:
```sh
 systemctl list-dependencies NetworkManager-wait-online.service
 # mostra i servizi che si devono avviare prima di NetworkManager-wait-online
```


### Creare un servizio per systemd

Per creare un servizio, dobbiamo creare uno "unit file", uno unit
file molto minimale potrebbe essere:

```conf
[Unit]

Description=Possiamo inserire una breve descrizione del servizio qui
After=default.target

[Install]

WantedBy=default.target

[Service]

Type=forking
ExecStart=/usr/local/bin/myScript
```

Dove:

* nella sezione [Unit] indichiamo quando deve essere avviato
  rispetto a default.target
* nella sezione [Install] indichiamo che è richiesto quando viene
  lanciato default.target
* nella sezione [Service] il Type=forking è necessario, in quanto
  nel nostro esempio stiamo eseguendo uno script di shell, in
  caso contrario dobbiamo eliminarlo, mentre in ExecStart
  indichiamo il programma da eseguire

Per installarlo spostiamo (o creiamo un link) il file all'interno
della directory "/etc/systemd/system" ed eseguiamo:

```sh
 systemctl --system enable nomeServizio
 # dove nomeServizio è il
 # nome del file
```

Possiamo verificare al prossimo riavvio se il modulo è stato
caricato, col comando:

```sh
 systemctl --failed
 # visualizza i moduli che non sono stati
 # caricati correttamente
```

Se il nostro modulo è presente in questa lista, allora non è
stato caricato correttamente e possiamo ispezionare il problema
con:

```sh
 systemctl status nomeModulo
 # visualizza lo status del modulo	
```


## Superdaemons e xinet.d

Nei sistemi GNU/Linux esistono anche demoni particolari detti "superdemoni",
questi superdemoni non sono altro che demoni il cui
scopo è gestire altri demoni, uno dei più famosi è "xinet.d", che
ha sostituito l'ormai obsoleto "inet.d", ma esistono anche altri
pacchetti software che ci permettono di installare superdemoni.


