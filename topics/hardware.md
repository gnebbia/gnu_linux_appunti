
Nella storia di Linux, ci sono stati molti cambiamenti su come il
kernel presenta l'hardware all'utente. Attualmente il sistema che
si occupa di abilitare i programmi nello user-space per la
configurazione e l'utilizzo dei dispositivi hardware è chiamato "udev".

## Device Files


E' facile manipolare la maggior parte dei device su Linux in
quanto, il kernel presenta l'interfaccia di I/O dei device ai
processi utente attraverso dei file; questi file sono chiamati "
device nodes". Alcuni device sono completamente operabili
atraverso questi file, ma non tutti. I device files sono
contenuti nella directory "/dev". Per identificare un device con
i relativi permessi possiamo utilizzare un classico "ls -l" nella
directory "/dev". I device nodes si contraddistinguono, in quanto
il primo carattere può essere:

* "b": Indica un Block Device
    Sono device in cui possiamo scrivere solo per chunk di
    dimensione prefissata, questi device hanno inoltre una
    dimensione definita
* "c": sta per Character Device
    Sono device in cui possiamo leggere o scrivere caratteri, non
    hanno un dimensione definita come i Block Device
* "p": sta per Pipe Device
    I Pipe Device o Named Pipe sono come Character Device, solo
    che al posto di scrivere ad un driver del kernel, il
    destinatario è un altro processo, quindi possiamo usarlo come
    mezzo di comunicazione tra due processi (IPC)
* "s": sta per Socket Device
    I Socket sono interfacce special purpose frequentemente
    utilizzate per l'IPC (interprocess communication), anche se
    in realtà questi non sono collocati nella directory /dev,
    Unlike named pipes sockets are fully duplex-capable.

I numeri che vengono mostrati nel momento in cui eseguiamo un "ls -l",
rappresentano rispettivamente il "major number" ed il "minor
number", questi due numeri aiutano il kernel ad identificare i
dispositivi, e dispositivi simili avranno solitamente lo stesso
major number.

E' utile notare che non tutti i dispositivi hardware sono
presenti nella directory "/dev", in quanto non tutti i device
possono essere propriamente descritti con una delle categorie
sopra descritte, un esempio è dato dalle interfacce di rete, che
non hanno device files.


## Linux e Casualità, /dev/random e /dev/urandom

The files /dev/random and /dev/urandom provide an interface to
Kernel’s Random Number Generator. The Random Number Generator
gathers environmental noise from device drivers and other sources
into entropy pool. It also keeps an estimate of Number of bits of
noise in entropy pool. It is from this entropy pool, random
numbers are generated

/dev/random It will only return Random bytes from entropy pool.
If entropy pool is empty, reads to /dev/random will be blocked
until additional environmental noise is gathered. This is suited
to high quality randomness, such as one-time pad or key
generation.

TIP: Issue the command ‘cat /dev/random’ into your terminal
without quotes. Move the mouse or type anything on the keyboard
to see random characters being generated. Press CTRL+C to exit
the situation.

/dev/urandom It will return as many random bytes as requested.
But if the entropy pool is empty, it will generate data using
SHA, MD5 or any other algorithm. It never blocks the operation.
Due to this, the values are vulnerable to theoretical
cryptographic attack, though no known methods exist.

TIP: Issue the command ‘cat /dev/urandom’ into your terminal
without quotes. Sit and watch random characters being generated,
while you do nothing. Press CTRL+C to exit the situation.

Both the files /dev/random and /dev/urandom are used to generate
randomness, but

`/dev/urandom` is best used when:

 1. You just want a large file with random data for some kind of
    testing
 2. You are using the dd command to wipe data off a disk by
    replacing it with random data.
 3. Almost everywhere else where you don’t have a really good
    reason to use /dev/random instead

`/dev/random` is likely to be the better choice when:

 1. Randomness is critical to the security of cryptography in your
    application -- one-time pads, key generation.

In pratica Una controparte di /dev/random è /dev/urandom
(sorgente causale non bloccata "unlocked") che riusa il pool
interno per produrre bit pseudocasuali aggiuntivi. Questo
significa che la richiesta non si blocca, ma il risultato
potrebbe contenere meno entropia rispetto a /dev/random.
Nonostante sia un generatore di numeri pseudocasuali adatto per
la maggior parte delle applicazioni crittografiche, non è
raccomandato per la generazione di chiavi crittografiche a lunga
scadenza.

Vediamo alcuni esempi per generare password su linux con alcune
che fanno uso di random:

