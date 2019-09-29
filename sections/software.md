
A differenza della distro utilizzata si hanno diversi manager dei
pacchetti (o delle installazioni più in generale).

* Le Debian based utilizzano:
    * APT: Per installare pacchetti da repository
    * DPKG: Per installare pacchetti locali con estensione ".deb"
    * Aptitude: E' uno strumento aggiuntivo per installare i
        pacchetti da repository ormai non più molto usato

* Le RedHat based utilizzano:
    * YUM: Per installare pacchetti da repository
    * RPM: Per installare pacchetti locali con estensione ".rpm"
    * Yumdownloader & Rpm2cpio: Sono strumenti aggiuntivi per
        gestire i pacchetti

* Le Arch based utilizzano:
    * Pacman
* Le Gentoo based utilizzano:
    * Portage: Costituisce un sistema più complesso, su questo tipo
        di distro si compilano i codici sorgenti anche se qualche
        pacchetto binario esiste.

Comandi comuni a tutte le distro per avere delle informazioni sui
programmi installati sono whereis e which.
N.B.: E' possibile convertire un pacchetto ".rpm" in ".deb" o viceversa
attraverso un programma chiamato alien.

N.B.2: Un comodo reference per vedere le differenze tra un package manager
e l'altro è:
[Differenze principali tra Package Manager](https://wiki.archlinux.org/index.php/Pacman_Rosetta).


## Whereis

Il programma whereis cerca i file relativi ad un programma
installato, ha delle directory predefinite dove cercare. Mi
fornirà la locazione dei binari (eseguibili), delle librerie
relative al programma e delle pagine man del programma; questo
comando è quindi utilizzato per localizzare i programmi
installati nelle loro directory.

```sh
 whereis apache2
 # mi fornisce tutte le locazioni riguardanti il pacchetto apache2
```


## Which

Il programma "which" mi dice il percorso assoluto del
comando/programma esistente su un computer e sui eventuali alias.

```sh
 which nomecomando
 # mi fornisce il percorso dell'eseguibile e
 # la lista degli alias associati a questo eseguibile
```
Un'altra differenza tra which e whereis sta nel fatto che which
cerca gli eseguibili solo nelle directory elencate nella
variabile d'ambiente $PATH, mentre whereis cerca gli eseguibili
in tutto il filesystem. We have to understand that we can run
programs without "./programName" but only with "programName" if
the program is located in one of the positions of the shell
variable "$PATH".


## Informazioni generali sui pacchetti


Quando vediamo un pacchetto tipo:

`nano-2.2.6-1.i386.rpm`

Allora le informazioni sono separate dai trattini, sto
installando il pacchetto chiamato "nano" della versione 2.2.6
della build 1 per l'architettura CPU i386.

## Installazione di programmi portable


Può capitare a volte di scaricare programmi per cui viene è
disponibile la directory con gli eseguibili, quindi non possiamo
installare questo programma con un gestore pacchetti ma ci basta
avviarlo (una volta assicurati di avere i permessi di avvio "
chmod +x nomepgm") con "./nomepgm". Per rendere eseguibile un
programma avviandolo direttamente da terminale con "nomepgm" come
se avviassimo un programma normale allora è buona norma
installare il programma nella directory "/opt/directoryPgm" e poi
creare un soft link nella directory "/usr/bin".

## Type & Alias


Type mi dice come viene interpretato un comando, quindi posso
vedere se quello che sto eseguendo è un alias.

```sh
 type ls
 # mi dice come viene eseguito ls e se è un alias a cosa
 # si riferisce
```
Gli alias sono una struttura comoda per automatizzare dei flag
con dei comandi o generalmente per riferirmi a comandi lunghi con
nomi più corti; da terminale posso eseguire:

```sh
 alias
 # mi mostra tutti gli alias in uso dall'utente
```
```sh
 alias nomeComando
 # mi mostra l'alias associato al comando,
 # vedasi "alias ls"
```
```sh
 alias name='unix command with options'
 # mi setta name al
 # comando tra singoli apici
```
```sh
 unalias nomeComando
 # elimina l'alias associato al comando "
 # nomeComando"
```
```sh
 unalias -a
 # elimina tutti gli alias
```
```sh
 alias edu="/home/myDirectory/myInterestedDir"
 # usata per fare
 # shortcut a directory, dopo posso usare la notazione "cd $edu" o
 # generalmente "$edu" per riferirmi al percorso creato, soluzione
 # non utilizzata, nella realtà si usano le variabili per queste
 # cose, in quanto gli alias vengono utilizzati più per i comandi,
 # quindi creo una variabile e poi mi riferisco con la notazione "
 # $nomeVariabile"
```
Nota bene che gli alias variano da utente ad utente, e vengono
cancellati dopo il logout, per rendere un alias permenente
dobbiamo salvare il comando alias all'interno del file "~/.bashrc"
 o in caso di alias globale (che vale per tutti gli utenti) in "
/etc/bash.bashrc"; anche se non è rara in alcuni casi la presenza
di un file chiamato ".bash_aliases", fatto appositamente per gli
alias, comunque possiamo capire se questo file viene letto dal
file ".bashrc".


## APT Package Manager (High Level)

Il comando `apt-get` is a high-level package manager for Debian and
derivatives, and provides a simple way to retrieve and install
packages, including dependency resolution, from multiple sources
using the command line. Unlike dpkg, apt-get does not work
directly with `*.deb` files, but with the package proper name.

In /etc/apt/sources.list contiene i repository, è sempre meglio
installare i programmi esclusivamente dal repository e aggiungere
al repository sorgenti fidate. Con:

```sh
 apt-get update
 # aggiorno le informazioni dei repository.
```
```sh
 apt-cache search apache2
 # cerca tutti i pacchetti relazionati
 # ad apache2
```
```sh
 apt-cache search "web server"
 # mi elenca tutti i pacchetti che
 # hanno nella descrizione quel nome
```
```sh
 apt-cache show apache2
 # mostra informazioni sul pacchetto
 # chiamato "apache2", come dimensioni del pacchetto, descrizione
 # ed altro
```
```sh
 apt-cache show apache2 | grep -i "installed-size"
 # mostra le
 # dimensioni del pacchetto
```
```sh
 apt-get install apache2
 # installa apache2, o se apache2 è già
 # installato, lo aggiorna all'ultima versione, in questo caso
 # viene aggiornato solo il pacchetto apache2
```
```sh
 apt-get remove apache2 --purge
 # disinstalla un pacchetto,
 # l'opzione --purge si assicura di effettuare un complete removal
```
```sh
 apt-get purge apache2
 # effettua la stessa cosa del precedente
```
```sh
 apt-get clean
 # pulisce i file temporanei delle installazioni
 # effettuate. i ".deb" ad esempio
```
```sh
 apt-get autoclean
 # toglie i file nel repository che non sono
 # più disponibili "i vecchi .deb"
```
```sh
 apt-get -t wheezy-backports nomePacchetto
 # installa un
 # pacchetto da un repository da noi specificato, ad esempio
 # utilizzato quando si usano repository stable e backports
```
```sh
 apt-get install -s php5
 # fa una simulazione elencando i file
 # che installerebbe quelli che rimuoverebbe e qualli modificati
```
```sh
 apt-get install -y php5
 # conferma con "yes" a tutte le domande
```
```sh
 apt-get install —show-progress perl5
 # mostra il progresso del
 # processo con delle percentuali
```
```sh
 apt-get install --fix-broken
 # mette a posto pacchetti broken,
 # con dipendenze mancanti
```
```sh
 sudo apt-get --no-install-recommends install
 # installa un
 # pacchetto senza quelli raccomandati, questo è utile quando si
 # installa ad esempio un desktop environment e non si vuole
 # installare tutta la marea di pacchetti di base che vengono
 # solitamente installati con questi
```
```sh
 apt-get install --only-upgrade nomepacchetto
 # aggiorna solo il
 # pacchetto chiamato nomepacchetto
```
```sh
 apt-get install --install-suggests
 # mi installa anche i
 # pacchetti suggeriti, utili con alcuni pacchetti che una volta
 # installati ci sembra che ancora manchi qualcosa, ad esempio
 # nella mia esperienza (lyx, qtcreator, ecc...)
```
```sh
 # apt-get install
```
```sh
 apt-get source php5
 # scarica il pacchetto coi file sorgenti
 # nella directory presente
```
```sh
 apt-get download nomepgm
 # mi scarica il .deb del pgm
```
```sh
 # apt-get download package; dpkg -i --force-not-root --root=$HOME
  package.deb
 # installa un pacchetti a livello utente, molto
 # utile, nel momento in cui non vogliamo sporcare le directory di
 # sistema
```
```sh
 apt-get upgrade
 # aggiorna tutti i pacchetti, lasciando i
 # pacchetti alla versione corrente ancora installati, e non
 # aggiorna i pacchetti che richiedono la rimozione di altri
 # pacchetti
```
```sh
 apt-get build-dep -d nomepacchetto
 # scarica tutti i pacchetti
 # dipendenza del pacchetto menzionato, questa opzioni è molto
 # utile nel momento in cui dobbiamo passare un pacchetto ad un
 # server offline che non ha accesso ad alcun repository su
 # internet o a cui è stata privata la connettività, attenzione
 # sarà ovviamente necessario scaricare anche il pacchetto
 # interessato con un "apt-get download nomepacchetto", inoltre i
 # pacchetti saranno trovati nella directory "
 # /var/cache/apt/archives/", è l'analogo di "yumdownloader
 # --resolve" delle distro RH-Based
```
```sh
 apt-get dist-upgrade
 # aggiorna tutti i pacchetti, e a
 # differenza di un normale "apt-get upgrade" rimuove le versioni
 # correnti dei programmi, e gestisce in modo intelligente
 # l'aggiornamento dell'intero sistema, solitamente questo
 # costituisce un aggiornamento della distro ,(The command upgrade
 # keeps a package at its installed obsolete version if upgrading
 # would need an extra package to be installed, for a new
 # dependency to be satisfied. The dist-upgrade command is less
 # conservative.)
```
```sh
 # apt-get dist-upgrade -d; sudo apt-get dist-upgrade --no-download

 # in this case we first only download the packages and then we
 # upgrade from the packages in the cache
```
```sh
 apt-cache stats
 # fornisce statistiche
```
```sh
 apt-cache depends apache2
 # mi dice le dipendenze del pacchetto
 # apache2
```
```sh
 apt-cache pkgnames
 # mi lista tutti i pacchetti con | wc -l mi
 # dice anche il numero (word count)
```
```sh
 apt-cache unmet
 # mi lista le dipendenze non soddisfatte
 # all'interno del repo
```
```sh
 apt-get install --only-upgrade nomepacchetto
 # aggiorna solo il
 # pacchetto menzionato, e solo se quest'ultimo è già installato
 # sul sistema, nel caso il pacchetto non sia installato sul
 # sistema, allora nessun aggiornamento verrà eseguito e nessun
 # pacchetto verrà installato
```
```sh
 apt-mark hold pkg
 # holda un pacchetto, cioè fa in modo che non
 # venga aggiornato/rimosso da successive
 # installazioni/aggiornamenti
```
```sh
 apt-mark unhold pkg
 # rimuove l'hold dal pacchetto menzionato
```
```sh
 cat /etc/apt/preferences
 # visualizza i pacchetti messi in hold
```
La directory "/var/cache/apt/archives" che contiene gli archivi
scaricati dei pacchetti .deb, in pratica quando faccio clean ed
autoclean il package manager rimuove i pacchetti scaricati in
questa directory. Se mi dovesse servire un programma da portare
su un altro computer, potrei installarlo e poi andare a prendere
da qui tutti i pacchetti con le dipendenze. E' possibile capire
in quale pacchetto è contenuto un certo comando attraverso
l'utility "apt-file", che deve essere installato, facciamo
quindi:

```sh
 apt-get install apt-file
 # installa apt-file
```
```sh
 apt-file update
 # aggiorna la cache apt-file
```
```sh
 apt-file search nomeComando
 # cerca in quali pacchetti è
 # contenuto il comando "nomeComando"
```
```sh
 whereis cal; apt-file search /usr/bin/cal | grep -w cal
 # molto
 # utile quando accoppiato al comando whereis, per vedere da dove
 # viene un determinato eseguibile
```
```sh
 apt-file search convert | grep -iw "/usr/bin/commandName"
 # cerca a quale pacchetto appartiene il comando col percorso
 # specificato
```
  Altre utility per il package management

Se dobbiamo gestire i programmi compilati, può essere utile
utilizzare "checkinstall", che mantiene nel repository i
programmi compilati.

```sh
 # checkinstall is a program that tracks all files installed by
 # "make install" (or equivalent), creates a Debian (or other)
 # package with those files, and adds it to the installed packages
 # database, allowing for easy package removal or distribution.
  http:
 # asic-linux.com.mx/~izto/checkinstall/
```
```sh
 # stow is a nifty program used to manage a /usr/local/ hierarchy.
 # It keeps all the programs separate, so you can install and
 # remove them without playing the "which program does that file
 # belong to" game; ask me about
```

## DPKG (Low Level)

dpkg is a low-level package manager for Debian-based systems. It
can install, remove, provide information about and build `*.deb`
packages but it can’t automatically download and install their
corresponding dependencies.

```sh
 dpkg -i nomepacchetto
 # installa il pacchetto, è da notare che
 # solitamente darà errori dovuti alla mancanza delle dipendenze,
 # questo evento viene registrato dal nostro sistema e dovremo
 # solo lanciare un "apt-get update" seguito da un "apt-get -f
 # upgrade" per installare o aggiornare i pacchetti richiesti; se
 # il pacchetto è già installato, questo viene aggiornato
```
```sh
 dpkg --get-selection
 # lista tutti i pacchetti installati
```
```sh
 dpkg -l
 # elenca tutti i pacchetti installati con le relative
 # versioni, utile anche per fare report del software installato
 # in un sistema
```
```sh
 dpkg -L nomepgm
 # lista tutti i file installati da quel
 # programma.
```
```sh
 dpkg-reconfigure nomepgm
 # mi riconfigura il programma, se ho
 # sbagliato qualcosa nella configurazione; molto utile dopo
 # aggiornamenti se dovessi avere problemi (mi è capitato ad
 # esempio con un programma di virtualizzazione dopo degli
 # aggiornamenti), in pratica è il comando adatto ogniqualvolta
 # vogliamo effettuare delle reinstallazioni, in quanto pur
 # eliminando un programma con "apt-get purge nomeProgramma" e
 # reinstallandolo non avrebbe lo stesso effetto, questo
 # comportamento è causato da configurazioni di default usate da
 # debconf, che ci porteranno ad utilizzare le stesse
 # confiugurazioni precedenti nel momento in cui non viene
 # lanciato un dpkg-reconfigure
```
```sh
 dpkg --remove nomepgm
 # rimuove il programma ma lascia intatti i
 # file di ocnfigurazione
```
```sh
 dpkg --purge nomepgm
 # rimuove qualsiasi cosa (anche file di
 # config) relativa al pgm indicato, nel caso dovessimo avere
 # problemi con un remove normale, questo costituisce un remove
 # più a basso livello
```
```sh
 dpkg -S /usr/bin/nomeProgramma
 # indica il pacchetto da cui è
 # stato installato il programma nomeProgramma
```
```sh
 dpkg -s nomePacchetto | grep Status
 # mi dice se un programma è
 # installato o meno
```
```sh
 dpkg -S /path/to/file
 # indica il pacchetto da cui è stato
 # installato il determinato file, uguale a "dpkg --search filename"
 # , un'alternativa più fast è dlocate
```
```sh
 dpkg --purge `dpkg -l | egrep "^rc" | cut -d' ' -f3`
 # rimuove i
 # file di configurazione di programmi che sono stati rimossi ma
 # hanno lasciato i loro file di configurazione, MOLTO UTILE
```
```sh
 apt-get download package; dpkg -i --force-not-root --root=$HOME package.deb
 # installa un pacchetti a livello utente, molto
 # utile, nel momento in cui non vogliamo sporcare le directory di
 # sistema
```
```sh
 dlocate -S filename
 # uguale a "dpkg -S /path/to/file", ma più
 # veloce, attenzione questi ultimi due comandi funzionano solo
 # per file già presenti sul sistema
```
```sh
 zgrep foo Contents-ARCH.gz
 # in questo caso cerchiamo file o
 # parole chiave all'interno di pacchetti non installati, se non
 # troviamo ad esempio il file /etc/fileAcaso.conf, e non sappiamo
 # come si chiama il pacchetto che lo installa, possiamo usare
 # questo comando, al posto di "ARCH", dobbiamo mettere
 # l'architettura desiderata
```
```sh
 dpkg --status nomePacchetto
 # indica molte informazioni sul
 # pacchetto e anche le dipendenze opzionali consigliate, (molto
 # importanti, se il programma installato non si comporta come ci
 # aspettiamo), ad esempio lyx
```
```sh
 dpkg-query -Wf '${Installed-Size}\t${Package}\n' | sort -n
 # check biggest packages, un'altra opzione sarebbe installare il
 # programma wajig
```
posso verificare la corretta disinstallazione di un programma,
dopo averlo disinstallato con:

```sh
 which nomepgm
```
o con

```sh
 dpkg --get-selections | grep nomepgm
```


## Aptitude (High Level)

aptitude is another high-level package manager for Debian-based
systems, and can be used to perform management tasks (installing,
upgrading, and removing packages, also handling dependency
resolution automatically) in a fast and easy way. It provides the
same functionality as apt-get and additional ones, such as
offering access to several versions of a package.

Aptitude è un'altra interfaccia ad alto livello per gestire
pacchetti:

```sh
 aptitude search nomepgm
 # mi fornisce una lista dei pacchetti
 # affini a nomepgm
```
```sh
 aptitude install nomepgm
 # installa il programma nomepgm
```
```sh
 aptitude hold package_name
 # locka un pacchetto alla versione
 # corrente
```
```sh
 aptitude unhold package_name
 # unlocka un pacchetto
```
```sh
 aptitude
 # richiama l'interfaccia grafica, da qui possiamo
 # anche settare i pacchetti che non voglio aggiornare, posso
 # schiacciare "?" per avere un help
```
```sh
 aptitude update
 # aggiorna il repository
```
La maggior parte dei comandi per APT esiste anche per Aptitude.


## YUM (High Level)

yum adds the functionality of automatic updates and package
management with dependency management to RPM-based systems. As a
high-level tool, like apt-get or aptitude, yum works with
repositories.

Yum nasce con la distribuzione GNU/Linux Yellowdog è l'analogo di
apt-get di debian. Il file di configurazione è "/etc/yum.conf", e
non va toccato se non per modificare i repository. Abbiamo anche
un altro file dove è possibile settare i repository, il posto è "
/etc/yum.repos.d/" in questa directory ho una lista di file con
estensione ".repo" che rappresentano i repository. Alcuni esempi
di applicazione di yum:

```sh
 yum update
 # aggiorna il database dei repository
```
```sh
 yum search nomepgm
 # cerca il pacchetto nomepgm
```
```sh
 yum check-update
 # controlla se sono disponibili aggiornamenti
```
```sh
 yum install nomepacchetto
 # installa il pacchetto nomepacchetto
```
```sh
 yum check-update nomepgm
 # controlla se ci sono aggiornamenti
 # per il programma nomepgm
```
```sh
 yum remove nomegpm
 # rimuove il programma
```
```sh
 yum upgrade
 # è uguale ad update ma rimuove dal database i
 # pacchetti obsoleti
```
```sh
 yum list nomepgm
 # elenca le caratteristiche del pacchetto
 # nomepgm
```
```sh
 yum info nomepgm
 # è equivalente a rpm -qi su un programma
 # installato
```
```sh
 yum deplist nomepgm
 # elenca le dipendenze di nomepgm
```
```sh
 yum clean packages
 # rimuove i pacchetti nella cache
```
```sh
 yum repolist
 # elenca gli attuali repository
```
```sh
 yum provides nomeComando
 # mi indica quale pacchetto mi
 # fornisce un determinato eseguibile, utile nel momento in cui
 # dobbiamo installare su un'altra macchina determinati programmi
```
```sh
 yum clean all
 # rimuove tutto dalla cache (pacchetti, headers,
 # metadata, plugins, ecc...)
```
```sh
 yum grouplist
 # elenca tutti i gruppi di pacchetti disponibili
```
```sh
 yum grouplist "Development Tools"
 # elenca i gruppi di
 # pacchetti che hanno nel nome la stringa indicata
```
```sh
 yum groupinfo "Development Tools"
 # visualizza informazioni e i
 # pacchetti compresi nel group "Development Tools"
```
```sh
 yum groupinstall "Development Tools"
 # installa il gruppo
 # chiamato "Development Tools" che contiene tutti i tool
 # richiesti per la compilazione
```
Per poter visualizzare la lista di file installati da un
pacchetto dobbiamo installare il programma yum-utils, attraverso:

```sh
 yum install yum-utils
```
Una volta installato, nel momento in cui volessimo vedere i file
installati dal pacchetto di nome "nomePacchetto", eseguiamo un:

```sh
 repoquery -l "nomePacchetto"
 #  il flag "-l" è equivalente
 # all'opzione "--list"
```
## RPM (Low Level)


rpm is the package management system used by Linux Standard Base
(LSB)-compliant distributions for low-level handling of packages.
Just like dpkg, it can query, install, verify, upgrade, and
remove packages, and is more frequently used by Fedora-based
distributions, such as RHEL and CentOS.

```sh
 rpm -i nomepgm
 # per installare il pacchetto, (non me lo
 # installa se esiste un pacchetto con lo stesso nome), se devo
 # aggiornare prima lo elimino.
```
```sh
 rpm -e nomepgm
 # mi elimina il pacchetto ma solo l'eseguibile
 # non documentazione ecc... (tipo dpkg --remove nomepgm)
```
```sh
 rpm -ihv nomepacchetto.rpm
 # mi installa il pacchetto con 'h'
 # mi fa vedere il progresso e la 'v' sta per verbose.
```
```sh
 rpm -q nomepacchetto
 # mi fa una query cercandomi i pacchetti
 # che hanno quel nome installati sul mio sistema
```
```sh
 rpm -qi nomepacchetto
 # mi fa vedere le info di installazione
 # relative ad un pacchetto installato sul mio sistema.
```
```sh
 rpm -qf percorso
 # mostra quale pacchetto ha installato il
 # programma o la directory situata in "percorso"
```

ad esempio nel caso volessimo vedere quale pacchetto è
responsabile dell'installazione del programma "lspci",
facciamo un "whereis lspci" per mostrare il percorso e
supponendo che il percorso del programma sia "/usr/sbin/lspci",
eseguendo un `rpm -qf /usr/sbin/lspci` vediamo il pacchetto
che ci ha fornito il programma lspci, oppure un altro caso
potrebbe essere, vogliamo vedere quale pacchetto ha
installato la directory "/etc/init.d", allora eseguiamo un
`rpm -qf /etc/init.d` e verrà mostrato il pacchetto responsabile

```sh
 rpm -q --list nomepacchetto
 # mi elenca tutti i file relativi a
 # quel pacchetto
```
```sh
 rpm -qR nano
 # mi dice le dipendenze e le librerie utilizzate
 # di nano 'R' sta per requirements
```
```sh
 rpm -u nomepacchetto
 # aggiorna il pacchetto
```
```sh
 rpm -f nomepacchetto
 # upgrada il pacchetto solo se esiste una
 # versione precedente
```
Potrebbe capitarmi di dover fare il rebuild del database, con `rpm --rebuilddb`.
( lo faccio se ho fatto molte installazioni/rimozioni). E' importante il file
/usr/lib/rpm/rpmrc che è il file di configurazione per il
programma rpm, non bisogna far casini qui.

## Yumdownloader and rpm2cpio


Yumdownloader ci permette di scaricare file dal repository senza
installarli (cosa che normalmente fa yum), possiamo eseguire:

```sh
 yumdownloader nomepgm
 # scarica il pacchetto del programma
```
```sh
 yumdownloader --source nomepgm
 # scarica il pacchetto sorgente
 # del programma
```
```sh
 yumdownloader --resolve nomepgm
 # questo comando scaricherà il
 # pacchetto con l'intero albero delle dipendenze associate, è
 # molto utile nel caso dovessi installare un'applicazione su un
 # server senza connetterlo ad internet o installare un programma
 # su una macchina che non può connettersi ad internet
```
Cpio is a package used to view rpm package content, but in order
to view it we must use

```sh
 rpm2cpio filename.rpm | cpio -t
 # cpio archive are info files
 # containing info about a package; basically rpm2cpio creates a
 # cpio of our rpm package.
```


## cpio

cpio is a general file archiver utility and its associated file
format. It is primarily installed on Unix-like computer operating
systems. The software utility was originally intended as a tape
archiving program as part of the Programmer's Workbench
(PWB/UNIX), and has been a component of virtually every Unix
operating system released thereafter. Its name is derived from
the phrase copy in and out, in close description of the program's
use of standard input and standard output in its operation.

All variants of Unix also support other backup and archiving
programs, such as tar, which has become more widely recognized.
The use of cpio by the RPM Package Manager, in the initramfs
program of Linux kernel 2.6, and in Apple Computer's Installer
(pax) make cpio an important archiving tool. We must remember
that both tar and cpio have a single purpose: concatenate many
separate files to a single stream, in other words their purpose
is to create a single contiguous file from an input of multiple
files and directories. They don't compress data. (These days tar
is more popular due to its relative simplicity -- it can take
input files as arguments instead of having to be coupled with
find as cpio has.)

Vediamo alcuni esempi:

```sh
 find . -depth | cpio -ov > archive.cpio
 #  l'opzione "-o" crea
 # un archivio, mentre "-v" visualizza a video la lista di tutti i
 # file inclusi, the '-depth' option forces 'find' to print of the
 # entries in a directory before printing the directory itself.
 # This limits the effects of restrictive directory permissions by
 # printing the directory entries in a directory before the
 # directory name itself
```
```sh
 cpio -idv < directory.cpio
 # estrae la directory
```
```sh
 ls | cpio -ov -H tar -F sample.tar
 # in questo modo si crea un
 # archivio tar con cpio, attenzione che ls includerà solo i file
 # ad un livello di profondità, avremmo dovuto usare invece "find
 # ." per includerli tutti
```
```sh
 find . -depth | cpio -H newc -ov --owner root:root > initramfs.cpio
 # questo comando è utilizzato quando ad esempio
 # si creano initramfs, con il flag "-H" specifico il formato
 # dell'archivio cpio, in questo caso il formato è "newc", quello
 # utilizzato dalle initramfs, è utilizzato "newc", which supports
 # file systems having more than 65536 inodes, altre possibili
 # opzioni con il flag "-H" sono:
```

* odc: The old (POSIX .1) portable format.
* crc: The new (SVR4) portable format with a checksum added; in
    pratica un newc con un checksum addato
* tar: The old tar format.
* hpodc: The portable format used by HPUX's cpio (which stores
    device files differently).
* ecc..


