

## Overview del Processo di Boot

A simplified view of the boot process looks like this:

1. The machine's BIOS or UEFI (or other firmware) is executed and runs an application,
   in the case of BIOS this application is a boot loader, while in the case of UEFI
   it must be an EFI application (either a kernel with efistub or grub shipped as EFI application);
2. The boot loader finds the kernel image on disk, loads it into memory,
   and starts it. In this step in some cases the bootloader needs to load
   an "initial RAM disk" (initramfs.img) containing basic drivers (video,
   keyboard, disks) that will allow GRUB to load the filesystem and
   permit the user to interact with a basic interface. Note that does
   not always happen and depends on the configuration of the system.
3. The kernel has been launched at this point and initializes the devices and its drivers.
4. The kernel mounts the root filesystem.
5. The kernel starts a program called init system (this is generally
   also the daemon manager) with a process ID of
   "1". This is where the user space start.
6. init sets the rest of the system processes in motion.
7. At some point, init starts a process allowing you to log in,
   usually at the end or near the end of the boot. This is the display
   manager, also known as login manager.
8. In the case of graphical systems, a desktop environment or a window manager
   can be started (this is not necessary) anyway whenever we talk about
   graphics we need a display server.
   The most famous and still standard display server is  Xorg, although
   Wayland is becoming always more and more popular.




Inoltre allo startup, il kernel Linux effettua le
inizializzazioni in quest'ordine:
1. CPU Inspection
2. Memory Inspection
3. Device bus Discovery
4. Device discovery
5. Auxiliary kernel subsystem setup (networking, and so on)
6. Root filesystem mount
7. User space start

Solitamente i messaggi di boot sono contenuti in /var/log/kern.log ma
dipende molto da come è configurato il sistema, possiamo ad esempio
visualizzarli con "dmesg" o attraverso il nostro gestore di demoni,
in quanto a volte il sistema cancella quei messaggi.

### Differenze tra firmware BIOS e UEFI

System initialization
* Under BIOS
    * System switched on, the power-on self-test (POST) is executed.
    * After POST, BIOS initializes the necessary system hardware for booting (disk, keyboard controllers etc.).
    * BIOS launches the first 440 bytes (the Master Boot Record bootstrap code area) of the first disk in the BIOS disk order.
    * The boot loader's first stage in the MBR boot code then launches its second stage code (if any) from either:
        * next disk sectors after the MBR, i.e. the so called post-MBR gap (only on a MBR partition table).
        * a partition's or a partitionless disk's volume boot record (VBR).
        * the BIOS boot partition (GRUB on BIOS/GPT only).
    * The actual boot loader is launched.
    * The boot loader then loads an operating system by either chain-loading or directly loading the operating system kernel.

* Under UEFI
    * System switched on, the power-on self-test (POST) is executed.
    * UEFI initializes the hardware required for booting.
    * Firmware reads the boot entries in the NVRAM to determine which EFI application to launch and
      from where (e.g. from which disk and partition).
      A boot entry could simply be a disk. In this case the firmware looks for an EFI system partition
      on that disk and tries to find a EFI application in the fallback boot path
      \EFI\BOOT\BOOTX64.EFI (BOOTIA32.EFI on systems with a IA32 (32-bit) UEFI).
      This is how UEFI bootable removable media work.
    * Firmware launches an EFI application.
        * This could be a boot loader or the linux kernel itself using EFISTUB.
        * It could be some other EFI application such as a UEFI shell or a boot manager like systemd-boot or rEFInd.

So UEFI in some way is more flexible with respect to BIOS, since BIOS is limited
to just run a single application which is contained in the first bytes of the disk.
On the contrary UEFI can run any application (EFI application) contained in the EFI
partition.

If Secure Boot is enabled, the boot process will verify the authenticity
of the EFI binaries by using signatures.

### Gestire e Ripulire la partizione EFI e i suoi eseguibili

In GNU/Linux possiamo visualizzare la lista di eseguibili EFI e alcune
impostazioni di UEFI eseguendo:
```sh
efibootmgr -v
```

Possiamo cancellare applicazioni EFI eseguendo invece:

```sh
efibootmgr -b <app-id> 0B
efibootmgr -b 000A 0B
```

Dobbiamo anche cancellare le directory nella partizione EFI montata
per eliminare completamente eventuali residui della cancellazione:
```sh
cd /boot/efi/EFI
rm -rf OS1 Arch Windows
```


## Rimuovere vecchie immagini kernel
E' consigliabile eseguire quest'operazione quando possibile utilizzando
il package manager della propria distribuzione.
I kernel iniziano sempre con "vmlinuz" e sono contenuti nella directory
di boot.


## Moduli caricati dopo dinamicamente
I moduli caricati dinamicamente sono contenuti in "/lib/modules/".
Nota che nelle ultime versioni le distribuzioni tendono ad includere
qualsiasi driver o funzionalita' caricandole dinamicamente.

Questi moduli kernel, che hanno normalmente estensione ".ko", nelle ultime
distribuzioni per risparmiare spazio vengono compressi nella forma ".xz"
e le estensioni sono ".ko.xz".


## Capire informazioni di base sul sistema

Identificare il sistema di init:
```sh
/sbin/init --version
```


Identificare il display manager (o login manager) con systemd:
```sh
ls -l /etc/systemd/system/display-manager.service
```

Identificare il display server (xorg vs wayland):
```sh
echo $XDG_SESSION_TYPE
```

Identificare i driver video in uso:
```sh
lshw -c video
```

Identificare il desktop environment o window manager:
```sh
echo $DESKTOP_SESSION
```


## Log


### Come visualizzare i Log

La directory /var contiene file che variano nel tempo, la
directory "/var/log" contiene i log di sistema.

```sh
 tail -n 20 nomeFile
 # mi visualizza le ultime 20 linee, molto
 # comodo per alcuni tipi di log file
```
```sh
 tail -n +2 nomeFile
 # visualizza tutto il file tranne la prima
 # riga, considera che con +1 stampa tutto il file, quindi in +
 # dobbiamo mettere il numero di righe che vogliamo escludere +1
```
```sh
 less
 # da less possiamo premere "-F" per entrare in modalità
 # tail -f
```
```sh
 tail -f nomefile
 # rimane nel file in attesa di altre
 # scritture, quindi ho una visualizzazione real time del file
```
```sh
 tail -100f nomefile
 # rimane nel file in attesa di altre
 # scritture, quindi ho una visualizzazione real time del file, ma
 # parto da almeno da 100 righe di visualizzazione, se disponibili
```
```sh
 head -n 20 nomeFile
 # mi visualizza le prime 20 linee, molto
 # comodo per alcuni tipi di log file o file di configurazione
```
```sh
 watch -n 3 nomeFile
 # aggiorna il file sullo standard ouput, in
 # tempo reale, ogni 3 secondi, utilizzato ad esempio con "
 # /proc/net/wireless" per monitorare la qualità del segnale wifi
```

```sh
 head -n 1000 inputfile > output1
 tail -n +1001 inputfile > output2
 # questo splitta un file
```


