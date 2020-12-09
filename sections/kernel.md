# Linux Kernel

Quando si parla della gestione del kernel, dobbiamo tenere a
mente il comando "uname", vediamo alcuni flag del comando uname
che possono esserci utili:

* `-a` visualizza tutte le informazioni
* `-s` nome del kernel
* `-n` nome computer, visualizzabile anche col comando "hostname"
* `-r` kernel release
* `-v` versione kernel
* `-m` architettura della macchina, visualizzabile anche col # comando "arch"
* `-p` tipo di processore
* `-i` piattaforma hardware
* `-o` sistema operativo

Il comando uname mostra informazioni dal file "/proc/version",
un'altro file importante è "/proc/cmdline", in questo file sono
contenute alcune informazioni relative all'avvio del kernel in
fase di boot. Innanzitutto possiamo visualizzare le informazioni
sul kernel che stiamo runnando attraverso:

```sh
 cat /boot/config-$(uname -r)
 # apre il file di configurazione
 # del kernel che stiamo runnando, utile, soprattutto nel momento
 # in cui dovessimo avere più kernel
```

## Capire il Kernel

Per capire il kernel, uno strumento utile è la documentazione,
possiamo installare la documentazione su distro RH-based con:

```sh
 yum install kernel-doc
 # installa la documentazione del kernel
```
mentre su distro Debian-based la documentazione è contenuta
all'interno dei sorgenti, o comunque possiamo scaricarla dal sito
ufficiale [www.kernel.org/doc||Kernel Linux].

Una volta installata la documentazione possiamo trovarla
attraverso:

```sh
 ls /usr/share/doc/kernel-doc-2.6.32/Documentation
 # entra nella
 # directory contenente la documentazione, su distro RH-based
```
```sh
 ls /usr/src/linux/Documentation
 # entra nella directory
 # contenente la documentazione, su distro Debian-based
```
ad esempio possiamo trovare la documentazione relativa alla
directory /proc, a partire dalla directory "Documentation/"
attraverso la directory "/filesystems/proc.txt"; potrebbe essere
una buona idea creare un'alias alla directory della
documentazione se pensiamo di visualizzarla spesso


## Tipi di Kernel e file relativi

I file relativi al kernel possiamo trovarli all'interno della
directory "/boot", ora all'interno di questa directory abbiamo
tutti i kernel installati, presupponiamo di avere un solo kernel
installato sulla macchina, allora possiamo vedere due tipo di
directory:

* /boot/vmlinux
  era la directory dove una volta venivano messi
  i file del kernel, questa cartella non è compressa
* /boot/vmlinuz
  è la directory dove attualmente sono messi i
  file del kernel, questa cartella è compressa con algoritmo gzip

il nome delle directory sopracitate non è completo in quanto
queste directory hanno un nome composto anche dalla versione del
kernel ad esempio "/boot/vmlinuz-3.16.0-4-amd64" possiamo vedere
che tipo di kernel abbiamo e con cosa è stato compresso
attraverso il comando "file", quindi eseguiamo:

```sh
 file /boot/vmlinuz-3.16.0-4-amd64
 # visualizza informazioni sul
 # file compresso, evidenziando il tipo di compressione
```
Normalmente quando si compila un kernel abbiamo varie opzioni per
il file in uscita, innanzitutto viene comunque generato il file
non compresso "vmlinux", poi di default viene generato anche il
file "vmlinuz" che è quello compresso con algorirmo bzip2, ma nel
caso volessimo effettuare un altro tipo di compressione abbiamo a
disposizione:

```sh
 zImage
 # file compresso con algoritmo gzip, ma che non può
 # essere più grande di 512KB
```
```sh
 bzImage
 # file compresso ancora con algoritmo gzip, il "bz" può
 # confondere in quanto porta il lettore a pensare all'algoritmo "
 # bzip2" ma questo non centra nulla, l'unica differenza con
 # l'algoritmo zImage è che in questo caso i 512KB (limite del
 # zImage) possono essere superati
```
```sh
 uImage
 # an image file that has a U-Boot wrapper (installed by
 # the mkimage utility) that includes the OS type and loader
 # information, is a small kernel image with modified header for
 # Uboot enabling U-boot to load this kernel image, comunque le
 # ultime versioni di U-Boot possono eseguire boot anche di kernel
 # di tipo zImage, un uImage comunque non è altro che un'immagine
 # zImage + 64 Byte di header per U-Boot
```


