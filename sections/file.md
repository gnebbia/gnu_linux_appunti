

## Tipologie di File

Nei sistemi GNU/Linux esistono diverse tipologie di file, uno
schema può essere visionato nella tabella sottostante:


|      Tipo di File        |                                   Descrizione                                    |
|:------------------------:|:--------------------------------------------------------------------------------:|
|     file regolare        |             file che contiene dei dati (l'accezione normale di file)             |
| cartella o direttorio    |           file che contiene una lista di nomi associati a degli inode            |
| collegamento simbolico   |           file che contiene un riferimento ad un altro file/directory            |
| dispositivo a caratteri  |            file che identifica una periferica ad accesso a caratteri             |
|  dispositivo a blocchi   |             file che identifica una periferica ad accesso a blocchi              |
|     "coda" (o fifo)      | file speciale che identifica una linea di comunicazione software unidirezionale  |
|   "presa" (o socket)     | file speciale che identifica una linea di comunicazione software bidirezionale   |


Le tipologie per noi di maggiore interesse sono le prime tre,
siccome conosciamo già abbastanza bene il concetto di file e il
concetto di directory, nella prossima sezione parleremo di
collegamenti (o link).


## Soft Link e Hard link

Esistono due modalità per creare dei collegamenti (o "link") sui
sistemi GNU/Linux:

* Soft Link
* Hard Link

le differenze sono:

* Gli hard link possono vivere solo sullo stesso filesystem
* Se rimuovo una copia di un hard link, l'altra continua a sopravvivere
* Nel caso di soft link, se rimuovo la copia originale, l'altra muore

Gli Hard Link sono simili ad una copia, ma si aggiornano quando
viene effettuata una modifica su uno dei link. Per creare un Hard
Link facciamo:

```sh
 ln sourceFile nameofTheHardLink
 # crea un hard link
```
Per creare un Soft Link facciamo:

```sh
 ln -s sourceFile nameOfTheSoftLink
 # crea un soft link
```
Esistono ovviamente anche altri flag aggiuntivi che possono
essere utilizzati ad esempio:

```sh
 -i
 # chiede conferma prima della creazione
```
```sh
 -f
 # forza la creazione di un link
```
Per rimuovere un link basta effettuare:

```sh
 unlink nomeFileODirectory
 # rimuove il link al file o alla
 # directory
```
ATTENZIONE: non provare assolutamente a rimuovere link a
directory utilizzando rm -R sul link della directory, questo
provocherà la rimozione dei file reali e non del link.


## Cercare File in GNU/Linux

I comandi più comunemente utilizzati per cercare file su linux
sono:

* find
* locate

Anche se è possibile effettuare ricerche di file anche con un
appropriato utilizzo dei comandi "grep" ed "ls".


## Find

Vediamo alcuni esempi di applicazione del programma find:

```sh
 find /etc -name motd
 # questo comando cercherà nella directory
 # /etc (e sue sottodirectory) un file che ha nel nome la parola "
 # motd".
```
il comando find è lento (rispetto a locate), ma molto efficace in
quando scandisce i file uno ad uno. E' molto probabile non avere
i permessi di lettura in alcune directory (almenochè non si è
l'utente root) in questo caso, vedremo molti messaggi a schermo
provenienti dallo standard error, per evitare di stampare questi
messaggi a schermo possiamo fare uso del seguente comando:

```sh
 find /etc -name motd 2>/dev/null
```
Altri esempi di applicazione del comando find possono essere:

```sh
 find /home/john -name "*.jpg"
 # cerca nella directory
 # /home/john, tutti i file con estensione .jpg
```
```sh
 find /etc -perm 777
 # cerca nella directory /etc tutti i file
 # con permessi 777, questa operazione potrebbe essere utile per
 # salvaguardare la macchina, in modo da non esporre a tutti, file
 # sensibili.
```
Un'altra utile possibilità risiede nel poter effettuare delle
operazioni specifiche con i file trovati, ad esempio:

```sh
 find /home -perm 777 -exec chmod 555 {} \;
 # questo comando,
 # una volta lanciato, troverà tutti i file con permessi 777 e li
 # cambierà a 555, questa operazione viene effettuata per ogni
 # file trovato; la parola chiave "-exec" indica l'inizio di un
 # comando, le parantesi graffe {} indicano "ogni file trovato" e "
 # \;" indica la fine del comando.
```
```sh
 find / -size 30M
 # questo comando mi troverà file grossi fino a
 # 30MB
```
```sh
 find / -type f -size +500M
 # questo comando troverà file di
 # grandezza maggiore a 500MB
```
E' possibile anche impostare una determinata profondità nelle
ricerche, ad esempio:

```sh
 find /etc -maxdepth 1
 # effettua ricerche fino a una
 # sottodirectory di profondità
```
possiamo ricercare anche in funzione di nomi utente o di gruppo
(o codice utente/gruppo); infatti altri esempi potrebbero essere:

```sh
 find /home -user john
 # elenca i file appertenenti all'utente "
 # John" nella directory /home
```
```sh
 find . -type f -name 'cron*'
 # in questo esempio vengono
 # evidenziati solo i file che iniziano per "cron" e non le
 # directory, arreaverso il flag "-type f"
```
```sh
 find . -type d -name 'cron*'
 # in questo altro caso invece
 # vengono cercate solo le directory che iniziano per "cron"
```
```sh
 find / -mtime +1
 # se vogliamo cercare i file modificati
 # nell'ultimo giorno, un'alternativa ad "-mtime" è "-a", per
 # effettuare le stesse funzioni
```
```sh
 find / -group nameofgroup
 # evidenzia tutti i file di un
 # determinato gruppo
```
```sh
 find . -name 'file*' -exec rm {} \;
 # elimina tutti i file che
 # iniziano per la parola "file", questo può essere utile nel caso
 # dovessimo eliminare una lista di file con nomi simili
```
```sh
 find ~/Movies/ -size +1024M
 # cerca file di dimensioni oltre
 # 1GB (1024MB) nella directory menzionata
```
```sh
 find / -size 50M
 # trova tutti i file che hanno una dimensione
 # esattamente di 50MB
```
```sh
 find / -size 33c
 # trova tutti i file di 33 byte, infatti il
 # suffisso "c" sta per byte, mentre l'opzione di default (cioè se
 # non avessi messo la 'c') sarebbe stata "b" che sta per blocco,
 # dove per blocco si intendono blocchi da 512byte cadauno
```
```sh
 find . -size 1033c ! -executable
 # mostra tutti i file che sono
 # grandi 1033bytes e non sono eseguibili
```
```sh
 find / -size +50M -size -100M
 # trova tutti i file che hanno
 # una dimensione maggiore a 50MB ma minore a 100MB
```
```sh
 find / -type f -name *.mp3 -size +10M -exec rm {} \;
 # trova
 # tutti i file mp3 con dimensione maggiore a 10MB e li elimina
```
```sh
 find ~ -perm 777
 # cerca tutti i file nella directory utente
 # con pieni permessi
```
```sh
 find . -user daniel -type f -name *.jpg ! -name autumn*
 # trova
 # tutti i file dell'utente daniel, con estensione jpg ma che non
 # contengono la stringa "autumn" nel nome
```
```sh
 find ~/scripts/ -user root -type f -amin -2 -name *.rb
 # trova
 # gli script ruby (.rb) a cui abbiamo fatto accesso negli ultimi
 # 2 minuti
```
```sh
 find ~/scripts/ -user root -type f -mmin -2 -name *.rb
 # trova
 # gli script ruby (.rb) che abbiamo modificato negli ultimi 2
 # minuti
```
```sh
 find /tmp -type f -empty
 # cerca tutti i file vuoti
```
```sh
 find /tmp -type f -name ".*"
 # cerca tutti i file nascosti
```
```sh
 find / -mtime +50 --mtime -100
 # trova tutti i file che sono
 # stati cambiati più di 50 giorni fa ma non più di 100 giorni fa
```
```sh
 find / -mmin -60
 # trova tutti i file modificati nell'ultima
 # ora
```
```sh
 find / -perm -4000 2>/dev/null
 # in questo modo cerchiamo tutti
 # i file con setuid, questi possono essere utili nell'ambito
 # della sicurezza per effettuare privilege escalation, quindi
 # fare attenzione a questi file
```

Possiamo anche usare find per trovare i file duplicati con:
```sh
find -type f -exec md5sum '{}' ';' | sort | uniq --all-repeated=separate -w 33
```

Un modo comune con cui utilizzare find per cercare file utilizzando regex e':
```sh
 find . | grep -i 'filename or regex'
 # in questo modo cerchiamo dalla directory corrente
```
o con semplici varianti per selezionare solo file o directory con:
```sh
 find . -type f| grep -i 'filename or regex'
 # in questo modo cerchiamo dalla directory corrente
 # ma solo i file che non sono directory
```
```sh
 find . -type d | grep -i 'filename or regex'
 # in questo modo cerchiamo dalla directory corrente
 # ma solo le directory
```
Possiamo anche cercare tramite regex su GNU find facendo:
```sh
find . -type f -regextype posix-extended -regex '.*\.md{3}'
# This is a match on the whole path, not a search.
# For example, to match a file named './fubar3',
# you can use  the regular expression '.*bar.' or '.*b.*3', but not 'b.*r3'.
```

Possiamo anche escludere determinati path utilizzando
l'"OR" logico e l'opzione "prune" in questo modo:
```sh
find / \( -path /dev -prune -o \
          -path /proc -prune -o \
          -path /sys -prune \
          \) \
         -o -printf '%p ' -exec cksum {} \;
# Find all files and compute checksum but exclude the paths /dev /proc /sys 
```


## Locate

Locate è un programma che crea un indice dei file salvati sul
sistema all'interno di un database. Quando viene effettuata una
ricerca, locate cercherà all'interno del database, quindi le
ricerche sono molto veloci. Normalmente il database viene
aggiornato ogni ora, ma questo dipende dalla configurazione,
quest'azione periodica può anche essere visualizzata in cron.
Possiamo aggiornare manualmente il database attraverso il comando

```sh
 updatedb
 # aggiorna il database di locate
```
Altri esempi di utilizzo possono essere:

```sh
 locate fileName
 # cerca il file chiamato "filename"
```
```sh
 locate physics | grep -i "/DATA"
 # questo cercherà i file
 # chiamati "physics" che sono situati nella directory "/DATA"
```

Nota Bene: Se un file viene creato e istantaneamente viene
cercato, locate non riesce a trovarlo in quanto il database non è
stato aggiornato.

Il file di configurazione per il database è localizzato in "
/etc/updatedb.conf".

####  Updatedb File

Vediamo ora alcune impostazioni importanti all'interno del
file "/etc/updatedb.conf"

```sh
 PRUNE_BIND_MOUNTS = "yes"
 # questa opzione permette di mettere
 # in gioco all'interno del database anche i filesystem connessi
 # al sistema principale
```
```sh
 PRUNEFS = "... ... ..."
 # qui sono elencati i tipi di
 # filesystem da ignorare e quindi non catalogare nel database
```
```sh
 PRUNENAMES = ".git .hg .svn"
 # le estensioni da escludere nelle
 # ricerche
```
```sh
 PRUNEPATHS = "/afs /media"
 # le directory da escludere nelle
 # ricerche
```

## Modalità Alternative per cercare file


Verranno di sequito elencate alcune modalità alternative per
effettuare ricerche di file su sistemi GNU/Linux:

```sh
 ls /nomeDirectoryInCuiCercare -R | grep "nomeFileOWildCard"
 # cerca in modo ricorsivo (dir e subdirs) all'interno della
 # directory /nomeDirectoryInCuiCercare i file che hanno nome
 # nomeFileOWildCard
```

```sh
 grep -lr nomeFile /directory
 # elenca i file i cui nomi
 # corrispondono a nomeFile all'interno della directory /directory
```


## Il programma Tar

Tar è un programma utilizzato per archiviare (o raggruppare) più
file in un singolo file, i file creati con tar sono chiamati "
tarball", questo ci permette di maneggiare insiemi di file e
directory come se fossero un unico file. Generalmente archiviare
dei file non significa necessariamente comprimerli, anche se
questa è una possibilità. Alcuni esempi d'uso possono essere:

```sh
 tar cvf ciao.tar /home
 # crea un tar della directory "/home"
```
```sh
 tar cvf ciao.tar file1 file2 file3
 # crea un tar con
 # all'interno i tre file
```
```sh
 tar cvf mydirectory.tgz .
 # crea un archivio della directory
 # corrente
```
```sh
 tar tvf ciao.tar
 # elenca il contenuto dell'archivio tar
```
```sh
 tar -tf <file.tar.gz> | xargs rm -r
 # elimina tutti i file che
 # sono stati estratti dall'archivio menzionato, è molto comodo
 # quando ci troviamo davanti a tarbomb, cioè pacchetti che non
 # presentano al loro interno una parent directory ma un insieme
 # esagerato di file
```
```sh
 tar xvf ciao.tar
 # estrae in loco il contenuto dell'archivio
 # tar
```
```sh
 tar xvpf ciao.tar
 # estrae in loco il contenuto dell'archivio
 # tar, il flag "-p", serve a preservare i permessi dei file
 # all'interno dell'archivio
```
```sh
 tar xvpf ciao.tar --xattrs
 # estrae in loco il contenuto
 # dell'archivio tar, il flag "-p", serve a preservare i permessi
 # dei file all'interno dell'archivio e l'opzione "--xattrs" serve
 # a preservare gli attributi dei file all'interno dell'archivio
```
```sh
 tar xvf ciao.tar -C /percorso/preferito
 # estra il contenuto di
 # un file tar nella directory /percorso/preferito
```
```sh
 tar caf target.tar.xz file1 file2 file3
 # con il flag -a indica
 # di utilizzare lo schema di compressione indicato nel suffisso
 # dell'archivio, molto comodo, quindi ad esempio se avessimo
 # usato come suffisso ".tar.gz" avrebbe utilizzato gzip
```
Un altro flag molto utilizzato è 'p', per mantenere gli stessi
permessi all'interno dell'archivio, così nel momento di una
futura estrazione la gerarchia di permessi sui file non va persa.
Nel caso volessimo comprimere, abbiamo diverse opzioni in
funzione dell'algoritmo di compressione che preferiamo
utilizzare, generalmente abbiamo:

```sh
 gzip or gunzip
 # per comprimere con questo algoritmo ci basta
 # includere il flag -z alle opzioni precedenti passate al tar, ad
 # esempio "tar cvzf ciao.tar.gz /home"
```
```sh
 bzip2
 # per comprimere con questo algoritmo ci basta includere
 # il flag -j ai comandi tar "tar cvjf ciao.tar.bz2 /home"
```
Ad ogni modo è bene tenere in mente che archiviazione e
compressione possono lavorare sepratamente, ad esempio:

```sh
 gzip nomeFile.tar
 # comprime l'archivio nomeFile.tar
```
```sh
 gzip -1 nomeFile.tar
 # comprime l'archivio utilizzando un
 # algoritmo più veloce, avremo però meno compressione ( il valore
 # numerico può andare da 1 a 9
```
```sh
 gunzip nomeFileCompresso.tar.gz
 # decomprime il file
 # nomeFileCompresso.tar.gz
```
possiamo utilizzare gunzip anche per decomprimere dati nel formato
`zlib` o `deflate` (che comunque usa zlib) che sono comunemente
utilizzati nel protocollo HTTP eseguendo:
```sh
printf "\x1f\x8b\x08\x00\x00\x00\x00\x00"  | cat - pcap_21_extracted_body | gunzip
```

```sh
 bzip2 nomeFile.tar
 # comprime il file nomeFile.tar
```
```sh
 bunzip2 nomeFile.tar.bz2
 # decomprime il file nomeFile.tar.bz2
```
Nota Bene: Esistono delle analogie tra le estensioni dei file
archiviati e compressi:


|   Suffisso Breve  |   Suffisso Lungo   |
|:-----------------:|:------------------:|
|        .tgz       |       .tar.gz      |
| .tbz, .tbz2, .tb2 |      .tar.bz2      |
|     .taz, .tz     |       .tar.Z       |
|        .tlz       | .tar.lz, .tar.lzma |
|        .txz       |       .tar.xz      |

Vediamo ora alcuni esempi di tar in cui viene combinata la
compressione/decompressione:

```sh
 tar zxvf ciao.tar.gz
 # decomprime ed estrae l'archivio
 # compresso con gunzip
```
```sh
 tar jxvf ciao.tar.bz2
 # decomprime ed estrae l'archivio
 # compresso con bzip2
```
```sh
 tar tzf nomeArchivio.tar.gz
 # visualizza il contenuto di un
 # archivio compresso con gunzip
```
```sh
 tar Jxvf ciao.tar.xz
 # decomprime ed estrae l'archivio
 # compresso con xz
```
N.B.: Bzip è un algoritmo più lento ma è molto efficiente quando
usato per comprimere file di testo, quindi viene utilizzato per
distribuire codice sorgente. Un'altro algoritmo che sta sempre
diventando più famoso è "xz" e il suo corrispettivo "unxz". Per
decomprimere invece archivi di tipo rar, possiamo usare unrar, ed
eseguire "unrar l nomearchivio.rar" per visualizzarne il
contenuto e "unrar x nomearchivio.rar" per estrarre l'archivio.

## Librerie

Esistono generalmente due tipi di librerie:

* **Shared libraries** are .so (or in Windows .dll, or in OS X
  .dylib) files. All the code relating to the library is in this
  file, and it is referenced by programs using it at run-time. A
  program using a shared library only makes reference to the code
  that it uses in the shared library.
* **Static libraries** are .a (or in Windows .lib) files. All the
  code relating to the library is in this file, and it is
  directly linked into the program at compile time. A program
  using a static library takes copies of the code that it uses
  from the static library and makes it part of the program.
  [Windows also has .lib files which are used to reference .dll
  files, but they act the same way as the first one].

There are advantages and disadvantages in each method.

* **Shared libraries** reduce the amount of code that is duplicated
  in each program that makes use of the library, keeping the
  binaries small. It also allows you to replace the shared object
  with one that is functionally equivalent, but may have added
  performance benefits without needing to recompile the program
  that makes use of it. Shared libraries will, however have a
  small additional cost for the execution of the functions as
  well as a run-time loading cost as all the symbols in the
  library need to be connected to the things they use.
  Additionally, shared libraries can be loaded into an
  application at run-time, which is the general mechanism for
  implementing binary plug-in systems.
* **Static libraries** increase the overall size of the binary, but
  it means that you don't need to carry along a copy of the
  library that is being used. As the code is connected at compile
  time there are not any additional run-time loading costs. The
  code is simply there.

Personally, one could prefer shared libraries, but use static
libraries when needing to ensure that the binary does not have
many external dependencies that may be difficult to meet, such as
specific versions of the C++ standard library or specific
versions of the Boost C++ library.

Detta in modo pragmatico le librerie sono file che contengono
pezzi di codice a cui i programmatori fanno riferimento
all'interno dei loro programmi, anche perchè la riscrittura di
quel pezzo di codice o l'inclusione della librearia stessa
all'interno del loro programma, costerebbe loro spazio
aggiuntivo. Un file di libreria normalmente ha estensione ".so" o
".a".

Per poter visualizzare di quali librerie fa uso un determinato
programma possiamo utilizzare:

```sh
 ldd percorsoDelProgramma
 # dove il percorso del programma può
 # essere individuato con whereis nomeProgramma
```
Inoltre per permettere ad un programma di precaricare una
determinata libreria prima di tutte le altre possiamo utilizzare
la variabile d'ambiente LD_PRELOAD, ad esempio:

```sh
 LD_PRELOAD=/usr/lib/libv4l/v4l1compat.so skype
 # in questo caso
 # aggiungiamo una libreria da far caricare ad un software
 # chiamato skype prima di tutte le altre
```
Esistono diversi modi per configurare le librerie di sistema su
GNU/Linux:

* Configurazione Globale (o Global Configurations):
  configurazione valida per tutti gli utenti di un sistema
* Configurazione locale o d'ambiente (Environment Configurations):
  configurazione valida per un utente specifico

Quando cambiamo una qualche configurazione riguardante le
librerie, dobbiamo effettuare una pulizia della cache, questo
avviene per rendere effettivi i cambiamenti, a questo proposito
viene usato il comando:

```sh
 ldconfig
 # ricarica le librerie disponibili
```
```sh
 ldconfig -v
 # visualizza le librerie attualmente caricate dal
 # sistema
```
A volte un determinato software cerca una specifica libreria e
non la trova, nel caso dovessimo avere sul sistema una libreria
molto simile, magari che differisce di una sola o poche versioni
da quella cercata si può risolvere il problema, andando ad
effettuare dei link di questa libreria esistente utilizzando i
nomi delle librerie cercate. Il file contenente la configurazione
globale di sistema delle librerie è "/etc/ld.so.conf"; in questo
file, troveremo una direttiva di include che ci dirà dove è
localizzata la directory che contiene i file contenenti i
percorsi a alle librerie. Nella directory "/etc/ld.so.conf.d/"
sono invece contenuti diversi file con estensione ".conf" che
contengono i veri e propri percorsi alle librerie. La directory
contenente le librerie di sistema è costituita da "/lib".

Nel caso volessimo avere una libreria privata, che può quindi
vedere solo il mio utente (per questioni di privacy, o per
effettuare dei test) la soluzione migliore è creare una directory
che contiene questa/queste libreria/e e poi creare una variabile
d'ambiente che mi fornisce il link alla directory contenente la
mia libreria. Ad esempio:

1. `mkdir /usr/local/mylibrary` creo una directory e all'interno
  ci metto la mia libreria
2. `export LD_LIBRARY_PATH=/usr/local/mylibrary` modifico la
  variabile d'ambiente `LD_LIBRARY_PATH` contenente il percorso
  alle librerie accessibile all'utente

N.B.: possiamo anche utilizzare più percorsi, infatti utente
posso utilizzare il separatore ":" per indicare i vari percorsi,
come ad esempio:

```sh
 export LD_LIBRARY_PATH=/usr/local/mylibrary:/usr/local/mylibrary2
```
Ricorda che se sono state effettuate delle modifiche all'interno
del file /etc/ld.so.conf, allora dobbiamo lanciare un "ldconfig",
viceversa se abbiamo aggiunto delle librerie solo per il mio
utente allora non sarà necessario lanciare il comando "ldconfig".
In linea di massima possiamo dire che:

* In presenza di modifiche della Configurazione Globale ->
  necessario un "ldconfig"
* In presenza di modifiche della Configurazione Locale -> non
  necessario un "ldconfig"


###  Problemi comuni con le librerie

Talvolta pur essendoci la libreria richiesta, prendiamo ad
esempio la libreria "libXft.so.2", il lancio di un eseguibile
potrebbe ancora lanciare il messaggio "error while loading shared
libraries: libXft.so.2: cannot open shared object file: No such
file or directory", questo avviene in quanto il sistema vuole
quella specifica libreria, ma per un'altra architettura, nel
nostro caso potrebbe ad esempio volere la versione per
architettura "i386" di quella libreria, mentre noi abbiamo solo
la versione per architettura `x86_64`, dobbiamo quindi procedere
con l'aggiungere i pacchetti per l'architettura "i386" e
installare la libreria. SOlitamente su Debian una determinata
libreria o pacchetto per un'altra architettura si può installare
accodando al nome del pacchetto la stringa ":i386", quindi nel
nostro caso, se la libreria "libXft.so.2" appartiene al pacchetto
"libxft2" ci basterà eseguire:

```sh
 # sudo apt-get install libxft2:i386
```
## Il Comando "dd"


Il programma "dd" costituisce un comando molto flessibile che ci
permette di copiare o convertire file da una locazione ad uno
specifico file, viene usato per diversi scopi, alcuni esempi
applicativi sono:

* Creare immagini ISO
* Effettuare Backup
* Salvare i primi 512 Byte nella partizione "/" di root per
* salvare il Master Boot Record
* Per riempire di zeri una partizione o in genere un dispositivo
  di memoria per poterlo svuotare completamente di tutti i dati
  presenti
* Per creare in genere un file di una determinata dimensione (ad
  esempio per effettuare qualche tipo di simulazione)
* Per creare file di swap
* Effettuare benchmark grossolani
* Salvare un dispositivo con tutte le sue relative partizioni e
  tabella delle partizioni, se ad esempio c'è un HD con diversi
  sistemi operativi e diversi dati, o ad esempio un'immagine SD
  di un sistema operativo con una configurazione particolare,
  possiamo usare dd per copiare tutto

Esempi di utilizzo sono:
```sh
 dd if=/root/mydir of=/home/user/backup.iso
 # dove if sta per "
 # input file" e of sta per "output file", in questo esempio viene
 # creata un'immagine iso della directory "mydir"
```
```sh
 dd if=/dev/sda1 of=/home/user/mbr.iso bs=512 count=1
 # in
 # questo caso viene effettuato un backup del Master Boot Record,
 # che costituisce i primi 512 byte della partizione/dev/sda1
```

* Il flag "bs" indica la dimensione del blocco (block size), ad
    esempio anche opzioni come "bs=1M" o "bs=2G" sono valide,
    dove i suffissi M e G indicano corrispettivamente Megabyte e
    Gigabyte, non utilizzare un suffisso corrisponde quindi ad
    una dimensione in byte, di default se il block size non viene
    specificato la dimensione è fissata a 512 byte

* Il flag "count" indica quanti blocchi della dimensione del
    flag bs devono essere copiati, in questo caso, siccome ci
    interessano solo i primi 512 byte, il flag count è settato ad
    1, mentre nel caso avessimo messo "count=2" allora in tutto
    avremmo copiato 1024 byte

* N.B.: Posso capire qual'è la mia partizione di boot,
    effettuando un "df -h" e visualizzando qual'è il device su
    cui è montata la partizione "/"

```sh
 dd if=/dev/urandom of=a.log bs=1M count=2
 # genera un file di
 # 2MB con contenuto casuale
```
Altri esempi di utilizzo possono essere:

```sh
 dd if=/dev/zero of=/home/user/zero bs=1M count=1
 # crea un file
 # da 1MB di dimensione, riempendolo di zeri... Quest'operazione
 # poteva essere effettuata anche attraverso i flag bs=1024
 # count=1024
```
```sh
 dd if=/dev/zero of=/dev/sdb1
 # cancella tutti i dati sulla
 # partizione sdb1 riempendola di zeri
```
```sh
 dd if=/dev/zero of=/dev/null bs=1M count=32768
 # effettua un
 # benchmark sulla banda di operazione CPU/Memoria, andando a
 # leggere qualche GB di zeri e poi buttandoli via, il risultato
 # sarà in B/s, più è alto e più il sistema è efficiente
```
per poter visualizzare un feedback sulla percentuale di
completamento possiamo eseguire:

```sh
 sudo pkill -USR1 -n -x dd
 # manda un segnale al programma dd,
 # quest'ultimo risponderà con la quantità di dati copiati
```
un'alternativa a dd che riporta anche informazioni sullo stato e
percentuale di completamento è "dcfldd".

Nota che a volte quando cerchiamo di creare chiavette USB con
immagini di alcuni sistemi operativi, e.g., slackware, gentoo,
freebsd, è preferibile, prima di dare queste immagini in pasto a "
dd" di eseguire un:

```sh
 isohybrid nome_immagine.iso
 # rende un iso ibrida in modo da
 # poter essere leggibile sia da un sistema UEFI che ISO.
```

## Manipolazione avanzata di file


Vediamo ora alcuni comandi per la manipolazione di file.

### Xargs

Un programma molto utile per eseguire uno specifico comando per
ogni voce sullo standard output è xargs, vediamone un esempio
applicativo:

```sh
 ls | grep test | xargs rm
 # rimuove tutti i file elencati, cioè
 # tutti i file che hanno la parola "test" all'interno del loro
 # nome
```
xargs in pratica quindi prende come input una lista di linee ed esegue un
comando per ogni linea.

E' importante ricordare che esiste su diversi sistemi operativi
il limite dei 128K con messaggio di error "Agument list too long",
questo errore e' comune quando con delle wildcards matchano un
grosso numero di file, quando questo accade dobbiamo
utilizzare xargs e find o printf.

Esempio:

```sh
printf '%s\0' finalplain* | xargs -0 rm
```

Un altro esempio:

```sh
printf '%s\0' /usr/include/sys/*.h | \
xargs -0 grep foo /dev/null
```

Vediamo un altro esempio:
```sh
echo 'one two three' | xargs mkdir
```

Per vedere quali comandi vengono effettivamente eseguiti possiamo fare cosi':
```sh
echo 'one two three' | xargs -t rm
# l'opzione -t ci mostra i comandi che vengono eseguiti
```
Un'opzione piu' sicura rispetto a -t che puo' essere utilizzata sia per
visualizzare il comando eseguito ma anche per chiedere conferma all'utente e':

```sh
echo 'onw two three' | xargs -p rm
```
Consiglio sempre di utilizzare l'opzione -p a meno che non stiamo scrivendo uno
script in cui non vogliamo chiedere conferma attraverso un input dell'utente.

Vediamo un altro esempio, ipotizziamo di avere un file di stringhe e vogliamo
convertire ognuna di queste stringhe in base64, per farlo possiamo usare xargs
in questo modo:

```sh
cat file.txt | xargs -p -n1 -I{} sh -c 'echo {} | base64'
```

Il programma xargs e' spesso usato in combinazione col programma find, ricorda
che infatti nonostante find abbia un'opzione chiamata '-exec', in realta' e'
molto piu' efficiente in termini di tempo utilizzare xargs.


### Sort

Sort è un programma utilizzato per riordinare i risultati sullo
standard output

```sh
 ls -al | sort -n -k5
 # this will sort the stdout numerically
 # attraverso il flag "-n" in funzione della quinta colonna,
 # attraverso il flag "-k5" in quanto il risultato di un "ls -al"
 # fornisce come quinta colonna le dimensioni dei file, le colonne
 # sono separate da uno spazio di default
```
```sh
 sort -n -k5 test.txt
 # stampa sullo standard output il file
 # test.txt riordinato numericamente in funzione della quinta
 # colonna
```
```sh
 sort -k7 -r test.txt > test_new.txt
 # riordina in modalità
 # inversa, attraverso il flag "-r", in funzione della settima
 # colonna il file test.txt e salva il risultato nel file "
 # test_new.txt"
```
```sh
 sort -t"," -k1,3 test.txt
 # in questo caso viene usato come
 # separatore il carattere "," attraverso il flag "-t" e il
 # riordinamento avviene in funzione della colonna 1 e della
 # colonna 3 sul file chiamato "test.txt"
```

Possiamo anche specificare il separatore ad esempio, se settato su
un tab per un file tsv ad esempio, possiamo riordinare il file
in funzione della seconda colonna numerica in ordine decrescente
facendo:
```sh
sort -t$'\t' -nr -k2
```
Oppure possiamo ad esempio ordinare i file in cui il delimiter per le
colonne e' il '|' con:
```sh
sort -t$'|' -nr -k2
```

La maggior parte delle volte vogliamo avere solo le linee uniche
per fare questo possiamo utilizzare:

```sh
 sort -u test.txt
 # visualizza il file escludendo le linee ripetute
```

Vediamo altri esempi di utilizzo di sort:
```sh
 sort a b | uniq > c   # c is a union b
 sort a b | uniq -d > c   # c is a intersect b
 sort a b b | uniq -u > c   # c is set difference a - b
```


### Expand ed Unexpand

Questi due comandi vengono utilizzati solitamente per sostituire
uno o una serie di spazi in un file con dei tab o viceversa, o ad
esempio cambiare il numero di spazi da cui è composto un tab.
Vediamo un esempio:

```sh
 expand myfile.txt > myfile2.txt
 # questo converte i caratteri
 # tab in spazi
```
```sh
 expand --tabs=10 myfile.txt > myfile2.txt
 # espando a 10 spazi
 # tutti i tab del file myfile.txt e salvo il risultato nel file
 # myfile2.txt
```
```sh
 unexpand -a myfile.txt > myfile2.txt
 # converto tutti gli spazi
 # in tab e salvo risultati in myfile2.txt
```


### Paste

Paste è un programma che unisce le righe di due file, ma è molto
utilizzato per unire colonne da file diversi oppure per visualizzare
le differenze tra due file, in quanto sullo standard output i due file
vengono affiancati; un esempio applicativo è:

```sh
 paste test1 test2
 # stampa riga per riga i due file sullo
 # standard output, molto utile nel momento in cui dobbiamo
 # confrontare i due file
```
```sh
 paste -d: users.txt passwords.txt
 # in questo caso genereremo
 # un file con le righe accoppiate e separate dal simbolo ":"
```

Possiamo anche visualizzare un file con tutti i valori su una colonna
sulle righe (quindi conversione colonna -> riga) eseguendo:
```sh
 paste -s users.txt
 # -s serve per convertire colonna in riga nello stesso file
```

Possiamo anche decidere il delimiter utilizzando:
```sh
 paste -sd',' users.txt
 # in questo caso -d',' imposta come delimiter per ogni campo
 # della riga il carattere virgola ','
```

Possiamo anche mettere piu' elementi delle colonne nella stessa
riga, ad esempio:
```sh
paste - - - - < input.txt
# in questo caso stiamo riorganizzando la struttura del file input.txt
# con 4 colonne dove ogni elemento e' preso consecutivamente dal
# file in input
```

Possiamo anche riorganizzare la struttura del file separando le
colonne con un punto e virgola ';' e mettendo tre colonne per ogni
riga:
```sh
 paste -d';' - - - < input
```
Nota che lo stesso identico risultato puo' essere ottenuto eseguendo:
```sh
paste -sd ';;\n'
# dove il numero di caratteri delimitatori determina la struttura del file
# quindi in questo caso avremmo un elemento ; un elemento ; un elemento
# e poi nuova riga
```

### Tr

Il comando "tr" viene utilizzato per effettuare sostituzioni
carattere per carattere, ad esempio:

```sh
 tr blah test < file.txt
 # questo comando "tradurrà" e cioè
 # sostituerà all'interno del file file.txt il catattere "b" col
 # carattere "t", il carattere "l" col carattere "e", il carattere
 # "a" col carattere "s" e il carattere "h" col carattere "t"
```
```sh
 tr a-z A-Z < fileName
 # converte un testo in minuscolo in un
 # testo in maiuscolo
```
```sh
 tr -d 'a-zA-Z' < fileName
 # col flag -d rimuoviamo tutti i
 # caratteri menzionati
```
```sh
 tr -dc 'a-zA-Z' < fileName
 # col flag -c facciamo il
 # complemento del set dei caratteri menzionati, quindi in questo
 # caso con -dc in pratica eliminiamo tutti i caratteri dal file,
 # eccetto quelli nel gruppo 'a-zA-Z'
```

Possiamo utilizzare il comando tr anche per effettuare squeeze, cioe' ad esempio
rimuovere ripetizioni di caratteri.
Un esempio e' voler rimuovere le doppie spaziature all'interno di un file,
questo puo' essere fatto eseguendo:
```sh
tr -s ' ' < filename
```

Un altro utilizzo e' quello di rimuovere caratteri specifici da un file come ad
esempio, nel caso volessimo rimuovere tutti i newline possiamo eseguire:
```sh
tr -d '\n' < filename
```

Inoltre per indicare i set di caratteri possiamo anche utilizzare notazioni del
tipo [[:alnum:]] o [[:alpha:]] e cosi' via.

N.B.: Per effettuare la sostituzione di stringhe il comando sed è
più flessibile.




### Contare le linee di un file

Per contare le linee esistono diverse opzioni, alcune classiche
opzioni sono:

```sh
 nl file.txt
 # stampa il numero di linee del file chiamato
 # file.txt
```
```sh
 nl -s. file.txt
 # stampa il numero di linee del file menzionato
 # inoltre accoda ad ogni numero un ".", il flag "-s" serve
 # appunto a mettere una stringa dopo il numero di linea
```
```sh
 cat -n file.txt
 # stampa il numero di linee del file chiamato
 # file.txt
```
Nel caso avessimo un file con righe ridondanti e vogliamo
mostrare solo le righe uniche, quindi senza contare le righe
ridondanti, utilizziamo il comando "uniq", ad esempio:

```sh
 cat file.txt | sort | uniq -u
 # oppure possiamo utilizzare "sort -u"
```

### Fmt

E' possibile formattare il testo attraverso il comando "fmt", per
vedere le diverse opzioni possiamo effettuare un "man fmt".

Un applicazione utile di fmt ad esempio e' quando non siamo stati troppo attenti
nel formattare il nostro file o script ignorando il numero di colonne massimo
per mantenere una certa leggibilita'.

Ad esempio, per molti linguaggi di programmazione la convenzione e' avere un
massimo di 80 colonne per ogni riga.

Il comando fmt ci aiuta nel fare questo, ad esempio, nel caso il nostro script
chiamato "script.c" non rispettasse la convenzione delle 80 colonne possiamo
fixarlo eseguendo:
```sh
fmt -w 80 script.c
```

Di default, il comando fmt, formatta utilizzando 75 caratteri per riga, quindi
e' equivalente ad un -w 75.


### Uniq

Questo comando è utile per visualizzare le righe uniche
all'interno di un file, deve essere usato sempre in coppia con "
sort" altrimenti considera unica una riga solo se non è uguale
alla precedente, vediamo qualche esempio di utilizzo

```sh
 cat data.txt | sort | uniq -c
 # mostra per ogni riga quante
 # occorrenze ci sono
```
```sh
 cat data.txt | sort | uniq -u
 # mostra solo le righe uniche
```
```sh
 cat data.txt | sort | uniq | sort -n
 # mostra per ogni riga
 # quante occorrenze ci sono ma questa volte secondo un ordine
 # crescente, quindi le righe più rare saranno in alto
```


## Effettuare Backup

In informatica con il termine backup, copia di sicurezza o copia
di riserva si indica la replicazione, su un qualunque supporto di
memorizzazione, di materiale informativo archiviato nella memoria
di massa dei computer al fine di prevenire la perdita definitiva
dei dati in caso di eventi malevoli accidentali o intenzionali.
Si tratta dunque di una misura di ridondanza fisica dei dati,
tipica delle procedure di disaster recovery. [Wikipedia]

Nei sistemi GNU/Linux Esistono diverse tecniche per effettuare
backup, è da notare che in realtà esistono diverse tipologie di
backup, ad esempio il metodo più semplice di backup sarebbe
quello di effettuare una semplice copia attraverso il comando "cp"
, con:

```sh
 cp -u mioFile mioFile2
 #  in questo caso il file viene copiato
 # solo nel caso in cui mioFile2 non esiste o nel caso in cui
 # mioFile2 esistente è più vecchio, ma non avviene una
 # sincronizzazione completa (cioè nel caso di intere directory i
 # file eliminati nella directory sorgente rimangono nella
 # directory destinataria se sono stati copiati in un altro
 # momento precedente)
```
L'esempio visto qui sopra è veramente basilare e non fa altro che
effettuare una semplice copia, mentre i programmi di backup
generalmente possono presentare le seguenti funzionalità:

* Copia immagine di un disco rigido
* Copia selettiva di directory e singoli file
* Criteri di selezione per la ricerca dei contenuti salvati e per
  la scelta di quelli che devono essere oggetto di backup (per
  data, tipo di file, autore della modifica)
* Compressione dei contenuti per ridurre la memoria richiesta per la copia
* Sicurezza: protezione dei dati copiati attraverso password e crittografia

Vediamo ora alcune tecniche per effettuare backup su sistemi
GNU/Linux che prevedono l'utilizzo di Tar o Rsync.


## Backup con Tar

Un semplice modo di effettuare backup col comando Tar ed ottenere
compressione è:

```sh
 tar -pczf mybackup.tar.gz /home/user/
 # viene effettuato un
 # backup della directory /home/user/ in un archivio chiamato
 # mybackup.tar.gz, il flag "-p" indica di preservare la struttura
 # dei permessi di tutti i file e il flag "-z" di comprimere
 # utilizzando l'algoritmo gzip
```
Un altro esempio molto interessante è quello di effettuare backup
periodici utilizzando questa il programma tar, questo è possibile
attraverso uno script in cui scriviamo:

```sh
 tar -pczf /home/backup/backup.`/bin/date +\%y\%m\%d`.tar.gz home/user/
 # crea archivi con la data nel nome, della directory /home/user
```
Un'altra opzione è quella di aggiungere questo comando a "cron",
in modo da poterlo eseguire periodicamente.


## Backup con Rsync

Uno strumento veramente molto flessibile per effettuare backup è
costituito da "rsync", molte distro hanno questo comando
installato di default. Vediamo subito alcuni esempi:

```sh
 rsync -av sourceDir /var/backups/destDir
 # copia la directory
 # sourceDir in destDir e lo fa in modalità "verbose" cioè
 # stampando sullo standard output file per file copiato, il flag "
 # -a" sta per archivio e costituisce la combinazione di più flag "
 # -rlp" e quindi:
 # 1.copia ricorsivamente le directory
 # 2.copia anche i link
 # 3.preserva la struttura dei permessi
```


```sh
 rsync -avz --delete /media/sorgente /media/giuseppe/destinazione/
 # viene effettuata una copia di
 # backup da sorgente a destinazione, il flag "-z", indica di
 # effettuare la compressione per il trasferimento, e l'opzione "
 # --delete" cancella i file in "destinazione" che non sono
 # presenti in "sorgente", quindi "destinazione" diventa una copia
 # esatta di "sorgente"
```
```sh
 rsync -avzi --delete --progress /media/sorgente /media/giuseppe/destinazione/
 # viene effettuata la stessa
 # operazione precedente, solo che attraverso il flag "-i" vengono
 # visualizzate le modifiche effettuate in destinazione e
 # attraverso l'opzione "--progress" viene visualizzato lo stato
 # del backup
```
Il programma rsync può anche essere usato per sincronizzare
directory su (o da) server remoti, ad esempio:

```sh
 rsync -av gng@andromeda:/home/gng/mySourceFolder /home/marco/BackupServer/
```

Possiamo anche utilizzare una porta diversa dalla 22 attraverso un lancio
leggermente piu' arzigogolato come:

```sh
 rsync -avzh --delete  -e "ssh -p 2222" output/ user@1.1.1.1:/srv/www/website/
 # sincronizziamo da locale a remoto
 # utilizzando la porta 2222
```


```sh
 rsync -avzh --delete  -e "ssh -p 2222" user@1.1.1.1:/srv/www/website/ output/
 # sincronizziamo da remoto a locale
 # utilizzando la porta 2222
```

## Visualizzare file compressi

Per poter visualizzare file di testo compressi possiamo utilizzare
le utility: zcat, zless, zmore e zgrep.

## File Binari

For binary files, use hd, hexdump or xxd for simple hex dumps and bvi, hexedit or biew for binary editing.