```sh
 date +%s | sha256sum | base64 | head -c 32 ; echo
```
```sh
 < /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-32};echo;
```
```sh
 openssl rand -base64 32
```
```sh
 < /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c6
```
```sh
 randpw(){ < /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-16};echo;}
 # here we define a function
```
```sh
tr -cd '[:alnum:]' < /dev/urandom | fold -w30 | head -n1
```

il mio metodo preferito e' invece:
```sh
strings /dev/urandom | grep -o '[[:alnum:]]' | head -n 30 | tr -d '\n'; echo
```



## Create /dev/random and /dev/urandom if absent

Creating /dev/random & /dev/urandom, if your System doesn’t have
them, remind that:

* Minor Device number of /dev/random -- 1
* Major Device number of /dev/random -- 8
* Minor Device number of /dev/urandom -- 1
* Major Device number of /dev/urandom -- 9

STEP1: Creating character file with mode/permission as 644:
```sh
mknod -m 644 /dev/random 1 8
```

STEP2: Creating character file with mode/permission as 644:
```sh
mknod -m 644 /dev/urandom 1 9
```

STEP3: Changing ownership & group of created devices to 'root':
```sh
chown root:root /dev/random /dev/urandom
```

STEP4: Done



## Il filesystem sysfs

La directory /dev è molto comoda per i processi utente per fare
riferimento all'hardware supportato dal kernel, ma fornisce uno
schema molto semplicistico rispetto alla realtà. Infatti questi
nomi all'interno di /dev ci dicono davvero molto poco del device
a cui fanno riferimento. Un'altro problema è che il kernel
assegna i nomi ai device in base all'ordine in cui li trova al
boot, quindi potrei avere nomi diversi per lo stesso device a
diversi reboot.

Per fornire una visione uniforma dei dispositivi collegati in
funzione dei loro effettivi attributi, il kernel linux offre
l'interfaccia denominata "sysfs" attraverso un filesystem di file
e directory. La directory base che contiene i device è "/sys/devices".
Facciamo un esempio, il device /dev/sda potrebbe risiedere all'indirizzo
"/sys/devices/pci0000:00/0000:00:1f.2/host0/target0:0:0/0:0:0:0/block/sda",
anche se l'indirizzo non è molto user-friendly, questi due file
hanno scopi diversi, in quanto il primo è utilizzato per fornire
un'interfaccia al device per i processi utente, mentre il secondo
è utilizzato per visualizzare informazioni e gestire il device.
All'interno della directory del device possiamo trovare
all'interno del file "dev" il major e il minor number ad esempio "8:0" starà
ad indicare un major number = a 8 ed un minor number = a 0.

E' molto utile sapere che nella directory sys, ci sono molti
shortcut, ad esempio "/sys/block" sarà la directory contenente
tutti gli shortcut ai block devices del sistema, questi sono
contenuti anche all'interno di qualche directory in "/sys/devices"
, ma questo sistema di shortcut, permette a sysfs di essere più
facilmente percorribile. Per rivelare il vero percorso di un
block device contenuto ad esempio in /sys/block (ad esempio sda)
possiamo effettuare un:

```sh
 ls -l /sys/block
 # mostra i percorsi reali dei vari block device presenti sul sistema
```
Può essere difficile trovare la posizione di un determinato
device che vediamo in /dev all'interno del filesystem sysfs.
Possiamo usare il comando "udevadm" (contenuto in /sbin) per
mostrare il path e vari attributi, ad esempio:

```sh
 udevadm info --query=all --name=/dev/sda
 # mostra il percorso completo del device /dev/sda all'interno di sysfs
 # con relative informazioni
```


## Hard Disks

La maggior parte degli Hard Disk collegati ad un sistema Linux
viene chiamato col prefisso "sd", quindi potremo avere nel caso
di due hard disk "/dev/sda" ed "/dev/sdb". Questi device file
rappresentano l'intero disco, mentre per le partizioni separate
all'interno della stessa partitione vengono chiamate "/dev/sda1",
"/dev/sda2", ecc...

La nomenclatura non è casuale, infatti richiede una spiegazione;
la porzione "sd" sta per SCSI disk. SCSI sta per "Small Computer
System Interface" e fu originariamente un sistema hardware con
relativo protocollo per le comunicazioni tra i dispositivi come
dischi e altre periferiche. Nonostante lo SCSI hardware non è
utilizzate nelle macchine moderne, il protocollo SCSI è invece
utilizzato frequentemente, grazie alla sua adattabilità. Quindi è
utile ricordare che SCSI può intendere:

1. Hardware (ormai obsoleto)
2. Protocollo (utilizzato frequentemente)

Ad esempio le periferiche USB utilizzano il protocollo SCSI per
comunicare, per quanto riguarda gli Hard Disk SATA, la questione
è più complessa ma il kernel Linux alla fine utilizza comandi del
protocollo SCSI per comunicare con loro. Per elencare i
dispositivi SCSI e visualizzare informazioni su di essi,
bisognerebbe navigare nel sysfs, ma per fortuna esistono
programmi che fanno questo per noi, uno dei più famosi è "lsscsi".

```sh
 lsscsi
 # mostra le periferiche SCSI, la prima colonna identifica l'indirizzo
 # della periferica all'interno del # sistema, la seconda identifica il
 # tipo di dispositivo, le successive informazioni del produttore e
 # l'ultima indica il percorso al device file
```

Tradizionalmente la nomenclatura dell'hardware ha spesso causato
problemi, per via del fatto che se ho tre HDD, "/dev/sda", "/dev/sdb"
ed "/dev/sdc", e mi si spacca un HDD, ad esempio
/dev/sdb, allora in questo caso /dev/sdc diventerà /dev/sdb, e
tutte le regole che avevo impostato per /dev/sdb saranno
applicate automaticamente a quest'ultimo HDD, per evitare questi
problemi i sistemi Linux utilizzano l'UUID (Universally Unique
Identifier) per una nomenclatura persistente degli HDD.


## CD e DVD

Linux riconosce la maggior parte dei drive ottici come
dispositivi SCSI; ad ogni modo se il dispositivo è molto vecchio
potrebbe essere riconosciuto come dispositivo PATA. I dispositivi
ottici indicati con la nomenclatura `/dev/sr*` che sta per SCSI
read sono di sola lettura, e sono dispositivi ottici da cui
possiamo solo leggere; invece i dispositivi su cui possiamo
scrivere sono indicati con `/dev/sg*`, dove sg sta per SCSI
generic.


## PATA Hard Disk

I device indicati con `/dev/hd*`, sono comuni su kernel e
dispositivi hardware molto vecchi. A volte potrebbe capitare di
trovare un HDD SATA riconosciuto come PATA, questo significa che
l'HDD SATA sta funzionando in "compatibility mode", questo
abbassa le performance del dispositivo ed era una modalità
utilizzata tempo fa per questioni di retro-compatibilità.
Possiamo cambiare questa impostazione della "compatibility mode"
dalle impostazioni di BIOS, riportando il device in "native mode".


## Approfondimento su SCSI

DA FARE


## Terminali

I terminali sono dispositivi utilizzati per spostare caratteri
tra un processo utente e un dispositvo di I/O, solitamente per
l'output del testo in uno schermo. Possiamo invece definire come
`pseudoterminali` quei device che emulano i terminali che
capiscono l'I/O dei veri terminali. Invece di parlare di un vero
e proprio hardware in realtà il kernel fa riferimento ad un
software, che è costituito dalla shell del isstema operativo. Due
comuni terminal devices sono `/dev/tty1` che costituisce la prima
console virtuale, e `/dev/pts0` che è il primo pseudoterminale.
In pratica, i `/dev/tty*` sono i terminali a cui accedo
solitamente con la combinazione di tasti "Ctrl+Alt+Fx", dove "Fx"
rappresenta uno qualsiasi dei tasti funzione, mentre i terminali "
pts" rappresentano gli emulatori di terminale. Tutti gli
emulatori di terminale possono essere visualizzati nella
directory "/dev/pts", in questa directory troverò un file per
ogni emulatore di terminale aperto; in realtà questa directory è
un filesystem dedicato. Potrei ad esempio aperto un emulatore di
terminale e scoperto quale id gli è stato assegnato (ad esempio
con ps, o andando nella directory /dev/pts per vedere il nuovo
file creato), eseguire:

```sh
 cd /dev/pts ; echo "ciao" > 20
 # stampa "ciao" sul terminal
 # emulator con ID 20
```
possiamo visualizzare a video l'identificativo dell'attuale
terminale attraverso un semplice:

```sh
 ps
 # visualizza informazioni sul processo corrente e quindi sul
 # terminale attivo
```
```sh
 tty
 # mostra l'identificativo del terminale corrente
```


## Display Modes


Linux ha due cosiddette "display modes":

