

## Premessa sui dispositivi di memoria

Ogni dispositivo di memoria, può essere suddiviso in più
partizioni, ma prima di poter essere suddiviso bisogna scegliere
una cosidetta "tabella delle partizioni", che costituisce uno
schema di partizionamento del disco. I due schemi più utilizzati
peri sistemi Personal Computer sono:

* DOS (o MBR)
    * MBR (Master Boot Record): è un sistema di partizionamento che
        supporta fino a un massimo di 4 partizioni, anche se è stata
        escogitata una soluzione attraverso le cosiddette "partizioni
        estese", che possono contenere una o più "partizioni logiche";
        l'MBR inoltre non supporta partizioni con capacità maggiore a 2TB
* GPT
    * GPT (GUID Partition Table or Globally Unique Identifier
        Partition Table): è sistema di partizionamento più recente,
        supera limiti dovuti al vecchio schema MBR)

E' da notare che però sui dischi d'avvio di un sistema operativo,
la scelta dello schema di partizionamento deve essere accurata in
quanto, in base all'interfaccia firmware della macchina la mia
scelta potrebbe essere forzata ad un determinata tabella di
partizioni.


### Nota sui firmware

Nei meno recenti personal computer, esisteva un firmware chiamato
BIOS (Basic Input/Output System), questo è un sistema veramente
basilare che si occupa di effettuare un esiguo numero di
operazioni primitive atte il corretto avvio della macchina, una
delle operazioni è costituita dall'avvio del boot-loader, cioè il
programma che si occupa di gestire l'avvio di un sistema
operativo da un disco. Secondo il BIOS, il disco da cui avviare
il boot-loader può essere sia con tabella delle partizioni GPT
che MBR. Nei sistemi più recenti esiste un meccanismo più
complesso composto da uno strato più ad alto livello rispetto al
firmware, questo strato è chiamato UEFI (Unified Extensible
Firmware Interface) e costituisce un'interfaccia tra il firmware
e i sistemi operativi, in questo caso la tabella delle partizioni
deve necessariamente essere GPT, almenochè il sistema non
supporti la modalità CSM (Compatibility Support Mode) che
permette di emulare la modalità BIOS, permettendo a sistemi che
non supportano UEFI di avviarsi come se avessero BIOS.

I disk con tabella di partizionamento GPT sono comunque oggigiorno piu'
frequenti, questo perche':

* MBR ha dei limiti da design, ad esempio la massima capacita' supportata per un
  e' di 2 TiB, ma oggigiorno dischi di queste dimensioni o maggiori sono
  abbastanza comuni
* Microsoft si e' conformato a UEFI, e con UEFI non e' possibile eseguire boot
  di dischi con partizionamento MBR

## Schemi di Partizionamento Minimali


Per quanto riguarda schemi di partizionamento minimali possiamo
distinguere alcune configurazioni possibili e comunemente
utilizzate nella stragrande maggioranza dei casi. Queste
verranno analizzate nelle sottosezioni seguenti.


###  BIOS+MBR+GRUB

In questo caso non c'è nessun vincolo sulle partizioni, possiamo installare:

* 1 partizione di root /
* 1 partizione di /boot (consigliabile, ma nella pratica, non necessaria)

In realtà su alcuni sistemi molto molto vecchi, è consigliabile
per sicurezza fare comunque una partizione di /boot in quanto
questa è la prima partizione/directory che viene cercata dal BIOS
e alcuni BIOS vecchi non riescono a concepire una
directory/partizione di boot troppo grande. Per alcune features
potrebbe essere necessaria una partizione da 1MB, questo accade
ad esempio quando abbiamo più sistemi operativi diversi (si parla
di Windows), dove i bootloader magari hanno bisogno di più
spazio, in quanto non ci stanno tutti nei 446 byte del boot
sector

### BIOS+GPT+GRUB

In questo caso dovremo creare:

* 1 partizione da 1MB marcata come BIOS Boot o `bios_grub` (a differenza del programma con cui creiamo le partizioni)
* 1 partizione di root /

non è necessaria una partizione separata di /boot.

N.B.:It's necessary to have a separate /boot partition only if
you want full disk encryption or something similar, or if you
have an ancient computer that wouldn't work with a 64-bit distro
anyway, a separate /boot also means you can reinstall without
having to recompile a kernel.

N.B.:we need a 1MB partition because the whole grub stage1 is too
big to fit in the 446 bytes of the mbr boot sector, it needs to
"spill over" somewhere. on GPT, you must reserve this spill over
space explicitly, while on bios+mbr it's not mandatory because it
can (mostly) safely embed between the MBR and the first
partition, but it's not safe on GPT there are other things which
could decide to try to use that dead space, so it's still
recommended to reserve the space explicitly.

N.B.:some BIOSes have a bug with booting from a GPT label in BIOS
mode, Lenovo and HP are known for this.


### UEFI+GPT+GRUB

Nel caso si avesse un sistema UEFI, allora dobbiamo creare