Un file per vedere i login è "/var/log/secure" sulle RedHat based
mentre sulle Debian based è "var/log/auth.log". Per vedere i
messaggi al boot possono esistere diversi file, a volte vengono
salvati in "/var/log/dmesg", altre in "/var/log/boot" o in "
var/log/syslog", questo dipende dalla distribuzione e dalla
versione della distribuzione. Un reference per i file di log più
comuni può essere
[File di Log più comuni](http://www.thegeekstuff.com/2011/08/linux-var-log-files/).

per copiare ed eliminare cartelle si usa cp e rm col flag -r, se
uso anche il flag -f non gli importa dei parametri non esistenti,
cancella tutto quello che può.


Per visualizzare log relativi ad un demone nel caso di systemd possiamo
eseguire:
```sh
journalctl -u sshd
```


## Rsyslog e Syslog

Rsyslog e Syslog costituiscono due sistemi di gestione dei log,
le distro Debian-based utilizzano rsyslogd, ma i concetti sono
praticamente uguali ed anche i file di configurazione, rsyslog ci
permette di gestire i log di vari programmi e con che livello di
dettaglio riceverli. I file di configurazione di rsyslog, sono
nella directory "/etc/", il file di configurazione principale è "
rsyslog.conf", mentre "rsyslog.d" è una directory che contiene
altri file di configurazione di rsyslog che vengono applicati.
L'unica differenza tra che interessa a noi tra rsyslog e syslog è
che il file di configurazione principale nel caso di syslog
invece di chiamarsi "rsyslog.conf" si chiama "syslog.conf" e la
directory contenente gli script anzichè chiamarsi "rsyslog.d" si
chiama "syslog.d". Vediamo un esempio di file "/etc/rsyslog.conf"
(che potrebbe anche essere "syslog.conf"):

```conf
$IncludeConfig /etc/rsyslog.d/*.conf #include i file di
configurazione all'interno della directory specificata

cron.* /var/log/cron #indica che tutti i file di log di cron,
sono contenuti nella directory indicata

*.emerg /var/log/emergency #indica che tutti i messaggi di tipo
emergency devono essere collocati nella directory indicata

uucp,news.crit /var/log/spooler #indica che tutti i file di log
di uucp di tipo "critico" e di news di tipo "critico"
```

vengono salvati nella directory indicata

la virgola ci permette di indicare più programmi
contemporaneamente, mentre il punto, indica il livello di gravità
dei messaggi

```conf
auth.emerg; uucp, news.crit /var/log/auth
# indica che i messaggi
# di log di tipo emergency del programma auth e i
# messaggi di tipo critical dei programmi uucp e news verranno
# salvati nella directory indicata, il simbolo ";"
# è utilizzato per separare programmi con diversi tipi di messaggi
```

La stringa dopo il punto indica il cosiddetto "severity level"
dei messaggi (7 = debug, 6 = info, 5 = notice, 4 = warning, 3 =
err, 2 = crit, 1 = alert, 0 = emerg, x = nothing), vediamo una
spiegazione dettagliata:
* 7 - DEBUG: Info useful to developers for debugging the app, not useful
    during operations
* 6 - INFORMATIONAL: Normal operational messages - may be harvested for
  reporting, measuring throughput, etc - no action required
* 5 - NOTICE: Events that are unusual but not error conditions - might be
    summarized in an email to developers or admins to spot
    potential problems - no immediate action required
* 4 - WARNING: Warning messages - not an error, but indication that an error
    will occur if action is not taken, e.g. file system 85% full
    this means - each item must be resolved within a given time
* 3 - ERROR: Non-urgent failures - these should be relayed to developers
    or admins; - each item must be resolved within a given time
* 2 - ALERT: Should be corrected immediately - notify staff who can fix
    the problem - example is loss of backup ISP connection
* 1 - CRITICAL: Should be corrected immediately, but indicates failure in a
    primary system - fix CRITICAL problems before ALERT - example
    is loss of primary ISP connection
* 0 - EMERGENCY A "panic" condition - notify all tech staff on call?
    (earthquake? tornado?) - affects multiple apps/servers/sites...


## Logger

Il programma "logger" ci permette di scrivere nei file di log.
Vediamo alcuni esempi applicativi:

```sh
 logger ciao will
 # manda il messaggio "ciao" all'interno del
 # file di log "/var/log/messages", che è la directory di default
 # in cui vengono scritti i log con logger
```
```sh
 logger -s error message
 # visualizza il messaggio "error
 # message" sullo standard error, utile quando si scrivono script,
 # come etichetta dell'errore viene visualizzato il nome
 # dell'utente che ha lanciato il comando
```
```sh
 logger -t backupscript -s error message
 # visualizza il
 # messaggio "error message" sullo standard error, utile quando si
 # scrivono script, come autore dell'errore viene visualizzato "
 # backupscript"
```
```sh
 logger -f /var/log/cron Ciao Errore
 # specifica il file di log
 # in cui va a scrivere attraverso il flag "-f" (file)
```
```sh
 logger -pcrit ciao
 # specifica il livello di priorità
 # attraverso il flag "-p" che in questo caso è "critical"
```
```sh
 logger -t backup -i Error while trying to backup
 # scrive un
 # errore nel file di default di log "/var/log/messages" con
 # autore "backup" riportando anche il PID del process che l'ha
 # generato, questo avviene attraverso il flag "-i"
```


## Logrotate

Un programma molto utile per gestire i log è "logrotate", esiste
un file chiamato "/etc/logrotate.conf" che è il file di
configurazione generale di logrotate e poi una directory chiamata
"/etc/logrotate.d" che contiene file di configurazione aggiuntivi
che vengono applicati, infatti molti programmi che vengono
installati, salvano un file in questa directory per non andare a
sovrascrivere o mettere mano al file di configurazione
principale. Nel file "logrotate.conf", c'è scritto per quanto
tempo vengono tenuti in memoria i log ed altre informazioni,
vediamo un esempio di un file di configurazione all'interno della
directory "logrotate.d/apache2":

```conf
/var/log/httpd/*log {

daily # lavora coi log su base giornaliera, altri esempi di
# opzioni valide sono "monthly"

# (prende come riferimento il primogiorno del mese) o "yearly"
# (prende come riferimento il primo giorno dell'anno)

missingok # se un file di configurazione non esiste, va bene lo
# stesso, passa al prossimo

rotate 2 # teniamo i file archiviati per due rotazioni, in questo
# caso due giorni e poi li eliminiamo

compress #comprimi i file di log, cioè anzichè creare una copia,
# crea un archivio in cui dentro viene inserita una copia

delaycompress #non vengono tutti compressi, ma prima vengono
# copiati al primo passi, e poi

#alla rotazione successiva vengono archiviati

notifempty #non viene salvato nulla se i file di log sono vuoti,
# perchè sprecare risorse ?

create 640 root adm #assegna agli archivi creati il proprietario "root" e
# il gruppo "adm" e permessi 640

sharedscripts #condivide gli script che seguono per tutti i file
# i log, se non esistesse questa istruzione,

#allora gli script che seguono verrebbero eseguiti per tutti i
# file di log di apache

postrotate /etc/init.d/apache2 reload >/dev/null
# esegue uno script dopo la rotazione

endscript

prerotate if [-d /etc/logrotate.d/httpd-prerotate ]; then \
# esegue uno script prima di effettuare una rotazione

run-parts /etc/logrotate.d/httpd-prerotate; \

fi; \

endscript
```


## Boot di un sistema GNU/Linux


### Principio di funzionamento del boot

Il boot di un sistema GNU/Linux è composto da varie fasi che si
susseguono:

1. Power-Up/Reset: L'elettronica della macchina si accende
2. System Startup (BIOS/BootMonitor): Viene visualizzata la
   schermata di startup, vengono eseguite delle procedure basilari
   atte a verificare che l'hardware connesso sia funzionante,
   oppure assegnazione dei range di memoria, IRQ, DMA, eccetera.
3. Stage 1 bootloader (Master Boot Record): L'MBR è installato
   nel settore zero dell'Hard Disk quasi sempre (potrebbe anche
   essere installato in un altro settore), lo stage 1 ha lo scopo
   di capire dove è localizzato il Bootloader