* Text Mode
* X Window System server (modalità grafica)

Oggigiorno normalmente il boot in molte distribuzioni,
suprattutto "user-friendly" si avvia in automatico in modalità
grafica attraverso un display manager. Tuttavia Linux supporta le
cosiddette "console virtuali", cioè con una determinata
combinazione di tasti tipo "Ctrl+Alt+F1" possiamo passare ad un
altro terminale (solitamente col processo "getty" attivo, quello
che ci chiede il login, per intenderci), questo avviene per
multiplexare il display. Ognuna di queste schermate è chiamata "
consolve virtuale". Nel caso dovessimo avere problemi ad accedere
ad una determinata console, possiamo farlo anche col comando:

```sh
 chvt 1
 # in questo caso switchiamo alla console 1
```


## Porte Seriali


Dispositivi che si collegano a porte seriali di tipo RS-232 e
simili sono speciali tipi di device terminale. Non possiamo fare
molto da command-line, in quanto ci sarebbero troppe impostazioni
da settare manualmente come il Baud rate o il flow control.
Questi device vengono indicati con la nomenclatura `/dev/ttyS*`,
mentre i dispositivi adattatori seriali USB si presentano con i
nomi `/dev/ttyUSB*` e `/dev/ttyACM*`.


## Porte Parallele

Questi device sono oggigiorno largamente sostituiti dai
dispositivi USB, le porte parallele unidirezionali hanno
nomenclatura `/dev/lp*`, mentre le porte parallele bidirezionali
hanno nomenclatura `/dev/parport`. Solitamente a questo tipo di
device sono associate stampanti, è utile sapere che possiamo
idealmente anche mandare direttamente i file da stampare ad una
stampante attraverso un semplice cat, come ad esempio:

```sh
 cat fileDiTesto > /dev/lp0
 # in questo caso stampo il file
 # menzionato attraverso la stampante lp0
```
anche se solitamente è necessario fornire alla stampante qualche
parametro in più; infatti server di stampa come CUPS sono fatti
appositamente per gestire il processo di stampa e le stampanti.


## Dispositivi Audio

Linux has two sets of audio devices. There are separate devices
for the Advanced Linux Sound Architecture (ALSA) system interface
and the older Open Sound System (OSS). The ALSA devices are in
the /dev/snd directory, but it’s difficult to work with them
directly. Linux systems that use ALSA support OSS backward-
compatible devices if the OSS kernel support is currently loaded.
Some rudimentary operations are possible with the OSS dsp and
audio devices. For example, the computerplays any WAV file that
you send to /dev/dsp. However, the hardware may not do what you
expect due to frequency mismatches. Furthermore, on most systems,
the device is often busy as soon as you log in.


## Creare Device File

In modern Linux systems, you do not create your own device files;
this is done with devtmpfs and udev (see 3.5 udev). However, it
is instructive to see how it was once done, and on a rare
occasion, you might need to create a named pipe. Il comando "
mknod" è utilizzato per creare device file, ad esempio:

```sh
 mknod /dev/sda1 b 8 2
 # crea un device file chiamato "/dev/sda1"
 # di tipo block "b", con major number 8 e minor number 2
```
Questo comando è stato utilizzato in passato anche per creare i
file dei device mancanti nella single-user mode nelle operazioni
di system recovery. In passato a nuovi aggiornamenti del kernel
era sempre problematico aggiornare la directory /dev, in quanto
la quantità di device supportata aumentava e quindi la
manutenzione dei device file non era affatto banale, oggi è tutto
molto più semplice grazie all'utilizzo di "udev" e "devtmpfs".


## udev

Il kernel linux può mandare notifiche ad un processo nello
user-space chiamato "udevd" quando rileva un nuovo dispositivo
sul sistema (ad esempio quando qualcuno collega una periferica
USB al sistema). Questo process nello user-space esamina le
caratteristiche del nuovo hardware, crea un device file e
performa tutte le eventuali operazioni di inizializzazione.
Questa è la teoria dietro "udevd", purtroppo nella realtà alcuni
device file sono necessari al boot, e quindi "udevd" deve essere
caricato molto presto, non deve fare da collo di bottiglia ed
inoltre udevd non può essere creato da un altro device file che
lui stesso dovrebbe creare; per risolvere questo problema è stato
creato "devtmpfs".

## devtmpfs