* 1 partizione ESP (EFI System Partition) che può andare dai 20MB
  ai 550MB con filesystem vfat (dipende, da se ci metto dentro i
  kernel o no, metterci i kernel ha questo vantaggio "well one
  advantage is that if you efistub-enable them, then you can
  still boot them if grub went missing or broke"), questa deve
  essere montata da qualche parte, solitamente è in /boot oppure
  in /boot/efi, anche se posso mettere qualsiasi directory,
  l'unica restrizione è quella di montarla prima di installare
  grub
* 1 partizione di root /

N.B.: Quando si parla di partizioni "/boot" dobbiamo ricordare
che possiamo scegliere se farle ext2 o ext4, a questo punto
dobbiamo considerare la compatibilità del boot loader, nel caso
di GRUB ormai è tutto supportate però:

* ext2: più piccolo overhead, siamo sicuri che funziona con tutte
  le versioni di grub
* ext4: overhead maggiore, dovrebbe funzionare sulle versioni più
  recenti ed alcuni dicono che nonostante abbiamo overhead
  maggiore, avere ext4 velocizzi il boot

## Altri Esempi Pratici di Partizionamento

### UEFI+GPT (Option 1: Boot and Home on Different Partitions)

There will be 1.00 MiB of empty space at the beginning of the disk and 1.00 MiB at
the end of the disk.
*   /dev/sda1
    Size: 512 MiB
    File system: FAT32
    Flags: boot & esp
    Code: EF00
    Label: ESP
    Mount point: /boot/efi

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    File system: linux-swap
    Flags: None
    Code: 8200
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: 512 MiB
    File system: ext2
    Flags: None
    Code: 8300
    Label: BOOT
    Mount point: /boot Therefore /boot/grub/ will be on this partition if you use GRUB.

*   /dev/sda4
    Size: e.g. 64 GiB (128 GiB if the drive is big)
    File system: ext4
    Flags: None
    Code: 8300
    Label: ROOT
    Mount point: / (root)

*   /dev/sda5
    Size: 1.00 MiB less than the remaining disk space
    File system: ext4
    Flags: None
    Code: 8300
    Label: HOME
    Mount point: /home


### UEFI+GPT (Option 2: Only Home on Different Partition)

You could use this scheme if you are not interested in having /boot on its own
partition.

There will be 1.00 MiB of empty space at the beginning of the disk and 1.00 MiB at
the end of the disk.
*   /dev/sda1
    Size: 512 MiB
    File system: FAT32
    Flags: boot & esp
    Code: EF00
    Label: ESP
    Mount point: /boot/efi

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    File system: linux-swap
    Flags: None
    Code: 8200
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: e.g. 64 GiB (128 GiB if the drive is big)
    File system: ext4
    Flags: None
    Code: 8300
    Label: ROOT
    Mount point: / (root)

*   /dev/sda4
    Size: 1.00 MiB less than the remaining disk space
    File system: ext4
    Flags: None
    Code: 8300
    Label: HOME
    Mount point: /home


### UEFI+GPT (Option 3: Everything on a Single Partition)

You could use this scheme if you are not interested in having /boot and /home on
their own partitions.

There will be 1.00 MiB of empty space at the beginning of the disk and 1.00 MiB at
the end of the disk.
*   /dev/sda1
    Size: 512 MiB
    File system: FAT32
    Flags: boot & esp
    Code: EF00
    Label: ESP
    Mount point: /boot/efi

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    File system: linux-swap
    Flags: None
    Code: 8200
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: 1.00 MiB less than the remaining disk space
    File system: ext4
    Flags: None
    Code: 8300
    Label: ROOT
    Mount point: / (root)


### BIOS+GPT (Option 1: Boot and Home on Different Partitions)

You could use this scheme if you are not interested in having /boot and /home on
their own partitions.

There will be 1.00 MiB of empty space at the beginning of the disk and 1.00 MiB at
the end of the disk.
*   /dev/sda1
    Size: 1 MiB
    File system: Unformatted
    Flags: bios_grub
    Code: EF02
    Label: Not Applicable
    Mount point: Not Applicable

*   /dev/sda2
    Size: 512 MiB
    File system: ext2
    Flags: None
    Code: 8300
    Label: BOOT
    Mount point: /boot

*   /dev/sda3
    Size: 16 GiB for a computer with 16 GiB of RAM*
    File system: linux-swap
    Flags: None
    Code: 8200
    Label: SWAP
    Mount point: None

*   /dev/sda4
    Size: e.g. 64 GiB (128 GiB if the drive is big)
    File system: ext4
    Flags: None
    Code: 8300
    Label: ROOT
    Mount point: / (root)

*   /dev/sda5
    Size: 1.00 MiB less than the remaining disk space
    File system: ext4
    Flags: None
    Code: 8300
    Label: HOME
    Mount point: /home


### BIOS+GPT (Option 2: Only Home on a Different Partition)

You could use this scheme if you are not interested in having /boot on its own
partition.

There will be 1.00 MiB of empty space at the beginning of the disk and 1.00 MiB at
the end of the disk.
*   /dev/sda1
    Size: 1 MiB
    File system: Unformatted
    Flags: bios_grub
    Code: EF02
    Label: Not Applicable
    Mount point: Not Applicable

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    File system: linux-swap
    Flags: None
    Code: 8200
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: e.g. 64 GiB (128 GiB if the drive is big)
    File system: ext4
    Flags: None
    Code: 8300
    Label: ROOT
    Mount point: / (root)

*   /dev/sda4
    Size: 1.00 MiB less than the remaining disk space
    File system: ext4
    Flags: None
    Code: 8300
    Label: HOME
    Mount point: /home


### BIOS+GPT (Option 3: Everything on a Single Partition)

You could use this scheme if you are not interested in having /boot and /home on
their own partitions.

There will be 1.00 MiB of empty space at the beginning of the disk and 1.00 MiB at
the end of the disk.
*   /dev/sda1
    Size: 1 MiB
    File system: Unformatted
    Flags: bios_grub
    Code: EF02
    Label: Not Applicable
    Mount point: Not Applicable

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    File system: linux-swap
    Flags: None
    Code: 8200
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: 1.00 MiB less than the remaining disk space
    File system: ext4
    Flags: None
    Code: 8300
    Label: HOME
    Mount point: / (root)


### BIOS+MBR (Option 1: Boot and Home on Different Partitions)

You could use this scheme if you are not interested in having /boot and /home on
their own partitions.

There will be 1.00 MiB of empty space at the beginning of the disk.
*   /dev/sda1
    Size: 512 MiB
    Type: Primary
    File system: ext2
    Flags: boot
    Label: BOOT
    Mount point: /boot

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    Type: Primary
    File system: linux-swap
    Flags: None
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: e.g. 64 GiB (128 GiB if the drive is big)
    Type: Primary
    File system: ext4
    Flags: None
    Label: ROOT
    Mount point: / (root)

*   /dev/sda4
    Size: remaining disk space
    Type: Primary
    File system: ext4
    Flags: None
    Label: HOME
    Mount point: /home


### BIOS+MBR (Option 2: Only Home on a Different Partition)

You could use this scheme if you are not interested in having /boot on its own
partition.

There will be 1.00 MiB of empty space at the beginning of the disk.
*   /dev/sda1
    Size: 16 GiB for a computer with 16 GiB of RAM*
    Type: Primary
    File system: linux-swap
    Flags: None
    Label: SWAP
    Mount point: None

*   /dev/sda2
    Size: e.g. 64 GiB (128 GiB if the drive is big)
    Type: Primary
    File system: ext4
    Flags: boot
    Label: ROOT
    Mount point: / (root)

*   /dev/sda3
    Size: remaining disk space
    Type: Primary
    File system: ext4
    Flags: None
    Label: HOME
    Mount point: /home


### BIOS+MBR (Option 3: Everything on a Single Partition)

You could use this scheme if you are not interested in having /boot and /home on
their own partitions.

There will be 1.00 MiB of empty space at the beginning of the disk.
*   /dev/sda1
    Size: 16 GiB for a computer with 16 GiB of RAM*
    Type: Primary
    File system: linux-swap
    Flags: None
    Label: SWAP
    Mount point: None

*   /dev/sda2
    Size: remaining disk space
    Type: Primary
    File system: ext4
    Flags: boot
    Label: HOME
    Mount point: / (root)


### BIOS+MBR (Option 4: More than 4 Partitions)

If you want to have more than four partitions — let’s say you wanted to have a
separate NTFS partition, for example — you would need to use an Extended
Partition.

There will be 1.00 MiB of empty space at the beginning of the disk.

*   /dev/sda1
    Size: 512 MiB
    Type: Primary
    File system: ext2
    Flags: boot
    Label: BOOT
    Mount point: /boot

*   /dev/sda2
    Size: 16 GiB for a computer with 16 GiB of RAM*
    Type: Primary
    File system: linux-swap
    Flags: None
    Label: SWAP
    Mount point: None

*   /dev/sda3
    Size: Remainder of disk
    Type: Extended
    File system: Not applicable
    Flags: None
    Label: Not applicable
    Mount point: Not applicable

*   /dev/sda4
    Will not exist

*   /dev/sda5
    Size: e.g. 128GiB
    Type: Logical
    File system: ext4
    Flags: None
    Label: ROOT
    Mount point: / (root)

*   /dev/sda6
    Size: e.g. 256GiB
    Type: Logical
    File system: ext4
    Flags: None
    Label: HOME
    Mount point: /home

*   /dev/sda7
    Size: remaining space on the disk
    Type: Logical
    File system: NTFS
    Flags: None
    Label: NTFS
    Mount point: /media/NTFS


## Partizioni Separate vs Partizione Unica

A molti utenti principianti di GNU/Linux viene consigliato
implementare una partizione unica per l'installazione del
sistema, ma perchè allora usare partizioni separate per le varie
directory come "/home", "/usr", "/var", "/tmp" e "/", i motivi
principali che stanno alla base di questa scelta sono:

1. Minimizing loss: If /usr is on separate partition a damaged
  /usr does not mean that you cannot recover /etc
2. Security: / cannot be always ro (/root may need to be rw etc.)
  but /usr can. It can be used to made ro as much as possible
3. Using different filesystems: I may want to use different
  system for /tmp (not reliable but fast for many files) and
  /home (have to be reliable). Similary /var contains data while
  /usr not so /usr stability can be sacrifice but not so much as /tmp
4. Duration of fsck: Smaller partitions means that checking one is faster
5. Mentioned filling up of partions, although other method is quotas

Altre buone ragioni per tenere la partizione "/home" separata dal
resto sono:

 * Crittografia: Possiamo di decidere i nostri dati, in quanto
   nella partizione home sono contenuti tutti i dati personali
 * Persistenza: Possiamo mantenere i nostri dati, senza dover
   ricopiare tutto quando vogliamo eseguire una formattazione

Invece altre buone ragioni per tenere la partizione "/usr"
separata dal resto sono:

* A separate /usr can be useful if you have several machines
  sharing the same OS. They can share a single central /usr
  instead of duplicating it on every system. /usr can be mounted
  read-only; mount a partition read-only is useful to keep
  malicious users (or processes) from overwriting or replacing
  binaries there with trojans. So if your ssh binary lives in
  /usr/local/bin and /usr/local is mounted read-only, it's going
  to be tough for anyone to replace that binary

Nota sulla partizione di swap: Inoltre è bene tenere a mente che
la partizione di swap deve essere almeno della dimensione della "
RAM" nel caso si volesse utilizzare l'opzione di sospensione del
computer.

ATTENZIONE: Directory essenziali al booting del sistema (e cioè
/etc ed /usr, fatta eccezione per /boot) devono essere sulla
stessa partizione del rootfs (cioè "/") o in userspace montati
nelle prime fasi dell'avvio da initramfs.


## Creazione di partizioni e loro gestione

I dispositivi di memoria (come tutti gli altri dispositvi)
possono essere visualizzati nella directory /dev/. Una volta
localizzato il nostro dispositivo in /dev, ad esempio /dev/sda,
possiamo gestire le partizioni attraverso diversi programmi
esistenti come il famoso fdisk (se la tabella delle partizioni è
MBR) o gdisk (se la tabella delle partizioni è GPT), esiste anche
un programma molto diffuso oggigiorno chiamato "parted" che
supporta sia sistemi MBR che GPT, ha anche un front-end grafico
chiamato "gparted".


## Dischi e Geometria delle Partizioni

Un Hard Disk, è composto da uno o più piatti magnetici, su questi
piatti magnetici c'è un braccio elettro-meccanico che simile ad
un disco in vinile scorre delle circonferenze, che vengono
chiamate cilindri, in quanto in una vista 3D, più circonferenze
su piatti diversi e quindi aventi lo stesso asse, possiamo
vederli come cilindri. Ogni cilindro può essere diviso in più
parti chiamate "settori"; questo modo di pensare ai dischi è
chiamato CHS (Cylinder-Head-Sector), dove Head, sta ad indicare
la punta del braccio elettro-meccanico che scorre il disco. Un
cilindro se è acceduto da una sola testina (Head) può essere
chiamato "traccia". Ci sono strumenti in Linux e su altri sistemi
operativi che riportano il numero di cilindri e tracce, ma questo
numero è in realtà fittizio, in quanto, non tiene conto di molti
fattori caratteristici dei moderni dispositivi di memoria;
infatti il sistema operativo utilizza l'LBA (Logical Block
Addressing) per fare riferimento ad uno specifico blocco
dell'HDD. Un file utile a vedere dove inizia una partizione è:

```sh
 cat /sys/block/sda/sda2/start
 # visualizza il byte a cui inizia
 # la partizione sda2 a partire dall'inizio dell'HDD o SSD, se è
 # divisibile per 4096 (2MB) per un SSD allora va bene, altrimenti
 # potrei avere performance ridotte, per cattivo allineamento
```
## fdisk


nella seguente sezione si farà riferimento ad fdisk. Vediamo
alcuni esempi applicativi di fdisk:

```sh
 fdisk -l /dev/sda
 # elenca le partizioni attuali sul
 # dispositivo /dev/sda
```
```sh
 fdisk /dev/sda
 # avvia il programma fdisk sul drive sda, in
 # modo da permetterci una gestione delle partizioni
```
ora da fdisk abbiamo diverse opzioni:

```sh
 p
 # stampa le partizioni attuali
```
```sh
 m
 # lista dei comandi a disposizione all'interno di fdisk
```
```sh
 n
 # crea una nuova partizione
```

* quando viene creata una nuova partizione, viene richiesto il
  settore iniziale, qui normalmente premiamo Invio, e per il
  settore finale, diamo valori come +300M (per dire 300MB a
  partire dal settore iniziale), oppure +5G (per dire 5GB a
  partire dal settore iniziale)

```sh
 d
 # elimina una partizione
```
```sh
 q
 # esce senza salvare le modifiche
```
```sh
 w
 # scrive le modifiche sul disco, le modifiche non vengono
 # effettuate, finchè non viene lanciato questo comando
```
```sh
 a
 # rende una partizione bootable
```
```sh
 t
 # permette di specificare il tipo di partizione, questo è
 # solo un ID della partizione, non viene effettuata nessuna
 # formattazione, l'operazione di formattazione deve essere
 # comunque effettuata successivamente alla gestione delle
 # partizioni di fdisk
```

* Quindi il tipo di partizione è solo un byte, un flag
    all'interno della tabella delle partizioni che aiuta il
    sistema operativo a capire come gestire quella partizione

Un'altra opzione potrebbe essere quella di copiare una tabella
delle partizioni da un device all'altro, questo è possibile
attraverso un programma chiamato "sfdisk", vediamo come:

```sh
 sfdisk -d /dev/sdb | sfdisk --force /dev/sdc
 # in questo caso
 # andiamo a copiare la tabella delle partizioni di sdb su sdc
```
Una volta che le partizioni sono state create, avremo sda1, sda2,
eccetera, possiamo poi formattarle utilizzando il comando mkfs,
ad esempio:

```sh
 mkfs -t ext4 /dev/sda1
 # formatta la partizione sda1 del disco "
 # sda" con filesystem ext4
```
N.B.: Un file di configurazione molto importante è /etc/fstab,
infatti coi comandi "mount -a", e "umount -a" possiamo montare e
smontare tutto quello che è specificato all'interno di questo
file.


## Parted

N.B.: Parted non chiede di confermare le modifiche all'utente, le
applica direttamente, quindi attenzione a quello che si fa,
inoltre per impratichirci possiamo provare ad eseguirlo su un
dispositivo USB su cui abbiamo dati non importanti.

Il programma "parted", è un tool molto comodo per gestire le
partizioni in quanto supporta sia i sistemi MBR che GPT, vediamo
come usarlo:

```sh
 parted -l
 # visualizza informazioni sul disco, sulla tabella di
 # partizioni e sulle varie partizioni
```
se vogliamo essere sicuri di aver applicato delle modifiche ad
una tabella di partizioni possiamo utilizzare vari modi per
verificare i cambiamenti ad esempio:

```sh
 # visualizzare il file /proc/partitions
```
```sh
 # visualizzare il contenuto di /sys/block/device/ o in /dev
```
```sh
 blockdev --rereadpt /dev/sdf
 # rilegge la partition table del
 # device /dev/sdf
```
## Analizzare, formattare, montare e smontare una partizione


## Analisi del filesystem di partizioni


Prima che il computer possa usare qualsiasi dispositivo di
memoria (come Hard Drive, CD-ROM o dischi di rete), il sistema
operativo deve renderlo accessibile attraverso il filesystem del
sistema in uso; questo processo è chiamato "mounting", e noi
possiamo accedere ai file solo di dispositivi che sono stati
montati. Prima di montare un filesystem dobbiamo però sapere il
tipo di filesystem che possiede. Nel caso non conoscessimo il
tipo di filesystem di un determinato dispositivo, possiamo fare
uso del comando:

```sh
 blkid
```
o in alternativa:

```sh
 file -sL /dev/deviceName
```
o in alternativa:

```sh
 df -hT
```
o in alternativa:

```sh
 fsck -N /dev/sda1
```
Altri comandi utili per analizzare filesystem sono:

```sh
 lsblk
 # visualizza device e partizioni con uno schema ad
 # albero, molto carino
```
```sh
 mount | column -t
 # visualizza le partizioni attualmente
 # montate
```
## Formattazione di partizioni


Una volta che conosciamo il tipo di filesystem, possiamo
formattare il nostro dispositivo con:

```sh
 mkfs -t ext3 /dev/myDevice
 # formatta il dispositivo myDevice e
 # attraverso il flag "-t" specifico il tipo di filesystem con cui
 # formattarlo, se non specifico il tipo allora di default verrà
 # usato il filesystem ext2fs
```
```sh
 mke2fs -t ext3 /dev/sdb1
 # completamente equivalente al comando
 # precedente
```
```sh
 mkfs.ext4 -U "ab955ff4-fc2e-40f2-97b3-6fd37b10e7fa" /dev/sdb1
 # in questo modo formatto la partizione indicata, utilizzando
 # l'UUID specificato, questo può essere utile, per fare in modo
 # di non andare tute le volte a modificare l'UUID nel file "fstab"
 # ogniqualvolta formattiamo
```
```sh
 mke2fs -L myUSBKey /dev/sdb1
 # imposta la label "myUSBKey"
 # sulla partizione sdb1
```
```sh
 mkfs -t ext3 /dev/myDevice -m 10
 # formatta il dispositivo come
 # nel caso precedente, ma in questo caso lo spazio di riserva
 # (reserve free space) è cambiato al 10%, (di default è al 5%) lo
 # spazio di riserva è spazio riservato all'utente root che gli
 # altri utenti non possono usare, e per l'online defrag
```
```sh
 mkfs -t ext3 /dev/myDevice -c
 # in questo caso viene effettuato
 # un bad block check (controllo su settori danneggiati del disco)
 # su ogni settore della partizione prima di crearla, per
 # verificare il corretto funzionamento del dispositivo
```
```sh
 mkisofs -V nomeLabel -J -r -o /tmp/boot.iso /boot
 # crea un
 # file iso chiamato boot.iso, "-o" specifica il nome del file di
 # output, della directory "/boot" e diamo come nome alla label "
 # nomeLabel", attraverso il flag "-V", "-J" e "-r" indicano di
 # usare un filesystem simile a quello dei CD, nello specifico "-J"
 # indica l'opzione Joliet, cioè il poter utilizzare nei nomi dei
 # file sia lettere maiuscole che minuscole, nel caso fosse
 # omessa, i nomi sarebbero tutti in maiuscolo, il comando "
 # mkisofs --help" può tornare utile
```

Nei casi precedenti sono stati creati solo filesystem di tipo "ext3"
ma per sapere invece quali sono le opzioni disponibili col
flag "-t" attraverso il comando mount, o comunque per capire cosa
inserire in funzione di un determinato filesystem risultato da
uno dei comandi precedenti, allora possiamo usare "man mount";
oppure eseguire un:

```sh
 ls -l /sbin/mkfs.*
 # visualizza tutti i possibili comandi per
 # formattare
```


## Mounting e unmounting di partizioni

Per montare un filesystem possiamo effettuare:

```sh
 mount /dev/myDevice /home/user/mountDir
 # monta il dispositivo
 # di tipo ext2fs myDevice nella directory "mountDir"
```
```sh
 mount -t ntfs-3g /dev/myDevice /home/user/mountDir
 # monta il
 # dispositivo myDevice con filesystem "ntfs" in "mountDir"
```

When talking about mountpoints we can have mountpoints that are:
* shared,
* slave,
* private,
* unbindable

mount point that is shared may be replicated as many times as needed,
and each copy will continue to be the exact same. Other mount points
that appear under a shared mount point in some subdirectory will appear
in all the other replicated mount points as it is.

A slave mount point is similar to a shared mount point with the small
exception that the “sharing” of mount point information happens in
one direction. A mount point that is slave will only receive mount and
unmount events. Anything that is mounted under this replicated mount
point will not move towards the original mount point.

A private mount point is exactly what the name implies: private. Mount
points that appear under a private mount point will not be shown elsewhere
in the other replicated mount points unless they are explicitly mounted
there as well.

An unbindable mount point, which by definition is also private, cannot
be replicated elsewhere through the use of the bind flag of the mount
system call or command.

A volte potrebbe capitare che per qualche motivo non ci faccia
montare partizioni ntfs o che il montaggio avviene correttamente ma
non abbiamo i permessi di scrittura.
Questo avviene perchè magari il sistema era in
ibernazione in windows o per il fast restarting, o per shutdown
impropri, allora posso usare "ntfsfix" un programma incluso nei
pacchetti che mi abilitano il supporto per ntfs, ed eseguiamo:

```sh
 sudo ntfsfix /dev/sda5
 # dove "/dev/sda5" in questo caso è il
 # nome della partizione NTFS corrotta, a volte può essere
 # necessario utilizzare il flag "-b" per ripristinare i bad block
```
```sh
 mount -o loop /home/img.iso /mnt/iso
 # montiamo un'immagine ISO
```
```sh
 mount -a
 # monta tutti i filesystem indicati nel file fstab
```
```sh
 mount UUID=a9011c2b-1c03-4288-b3fe-8ba961ab0898 /home/extra
 # monta il device con l'UUID specificato nella directory menzionata
```
```sh
 mount -n -t ntfs-3g /dev/myDevice /home/user/mountDir
 # monta
 # un device senza scrivere sul file /etc/mtab, utile quando si
 # deve fare troubleshooting in un ambiente read-only o in
 # single-user mode, in quanto questo file non è disponibile in
 # alcune modalità di recovery o di funzionamento del sistema
 # operativo, ma ci serve comunque montare un device
```
```sh
 mount -n -o remount /
 # rimonta un filesystem, in modalità
 # read-write, se si è in modalità read only
```
```sh
 mount | column -t
 # visualizza i filesystem montati
```
comandi di mount utili quando ad esempio dobbiamo installare un
sistema da terminaleo quando dobbiamo utilizzare un sistema da
live cd sono:

```sh
 mount -t proc proc /mnt/gentoo/proc
 # monta un filesystem di tipo proc
```
```sh
 mount --rbind /sys /mnt/gentoo/sys
 # l'opzione "--rbind" permette
 # di eseguire un mount di un filesystem su un altra directory,
 # esiste anche "--bind", ma quest'ultimo esegue un mount di un
 # file su un altro file
```
```sh
 mount --make-rslave /mnt/gentoo/sys
 # in questo caso indichiamo
 # che il filesystem montato nel comando precedente opera secondo
 # politiche "rslave", questo significa che se qualcosa viene
 # modificato dal padre, le modifiche vengono applicate anche al
 # filesystem figlio, mentre non vale il viceversa
```
```sh
 mount --rbind /dev /mnt/gentoo/dev
 # stessa operazione avviene
 # anche per il filesystem /dev
```
```sh
 mount --make-rslave /mnt/gentoo/dev
```
Per smontare una periferica, possiamo usare:

```sh
 umount /home/user/mountDir
 # smonta il dispositivo che era
 # stato montato nella directory "mountDir"
```
```sh
 sync; umount
 # in questo caso scriviamo tutto quello che
 # dobbiamo scrivere sul device montato e smontiamo
```
in alternativa possiamo usare:

```sh
 umount /dev/myDevice
 # smonta il dispositivo myDevice
```
entrambi i comandi hanno esattamente lo stesso effetto. Il
comando sync è utilizzato per scrivere i dati in cache sul
dispositivo/i, una storia interessante è che nei tempi antichi in
cui venivano usate versioni ormai troppo vecchie di Unix prima di
spegnere un sistema bisognava sempre lanciare la coppia di
comandi "sync" e "park", dove il secondo serviva a posizionare le
testine dei dischi in una posizione di riposo, questo preveniva
in caso di sbalzi di tensione o blackout di spaccare il disco, in
quanto la testina con forti sbalzi di segnale poteva spaccare il
disco;

N.B.: Per abilitare il diritto di poter scrivere, leggere o
eseguire su un dispositivo di memoria esterno, abbiamo due
opzioni:

```sh
 # se la periferica è specificata nel file fstab, allora dovremo
 # abilitare l'opzione "user" e settare una appropriata umask
```
```sh
 # se la periferica non è specificata nel file fstab, possiamo:
```

* cambiare i diritti della directory dove il filesystem viene
    montato
* cambiare gruppo di appartenenza alla directory dove il
    filesystem viene montato


## Gestire file immagine e partizioni contenute

Per poter gestire file immagine, sfruttiamo la funzionalità di
loopback del kernel di linux, quindi possiamo creare un device
virtuale per contenere l'immagine, possiamo eseguirlo con:

```sh
 sudo modprobe loop
 # questo monta il modulo loop, per poter
 # sfruttare le funzionalità di loopback
```
```sh
 sudo losetup -f
 # questo ci permette di ottenere un nuovo
 # device di loopback, ad esempio /dev/loop0 o se questo è già
 # presente allora /dev/loop1 e così via
```
```sh
 sudo losetup /dev/loop0 myimage.img
 # questo permette di
 # montare un'immagine su un dispositivo
```
```sh
 sudo partprobe /dev/loop0
 # questo indica al kernel che
 # /dev/loop0 non è una partizione semplice ma al suo interno
 # esistono diverse partizioni, quindi indica al kernel di
 # caricare queste partizioni
```
Adesso possiamo ad esempio aprire le nostre partizioni e
modificarle o formattarle con:

```sh
 sudo gparted /dev/loop0
```
possiamo anche montarle attraverso una semplice mount, infatti ad
esempio nel caso volessimo montare /dev/loop0p1 eseguo:

```sh
 mount /dev/loop0p1 /mnt/
 # una volta montata posso
 # copiare/rimuovere e fare quello che voglio, come se fosse una
 # comune chiavetta USB
```
ipotizziamo di voler effettuare lo shrinking di una partizione
sul file immagine, allora quello che dobbiamo eseguire è:

```sh
 fdisk -l myimage.img
 # in questo modo vediamo quando finisce la
 # partizione, dobbiamo leggere la voce "End" ad esempio se questa
 # fosse "9181183" allora per troncare la partizione dopo quel
 # byte dovremmo effettuare
```
```sh
 truncate --size=$[(9181183+1)*512] myimage.img
```
per rimuovere un device di loopback eseguiamo:
```sh
 sudo losetup -d /dev/loop0
 # rimuove il device di loopback /dev/loop0
```


## Dove montare una partizione

Esistono diverse posizioni sui sistemi GNU/Linux dove per
convenzione vengono montate le partizioni, vediamo alcuni casi
d'uso:

* /mnt/
  utilizzata per filesystem di dispositivi non rimovibili
  dalla macchina, come partizioni fisse su uno dei nostri hard
  disk, o filesystem di rete, è il posto adatto anche per mount
  che vengono effettuate manualmente
* /media/
  utilizzata per dispositivi che rimuoviamo dalla
  nostra macchina, come chiavette USB, hard disk esterni, floppy
  disk, CD-ROM, DVD, eccetera.
* /run/media/username/
  permette di effettuare le stesse cose di
  "/media", ma differenziando per username riesco a controllare
  meglio i diritti che ogni utente ha sulla partizione


## Visualizzare le partizioni attualmente montate


Per visualizzare le partizioni montate in un determinato istante
possiamo procedere in 3 modalità analoghe:

```sh
 mount
 # esegue il comando mount senza flag, questo visualizza i
 # filesystem montati
```
```sh
 cat /etc/mtab
 # visualizza il file "mtab", questo è un file di
 # sola-lettura e non ha senso modificarlo, costituisce il system
 # runtime mount database
```
```sh
 cat /proc/mounts
 # visualizza il file "mounts", questo è un
 # file di sola-lettura e non ha senso modificarlo
```


## Recovery di partizioni ntfs

Un buon programma per recuperare file da partizioni corrotte o
file che sono stati cancellati su partizioni ntfs è "testdisk".
Una volta avviato con i diritti di root (i.e. sudo) basterà
fargli fare un "analyze" sull'Hard Disk desiderato per recuperare
iniziale il processo di analisi e ricostruzione della partizione,
una volta ricostruita comparirà una voce in basso "P" (n.b. : in
questo programma le azioni disponibili sono sempre o in basso o
in alto) che ci permetterà di elencare i file sulla partizione ed
eventualmente copiarli.


## Il file "fstab"

Il file "fstab" situato in /etc/fstab è un file utilizzato per
mantenere informazioni su filesystem statici (cioè filesystem che
sono frequentemente montati su un computer). Aggiungere una voce
al file fstab è semplice, è bene tenere a mente che generalmente
è composto da 6 colonne:

* la prima, rappresenta il percorso del dispositivo (e.g., /dev/sda1)
* la seconda, rappresenta la directory in cui vogliamo montare il
  nostro dispositivo (eg /mnt/mySda1)
* la terza, reppresenta il tipo (o i tipi) di filesystem (ad ogni
  modo è possibile anche l'opzione "auto", che lascia al kernel
  il compito di rilevare il tipo di filesystem sul dispositivo)
* la quarta, è utilizzata per indicare diverse opzioni separate
  da una virgola, le opzioni possono essere:
    * uid: imposta il proprietario dei file che vengono montati
    * umask: imposta la umask di default per la partizione montata
    * auto/noauto: monta/non monta in automatico la partizione dopo
        il boot, ATTENZIONE, è importante non impostare questa
        opzione per chiavette USB o altri dispositivi che vengono
        normalmente rimossi dal computer, in quanto a boot, se non
        trova la partizione che deve montare entra in una "Emergency
        Mode" o in genere una shell di recovery. E' una modalità
        utile invece per partizioni che montiamo in automatico al
        boot, come una partizione dati utente eccetera.
    * exec/noexec: permette/non permette di eseguire file
        eseguibili contenuti nella partizione montata (utile per
        evitare virus che cercano di essere lanciati in automatico)
    * ro/rw: il filesystem può essere montato in sola lettura (read
        only) o in lettura e scrittura (`read & write`)
    * user/nouser: permette/non permette a utenti normali (cioè non
        root) di montare il dispositivo
    * sync/async: imposta la scrittura dei file sincrona/asincrona,
        cioè quando ad esempio viene lanciato un comando di copia
        verso una chiavetta se l'opzione sincrona è attiva, i file
        vengono copiati subito nel momento del lancio del comando,
        mentre nel caso di modalità asincrona i file vengono copiati
        quando la partizione viene smontata o quando viene eseguito
        il comando "sync", è buona norma utilizzare infatti il
        comando "sync" prima di smontare una partizione montata con "
        async"; meglio utilizzare la modalità "async", in quanto ci
        permette di velocizzare il tutto consumando meno anche i
        dispositivi, la modalità sync non andrebbe mai utilizzata, va
        utilizzata solo nel caso in cui vogliamo smontare un
        dispositivo senza effettuare "umount", o dove comunque le
        politiche di caching vengono gestite autonomamente come in un
        ramdisk (memoria RAM) o in un database, insomma in casi d'uso
        molto particolari, i sistemi operativi Microsoft, solitamente
        utilizzano una politica async ma con un periodo di flush
        molto breve.
    * defaults: imposta diverse opzioni, infatti defaults
        costituisce: rw,suid,dev,exec,auto.nouser, e async
