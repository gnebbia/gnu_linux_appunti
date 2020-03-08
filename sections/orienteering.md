# Orientarsi in un sistema GNU/Linux

In questa sezione analizzeremo e capiremo quali sono le directory principali in
un sistema GNU/Linux.
Le funzioni relative alle directory di un filesystem utilizzato
su macchine GNU/Linux viene specificato all'interno del documento
chiamato FHS (Filesystem Hierarchy Standard), oppure da terminale
attraverso il comando "man hier"; di seguito viene riportato lo
scopo delle principali directory:

* /boot
	 Contiene informazioni e file per fare il boot della macchina,
    solitamente questa directory risiede su una partizione a
    parte, ed è importante non avere una partizione troppo
    piccola di boot, in quanto, quando viene compilato un nuovo
    kernel i file vengono messi all'interno di questa directory
* /bin
	 E' la directory in cui sono contenuti gli eseguibili
* /sbin
	 E' la directory in cui sono contenuti i "system binaries" la
    maggior parte di questi programmi sono eseguibili solo
    dall'amministratore di sistema (root), in quanto riguardo il "
    system management"
* /lib
	 E' dove sono collocate le librerie shared, mentre in /usr/lib
    sono contenute sia quelle static che quelle shared
* /opt
	 E' la directory dove vengono installati i programmi che non
    sono inclusi nei repository, o cosiddetti "third-party
    software"
* /media
	 E' dove vengono montati automaticamente dispositivi "media"
    rimovibili, come floppy disk, CD-ROM, DVD, USB Disk Drives,
    etc...
* /usr
	 E' dove risiedono la maggior parte dei programmi appartenenti
    all userland, tutto quello che installiamo dai repository
    della nostra distro va qui, eccetto probabili casi
    particolari, contiene una struttura simile a quella di /,
    infatti possiamo vedere directory come "/usr/bin", "/usr/sbin"
    , "/usr/lib", ecc...
* /usr/local
	 E' dove risiedono i programmi compilati manualmente sulla
    macchina
* /usr/share/man
	 E' dove risiedono le pagine di man e la documentazione
* /usr/share/info
	 Simile alla precedente
* /usr/include
	 E' dove risiedono gli header file utilizzati dal compilatore C
* /usr/lib
	 E' dove sono contenuti i moduli (o driver) che possono essere
    caricati (o che vengono caricati) dal kernel, i cosiddetti "
    loadable kernel modules"
* /mnt
	 E' dove vengono effettuate le mount manuali, di filesystem di
    rete, o partizioni fisse sul nostro sistema
* /root
	 E' la home directory per l'utente root
* /var
	 E' una directory adibita a:
    ∗ file di log
    ∗ file di mail
    ∗ file di cache
    ∗ mysql
    ∗ librerie
    ∗ directory di default per l'installazione di siti web
* /tmp
	 E' una directory temporanea ed è utilizzata dai programmi per
    scrivere ed elaborare dati temporaneamente, di default
    solitamente viene automaticamente svuotata tra i vari reboot
    di sistema
* /var/tmp
	 E' simile a "/tmp" solo che non viene ripulita tra i reboot
    di sistema
* /mnt
	 E' è una directory adibita a quando si montano le partizioni
* /dev
	 E' un filesystem dinamico che risiede in RAM, le sue entrate
    sono create e rimosse dal kernel e da udev; in questa
    directory sono presenti tutti i file che rappresentano
    dispositivi hardware, in linux ogni componente hardware viene
    rappresentato da un file, vari comandi possono essere mandati
    ai dispositivi o si può leggere da essi, ad esempio:
    ∗ `cat /dev/random > somefile.txt` # scriverà delle cose
       # casuali all'interno del file somefile.txt

	N.B.: E' da notare che nonostante sia /dev che /sys operano
    col kernel, in realtà /sys è ad un livello d'astrazione più
    basso e generalmente quello che vediamo in /dev è fornito da
    un'elaborazione di quello che c'è in /sys
* /sys
	 E' un filesystem virtuale che risiede in RAM, fornisce
    strutture dati dal kernel e loro attributi e i collegamenti
    che hanno allo userspace, per poter effetuare un tuning
    dell'hardware con maggiore flessibilità
* /proc
	 E' un filesystem virtuale che risiede in RAM, praticamente
    effettua delle richieste di informazioni al kernel, ed è
    adibito a contenere informazioni sul sistema linux, la
    distribuzione e l'hardware, questo filesystem viene creato da
    linux; seguendo il concetto del "tutto è un file",
    all'interno di questo filesystem virtuale troviamo
    informazioni su:
    ∗ Componenti Hardware
      * /proc/cpuinfo -- informazioni sulla cpu
      * /proc/meminfo -- informazioni sulla memoria
      * /proc/loadavg -- average system load
      * /proc/version -- current linux version
      * /proc/maps -- contiene gli indirizzi di memoria usati dal processo
    ∗ Informazioni sui processi attivi sul sistema: sono
      strutturati secondo directory che prendono il nome
      dall'identificativo del processo (PID) e contengono:
      * cwd -- link alla directory di lavoro del processo
      * exe -- link all'eseguibile
      * root -- directory del processo padre
      * environ -- variabili d'ambiente lette dal processo
	Possiamo usarlo anche per vedere che file ha aperto un
    processo, infatti in ogni cartella relativa ai processi
    esiste una directory chiamata "fd", questa contiene i file
    aperti, possiamo quindi capire quali file apre un processo, o
    se un processo effettivamente spia dei file
* /var/log
	 E' dove vengono salvati i log
* /etc/init.d
	 E' la directory dove vengono inseriti programmi o servizi che
    possono essere riavviati, avviati o bloccati, inoltri sono
    contenuti i processi che vengono avviati subito dopo
    l'inizializzazione del kernel. Nello specifico i file
    contenuti in questa directory sono script che rispondono a
    comandi di start, stop, restart e (quando supportato) reload.
    Questi script possono essere invocati direttamente o più
    comunemente attraverso altri trigger costituiti da link
    simbolici nelle directory "/etc/rc?.d"

N.B.: La ".d" alla fine del nome di un file sta ad indicare che
quel file è una directory che contiene file di configurazione o
script per una particolare situazione.

N.B.2: Le directory /sys e /proc sembrano simili, ma in realtà la
prima riguarda più parametri e file operanti sull'hardware mentre
la seconda si occupa delle stesse cose, però riguardanti i
processi; /dev e /sys sono state seprate in quanto questo
permette un tuning dell'hardware più fine e pulito.

N.B.3: Il kernel è situato in un file chiamato "vmlinuz", o
anticamente "vmlinux", ed è collocato o in /vmlinuz o più
comunemente in "/boot/vmlinuz".