## File associati ad un kernel

Ad un kernel solitamente vengono associati alcuni file:

```sh
 # un file chiamato "System.map"
```

* In Linux, the System.map file is a symbol table used by the
    kernel. A symbol table is a look-up between symbol names and
    their addresses in memory. A symbol name may be the name of a
    variable or the name of a function. The System.map is
    required when the address of a symbol name, or the symbol
    name of an address, is needed. It is especially useful for
    debugging kernel panics and kernel oopses. The kernel does
    the address-to-name translation itself when `CONFIG_KALLSYMS`
    is enabled so that tools like ksymoops are not required. If
    we run a kernel with no (or an incorrect) System.map, you'll
    periodically see annoying warnings like: "System.map does not
    match actual kernel", possiamo verificare questo usando
    programmi come "ps", se durante "ps" vediamo questi messaggi
    allora il file System.map non matcha il kernel

```sh
 # un file chiamato "initrd.img" (questo compare solo quando in
 # alcune configurazioni, in cui viene utilizzato un initial RAM
 # disk)
```
E' buona convenzione mantenere i nomi del kernel e dei file
relativi con la stessa dicitura, nel caso di manutenzione manuale
dei kernel, in quanto una dicitura scorretta porterebbe ad uno
scorretto funzionamento del kernel.

Ad esempio, se abbiamo due kernel su una macchina, un kernel
linux versione 4.1 chiamato "vmlinuz-4.1-mioKernel" e un altro
kernel linux versione 4.2 chiamato "vmlinuz-4.2-tuoKernel",
allora i file relativi al primo kernel dovranno essere:

```sh
 # System.map-4.1-mioKernel
```
```sh
 # initrd.img-4.1-mioKernel
```
mentre i file relativi al secondo kernel saranno:

```sh
 # System.map-4.2-tuoKernel
```
```sh
 # initrd.img-4.2-tuoKernel
```
## Initial RAM disk


L'initial RAM disk è il sistema che si occupa di caricare un
filesystem temporaneo durante il processo di boot del kernel atto
a caricare il vero filesystem e fare in modo che i driver possano
interfacciarsi col vero filesystem. Il kernel linux non può
accedere immediatamente dopo il boot al filesystem, gli mancano i
driver necessari per farlo, che devono essere caricati come
moduli, ma per caricarli come moduli abbiamo bisogno di accedere
al filesystem, abbiamo un cane che si mangia la coda, quindi è
stato pensato di utilizzare questo filesystem temporaneo che si
occupa di risolvere questo problema. Un'altra soluzione sarebbe
stata quella di includere i moduli all'interno del kernel linux,
ma includere molti moduli ingrandisce significativamente
l'immagine del kernel. Esistono due tipi di Initial RAM disks:

```sh
 initrd
 # utilizzato nelle meno recenti versioni del kernel,
 # precedenti alla 2.6.13, costituiva un'immagine compressa
 # montata attraverso /dev/ram, il modulo usato in initrd deve
 # essere compilato all'interno del kernel, spesso quindi un block
 # device driver "ext2" o "cramfs"
```
```sh
 initramfs
 # è il nuovo tipo di initial RAM disks, è un archivio
 # cpio, viene scompattato dal kernel in tmpfs che è un filesystem
 # minimale che diventa il filesystem radice temporaneo, il
 # vantaggio di questo schema è quello non aver bisogno di driver
 # del filesystem o dei dispositivi di base che devono essere
 # compilati nel kernel, quindi presenta anche una sequenza di
 # boot più veloce, per questioni storiche possiamo ancora vedere
 # delle immagini initramfs che però vengono chiamate initrd,
 # ricordare che queste sono in realtà initramfs, in quanto solo
 # chi usa versioni del kernel precedenti alla 2.6 deve gestire
 # initrd
```
Nota che in entrambi i sistemi, l'immagine è ancora chiamata "initrd".
In pratica questo initial ram disk, è comunemente
utilizzato in configurazioni in cui c'è bisogno di effettuare
delle operazioni preliminari prima di montare il vero e proprio
filesystem root, quindi viene utilizzato in molti scenari in cui
non si hanno boot normali (o comuni, insomma parlo dei PC da
casa) del sistema, ma boot più complicati, ad esempio voglio
eseguire il boot di un disco utilizzante partizionamento logico
LVM, o utilizzante una configurazione RAID, o un disco criptato,
o altri svariati scenari di cui non sono a conoscenza
personalmente.