* la quinta, rappresenta la modalità "dump", in questo caso
  possiamo impostare questo valore a 0 (non impostato) o 1
  (impostato), se vale 1, allora l'utility di dump effettuerà il
  backup della partizione, questa è una tenica old school per
  effettuare backup
* la sesta, rappresenta il "Filesystem check" (o fsck), in questo
  caso i valori possibili sono 0 (non impostato) o valore
  positivo diverso da zero (impostato), se è impostata, permette
  al computer di effettuare un controllo di integrità del
  filesystem al riavvio nel caso di crash di sistema o sorgono
  problemi legati al disco, l'intero rappresenta l'ordine della
  partizione nel controllo di integrità, ad esempio se abbiamo
  impostato 1, allora questa sarà la prima partizione ad essere
  sottoposta al controllo di integrità, se abbiamo impostato 2
  sarà la seconda partizione ad essere sottoposta al controllo di
  integrità e così via

N.B.: E' sempre buona norma utilizzare gli UUID dei device,
visualizzabili con comandi tipo "blkid", in quanto più sicuri
rispetto all'indicare la partizione.

N.B.2: Normalmente per le chiavette USB o per dispositivi
rimovibili è sconsigliato utilizzare fstab, ma si rimanda la
gestione dell'automount a Desktop Environment/Window Manager o
programmi come autofs; ad esempio in XFCE, bisogna installare i
pacchetti "thunar-volman" e "gvfs" ed aggiungere l'utente con cui
si vuole poter scrivere sui dispositivi al gruppo "plugdev",
mentre con altri file manager basta includere l'utente nel gruppo
"plugdev", se il gruppo non esiste, bisogna crearlo.

Although the /etc/fstab file has been the traditional way to
represent filesystems and their mount points, two new
alternatives have appeared. The first is an /etc/fstab.d
directory that contains individual filesystem configuration files
(one file for each filesystem). The idea is very similar to many
other configuration directories that you’ll see throughout this
guide

Vediamo un esempio di automount per partizioni ntfs

```conf
UUID=2832buin2iu923j292anwd982   /media/user/C ntfs
permissions	0	2

# Oppure avremmo potuto specificare il device attraverso il device
file al posto dell'UUID

# ma questa pratica è sconsigliata, per completezza riportiamo
# comunque un esempio

/dev/sdb1  /media/user/C ntfs   permissions	0	2
```

oppure per montare un filesystem di tipo ext4 possiamo ad esempio
aggiungere al file:

```conf
# In questo caso per semplicità abbiamo inserito il percorso al
# path file

#ma ricordiamo che è sempre consigliato inserire il codice UUID

/dev/sda3   /mnt/myPart  ext4    defaults    0   2
```


## Swap

Con il termine swap si intende, in informatica, l'estensione
della capacità della memoria volatile complessiva del computer,
oltre il limite imposto dalla quantità di RAM installata,
attraverso l'utilizzo di uno spazio su un altro supporto fisico
di memorizzazione, ad esempio il disco fisso. L'uso dello swap è
una delle tecniche impiegate dal sistema operativo per la
gestione della memoria virtuale. Vediamo come impostare della
memoria come swap su un sistema:

```sh
 sudo dd if=/dev/zero of=/mnt/swap.swp bs=1024 count=800k
 # crea
 # un file da 800MB che viene salvato in /mnt/, questo file lo
 # vogliamo utilizzare come swap, altra directory possibile
 # sarebbe stata "~/swap.swp" per crearlo all'interno della home
 # directory; un'alternativa a "dd" sarebbe stata utilizzare "
 # fallocate -l 800M /mnt/swap.swp"
```

Un'altro esempio e':

```sh
dd if=/dev/zero of=/root/myswapfile bs=1M count=1024
# in questo caso creiamo un file di swap da 1GB
```

Un'altra alternativa e':

```sh
 fallocate -l 1k file
 # crea un file da un 1k
```
Questo file creato dovrebbe essere appartenente all'utente di "
root" e con permessi "0600", quindi eseguiamo:

```sh
 sudo chmod 0600 swap.swp
 # impone come permessi 0600 sul file,
 # il proprietario dovrebbe già essere "root" in quanto il file è
 # stato creato attraverso sudo
```
per essere sicuri che appartenga a root eseguiamo:

```sh
 chown root:root swap.swp
```
```sh
 mkswap swap.swp
 # imposta il filesystem utilizzato dalle
 # partizioni di swap sul file indicato, nel caso avessimo
 # utilizzato una prtizione avremmo dovuto mettere al posto di "
 # swap.swp", "/dev/myPartition", dove "myPartition" indica la
 # partizione
```
```sh
 swapon swap.swp
 # attiva il file swap.swp come spazio di swap
```
per renderlo fisso, dobbiamo aggiornare il file fstab con una
stringa così:

```conf
/percorso/alFile/Swap none swap sw 0 0
```
Possiamo verificare le modifiche apportate attraverso:

```sh
 free -m
 # visualizza informazioni sulla memoria
```
Una volta riavviato il sistema, lo spazio di swap non sarà
attivo, per rendere questa memoria di swap permanente dovremo
moddificare il file "/etc/fstab" aggiungendo una riga del tipo:

```conf
/percorsoAlFileDiSwap/swap.swp / swap defaults
```
Altri comandi utili sono:

```sh
 swapoff -a
 # disattiva tutte le partizioni di swap indicate nel
 # file "/etc/fstab"
```
```sh
 swapon -a
 # attiva tutte le partizioni di swap indicate nel
 # file "/etc/fstab"
```


### Quanto Swap fare?

Tanto tempo fa una regola empirica era fare una partizione/file
di swap di due volte la quantità fisica di RAM, ma oggi non è più
necessario, basta un po' di swap.


## Gestione dello spazio su disco con Quota

Quota è un famoso software utilizzato per gestire spazio su disco
per gli utenti e per i gruppi. Possiamo ad esempio limitare le
dimensioni dei file o delle directory che un utente può possedere
o con cui può operare.


## Preparazione della macchina per l'utilizzo di Quota

Innanzitutto dobbiamo installare i pacchetti "quota" e "quotatool",
vediamo come fare su una macchina Debian-based:

```sh
 sudo apt-get install quota quotatool
```
Dopo aver installato quest istrumenti, dobbiamo specificare le
partizioni su cui vogliamo usare quota, per farlo, andremo nel
file /etc/fstab e aggiungeremo nella colonna delle opzioni (cioè
la quarta colonna) le opzioni "usrquota, grpquota" per poter
usare quota sia sugli utenti che sui gruppi.

Il prossimo passo è quello di creare un paio di file coi diritti
di root, quindi usando "sudo" nella directory root "/" chiamati:

* /quota.user (nelle versioni più recenti, il file è chiamato "aquota.user")
* /quota.group (nelle versioni più recenti, il file è chiamato "aquota.group")

Quindi eseguiamo, dopo averli creati:

```sh
 sudo chmod 600 /quota.*
```
una volta effettuata questa operazione, effettuiamo un remount
della partizione di root "/":

```sh
 sudo mount -o remount /
```
Infine, dobbiamo creare un database, e attivare quota facendo:

```sh
 sudo quotacheck -avugm
 # genera un database per il programma quota, dove:
 # * a: controlla tutti i filesystem montati (non di rete) nel
 #     file /etc/mtab
 # * v: attiva la modalità verbose
 # * u: solo gli utenti elencati nel file /etc/mtab devono essere
 #     controllati, questa opzione è di default
 # * g: solo i gruppi elencati nel file /etc/mtab devono essere
 #     controllati
 # * m: non provare a rimontare i filesystem in modalità di sola
 #     lettura (read-only)
 #
 # * N.B.: E' possibile inserire come flag "-c" per creare i file
 #     quota.user e quota.group, in modo da non doverli creare
 #     manualmente
```


```sh
 quotaon -avug
 # viene attivato quota, può essere spento con "
 # quotaoff -avug" dove in entrambi i casi i flag hanno
 # significato:
 # * a: effettua l'operazione su tutti i filesystem in /etc/fstab
 # * v: attiva la modalità verbose
 # * u: effettua l'operazione per gli utenti
 # * g: effettua l'operazione per i gruppi
```

N.B.: Solo se il quota è stato attivato attraverso un "quotaon"
allora viene impedito agli utenti di superare i limiti imposti,
quindi è bene tenere a mente di attivare quota dopo la
configurazione per l'utilizzo.


## Configurazione di Quota

Abbiamo bisogno di un paio di applicazioni per configurare quota.
Per controllare le configurazioni di quota per un particolare
utente eseguiamo:

```sh
 quota nomeUtente
 # mostra la configurazione quota per l'utente
 # nomeUtente
```
```sh
 quota -g nomeGruppo
 # mostra la configurazione quota per il
 # gruppo nomeGruppo
```
La configurazione quota è suddivisa su sette colonne:

* la prima, indica il filesystem relativo alla configurazione
* la seconda, "blocks" (o blocchi), e rappresenta lo spazio
  occupato attualmente dall'utente in blocchi, dove per blocco si
  intende uno spazio da 1kB
* la terza, "blocks soft limit" (o limite soft per i blocchi), e
  rappresenta un limite per i blocchi che può usare l'utente,
  essendo un limite "soft", questo vuol dire che l'utente può
  temporaneamente superare questo limite secondo il "grace time"
  (o tempo di grazie) di default impostato a sette giorni
* la quarta, "blocks hard limit" (o limite hard per i blocchi), e
  rappresenta un limite per i blocchi che l'utente non può
  assolutamente superare
* la quinta, "inodes", rappresenta il numero di file attualmente
  in possesso dall'utente
* la sesta, "inodes soft limit" (o limite soft per gli inodes), e
  rappresenta un limite per i file che può possedere l'utente,
  essendo un limite "soft", questo vuol dire che l'utente può
  temporaneamente superare questo limite secondo il "grace time"
  (o tempo di grazie) di default impostato a sette giorni
* la settima, "inodes hard limit" (o limite hard per gli inodes),
  e rappresenta un limite per i file che l'utente non può
  assolutamente superare

Per avere un quadro generale della configurazione quota su un
filesystem possiamo eseguire:
```sh
 repquota /
 # mostra la configurazione quota sul filesystem
```
in questo caso, le ultime due colonne rappresentano i limiti
sui file e le prime due i limiti sui blocchi

```sh
 repquota -s /
 # mostra la configurazione quota sul filesystem,
 # evidenziando le misure in kB
```
Per impostare o modificare la configurazione quota su un utente,
eseguiamo:

```sh
 edquota nomeUtente
 # mostra la configurazione quota per
 # l'utente nomeUtente, aprendo il file relativo all'utente,
 # andremo a modificare qui le opzioni desiderate
```

edquota aprirà il file di testo attraverso l'editor
specificato nella variabile d'ambiente "EDITOR", per cambiare
l'editor, dobbiamo impostare la variabile d'ambiente editor
con un comando o andando a modificare il file "~/.bash_profile"
inserendo il percorso completo all'editor

```sh
 edquota -g nomeGruppo
 # mostra la configurazione quota per
 # l'utente nomeUtente, aprendo il file relativo all'utente,
 # andremo a modificare qui le opzioni desiderate
```
ad esempio, impostando 100 nel campo "blocks hard limit" (cioè la
quarta colonna) imponiamo un limite di 100kB all'utente
nomeUtente. Oppure in alternativa possiamo lanciare:

```sh
 setquota -u nomeUtente 100 200 10 15 /
 # in questo caso viene
 # impostato per l'utente nomeUtente un soft limit per i blocchi
 # di 100, un hard limit di 200, un soft limit per i file di 10 e
 # un hard limit per i file di 15 sul filesystem "/"
```
Lanciando ora:

```sh
 repquota -s /
 # mostra la configurazione quota sul filesystem,
 # evidenziando le misure in kB
```
I "grace time" (o tempo di grazia) possono essere modificati per
un determinato utente con:

```sh
 edquota -T nomeUtente
 # permette di modificare la
 # configurazione dei grace time per l'utente nomeUtente
```
Siccome periodicamente dobbiamo aggiornare il database di quota,
è utile inserire l'aggiornamento del database in un crontab
andando a creare un file chiamato "quotacheck" nella directory "
/etc/cron.daily/", all'interno del file, inseriamo il comando

```sh
 quotacheck -avumg
 # aggiorna il database utilizzato da quota
```
N.B.: Per una descrizione più approfondita di quota, è
consigliato visualizzare la documentazione presente al link [Documentazione Quota](http://www.ibm.com/developerworks/library/l-lpic1-v3-104-4/index.html)


## Manutenzione dei dispositivi di memoria di tipo "ext"

In questa sezione vedremo alcuni strumenti che cipermetteranno di
effettuare una manutenzione più semplice di quella che avverrebbe
col programma "debugfs", attraverso i programmi:

* dumpe2fs: ci permette di visualizzare informazioni sui
  filesystem, simile a debugfs, ma non interattivo
* tune2fs: ci permette di impostare parametri avanzati su
  filesystem ext


Vediamo alcuni esempi:
```sh
 dumpe2fs /dev/myDevice
 # visualizza informazioni sul device,
 # numero di blocchi, numero di inode, blocchi liberi, nomero di
 # mount effettuate, e numero massimo di mount prima del
 # filesystem check, o il check interval temporale, e tanti altri
 # dettagli sulla partizione
```
```sh
 dumpe2fs -h /dev/myDevice
 # visualizza un resoconto delle
 # informazioni sul device
```
```sh
 tune2fs -c /dev/myDevice
 # imposta il numero massimo di mount
 # da effettuare prima di eseguire un check sul disco forzato
```
```sh
 tune2fs -C /dev/myDevice
 # cambia il numero di mount effettuati
```
```sh
 tune2fs -i ???(non lo so) /dev/myDevice
 # cambia l'intervallo
 # temporale massimo permesso senza effettuare un check, dopo
 # questo intervallo viene forzato un check
```
```sh
 tune2fs -L newLabel /dev/myDevice
 # cambia la label di un
 # dispositivo
```


## Manutenzione dei dispositivi di memoria di tipo "xfs"

Per gestire filesystem di tipo "xfs" abbiamo bisogno di due
pacchetti chiamati "xfsprogs" e "xfsdump", quindi su una
distribuzione basata su debian faremo:

```sh
 sudo apt-get install xfsprogs xfsdump
 # installa i pacchetti
 # xfsprogs e xfsdump
```
una volta installati questi pacchetti avremo una serie di utility
nella directory "/usr/sbin2, ovviamente li troviamo in questa
directory in quanto in "/sbin" sono situati solo i pacchetti
standard installati nella mia distro, facendo ora un:

```sh
 ls -al /usr/sbin/xfs*
 # visualizza tutte le utility per gestire
 # filesystem xfs
```
Ora vedremo alcuni esempi applicativi delle utility più
rilevanti:

```sh
 xfs_check /dev/myDevice
 # esegue un check simile a fsck ma su
 # un filesystem xfs, anche in questo caso il dilesystem non deve
 # essere montato
```
```sh
 xfsdump -J -f nomeBackup /mnt/myMountedDevice
 # effettua un
 # backup anche del journal "-J" del device montato in
 # /mnt/myMountedDevice e lo salva in un file chiamato "nomeBackup"
 # , il flag "-f" ci permette di copiare tutti i file e tutte le
 # directory nel backup ricorsivamente, successivamente ci verrà
 # richiesta una label per il backup che verrà creato
```
```sh
 xfsrestore -J -f nomeBackup /mnt/myMountedDevice
 # ripristina
 # il backup nella directory myMountedDevice, effettua cioè
 # l'operazione opposta a quella effettuata nel comando precedente
```
```sh
 xfs_admin -L myDataXFS /dev/sdb1
 # rinominiamo la label della
 # partizione sdb1 col nome "myDataXFS"
```
```sh
 xfs_admin -l /dev/sdb1
 # visualizza la label della partizione
 # sdb1
```
Queste sono solo alcune delle utility presenti, tra l'altro sono
state presentate con un numero limitatissimo di esempi, è
consigliato guardare il manuali attraverso il comando "man" sulle
utility presenti al percorso `/usr/sbin/xfs*` per effettuare
operazioni più complicate.


## RAID

Il RAID (Redundant Array of Inexpensive Disks) anche se ora più
comunemente l'acronimo viene espanso come Redundant Array of Independent
Disks) è una tecnica di raggruppamento di diversi dischi rigidi collegati
ad un computer che li rende utilizzabili, dalle applicazioni e
dall'utente, come se fosse un unico volume di memorizzazione.
Tale aggregazione sfrutta, con modalità differenti a seconda del
tipo di implementazione, i principi di ridondanza dei dati e di
parallelismo nel loro accesso per garantire, rispetto ad un disco
singolo, incrementi di prestazioni, aumenti nella capacità di
memorizzazione disponibile, miglioramenti nella tolleranza ai
guasti. Esistono diverse configurazioni RAID utilizzate per
diversi scopi, si parla dei cosiddetti livelli di RAID:

* RAID Lineare: Le partizioni (o i dischi) non sono delle stesse
 dimensioni, ma costituireanno un volume unico con una
 dimensione data dalla somma delle dimensioni dei singoli;
* RAID 0: (Striping) Le partizioni (o i dischi) sono delle stesse dimensioni
 e costituiranno un volume unico con una dimensione data dalla
 somma delle dimensioni dei singoli. RAID 0 setups are standard on high-end
 gaming PCs and graphic design workstations, and provide a measurable, albeit
 modest performance boost for hard-disk-intensive programs;
* RAID 1: (Mirroring) Mirrora i dati tra dischi/partizioni di dimensioni
 uguali (alto livello di ridondanza ma spreco di capacità);
* RADI 5: (Distributed Parity) Though you get both faster disk
  performance and data protection from this setup, it requires a minimum of
  three hard drives. Instead of using an entire hard drive as a backup, RAID 5
  spreads redundancy information—called parity bits—across all of the array’s
  drives. Where RAID 1 requires 50% of available storage for redundancy, RAID 5
  requires only 33%.
  When one of the drives in a RAID 5 array fails, the data content of that
  failed drive is reconstructed using the parity bits on the surviving drives
  and written to a new, replacement drive. The array is still usable in the
  meantime.