Questo filesystem è la risposta ai problemi citati di "udevd", in
quanto il kernel crea i device file necessari per la fase di
boot, e notifica ad udevd i nuovi dispositivi rilevati; una volta
ricevute le notifiche, udev non deve più ricreare i device file,
ma si occupa solo dell'inizializzazione dei vari device e delle
notifiche ai processi. Inoltre udevd si occupa di creare un
numero di link simbolici all'interno di /dev per una
identificazione più accurata dei dispositivi; ad esempio
/dev/disk, dove ogni disco collegato ha una o più entry.

## udevd nel dettaglio: Operazioni e Configurazioni


Il demone "udevd" opera in questo modo:

1. Il kernel manda una notifica chiamata "uevent" attraverso un
  link di rete interno ad udevd
2. udevd carica tutti gli attributi menzionati nell'uevent
3. udevd fa il parsing delle cosiddette "rules", e opera secondo
  queste regole

Le regole sono contenute nelle seguenti directory:

* /lib/udev/rules.d
* /etc/udev/rules.d



## Stesura di Regole per udev

Generalmente le regole sono composte da condizioni che devono
essere soddisfatte, che riconosceremo attraverso il simbolo "=="
e dichiarazioni che verranno applicate se le condizioni sono
soddisfatte, per le dichiarazioni si usa il simbolo "=", ora
preso un device possiamo vedere i propri attributi andando prima
a capire qual'è il percorso corrispettivo di un device che
vediamo attraverso ad esempio "lsusb" o "lsscsi" o "lspci" in "
/dev" , una volta trovato questo percorso in dev, possiamo
eseguire:

```sh
 udevadm info --name=/dev/bus/usb/002/003 --attribute-walk | less
 # in questo modo vediamo i vari attributi settati per il device
 # nel percorso menzionato, attenzione: ci interessa solo il primo
 # blocco, in quanto i successivi ripercorrono tutti i parent
 # device, che a noi la maggior parte delle volte potrebbero non
 # interessare
```
ora ad esempio possiamo vedere tra gli attributi:

```
ATTR{idProduct}=="a02f"
ATTR{idVendor}=="12bd"
```

e poi un altro interessante è:
```
SUBSYSTEM=="usb"
DRIVER=="usb"
```

Questi attributi ci possono essere utili per identificare il
device in modo fine, in tal modo siamo sicuri che quando
applicheremo le nostre regole non ci sbagliamo con altri device
appartenenti ad altri sottosistemi, ora possiamo provare a
scrivere una regola, che andrà in "/etc/udev/rules.d/nomeRegola.rules",
vediamo alcuni esempi di regole che possiamo applicare:

```sh
SUBYSTEM=="usb", ATTR{idVendor}=="12bd", ATTR{idProduct}=="a02f", ACTION=="add", MODE="0666"
```
in questo caso quando la regola verrà applicata sul device ci
saranno permessi di lettura e scrittura per tutti gli utenti,
in questo caso abbiamo solo applicato una regola sui permessi,
inoltre la condizione "ACTION=="add" indica appunto che la
regola deve essere eseguita se il device è stato inserito,
mentre al posto di add possiamo anche mettere "remove"; questo
indicherà delle possibili azioni da effetuare se il device
viene rimosso, ad ogni modo ora dobbiamo riavviare le regole di
udev affinchè la nuova configurazione abbia effetto, questo è
possibile con:

```sh
 sudo udevadm control --reload-rules
 # ricarica le regole
```
dobbiamo scollegare e ricollegare il device o riavviare

```sh
SUBSYSTEM=="usb", ATTR{idVendor}=="12bd", ATTR{idProduct}=="a02f", ACTION=="add", OWNER="root", GROUP="usbgroup", MODE="0660"
 ```

in questo caso impostiamo il proprietario del device e il
gruppo di appartenenza oltre ai diritti sul device

```sh
SUBSYSTEM=="usb", ATTR{idVendor}=="12bd", ATTR{idProduct}=="a02f", ACTION=="add", OWNER="root", GROUP="usbgroup", MODE="0660", SYMLINK+="ilMioJoyPad", RUN+="/usr/bin/myScript.sh"
```
in questo caso, oltre ad imporre il proprietario, il gruppo e i
permessi, creiamo un link simbolico al device che potremo
trovare in "/dev/ilMioJoyPad", e indichiamo uno script da
eseguire situato in "/usr/bin/myScript.sh"

```sh
SUBSYSTEM=="usb", ATTR{idVendor}=="12bd", ATTR{idProduct}=="a02f", ACTION=="add", OWNER="root", GROUP="usbgroup", MODE="0660", ATTR{authorized}="0"
```