## Visualizzare il kernel e l'Initial RAM Disk


All'interno della directory /boot esiste anche l'immagine
dell'initial RAM disk, infatti questa si chiamerà "
initramfs-versioneKernel", eseguire un "file" su questo file, ci
mostrerà che è compresso attraverso gzip, possiamo quindi pensare
di decomprimerlo, una volta decompresso, possiamo scompattarlo
attraverso "cpio -id nomeArchivio", vedremo un vero e proprio
filesystem, a grandi linee questo è un mini sistema operativo
atto ad avviare il vero e proprio sistema operativo.

## Parametri del Kernel


Quando un kernel viene lanciato, il boot loader gli passa dei
parametri che gli indicano come dovrebbe partire; questi
parametri possono specificare un largo insieme di opzioni e
behaviour del kernel, come ad esempio, la quantità di messaggi di
diagnostica che quest'ultimo deve produrre, oppure opzioni
specifiche ad un determinato driver. Possiamo visualizzare le
opzioni con cui è stato lanciato un kernel in running attraverso:

```sh
 cat /proc/cmdline
```
vediamo alcuni importanti parametri:

```sh
 root=UUID=70ccd6e7-6ae6-44f6-812c-51aab8036d29
 # indica al
 # kernel dove è collocata la partizione di root, possiamo anche
 # specificare il device con root=/dev/sda2, ma dobbiamo ricordare
 # gli svantaggi di specificare un device file anzichè un UUID
```
```sh
 ro
 # questo parametro indica al kernel di essere lanciato in
 # modalità read-only fino a quando non parte lo user-space,
 # questo è utile, in quanto solitamente all'avvio avviene un file
 # system check (fsck), e se il filesystem è montato in scrittura,
 # non possiamo eseguirlo in modo sicuro; dopo il check, il
 # filesystem viene rimontato in modalità read-write
```
Nel caso in cui il kernel incontra un parametro che non capisce,
allora lo salva e lo passa al gestore di demoni (ad esempio init,
openrc, upstart, systemd, ecc...), ad esempio il parametro "-s",
non è capito dal kernel, ma da init, è compreso, e viene lanciato
il sistema in single-user mode.

## Compilare un kernel


Possiamo scaricare il kernel da sito web [www.kernel.org||Sito Ufficiale del Kernel Linux]
, una volta scaricato, possiamo decomprimerlo attraverso:

```sh
 sudo tar -Jxvf linux-3.18.5.tar.xz -C /usr/src/kernels/
 # decomprime ed estrae l'archivio "xz"
```
ora creiamo un link nella directory padre, eseguiamo:

```sh
 sudo ln -s /usr/src/kernels/linux-3.18.5 /usr/src/linux
 # crea
 # un link della directory del pacchetto appena estratto nella
 # directory padre chiamata "linux", in quanto in fase di
 # compilazione il sorgente deve essere in "/usr/src/linux".
```
Per compilare il kernel, abbiamo bisogno di alcuni prerequisiti,
nelle distro Red-Hat based possiamo eseguire:

```sh
 sudo yum groupinstall "Development Tools"
 # installa tutti i
 # tool richiesti per la compilazione, per vedere quali pacchetti
 # vengono installati possiamo eseguire "yum groupinfo "
 # Development Tools"
```
```sh
 sudo yum install ncurses-devl
 # modulo richiesto per fornire un
 # menu per la selezione dei moduli basato su ncurses
```
Ora per compilare il kernel, assicuriamoci di essere nella
directory giusta che è "/usr/src/linux", quindi eseguiamo:

```sh
 # cd /usr/src/linux
```
Poi eseguiamo:

```sh
 # make clean
```
```sh
 make menuconfig
 # apre il menu grafico per selezionare i moduli
 # preferiti, una volta eseguita la configurazione desiderata,
 # possiamo selezionare "save" e poi "exit" fino a quando non esce
 # dal programma, possiamo premere " ?" per avere aiuto e
 # descrizione su una specifica voce del menu, oppure "/" per
 # cercare voci nel menu, una volta trovate, possiamo posizionarci
 # alle voci con i numeri, ad esempio "1" ci riporta alla
 # posizione della prima voce trovata eccetera.
```
Se eseguiamo ora un "ls -a" dovremmo visualizzare un file
chiamato ".config" che rappresenta la configurazione che abbiamo
salvato, ora possiamo eseguire:

```sh
 make bzImage
 # crea un'immagine compressa di tipo bzImage, qui
 # possiamo sostituire volendo "bzImage" con "zImage" o altro tipo
 # di compressione che vogliamo
```
```sh
 make modules
 # compila i moduli
```
queste due voci, in realtà possono essere sostituite dal comando:

```sh
 make all -j 5
 # se ad esempio il nostro processore ha 4 core,
 # si usa la regola pratica, numeroProcessori+1
```
una volta compilato, il kernel può essere trovato nella directory
"arch/<mia_architettura>/boot"

```sh
 make modules_install
 # installa i moduli nelle directory giuste
```
```sh
 make install
 # viene installato il nuovo kernel, viene creata
 # (almeno dovrebbe farlo) una nuova voce per il bootloader e usa "
 # dracut" o "mkinitrd" per generare l'initial RAM disk,
 # quest'operazione può anche essere fatta manualmente andando a
 # copiare il file "arch/x86_64/vmlinuz" e il file "System.map" in
 # /boot, dove è buona norma copiare vmlinuz con nome "
 # vmlinuz-releaseNumber" e il file "System.map" come "
 # System.map-releaseNumber" dove "releaseNumber" è la versione
 # del kernel
```
per essere sicuri che la voce sia creata possiamo verificare il
nuovo kernel nella directory /boot, e poi eseguire:

```sh
 grub-mkconfig -o /boot/grub/grub.cfg
 # questo comando su alcune
 # distro è "grub2-mkconfig -o /boot/grub/grub.cfg, questo ci
 # permette di aggiornare il menu di boot
```
Una volta eseguita l'installazione possiamo avviare il nuovo
kernel al reboot, e verificare che l'installazione sia andata a
buon fine attraverso il comando:

```sh
 uname -r
 # visualizza la versione del kernel corrente
```
N.B.: Per compilare un kernel 4.3 ad esempio, dobbiamo avere i
kernel headers della stessa versione o di una versione
precedente, in quanto sono retro-compatibili, ma non vanno bene
headers di una versione più recente.

## Configurazione del Kernel


Esistono alcune regole da praticone, diciamo per configurare il
kernel, a differenza della nostra esigenza, ad esempio alcune
scelte comuni sono:

```sh
 # caricare una configurazione di default:
```

* questo è possibile attraverso "make defconfig", ci permette
    di selezionare la configurazione di default che hanno
    elaborato gli sviluppatori del kernel, potrebbe non andare
    bene in molti casi, possiamo comunque partire da questa per
    andare poi ad eseguire "make menuconfig" e selezionare i
    moduli necessari, ad ogni modo se eseguiamo "make menuconfig"
    senza un "make defconfig" è uguale, in quanto se non c'è un
    file di configurazione .config, questo viene di default messo
    da "defconfig", nota che molte configurazioni ad hoc sono
    messe a disposizione, per scorrerle possiamo navigare nella
    directory "arch/$ARCH/configs", ad esempio nella directory "
    arch/powerpc/configs" possiamo trovare configurazioni per la
    Nintendo WII (i.e., "wii_defconfig") eccetera, è buona norma
    una volta individuata la configurazione interessata, per
    scrivere la configurazione desiderata la stringa:


    ∗ make ARCH=arm sunxi_defconfig #scrive il file di
      configurazione .config per la configurazione "
      sunxi-defconfig"

    ora possiamo eseguire il comando make con le compilazione
    desiderate

```sh
 # caricare la vecchia configurazione più opzioni nuove messe a
 # default (utile negli aggiornamenti di kernel)
```