* RAID 4/5/6: I dati vengono copiati su tre o più dischi
 sfruttando controlli come blocchi di parità;


Il filesystem ID (quello che viene usato da fdisk) da utilizzare
su dischi su cui vogliamo utilizzare il RAID è "0xDA" detto anche
"Non FS".

Vediamo come impostare il raid, supponiamo di avere 4 device
chiamati "sdb", "sdc", "sdd" ed "sde", innanzitutto lanciamo:

```sh
 fdisk /dev/sdb
 # lanciamo fdisk e selezioniamo una partizione
 # di tipo "da" cioè "Non FS" che occupa l'intero disco
```
```sh
 sfdisk -d /dev/sdb | sfdisk --force /dev/sdc
 # copiamo la
 # tabella di partizioni appena creata su sdb in sdc
```
```sh
 lsblk
 # visualizziamo l'albero delle partizioni per verificare
 # di avere effettivamente sia sdb che sdc con una sola partizione
```

Per creare un RAID 1 ora eseguiamo:
```sh
mdadm --create --verbose /dev/md0 --level=mirror --raid-devices=2 \
  /dev/sdb1 /dev/sdc1
# crea un device chiamato "md0" atto a
# rappresentare il disco RAID
```

Possiamo verificare la corretta creazione del device di RAID
attraverso:
```sh
 cat /proc/mdstat
 # visualizza il file "mdstat" che dovrebbe
 # contenere qualche dato dopo aver generato il device di RAID
```
```sh
 lsmod | grep raid
 # verifica se il modulo relativo al RAID è
 # caricato dal kernel
```

Dobbiamo rendere ora persistente il RAID andando a mettere mano
al file "/etc/mdadm.conf" o "/etc/mdadm/mdadm.conf" (che è il
file di configurazione del RAID) a differenza della
distribuzione, per fortuna, possiamo anche non andare a scrivere
cosa manualmente nei file ma possiamo fare uso del programma
mdadm, attraverso:
```sh
 mdadm --detail --scan >> /etc/mdadm.conf
 # configura il RAID in
 # modo persistente
```

per fermare un RAID possiamo effettuare:
```sh
 mdadm --stop /dev/md0
```
oppure per avviarlo (o riavviarlo) possiamo eseguire:
```sh
 mdadm --assemble --scan
```

Ora possiamo formattare md0 col filesystem che più preferiamo e
il gioco è fatto; possiamo effettuare:

```sh
 mkfs.ext4 /dev/md0
 # formatta tutto il sistema RAID con filesystem ext4
```

### Testare Configurazioni diverse temporanee con RAID

Puo' essere spesso utile testare configurazioni RAID, sia per effettuare
prove prima di implementarle su hard disk veri, ma anche per studiare e
impratichirsi con le configurazioni.