in questo caso effettuiamo un "blacklist" del device, questo
può essere utile per diversi motivi, ad esempio vogliamo
scrivere driver o installare driver/moduli diversi da quelli
esistenti e quindi prevenire che il sistema in automatico
carichi i driver una volta collegato il device, oppure più
semplicemente disabilitare completamente un device

```sh
BUS=="usb", OPTIONS+="ignore_device"
```
in questo caso vengono disabilitate tutte le porte USB:

```sh
BUS=="usb", SUBSYSTEM=="block", OPTIONS+="ignore_device"
```

in questo caso vengono disabilitate tutti i dispositivi USB che
fungono da block device

N.B.: Le regole udev non contemplano le andate a capo, quindi ad
ogni linea, corrisponde una ed una sola regola udev. Inoltre
ricordare sempre di ricaricare le regole e scollegare e
riattaccare il device per vedere se le modifiche sono effettive o
meno.

Per effettuare un debugging e capire quali regole vengono
applicate da chi, possiamo trovare il path corrispettivo del
device nel filesystem sys, questo possiamo farlo attraverso:

```sh
 udevadm info --name=/dev/bus/usb/002/003 --attribute-walk | less
 # vediamo il percorso nel sysfs
```

```sh
 udevadm info -a -n /dev/myDevice
 # analogo al precedente ma più semplice
```
una volta trovato questo percorso possiamo effettuare:

```sh
 udevadm test /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.1
 # questo ci farà vedere le varie regole applicate da udev quali
 # file vengono letti, può anche essere usato direttamente
```


## Capire cosa è stato collegato e ricavare informazioni

Per capire cosa è stato collegato, possiamo effettuare le
seguenti operazioni, partiamo dal device interessato sconnesso,
ed eseguiamo in un terminale:

```sh
 udevadm monitor
 # monitora lo stato di udev
```
ora colleghiamo il nostro device, e vedremo delle righe a
schermo, tra queste ci sarà un percorso che corrisponderà al
percorso all'interno del filesystem "sysfs" del nostro device,
una volta visto il percorso, (attenzione nel percorso non vedremo
la directory iniziale "/sys", quindi è relativo a partire
dall'interno di "/sys") possiamo ricavare informazioni sul device
eseguendo:

```sh
 udevadm info /sys/percorso/menzionato/colComando/precedente --attribute-walk
 # questo mostrerà informazioni come anche
 # relativi node files creati all'interno della directory "/dev", una volta
```

dobbiamo ricordarci che se abbiamo il percorso in "/dev" a disposizione allora useremo
nel comando "udevadm info" l'opzione `--name` e specificheremo il percorso in
"/dev", mentre se abbiamo solo il percorso in "/sys" all-ora non dobbiamo mettere
l'opzione `--name`.


## udevadm

Il programma udevadm costituisce il tool di gestione per udevd.
Possiamo ad esempio ricaricare le regole di udev oppure innescare
eventi, ma forse la più potente delle caratteristiche di questo
programma è la capacità di poter cercare ed esplorare i
dispositivi di sistema e l'abilità di monitorare gli uevents,
quando udevd li riceve dal kernel.

Vediamo alcuni esempi:

```sh
 udevadm info --query=all --name=/dev/sda
 # mostra tutte le informazioni, gli attributi e le regole per il device
 # file /dev/sda
```
```sh
 udevadm monitor
 # monitora i vari eventi, qui vedremo la sezione "kernel" che rappresenta i
 # messaggi che arrivano dal kernel e la sezione "udev" relativa a quello
 # che udev invia ai vari processi
```
```sh
 udevadm monitor --kernel
 # mostra solo i messaggi kernel
```
```sh
 udevadm monitor --udev
 # mostra solo i messaggi udev
```
```sh
 udevadm monitor --property
 # mostra informazioni aggiuntive sui vari messaggi come ad esempio gli
 # attributi, questo mi permette anche di visualizzare i file che vengono
 # creati in /dev quando inserisco un nuovo device nel computer
```

C'è molto da sapere su udev, ad esempio possiamo anche filtrare i
messaggi per device, inoltre è utile sapere che il D-Bus (Desktop
Bus) system utilizzato per l'interprocess communication (IPC) ha
un demone chiamato "udisks-daemon" che rimane in ascolto dei vari
messaggi mandati da udevd per montare dischi in automatico o
notificare altri processi del desktop della presenza dei nuovi
dischi rilevati.