4. Stage 2 bootloader (Lilo, Grub, etc...): Lo stage 2 ha lo
   scopo di localizzare i kernel presenti negli schemi di
   partizione
5. Kernel (Linux): In questa fase viene lanciato il kernel,
   vengono caricati i moduli eccetera.
6. Init/Systemd: Viene avviato il processo iniziale chiamato "
   init" (se si utilizza sysVinit) e questo processo termina
   l'avvio del sistema operativo e permette l'inizia dello
   user-space, quindi le applicazioni utente


## Log di Boot

Per visualizzare il log di boot di un sistema GNU/Linux dobbiamo
visualizzare il file "/var/log/messages", quindi:

```sh
 cat "/var/log/messages"
```
oppure eseguire:

```sh
 dmesg
 # visualizza tutte le informazioni a partire dal boot
 # (dmesg sta per "diagnostic message")
```
```sh
 dmesg -T|sed -e 's|\(^.*'`date +%Y`']\)\(.*\)|\x1b[0;34m\1\x1b[0m - \2|g'
 # visualizza i messaggi di dmesg con un formato leggibile delle date
```
```sh
 dmesg -C
 # pulisce il log di dmesg
```
```sh
 echo "<n>Debug info" > /dev/kmsg
 # possiamo scrivere nei log
 # del kernel anche da userspace
```


## Boot Loaders

All'inizio del processo di boot, prima che il kernel venga
lanciato, l'obiettivo del boot loader sembra semplice, deve
caricare il kernel in memoria e lanciarlo con un set di
parametri, quindi le domande a cui il boot loader deve rispondere
sono:

* Dove sono i kernel?
* Quali parametri devono essere passati al kernel al suo avvio?

Le risposte (tipicamente) sono che il kernel e i suoi parametri
sono da qualche parte sul root filesystem.

Siccome i parametri da passare al kernel sono da qualche parte su
uno degli hard disk, ho bisogno di relativi driver dell'hard disk
per poterli trovare, e siccome non posso caricare i driver in
quanto non ho ancora caricato il kernel, i boot loader risolvono
il problema riuscendo ad accedere al disco per reperire i
parametri attraverso le interfacce BIOS o UEFI; questo è
possibile grazie al firmware sull'hardware dell'HDD che permette
al BIOS o UEFI di accedere all'HDD, grazie agli LBA (Logical
Block Addressing); nonostante siano accessi con performance molto
povere, questo non ci interessa, in quanto una volta caricato il
kernel, verranno caricati i suoi driver ad alte prestazioni;
solitamente i boot loader sono gli unici programmi ad usare il
BIOS o il UEFI per gli accessi al disco.

The filesystem question is trickier. Most modern boot loaders can
read partition tables and have built-in support for read-only
access to filesystems. Thus, they can find and read files. This
capability makes it far easier to dynamically configure and
enhance the boot loader. Linux boot loaders have not always had
this capability; without it, configuring the boot loader was more
difficult.


## Grub

Grub sta per Grand Unified Boot Loader, per essere sicuri di
avviarlo, tenere premuto il tasto "Shift", dall'avvio del pc, e
una volta presente la schermata di scelta di grub, premiamo "Esc"
per accedere al prompt di Grub; possiamo premere "e" per vedere
la configurazione del boot loader per l'opzione di default di
grub; non dobbiamo farci confondere dai comandi, in quanto anche
se vediamo "insmod", in realtà non stiamo usando lo stesso "
insmod" di linux, ma Grub è un mondo a parte, solo che la
nomenclatura è lasciata uguale a quella dei comandi Unix per
questioni di semplicità; possiamo cambiare queste impostazioni
sia in modo temporaneo, che permanente all'interno di Grub.

N.B.: una volta avviato un kernel da un menu entry, possiamo a
sistema operativo avviato controllare il nome del menu entry
lanciato con:

```sh
 cat /proc/cmdline
```


## Esplorare i dispositivi e le partizioni da Grub

Grub ha un proprio schema di device-addressing. Ad esempio il
primo HDD trovato è chiamato "hd0", seguito da "hd1", e così via.
Grub può cercare tutte le partizioni su uno specifico UUID per
trovare dove un kernel può risiedere, questo avviene grazie al
comando "search". Vediamo alcuni comandi di grub:

```sh
 ls
 # mostra la lista di device riconosciuti da Grub
```

* l'output sarà una cosa tipo:
```
 (hd0) (hd0,msdos1) (hd0,msdos5)
```
dove (hd0) rappresenta l'HDD, e le due stringhe successive
racchiuse tra parentesi tonde sono le partizioni, indicate con "
msdos", questo indica che la tabella di partizione sul disco su
cui risiedono è di tipo MBR, nel caso in cui fosse stata GPT,
sarebbero iniziate con "gpt"


```sh
 ls -l
 # mostra la lista di device riconosciuti da Grub, con più
 # dettagli
```
```sh
 echo $root
 # mostra la partizione, di dove Grub, pensa di
 # trovare il kernel da lanciare
```
```sh
 ls (hd0,msdos1)/
 # mostra tutti i file su una partizione, utile
 # per capire ad esempio di quale partizione stiamo parlando, a
 # volte riconosciamo una partizione dai file contenuti in
 # quest'ultima
```
```sh
 ls (hd0,msdos1)/miaDir/ciao/
 # è un modo per navigare un
 # filesystem da grub
```
```sh
 ls ($root)/
 # mostra i file sulla partizione riconosciuta come
 # root
```
```sh
 ls /($root)/boot
 # mostra i file contenuti nella directory "
 # /boot"
```
```sh
 set
 # mostra le variabili di GRUB
```

una variabile molto importante è `$prefix`, questa indica dove
Grub si aspetta di trovare la sua configurazione

```sh
 linux (hd0,gpt1)/boot/vmlinuz-4.1.2 root=/dev/sda1
 # imposta il
 # percorso del kernel da caricare, e la posizione della root
 # directory da usare, nota che questo kernel sarà caricato solo
 # quando lanceremo il comando "boot", attenzione se il kernel
 # prevedeva anche un initial ram disk, allora il boot non andrà a
 # buon fine, dobbiamo settare anche l'initial ram disk
```
```sh
 linux (hd0,gpt1)/boot/vmlinuz-4.1.2 root=/dev/sda1 nomodeset
 # imposta il percorso del kernel da caricare, e la posizione
 # della root directory da usare, nota che questo kernel sarà
 # caricato solo quando lanceremo il comando "boot", attenzione se
 # il kernel prevedeva anche un initial ram disk, allora il boot
 # non andrà a buon fine, dobbiamo settare anche l'initial ram
 # disk, inoltre imposta l'opzione chiamata nomodeset utile per
 # avviare alcune distribuzioni, che ad esempio usano di default
 # driver proprietari, nel caso non venisse inserita potrebbe
 # compromettere il boot del sistema operativo
```
```sh
 initrd (hd0,1)/percorso/al/initrd.img
 # in questo caso
 # impostiamo anche il percorso per l'initial ram disk, possiamo
 # lanciare il kernel con "boot" se sia kernel e initial ram disk
 # sono correttamente settati, forse al posto di 1 ci va "gpt1"
```

```sh
 boot
 # comando utilizzato per effettuare il boot della
 # configurazione attuale, si utilizza una volta impostato ad
 # esempio il kernel da bootare o se presente l'initramfs
```