* in questo caso ci basterà eseguire un "make olddefconfig"
    nella directory del kernel senza poi andare a modificare
    nulla, questo ci permetterà di usare la vecchia
    configurazione del kernel e mette le nuove features aggiunte
    ad opzioni di defaule (solitamente sicure)

```sh
 # caricare la vecchia configurazione più i moduli utilizzati dal
 # kernel corrente interrogando lsmod (utile negli aggiornamenti
 # di kernel)
```

* in questo caso ci basterà eseguire un "make localmodconfig" e
    rispondere con invio (cioè opzione di default) per le nuove
    voci, una volta fatto, avremo una configurazione compatibile
    con quella attuale, è molto simile a "make oldconfig" la
    differenza sta nel fatto che oltre a caricare il vecchio file
    di configurazione interroga anche lsmod per i moduli caricati
    attualmente dal kernel. NOTA: Tutto quello non collegato al
    computer non verrà incluso, si consiglia quindi prima di
    eseguire questa procedura di montare tutte le periferiche che
    utilizziamo spesso "chiavette USB", "Card Flash/MMC"
    eccetera, per includere le altre cose, ci basterà caricare il
    vecchio kernel e vedere il nome del module (e se dipende da
    altri moduli), poi utilizzando la funzione di ricerca nel
    menuconfig li aggiungiamo manualmente. E' interessante lo
    scenario in cui volessimo ad esempio compilare il kernel per
    un altro computer, quello che possiamo fare è:

    ∗ target$ `lsmod > /tmp/mylsmod`
    ∗ target$ `scp /tmp/mylsmod host:/tmp`
    ∗ host$ `make LSMOD=/tmp/mylsmod localmodconfig`

```sh
 # trovare i moduli necessari a partire da una configurazione di
 # default
```

* questo è simile al primo punto, ma a sua differenza abbiamo
    bisogno di moduli che non sono stati aggiunti dalla
    configurazione di default, questi possiamo aggiungerli da una
    live eseguendo un "lspci -k", "lsusb -v" ed "lspcmcia" se
    necessario e una volta trovati i nomi dei moduli, possiamo
    cercarli ed abilitarli nel kernel attraverso il "make
    menuconfig" e poi il tasto "/", una volta trovati possiamo
    abilitarli schiacciando i tasti numerici della tastiera per
    posizionarci direttamente sulle voci di menu trovate dalla
    ricerca

N.B.: Potrebbero a volte esserci problemi con kernel che non
caricano correttamente device come alcune schede video (AMD),
quindi driver "radeon" o schede di rete wifi (tipo moduli come
iwlwifi), questo può essere dovuto al fatto che abbiamo incluso
dei driver come "built-in", infatti alcuni driver hanno la
necessità di essere caricati come moduli, in quanto hanno bisogno
di caricare dei firmware che di per sè sono automaticamente
moduli, a meno che non sia abilitata la lista dei firmware da
caricare come built-in attraverso l'opzione "
CONFIG_EXTRA_FIRMWARE".

SPIEGAZIONE DETTAGLIATA: I driver caricati come built-in vengono
automaticamente caricati all'avvio del kernel, e non possono
nella fase di avvio andare a caricare driver moduli che sono
sull'hard disk, quindi siccome alcuni device hanno driver che
devono richiamare a loro volta dei firmware per essere caricati
correttamente, se il driver viene caricato "built-in" non può
accedere nella fasi di boot al disco per caricare il driver
modulo, quindi abbiamo due soluzioni a questo problem:

```sh
 # o vengono caricati sia driver che firmware come moduli
 # (soluzione consigliata, che comporterebbe semplicemente il
 # caricamente del driver del dispositivo come modulo anzichè "
 # built-in")
```
```sh
 # o caricare entrambi come built-in, andando a caricare il driver
 # del dispositivo come "built-in" e aggiungendo l'opzione "
 # CONFIG_EXTRA_FIRMWARE" con i path in cui sono contenuti i
 # firmware, che permette di avere i firmware "built-in" e quindi
 # caricati in RAM all'avvio.
```
N.B.: Ricordare oltre a caricare i driver della scheda audio, ad
includere i codec disponibili per la scheda audio.

