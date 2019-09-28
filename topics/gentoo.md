
Portage is the package manager of gentoo, it is completely
written in Python and Bash and therefore fully visible to the
users as both are scripting languages.

Most users will work with Portage through the emerge tool. This
chapter is not meant to duplicate the information available from
the emerge man page. For a complete rundown of emerge's options,
please consult the man page.

Per vedere il portage tree andiamo in:

```sh
 cd /usr/portage
 # ci posizioniamo nella directory contenente il
 # tree di portage
```
il portage di tree è organizzzato in categorie, e in ogni
categoria ci sono varie applicazioni, e per ogni applicazioni c'è
il proprio ebuild, un ebuild è un file contenente informazioni
per la compilazione di uno specifico pacchetto. Per poter
visualizzare la versione di portage eseguiamo:

```sh
 emerge --info | head
 # mostra la versione di portage
```
an interesting feature for security is:

```sh
 glsa-check
 # which checks if installed software has
 # vulnerabilities
```

## USE Flags

To help users in deciding what to install/activate and what not,
Gentoo wanted the user to specify his/her environment in an easy
way. This forces the user into deciding what they really want and
eases the process for portage to make useful decisions. Quindi
cos'è uno USE flag ? Such a flag is a keyword that embodies
support and dependency-information for a certain concept. If
someone defines a certain USE flag, Portage will know that they
want support for the chosen keyword. Of course this also alters
the dependency information for a package. Take a look at a
specific example: the kde keyword. If this keyword is not in the
USE variable, all packages that have optional KDE support will be
compiled without KDE support. All packages that have an optional
KDE dependency will be installed without installing the KDE
libraries (as dependency). When the kde keyword is defined, then
those packages will be compiled with KDE support, and the KDE
libraries will be installed as dependency. Noi possiamo definire
i nostri USE flag all'interno della variabile "USE". To make it
easy for users to search and pick USE flags, we already provide a
default USE setting. This setting is a collection of USE flags we
think are commonly used by the Gentoo users. This default setting
is declared in the make.defaults files that are part of the
selected profile.

## Kinds of USE Flags


Ci sono due tipi di USE flags:

* Globali, sono use flag usati da molti pacchetti, per una
  configurazione di sistema, una lista di USE Flag globali
  disponibili può essere trovata in
  /usr/portage/profiles/use.desc
* Locali, sono gli USE flag specifici relativi ed utilizzati da
  un singolo pacchetto, una lista di USE flag locali può essere
  trovata in /usr/portage/profiles.local.desc

Per vedere la lista di USE flag completa usiamo:

```sh
 emerge --info | grep ^USE
```

## Cambiare Impostazioni su USE flag


Possiamo cambiare impostazioni per gli USE flag globalmente o per
singoli pacchetti.

###  Configurazione Globale

To change this default setting, add or remove keywords to/from
the USE variable. This is done globally by defining the USE
variable in "/etc/portage/make.conf". In this variable one can
add the extra USE flags required, or remove the USE flags that
are no longer needed. This latter is done by prefixing the
keyword with the minus-sign (-).

###  Configurazione per Pacchetto

ometimes users want to declare a certain USE flag for one (or a
couple) of applications but not system-wide. To accomplish this,
edit /etc/portage/package.use. This is usually a single file, but
can also be a directory; see man portage for more information.
The following examples assume package.use is a single file. Ad
esempio per abilitare lo USE flag chiamato "berkdb" per il
pacchetto "dev-db/mysql" eseguiamo:

```sh
 echo "dev-db/mysql berkdb" >> /etc/portage/package.use
```

Similarly it is possible to explicitly disable USE flags for a
certain application. For instance, to disable java support in PHP
(but have it for all other packages through the USE flag
declaration in make.conf):

```sh
 echo "dev-php/php -java" >> /etc/portage/package.use
```
E' anche possibile definire USE flag temporanei, cioè non validi
permanentemente per uno specifico pacchetto ma solo per la
momentanea sessione, questo può avvenire attraverso la
ridefinizione della variabile USE da un terminale con:

```sh
 USE="-flag1 flag2"
 # i flag menzionati sono fittizi
```
Esiste una certa precedenza quando viene ispezionata la
configurazione degli USE flag, nell'installazione di un
pacchetto:

1. Default USE setting dichiatati nei make.defaults file del nostro profilo
2. user-defined USE settings in /etc/portage/make.conf
3. user-defined USE setting in /etc/portage/package.use
4. user-defined USE setting definiti come variabile d'ambiente nella sessione corrente del terminale in uso

Quando avvengono cambi agli USE flag, il sistema deve essere
aggiornato in modo appropriato per includere il supporto per il
nuovo flag, questo avviene con:

```sh
 emerge --update --deep --newuse @world
```


## Portage Quick Tutorial

In questa sezione impariamo ad usare una distro molto flessibile
(una delle mie preferite, al punto da dedicarle un'intera
sezione). Gentoo Linux ha un gestore di pacchetti chiamato
portage che comprende diversi tool, il suo cavallo di battaglia è
emerge, vediamo alcuni comandi:

```sh
 emerge --sync
 # aggiorna il repository utilizzando rsync, quindi
 # un servizio TCP sulla porta 873, questo repository è aggiornato
 # ogni 30 minuti, ed è più veloce rispetto al metodo http
```
```sh
 emerge-webrsync
 # aggiorna il repository fetchando online il
 # tree, questo snapshot del repository viene fatto una volta al
 # giorno, è più lento rispetto al metodo rsync ma utilizza le
 # chiavi gpg, ed è vantaggioso se utilizzato ad esempio quando un
 # firewall blocca rsync
```
```sh
 emerge nomePacchetto
 # installa il pacchetto menzionato
```
quando sta installando un pacchetto, questo viene compilato "di
default", e siccome a volte la compilazione potrebbe portar via
molto tempo, possiamo renderci conto dei progressi eseguendo un:

```sh
 tail -f /var/log/emerge.log
 # mostra il progresso della
 # compilazione in corso
```
possiamo anche vedere le alcune informazioni sullo scaricamento
dei pacchetti piuttosto che della compilazione eseguendo:

```sh
 less /var/log/emerge-fetch.log
 # visualizza informazioni sullo
 # scaricamento dei pacchetti
```
```sh
 emerge --ask nomePacchetto
 # visualizza informazioni sul
 # pacchetto, diminutivo di -a
```
```sh
 emerge --info
 # mostra tutte le opzioni di configurazione, come
 # USE flags utilizzati, opzioni di compilazione
```
```sh
 emerge --search "pdf"
 # cerca nel repository tutti i programmi
 # che hanno nel nome la stringa menzionata, alternativa è "-s"
```
```sh
 ls /usr/portage/package-cat/package-name/
 # elenca tutte le
 # versioni disponibili per l'installazione di un pacchetto,
 # quest'operazione è più comodamente fatta con l'uso di "eix"
```
```sh
 emerge --searchdesc "multimedia player"
 # cerca nel repository
 # tutti i programmi che hanno nella descrizione la stringa
 # menzionata, alternativa è "-S"
```
```sh
 emerge nomePacchetto --autounmask-write
 # inserisce le modifiche
 # necessarie per i flag nel file package.use, dopo dovremo solo
 # eseguire "dispatch-conf" per rendere effettive le modifiche
```
```sh
 emerge --pretend "vifm"
 # visualizza le dipendenze del programma
 # selezionato con i diversi USE flag, l'alternativa è il flag"-p"
```
```sh
 emerge -pv "vifm"
 # visualizza oltre alle dipendenze anche la
 # dimensione dei file scaricati, ad esempio possiamo da qui
 # visualizzare se la documentazione è stata scaricata andando ad
 # ispezionare gli USE Flag disponibili, infatti la documentazione
 # corrisponde allo use flag "doc"
```
```sh
 emerge --fetchonly nomePacchetto
 # in questo caso vengono
 # scaricati solo i sorgenti
```
```sh
 emerge --unmerge nomePacchetto
 # rimuove il pacchetto ma lascia
 # le sue dipendenze e anche i file di configurazione, il flag
 # corrispettivo è "-C"
```
```sh
 emerge --update --deep --newuse @world
 # aggiorna dopo aver
 # alterato le impostazioni degli USE flag, l'alternativa è usare
 # i flag "-uDN", è sconsigliato aggiornare senza l'opzione deep,
 # anche se in realtà gli aggiornamenti delle dipendenze
 # necessarie vengono fatti lo stesso anche senza l'opzione deep,
 # ma deep è per aggiornare le dipendenze anche quando non è
 # richiesto
```
```sh
 emerge -uDNp @world
 # Lists packages which have an update
 # available. Note: Some provide special commands to limit the
 # output to certain installation sources, others use options.
```
```sh
 emerge --resume --exclude packageName
 # in questo caso se ad
 # esempio abbiamo problemi con portage, nel caso in cui ad
 # esempio un pacchetto all'interno di un aggiornamento di sistema
 # mi da problemi, in questo caso non solo possiamo dire ad emerge
 # di continuare da dove aveva avuto problemi, ma anche di
 # escludere il pacchetto che da problemi, magari prima di
 # eseguirlo possiamo considerare di installare una versione nota
 # stabile di quel pacchetto
```
```sh
 emerge -ep world
 # Display a list of all packages in all
 # installation sources that are handled by the packages
 # management. Some tools provide options or additional commands
 # to limit the output to a specific installation source.
```
```sh
 CONFIG_PROTECT="-*" && emerge -aC nomePacchetto
 # rimuove il
 # pacchetto con tutti i relativi file di configurazione
```
```sh
 find /etc -type f -exec qfile -o {} +
 #  in questo caso
 # possiamo ricercare file che non appartengono a nessun pacchetto
 # in modo da poterli eliminare, attenzione ai falsi positivi
```
```sh
 emerge --unmerge --depclean nomePacchetto
 # rimuove il pacchetto
 # con tutte le sue dipendenze
```
```sh
 emerge --depclean
 # rimuove le dipendenze orfane, è
 # consigliabile utilizzarlo dopo un aggiornamento del sistema, è
 # simile ad "apt-get autoremove"
```
```sh
 emerge nomePacchetto --oneshot
 # in questo caso il pacchetto non
 # viene incluso all'interno dell'insieme @world, utile in quanto
 # ad esempio vogliamo tenere in questo insieme solo le
 # applicazioni utente, e non anche quelle di sistema come
 # portage, o altre librerie magari che ci servono per il
 # development, ad esempio per un ipotetico aggiornamento di
 # portage, eseguiamo
 emerge -u1 nomePacchetto
 # questo indica
 # appunto col flag "1" abbreviazione di "--oneshot" di non
 # aggiungere portage all'insieme @world
```


## Ricerca di informazioni su un pacchetto o su USE flags

Un programma più veloce e potente di emerge per effettuare
ricerche e query a portage è eix.

It is made to be more efficient and flexible than the emerge
`--search` command. eix comes with colorized output which helps
users easily find the needed package information.

Vediamo alcuni comandi:

```sh
 eix nomePacchetto
 # mi mostra le versioni disponibili di un
 # pacchetto e i vari useflag disponibili
```
```sh
 update-eix
 # aggiorna la cache di eix
```
```sh
 eix-sync
 # questo comando esegue sia un emerge --sync che un
 # update-eix in un colpo solo, utile quando dobbiamo aggiornare i
 # repository
```
```sh
 eix stringa_cercata
 # cercare una stringa contenuta nel nome di
 # un pacchetto
```
```sh
 eix -e nome_pacchetto
 # cercare un pacchetto con il nome esatto
```
```sh
 eix -S stringa_cercata
 # cercare una stringa nella descrizione
 # di un pacchetto
```
```sh
 eix -I
 # elenca tutti i pacchetti installati
```
```sh
 eix -U use_flag
 # visualizza tutti i pacchetti che utilizzano
 # la use flag menzionata
```
```sh
 eix -C nome_categoria
 # visualizza tutti i pacchetti della
 # categoria menzionata
```
```sh
 eix lib -IU -C kde-base
 # ricerca tutti i pacchetti installati
 # della categoria "kde-base" con la USE flag "hal" abilitata e il
 # cui nome contiene la stringa "lib"
```
```sh
 euse -i nomeFlag
 # fornisce la descrizione dei vari flag col
 # nome menzionato
```
```sh
 equery f nomepacchetto
 # visualizza il percorso di tutti i file
 # installati dal pacchetto menzionato, può essere utile per
 # vedere le dimensioni del pacchetto installato, in quanto queste
 # possono variare in funzione delle opzioni di compilazione
 # selezionate, l'opzione corrispettiva è "files"
```
```sh
 equery files --tree nomePacchetto
 # richiede la struttura ad
 # albero di ogni file installato dal pacchetto menazionato
```
```sh
 # equery belongs nomeComando
```
```sh
 equery u nomePacchetto
 # mostra i vari USE flag disponibili per
 # il pacchetto menzionato con la relativa descrizione (MOOLTO
 # UTILE) per caapire cosa si sta includendo e cosa no, la tabella
 # contiene due colonne "I" ed "U", I is the setting it's
 # currently installed with, U is what it will be set to if you
 # rebuild or upgrade
```
```sh
 qlist nomepacchetto
 # è un'alternativa più veloce (da
 # verificare) al comando precedente
```
```sh
 q
 # mi mostra una serie di operazione disponibili sui pacchetti
```
```sh
 qsize nomepacchetto
 # mi mostra lo spazio occupato dal
 # pacchetto menzionato
```
```sh
 e-file determinatoComando
 # mi mostra in quale pacchetto è
 # contenuto il comando menzionato, il programma e-file è
 # contenuto nel pacchetto app-portage/pfl
```
```sh
 equery d -a xorg-server
 # elenca tutti i pacchetti installati
 # che hanno come dipendenza "d" il pacchetto "xorg-server",
 # mentre col flag "-a" elenca tutti i pacchetti nel repository
 # che hanno quella dipendenza, e ci potrebbe mettere un bel po'
```
Talvolta durante l'operazione di installazione i pacchetti di
gentoo potrebbero dare problemi con i cosiddetti "USE" flag, in
questo caso, dobbiamo innanzitutto verificare di aver selezionato
il profilo corretto attraverso:

```sh
 eselect profile list
```
```sh
 eselect profile set 8
 # imposta il profilo numero 8
```
e poi nonostante il profilo sia impostati molti altri flag
dovranno essere settati manualmente, per farlo possiamo
utilizzare emerge direttamente, andando ad utilizzare il comando:

```sh
 emerge nomePacchetto --autounmask-write
 # viene creato un file
 # di configurazione atto a contenere il flag necessario
 # all'installazione del pacchetto, il pacchetto non viene
 # installato, dovremo prima confermare la configurazione col
 # comando "dispatch-conf" e poi reinstallarlo normalmente con "
 # emerge nomepacchetto"
```
Il file /etc/portage/make.conf contiene configurazioni globali
per quanto riguarda il processo di compilazione come ad esempio
anche gli "USE" flag globali, infatti se uno USE flag viene
spesso richiesto, è buona norma inserirlo tra quelli globali.

## equery


equery is a tool to make several common Portage operations
simpler. Among other operations, it can display package
dependencies, metadata, and installed files.

```sh
 equery which firefox-bin
 # mi mostra dov'è situato l'ebuild del
 # comando firefox-bin
```
```sh
 equery uses packageName
 # mi mostra gli attuali use flag
 # utilizzati per il pacchetto menzionato
```
```sh
 equery size packageName
 # mi mostra lo spazio su disco occupato
 # dal pacchetto
```
```sh
 equery list '*'
 # mi elenca tutti i pacchetti installati sul
 # sistema
```
```sh
 equery list amarok
 # mi elenca la versione attualmente
 # installata del pacchetto
```
```sh
 equery depends packageName
 # mi elenca i pacchetti che
 # dipendono dal pacchetto menzionato
```
```sh
 equery hasuse qt4
 # mi elenca tutti i pacchetti che hanno come
 # use flag qt4
```
```sh
 equery uses packageName
 # mi elenca quali use flag sono
 # attualmente attivi per il pacchetto menzionato
```
```sh
 equery belongs commandName
 # mi indica a quale pacchetto
 # appartiene un determinato comando che è già installato sul
 # sistema, per cercare file o comandi che non sono ancora
 # installati bisogna installare pfl, ed usare "e-file"
```
```sh
 equery check packageName
 # verifica i checksum per un dato
 # pacchetto
```
```sh
 equery --help
 # mi elenca le varie opzioni disponibili
```
## pfl