```sh
 chainloader (hd0,1)+1
 # avvia un altro bootloader contenuto
 # sull'hard disk 0 alla partizione uno, forse al posto di 1 ci va
 # "gpt1", questo è utile per avviare sistemi operativi come
 # Windows che contengono boot loader propri
```

N.B.: Il parametro passato al comando "linux" è chiamato "kernel
command line" e i suoi parametri sono chiamati "kernel command
line parameters"

## Kernel Command Line

Vediamo alcune opzioni famose da lanciare con il kernel:

```sh
 init=/path/al/programma
 # imposta il primo processo da
 # eseguire, solitamente questo è il gestore di demoni, ma può
 # essere utile talvolta impostarlo diversamente per poter ad
 # esempio accedere ad una shell usiamo "init=/bin/sh"
```
```sh
 root=/dev/sda3
 # imposta il percorso su cui è contenuta la
 # partizione dove è presente il mountpoint di root "/"
```
```sh
 quiet
 # impone il valore loglevel ad 1, in pratica il valore di
 # loglevel decide quali messaggi del kernel vengono stampati sui
 # terminali tty, quindi se impostato al valore "n" mostrerà solo
 # i messaggi di log di minore di "n", in questo caso viene
 # impostato al livello 1, quindi in tty verranno mostrati solo i
 # messaggi del kernel del livello 0 cioè di "EMERGENCY"
```
```sh
 loglevel=5
 # impone il valore di loglevel a "n" dove n è
 # compreso tra '0' e '8' estremi compresi, di default, se non
 # impostato questo valore è uguale a 7, cioè vengono stampati nel
 # terminale i messaggi dal livello 6 in giù
```
```sh
 debug
 # impone il loglevel della console al livello più alto, "
 # 8", in modo da poter visualizzare tutti i messaggi di log
```
```sh
 rdinit=/bin/mioPrg
 # impone il programma da far partire
 # all'avvio dell'initramfs, di default questo è impostato ad "
 # /init"
```
```sh
 ro
 # monta il fs in modalità read only, solitamente si usa in
 # quanto prima viene eseguito un filesystem check prima di essere
 # rimontato in rw
```
```sh
 rootfstype=
 # impone il tipo di filesystem, la maggior parte
 # delle volte funziona l'autodetect e quindi non abbiamo bisogno
 # di questa opzione, ma nel caso ad esempio di filesystem come "
 # jffs2" abbiamo bisogno di impostarlo
```
```sh
 rootwait
 # aspetta in modo indefinito la detection del root
 # device, solitamente è necessario con device di tipo mmc come le
 # flash card
```
```sh
 rw
 # monta il fs in read/write
```
```sh
 panic=
 # definisce il comportamento da assumere quando avviene
 # un kernel panic, le opzioni sono:
 # * 0: (opzione di default) non succede nulla, al video rimane
 #    mostrato il kernel panic
 # * 7: (o qualsiasi altro numero positivo) aspetta 7 secondi
 #    prima di riavviarsi
 # * -5: (o qualsiasi altro numero negativo) si riavvia
 #    immediatamente
```

```sh
 rootdelay=
 # impone un numero di secondi da aspettare prima di
 # montare il root filesystem, di default è a 0, ma è utile se il
 # device ci mette tempo ad effettuare il probing dell'hardware,
 # vedi anche rootwait
```
```sh
 lpj=
 # questi sono i "loops per jiffies", è un parametro
 # calcolato ogni volta che effettuiamo il boot, ad ogni modo se
 # sappiamo che l'hardware non cambierà significativamente vale la
 # pena imporlo manualmente per risparmiare circa 250ms al boot,
 # dopo il primo boot vediamo quale è il parametro nella stringa "
 # lpj=", per farlo eseguiamo un
```

```sh
 dmesg | grep -iA5 "calibrating"
 # una volta visto il valore
 # qui, possiamo andarlo ad impostare nell'opzione in modo da
 # risparmiare tempo
```

N.B.(Jiffies): The x86 family processors send an interrupt every
4ms, Linux sees this interrupt and tries to see how many loops
(without doing anything) it can execute before the next
interrupt, allowing us to calculate BogoMIPS per jiffy and then
CPU speed. So at boot time, Linux has no clue of actual CPU
speed, just the fact that it knows it's an x86 and will receive
that interrupt every 250 Hz. So then, the 250 Hz (and
consequently the jiffies value) accuracy is dependent on the CPU
crystal?

The jiffy at this point is the minimum distance between two
interrupts.

Possiamo partire in un livello più basso ad esempio per non far
partire xorg, ad esempio andando ad impostare dopo quiet "3" o il
numero corrispettivo alla modalità che preferiamo.


## Configurazione di Grub

La configurazione di Grub è contenuta in un file chiamato "
grub.cfg", e diversi moduli caricabili ".mod", la directory in
cui è contenuto questo file di configurazione è solitamente
/boot/grub oppure /boot/grub2. ATTENZIONE: Non modifichiamo
direttamente "grub.cfg" (a meno che non sappiamo precisamente
quello che stiamo facendo), ma utilizziamo i comandi "
grub-mkconfig" e "grub2-mkconfig" (a differenza della distro)

If you want to make changes to your GRUB configuration, you won’t
edit your grub.cfg file directly because it’s automatically
generated and the system occasionally overwrites it. You’ll add
your new configuration elsewhere, then run grub-mkconfig to
generate the new configuration.

Upon further inspection, you’ll find that every file in
/etc/grub.d is a shell script that produces a piece of the
grub.cfg file. The grub-mkconfig command itself is a shell script
that runs everything in /etc/grub.d. Quindi possiamo lanciare
senza modifiche permanenti:

```sh
 grub-mkconfig
 # mostra la configurazione sullo stdout, se non
 # aggiorno la configurazione non diventa permanente
```
```sh
 grub-mkconfig -o /boot/grub/grub.cfg
 # rende le modifiche
 # effettuate permanenti, è utile anche nel momento in cui vengono
 # aggiunti nuovi kernel, in automatico, questo comando cerca file
 # che iniziano per "vmlinuz-*" e per "System.map-*"
```
Per installare grub, possiamo eseguire:

```sh
 grub-install /dev/sda
 # in questo caso viene installato grub
 # sul disco /dev/sda, in questo caso verrà utilizzata la
 # directory di default che è "/boot"
```
```sh
 grub-install --boot-directory=/mnt/boot /dev/sdc
 # questo è
 # utile quando dobbiamo installare grub su un altro dispositivo
 # che abbiamo montato, o quando vogliamo installare grub in un
 # altra directorym altra possibile opzione è utilizzare "
 # --root-directory" e passargli la directory di root dopo aver
 # montato sia il mountpoint / che quello di /boot se esiste
```
```sh
 grub-install --efi-directory=efi_dir ---bootloader-id=name
 # installa grub in un sistema UEFI, dove il bootloader id è il
 # nome dato a grub, nel menu di boot UEFI, ed efi directory è la
 # posizione della directory di UEFI che solitamente è in
 # /boot/efi/efi o in /boot/efi
```

Grub, supporta anche l'avvio di altri boot-loaders,
quest'operazione è chiamata "ChainLoading", ed è usata ad esempio
quando si vuole installare un sistema Linux in dual boot con un
sistema Windows, in quanto per avviare quest'ultimo viene
lanciato il suo boot-loader. Possiamo modificare alcune
impostazioni di GRUB2 andando a creare un file chiamato "
/etc/default/grub", questo file conterrà alcune opzioni che
verranno interpretate dal comando "grub-mkconfig", nel momento in
cui andremo a costruire il file grub.cfg, vediamo alcuni esempi
di opzioni che possiamo aggiungere a questo file:

```sh
 GRUB_DEFAULT=0
 # imposta come voce selezionata di default la
 # prima nel menu
```
```sh
 GRUB_DEFAULT=4
 # imposta come voce selezionata di default la
 # quinta nel menu
```
```sh
 GRUB_DEFAULT="Previous Linux Versions>2"
 # possiamo anche
 # utilizzare le stringhe in questo caso selezioniamo la terza
 # voce nel sottomenu chiamato "Previous Linux Versions", per
 # vedere queste stringhe dobbiamo consultare il file "
 # /boot/grub/grub.cfg" e vedere le corrispettive "menuentry", al
 # posto del numero della voce nel sottomenu è preferibile
 # inserire la stringa corrispettiva che vediamo nel menuentry nel
 # file citato
```
```sh
 # GRUB_DEFAULT="Previous Linux Versions>Linux Generic 4.2.34"

 # in questo caso viene scelta come opzione di default la voce "
 # Linux Generic 4.2.34" contenuta all'interno del sottomenu "
 # Previous Linux Versions"
```
```sh
 GRUB_DISABLE_SUBMENU=y
 # in questo caso non vengono creati
 # sottomenu nel menu di grub
```
una volta cambiate una di queste voci, dobbiamo eseguire:

```sh
 sudo update-grub
```


## Il file grub.cfg

Il file grub.cfg, è il file principale di configurazione di grub,
questo è formato da istruzioni di Grub, ogni entry, è delineata
da "menuentry", oppure possiamo trovare più "menuentry"
all'interno di un "submenu", possiamo cancellare la sezione "
submenu" per non avere una voce contenente più sottovoci, cosa
che avviene comunemente per non avere un menu pieno di voci, grub
utilizza questo comportamento di default per avere un menu più
ordinato. Da questo file possiamo:

* Cambiare l'ordine delle menu entries
* Cambiare il titolo delle menu entries
* Cambiare l'organizzazione di submenu, per avere macro voci e sottovoci


##  Grub Note aggiuntive

Grub 2 has various differences from grub1, anyway we have a
directory called /boot/grub/ and there are many files here.

The file grub.cfg in this directory, this file contains what is
displayed into the boot process and other parameters passed to
grub in the booting process. Per una procedura di installazione
semplificata basta eseguire:

```sh
 sudo grub-install /dev/sda
 # installa grub nella
 # partizion/dev/sda, se esiste già un bootloader su un'altra
 # partizione, quest'ultimo viene sovrascritto
```
```sh
 sudo grub-install --recheck /dev/sda
 # rigenera il file di
 # configurazione in caso di errori
```
TODO
DA AGGIUNGERE grub mkconfig, e grub update


## Sicurezza di Grub

```sh
 grub-mkpasswd-pbkdf2
 # genera un hash che ci servirà per la
 # password di GRUB, questa dobbiamo salvarla da qualche parte
 # temporanemente per scriverla in un file di configurazione di
 # GRUB.
```
Ora scriviamo nel file "custom" di grub situato in "/etc/grub.d/40_custom"
e mettiamo in append il seguente contenuto:

```conf
set superusers="username"

password_pbkdf2 username <passwordHash>
```

dove per:

* "username": specificheremo un utente che deve essere separato
  da quelli di sistema, cioè è preferibile usare un nome utente
  non presente sul sistema
* "passwordHash": è l'hash della password generato dal comando "grub-mkpasswd-pbkdf2"

Ovviamente è sempre necessario avviare "grub-mkconfig" per
aggiornare il file di configurazione.

E' possibile anche proteggere singole voci di menu (ad esempio le
recovery mode, o alcuni sistemi operativi), questo è possibile
andando a modificare il file grub.cfg, in questo modo:

```conf
set superusers="root"
password_pbkdf2 root grub.pbkdf2.sha512.10000.biglongstring
password user1 insecure
menuentry "May be run by any user" --unrestricted { 	
	set root=(hd0,1) 	
	linux /vmlinuz
}

menuentry "Superusers only" --users "" { 	
	set root=(hd0,1) 	
	linux /vmlinuz single
}

menuentry "May be run by user1 or a superuser" --users user1 { 	
	set root=(hd0,2) 	
	chainloader +1
}
```


## Bypassare Grub per avere una shell minimale

Per bypassare grub, possiamo aggiungere all'opzione da bootare
attraverso il comando "e" da grub, la stringa:

```sh
init=/bin/sh
```

questa stringa va inserita tra le opzioni di lancio del kernel,
una volta entrati in questa shell molto probabilmente avremo il
filesystem montato in modalità read-only, possiamo quindi
rimontarlo runtime in modalità read-write attraverso il comando:

```sh
 mount -o remount,rw /
 # rimonto il filesystem in modalità
 # read/write
```


## Uname

Col comando "uname" richiedo informazioni sul sistema. Uname può
essere utile quando si deve installare un nuovo kernel per il
nostro sistema. Vediamo alcuni esempi:

```sh
 uname -o
 #  mostra il sistema operativo "OS" l'alternativa è "
 # uname --operating-system"
```
```sh
 uname -n
 # mostra il "nodename" che è il nome della macchina,
 # l'alternativa è "uname --nodename"
```
```sh
 uname -s
 # mostra il nome del kernel
```
```sh
 uname -m
 # mostra l'architettura della cpu
```
```sh
 uname -v
 # mostra la data di rilascio della versione di kernel
 # utilizzata
```
```sh
 uname -r
 # mi fornisce la vesione del kernel
```
```sh
 uname -a
 # mostra tutto
```
Per vedere la versione dell'OS (o ad esempio la distribuzione in uso) ci sono
più strade:

* analizzare il file /etc/issue, ad esempio "cat /etc/issue"
* analizzare il file /etc/os-release
* analizzare il file /proc/version
* mostrare i file in /etc/ che hanno la parola "release" e analizzarli, "ls /etc/*release*"


## Sistema UEFI o BIOS ?

Per capire se abbiamo effettuato il boot all'interno di un
sistema UEFI o BIOS, il metodo più semplice è quello di
effettuare un:

```sh
 ls /sys/firmware/efi
 # se questo file esiste allora il sistema
 # è bootato in UEFI, altrimenti abbiamo effettuato il boot in BIOS
```


## Informazioni sull'Hardware

Le informazioni sull'hardware possono essere trovate nella
directory /proc, anche se esistono diversi programmi molto
leggeri e utili per fare un'ispezione dell'hardware, senza
impazzire all'interno del filesystem proc.

Opzioni comuni per l'ispezione dell'hardware sono:

* dmidecode
* lshw
* hwinfo
* inxi
* hardinfo (GUI program)