Nel caso usassimo un initramfs, the only thing we will need in
the kernel is CONFIG_BLK_DEV_INITRD=y If you want to build your
initramfs image into the kernel. This way you won't need to pass
an initrd option to your bootloader, but when you update the
initramfs image, you will also need to rebuild the kernel. If you
do want to do this, give the path to the initramfs.cpio file in
Initramfs source file(s).

General Setup —> `[*]` Initial RAM filesystem and RAM disk
(initramfs/initrd) support () Initramfs source file(s)

## Alternative a "make menuconfig"


Vediamo alcune alternative a make menuconfig, utili in vari casi:

```sh
 make help
 # questo mostra le varie opzioni che abbiamo per i
 # vari step della compilazione, è molto utile nel caso
 # dimenticassimo una delle opzioni di compilazione
```
```sh
 make allmodconfig
 # imposta la maggior parte delle cose come
 # modulo, potrebbe generare un kernel inutilizzabile
```
```sh
 make allnoconfig
 # This option creates a config file that will
 # only add essential code to the kernel; this answers no to as
 # many questions as possible. This can sometimes make a kernel
 # that does not work on the hardware it was compiled on
```
```sh
 make allyesconfig
 # This option creates a config file that will
 # answer yes to as many questions as possible
```
```sh
 make nconfig
 # Text-based colored menus - curses (libcdk5-dev)
 # must be installed
```
```sh
 make ${PLATFORM}_defconfig
 # Creates a config file using values
 # from arch/$ARCH/configs/${PLATFORM}_defconfig, utile per
 # cross-compilazione
```
Nota che le distro user friendly utilizzano comunemente due
soluzioni per caricare in automatico i driver necessari, una
soluzione è:

```sh
 # caricare il filesystem utilizzato per la root partition come
 # built-in e tutto il resto dei driver come moduli
```
```sh
 # caricare tutto come modulo ed utilizzare un initramfs che
 # gestisce il corretto boot di tutto
```
## Sezioni di Configurazione


The main menu if the configuration programs is split out into the
following sections:

```sh
 # a. General setup Provides overall Linux options.
```
```sh
 # b. Enable loadable module support
```

* Provides the ability to load kernel modules. Sub-options
    provide additional capabilities related to modules.

```sh
 # c. Enable the block layer
```

* This needs to be enabled to be able to mound any disk drive.

```sh
 # d. Processor type and features
```

* The defaults will set most of these properly for your
    hardware, but you may want to disable options that may not
    apply such as Multi-core scheduler support. You can also set
    the number of CPUs that the kernel supports.

* You can also set support for some specific laptop brands.

```sh
 # e. Power management and ACPI options
```

* Controls ACPI (Advanced Configuration and Power Interface) or
    APM (Advanced Power Management) BIOS support. These options
    are most useful on laptops.

```sh
 # f. Bus options (PCI etc) Generally only PCI suport is needed
 # here on newer systems. Go with the defaults.
```
```sh
 # g. Executable file formats / Emulations
```

* Generally only ELF support is needed.

```sh
 # h. Networking support
```

* This is where networking (including wireless) is enabled.
    Netfilter (firewall) capabilities are also defined here. The
    defaults are generally satisfactory.

```sh
 # i. Device Drivers
```

* This is one of the most important configuration areas. If you
    want the hardware to work, it has to be enabled with a
    driver. Check your devices on a currently running system with
    `lspci -v` to confirm what hardware you have. Enable any
    network or usb devices that you may have. Video drivers and
    sound cards are also enabled here.

* Take your time in this section and make sure you add drivers
    for all the hardware you want to use.

```sh
 # j. Firmware Drivers
```

* The default is generally OK here.

```sh
 # k. File systems
```

* If you want reiser, ext4, jfs, xfs, kernel automounter
    support, or nfs, you need to select those capabilities here.

```sh
 # l. Kernel hacking
```

* If you make changes here, you better know why.

```sh
 # m. Security options
```

* The defaults are generally OK here too.

```sh
 # n. Cryptographic API
```

* Specialized crytographic capabilites. The defaults are OK
    here.

```sh
 # o. Virtualization
```

* Allows using your Linux host to run other operating systems
    inside virtual machines (guests).

```sh
 # p. Library routines
```

* Various CRC routines. The defaults are generally appropriate
    here unless you have special requirements.