A questo scopo, torna utile o utilizzare delle macchine virtuali con piu' hard
disk, oppure creare dei block device (hard drives) virtuali come ad esempio loop
device (opzione piu' veloce).

Per creare dei dispositivi virtuali per effettuare le nostre prove possiamo
eseguire:
```sh
cd /tmp
dd if=/dev/zero of=sdx bs=1M count=100 # Un hard disk da 100M
losetup -f sdx
dd if=/dev/zero of=sdy bs=1M count=100 # Un hard disk da 100M
losetup -f sdy
dd if=/dev/zero of=sdz bs=1M count=99  # Un hard disk da 99M
losetup -f sdz
```

Adesso possiamo impostare un RAID 1 tra loop0 e loop1 con:
```sh
mdadm  --create -e 1.2 -n 2 -l 1 /dev/md100 /dev/loop0 /dev/loop1
```
Una volta finita la creazione, possiamo eseguire:
```sh
grep md100 /proc/partitions
```

Possiamo cancellare questo RAID eseguendo:
```sh
mdadm --stop /dev/md100
mdadm --misc --zero-superblock /dev/loop0
mdadm --misc --zero-superblock /dev/loop1
```

Ora invece mostriamo come creare un RAID con una coppia di hard disk, con uno
esistente e l'altro inesistente, che funge da fermaposto per provare setup con
hard disk danneggiati:

```sh
mdadm  --create -e 1.2 -n 2 -l 1 /dev/md100 /dev/loop0 missing
# al posto di "missing" possiamo inserire qualsiasi stringa preferiamo
# infatti in questo caso rappresenta solo un fermaposto per un hard disk
# unavailable
```

Possiamo verificare le dimensioni del disco con:
```sh
grep md100 /proc/partitions
```

Proviamo ad aggiungere un disco piu' piccolo con differenza >= 1%:
```sh
mdadm  --add /dev/md100 /dev/loop2
```
Dovremo ottenere un errore del tipo:
"mdadm: /dev/loop2 not large enough to join array"

Ed e' corretto in quanto il RAID e' gia' stato creato e non possiamo aggiungere
hard disk con dimensioni differenti all'1% o con differenza maggiore.


### Note sulle diverse configurazioni RAID

Le configurazioni RAID piu' comuni in giro sono:
- RAID 0
- RAID 1
- RAID 5
- RAID 6
- RAID 10
- RAID 01

Per RAID 1:
Ricorda che mdadm permette di implementare RAID 1 anche con hard disk di
dimensioni diverse, ovviamente saremo limitati dalle dimensioni dell'hard disk
piu' piccolo. Inoltre, ricorda che mdadm da in output un warning quando la
differenza tra gli hard disk e' maggiore o uguale all'1%.

Ricorda pero' che non e' possibile aggiungere ad un RAID gia' esistente un disco
con una dimensione con differenza 1% o maggiore, perche' questo comporterebbe la
perdita di dati, cosa che mdadm non permette.

Per RAID 0:
Possiamo ottenere performance migliori ad una configurazione senza RAID se 
RAID 0 viene impostiamo con interleaving.



## RAID con Btrfs

Avere un filesystem che supporta nativamente il RAID è di grande
vantaggio, in quanto semplifica significativamente la creazione
di un sistema RAID; il filesystem Btrfs supporta RAID, infatti
per creare la stessa configurazione precedente, è possibile farlo
con un comando:

```sh
 mkfs.btrfs -m raid1 -d raid1 /dev/sdd /dev/sde
 # crea un RAID 1 con le partizioni "sdd" ed "sde"
```

Btrfs ha diversi vantaggi rispetto ad ext4 ed altri filesystem,
il vantaggio principale è quello di supportare nativamente gli
snapshot, quindi fare snapshot del sistema e calcolare la
differenza tra due snapshot sono operazioni molto leggere su
questo filesystem.


## Tuning delle prestazioni e configurazione delle

### Impostazioni di dispositivi di memoria

Per effettuare un tuning delle prestazioni o accedere alle
configurazioni dei dispositivi di memoria, possiamo utilizzare
una coppia di programmi:

* hdparm (per dispositvi con controller ATA e derivati): in
  pratica la quasi totalità dei sistemi PC moderni
* sdparm (per dispositivi con controller SCSI): usati in contesto
  workstation/server

Se usiamo un hard disk ATA (o derivato) ma che viene emulato con
il driver SCSI, possiamo usare entrambi i comandi. Vediamo alcuni
esempi di comandi:

```sh
 hdparm -I /dev/sda
 # mostra informazioni sull'hard drive
```
```sh
 hdparm -tT /dev/sda2
 # effettua uno speed test sulla partizione
 # sda2
```
```sh
 sdparm /dev/sda
 # mostra informazioni riguardo il controllore
 # ATA/SCSI, ecc del device sda
```
```sh
 sdparm --get=WCE /dev/sda
 # controlla se la politica di write
 # caching è abilitata sul device sda
```


## Criptare Partizioni e File

In genere possiamo criptare:
* Interi Dischi o Partizioni a livello di "block device", con LUKS
* Partizioni "stacked" utilizzabili a livello utente e senza la necessita' di
  avere una partizione a priori, e.g., ecrypt, encfs
* File, gpg (preferibile), openssl


##  Gestire partizioni criptate con LUKS/dm-crypt

E' possibile criptare partizioni (o interi dispositvi di memoria)
per aumentare la sicurezza attraverso LUKS (Linux Unified Key
Setup) e cioè una specifica per la criptazione di dispositivi di
memoria. E' doveroso criptare partizioni nel momento in cui
vogliamo proteggere dei dati, dobbiamo considerare l'eventualità
che la nostra macchina possa cadere nelle mani sbagliate o
scenari simili. Per poter criptare una partizione, dobbiamo
innanzitutto installare il pacchetto "cryptsetup":

```sh
 apt-get install cryptsetup
 # installa crypt-setup
```
Poi per criptare una determinata partizione, prendiamo come
esempio /dev/sde1, eseguiamo:

```sh
 cryptsetup -v -y luksFormat /dev/sde1
 # in questo caso
 # indichiamo di voler criptare la partizione indicata, "-v"
 # indica la modalità verbose, mentre "-y" serve a verificare la
 # passphrase inserita
```
Una volta creata questa partizione criptata, dobbiamo assegnarle
un file in /dev/mapper/ che rappresenti il dispositivo criptato,
possiamo eseguire:

```sh
 cryptsetup luksOpen /dev/sde1 secure
 # dove indichiamo:
 # l'intenzione di creare un device per la partizione con "
 # luksOpen", la partizione criuptata con "/dev/sde1" e il nome da
 # dare al device che potremo vedere successivamente in
 # /dev/mapper" che in questo caso è "secure" ma può avere
 # qualsiasi nome desiderato
```
possiamo verificare il corretto caricamento della partizione
criptata attraverso:

```sh
 ls -l /dev/mapper/secure
 # visualizza informazioni sulla
 # partizione criptata, se è stata caricata in modo corretto
```
Per renderla leggibile, dobbiamo utilizzare un filesystem a
nostra scelta, eseguiremo ad esempio:

```sh
 mkfs.ext4 /dev/mapper/secure
 # impone il filesystem ext4 sulla
 # partizione criptata
```
ora possiamo montarla con:

```sh
 mount /dev/mapper/secure /secure
 # monta la partizione criptata
 # nella directory /secure
```
Un file di configurazione molto utile è "/etc/crypttab", dove
sono contenute istruzioni per il comando "cryptsetup". Un'altra
soluzione è Ecryptfs, questo ci permette di creare una directory
sola criptata anzichè dover formattare per criptare l'intero
disco.


##  Gestire partizioni criptate con Bitlocker

Dato un disco criptato con Bitlocker (tipico software utilizzato
su Windows), possiamo accedere utilizzando questi comandi:

```sh
 mkdir /mnt/tmp /mnt/disk
 # creo due directory per tenere il
 # dislocker file e il disco montato
```
```sh
 dislocker -v -V /dev/sdb1 -uMiaPassword -- /mnt/tmp
 # monto il
 # dislocker file, la partizione sdb da menzionare qui è quella
 # che vogliamo attualmente montare, quindi potrebbe anche essere
 # sdb2
```
```sh
 mount -o loop /mnt/tmp/dislocker-file /mnt/disk
 # monto il
 # disco criptato, ora il disco è montato nella directory "
 # /mnt/disk"
```
una volta effettuate le operazioni potremo eseguire le seguenti
operazioni per smontare il disco:

```sh
 cd
 # per non rimanere nella directory del disco montato
```
```sh
 umount /mnt/disk
```
```sh
 umount /mnt/tmp
```


## Criptare Directory

Possiamo cripare directory attraverso l'utilizzo di filesystem particolari che
non richiedono la formattazione della nostra partizione corrente.
Questi filesystem vengono detti "stacked filesystem" a differenza di meccanismi
come LUKS denominati invece "block device".

Esempi di stacked encrypted filesystem sono:
* eCryptfs (piu' veloce)
* EncFS (piu' facile da usare)

Utilizzare filesystem di questo tipo e' molto vantaggioso nel momento in cui
abbiamo directory da criptare, se invece dobbiamo criptare solo un file singolo
allora possiamo optare per gpg.

Possiamo trovare un confronto tra i vari schemi di criptazione per partizioni
qui:
[Tabella Criptazioni](https://wiki.archlinux.org/index.php/Disk_encryption#Comparison_table)


### EncFS

Per creare una nuova directory criptata chiamata "origin" nella nostra home
directory utilizzando come partizione criptata un file chiamato ".encrypted"
possiamo eseguire:

```sh
encfs ~/.encrypted ~/origin
```
Ora possiamo spostare tutti i file che vogliamo criptare all'interno di
'~/origin'.

Per smontare il filesystem criptato possiamo eseguire:
```sh
fusermount -u ~/origin
```
Per rimontare una partizionee possiamo semplicemente ripetere il comando di
creazione, quindi nel momento in cui la prima directory specificata esiste gia'
ed e' un filesystem valido allora questo viene rimontato.

Possiamo cambiare la password di un volume criptato con:
```sh
encfsctl passwd ~/.encrypted
```


## Criptare File con GPG

TODO


## LVM

LVM sta per Logical Volume Management e costituisce un sistema
molto flessibile per la gestione delle partizioni. Possiamo
identificare tre elementi nella gestione organizzata secondo LVM:

1. Physical Volumes: I dispositivi fisici
2. Volume Groups: Raggruppamenti di volumi fisici
3. Logical Volumes: I dispositivi virtuali che vengono visti dal
  sistema

Quando creiamo una partizione LVM, il tipo da associare (via
fdisk ad esempio) è "8e", una volta preparata la partizione,
supponiamo in questo caso che la partizione creata sia "sdb1",
allora dobbiamo eseguire:

```sh
 pvcreate /dev/sdb1
 # segna un dispositivo come "volume fisico",
 # infatti pvcreate penso stia per Physical Volume Create, nel
 # senso che dobbiamo indicare ad LVM quali sono le partizioni
 # fisiche che vogliamo utilizzare
```
```sh
 pvscan
 # esegue uno scan dei physical volume sul sistema
```
```sh
 vgcreate vg1 /dev/sdb1
 # crea un Volume Group chiamato vg1 e
 # composto dalla partizione sdb1
```
ora possiamo eseguire:

```sh
 vgscan
 # visualizza il nome dei volume group presenti sul
 # sistema
```
```sh
 vgs
 # mostra un resoconto dei volume group con dimensioni e
 # diverse proprietà relative
```
```sh
 lvs
 # mostra informazioni sui volumi logici
```
Ora possiamo creare una nuova partizione logica attraverso:

```sh
 lvcreate -n data_lv -L 750m vg1
 # crea una partizione che
 # chiamiamo attraverso il flag "-n" "data_lv", la dimensione
 # viene specificata attraverso il flag "-L" ed è di 750MB,
 # inoltre viene indicato il volume group in cui creare la
 # partizione
```
Ora possiamo formattare la nostra partizione, tenendo a mente che
i volumi logici di LVM sono identificati da device file contenuti
in /dev/volumeGroupName/ dove "volumeGroupName" rappresenta
proprio il nome del volume group di appartenenza, per formattare
allora eseguiremo:

```sh
 mkfs.ext4 /dev/vg1/data_lv
 # formatta la partizione logica con
 # filesystem ext4
```
e la montiamo con:

```sh
 mount /dev/vg1/data_lv /data
 # monta la partizione logica
```


## Estendere una partizione logica

Ora immaginiamo di avere quasi riempito il dispositivo /dev/sdb1
citato in precedenza che aveva partizione logica `/dev/vg1/data_lv`
ed era all'interno del volume group chiamato "vg1", possiamo
estenderlo, immaginiamo di aggiungere una partizione mappata in
/dev/sdc1, allora ci basterà identificarla come utilizzabile da
LVM come volume fisico, aggiungerlo allo stesso volume group di
`data_lv` e aggiungere spazio a `data_lv` che verrà in automatico
preso dalle partizioni all'interno del volume group, quindi
faremo:

```sh
 pvcreate /dev/sdc1
 # segna la partizione sdc1 come volume
 # fisico
```
```sh
 vgextend vg1 /dev/sdc1
 # aggiunge al volume group "vg1" il
 # volume fisico "/dev/sdc1"
```
```sh
 lvextend -L +1000m /dev/vg1/data_lv
 # aggiunge 1000MB
 # disponibili al volume logico chiamato "data_lv" all'interno del
 # volume group "vg1"
```
possiamo ora ridimensionare la partizione `data_lv` attraverso il
comando "resize2fs":

```sh
 resize2fs /dev/vg1/data_lv
 # ridimensiona la partizione data_lv
 # per occupare tutto lo spazio disponibile
```


## Backup con LVM

Il backup è una procedura molto flessibile utilizzando il sistema
LVM, infatti è possibile creare dei veri e propri "snapshot" cioè
stati del volume logico in un determinato istante di tempo. Lo
snapshot deve costituire un vero e proprio logical volume
all'interno dello stesso volume group della logical volume di cui
vogliamo effettuare il backup, ma questo avverrà in automatico in
quanto ci basta solo indicare la logical volume di cui vogliamo
effettuare il backup. Possiamo eseguire:

```sh
 lvcreate -L 200m -s -n backup /dev/vg1/data_lv
 # dove viene
 # creato un logical volume di dimensione "-L" 200MB, con nome "-n"
 # "backup", e indichiamo che uno snapshot attraverso il flag "-s"
 # , in questo modo ci basterà indicare solo la partizione che nel
 # nostro caso è "/dev/vg1/data_lv, i 200MB vengono sottratti al
 # logical volume di cui vogliamo effettuare il backup
```
```sh
 mkdir /mnt/backup
```
```sh
 mount /dev/vg1/backup /mnt/backup
```
```sh
 tar -cf /tmp/backup.tar /mnt/backup
```
```sh
 umount /mnt/backup
```
```sh
 lvremove /dev/vg1/backup
 # rimuove il logical volume utilizzato
 # momentaneamente per il backup
```


## Altre utility di LVM

Vediamo ora altre utility di LVM:

```sh
 vgchange --help
 # mostra molte opzioni che ci permettono di
 # cambiare impostazioni/proprietà dei volume group
```
```sh
 vgchange -a y vg1
 # rende disponibile "-a y" (a sta per
 # available) il volume group chiamato vg1 (questo avviene di
 # default alla creazione)
```
```sh
 vgchange -a n vg1
 # rende non disponibile "-a n" (a sta per
 # available) il volume group chiamato vg1
```
```sh
 lvscan
 # esegue uno scan e visualizza in output i logical
 # volume presenti sul sistema
```
```sh
 vgscan
 # esegue uno scan e visualizza in output i volume group
 # presenti sul sistema
```
```sh
 pvscan
 # esegue uno scan e visualizza in output i physical
 # volume presenti sul sistema
```


