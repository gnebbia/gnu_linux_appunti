
The GNU userland has a special part called the "GNU Coreutils".
This is a set of utilities that provide essential file and shell
tools. Example components include rm, cat, ls, cp, etc. However,
do not confuse "util-linux" with the GNU Coreutils. Both exist in
the userland, but util-linux is not a part of the official GNU
userland. Some tools that are part of util-linux include mcookie,
kill, more, cfdisk, dmesg, etc.

The "GNU Binutils" is a collection of programming tools for
binary/compiled programs.

The GNU build system (or Autotools) is a set of programming tools
for setting up source code for Unixoid systems. Autotools is part
of the GNU Toolchain. The GNU Toolchain is a large collection of
programming tools such as the GNU Compiler Collection (GCC), GNU
Debugger (GDB), GNU Binutils, and more. GCC is the compiler
toolkit.

GNU uses glibc (GNU C Library) as an open-source alternative to
the standard C library. Gnulib is an alternative to glibc that
provides portability for other operating systems.

GNU Classpath is an open-source Java class library.

Ogni comando che eseguiamo da terminale può far parte di un
programma esterno installato, o può essere una funzione da noi
definita, o ad esempio un alias, o ancora uno "shell built-in",
cioè comandi di base per la shell utilizzata che non potrebbero
esistere senza la shell, vediamo ora una serie di comandi di
base.

## Il comando `pwd`

Una volta all'interno di un terminale, possiamo capire in che
directory siamo situati attraverso il comando "pwd", possiamo
quindi semplicemente lanciare pwd e vedere a schermo il percorso
della directory corrente.

There are two reasons why we could need to use this:

1. Our terminal doesn't show it
2. we want to see the original path and not a symbolic link, for
  this we could use "pwd -P"

## Il comando `export`

Questo comando serve a creare una variabile d'ambiente, vediamo
un esempio:

```sh
 export nomeVariabile=valore
 # imposta una variabile d'ambiente
```
nota che una variabile può anche essere definita come:

```sh
 nomeVariabile=valore
 # imposta una variabile di shell, quindi
 # una variabile valida solo all'interno del processo shell
 # corrente
```
la differenza sta appunto che nel caso di "export" la variabile
(d'ambiente) verrà passata ad ogni processo figlio chiamato dalla
shell. export makes the variable available to sub-processes. That
is, export name=value means that the variable name is available
to any process you run from that shell process. If you want a
process to make use of this variable, use export, and run the
process from that shell.

name=value means the variable scope is restricted to the shell,
and is not available to any other process. You would use this for
(say) loop variables, temporary variables etc.

nel caso volessimo impostare una variabile con un valore
permanente, allora possiamo aggiungere l'assegnazione del valore
nei file indicati per la Bash.

## Il comando `type`

All'inizio può essere utile capire mano a mano che incontriamo
nuovi comandi di base capire se questi ultimi sono builtin della
shell o se vengono da pacchetti installati al di fuori della
shell, per questo possiamo usare il comando "type", infatti dando
in pasto a questo comando il programma, lui capirà di che tipo è
il programma in questione, ad esempio:

```sh
 type pwd
 # questo ci dirà di che tipologia è "pwd", scopriremo
 # infatti che questo è uno shell built-in
```
le tipologie possibili sono:

1. alias (command is shell alias): questi sono alias, su molti
  sistemi/distribuzioni un comando di default già con alias è "ls"
2. keyword (command is shell reserved word): queste sono keyword
  della shell, ad esempio keyword utilizzate per creare script
  come ad esempio "if"
3. function (command is shell function): queste sono funzioni
  definite
4. builtin (command is shell builtin): questi sono i comandi
  builtin della shell come ad esempio "pwd" o "cd"
5. file (command is disk file): questi sono i comandi esterni,
  come ad esempio "date"

Il comando `type` può essere utile anche per capire ad esempio quale
file viene eseguito quando eseguiamo un programma, se ad esempio
volessimo vedere il percorso del file che risponde al comando "date",
allora eseguiamo:

```sh
 type -p date
 # mostra il percorso al comando date
```

se volessimo il tipo in una forma più corta "short form", allora
facciamo:

```sh
 type -t date
 # mostra il tipo di comando in una forma short, ad
 # esempio con la stringa "file" in questo caso
```

per avere tutte le informazioni su un comando possiamo utilizzare
il flag "-a", ad esempio:

```sh
 type -a nomeComando
 # mostra tutte le informazioni sul comando "nomeComando"
```

N.B.: Il comando "type" è un comando builtin, quindi questi
parametri potrebbero cambiare da shell a shell, quelli qui
riportati valgono per la bash.

##  Il comando `declare`

Possiamo creare funzioni all'interno della command line con la
sequenza di istruzioni:

```sh
nome_funzione() {
    istruzione1
    istruzione2
    ...
    istruzioneN
}
```
una volta creata la funzione, questa può essere richiamata col
comando:

```sh
 nome_funzione
```

nel caso volessimo visualizzare "cosa fa" questa funzione allora
eseguiremo:

```sh
 declare -f nome_funzione
 # questo mostrerà il corpo della funzione
```

possiamo anche salvare funzioni create momentaneamente nel file
di confugurazione della shell o nel file adibito alle funzioni
definite a livello utente, andando a redirigere l'output in
modalità "append", ad esempio:

```sh
 declare -f nome_funzione >> ~/.my_bash_functions
```
nel caso andassimo ad eseguire un semplice:

```sh
 declare
 # visualizza il corpo di tutte le funzioni definite e delle variabili
```
##  Il comando `help`

Il comando help è utile per poter visualizzare la lista di
comandi built-in della shell, e poter visualizzare il loro
manuale, vediamo alcuni esempi:

```sh
 help
 # visualizza la lista dei comandi built-in della shell
```
```sh
 help -m nomeComandoBuilt-In
 # visualizza il manuale del comando
 # built-in, ad esempio funziona con "cd", "pushd", "popd",
 # eccetera...
```


##  Il comando `cd`

Una volta all'interno del terminale possiamo muoverci all'interno
delle directory con il comando "cd", questo programma è incluso
nella shell, quindi non è possibile effettuare un "sudo cd" ad
esempio, ma devo loggare con l'utente di root e arrivare al
percorso desiderato; vediamo alcuni esempi applicativi:

```sh
 cd nomeDirectory
 # si sposta nella directory nomeDirectory
```
```sh
 cd !$
 # si sposta nella directory che abbiamo elaborato nel
 # comando precedente, cioè nel caso avessimo eseguito un mkdir,
 # questo si sposta direttamente in quella directory
```
```sh
 cd -
 # si sposta nella directory precedente, se non mi sono
 # ancora spostato almeno una volta non funziona
```
Se le directory (o in genere i file) hanno spazi nei loro nomi
allora abbiamo due possibilità:

```sh
 # scrivere il nome tra doppi apici "nome Dir"
```
```sh
 # utilizzare la notazione con i backslah, ad esempio nome\ Dir
```
N.B.: I filesystem di tipo ext3 hanno un limite sulla lunghezza
dei nomi dei file che equivale a 255 caratteri.

## Il comando `ls`

Un altro comando molto utile per poter visualizzare il contenuto
di una directory o le caratteristiche dei file è ls; alcuni
esempi di applicazione comprendono:

```sh
 ls nomeDir
 # elenca il contenuto della directory nomeDir
```
```sh
 ls
 # elenca il contenuto della directory corrente
```
```sh
 ls -F nomeDir
 # elenca il contenuto di nomeDir, evidenziando le
 # differenze tra i tipi di file:
```

* il simbolo '/' dietro al nome del file denota una directory

* il simbolo '@' dietro al nome del file denota un collegamento
    (link)

* nessun simbolo davanti al nome del file denota un file
    semplice

```sh
 ls -R nomeDir
 # elencail contenuto di nomeDir e di tutti i file
 # delle sottodirectory ricorsivamente, è utile nel caso volessi
 # vedere anche il contenuto delle sotto-directory
```
```sh
 ls -al
 # elenca tutti i file, anche quelli nascosti e i
 # puntatori "." e ".."
```
```sh
 ls -Al
 # elenca tutti i file, anche quelli nascosti, ma senza "
 # ." e ".."
```
```sh
 ls -Alh
 # elenca tutti i file, con le relative dimensioni in
 # formato human readable
```
```sh
 ls -1
 # elenca tutti i file su una sola colonna
```
```sh
 ls -t
 # elenca i file mostrando prima quelli modificati per
 # ultimi
```
```sh
 ls -ltr
 # elenca i file mostrando prima quelli meno modificati
```
```sh
 ls -sSh
 # mostra i file in ordine decrescente di dimensione,
 # nota che per le directory non viene fatto un resoconto delle
 # dimensioni
```
```sh
 ls -li
 # visualizzo la lista file con relativo inode id
```
```sh
 ls -ld nomeDirectory
 # mostra informazioni solo sulla directory
 # menzionata, senza il "-d" mi mostrerebbe il contenuto della
 # directory specificata
```
```sh
 ls -I nomeFile1
 # elenca i file, eccetto il file chiamato
 # nomeFile1
```
```sh
ls -d */
# mostra solo le directory nella directory corrente
```


## Il comando `tree`

Tree costituisce un comando molto utile nel momento in cui
vogliamo visualizzare le directory con una struttura ad albero
per capire come è strutturato il filesystem in uno specifico
punto, non è installato di default, possiamo installarlo con:

```sh
 sudo apt-get install tree
 # installa il programma "tree"
```
e possiamo utilizzarlo con:

```sh
 tree nomeDirectory | less
 # visualizza la struttura ad albero
 # della directory, in un formato comodo da scorrere attraverso il
 # programma less
```
```sh
 tree
 # visualizza la struttura ad albero della directory
 # corrente
```

```sh
tree -d -L 1
# mostra solo le directory nella directory corrente
```

## I comandi `cat` e `tac`

Per visualizzare uno o piu' file possiamo utilizzare il comando
cat, vediamo alcuni esempi:

```sh
 cat file1.txt file2.txt file3.txt > result.txt
 # stampa i tre file menzionati e
 # salva il risultato in result.txt
```

```sh
 cat nomefile.txt
 # visualizza in modo concatenato i due file menzionati
 # anche se l'utilizzo per visualizzare a schermo il contenuto
 # e' comunemente accettato, in genere viene preferito un pager
 # come less
```

```sh
 cat nomefile1.txt nomefile2.txt
 # visualizza in modo concatenato i due file menzionati
```

Il comando cat molte volte viene abusato, infatti si vedono
spesso in giro casi di:
```sh
 cat file.txt | grep 'ciao'
 # DA EVITARE
```
al posto di:

```sh
grep 'ciao' file.txt
```
oppure
```sh
 cat file.txt | command arg1 arg2 arg3
 # DA EVITARE
```
al posto di:

```sh
command arg1 arg2 arg3 < file.txt
```

Vediamo altri esempi di utilizzo di cat:

```sh
 cat >test2
 # permette di creare un file con quello che inseriamo
 # a tastiera (quindi dallo standard input)
 # possiamo concludere premendo ctrl+d
```
```sh
 cat -n test.txt
 # visualizza l'output con le linee numerate
```

```sh
 cat -e test.txt
 # visualizza il simbolo $ per indicare un fine riga
 # questo e' utile per visualizzare trailing space
 # ad esempio
```
```sh
 cat -T test.txt
 # visualizza il simbolo ^I per indicare un carattere TAB
```

```sh
 cat -v test.txt
 # visualizza a schermo anche caratteri non printable
```

Un'altro comando utile, quando vogliamo
ottenere un file con le linee capovolte,
cioe' l'ultima sara' la prima e la prima l'ultima
e' `tac`.
Questo comando e' identico cat in quanto utilizzo,
quindi:

```sh
 tac file1.txt file2.txt file3.txt > result.txt
 # stampa al contrario i tre file menzionati e
 # salva il risultato in result.txt
```

## Il comando `cp`

Cp è un comando molto versatile utilizzato per copiare
generalmente, alcuni esempi di applicazione sono:

```sh
 cp file1 file2
 # effettua una copia del file file1 e la chiama
 # file2
```
```sh
 cp -i file1 file2
 # in questo caso prima di effettuare la
 # copia, controlla se nella directory esiste già un file chiamato
 # file2, e se questo esiste allora prima chiede conferma
 # dell'operazione di sovrascrizione
```
```sh
 cp -p file /otherdirectory/
 # effettua una copia preservando il
 # proprietario e i permessi anche nell'altro directory
```
```sh
 cp -u file file2
 # in questo caso viene effettuata una
 # riscrittura solo nel caso in cui il file file1 è più recente di
 # file2, questo tipo di copia è detta anche copia in modalità "
 # backup", perchè si comporta come un backup
```
Attenzione anche "cp" su molti sistemi copia solo file non
nascosti, per copiare file nascosti utilizziamo:

```sh
 cp -R .* directoryScelta/
 # copia tutti i file nascosti nella
 # directory menzionata
```
  Mv

Il comando "mv", ha una duplice funzione, può essere usato sia
per spostare file che per rinominarli, alcuni esempi applicativi
sono:

```sh
 mv mioFile tuoFile
 # rinomina il file mioFile in tuoFile
```
```sh
 mv mioFile /home/john/otherDir/tuo
 # sposta il file nella
 # directory otherDir e lo rinomina col nome tuo
```
```sh
 mv -i mioFile tuoFile
 # rinomina il file, chiedendo conferma
 # nel caso di sovrascrittura
```
N.B.:La flessibilità di linux può danneggiare il sisteam, infatti
è buona norma sempre utilizzare i comandi mv e cp con il flag
'-i', è anche possibile automatizzare l'operazione utilizzando
degli alias.

## I comandi `rm`, `shred` ed `unlink`

Il comando "rm", è utilizzato per rimuovere file (non nascosti),
vediamo alcuni esempi:

```sh
 rm nomeFile
 # elimina il file chiamato nomeFile
```
```sh
 rm -r nomeDirectory
 # elimina la directory, il flag "-r" indica
 # di utilizzare la modalità ricorsiva, in modo da eliminare
 # directory e sottodirectory
```
```sh
 rm -rf nomeDir #cancella tutti i file ricorsivamente viene fatto in
 # /etc per cancellare tutte le configurazioni del server
```
per rimuovere tutti i file nascosti possiamo utilizzare:

```sh
 rm -r .*
```
Per rimuovere un link ad un file o ad una directory utilizziamo
il comando:

```sh
 unlink nomeFileODirectoryLink # rimuove il link
```
per rimuovere un file in modo che non possa essere pià recuperato
possiamo usare "shred" ad esempio:

```sh
 shred nomeFile
 # elimina un file in modo che non possa essere
 # più recuperato
```
## Il comando `mkdir`

Il comando "mkdir" è utilizzato per creare directory, l'esempio
classico di applicazione è:

```sh
 mkdir nomeDir
 # crea una directory chiamata nomeDir nella
 # locazione corrente
```
```sh
 mkdir -p nomeDir1/nomeDir2
 # crea la directory nomeDir2 e se
 # nomeDir1 non esiste, quest'ultima viene creata
```
```sh
 mkdir -p work/{d1,d2}/{src,bin,bak}
 # crea un intero albero di directory
```
## Il comando `time`

Il comando "time" è utilizzato per cronometrare
processi/applicazioni, l'esempio classico di applicazione è:

```sh
 time nomeProgramma
 # fornisce il tempo che ci ha messo il
 # programma ad essere eseguito
```
```sh
 time read
 # questo è un cronometro, che può essere fermato con "
 # Ctrl+d"
```
Il comando "time" ci fornirà tre risultati:

* **real**:
  tempo totale impiegato per portare a termine il
  programma, qui si tiene conto anche dei time slice usati da
  altri processi, o il tempo speso da stato "bloccato" (ad
  esempio se sta aspettando I/O), mentre negli altri due casi
  spiegati sotto, si tiene conto solo del tempo in esecuzione
  **The elapsed (real) time between invocation of utility and its
  termination.**
* **user**:
  tempo passato in user-space speso in esecuzione
  **The User CPU time, equivalent to the sum of the tms\_utime and
  tms_cutime fields returned by the times() function defined in
  the System Interfaces volume of POSIX.1-2008 for the process
  in which utility is executed**
* **sys**:
    tempo passato in kernel space speso in esecuzione
    The System CPU time, equivalent to the sum of the tms_stime
    and tms_cstime fields returned by the times() function for
    the process in which utility is executed.

## Il comando `timeout`

Il comando timeout, serve ad eseguire un comando e a terminarlo
dopo uno specifico tempo se questo non termina prima, vediamo
qualche esempio:

```sh
 timeout -s 9 60 "ls -lR /"
 # in questo caso viene eseguito il
 # comando ls per elencare tutti i file sul filesystem, se questo
 # non termina entro 60 secondi, allora viene terminato con un
 # segnale "-s" di tipo "9" cioè "kill"
```
## Il comando `touch`

Il comando "touch" è utilizzato per creare file, vediamo alcuni
esempi di applicazione è:

```sh
 touch nomeFile
 # crea un file chiamato "nomeFile"
```
```sh
 touch -a nomeFile
 # modifica la data dell'ultimo accesso a
 # quando viene effettuato il comando
```
```sh
 touch -m nomeFile
 # modifica la data dell'ultima modifica a
 # quando viene effettuato il comando
```
```sh
 touch -r referenceFile nomeFile
 # modifica i timestamps del
 # file nomeFile impostandoli uguali a quelli del file
 # referenceFile
```
N.B.: Per visualizzare i timestamps, possiamo utilizzare il
comando "stat".

## Il comando `stat`

Il comando "stat" è utilizzato per visualizzare tutte le
informazioni su un qualsiasi file, l'esempio classico di
applicazione è:

```sh
 stat nomeFile
 # visualizza tutte le informazioni per il file "
 # nomeFile"
```

```sh
 stat -c '%A %a %n' /etc/timezone
 # per avere i permessi di un file in formato ottale,
 # questo e' molto utile soprattutto in fase di configurazione
 # di sistema, in quanto col comando ls non e' possibile visualizzare
 # i permessi in forma ottale
```


## Il comando `su`

Il comando su è utilizzato per cambiare utente (infatti su sta
per switch user), veidiamo due classici esempi applicativi:

```sh
 su nomeutente #cambia utente, da quello attuale a nomeutente
```
```sh
 su - nomeutente
 # cambia utente, da quello attuale a nomeutente,
 # come se venisse fatto il login, quindi viene fatto un cd
 # diretto alla home dell'utente con cui si logga), questo è anche
 # utilizzato ogni qualvolta vengono effettuate delle modifiche
 # sui gruppi, in modo da evitare il relogin dell'utente
```

##  I comandi `realpath` e `readlink`

I comandi `readlink` e `realpath` sono utilizzati per visualizzare
informazioni sul percorso di un file, nello specifico:

```sh
 realpath nomeFile.ogg
 # in questo caso visualizzaremo il
 # percorso assoluto del file passato come parametro, o nel caso
 # venisse passato un link, questo comando mostra il vero percorso
 # del file originale
```
```sh
 readlink nomeFile.ogg
 # è equivalente al programma realpath ma
 # mostra il percorso relativo del link simbolico
```
```sh
 readlink -f nomeFile.ogg
 # è equivalente al programma realpath
```
## Il comando `sudo`

Il comando sudo è utilizzato per eseguire comandi con i diritti
di un altro utente, se ad esempio per avviare una determinata
applicazione abbiamo bisogno momentaneamente dei diritti del
proprietario dell'applicazione o dell'amministratore, allora il
comando sudo è molto utile in questi casi; vediamone alcuni
esempi applicativi:

```sh
 sudo comando
 # effettua un comando come se fossi un altro
 # utente, caso tipico è quando si cerca di effettuare un comando
 # con i diritti di root
```
```sh
 sudo !!
 # esegue il comando precedentemente eseguit con i
 # comandi di root
```
```sh
 sudo su
 # sfrutta i permessi di root, per entrare nella shell
 # dell'amministratore
```
```sh
 sudo -K
 # dimentica la passwordo di sudo immediatamente, utile
 # per fare in modo che altri dopo di me non possano utilizzare il
 # tempo di sudo messo a disposizione senza che io reinserisca la
 # password
```
```sh
 visudo
 # apre il file /etc/sudoers con cui posso impostare la configurazione
```

Il file /etc/sudoers serve a listare gli utenti che possono
effettuare sudo, con le relative impostazioni. La differenza tra
le RedHat based e le Debian based è che le Debian based hanno
solo la categoria "sudo" per fare sudo mentre le RH usano il
gruppo "wheel".

## I comandi  `w`, `id`, `groups`, `finger` e `wall`

Il comando w, è utilizzato per visualizzare tutti gli utenti che
hanno effettuato il login su una macchina, si lancia
semplicemente con:

```sh
 w
 # elenca tutti gli utenti loggati su una macchina
```
```sh
 id
 # mostra informazioni sui gruppi di appartenenza dell'utente
 # loggato
```
```sh
 finger
 # se installato mostra informazioni sull'utente
```
```sh
 groups
 # mostra i gruppi di appartenenza senza menzionare il
 # group id
```
```sh
 wall "message to all the logged users"
```


## Il comando `who`

Il comando `who` Mostra chi è loggato, possiamo usarlo come:

```sh
 who
 # mostra gli utenti loggati
```
```sh
 who -r
 # mostra il runlevel attuale della macchina
```
## I comandi  `man`, `info`, `apropos`, `help` e `--help`

Questi sono due comandi utili per avere informazioni sui
programmi.

```sh
 nomeprogramma --help
 # mi fornisce un tutorial del programma
```
```sh
 man comando
 # mi fornisce informazioni sul comando, e gli
 # eventuali flag applicabili per l'avvio; a volte il man è
 # applicabile anche a file di sistema come /etc/resolv.conf,
 # anche se molte volte è solo un reference e non un vero e
 # proprio tutorial o una vera guida
```
```sh
 man -k parolaChiave
 # molto utile nel momento in cui non
 # conosciamo il comando utile per un'azione specifica, o quando
 # in genere non conosciamo il nome del comando che ci serve,
 # infatti attraverso il flag "-k" posso cercare per parole chiave
 # (penso stia per "keyword"), ad esempio "man -k sort" mi
 # cercherà tutti i programmi che hanno nel loro man la parola "sort"
```
```sh
 man -k file | search
 # questo è molto comodo per cercare una
 # determinata funzionalità, in questo caso sto cercando utility
 # per cercare file o ad esempio cercare nei file e così via,
 # posso usarlo anche con apropos
```
```sh
 man -K parolaChiave
 # molto utile in quanto cerca la parola
 # menzionata in tutte le pagine di man, ma non guarda a
 # differenza del flag "-k" solo nel titolo, ma anche all'interno
 # della pagina di man, infatti questa è una more in-depth search
 # by matching the keywords found in the whole articles
```
```sh
 man -s 7 -k ".*"
 # in questo modo vediamo la lista di tutte le
 # pagine man della sezione 7
```
```sh
 man -t ascii | ps2pdf - > ascii.pdf
 # crea un pdf della pagina
 # di manuale
```
```sh
 manpath
 # mostra il percorso in cui sono trovate le pagine di
 # man, un'alternativa è "echo $MANPATH"
```
```sh
 man -f passwd
 # molto utile, in quanto mostra le varie pagine
 # di man disponibili del comando "passwd", ad esempio a passwd
 # possiamo accederci attraverso "man 1 passwd" o "man 1ssl passwd"
 # oppure "man 5 passwd", vedere sotto per il significato dei
 # numeri
```
Quando sono in man o in help, posso schiacciare il tasto slash
seguito da una parola per cercare la parola all'interno del
testo. Oppure se si vuole sfruttare la potenza di vim, possiamo
salvare una funzione nel nostro file di configurazione shell
(e.g., .bashrc, .zshrc) ad esempio:

```sh
 vman() { vim <(man $1); }
 # ora utilizzando "vman ls" ad
 # esempio, possiamo visualizzare la pagina di man in vim
```
```sh
 man -P cat passwd > passwd_man_page.txt
 # questa tecnica
 # permette di salvare la pagina di man in un file di testo
```
La pagine di man possono essere referenziate da un numero,
potremo ad esempio trovare "ls(1)" o "route(8)", questi numeri
rappresentano la categoria del comando, infatti i numeri
significano:

1. User Commands
2. System Calls
3. Higher-Level Unix programming library documentation
4. Device interface and driver information
5. File descriptions (system configuration files)
6. Games
7. File formats, conventions, and encodings (ASCII, suffixes, ecc...)
8. System commands and servers

Possiamo ad esempio selezionare una pagina man dalla sezione,
infatti "man passwd" potrebbe essere ambiguo, in quanto potrebbe
sia riferirsi al comando "passwd" utilizzato per impostare una
password, oppure potrebbe riferirsi al file "/etc/passwd", il
file dove sono contenute le informazioni sugli utenti, il comando
man di default visualizza la prima pagina man trovata, per
evitare questo comportamento possiamo specificare la pagina di
man attraverso:

```sh
 man 5 passwd
 # visualizza il man con la spiegazione del file
 # /etc/passwd, in questo caso abbiamo specificato 5, facendo
 # capire al sistema che ci stiamo riferendo al file e non al
 # comando, infatti un "man passwd" avrebbe visualizzato la prima
 # pagina di man trovata che sarebbe stata quella del comando e
 # cioè passwd(1)
```
```sh
 man -f passwd
 # mostra tutte le possibili pagine consultabili
 # sotto il nome "passwd"
```
Per quanto riguarda la "synopsis":

The synopsis section usually gives some example use-cases.
Sometimes sub-commands have different options, so several
examples might be shown.

* Brackets [] always denote optional switches, arguments, options, etc.
* the pipe | means "or", particularly when inside brackets or parenthesis.
* Brackets in brackets just means that the second part is dependent on
  the first, and also itself optional. Some switches you can use on
  their own or add a value to them.
* Commas at the start of a bracket would indicate there can be
  multiple comma separated values, e.g., `[-m system[,...]]`
* They lean on Regex concepts, but are meant to be human readable
  so don't follow all the escaping rules etc.

Poi da less, è comodo utilizzare i marker, cioè possiamo salvare
una posizione nella pagina con " m lettera ", e dopo ritornare a
quel marker con " ' lettera ".

Qualche tempo fa, il progetto GNU mostrò poco piacere nei
confronti delle pagine man, e creò una propria utility per
mostrare la documentazione, chiamata "info", che talvolta può
essere più completa e più complessa, per lanciarlo possiamo
eseguire:

```sh
 info nomeComando
 # mostra la documentazione info per il
 # comando, possiamo provarlo ad esempio col comando "find" per
 # vedere quanto è più completo rispetto al comando "man"
```
Alcuni programmi non rendono disponibile una documentazione
disponibile attraverso "man" o "info", in questo caso dobbiamo
andare a cercarla nella directory "/usr/share/doc/" oppure online
attraverso internet.

Il man ha un output non colorato, una utility che ci può
facilitare la vita rendendo l'output più user friendly è "most",
possiamo installarlo e poi impostarlo come pager principale, in
quanto di default, man usa "less" come pager, per impostarlo come
pager principale in sistemi Debian-based eseguiamo:

```sh
 sudo update-alternatives --set pager /usr/bin/most
 # imposta
 # most come pager di default, molto utile per una lettura più
 # user-fiendly delle pagine di man
```
in realtà generalmente (senza dover imparare questo comando
valido solo per le debian based) ci basta impostare una variabile
d'ambiente chiamata "PAGER", questo vale su tutti i sistemi Linux
e anche su FreeBSD (non so se pure sugli altri BSD), possiamo
quindi cambiare pager eseguendo:

```sh
 export PAGER=most
 # il pager viene settato a "most", possiamo
 # eseguire "man man" per verificare il risultato, ovviamente
 # dobbiamo ricordarci di imporlo nel file di configurazione della
 # shell utilizzata
```
Un'altro modo comodo per cercare comandi è utilizzando:

```sh
 apropos stringaDaCercare
 # in questo caso vengono cercati tutti
 # i comandi relativi alla stringa "stringaDaCercare", ad esempio
 # possiamo provare "apropos disk", e verranno mostrati tutti i
 # comandi che hanno nella descrizione generale la parola "disk",
 # è analogo a "man -k"
```
```sh
 apropos -a keyword1 keyword2
 # effettua una ricerca facendo una
 # and delle stringhe menzionate, per effettuare ricerche più
 # avanzate, a differenza di un semplice "man -k"
```
Apropos è aggiornato attraverso il comando "mandb", che a
differenza della configurazione può essere aggiornato con un cron
job, o manualmente o quando avvengono aggiornamenti, possiamo
comunque forzare l'aggiornamento eseguendo:

```sh
 mandb
 # Aggiorna il database delle pagine di manuale per apropos
 # Nota che questo deve essere eseguito con i permessi di root
 # quindi potrebbe essere opportuno eseguire `sudo mandb`
```
N.B.: A volte se siamo in cerca di esempio e non li troviamo
nelle pagine di "man" e di "info", possiamo cercarli all'interno
della directory "/usr/share/doc" al suo interno dobbiamo cercare
il nome del pacchetto e al suo interno a volte esiste una
directory chiamata "examples", qui possiamo trovare degli esempi
di applicazione.

N.B: se evidenziamo una parola e poi premiamo "Shift+k" possiamo
andare alla pagina di man relativa alla parola selezionata.

Per i comandi builtin della shell, non esiste una pagina di man,
per questi possiamo eseguire il comando "help" in bash, ad
esempio:

```sh
 help cd
 # mostra informazioni per il comando cd
```
```sh
 help -m cd
 # mostra informazioni per il comando cd in un
 # formato "man page"
```
```sh
 help
 # mostra la lista dei comandi builtin
```


### Pagine man degne di nota

Here follows a non-exhaustive list of noteworthy pages that might
help you understand a lot of things more in-depth. Some of them
might serve as a good reference (like the ascii table).

* ascii(7)
* boot(7)
* charsets(7)
* chmod(1)
* credentials(7)
* fstab(5)
* hier(7)
* systemd(1)
* locale(1P)(5)(7)
* printf(3)
* proc(5)
* regex(7)
* signal(7)
* term(5)(7)
* termcap(5)
* terminfo(5)
* utf-8(7)


## Il comando `clear`

E' un comando utilizzato per spostare il cursore ad inizio
pagina, in modo da avere una visualizzazione pulita del
terminale, si può eseguire con:

```sh
 clear
 # sposta il cursore del terminale
```
## Il comando `less`

Il programma `less` e' un programma di paging, utile per leggere file
e cercare all'interno di essi, possiamo lanciarlo con:

```sh
 less nomeFile
```
un'opzione utile è quella di non tagliare le linee, e fornire a
less un modalità di navigazione oltre che verticale anche
orizzontale, questo è possibile tramite:

```sh
 less -S nomeFile
```
un utile comando da dare a less, per fare in modo di avere una
visualizzazione real time del file (uguale alla modalità -f del
comando "tail") è premere "-F" quando stiamo visualizzando il file.


## Il comando `reset`

E' un comando simile a "clear" ma cancella anche le istruzioni,
resettando la shell, risulta utile anche quando l'output della
shell puo' inquinarsi con l'utilizzo di determinati caratteri
(ad esempio provenienti da file binari), vediamo alcuni
esempi di utilizzo:

```sh
 reset
 # resetta il terminale
```

##  Spegnere e Riavviare il sistema

Vediamo alcuni esempi di comandi:

```sh
 shutdown -h now
 # spegne il sistema ora, può anche essere usato
 # poweroff
```
```sh
 shutdown -r now
 # riavvia il sistema ora, può anche essere
 # usato reboot
```
```sh
 shutdown -h 20:01
 # spegne la macchina alle 20:01
```
```sh
 shutdown -h +5
 # spegne la macchina tra 5 minuti
```

## Il parametro isolato "--"

In alcuni comandi possiamo vedere il parametro "--" questo sta
solo a significare che la lista di parametri passata ad un
comando è finita, e i prossimi sono argomenti utili del programma
come file, questo parametro esiste in quanto su linux è possibile
dare nomi a file che iniziano col carattere "-", facciamo alcuni
esempi:

```sh
 touch -al
 # non creerà il file chiamato -al ma darà errore
```
invece
```sh
 touch -- -al
 # creerà il file chiamato -al
```
oppure
```sh
 ls -al
 # mostrerà ls con le opzioni "-a" e "-l"
```
mentre
```sh
 ls -al -- -al
 # mostrerà informazioni sul file "-al", in quanto
 # il primo "-al" indica proprio le opzioni "-a" e "-l" mentre
 # l'ultimo siccome è posizionato dopo "--" indica il nome di un
 # file.
```


##  Il parametro isolato "-"

Questo parametro lasciato da solo, può non voler dire nulla, ma
alcuni programmi lo usano per indicare al programma di leggere
dati dallo standard input, quindi ad esempio viene usato spesso
nei comandi utilizzanti la pipe "|". Un esempio potrebbe essere:

```sh
 cat videoName.mp4 | vlc -
 # in questo caso indichiamo al
 # programma vlc di leggere dallo standard input
```
comunque non per tutti i programmi questo comportamento è valido,
infatti alcuni programmi considereranno il parametro "-" come
nome di un file, o verrà utilizzato comunque per altri scopi.
N.B.: For traditional UNIX programs that behave as filters the -
is superfluous.