## Cross Compilazione del Kernel


Per effettuare una cross compilazione del kernel quello che
dobbiamo fare è settare due variabili d'ambiente:

```sh
 ARCH
 # questa variabile d'ambiente contiene un'informazione
 # sull'architettura target, i valori ammissibili corrispondono
 # alle architetture che vediamo nella directory "arch/" come ad
 # esempio arm, blackfin, cris, powerpc, x86, x86_64, eccetera.
```
```sh
 CROSS_COMPILE
 # questa variabile d'ambiente contiene il
 # prefisso alla toolchain di cross compilazione
```
In alcuni casi può essere utile utilizzare una configurazione
pre-esistente per farlo possiamo controllare nel path "
arch/architetturaInteressata/configs/" le varie configurazioni, e
se per esempio l'architetturaInteressata in questione è "arm"
allora eseguiamo:

```sh
 make ARCH=arm wii_defconfig
```
una volta scritta la configurazione possiamo continuare con la
compilazione.

Ad esempio nel caso volessimo compilare un kernel per
architettura arm, una volta installata la toolchain di
compilazione, eseguiamo:

```sh
 make -j5 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- zImage

 # cross compilo un kernel, ricordiamo che zImage è solo un
 # esempio, potrei anche non specificare il tipo di immagine, solo
 # che a volte abbiamo dei vincoli in funzione del boot loader che
 # utilizziamo
```
una volta compilato possiamo compilare i moduli con:

```sh
 make -j5 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- modules
```
e poi possiamo installare i moduli andando ad eseguire:

```sh
 make -j5 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf-
 # INSTALL_MOD_PATH=/path/where/i/have/rootfs modules_install

 # questo installerà i module, nella directory specificata,
 # attenzione la directory specificata dovrà essere il rootfs del
 # sistema ospite poi ci penserà make a selezionare la directory
 # giusta dove installare i moduli
```


## Pulizia dei Sorgenti del Kernel


Per eseguire una pulizia dei file per un'altra compilazione, in
quanto il makefile precedentemente ha già generato dei file
oggetto per dei sorgenti, per evitare conflitti abbiamo diverse
alternative:

```sh
 make clean
 # elimina la maggior parte dei file intermedi e dei
 # file oggetti
```
```sh
 make mrproper
 # rimuove tutti i file intermedi, nella rimozione
 # è incluso il file ".config", questo viene utilizzato per
 # ripristinare il source tree del kernel allo stati in cui era
 # appena scaricato, estratto o clonato (con git), si chiama "
 # mrproper" in quanto una serie di prodotti per la pulizia in
 # alcuni paesi del mondo è chiamata così
```
```sh
 make distclean
 # simile a mrproper ma elimina anche file di
 # patch e file di backup generati magari da editor di testo,
 # insomma non rimane proprio nulla
```


## Kernel Runtime Management e Troubleshooting


Una parte importante del nostro kernel è la capacità di caricare "
device drivers" cioè moduli che vengono caricati che ci
permettono di interfacciarci con l'hardware esterno, o interno. I
moduli sono gestiti attraverso i comandi "lsmod", "modprobe" e
con le opzioni fornite dalla directory "/etc/modprobe.d/". Per
visualizzare i moduli correntemente caricati dal kernel possiamo
eseguire:

```sh
 lsmod
 # visualizza i driver correntemente caricati, formattando
 # il contenuto del file "/proc/modules"
```
Si rimanda alla sezione sui Moduli, per un approfondimento sulla
loro gestione

## Sysctl


The kernel provides some parameters that may be set at runtime
through sysctl. the format is `sysctl ${parameter} = ${value}` or
`sysctl -a` to display all, ad esempio per abilitare la nostra
macchina al forwarding dei pacchetti possiamo utilizzare. Vediamo
alcuni esempi di applicazione:

```sh
 sysctl -a
 # visualizza le possibili opzioni
```
```sh
 sysctl net.ipv4.ip_forward=1
 # imposta l'impostazione
 # ip_forward abilitata, questa permette alla nostra macchina di
 # dare da forwarder, questo è equivalente ad eseguire "echo 1 >
 # /proc/sys/net/ipv4/ip_forward"
```