Il programma pfl fa riferimento al sito web [Portage File Dist](http://www.portagefilelist.de/)

```sh
 e-file nomeComandoOnomeFile
 # ricerca i pacchetti anche non
 # installati che contengono uno specifico comando/file
```

## Overlays

Gli overlays sono repository secondary dove possiamo reperire
ebuilds che non sono disponibili nel ports tree principale. Per
utilizzare gli overlay, possiamo eseguire:

```sh
 emerge layman
 # installa layman, il pacchetto che gestisce i
 # repository secondari
```
una volta installato dobbiamo avvertire emerge della sua
presenza, questo è possibile eseguendo

```sh
 echo "source /var/lib/layman/make.conf" >> /etc/portage/make.conf
 # copia impostazioni di configurazione
 # per gli overlay, in questo modo possiamo installare i pacchetti
 # dei repo non ufficiali con emerge, se emerge trova pacchetti
 # con lo stesso nome in più repo, installa quello più recente
```
vediamo alcuni esempi di comandi layman:

```sh
 layman -L
 # elenca la lista dei repository non ufficiali
```
```sh
 layman -a open-overlay
 # installa il repository chiamato "
 # open-overlay"
```
```sh
 layman -l
 # elenca la lista dei repository non ufficiali
 # installati sulla macchina
```
```sh
 layman -S
 # aggiorna i repository non ufficiali già installati,
 # cioè quelli che visualizzo con "-l"
```
```sh
 layman -s nomeRepo
 # aggiorna solo lo specifico repository
 # menzionato
```


## eselect

eselect is the Gentoo's multi-purpose configuration and
management tool, vediamo alcuni esempi:

```sh
 eselect news list
 # elenca le news
```
```sh
 eselect news read 2
 # legge la news numero 2
```
```sh
 eselect kernel list
 # elenca i kernel
```
```sh
 eselect kernel set 2
 # imposta come kernel di default il numero 2
```
```sh
 eselect profile list
 # mostra la lista profili, un profilo
 # corrisponde ad un insieme di USE flag di default, l'insieme dei
 # programmi macherati "masks", ed il gruppo di pacchetti @system
```
generalmente per eselect ci basta inserire:

```sh
 eselect
 # visualizza la lista dei moduli disponibili
```
e per capire cosa posso fare con un modulo inserisco:

```sh
 eselct nomeModulo help
 # ad esempio "eselect news help" mi
 # fornirà la lista delle operazioni possibili
```

## eclean

By default,

* source files are located in the /usr/portage/distfiles directory
* binary packages are located in the /usr/portage/packages directory

The locations for each can be changed by altering the DISTDIR and
the PKGDIR variables respectively in /etc/portage/make.conf. Both
locations can grow quite big if not periodically cleaned; this is
the reason eclean was created.

```sh
 eclean distfiles
 # ripulisce la cartella dove vengono salvati i
 # sorgenti, posso anche usare il comando più breve "eclean-dist"
```
```sh
 eclean -d distfile
 # ripulisce in modo destructive lasciando
 # solo le versioni correnti del portage tree installate
```
```sh
 eclean packages
 # ripulisce la cartella dove vengono salvati i
 # precompilati, posso anche usare il comando più breve "
 # eclean-pkg"
```
E' consigliabile se si ha molto poco spazio effettuare un clean
al mese circa.

## Pacchetti Precompilati


Gentoo permette all'utente di installare pacchetti precompilati,
ad esempio possiamo addirittura settare un server ftp dove
teniamo i precompilati, supponiamo questo sia al'indirizzo "
ftp://buildhost/gentoo", allora a questo punto possiamo impostare
come variabile all'interno di "/etc/portage/make.conf", la
stringa:

```sh
 PORTAGE_BINHOST="ftp://buildhost/gentoo"
```
ora da una macchina su cui è stato impostato questo indirizzo
possiamo eseguire:

```sh
 emerge --usepkg --getbinpkg nomePacchetto
 # per provare prima a
 # reperire il precompilato e solo se questo non è disponibile
 # scaricarlo e installarlo
```
per pacchettizare un pacchetto già installato eseguiamo:

```sh
 quickpkg nomePacchetto
 # crea un pacchetto del precompilato il
 # pacchetto menzionato
```
per pacchettizzare un programma non ancora installato ed
installarlo eseguiamo:

```sh
 emerge --buildpkg nomePacchetto
 # installa il pacchetto
 # menzionato e ne crea anche una pacchetto precompilato
```
```sh
 emerge --buildpkgonly nomePacchetto
 # crea il pacchetto
 # precompilato del nome pacchetto menzionato senza installare
 # nessun pacchetto
```
Possiamo inoltre impostare che di default per ogni pacchetto
installato venga creato l'eseguibile, questo avviene attraverso
l'attivazione della feature "buildpkg", infatti ci basterà
aggiungere la stringa "buildpkg" alla variabile FEATURES in
/etc/portage/make.conf.

## Licenze


Possiamo decidere di installare pacchetti anche in base alla
licenza, questo è impostabile attraverso il file "
/etc/portage/make.conf", con:

```sh
 ACCEPT_LICENSE="* -@EULA"
 # in questo caso accettiamo tutti i
 # pacchetti esclusi quelli con EULA
```
E' possibile oltre ad impostare la variabile ACCEPT_LICENSE come
configurazione globale, creare configurazioni per pacchetto ad
esempio specificando i file relativi ad ogni pacchetto, inserendo
una stringa nel file /etc/portage/package.license.

Ad esempio:

```sh
 app-crypt/truecrypt truecrypt-2.7
 # questo se messo nel file
 # /etc/portage/package.license, mi permette di installare tutte
 # le versioni di truecrypt che hanno la licenza "truecrypt-2.7"
```
## Dove posso trovare le licenze ?


Le licenze sono salvate singolarmente in /usr/portage/licenses/,
mentre i gruppi di licenze in "
/usr/portage/profiles/license_groups". La prima voce in maiuscolo
è il nome del gruppo di licenze mentre ogni voce successiva
rappresenta le singole licenze. Inoltre è utile ricordare che i
gruppi di licenze sono contrassegnate dal simbolo "@", ad
esempio, possiamo trovare un esempio di /etc/portage/make.conf
dove andiamo ad abilitare il gruppo licenze "FREE", quindi
avremo:

```sh
 ACCEPT_LICENSE="-* @FREE"
 # abilito il gruppo di licenze free,
 # cioè quelle definite free dall'FSF e dall'OSI.
```
## Modifiche agli USE Flag


A volte capita installando nuovo software, che per essere
installato o il software stesso o almeno una delle dipendenze,
richieda la modifica degli USE flag, per mettere a posto questo
problema abbiamo a disposizione due soluzioni:

1. modificare il file delle configurazioni globali "/etc/portage/make.conf",
  aggiungendo il flag necessario nella voce relativa agli USE flags
2. modificare il file "/etc/portage/package.use" inserendo
   singolarmente pacchetto per pacchetto gli use flag necessari


## Aggiornare il sistema

Per aggiornare il sistema eseguiamo un aggiornamento dei
repository con:

```sh
 emerge --sync
 # aggiorna il portage tree, se si usa eix, è più
 # comodo usare eix-sync
```
e poi aggiorniamo tutti i pacchetti con:

```sh
 emerge --update --ask @world
 # questo attraverso l'opzione "--ask"
 # mi avviserà anche dei pacchetti che verranno aggiornati, ma
 # verranno aggiornati solo i programmi elencati in
 # /var/lib/portage/world, e non tutte le loro dipendenze
```
nel caso volessimo aggiornare anche le dipendenze allora
eseguiamo:

```sh
 emerge --update --deep @world
 # aggiorna anche le dipendenze dei
 # pacchetti
```
ma anche in questo caso non stiamo aggiornando tutte le
dipendenze, infatti esistono altri tipi di dipendenze chiamate "
build dependencies" che hanno la necessità di esistere durante il
processo di compilazione e building del programma, una volta che
il programma è stato compilato non sono più necessarie, per
aggiornare queste dipendenze eseguiamo:

```sh
 emerge --update --deep --with-bdeps=y @world
```
se dall'ultimo aggiornamento delle modifiche agli USE flag sono
avvenuti, allora è consigliato utilizzare:

```sh
 emerge --update --deep --with-bdeps=y --newuse @world
 # l'opzione "--newuse" si assicura di installare le applicazione
 # precedentemente installate includendo i nuovi USE flag
```