Un programma molto utile per poter visualizzare informazioni
relative all'SMBIOS (System Management BIOS) è "dmidecode", nel
mondo del computing, le specifiche SMBIOS (detto anche "tabella
DMI") definiscono strutture dati e relativi metodi di accesso che
possono essere usati per leggere informazioni salvate nel BIOS di
un computer. Il programma dmidecode analizza e visualizza i dati
dell'SMBIOS, queste informazioni costituiscono solitamente:

* produttore del sistema
* nome del modello
* numero di serie
* versione firmware
* CPU sockets
* slot di espansione (compresi AGP, PCI e ISA)
* slot di moduli di memoria
* lista di porte di I/O (Input/Output)
* ecc...

Per poter visualizzare queste informazioni, basta un semplice:

```sh
 dmidecode
 # visualizza le informazioni contenute nell'SMBIOS
```
```sh
 dmidecode -s bios-version
 # visualizza la versione del bios
```
```sh
 dmidecode -t bios
 # visualizza tutte le informazioni sul bios
```
```sh
 dmidecode -t system
 # visualizza tutte le informazioni sul
 # sistema
```
```sh
 dmidecode -t baseboard
 # visualizza informazioni sulla
 # baseboard (o motherboard), cioè sulla scheda madre
```
```sh
 dmidecode -t chassis
 # visualizza informazioni sullo chassis
```
```sh
 dmidecode -t memory
 # visualizza informazioni sulla memoria
```
```sh
 dmidecode -t cache
 # visualizza informazioni sulla cache
```
```sh
 dmidecode -t processor
 # visualizza informazioni sul
 # processore
```
```sh
 dmidecode -t connector
 # visualizza informazioni sui connettori
```
```sh
 dmidecode -t slot #
 # visualizza informazioni sugli slot
```
Un altro programma molto utile e leggero è "lshw", possiamo
utilizzarlo al meglio se eseguito coi permessi di root, ci
basterà eseguire:

```sh
 lshw
 # visualizza le informazioni sull'hardware
```
```sh
 lshw -short
 # visualizza un resoconto breve sull'hardware
```
```sh
 lshw -class processor
 # visualizza informazioni sul processore
```
```sh
 lshw -html > hardware.html
 # fornisce l'output in un carino
 # formato HTML
```
Altro programma utile ancora è "hwinfo", questo è più dettagliato
di "lshw" e per usarlo eseguiamo:

```sh
 hwinfo
 # mostra informazioni sull'hardware
```
```sh
 hwinfo --bios
 # mostra informazioni sul bios
```
Altro programma ancora è "inxi", infatti questo è un programma
molto completo e user-friendly per mostrare informazioni, vediamo
alcuni esempi:

```sh
 inxi
 # mostra un ouput riassuntivo con relativamente poche
 # informazioni
```
```sh
 inxi -v 7
 # mostra tutte le informazioni sulle periferiche
```
```sh
 inxi -Fxz
 # ottimo sommario di tutte le periferiche della
 # macchina con varie catatteristiche
```
anche nel caso di questo programma è consigliabile avviarlo con i
diritti di amministratore.

Un comando molto utile e dettagliato per creare report
dell'hardware in html è "hardinfo", possiamo lanciarlo
semplicemente eseguendo:

```sh
 hardinfo
```


## Memoria Centrale

Un programma che ci permette di visualizzare informazioni sulla
memoria è Free, possiamo lanciarlo eseguendo "free" da terminale:

```sh
 free
 # ci mostra delle informazioni sulla memoria in kB
```
```sh
 free -b
 # ci mostra delle informazioni sulla memoria in B
```
```sh
 free -m
 # ci mostra delle informazioni sulla memoria in MB
```
```sh
 free -s 2
 # ci mostra informazioni che si aggiornano ogni 2
 # secondi, comportamento simile al comando top
```
```sh
 free -ms 2
 # comando molto comodo per vedere informazioni
 # aggiornate ogni due secondi della memoria in MB
```
Questo comando può rivelarsi utile anche per capire se la nostra
memoria RAM è sufficiente vedendo quando swap viene utilizzato.
Un'altra opzioni per poter visualizzare informazioni sulla
memoria è quella di stampare il file "/proc/meminfo"

```sh
 cat /proc/meminfo
 # stampa informazioni sulla memoria
```
Possiamo dare un'occhiata a cosa c'è in RAM (non so a cosa possa
servire, ma si può fare), utilizzando:

```sh
 sudo dd if=/dev/mem | cat | strings
 # visualizza il contenuto
 # della RAM sullo standard output
```


## Memoria Rigida

Per poter visualizzare informazioni per quanto riguarda la
memoria rigida, vengono utilizzati solitamente i programmi:

* `du`: per ricordarlo pensiamo a "disk usage"
* `df`: per ricordarlo pensiamo a "disk filesystem"

Vediamo subito qualche esempio applicativo con "du":

```sh
 du
 # visualizza l'elenco dei file con lo spazio occupato nella
 # directory corrente
```
```sh
 du -h
 # visualizza l'elenco dei file con lo spazio occupato
 # nella directory corrente, ma in un formato "human readable"
```
```sh
 du -s *
 # mostra lo spazio utilizzato dalla directory in cui
 # sono
```
```sh
 cd /; sudo du -s
 # mostra lo spazio occupato totale dal disco
 # in cui è montata la root partition
```
```sh
 du -sh nomeFile
 # visualizza lo spazio occupato dal file
 # nomeFile, il flag "-s" sta per summary, e ci permette di
 # visualizzare un resoconto del file
```
```sh
 du -sh *
 # fa un resoconto delle dimensioni di tutti i file in
 # una directory, ad esempio se eseguiamo "du -sh /*" vediamo la
 # dimensione delle varie cartelle principali del nostro
 # filesystem, molto utile, peccato però che non visualizza le
 # dimensioni dei file nascosti
```
```sh
 du -cxh -d1 | sort -rh
 # fa un resoconto delle dimensioni di
 # tutti i file in una directory, simile ad "du -sh *", col
 # vantaggio che mostra anche le dimensioni per i file/directory
 # nascosti, il flag "x" esclude file e directory su altri
 # filesystem, il flag "c" fa un totale, mentre il flag "-h" nel
 # sort, è utilizzato appositamente per ordinare per dimensione
 # file (quindi ad esempio 1G è più grande di 1K, ecc...) mentre
 # il flag "-r" nel sort serve a mostrare i file più grandi per
 # primi, quindi ordiniamo la lista in ordine decrescente
```
```sh
 du -sh nomeDirectory
 # visualizza lo spazio totale occupato
 # dalla directory nomeDirectory
```

```sh
 du -ch *.log
 # visualizza lo spazio totale occupato
 # dal set di file indicato con anche la somma
```
```sh
 du -ah nomeDirectory
 # visualizza l'elenco di tutti i file
 # contenuti nella directory con le relative dimensioni
```
Un tool molto utile per visualizzare lo spazio occupato e poter
navigare nelle directory è "ncdu", una volta installato ci
basterà eseguire:

```sh
 ncdu
 # effettua uno scanning delle directory e delle
 # sottodirectory a partire dalla directory corrente e fornisce
 # un'interfaccia interattiva all'utente per poter navigare nelle
 # directory e visualizzare le varie dimensioni per le varie
 # directory e file
```
mentre con "df"

```sh
 df
 # visualizza i diversi filesystem in utilizzo con le
 # relative dimensioni e percentuali di occupazioni, possiamo
 # notare che:
 # SpazioTotale > SpazioOccupato + SpazioLibero
 # questo avviene perchè, nella visualizzazione non viene contato
 # nello spazio occupato e in quello libero, il "reserved space",
 # cioè quello spazio che viene lasciato per sicurezza per evitare
 # crash del sistema o instabilità in caso di mancanza di spazio,
 # solitamente è il 5% dello spazio totale
```


```sh
 df -h
 # visualizza le informazioni per i diversi filesystem in
 # utilizzo in modalità "human readable"
```
```sh
 df -ah
 # visualizza tutti i filesystem, anche quelli virtuali
 # utilizzati dal kernel
```
```sh
 df -i
 # visualizza il numero di inode disponibili, molto utile
 # ad esempio può capitare di non finire lo spazio su un disco, ma
 # il sistema operativo si lamenta di spazio insufficiente, in
 # realtà molto probabilmente abbiamo finito gli inode a
 # disposizione, altri casi in cui non possiamo scrivere è quando
 # sono presenti filesystem read only come ad esempio: lo
 # squashfs, in questi casi infatti possiamo accorgercene
 # lanciando un " file -s /dev/loop0 " dove "/dev/loop0"
 # corrisponde al dispositivo su cui abbiamo sospetti dello
 # squashfs
```
Possiamo anche fare uso di strumenti come "fdisk" per
visualizzare lo spazio totale di device non montati, questo è
possibile attraverso il comando:

```sh
 lsblk
 # comando che visualizza tutte le partizioni con relative
 # dimensioni per ogni disco (migliore!!)
```
```sh
 fdisk -l | grep Disk
 # visualizza lo spazio totale presente su
 # un dispositivo di memoria
```
```sh
 fdisk -l | grep sda
 # mostra tutte le dimensioni delle varie
 # partizioni assegnate al disco fda
```
N.B.:The POSIX standard defines a block size of 512 bytes.
However, this size is harder to read, so by default, the df and
du output in most Linux distributions is in 1024-byte blocks. If
you insist on displaying the numbers in 512-byte blocks, set the
POSIXLY_CORRECT environment variable. To explicitly specify
1024-byte blocks, use the -k option (both utilities support
this). The df program also has a -m option to list capacities in
1MB blocks and a -h option to take a best guess at what a person
can read.

TODO
HOWLINUXWORKS pag72 devo iniziare 4.2.11

## Periferiche Hardware: lspci, lsusb, lscpu, lsblk, lsscsi, lspcmcia, lshw, lsdev, usbview

Esistono tre comandi molto utili per visualizzare le periferiche
hardware su una macchina:

```sh
 lspci
 # mostra le periferiche pci
```
```sh
 lspci -k
 # mostra le periferiche pci, con i relativi driver
 # hardware in uso, molto utile nel momento in cui vogliamo capire
 # a quale periferica è associato o meno un driver
```
```sh
 lspci -v
 # mostra le periferiche pci, e molte informazioni su
 # ogni periferica, anche i moduli in uso, è più completa rispetto
 # a "lspci -k"
```
```sh
 lsusb
 # mostra le periferiche usb della macchina, posso vedere
 # bus number e device number, e utilizzarli per localizzare il
 # device file della periferica interessata in "
 # /dev/bus/usb/busNumber/deviceNumber", nota che un device
 # comunque può creare più di un device file, non c'è una
 # corrispondenza 1:1
```
```sh
 lsusb -v
 # mostra le periferiche usb della macchina, con annesse
 # informazioni come vendorId, productId e altri dettagli più
 # tecnici
```
```sh
 lscpu
 # mostra informazioni riguardanti il sistema CPU
```
```sh
 lsscsi
 # mostra le periferiche utilizzanti il protocollo scsi
 # (solitamente HDD, Lettori ottici, ecc...)
```
```sh
 lspcmcia
 # mostra tutte le periferiche pcmcia
```
```sh
 lsblk
 # mostra tutti i dispositivi di archiviazione, posso
 # utilizzarlo per mostrare i numeri associati al device, il mio
 # device sarà in /dev/block/firstNumber:secondNumber, questo
 # comando è UTILISSIMO per visualizzare le dimensioni delle
 # partizioni per i device per ogni dispositivo
```
```sh
 usbview
 # fornisce ulteriori informazioni attraverso un
 # programma GUI sull'USB
```
```sh
 nproc
 # mostra il numero di CPU, utile quando dobbiamo
 # impostare la variabile MAKEOPTS
```
un'ultra utilità più avanzata utilizzata da programmatori di
basso livello è:

```sh
 lsdev
 # questo mostrerà cosa il kernel vede come Device e i
 # corrispettivi DMA, IRQ, I/O Ports
```
per avere informazioni invece sulle seriali, possiamo utilizzare
il programma "setserial".

## Moduli del Kernel


Esistono diversi comandi per poter gestire i moduli del kernel in
uso, vediamone alcuni:

```sh
 lsmod
 # elenca i moduli installati correntemente nel kernel,
 # elabora e formatta in modo leggibile informazioni da
 # /proc/modules
```
```sh
 ls -Rl /lib/modules/$(uname -r)
 # elenca tutti i moduli
 # disponibili per il mio kernel, è da notare che tutti i moduli
 # sono collocati nella directory /lib/modules, mentre i moduli
 # caricati dal sistema sono nella memoria del kernel e possiamo
 # visualizzarli in /proc/modules
```
```sh
 insmod percorsoModulo
 # inserisce il modulo, attenzione, questo
 # comando è oggigiorno sostituito nella pratica da modprobe, in
 # quanto, modprobe carica tutti i moduli dipendenza in automatico
 # ed inoltre non c'è bisogno di specificare l'intero percorso al
 # modulo
```
```sh
 rmmod nomeModulo
 # rimuove un singolo modulo caricato
```
```sh
 modinfo nomeModulo
 # mostra informazioni e dipendenze del
 # modulo indicato, come ad esempio anche alcune opzioni con cui
 # può essere caricato, indicate nelle voci "parm:"
```
```sh
 cd /sys/module/<nome_modulo>/parameters
 # visualizza i
 # parametri correnti del modulo caricato
```
Un comando molto versatile e più recente per gestire i moduli del
kernel è "modprobe", l'utilizzo di questo comando quando
possibile è sempre consigliato rispetto ai comandi "insmod" ed "
rmmod" in quanto gestisce anche le dipendenze, vediamo alcuni
esempi:

```sh
 modprobe nomeModulo
 # carica il modulo nomeModulo con le
 # relative dipendenze
```
```sh
 modprobe -v nomeModulo
 # carica il modulo nomeModulo con le
 # relative dipendenze, mostrando cosa ha caricato attraverso la
 # modalità "verbose"
```
```sh
 modprob -r nomeModulo
 # rimuove il modulo se è caricato, quindi
 # non dovremmo più vederlo in lsmod mentre è ancora
 # visualizzabile come modulo disponibile in /lib/modules, modprob
 # -r è quivalente a lanciare rmmod, ma risolve le dipendenze
```
```sh
 modprobe -rv nomeModulo
 # rimuove il modulo e visualizza le
 # informazioni "verbose" a schermo, indicando anche i moduli
 # dipendenza rimossi
```
```sh
 modprobe sr_mod xa_test=1
 # carica il modulo sr_mod con le
 # necessarie dipendenze e l'opzione xa_test=1
```
Possiamo rendere permanenti le opzioni con cui carichiamo i
moduli attraverso il file "modprobe.conf" o attraverso la
creazione di appositi file nella directory "
/etc/modprobe.d/file.conf". Ad esempio nel caso volessimo che
tutte le volte che il modulo "sr_mod" venga caricato l'opzione "
xa_test=1" deve essere attiva, allora creiamo un file chiamato "
whatever.conf" (l'importante è che sia .conf, anche se per
convenzione utilizziamo file con lo stesso nome del modulo
interessato) con scritto:

```conf
options sr_mod xa_test=1
```

Possiamo visualizzare le opzioni dei moduli correntemente
caricati attraverso:

```sh
 cat /sys/module/nomeModulo/parameters/parameterName
 # visualizza informazioni sulle opzioni caricate dal modulo
 # chiamato "nomeModulo", se il file parameterName che rappresenta
 # il nome parametro esiste, allora quell'opzione è caricata e il
 # suo contenuto è il valore assegnato a quell'opzione
```
## Diagnostica e Manutenzione dei dispositivi di Memoria


## Ext Partition Monitoring


Esistono generalmente due strumenti per la diagnostica e la
riparazione di partizioni di dispositivi di memoria:

```sh
 fsck
 # diagnostica e ripara dispositivi di memoria di qualsiasi
 # filesystem
```
```sh
 e2fsck
 # diagnostica e ripara dispositvi di memoria con
 # filesystem ext2/ext3/ext4
```
I due programmi sono collocati nella directory /sbin, infatti in
questa directory esistono diversi strumenti per la diagnostica di
filesystem ma molti sono link, infatti possiamo eseguire il
comando sotto riportato per rendercene conto:

```sh
 ls -al /sbin/fs*
 # elenca tutti gli strumenti per effettuare
 # diagnostica di dispositivi di memoria
```
La diagnostica può essere effettuata solo se i dispositivi di
memoria non sono montati, una volta smontati possiamo:

```sh
 fsck /dev/sdb1
 # effettua un controllo sulla partizione 1 del
 # dispositivo /dev/sdb, il risultato "clean", indica un
 # filesystem corretto senza inodes rotti o persi
```
```sh
 fsck -f /dev/sdb1
 # effettua un controllo forzato sulla
 # partizione indicata
```
```sh
 fsck -a /dev/sdb1
 # effettua un controllo e automaticamente
 # effettua le riparazioni necessarie sulla partizione 1 del
 # dispositivo /dev/sdb
```
WARNING:You should never use fsck on a mounted filesystem because
the kernel may alter the disk data as you run the check, causing
runtime mismatches that can crash your system and corrupt files.
There is only one exception: If you mount the root partition
read-only in single-user mode, you may use fsck on it.

Dopo aver effettuato un fsck, possiamo rimontare la partizione
root o riavviando o eseguendo:

```sh
 mount -o remount /
 # rimonta la partizione di root
```
Inoltre se un filesystem check trova un inode senza nome, quindi
una sorta di file corrotto, lo ripara e lo mette in una directory
chiamata "lost+found", con un numero al posto del nome del file.

Nel caso volessimo forzare un check al prossimo riavvio di
sistema possiamo creare un file nella directory radice della
partizione chiamato "forcefsck" vuoto con:

```sh
 sudo touch /forcefsck
 # viene forzato un check del disco al
 # prossimo riavvio, il file viene automaticamente eliminato dopo
 # il check
```
Tutti i comandi "e2fsck" hanno gli stessi flag del comando "fsck"
, quindi possiamo eseguire tutti i comandi sopra riportati anche
con "e2fsck" per filesystem di tipo "ext".

E' possibile anche utilizzare lo strumento "debugfs" per
effettuare il debug di filesystem di tipo ext, ci permette quindi
di operare con partizioni danneggiate e non, possiamo avviarlo
con:

```sh
 debugfs /dev/myDevice
 # avvia debugfs in modalità read-only
```
```sh
 debugfs -w /dev/myDevice
 # avvia debugfs in modalità read/write
```

* ls # elenca i file
* ls -ld # elenca tutti i file, anche quelli eliminati

Si aprirà un prompt, a cui potremmo dare i comandi trovati nella
lista che compare col comando "help" digitato dal prompt di
debugfs, sono disponibili tantissime opzioni, ed è molto chiaro
il loro utilizzo attraverso la descrizione riportata; un caso
d'uso potrebbe essere ad esempio un file che abbiamo cancellato e
vogliamo recuperare, o controllare la frammentazione del disco o
per un determinato inode, possiamo uscire dal programma
attraverso la direttiva "quit". Si ricorda che un'altra utility
per visualizzare informazioni su una partizione ext é:

```sh
 dumpe2fs /dev/myDevice
 # visualizza informazioni sul device,
 # numero di blocchi, numero di inode, blocchi liberi, nomero di
 # mount effettuate, e numero massimo di mount prima del
 # filesystem check, o il check interval temporale, e tanti altri
 # dettagli sulla partizione
```
N.B.: Per effettuare il recovery di file cancellati su file
system ext è molto utile il programma "extundelete", oppure altri
programma molto usati e semplici da usare sono "foremost" e "
scalpel", che dovrebbero essere anche indipendenti dal
filesystem, quindi funzionano anche su filesystem non ext4 (DA
VERIFICARE).

Possiamo recuperare file di test se conosciamo qualche stringa
specifica del file, come stringa interna (meglio) o nome del file
(peggio) con grep, ad esempio:

```sh
 grep -a -C 200 -F 'Unique string in text file' /dev/sdXN > OutputFile
```


## Hardware Monitoring di dischi con SMART

Smartmontools (S.M.A.R.T. Monitoring Tools) is a set of utility
programs (smartctl and smartd) to control and monitor computer
storage systems using the Self-Monitoring, Analysis and Reporting
Technology (S.M.A.R.T.) system built into most modern (P)ATA,
Serial ATA and SCSI hard drives. Innanzitutto dobbiamo installare
il pacchetto "smartmontools", quindi:

```sh
 apt-get install smartmontools
```
Una volta installato, avremo a disposizione il comando "smartctl"
e il demone "smartd", vediamo alcuni esempi di comandi con
smartctl:

```sh
 smartctl -s on /dev/sda
 # abilita smartctl sull'hard disk
 # /dev/sda
```
```sh
 smartctl -i /dev/sdb
 # mostra informazioni "-i" sul disco
 # montato in /dev/sdb, molto utile, possiamo visualizzare la
 # marca, la velocità di rotazione ( e.g. 7200 rpm, 5400 rpm,
 # ecc...), la capacità, le versione del firmware, il numero
 # seriale, il LU WWN Id che è come un MAC address per gli hard
 # disk, eccetera...
```
Nel caso il comando "smartctl -i" dovesse fallire, allora questo
vuol dire che smartctl ha bisogno di informazioni aggiuntive
sull'interfaccia utilizzata dal nostro device, dovremo quindi
eseguire:

```sh
 sudo smartctl -d scsi -i /dev/sda
 # dove al posto di type
 # inseriamo ata,scsi,sat o altre opzioni visualizzabili dal man
 # di smartctl
```
```sh
 sudo smartctl -a /dev/sda
 # mostra informazioni dettagliate per
 # un hard disk IDE
```
```sh
 sudo smartctl -a -d ata /dev/sda
 # mostra informazioni
 # dettagliate per un hard disk SATA
```
```sh
 smartctl -H /dev/sdb
 # mostra informazioni sullo stato di
 # salute dell'hard disk "-H" sta per health, utile per monitorare
 # la salute o eventuali anomalie di un HD
```
```sh
 sudo smartctl -c /dev/sda
 # elenca i vari tipi di test
 # disponibili con una stima della durata, solitamente la maggior
 # parte degli hard drive supporta questi test, i due test più
 # comuni solo il test "short" e l'"extended"
```
```sh
 sudo smartctl -t short /dev/sda
 # esegue un test di tipo "short"
 # sul device indicato in background, non mostra i risultati a
 # schermo, quelli devono essere visualizzati con un successivo
 # comando
```
```sh
 sudo smartctl -t long /dev/sda
 # esegue il test di tipo "
 # extended" sul device indicato, non mostra i risultati a
 # schermo, quelli devono essere visualizzati con un successivo
 # comando
```
```sh
 sudo smartctl -l selftest /dev/sda
 # mostra i risultati a
 # schermo dell'ultimo test effettuato, possiamo visualizzare il
 # numero di ore di vita dell'hard drive
```
Un utile front-end grafico per smartmontools è "GSmartControl".

##  Approfondimento sul sistema S.M.A.R.T

Self-Monitoring, Analysis, and Reporting Technology, o
S.M.A.R.T., è un sistema di monitoraggio per dischi rigidi e per
SSD, per rilevare e fornire diversi indicatori di affidabilità,
nella speranza di anticipare i malfunzionamenti.

