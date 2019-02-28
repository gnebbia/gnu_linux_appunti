# Gnu Linux Appunti

Copyright (c) 2018 Giuseppe Nebbione. Permission is granted to copy, distribute and/or
modify this document under the terms of the GNU Free Documentation License,
Version 1.3 or any later version published by the Free Software Foundation; with
no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of
the license is included in the section entitled "GNU Free Documentation
License".


## Primi passi in sistemi GNU/Linux


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

### Il comando `pwd`

Una volta all'interno di un terminale, possiamo capire in che 
directory siamo situati attraverso il comando "pwd", possiamo 
quindi semplicemente lanciare pwd e vedere a schermo il percorso 
della directory corrente.

There are two reasons why we could need to use this:

1. Our terminal doesn't show it
2. we want to see the original path and not a symbolic link, for 
  this we could use "pwd -P"

### Il comando `export`

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

### Il comando `type`

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

###  Il comando `declare`

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
###  Il comando `help`

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


###  Il comando `cd`

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

### Il comando `ls`

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


### Il comando `tree`

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

### I comandi `cat` e `tac`

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

### Il comando `cp`

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

### I comandi `rm`, `shred` ed `unlink`

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
### Il comando `mkdir`

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
### Il comando `time`

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

### Il comando `timeout`

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
### Il comando `touch`

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

### Il comando `stat`

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


### Il comando `su`

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

###  I comandi `realpath` e `readlink`

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
### Il comando `sudo`

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

### I comandi  `w`, `id`, `groups`, `finger` e `wall`

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


### Il comando `who`

Il comando `who` Mostra chi è loggato, possiamo usarlo come:

```sh
 who 
 # mostra gli utenti loggati
```
```sh
 who -r 
 # mostra il runlevel attuale della macchina
```
### I comandi  `man`, `info`, `apropos`, `help` e `--help`

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


#### Pagine man degne di nota

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


### Il comando `clear`

E' un comando utilizzato per spostare il cursore ad inizio 
pagina, in modo da avere una visualizzazione pulita del 
terminale, si può eseguire con:

```sh
 clear 
 # sposta il cursore del terminale
```
### Il comando `less`

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


### Il comando `reset`

E' un comando simile a "clear" ma cancella anche le istruzioni, 
resettando la shell, risulta utile anche quando l'output della 
shell puo' inquinarsi con l'utilizzo di determinati caratteri
(ad esempio provenienti da file binari), vediamo alcuni
esempi di utilizzo:

```sh
 reset 
 # resetta il terminale
```

###  Spegnere e Riavviare il sistema

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

### Il parametro isolato "--"

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


###  Il parametro isolato "-"

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


## Orientarsi in un sistema GNU/Linux

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


## Gestione degli Utenti e dei Gruppi

### useradd

```sh
 useradd nomeutente 
 # crea un utente
```
```sh
 useradd username -m 
 # il flag "-m" mi crea la home directory 
 # per l'utente username, dovrebbe essere l'opzione di default
```
```sh
 useradd username -m -G video,wheel,audio 
 # il flag "-G" mi 
 # setta i gruppi di appartenenza dell'utente username
```
```sh
 useradd username -M 
 # crea uno username chiamato username ma 
 # non crea la directory home per questo utente
```
```sh
 useradd username -m -k /etc/skelTech 
 # crea un utente chiamato 
 # username e copia nella home directory il contenuto della 
 # directory "skelTech", è da ricordare che di default, se non 
 # viene specificato il flag "-k" i file che vengono copiati nella 
 # nuova home sono contenuti in "/etc/skel/". Questo flag è molto 
 # utile in quanto mi permette di creare dei template di utenti
```
```sh
 useradd -c Antonio -e 2013-12-31 nomeUtente 
 # crea un nuovo 
 # utente di nome nomeUtente, con full name "Antonio" attraverso 
 # il flag "-c" e con data di scadenza impostata al 2013-12-31 
 # attraverso il flag "-e"
```
Le impostazioni di default del comando useradd sono contenute 
all'interno del file "/etc/default/useradd", questo file contiene 
informazioni come, dove salvare la home directory, la directory 
scheletro, la data di scadenza eccetera.

### passwd

```sh
 passwd nomeutente 
 # cambia o imposta la password
```
```sh
 passwd -l nomeUtente 
 # disabilita l'utente nomeUtente
```
```sh
 passwd -u nomeUtente 
 # riabilita l'utente nomeUtente eviene 
 # reimpostata la password che aveva in precedenza
```
Esistono un paio di file nella directory /etc di interesse:

```sh
 # /etc/passwd
```

* contiene la lista degli utenti, con informazioni relative ad 
    essi come l'id dell'utente, l'id del gruppo, se la password è 
    "shadowed", la posizione della home directory (che è la 
    directory in cui veniamo reindirizzati quando effettuiamo il 
    login) e il tipo di shell che utilizzano, questo è il luogo 
    perfetto per cercare degli utenti sulla macchina o capire 
    quanti utenti esistono. Per rendere un account utente 
    inutilizzabile potremo mettere al posto di "/bin/bash" il 
    percorso al nologin, che di solito è "/usr/sbin/nologin".

```sh
 # /etc/shadow
```

* il file shadow, contiene le password criptate degli utenti, 
    in realtà ogni riga è composta da 9 campi separati dal 
    simbolo ":" che contengono:


    1. user name:nome di login dell'utente
    2. password: campo contenente la password sottoposta ad un 
      algorithm di hashing dell'utente più altre informazioni, 
      infatti questo campo può essere suddiviso in tre sottocampi 
      divisi dal carattere "$", il primo campo è l'algoritmo 
      usato per l'hashing, infatti le possibili soluzioni per 
      questo campo sono:
      (a) $1 = MD5 hashing algorithm
      (b) $2 =Blowfish Algorithm 
      (c) $2a=eksblowfish Algorithm 
      (d) $5 =SHA-256 Algorithm 
      (e) $6 =SHA-512 Algorithm
      il secondo campo è il valore del "salt", mentre il terzo 
      campo è l'hash di salt+password
    3. last password change: data in cui è stata modificata la 
      password l'ultima volta
    4. minimum validity: il minimo numero di giorni richiesti per 
      poter cambiare la password
    5. maximum validity: il massimo numero di giorni per cui la 
      password è valida, dopo questo numero di giorni l'utente è 
      forzato a cambiare la sua password
    6. warn: numero di giorni prima della scadenza della 
      password, durante i quali l'utente viene avvisato della 
      necessità di cambiarla
    7. inactive: durata massima di validità dell'utenza dopo che 
      la password è scaduta
    8. expire: data di scadenza dell'utenza
    9. reserved: campo riservato per usi futuri

    E' da notare che le date sono espresse in numero di giorni a 
    partire dal 1/1/1970, e che per garantire sicurezza il file 
    shadow dovrebbe appartenere all'utente root e si abbia 
    esclusivamente il permesso di lettura per il proprietario 
    (0400).

### Il comando `userdel`

```sh
 userdel nomeUtente 
 # cancella l'utente, quindi non potrà più 
 # essere effettuato il login a nome suo, ma i suoi file rimangono 
 # intatti, quindi la home directory non viene cancellata, è da 
 # ricordare che se l'utente è loggato, la cancellazione non può 
 # avvenire
```
```sh
 userdel -f nomeUtente 
 # cancella l'utente anche se è loggato, 
 # alcune distro non permettono questa operazione
```

* per rimuovere correttamente un utente loggato, basta uccidere 
    il processo indicato quando si prova a rimuoverlo con userdel 
    nomeUtente, una volta ucciso il processo possiamo procedere 
    con una rimozione normale

```sh
 userdel -r nomeUtente 
 # cancella l'utente e due sue directory, 
 # nello specifico, la sua home directory, e il suo spool di mail, 
 # eccetera, questo avviene attraverso il flag "-r", è da 
 # ricordare che però file al di fuori di queste directory 
 # appartenenti a nomeUtente non vengono eliminati, è il comando 
 # adatto per rimuovere del tutto un utente da un sistema
```

* quello che viene fatto quando viene avviato questo comando è 
    cancellare le voci relastive all'utente nei fil "/etc/passwd" 
    e "/etc/shadow"

N.B.:Alcune distro hanno anche i comandi "deluser" e "adduser" 
che non sono altro che degli script creati per rendere più 
user-friendly e interattive le operazioni di cancellazione e 
creazione degli utenti.

### Il comando `chfn`

Questo comando è utile nel momento in cui voglio cambiare le 
informazioni aggiuntive sull'utente come nome completo "fullname"
, numero di telefono, interno, ecc...

```sh
 chfn 
 # avvia la procedura guidata di sostituzione dati 
 # aggiuntivi
```

### Il comando `chsh`

Questo comando è utile per cambiare il tipo di shell dell'utente

```sh
 chsh 
 # avvia la procedura guidata per cambiare il tipo di shell
```
  Usermod

```sh
 usermod -G wheel,video nomeUtente 
 # imposta i gruppi "wheel" e "
 # video" come gruppi secondari all'utente nomeUtente, ATTENZIONE, 
 # quando si vogliono aggiungere utenti secondari è sempre meglio 
 # aggiungerli, in append, vedi esempio successivo
```
```sh
 usermod -a -G wheel,video nomeUtente 
 # aggiunge i gruppi "wheel"
 # e "video" come gruppi secondari all'utente nomeUtente
```
```sh
 usermod -g nomeGruppo nomeUtente 
 # imposta all'utente 
 # nomeUtente il gruppo primario nomeGruppo, il gruppo primario è 
 # il gruppo attivato appena l'utente effettua il login
```
```sh
 usermod -l nomeUtenteNuovo nomeUtente 
 # cambia il nome di login 
 # di un utente, è molto utile, in quanto non dobbiamo eliminare e 
 # ricreare l'utente in caso di rinomina del nome utente, tutti i 
 # file di appartenenza a nomeUtente apparterranno a 
 # nomeUtenteNuovo e anche le informazioni nel passwd vengono 
 # aggiornate, la home directory rimane la stessa ma può essere 
 # cambiata col flag "-d", come nell'esempio successivo
```
```sh
 usermod -d /home/homeAlternativaUtente nomeUtente 
 # cambia la 
 # directory home dell'utente nomeUtente, è da ricordare che la 
 # directory home costituisce anche la directory d'accesso quando 
 # viene effettuato il login, questo andrà automaticamente a 
 # modificare il file "passwd" con la nuova home
```
```sh
 usermod -L nomeUtente 
 # blocca l'account nomeUtente, è 
 # un'alternativa a passwd -l nomeUtente, sono analoghi
```
```sh
 usermod -U nomeUtente 
 # sblocca l'account nomeUtente, è 
 # un'alternativa a passwd -u nomeUtente, sono analoghi
```


### Gpasswd

```sh
 gpasswd -d username nomeGruppo 
 # rimuove l'utente chiamato "
 # username" dal gruppo chiamato "nomeGruppo"
```

### Chage

E' un programma molto utile su sistemi con molti utenti, per 
gestire le politiche di mantenimento delle password e di validità 
degli account, ma ha le stesse potenzialità di programmi già 
visti come useradd e usermod, vediamo alcuni esempi applicativi:

```sh
 chage -E date nomeUtente 
 # imposta la data in cui scadrà la 
 # password dell'utente nomeUtente
```
```sh
 chage -I nroGiorni nomeUtente 
 # imposta il numero di giorni di 
 # inattività che deve passare prima di bloccare un account
```
```sh
 chage -m nroGiorni nomeUtente 
 # imposta il numero minimo di 
 # giorni per cui una password non può essere cambiata
```
```sh
 chage -M nroGiorni nomeUtente 
 # imposta il numero massimo di 
 # giorni per cui una password è valida
```


### Groups

```sh
 groups nomeutente 
 # mi fa vedere i gruppi di afferenza di un 
 # account
```
Quando si parla di gruppi è molto utile è il file "/etc/groups" 
che contiene la lista dei gruppi con le varie proprietà del 
gruppo e la lista utenti per ogni gruppo, è analogo al file "
/etc/passwd" usato per gli utenti. Per convenzione si parla di 
gruppi o utenti "di sistema" se l'id è minore o uguale a 500, 
anche se in alcune distro recenti il numero è diventato 1000, 
probabilmente per ragioni dovute al significativo quantitativo di 
gruppi o utenti di sistema. Recapitolando utenti o gruppi con id 
numerico oltre la costante (500 o 1000 a differenza della distro) 
sono considerati utenti o gruppi "normali" viceversa si parla di "
utenza di sistema". E' importante ricordare che quando avvengono 
modifiche sui gruppi, ad esempio quando vengono aggiunti gruppi 
ad utenti, le modifiche vengono apportate al prossimo login.

### Groupadd

```sh
 groupadd nomeGruppo 
 # aggiunge un gruppo chiamato nomegruppo
```
```sh
 groupadd -g id nomeGruppo 
 # aggiunge un nuovo gruppo con un 
 # numero group id specificato al posto di "id", se non viene 
 # inserito il flag "-g", il sistema stabilisce automaticamente il 
 # group id del gruppo
```
```sh
 groupadd -f nomeGruppo 
 # forza la creazione del gruppo 
 # nomeGruppo anche se questo già esiste
```
To add a group called myGroup we just do

```sh
 addgroup myGroup
```


###  Groupmod

```sh
 groupmod -g id nomeGruppo 
 # modifica l'id numerico del gruppo 
 # nomeGruppo
```
```sh
 groupmod -o -g id nomeGruppo 
 # modifica l'id numerico del 
 # gruppo nomeGruppo, il flag "-o" permette di impostare l'id di 
 # nomeGruppo indipendentemente dal fatto che ci siano altri 
 # gruppi con lo stesso id, quindi è possibile avere più gruppi 
 # con lo stesso id
```
```sh
 groupmod -n nomeGruppoNuovo nomeGruppo 
 # modifica il nome del 
 # gruppo nomeGruppo in nomeGruppoNuovo
```

### Groupdel

```sh
 groupdel nomeGruppo 
 # elimina il gruppo nomeGruppo
```
### Chgrp

Per cambiare gruppo ad una directory o ad un file possiamo 
effettuare:

```sh
 chgrp nomeGruppo nomeFile 
 # associa al file nomeFile il gruppo 
 # nomeGruppo
```
Per effettuarlo ricorsivamente (nel caso di directory) 
aggiungiamo un -R, quindi avremo:

```sh
 chgrp -R nomeGruppo nomeDirectory 
 # associa alla directory 
 # nomeDirectory il gruppo nomeGruppo
```


### Newgrp 

Imposta tutti i file creati dal momento in cui viene lanciato in 
poi appartenenti ad uno specifico gruppo, o in altri termini 
permette ad un utente di switchare su un altro gruppo, è da 
ricordare infatti che un utente ha un gruppo principale e poi una 
serie di gruppi secondari, per switchare ad un gruppo secondario 
si utilizza quindi questo comando, ad esempio:

```sh
 newgrp myGroup 
 # tutti i file che verranno creati dopo l'avvio 
 # di questo comando apparterranno al gruppo myGroup 
```
```sh
 newgrp - gruppoAppenaAggiunto 
 # questo comando è utile quando 
 # vengono effettuate modifiche ai gruppi (ad esempio viene 
 # aggiunto un gruppo secondario ad un utente) e non si vuole 
 # rifare il login per vedere applicate le nuove modifiche
```


## Gestione dei Permessi


### Permessi e Impostazioni

Per ogni file su GNU/Linux è possibile gestire i permessi di 
lettura, scrittura ed esecuzione da parte degli utenti. In questa 
sezione verranno presentati una serie di comandi per poter 
gestire e modificare questi permessi. Innanzitutto per poter 
visualizzare i permessi presenti su un file, è possibile farlo 
attraverso: 

```sh
 ls -l nomeFile 
 # visualizza i permessi presenti sul file 
 # nomeFile
```
```sh
 ls -l 
 # visualizza tutti i file coi relativi permessi 
 # all'interno della directory corrente
```
```sh
 ls -l nomeDir 
 # visualizza i permessi di tutti i file 
 # all'interno della directory nomeDir
```
I permessi vengono presentati nella forma "xxx-xxx-xxx", dove con 
tre gruppi di caratteri da tre lettere l'uno rappresento i 
permessi di lettura, scrittura ed esecuzione per tre gruppi di 
utenti. Le lettere possono essere 'r' (lettura), 'w' (scrittura) 
e 'x' (esecuzione). Per quanto riguarda i tre gruppi di 
caratteri:

* il primo gruppo rappresenta i diritti del proprietario del file
* il secondo gruppo rappresenta i permessi dei membri del gruppo 
  del proprietario
* il terzo gruppo rappresenta i permessi del resto degli utenti

Inoltre davanti ai tre gruppi di caratteri è presente un'altro 
carattere che rappresenta la natura del file e può essere:

* '-' significa, questo è un file
* 'd' significa, questa è una directory
* 'l' significa, questo è un link

Il significato dei permessi: lettura, scrittura ed esecuzione, 
varia se stiamo operando con una directory o con un file 
semplice, infatti:

* Per i file semplici:
    * lettura 'r': significa poter leggere il file
    * scrittura 'w': significa poter modificare il file o poterlo 
        generalmente sovrascrivere
    * esecuzione 'x': significa poterlo eseguire
* Per le directory:
    * lettura 'r': significa poter leggere il contenuto di una 
        directory, quindi eseguire comandi come "ls" ad esempio
    * scrittura 'w': significa poter creare, cancellare o 
        modificare i file (anche sotto-directory) all'interno della 
        directory
    * esecuzione 'x': significa poter attraversare una directory, 
        ad esempio col comando "cd"

N.B.: Se un utente possiede i permessi di sola esecuzione per una 
directory, allora può accedere ai file all'interno della 
directory se e solo se ne conosce il nome, in quanto non può 
avere una lista dei file, ovviamente deve avere anche i diritti 
di lettura per i file all'interno della directory.

Vediamo ora alcuni comandi preliminari sulla gestione del 
proprietario di un file e dei permessi:

```sh
 usermod -g myGroup jeff 
 # inserisce l'utente jeff nel gruppo chiamato myGroup
```
```sh
 chown -R jeff.wheel nomeDirectory 
 # il proprietario della 
 # directory diventa jeff, e il gruppo proprietario (a cui è 
 # associato il secondo gruppo di caratteri rwx) diventa wheel, 
 # col flag -R questa operazione viene associata alla directory e 
 # a tutti i file all'interno (quindi anche eventuali 
 # sotto-directory)
```
Per poter modificare i permessi relativi ad un file, esistono 
generalmente due modalità:

* Modalità Simbolica
* Modalità Numerica

#### Modalità simbolica

Una comoda modalità per settare i permessi, è quella di 
utilizzare la modalità simbolica. In questa modalità, si usano le 
lettere per riferirsi ai gruppi di utenti, infatti:

* `u`: indica l'utente proprietario del file
* `g`: indica il gruppo proprietario
* `o`: indica il resto degli utenti
* `a`: indica 'all', cioè tutti gli utenti, se non viene 
       specificata una lettera, all è l'opzione di default

e dei caratteri chiave :

* `+`: aggiunge permessi a quelli pre-esistenti
* `-`: rimuove permessi a quelli pre-esistenti
* `=`: imposta permessi cancellando la configurazione precedente

Vediamo ora alcuni comandi per gestire i permessi in modalità 
simbolica:

```sh
 chmod o+r nomeFile 
 # aggiunge (o elimina nel caso del '-') i 
 # diritti di lettura o toglierli al resto degli utenti al di 
 # fuori del proprietario e del gruppo del proprietario
```
```sh
 chmod g-r -R nomeDirectory 
 # rimuove i permessi di lettura al 
 # gruppo proprietario a tutta la directory nomeDirectory, il flag 
 # -R viene usato ogni qualvolta dobbiamo gestire i permessi di 
 # una directory e tutto il suo contenuto, nel caso non mettessimo 
 # il flag -R, il comando è ancora valido, ma vengono settati solo 
 # i permessi della directory e non dei file all'interno
```
```sh
 chmod +x nomeFile 
 # imposta i diritti di esecuzione per tuti 
 # gli utenti
```
```sh
 chmod go+w nomeFile 
 # fornisce i diritti di scrittura sul file 
 # sia al gruppo proprietario che al resto del mondo 
```
```sh
 chmod a=rw nomeFile 
 # cancella tutta la configurazione 
 # precedente di diritti e assegna esattamente i diritti di 
 # scrittura e lettura per tutti gli utenti
```
```sh
 chmod u+r,g-w filename 
 # aggiunge all'utente proprietario del 
 # file i diritti di lettura, e toglie al gruppo proprietario i 
 # diritti di scrittura
```
```sh
 chmod --reference file1 file2 
 # in realtà questo esempio non 
 # appartiene a nessuna modalità, serve a copiare i permessi che 
 # ha il file 1 e applicarli al file2
```


#### Modalità Numerica

Un'altra modalità per settare i permessi all'interno di un 
sistema GNU/Linux, è costituito dalla modalità numerica. Vengono 
utilizzati dei numeri per rappresentare i permessi, nello 
specifico, abbiamo:

* 1 -> esecuzione
* 2 -> scrittura
* 4 -> lettura

Infatti attraverso un sistema di numerazione ottale si riescono a 
rappresentare tutti i permessi:


| #  |           Permessi            |  rwx  |
|:--:|:-----------------------------:|:-----:|
| 7  | lettura+scrittura+esecuzione  | 4+2+1 |
| 6  |      lettura+scrittura        |  4+2  |
| 5  |      lettura+esecuzione       |  4+1  |
| 4  |           lettura             |   4   |
| 3  |     scrittura+esecuzione      |  2+1  |
| 2  |          scrittura            |   2   |
| 1  |          esecuzione           |   1   |
| 0  |       nessun permesso         |   0   |


Quindi con gruppi da 3 cifre riusciamo anche in questa modalità a 
impostare i diritti, dove il primo numero rappresenta i diritti 
del proprietario del file, il secondo numero rappresenta i 
diritti del gruppo proprietario del file e il terzo numero 
rappresenta i diritti del resto degli utenti. Vediamo ora alcuni 
esempi di applicazione della modalità numerica per le 
impostazioni dei permessi:

```sh
 chmod 644 nomeFile 
 # cambia i diritti del file nomeFile, 
 # impostando lettura+scrittura per il proprietario, e sola 
 # lettura per il gruppo proprietario e per il resto degli utenti
```
```sh
 chmod 771 -R nomeDir 
 # cambia i diritti della directory 
 # nomeDir, e di tutto il suo contenuto, impostando i permessi di 
 # lettura+scrittura+esecuzione per il proprietario e per il 
 # gruppo del proprietario e i permessi di sola esecuzione per il 
 # resto degli utenti
```
```sh
 chmod 707 -R nomeDir 
 # cambia i diritti della directory nomeDir 
 # e di tutto il suo contenuto, impostando i permessi di 
 # lettura+scrittura+esecuzione per il proprietario e per il resto 
 # degli utenti al di fuori del gruppo proprietario, mentre il 
 # gruppo proprietario non ha nessun diritto sulla directory e il 
 # suo contenuto
```


#### Special Permission Bits

Le modalità finora discusse sono quelle più utilizzate nella 
maggior parte dei casi, ad ogni modo esistono dei cosiddetti "
special permission bits" che rappresentano modalità operative 
aggiuntive più avanzate delle semplici r, w ed x. Queste modalità 
speciali sono:

* SUID (Set User ID): identificato in modalità simbolica con 's', 
   e in modalità numerica con '4'; mi permette di eseguire un file 
   come se fossi il proprietario del file, ad esempio se questo 
   file richiama o modifica file in cui non ho nessun permesso (ad 
   esempio nella directory /etc/), in questo caso non avrò errori 
   nell'esecuzione in quanto mi verranno dati gli stessi permessi 
   del proprietario su tutti i file su cui opera il file in 
   questione al momento dell'esecuzione
* SGID (Set Group ID): anche in questo caso identificato in 
   modalità simbolica con 's', e in modalità numerica con '2'; mi 
   permette di eseguire un file come se appartenessi al gruppo 
   proprietario del file, ad esempio se questo file richiama o 
   modifica file in cui non ho nessun permesso (ad esempio nella 
   directory /etc/), in questo caso non avrò errori 
   nell'esecuzione in quanto mi verranno dati gli stessi permessi 
   del gruppo proprietario su tutti i file su cui opera il file in 
   questione al momento dell'esecuzione
* t (sticky flag): identificato in modalità simbolica con 't' e 
   in modalità numerica con '1'; è un flag applicabile a 
   directory, quindi non può essere utilizzato su file semplici, 
   se settato rende impossibile la cancellazione dei file 
   all'interno di una directory e della directory stessa, infatti 
   un utente potrebbe anche avere tutti i permessi 
   (lettura+scrittura+esecuzione) per i file all'interno della 
   cartella, ma se questo è settato, non può eliminare nulla.

E' da notare che per utilizzare la modalità numerica, dobbiamo 
usare una notazione a 4 cifre anzichè 3, dove la prima cifra 
rappresenta gli special permission bits settati e gli altri 3 
rappresentano le classiche cifre dei permessi spiegate nella 
sezione precedente. Una tabella riassuntiva dei valori che può 
assumere la prima cifra può essere visionata qui sotto.


| #  |         Permessi          |  rwx  |
|:--:|:-------------------------:|:-----:|
| 7  |  SUID+SGID+Sticky Flag    | 4+2+1 |
| 6  |        SUID+SGID          |  4+2  |
| 5  |     SUID+Sticky Flag      |  4+1  |
| 4  |           SUID            |   4   |
| 3  |     Sticky Flag+SGID      |  2+1  |
| 2  |           SGID            |   2   |
| 1  |       Sticky Flag         |   1   |
| 0  | nessun permesso speciale  |   0   |



Vediamo ora alcuni esempi di applicazione sia in modalità 
simbolica che in modalità numerica dei special permission bits:

```sh
 chmod u+s myFile 
 # in questo modo imposto su ON il SUID, cioè 
 # tutti gli utenti possono eseguire il file come se il fosse il 
 # proprietario a lanciarlo
```

un esempio presente di default sui sistemi GNU/Linux è il 
comando "passwd" che deve operare col file /etc/passwd.

```sh
 chmod 4666 myFile 
 # in questo caso imposto ON il SUID e i 
 # diritti di lettura+scrittura per tutti gli utenti
```
```sh
 chmod 6644 myFile 
 # in questo caso imposto ON sia SUID che SGID 
 # e i diritti di lettura+scrittura per il proprietario del file e 
 # i diritti di sola lettura per il resto degli utenti
```
```sh
 chmod u-s myFile 
 # in questo modo imposto su OFF il SUID, cioè 
 # se tutti gli utenti prima potevano lanciare il file come il 
 # proprietario, dopo questo comando non possono più
```
```sh
 chmod g+s myFile 
 # in questo modo imposto su ON il GUID, cioè 
 # tutti gli utenti possono eseguire il file come se 
 # appartenessero al gruppo proprietario
```
```sh
 chmod g-s myFile 
 # in questo modo imposto su OFF il GUID, cioè 
 # se tutti gli utenti prima potevano lanciare il file come il 
 # appartenenti al gruppo proprietario, dopo questo comando non 
 # possono più
```
```sh
 chmod +t myDirectory 
 # aggiunge lo sticky flag sulla directory 
 # myDirectory, è da ricordare che questo flag non può essere 
 # applicato a semplici file ma solo a directory
```
```sh
 chmod 1444 myDirectory 
 # aggiungo lo sticky flag alla directory 
 # myDirectory e imposto i diritti di lettura per tutti gli utenti
```
Per visualizzare i permessi, valgono le modalità precedenti, 
quindi con "ls -l", li visualizzo, ad ogni modo è da notare che:

* il flag 'T' sostituirà la 'x' nel gruppo di utenti 'o' (resto degli utenti)
* il flag 'S' per SUID sostituirà la 'x' nel gruppo di caratteri del proprietario
* il flag 'S' per SGID sostituirà la 'x' nel gruppo di caratteri del gruppo proprietario


#### Note Aggiuntive sui Permessi

Un caso per me curioso fu quando un file all'interno della mia
home directory apparteneva a root e aveva i permessi di lettura/scrittura
solo per root, quindi con un settaggio dei permessi del tipo:

```ls
-rw-------  root root
```

la domanda e' posso eliminare questo file pur non essendo root? 
ricordiamo che il suo path e' `/home/miahome/nomefile`
la risposta e': molto probabilmente si, perche' e' nella nostra
home directory e in quella directory abbiamo permessi di scrittura.


### Permessi di Default, ossia Umask

Quando un utente crea un file (o una directory) vengono settati 
dei permessi di default relativi alla possibilità di lettura, 
scrittura o esecuzione del file in questione da parte degli 
utente. I permessi di default possono essere cambiati (o 
generalmente gestiti) attraverso il comando umask. Lanciando 
solamente il comando "umask" senza parametri, visualizzo un 
insieme di cifre che rappresenta i permessi di default sul 
sistema. Questo gruppo di cifre non è altro che una maschera a 
cui dobbiamo sottrarre dei valori. Di default i permessi sui file 
sono settati al valore "0666" e i permessi sulle directory sono 
settati al valore "0777", e il valore di umask predefinito è "
0022". In questa configurazione predefinita, sottraendo ai 
permessi di default di file e cartelle il valore di umask, 
possiamo capire i permessi che verranno attribuiti ai file o alle 
directory appena create; infatti nel nostro caso dovremo 
sottrarre sia per i file che per le cartelle il valore di umask, 
e otteniamo:

```sh
 umask - valoriDiDefaultPerFile = 0666-0022=0644
 # cioè per ogni file creato verranno utilizzati i permessi 
 # 0644, cioè nessun special permission bits settato, permessi 
 # di lettura+scrittura per il proprietario e per il gruppo 
 # proprietario e permessi di sola lettura per il resto degli 
 # utenti
```


```sh
 umask - valoriDiDefaultPerDirectory = 0777-0022=0755
 # cioè per ogni directory creata verranno utilizzati i permessi 
 # 0755, cioè nessun special permission bits settato, permessi 
 # di lettura+scrittura+esecuzione per il proprietario e per il 
 # gruppo proprietario e permessi di sola lettura+esecuzione per 
 # il resto degli utenti
```


Nel caso volessimo cambiare il valore di umask, possiamo lanciare 
il comando umask col codice che preferiamo per la maschera, ad 
esempio:

```sh
 umask 0014 
 # in questo caso ho cambiato la maschera a 0014, 
 # quindi avrò di default per i file i permessi"0652" e per le 
 # directory "0763"
```
Due comode umask molto gettonate sono:

1. `umask 022`, utilizzata per fare in modo che tutti gli utenti 
  possano vedere i file e le directory che creo
2. `umask 077`, utilizzata per fare in modo che tutti gli altri 
  utenti non possano vedere i file e le directory che creo
dobbiamo mettere la umask in uno degli startup files per fare in 
modo che la modifica sia persistente.


## Gestione Avanzata dei Permessi (ACL)

Access Control Lists (ACLs) are a way to assign fine tuned 
permissions in Linux apart from using the chmod command. When the 
chmod command is used only one owner and one group can be 
assigned permissions on a file or directory. If multiple users 
need access to a resource we need to place them in a group and 
then give that group the necessary permissions. But with File 
ACLs in Linux we can assign fine grained permissions to each user 
and group on a file and even deny access to a particular user 
even if the file has world permissions. This tutorial on Linux 
File ACL will explain the usage of the commands getfacl and 
setfacl.

If you get a command not found error for getfacl and setfacl it 
means the acl package is not installed, so use yum or apt-get 
according to your operating system to install the package:

```sh
 sudo apt-get install acl
```
```sh
 sudo yum install acl
```

Solitamente ci accorgiamo che su un file sono impostati dei 
permessi ACL attraverso il simbolo + davanti alla stringa dei 
permessi quando eseguiamo ad esempio "ls -Al", se ad esempio 
notiamo una stringa del tipo "drw-r--r--+" questo significa che 
quel file è affetto da permessi ACL.

Per ricavare i permessi ACL di un file/directory eseguiamo:

```sh
 getfacl nomeFileODirectory 
 # mostra i permessi sul file 
 # includendo anche quelli ACL
```
Per impostare dei permessi ACL eseguiamo:

```sh
 setfacl -m -u:nomeUtente:rwx nomeFile 
 # imposta i diritti per 
 # l'utente chiamato nomeUtente abilitando lettura, scrittura ed 
 # esecuzione sul file menzionato
```
```sh
 setfacl -R -m u:username:rwx /path/to/directory 
 # imposta i 
 # diritti per l'utente chiamato username su una directory, 
 # infatti il flag "-R" è utilizzato per applicare ricorsivamente 
 # i permessi sulle directory
```
```sh
 setfacl -m g:groupname:r-x /path/to/filename 
 # imposta i 
 # diritti per il gruppo chiamato groupname abilitando lettura ed 
 # esecuzione sul file menzionato
```
```sh
 setfacl -m:user1:- /path/to/file 
 # nega tutti i permessi 
 # (lettura, scrittura ed esecuzione) per l'utente chiamato user1 
 # sul file menzionato
```
```sh
 setfacl -x u:username /path/to/file 
 # elimina la entry ACL 
 # relativa all'utente menzionato
```
```sh
 setfacl -b nomeFile 
 # elimina tutti i permessi ACL applicati al 
 # file menzionato
```
Su alcuni filesystem potrebbe non essere possibile effettuare il 
comando setfacl, questo è dovuto al fatto che deve essere 
attivata un'opzione sul filesystem su cui vogliamo applicare i 
permessi ACL. 

```sh
 getfacl -R /some/path > permissions.txt
 setfacl --restore=permissions.txt
 # questo e' utile per salvare i permessi di un file
 # e poi ripristinarli in un secondo momento
```

Consultare le man page di getfacl e setfacl per ulteriori 
informazioni molto ben dettagliate.

### Sulla mia partizione è possibile usare il sistema di permessi ACL ?

Possiamo vedere se l'opzione per i permessi ACL è impostata o 
meno sul filesystem prima eseguiamo:

```sh
 mount | column -t 
 # visualizza i filesystem correntemente 
 # montati con le relative opzioni, attenzione alcune opzioni 
 # potrebbero essere attive anche se non mostrate col comando 
 # mount, queste sono chiamate "opzioni di default"
```
se l'opzione "acl" non è visualizzata allora controlliamo le 
opzioni implicite di default, per poterle visualizzare eseguiamo:

```sh
 tune2fs -l /dev/sdaX 
 # in questo output cerchiamo una voce che 
 # dice "Default mount options" o qualcosa di simile
```
Nel caso in qui anche con questo comando manca la stringa "acl" 
tra le opzioni di mount di default, allora dobbiamo impostarli 
usando il file "/etc/fstab" e andando ad aggiungere l'opzione "
acl" al filesystem interessato, ad esempio:

```
/dev/sda2	/	ext4    acl,errors=remount-ro	0	1
```

## Hardware

Nella storia di Linux, ci sono stati molti cambiamenti su come il 
kernel presenta l'hardware all'utente. Attualmente il sistema che 
si occupa di abilitare i programmi nello user-space per la 
configurazione e l'utilizzo dei dispositivi hardware è chiamato "udev".

### Device Files


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


### Linux e Casualità, /dev/random e /dev/urandom

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


### Create /dev/random and /dev/urandom if absent

Creating /dev/random & /dev/urandom, if your System doesn’t have 
them, remind that:

* Minor Device number of /dev/random -- 1 
* Major Device number of /dev/random -- 8 
* Minor Device number of /dev/urandom -- 1 
* Major Device number of /dev/urandom -- 9

STEP1: Creating character file with mode/permission as 644 # 
mknod -m 644 /dev/random 1 8

STEP2: Creating character file with mode/permission as 644 # 
mknod -m 644 /dev/urandom 1 9

STEP3: Changing ownership & group of created devices to ‘root’ # 
chown root:root /dev/random /dev/urandom

STEP4: Done


### Il filesystem sysfs

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
e directory. La directory base che contiene i device è "
/sys/devices". Facciamo un esempio, il device /dev/sda potrebbe 
risiedere all'indirizzo "
/sys/devices/pci0000:00/0000:00:1f.2/host0/target0:0:0/0:0:0:0/block/sda"
, anche se l'indirizzo non è molto user-friendly, questi due file 
hanno scopi diversi, in quanto il primo è utilizzato per fornire 
un'interfaccia al device per i processi utente, mentre il secondo 
è utilizzato per visualizzare informazioni e gestire il device. 
All'interno della directory del device possiamo trovare 
all'interno del file "dev" il major e il minor number ad esempio "
8:0" starà ad indicare un major number = a 8 ed un minor number = 
a 0.

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
 # mostra i percorsi reali dei vari block 
 # device presenti sul sistema
```
Può essere difficile trovare la posizione di un determinato 
device che vediamo in /dev all'interno del filesystem sysfs. 
Possiamo usare il comando "udevadm" (contenuto in /sbin) per 
mostrare il path e vari attributi, ad esempio:

```sh
 udevadm info --query=all --name=/dev/sda 
 # mostra il percorso 
 # completo del device /dev/sda all'interno di sysfs con relative 
 # informazioni
```

### Hard Disks

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
programmi che fanno questo per noi, uno dei più famosi è "lsscsi"
.

```sh
 lsscsi 
 # mostra le periferiche SCSI, la prima colonna 
 # identifica l'indirizzo della periferica all'interno del 
 # sistema, la seconda identifica il tipo di dispositivo, le 
 # successive informazioni del produttore e l'ultima indica il 
 # percorso al device file
```
Tradizionalmente la nomenclatura dell'hardware ha spesso causato 
problemi, per via del fatto che se ho tre HDD, "/dev/sda", "/dev/sdb"
ed "/dev/sdc", e mi si spacca un HDD, ad esempio 
/dev/sdb, allora in questo caso /dev/sdc diventerà /dev/sdb, e 
tutte le regole che avevo impostato per /dev/sdb saranno 
applicate automaticamente a quest'ultimo HDD, per evitare questi 
problemi i sistemi Linux utilizzano l'UUID (Universally Unique 
Identifier) per una nomenclatura persistente degli HDD.


### CD e DVD

Linux riconosce la maggior parte dei drive ottici come 
dispositivi SCSI; ad ogni modo se il dispositivo è molto vecchio 
potrebbe essere riconosciuto come dispositivo PATA. I dispositivi 
ottici indicati con la nomenclatura `/dev/sr*` che sta per SCSI 
read sono di sola lettura, e sono dispositivi ottici da cui 
possiamo solo leggere; invece i dispositivi su cui possiamo 
scrivere sono indicati con `/dev/sg*`, dove sg sta per SCSI 
generic.


### PATA Hard Disk

I device indicati con `/dev/hd*`, sono comuni su kernel e 
dispositivi hardware molto vecchi. A volte potrebbe capitare di 
trovare un HDD SATA riconosciuto come PATA, questo significa che 
l'HDD SATA sta funzionando in "compatibility mode", questo 
abbassa le performance del dispositivo ed era una modalità 
utilizzata tempo fa per questioni di retro-compatibilità. 
Possiamo cambiare questa impostazione della "compatibility mode" 
dalle impostazioni di BIOS, riportando il device in "native mode".


### Approfondimento su SCSI

DA FARE


### Terminali

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


### Display Modes


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


### Porte Seriali


Dispositivi che si collegano a porte seriali di tipo RS-232 e 
simili sono speciali tipi di device terminale. Non possiamo fare 
molto da command-line, in quanto ci sarebbero troppe impostazioni 
da settare manualmente come il Baud rate o il flow control. 
Questi device vengono indicati con la nomenclatura `/dev/ttyS*`, 
mentre i dispositivi adattatori seriali USB si presentano con i 
nomi `/dev/ttyUSB*` e `/dev/ttyACM*`.


### Porte Parallele

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


### Dispositivi Audio

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


### Creare Device File

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


### udev

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

### devtmpfs


Questo filesystem è la risposta ai problemi citati di "udevd", in 
quanto il kernel crea i device file necessari per la fase di 
boot, e notifica ad udevd i nuovi dispositivi rilevati; una volta 
ricevute le notifiche, udev non deve più ricreare i device file, 
ma si occupa solo dell'inizializzazione dei vari device e delle 
notifiche ai processi. Inoltre udevd si occupa di creare un 
numero di link simbolici all'interno di /dev per una 
identificazione più accurata dei dispositivi; ad esempio 
/dev/disk, dove ogni disco collegato ha una o più entry.

### udevd nel dettaglio: Operazioni e Configurazioni


Il demone "udevd" opera in questo modo:

1. Il kernel manda una notifica chiamata "uevent" attraverso un 
  link di rete interno ad udevd
2. udevd carica tutti gli attributi menzionati nell'uevent
3. udevd fa il parsing delle cosiddette "rules", e opera secondo 
  queste regole

Le regole sono contenute nelle seguenti directory:

* /lib/udev/rules.d
* /etc/udev/rules.d



### Stesura di Regole per udev

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


### Capire cosa è stato collegato e ricavare informazioni

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

dobbiamo ricordarci che se abbiamo il percorso in /dev a 
disposizione allora useremo nel comando "udevadm info" l'opzione `--name`
e specificheremo il percorso in "/dev", mentre se abbiamo 
solo il percorso in "/sys" all-ora non dobbiamo mettere l'opzione 
`--name`.


### udevadm

Il programma udevadm costituisce il tool di gestione per udevd. 
Possiamo ad esempio ricaricare le regole di udev oppure innescare 
eventi, ma forse la più potente delle caratteristiche di questo 
programma è la capacità di poter cercare ed esplorare i 
dispositivi di sistema e l'abilità di monitorare gli uevents, 
quando udevd li riceve dal kernel.

Vediamo alcuni esempi:

```sh
 udevadm info --query=all --name=/dev/sda 
 # mostra tutte le 
 # informazioni, gli attributi e le regole per il device file 
 # /dev/sda
```
```sh
 udevadm monitor 
 # monitora i vari eventi, qui vedremo la 
 # sezione "kernel" che rappresenta i messaggi che arrivano dal 
 # kernel e la sezione "udev" relativa a quello che udev invia ai 
 # vari processi
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
 # mostra informazioni aggiuntive sui 
 # vari messaggi come ad esempio gli attributi, questo mi permette 
 # anche di visualizzare i file che vengono creati in /dev quando 
 # inserisco un nuovo device nel computer
```
C'è molto da sapere su udev, ad esempio possiamo anche filtrare i 
messaggi per device, inoltre è utile sapere che il D-Bus (Desktop 
Bus) system utilizzato per l'interprocess communication (IPC) ha 
un demone chiamato "udisks-daemon" che rimane in ascolto dei vari 
messaggi mandati da udevd per montare dischi in automatico o 
notificare altri processi del desktop della presenza dei nuovi 
dischi rilevati.

## Installare programmi su GNU/Linux e i Gestori di Pacchetti

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
programmi installati sono whereis e which. N.B.: E' possibile 
convertire un pacchetto ".rpm" in ".deb" o viceversa attraverso 
un programma chiamato alien. Un comodo reference per vedere le 
differenze tra un package manager e l'altro è 
[Differenze principali tra Package Manager](https://wiki.archlinux.org/index.php/Pacman_Rosetta).


### Whereis

Il programma whereis cerca i file relativi ad un programma 
installato, ha delle directory predefinite dove cercare. Mi 
fornirà la locazione dei binari (eseguibili), delle librerie 
relative al programma e delle pagine man del programma; questo 
comando è quindi utilizzato per localizzare i programmi 
installati nelle loro directory.

```sh
 whereis apache2 
 # mi fornisce tutte le locazioni riguardanti il 
 # pacchetto apache2
```


### Which

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

### Informazioni generali sui pacchetti


Quando vediamo un pacchetto tipo:

`nano-2.2.6-1.i386.rpm`

Allora le informazioni sono separate dai trattini, sto 
installando il pacchetto chiamato "nano" della versione 2.2.6 
della build 1 per l'architettura CPU i386.

### Installazione di programmi portable


Può capitare a volte di scaricare programmi per cui viene è 
disponibile la directory con gli eseguibili, quindi non possiamo 
installare questo programma con un gestore pacchetti ma ci basta 
avviarlo (una volta assicurati di avere i permessi di avvio "
chmod +x nomepgm") con "./nomepgm". Per rendere eseguibile un 
programma avviandolo direttamente da terminale con "nomepgm" come 
se avviassimo un programma normale allora è buona norma 
installare il programma nella directory "/opt/directoryPgm" e poi 
creare un soft link nella directory "/usr/bin".

### Type & Alias


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


### APT Package Manager (High Level)

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

### DPKG (Low Level)

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


### Aptitude (High Level)

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


### YUM (High Level)

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
### RPM (Low Level)


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

### Yumdownloader and rpm2cpio


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


### cpio

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


## Shells

Esistono varie shell, la shell di default sui sistemi GNU/Linux è 
la Bash,questa è la shell più comune infatti lo scripting fatto 
per le altre shell è solitamente compatibile con quello Bash, 
comunque le shell più famose sono:

* bash: shell di default su GNU/Linux e altri sistemi operativi
  UNIX based o inspired
* ksh: usata come shell di default su OpenBSD
* csh/tcsh: usata come shell di default su FreeBSD, la tcsh non 
  è altro che una csh con feature aggiunte (come 
  autocompletamento, ecc...)
* zsh: una shell avanzata che raggruppa molte delle feature di 
  tutte le altre, questa è la mia preferita! 

ognuna di queste shell ha i propri vantaggi/svantaggi, per poter 
visualizzare la lista delle shell disponibili su un sistema 
possiamo eseguire:

```sh
 cat /etc/shells 
 # visualizza tutte le shell disponibili
```
una volta individuata la shell che vogliamo possiamo eseguire:

```sh
 chsh -s {shell-name} {user-name} 
 #  dove l'opzione "-s" indica 
 # il percorso della shell
```
vediamo degli esempi pratici:

```sh
 chsh -s /bin/zsh 
 # cambia la shell dell'utente che lancia il 
 # comando ad una zsh
```
oppure un utente root potrebbe cambiare le shell degli altri 
utenti con:

```sh
 chsh -s /bin/zsh utenteacaso 
 # cambia la shell dell'utente "
 # utenteacaso" ad una zsh
```
per vedere ad un utente quale shell è impostata possiamo 
visualizzare il file "/etc/passwd" alla riga corrispondente al 
suo nome.

Per capire con che shell sto lavorando attualmente posso 
eseguire:

```sh
 ps | grep $$ 
 # visualizza il processo corrente, cioè la shell, 
 # vedremo bash se la shell è una bash, oppure zsh e così via.
```


## Shell e variabili d'ambiente


### Shell testuale ( DA RIGUARDARE)

Esistono alcuni comandi da shell molto utili, ad esempio:

```sh
 time programName 
 # fornisce il tempo necessario per lanciare il 
 # programma programName 
```
```sh
 exec 
 # è un comando utilizzato per lanciare un programma con lo 
 # stesso PID della shell, quindi appena termina, anche la shell 
 # termina
```
```sh
 set 
 # imposta le opzioni di shell, valido per molte shell
```
```sh
 shopt 
 # mostra le opzioni di shell (vale solo per alcune shell, 
 # ad esempio la Bash)
```
Alcuni file importanti per la shell di ogni utente sono:

```sh
 ~/.bash_history 
 # dove è salvata la cronologia dei comandi
```
```sh
 ~/.bashrc 
 # (configurazione shell non di login) dove è salvata 
 # la configurazione, per convenzione qui vengono salvati gli 
 # alias (validi per utente) e i comandi da avviare per ogni 
 # emulatore di terminale che apriamo, è il file di configurazione 
 # delle shell non di login, quindi per ogni terminale che apriamo 
 # una volta fatto il login; a volte per gli alias si può anche 
 # fare (per mantenere le configurazioni più ordinate e modulari) 
 # un file ".bash_alias" nella home e richiamarlo con "source" da "
 # .bashrc"
```
```sh
 ~/.profile 
 # (configurazione shell di login) altro file in cui 
 # sono salvate le configurazioni di shell, per convenzione qui 
 # vengono salvate le variabili d'ambiente, e i comandi da 
 # eseguire all'avvio della shell di login (un ambiente TUI-only, 
 # cioè solo testo senza ambiente grafico, o meglio, ambienti in 
 # cui dobbiamo eseguire startx per avviare l'ambiente grafico o 
 # in cui comunque effettuiamo login da un ambiente TUI, (o un 
 # altro esempio che costituisce un'eccezione sono i terminal 
 # multiplexer come tmux e screen che entrano in una shell di 
 # login) per vedere come autoavviare applicazioni all'avvio se si 
 # è installato un ambiente grafico fare riferimento alla sezione 
 # su Xorg). Questo file viene preso in considerazione solo se non 
 # esiste già un file specifico di configurazione per la shell 
 # utilizzata, se ad esempio usiamo una shell bash, allora a 
 # questo file sarà data una priorità più bassa e verranno letti 
 # (se esistono) i file "~/.bash_profile" e "~/.bash_login" 
```
```sh
 ~/.bash_logout 
 # dove sono salvati tutti le operazioni da 
 # effettuare al logout
```
```sh
 /etc/bash.bashrc 
 # file di configurazione globale dove è 
 # salvata la configurazione, per convenzione qui vengono salvati 
 # gli alias globali validi per tutti gli utenti
```
```sh
 /etc/bash/bashrc.d 
 # uguale al precedente, ma è un'intera 
 # directory dove possiamo mettere tutti i file di configurazione 
 # globali per le shell non di login
```
```sh
 /etc/profile 
 # file di configurazione globale in cui sono 
 # salvate le configurazioni di shell, per convenzione qui vengono 
 # salvate anche le variabili d'ambiente globali per le shell di 
 # login, le shell di login sono quelle usate quando non viene 
 # usato X, o di defualt sono quelle che vengono utilizzate da 
 # programmi come tmux o screen
```
Inoltre in alcune distro esistono directory come "/etc/profile.d/"
 in cui vengono salvati degli script che hanno lo stesso scopo 
dei file precedenti e vengono usati per automatizzare determinate 
operazioni al login degli utenti.

N.B.: Se vengono cambiate delle configurazioni globali attraverso 
i file sopracitati nella directory /etc, queste modifiche saranno 
attive solo al prossimo login degli utenti.

### Priorità dei file di Configurazione per la Bash Shell


Per le Shell di Login la shell Bash cerca di eseguire nell'ordine 
sottocitato i seguenti file:

1. /etc/profile
2. ~/.bash_profile
3. ~/.bash_login
4. ~/.profile

e quando esce o si effettua il logout prova ad eseguire:

1. ~/.bash_logout

Per le Shell non di Login, la shell Bash cerca di eseguire 
nell'ordine sottocitato i seguenti file:

1. /etc/bash.bashrc
2. ~/.bashrc

### Shell di Login o Shell di Non Login ?


Per controllare se siamo in una shell di login o in una shell non 
di login quando usiamo una shell Bash, possiamo usare il comando:

```sh
 shopt -q login_shell && echo 'Login shell' || echo 'Not login shell' 
 # mostra video un messaggio mostrando se la shell in 
 # utilizzo è di login o non di login
```
oppure

```sh
 shopt | grep login_shell 
 # mostrerà le variabili della shell
```
oppure ancora possiamo eseguire:

```sh
 echo $0 
 # se questo mostra in output "-bash" allora la nostra 
 # shell è di login se invece in output abbiamo "bash" allora la 
 # nostra shell è non di login
```


### Variabili d'ambiente della shell

Esistono alcune variabili d'ambiente utili per la 
personalizzazione della shell:

```sh
 $PS1 
 # contiene la forma in cui viene stampato il prompt della 
 # shell
```
```sh
 $PS2 
 # contiene la forma in cui viene stampato il secondo 
 # prompt della shell, quello comunemente associato al carattere "
 # >"
```
```sh
 $SHELL 
 # contiene il tipo di shell utilizzata
```
Vediamo alcuni utili shortcut della Bash shell ora:

```sh
 "Ctrl+r" 
 # mi permette di ricercare una stringa all'interno 
 # della cronologia dei comandi, possiamo quindi scrivere la 
 # parola ricercata e schiacciare Ctrl+r per scorrere la 
 # cronologia relativa a quella parola
```
```sh
 "Ctrl+l" 
 # esegue una pulizia dello schermo, è analogo a 
 # lanciare il comando "clear"
```
```sh
 "Ctrl+x+Backspace" 
 # per cancellare tutto quello che c'è prima 
 # del cursore
```
```sh
 "Ctrl+k" 
 # cancella tutto quello che c'è davanti al cursore
```
```sh
 "Ctrl+a" 
 # sposta il cursore all'inizio della linea
```
```sh
 "Ctrl+e" 
 # sposta il cursore alla fine della linea
```
```sh
 "Ctrl+u" 
 # cancella tutto quello che c'è prima del cursore, 
 # equivalente a "Ctrl+x+Backspace"
```
```sh
 "Ctrl+p" 
 # va indietro nella cronologia dei comandi
```
```sh
 "Ctrl+n" 
 # va avanti nella cronologia dei comandi
```
```sh
 "Alt+f" 
 # sposta il cursore in avanti di una parola
```
```sh
 "Alt+b" 
 # sposta il cursore indietro di una parola
```
```sh
 "Ctrl+t" 
 # per cambiare l'ordine di due caratteri, utilizzato 
 # ad esempio nel caso di errori di battitura
```
```sh
 "Alt+t" 
 # swappa due stringhe sulla riga di comando
```
```sh
 "Ctrl+w" 
 # elimina la stringa precedente
```
```sh
 "CTRL+x+e" 
 # inserisce il comando corrente in un editor di 
 # testo, per fare in modo che sia più facile modificarlo, o 
 # salvarlo eventualmente, l'editor che viene utilizzato è quello 
 # impostato come editor di default dal sistema, solitamente nella 
 # variabile $EDITOR
```
```sh
 "space+ComandoDaEseguire" 
 # inteso uno spazio prima del comando 
 # come: " cd" al posto di "cd", questa modalità di stesura del 
 # comando permette di fare in modo che non sia salvato nella 
 # history dei comandi
```
```sh
 some command|xsel --clipboard 
 # copia l'output del comando nella 
 # clipboard di sistema pronto per essere incollato, utile quanto 
 # ad esempio vogliamo utilizzare servizi di paste online
```
```sh
 \nomeComando 
 # utile per fare in modo di utilizzare il comando 
 # senza alias, se ad esempio abbiamo un alias impostato su "ls" e 
 # vogliamo invece utilizzare "ls" nella sua versione originale 
 # senza alias, eseguiamo "\ls", comodo soprattutto quando 
 # applichiamo alias su "rm"
```
### Configurazione e Personalizzazione della Shell Bash


Possiamo cambiare la dimensione della history, andando ad 
inserire nel file ".bashrc", cercando la stringa "HIST", possiamo 
cambiare le due varibili relative chiamate "HISTSIZE" ed "
HISTFILESIZE", una volta applicate le modifiche possiamo o 
sloggare e riloggare oppure eseguire:

```sh
 source .bashrc
```

### Shortcut per Bash e altre shell


* `CTRL+A` # move to beginning of line
* `CTRL+B` # moves backward one character
* `CTRL+C` # halts the current command
* `CTRL+D` # deletes one character backward or logs out of current session, it is similar to exit
* `CTRL+E` # moves to end of line
* `CTRL+F` # moves forward one character
* `CTRL+G` # aborts the current editing command and ring the terminal bell
* `CTRL+J` # same as RETURN
* `CTRL+K` # deletes from the cursor to end of line
* `CTRL+L` # clears screen 
* `CTRL+M` # same as RETURN
* `CTRL+N` # next line in command history
* `CTRL+O` # same as RETURN, then displays next line in history file
* `CTRL+P` # previous line in command history
* `CTRL+R` # searches backward
* `CTRL+S` # searches forward
* `CTRL+T` # transposes two characters
* `CTRL+U` # removes backward from cursor to the beginning of line
* `CTRL+V` # makes the next character typed verbatim
* `CTRL+W` # removes the word behind the cursor
* `CTRL+X` # lists the possible filename completions of the current word
* `CTRL+X CTRL+E` # opens the current line in a text editor
* `CTRL+Y` # retrieves (yank) last item killed
* `CTRL+Z` # stops the current command, resume with fg in the foreground or bg in the background
* `ALT+. ` # cycles through previous arguments
* `ALT+#`  # useful whenever we want to save the command in history, makes the current command a comment
* `ALT+f`  # moves forward one word
* `ALT+b`  # moves backward one word
* `ALT+d`  # deletes a word

### Variabili d'ambiente


Le variabili d'ambiente ci permettono di memorizzare dati 
all'interno della nostra shell, quindi il loro valore può variare 
da utente ad utente. Ad esempio, nel caso volessimo salvare una 
variabile chiamata "TEST", che rappresenta l'indirizzo di un sito 
web, allora facciamo:

```sh
 export TEST='http:#linuxacademy.tv' 
 # inizializziamo la 
 # variabile d'ambiente di nome TEST con il valore 
  'http:
 # linuxacademy.tv'
```
```sh
 export PATH=$PATH:/home/myExec 
 # aggiunge un'altra directory 
 # alla variabile d'ambiente "PATH", utile quando vogliamo solo 
 # aggiungere stringhe e non riscriverle da zero
```
N.B.: Le variabili salvate in questo modo, vengono cancellate 
quando viene effettuato il logout, per salvarle indipendentemente 
dai logout, bisogna salvarle nel file di configurazione della 
shell d'utente che solitamente è (dipende dalla configurazione) 
~/.profile, quindi andremo ad aggiungere in questo file, il 
comando export proprio come riportato negli esempi precedenti.

Possiamo stampare il valore delle variabili d'ambiente attraverso 
il comando "echo", ponendo il simbolo "$" davanti al nome della 
variabile d'ambiente:

```sh
 echo $TEST #stampa a video la stringa 'http:
 # linuxacademy.tv'
```
per cancellare una variabile, possiamo usare il comando "unset", 
ad esempio nel caso volessimo cancellare la variabile TEST 
possiamo effettuare:

```sh
 unset TEST 
 # cancella la variabile d'ambiente chiamata TEST
```
possiamo visualizzare tutte le variabili d'ambiente attraverso 
diversi comandi:

```sh
 env 
 # visualizza tutte le variabili d'ambiente, posso settare 
 # permanenti le variabili d'ambiente o nel file .bashrc o nei 
 # file in /etc/env.d/
```
```sh
 set 
 # visualizza tutte le variabili d'ambiente, anche se il 
 # comando set può essere usato anche per manipolare le opzioni di 
 # shell (vedi sezione successiva)
```
```sh
 printenv 
 # visualizza tutte le variabili d'ambiente
```
Vediamo ora alcune variabili d'ambiente famose:

```sh
 $HOSTNAME 
 # contiene il nome del nostro host
```
```sh
 $HOME 
 # la home del nostro utente
```
```sh
 $PWD 
 # la directory corrente
```
```sh
 $IFS 
 # contiene il carattere utilizzato come separatore, 
 # rappresenta come la shell separa i parametri e i valori in 
 # genere, di default è assegnato al carattere "spazio" (space)
```
```sh
 $PS1 
 # il prompt visualizzato dalla shell
```
```sh
 $PS2 
 # il secondo prompt visualizzato dalla shell, quello 
 # comumente indicato con ">"
```
```sh
 $$ 
 # il pid della shell attuale, in uno script è il PID dello 
 # script
```
```sh
 $USER 
 # il nome del nostro utente
```
```sh
 $SHELL 
 # il tipo di shell utiizzata
```
```sh
 $CDPATH 
 # è una variabile d'ambiente che può contenere 
 # directory aggiuntive che vengono considerate sempre nel momento 
 # in cui eseguiamo "cd", ad esempio se accediamo spesso alla 
 # directory "/etc" in quanto nella directory "/etc" sono 
 # contenute le directory "/etc/x" ed "/etc/y" che sono di nostro 
 # interesse, allora possiamo eseguire "export CDPATH=/etc" a 
 # questo punto in qualasiasi directory ci dovessimo trovare, 
 # possiamo eseguire semplicemente un "cd x" per accedere alla 
 # directory /etc/x ed "cd y" per accedere alla directory "/etc/y"
```
```sh
 $LD_LIBRARY_PATH 
 # il percorso delle librerie
```
```sh
 $DISPLAY 
 # il display attuale in cui vengono visualizzate le 
 # finestre grafiche
```
```sh
 $EDITOR 
 # il tipo di editor che viene aperto in automatico 
 # quando richiesto
```
```sh
 $PATH 
 # il percorso da dove vengono presi gli eseguibili per 
 # essere lanciati come comandi
```
```sh
 $MAIL 
 # il percorso dove vengono salvate le mail
```
```sh
 $LANG 
 # la lingua utilizzata dall'utente
```
```sh
 $# 
 # (utile negli script) il numero di parametri passati ad uno 
 # script
```
```sh
 $? 
 # stampa il valore di ritorno dell'ultimo script/comando 
 # lanciato, è da ricordare che un valore uguale a 0 significa "
 # esecuzione corretta", un valore diverso da zero, indica un 
 # errore
```
```sh
 $0 
 # (utile negli script) nome dello script
```
```sh
 $@ 
 # (utile negli script) una variabile unica contenente la 
 # lista di parametri passati allo script, usa come separatore lo "
 # spazio", questo è preferibile rispetto alla versione "$*", in 
 # quanto questa dipende da IFS
```
```sh
 $* 
 # (utile negli script) una variabile unica contenente la 
 # lista di parametri passati allo script, usa come separatore il 
 # carattere nella variabile "IFS"
```
```sh
 $1, $2, ... 
 # (utile negli script), è il parametro passato, ad 
 # esempio $1, è il primo parametro passato, $2 il secondo 
 # parametro passato e così via
```
```sh
 $- 
 # visualizza una stringa rappresentante i flag opzione della 
 # shell attualmente attivi (quelli che impostati con "set")
```
Dato un processo con relativo PID (visto ad esempio con top o ps) 
possiamo visualizzare le variabili d'ambiente che sta utilizzando 
andando a visualizzare il file:

```sh
 cat /proc/5464/environ 
 # visualizza le variabili d'ambiente in 
 # uso del processo col PID 5464
```
N.B.: C'è una differenza tra "environment variables" e "shell 
variables", in quanto le environment variables sono utilizzate 
dall'intero sistema e da alcuni programmi per la loro esecuzione, 
come ad esempio LANG, EDITOR, ecc..., mentre le "shell variable" 
non sono possono essere usate dai programmi esterni quindi 
valgono solo per la shell.

  Personalizzare il prompt dei comandi

Per personalizzare il prompt dei comandi, dobbiamo agire sulla 
variabile d'ambiente PS1, vediamo alcuni esempi:

```sh
 export PS1="miaStringa" 
 # mostra come prompt dei comandi "
 # miaStringa"
```
```sh
 export PS1="miaStringa \u@\h" 
 # mostra come prompt dei comandi "
 # miaStringa nomeUtente@hostname"
```
come possiamo notare, esistono dei codici come "\u" o "\h" che 
indicano variabili che possiamo mostrare nel prompt, elenchiamo 
alcuni esempi:

```sh
 # \a : an ASCII bell character (07)
```
```sh
 # \d : the date in "Weekday Month Date" format (e.g., "Tue May 
 # 26") 
```
```sh
 # \D{format} : the format is passed to strftime(3) and the result 
 # is inserted into the prompt string; an empty format results in 
 # a locale-specific time representation. The braces are required 
```
```sh
 # \e : an ASCII escape character (033) 
```
```sh
 # \h : the hostname up to the first '.'
```
```sh
 # \H : the hostname 
```
```sh
 # \j : the number of jobs currently managed by the shell
```
```sh
 # \l : the basename of the shell?s terminal device name 
```
```sh
 # \n : newline 
```
```sh
 # \r : carriage return 
```
```sh
 # \s : the name of the shell, the basename of $0 (the portion 
 # following the final slash) 
```
```sh
 # \t : the current time in 24-hour HH:MM:SS format 
```
```sh
 # \T : the current time in 12-hour HH:MM:SS format 
```
```sh
 # \@ : the current time in 12-hour am/pm format
```
```sh
 # \A : the current time in 24-hour HH:MM format 
```
```sh
 # \u : the username of the current user 
```
```sh
 # \v : the version of bash (e.g., 2.00) 
```
```sh
 # \V : the release of bash, version + patch level (e.g., 2.00.0) 
```
```sh
 # \w : the current working directory, with $HOME abbreviated with 
 # a tilde 
```
```sh
 # \W : the basename of the current working directory, with $HOME 
 # abbreviated with a tilde 
```
```sh
 # \! : the history number of this command 
```
```sh
 \
 #  : the command number of this command 
```
```sh
 \$ : if the effective UID is 0, a 
 # , otherwise a $ 
```
```sh
 # \nnn : the character corresponding to the octal number nnn 
```
```sh
 # \\ : a backslash 
```
```sh
 # \[ : begin a sequence of non-printing characters, which could 
 # be used to embed a terminal control sequence into the prompt 
```
```sh
 # \] : end a sequence of non-printing characters 
```
```sh
 \u 
 # nomeutente
```
```sh
 \h 
 # hostname
```
```sh
 \w 
 # directory corrente
```
```sh
 \@ 
 # ora corrente con indicazione AM/PM
```
```sh
 \t 
 # ora corrente con indicazione dei secondi
```
```sh
 \j 
 # numero di job in esecuzione
```
```sh
 \d 
 # data corrente
```
```sh
 \$ 
 # mostra il simbolo "$" se l'utente corrente non è root 
  mentre in caso contrario mostra il simbolo "
 # "
```
Per poter modificare i colori o gli stili del testo invece 
esistono dei codici, ad esempio il verde non grassetto 
corrisponde al codice "0;32", però l'inizio e la fine dello 
stile/colore deve essere delimitata dalle sequenze:

```sh
 \[\e[codiceColorem\] 
 # per iniziare con codiceColore
```
```sh
 \[\e[m\] 
 # per terminare con l'ultimo codice con cui abbiamo 
 # iniziato
```
ad esempio, nel caso volessimo avere un prompt con il nome utente 
e l'hostname con carattere di separazione "@" tutto di colore "
0;32" seguiti dalla directory corrente con stile/colore "0;31" 
allora facciamo:

```sh
 export PS1='\[\e[0;32m\]\u@\h\[\e[m\]\[\e[0;31m\]\w\[\e[m\]'
```
Per una lista di tutti gli stili/colori disponibili, è 
consigliato consultare [https:#wiki.archlinux.org/index.php/Color_Bash_Prompt||Guida ai Colori del Prompt di Shell]
.

Vediamo un altro esempio:

```sh
  PS1="$HC$FYEL[ $FBLE${debian_chroot:+($debian_chroot)}\u$FYEL: 
  $FBLE\w $FYEL]\\$ $RS" PS2="$HC$FYEL&gt; $RS"
```
o ancora

```sh
  PS1="\[$(tput bold)\]\[$(tput setaf 6)\]\t \[$(tput setaf 
  2)\][\[$(tput setaf 3)\]\u\[$(tput setaf 1)\]@\[$(tput setaf 
  3)\]\h \[$(tput setaf 6)\]\W\[$(tput setaf 2)\]]\[$(tput setaf 
  4)\]\\$ \[$(tput sgr0)\]"
```
online esistono diversi Bash PS1 generator per semplificare la 
procedura di customizzazione.

### Opzioni di Shell


Le "opzioni di shell", sono impostazioni che possono cambiare il 
comportamento delle shell (e degli script di shell) in 
determinate situazioni o per determinate operazioni. Il comando "
set" viene utilizzato allo scopo di impostare le opzioni di 
shell. La sintassi del comando è:

```sh
 set -o nome-opzione 
```
o in forma abbreviata:

```sh
 set -opzione-abbreviata
```
Per disabilitare un'opzione invece si usa la sintassi:

```sh
 set +o nome-opzione 
 # disabilita l'opzione menzionata
```
per vedere una lista delle possibilità eseguiamo:

```sh
 set -o 
 # visualizza la lista delle possibili configurazioni 
 # attuabili
```
Vediamo alcuni esempi:

```sh
 set -o noclobber 
 # in questo modo impostiamo l'opzione 
 # noclobber, che non permette sovrascritture da parte del 
 # terminale
```
```sh
 set +o noclobber 
 # viene disabilitata l'opzione noclobber, 
 # quindi ridiventa possibile effettuare sovrascritture
```
```sh
 set -o vi 
 # imposta come shortcut della shell (bash zsh) i 
 # comandi di vi, ad esempio per cancellare la riga di comando 
 # useremo "dd" e per navigare la history "Esc+(kjhl)"
```
```sh
 set -o emacs 
 # imposta come shortcut della shell (bash o zsh) i 
 # comandi di emacs, questa è abilitata di default
```
Una guida più dettagliata alle opzioni di shell è fornita al link 
[http:#www.tldp.org/LDP/abs/html/options.html||Guida al comando Set e alle Opzioni di Shell]

Vediamo un esempio di file "~/.bashrc" che raggruppa varie comuni 
e utili configurazioni per la bash:

```sh
# Store 5000 commands in history buffer 
export HISTSIZE=5000

# Store 5000 commands in history FILE  
export HISTFILESIZE=5000

# Avoid duplicates in hisotry  
export HISTIGNORE='&:[ ]*'

# Use less command as a pager 
export PAGER=less

# Set vim as default text editor 
export EDITOR=vim 
export VISUAL=vim 
export SVN_EDITOR="$VISUAL"

# Oracle database specific
export ORACLE_HOME=/usr/lib/oracle/xe/app/oracle/product/10.2.0/server 
export ORACLE_SID=XE export 
NLS_LANG=$($ORACLE_HOME/bin/nls_lang.sh)

# Set JAVA_HOME  
export JAVA_HOME=/usr/lib/jvm/java-6-sun/jre

# Add ORACLE, JAVA and ~/bin bin to PATH 
export PATH=$PATH:$ORACLE_HOME/bin:$HOME/bin:$JAVA_HOME/bin

# Secure SSH login stuff using keychain 

# No need to input password again ever 
/usr/bin/keychain $HOME/.ssh/id_dsa 
source $HOME/.keychain/$HOSTNAME-sh

# Turn on Bash command completion 
source /etc/bash_completion
# MS-DOS / XP cmd like stuff 
alias edit=$VISUAL 
alias copy='cp' 
alias cls='clear' 
alias del='rm' 
alias dir='ls' 
alias md='mkdir' 
alias move='mv' 
alias rd='rmdir' 
alias ren='mv' 
alias ipconfig='ifconfig'

# other common GNU/Linux common alias stuff
bc='bc -l' 
alias diff='diff -u'

# get updates from RHN 
alias update='yum -y update'


# set eth1 as default 
alias dnstop='dnstop -l 5  eth1' 
alias vnstat='vnstat -i eth1'

# force colorful grep output 
alias grep='grep --color'

# ls stuff 
alias l.='ls -d .* --color=tty' 
alias ll='ls -l --color=tty' 
alias ls='ls --color=tty'
```

vediamo un altro esempio con una bella carrellata di alias utili:

```sh
alias ls='ls -c --color=auto' 
alias la='ls -ac --color=auto' 
alias ll='ls -lah --color=auto' 
alias lsd='ls -d */' 
alias lsz='ls -AZ --color=auto'

# Colorize grep 
alias g="grep --color=always" 
alias gi="grep -i --color=always"

# with grep 
alias lsg='ls --color=auto | g' 
alias lag='ls -a --color=auto | g' 
alias llg='ls -lah --color=auto | g'

# Safe copy,move or remove, asking for confirmation
alias mv='mv -i' 
alias cp='cp -i' 
alias rm='rm -i'

# Override -f 
alias rmf='rm -Rfv' 
alias cpf='\cp -v' 
alias mvf='\mv -v' 


# No clobber 
set -o noclobber 

# Override >|
# Sysadmin 
alias psa='ps auxf' 
alias psg='ps aux | grep' 

# requires an argument 
alias date='date "+%A %B %d, %Y %l:%M %p %Z"' 
alias date='echo -ne "${LIGHTBLUE}";date "+%A %B %d, %Y %l:%M %p %Z"' 
alias cal='echo -e "${CYAN}"; cal""' 
alias hist='history | g $1' 

#Requires one input 
alias du='du -sh' 
alias dul='\du -h | less' 
alias df='df -h'
```

### Zsh

Questa è una shell molto avanzata, si consiglia l'installazione 
dei powerline fonts e di un qualche plugin manager come "oh my zsh",
alcuni comandi utili qui sono:

```sh
 dirs -v 
 # visualizza le ultime directory visitate ad ognina 
 # viene assegnato un numero e possiamo navigare su quella con "cd 
 # -<numero>"
```
ad esempio:

```sh
 cd -2 
 # va alla directory indicata col numero "2" quando 
 # abbiamo eseguito "dirs -v"
```
### Funzioni d'Ambiente


Come per le variabili possiamo anche creare "comandi" (cioè 
funzioni) che saranno accessibili solo all'utente, questo è 
possibile andando a salvare nel file ".bashrc" o ".profile" a 
differenza dei file che vengono eseguiti all'avvio (ergo dipende 
molto dal setup dell'ambiente). Vediamo un esempio di funzioni 
inserite all'interno del file .bashrc:

```sh
# Set Proxy 

function nomecomandopersonaleuno() {     
	export {http,https,ftp}_proxy="http:#proxy-server:port" 
}
```

```sh
# Unset Proxy 

function nomecomandopersonaledue() {     
    unset {http,https,ftp}_proxy 
}
```

ora al prossimo login (oppure dopo aver rieseguito il file 
.bashrc con un source o avviandolo) all'utente basterà digitare 
da riga di comando:

```sh
 nomecomandopersonaleuno 
 # eseguirà le istruzioni contenute 
 # all'interno della funzione nomecomandopersonaleuno
```
oppure

```sh
 nomecomandopersonaledue 
 # eseguirà le istruzioni contenute 
 # all'interno della funzione nomecomandopersonaledue
```
### Memorizzare Comandi e Riprodurli


Possiamo usare l'utility "script" e "replayscript", sia per scopi 
didattici che per scopi di utilità, è un modo per registrare le 
attività da terminale, si esegue in questo modo:

```sh
 script --timing=time.txt script.log 
 # comincia una sessione di 
 # registrazione, e termina o col comando exit o con "Ctrl+d"
```
```sh
 scriptreplay --timing=time.txt script.log 
 # riproduce i comandi 
 # registrati nello script.log, ma non come uno script, in quanto 
 # mi riporta l'esatto output
```

### Terminal Multiplexers

I Terminal Multiplexer permettono di lavorare in ambienti con più 
sessioni di terminale all'interno dello stesso terminale, è 
l'analogo dei desktop virtuali per le GUI fatto per le TUI. I due 
più famosi Terminal Multiplexer sono:

* tmux
* screen
* terminator (GUI)


### Tmux

Tmux è organizzato in sessioni, ogni sessione è costituita da una 
o più windows (finestre) ed ogni finestra può essere costituita 
da uno o più panes (riquadri), vediamo alcuni comandi comuni:

```sh
 tmux 
 # avvia tmux
```
ogni comando di tmux comincia col prefix (prefisso) "Ctrl+b", 
quindi ogni comando che segue dovrà prima essere preceduto dalla 
combinazione"Ctrl+b":

```sh
 c 
 # crea una nuova window
```
```sh
 n 
 # va alla window successiva
```
```sh
 p 
 # va alla window precedente
```
```sh
 & 
 # killa la window corrente
```

```sh
 s
 # mostra lo stato di tutte le window
```
```sh
 , 
 # rinomina la window corrente
```
```sh
 w 
 # mostra la lista delle window all'interno della sessione 
 # corrente
```
```sh
 0-9 
 # va alla finestra identificata dall'id specificato
```
per quanto riguarda i pane, abbiamo a disposizione:

```sh
 " 
 # splitta in modo orizzontale la window in due pane
```
```sh
 % 
 # splitta in modo verticale la window in due pane
```
```sh
 o 
 # switcha tra un pane e l'altro
```
```sh
 ;
 # switcha tra il pane corrente e il precedente 
```


```sh
 tasti direzionali 
 # ridimensiona un pane
```
```sh
 spacebar 
 # cambia il layout tra alcuni predefiniti
```
```sh
 z 
 # mette un pane in fullscreen, dobbiamo ripetere lo shortcut 
 # per rimetterlo a posto
```
```sh
 {,} 
 # spostiamo il pane a destra o a sinistra
```
```sh
 ; 
 # va all'ultimo pane attivo
```
```sh
 ! 
 # converte il pane in una finestra separata
```
```sh
 x 
 # chiude il pane o una window se e' presente un unico pane
```
```sh
 $ 
 # rinomina la corrente sessione tmux
```


Possiamo creare una nuova sessione tmux con:

```sh
 tmux new -s nome-sessione
 # crea una nuova sessione con nome "nome-sessione"
```

```sh
 tmux ls
 # elenca le sessioni tmux presenti sul sistema
```

```sh
 tmux a -t nome-sessione
 # si collega alla sessione chiamata "nome-sessione", "a" sta per "attach"
```

```sh
 tmux rename-session -t 0 database
 # rinomina la sessione 0 col nome "database"
```

```sh
  tmux detach
  # possiamo sconnetterci da una sessione senza terminarla con detach 
  # un'alternativa e' o "ctrl+b d"
```

```sh
  tmux kill-session -t session-name
  # possiamo terminare una sessione tmux con l'argomento kill-session
```


Inoltre sono disponibili molti comandi, possiamo accedere alla 
modalità comandi con lo shortcut "Ctrl+b+:", da qui alcuni 
comandi utili sono:

```sh
 join-pane -s 1 
 # joina la window 1 come pane alla window 
 # corrente
```
```sh
 join-pane -b -s 5 -t 2 
 # joins window 5 to the left of pane 2 
 # in the current window
```
```sh
 join-pane -s 1 -t 0 
 # joina la finestra uno come pane alla 
 # finestra corrente
```
```sh
 swap-window -s 2 -t 1 
 # swappa la finestra 2 con la numero 1
```
Guardare ovviamente il man per altre opzioni


### Screen

Possiamo avviarlo eseguendo:

```sh
 screen 
 # si avvia una sessione di screen, che possiamo 
 # terminare (chiudere del tutto) con "Ctrl+d"
```
```sh
 screen -mS nomeSessione 
 # si avvia una sessione di screen, con 
 # il nome menzionato nel comando
```
Altri comandi utili sono:

```sh
 screen -ls 
 # elenca le varie sessioni disponibili, possiamo 
 # rimuovere una sessione attraverso il comando "kill" seguito dal 
 # numero del processo indicato quando eseguiamo "screen -ls"
```
```sh
 screen -r sessionID 
 # ripristina la sessione menzionata
```
possiamo fare il detach di una sessione con:

```sh
 Ctrl+a+d 
 # detacha la sessione, possiamo visualizzarla con "
 # screen -ls" o ripristinare con "screen -r nomeSessione"
```
Vediamo altri comandi:

```sh
 Ctrl+a, " 
 # switcha finestra
```
```sh
 Ctrl+a,c 
 # crea una nuova finestra
```
```sh
 Ctrl+a,A 
 # rinomina la finestra corrente
```
```sh
 Ctrl+aa 
 # switcha tra le ultime due finestre
```
```sh
 Ctrl+a,k 
 # killa una finestra
```
```sh
 Ctrl+a, S 
 # split window horizontally
```
```sh
 Ctrl+a, | 
 # split window vertically
```
```sh
 Ctrl+a, Tab 
 # switcha tra una finestra all'altra
```
```sh
 Ctrl+a, :resize [rows,cols] 
 # ridimensiona la finestra
```
```sh
 Ctrl+a, :remove 
 # rimuove la finestra
```
### Terminator


Vediamo alcuni comandi di terminator:

```sh
 terminator 
 # avvia l'applicazione
```
```sh
 Ctrl+Shit+e 
 # split verticale
```
```sh
 Ctrl+Shift+o 
 # split orizzontale
```
```sh
 Ctrl+Shift+z 
 # massimizza un terminale
```
```sh
 Ctrl+d 
 # chiude un terminale
```
```sh
 Alt+Left/Up/Right/Down 
 # switcha tra le finestre
```
```sh
 Ctrl+Shift+Left/Up/Right/Down 
 # resize del terminale, 
 # quest'operazione è possibile anche dalla GUI attraverso il 
 # mouse
```
## Lavorare con File di Testo

I file di testo e la loro gestione ricopre un ruolo importante 
nei sistemi GNU/Linux, in quanto qualsiasi cosa è alla fine vista 
come un file di testo, i più comuni editor di testo sono "vi" e "
nano", anche se i standard "de facto" per i power users sono "vi" 
ed "emacs".


### Vi (Editor di Testo)

Vi è un editor di testo molto famoso, posso aprire un file di 
testo con vi eseguendo:

```sh
 vi nomefile 
 # apre il file nomefile con vi
```
Vi funziona secondo tre modalità operative e diventa un editor di 
testo molto efficiente una volta imparati i comandi più 
importanti:

1. Modalità "comandi" (Accessibile attraverso il tasto "Esc")
2. Modalità "colon" o "ex-mode" (Accessibile attraverso il tasto `:`): utilizzata 
   per manipolare il file
3. Modalità "inserimento" (Accessibile attraverso il comando `i`): 
   utilizzata per editare/inserire testo all'interno del file

```sh
 # Per uscire premere :q
```
```sh
 # Per salvare premre :w
```
```sh
 # Per salvare e uscire :wq
```
```sh
 # Per uscire da tutte le finestre :qa
```
```sh
 # Per copiare una riga si entra in command mode e si preme "yy"
```
```sh
 # Per incollare schiaccio "p" oppure "P" se voglio effettuare 
 # l'incollatura sulla riga soprastante
```
```sh
 # Per andare alla riga quattro eseguo ":4"
```
```sh
 # Per avere a schermo l'output di altri comandi eseguo ":r! 
 # nomeComando"
```
```sh
 # Per copiare 4 righe dal testo faccio "4yy"
```
```sh
 # Per tagliare una riga uso "dd"
```
```sh
 :d 
 # cancella una riga senza copiarla, esegue quindi "cancella" 
 # e non taglia
```
```sh
 # Per cancellare 10 righe successive uso "10dd"
```
```sh
 # Per cancellare 10 righe precedenti uso "10dk"
```
```sh
 # Per muovermi alla parola successiva "w"
```
```sh
 # Per muovermi alla parola successiva "b"
```
```sh
 # Per muovermi fino a prima dell'occorrenza del carattere 'f' 
 # eseguo "tf"
```
```sh
 # Per muovermi fino all'occorrenza del carattere 'c' eseguo "fc"
```
```sh
 # Per cancellare all'interno di parentesi quadre [] o altre 
 # delimitatori eseguo "ci["
```
```sh
 # Per cancellare all'interno di parentesi quadre [] ed inoltre 
 # anche le parentesi quadre eseguo "ca["
```
```sh
 # Con "%" vado alla fine dell'altro delimitatore corrispondente, 
 # se sono posizionato su {, allora andrò su } e viceversa
```
```sh
 # Con "Shift+A" vado a fine riga
```
```sh
 # Con "R" faccio il replace del testo
```
```sh
 # Con "Shift+H" vado all'inizio del testo H sta per home
```
```sh
 # Con "Shift+L" vado a fine testo
```
```sh
 # Con "u" faccio un "undo", annullo l'ultima operazione
```
```sh
 # Per cercare parole posso usare "/parolaDaCercare", questo 
 # posizionerà il cursore sulla parola cercata
```

* Per andare alla prossima ricorrenza schiaccio "n" 
* Per andare alla precedente ricorrenza schiaccio "N" in realtà 
    posso cercare indietro nel documento anche con "?parolaDaCercare"

```sh
 # Possiamo effettuare sostituzione di testo, ad esempio per 
 # sostituire tutte le occorrenze della parola "this is" con "that"
 # possiamo usare il comando ":%s/this is/ that"
```
```sh
 # Per sostituire solo una riga o una singola parola possiamo 
 # usare ":1s/this is/ that" 
```
```sh
 # Con Vi possiamo inserire comandi da terminale GNU/Linux con "
 # :!nomecomando", ad esempio ":!ls" 
```
```sh
 # Per caricare un file dalla colon mode posso effettuare un ":e 
 # fileToOpen"
```
```sh
 # Per caricare il contenuto di un altro file all'interno del file 
 # che sto editando faccio ":r filetoinsert"
```
Vi supporta diversi plugin, ed il modo più conveniente per 
gestirli è utilizzare dei plugin manager, come "plug" , due 
percorsi sono importanti per le personalizzazioni di "vi":

```sh
 il percorso ~/.vim/ 
 # che costituisce la directory dove 
 # andranno installati i nostri plugin
```
```sh
 il file ~/.vimrc 
 # che costituisce un file di configurazione, 
 # con diverse possibili opzioni, se non esiste, possiamo crearlo, 
 # un'opzione utile è ad esempio impostare automaticamente il 
 # numero di riga, possiamo farlo aggiungendo a questo file la 
 # stringa "set number"
```
Vediamo alcune opzioni utili da abilitare in vi/vim, questo è 
possibile attraverso il comando:

```sh
 :syntax on 
 # imposta il syntax highlighting
```
```sh
 :set syntax=html 
 # imposta il syntax come se fosse un file 
 # html, utile quando editiamo un file senza estensione e vogliamo 
 # il syntax highlighting
```
```sh
 :set number 
 # imposta il line numbering
```
```sh
 :set shell sh=/bin/bash 
 # imposto la shell da usare quando 
 # eseguo i comandi esterni, con ":!nomecomando"
```
```sh
 :sh 
 # eseguo la shell impostata
```
```sh
 :set relativenumber 
 # abilita il conteggio relativo delle 
 # linee, in modo da poter sempre sapere ad esempio su quante 
 # righe precedenti o successive lavorare
```
```sh
 :set paste 
 # imposta vim nella paste mode, in modo da non avere 
 # effetti indesiderati nel momento in cui andiamo ad incollare da 
 # copie effettuate in altri programmi, come browser, editor di 
 # testo, ecc...
```
```sh
 :set softtabstop=4 
 # imposta il numero di caratteri da 
 # eliminare quando è stato effettuato un tab e si vuole 
 # cancellare
```
```sh
 :set ts=4 
 # imposto il numero di spazi corrispondenti ad una 
 # pressione del tasto tab
```
```sh
 :set sw=4 
 # quando imposto il tasto tab, devo anche settare 
 # questa, altrimenti i comandi di indentazione con "<" e ">" non 
 # funzionano
```
```sh
 :set et 
 # imposto l'espansione del tab con spazi
```
```sh
 :set autoindent 
 # indenta automaticamente dopo l'invio
```
```sh
 :set noautoindent 
 # disabilita l'autoindentazione
```
```sh
 :set splitbelow 
 # automaticamente quando viene eseguito un 
 # nuovo split verticale la finestra nuova viene posizionata in 
 # basso
```
```sh
 :set splitright 
 # automaticamente quando viene eseguito un 
 # nuovo split orizzontale la finestra nuova viene posizionata a 
 # destra
```
```sh
 :set wildmenu 
 # imposta l'autocompletamento dei file quando 
 # eseguiamo ":e" o qualsiasi comando che apre un file
```
* ad esempio ":b <TAB>" permette di andare in un file 
    precedentemente visitato

```sh
 :set expandtab 
 # when enabled, causes spaces to be used in 
 # place of tab characters
```
```sh
 :set hlsearch 
 # effettua l'highlight di tutti i valori trovati 
 # nella ricerca
```
```sh
 :set showmatch 
 # effettua l'highlight della parentesi 
 # corrispondente che viene matchata
```
```sh
 :30,60w newFileName 
 # salva il contenuto dalla linea 30 alla 
 # linea 60 in un nuovo file
```
```sh
 :s/parola/parolaNuova/g 
 # sostituisce tutte le occorrenze di "
 # parola" con "parolaNuova" solo sulla linea corrente
```
```sh
 :%s/parola/parolaNuova/g 
 # sostituisce "parola" con "
 # parolaNuova" in tutto il testo
```
```sh
 :%s/parola/parolaNuova/gi 
 # sostituisce "parola" con "
 # parolaNuova" in tutto il testo in modalità case insensitive
```
```sh
 :3,7s/parola/parolaNuova/g 
 # sostituisce "parola" con "
 # parolaNuova" tra le righe 3 e 7
```
```sh
 :%s/parola/parolaNuova/gc 
 # sostituisce tutte le occorrenze di "
 # parola" con "parolaNuova" chiedendo conferma ad ogni occorrenza
```
```sh
 map <F2> :Vexplore<CR> 
 # mappa il tasto F2 ad un file explorer
```
```sh
 map <F5> :set number!<CR><Esc> 
 # mappa il tasto F5 ad un toggle 
 # per la numerazione delle linee
```
```sh
 nnoremap <C-w>t :tabnew<cr> 
 # mappa il tasto Ctrl+w, t alla 
 # creazione di una nuova tab
```
For what concerns the remapping we have to know that, we have 
various options,

remap is an option that makes mappings work recursively. By 
default it is on and I'd recommend you leave it that way. The 
rest are mapping commands, described below:

:map and :noremap are recursive and non-recursive versions of the 
various mapping commands. What that means is that if you do:

:map j gg 

:map Q j 

:noremap W j

j will be mapped to gg. Q will also be mapped to gg, because j 
will be expanded for the recursive mapping. W will be mapped to j 
(and not to gg) because j will not be expanded for the 
non-recursive mapping.

Now remember that Vim is a modal editor. It has a normal mode, 
visual mode and other modes.

For each of these sets of mappings, there is a mapping that works 
in normal, visual, select and operator modes (:map and :noremap), 
one that works in normal mode (:nmap and :nnoremap), one in 
visual mode (:vmap and :vnoremap) and so on.

Se vogliamo rendere permanenti queste modifiche, salviamo le 
stringhe relative ai comandi all'interno del file ".vimrc" 
presente (o forse no) nella home directory, ad esempio col 
comando:

```sh
 echo "syntax on" >> ~/.vimrc
```
```sh
 echo "set number" >> ~/.vimrc
```
### Vim


Possiamo eseguire copy & paste compatibile con altre applicazioni 
grafiche se abbiamo l'opzione "+clipboard" attivata quando 
eseguiamo:

```sh
 :version
```
se questa è presente possiamo copiare attraverso il comando (dopo 
aver selezionato con la modalità visual):

```sh
 "y+ 
 # in questo caso copio nella clipboard di xorg
```
```sh
 "_d 
 # cancella una riga senza incollarla in un buffer, quindi 
 # esegue solo delete e non cut
```
possiamo anche incollare in modalità insert senza ritornare in "
normal mode", eseguendo:

```sh
 Ctrl+r e poi premendo il registro da cui vogliamo incollare
```
se invece volessimo incollare del codice (ad esempio) preso da un 
browser o da qualsiasi altra applicazione in xorg, allora a 
questo punto eseguiamo:

```sh
 :set paste 
 # per abilitare la modalità incolla
```
per capire se una modalità è attiva o meno possiamo fare così:

```sh
 :set paste?
```
oppure:

```sh
 :set ft? autoindent? 
 # fa un check su due impostazioni
```
e poi premiamo la combinazione "Shift+Control+v" oppure un 
incolla col mouse.

Possiamo testare una configurazione di un file .vimrc, senza 
modificare il nostro, attraverso il flag "-u", con:

```sh
 vim -u test_vimrc 
 # dove test_vimrc è il file di configurazione 
 # di github che vogliamo testare, ne possiamo trovare tantissimi 
 # su github
```
Cosa utile in Vim per convertire file da windows a linux (o da 
linux a windows ?) è:

```sh
 :1,$s/^M
 # g
```
Ci potrebbe capitare di premere la combinazione di tasti Ctrl+s, 
in questo caso sembrerebbe che vim sia bloccato, in realtà basta 
premere Ctrl+q per sbloccarlo, questa feature è chiamata "
software flow control". E' una feature legacy che esiste dagli 
anni 80,

per disabilitare questa feature dobbiamo modificare il nostro 
file di configurazione shell ad esempio ~/.bash_profile or 
~/.bashrc, con la seguente stringa:

stty -ixon 

P.S.: Per navigare i file è molto comodo il plugin "CtrlP"


### Richiamare programmi esterni su blocchi di righe

Una volta selezionato un blocco di righe ad esempio con "Shift+V",
possiamo applicare comandi esterni come awk, sed o meglio 
ancora perl, andando a modificare il testo, ad esempio una volta 
selezionato il testo desiderato, possiamo premere ":", e ci verrà 
mostrata una stringa coi caratteri `'<,'>`, a questo punto 
possiamo digitare "!" preceduto dal comando esterno ad esempio:

```sh
:'<,'>!perl -ne 'print if ($_ > 15)'
```
questo si che è figo.


### Cercare documentazione in vim

Possiamo cercare documentazione una volta posizionato il cursore 
su una determinata funzione/keyword premendo "shift+k". Ad 
esempio se programmiamo in Perl, questo funziona solo se abbiamo 
installato il pacchetto "perl-doc" o se programmiamo in python 
solo se abbiamo installato "pydoc" e così via. 

Inoltre per cercare ad esempio il prototipo di una funzione 
scritta da noi, possiamo (cercare :h tags, :h ctags, :h cscope, 
:h include-search :help include-search -> 
http:#vimhelp.appspot.com/tagsrch.txt.html#include-search)


### Editare file con sudo

Se dovessimo aprire un file senza i permessi necessari per 
modificarlo con vim, possiamo apportare comunque le modifiche 
eseguendo:

```sh
 :w | !sudo tee % 
 # questo ci permetterà di salvare le modifiche 
 # anche non essendo root
```
inoltre aprire vim con i diritti di root non è molto costruttivo 
in quanto perdiamo la configurazione di vim utilizzata per il 
nostro utente, quindi se volessimo evitare di lanciare quel 
comando lungo da vim tutte le volte possiamo considerare di usare 
"sudoedit" o "sudo -e" che sono equivalenti, quindi eseguiamo:

```sh
 sudoedit /path/al/file/diRoot 
 # in questo modo viene creata una 
 # copia temporanea del file, in modo da usare la mia 
 # configurazione di vim e solo una volta salvato andremo a 
 # riscrivere il file originale con i diritti di root
```
### Folding/Unfolding di testo


Possiamo eseguire un folding di testo, in vari modi, uno ad 
esempio è entrare nella modalità visual, selezionare il testo 
interessato e poi eseguire:

```sh
 zf 
 # effettua il folding del testo
```
oppure possiamo utilizzare cose come ad esempio:

```sh
 zfip 
 # fold direttamente di un paragrafo
```
oppure:

```sh
 zfap 
 # fold del testo tenendo conto anche delle parentesi
```
o ad esempio nel caso avessimo una funzione delimitata da simboli 
"{" e "}" eseguiamo:

```sh
 zfi{ 
 # fold della funzione delimitata da parentesi graffe
```
ovviamente può essere applicato a tutte le parentesi. Possiamo 
unfoldare il testo premendo ad esempio "i" sul testo foldato. E' 
buona norma mettere dei commenti sul testo che vogliamo foldare 
(nel caso in cui il testo in questione non sia una funzione) in 
modo che una volta foldato sappiamo a cosa si riferisce.

Oppure possiamo aprire e chiudere un fold con:

```sh
 zo 
 # apre il fold
```
```sh
 zc 
 # richiude il fold
```
```sh
 zi 
 # abilita/disabilita il fold
```
### Navigare Codice Sorgente


```sh
 gd/gD 
 # Possiamo andare alla definizione di una 
 # variabile/funzione mentre ci siamo sopra col cursore
```
```sh
 <Ctrl+o> 
 # andiamo alla precedente posizione nel codice
```
```sh
 <Ctrl+i> 
 # ritorniamo alla successiva posizione nel codice
```
```sh
 * 
 # andiamo alla prossima occorrenza della stringa su cui è il 
 # cursore
```
### File di template in Vim


Possiamo creare una directory con tutta una serie di template per 
vari file sorgenti appartenenti a diversi linguaggi di 
programmazione, ad esempio ipotizziamo che nella directory 
~/templates/sources/ ci siano tutti i sorgenti e abbiamo uno 
scheletro per tutti i file python, ad esempio "
~/templates/sources/skeleton.py", a questo punto ci basterà 
inserire nel nostro file di configurazione la stringa:

```sh
 autocmd BufNewFile *.py 0r ~/templates/sources/skeleton.py
```
ora ogni volta che creeremo un nuovo file avremo già lo 
scheletro.

### Documentazione per sorgenti


nel file relativo alla configurazione del linguaggio in uso, ad 
esempio "~/.vim/after/ftplugin/python.vim" possiamo aggiungere:

```sh
 set keywordprg=:new\|setl\ buftype=nofile\ nobuflisted\|r\ !\ pydoc 
 # questo ci permetterà di aprire un nuovo buffer 
 # temporaneo in cui comparirà la documentazione
```
### Window, buffers e Tab Management


In generale il workflow di vim è gestito attraverso:

* buffers: ad un buffer corrisponde un file, 
* windows: Windows are not designed as file-proxies and can't be made into 
  ones: they are "containers" or "viewports" designed to offer you a view 
  into a buffer. No more, no less.
* tabs: ad una tab corrisponde un workspace intero

ora, il concetto di tab può essere fuorviante per chi è abituato 
con altri editor, in quanto in vim il tab è associato ad un vero 
e proprio intero workspace, mentre esiste la corrispondenza 1 
buffer = 1 file aperto, quindi il buffer è quello che negli altri 
IDE invece corrisponde al tab, le window possono mostrare quello 
che è all'interno di un buffer, quindi di un file, posso 
visualizzare più window nella stessa schermata, con lo stesso 
buffer on con buffer diversi. Un tab quindi in genere può gestire 
molti buffer e molte window.


### Comandi per gestire le Window

```sh
 Ctrl+w, n 
 # apre una nuova window in verticale
```
```sh
 Ctrl+w, s 
 # apre una nuova finastra in orizzontale, se abbiamo 
 # selezionato una funzione o un blocco di codice possiamo 
 # focalizzarci su quest'ultimo
```
```sh
 Ctrl+w, v 
 # apre una nuova finastra in verticale
```
```sh
 Ctrl+w, q 
 # chiude una finestra
```
```sh
 Ctrl+w, (arrows or hjkl) 
 # sposto il cursore su un'altra 
 # finestra
```
```sh
 Ctrl+w, (HJKL) 
 # sposto la finestra nella direzione indicata
```
```sh
 Ctrl+w, w 
 # cicla la selezione sulle window disponibili
```
```sh
 Ctrl+w, p 
 # seleziona l'ultima finestra a cui è stato fatto 
 # accesso
```
```sh
 Ctrl+w, o 
 # chiude tutte le altre finestre eccetto quella 
 # selezionata (funziona solo se non sono stati effettuate 
 # modifiche nelle altre finestre)
```
```sh
 Ctrl+w, _ 
 # massimizza in verticale la window corrente
```
```sh
 Ctrl+w, | 
 # massimizza in orizzontale la window corrente
```
```sh
 Ctrl+w, = 
 # ridimensiona le finestre dando loro lo stesso 
 # spazio
```
```sh
 Ctrl+w, f 
 # apre un file in una nuova tab
```
```sh
 Ctrl+w, gf 
 # apre il file sotto il cursore in una nuova 
 # finestra
```
```sh
 Ctrl+w, Ctrl+- 
 # riduce le dimensioni in altezza di una 
 # finestra, posso inserire prima del - un numero in modo da 
 # modificare più velocemente le dimensioni
```
```sh
 Ctrl+w, Ctrl++ 
 # aumenta le dimensioni in altezza di una 
 # finestra, posso inserire prima del + un numero in modo da 
 # modificare più velocemente le dimensioni
```
```sh
 Ctrl+w, Ctrl+< 
 # riduce le dimensioni in larghezza di una 
 # finestra, posso inserire prima del < un numero in modo da 
 # modificare più velocemente le dimensioni
```
```sh
 Ctrl+w, Ctrl+> 
 # aumenta le dimensioni in larghezza di una 
 # finestra, posso inserire prima del > un numero in modo da 
 # modificare più velocemente le dimensioni
```
```sh
 Ctrl+o, va alla precedente posizione nella jump list
```
```sh
 Ctrl+i, va alla successiva posizione nella jump list
```


### Comandi per gestire i Buffer

utilizzare ctrp.vim per avere una gestione più flessibile delle 
finestre, dei buffer eccetera e per lavorare con progetti con 
molti file.

Per elencare i buffer possiamo usare:

```sh
 :e nomeFile 
 # permette di aprire un file in un nuovo buffer
```
```sh
 :e <tab> 
 # mi permette di avere l'autocompletamento per i file 
 # nella directory corrente e aprire il file selezionato in un 
 # nuovo buffer
```
```sh
 :ls 
 # mostra i buffer correntemente aperti
```
```sh
 :b + Ctrl+d 
 # mostra i buffer a cui posso saltare
```
```sh
 :b numero_visto_da_ls 
 # salta al buffer selezionato
```
```sh
 :b <tab> 
 # possiamo scorrere i diversi buffer, molto comodo 
 # soprattutto se selezionata l'opzione "set wildmenu"
```
```sh
 :bd 
 # chiude il buffer corrente
```
```sh
 gf 
 # va al file, se il cursore evidenzia un file
```
E' da considerara che la maggior parte del tempo la spendiamo in 
buffer e windows, le tab sono usate molto poco perchè in genere 
corrispondono proprio a sessioni di lavoro diverse.

### Comandi per gestire le Tab


```sh
 :tabnew 
 # crea una nuova tab
```
```sh
 :tabclose 
 # chiude la tab corrente
```
```sh
 gt 
 # va alla prossima tab
```
```sh
 gT 
 # va alla tab precedente
```
### Auto Indentazione di Codice


Per autoindentare codice, possiamo fare nella normal mode:

```sh
 gg=G 
 # autoindenta il codice, e mette a posto la formattazione, 
 # in pratica il comando indenta è =, quindi con gg ci 
 # posizioniamo a inizio file, = indenta e con G gli diciamo di 
 # indentare fino a fine file
```
### Vim Plugins


Esistono molti plugin, e molti plugin manager (consigliatissimo 
se non obbligatorio usarli), ad esempio uno dei più famosi è "
pathogen" ma c'è anche "apt-vim" e molti altri, con pathogen per 
installare un plugin eseguiamo:

```sh
 # cd ~/.vim/bundle && git clone 
  https:#github.com/scrooloose/nerdtree.git 
 # in questo caso 
 # stiamo installando l'estensione nerdtree
```
la maggior parte dei plugin è su github quindi git è 
utilizzatissimo in questi casi, in pratica però quello che accade 
è la copia della directory "nerdtree" all'interno di "
.vim/bundle/", in questo modo avremo la directory "
.vim/bundle/nerdtree" e dentro questa tutti i file relativi, 
ovviamente per la maggior parte dei plugin saranno da aggiungere 
una o più righe al file di configurazione ".vimrc".

### Configurazione Vim per tipo di File


Potrebbe capitare che per file con estensione ".c" vogliamo che 
il tab sia di 8 caratteri mentre per file con estensione ".rb" il 
tab sia di "2" caratteri, per cambiare queste impostazioni per 
tipo di file ci basta creare una directory chiamata "
.vim/after/ftplugin" e poi creare dei file ".vim" per ciascuna 
estensione desiderata, ad esempio, andiamo a modificare la 
larghezza del tab per i file con estensione ".rb" (per il 
linguaggio ruby), possiamo fare così:

```sh
 # mkdir -p ~/.vim/after/ftplugin
```
```sh
 # touch ruby.vim
```
e ora in "c.vim" inseriamo ad esempio:

set ts=2

set sw=2

set et

possiamo capire come chiamare il file, capendo qual'è il tipo 
associato, ad esempio nel caso del bash, creare un file chiamato 
bash.vim non funzionerà per scoprire come chiamare il file, 
mettiamoci in un file bash ed eseguiamo il comando:

```sh
 :set ft? 
 # questo comando ci indicherà il tipo di file, nel 
 # caso di un file bash ci risponderà "sh"
```
a questo punto dal tipo di file possiamo creare il nostro file 
~/.vim/after/ftplugin/sh.vim con le impostazioni desiderate.

### Registri


In vim possiamo copiare ed incollare da vari registri... possiamo 
selezionare un registro con il doppio apice ", inoltre c'è un 
registro speciale chiamato "blackhole" indicato conl'underscore "\_",
ad esempio nel caso volessimo buttare via una riga senza 
copiarla, possiamo tagliarla e incollarla nel registro blackhole 
con: `"_dd`, mentre per salvare una riga nel registro b, possiamo 
usare `"bdd`.

### Make e Automatizzare Compilazioni


Possiamo impostare il comando "make" con:

```sh
 # :set makeprg=bash\ myscript.sh
```
oppure per evitare di usare escape possiamo usare:

```sh
 # :let &makeprg = "cd cmt && make"
```
oppure possiamo cambiare il comando make a differenza del tipo di 
file, ad esempio:

```sh
 # set makeprg=redcarpet\ %\ >/tmp/%<.html
```
where % means the file currently edited, and `%<` means the file 
currently edited without extension

### Streams and Redirects, Redirection


I canali standard (o standard streams), in tutti i moderni 
sistemi operativi, rappresentano i dispositivi logici di input e 
di output che collegano un programma con l'ambiente operativo in 
cui esso viene eseguito (tipicamente un terminale testuale) e che 
sono connessi automaticamente al suo avvio. Questi canali 
predefiniti sono disponibili nei sistemi operativi Unix e 
Unix-like, e in alcuni ambienti di programmazione.

I tre canali di input/output predefiniti sono detti standard 
input, standard output e standard error (talvolta abbreviati 
rispettivamente in stdin, stdout e stderr). In soldoni:

* Tutto quello che viene inserito come input da tastiera (Standatd Input o stdin)
* L'output del comando/programmo (Standard Output o stdout)
* Degli errori prodotti dal comanda/programma, come ad esempio
  "file not found" o "permission denied" (Standard Error o stderr)


Nei sistemi operativi GNU/Linux si utilizza: 

```sh
 # il simbolo ">" per redirigire lo stdout altrove in un altro 
 # file
```
```sh
 # il simbolo "<" per redirigere lo stdin attraverso un file, 
 # input redirection can be useful if you have written a program 
 # which expects input from the terminal and you want to provide 
 # it from a file
```
```sh
 # il simbolo "1>" per redirigire lo stdout altrove in un altro 
 # file
```
```sh
 # il simbolo "2>" per redirigere lo stderr in un altro file
```
```sh
 # il simbolo ">>" per redirigere lo stdout in modalità "append", 
 # dove per modalità append si intende l'aggiunta di testo senza 
 # sovrascrittura del testo già pre-esistente
```
```sh
 # il simbolo "<<" per utilizzare "heredoc" cioè dare in pasto 
 # stringhe fino ad un determinato delimitatore 
```
```sh
 # il simbolo "2>>" per redirigere lo stderr in modalità "append"
```
```sh
 # il simbolo "<<<" per utilizzare "herestring" cioè dare in pasto 
 # una stringa multilinea
```
Un caso d'uso di redirizione dello stderr è ad esempio quando 
vogliamo che non vengano stampati a schermo gli errori o i 
warning forniti da un programma, allora in questo caso si 
redirige lo stderr nel cosiddetto buco nero dell'informatica e 
cioè il file "/dev/null", viene chiamato così in quanto qualsiasi 
cosa ci finisce viene cancellata; quindi con:

```sh
 nomeComando 2> /dev/null
```
Nel caso volessimo invece redirigere sia lo stdout che lo stderr 
allora dovremmo utilizzare un comando come

```sh
 cat file1 file2 > myfilestdout 2> myfilestderr 
 # il simbolo "2>&1" indica un redirezionamento dello stderr allo 
 # stdout file
```

Ad esempio: 

```sh
 cat file file2 file3 > mystdout 2>&1 
 # mi fa l'append dello 
 # stderr al file dell'stdout, che in questo caso è mystdout
```

Un'altra possibile opzione è utilizzare `&>`
il simbolo "&>" che mi permette di redirigere 
contemporaneamente stderr e stdout nello stesso file
ad esempio:

```sh
 cmd &> output.txt
```
vediamo un esempio di redirection dell'input:

```sh
 myprogram < filename 
 # prende come input il contenuto del file specificato
```
E' anche possibile inserire i redirection prima del comando e ad 
esempio eseguire:

* `> fileOut myCommand arg1 arg2`
* `< fileName tr -d 'C'`

vediamo invece ora un esempio di heredoc, in pratica questa è una 
modalità che ci permette di inserire una stringa multilinea fino 
ad un delimitatore da noi specificato, This type of redirection 
instructs the shell to read input from the current source until a 
line containing only word (with no trailing blanks) is seen, all 
of the lines read up to that point are then used as the standard 
input for a command ad esempio:

```sh
 sql=$(cat <<EOF SELECT 
  foo, bar FROM db WHERE foo='baz'

EOF
)
```

or let's see how to pass this multiline to a file:

```sh
 cat <<EOF > print.sh
  #!/bin/bash echo \$PWD echo $PWD EOF
```

or we can pass this multiline to a series of command:

```sh
 cat <<EOF | grep 'b' | tee b.txt | grep 'r' 
  foo bar baz 
 EOF
```

vediamo altri esempi:

```sh
 tr a-z A-Z << END_TEXT
 one two three
 four five six
 END_TEXT
```

possiamo anche ad esempio fare in modo che la prima occorrenza 
della parola specificata interrompa l'input aggiungendo un "-" 
prima della parola, ad esempio:

```sh
 tr a-z A-Z <<- END_TEXT 
  one two three four five six END_TEXT
```

vediamo ora un esempio di "here string", in pratica possiamo 
specificare stringhe su più linee senza utilizzare una parola 
specifica come delimitatore:

```sh
 tr a-z A-Z <<< 'one 
  two 
 three'
```

in pratica vengono usati i singoli apici "'" come delimitatori a 
differenza delle "heredoc" in cui specificavamo una parola 
delimitante.

Vediamo un altro esempio in cui ad esempio inizializziamo 
contemporanemente più variabili:

```sh
 read a b c <<< 'one two three' 
```

ora possiamo provare con: 

```sh
 echo $a $b $c 
 # questo stamperà il valore delle tre variabili e 
 # possiamo notare che a='one', b='two' e c='three'
```


### Cat, wc, split, diff e shuf

Il comando cat può essere utilizzato per visualizzare piccoli 
file o concatenare più file. Alcuni esempi di applicazione 
possono essere: 

```sh
 cat filename 
 # visualizza il file filename
```
```sh
 cat filename1 filename2 
 # visualizza i due file concatenati
```
Il comando wc mi fornisce informazioni su un file di testo, come 
il numero di linee o di parole. Ad esempio: 

```sh
 wc -l nomefile 
 # mi fornisce il numero di righe da cui è 
 # composto il file 
```
Il comando split è utilizzato per spezzare un file in più file:

```sh
 split -l 2 nomefile 
 # questo comando per ogni due righe del 
 # file crea un nuovo file, se nomefile ha 8 righe, verranno 
 # creati 4 file
```
```sh
 split -l $[ $(wc -l filename|cut -d" " -f1) * 70 / 100 ] filename 
 # divide il file in base alle righe, in questo caso 
 # vengono prese solo il 70% delle righe, è da notare che non 
 # funziona per percentuali sotto il 50%, i file in output 
 # iniziano con "xx"
```
una versione più elaborata di split è "csplit" che viene 
utilizzato per effettuare split di file contenenti linee di 
contesto, ma possiamo utilizzarlo anche per dividere il numero di 
righe in percentuali al di sotto del 50%.

```sh
 csplit xonotic_commands $(( $(wc -l < xonotic_commands) * 2 / 10 + 1)) 
 # divide il file in base alle righe, in questo caso 
 # vengono prese solo il 70% delle righe, funziona ancheper 
 # percentuali sotto il 50%, nell'esempio viene preso il 20% del 
 # file e salvato in un file e il restante in un altro file, i 
 # file in output iniziano con xx
```
Il comando diff è utilizzato per vedere le differenze tra due o 
più file:

```sh
 diff fileA fileB 
 # evidenzia le differenze tra il fileA e il fileB
```
```sh
 diff -u fileA fileB 
 # visualizza le differenze nel formato 
 # unified, quello utilizzato da git e altri software di 
 # versioning
```
Il comando diff non puo' essere utilizzato per file binari,
per avere una funzionalita' analoga per file binari possiamo
utilizzare `xdelta3`.

The standard tools for patching source code are diff and patch. 
See also diffstat for summary statistics of a diff and sdiff for 
a side-by-side diff. Note diff -r works for entire directories. 
Use diff -r tree1 tree2 | diffstat for a summary of changes.
Use vimdiff to compare and edit files.

Il comando shuf è utilizzato per randomizzare le righe di un 
file, questo può essere utile quando lavoriamo con dati 
all'interno di file o csv e dobbiamo analizzarli:

```sh
 shuf nomeFile 
 # effettua permutazioni sulle righe del file
```


### Pipes

Permettono di usare l'output di un comando come input per un 
altro comando. Quello che viene preso è l'output inteso come 
contenuto del file relativo allo stdout. Ad esempio:

```sh
 ls /etc | sort -f 
 # questo comando prende il listato prodotto 
 # da ls e lo da in pasto a sort che lo ordina, il parametro -f 
 # indica di usare la modalità "case insensitive"
```


### Tee

Il comando "tee" permette di scrivere sia lo standard output 
sullo schermo che all'interno di un file.

Ad esempio:
```sh
 "ls | tee newfile" 
 # it will write the list of files into the file newfile 
```
Un altro esempio potrebbe essere

```sh
 ls | tee -a newfile 
 # attraverso il parametro -a, riusciamo a 
 # scrivere in append nel file senza sovrascriverlo del tutto.
```
La differenza sostanziale quindi tra un "tee" e un redirect sta 
nel fatto che "tee" riesce a stampare in due posti 
contemporaneamente standard output + file, mentre un semplice 
redirect scrive in un solo posto.


### Cut

Spesso accade di ritrovarsi a lavorare con file organizzati per 
righe o colonne, in questi casi può essere utile utilizzare il 
comando "cut" che ci permette di estrarre in modo utile le 
informazioni da questo tipo di file, esempi di utilizzo, sono:

```sh
 cut -f 3 data.txt 
 # stampa la terza colonna del file data.txt, 
 # in questo caso non viene specificato un delimitatore, di 
 # default viene considerato come delimitatore il "tab"
```
```sh
 cut -f 2-4 data.txt 
 # stampa i campi (colonne) dalla 2 alla 4
```
```sh
 cut -f 1,3 data.txt 
 # stampa i campi (colonne) 1 e 3
```
```sh
 cut -f1 -d: /etc/passwd 
 # in questo caso prendiamo solo i primi 
 # campi (prima colonna) del file /etc/passwd, usando come 
 # delimitatore il carattere ":"
```
```sh
 cut -f 1,3 -d ':' --output-delimiter=$'\t' /etc/passwd 
 # in 
 # questo caso vengono stampati i campi 1 e 3, viene usato come 
 # delimitatore ":", ma nella stampa il carattere ":" viene 
 # sostituito con un "tab"
```
```sh
 cut -c1-3 test.txt 
 # stampa i caratteri dal primo al terzo
```
```sh
 cut -c2- text.txt 
 # stampa solo i caratteri dal secondo in poi, 
 # elimino quindi il primo carattere
```


### Regular Expressions (o RegEx)

In theoretical computer science and formal language theory, a 
regular expression (sometimes called a rational expression)[1][2] 
is a sequence of characters that define a search pattern, mainly 
for use in pattern matching with strings, or string matching, 
i.e. "find and replace"-like operations. The concept arose in the 
1950s, when the American mathematician Stephen Kleene formalized 
the description of a regular language, and came into common use 
with the Unix text processing utilities ed, an editor, and grep, 
a filter.

Useremo spesso regular expressions, con "grep", "sed", "awk" ed 
altri programmi, attenzione a non confondere le regular 
expression con le expansion expressions (dette anche globs o 
shell globbing) utilizzata per indicare più file con la shell.

Leggere le regular expression come "cercami il testo che matcha 
questo pattern". Vediamo alcuni costrutti di base per poi 
arrivare ad esempi auto esplicativi.

Innanzitutto e' importante distinguere tra due tipologie principali
di sintassi utilizzate da programmi `*NIX` come sed, grep, awk, perl eccetera:
* POSIX Basic Regular Expression (BRE)
* POSIX Extended Regular Expression (ERE)
* Emacs/Elisp Regular Expressions (EMACS)
* Vim Regular Expressions (VIM)
* Perl Compatible Regular Expression (PCRE)
* Perl 6 Regular Expression (PSIX)


La sintassi PCRE e' simile ad ERE ma ha delle feature aggiuntive
come lookaround, lookaheads e qualche shortcut, ad esempio
l'utilizzo di `\w` per indicare una parola eccetera.

Quello che cambia nella sintassi e' che nelle regex
basic i seguenti caratteri:
* `{}`
* `()`
* `+`
* `|`
* `?`

devono essere escapati (e.g., \(something\)) per poter assumere la
loro funzionalita' come da regex.
Mentre nella versione extended se si escapano assumono solo un significato
di semplice carattere. Quindi in un programma che utilizza le regex 
nella versione 'extended' la sequenza `\(` assume il significato
del semplice carattere `(`.

Questo e' molto importante, in quanto quando usiamo uno strumento e'
utile capire quale sintassi per regex utilizza. In base a quella
di conseguenza costruire le nostre regex.

Per fare qualche esempio:
* grep, di default usa la sintassi *basic*, a meno che non venga specializzato il flag `-E`
* egrep, usa la sintassi *extended*
* vim, usa la sintassi *vim* che assomiglia alla *basic*, di default ma 
  usando \v in una ricerca o sostituzione passa alla versione extended, 
  in realta' e' un po' piu' complicato di cosi' in quanto vim ha 4 modalita',
  consultare :help magic per dettagli, a volte si parla di vim regex come 
  formato per indicare lo le opzioni di default utilizzate da vim
* sed, di default usa la sintassi *basic*, ma specificando `-r` o `-E` utilizza la versione *extended*
* awk, di default usa una sintassi che e' un superset della versione *extended*
* bash, di default usa la versione *extended*
* perl, utilizza simile a quella *extended* ma con feature aggiuntive chiamata *pcre*
* python, ruby, .NET, powershell e molti altri, utilizzano *pcre*


### Anchors

Queste sono le anchors:

```sh
 ^ 
 # indica l'inizio di una linea o di una stringa
```
```sh
 $ 
 # indica la fine di una stringa o di una linea
```

### Quantifiers


```sh
 * 
 # 0 or more 
```
```sh
 {3} 
 # Exactly 3 
```
```sh
 + 
 # 1 or more 
```
```sh
 {3,} 
 # 3 or more 
```
```sh
 ? 
 # 0 or 1 
```
```sh
 {3,5} 
 # 3, 4 or 5 (so at least 3 and at maximum 5)
```
### Character Classes


Character Classes sono classi di caratteri, come:

```sh
 # \c Control character 
```
```sh
 \s White space 
 # questo comprende spazi, tab, eccetera
```
```sh
 # \S Not white space 
```
```sh
 \t 
 # tab, questo è compreso anche in "\s"
```
```sh
 \r 
 # carriage return
```
```sh
 \n 
 # line feed
```
```sh
 \b 
 # inizio o fine di una parola
```
```sh
 \< 
 # inizio di una parola
```
```sh
 \> 
 # fine di una parola
```
```sh
 # \d Digit 
```
```sh
 # \D Not digit 
```
```sh
 # \w Word 
```
```sh
 # \W Not word 
```
```sh
 # \x Hexade­cimal digit 
```
```sh
 # \O Octal digit
```
### Range


Possiamo anche specificare range, ad esempio:

```sh
 [A-Za-z] 
 # include tutti i caratteri maiuscoli e minuscoli
```
```sh
 [0-9] 
 # include tutte le cifre
```
```sh
 (foo|bar) 
 # foo OR bar, nota che per sed e vim l'OR si effettua 
 # attraverso "\|"
```
```sh
 . 
 # un carattere qualsiasi
```
```sh
 a.c 
 # a+un carattere qualsiasi+c
```
```sh
 a..c 
 # a+due caratteri qualsiasi+c
```
```sh
 .* 
 # qualsiasi cosa
```

```sh
 l.*k 
 #qualsiasi cosa fino all'ultima "k" della stringa
```

```sh
 l.*?k 
 # qualsiasi cosa fino alla successiva"k" , si chiama 
 # notazione lazy
```

```sh
 [^abc] 
 # un qualsiasi carattere che non appartenga all'insieme 
 # indicato, questa è una negazione
```
```sh
 [-_A-Zp] 
 # include i caratteri "-", "_", da A a Z e il 
 # carattere "p"
```
```sh
 [349] 
 # include i caratteri "3", "4" e "9"
```
```sh
 [Ss] 
 # il carattere "S" e il carattere "s"
```
Attenzione le parentesi quadre possono avere significato opposto 
se la parentesi di apertura è seguita dal carattere "^", ad 
esempio:

```sh
 [^abc] 
 # NOT (a OR b OR c), quindi non a o non b o non c, 
 # indichiamo un carattere che non deve essere uno di questi tre 
 # menzionati
```
```sh
 [^a-z] 
 # indichiamo che il carattere non deve appartenere 
 # all'insieme dei caratteri minuscoli
```
N.B.: Se come carattere vogliamo indicare proprio uno di quelli 
utilizzati nelle regular expressions, allora devo usare l'escape 
character "\", facciamo un esempio, nel caso volessi effettuare 
il match della stringa "192.168.1.1", allora la mia regular 
expression sarebbe "192\.168\.1\.1", oppure se volessimo 
effettuare il match di tutte le stringhe comprese tra parentesi 
quadre allora dovremo scrivere `\[.*\]`.


### Stringhe POSIX

```sh
 # [:upper:] Upper case letters 
```
```sh
 # [:lower:] Lower case letters 
```
```sh
 # [:alpha:] All letters 
```
```sh
 # [:alnum:] Digits and letters 
```
```sh
 # [:digit:] Digits 
```
```sh
 # [:xdigit:] Hexadecimal digits 
```
```sh
 # [:punct:] Punctu­ation 
```
```sh
 # [:blank:] Space and tab 
```
```sh
 # [:space:] Blank characters 
```
```sh
 # [:cntrl:] Control characters 
```
```sh
 # [:graph:] Printed characters 
```
```sh
 # [:print:] Printed characters and spaces 
```
```sh
 # [:word:] Digits, letters and underscore
```


### Raggruppamenti

Possiamo effettuare raggruppamenti per poter trattare insiemi di 
caratteri come se fosse uno solo, attraverso le parentesi tonde, 
vediamo alcuni esempi:

```sh
 a [(caso)(random)] 
 # seleziona la stringa "a caso" o la stringa 
 # "a random"
```
```sh
 (John|Harold) Smith 
 # analogo al precedente comando, seleziona 
 # la stringa "John Smith" oppure "Harold Smith"
```
```sh
 John (Reginald)?Smith 
 # seleziona la stringa "John Reginald 
 # Smith" o la stringa "John Smith"
```
possiamo riferirci agli elementi raggruppati con la sequenza "
carattere di escape + numero", facciamo degli esempi:

```sh
 (\b\d\d\d\d\b).*\1 
 # in questo caso selezioniamo le stringhe 
 # che contengono un numero a quattro cifre che si ripete almeno 
 # due volte 
```
```sh
 (John) (Smith).*\2 \1 
 # in questo caso selezioniamo le stringhe 
 # che contengono la stringa "John Smith" e poi "Smith John"
```


### Lookaheads

With a lookahead we want to look ahead (hence the name) in our 
string and see if it matches the given pattern, but then 
disregard it and move on. The concept is best illustrated with an 
example.

Let's say we wish to identify numbers greater than 4000 but less 
than 5000. This is a problem which seems simple but is in fact a 
little trickier than you suspect. A common first attempt is to 
try the following:

```sh
 \b4\d\d\d\b 
 # this will match all the numbers between 4000 and 
 # 4999, but we don't want to include the number 4000
```
this can be easily managed with lookaheads which impose "if" 
conditions, for example:

```sh
 \b4(?!000)\d\d\d\b 
 # in this way we are telling with our regex 
 # that if after the 4 there is "000" then we don't have to match 
 # the string, in plain english we could say: "We are looking for 
 # a '4' which is not followed by 3 '0's but is followed by 3 
 # digits".
```
This is a negative lookahead, since we are not considering the 
expression who match the condition, anyway there are even the so 
called "positive lookaheads", which will mean "match this 
expression, only if this condition is satisfied", for a positive 
lookahead, the syntax is "(?=charactersToMatch)" instead of "
(?=charactersToNotMatch)", all we need is to replace the 
character "!" with the character "=", anche se i lookahead 
positivi sono meno usati.


### Lookbehinds

Possiamo anche cercare a ritroso attraverso i lookbehinds, anche 
in questo caso esistono sia lookbehind positive che negative e si 
indicano con la sintassi:

```sh
 # (?<=x) per lookbehind positive
```
```sh
 # (?<!x) per lookbehind negative
```
Let's say we would like to find instances of the name 'Smith' but 
only if they are a surname. To achieve this we have said that we 
want to look at the word before it and if that word begins with a 
capital letter we'll assume it is a surname (the more astute of 
you will have already seen the flaw in this, ie what if Smith is 
the second word in a sentence, but we'll ignore that for now.)

```sh
 (?<=[A-Z]\w* )Smith 
 # Now we won't identify Smith Francis but 
 # we will identify Harold Smith. 
```


### Esempi per capire

```sh
 ^\s 
 # tutte le righe che cominciano con una spaziatura o con un 
 # tab
```
```sh
 ^\s+#|^# 
 # tutte le righe che cominciano con uno o più 
  spazi/tablature e poi il carattere "
 # " oppure le stringhe che 
  cominciano con il carattere "
 # ", questo è utile per isolare un 
 # commento ad esempio nei bash script, attenzione la stesura di "
  ^\s#|^
 # " non avrebbe tenuto conto di commenti posizionati dopo 
 # più di uno spazio/tablatura
```
```sh
 <[^>].*> 
 # seleziono tutte le stringhe come "<qualsiasicosa>" 
 # ma senza ad esempio stringhe come "<>"
```
```sh
 [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3} 
 # in questo caso 
 # riusciamo a selezionare gli indirizzi IP
```
```sh
 \b(\d{1,3}\.){3}\d{1,3}\b 
 # modo più furbo per selezionare gli 
 # indirizzi IP
```
```sh
 ^b[alu]t$ 
 # selezioniamo le righe che contengono solo una 
 # stringa che inizia per "b", finisce per "t" e contiene solo un 
 # carattere nel mezzo che può essere o "a" o "l" o "u"
```

### Regexes: Note Aggiuntive

Ricorda che scrivere regex significa scrivere programmi, infatti 
i motori di regex sono delle macchine basate su stack (stack-based machine)
in cui ogni carattere corrisponde ad un comando `/a/` o sequenze
di comandi `/abc/`.
Nelle regex abbiamo la possibilita' di creare dei cicli, ad esempio
ogni qualvolta utilizziamo il meta-carattere `*` (e altri meta-caratteri)
Ricorda di usare il meno possibile la combinazione `.*`.
Per avere regex piu' veloci possiamo:

* **Regexes are Code**
* Quando abbiamo alternative, utilizzare prima quelle piu' probabili
* Dove possibile, utilizzare **extended froamtting**, questo formato prevede 
  che lo spazio non sia un comando, e rende le regex leggibili, debuggabli, 
  comprensibili e manutenibili. Ove possibile utilizzare sempre questo formato.
  In perl ad esempio per poter utilizzare questa modallita' basta mettere in
  append alla regex la lettera 'x', quindi `/regex/x`, in altri linguaggi
  bisogna mettere all'inizio della regex la sequenza `(?x)`.
  Alcuni dialetti/linguaggi non supportano questa opzione di extended
  formatting, ad esempio Javascript, in questi linguaggi comunque si puo'
  truccare il gioco, ad esempio costruendo le regex come concatenazioni di
  stringhe. Vediamo un esempio in Javascript:
```javascript
var numberRegex = new RegExp(
    "("             +
         "[+-]"     + //Optional sign
    ")?"            +

    "("             +
         "\\d+"     + 
         "\\.?"     + //Mantissa with leading digit
         "\\d*"     +
    "|"             + //or
         "\\."      + 
         "\\d+"     + //Mantissa with leading dot
    ")"             +
    // rest of regex...
);
```
  Anche se generalmente nei vari linguaggi troveremo librerie o moduli che ci
  permettono di inserire regex in modo pulito, ad esempio in Javascript possiamo
  utilizzare il modulo XRegExp.
* Utilizzare il meno possibile la combinazione `.*` dot-star
  in genere qui e' dove si nascondono problemi di performance,
  in genere inoltre se proprio abbiamo la necessita' di utilizarlo, faciamolo
  nella versione non-greedy `.*?`
* Preferire sempre i quantificatori non-greedy, questo per via del principio
  "Don't iterate any more than is absolutely necessary"
* Quando progettiamo regex, dobbiamo pensare in modo imperativo, come se
  stessimo progettando un algoritmo, quindi prima matcha X poi Y poi Z
  eccetera, contrariamente al pensiero 'la mia regex deve essere piu' o meno
  cosi'
* Tenere in considerazione **Separation** e **Naming** per dare struttura e
  manutenibilita' alle nostre regex, quindi spezzare le grosse regex in
  regex piu' piccole, come se stessimo facendo un programma, perche' in
  realta' e' quello che stiamo facendo.
* Alcuni dialetti di regex supportano subroutines, quindi possiamo utilizzare
  le regex recursive. In PCRE possiamo chiamare una subroutine attraverso
  `(?&SUBROUTINENAME)`, in pratica quindi definiamo dei pattern con nome e li
  richiamiamo. Nei dialetti in cui sono supportate le subroutine possiamo
  scrivere regex ricorsive quindi ad esempio definire il concetto di lista o
  per effettuare match in file/dataset molto incasinati. Vediamo un esempio di
  ricorsivita' in PCRE:
```perl
/(?x) (?&LIST)
    
    (?(DEFINE)
        (?<LIST> < (?&ITEM) (?: , (?&ITEM))*+ > )

        (?<ITEM>  \d++ | (?&LIST) )
    )
/
```
    Che e' l'equivalente del seguente pseudocodice:
```perl
func LIST {
    match("<");
    ITEM();
    loop { match(","); ITEM(); }
    match(">");
}

func ITEM {
    loop { match({"0".."9"}); }
    or
    LIST();
}

func main {
    LIST();
}
```
  Questo permette di matchare elemente in testi come questo:
```text
<1,24,<7,<10,11>,9>,121,23,42>
```



### Grep, Egrep ed Fgrep

Grep è un programma utilizzato generalmente per ricercare testo o 
pattern specifici, per utilizzare le regular expressions, 
dobbiamo ricordare di utilizzare il flag "-P" e per evitare 
conflitti è buona norma sempre utilizzare apici singoli come 
argomento stringa di grep. Alcuni esempi di utilizzo di grep 
possono essere:

```sh
 grep stringaDaCercare nomeFile 
 # per cercare la stringa 
 # stringaDaCercare all'interno del file nomeFile
```
```sh
 grep -i stringaDaCercare nomeFile 
 # in questo caso, ignoro il 
 # fatto che stringaDaCercare sia maiuscola o minuscola, effettuo 
 # una ricerca case-insensitive
```
```sh
 grep -A4 stringaDaCercare nomeFile 
 # cerca stringaDaCercare in 
 # nomeFile e stampa la riga contenente la stringa più le 4 righe 
 # successive (il flag "-A" sta per "after")
```
```sh
 grep -B4 stringaDaCercare nomeFile 
 # cerca stringaDaCercare in 
 # nomeFile e stampa la riga contenente la stringa più le 4 righe 
 # precedenti (il flag "-B" sta per "before")
```
```sh
 grep -w 'M' 
 # in questo caso viene cercata proprio una parola 
 # isolata M, 'w' sta per "word", ad esempio nel caso dovessimo 
 # cercare la cartella 'M' e non avere in output tutte le cartelle 
 # che contengono la parola M possiamo usare "ls -l | grep M"
```
```sh
 grep -c hello nomeFile 
 # mi dice quante volte la parola "hello" 
 # è contenuta nel file nomeFile
```
```sh
 grep [bde] nomeFile 
 # evidenzia tutti i caratteri b, d ed e 
 # all'interno del file nomeFile
```
```sh
 grep -P '\b4(?!000)[[:digit:]]{3}\b' nomeFile 
 # cerca tutte le 
 # stringhe che contengono numeri compresi tra 4000 e 5000 
 # (estremi esclusi)
```
```sh
 grep --color=auto keyword nomeFile 
 # in questo modo la stringa 
 # cercata verrà evidenziata con un colore diverso (molto utile!)
```
E' possibile anche utilizzare regular expressions complesse 
utilizzando il flag "-P" per feature più avanzate (tipo 
lookaheads e lookbehinds) come: 

```sh
 # '^word' che significa, le linee che iniziano con la parola "
 # word"
```
```sh
 # 'word$' che significa, le linee che finiscono per "word"
```
```sh
 grep [a-g] testf 
 # in questo esempio, vengono evidenziati tutti 
 # i caratteri compresi tra la "a" e la "g" nel file testf
```
```sh
 grep ^[a-g] testf 
 # in questo esempio, vengono evidenziate le 
 # parole che finiscono per uno dei caratteri compresi tra la "a" 
 # la "g" all'interno del file testf
```
```sh
 grep -f grepinput testf 
 # prende come input pattern, il 
 # contenuto del file1 per ricercare all'interno di file2
```
```sh
 grep -r 'modules' . 
 # a partire dalla corrente directory 
 # scandisce ogni file con all'interno la parola "modules"
```
```sh
 grep -v 'permission denied' 
 # mostra tutte le stringhe che non 
 # contengono la stringa indicata, quindi il flag "-v" è il flag 
 # di negazione, utile per cercare stringhe che non contengono 
 # quella voce
```
```sh
 grep -n 'word' 
 # esegue un normale grep, ma indica il numero di 
 # linea a cui è stata trovata la parola cercata
```
```sh
 grep -nir 'word' . 
 # a partire dalla corrente directory 
 # scandisce ogni file con all'interno la parola "word" non è case 
 # sensitive ed indica il numero di linea a cui è stata trovata la 
 # parola menzionata
```
```sh
 grep -lr cron /etc 
 # elenca tutti i file che contengono la 
 # parola "cron" all'interno del loro nome all'interno della 
 # directory "/etc", il flag "l" sta per list o elenca, mentre il 
 # flag "r" permette di effettuare l'operazione ricorsivamente in 
 # tutte le sottodirectory di /etc.
```
```sh
 grep -F -x -v -f fileB fileA 
 # mostra tutte le righe di A senza 
 # le righe nel file B; this works by using each line in fileB as 
 # a pattern (-f fileB) and treating it as a plain string to match 
 # (not a regular regex) (-F). You force the match to happen on 
 # the whole line (-x) and print out only the lines that don't 
 # match (-v). Therefore you are printing out the lines in fileA 
 # that don't contain the same data as any line in fileB. 
 # Un'alternativa a questo è "comm <(sort a) <(sort b) -3" che 
 # stampa le righe di differenza tra i due file "a" e "b".
```
```sh
 grep -aob "y" file.txt 
 # mostra tutte le posizioni in cui 
 # compare la lettera "y" nel file chiamato file.txt
```
N.B.: Quando si vogliono usare regex complesse, oltre ad usare il 
flag "-P" (che comunque provoca conflitti se usato con egrep) 
dobbiamo mettere la stringa tra singoli apici e non tra doppi 
apici, per sicurezza possiamo comunque mettere sempre le stringhe 
di grep tra singoli apici nel dubbio.

We can use it to include/exclude the list of pictures from a 
website with "grep ^=".

Ci sono due varianti del comando grep:

```sh
 egrep 
 # equivalente ad eseguire un "grep -E"
```
```sh
 fgrep 
 # equivalente ad eseguire un "grep -F"
```
Egrep è utilizzato per includere forme complesse di regular 
expressions (chiamate extended regular expressions). Vediamo 
alcuni esempi:

```sh
 egrep -i 'hello.*world' testf 
 # mostra tutte le linee che 
 # contengono sia la parola hello che la parola world (come 
 # un'operazione AND logica) all'interno del file testf, il flag "
 # -i" indica la modalità case-insensitive
```
```sh
 egrep -i 'hello|world' testf 
 # mostra tutte le linee che 
 # contengono o la parola hello o la parola world (come 
 # un'operazione OR logica) all'interno del file testf, il flag "
 # -i" anche in questo caso indica la modalità case-insensitive
```
```sh
 egrep -v 'hello|world' testfile 
 # mostra tutte le linee che non 
 # contengono la parola hello o la parola world, quindi il flag "
 # -v" effettua l'operazione negata rispetto a quella che verrebbe 
 # effettuata di default
```
Fgrep è una forma di grep utile a cercare stringhe senza tener 
conto delle regular expression, quindi viene cercata la stringa 
così come scritta senza interpretare caratteri come `.`, `|`, `$`
, `*`, eccetera come caratteri speciali, vediamo qualche esempio:

```sh
 fgrep *hello$ testf 
 # cerca esattamente la parola "*hello$" 
 # senza intenderla come "regular expression", quindi i simboli 
 # speciali non verranno intesi come caratteri jolly, comunque 
 # tutto è fattibile da grep in quanto possiamo usare gli escape 
 # characters, quindi la stessa cosa con grep sarebbe stata "grep 
 # '\*hello\$' testf"
```
### Sed

Sed è una utility sui sistemi GNU/Linux utilizzata per effettuare 
elaborazioni su file di testo, questa utility fa uso di un 
linguaggio di programmazione compatto per effettuare le proprie 
operazioni, riceve un testo come input, o dallo stdin o da un 
file, esegue alcune operazioni sulle righe specificate, una alla 
volta, quindi invia il risultato allo stdout o in un file. Negli 
script di shell, sed è, di solito, una delle molte componenti di 
una pipe. Solitamente viene invocato per modificare flussi di 
testo o elaborarli in genere con una o due righe, a differenza di 
Awk che rappresenta un linguaggio più complesso con cui vengono 
scritti veri e propri script. Sed determina le righe dell'input, 
su cui deve operare, tramite un indirizzo che gli è stato 
passato. Questo indirizzo può essere rappresentato sia da un 
numero di riga sia da una verifica d'occorrenza. Ad esempio, 3d 
indica a sed di cancellare la terza riga dell'input, mentre 
/windows/d segnala a sed che si vogliono cancellare tutte le 
righe dell'input contenenti l'occorrenza "windows". Di tutte le 
operazioni a disposizione di sed, vengono focalizzate, in primo 
luogo, le tre più comunemente usate. Esse sono:

* `p`, print (visualizza allo stdout), 
* `d`, delete (cancella)
* `s`, substitute (sostituisce)
* `=`, print number line (stampa il numero di riga)
* `y`, translate (opera in modo simile a `tr` effettua sostituzione di caratteri)
* `N`, go to next line (va alla riga successiva, molto utile negli script) 

Esempi di utilizzo, possono essere:

```sh
 sed -e '1d' /etc/services | less 
 # elimina la prima riga, il "-e" indica di eseguire un comando, 
 # anche se nel caso abbiamo intenzione di usare un solo comando 
 # anche possiamo ometterlo
```
```sh
 sed -e '1,10d' /etc/services | less 
 # elimina le righe dalla 1 
 # alla 10 nel file menzionato
```
```sh
 sed -e '1,10p' nomeFile | less 
 # in questo caso vengono 
 # stampate le righe dalla 1 alla 10, quindi dall'inizio del file
 # fino alla decima riga, le righe ogni volta che vengono
 # incontrate vengono ristampate
```
```sh
 sed -n -e '1,10p' nomeFile | less 
 # in questo caso vengono 
 # stampate tutte le righe dalla 1 alla 10, 
 # usiamo il flag "-n" indica di non ristampare le righe per evitare
 # ridondanze, e' l'equivalente di --quiet
```
```sh
 sed -n "3p" nomeFile 
 # stampa solo la terza riga del file
```
```sh
 sed -n -e '/BEGIN/,/END/p' /my/test/file | less 
 # stampa il 
 # file dalla riga che contiene "BEGIN" fino alla riga che 
 # contiene "END"
```
```sh
 sed -n -e '/main\s*(/,/^}/p' nomeFile 
 # stampa la funzione main 
 # di un file
```
```sh
 sed 's/male/malissimo/' mioFile 
 # stampa a schermo (cioè 
 # standard output) il file "mioFile" con la parola malissimo al 
 # posto della parola male (viene effettuata una sola sostituzione 
 # per riga), nota che le sostituzioni non vanno a sovrascrivere 
 # il file, e non viene salvato nemmeno un nuovo file con la 
 # parola sostituita, per farlo dovremmo usare invece i redirect
```
```sh
 sed 's/male/malissimo/g' mioFile 
 # stampa a schermo (cioè standard output) il file 
 # "mioFile" con la parola malissimo al 
 # posto della parola male vengono effettuate tutte le 
 # sostituzioni possibili nota che le sostituzioni non vanno a 
 # sovrascrivere il file, e non viene salvato nemmeno un nuovo 
 # file con la parola sostituita, per farlo dovremmo usare invece 
 # i redirect
```
```sh
 sed -e 's:/usr/local:/usr:g' mylist.txt 
 # avviene una 
 # sostituzione,ma questa volta come delimitatori usiamo il 
 # carattere ":", in quanto lo slash "/" è utilizzato nelle 
 # stringhe interessate nella sostituzione
```
```sh
 sed 's/male/malissimo/' mioFile > mioFileNuovo 
 # effettua la 
 # stessa operazione precedente ma salva quello che viene stampato 
 # sullo standard output in nuovo file chiamato "mioFileNuovo"
```
```sh
 sed 's/partitime/fulltime/w promotions.txt' team 
 # sostituisce 
 # la parola "parttime" con la parola "fulltime" (ma solo 
 # un'occorrenza per linea) e sovrascrive i cambiamenti attraverso 
 # il flag "-w" nel file "promotions.txt", mentre l'operazione 
 # viene fatta prednendo come riferimento il file "team". Ricorda 
 # di redirigere l'output al buco nero /dev/null se non si vuole 
 # vedere nulla sullo standard output
```
```sh
 sed -e 's/\(.*\) \(.*\) \(.*\)/Victor \1 \2 Von \3/' myfile.txt 
 # in questo caso definiamo delle regioni di interesse 
 # all'interno del file attraverso delle parentesi backslashate e 
 # ci riferiamo a queste regioni con dei numeri backslashati
```
```sh
 sed -e 's/.*/ralph said: &/' origmsg.txt 
 # in questo caso 
 # aggiungiamo all'inizio di ogni riga la stringa "ralph said: "
```
```sh
 sed -e '1,10s/enchantment/entrapment/g' myfile.txt 
 # effettua la sostituzione solo tra la riga 1 e la riga 10
```
```sh
 sed -e 's/ /\n/g' myfile.txt 
 # sostituisce tutte le occorrenze di spazi con nuove linee
```
```sh
 sed -e "s/'//g" myfile.txt 
 # rimuove tutti gli apici singoli 
```
```sh
 sed -e 's/'\''//g' myfile.txt 
 # rimuove tutti gli apici singoli
```
```sh
 sed -n '5p' nomeFile 
 # stampa la riga 5 del file menzionato
```
```sh
 sed -n '10,20p' nomeFile 
 # stampa a schermo tutte le linee tra 
 # la 10 e la 20 del file menzionato
```
```sh
 sed -n '10,$p' nomeFile 
 # stampa a schermo tutte le linee dalla 
 # 10 in poi del file menzionato
```
```sh
 sed -i 8d nomeFile 
 # elimina la riga 8 del file menzionato
```
```sh
 sed '0,/parttime/s/parttime/promotion/' team 
 # sostituisce la 
 # zero-esima occorrenza della parola "parttime" con la parola "promotion" 
 # and this means substitute "the zero-th occurrence of 
 # the word parttime with promotion in the file team.
```

```sh
 sed '/0x[0-9a-zA-Z]*/ y/abcdef/ABCDEF' file
 # sostituisce ogni occorrenza di un numero esadecimale
 # scritto in minuscolo con un numero esadecimale
 # scritto in maiuscolo
```

```sh
 sed -n '/PATTERN/ =' file
 # stampa il numero di riga attraverso il comando '='
 # quando viene matchato il pattern menzionato
```



Per elaborazioni più complesse valgono anche le regular 
expressions, ad esempio per rimuovere testo "html", possiamo 
effettuare un:

```sh
 "sed 's/<[^>]*>#' team" 
 # rimuove tutte le parole che iniziano 
 # per il carattere "<" e che non sono seguite dal carattere ">" e 
 # che hanno qualsiasi stringa seguita dal carattere ">". Ricorda 
 # che l'espressione regolare [^a] significa "non le linee che 
 # continuano col carattere 'a'"
```
Ad ogni modo una sostituzione globale di tutte le occorrenze di 
una parola con un'altra è possibile ad esempio attraverso:

```sh
 sed 's/wordtochange/wantedword/g' myfile.txt > newfile.txt 
 # sostituisce tutte le occorrenze della parola wordtochange con 
 # la parola wantedword, questo avviene grazie all'utilizzo del 
 # flag "-g" che sta per "globally" (o globalmente), nel caso 
 # questo flag non fosse presente allora avverrebbe un'unica 
 # sostituzione per riga
```
Possiamo usare file esterni in cui mettiamo i nostri comandi, nel 
caso dovessimo eseguire più comandi sed, e poi richiamarli da 
un'istruzione tipo:

```sh
 sed -n -f mycommands.sed myfile.txt 
 # esegue lo script sed, 
 # definito dalla serie di comandi in mycommands.sed sul file 
 # menzionato "myfile.txt"
```

Esistono anche negazioni dei comandi p, d, attraverso la notazione
!p e !d.
Ad esempio:

```sh
 sed -n '1,10 p' file
 # prints from line 1 to 10
 sed -n '11,$ !p' file
 # does not print from line 11 to end of file
 sed '1,10 !d'  file 
 # does not delete from line 1 to line 10
 sed '11,$ d' file
 # deletes from line 11 to end of file
```

Un altro comando e' `q` che sta per quit, e puo' essere utilizzato
in modo simile a head, come:
```sh
 sed -ne '11 q' file
 # prints the first 10 lines, since it quits on 11
```

possiamo usare sed anche per rinominare tutti i file con spazi 
mettendo degli underscore, ad esempio con:

```sh
 ls | while read file; do echo "$file"|sed -e '$/\ /_/g' ; done 
 # sostituisce nei nomi dei file gli spazi con degli underscore
```


### Sed Scripts

Vediamo ora esempi di script sed, questi ci permettono una 
flessibilità maggiore, vediamo ad esempio come effettuare 
sostituzioni multiple:

```sed
1,20{         
	s/[Ll]inux/GNU\/Linux/g         
	s/samba/Samba/g         
	s/posix/POSIX/g 
}
```

in questo caso verranno effettuate tutte le sostituzioni indicate 
tra la riga 1 alla riga 20, ovviamente al posto dei numeri 
possiamo inserire anche delle regular expressions.

Vediamo un altro esempio:

```sed
1,/^END/{         
	s/[Ll]inux/GNU\/Linux/g          
	s/samba/Samba/g          
	s/posix/POSIX/g         
	p 
}
```

in questo caso verranno effettuate tutte le sostituzioni tra la 
riga 1 e la riga che inizia per "END" oppure se questa non si 
trova, le modifiche vanno fino a fine file, notare il comando p 
alla fine che stampa le righe.

Vediamo un altro esempio che stampa tutto il contenuto di un file
tra BEGIN ed END, senza stampare le stringhe BEGIN ed END:

```sh
 sed -ne '/BEGIN/,/END/{/BEGIN/ b; /END/ b; p}' file.txt 
 # prende il testo tra BEGIN ed END,
 # poi inizia uno script in oneline, utilizzando i punti e virgola
 # comme terminatori di istruzione
 # poi salta la linea con BEGIN e quella con END e poi stampa
 # tutte le altre righe
```


```sed
/skip3/ {
           N
           N
           s/skip3\n.*\n.*/# 3 lines deleted/
}
# se viene matchata la stringa 'skip3'
# vengono saltate due linee e viene effettuata la sostituzione
```

```sed
/ONE/ {
    N
    /TWO/{
    i\
    inserted a text
    }
}
# in questo case se viene matchata la stringa 'ONE' su una riga
# e la lina successiva e' TWO, allora viene inserito del testo
# prima del blocco di linee ONE TWO con scritto 'inserted a text'
# ovviamente possiamo inserire testo in append con a\
```


### Append, Insert and Change in Sed

Ora che scriviamo script possiamo utilizzare ulteriori features 
di sed. Possiamo aggiungere una riga prima di ogni altra riga del 
file (o quelle specificate dall'address)attraverso:
```sed
i\ 
This line will be inserted before each line
```

Possiamo oppure mettere in append determinate stringhe con:
```sed
a\ 
insert this line after each line.  Thanks! :)
```

Oppure possiamo cambiare completamente le linee con:

```sed
c\ 
You're history, original line! Muhahaha!
```

Let's see a simple script:

```sh
#!/bin/sh
sed '
/WORD/ {
i\
Add this line before
a\
Add this line after
c\
Change the line to this one
}'

```

Let's see a more complex script:

```sed
1d 
/^^/d
s/[[:cntrl:]]#g
/^D/ {   
		s/^D\(.*\)/\1\tOUTY\tINNY\t/         
		s/^01/Jan/         
		s/^02/Feb/         
		s/^03/Mar/         
		s/^04/Apr/         
		s/^05/May/         
		s/^06/Jun/         
		s/^07/Jul/         
		s/^08/Aug/         
		s/^09/Sep/         
		s/^10/Oct/         
		s/^11/Nov/         
		s/^12/Dec/         
		s:^\(.*\)/\(.*\)/\(.*\):\2 \1 \3:  
}
```


### Other Sed Examples

Run replacements based on regular expressions.

- Replace the first occurrence of a string in a file, and print 
the result:

```sh
sed 's/{{find}}/{{replace}}/' {{filename}}
```

- Replace all occurrences of an extended regular expression in a 
file:

```sh
sed -r 's/{{regex}}/{{replace}}/g' {{filename}}
```

- Replace all occurrences of a string in a file, overwriting the 
file (i.e. in-place):

```sh
sed -i 's/{{find}}/{{replace}}/g' {{filename}}
```

- Replace only on lines matching the line pattern:

```sh
sed '/{{line_pattern}}/s/{{find}}/{{replace}}/' {{filename}}
```

- Apply multiple find-replace expressions to a file:

```sh
sed -e 's/{{find}}/{{replace}}/' -e 's/{{find}}/{{replace}}/' {{filename}}
```

- Replace separator / by any other character not used in the find 
or replace patterns, e.g., #:

```sh
sed 's#{{find}}#{{replace}}#' {{filename}}
```


### Awk

```sh
 awk '{ print $2 }' file.txt
 # stampa il secondo campo di dati spaziati 
 # da uno spazio generico, mooolto utile!
```

```sh
 awk -F "#" '{print $1 $NF}' file.txt 
 # le colonne vengono divise dal separatore "#" 
 # e viene stampata la prima colonna, e l'ultima 
 # colonna
```

```sh
 awk -F "." '{print $NF "," $(NF-1)}' file.txt
 # le colonne vengono 
 # divise dal separatore "." e viene stampata l'ultima colonna, e 
 # la penultima colonna, spaziati da una virgola
```

```sh
 awk '{ sub("\r$", ""); print }' windows.txt > unix.txt 
 # To 
 # convert a Windows file to a UNIX file, enter the following 
 # command
```

```sh
 awk 'sub("$", "\r")' uniz.txt > windows.txt 
 # To convert a UNIX 
 # text file called "unix.txt" to a Windows text file called 
 # "windows.txt", enter the following command
```
```sh
 awk 'FNR == 2 {print}' file.txt
 # stampa la seconda riga
```

```sh
 awk 'FNR == 5 {print $3}' file.txt
 # stampa il terzo campo della quinta 
 # riga
```

```sh
 awk '$7=="\$7.30" { print $3 }' file.txt
 # stampa il terzo campo di ogni riga se il settimo campo e'
 # uguale alla stringa "$7.30", da notare l'escape del carattere
 # dollaro.
 # Quello introdotto prima delle graffe e' il blocco condizione
```

```sh
 awk '/30/ { print $3 }' table1.txt
 # stampa il terzo campo di ogni riga contenente la stringa "30",
 # in questo caso il blocco condizionale contiene una regex
```

```sh
 awk '{ sum=0; for (col=1; col<=NF; col++) sum += $col; print sum; }'
 # stampa la somma di ogni elemento per ogni riga
```

Per scrivere uno script awk in un file separato possiamo chiamare lo script
"nome.awk" e inserire come prima riga all'interno del file. Un esempio
di script puo' essere:

```sh
#!/usr/bin/awk -f
BEGIN { FS=":" }

#search for username: aaronkilik and print account details 
/aaronkilik/ { print "Username :",$1,"User ID :",$3,"User GID :",$4 }
```


## Gestione dei File su GNU/Linux


### Tipologie di File

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


### Soft Link e Hard link

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


### Cercare File in GNU/Linux

I comandi più comunemente utilizzati per cercare file su linux 
sono:

* find
* locate

Anche se è possibile effettuare ricerche di file anche con un 
appropriato utilizzo dei comandi "grep" ed "ls".


### Find

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

### Locate

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

#####  Updatedb File

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

### Modalità Alternative per cercare file


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


### Il programma Tar

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

### Librerie

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


####  Problemi comuni con le librerie

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
### Il Comando "dd"


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

### Manipolazione avanzata di file


Vediamo ora alcuni comandi per la manipolazione di file.

#### Xargs

Un programma molto utile per eseguire uno specifico comando per 
ogni voce sullo standard output è xargs, vediamone un esempio 
applicativo:

```sh
 ls | grep test | xargs rm 
 # rimuove tutti i file elencati, cioè 
 # tutti i file che hanno la parola "test" all'interno del loro 
 # nome
```

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



#### Sort

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


#### Expand ed Unexpand

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


#### Paste

Paste è un programma che unisce le righe di due file, ma è molto 
utilizzato per visualizzare le differenze tra due file, in quanto 
sullo standard output i due file vengono affiancati; un esempio 
applicativo è:

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

#### Tr

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
N.B.: Per effettuare la sostituzione di stringhe il comando sed è 
più flessibile.

#### Contare le linee di un file

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

#### Fmt

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


#### Uniq

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


### Effettuare Backup

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


### Backup con Tar

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


### Backup con Rsync

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

### Visualizzare file compressi

Per poter visualizzare file di testo compressi possiamo utilizzare
le utility: zcat, zless, zmore e zgrep.

### File Binari

For binary files, use hd, hexdump or xxd for simple hex dumps and bvi, hexedit or biew for binary editing.

## Processi

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


### Differenza tra PID e TID

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


### Top

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


### PS

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

### Altre Informazioni sui processi

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

### Nice e Renice

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
### Background e Foreground


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


### Uccidere Processi

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


### Nohup

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


### Lsof

Il programma lsof permette di capire quali file sono aperti dai 
vari processi, infatti lsof sta per "list opened files", vediamo 
alcuni esempi applicativi:

```sh
 lsof 
 # elenca i file aperti col relativo proprietario e PID
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


### Gestione dei demoni e dei processi

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


### SysVinit

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


### Systemd

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


#### Consultare i Servizi Correnti

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


#### Creare un servizio per systemd

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


### Superdaemons e xinet.d

Nei sistemi GNU/Linux esistono anche demoni particolari detti "superdemoni",
questi superdemoni non sono altro che demoni il cui 
scopo è gestire altri demoni, uno dei più famosi è "xinet.d", che 
ha sostituito l'ormai obsoleto "inet.d", ma esistono anche altri 
pacchetti software che ci permettono di installare superdemoni.


## Mail

We'll use postfix as MTA, but there is even exim;

```sh
 sudo apt-get install postfix
```
then we run

```sh
 service postfix start 
 # to start the service, or systemctl start postfix
```

The path where mail for individual users are stored is "/var/mail",
l'utente root invece è diverso dagli altri utenti, in quanto 
lui può ricevere mail dal kernel, o dal sistema operativo per 
diversi avvisi. Vediamo alcuni esempi:

```sh
 mail -s "Questo è l'oggetto" indirizzo@mail 
 # mandiamo una 
 # mail, all'indirizzo mail indicato, al posto dell'indirizzo 
 # avremmo potuto mettere anche il nome di qualche utente del 
 # sistema, una volta premuto invio, possiamo scrivere la mail, e 
 # terminare l'inserimento del corpo con "Ctrl+D"
```
E' utile fare script ad esempio che mandano mail in automatico, 
ad esempio per scrivere direttamente mail con un file di corpo 
predefinito chiamato "body.txt", possiamo effettuare, all'interno 
dello script l'istruzione:

```sh
 mail -s "Lo script è completato" < /root/bin/body.txt root
```

Per leggere le mail possiamo effettuare:

```sh
 mail -u 
 # questo comando visualizzerà la lista delle mail, e 
 # aspetterà un input, ci basterà inserire l'id della mail 
 # interessata per leggerla, e schiacciare poi:
```

* "r" per rispondere alla mail, e "Ctrl+D" per mandare la 
    risposta una volta finito l'inserimento
* "d" per cancellare la mail
* "q" per uscire dal programma

oppure per leggere la mail queue, cioè la coda di email (è dove 
le mail vengono salvate nel caso non riuscissero ad arrivare al 
server di destinazione, per motivi di diversa natura)


### Inoltro delle mail

Un altro file importante, è "/etc/aliases", questo file gestisce 
gli alias degli utenti, ad esempio nel caso volessi che sia i 
messaggi che arrivano a giuseppe arrivino anche a root, allora 
inserisco una riga con scritto:

```sh
 giuseppe: root 
 # aggiunge un alias, potrebbe essere utile, nel 
 # caso bloccassimo degli utenti, o non ci dovessero essere più, 
 # ma abbiamo comunque bisogno di ricevere la mail al posto 
 # dell'utente giuseppe
```
possiamo ora lanciare "newaliases" per aggiornare gli alias degli 
utenti

Un'altra tecnica utilizzabile per l'inoltro delle mail è quella 
di creare un file chiamato ".forward" nella home directory di un 
utente, in questo file ci basta scrivere il nome utente a cui 
inoltrare le mail.


## Informazioni sul Sistema e Diagnostica


### Overview del Processo di Boot

A simplified view of the boot process looks like this: 

1. The machine’s BIOS or boot firmware loads and runs a boot loader.
2. The boot loader finds the kernel image on disk, loads it into memory,
   and starts it.
3. The kernel initializes the devices and its drivers. 
4. The kernel mounts the root filesystem.
5. The kernel starts a program called init with a process ID of 
  1. This point is the user space start. 
6. init sets the rest of the system processes in motion. 
7. At some point, init starts a process allowing you to log in, 
  usually at the end or near the end of the boot.

Inoltre allo startup, il kernel Linux effettua le 
inizializzazioni in quest'ordine:
1. CPU Inspection
2. Memory Inspection
3. Device bus Discovery
4. Device discovery
5. Auxiliary kernel subsystem setup (networking, and so on)
6. Root filesystem mount
7. User space start

Solitamente i messaggi di boot sono contenuti in 
/var/log/kern.log ma dipende molto da come è configurato il 
sistema, possiamo ad esempio visualizzarli con "dmesg" o 
attraverso il nostro gestore di demoni, in quanto a volte il 
sistema cancella quei messaggi.

#### Differenze tra firmware BIOS e UEFI

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
    * Firmware launches the EFI application.
        * This could be a boot loader or the linux kernel itself using EFISTUB.
        * It could be some other EFI application such as a UEFI shell or a boot manager like systemd-boot or rEFInd.

If Secure Boot is enabled, the boot process will verify authenticity of the EFI binary by signature. 


### Log


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


### Rsyslog e Syslog

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


### Logger

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


### Logrotate

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


### Boot di un sistema GNU/Linux


#### Principio di funzionamento del boot

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


### Log di Boot

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


### Boot Loaders

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


### Grub

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


### Esplorare i dispositivi e le partizioni da Grub

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

### Kernel Command Line

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


### Configurazione di Grub

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


### Il file grub.cfg

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


###  Grub Note aggiuntive

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


### Sicurezza di Grub

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


### Bypassare Grub per avere una shell minimale

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


### Uname

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
* analizzare il file /proc/version
* mostrare i file in /etc/ che hanno la parola "release" e analizzarli, "ls /etc/*release*"


### Sistema UEFI o BIOS ?

Per capire se abbiamo effettuato il boot all'interno di un 
sistema UEFI o BIOS, il metodo più semplice è quello di 
effettuare un:

```sh
 ls /sys/firmware/efi 
 # se questo file esiste allora il sistema 
 # è bootato in UEFI, altrimenti abbiamo effettuato il boot in BIOS
```


### Informazioni sull'Hardware

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


### Memoria Centrale

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


### Memoria Rigida

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

### Periferiche Hardware: lspci, lsusb, lscpu, lsblk, lsscsi, lspcmcia, lshw, lsdev, usbview

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

### Moduli del Kernel


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
### Diagnostica e Manutenzione dei dispositivi di Memoria


### Ext Partition Monitoring


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


### Hardware Monitoring di dischi con SMART

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

###  Approfondimento sul sistema S.M.A.R.T

Self-Monitoring, Analysis, and Reporting Technology, o 
S.M.A.R.T., è un sistema di monitoraggio per dischi rigidi e per 
SSD, per rilevare e fornire diversi indicatori di affidabilità, 
nella speranza di anticipare i malfunzionamenti.

## Gestione dei Dispositivi di Memoria


### Premessa sui dispositivi di memoria

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


#### Nota sui firmware

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

### Schemi di Partizionamento Minimali


Per quanto riguarda schemi di partizionamento minimali possiamo 
distinguere alcune configurazioni possibili e comunemente 
utilizzate nella stragrande maggioranza dei casi. Queste
verranno analizzate nelle sottosezioni seguenti.


####  BIOS+MBR+GRUB

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

#### BIOS+GPT+GRUB

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


#### UEFI+GPT+GRUB

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

### Altri Esempi Pratici di Partizionamento

#### UEFI+GPT (Option 1: Boot and Home on Different Partitions)

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


#### UEFI+GPT (Option 2: Only Home on Different Partition)

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


#### UEFI+GPT (Option 3: Everything on a Single Partition)

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


#### BIOS+GPT (Option 1: Boot and Home on Different Partitions)

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


#### BIOS+GPT (Option 2: Only Home on a Different Partition)

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


#### BIOS+GPT (Option 3: Everything on a Single Partition)

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


#### BIOS+MBR (Option 1: Boot and Home on Different Partitions)

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


#### BIOS+MBR (Option 2: Only Home on a Different Partition)

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


#### BIOS+MBR (Option 3: Everything on a Single Partition)

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


#### BIOS+MBR (Option 4: More than 4 Partitions)

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


### Partizioni Separate vs Partizione Unica

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


### Creazione di partizioni e loro gestione

I dispositivi di memoria (come tutti gli altri dispositvi) 
possono essere visualizzati nella directory /dev/. Una volta 
localizzato il nostro dispositivo in /dev, ad esempio /dev/sda, 
possiamo gestire le partizioni attraverso diversi programmi 
esistenti come il famoso fdisk (se la tabella delle partizioni è 
MBR) o gdisk (se la tabella delle partizioni è GPT), esiste anche 
un programma molto diffuso oggigiorno chiamato "parted" che 
supporta sia sistemi MBR che GPT, ha anche un front-end grafico 
chiamato "gparted".


### Dischi e Geometria delle Partizioni

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
### fdisk


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


### Parted

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
### Analizzare, formattare, montare e smontare una partizione


### Analisi del filesystem di partizioni


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
### Formattazione di partizioni


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


### Mounting e unmounting di partizioni

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
a volte potrebbe capitare che per qualche motivo non mi faccia 
montare partizioni ntfs, perchè magari il sistema era in 
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


### Gestire file immagine e partizioni contenute

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


### Dove montare una partizione

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


### Visualizzare le partizioni attualmente montate


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


### Recovery di partizioni ntfs

Un buon programma per recuperare file da partizioni corrotte o 
file che sono stati cancellati su partizioni ntfs è "testdisk". 
Una volta avviato con i diritti di root (i.e. sudo) basterà 
fargli fare un "analyze" sull'Hard Disk desiderato per recuperare 
iniziale il processo di analisi e ricostruzione della partizione, 
una volta ricostruita comparirà una voce in basso "P" (n.b. : in 
questo programma le azioni disponibili sono sempre o in basso o 
in alto) che ci permetterà di elencare i file sulla partizione ed 
eventualmente copiarli. 


### Il file "fstab"

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


### Swap

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


#### Quanto Swap fare?

Tanto tempo fa una regola empirica era fare una partizione/file 
di swap di due volte la quantità fisica di RAM, ma oggi non è più 
necessario, basta un po' di swap.


### Gestione dello spazio su disco con Quota

Quota è un famoso software utilizzato per gestire spazio su disco 
per gli utenti e per i gruppi. Possiamo ad esempio limitare le 
dimensioni dei file o delle directory che un utente può possedere 
o con cui può operare.


### Preparazione della macchina per l'utilizzo di Quota

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


### Configurazione di Quota

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


### Manutenzione dei dispositivi di memoria di tipo "ext"

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


### Manutenzione dei dispositivi di memoria di tipo "xfs"

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


### RAID

Il RAID (originally redundant array of inexpensive disks; ora più 
comunemente redundant array of independent disks) è una tecnica 
di raggruppamento di diversi dischi rigidi collegati ad un 
computer che li rende utilizzabili, dalle applicazioni e 
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
 dimensione data dalla somma delle dimensioni dei singoli
* RAID 0: Le partizioni (o i dischi) sono delle stesse dimensioni 
 e costituireanno un volume unico con una dimensione data dalla 
 somma delle dimensioni dei singoli
* RAID 1: Mirrora i dati tra dischi/partizioni di dimensioni 
 uguali (alto livello di ridondanza ma spreco di capacità)
* RAID 4/5/6: I dati vengono copiati su tre o più dischi 
 sfruttando controlli come blocchi di parità

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
 # mdadm --create --verbose /dev/md0 --level=mirror --raid-devices=2 
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


### RAID ocn Btrfs

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


### Tuning delle prestazioni e configurazione delle 

#### Impostazioni di dispositivi di memoria

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


### Criptare Partizioni

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


### Gestire dischi criptati con Bitlocker

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


### LVM

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


### Estendere una partizione logica

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


### Backup con LVM

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


### Altre utility di LVM

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


## Gestione del server grafico X

Many Linux and Unixoid users (Unix and Unix-like systems) have 
heard of window managers, window decorators, desktop 
environments, and such. But what exactly are these and how do 
they relate to each other? I hope to clarify some of these topics 
and explain how it all works.

###  First of all, a Graphical User Interface (GUI) 

is an interface that allows users to interact with the system in 
a visual manner. GUIs typically have icons, windows, or graphics 
of some kind. An alternative to GUIs are command-lines which may 
also be called CLIs (Command-Line Interfaces) or CUIs (Console 
USer Interfaces). An example of this is DOS, FreeDOS, Bash, many 
server distros, etc. Basically, with a CLI, users interact with 
the machine through text. Users type a command and the machine 
performs the action and provides text as the output. A TUI (Text 
User Interface) is a step up from CLIs. TUIs are still 
text-based, but the screen is more ornamented and organized. The 
Ncurses interface is an example of a TUI. Most BIOS systems use a 
TUI interface (gray background and other coloring with menus). 
More advanced TUIs may have a cursor. The "dialog" command used 
to make interfaces for scripts is an example of an advanced TUI.

The core of most GUIs is a windowing system (sometimes called a 
display server). Most windowing systems use the WIMP structure 
(Windows, Icons, Menus, Pointer). X11 is a protocol used by the 
common windowing system called Xorg used on Linux systems. Xorg, 
like other windowing systems, allows the movement of windows and 
input interactions (such as the mouse and keyboard). Windowing 
systems provide the basic framework for other parts of the GUI. 
Windowing systems do not control the appearance of the GUI. 
Rather, the windowing system offers the core functionality.

###  Xlib 

is a C-programming library for interacting with display servers 
using the X11 protocol (X Window System Version 11). Not all 
graphical components above the display server are compatible with 
the display server itself.

The part of the GUI that controls the way windows appear is 
called the window manager. Window managers manage the size and 
placement of windows. Window managers also draw and own the 
close, maximize, minimize, etc. buttons and the scroll bars and 
menus (like the "File" menu) commonly seen on many windows. In 
other words, window managers control the frames that surround 
applications and the placement of these frames. The term "window 
decoration" refers to the usable part of the window frame like 
the close, minimize, etc. buttons, scroll bars, etc. However, 
sometimes the window manager will allow the application to 
control the appearance of the window. To understand this, think 
about the "complete themes" in Firefox that change the appearance 
of the windows and scroll bars. Not all window managers are 
compatible with the different display-managers/windowing-systems. 
Examples of window managers include Mutter, Metacity, KWin, twm, 
and IceWM.

###  A widget-toolkit

is a set of software or a library that works with the window 
manager to design the window's appearance. For example, the GTK 
toolkit defines how a window should appear. Then, a window 
manager draws and manages the window. When users customize the 
theme of their desktop, they are choosing which GTK design to 
use. To help clarify, toolkits (like Qt and GTK) are programming 
frameworks that specify the appearance of a theme. Different 
themes are basically different sets of code written in GTK, Qt, 
or some other widget toolkit. When a programmer designs a 
program, they may add some code that interfaces with a widget 
library (like GTK or Qt) to hard-code how a window appears. Think 
about your desktop and notice how you may have a few programs 
that look like an entirely different theme compared to your other 
applications. Such "odd" applications may have their appearance 
hard-coded. Examples of widget toolkits include SDL, Qt, GTK, 
AWT, and Motif.

Notice that some of the windows have an appearance that differs 
from the others (Clementine is more gray and box-like wile the 
calculator has rounded buttons and a lighter color).

###  A display manager 

is the "login screen". LightDM, KDM (KDE display manager), GDM 
(GNOME Display Manager), etc. are pieces of software that manage 
the appearance of the login screen.

###  A desktop 

is the "invisible window" that allows users to set a 
wallpaper/background and place "desktop icons". A virtual desktop 
refers to a desktop that is on the outside of the screen. Think 
about "workspaces" or "workspace switchers". You see your 
desktop, but there is more of it than what you see on the 
physical screen.

### A dock, launcher, launch bar, or taskbar

is a graphical element that may be its own entity or a component 
of another graphical software. In Ubuntu, the launcher on the 
side and the bar at the top are components of Unity. Cairo-Dock 
is an example of a dock that is its own entity. Their purpose is 
to give users access to file and applications.

### Screensavers 

are special programs that protect the screen from phosphor 
burn-in on CRT (tube-based monitors) and plasma monitors. 
However, they are also used for entertainment and security 
purposes. Screensavers can be set to activate when the 
workstation has not seen any activity from the user. Screensavers 
would then require a password to allows users to see the desktop 
and interact with the machine. Screensavers may be simple like a 
solid color or they can be graphics intensive like a video game.

### A Desktop Environment 

is a collection of software that provides a standard look and 
feel. For example, the KDE Plasma Desktop uses the X11 windowing 
system, the KWin window manager, the Qt widget, the KDE display 
manager, and the KDE Software Compilation (the many KDE 
applications such as Kate, Konsole, Phonon, and the many KDE 
applications).

In summary, a desktop environment is the collection or a bundled 
package of various GUI components. Each component performs some 
function in producing a graphical way of interacting with your 
machine. The windowing system (think about Xorg) is the lowest 
level portion of the GUI that controls the input interaction 
(mouse and keyboard). The window manager puts applications in 
designated portions of the screen called "windows". Window 
managers provide a way to change the window size. Users may also 
use the window manager to close an application. The widget 
toolkits provide a set (predefined) appearance that the window 
manager should draw. Such toolkits tell the window manager where 
to place the close, maximize, etc. buttons and how they should 
appear. Menus are also drawn by window managers after a toolkit 
declares how the menu should appear. Display managers a graphical 
login interfaces that allows users to login and choose the 
environment to load (if the user has more than one environment 
installed). Docks and launchers allow users to access certain 
application and files. The desktop is an "invisible" background 
window that appears to be behind (or at the bottom - below) all 
of your other windows and docks.

All these pieces of software work together to create the 
applications we see on the screen.

### A display server or window system

The display server controls and manages the low-level features to 
help integrate the parts of the GUI. For instance, display 
servers manage the mouse and help match the mouse movements with 
the cursor and GUI events caused by the cursor. The display 
server also provides various protocols and communicates with the 
kernel directly. There are different sets of display server 
protocols and different display servers that implement a specific 
protocol.

NOTE: Display servers do not draw anything. They just manage the 
interface. Libraries, toolkits, and other software perform the 
drawing.

L'X Window System (noto in gergo come X Window, X11 o 
semplicemente come X), in informatica, è un gestore grafico molto 
diffuso, standard de facto per molti sistemi Unix-like (Linux e 
FreeBSD compresi). L'implementazione ufficiale open source di X è 
X.Org (o più semplicemente XOrg), ed il suo sviluppo è curato 
dalla fondazione X.Org Foundation.

In passato era necessaria la configurazione di un file di 
configurazione Xorg, questo file conteneva diverse sezioni per la 
configurazione del monitor, refresh rate, opzioni video eccetera, 
oggi questo file di configurazione non è più richiesto, in quanto 
i driver che installiamo della scheda video si occupano di 
configurare il tutto per noi. Nel caso volessimo visualizzare il 
file di configurazione che viene generato nel momento 
dell'installazione e della configurazione di xorg, possiamo farlo 
con:

```sh
 cat /etc/X11/xorg.conf.failsafe 
 # visualizza il file di 
 # configurazione di Xorg che viene generato durante 
 # l'installazione e la configurazione di xorg, ma non è presente 
 # su tutte le distribuzioni
```
Un comando utile fin da subito per uccidere tutti i processi del 
server grafico e quindi terminarlo è:

```sh
 pkill X 
 # uccide tutti i processi relativi ad X
```

un'alternativa potrebbe essere uccidere il display manager, 
in quanto il display manager è il processo padre del processo 
relativo al Desktop Environment o al Window Manager

possiamo generare un file di configurazione di xorg, 
assicurandoci prima che Xorg non sia in esecuzione, (o uccidendo 
tutti i processi relativi a Xorg attraverso il comando 
precedentemente citato) attraverso:

```sh
 cd /etc/X11 && Xorg -configure 
 # genera un file di 
 # configurazione per Xorg
```
per testare il nuovo file di configurazione possiamo effettuare 
un:

```sh
 X -config -retro /directory/nuovoFileConfig 
 # imposta come file 
 # di configurazione per X il file "nuovoFileConfig"
```
```sh
 startx 
 # per avviare il server grafico col nuovo file di 
 # configurazione
```
```sh
 startx /path/to/WM/or/DE 
 # posso usare questo per lanciare un 
 # window manager o desktop environment per una sessione 
 # temporanea (comodo per provare ambienti o configurazioni 
 # temporanee)
```
Se volessi runnare altri desktop environment allora possiamo 
eseguire all'interno di un altro tty il comando:

```sh
 startx -- :2 
 # questo inizia una sessione di Xorg sul display 2, 
 # il display 2 solitamente è mappato al tasto f9 ma non sempre, 
 # possiamo cioè accederci con "Ctrl+alt+f9"
```
```sh
 startx /usr/bin/gdm -- :2 
 # avvia gdm sul display 2
```
Ricorda che:

* For a Linux computer with 6 allowed shell sessions, the virtual 
  displays are numbered 0 to 5 
* Shell sessions are mapped to function keys F1 through F6 
* Virtual displays are mapped to function keys F7 through F12
 
I file di log, possono essere visionati al percorso "/var/log/Xorg.?.log".

### Problemi Incontrati

Nel caso un utente non dovesse essere abilitato ad avviare 
startx, con messaggi tipo "User is not authorized to run X", 
dobbiamo andare a scrivere nel file "/etc/X11/Xwrapper.config" ed 
inserire nella voce "allowed_users" la stringa "anybody".

### Troubleshooting con X

In genere per fare troubleshooting sugli errori generati da X, 
possiamo ispezionare i seguenti file: `~/.xsession-errors`, 
`/var/log/Xorg.*/var/log/messages`.


### Copy & Paste (ossia copia e incolla)

Xorg ha tre clipboard, in cui vengono memorizzati i copia 
incolla, una utility molte efficace è "xclip", questa ci permette 
di copiare o incollare dati da terminale, ad esempio:

```sh
 dmesg | xclip -selection clipboard 
 # copia nella clipboard di X 
 # l'output di dmesg, ora possiamo incollarlo in qualsiasi altro 
 # programma grafico con "ctrl+v" o tasto destro del mouse e "
 # incolla", potrebbe essere utile creare un alias per fare in 
 # modo che automaticamente quando si esegue xclip si intende "
 # xclip -selection clipboard", in quanto a mio parere è l'opzione 
 # più utilizzata quando si utilizzata xclip
```
```sh
 xclip -selection clipboard nomeFile.log 
 # copia nella clipboard 
 # di X il contenuto del file menzionato
```
Xclip permette anche l'utilizzo di display diversi.

The ICCCM (Inter-Client Communication Conventions Manual) 
standard defines three "selections": PRIMARY, SECONDARY, and 
CLIPBOARD. Despite the naming, all three are basically 
"clipboards". Rather than the old "cut buffers" system where 
arbitrary applications could modify data stored in the cut 
buffers, only one application may control or "own" a selection at 
one time. This prevents inconsistencies in the operation of the 
selections. However, in some cases, this can produce strange 
outcomes, such as a bidirectional shared clipboard with Windows 
(which uses a single-clipboard system) in a virtual machine.

Of the three selections, users should only be concerned with 
PRIMARY and CLIPBOARD. SECONDARY is only used inconsistently and 
was intended as an alternate to PRIMARY. Different applications 
may treat PRIMARY and CLIPBOARD differently; however, there is a 
degree of consensus that CLIPBOARD should be used for 
Windows-style clipboard operations, while PRIMARY should exist as 
a "quick" option, where text can be selected using the mouse or 
keyboard, then pasted using the middle mouse button (or some 
emulation of it). This can cause confusion and, in some cases, 
inconsistent or undesirable results from rogue applications. 

In pratica il buffer primario è associato ai copia incolla che 
eseguiamo con la rotellina del mouse, mentre il buffer clipboard, 
quelli che generalmente eseguiamo con "ctrl+c" e "ctrl+v", o 
comunque quando non incolliamo con la rotellina del mouse.

Di default "xclip" copia attraverso il buffer primario, quindi 
per incollare dobbiamo premere la rotellina del mouse.

### Xhost


Il programma xhost è molto utile per poter avviare programmi da 
remoto, può lavorare in due modalità:

```sh
 access control enabled '-' 
 # solo gli utenti contenuti 
 # all'interno di una lista, possono usarlo, l'accesso a xhost non 
 # è garantito a tutti
```
```sh
 access control disabled '+' 
 # tutti gli utenti possono usarlo, 
 # l'accesso a xhost è garantito a tutti
```
```sh
 xhost + 192.168.1.101 
 # serve a garantire l'accesso a xhost 
 # solo ad uno specifico indirizzo
```
Lanciando solo:

```sh
 xhost 
 # mostra la configurazione attuale per l'accesso a xhost
```
Un'altra informazione utile è visualizzare la variabile 
d'ambiente $DISPLAY con:

```sh
 set | grep DISPLAY 
 # visualizza il valore della variabile 
 # display
```

l'output di questo comando sarà nella forma 
`DISPLAY=:numeroDisplay.numeroSchermo`

il nome del display può anche essere visionato con:

```sh
 xdpyinfo | grep display
```
Quindi avendo due sistemi A e B, se su A impostiamo come 
variabile d'ambiente DISPLAY con l'indirizzo IP di B e un display 
esistente su B, possiamo redirigere l'output di X di A su B, 
quindi su A effettueremo:

```sh
 export DISPLAY=192.168.1.87:0.0 
 # imposta la variabile 
 # d'ambiente DISPLAY in modo che l'output grafico di X venga 
 # rediretto su B al display 0 dello schermo 0.
```
dopo aver impostato la variabile d'ambiente DISPLAY possiamo 
effettuare un test, lanciando un'applicazione grafica come:

```sh
 xterm 
 # avvia l'applicazione xterm
```
Xhost risulta molto utile nel momento in cui vogliamo che un 
server si occupi del carico grafico, mentre su una macchina 
remota vengano visualizzati solo i risultati all'interno del 
server grafico.


### Xnest

E' possibile avviare desktop environment o window manager 
annidati attraverso Xnest. Oppure con un wrapper che semplifica 
queste operazioni e cioè Xephyr.


### Xwininfo

Il programma xwininfo è molto utile per reperire informazioni 
sulle finestre attive su Xorg. Vediamo subito alcuni esempi 
applicativi:

```sh
 xwininfo 
 # ci mostra informazioni sulla finestra su cui 
 # clickiamo dopo aver lanciato il comando
```
```sh
 xwininfo idFinestra 
 # ci mostra informazioni sulla finestra con 
 # l'id specificato
```
```sh
 xwininfo titoloFinestra 
 # ci mostra informazioni sulla finestra 
 # col titolo specificato
```
```sh
 xwininfo -root 
 # mostra informazioni sulla finestra "root" cioè 
 # quella da cui derivano tutte le altre finestra, quindi 
 # mostreremo a schermo informazioni come risoluzione e geometrie 
 # dell'intero desktop
```
```sh
 xwininfo -events 
 # mostra gli eventi di cui è in ascolta la 
 # finestra su cui clickeremo
```
```sh
 xwininfo -wm 
 # mostra informazioni relative al process ID 
 # dell'applicazione che ha lanciato quella finestra, il display 
 # su cui è attiva la finestra eccetera
```
```sh
 xwininfo -root -children 
 # mostra le informazioni di tutti i 
 # componenti X attivi con padre e figli, ma è poco leggibile
```
```sh
 xwininfo -root -tree 
 # mostra le stesse informazioni del 
 # comando precedente ma in forma più leggibile
```
```sh
 xwininfo -root -children -all 
 # mostra tutte le informazioni 
 # possibili su tutti i componenti di X
```
N.B.: Gli ultimi comandi sono utili nel caso di programmazione di 
Desktop ENvironment, nel momento in cui facciamo riferimento a 
elementi di X.

Altro comando utile per reperire informazioni su oggetti, font, 
finestre o display è:

```sh
 xprop 
 # dopo averlo avviato dovremo selezionare la finestra 
 # d'interesse
```
```sh
 xprop | grep -i pid 
 # mi fornisce il PID della finestra, utile 
 # se abbiamo ad esempio più istanze di un programma avviato e 
 # vogliamo chiuderne uno nello specifico senza influire sugli 
 # altri
```
un'altro comando utilissimo per vedere i nomi dei comandi delle 
applicazioni che abbiamo in running in X è:

```sh
 xlsclients 
 # visualizza il nome dei comandi delle applicazioni 
 # grafiche in running su X
```
```sh
 xlsclients -l 
 # è più dettagliato
```
un'altro utile tool per ottenere informazioni sulle finestre è "
wmctrl", guardare il man per utili esempi di utilizzo.

Possiamo dare focus a una finestra che non vediamo più con:

```sh
 xdotool windowfocus 0x1a00ad2 
 # dove l'id è preso da xlsclients
```


### Xrefresh

E' un comodo comando per fare il refresh del server X, nel caso 
in cui una o più parti devono essere ridisegnate


### Xdpyinfo

Il programma xdpyinfo fornisce informazioni sul display manager; 
vediamo subito alcuni esempi:

```sh
 xdpyinfo | grep display 
 # fornisce informazioni sul display
```
```sh
 xdpyinfo 
 # fornisce molte informazioni sul display 
```
```sh
 xdpyinfo | grep extensions 
 # fornisce il numero di estensioni 
 # installate per il display
```
```sh
 xdpyinfo -queryExtensions 
 # fornisce informazioni tecniche 
 # sulle estensioni caricate, utili per i programmatori
```

### Xinput

Questo comando è utile per capire le periferiche di input a 
disposizione, come ad esempio mouse eccetera, le loro features, e 
le eventuali configurazioni, possiamo eseguire:

```sh
 xinput 
 # mostra la lista delle periferiche di input per il 
 # server X
```
```sh
 xinput --disable 10 
 # disabilita la periferica con ID=10
```
```sh
 xinput --enable 9 
 # abilita la periferica con ID=9
```
```sh
 xinput --list --short 
 # mostra con una lista concisa tutte le 
 # periferiche di input
```
```sh
 xinput --list-props "Logitech USB-PS/2 Optical Mouse" 
 # mostra 
 # le proprietà di una delle periferiche (indicata tra doppi 
 # apici) mostrata dal comando "xinput --list --short"
```
```sh
 xinput --set-prop "SynPS/2 Synaptics TouchPad" "Device Accel Constant Deceleration" 1.5 
 # imposta il parametro "Device Accel 
 # Constant Deceleration" del device "SynPS/2 Synaptics TouchPad" 
 # al valore di "1.5"
```
```sh
 xinput --set-prop "Logitech USB-PS/2 Optical Mouse" "libinput Accel Speed" -0.6 
 # imposta il parametro "libinput Accel Speed" 
 # del device "Logitech USB-PS/2 Optical Mouse" al valore di "-0.6", 
 # in questo caso un valore negativo riduce l'accelerazione e 
 # velocità del mouse.
```


### xwd

Il programma xwd (X Window Dump) è un utile tool per effettuare 
screenshot dello schermo, possiamo avviarlo con:

```sh
 xwd 
 # attenzione in questo caso il comando è inutile, in quanto 
 # una volta selezionata la finestra, verrà stampata l'immagine 
 # sull stdout, con caratteri incomprensibili
```
invece modi utili per utilizzare questa utility sono:

```sh
 xwd > myshot.xwd 
 # stampa l'immagine in un file chiamato 
 # myshot.xwd
```
```sh
 xwd -out myshot.xwd 
 # stampa l'immagine in un file chiamato 
 # myshot.xwd
```
```sh
 xwd -frame -out myshot.xwd 
 # stampa l'immagine, mostrando anche 
 # il frame della finestra
```
```sh
 xwd -root -out myshot.xwd 
 # esegue uno screenshot dell'intero 
 # desktop
```
per visualizzare le immagini possiamo utilizzare "xwud", quindi 
eseguiamo:

```sh
 xwud -in screenshot.xwd 
 # visualizza l'immagine .xwd
```
se abbiamo installato imagemagick, possiamo anche convertirla in 
un altro formato ad esempio con:

```sh
 convert shot.xwd shot.jpg 
 # converte l'immagine .xwd in .jpg
```


### Xrandr

RandR ("resize and rotate") is a communications protocol written 
as an extension to the X11[2] and Wayland[3] protocols for 
display servers. Both XRandR and WRandR provide the ability to 
resize, rotate and reflect the root window of a screen. RandR is 
also responsible for setting the screen refresh rate. The program 
xrandr is a primitive command line interface to RandR extension 
used to manage monitor configurations, let's see some examples:

```sh
 xrandr 
 # shows the actual configuration
```
```sh
 xrandr --output VGA1 --off 
 # turns off the VGA1 interface, keep 
 # in mind that the available displays are shown when "xrandr" 
 # alone is executed
```
```sh
 xrandr --output VGA1 --auto --left-of eDP1 
 # in this case VGA1 is 
 # set with the maximum resolution automatically detected "--auto", 
 # and on the left of the interface eDP1, notice that we can 
 # specify multiple configurations of various monitor interface, 
 # we just have to keep in mind the structure of the xrandr 
 # command
```
```sh
 xrandr --output DFP1 --mode 1024x768 
 # imposta la risoluzione 
 # indicata per il monitor indicato
```
the structure of the xrandr command is usually 
```sh
xrandr --output <monitorInterface> --option1 <value> --option2 <value> ... ..."
```

Let's see other examples:

```sh
 xrandr --output LVDS --auto --rotate normal --pos 0x0 --output VGA \
 --auto --rotate left --right-of LVDS 
 # Sets an output called LVDS 
 # to its preferred mode, and on its right put an output called 
 # VGA to preferred mode of a screen which has been physically 
 # rotated clockwise
```

```sh
 randr --output HDMI1 --off --output LVDS1 --primary --mode 1366x768 --pos 0x0 \
 --rotate normal --output VIRTUAL1 --off --output DP1 --off 
  --output VGA1 --mode 1280x1024 --pos 1366x0 --rotate normal 
 # this is a complete setup of all the interfaces, notice the "--primary"
 # option is used to set the LVDS1 interface as primary
```
```sh
 xrandr --output LVDS --mode 1280x800 --rate 75 
 # imposta l'output 
 # di LVDS alla risoluzione e alla frequenza selezionata
```
queste impostazioni non saranno permanenti ma possono essere rese 
permanenti attraverso uno script che parte all'avvio.

Inoltre xrandr può gestire le schede video esterne, ad esempio in 
alcuni portatili potremo non vedere interfacce HDMI, o VGA, 
questo è perchè in alcune configurazioni Hardware, alcune 
interfacce tipo VGA sono collegate ad una scheda video, mentre 
altre tipo HDMI, all'altra scheda video. Vediamo un esempio, nel 
caso d'esempio supponiamo che la porta hdmi sia collegata ad una 
scheda video mentre la porta vga ad un'altra scheda video, allora 
possiamo eseguire:

```sh
 xrandr --listproviders 
 # mi mostra su quanti e su quali 
 # dispositivi video xrandr può agire, il primo a comparire sarà 
 # quello in utilizzo attualmente, potremo ad esempio visionare 
 # una lista tipo "0: Intel 1:nouveau", questo è anche l'ordine di 
 # priorità che viene dato ai dispositivi di uscita
```
ora possiamo cambiare l'ordine eseguendo:

prima deve essere attiva la scheda video nouveau:

```sh
 optirun ls 
 # ls è un esempio, qualsiasi comando va bene, serve 
 # solo ad accendere la scheda video
```
```sh
 xrandr --setprovideroutputsource nouveau Intel 
 # impone un nuovo 
 # ordine ai moduli video, ora nouveau è impostato per gestire gli 
 # output video come modulo primario
```
NOTA BENE: Un caso pratico e molto comune in cui questo può 
essere necessario è su laptop, in cui infatti solitamente 
esistono due schede video, una integrata ed un'altra esterna, in 
questo caso, dobbiamo assicurarci di aver installato bumblebee o 
che comunque entrambe le schede video funzionino correttamente e 
che i driver vengano caricati senza errori.


#### Impostare una risoluzione personalizzata

Per poter creare una risoluzione personalizzata, ad esempio
se non compare all'interno della lista di quelle rilevate 
(anche se solitamente non e' proprio una buona idea) possiamo
provare a forzarla.

Ad esempio se volessimo forzare la modalita' 1680x1050 @ 60 Hz
prima dobbiamo generare la linee di configurazione per questa
modalita' e possiamo farlo attraverso:

```sh
 cvt 1680 1050 60
 # genera la configurazione per la risoluzione 1680x1050 a 60 Hz
```

Questo fornira' un output del tipo:
```text
1680x1050 59.95 Hz (CVT 1.76MA) hsync: 65.29 kHz; pclk: 146.25 MHz
Modeline "1680x1050_60.00"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
```

Ora possiamo utilizzare questo output per segnalare a xrandr
la nuova modalita' con:

```sh
 xrandr --newmode "1680x1050_60.00"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
 # crea la nuova modalita' per xrandr
```

a questo punto non ci basta che settarla con:
```sh
xrandr --addmode VGA-0 1680x1050_60.00
```


The changes are lost after reboot, to set up the resolution persistently, 
create the file `~/.xprofile` with the content:

```sh
#!/bin/sh
xrandr --newmode "1680x1050_60.00"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
xrandr --addmode VGA-0 1680x1050_60.00
```


### DPMS

DPMS (Display Power Management Signaling) is a technology that 
allows power saving behaviour of monitors when the computer is 
not in use. This will allow you to have your monitors 
automatically go into standby after a predefined period of time. 

### Xorg e bash


Possiamo interagire con Xorg ad esempio mandando notifiche al 
Desktop Environment o al Window Manager, una volta installato "
libnotify" con:

```sh
 notify-send "rsnapshot done :)"
```


### X e startx

#### Premessa su Desktop Environment e Display Manager

E' importante capire la distinzione tra Desktop Environment o 
Window Manger (ambiente più leggero, ma di concetto simile) e 
Display Manager, il display manager (come ad esempio LightDM, 
KDM, GDM, Qingy, ecc...) è un programma utile per sostituire la 
procedura di login testuale e permettere all'utente la scelta del 
Desktop Environment o Window Manager; mentre il Desktop 
Environment o il Window Manager è costituito dai programmi atti a 
gestire le finestre, i workspace e gli stili dell'ambiente 
grafico.

#### X, startx e xinit e come avviare applicazioni all'avvio del sistema se si usa "startx"

Il programma startx è uno script utilizzato per lanciare il 
server grafico X utilizzando determinati driver e un determinato 
window manager o desktop environment, startx fa uso del programma 
"xinit" per lanciare la GUI (Graphical User Interface), possiamo 
ad esempio automatizzare utente per utente l'avvio di determinate 
applicazioni andando ad inserire il nome dell'applicazione da 
lanciare nel file di configurazione adibito, che può essere a 
differenza della distribuzione:

* ~/.xinitrc
* ~/.xsession

Mentre è comunque possibile automatizzare l'avvio di applicazioni 
a livello globale (utile ad esempio per applicazioni enterprise) 
attraverso i file di configurazione in "/etc" che anche in questo 
caso possono variare da distribuzione a distribuzione ma comunque 
dovrebbero avere un nome simile a uno di quelli precedenti 
sopracitati; per trovare i nomi dei file che vengono usati 
precisamente possiamo fare:

```sh
 whereis startx 
 # mostra dove sono collocati gli eseguibili di 
 # startx
```
```sh
 cat /percorso/startx | more 
 # mostra lo script "startx"
```
Una volta visualizzato lo script basterà cercare i nomi dei file 
collocati alle voci:

```sh
 userclientrc 
 # indica le directory in cui sono situtati i file 
 # di configurazione locale (utente per utente) di X
```
```sh
 sysclientrc 
 # indica la directory in cui è situato il file di 
 # configurazione globale (valido per tutti gli utenti) di X
```
Basterà creare questi file se non esistono e al loro interno 
potremo scrivere i comandi da avviare all'avvio di X. 
Recapitolando, startx è uno script che richiama:

```sh
 xinit 
 # inizializzatore di X, che legge anche file di 
 # configurazione a livello utente e a livello sistema
```
```sh
 # file di configurazione sia a livello utente che a livello 
 # globale di sistema
```
```sh
 X 
 # server per window system
```
per poter lanciare un desktop environment. Attenzione i file di 
configurazione discussi in questa sezione, sono validi solo nel 
momento in cui iniziamo la nostra sessione con "startx", in altri 
casi (ad esempio gestione attraverso login manager) la 
configurazione potrebbe essere diversa, e questi file potrebbero 
del tutto essere ignorati; fare quindi sempre riferimento alla 
configurazione del proprio login manager. Quando non si usa un 
login manager, e quindi si fa uso dello script "startx", dobbiamo 
inserire all'interno del file di autorun di X discusso a inizio 
sezione (.xinitrc o .xsession, ci basta leggere le prime righe 
dello script startx per capirlo) l'istruzione:

```sh
 exec percorsoDEoWM 
 # dove al posto di percorsoDEoWM possiamo ad 
 # esempio inserire "/usr/bin/startkde" o "/usr/bin/gnome-session" 
 # o ancora "/usr/bin/startxfce4"
```
Un altro modo per avviare script o cose da terminale è quello di 
usare il file /etc/rc.local per i sistemi sysVinit.


### Inittab e Xwindows

Il file inittab, è un file atto a specificare il default runlevel 
del nostro sistema, anche se nella maggior parte delle distro 
recenti, in pratica da quando il gestore di demoni "systemd" ha 
sostituito "sysVinit" la mansione di questo file è stata delegata 
ad altri insiemi di file in determinate directory; vediamo 
innanzitutto alcuni comandi utili per gestire i runlevel:

```sh
 runlevel 
 # mostra il runlevel attuale e il precedente
```
```sh
 telinit runlevelNumber 
 # setta il runlevel al numero "runlevel 
 # Number"
```
```sh
 init runlevelNumber 
 # analogo al comando precedente
```
Storicamente la posizione del file "inittab" era "/etc/inittab", 
per avere un'idea più precisa di come gestire i demoni, si 
rimanda alla sezione sui processi e su systemd.


### Font

Che palle, questa la fai tu Jack, non ne vedo l'utilità. E' la 
lezione 16 della seconda parte del corso.

### Xorg Oggi e come avviare applicazioni all'avvio del sistema se non si usa "startx"

Xorg, attualmente autoconfigura le impostazioni per l'ambiente 
grafico, esistono diverse directory dove sono collocati i file di 
configurazione, ad esempio, alcuni file di configurazione sono 
in:

```sh
 /etc/X11 
 # qui vengono gestite anche le applicazioni che 
 # vengono autolanciate all'avvio di Xorg, nel file "Xsession" che 
 # è uno script che richiama gli script nella directory 
 # /etc/X11/Xsession.d/*, ed è qui che metteremo il programma che 
 # ci interessa avviare automaticamente genericamente, in realtà i 
 # programmi che vogliamo caricare automaticamente dopo il login, 
 # dipendono dal login manager, quindi dovremo andare a vedere nel 
 # file di configurazione del nostro login manager, ad esempio per 
 # gdm3 il file di interesse è in "/etc/gdm3/Xsession"
```
```sh
 /etc/X11/xorg.conf.d 
 # qui vengono messe i pezzi di 
 # configurazione dell'utente, questi vanno a sovrascrivere la 
 # configurazione di default. in quanto nella nuoava veesione di 
 # Xorg, non esiste il classico xorg.conf dove esisteva la 
 # configrazione globale, ma esistono pezzi di configurazione che 
 # possono essere creati dall'utente
```
altri in:

```sh
 /usr/share/X11/xorg.conf.d/ 
 # qui solutamente vengono messi 
 # file di applicazioni che sovrascrivono le impostazioni attuali 
 # di xorg, infatti le configurazioni non vengono scritte tutte in 
 # un file come una volta, questi file sono impostazioni di 
 # default, normalmente invece se l'utente vuole impostare una sua 
 # configurazione, deve copiare il file interessato nella 
 # directory "/etc/X11/xorg.conf.d/nomeFile.conf", se la directory 
 # "xorg.conf.d" in "/etc/X11" non esiste, dobbiamo crearla, 
 # normalmente infatti questa non esiste almenochè non abbiamo già 
 # modificato alcune cose attraverso questa procedura
```
La modalità standard per decidere che applicazioni avviare 
all'avvio di una sessione grafica di uno specifico utente, 
dobbiamo inserire il file ".desktop" della relativa applicazione 
all'interno della directory ~/.config/autostart/, dove il file 
desktop si può creare o si può trovare in "
/usr/share/applications".

Per informazioni aggiuntive, possiamo eseguire:

```sh
 man xorg.conf 
 # visualizza le pagine di manuale su xorg
```


### Alcuni file importanti di Xorg

Elenchiamo alcuni file degni di nota:

```sh
 # .Xdefaults (versioni più vecchie o sistemi Unix puri, tipo BSD) 
 # o .Xresources (più recente): contiene alcune impostazioni di 
 # default di Xorg, oppure configurazioni per applicazioni di Xorg 
 # low level, ad esempio qui possiamo trovare le impostazioni di 
 # xterm o uxterm, di xclock, xpdf, rxvt-unicode e così via
```
per caricare un file di impostazioni come .Xdefaults o 
.Xresources usiamo xrdb e possiamo eseguire:

```sh
 xrdb ~/.Xresources 
 # carica le impostazioni con xrdb
```
```sh
 xrdb -q 
 # mostra le impostazioni attuali
```


### Login Manager

Il login manager di default è specificato nel file:

```sh
 /etc/X11/default-login-manager 
 # file dove è specificato il 
 # percorso al login manager di default
```
possiamo cambiare il login manager modificando questo file, 
attenzione, in questo file deve essere presente solo un percorso, 
non sono ammessi commenti, nel caso il percorso fosse scorretto, 
o ci fossero altri caratteri oltre al percorso del login manager, 
allora il login manager al riavvio non partirà. E' dalla 
configurazione del login manager che possiamo impostare le 
applicazioni che devono avviarsi al suo avvio.


### Remap dei Tasti


### Gestione e Remap in ambiente Xorg


In un ambiente grafico con X possiamo usare xmodmap, dopo averlo 
installato creiamo il file "~/.Xmodmap" (se non esiste) e 
scriviamo al suo interno le seguenti stringhe ad esempio per 
eseguire un classico remap, cioè l'assegnazione del tast esc al 
tab:

remove Lock = Caps_Lock 

keysym Caps_Lock = Escape 

questo funziona in un ambiente X con GUI e per poter visualizzare 
quale tasto a quale codice corrisponde possiamo utilizzare "xev" 
e andare a vedere la stringa corrispondente al nome del tasto che 
premiamo. Una volta effettuate le modifiche ci basterà eseguire:

```sh
 xmodmap ~/.Xmodmap 
 # ricarica la configurazione prendendo in 
 # input il file specificato
```
Per altri esempi, e spiegazione della relativa grammatica, 
possiamo consultare l'efficace pagina di man di xmodmap. Con xev 
guardo tutti i codici per le impostare in genere tutti i tasti 
della tastiera (ad esempio per configurare i tasti Fn), un buon 
inizio è guardare il codice del tasto interessato con xev e poi 
andare nelle configurazioni del Desktop Environment o del Window 
Manager e associare quel codice ad un determinato script/comando.

### Remap in ambiente senza Xorg


In un ambiente text only, dovremo invece andare a scrivere in 
append nel file "~/.keymap" le seguenti stringhe:

keycode 1 = Caps_Lock 

keycode 58 = Escape

e poi eseguiamo:

```sh
 loakeys ~/.keymap
```
per vedere i codici corrispettivi ai tasti in un ambiente solo 
testo senza X, possiamo eseguire:

```sh
 sudo showkey -k 
 # mostra i keycode dei tasti che premiamo, per 
 # uscire dobbiamo aspettare 10 secondi o premere Ctrl+C che 
 # funziona solo se viene eseguito in un ambiente con X
```


### Touchpad e configurazione

In questa sezione vedremo alcuni strumenti generali per la 
gestione dei driver Synaptics input driver per i touchpad 
Synaptics (e ALPS) che si trovano sulla maggior parte dei 
notebook. Uno strumento molto utile, incluso all'interno del 
pacchetto "xserver-xorg-input-synaptics", è molto semplice 
l'utilizzo, possiamo effettuare:

```sh
 synclient 
 # visualizza la configurazione attuale
```
```sh
 synclient TapButton1=1 
 # imposta la variabile TapButton uguale 
 # a 1, in questo caso stiamo abilitando il click col tocco 
 # (tapping) del touchpad
```
Nel caso volessimo rendere standard questa configurazione, allora 
dobbiamo copiare il file relativo a synaptics, solitamente 
situato in "/usr/share/X11/xorg.conf.d/" nella directory "
/etc/X11/xorg.conf.d" (se non esiste la dobbiamo creare), il file 
copiato può avere anche un nome diverso. Ora al suo interno 
possiamo inserire l'opzione in append al file, nella sezione 
specifica (qui basta leggere un attimo con attenzione il file):

```conf
Option "TabButton1" "1"
```
Al riavvio di X, l'opzione prenderà effetto.


### Utility in ambiente senza X

#### setterm


The setterm command can set various terminal attributes:

```sh
 setterm -blank 15 -powersave powerdown -powerdown 60 
 # In this 
 # example, force screen to turn black in 15 minutes. Monitor 
 # standby will occur at 60 minutes
```
```sh
 setterm -underline on; echo "Add Your Important Message Here"; setterm -underline off 
 # In this example show underlined text 
 # for xterm window
```
```sh
 setterm -cursor off 
 # Another useful option is to turn on or 
 # off cursor
```
```sh
 setterm -cursor on 
 # Turn the cursor on
```


## Networking

E' importante parlare di interfacce quando si parla di 
networking, un'interfaccia è tutto quello che ci permette di 
avere un'indirizzo ip e una connessione, esempi di interfaccia 
possono essere:

* lo: loopback interface 
  presente su tuti i sistemi e 
  utilizzata da un sistema per riferirsi a se stesso, solitamente 
  è assegnato l'indirizzo "127.0.0.1" ma può assumere tutti gli 
  indirizzi nel range 127.0.0.0/8 address block. That is, 
  127.0.0.1 through 127.255.255.254 all represent your computer.
* vpn: interfaccia per rete vpn
* ppp: interfaccia per connessione point to point
* eth: interfaccia ethernet
* wlan: interfaccia wlan
* ecc...


### Nota sui socket

A network socket is an endpoint of an inter-process communication 
across a computer network. Today, most communication between 
computers is based on the Internet Protocol; therefore most 
network sockets are Internet sockets.

A socket API is an application programming interface (API), 
usually provided by the operating system, that allows application 
programs to control and use network sockets. Internet socket APIs 
are usually based on the Berkeley sockets standard.

A socket address is the combination of an IP address and a port 
number, much like one end of a telephone connection is the 
combination of a phone number and a particular extension. Based 
on this address, internet sockets deliver incoming data packets 
to the appropriate application process or thread.

Un socket, in informatica, nei sistemi operativi moderni, indica 
un'astrazione software progettata per poter utilizzare delle API 
standard e condivise per la trasmissione e la ricezione di dati 
attraverso una rete oppure come meccanismo di IPC (interprocess 
communication, cioè comunicazione tra processi). È il punto in 
cui il codice applicativo di un processo accede al canale di 
comunicazione per mezzo di una porta, ottenendo una comunicazione 
tra processi che lavorano su due macchine fisicamente separate. 
Dal punto di vista di un programmatore un socket è un particolare 
oggetto sul quale leggere e scrivere i dati da trasmettere o 
ricevere. Ci sono due tipi fondamentali di socket:

```sh
 # i socket tradizionali su protocollo IP, usati in molti sistemi 
 # operativi per le comunicazioni attraverso un protocollo di 
 # trasporto (quali TCP o UDP); 
```
A sua volta esistono due tipi di socket su IP:

* LISTEN, che rappresentano la possibilità di ricevere nuove 
    connessioni. Un socket di questo tipo è identificato dalla 
    terna protocollo di trasporto, indirizzo IP del computer, 
    numero di porta; 

* ESTABLISHED, che rappresentano una particolare connessione 
    attiva. Un socket di questo tipo è identificato dalla 5-tupla 
    protocollo di trasporto, indirizzo IP sorgente, indirizzo IP 
    destinazione, numero di porta sorgente, numero di porta 
    destinazione.

```sh
 # gli Unix domain socket (detti anche socket locali o socket in 
 # dominio Unix), usati nei sistemi operativi POSIX per le 
 # comunicazioni tra processi residenti sullo stesso computer.
```
In base alla modalità di connessione, inoltre, si distinguono:

* Stream socket: connection-oriented, basati su TCP; 
* Datagram socket: connectionless, basati su UDP; 
* Raw socket: utilizzati per lo sviluppo di protocolli.

I socket sono stati introdotti nel 1983 in BSD e poi sono stati 
ripresi da praticamente tutti gli altri sistemi operativi. Per 
questo motivo solitamente le funzioni di programmazione dei 
socket vengono chiamate Berkeley socket API. Si consiglia di dare 
un'occhiata alla pagina inglese di wikipedia, per informazioni 
dettagliate sull'argomento.


### Nota sugli Indirizzi IP Privati


Una piccola tabella rappresentante gli indirizzi IP privati, 
questa scelta è stata fatta per la scarsità degli indirizzi 
pubblici con IPv4.

|     Nome      | Indirizzo Iniziale  | Indirizzo Finale  |        Classi          |    Blocco CIDR più grande    |
|:-------------:|:-------------------:|:-----------------:|:----------------------:|:----------------------------:|
| 24-bit block  |      10.0.0.0       |  10.255.255.255   |   Singola Classe A     |    10.0.0.0/8 (255.0.0.0)    |
| 20-bit block  |     172.16.0.0      |  172.31.255.255   | 16 Classi B Contigue   | 172.16.0.0/12 (255.240.0.0)  |
| 16-bit block  |    192.168.0.0      | 192.168.255.255   | 256 Classi C Contigue  | 192.168.0.0/16 (255.255.0.0) |


Ricorda che l'IPv6 non ha questa distinzione tra indirizzi 
privati e pubblici.


### Ifconfig

Se abbiamo installato il pacchetto net-tools in cui risiede il 
comando ifconfig possiamo effettuare un:

```sh
 ifconfig 
 # visualizza la lista delle interfacce di rete con le 
 # relative informazioni
```
In assenza di ifconfig possiamo effettuare un:

```sh
 ip a 
 # visualizza la lista delle interfacce di rete con le 
 # relative informazioni, è analogo al precedente
```
Vediamo alcuni esempi di comandi di rete:

```sh
 ifconfig eth0 down 
 # in questo caso spegniamo l'interfaccia 
 # eth0
```
```sh
 ifconfig eth0 up 
 # in questo caso accendiamo l'interfaccia eth0 
```
```sh
 ifconfig eth0 promisc 
 # in questo caso accendiamo l'interfaccia 
 # eth0 in modalità "promiscua"
```
```sh
 ifdown --all 
 # spegne tutte le interfacce
```
Per le reti wifi, una volta veniva utilizzato "iwconfig", ma ora 
è deprecato e viene utilizzato invece al suo posto il programma "
iw", mentre ifconfig è deprecato in favore di "ip".

Per conoscere il nostro IP esterno invece dobbiamo fare il 
retrieving da un sito esterno, il modo più semplice al momento è:

```sh
 curl ifconfig.me 
 # scarica attraverso curl, l'informazione 
 # fornita dal sito ifconfig.me che fornisce il mio IP esterno
```
in alternativa possiamo eseguire:
```sh
 curl ipecho.net/plain
```
un altro comando con curl utile da terminale per ricavare 
informazioni su un IP è:

```sh
 curl ipinfo.io/74.207.244.221 
 # mi da informazioni sull'ip 
 # fornito, in questo caso è stato utilizzato un IP d'esempio
```
nel caso usassimo un proxy socks, possiamo controllare in modo 
veloce il nostro ip esterno attraverso:

```sh
 curl --socks5 127.0.0.1:9050 http:
 # checkip.amazonaws.com/ 
```


### Ip

In pratica al posto di ifconfig e del relativo pacchetto di 
appartenenza "net-tools", che è ritenuto ormai deprecato, 
oggigiorno dovrebbe essere utilizzato ip e il relativo pacchetto "
iproute2", vediamo alcuni comandi d'esempio:

```sh
 ip addr show 
 # mostra gli indirizzi ip, simile ad ifconfig -a
```
```sh
 ip neigh 
 # mostra la tabella arp, simile ad un "arp -na"
```
```sh
 ip addr add 192.168.1.103/24 dev wlan0 
 # assegna 
 # all'interfaccia wlan0 l'indirizzo ip indicato, se siamo già 
 # connessi dovremo sconnetterci e riconnetterci per vedere i 
 # cambiamenti
```
```sh
 ip a add 192.168.1.200/255.255.255.0 dev eth0 
 # imponiamo sia 
 # indirizzo ip che subnet mask adll'interfaccia eth0
```
```sh
 ip addr del 192.168.50.5/24 dev eth1 
 # in questo caso 
 # eliminiamo un indirizzo ip
```
```sh
 ip addr show 
 # mostra gli indirizzi ip, mostra più informazioni 
 # di "ip link list"
```
```sh
 ip link set eth0 up 
 # accendo l'interfaccia eth0
```
```sh
 ip link set eth0 down 
 # spengo l'interfaccia eth0
```
```sh
 ip route help 
 # mostra l'help per l'opzione route di ip
```
```sh
 ip route show 
 # mostra la tabella di routing
```
```sh
 ip route get 8.8.8.8 
 # mostra a quale indirizzo si appoggia per 
 # arrivare all'indirizzo ip menzionato, utile per 
 # troubleshooting, o per capire con quale interfaccia mi sto 
 # connettendo ad internet od ad una determinata rete
```
```sh
 ip route add 10.10.20.0/24 via 192.168.50.100 dev eth0 
 # aggiunge una voce alla tabella di routing
```
```sh
 ip route del 10.10.20.0/24 
 # rimuove una voce dalla tabella di 
 # routing
```
```sh
 ip route add default via 192.168.50.100 
 # setto il default 
 # gateway, cioè in pratica l'interfaccia con cui cui mi collego 
 # ad internet, ricordiamo che non possiamo eliminare tutte le 
 # voci di default in tutti i casi, quando abbiamo degli errori, 
 # anzichè eliminare l'interfaccia di default aggiungiamone una
```
```sh
 ip route del default via 192.168.50.100 
 # elimino il default 
 # gateway associato all'indirizzo menzionato
```
```sh
 ip -s link 
 # mostra le statistiche di rete
```
```sh
 ip -s -s link 
 # mostra ancora più statistiche di rete
```
```sh
 # ip monitor all
```


### Iw

La suite di comandi "iw" gestisce le interfaccie wireless. To 
connect to an AP you can use iw connect if the connection 
requires:

No encryption Uses WEP for encryption 

If you need to connect to an AP with WPA or WPA2 encryption 
requirements then you must use wpa_supplicant. 

```sh
 iw help 
 # mostra l'help
```
```sh
 iw list 
 # mostra informazioni dettagliate sull'hardware, questo 
 # è utile per capire anche le modalità di lavoro supportate da 
 # una scheda di rete, ad esempio possiamo verificare se la nostra 
 # scheda di rete può funzionare da Access Point, questo è 
 # verificato se esiste la stringa "AP" nelle voci "Supported 
 # interface modes:" allora sicuramente può fare da Access Point
```
```sh
 iw dev 
 # mostra tutte le interfaccie wireless, questo mi 
 # mostrerà alcune informazioni come:
```

* Designated name: phy#1 

* Device names: wlan0 

* Interface Index: 4. Usually as per connected ports (which can 
    be an USB port). 

* Type: Managed. Type specifies the operational mode of the 
    wireless devices. managed means the device is a WiFi station 
    or client that connects to an access point.

```sh
 iw dev wlan scan 
 # esegue una scansione delle reti disponibili
```
```sh
 iw event 
 # si mette in ascolto di eventi
```
```sh
 iw event -f 
 # si mette in ascolto di eventi in tempo reale, 
 # utile per il debugging
```
```sh
 iw event -t 
 # si mette in ascolto di eventi in tempo reale, con 
 # informazioni anche sul tempo, utile per il debugging
```
```sh
 iw wlan0 connect apName 
 # si collega all'access point chiamato "
 # apName"
```
```sh
 iw wlan0 connect apName 2432 
 # si collega all'access point 
 # chiamato "apName", nel caso ci fossero più Access point con 
 # questo nome, in questo caso specifichiamo la frequenza dell'AP 
 # desiderato
```
```sh
 iw wlan0 connect apName keys 0:abcde d:1:0011223344 
 # si 
 # connette all'access point chiamato "apName" con encryption WEP 
 # attraverso la chiave menzionata
```
```sh
 iw dev wlan1 station dump 
 # mi da informazioni statistiche 
 # sulla connessione all'access point
```
```sh
 sudo iw dev wlan0 set power_save on 
 # imposta il power save
```
```sh
 iw dev wlan0 get power_save 
 # mi dice se sull'interfaccia 
 # specificata è impostato il power save
```
```sh
 iw dev moni0 del 
 # rimuove l'interfaccia moni0
```
```sh
 ip link show wlan0 
 # mostra info sull'interfaccia wlan0, se 
 # vedo la parola "DOWN", significa che l'interfaccia è spenta, 
 # mentre se vedo "UP", significa che l'interfaccia è attiva
```
```sh
 ip link set wlan0 up 
 # attiva l'interfaccia wlan0
```
```sh
 iw wlan0 link 
 # mostra se l'interfaccia è collegata a qualcosa 
 # o meno
```
```sh
 iw wlan0 scan 
 # esegue una scansione delle reti disponibili
```
```sh
 iw reg set US 
 # sets the power level of the wifi card on US 
 # level
```
```sh
 iwconfig wlan0 txpower 27 
 # changes the power level to 27dBm, 
 # only if for the current selected country is allowed this power 
 # level, if not, we can still change the country
```
```sh
 iw reg set BO 
 # sets the power level of the wifi card on 
 # Bolivia
```
```sh
 iwconfig wlan0 txpower 28 
 # changes the power level to 27dBm, 
 # only if for the current selected country is allowed this power 
 # level, if not, we can still change the country
```
```sh
 ifconfig wlan1 down; iwconfig wlan0 mode monitor 
 # imposta la 
 # scheda di rete in modalità monitor (per sniffare il traffico)
```
```sh
 ifconfig wlan1 down; iwconfig wlan0 mode managed 
 # imposta la 
 # scheda di rete in modalità managed (modalità classica che 
 # utilizziamo per connetterci ad un access point)
```
Per connetterci ad una rete WPA/WPA2, una volta che l'interfaccia 
di rete wireless è attiva eseguiamo:

```sh
 wpa_passphrase ApName myExampleApPassword >> /etc/wpa_supplicant.conf 
 # salva un file di configurazione che 
 # può essere utilizzato da wpa_supplicant per connettersi alla 
 # rete wifi wpa/wpa2
```
```sh
 wpa_supplicant -B -D nl80211,wext -i wlan0 -c /etc/wpa_supplicant.conf 
 # dove:
 # * -B means run wpa_supplicant in the background 
 # * -D specifies the wireless driver, wext is the generic driver
 # * -c specifies the path for the configuration file.
```
se questo non dovesse essere abbastanza allora eseguiamo:

```sh
 dhclient wlan0 
 # eseguiamo una richiesta DHCP all'interfaccia 
 # wlan0
```
Ricordiamo che alcuni device wifi usano un vecchio driver 
chiamato "wext" (wireless extension) e non i più recenti nl80211, 
per verificare se il nostro kernel ha abilitato il supporto wext 
possiamo eseguire:

```sh
 zgrep WEXT /proc/config.gz 
 # dove il percorso menzionato deve 
 # essere il file di configurazione del kernel
```
Per scrivere gli script o ottenere informazioni sulla rete wifi, 
possiamo usare "wgetid", è un tool che ci fornisce informazioni 
in modo molto chiaro e veloce, molto utile per ottenere 
informazioni, ad esempio con "iwgetid -r" per ottenere il nome 
dell'access point a cui sono connesso.


### Arp

Possiamo visualizzare la tabella di associazione indirizzo IP, 
mac address locale interrogando il sistema con:

```sh
 sudo arp 
 # visualizza la tabella locale del sistema
```
oppure effettuare interrogazione in funzione di un indirizzo IP 
con:

```sh
 sudo arp 192.168.0.1 
 # visualizza il mac address dell'indirizzo 
 # IP menzionato
```
### Modalità wireless 802.11


Questo protocollo prevede 4 modalità operative:

* Master mode (also called AP or infrastructure mode) is used to 
  create a service that looks like a traditional access point. 
  The wireless card creates a network with a specified name 
  (called the SSID) and channel, and offers network services on 
  it. While in master mode, wireless cards manage all 
  communications related to the network (authenticating wireless 
  clients, handling channel contention, repeating packets, etc.) 
  Wireless cards in master mode can only communicate with cards 
  that are associated with it in managed mode.
* Managed mode is sometimes also referred to as client mode. 
  Wireless cards in managed mode will join a network created by a 
  master, and will automatically change their channel to match 
  it. They then present any necessary credentials to the master, 
  and if those credentials are accepted, they are said to be 
  associated with the master. Managed mode cards do not 
  communicate with each other directly, and will only communicate 
  with an associated master. 
* Ad-hoc mode creates a multipoint-to-multipoint network where 
  there is no single master node or AP. In ad-hoc mode, each 
  wireless card communicates directly with its neighbors. Nodes 
  must be in range of each other to communicate, and must agree 
  on a network name and channel. 
* Monitor mode is used by some tools (such as Kismet, chapter 
  six) to passively listen to all radio traffic on a given 
  channel. When in monitor mode, wireless cards transmit no data. 
  This is useful for analyzing problems on a wireless link or 
  observing spectrum usage in the local area. Monitor mode is not 
  used for normal communications. 


### Network Manager

Un comune software per la gestione delle connessioni è network 
manager, questo può essere usato in tre modalità:

```sh
 nm-applet 
 # modalità grafica
```
```sh
 nmtui 
 # interfaccia tui, molto intuitiva e comoda
```
```sh
 nmcli 
 # programma utilizzato sia da terminale che negli script
```
siccome i primi due sono molto intuitivi e non hanno bisogno di 
ulteriore documentazione per le operazioni di base ci 
focalizzeremo sul terzo.


### nmcli

Vediamo alcuni comandi di base di nmcli:

```sh
 nmcli device wifi list 
 # mostra la lista degli access point wifi
```
```sh
 nmcli device wifi rescan 
 # rieffettua lo scan degli access point disponibili
```
```sh
 nmcli device wifi connect <SSID|BSSID> 
 # ci connettiamo ad una rete wifi aperta
```
```sh
 nmcli device wifi connect <SSID|BSSID> password <password> 
 # ci connettiamo ad una rete protetta sia wpa1 che wpa2
```
```sh
 nmcli device status 
 # mostra lo stato delle varie connessioni e 
 # lo stato dei device di rete, ad esempio se sono connesso e a 
 # quale rete sono connesso con quale device
```
```sh
 nmcli connection show 
 # visualizza la lista delle connessioni
```
```sh
 nmcli connection edit con-name <name of new connection> 
 #  crea una nuova connessione chiamata con un nome deciso da noi
```
```sh
 nmcli connection edit <connection name> 
 # modifica la connessione identificata col nome menzionato
```
```sh
 nmcli connection up id <connection name> 
 # mi collego alla connessione menzionata
```
```sh
 nmcli connection down id <connection name> 
 # mi scollego dalla connessione menzionata
```
il comando più utile è comunque:

```sh
 man nmcli-examples 
 # pagina di man con diversi esempi di applicazione
```


### Gestione della rete con Network Manager oppure no?

I file di configurazione di network manager sono situati nella 
directory:

```sh
 # /etc/NetworkManager
```
un file importante è "/etc/NetworkManager/system-connections" 
questo contiene tutte le password dei wifi a cui ci siamo 
collegati.

Per fare in modo di disabilitare network manager dobbiamo 
disabilitareil corrispettivo demone, con ad esempio:

```sh
 sudo systemctl disable NetworkManager.service
```
attenzione in quanto il file /etc/network/interfaces ci potrà 
sembrare strano quando gestiamo la rete con NetworkManager in 
quanto conterrà solo l'interfaccia di loopback, in realtà questo 
è normale, in quanto NetworkManager gestisce le interfacce a modo 
suo, comunque c'è un modo all'interno del file di configurazione 
per indicargli di leggere i file di configurazione di sistema. Si 
consiglia comunque di leggere il file qui sotto riportato per la 
gestione della configurazione di NetworkManager:

```sh
 less /usr/share/doc/network-manager/README 
 # visualizza la documentazione di network manager
```


### Bridge

Possiamo configurare un bridge, con due schede di rete ethernet 
(non wifi) attraverso il programma "brctl", per vedere le opzioni 
disponibili eseguiamo:

```sh
 brctl 
 # visualizza tutte le opzioni disponibili
```
vediamo altri esempi di applicazione del comando:

```sh
 brctl addbr br0 
 # crea il bridge chiamato br0
```
```sh
 brctl delbr br0 
 # elimina il bridge chiamato br0
```
```sh
 brctl addif br0 eth0 
 # aggiunge il device eth0 al bridge
```
```sh
 brctl addif br0 eth1 
 # aggiunge il device eth1 al bridge
```
```sh
 brctl show 
 # mostra i vari bridge configurati
```
```sh
 brctl showmacs br0 
 # mostra i mac address del bridge indicato
```
```sh
 ifconfig br0 up 
 # attiva l'interfaccia bridge
```
### Esempio di configurazione


Uno scenario d'esempio per configurare una macchina come bridge 
puro è:

```sh
 ifconfig eth0 0.0.0.0
```
```sh
 ifconfig eth1 0.0.0.0
```
```sh
 brctl addbr mybridge
```
```sh
 brctl addif mybridge eth0
```
```sh
 brctl addif mybridge eth1
```
```sh
 ifconfig mybridge up
```
in questo caso il bridge non avrà un proprio indirizzo IP, quindi 
non potremo farci accesso via TCP/IP, nel caso volessimo invece 
assegnargli un indirizzo IP, allora sostituiamo l'ultima 
istruzione con:

```sh
 ifconfig mybridge 192.168.100.5 netmask 255.255.255.0
```
oppure nel caso in cui volessimo assegnargli un indirizzo IP con 
il DHCP eseguiamo:

```sh
 dhclient mybridge
```


### Connessione Point to Point (PPP) tra due Host

Possiamo connettere due computer tramite cavo ethernet cross 
oppure tramite classico cavo "straight" se le schede di rete 
(almeno una delle due (da verificare)) lo permettono, la 
configurazione è semplicissima, basta effettuare sulla macchina 
A:

```sh
 sudo ifconfig eth0 192.168.0.5 
 # imposto un IP per la macchina A
```
mentre sulla macchina B

```sh
 sudo ifconfig eth0 192.168.0.6 
 # imposto un IP per la macchina B
```
la scelta dell'IP è arbitraria, ma è meglio ad esempio scegliere 
una rete diversa rispetto ad esempio ad un'altra interfaccia, 
cioè se ad esempio abbiamo su un'altra interfaccia wlan0 wireless 
l'indirizzo ip 192.168.1.4 non andrò ad impostare un indirizzo 
.1.x sulla mia interfaccia eth0, in modo da rendere più lineare 
possibile la comunicazione e non avere conflitti.


### Configurazione di rete su distro Debian based 

Nelle distro Debian-based le interfacce sono configurate 
attraverso il file "/etc/network/interfaces", e la directory "/etc/network/"
è dove sono collocati gli script di rete, vediamo 
un esempio di configurazione classico del file interfaces:

```conf
auto lo

iface lo inet loopback

#
auto eth0 
iface eth0 inet static #utilizza un ip statico
address 192.168.1.17
netmask 255.255.255.0
gateway 192.168.1.1
network 192.168.1.0
broadcast 192.168.1.255
dns-nameservers 192.168.1.195

# così imposto staticamente una voce della tabella di routing
up ip route add -net 192.168.1.128 netmask 255.255.255.128 gw 192.168.1.2 

up ip route add default gw 192.168.1.200
down ip route del default gw 192.168.1.200
down ip route del -net 192.168.1.128 netmask 255.255.255.128 gw 192.168.1.2
```

una volta modificato il file, ci basterà riavviare il servizio di 
rete attraverso:

```sh
 service networking restart 
 # o utilizzando il comando 
 # systemctl, anche se per grossi cambiamenti è più sicuro 
 # eseguire un reboot
```

Possiamo notare nel file che le linee che iniziano con "auto" 
servono ad identificare interfacce fisiche che vengono attivate 
col comando "ifup -a" o ad esempio negli script di sistema. Le 
riche "up" e "down" possono essere presenti per ogni interfaccia 
e indicano le operazioni da effettuare per "up" quando 
l'interfaccia viene accesa e per "down" quando l'interfaccia 
viene spenta, sono possibili anche direttive come "pre-up" e "post-down". 

Vediamo un altro esempio di file di configurazione:

```conf
auto lo
iface lo inet loopback
#
auto eth0 
iface eth0 inet dhcp # utilizza un indirizzo dhcp
gateway 192.168.1.1
```

In questo caso dopo inet viene specificata la direttiva "dhcp", 
quindi viene usato il dhcp al posto di un indirizzo statico come 
nel caso precedente. 

Vediamo ora un altro esempio:

```conf
auto lo iface lo inet loopback
auto wlan0 iface wlan0 inet static address 192.168.1.104 gateway 192.168.1.1 
\netmask 255.255.255.0 network 192.168.1.0 broadcast 192.168.1.255
pre-up sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf -D wext 
post-down sudo killall -q wpa_supplicant 
```

In questo caso andiamo a collegarci attraverso wpa_supplicant ad 
una rete wifi.

N.B.: Ricordiamo di consultare per esempi la pagina di man 
interfaces(5) con:

```sh
 man 5 interfaces 
 # visualizza la pagina di man del file 
 # interfaces per la configurazione della rete su distro Debian based
```


### Configurazione di rete su distro Red-Hat based

Nelle distro basate su Red-Hat le configurazioni delle interfacce 
sono collocate in "/etc/sysconfig/network-scripts", in questa 
directory abbiamo molti script e file, quelli che interessano 
maggiormente a noi possiamo visualizzarli con:

```sh
 ls -al ifcfg* 
 # per configurazione indirizzo/subnet/gw
```
```sh
 ls -al route* 
 # per configurazione voci della tabella di 
 # routing
```
troveremo un file per ogni interfaccia, supponiamo di avere 
un'interfaccia chiamata "eth0", allora avremo qualcosa del tipo "
ifcfg-eth0", aprendo questo file con un editor di testo, possiamo 
visualizzare le diverse opzioni, vediamo ad esempio un file che 
imposta un indirizzo ip statico:

```conf
DEVICE=eth0 
BOOTPROTO=none 
ONBOOT=yes 
NETWORK=10.0.1.0 
NETMASK=255.255.255.0 
IPADDR=10.0.1.27 
USERCTL=no
```

vediamo ora invece un file che utilizza dhcp per l'indirizzo ip:

```conf
DEVICE=eth0 
BOOTPROTO=dhcp
ONBOOT=yes
```

per impostare invece una voce nella tabella di routing avremo un 
file tipo "route-eth0" così costruito:

```conf
10.10.20.0/24 via 192.168.50.100 dev eth0
```
per riavviare i servizi di rete ad esempio dopo una modifica, 
eseguiamo:

```sh
 sudo /etc/init.d/network restart 
 # riavvia il servizio di rete, 
 # anche se per grossi cambiamenti è più sicuro eseguire un reboot
```

### Route & IP Route

Il comando "route" ci mostrerà il routing attivo sul nostro 
sistema, il comando mostra di default diverse colonne, ma le più 
importanti sono:
 * **Destination**: Mostra la destinazione, per "default" si intende 
   reste del mondo
 * **Gateway**: Indica l'indirizzo di gateway utilizzato per accedere 
   agli indirizzi indicati da "Destination"
 * **Genmask**: Indica la subnet mask utilizzata
 * **Flags**: Mostra diversi flag, possiamo leggere una breve 
   descrizione eseguendo "man route" e andando a leggere la 
   sezione "Flags":
    * U: Questo flag indica che questa voce di routing è "Up", cioè 
        attiva

    * G: Questo flag indica che questa voce di routing è relativa 
        al gateway, se questa voce non è presenta vuol dire che le 
        due reti menzionate sono connesse direttamente

    * H: Questo flag indica che la destinazione è un host, se non è 
        presente, allora vuol dire che la destinazione è un intero 
        network

    * D: Questo flag indica che questa voce della tabella di 
        routing è stata creata da un redirect

    * M: Questo flag indica che questa voce della tabella di 
        routing è modificata da un redirect
 * **Iface**: Indica l'interfaccia per cui è valida la regola di routing


Per gli altri campi, basterà leggere il manuale del comando "route".
Per vedere la tabella di routing, eseguiamo:

```sh
 route -n 
 # mostra la tabella di routing, ma ho bisogno dei 
 # permessi di root
```
Un'alternativa a route, se non si hanno i diritti di root e si 
vuole comunque visualizzare la tabella di routing è:

```sh
 netstat -rn 
 # mostra informazioni di routing, senza i permessi 
 # di root
```

Vediamo alcune applicazioni dei comandi di routing:
```sh
 route add default gw 192.168.1.1 
 # aggiunge "add" una voce alla 
 # tabella di routing imposta come destinazione "default" e come 
 # gateway "192.168.1.1"
```
```sh
 route add -host 192.168.1.3 reject 
 # aggiunge una voce alla 
 # tabella di routing, atta a rendere non raggiungibile l'host 
 # 192.168.1.3, nei flag vedremo "!H"
```
```sh
 route add -net 192.168.1.0 netmask 255.255.255.0 reject 
 # aggiunge una voce alla tabella di routing, atta a rendere non 
 # raggiungibile l'intero network 192.168.1.0, nei flag vedremo "
 # !H"
```
```sh
 route del default gw 192.168.1.1 
 # rimuove una voce dalla 
 # tabella di routing, quella avente come destinazione "default" e 
 # gateway "192.168.1.1", per rimuovere una voce in pratica 
 # aggiungo gli stessi campi come se la stessi reinserendo, solo 
 # che al posto della voce "add" metto "del"
```
```sh
 route add -net 10.1.5.0 netmask 255.255.255.0 gw 192.168.1.5 
 # rende raggiungibile la rete 10.1.5.0 attraverso il default 
 # gateway 192.168.1.5
```
```sh
 route del -net 10.1.5.0 netmask 255.255.255.0 gw 192.168.1.5 
 # rimuove la voce inserita nell'esempio precedente
```
In realtà oggigiorno, "route" è deprecato, ed è consigliato 
l'utilizzo di "ip route", che ha comunque sintassi simile al 
comando precedente, basta solo aggiungere davanti "ip".

You can use the route command's "-ifscope" option to bind a route 
to a specific interface. This lets you create multiple routes 
that point to the same destination, differentiated only by which 
interface is in play. Routes so bound show up in netstat output 
with the I flag.


### Ping

Ping è un programma utilizzato a diversi scopi, possiamo testare 
reti per connettività, per misurare la congestione all'interno di 
una rete, scoprire indirizzi ip di hostname e in genere misurare 
la qualità di una rete. Vediamo alcuni esempi di ping:

```sh
 ping www.nomesito.com 
 # esegue un ping al sito indicato
```
```sh
 ping -a www.nomesite.com 
 # esegue un ping audibile, cioè emette 
 # un beep, quando il target diventa disponibile, utile per 
 # troubleshooting all'interno di una rete, in cui stiamo facendo 
 # manutenzione, in modo che non dobbiamo rieseguire il comando 
 # per verificare se il target è raggiungibile o no
```
```sh
 ping -A www.nomesito.com 
 # esegue un ping adattativo, cioè le 
 # richieste si adattano al Round Trip Time, dobbiamo stare 
 # attenti in quanto potrebbe appesantire un server con richieste 
 # molto frequenti
```
```sh
 ping -c 10 www.nomesito.com 
 # esegue 10 ping
```
```sh
 ping -c 5 -q 127.0.0.1 
 # l'opzione "-q" permette di stampare a 
 # schermo solo il sommario del traffico generato
```
```sh
 ping -w 10 www.nomesito.com 
 # l'opzione "-w" specifica una 
 # deadline in termini di tempo (in secondi), quindi in questo 
 # caso manderemo pacchetti per 10 secondi
```
```sh
 ping -i 2 www.google.it 
 # con l'opzione "-i" specifico 
 # l'intervallo alla quale mandare pacchetti in secondi, in questo 
 # caso mando un ping ogni 2 secondi
```
```sh
 ping -f www.nomesito.com 
 # esegue ping in modalità "flood", 
 # manda pacchetti il più velocemente flessibile, bisogna avere i 
 # permessi di root per poter lanciare questo comando, e dobbiamo 
 # stare attenti in quanto potrebbe appesantire un server con 
 # richieste molto frequenti
```

```sh
 ping -b <broadcast_address>
 # esegue ping su tutti gli host nella sottorete, questo e' un buon metodo
 # per capire quali sono gli host attivi in una sottorete
```


```sh
 ping -f -i 2 www.nomesito.com 
 # esegue ping in modalità "flood"
 # , ma manda un pacchetto ogni intervallo di 2 secondi
```
```sh
 ping -n www.nomesito.com 
 # esegue ping ma non effettua "name 
 # resolution"
```
```sh
 ping -q www.nomesito.com 
 # esegue ping senza visualizzare 
 # output su schermo, e visualizzerà in questo caso il risultato 
 # del ping solo quando il processò verrà terminato
```
```sh
 ping -s 100 www.nomesite.com 
 # con il flag "-s" (size) cambio 
 # la dimensione del payload ICMP dei pacchetti mandati, la 
 # dimensione di default in questione è 56 byte, in questo caso 
 # questa dimensione viene cambiata a 100 byte, dobbiamo ricordare 
 # che l'header dell'ICMP ha una dimensione di 8 byte, inoltre 
 # quando viene considerato il pacchetto nella sua dimensione 
 # totale dobbiamo aggiungere l'header del pacchetto IP che è 20 
 # byte, quindi di default abbiamo 56+8+20 (byte), mentre nel caso 
 # in questione la dimensione totale sarà 100+8+20 (byte)
```
```sh
 ping -f -i .5 -c 100 www.nomesito.com > results.txt 
 # esegue un 
 # ping in modalità flood con intervallo ogni mezzo secondo 
 # eseguendo in totale 100 richieste di ping al sito indicato e 
 # stampa i risultati nel file "results.txt"
```
```sh
 ping -t 1 www.nomesite.com 
 # esegue un ping impostando il ttl a 
 # "1", questo è molto utile ad esempio come "hack" quando non 
 # possiamo eseguire un traceroute con ICMP, allora possiamo 
 # sfruttare il ping per effettuare un traceroute andando mano a 
 # mano a modificare il valore di TTL da 1 fino a "n" dove per "n" 
 # si intende un nodo per cui anche incrementando il TTL rimane 
 # invariato
```
```sh
 ping hop1 hop2 hop3 .. hopN destination 
 # in questo modo sto 
 # scegliendo il percorso attraverso il quale eseguire il ping, 
 # molto utile per eseguire troubleshooting
```
```sh
 ping -R www.nomesito.com 
 # mostra tutti gli host che vengono 
 # attraversati, utile per capire gli spostamenti del pacchetto
```
Un comando utile durante il ping è "Ctrl+|", questo manda un 
segnale di SIGQUIT al processo e mostra una statistica breve al 
momento dell'invio del segnale, il processo intanto continua con 
la sua normale procedura.

### Informazioni sul DNS e Traceroute


#### Traceroute

Per poter visualizzare i vari host attraversati per arrivare ad 
un certo percorso di rete, possiamo utilizzare traceroute:

```sh
 traceroute www.example.com 
 # esegue un traceroute 
 # sull'indirizzo indicato
```
che è analogo a:

```sh
 traceroute www.example.com -U 
 # esegue un traceroute 
 # utilizzando il protocollo UDP, questa opzione su sistemi 
 # GNU/Linux può essere omessa, in quanto di default è quello che 
 # avviene
```
talvolta il traceroute potrebbe mostrare degli asterischi su 
alcuni host, questo è perchè non si riceve risposta da quelle 
macchine, questo può essere dovuto a diverse ragioni:

 * il nodo filtra i pacchetti UDP o ICMP
 * tempo di timeout troppo breve
 * il nodo non risponde a pacchetti che hanno TTL=0 con il 
   pacchetto "TTL exceeded" e quindi non si riceve risposta

esistono alcune possibili soluzioni, una possibile soluzione al 
primo problema è cambiare il protocollo utilizzato dal 
traceroute, infatti su GNU/Linux di default viene utilizzato il 
protocollo UDP, ma può essere cambiato con:

```sh
 traceroute www.example.com -T 
 # esegue un traceroute con il 
 # protocollo TCP
```
```sh
 traceroute www.example.com -I 
 # esegue un traceroute 
 # utilizzando il protocollo ICMP
```
```sh
 traceroute www.example.com -U 
 # esegue un traceroute 
 # utilizzando il protocollo UDP, è l'opzione di default quindi 
 # può anche essere omessa
```
una possibile soluzione invece per il tempo di timeout, potrebbe 
essere cambiarlo, questo può essere fatto con:

```sh
 traceroute www.example.com -w 10 -T 
 # imposto il tempo di 
 # timeout a 10 secondi e utilizzo il protocollo TCP
```
  Spigazione dell'output di traceroute

Nell'output vedremo righe come questa:

```text
fra07s31-in-f23.1e100.net (173.194.112.151)  27.287 ms  26.825 ms 28.280 ms
```

in cui nella prima colonna c'è il nome dell'host, o l'indirizzo 
IP se l'host non ha un nome specifico, nella seconda colonna, 
l'indirizzo IP, nelle tre colonne successive i vari tempi di RTT, 
il traceroute procede finchè i tre pacchetti mandati non sono 
persi per più di due volte e quindi il percorso non può essere 
valutato. Vediamo un altro esempio di possibile riga risultante 
da traceroute:

```text
10.254.0.105 (10.254.0.105)  50.172 ms  50.353 ms 10.254.0.109 (10.254.0.109)  51.629 ms
```

in questo caso, possiamo vedere che al primo e al secondo RTT 
veniamo collegati all'indirizzo IP 10.254.0.105, ma al terzo RTT 
passiamo per un altro indirizzo IP, questo può essere dovuto alla 
configurazione della rete, un esempio potrebbe essere uno 
scenario in cui viene effettuato un load balancing, è doveroso 
ricordare che generalmente richieste diverse possono essere 
reindirizzate a macchine diverse, bisogna anche considerare che i 
router effettuano calcoli di percorsi ottimali e scelgono il 
percorso più veloce in funzione dell'algoritmo utilizzato, quindi 
la scelta del percorso può dipendere da vari fattori, solitamente 
i router ad esempio scelgono come prossima macchina quella meno 
congestionata, o quella con la banda più larga che porta il 
pacchetto un hop più vicino alla destinazione.

N.B.: Ricorda che quando si esegue un traceroute ad un sito ad 
esempio www.fsf.org, il primo indirizzo molto probabilmente è il 
gateway locale, subito dopo abbiamo l'indirizzo del nodo di 
accesso del nostro provider e poi una sfilza di indirizzi privati 
appartenenti alla rete locale del nostro provider, fino a quando 
non si esce, e si passa su altri server esterni per arrivare poi 
infine alla destinazione finale.

A volte il primo indirizzo trovato in un traceroute non 
corrisponde a quello del gateway, una delle probabili cause è il 
protocollo (VRRP) Virtual Router Redundancy Protocol, in pratica 
secondo questo protocollo permette una struttura di rete più 
robusta, questo è reso possibile dalla creazione di router 
virtuali, che sono una rappresentazione astratta di un insieme di 
router, es. master e backup router, che opera come un gruppo. Il 
default router assegnato ad un host è il router virtuale, non il 
router fisico. Se il router fisico che sta attualmente 
instradando si rompesse, un altro router fisico verrebbe 
selezionato per rimpiazzarlo. Il router fisico che sta inoltranto 
i pacchetti in un dato istante è detto master router. 

Un altro protocollo simile a VRRP è Hot Standby Router Protocol 
(HSRP) ma è proprietario e di Cisco.

Or still another option is the Common Address Redundancy Protocol 
or "CARP" is a computer networking protocol which allows multiple 
hosts on the same local area network to share a set of IP 
addresses. Its primary purpose is to provide failover redundancy, 
especially when used with firewalls and routers. In some 
configurations, CARP can also provide load balancing 
functionality. CARP provides functionality similar to VRRP and to 
Cisco Systems' HSRP. It is implemented in several BSD-based 
operating systems and has been ported to Linux.

Un'alternativa a traceroute più completa è costituita da 
programmi come "mtr" che forniscono anche statistiche, per capire 
qual'è il collo di bottiglia su una rete.

##### Motivo per asterischi in traceroute indipendentemente dal protocollo

```text
This is because some machines don't send ICMP "TTL exceeded" 
errors, that's all to not respond to ICMP or that 

<srandon111> ok but what about TCP ? and UDP ? 

<grawity> it has nothing to do with what protocol the original 
packets use 

<grawity> no matter what you send, traceroute works by receiving 
*error messages* back 

<grawity> and those are always ICMP

<grawity> maybe some routers don't generate those error packets, 
or maybe they have a firewall preventing them from being sent 
<UncleDrax> or it's being throttled (since responding to ICMP 
takes CPU a very busy router has other things to do with)
```

##### Traceroute senza root, ovvero tracepath

Nel caso non avessimo i permessi di root, possiamo eseguire:

```sh
 tracepath www.example.com 
 # esegue un traceroute più semplice 
 # senza permessi di root
```
un'altra alternativa piu' completa di traceroute e' `mtr`.

#### DNS

Per avere informazioni sul DNS eseguiamo:

```sh
 host www.example.com
```
o per un esame più avanzato sul DNS eseguiamo:

```sh
 dig www.example.com
```

Possiamo eseguire un whois enumeration per avere alcuni
dettagli sul dominio con:

```sh
whois example.com
```


```sh
 dig a example.com @nameserver
 # eseguo una query di tipo A utilizzando come nameserver quello indicato
```

```sh
 dig mx example.com @nameserver
 # eseguo una query di tipo MX utilizzando come nameserver quello indicato
```

```sh
 dig axfr example.com @nameserver
 # eseguo un zone transfer, questo non dovrebbe essere possibile su una rete
 # esterna
```


possiamo anche eseguire dei reverse lookups con:

```sh
 host 66.11.33.112
```
```sh
 dig -x 66.11.33.112 
 # esegue un reverse lookup
```
```sh
 dig www.ciao.it 
 # esegue una query di tipo A per l'hostname 
 # menzionato
```
```sh
 dig -t A www.ciao.it 
 # analogo al precedente, ma specifichiamo esplicitamente
 # il tipo di query
```
```sh
 dig -t MX www.ciao.it 
 # esegue una query di tipo MX per localizzare i server mail
```
```sh
 dig -t A www.ciao.it +nocomments +noauthority 
 # rimuove 
 # dall'output i commenti e la sezione authority, in genere la 
```
In genere i vari switch che possiamo utilizzare con dig per disabilitare o
abilitare sezioni di output sono:
* `+nocomments` -- Turn off the comment lines 
* `+noauthority` -- Turn off the authority section 
* `+noadditional` -- Turn off the additional section 
* `+nostats` -- Turn off the stats section 
* `+noanswer` -- Turn off the answer section (Of course, you 
    wouldn’t want to turn off the answer section)
* `+noall` - Turn off everything, this is in general used to be 
    coupled with +answer so to only display the answer section

```sh
 dig @8.8.8.8 www.google.com A 
 # eseguo una query di tipo A 
 # utilizzando come resolver il server all'indirizzo 8.8.8.8
```
```sh
 dig PTR 33.164.60.185.in-addr.arpa 
 # esegue una query di tipo PTR
 #  all'indirizzo IP 33.164.60.185
```
```sh
 dig MX google.com 
 # esegue una query di tipo MX
```
```sh
 dig www.ciao.it +trace +additional 
 # vediamo tutte le risposte 
 # anche quelle "additional" in modo da vedere anche le risposte 
 # parziali
```
```sh
 dig www.ciao.it +short 
 # To view just the ip-address of a web 
 # site (i.e the A record), use the short form option as shown 
 # below.
```
```sh
 dig axfr @10.10.10.13 esempio.it 
 # implementa uno 
 # zone-transfer, in pratica se sappiamo che la macchina 
 # all'indirizzo IP 10.10.10.13 hosta come sito esempio.it e ha la 
 # porta 53 DNS in tcp aperta, è possibile a in certi casi 
 # effettuare uno zone transfer, in questo caso avremo in output 
 # la lista di tutte le entri relative al server dns, cioè una 
 # lista di host disponibili
```
```sh
 host -t axfr zonetransfer.me nsztm1.digi.ninja. 
 # implementa 
 # uno zone-transfer utilizzando host
```
Possiamo provare uno zone-transfer utilizzando il sito messo a
disposizione `zonetransfer.me`.

un comando alternativo a "dig" comune agli utenti Microsoft 
Windows ma disponibile anche per GNU/Linux è nslookup, possiamo 
in basilare eseguirlo con:

```sh
 nslookup www.google.it 
 # risolve www.google.it
```
E' da notare che dig ed nslookup potrebbero fornire due output 
diversi, questo è dovuto al fatto che dig utilizza lo stub 
resolver del Sistema Operativo mentre nslookup ne implementa uno 
tutto suo.

Il programma nslookup comunque fornisce una riga di comando tutta sua, ad
esempio nel caso volessimo avere informazioni sul dominio ebay.it,
possiamo procedere con i seguenti comandi:
```sh
nslookup
set querytype=any
ebay.com
```

oppure possiamo fare query piu' specifiche come ad esempio:
```sh
nslookup
set querytype=A
ebay.com
```

Ad ogni modo per ottenere velocemente informazioni dns su un dominio 
che non conosciamo possiamo usare "dnsdumpster.com"


### Netcat

Netcat è il coltellino svizzero dell'amministratore di rete, ci 
permette di gestire connessioni in senso lato, possiamo 
utilizzarlo per aprire dei stream in rete, effettuare chat 
primitive, o addirittura scambiare file, costruire server, 
effettuare particolari richieste, eccetera.

#### Semplice comunicazione su una porta (Chat Primitiva)

Se per esempio volessimo comunicare sulla porta "3333" allora sul 
server eseguiamo:

```sh
 netcat -l 192.168.1.122 3333 
 # l'opzione "-l" sta per listen ed 
 # è quella che ci permette di implementare server
```
mentre sul client eseguiamo:

```sh
 netcat 192.168.1.122 3333
```
a questo punto tutto quello che scriviamo da una parte lo vediamo 
dall'altra.

####  Semplice Server Web

Possiamo ad esempio creare un semplice file chiamato myFile.html 
così strutturato:

```http
HTTP/1.0 200 OK

<html>
<body>
<h1>Prova...</h1>
</body>
</html>
```

ora una volta creato questo file possiamo eseguire:

```sh
 netcat -l ourIPAddress portOnWhichToListen < myFile.html 
 #  
 # questo si metterà in ascolto sull'interfaccia alla quale è 
 # collegato l'indirizzo IP, e alla porta specificata un server 
 # web con la pagine myFile.html, attenzione dopo che un'utente 
 # carica il sito, il server va giu
```
####  Trasferimento File

Se da un server avente indirizzo 192.168.1.122 volessimo 
trasferire un file dalla porta 3333, eseguiamo:

```sh
 cat backup.iso | netcat -l 192.168.1.122 3333
```
mentre sul client eseguiamo:

```sh
 netcat 192.168.1.122 3333 > backup.iso
```
Purtroppo netcat non mostra nessuna barra di progresso, per 
questo possiamo utilizzare un programmino esterno chiamato "pv" 
(da installare) e questa volta da server effettuare:

```sh
 cat backup.iso | pv -b | nc -l 192.168.1.122 3333
```
mentre da client eseguire:

```sh
 nc 192.168.1.122 3333 | pv -b > backup.iso
```

####  Netcat come Port Scanner

Anche se non è lo strumento più indicato per agire da port 
scanner, può essere utilizzato in assenza di altro, ad esempio:

```sh
 nc -z 192.168.0.1 80-90 
 # esegue un port scan sull'ip indicato 
 # dalla porta 80 alla porta 90
```
### Telnet


Vediamo un comando che funge quasi da alternativa a netcat, 
questo è telnet, per connetterci ad un host eseguiamo:

```sh
 telnet pel.unipv.it 80 
 # si connette all'host richiesto con la 
 # porta specificata
```
### Wget


Wget è un programma molto utile per scaricare qualsiasi cosa dal 
web, ad esempio:

```sh
 wget http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2 
 # scarica il file specificato
```
```sh
 wget -O taglist.zip http://www.vim.org/scripts/download_script.php?src_id=7701 
 # scarica il file specificato e lo salva col nome menzionato 
 # col flag "-O", che sta per "output"
```
```sh
 wget --limit-rate=200k http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2 
 # imposta un limite di velocità in download
```
```sh
 wget -c http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2 
 # scarica il file, se è già stato parzialmente scaricato, 
 # continua dall'ultimo punto di interruzione
```
```sh
 wget -b http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2 
 # scarica in background, e crea un file chiamato wget-log, 
 # possiamo osservarlo con "tail -f wget-log"
```
```sh
 wget --user-agent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3" URL-TO-DOWNLOAD 
 # scaricare un file, fingendo di essere un browser, in quanto 
 # alcuni server non permettono il download se non si è in un 
 # browser
```
```sh
 wget --tries=75 DOWNLOAD-URL 
 # imposta un numero di tentativi 
 # per il download, dovrebbe essere interessante se combinato con "
 # -c"
```
```sh
 wget -i download-file-list.txt 
 # scatica tutti gli url 
 # contenuti nel file menzionati, "-i" sta per "input"
```
```sh
 wget --mirror -p --convert-links -P ./LOCAL-DIR WEBSITE-URL 
 # scarica un sito web nella sua interezza
```
```sh
 wget --reject=gif WEBSITE-TO-BE-DOWNLOADED 
 # scarica un sito 
 # senza determinati tipi di file
```
```sh
 wget -r -A.pdf http://url-to-webpage-with-pdfs/ 
 # scarica 
 # ricorsivamente "-r" tutti i file con estensione ".pdf" nella 
 # pagina specificata
```
```sh
 wget -r www.sitoweb.com/paginaACaso/ 
 # scarica ricorsivamente 
 # tutti i file presenti in questa pagina
```
```sh
 wget ftp-url 
 # scarica un url ftp
```
```sh
 wget --ftp-user=USERNAME --ftp-password=PASSWORD DOWNLOAD-URL 
 # scarica un url ftp, con accesso credenziali
```
```sh
 wget --user=vivek --password='myPassword' http:#theos.in/protected/area/foo.pdf 
 # Scarica un file che ha 
 # bisogno di credenziali su un server per essere scaricato
```
```sh
 wget -r -l 2 www.website.com 
 # scarica il sito web, con un 
 # livello di profondità uguale a 2, mentre utilizzando --mirror, 
 # il livello di profondità è infinito
```


### Curl

curl is a tool to transfer data from or to a server, using one of 
the supported protocols (DICT, FILE, FTP, FTPS, GOPHER, HTTP, 
HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, 
SFTP, SMB, SMBS, SMTP, SMTPS, TELNET and TFTP). The com‐ mand is 
designed to work without user interaction. Curl is very important 
we can think about curl as the netcat for web applications.

curl offers a busload of useful tricks like proxy support, user 
authentication, FTP upload, HTTP post, SSL connections, cook‐ 
ies, file transfer resume, Metalink, and more. Curl is a linux 
utility that is used to make HTTP requests to a given url. It 
outputs HTTP response to standard output and is actually very 
easy to use. Here are some examples to show its usage:

```sh
 curl www.website.com 
 # visualizza la pagina HTML del sito, di 
 # default esegue il comando HTTP GET
```
```sh
 curl --request GET 'http:#ciao.it' 
 #  questo fa la stessa cosa 
 # del precedente, cioè esegue una richiesta GET alla locazione 
 # indicata
```
vediamo altri esempi:

```sh
 curl --request POST 'http:#www.somedomain.com/' 
 # l'opzione 
 # --request può essere sostituito dal flag -X 
```
```sh
 curl -XDELETE 'http://www.somedomain.com/' 
```
```sh
 curl -XPUT 'http://www.somedomain.com/' 
```
possiamo mandare dei dati in "POST" attraverso il flag "-d", ad 
esempio:

```sh
 curl -XPOST 'http://localhost:9200/_count?pretty' -d ' { "query": { "match_all": {} } } ' 
 # in questo caso mandiamo JSON 
 # in POST, ma qualsiasi dato volessimo mandare in POST possiamo 
 # farlo attraverso il flag "-d"
```
dovremmo poterci autenticare con HTTP attraverso 
un'autenticazione basic o digest attraverso:

```sh
 curl -u username:password http://awebsite.com 
 # basic authentication
```
```sh
 curl --digest -u username:password http://awebsite.com 
 # digest authentication
```
Nel caso volessimo eseguire una richiesta attraverso
un proxy possiamo fare uso del flag `-x`. Ad esempio:
```sh
 curl -x http://localhost:8080 -XPOST www.google.it -d "param1=ciao&param2=esempio"
 # esegue una richiesta attraverso il proxy in ascolto sulla
 # porta 8080 attraverso il flag '-x' e poi utilizzando 
 # il metodo POST e inserendo nel body della richiesta 
 # i parametri indicati col parametro '-d'
 # un'alternativa al flag -x e' l'opzione --proxy
```
A volte i proxy hanno credenziali di accesso,
possiamo specificarle con curl semplicemente in questo
modo:

```sh
 curl -x http://proxy_server:proxy_port --proxy-user \
 username:password http://url.com
 # esegue una richiesta attraverso il proxy indicato
 # utilizzando le credenziali specificate attraverso  
 # l'opzione --proxy-user
```

Se il proxy e' di tipo socks e quindi non http, possiamo
indicarlo con:
```sh
 curl --socks5 http://url:8080 http://example.com/
 # usa un proxy di tipo socks5 per eseguire una richiesta
 # all'url example.com
```

Ricordiamoci che a volte i webserver rispondono con un
messaggio che indica una location, con un response code
di tipo 3XX, per seguire la location possiamo utilizzare
il flag `-L` o l'opzione `--location`. Ad esempio:

```sh
 curl -L http://example.com/
 # in questo caso seguiamo un'eventuale
 # redirection che avviene con dei response code 3XX
```

Altri esempi:

```curl
http methods                    curl -XTRACE  <url> 

x-forwarded-for                 curl -H "X-Forwarded-For: 10.0.0.1" <url>  

basic authentication            curl -u <user>:<password> <url> 

post form                       curl -XPOST --form "b=4_1" <url>  
        
cookie                          curl --cookie "PHPSESSID=5ved46gn34dopkjhstrrfgdkk1;" <url> 

cookie files (save & send)      curl -c /tmp/cookie.txt -b /tmp/cookie.txt <url> 

set user-agent                  curl -A "Mozilla" <url> 

referer                         curl -H "Referer: https:#www.cnn.com" <url> 

json                            curl -XPOST -H "Content-Type: application/json" -d "[[\"create\",{\"type\":\"trial\",\"name\":\"bug\"}]] <url> 

silent                          curl -s <url> 

verbose                         curl -v <url> 

ignore certifikate issues       curl -k <url> 

follow redircts                 curl -L <url> 

redirect output into file       curl -o <file> <url> 

curl with proxy                 curl -x <proxy>:<port> <url> 

curl SSL V3                     curl -k -v --sslv3 <url>  

curl max time (4 seconds)       curl -m4 <url> 

file upload                     curl -XPOST -F ul=30000 -F location=/tmp/upload-form-data.txt -F userfile=@/tmp/upload-file.txt <url> 

shell-shock                     curl -k -L -H 'User-Agent: () { :;}; curl -L  <return-server>;'  <url> 

post data from file             curl -data '@<filename>' <url> 

curl output response time       curl -o /dev/null -w%{time_connect}:%{time_starttransfer}%{time_total} <url> 

curl output request size        curl -o /dev/null -w%{size_request} %{size_upload} <url>  

curl output http status code    curl -o /dev/null -w%%{http_code} <url> 

curl resolve ip from other dns  curl --resolve "www.cnn.com:80:8.8.8.8" http://www.cnn.com 
```

Let's see other typical usage of curl:

```curl
curl http://curl.haxx.se 
curl http://site.{one,two,three}.com   
curl ftp://ftp.numericals.com/file[1-100].txt   
curl ftp://ftp.numericals.com/file[001-100].txt   
curl ftp://ftp.letters.com/file[a-z].txt  
curl http://any.org/archive[1996-1999]/vol[1-4]/part{a,b,c}.html  
curl http://www.numericals.com/file[1-100:10].txt   
curl http://www.letters.com/file[a-z:2].txt  
curl -o index.html http://curl.haxx.se/   
curl http://curl.haxx.se/ > index.html  
curl -# http://curl.haxx.se/ > index.html      
curl -0 http://curl.haxx.se/   
curl --http1.1 http://curl.haxx.se/   
curl --http2 http://curl.haxx.se/  
curl -1 http://curl.haxx.se/   
curl --tlsv1 http://curl.haxx.se/
curl -2 http://curl.haxx.se/   
curl --sslv2 http://curl.haxx.se/
curl -3 http://curl.haxx.se/   
curl --sslv3 http://curl.haxx.se/
curl -4 http://curl.haxx.se/   
curl --ipv4 http://curl.haxx.se/
curl -6 http://curl.haxx.se/   
curl --ipv6 http://curl.haxx.se/
curl -A "wget/1.0" http://curl.haxx.se/   
curl --user-agent "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)" [URL] 
curl --user-agent "Mozilla/4.73 [en] (X11; U; Linux 2.2.15 i686)" [URL]
curl -b "phpsession=Testtest" http://demo.com/     
curl --cookie "name=Daniel" http://curl.haxx.se
curl -c cookies.txt http://curl.haxx.se/   
curl --cookie-jar cookies.txt http://curl.haxx.se
curl -d "username=admin&password=pass" http://curl.haxx.se/   
curl --data "birthyear=1905&press=%20OK%20"  http://curl.haxx.se/when.cgi 
curl --data-urlencode "name=I am Daniel" http://curl.haxx.se 
curl --data "<xml>" --header "Content-Type: text/xml" --request PROPFIND url.com
curl -e "http://referer" http://demo.com/   
curl --referer http://curl.haxx.see http://curl.haxx.se
curl --header "Host:" http://curl.haxx.se 
curl --header "Destination: http://nowhere" http://curl.haxx.se
curl -D - http://curl.haxx.se/   
curl --dump-header headers_and_cookies http://curl.haxx.se
curl -L http://github.com/   
curl --location http://curl.haxx.se
curl --dns-servers 8.8.8.8 http://demo.com/  
curl --trace-ascii debugdump.txt http://curl.haxx.se/ 
curl --form upload=@localfilename --form press=OK [URL] 
curl --upload-file uploadfile http://curl.haxx.se/receive.cgi 
curl --user name:password http://curl.haxx.se 
curl --proxy-user proxyuser:proxypassword curl.haxx.se
curl --cert mycert.pem https://secure.example.com
```

per mandare un file in post ad esempio contenente XML, possiamo 
eseguire:

```sh
 curl -d @test.txt http://10.10.10.78/hosts.php
```


### File di networking importanti

Vediamo ora una serie di file molto importanti per la 
configurazione di rete.

#### Il file resolv.conf


Il file resolv.conf è utilizzato per definire i server DNS, 
cercare domini e gestire active directory. Esistono tuttavia 
delle differenze tra le distro basate su Debian e quelle basate 
su Red-Hat.

  Distro Debian-Based

Il file resolv.conf è localizzato in "/etc/resolv.conf", possiamo 
aggiungere l'indirizzo del server DNS aggiungendo una voce:

```sh
 nameserver 8.8.8.8 
 # abbiamo aggiunto il DNS server 8.8.8.8
```
le modifiche saranno applicate subito, senza necessità di 
riavviare i servizi di rete, ad ogni modo questa configurazione 
sarà temporanea, in quanto al prossimo reboot il file resolv.conf 
verrà reimpostato alla sua configurazione originale, per 
modificare in modo assoluto la configurazione, andiamo nella 
directory "/etc/resolvconf/resolv.conf.d/" e in questa directory 
abbiamo due file di configurazione:

```sh
 head 
 # in questo file inseriamo le direttive che verranno messe 
 # in testa al file resolv.conf, quindi quelle con priorità 
 # maggiore
```
```sh
 base 
 # in questo file inseriamo le direttive che verranno messe 
 # sotto quelle indicate dal file head
```
i nostri nameserver possiamo inserirli all'interno di questi 
file, quindi aggiungeremo in uno dei due la direttiva "nameserver 
8.8.8.8", una volta fatto, per andare a cambiare il file 
resolv.conf attuale eseguiremo:

```sh
 resolvconf -u 
 #  disponibile solo su alcune distro Debian-based
```
altre direttive che possono essere date al file resolv.conf oltre 
ai nameserver possono essere ad esempio "domain mydomain.local" 
se la nostra macchina fa da server DNS per un particolare dominio 
o è membro di un dominio. Esistono poi diverse opzioni come "
options timeout:1" che significa, non perdere più di un secondo 
per una richiesta DNS oppure "search yourdomain.local", significa 
che non siamo membri di un determinato dominio ma vogliamo 
includerlo nella ricerca DNS. Vediamo un esempio di file 
resolv.conf:

```conf
nameserver 8.8.8.8
nameserver 192.168.1.1
domain mydomain.local
options timeout:1
search yourdomain.local
```


#### Il file hosts

Il file "hosts" e collocato nella directory "/etc/hosts", 
permette di associare ad indirizzi ip dei nomi. Nella maggior 
parte dei casi in questo file di default vedremo:

```conf
127.0.0.1 localhost 
127.0.1.1 nomeComputer 
```

quindi questo vuol dire che tutte le volte che faremo un ping a 
localhost, verrà utilizzato quell'indirizzo. Un caso pratico è, 
vogliamo riferirci nella nostra LAN alle varie macchine con nomi 
significativi, questo può essere fatto semplicemente con:

```sh
localhost 127.0.0.1 
127.0.1.1 nomeComputer 
192.168.1.105 jack 
192.168.1.114 max 
192.168.1.104 serverAndromeda 
```

è possibile anche reindirizzare siti web, ad esempio:

```conf
127.0.0.1 localhost 
127.0.1.1 nomeComputer 
192.168.1.16 www.yahoo.com 
192.168.1.16 yahoo.com
```

Ora ogni qualvolta io faccio un ping a www.yahoo.com o a 
yahoo.com in realtà verrà fatto un ping all'indirizzo 
192.168.1.16 e anche nel browser se la pagina non è in cache, 
vedremo il webserver all'indirizzo "192.168.1.16". Possiamo 
utilizzare il file hosts anche come filtro, ad esempio, nel caso 
volessimo bloccare l'accesso a "www.playboy.com", basterebbe fare 
"127.0.0.1 www.playboy.com" e "127.0.0.1 playboy.com", è sempre 
meglio mettere tuti i riferimenti ad un sito web, in quanto 
solitamente è accessibile almeno con due nomi di dominio. E' 
possibile accorpare più domini sotto un solo ip, ad esempio:

```conf
127.0.0.1 localhost 
127.0.1.1 nomeComputer 
192.168.1.16 www.yahoo.com yahoo.com www.playboy.com playboy.com
```

Nel caso sopracitato stiamo reindirizzando sia richieste verso il 
sito di yahoo che richieste verso il sito di playboy verso 
l'indirizzo ip specificato.


#### Il file hostname

Il file hostname contiene informazioni sul nome della nostra 
macchina, il nome con cui possiamo accedere alla nostra macchina 
dall'interno o dall'esterno; hostname può essere un file o un 
comando o entrambi a differenza della distro utilizzata. Nelle 
distro Debian based il file è collocato in "/etc/hostname" mentre 
nelle Red-Hat based possiamo visualizzare l'hostname attraverso 
la voce "HOSTNAME" all'interno del file "/etc/sysconfig/network". 
Esiste anche il comando "hostname", vediamo alcuni esempi 
applicativi:

```sh
 hostname 
 # visualizza l'hostname corrente
```
```sh
 hostname nomeNuovoHostName 
 # imposta un nuovo nome hostname 
 # temporaneo alla macchina, infatti al riavvio avremo ancora il 
 # nostro hostname precedente, per effettuare modifiche permanenti 
 # dovremo andare a modificare i file sopracitati
```
#### Il file nsswitch.conf


Il "Name Service Switch" (NSS) è un meccanismo nei sistemi 
operativi Unix-Like che fornisce una varietà di sorgenti per 
configurazioni comuni di database e risoluzione di nomi. Il file 
nsswitch esiste quindi in tutte le distro, localizzato sempre 
nella stessa posizione cioè "/etc/nsswitch.conf", questo file 
regola la priorità che hanno le diverse configurazioni di diversi
elementi, ad esempio l'ordine con cui vengono gestite le risoluzioni 
dns, o l'ordine con cui vengono gestiti o acceduti gli account. 
Generalmente possiamo affermare che configura i name services del sistema 
operativo. Un' esempio esplicativo di riga potrebbe essere:

```sh
 hosts: files dns mdns4 
 # questa riga significa: per risolvere i 
 # dns prima guarda il file di configurazione di sistema ovvero "/etc/hosts", 
 # questo ha la priorità massima, nel caso dovessi 
 # avere problemi allora affidati al servizio dns (trovato "/etc.resolv.conf") 
 # e stessa cosa per "mdns4".
```
Questo file e' importante quando si gestiscono ambienti simili ad active
directory come LDAP o NIS.

Quindi possiamo ad esempio scegliere con quale priorita' vengono cercati gli
account, se diamo priorita' ad LDAP, allora a quel punto sara' LDAP il
responsabile primario degli account.

Un esempio di file di configurazione (con commenti esplicativi) 
potrebbe essere:

```txt
# The entry '[NOTFOUND=return]' means that the search for an 
# entry should stop if the search in the previous entry turned 
# up nothing. Note that if the search failed due to some other reason 
# (like no NIS server responding) then the search continues with the next entry.

# Legal entries are:
# nisplus Use NIS+ (NIS version 3) 
# nis Use NIS (NIS version 2), also called YP 
# dns Use DNS (Domain Name Service)
# files Use the local files 
# db Use the /var/db databases 

# [NOTFOUND=return] Ferma la ricerca se la entry non è trovata 
# nel servizio appena specificato

passwd: files ldap 
shadow: files 
group: files ldap
hosts: dns nis files
ethers: files nis 
netmasks: files nis 
networks: files nis 
protocols: files nis 
rpc: files [NOTFOUND=return] nis 
services: files [NOTFOUND=return] nis
automount: files 
aliases: files
```

L'ordine dei servizi elencati determina l'ordina in cui NSS 
cercherà di usare questi servizi per resolvere query che vengono 
effettuate al sistema. Un programma utile nel caso avessimo un 
sistema di risoluzione DNS lento è quello di usare un computer 
come cache DNS, questo può essere fatto con programmi tipo "nscd" 
o meglio ancora "pdnsd" o "unbound".


#### Il file /etc/services

Nel file /etc/services possiamo trovare la lista delle porte più 
comuni con i vari servizi associati, possiamo ad esempio 
effettuare:

```sh
 grep -iw 21 /etc/services 
 # in questo caso ci viene mostrato a 
 # quale servizio viene solitamente (per convenzione) associato 
 # alla porta 21
```
altri esempi di utilizzo possono essere:

```sh
 grep ssh /etc/services 
 # in questo caso ci viene mostrato su 
 # quale porta per convenzione girerebbe il servizio ssh
```


### Alcune informazioni utili su IPv4

Esistono alcune convenzioni che vengono seguite nell'assegnazioni 
di indirizzi in una rete:

* 192.168.1.1 "Default gateway"
* 192.168.1.2 "Firewall"
* 192.168.1.5 "DNS/Active Directory/LDAP"
* 192.168.1.100 "SNMP or Monitoring"
* 192.168.1.255 "Network Broadcast" (questo a differenza degli altri è uno standard)


## Strumenti per la sicurezza

### Sicurezza locale della macchina


Potrebbe essere utile di tanto in tanto lanciare alcuni comandi, 
per poter capire quali file per via di una configurazione 
sbagliata dei permessi potrebbero essere a rischio sulla nostra 
macchina. 

Solitamente quello che potrebbe costituire un problema di 
sicurezza a livello di permessi potrebbe essere:

 * impostazione del bit SUID per eseguibili non desiderati
 * impostazione del bit SGID per eseguibili non desiderati
 * file senza proprietario
 * file senza gruppo di appartenenza
 * link a file sconosciuti o sospetti

Vediamo alcuni esempi di comandi che possiamo lanciare ogni 
qualvolta volessimo verificare la sicurezza della macchina in 
termini di permessi:

```sh
 sudo find / -user root -perm -4000 -print 
 # visualizza tutti i 
 # file, con il SUID impostato, questi file possono essere 
 # pericolosi in quanti vengono eseguiti da qualsiasi utente come 
 # se venissero lanciati dall'utente root
```
```sh
 sudo find / -group root -perm 2000 -print 
 # visualizza tutti i 
 # file, con il SGID impostato, questi file possono essere 
 # pericolosi in quanti vengono eseguiti da qualsiasi utente come 
 # se venissero lanciati dal gruppo root
```
```sh
 sudo find / -nouser -print | more 
 # visualizza i file senza 
 # proprietario, questi file possono costituire problemi per la 
 # sicurezza della macchina
```
```sh
 sudo find / -nogroup -print | more 
 # visualizza i file senza 
 # gruppo, questi file possono costituire problemi per la 
 # sicurezza della macchina
```
Nota che anzichè utilizzare SUID ed SGID, un approccio migliore 
consigliato è quello di utilizzare "capabilities", possiamo 
saperne di più utilizzando:

```sh
 man capabilities
```
scenari di utilizzo sono ad esempio tcpdump/net perl library con 
la creazione di un gruppo, ad esempio se volessimo utilizzare 
determinate funzionalità della scheda di rete come il packet 
capturing senza però essere root.

#### Capabilities

Il vantaggio offerto dalle capabilities e' quello di segmentare le
possibilita' dell'utente di root in tanti piccoli sottomoduli.
In questo modo riusciamo ad evitare l'assegnazione dei diritti totali di root
ad un account anche nel momento in cui a quest'ultimo serve solo una
o alcune delle cose che serve a root. Le capabilities costituiscono
un *fine-grained set of privileges*. 
Generalmente le capabilities costituiscono un meccanismo migliore rispetto
agli sticky bit (i.e., suid bit), quindi ogni qualvolta pensiamo di dover 
utilizzare uno sticky bit, molto probabilmente possiamo utilizzare le 
capabilities. 

Un altro scenario di utilizzo e' quando dobbiamo fornire i permessi di 
root ad un utente, la domanda che dobbiamo farci e': 
"l'utente ha veramente bisogno di tutti i permessi di root?",
in molti casi in realta' basta assegnare qualche capability.

Un esempio comune in cui personalmente utilizzo le capabilities
e' quando voglio dare la possibilita' ad un programma di sniffare
pacchetti o di generare pacchetti (e.g., scapy eccetera).

Vediamo come gestire le capabilities:
```sh
 cat /proc/sys/kernel/cap_last_cap
 # fornisce il numero di capabilities supportate
 # dal nostro kernel
 # in genere piu' o meno vengono supportate dai correnti
 # kernel circa una quarantina di capabilities
```

Per mostrare i nomi delle varie capabilities supportate usiamo:
```sh
 capsh --print
 # stampa tutte le capabilities supportate
```

Un utente normale (se non diversamente configurato) non ha nessuna capability 
attiva, mentre per l'utente di root vedremo le varie capabilities attive.

Possiamo controllare le capabilities associate ad un determinato
processo con:
```sh
 cat /proc/1234/status | grep Cap
 # mostra le capabilities per il processo con id 1234
```
L'ultimo comando ritornera' 5 righe:

* CapInh = Inherited capabilities
* CapPrm – Permitted capabilities
* CapEff = Effective capabilities
* CapBnd = Bounding set
* CapAmb = Ambient capabilities set

Un esempio di output potrebbe essere:
```text
CapInh: 0000000000000000
CapPrm: 0000003fffffffff
CapEff: 0000003fffffffff
CapBnd: 0000003fffffffff
CapAmb: 0000000000000000
```
questi numeri in esadecimale potrebbero non aver senso
ma possiamo decodificarli eseguendo:
```sh
 capsh --decode=0000003fffffffff
 # mostra in modo human-friendly le capabilities del processo in questione
```
tutto questo sembra un casino, un modo molto piu' semplice e' invece
utilizzare direttamente il PID del processo con il programma 
`getpcaps`, ad esempio:

```sh
 getpcaps 1234
 # mostra le capabilities per il processo 1234, questo
 # programma utilizza la chiamata di sistema capget()
```

```sh
 getcap /usr/bin/ping
 # mostra le capabilities per il file/eseguibile indicato
```

Ora vediamo un esempio in cui aggiungiamo delle capabilities:
```sh
 sudo setcap cap_net_raw,cap_net_admin,cap_dac_override+eip /usr/bin/dumpcap
 # in questo caso impostiamo le capabilities chiamate
 # cap_net_raw, cap_net_admin e cap_dac_override
 # sul programma `dumpcap` e impostiamo i bit
 # effective, inherited e permitted a 1
```

possiamo anche rimuovere tutte le capabilities contenute su un programma con:
```sh
 setcap -r tracewalk
 # rimuove tutte le capabilities dal programma tracewalk
```

Capability sets

* Effective: the capabilities used by the kernel to perform permission checks
    for the thread, in the practice the process can choose to use or not the capability
* Permitted: the capabilities that the thread may assume (i.e., a limiting
    superset for the effective and inheritable sets). If a thread drops a
    capability from its permitted set, it can never re-acquire that capability
    (unless it exec()s a set-user-ID-root program).
    If a certain capability is permitted but not effective, it is temporarily 
    disabled
* Inheritable:  the capabilities preserved across an execve(2). A child created
    via fork(2) inherits copies of its parent’s capability sets. See below for a
    discussion of the treatment of capabilities during exec(). Using capset(2),
    a thread may manipulate its own capability sets, or, if it has the
    CAP_SETPCAP capability, those of a thread in another process.


So, what's the meaning of the strange `=eip` suffix? This requires a brief
digression into the nature of capabilities. Each process has three sets of
capabilities -- inheritable, permitted and effective:

* Effective capabilities are those which define what a process can actually
do. For example, it can’t deal with raw sockets unless `CAP_NET_RAW` is in the
effective set.
Effective file capability is actually just a single bit
rather than a set, and if set then it indicates that the
entire permitted set is also copied to the effective set
of the new process. This can be used to add capabilities
to processes which weren’t specifically written to
request them. Since it is a single bit, if you set it
for any capability then it must be set for all
capabilities. You can think of this as the “legacy” bit
because it’s used to allow capabilities to be used for
applications which don’t support them.
* Permitted capabilities are those which a process is allowed to have
should it ask for them with the appropriate call. These don’t allow a
process to actually do anything unless it’s been specially written to
ask for the capability specified. This allows processes to be written to
add particularly sensitive capabilities to the effective set only for
the duration when they’re actually required.
Permitted file capabilities are those which are always available
to the executable, even if the parent process which invoked it
did not have them. These used to be called "forced"
capabilities.
* Inheritable capabilities are those which can be inherited into the
permitted set of a spawned child process. During a fork() or clone()
operation the child process is always given a duplicate of the
capabilities of the parent process, since at this point it’s still
running the same executable. The inheritable set is used when an
exec() (or similar) is called to replace the running executable with
another. At this point the permitted set of the process is masked
with the inheritable set to obtain the permitted set that will be
used for the new process.
Inheritable file capabilities specifies an additional mask
which can also be used to remove capabilities from the
calling process’s set. It applies in addition to the calling
process’s inheritable set, so a capability is only inherited
if exists in both sets.

So, the setcap utility allows us to add capabilities to these three
sets independently for a given executable. Note that the meaning of
the groups is interpreted slightly different for file permissions,
however:


When specifying capabilities via setcap the three
letters e, i and p refer to the effective, inhertable
and pemitted sets respectively.


### Antivirus

####  Premessa sugli antivirus nei sistemi GNU/Linux

Do you need a virus scanner on Linux/Unix?

Short answer, it depends on your situation.

Long answer: You might want to run a virus scanner on a server 
where files are uploaded, or where users login and manipulate 
files. Lets say you host a file upload site, you want to run a 
scan on the upload folder which auto removes infected files. It 
can also be that your mailserver runs Linux, but people sometimes 
mail executables or infected pdf files. Then you also want a 
scanner. Or you might run a source control server (gitolite, 
mercurial) where sometimes binary files are checked in. (although 
ClamAV might not find things in bare-git repositories, only in 
working directories.)

If you however only run a static HTML website, or an rsync backup 
server, or a Rougelike via telnet, where there are no uploads or 
like, you might be wasting resources.

My advice is to look at your situation and then decide if you 
need ClamAV, and if you only need to scan a few folders, the 
entire system and if you want to auto-remove the virusses or not.

#### ClamAV Antivirus


Uno dei più famosi antivirus per i sistemi GNU/Linux è ClamAV, 
possiamo installarlo attraverso 

```sh
 apt-get install clamav 
 # installa clamav, la base e le librerie 
 # e l'aggiornatore di virus
```
```sh
 apt-get install clamav-daemon 
 # installa il demone di clamav
```
Un programma importante che viene installato con clamAV è "
freshclam" che si occupa di tenere aggiornato il database dei 
virus, e automaticamente si aggiorna una volta al giorno, 
almenochè non venga richiesto un aggiornamento manualmente. 
Possiamo startare il demone dell'antivirus attraverso:

```sh
 service clamav-daemon start 
 # abilita il demone di clamav, a 
 # differenza della distro è anche possibile effettuare questa 
 # operazione attraverso "systemctl enable clamav-daemon"
```
L'antivirus clamAV possiede diversi front-end ma di per se non è 
un virus in tempo reale, questa caratteristica gli permette di 
non essere invasivo. Vediamo alcuni esempi di comandi:

```sh
 clamscan -r /home/andrea 
 # esegue una scansione nella directory 
 # "/home/andrea" attraverso il flag "-r"
```
```sh
 clamscan -r --bell -i /home 
 # esegue una scansione nella 
 # directory "/home" attraverso il flag "-r" e se trova dei virus 
 # li elenca con "-i" e fa sounare una campana "--bell" nel caso di 
 # ritrovamento virus
```
```sh
 clamscan -r --remove --bell -i /home 
 # è uguale al comando 
 # precedente ma grazie all'opzione "--remove" rimuove i virus se 
 # ne trova
```
```sh
 # clamscan -r --move=/home/andrea/.infectedFiles --bell -i /home 
  
 # è uguale al comando precedente ma anzichè rimuovere i virus 
 # grazie all'opzione "--move" sposta i file all'interno di una 
 # specifica directory
```
Per eseguire un aggiornamento manuale del database dei virus si 
effettua:

```sh
 # sudo /etc/init.d/clamav-freshclam restart 
```
E' buona norma eseguire periodicamente attraverso il sistema Cron 
scansioni di determinate directory.


### Rootkit

Un rootkit, termine letteralmente traducibile in lingua italiana 
con equipaggiamento da amministratore (in ambiente Unix per 
"root" access si intende accesso di livello amministrativo), in 
informatica, è un programma software prodotto per avere il 
controllo sul sistema senza bisogno di autorizzazione da parte di 
un utente o di un amministratore. Recentemente alcuni virus 
informatici si sono avvalsi della possibilità di agire come 
rootkit (processo, file, chiave di registro, porta di rete) 
all'interno del sistema operativo.


#### chkrootkit

Un programma abbastanza comune su sistemi Unix-based è "
chkrootkit" (Check Rootkit) che permette agli amministratori di 
rivelare la presenza di alcuni noti rootkit. Vediamo subito 
alcuni esempi:

```sh
 sudo chkrootkit 
 # esegue una scansione del sistema
```


### Linux Security Auditing Tool (LSAT)

Il Linux Security Auditing Tool (LSAT) è uno strumento per la 
sicurezza molto importante e dovrebbe essere installato sempre, 
soprattutto quando avviene l'installazione e la configurazione di 
una macchina server. LSAT è uno strumento atto ad effettuare una 
serie di controlli su file di configurazione di sistema e sulla 
rete locale o sul sistema per comuni errori di configurazione che 
possono ledere la sicurezza del sistema o per pacchetti che non 
sono necessari. Per installarlo eseguiamo:

```sh
 apt-get install lsat
```
Vediamo ora invece alcuni esempi applicativi:

```sh
 lsat 
 # esegue una scansione del sistema per errori nei file di 
 # configurazione che potrebbero ledere la sicurezza della 
 # macchina
```

* in automatico dopo la scansione viene creato un file chiamato 
    "lsat.out", è da notare che il check di un modulo chiamato "
    md5" potrebbe richiedere molto molto tempo, possiamo quindi 
    terminarla con "Ctrl+C", la scansione di questo modulo è 
    consigliata solo la prima volta, poi viene rieseguita in 
    genere solo se avvengono significativi cambiamenti sul 
    sistema

```sh
 lsat -o mioFile.out -m debian -x modules.exclude 
 # in questo 
 # esempio, avviene una scansione del sistema, ma l'output "-o" 
 # non viene messo in "lsat.out" ma in "mioFile.out", inoltre 
 # indichiamo che la nostra distro "-m" è Debian, in questo modo 
 # riusciamo ad ottenere un controllo maggiore sul comando, poi 
 # indichiamo con "-x" di escludere nel controllo i moduli inclusi 
 # nel file "modules.exclude"
```
```sh
 lsat -m debian -w output.html 
 # in questo esempio eseguiamo una 
 # scansione su una distro Debian, specificandolo col flag "-m" e 
 # inoltre l'output viene salvato in un file html chiamato "
 # output.html"
```
Una lista dei moduli utilizzati è possibile consultare 
[http:#www.ubuntugeek.com/linux-security-auditing-tool-lsat-post-install-security-auditing-tool.html||Lista Moduli LSAT].


### Cracking di Password

Talvolta è buona norma provare ad effettuare crack delle password 
degli utenti sul nostro sistema, in modo da capire se possono 
esserci vulnerabilità, uno strumento molto utilizzato è "John the 
Ripper", anche se esistono alternative come "hashcat".


### John the Ripper

Per installare "John the Ripper", eseguiamo:

```sh
 sudo apt-get install john john-data
```
una volta installato, dovremo trovare un file che contiene 
parole, i cosiddetti file di "wordlist", in quanto questo 
strumento di password cracking utilizza la tecnica "brute force", 
cioè prova tutte le parole contenute nella wordlist, john the 
ripper di default senza wordlist non è efficiente in quanto prova 
solo poche combinazioni con codici alfanumerici. Una wordlist di 
dimensioni contenute ma comunque abbastanza efficiente può ad 
esempio essere [http:#download.openwall.net/pub/wordlists/all.gz||Wordlist]
. Una volta scaricata la wordlist, nel nostro caso dovremo 
eseguire per scompattarla:

```sh
 gunzip all.gz 
 # scompatta la wordlist
```
Ora, consideriamo un utente chiamato "testuser" presente sulla 
macchina con propria password, John the ripper per lavorare ha 
bisogno di un file formattato in una modalità specifica, per 
poter adempiere a questa formattazione allora eseguiamo:

```sh
 sudo unshadow /etc/passwd /etc/shadow > password.list 
 # crea il 
 # file password.list leggibile da John, ricorda che il programma 
 # unshadow viene installato con l'installazione di john the 
 # ripper
```
Ora vediamo alcuni esempi di cracking di password:

```sh
 touch john.ini 
 # prima di eseguire john dobbiamo creare un file 
 # di configurazione, anche se vuoto, quest'ultimo è richiesto 
 # necessariamente per l'esecuzione
```
```sh
 john -users:-testuser -wordlist:all password.list 
 # in questo 
 # esempio eseguiamo un cracking della password sull'utente 
 # chiamato "testuser", utilizzando la wordlist chiamata "all" e 
 # utilizzando il file chiamato "password.list" generato 
 # precedentemente attraverso "unshadow"
```
```sh
 john --show -wordlist:all password.list 
 # in questo caso viene 
 # eseguito un tentativo di cracking di tutte le password e 
 # l'opzione "--show" serve ad indicare il fatto, di mostrare le 
 # password trovate a fine operazione
```
Se conosciamo un determinato utente, possiamo aggiungere 
determinate parole al file wordlist, in modo da rendere più 
probabile la scoperta della password. Per altri esempi di 
utilizzo di "John the Ripper" è consigliata la visualizzazione 
della pagina web [http:#www.openwall.com/john/doc/EXAMPLES.shtml||John The Ripper: Esempi di Utilizzo].


### Nmap

Il programma "nmap" è utilizzato per effettuare scansioni di rete 
(network scanning), quindi avere informazioni sulla rete a cui la 
nostra macchina è collegata. Per installare nmap, eseguiamo:

```sh
 apt-get install nmap sysstat
```
Vediamo ora alcuni esempi applicativi, tenendo a mente che dove 
non viene specificato un port-range, nmap esegue una scansione 
solo sulle 1000 porte più utilizzate (che comunque costituiscono 
solo 1.5% della totalità delle possibilità):

```sh
 nmap localhost 
 # esegue uno scan sul localhost, e determina 
 # quali porte sono aperte, di default, nmap scansiona le 1000 
 # porte più usate, quindi la scansione non avviene su tutte le 
 # porte
```
```sh
 nmap -p22 localhost 
 # verifica se la porta 22 è aperta su 
 # localhost
```
```sh
 nmap -p1-80 localhost 
 # verifica quali porte sono aperte, 
 # considerando il range dalla porta 1 alla porta 80
```
```sh
 nmap -p22,23,80,443, 389, 3489,4000 192.168.1.173 
 # verifica se 
 # le porte 22(ssh), 23(telnet), 80(http), 443(https), 389(ldap), 
 # 3489, 4000 sono aperte all'indirizzo 192.168.1.173
```
```sh
 nmap 192.168.1.104 
 # esegue una scansione all'ip 192.168.1.104 
 # sulle porte di default
```
```sh
 nmap -p 1-65535 192.168.1.193 
 # esegue una scansione su TUTTE 
 # le porte all'indirizzo 192.168.1.193
```
```sh
 nmap 192.168.1.0/24 
 # esegue una scansione a tutti gli ip della 
 # rete 192.168.1.0 con subnet mask 255.255.255.0
```
```sh
 nmap -sP 192.168.1.0/24 > results.txt 
 # esegue una scansione di 
 # tipo "Ping", in modo da visualizzare quali host esistono nella 
 # rete con indirizzo 192.168.1.0 con subnet mask 255.255.255.0, i 
 # risultati vengono salvati poi nel file "results.txt"
```
```sh
 nmap -p1-340 -sV 192.168.1.250 
 # esegue una scansione delle 
 # porte dalla 1 alla 340 sull'indirizzo IP 192.168.1.250 e mostra 
 # il servizio attivo e la relativa versione sulle specifiche 
 # porte aperte
```
```sh
 nmap -O 192.168.1.250 
 # cerca di capire il sistema operativo 
 # utilizzato dalla macchina all'indirizzo IP 192.168.1.250
```
```sh
 nmap -oA scanresults 192.168.1.105 
 # anzichè mostrare i 
 # risultati solo sullo standard output, li salva anche 
 # all'interno di file di testo che iniziano per "scanresults", 
 # salva 3 file di testo
```

* il primo, è in formato human-readable
* il secondo, è in formato facilmente utilizzabile con grep
* il terzo, è in formato xml

```sh
 nmap -vv -oA scanresults 192.168.1.250 
 # esegue la stessa cosa 
 # del precedente ma include più informazioni attraverso una 
 # modalità verbose, è possibile ottenere ancora più informazioni 
 # inserendo "-vvv" come flag al posto di "-vv".
```
E' da ricordare che nmap è più utilizzato per test su macchine 
remote, mentre sono molto più efficienti sulla macchina stessa 
strumenti come netstat, sockstat ed fstat.

### Wireshark


Il programma wireshark è un packet-analyzer, e risulta molto 
utile quando vogliamo capire cosa sta succedendo nella rete a cui 
siamo connessi o per capire e risolvere determinati problemi di 
rete (legati ad esempio alla congestione della rete). Possiamo 
installare wireshark attraverso:

```sh
 sudo apt-get install wireshark
```
Una volta installato, abbiamo bisogno di impostare l'interfaccia 
di rete utilizzata in modalità "promiscua", questo ci permetterà 
di sniffare tutti i pacchetti che girano nell'ethernet e non solo 
quelli diretti a noi. Possiamo avviare l'applicazione lanciando:

```sh
 wireshark 
 # lancia wireshark, un'alternativa è "wireshark &"
```
E' utile utilizzare la risoluzione degli indirizzi IP, attraverso 
le impostazioni, abilitando la voce "Enable network name 
resolution", altri strumenti utili sono i filtri, possiamo usare 
filtri per selezionare ad esempio i protocolli che vogliamo 
monitorare o ad esempio solo cookie, eccetera.

Un test di sicurezza per la rete potrebbe essere chiedere al 
mantenitore dell'infrastruttura di rete (e.g., Network Engineer) 
il traffico ammesso, ad esempio ipotizziamo il traffico in uscita 
ammesso sia verso la porta 80, 443 (http/https) e sulla porta 389 
(LDAP), allora possiamo inserire come filtro:

not (tcp.port==80) and not (tcp.port==443) and not 
(tcp.port==389)
ovviamente ci sono configurazioni più avanzate, ma per tutto il 
resto è una buona idea impratichirsi con la costruzione di filtri 
di wireshark.

Un display filter utile per fare detection di arp poisoning è:

```sh
 arp.duplicate-address-detected
```


### Tcpdump

Tcpdump costituisce un'ottima alternativa a wireshark, molto più 
frequente tra chi si occupa di sicurezza informatica, essendo un 
programma che offre molte possibilità, vedremo solo alcuni 
comandi d'esempio, e andremo ad arricchire mano a mano il lancio 
del comando:

```sh
 tcpdump -D 
 # mostra l'elenco delle interfacce disponibili per 
 # catturare pacchetti
```
```sh
 tcpdump -i any 
 # cattura pacchetti su qualsiasi interfaccia di 
 # rete, il flag "-i" è utilizzato per indicare l'interfaccia di 
 # rete
```
```sh
 tcpdump -i wlan0 
 # cattura pacchetti sull'interfaccia di rete 
 # wlan0
```
```sh
 tcpdump -i wlan0 -n 
 # non risolve gli hostname, mostrando gli 
 # indirizzi IP grazie al flag "-n"
```
```sh
 tcpdump -i wlan0 -nn 
 # non risolve gli hostname e i nomi dei 
 # servizi associati alle porte più comuni
```
```sh
 tcpdump -i wlan0 -nn -q 
 # è più quiet (quindi meno verbose), 
 # con il flag "-q"
```
```sh
 tcpdump -i wlan0 -nn -q -t 
 # non stampa il timestamp col flag "
 # -t"
```
```sh
 tcpdump -i wlan0 -nn -q -tttt 
 # stampa un timestamp più 
 # completo contenente anche la data utilizzando il flag "-tttt"
```
```sh
 tcpdump -i wlan0 -nn -q -X 
 # è conciso sulle informazioni di 
 # testa del pacchetto "-q" ma stampa anche il contenuto di ogni 
 # pacchetto "-X"
```
```sh
 tcpdump -i wlan0 -nn -X 
 # stampa informazioni sul pacchetto di 
 # default + contenuto
```
```sh
 tcpdump -i wlan0 -nn -v --number
 # mostra più informazioni, il 
 # flag "-v" sta per verbose, e possiamo essere ancora più verbose 
 # utilizzando "-vv" o "-vvv", a differenza di quante informazioni 
 # vogliamo sui pacchetti, numera i pacchetti
```
```sh
 tcpdump -i wlan0 -nn -v -e --number
 # in questo modo mostriamo 
 # anche le informazioni sull'header ethernet, utile ad esempio 
 # per visualizzare indirizzi MAC, inoltre numera i pacchetti
```
```sh
 tcpdump -i wlan0 -nn -v -e -X -c10 
 # cattura pacchetti 
 # includendo più informazioni "-v" (incluse quelle relative 
 # all'header ethernet "-e"), cattura anche il contenuto dei 
 # pacchetti "-X" ma cattura solo 10 pacchetti grazie al flag "-c"
```
```sh
 tcpdump -i wlan0 -vvv -tttt -nn -e -X -w capture_file.pcap 
  
 # esegue una scansione, salvando anche informazioni su header 
 # ethernet "-e" e sul contenuto "-X" in un file ".pcap" grazie al 
 # flag "-w", questo è utile per fare analisi a posteriori
```
```sh
 tcpdump -r capture_file.pcap 
 # con il flag "-r" riusciamo a 
 # leggere ed analizzare un file .pcap
```
```sh
 tcpdump -r capture_file.pcap -X 
 # anche in modalità lettura si 
 # applicano gli stessi flag, quindi possiamo ad esempio 
 # visualizzare il contenuto dei pacchetti col flag "-X"
```

Queste sono solo alcuni flag di base di tcpdump, ma il cuore è 
costituito dalla possibilità di inserire capture filters che 
utilizzano la notazione "Berkeley Packet Filter" notation, 
vediamo qualche esempio di filtro:

```tcpdump
src 2.3.4.5 # cattura solo il traffico che ha come sorgente l'ip specificato
dst 3.4.5.6 # cattura solo il traffico che ha come destinazione l'ip specificato
net 1.2.3.0/24 # cattura solo il traffico appartenente alla rete specificata
port 3600
src port 3333
icmp
ip6
portrange 21-23
less 32 # cattura solo pacchetti più piccoli di 32 byte
greater 64 # cattura solo pacchetti più grandi di 64 byte

`<=` 128 # cattura solo pacchetti più piccoli o uguali alla dimensione 
# di 128 byte

# possiamo combinare filtri con operatori come and (o &&), or (o ||) o not (o !)
dst 192.168.0.2 and src net and not icmp
src 10.0.2.4 and (dst port 3389 or 22)
```

Vediamo un semplice esempio di come unire questi filtri con i 
flag visti prima:

```sh
 tcpdump -i wlan0 -nn -X -w capture_file.pcap 'port 80' 
  
 # combiniamo diverse opzioni e utilizziamo un filtro in BPFN, 
 # gli apici sono opzionali, ma per questioni di leggibilità 
 # preferisco inserirli, in modo da separare il filtro in BPFN dal 
 # resto dei flag
```
```sh
 tcpdump -i wlan0 -vvv -tttt -nn -e -X -w capture_file.pcap 'src 
 # 10.0.2.4 and (dst port 3389 or 22)'
```
vediamo alcuni esempi per isolare specifici pacchetti TCP con 
determinati flag:

```sh
 tcpdump 'tcp[13] & 32!=0' 
 # mostrami solo i pacchetti con il 
 # flag URG settato
```
```sh
 tcpdump 'tcp[13] & 16!=0' 
 # mostrami solo i pacchetti con il 
 # flag ACK settato
```
```sh
 tcpdump 'tcp[13] & 8!=0' 
 # mostrami solo i pacchetti con il 
 # flag PSH settato
```
```sh
 tcpdump 'tcp[13] & 4!=0' 
 # mostrami solo i pacchetti con il 
 # flag RST settato
```
```sh
 tcpdump 'tcp[13] & 2!=0' 
 # mostrami solo i pacchetti con il 
 # flag SYN settato
```
```sh
 tcpdump 'tcp[13] & 1!=0' 
 # mostrami solo i pacchetti con il 
 # flag FIN settato
```
```sh
 tcpdump 'tcp[13]=18' 
 # mostrami solo i pacchetti SYN/ACK
```
comunque esistono anche notazioni funzionalmente analoghe ma più 
semplici da leggere come ad esempio:

```sh
 tcpdump 'tcp[tcpflags] == tcp-syn'
```
```sh
 tcpdump 'tcp[tcpflags] == tcp-rst'
```
```sh
 tcpdump 'tcp[tcpflags] == tcp-fin'
```
Altri filtri utili in reti con macchine Windows, è evitare questi 
protocolli (smb || nbns || dcerpc || nbss || dns).

Possiamo fare diverse prove con tcpdump, magari mettendoci in 
ascolto su una porta specifica e provando a mandare traffico, con 
specifici programmi, oppure con netcat. Una combinazione 
interessante è accoppiare tcpdump con un packet crafter (e.g., 
scapy), e farli comunicare su una porta specifica magari 
sull'interfaccia di loopback, in modo da poter fare tutti i 
nostri esperimenti.

Possiamo anche utilizzare tcpdump per fare detection di arp 
poisoning, ad esempio guardando dispositivi che seguono questa 
logica:

192.168.1.100 is 00:00:00:00

192.168.1.100 is ff:ff:ff:ffcioè se lo stesso IP compare con due 
indirizzi MAC diversi in breve tempo, allora la situazione è 
sospettosa e probabilmente ci troviamo in una situazione di ARP 
cache poisoning. In genere se questo comportamento è associato 
all'indirizzo di un gateway allora MOLTO probabilmente siamo in 
una situazione di ARP cache poisoning.

Altri tool per monitorare il traffico di rete in stile top o htop,
sono:
* iftop 
* nethogs 
* bmon


### Eseguire tcpdump e tante altre utility senza permessi di root

```sh
 groupadd pcap
```
```sh
 usermod -a -G pcap giuseppe 
 # sostituire giuseppe col nome 
 # utente
```
```sh
 chgrp pcap /usr/sbin/tcpdump
```
```sh
 chmod 750 /usr/sbin/tcpdump
```
```sh
 setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump
```
```sh
 ln -s /usr/sbin/tcpdump /usr/local/bin/tcpdump
```
a volte (quindi solo su alcune distro ad esempio su alcune 
OpenSUSE) è anche necessario aggiungere in alcune distribuzioni 
l'opzione "file_caps=1" come kernel line nel boot manager. 

Una volta eseguite queste operazioni, nel caso volessimo ad 
esempio usare scapy, quello che dobbiamo fare è assegnare le 
capabilities a python e a scapy, con:

```sh
 setcap cap_net_raw=eip /path/to/pythonX.X
```

```sh
 setcap cap_net_raw=eip /path/to/scapy
```
un altro esempio è quello di dare capabilities a perl per la 
cattura di pacchetti eccetera.


### IpTables (Firewall)

Il programma IpTables un'interfaccia per gli amministratori di 
sistema vincolata al kernel Linux e costituisce un programma di 
gestione "firewall" per sistemi GNU/Linux. Nei sistemi Debian 
based, esistono delle applicazioni di front-end come ad esempio "
ufw" non esistono script o eseguibili per lanciare iptables, 
mentre su distro Red-Hat based esistono degli script nella 
directory `/etc/init.d/`, possiamo visualizzarli con: "ls -al 
`/etc/init.d/ip*`, e possiamo quindi iniziare il processo con:

```sh
 sudo service iptables start 
 # inizia il processo iptables
```
```sh
 sudo service iptables stop
```
Nelle distro Debian-based invece si abilita il firewall 
attraverso:

```sh
 sudo ufw enable
```
e si può verificare lo stato del firewall con:

```sh
 sudo ufw status
```
inoltre i log di ufw vengono salvati in "/var/log/ifw.log".

Vediamo ora, una volta installato e avviato iptables, alcuni 
comandi da utilizzare:

```sh
 iptables -L 
 # elenca le regole presenti sul firewall, in 
 # output, in input e in forwarding
```
Per isolare completamente un computer dalla rete, eseguiamo:

```sh
 iptables -P INPUT DROP 
 # disabilita su tutte le porte richieste 
 # di input
```
```sh
 iptables -P OUTPUT DROP 
 # disabilita il traffico di output su 
 # tutte le porte
```
```sh
 iptables -P FORWARDING DROP 
 # disabilita l'inoltro dei 
 # pacchetti su tutte le porte
```

Se volessimo invece bloccare il traffico da uno specifico IP o network, possiamo
eseguire:

```sh
 iptables -A INPUT -s 11.22.33.44 -j DROP
 
```

Possiamo anche specificare una interfaccia di rete e una porta specifica con:
```sh
 iptables -A INPUT -s 11.22.33.44 -i eth0 -j DROP
```

mentre per abilitare ad esempio la porta "22" TCP, in 
ingresso eseguiamo:

```sh
 iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```
mentre per abilitare il traffico di uscita sulla stessa porta 
con TCP, eseguiamo:

```sh
 iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
```
Comandi utili per salvare e caricare le configurazioni sono:

```sh
 iptables-save > fileName 
 # salva la configurazione attuale in 
 # un file
```
```sh
 iptables-restore < fileName 
 # ripristina la configurazione 
 # salvata in fileName
```
Un'altro programma che fa da interfaccia front-end per iptables 
molto utilizzato e con ottima documentazione è "shorewall", 
inoltre per salvare la configurazione, si può installare "
iptables-persistent".

Per cancellare regole facciamo:

```sh
 sudo iptables -F 
 # si cancellano tutte le regole
```

Questo talvolta potrebbe no nbastare se abbiamo impostato delle chain
aggiuntive ad INPUT/OUTPUT/FORWARD, in quel caso possiamo eseguire
la seguente sequenza di comandi:

```sh
iptables --flush
iptables --table nat --flush
iptables --table mangle --flush
iptables --delete-chain
iptables --table nat --delete-chain
iptables --table mangle --delete-chain
```


### Hosts Deny e Hosts Allow (Deprecati)

Dei file che costituiscono una blacklist (o whitelist) per le 
connessioni sono i file "hosts.allow" e "hosts.deny", questi file 
venivano usati come firewall, ma oggigiorno non costituiscono un 
buon firewall, in quanto iptables è un meccanismo più a basso 
livello ed è più sicuro, riuscendo a negare direttamente i 
tentativi di connessione, mentre questi due file permettono lo 
scambio di informazioni con un altro host fino a quando non si 
scopre che l'host è nella blacklist (o la whitelist); pertanto 
non vengono usati come firewall. 

  Principio di funzionamento di hosts.allow e hosts.deny

Questi due file, hanno un ordine di lettura, viene prima letto "
hosts.allow" e successivamente "hosts.deny", quindi dobbiamo fare 
attenzione a non scrivere impostazioni che possono andare in 
conflitto. Configurare questi file è molto semplice comunque, 
prendiamo come esempio "hosts.allow", basta scrivere:

```conf
ssh: LOCAL 192.168.1.195 
# imponiamo il diritto di potersi connettere in ssh all
# 'indirizzo ip indicato, il servizio ssh, su sistemi RH-based è sshd
```

avremmo potuto scrivere in alternativa nel file "hosts.deny":

```conf
ssh: ALL EXCEPT 192.168.1.195 
# imponiamo il diritto di potersi connettere in ssh all'indirizzo 
# ip indicato e lo neghiamo a tuti gli altri indirizzi IP
```

Al posto di ssh, avremmo potuto inserire "httpd", "mysqld", "ALL",
e tanti altri servizi. Una volta effettuate le modifiche, 
dobbiamo riavviare i servizi coinvolti nella modifica, o 
riavviare semplicemente il sistema.


### Netstat

Il programma netstat è molto utile per monitorare la rete sul 
nostro sistema. Vediamo alcuni esempi applicativi:

```sh
 netstat -a | more 
 # elenca tutte le porte (listening e non 
 # listening)
```
```sh
 netstat -at | more 
 # elenca tutte le porte tcp
```
```sh
 netstat -t | more 
 # elenca tutte le porte tcp in uno stato 
 # aperto ma non in listening (come ad esempio "established")
```
```sh
 netstat -au | more 
 # elenca tutte le porte udp
```
```sh
 netstat -aw | more 
 # mostra tutte le porte RAW
```
```sh
 netstat -ax | more 
 # mostra tutte le porte unix usate per l'IPC 
 # (InterProcess Communication) sulla macchina locale
```
```sh
 netstat -l | more 
 # elenca tutti i socket che sono in "
 # Listening"
```
```sh
 netstat -lt | more 
 # mostra tutte le porte TCP in "Listening"
```
```sh
 netstat -lu | more 
 # mostra tutte le porte UDP in "Listening"
```
```sh
 netstat -ie 
 # visualizza le interfaccie di rete, come "ifconfig"
 # , "-i" sta per interface e "-e" per extended, in quanto viene 
 # visualizzato un insieme esteso di informazioni
```
```sh
 netstat -i 
 # visualizza le interfaccie di rete, con un insieme 
 # esiguo di informazioni
```
```sh
 netstat -rn 
 # visualizza le tabelle di routing, dove "-r", 
 # significa mostrami le tabelle di routing e "-n" non risolvere i 
 # nomi di dominio per gli indirizzi ip
```
```sh
 netstat -a 
 # visualizza tutte le connessioni presenti sul 
 # sistema
```
```sh
 netstat -uta 
 # visualizza tutte "-a" le connessioni UDP "-u" e 
 # TCP "-t" sul sistema
```
```sh
 netstat -aute 
 # è analogo al precedente, ma grazie al flag "-e"
 # , visualizza informazioni estese, mostrandoci anche a quale 
 # processo è legata ogni connessione
```
```sh
 netstat -lp 
 # visualizza le applicazioni, come ssh, apache, 
 # eccetera sul sistema
```
```sh
 netstat -s 
 # visualizza un summary "-s", cioè un resoconto 
 # delle statistiche e dei dati riguardanti la rete
```
```sh
 netstat -pt 
 # visualizza informazioni sui programmi che 
 # gestiscono connessioni, il loro stato e il PID del processo 
 # legato al programma
```
```sh
 nestat -c 
 # visualizza le informazioni di netstat con 
 # aggiornamento periodico
```
```sh
 netstat -ap 
 # visualizza tutte le applicazioni che sono in 
 # esecuzione con il relativo stato
```
```sh
 netstat -ap | grep ssh 
 # visualizza informazioni sulle porte 
 # utilizzate dal programma "ssh"
```
```sh
 netstat -an 
 # visualizza tutti i processi di rete con relativa 
 # porta utilizzata
```
```sh
 netstat -an | grep ':80' 
 # visualizza solo i processi relativi 
 # alla porta "80"
```
```sh
 netstat --inet 
 # visualizza solo i socket di rete IPv4e non 
 # quelli per l'IPC (interprocess communication), in quanto questi 
 # ultimi nell'ambito del networking, non ci interessano
```
```sh
 netstat --tcp --listening --programs 
 # visualizza i programmi in 
 # ascolto per il protocollo TCP, è equivalente ad "-tlp"
```
```sh
 netstat -ntlp 
 # molto usato per vedere programmi in ascolto 
 # sulle porte, è una delle configurazioni di flag per netstat a 
 # mio parere più utili
```
```sh
 netstat -ntu 
 # mostra gli utenti collegati alla mia macchina in 
 # termini di IP
```
```sh
 sudo netstat --inet -lnp 
 # visualizza i processi che utilizzano 
 # determinate porte in listening riguardo i socket di rete, a 
 # volte è bene utilizzare netstat con i diritti di 
 # amministratore, in quanto si potrebbero non avere i diritti di 
 # visualizzare le applicazioni in ascolto, in questo modo invece 
 # si ha un quadro completo di chi sta occupando cosa
```
```sh
 sudo netstat -ntlp4 
 # visualizza tutte le porte in listening 
 # utilizzanti protocollo IPv4 con annessi processi
```
```sh
 sudo netstat -ntlp4e 
 # visualizza tutte le porte in listening 
 # utilizzanti protocollo IPv4 con annessi processi ed inode, 
 # infatti a volte potrebbe capitare di non poter visualizzare un 
 # nome processo, possiamo scoprire l'inode relativo utilizzando 
 # il flag "-e" e poi andandolo a cercare in /proc oppure possiamo 
 # utilizzare un "lsof | grep <inodenumber>" per poter 
 # visualizzare il nome del processo, ad ogni modo in alcuni casi 
 # anche questo approccio ci porterà ad un inode fantasma, in 
 # quanto il processo è morto e le informazioni che mostra il 
 # kernel non sono aggiornate, comunque non è nulla di allarmante
```
un'alternative è quella di usare lsof, con:

```sh
 sudo lsof -iTCP:631 -sTCP:LISTEN 
 # guarda chi è in ascolto 
 # sulla porta TCP 631, citando il process name
```
Quindi per visualizzare le porte di rete aperte e in "LISTEN" 
(cioè quelle potenzialmente pericolose) su una macchina, (se 
abbiamo l'accesso) possiamo eseguire:

```sh
 sudo netstat -pnl --inet | grep LISTEN 
 # visualizza le porte di 
 # rete in ascolto sulla macchina locale, cioè le porte TCP in 
 # listening e le porte UDP, che per loro natura sono sempre in 
 # LISTEN e accettano dati, in quanto "UDP is stateless so it's 
 # always LISTENING and accepting data at the same time"
```
che è equivalente ad un:

```sh
 nmap -sS -p 1-65535 -T 5 localhost; nmap -sU -p 1-65535 -T 5 localhost 
 # una scansione nmap su tutte le porte TCP e UDP, il 
 # flag "-T 5" è utilizzato per effettuare una scansione veloce 
 # (ergo, molto traffico, è anche un po' più impreciso, nel caso 
 # dovessimo avere risultati completamente diversi è meglio 
 # toglierlo o al posto di "5" inserire "4"), ma non è importante 
 # in quanto siccome la scansione è locale, non ci importa di 
 # creare molto traffico, senza l'opzione "-T 5" la scansione UDP 
 # potrebbe risultare ancora più lenta
```
Ma netstat avvierà una scansione moooolto più veloce in quanto è 
lo sturmento adatto da usare in locale, mentre nmap è fatto per 
scansioni su un pc remoto in LAN o all'esterno della rete locale.

Netstat, oggigiorno è deprecato in favore di "ss". La sintassi di 
"ss" è identica a quella di netstat, in modo da favorire la 
transizione (per fortuna), inoltre supporta aggiuntivi filtri, 
vediamo alcuni esempi:

```sh
 ss -nt '( dst :443 or dst :80 )' 
 # in questo caso stiamo 
 # cercando le connessioni di tipo TCP "-t" e senza risolvere i 
 # domini "-n" con porta di destinazione 443 o 80
```
```sh
 ss -nt dst :443 or dst :80 
 # equivalente al comando sopracitato
```
```sh
 ss -nt dport = :80 
 # mostra solo i dati relativi a connessioni 
 # che hanno come porta di destinazione la "80"
```
```sh
 ss -at '( dport = :ssh or sport = :ssh )' 
 # in questo caso 
 # stiamo tutte le connessioni, cioè in qualsiasi stato "-a", di 
 # tipo TCP, "-t", che hanno come porta sorgente o di destinazione 
 # il processo "ssh"
```
```sh
 ss dst 192.168.1.5 
 # mostra tutte le connessioni associate 
 # all'indirizzo IP menzionato come destinatario
```
```sh
 ss dst 192.168.1.5:http 
 # mostra tutte le connessioni associate 
 # all'indirizzo IP e porta menzionati come destinatario, al posto 
 # di "http" avrei anche potuto specificare un numero di porta
```
```sh
 ss -np -f inet 
 # è l'equivalente di netstat -np --inet e mostra 
 # solo i socket di rete associati ad IPv4 (che nella maggior 
 # parte dei casi è quello che ci interessa), guardare il man per 
 # le altre opzioni
```
```sh
 ss src 75.126.153.214 
 # mostra tutte le connessioni associate 
 # all'indirizzo IP menzionato come sorgente
```
```sh
 ss src 75.126.153.214:80 
 # mostra tutte le connessioni 
 # associate all'indirizzo IP e porta menzionati come sorgente
```
N.B.: Possiamo notare la differenza in velocità dei due comandi 
attraverso il programma "time", proviamo ad esempio ad effettuare 
un:

```sh
 time netstat -at
```
e successivamente un:

```sh
 time ss -atr 
 # il flag "-r" è utilizzato per risolvere gli 
 # indirizzi in nomi di dominio, in quanto netstat lo esegue di 
 # default, mentre "ss" no, infatti per non farlo eseguire a 
 # netstat, dobbiamo passare il flag "-n"
```
Per quanto riguarda l'output, possiamo notare che:

The "Recv-Q" and "Send-Q" columns tell us how much data is in 
the queue for that socket, waiting to be read (Recv-Q) or sent 
(Send-Q). In short: if this is 0, everything’s ok, if there are 
non-zero values anywhere, there may be trouble. If you look 
closely at the example, you’ll see that two sockets have a 
Recv-Q with 38 unread bytes in them. We’ll look into those 
connections once we know what the other columns mean.


### Iptraf

Il programma iptraf costituisce uno strumento utilizzato per 
monitorare il traffico locale di una macchina, è simile al 
programma wireshark. Vediamo alcuni esempi:

```sh
 iptraf 
 # esegue il programma iptraf
```
```sh
 iptraf -s eth0 -B & 
 # avvia in background iptraf 
 # sull'interfaccia di rete eth0, possiamo visualizzare i log in "
 # /var/log/iptraf/"
```


## Data, Ora e Linuga nei sistemi GNU/Linux


### Date, e cal

Il comando date è utilizzato per visualizzare la data e l'ora, 
vediamo alcuni esempi:

```sh
 date 
 # visualizza data e ora
```
```sh
 date -R 
 # visualizza data e ora, aggiungendo l'offset al tempo 
 # UTC
```
```sh
 date +%T 
 # visualizza solo l'ora 
```
```sh
 date +%a 
 # visualizza solo il giorno della settimana abbreviato
```
```sh
 date +%A 
 # visualizza solo il giorno della settimana
```
Nel manuale (attraverso "man date") troviamo tutta una serie di 
opzioni con cui possiamo effettuare l'output del comando date. 
Vediamo altri esempi applicativi, utili anche nel momento in cui 
scriviamo script:

```sh
 date -d now 
 # mostra la data e l'ora attuale, è analogo a "date"
```
```sh
 date -d yesterday 
 # mostra la data di ieri alla stessa ora
```
```sh
 date -d tomorrow 
 # mostra la data di domani alla stessa ora
```
```sh
 date -r nomeFile 
 # mostra l'ultima volta che è stato modificato 
 # un file
```
```sh
 date -u 
 # mostra data e ora universali "UTC"
```
```sh
 date +%T -s "14:05:3" 
 # imposta l'ora alle "14:05:3", il flag "
 # -s" possiamo ricordarlo come "set"
```
```sh
 date +%a -s "Mon" 
 # imposta il giorno della settimana a Lunedì
```
```sh
 date -s "16 jul 2013 14:00:00" 
 # imposta data e ora
```
```sh
 date --rfc-3339=date 
 # mostra nel formato RFC 3339 solo la data
```
```sh
 date --rfc-3339=seconds 
 # mostra nel formato RFC 3339 data e ora 
 # esplicitando anche i secondi
```
```sh
 date --rfc-3339=ns 
 # mostra nel formato RFC 3339 la data, l'ora, 
 # i secondi e i nanosecondi
```
```sh
 date --date='15 days ago' 
 # mostra nel formato RFC 3339 la data 
 # di quindici giorni fa
```
```sh
 date --date='15 month ago' 
 # mostra nel formato RFC 3339 la data 
 # di quindici mesi fa
```
```sh
 date --date='15 years ago' 
 # mostra nel formato RFC 3339 la data 
 # di quindici anni fa
```
```sh
 date --date='15 minutes ago' 
 # mostra nel formato RFC 3339 la 
 # data di quindici minuti fa
```
```sh
 date -u -d "@${time_in_seconds}" +"%T" 
 # mostra il tempo in 
 # ore:minuti:secondi, data in pasto una variabile chiamata "
 # time_in_seconds", quindi prima dovremmo inserire 
 # time_in_seconds=180 ad esempio
```
possiamo aprire un calendario con:

```sh
 cal 
 # visualizza il calendario, solo il mese corrente
```
```sh
 cal -A2 -B2 
 # visualizza il calendario, con "-A" dico quanti 
 # mesi successivi al presente voglio mostrare e con "-B" quanti 
 # mesi precedenti al mese corrente
```
```sh
 cal -y 1999 
 # visualizza il calendario per l'intero anno 1999
```


### Localtime e Timezone

### Localtime

Il localtime è localizzato in "/etc/localtime", questo 
costituisce un link o una copia di un file in un'altra directory, 
in quest'altra directory troviamo la lista dei vari timezone che 
possiamo selezionare, una volta trovato il timezone di interesse, 
per cambiarlo, eseguiamo:

```sh
 rm /etc/localtime 
 # per eliminare il file di localtime corrente
```
```sh
 cp /usr/share/zoneinfo/America/New_York /etc/localtime 
 # in 
 # questo caso impostiamo l'ora locale di New York e presupponiamo 
 # che i file di localtime siano localizzata in "
 # /usr/share/timezone", al posto della copia avremmo potuto 
 # creare anche un link, sarebbe stato uguale
```
```sh
 date 
 # lo usiamo per verificare che il cambio di localtime sia 
 # stato effettuato
```
Vediamo altri comandi utili:

```sh
 locale -a 
 # mostra i caratteri abilitati sul nostro sistema
```
```sh
 locale 
 # mostra tutte le impostazioni legate alla lingua sul 
 # nostra sistema di default, possiamo modificarle andando a 
 # sovrascriverle impostando variabili d'ambiente con lo stesso 
 # nome, possiamo rendere permanenti queste modifiche andando ad 
 # accodare queste variabili col loro valore nel file "
 # .bash_profile", possiamo invece applicarle globalmente al 
 # sistema (tutti gli utenti) attraverso il file "/etc/rc.local" 
 # (anche se è consigliato vedere la sezione sulla Bash e le 
 # variabili d'ambiente per utilizzare il file corretto)
```
E' da notare che la directory "/usr/share/zoneinfo" è molto 
importante, ha diverse funzioni:

* a directory and text based "database" of all available known 
  timezones throughout the world ◦
* used by a large number of applications and local system 
  utilities to get information about timezones, times in other 
  zones, zone information in large zone settings, etc ◦
* used by localtime to provide information as part of its call 
  back response to system time calls


### Timezone

Il timezone invece identifica la nostra posizione nel mondo e 
quindi le ore di differenza rispetto all'orario universale, 
quindi GMT+2 o GMT+1, infatti la differenza viene così descritta: 
Timezone tells your system where you are in the world. i.e. GMT-4 
or GMT+2 (depending on your exact location on the planet).

Localtime tells your system exactly what time it is at your 
location. Per selezionare il timezone possiamo utilizzare:

Nei sistemi Red-Hat based possiamo utilizzare i seguenti comandi:

```sh
 tzselect 
 # avvia uno script interattivo che ci permette di 
 # selezionare il timezone, alla fine dello script ci sono 
 # indicazioni su come rendere il cambio di timezone permanente
```
```sh
 export TZ="Central Time" 
 # imposta la variabile adibita al 
 # timezone a "Central Time", questa voce deve essere inserita nel 
 # file di configurazione shell .profile per diventare permanente
```
```sh
 nano /etc/timezone 
 # un'altra possibilità è modificare o creare 
 # (in caso di assenza) questo file e immetere il codice Timezone 
 # che metteremmo in altro caso nella variabile d'ambiente o che 
 # viene indicato dalla procedura tzselect, questo caso, il 
 # timezone è applicato all'intero sistema
```
Nei sistemi Debian based possiamo invece effettuare:

```sh
 dpkg-reconfigure tzdata 
 # riconfigura il timezone, una volta 
 # esisteva un comando chiamato "tzconfig" ma nelle nuove distro è 
 # deprecato
```
```sh
 export TZ="Central Time" 
 # imposta la variabile adibita al 
 # timezone a "Central Time", questa voce deve essere inserita nel 
 # file di configurazione shell .profile per diventare permanente
```
```sh
 nano /etc/timezone 
 # un'altra possibilità è modificare o creare 
 # (in caso di assenza) questo file e immetere il codice Timezone 
 # che metteremmo in altro caso nella variabile d'ambiente o che 
 # viene indicato dalla procedura tzselect, questo caso, il 
 # timezone è applicato all'intero sistema
```


### Lingua dei pacchetti e locale

Il sistema "Locale" costituisce un sottoinsieme dell'ambiente 
dell'utente che definisce la lingua dell'utente, la sua nazione e 
altre particolari opzioni che l'utente preferisce visualizzare 
nella sua personale interfaccia.

Tutte le variabili d'ambiente appartenenti al sistema "Locale" 
iniziano per `LC_`. Ad esempio `LC_TIME` è una variabile del 
sistema "locale" che definisce come la data e l'ora sono 
formattate mentre `LC_NUMERIC` può essere usato per cambiare il 
separatore decimale (punto o virgola).Vediamo ora una lista delle 
variabili del sistema "Locale":

* `LC_CTYPE` Character classification and case conversion. Also 
  indicates the language which should be used with XIM.
* `LC_NUMERIC` Non-monetary numeric formats. 
* `LC_TIME` Date and time formats. 
* `LC_COLLATE` Collation order used for comparing and sorting. 
* `LC_MONETARY` Monetary formats. 
* `LC_MESSAGES` Formats of informative and diagnostic messages and 
  interactive responses (also for graphical user interfaces). 
* `LC_PAPER` Paper format. 
* `LC_NAME` 
* `LC_ADDRESS`
* `LC_TELEPHONE`
* `LC_MEASUREMENT`
* `LC_IDENTIFICATION`

Esistono inoltre altre due variabili che modificano il valore di 
molte delle variabili che abbiamo elencato:

* `LANG`: Its value is used to set the value of all `LC_*` variables 
  which are not explicitely set (those already set are not 
  changed). Also, any `LC_*` variable can be modified after setting 
  LANG. 

* `LC_ALL`: Il suo valore sovrascriverà quello di tutte le 
  variabili `LC_*` (ma non di LANG). Dopo aver impostato `LC_ALL`, 
  tutte le modifiche a qualsiasi variabile `LC_*` non è permessa.

In generale, è raccomandato lasciare `LC_ALL` non settata, e 
settare invece la variabile LANG, e poi cambiare manualmente nel 
caso fosse necessario le altre variabili `LC_`. Per visualizzare le 
opzioni che possiamo assegnare alla variabile LANG, ci basta 
visualizzare il file "/etc/locale.gen" oppure per `LC_ALL` il file "
/etc/locale.alias" anche se la presenza di questi file deve 
sempre essere verificata a differenza della distro. Inoltre 
questi file contengono la lista delle lingue disponibili, quindi 
può essere utile consultarli. E' utile ricordare che potrebbe 
essere necessaria lanciare il comando "locale-gen" una volta 
effettuata una modifica in uno di questi file. Possiamo cambiare 
il valore delle variabili `LC_` con:

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

A volte dopo un aggiornamento i link ai file delle lingue 
potrebbero rompersi, oppure potrebbe essere utile rigenerare i 
link alle lingue in quanto abbiamo effettuato una modifica nei 
file "/etc/locale.gen" o "/etc/locale.alias" quindi possiamo 
utilizzare il comando:

```sh
 sudo locale-gen 
 # rigenera i link ai file delle lingue
```
  Modificare permanentemente la lingua di sistema

Per modificare permenentemente la lingua di sistema possiamo 
generalmente andare nel file "/etc/locale.gen", qui decommentiamo 
le lingue che ci interessano e poi lanciamo un:

```sh
 locale-gen 
 # rigenera le lingue e imposta permanentemente le 
 # lingue di sistema
```
N.B.: E' consigliato scegliere tra le varie scelte di una 
determinata lingua, quella con UTF-8 se presente.

### Tastiera


  Modifiche temporanee al layout della tastiera

Per cambiare runtime il layout della tastiera eseguiamo:

```sh
 loadkeys it 
 # per cambiare la lingua della tastiera in italiano 
 # per la sessione corrente da un ambiente terminale "shell di 
 # login"
```
se loadkeys non dovesse esserci come programma installato 
possiamo usare:

```sh
 setxkbmap it 
 # per cambiare la lingua della tastiera in 
 # italiano per la sessione corrente in un ambiente grafico
```
Per impostare permanentemente il layout della tastiera dobbiamo o 
modificare un file Xorg manualmente o utilizzare il comando "
localectl".

Dopo aver impostato il layout, potrebbe essere necessario un 
reboot, o riavviare il demone della tastiera; in altri casi 
invece la gestione del layout della tastiera è lasciata al 
Desktop Environment, quindi dovremo andare nelle impostazioni del 
Desktop Environment per poter cambiare layout.

#### Modifiche permanenti al layout della tastiera

Un keymap persistente può essere impostato attraverso il file 
/etc/vconsole.conf, che viene normalmente letto da systemd (o 
altro gestore di demoni) al boot. Possiamo trovare i layout 
disponibili con (anche se il percorso può cambiare da distro a 
distro):

```sh
 find /usr/share/kbd/keymaps/ -type f 
```
  Settaggio permanente della lingua con systemd

Ad ogni modo può risultare utile il programma "localectl" 
contenuto in "systemd":

```sh
 localectl status 
 # mostra lo stato della lingua e del layout 
 # attuale
```
```sh
 localectl list-keymaps 
 # elenca i layout disponibili
```
```sh
 localectl list-keymaps | grep -i cz 
 # ricerca il keymap "cz"
```
per impostare un layout persistente senza andare a modificare 
manualmente il file /etc/vconsole.conf facciamo:

```sh
 localectl set-keymap --no-convert it 
 # in questo caso settiamo 
 # il layout del terminale (shell di login) di tastiera italiano, 
 # l'opzione "--no-convert" può essere usata per prevenire di 
 # cambiare in automatico ad un altra lingua vicina nel caso in 
 # cui il keymap indicato non dovesse esistere
```
```sh
 localectl --no-convert set-x11-keymap it 
 # in questo caso 
 # settiamo il layout della tastiera in un ambiente X (e shell di 
 # non login), l'opzione "--no-convert" può essere usata per 
 # prevenire di cambiare in automatico ad un altra lingua vicina 
 # nel caso in cui il keymap indicato non dovesse esistere
```
#### Settaggio permanente della lingua con startx

Nel caso non si usasse systemd, possiamo aggiungere il comando "
setxkbmap it" per aggiungere il layout nel file ".xinitrc", nel 
caso usassimo "startx" per avviare l'ambiente grafico, la voce va 
aggiunta prima dell'exec dell'ambiente grafico.

#### Settaggio permanente della lingua senza startx e senza systemd

In questo caso, ad esempio se abbiamo un window manager che non 
avviamo con "startx", creiamo uno script per X, situato in "
etc/X11/xorg.conf.d/00-keyboard.conf" e ci mettiamo:

```conf
Section "InputClass"         
	Identifier "system-keyboard"
	MatchIsKeyboard "on"   
	Option "XkbLayout" "it,us"         
EndSection
```


### Character Encoding

Ogni file è scritto utilizzando un determinato Character 
Encoding, cioè un repertorio preciso di caratteri codificato in 
un certo modo, esistono diversi tipi di character encoding, i più 
famosi sono:

* UTF-8 
* ASCII
* UTF-16
* UTF-32

Un programma molto utilizzato per effettuare conversioni di 
character encoding dei file è "iconv".


### Iconv

Possiamo utilizzare il comando "iconv" per convertire un file con 
un certa codifica in un'altra:

```sh
 iconv -f ASCII -t UTF-32 nomeFile > fileConvertito 
 # il flag "
 # -f" sta per "from" e cioè specifica la codifica di partenza del 
 # file, mentre "-t" specifica la codifica finale che avrà il 
 # file, questa conversione di codifica avverrà sul file chiamato "
 # nomeFile" e il risultato sarà il file chiamato "fileConvertito"
```
per visualizzare il tipo di codifica utilizzato per un file 
possiamo utilizzare:

```sh
 file nomeFile 
 # visualizza il tipo di codifica utilizzato da un 
 # file
```
mentre per avere una lista delle codifiche disponibili col 
comando "iconv" possiamo utilizzare:

```sh
 iconv --list 
 # mostra la lista di codifiche dei caratteri 
 # disponibili quando si invoca iconv
```


### Hwclock

Il programma hwclock ha lo scopo di visualizzare o reimpostare il 
clock hardware di sistema, questo clock è fornito di batteria 
esterna e localizzato sulla nostra scheda madre, ed è lo stesso 
clock che fornisce la data e l'ora all'interfaccia firmware (es. 
BIOS). Quando si parla di sistemi GNU/Linux, in realtà il sistema 
operativo utilizza queste informazioni di orario hardware solo al 
boot, mentre una volta avviato il sistema operativo, viene 
aggiornato e utilizzato l'orario di sistema; questo avviene 
perchè quando un computer è spento non riesce ad aggiornare 
l'orario del sistema operativo, quindi al boot richiede l'orario 
hardware in modo da potersi aggiornare. Potrebbe essere utile 
salvare l'orario di sistema sull'orario hardware o viceversa. 
Vediamo alcuni esempi applicativi del programma "hwclock":

```sh
 hwclock -r 
 # visualizza l'orario hardware
```
```sh
 hwclock -s 
 # sincronizza l'orario di sistema all'orario 
 # hardware
```
```sh
 hwclock -w 
 # sincronizza l'orario hardware all'orario di 
 # sistema
```


### NTP (Network Time Protocol)

Il protocollo NTP, ha lo scopo di gestire la sincronizzazione 
dell'orario, attraverso un'architettura client-server, il 
protocollo si basa su UDP e solitamente funziona sulla porta 123. 
Il protocollo NTP, a grandi linee (molto grandi) funziona in 
questo modo: il client manda un pacchetto al server, il server 
manda l'orario esatto, e in tutto questo viene misurato il tempo 
di transito del pacchetto fino a che non ritorna al client, in 
questo modo riusciamo a sincronizzare l'ora del client a quella 
del server, ovviamente sempre con una certa varianza. NTP uses a 
hierarchical, semi-layered system of time sources. Each level of 
this hierarchy is termed a "stratum" and is assigned a number 
starting with zero at the top. A server synchronized to a stratum 
n server will be running at stratum n + 1. The number represents 
the distance from the reference clock and is used to prevent 
cyclical dependencies in the hierarchy. Stratum is not always an 
indication of quality or reliability; it is common to find 
stratum 3 time sources that are higher quality than other stratum 
2 time sources. La prima operazione da fare per usufruire del 
protocollo NTP è installarlo e possiamo farlo con:

```sh
 apt-get install ntp 
 # installa il software per il protocollo ntp
```
Una volta installato, avremo un file di configurazione in "/etc/ntp.conf"
dove potremo mettere mano alla configurazione di 
ntp. Esistono diversi server pubblici per NTP e possiamo 
aggiungerli al file ntp.conf attraverso righe come:

```sh
 server indirizzoServer.org 
 # esempio di riga all'interno di 
 # ntp.conf
```
possiamo avere più server, ed è possibile anche indicare il 
server preferito. Possiamo poi lanciare:

```sh
 service ntpd status 
 # mostra a schermo lo stato del demone che 
 # gestisce ntp, in questo caso è stato usato service, ma nel caso 
 # di systemd avremmo dovuto usare "systemctl status ntpd"
```
Una volta che ci siamo accertati che il demone è attivo, possiamo 
lanciare:

```sh
 ntpdate 
 # imposta data e ora attraverso NTP
```
Possiamo visualizzare informazioni sui nodi a cui siamo connessi 
con ntp, attraverso:

```sh
 ntpq -p 
 # visualizza informazioni sui nodi utilizzati per la 
 # sincronizzazione attraverso ntp, se davanti al nome del nodo 
 # vediamo un asterisco "*", allora vuol dire che attualmente 
 # siamo sincronizzati a quel nodo, qui possiamo vedere 
 # informazioni come livello di stratum "st", delay (tempo 
 # impiegato dal pacchetto ad arrivare al server e tornare di 
 # nuovo al client), jitter (deviazione nel tempo che viene 
 # riportato dal server al client), offset, eccetera
```


## Stampare

Per stampare sui sistemi GNU/Linux il programma principale 
utilizzato è CUPS, anche se in passato era molto utilizzato LPD e 
molte distro ancora lo supportano, quindi diamo un'occhiata ad 
entrambi.


### LPD (Linux Printer Daemon)

LPD ha costituito per molti anni un sistema di gestione del 
sistema di stampa, è utile conoscerlo in quanto il più moderno 
CUPS è compatibile con LPD, e i comandi sono analoghi. Per 
installa il sistema LPD, eseguiamo:

```sh
 sudo apt-get install lpr 
 # installa il sistema LPD, nota che 
 # LPD non può essere installato assieme a CUPS, possiamo avere o 
 # l'uno o l'altro
```
Vediamo alcuni esempi di applicazione dei comandi di stampa:

```sh
 lpr -P PDF test.txt 
 # in questo caso, eseguiamo una stampa, e 
 # col flag "-P" scegliamo la stampante, che è un file PDF, mentre 
 # il file da stmpare è test.txt
```
```sh
 lpr test.txt 
 # in questo caso stampa con la stampante di 
 # default
```
```sh
 lpstat -d 
 # mostra il nome della stampante di default
```
```sh
 lpstat -p 
 # mostra la lista di tutte le stampanti associate 
 # alla macchina
```
```sh
 lpoptions -d nomeStampante 
 # mostra informazioni sulla 
 # stampante, le info mostrate con questo comando devono essere 
 # messe nel file "/etc/printcap" se non già esistenti, (non in 
 # tutte le distro esiste questo file) che è un link al file "
 # /etc/cups/printers.conf" (questo esiste in tutte le distro) 
 # infatti all'interno di questo file troviamo anche la lista 
 # delle stampanti con le relative informazioni
```
Per stampare possiamo sia usare il comando "lp" che il comando "
lpr", sono analoghi, differiscono solo per parametri, ad esempio:

```sh
 lp -d nomeStampante nomefile 
 # stampa il file chiamato nomeFile 
 # con la stampante nomeStampante
```
```sh
 lpr -P nomeStampante nomefile 
 # stampa il file chiamato 
 # nomeFile con la stampante nomeStampante
```
```sh
 xpp 
 # apre il gestore grafico adibito alla stampa, comodo 
 # quando abbiamo X a disposizione
```
```sh
 cupsenable nomeStampante 
 # riabilita una stampante se è stata 
 # disabilitata
```


### CUPS (Common Unix Printing System)

CUPS è un sistema di stampa per sistemi GNU/Linux caratterizzato 
da un sistema di gestione via browser, che semplifica il 
settaggio delle impostazioni, possiamo di default accedere a 
questo sistema, collegandoci a "localhost:631". E' sempre buona 
norma installare una stampante PDF, che è molto utile. Per 
installa cups, facciamo:

```sh
 apt-get install cups 
 # installa cups
```
```sh
 apt-get install cups-pdf 
 # installa la stampante pdf
```
Per quanto riguarda la linea di comando, valgono gli stessi 
comandi utilizzati per LPD, sia per stampare, che per 
gestire/visualizzare le stampanti.

Infatti CUPS mantiene una certa compatibilità con LPD, ad esempio 
la maggior parte dei comandi sono rimasti uguali, rimpiazza LPD 
con un sistema di più semplice gestione. Di default, CUPS è 
basato su due demoni, che gestiscono il sistema di stampa:

* cupsd
* cups-browsed

Per avviare (o riavviare) il demone di che gestisce il sistema di 
stampa, che può essere in alcune distro un'operazione necessaria 
dopo l'installazione, possiamo effettuare:

```sh
 /etc/init.d/cupsd restart 
 # riavvia il demone che gestisce il 
 # sistema di stampa, con systemd sarebbe "systemctl restart cupsd"
```
```sh
 /etc/init.d/cups-browsed restart 
 # riavvia il demone che 
 # gestisce il sistema di configurazione via web, con systemd 
 # sarebbe "systemctl restart cups-browsed"
```
Inoltre se al riavvio non è abilitato, è buona norma abilitarlo 
dopo ogni boot (la maggior parte delle distro dovrebbe farlo di 
default), con systemd possiamo usare:

```sh
 systemctl enable cupsd 
 # abilita anche dopo il boot cupsd
```
```sh
 systemctl enable cups-browsed 
 # abilita anche dopo il boot 
 # cups-browsed
```
Vediamo ora alcuni file di configurazione e directory importanti:

* "/etc/cups/cups-browsed.conf": questo file di configurazione 
  contiene le impostazioni di configurazione del server di 
  stampa, in questo file, possiamo abilitare o disabilitare 
  indirizzi ip per cercare/trovare stampanti, possiamo 
  restringere il range di ip, da cui gli altri ad esempio possono 
  stampare

* "/etc/cups/cupsd.conf": questo file di configurazione contiene 
  la porta di configurazione di CUPS e l'indirizzo a cui è 
  hostato il webserver di configurazione, che di default è "localhost:631"

* "/var/spool/cups": questa directory contiene tutti i file 
  rappresentanti i Job per cui è stata richiesta una stampa, 
  finchè questi job non vengono rimossi da qui, una richiesta di 
  stampa può essere rieseguita


### Gestione delle Code con CUPS

Vediamo ora alcuni comandi per gestire le code con CUPS:

```sh
 lpstat -a 
 # mostra lo stato di tutte le stampanti
```
```sh
 lpq 
 # mostra la coda di stampa, ad ogni richiesta di stampa è 
 # associato un "Job" ID che permette di identificare univocamente 
 # la richiesta, se quando effettuiamo questo comando leggiamo in 
 # testa che la stampante non è pronta, ma con lpstat invece dice 
 # che è pronta ad accettare richieste, questo vuol dire che la 
 # stampante è in pausa
```
```sh
 lpq -P nomeStampante 
 # mostra la coda di stampa per la 
 # stampante nomeStampante
```
```sh
 lprm 
 # rimuove tutti i Job per la stampante di default
```
```sh
 lprm 22 
 # rimuove il job con ID 22
```
```sh
 cupsenable nomeStampante 
 # riabilita la stampante 
 # nomeStampante, se era in pausa ora è di nuovo possibile 
 # stampare
```
```sh
 cupsdisable nomeStampante 
 # disabilita la stampante 
 # nomeStampante, mettendola in uno stato di pausa, le richieste 
 # verranno messe in coda
```
```sh
 cupsreject nomeStampante 
 # non permette di effettuare stampe, 
 # le richieste non verranno messe in coda, ma reiettate
```
```sh
 cupsaccept nomeStampante 
 # riabilita la stampante dallo stato 
 # di "reject" abilitato col comano precedente
```
## Scansione Documenti

Un famoso pacchetto per la scansione dei documenti è "sane" ed "
xsane", quest'ultimo costituisce la versione grafica. Una volta 
installati dobbiamo assicurarci di aver aggiunto l'utente con cui 
si vuole utilizzare il dispositivo di scansione al grouppo di 
scansione, solitamente questo è il gruppo "scanner" o il gruppo "
lp", quindi si eseguirà:

```sh
 sudo usermod -a -G scanner nomeUtente 
 # per aggiungere il 
 # gruppo "scanner" all'utente nomeUtente
```
oppure 

```sh
 sudo usermod -a -G lp nomeUtente 
 # per aggiungere il gruppo "lp"
 # all'utente nomeUtente
```
nel caso non si conoscesse il gruppo e non si dovesse sapere come 
aggiungere il proprio utente, possiamo attraverso il comando:

```sh
 lsusb 
 # visualizza le periferiche usb (utile se il nostro 
 # scanner è usb
```
oppure 

```sh
 lspci 
 # visualizza le periferiche pci (utile se il nostro 
 # scanner è pci)
```
visualizzare il numero di "bus" ed il numero di "device", in 
questo modo possiamo o aggiungere manualmente i permessi di 
scrittura sulla periferica o ricavare il gruppo, se ad esempio il 
nostro lsusb ritorna un'output del genere del tipo:

```sh
 Bus 002 Device 001: ID 1d6b:0002 Scanner XY 
 # output del 
 # comando lsusb (o lspci)
```
allora andremo ad eseguire:

```sh
 sudo chmod a+w /dev/bus/usb/002/001 
 # impostiamo i diritti di 
 # scrittura per tutti gli utenti sulla periferica
```
in realtà una modalità meno brusca sarebbe quella di effettuare:

```sh
 ls -al /dev/bus/usb/002/ 
 # visualizza l'elenco file nella 
 # directory contenente il dispositivo d'interesse
```
da questo elenco dovremo vedere un file col device ID del nostro 
scanner, dopo l'utente proprietario (che solitamente è root) 
vedremo un gruppo, ecco ci basta aggiungere quel gruppo 
all'utente con cui vogliamo utilizzare lo scanner, se il gruppo 
non dovesse esistere, possiamo creare un nostro gruppo e 
assegnarlo al device, e aggiungere al nostro utente quel gruppo.


### Programmi per Scansione Documenti

Possiamo usare il programma "xscanimage" per scandire 
un'immagine, questo programma è contenuto solitamente nel 
pacchetto "sane-frontends". AGGIUNGERE UN MINITUTORIAL A 
XSCANIMAGE


### Gestire documenti pdf

Possiamo convertire documenti di immagini o pdf attraverso il programma
*convert* presente nel pacchetto imagemagick.
Il programma **convert** nonostante sia molto utile per convertire immagini non
fornisce l'approccio ottimale per dividere o unire (split o join) documenti pdf,
per poter manipolare documenti pdf esistono tantissimi programmi, ma uno di
questi che nella mia esperienza ho trovato particolarmente comodo e' **pdftk**,
vediamo alcuni esempi:


```sh
pdftk file1.pdf file2.pdf file3.pdf cat output newfile.pdf
# joina file1 file2 and file3 in un singolo pdf file chiamato newfile.pdf
```

```sh
pdftk newfile.pdf burst
# crea un file pdf per ogni paginal del file menzionato
```

```sh
pdftk A=one.pdf B=two.pdf cat A1-7 B1-5 A8 output combined.pdf
# unisce i due file andando a specificare quali pagine utilizzare e come
# combinarle per produrre il file finale
```

```sh
pdftk A=one.pdf cat A1-5 A8 A7 output combined.pdf
# genera un file pdf con le pagine dalla 1 alla 5 poi la 8 e poi la 7 del file
# one.pdf
```

```sh
pdftk A=one.pdf cat A12-end output combined.pdf
# genera un file pdf solo con le pagine dalla 12 in poi
# a partire dal file one.pdf
```

Possiamo anche criptare i file pdf, ad esempio:
```sh
pdftk mydoc.pdf output mydoc.128.pdf owner_pw foopass
# cripta il file mydoc.pdf in un nuovo file chiamato mydoc.128.pdf
# con password "foopass" senza doppi apici
```


## Filesystems e Tuning


### Ext Utilities

Other useful utilities on ext filesystems are attributes, which 
are characteristics of files, we can view attributes with 

```sh
 lsattr to view attributes
```
or we can change attributes with:

```sh
 chattr +i fileName
```
the attributes "i" says that now the file is not deletable, there 
are many flags, and it is recommended to view them by doing a "
man chattr", for example a good way to reduce I/O is to tell the 
OS to not save date and hour informations on disk with a certain 
flag, which is "A" (very useful for laptops), it is a good idea 
for the Orlov block allocator to set the /home directory with a "
T" flag, since its subdirectories are not related and can be on 
separated disk's blocks.


## Automatizzare Processi

Nei sistemi unix-like due strumenti molto utilizzati per 
automatizzare processi sono:

* cron (e anacron per macchine non server)
* AT


### Cron

Cron è uno strumento nato per pianificare processi/operazioni, 
devo ricordare che esistono diverse gerarchie di configurazione:

```sh
 System Cron 
 # Un sistema di automatizzazione processi a livello 
 # di sistema
```

* Il file in cui sono contenute le configurazioni di sistema è "
    /etc/crontab", e una volta modificato e salvato il file, le 
    modifche verranno applicate automaticamente, senza nessuna 
    necessità di riavviare servizi.

```sh
 User Cron 
 # Un sistema di automatizzazione processi a livello 
 # utente
```

* Le configurazioni a livello utente invece sono contenute 
    nella directory "/var/spool/cron" o "/var/spool/crontab/", la 
    collocazione della directory dipende dalla distro, anche se è 
    sconsigliato mettere mano direttamente a questi file, 
    l'editing deve avvenire tramite comando "crontab -e"

Possiamo modificare la configurazione di un utente attraverso il 
comando:

```sh
 crontab -e 
 # modifica la configurazione di crontab a livello 
 # utente, è valido per l'utente che ha lanciato il comando, una 
 # volta modificato, il file sarà salvato all'interno della 
 # directory "/var/spool/cron/" o "/var/spool/crontab", mentre i 
 # log sono memorizzati in "/var/log/cron" o in "var/log/crontab", 
 # anche in questo caso dipende dalla distro utilizzata.
```
Vediamo altri esempi di comandi crontab:

```sh
 crontab -l 
 # visualizza il file di crontab
```
```sh
 crontab -r 
 # rimuove i file di crontab
```
```sh
 crontab -v 
 # mostra l'ultima volta che è stato modificato il 
 # file di crontab
```
```sh
 tail -f /var/log/cron 
 # mostra in tempo reale il log del cron, 
 # è utile sia per effettuare verifiche che per monitorare alcune 
 # attività del sistema
```
Analizziamo ora la configurazione di sistema, le prime righe del 
file "/etc/crontab" contengono alcune opzioni, come il tipo di 
shell utilizzata, dove andare a pescare i programmi eeguibili, 
eccetera. Solitamente (in alcune distro) sono contenuti già dei 
processi di automatizzazione di default che puntano a determinate 
directory, vediamo un esempio di file di configurazione globale:

```conf
01 * * * * root run-parts /etc/cron.hourly

02 4 * * * root run-parts /etc/cron.daily

22 4 * * 0 root run-parts /etc/cron.weekly

42 4 1 * * root run-parts /etc/cron.monthly
```

In pratica tutto quello contenuto in queste directory viene 
inteso come processo da automatizzare, questo grazie all'opzione 
inserita "run-parts". Recapitolando le directory importanti sono:

```sh
 /etc/crontab 
 # file di configurazione globale
```
```sh
 /var/spool/cron || /var/spool/crontab 
 # file di configurazione 
 # a livello utente
```
```sh
 /var/log/cron || /var/log/crontab 
 # file di log relativi al 
 # crontab
```
Altri file importanti sono:

```sh
 /etc/cron.deny 
 # tutti gli utenti elencati in questo file non 
 # possono usare cron, gli utenti sono separati da un invio
```
```sh
 /etc/cron.allow 
 # a tutti gli utenti del sistema non è 
 # possibile usare cron eccetto a quelli elencati in questo file
```
N.B.: Solo uno dei file elencati sopra deve esistere, altrimenti 
le informazioni fornite dai due file sono in conflitto, inoltre è 
da ricordare che l'utente di root è esente da queste regole, root 
può sempre tutto.


### Come pianificare le operazioni nei file di crontab

La pianificazione di un'operazione è suddivisa su 7 campi:

1. indica i minuti
2. indica le ore
3. indica il giorno del mese
4. indica il mese
5. indica il giorno della settimana
6. indica l'utente con cui eseguire il comando
7. indica il comando da eseguire

Vediamo alcuni esempi (ricorda che il nomeUtente è incluso solo 
nel file "/etc/crontab" quindi nella configurazione globale, 
mentre per le configurazioni locali basta mettere solo il comando 
dopo aver specificato i primi 5 campi):


```sh
 * 2 * * * nomeUtente nomeComando 
 # indica di eseguire il 
 # comando "nomeComando" alle 2 AM, per tutti i minuti (quindi 
 # dalle 2.00 alle 2.59), tutti i giorni del mese, tutti i mesi, 
 # tutti i giorni della settimana
```
```sh
 * 2-5 * * * nomeUtente nomeComando2 
 # indica di eseguire il 
 # comando "nomeComando2" dalle 2AM alle 5AM, per tutti i minuti 
 # (quindi dalle 2.00 alle 5.59), tutti i giorni del mese, tutti i 
 # mesi, tutti i giorni della settimana
```
```sh
 * 2,5 * * * nomeUtente nomeComando3 
 # indica di eseguire il 
 # comando "nomeComando3" dalle 2AM alle 3 AM e dalle 5AM alle 6 
 # AM, per tutti i minuti, tutti i giorni del mese, tutti i mesi, 
 # tutti i giorni della settimana
```
```sh
 * * 1-20 * * nomeUtente nomeComando4 
 # indica di eseguire il 
 # comando "nomeComando4" per tutti i minuti, tutte le ore, ma 
 # solo per i giorni dall'1 al 20 del mese, tutti i mesi, tutti i 
 # giorni della settimana
```
```sh
 * * * * 5 nomeUtente nomeComando5 
 # indica di eseguire il 
 # comando "nomeComando5" per tutti i minuti, tutte le ore, tutti 
 # i mesi, solo il venerdì
```
```sh
 * * * * 0 nomeUtente nomeComando5 
 # indica di eseguire il 
 # comando "nomeComando5" per tutti i minuti, tutte le ore, tutti 
 # i mesi, solo la domenica
```
```sh
 */2 * * * * nomeUtente nomeComando6 
 # indica di eseguire il 
 # comando "nomeComando6" ogni due minuti, col carattere slash 
 # indichiamo la frequenza
```
```sh
 3-50/2 * * * * nomeUtente nomeComando7 
 # indica di eseguire il 
 # comando "nomeComando dal minuto 3 al minuto 50 di ogni ora di 
 # ogni giorno ogni 2 minuti
```
```sh
 @reboot macchanger -r wlan0 
 # in questo caso questa operazione 
 # viene effettuata ad ogni reboot, quindi ogni volta che 
 # accendiamo il computer, viene avviata l'applicazione macchanger 
 # per fare in modo che il nostro MAC address venga cambiato con 
 # uno generato casualmente
```
```sh
 40 * * * * cd /home/user/scripts/ && bash myscript.sh 
 # execute 
 # a bash script every hour at minute 40
```
nel caso volessimo schedulare più comandi ogni x minuti ma uno 
successivo all'altro possiamo usare un trucchetto, questo 
trucchetto ci permette di avere una granularità al secondo con 
cron:

```conf
*/2 * * * * cd /home/user/scripts && bash first.sh

*/2 * * * * cd /home/user/scripts && sleep 15 bash second.sh

*/2 * * * * cd /home/user/scripts && sleep 30 bash third.sh > 
/home/user/logs/log.txt 2>&1

*/2 * * * * cd /home/user/scripts && sleep 45 bash fourth.sh
```

E' utile ricordare che il sistema manda dei messaggi all'utente 
in /var/mail/$USER. Possiamo assicurarci che cron si sia avviato 
da /var/log/syslog o /var/log/cron, è utile ricordare che 
dobbiamo riavviare il servizio di cron ongi qualvolta cambiamo la 
configurazione.


### AT

Il programma "at" ci permette di pianificare operazioni che 
dovranno avvenire nel futuro, ma a differenza di Cron che 
pianifica operazioni periodiche, AT ci permette di pianificare 
operazioni che devono essere effettuate una volta sola. Vediamo 
subito qualche esempio applicativo:

```sh
 at now + 1 minute 
 # esegui le operazioni che ti indicherò dopo 
 # l'invio tra un minuto, una volta inseriti i comandi, dobbiamo 
 # premere Ctr+D per terminare
```
```sh
 at now + 3 minutes 
 # esegui le operazioni che ti indicherò dopo 
 # l'invio tra tre minuti, una volta inseriti i comandi, dobbiamo 
 # premere Ctr+D per terminare
```
```sh
 atq 
 # visualizza le operazioni pianificate col comando at, e 
 # quando verranno eseguite
```
```sh
 at now + 5 hours 
 # esegui le operazioni che ti indicherò dopo 
 # l'invio tra cinque ore, una volta inseriti i comandi, dobbiamo 
 # premere Ctr+D per terminare
```
```sh
 at 1430 
 # esegui le operazioni che ti indicherò dopo l'invio 
 # alle 14.30, una volta inseriti i comandi, dobbiamo premere 
 # Ctr+D per terminare
```
```sh
 at teatime 
 # esegui le operazioni che ti indicherò dopo l'invio 
 # alle 4 PM, una volta inseriti i comandi, dobbiamo premere Ctr+D 
 # per terminare
```
```sh
 atrm jobNumber 
 # rimuove un'operazione pianificata con "at", il 
 # jobNumber possiamo visualizzarlo eseguendo "atq"
```
Vediamo altri esempi possibili autoesplicativi:

```sh
 at now 2:30 PM tomorrow
```
```sh
 at 2:30 PM next month
```
```sh
 at 2:30 PM Fri
```
```sh
 at 9:00 AM
```
```sh
 at midnight
```
```sh
 at noon
```
```sh
 at 2:30 PM 21.10.14
```
```sh
 at 2:30 PM 10/21/2014
```
```sh
 at 4 PM + 2 days
```
```sh
 at now + 3 weeks
```
```sh
 at now + 4 months
```
```sh
 at next monday
```
```sh
 at now + 5 years
```

Alcuni file importanti sono:

* /etc/at.deny 
  tutti gli utenti elencati in questo file non 
  possono usare at, gli utenti sono separati da un invio
* /etc/at.allow 
  a tutti gli utenti del sistema non è possibile 
  usare at eccetto a quelli elencati in questo file

N.B.: Solo uno dei file elencati sopra deve esistere, altrimenti 
le informazioni fornite dai due file sono in conflitto, inoltre è 
da ricordare che l'utente di root è esente da queste regole, root 
può sempre tutto.


## Secure Host

* hardening (add stuff)
* Move Capabilities here?
* finger

## Accesso Remoto e SSH


### SSH

L'accesso remoto ha molteplici vantaggi e utilità, in passato a 
questo scopo veniva molto utilizzato Telnet, ma siccome il 
protocollo è oggigiorno altamente insicuro, è stato sostituito 
con SSH, che utilizza algoritmi per criptare le comunicazioni. Il 
client SSH, è installato di default su tutte le moderne distro, 
ma nel caso ci dovesse servire un server SSH, facciamo:

```sh
 apt-get install openssh-server 
 # installa il server ssh, in una 
 # distro Red-Hat based avremmo eseguito yum install 
 # openssh-server
```
Per avviare il servizio ssh, una volta installato eseguiamo:

```sh
 /etc/init.d/ssh restart 
 # riavvia o lancia il servizio ssh, 
 # nota che in alcune distro, come le Red-Hat based, il servizio è 
 # chiamato sshd
```
Vediamo ora alcuni comandi per eseguire accesso con ssh:

```sh
 ssh -l nomeUtente 192.168.1.100 
 # esegue l'accesso ssh, con 
 # l'utente nomeUtente all'indirizzo ip indicato
```
```sh
 ssh nomeUtente@192.168.1.100 
 # analogo al comando precedente
```
```sh
 ssh -l nomeUtente -v 192.168.1.100 
 # esegue ssh in modalità 
 # verbose, mostrando più info per quanto riguarda la connessione, 
 # utile per risolvere problemi
```
```sh
 ssh nomeUtente@192.168.1.114 -t 'command; bash -l' 
 # si 
 # connette alla macchina ed esegue il comando specificato, dopo 
 # il comando apre una shell
```
```sh
 ssh -l nomeUtente -vv 192.168.1.100 
 # esegue ssh in modalità + 
 # verbose, mostrando più info per quanto riguarda la connessione, 
 # utile per risolvere problemi
```
```sh
 ssh -l nomeUtente -vvv 192.168.1.100 
 # esegue ssh in modalità 
 # ancora + verbose della precedente, mostrando più info per 
 # quanto riguarda la connessione, utile per risolvere problemi
```
```sh
 ssh -i deployment_key.txt demo@192.237.248.66 
 # effettuo il 
 # login, specificando la chiave privata ssh dell'account demo, 
 # nota che sul file devono essere applicati i permessi 600, per 
 # farlo prima di eseguire il login eseguiamo:
```

```sh
 chmod 600 deployment_key.txt
```

Una volta eseguito per la prima volta l'accesso, ci verrà chiesto 
qualora vogliamo salvare la chiave RSA, questa chiava verrà 
salvata in un file e ci permetterà di verificare le successive 
connessioni alla macchina. Dopo il primo utilizzo di ssh, 
troveremo nella directory home una directory chiamata ".ssh/", in 
questa directory esisterà un file chiamato "known_hosts", che 
conterrà le chiavi per verificare le connessioni alle varie 
macchine per cui siamo già stati collegati almeno una volta; nel 
caso dovessimo avere problemi a connetterci ad una macchina a cui 
siamo stati collegati in passato, allora la soluzione è 
cancellare il file "known_hosts" o cancellare la voce 
corrispettiva alla macchina.

NOTA BENE: Nel caso in cui dopo la prova d'accesso non vedo 
nessun messaggio, cioè nemmeno messaggi d'errore, il problema è 
il firewall, dovremo infatti aprire la porta su cui vogliamo 
servire il servizio ssh.


Possiamo anche effettuare automaticamente un doppio login ssh attraverso un po'
di configurazione nel file .ssh/config, impostandolo in questo modo:

```txt
TCPKeepAlive yes
ServerAliveInterval 30

Host mynestedhost
User nebbione
ProxyCommand ssh -q john@reachable.host.it nc %h %p
```
A questo punto possiamo raggiungere mynestedhost attraverso un:
```sh
ssh -l nomeutente mynestedhost
```


#### Chiavi DSA e RSA

Un metodo di accesso più semplice è quello di utilizzare chiavi 
per il login anzichè password degli utenti sulla macchina remota, 
in quanto le password degli utenti sono hackabili attraverso 
bruteforce, non c'è un meccanismo di encryption ma solo una 
verifica degli hash, mentre utilizzando una chiave si riesce ad 
avere un sistema di sicurezza maggiore attraverso un'encrypting 
della passphrase. SSH supporta chiavi DSA e RSA, ma la scelta più 
sicura è RSA, in quanto più casuale, quindi più difficile da 
crackare con un brute-force. Possiamo decidere sia algoritmo che 
grandezza della chiave, vediamo come generare una chiave:

```sh
 ssh-keygen -t dsa 
 # crea una chiave di tipo "-t" DSA, questo 
 # genera due file, uno chiamato "id_dsa" e l'altro chiamato "
 # id_dsa.pub", il secondo costituisce la chiave pubblica che 
 # viene trasmessa quando deve avvenire un exchange di chiavi, ed 
 # è quello che viene utilizzato per decriptare la chiave privata
```
Se avessimo voluto creare una chiave rsa, avremmo fatto:

```sh
 ssh-keygen -t rsa 
 # crea una chiave RSA, anche in questo caso 
 # vengono generati due file
```
Una volta generate le chiavi, eseguiamo:

```sh
 # ssh-copy-id nomeUtenteConCuiCiVogliamoConnettere@192.168.1.195 
  
 # copia le chiavi generate e presenti sull'account da cui viene 
 # eseguito il comando, (è possibile usare il flag "-i" per 
 # specificare file diversi da quello di default), se l'utente ha 
 # sia file di chiavi DSA che RSA, viene automaticamente scelta la 
 # chiave RSA, in quanto più sicura, richiederà la password 
 # dell'utente. Attenzione, l'utente indicato nel comando indica 
 # un'utente presente sulla macchina remota, e l'indirizzo ip 
 # rappresenta la macchina remota
```
Una volta eseguito lo scambio di chiavi, possiamo effettuare il 
login, senza specificare l'utente, facendo:

```sh
 ssh 192.168.1.195 
 # effettua il login, chiedendoci la password 
 # relativa alla chiave scambiata
```
Una volta eseguito il login, possiamo notare sulla macchina 
remota la generazione di un file chiamato "authorized keys" nella 
directory dell'utente ssh ".ssh/", questo file regola gli accessi 
attraverso le chiavi, o meglio contiene la chiave pubblica 
id_rsa.pub che possiede il client. Infatti nel caso lo 
eliminassimo, allora il login sarebbe ancora disponibile ma solo 
attraverso la password dell'utente, cioè login classico. Per una 
spiegazione dettagliata del funzionamento di SSH, fare 
riferimento a [www.slashroot.in/secure-shell-how-does-ssh-work||Guida ad SSH].


#### SSH-Agent

E' possibile tenere in memoria le password attraverso ssh-agent, 
questo è un demone che basilarmente tiene salvate le password in 
memoria, in modo che non è necessario reinserire la chiave tutte 
le volte, possiamo lanciarlo attraverso:

```sh
 eval `ssh-agent -s` 
 # esegue in background il programma 
 # ssh-agent, con shell BASH
```
ora possiamo aggiungere le chiavi possedute all'agent eseguendo:

```sh
 ssh-add 
 # aggiunge le chiavi presenti nella home directory 
 # dell'utente all'agent
```
Ora, per tutto il tempo per cui saremo connessi, non dovremo più 
usare la passphrase, possiamo verificare la corretta 
memorizzazione delle password, eseguendo un:

```sh
 ssh-add -l 
 # visualizza gli utenti ssh per cui è memorizzata la 
 # password
```
  SSH Config Files

Nella directory "/etc/ssh" troviamo file di configurazione di 
ssh, e una serie di chiavi utilizzate dal sistema come seme per 
generare le chiavi dei vari utenti; i due file principali sono:

```sh
 /etc/ssh/ssh_config 
 # costituisce il file di configurazione per 
 # il client SSH, ad esempio se usiamo di default una porta 
 # diversa dalla 22, per l'ssh, qui possiamo inserire "Port 34213" 
 # nel caso volessimo usare la porta 34213 di default, in questo 
 # modo non dobbiamo tutte le volte inserire il flag "-p" per 
 # specificare la porta
```
```sh
 /etc/ssh/sshd_config 
 # costituisce il file di configurazione 
 # per il server SSH
```
una configurazione utile lato client, se non volessimo che la 
connessione cadesse con un server ssh, è quella di configurare 
l'invio periodico di pacchetti null, possiamo effettuare questa 
configurazione andando a mettere la stringa: "ServerAliveInterval 
10" all'interno di /etc/ssh/ssh_config o /etc/ssh_config.

Inoltre per chiudere una connessione ssh bloccata possiamo 
utilizzare il carattere di escape di ssh che è "~.".


#### SSH ed X

E' possibile utilizzare ssh e poter runnare programmi grafici, 
per poter effettuare questo, lato server dobbiamo abilitare la 
voce "X11Forwarding yes" nel file "/etc/ssh/sshd_config", mentre 
lato client ci basterà eseguire:

```sh
 export DISPLAY=:0.0
```
```sh
 ssh -X nomeUtente@192.168.1.114 
 # in questo caso stiamo 
 # abilitando l'X forwarding lato client
```
ora potremo avviare qualsiasi applicazione grafica, quindi ad 
esempio "firefox" o qualsiasi altra cosa, e vedremo una finestra 
separata aprirsi, lato client ssh.


#### Check dei Log di SSH

La posizione dei log varia in base alla distro, possiamo trovarli comunque su
a seguenti path:

* `/var/log/secure`
* `/var/log/auth`
* `/var/log/btmp`, keeps track of failed login attempts.


oppure nelle distribuzioni utilizzanti systemctl e journalctl possiamo usare:

```sh
 journalctl -l -u sshd
 # check dei log ssh attraverso il demone
```
puo' essere utile impostare il demone ssh su una porta diversa da quella
standard 22, per evitare traffico inutile e superfluo di utenti con scopi
malevoli che provano il bruteforce delle password.


#### SSHFS

SSHFS è un file system per i sistemi operativi unix-like (Mac OS 
X, Linux, BSD). Questo file system permette di montare in locale 
una directory posizionata su un server remoto in cui gira SSH, 
similmente a quanto avviene con le cartelle condivise di 
netbios/samba ma con il vantaggio di avere una connessione 
cifrata non intercettabile (tramite ssh). Questo software 
implementa il modulo del kernel FUSE. Possiamo installarlo, 
eseguendo:

```sh
 sudo apt-get install sshfs fuse
```
poi ci assicuriamo che il modulo fuse sia caricato all'interno 
del kernel:

```sh
 lsmod | grep fuse 
 # visualizza se il modulo del kernel "fuse" è 
 # caricato o meno, se non caricato, dobbiamo caricarlo
```
poi dobbiamo aggiungere l'utente di root al gruppo fuse, 
eseguendo ad esempio:

```sh
 useradd root fuse 
 # aggiunge l'utente root al gruppo fuse, se 
 # il gruppo fuse non esiste, dobbiamo crearlo
```
Poi creiamo la directory in cui vogliamo montare il filesystem 
con:

```sh
 sudo mkdir /mnt/sshfs_home_milano 
 # crea una directory, questa 
 # directory verrà usata per hostare la directory remota
```
```sh
 chown root /backup
```
Vediamo il comando per effettuare il mount:

```sh
 sshfs -o idmap=user andrew@192.168.0.69:/home/utente_remoto /mnt/sshfs_home_milano 
 # montiamo la directory /etc della 
 # macchina remota all'indirizzo IP indicato nella directory in 
 # /mnt/etc_on_server/, nota che l'opzione -o idmap=user deve 
 # essere ricopiata così com'è, cioè NON dobbiamo sostituire a "
 # user" il nostro nome utente.
```
Possiamo eventualmente (opzionale) aggiungere la partizione ad 
fstab, con una voce del tipo:

```conf
sshfs://user@remote.machine.net:/remote/dir /work fuse user,_netdev,reconnect,uid=1000,gid=1000,idmap=user,allow_other 0 0
```


#### SCP

Per copiare file attraverso ssh, possiamo utilizzare il comando "
scp", la sintassi è questa:

```sh
 scp nomeFile nomeUtente@ipAddress:/path/to/Dir 
 # in questo caso 
 # copiamo un file dalla nostra macchina ad un server remoto
```
```sh
 scp -r /media/disk/estate_pics/ mike@192.168.1.1:"/var/www/Estate 2014/" 
 # in questo caso viene 
 # copiata una directory attraverso il flag "-r"
```


#### SFTP

Per avere un'interfaccia più comoda per il trasferimento file, 
possiamo utilizzare il protocollo "sftp", cioè una versione 
criptata del protocollo "ftp", solitamente è installato in 
automatico, una volta installato un server ssh, possiamo accedere 
alla comoda interfaccia per il trasferimento file, attraverso:

```sh
 sftp linus@kernel.org 
 # si connette all'sftp del dominio 
 # specificato
```
oppure se è stato impostato un server ssh, possiamo utilizzare:

```sh
 sftp nomeUtente@ipAddress 
 # cioè proprio come un normale 
 # accesso ssh, infatti il trasferimento file avviene nei termini 
 # del protocollo ssh
```
```sh
 sftp -P 4555 nomeUtente@ipAddress 
 # avvia sftp sulla porta 
 # specificata
```
una volta effettuato l'accesso possiamo eseguire diverse 
operazioni interessanti, ad esempio:

```sh
 ls 
 # mostra i file sulla macchina remota
```
```sh
 lls 
 # mostra i file sulla macchina locale, è da notare che i 
 # noti comandi preceduti da "l", indicano un'esecuzione sulla 
 # nostra macchina
```
```sh
 cd nome/dir 
 # cambia directory sulla macchina remota
```
```sh
 lcd nome/dir 
 # cambia directory sulla nostra macchina locale
```
```sh
 get nomeFile 
 # scarica il file dalla presente nella macchina 
 # remota e lo mette sulla macchina locale nella directory 
 # corrente (visualizzabile con lpwd)
```
```sh
 get nomeFile /home/giuseppe/miaDir/mioFile 
 # scarica il file 
 # dalla presente nella macchina remota e lo mette sulla macchina 
 # locale nella directory specificata nel comando
```
```sh
 get -r percorso/nomeDir 
 # scarica in locale la directory, "-r" 
 # sta per recursively, ed è utilizzato per trasferire directory 
 # intere
```
```sh
 put nomeFile 
 # fa l'upload di un file presente sulla macchina 
 # locale nella directory corrente della macchina remota 
 # (visualizzabile con pwd)
```
```sh
 put nomeFile /nomeDir/remota/nomeFile 
 # fa l'upload di un file 
 # presente sulla macchina locale nella directory specificata 
 # sulla macchina remota
```
```sh
 put -r percorso/nomeDir 
 # fa l'upload della directory, "-r" sta 
 # per recursively, ed è utilizzato per trasferire directory 
 # intere, attenzione la directory deve esistere sul server 
 # remoto, se non esiste la copia non avviene, infatti in genere 
 # uqesto comando è preceduto da "mkdir percorso/nomeDir"
```
```sh
 !nomeComando 
 # esegue il comando "nomeComando" sulla macchina 
 # locale
```
```sh
 ? 
 # mostra l'help, utile per quando non ricordiamo alcuni 
 # comandi o la loro sintassi
```
E' da notare che la maggior parte dei comandi (forse tutti) 
funzionano anche per il protocollo ftp e quindi la maggior parte 
(forse tutti) i client ftp, anche se l'utilizzo di un sistema 
ftp, è fortemente sconsigliato per i noti problemi di sicurezza. 
Una valida ed equivalente alternativa (sotto certi aspetti) al 
protocollo SFTP è il protocollo FTPS.


### Alcuni Trucchi con SSH

```sh
 ssh nomeUtente@macchina cat "Videos/Path/To/Video.mp4" | vlc - 
 # questo ci permette di visualizzare un video in locale senza 
 # dover effettuare il forwarding di X o avviare sftp/scp, una 
 # cosa simile può essere fatta anche per le immagini, con un 
 # adeguato lettore di immagini, dobbiamo stare attenti a 
 # specificare bene il percorso 
```


### OpenPGP

OpenPGP è uno standard Internet per l'interoperabilità dei 
messaggi protetti tramite crittografia asimmetrica. I due più 
comuni programmi che utilizzano OpenPGP sono:

 * Pretty Good Privacy (PGP), erede diretto della versione 
   iniziale di Phil Zimmermann e ora prodotto commerciale della 
   PGP Corporation 
 * GNU Privacy Guard (GPG), sua alternativa GPL


### Principio di funzionamento

Un utente può generare attraverso PGP una chiave composta da una 
parte pubblica e una parte privata, lui condivide al mondo la 
parte pubblica, ma deve proteggere e salvaguardare la sua parte 
privata. Riporto una conversazione IRC che spiega qual'è il 
meccanismo di base di PGP:

```text
<nebbia> can somebody explain me how GPG works ? 

<BasketCase> nebbia: it is the same key pair concept where one 
key decrypts what the other encrypts <BasketCase> this is one of 
the better explanations I have seen: 
http:#maths.straylight.co.uk/archives/108 

<BasketCase> essentially, if someone wants to send you a secret 
they encrypt it with your public key. now only you with your 
private key can decrypt it. 

<BasketCase> if someone wants to verify that you signed something 
they decrypt the signature with your public key verifying that it 
was made by your private key (this is close to key authentication 
in ssh) 

<BasketCase> ooh, there is a video version of that explanation: 
http:#www.youtube.com/watch?&v=3QnD2c4Xovk

<nebbia> BasketCase i was thinking about what you said... 

<nebbia> but the first case is clear 

<nebbia> but the second... how can somebody verify that i signed 
something ? 

<nebbia> with only my public key ? 

<BasketCase> ok, you take a hash of the "something". say an 
sha256 hash. Then you encrypt that hash with your private key. 
<nebbia> ok what is this something ? my signature ?

<BasketCase> the other person hashes the same something, decrypts 
your encrypted hash using your public key and compares them. If 
the hashes match you signed it AND it hasn't been modified

<BasketCase> "something" in that context means whatever data you 
are signing 

<nebbia> ohh ok ... thank you ! 

<BasketCase> so, if I make a file, sha256sum it, then encrypt the 
hash with my private key you only need my public key and the 
sha256sum tool to verify that I sent you that file
```

Un video esplicativo, è questo [PGP](https://www.youtube.com/watch?&v=3QnD2c4Xovk||Spiegazione).


### GnuPG su sistemi GNU/Linux

Per installare GnuPG, eseguiamo:

```sh
 apt-get install gnupg 
 # installa gnupg
```
Vediamo ora alcuni esempi di comandi:

```sh
 gpg --gen-key 
 # esegue una procedura guidata per generare le 
 # chiavi, alla fine di questa procedura verrà chiesta una 
 # passphrase e successivamente viene creata una directory 
 # chiamata ".gnupg/" dove saranno contenute le chiavi
```
```sh
 gpg --list-keys 
 # elenca le chiavi possedute
```
```sh
 gpg --export -a "Giuseppe Nebbione" > public.key 
 # attenzione, 
 # il nome deve essere uguale a quello inserito all'interno della 
 # procedura guidata per la chiave privata
```
```sh
 # gpg --send-keys 'Giuseppe Nebbione' --keyserver 
  hkp:#subkeys.pgp.net 
 # invia le chiavi ad un sito che 
 # raccoglie tutte le chiavi pubbliche
```
```sh
 gpg --import pubkey.txt 
 # importa una chiave pubblica
```
```sh
 gpg --recv-keys user@mail.net --keyserver hkp://subkeys.pgp.net 
 # importa dal sito raccoglitore di chiavi la chiave pubblica 
 # corrispondente alla mail "user@mail.net"
```
```sh
 gpg --encrypt --recipient "Nome Destinatario" nome_file_da_cifrare 
 # esempio di cifratura di un file
```
```sh
 gpg --delete-key "Giuseppe Nebbione" 
 # rimuove la chiave 
 # pubblica menzionata
```
```sh
 gpg --delete-secret-keys "Giuseppe Nebbione" 
 # rimuove la chiave 
 # privata menzionata
```

Un sito utile per ricercare chiavi pubbliche al momento è 
[Chiavi Pubbliche PGP](https://keyserver.pgp.com/vkd/GetWelcomeScreen.event)


## Web Server


Vediamo qui alcune configurazioni del web server più famoso, cioè 
"Apache", una volta installato con:

```sh
 apt install apache2 
```
oppure

```sh
 yum install httpd
```
dobbiamo abilitare il servizio di apache attraverso ad esempio:

```sh
 systemctl start apache2
```
una volta abilitato, possiamo leggere i log all'interno di "
/var/log/apache2/":

```sh
 tail -f /var/log/apache2/* 
 # leggo i log in runtime
```
la directory di default varia da distro a distro, comunque 
solitamente è in "/var/www" oppure in "/srv/www/htdocs", ma 
potrebbe essere anche in altre directory. Il file di 
configurazione di apache2 è in "/etc/apache2", anche in questo 
caso varia da distro a distro ma è o "apache2.conf" o "httpd.conf"
 Vediamo ora alcune configurazioni comuni.

Siccome configurazioni diverse possono essere in file diversi è 
bene eseguire dei "grep -nir configurazioneCercata" per cercare 
le configurazioni.


### Configurazione centralizzata vs Configurazione decentralizzata

Apache mantiene i file di configurazione nella directory /etc/, 
ad ogni modo è possibile avere dei file di configurazione per 
directory, chiamati ".htaccess", l'utilizzo di questi file è 
consigliato solo se non si hanno i permessi di accesso all'intero 
server, in quanto implica degli slow down significativi alla 
navigazione, questi file potrebbero ad esempio essere utilizzati 
da servizi di hosting quando ci viene fornita solo una directory 
all'interno di un server. Quindi nel momento in cui abbiamo 
accesso completo al server le impostazioni che dovremmo mettere 
nel file .htaccess le andiamo a mettere nelle varie sezioni `<Directory>`
dei file di ocnfigurazione principali. Ad ogni modo 
l'utilizzo dei file ".htaccess" deve essere permesso comunque 
dalla configurazione principale di Apache (i.e., quella nei file 
/etc/), l'opzione che disabilita questa impostazione è:

```sh
 AllowOverride None 
 # disabilito l'utilizzo dei file .htaccess 
 # all'interno della directory a cui fa parte questa 
 # configurazione
```
per abilitare l'utilizzo dei file ".htaccess" invece dobbiamo 
avere:

```sh
 AllowOverride All 
 # abilito l'utilizzo dei file .htaccess 
 # all'interno della directory a cui fa parte questa 
 # configurazione
```


### Directory Listing

Basta aggiungere nel file di configurazione di apache in una 
delle `<Directory>` e facciamo:

```apache
<Directory "/var/www/html">     

# Show directory listing, and allow symbolic links
Options Indexes FollowSymLinks       

# With the following option we impose that configuration cannot be overriden with .htaccess files.
AllowOverride None

# With the following options we controls who can get stuff from this server
Order allow,deny     
Allow from all 
</Directory>
```


### Mod Rewrite


### Redirection di qualsiasi richiesta all'interno di una directory

Possiamo all'interno di una configurazione `<Directory>`
includere il modulo "mod_rewrite.c" e gestire redirections, ad 
esempio:

```apache
<IfModule mod_rewrite.c>
	RewriteEngine on
	RewriteRule (.*) webroot/ [L]
</IfModule>
```

in questo caso `(.*)` significa qualsiasi stringa

in questo caso ad ogni richiesta redirigo alla directory 
webroot/, il flag "[L]" serve ad indicare che questa è una 
richiesta "last", cioè eseguita questa le eventuali prossime 
richieste non devono essere eseguite, questa è equivalente ad un "
break;" in altri linguaggi di programmazione, per le rewrite 
rule, il primo parametro è un regular expression e la seconda è 
un indirizzo a cui redirigere, il terzo campo è composto dagli 
eventuali flag.


### Se un file richiesto non esiste eseguire un determinato script

In questo caso si utilizzano le condizioni "RewriteCond", la 
meccanica è questa, se tutte le rewrite condition sono vere 
(bisogna considerarle in AND logico) allora viene eseguita 
l'istruzione successiva "RewriteRule". In pratica quello che 
avviene è, se la risorsa richiesta non è un file e non è una 
directory (cioè se non esiste) allora si esegue la rewrite rule, 
in questo caso si esegue lo script chiamato "script.php".

```apache
<IfModule mod_rewrite.c>
	RewriteEngine on
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d 
	RewriteRule ^(.*)$ script.php [PT,L]
</IfModule>
```


### Porta del Server

Possiamo cercare la porta su cui è in ascolto apache eseguendo 
nella directory in cui sono contenuti i file di configurazione di 
apache:

```sh
 grep -nir listen 
```
Possiamo mettere apache in ascolto su un'altra porta attraverso:
l'opzione `Listen` che ci permette di bindare Apache ad un indirizzo IP
e poera specifica. Possiamo ad esempio mettere in ascolto apache
sulla porta 8000 con il seguente pezzo di configurazione:

```conf
Listen 8000
```


### Virtual Hosts

Per impostare virtual host localmente (ad esempio per testare 
diverse web applications in locale), allora innanzitutto dobbiamo 
assegnare a "localhost" (i.e., 127.0.0.1) i vari nomi dei domini, 
quindi nel file "/etc/hosts" andremo a scrivere:

127.0.0.1 myfirstwebapp

127.0.0.1 mysecondwebapp

127.0.0.1 mythirdwebapp

una volta scritti questi, nella configurazione di apache 
principale, quella dove sono segnati i "localhost", ad esempio su 
debian in "/etc/apache2/sites-enabled/000-default.conf" e qui 
dovremo avere una configurazione del tipo:

```apache
<VirtualHost *:80>
	# Con ServerName impostiamo il nome del dominio
	ServerName myfirstwebapp

	# Con DocumentRoot impostiamo la directory in cui è contenuta la web app
	DocumentRoot /var/www/html/myfirst
</VirtualHost> 

<VirtualHost *:80>
	ServerName mysecondwebapp
	DocumentRoot /var/www/html/mysecond
</VirtualHost>

<VirtualHost *:80>
	ServerName mythirdwebapp
	DocumentRoot /var/www/html/mythirdandlast
</VirtualHost> 
```

la configurazione è identica per siti web hostati sullo stesso 
webserver, ricordiamo che i virtual host sono supportati dalla 
versione 1.1 dell'HTTP.

### Debugging di Apache

E' possibile effettuare benchmark e debugging attraverso il
programma `ab`.
E' possibile effettuare debugging in modo piu' avanzato utilizzando
il programma `siege`.



## NFS

NFS (Network File System) is a distributed file system protocol 
originally developed by Sun in 1984. allowing a user on a client 
computer to access files over a computer network much like local 
storage is accessed. NFS, like many other protocols, builds on 
the Open Network Computing Remote Procedure Call (ONC RPC) 
system. On a debian machine we can check if we support NFS with:

```sh
 grep NFSD /boot/config-`uname -r`
```
more generally with any other distros we should check the kernel 
configuration file.


#### Server-Side

On the server we install:

```sh
 sudo apt-get install nfs-kernel-server
```
then we create the directory we want to share, for example:

```sh
 sudo mkdir /var/nfsroot 
 # we create a directory in "/var"
```
then, we have the table of exports in the file "/etc/exports", in 
this file we add a line with:

```sh
 /var/nfsroot <client private ip>/32(rw,root_squash,subtree_check) 
 # where for client private 
 # ip we put the ip address or an entire subnet, notice that since 
 # we put root_squash, in this case the root account on the client 
 # machine will have the same privilege level as the root on the 
 # server machine. This option has security implications; do not 
 # use unless you are sure you need it.
```
we then update the table of exported directories with:

```sh
 sudo exportfs -a
```
and we have to be sure of having the daemon started with:

```sh
 sudo service nfs-kernel-server start 
 # starts the kernel, even 
 # a "restart" could be used
```
Notice that in order to not give root access to the filesystem to 
any NFS client, all queries appearing to come from a root user 
are considered by the server as coming from the nobody user. This 
behavior corresponds to the `root_squash` option, and is enabled by 
default. The n`o_root_squash` option, which disables this behavior, 
is risky and should only be used in controlled environments. The 
anonuid=uid and anongid=gid options allow specifying another fake 
user to be used instead of UID/GID 65534 (which corresponds to 
user nobody and group nogroup). 


### Example

Let's see some example of sharing directory:

```sh
 mkdir /home/client1; chown nobody:nogroup /home/client1; chmod 755 /home/client1 
 # in this case we are sharing a directory the 
 # owner user and owner group should be these ones, if we want the 
 # directory to be writeable by clients, even in this case they 
 # must be root
```
the following step is adding this directory to the NFS 
configuration file "/etc/exports" with:

```conf
/home/client1 192.168.0.101/32(rw,root_squash,subtree_check) 
# here we share the directory, we use default options
```


### Server-Side Options

Let's see some of the possible options we can set server-side, 
these options can be specified in the /etc/exports entry:

```sh
 # rw: Read/write filesystem. 
```
```sh
 # ro: Force clients to connect in the read-only filesystem mode 
 # only. 
```
```sh
 # no_root_squash: The root account on the client machine will 
 # have the same privilege level as the root on the server 
 # machine. This option has security implications; do not use 
 # unless you are sure you need it. 
```
```sh
 # no_subtree_check: Disable file location checks on partial 
 # volume exports. This option will speed up transfers on full 
 # volume exports. 
```
```sh
 # sync: Force all transfers to operate in synchronous mode, so 
 # all clients will wait until their operations are really done. 
 # This can avoid data corruption in the event of a server crash.
```


### Client-Side

On the client side what we do is:

```sh
 sudo apt-get install nfs-common
```
then we create the local directory where we will mount our remote 
directory with:

```sh
 sudo mkdir /mnt/remotenfs 
```
then we add the following line to the /etc/fstab file:

```conf
<server private ip>:/var/nfsroot /mnt/remotenfs nfs rw,async,hard,intr 0 0
```

then we can mount the directory with:

```sh
 sudo mount /mnt/remotenfs 
```
In order to see on which port nfs is listening we do:

```sh
 sudo rpcinfo -p 192.168.0.102 
 # here we will see various rows, 
 # what we are interested is the presence of "NFS" and its port, 
 # notice that the default port is 2049
```
then we can see which directories are shared by the server by 
doing:

```sh
 sudo showmount -e 192.168.0.102 
 # in this way we show which 
 # directories are shared by the mentioned server IP address
```


### Client-Side Options

Let's see some of the possible options we have "Client-Side", 
these options can be specified using the mount command, or in the 
/etc/fstab entry:


* `rw`: Read/write filesystem. 
* `ro`: Read-only filesystem. Remote NFS clients can’t modify the filesystem. 
* `hard`: Applications using files stored on an NFS will always 
  wait if the server goes down. User cannot terminate the process 
  unless the option intr is set.
* `soft`: Applications using files stored on an NFS will wait a 
  specified time (using the timeo option) if the server goes 
  down, and after that, will throw an error.
* `intr`: Allows user interruption of processes waiting on a NFS request. 
* `timeo=<num>`: For use with the soft option. Specify the timeout for an NFS request. 
* `nolock`: Disable file locks. Useful with older NFS servers. 
* `noexec`: Disable execution of binaries or scripts on an NFS share. 
* `nosuid`: Prevents users from gaining ownership of files on the NFS share. 
* `rsize=<num>`: Sets the read block data size. Defaults to 8192 on NFSv2 and NFSv3, and 32768 on NFSv4. 
* `wsize=<num>`: Sets the write block data size. Defaults to 8192 on NFSv2 and NFSv3, and 32768 on NFSv4.

## Samba 

Samba can be thought as an alternative to NFS, when we are working in an
environment comprehending Windows machines.

Samba can be used both to:
* Access Shared Directories/Printers
* Act as a Domain Controller (rare application)

Nota che di default Windows puo' condividere directory sia richiedendo
credenziali di un utente esistente sulla macchina, sia non richiedendole 
Questa impostazione deve essere settata dal pannello di controllo, nelle voci
relative alla rete e alle condivisioni.
Possiamo quindi disabilitare la richiesta di password per gli 
"share" nelle impostazioni di rete.


### Linux come client

```sh
smbclient
```



## DNS Server

We can install various dns servers, a common one is "bind" also 
found as "bind9", we can install this package on our distro, una 
volta installato possiamo verificare che sia in running 
controllando quale processo sta occupando la porta 53 (porta 
usata dal protocollo DNS), attraverso:

```sh
 sudo netstat -ntlp 
 # mostra i processi attivi sulle relative 
 # porte
```
dovremo vedere un processo chiamato "named", che corrisponde 
proprio a bind, nel caso in cui bind si sia appropriato 
dell'indirizzo di localhost possiamo testarlo eseguendo:

```sh
 dig www.example.com @127.0.0.1 
 # esegue una query dns 
 # utilizzando come local nameserver localhost, dobbiamo 
 # verificare che la "answer section" sia valida, se è valida 
 # allora il demone sta funzionando correttamente
```
Ricordiamo che di default bind funziona in modalità "caching-only"
 mode, so no information is cached (stored persistently). 

N.B.: Everytime we want to clear the cache of a DNS server it is 
sufficient to just restart the relative daemon.

### Configurazione di BIND


Per visualizzare dove è presente il file di configurazione di 
bind ci basterà dare un'occhiata ai file installati col 
pacchetto, quindi possiamo ad esempio in una distro Debian-based 
eseguire:

```sh
 dpkg -L bind9 
 # mostra i file installati dal paccheto
```
a questo punto scopriamo che il file di configurazione principale 
è in "/etc/bind/named.conf" che è leggibile in genere, mentre un 
altro file di configurazione chiamato "/etc/bind/rndc.key" è 
leggibile solo dall'utente e dal gruppo "bind". Possiamo 
controllare la versione di bind utilizzando:

```sh
 named -v 
 # mostra la versione
```
```sh
 named -V 
 # mostra la versione e informazioni aggiuntive, è più 
 # verbose rispetto al "-v"
```
DA CONTINUARE
TODO


## Database Server

Esistono diverse applicazioni utilizzabili su GNU/Linux per 
funzionare da server per database, ma una scelta comune 
open-source è "MySQL", quindi nelle prossime sezioni tratteremo 
MySQL, ad ogni modo altri server per database famosi sono "Microsoft Database Server",
"Oracle Database Server", "Postgres".


### MySQL

### Installazione su Red-Hat Based Distro

Per installare mySQL su distribuzioni basate su Red-Hat, 
effettuiamo

```sh
 yum search mysql 
 # cerca pacchetti riguardanti mySQL nei 
 # repository
```
I pacchetti che ci interessano da questa ricerca sono:

```sh
 mysql-server 
 # i pacchetti che faranno da server
```
```sh
 mysql 
 # i pacchetti che permetteranno di interfacciarci al 
 # server
```
quindi effettueremo un:

```sh
 yum install mysql-server mysql 
 # installa i pacchetti 
 # mysql-server e mysql
```

Una volta installato, possiamo verificarne la corretta 
installazione, effettuando un controllo sul demone mysqld

```sh
 service mysqld status 
 # verifica lo stato del processo demone 
 # (servizio) mysqld, ci aspettiamo qualcosa che ci dica che il 
 # servizio non è attivo ma in stato di "Stop"
```
a questo punto, iniziamo il demone attraverso il comando:

```sh
 service mysqld start 
 # inizia il processo mysqld
```
per inserire la password dell'utente root lanciamo:

```sh
 mysqladmin -u root password exampleOfPassword 
 # crea una 
 # password per l'utente di root, la password è composta dalla 
 # stringa "exampleOfPassword"
```
Ora l'ambiente mysql è pronto.

### Installazione su Debian Based Distro


Per installare mySQL su distribuzioni basate su Debian, 
effettuiamo

```sh
 apt-cache search mysql | mysql 
 # cerca pacchetti riguardanti 
 # mySQL nei repository
```
I pacchetti che ci interessano da questa ricerca sono:

```sh
 mysql-server 
 # i pacchetti che faranno da server
```
```sh
 mysql-client 
 # i pacchetti che permetteranno di interfacciarci 
 # al server
```
quindi effettueremo un:

```sh
 apt-get install mysql-server mysql-client 
 # installa i 
 # pacchetti mysql-server e mysql-client
```
In questo caso, comparirà una procedura guidata per impostare la 
password di root, e non dovremo inserirla manualmente.

Ora possiamo verificare la corretta installazione di MySQL 
attraverso il comando:

```sh
 /etc/init.d/mysql status 
 # verifica lo stato del processo 
 # demone associato a mysql
```
oppure in alternativa possiamo lanciare:

```sh
 service mysql status 
 # verifica lo stato del processo demone 
 # associato a mysql
```
Ora l'ambiente mysql è pronto.


### Gestione di database con MySQL

Per entrare in mysql, eseguiamo:

```sh
 mysql -u root -p 
 # esegue l'accesso con l'utente "-u" root, 
 # richiedendo la password "-p", il flag "-p" è richiesto ogni 
 # qualvolta un utente è munito di password, nel caso in cui non 
 # venisse messo, allora il login non viene effettuato
```
Una volta effettuato il login, vedremo a schemo il prompt di 
mysql, da questo prompt possiamo effettuare diverse operazioni 
come ad esempio creare database, creare tabelle o in genere 
effettuare query. Vediamo alcuni esempi di comandi:

```sql
 show databases; 
 -- mostra i database presenti, di default 
 -- potremmo vedere due o tre database d'esempio
```
```sql
 create database dbName; 
 -- crea un database con nome "dbName", è 
 -- da notare che il simbolo ";" è utilizzato per terminare le 
 -- istruzioni, un semplice invio permette invece di continuare un 
 -- comando, nota che se il nome dovesse contenere caratteri 
 -- particolari come ad esempio "-" (dash) o doppi apici o 
 -- parentesi, dobbiamo rinchiudere il nome del database tra apici 
 -- retroversi "`".
```
```sql
 drop database dbName; 
 -- elimina il database con nome "dbName"
```
```sql
 SHOW GLOBAL VARIABLES LIKE 'PORT'; 
 -- mostra su quale porta sta girando mysql
```
```sql
 SHOW GLOBAL VARIABLES; 
 -- mostra tutte le variabili globali
```

N.B.: Nota che in SQL, per indicare nomi con caratteri speciali, 
dobbiamo racchiudere il nome tra apici retroversi \`\`.

### Gestione Utenti in MySQL


```sql
 CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password'; 
 -- crea un utente chiamata "newuser" con la password specificato
```
```sql
 GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost'; 
 -- fornire permessi all'utente altrimenti non può fare nulla
```
```sql
 FLUSH PRIVILEGES; 
 -- aggiorna i privilegi
```
```sql
 SET PASSWORD FOR 'root'@'localhost' = PASSWORD('MyNewPass'); 
  
 -- reimposta la password per l'account di root sul server locale 
 -- "localhost"
```

### Creazione di tabelle e gestione delle tabelle

Una volta creato un database, per poterci lavorare dovremo prima 
indicare l'intenzione di utilizzare il database attraverso:

```sql
 use dbName; 
 -- seleziono il database con nome "dbName"
```
Vediamo alcuni comandi per gestire le tabelle:

```sql
 show tables; 
 -- mostra le tabelle presenti all'interno del 
 -- database
```
```sql
 show columns from `nome Tabella`; 
 -- mostra le colonne della 
 -- tabella col tipo di dato, è anche utile per capire qual'è la 
 -- chiave primaria e che opzioni sono applicate sui campi
```
```sql
 CREATE TABLE nomeTab (id int(5) PRIMARY KEY, name varchar(255), 
 email varchar(255), description text); 
 -- crea una tabella 
 -- chiamata "nomeTab", con tre attributi, uno di tipo intero con 
 -- massimo 5 cifre che sarà anche la chiave primaria, e gli altri 
 -- due di tipo stringa con un numero massimo di caratteri ammessi 
 -- di 255
```
```sql
 CREATE TABLE users ( user_id int NOT NULL auto_increment, 
 username varchar(20) NOT NULL, password char(40) NOT NULL, mail 
 varchar(255), PRIMARY KEY (user_id), UNIQUE KEY username 
  (username) ); 
 -- crea una tabella con alcuni attributi NOT NULL, 
 -- e il primo attributo "user_id" con l'auto increment attivato 
```
```sql
 DESCRIBE nomeTab; 
 -- mostra la struttura della tabella chiamata 
 -- nomeTab, con i propri attributi, il tipo e le chiavi
```
```sql
 ALTER TABLE users CHANGE COLUMN id id INT(11) PRIMARY KEY AUTO_INCREMENT; 
 -- cambia una colonna chiamata "id" nella 
 -- tabella "users" e la rinomina ancora "id", la imposta come 
 -- chiave primaria
```
```sql
 ALTER TABLE websites CHANGE COLUMN hash hash varchar(64) NULL; 
 -- sulla tabella websites importa l'attributo hash in modo che 
 -- possa essere null
```
```sql
 ALTER TABLE websites CHANGE COLUMN hash hash varchar(64) NOT NULL; 
 -- sulla tabella websites importa l'attributo hash in modo 
 -- che non possa essere null
```
```sql
 ALTER TABLE users CHANGE COLUMN id user_id INT(11) PRIMARY KEY AUTO_INCREMENT; 
 -- cambia una colonna chiamata "id" nella 
 -- tabella "users" e la rinomina col nome attributo "user_id", la 
 -- imposta come chiave primaria
```
```sql
 INSERT INTO nomeTab (id, name, values) VALUES (1, 'anthony', 'anthony@me.com'); 
 -- inserisce nella tabella chiamata nomeTab 
 -- una tupla nell'ordine specificato (id, name, values) coi valori 
 -- (1, "anthony"m "anthony@me.com")
```
```sql
 INSERT INTO users (name, mail) VALUES ('giuseppe', 'giuseppe@casa.it'); 
 -- nel caso avessimo un campo "id" con 
 -- autoincremento, basta solo non citarlo all'interno della insert 
 -- into, e per magia l'autoincremento verrà gestito da mysql
```
```sql
 select * from nomeTab; 
 -- mostra tutte le tuple della tabella 
 -- chiamata "nomeTab"
```
```sql
 select name from nomeTab; 
 -- mostra solo il campo "name" di 
 -- tutte le tuple della tabella chiamata "nomeTab"
```
```sql
 select * from nomeTab where name="anthony"; 
 -- mostra tutte le 
 -- tuple della tabella con nome "nomeTab" che hanno come attributo 
 -- "name" esattamente il valore "anthony"
```
```sql
 UPDATE nomeTab SET id=3; 
 -- cambia il campo "id" di tutte le 
 -- tuple della tabella "nomeTab" al valore "3"
```
```sql
 UPDATE nomeTab SET id=1 where name="anthony"; 
 -- cambia il campo 
 -- "id" solo delle tuple il cui nome è esattamente "anthony"
```
```sql
 DELETE from nomeTab where id=3; 
 -- elimina la tupla con valore 
 -- id=3 dalla tabella "nomeTab"
```
```sql
 desc nomeTabella; 
 -- mostra uno schema che ci dice come è fatta 
 -- una tabella, MOOLTO UTILE!
```
```sql
 select * from nomeTab where id=1 or id=2; 
 -- mostra tutte le 
 -- tuple con id=1 o id=2
```
```sql
 select * from nomeTab order by id asc; 
 -- mostra tutte le tuple 
 -- ordinate in ordine crescente in funzione del campo "id"
```
```sql
 select * from nomeTab order by id desc; 
 -- mostra tutte le tuple 
 -- ordinate in ordine decrescente in funzione del campo "id"
```
```sql
 select nomeTab.email, nomeTab.name as customers_name, 
 nomeTab2.name from nomeTab, nomeTab2 where 
 nomeTab.id=nomeTab2.id; 
 -- mostra una tabella sia con campi 
 -- della tabella chiamata "nomeTab" che della tabella chiamata "
 -- nomeTab2", la keyword "as" ci permette di visualizzare un 
 -- determinato campo con un altro nome a schermo nel momento in 
 -- cui la tabella viene visualizzata, in questo caso abbiamo 
 -- effettuato un "join"
```
```sql
 ALTER TABLE Persons AUTO_INCREMENT=100; 
 -- in questo caso 
 -- facciamo in modo che la tabella persons cominci l'auto 
 -- incremento dal valore 100
```
Vediamo ora come inserire una chiave esterna, se abbiamo ad 
esempio una tabella negozio, e poi una tabella prodotti, ed in 
prodotti, vogliamo avere un riferimento al negozio, allora 
innanzitutto creiamo una nuova voce nella tabella prodotti 
chiamata "id_negozio", con:

```sql
 ALTER TABLE prodotti ADD COLUMN id_negozio int not null;
```
e ora possiamo includere la chiave esterna con:

```sql
 ALTER TABLE prodotti ADD FOREIGN KEY fk_id_negozio(id_negozio) 
 REFERENCES negozi(id_negozio) ON DELETE CASCADE ON UPDATE 
 CASCADE;
```
oppure se esiste già la colonna su cui andare a referenziarci 
possiamo usare:

```sql
 CREATE TABLE Orders ( O_Id int NOT NULL, OrderNo int NOT NULL, P_Id int, PRIMARY KEY (O_Id), FOREIGN KEY (P_Id) REFERENCES Persons(P_Id) );
```

Possiamo anche leggere file di sistema con mysql (se abbiamo i permessi
necessari) con:
```sh
select load_file("/etc/file_to_read.txt");
```


### Backup Database

```sh
 mysqldump -u nomeUtente -p --databases nomeDb1 nomeDb2 > dump.sql 
 # crea un file con il backup del database
```

```sh
 mysql -u nomeUtente -p -h localhost nomeNuovoDB < dump.sql 
 # questo serve ad importare i DB all'interno di uno scritto
```
```sh
 mysql -u nomeUtente -p -h localhost nomeNuovoDB < dump.sql 
 # if you do not know the database name or database name is included 
 # in sql dump you can try out something as follows
```
```sh
 mysql -u nomeUtente -p -h 27.12.4.121 nomeNuovoDB < dump.sql 
 # importa su un database remoto uno script dump
```
oppure exportato un file da ad esempio phpmyadmin, possiamo 
importarlo con:

```sh
 mysql -u username -p database_name < file.sql 
 # il database deve essere già esistente
```


### PostgreSQL

PostgreSQL è un progetto open-source, guidato dalla community, 
che segue il modello ad oggetti e relazionale.

```sh
 sudo apt-get install postgresql postgresql-client 
 # installa 
 # sia il server che il client di postgresql
```
una volta installato dobbiamo eseguire il login come utente root, 
per poter collegarci alla sua shell, quindi:

```sh
 su 
 # switcha all'utente di root
```
```sh
 su - postgres 
 # switcha all'utente postgres, volendo potrei 
 # anche impostare una password per questo utente
```
ora dalla shell adesso possiamo creare un nuovo utente con il 
comando:

```sql
 createuser --interactive 
 -- il programma createuser fa parte del 
 -- pacchetto postgresql-client Trucchetto: If you create a 
 -- PostgreSQL user with the same name as your Linux username, it 
 -- allows you to access the PostgreSQL database shell without 
 -- having to specify a user to login (which makes it quite 
 -- convenient).
```
```sql
 createdb dbNameIWant 
 -- creo il database con il nome che 
 -- preferisco
```
adesso possiamo avviare il client psql con l'utente corrente

```sh
 psql -d NomeDBACuiConnettermi 
 # questo avvia la shell di 
 # PostgreSQL, se non specifichiamo un database, psql proverà a 
 # collegarsi ad un database che ha lo stesso nome utente 
 # dell'utente che ha lanciato il comando
```
ora la shell "psql" oltre a supportare i classici comandi SQL 
come ad esempio "DROP DATABASE nomeDb;" (e altri, ricordare 
sempre il punto e virgola ";" per i comandi SQL) supporta anche 
dei comandi "shortcut" questi comandi chiamati nel gergo "
metacomandi" hanno la caratteristica di iniziare col carattere "\"
, vediamo qualche esempio:

```sh
 \help 
 # mostra l'elenco di tutti i comandi disponibili
```
```sh
 \c <database> 
 # si collega al database menzionato
```
```sh
 \du 
 # elenca tutti gli utenti con relativo livello di permessi
```
```sh
 \dt 
 # show summary information about all tables in the current 
 # database
```
```sh
 \q 
 # esce dalla console psql, per questo può anche essere 
 # utilizzato il la combinazione di tasti CTRL+d
```
```sh
 \l 
 # elenca i database esistenti
```
```sh
 \? 
 # mostra la lista di meta comandi
```
N.B.: il prompt del comando "psql" mostra sempre il nome del 
database a cui siamo attualmente connessi.

N.B.: Non dobbiamo cambiare la password dell'account postgres col 
comando "passwd" in quanto in questo caso l'acount diventa 
loggabile e noi non vogliamo fare in modo di poter effettuare il 
login. Quindi eseguo:

```sh
 sudo -u postgres psql postgres 
 # con sudo -u eseguo un comando 
 # (in questo caso "psql postgres") col nomeutente specificato 
 # come parametro
```
poi una volta all'interno di psql eseguiamo:

```sh
 \password postgres 
 # questo ci permetterà di impostare la nuova 
 # password
```
un errore comune è quello di avere "Failed to connect to the 
database: FATAL: role "giuseppe" does not exist", in questo caso 
dobbiamo creare il ruolo mancante, possiamo farlo ad esempio, 
andando ad eseguire:

```sh
 sudo -u postgres psql 
 # eseguo la shell di postgresql 
 # utilizzando l'utente adibito "postgres"
```
```sql
 CREATE ROLE giuseppe superuser;
```
```sql
 CREATE USER giuseppe;
```
```sql
 ALTER ROLE giuseppe WITH LOGIN; 
 -- and then enable login that 
 -- user, so you can run e.g.: psql template1, from normal $ 
 -- terminal
```
possiamo loggare in psql con:

```sh
 psql -d databaseName -U user -W 
 # con il flag "-d" indichiamo 
 # il nome del database, col flag "-U" indico il nome utente, col 
 # flag "-W" indico di effettuare un prompt per la password
```
```sh
 psql -d databaseName -U usernameIWant -W -h localhost 
 # questa 
 # è l'alternativa nel caso in cui ci da l'errore Fatal Error: 
 # Peer Authentication Failed, possiamo evitare di specificare 
 # ogni volta il localhost andando a impostare una variabile 
 # d'ambiente chiamata PGHOST e impostandola a "localhost"
```
possiamo creare un database con "proprietario" (owner) un account 
specifico, attraverso:

```sql
 CREATE DATABASE dbNameIWant OWNER existingUserIPrefer;
```
Per rimuovere un utente invece dall'account abilitato per psql 
eseguiamo:

```sql
 dropuser nomeUtenteDaRimuovere
```

#### Exploring a Postgresql Database

Una volta connessi ad un database postgresql ad esempio col comando:
```sh
psql -U username -p 5432 -W 
 # il flag -U e' per lo username
 # il flag -p e' per la porta, in questo caso 5432
 # il flag -W e' per usare una password per fare login
```
Possiamo esplorare i vari database presenti con i seguenti comandi:
```sh
 \list # mostra la lista dei database presenti
 \c [DATABASE] # si connette al database menzionato
 \d # elenca le tabelle presenti nel database corrente
```

Possiamo anche leggere un file di sistema con postgresql attraverso la seguente
sequenza di comandi:
```sh
 CREATE TABLE demo(t text);
 COPY demo from '[FILENAME]';
 SELECT * FROM demo;
```


## Kernel

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

### Capire il Kernel

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


### Tipi di Kernel e file relativi

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


### File associati ad un kernel

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
### Initial RAM disk


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

### Visualizzare il kernel e l'Initial RAM Disk


All'interno della directory /boot esiste anche l'immagine 
dell'initial RAM disk, infatti questa si chiamerà "
initramfs-versioneKernel", eseguire un "file" su questo file, ci 
mostrerà che è compresso attraverso gzip, possiamo quindi pensare 
di decomprimerlo, una volta decompresso, possiamo scompattarlo 
attraverso "cpio -id nomeArchivio", vedremo un vero e proprio 
filesystem, a grandi linee questo è un mini sistema operativo 
atto ad avviare il vero e proprio sistema operativo.

### Parametri del Kernel


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

### Compilare un kernel


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

### Configurazione del Kernel


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

### Alternative a "make menuconfig"


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
### Sezioni di Configurazione


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

### Cross Compilazione del Kernel


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


### Pulizia dei Sorgenti del Kernel


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


### Kernel Runtime Management e Troubleshooting


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

### Sysctl


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

## Linux Monitoring

In questa sezione ci occuperemo di:


1. misurare l'utilizzo di risorse
2. risolvere problemi relativi all'utilizzo di risorse
3. migliorare la gestione delle risorse

Strumenti standard per la gestione delle risorse che sono 
installati sulla maggior parte delle distro di default sono:

* vmstat
* uptime
* who
* top
* lsof
* netstat
* pstree
* lsof
* ps

### Vmstat


Il programma "vmstat" costituisce uno dei programmi più 
importanti di quelli forniti di default, possiamo lanciarlo con:

```sh
 vmstat 
 # avvia vmstat
```
```sh
 vmstat -S M 
 # avvia vmstat mostrando gli utilizzi di memoria in 
 # MB
```
```sh
 vmstat -a 
 # avvia vmstat mostrato la memoria attiva/inattiva
```
```sh
 vmstat 5 3 
 # avvia vmstat, si avvierà 3 volte distanziate da 5 
 # secondi
```
vedremo diverse informazioni sullo schermo dove:

* r: numero totale di processi che aspettano tempo CPU, ergo coda processi
* b: numero totale di processi bloccati che sono in attesa di risorse come disco o rete
* Swpd: memoria virtuale usata
* Free: memoria virtuale libera
* Buff: memoria usata come buffer (percorsi delle directory e cosa c'è all'interno)
* Cache: memoria usata come cache (contenuto dei file)
* Si: quantità di memoria swappata dal disco ogni secondo
* So: quantità di memoria swappata sul disco ogni secondo
* Bi: blocchi in ingresso al secondo
* Bo: blocchi in uscita al secondo
* In: interrupt al secondo
* Cs: context switch che avvengono al secondo

possiamo utilizzare:

```sh
 sudo bash -c "echo 3 > /proc/sys/vm/drop_caches" 
 # libera la 
 # memoria utilizzata dal buffer e dalla cache
```
Il problema con questi tool citati presenti nel package "procps" 
e che non ci permettono di lavorare con dati storici, quindi non 
possiamo visualizzare in modo comodo una history ed inoltre hanno 
funzionalità basilari, vedremo nelle prossime sezioni strumenti 
più avanzati.


### Monitoring da riga di comando

Per avere un sistema di monitoring più avanzato è utile 
installare il pacchetto "sysstat" che costituisce un'evoluzione 
del precedente vmstat dal pacchetto "procps", il pacchetto "
sysstat" contiene tool simili a procps come ad esempio "iostat" e 
"mpstat" e ci permettono di raccogliere informazioni 
periodicamente in modo da avere quadri precisi delle prestazioni 
e un monitoring più completo. I dati con sysstat vengono raccolti 
ogni 10 minuti e possono essere letti attraverso "sar", in 
pratica lo script "sa1" raccoglie dati ogni 10 minuti e lo script 
"sa2" ne fa un resoconto quotidiano; questi due script, sa1 e sa2 
sono abilitati attraverso cron. Possiamo quindi installare 
sysstat con:

```sh
 sudo apt-get install sysstat
```
sulle distro Debian-based dopo l'installazione dobbiamo abilitare 
il raccoglimento di dati attraverso il file "/etc/default/sysstat"
 andando ad abilitare la stringa "ENABLED="true""

Una volta installato possiamo visualizzare il cron relativo con:

```sh
 sudo cat /etc/cron.d/sysstat 
 # visualizza il file di cron di 
 # sysstat, di default, raccoglie dati ogni 10 minuti con sa1 e fa 
 # un resoconto giornaliero con sa2
```
Gli strumenti di sysstat sono:

```sh
 iostat 
 # fornisce informazioni su CPU e I/O disk
```
```sh
 mpstat 
 # fornisce informazioni dettagliate su CPU
```
```sh
 pidstat 
 # mostra informazioni sui processi
```
```sh
 cifsiostat 
 # mostra informazioni su SAMBA 
```
```sh
 nfsiostat 
 # mostra informazioni su NFS
```
```sh
 sar 
 # raccoglie e mostra dati sull'attività del sistema
```
Vediamo alcuni esempi applicativi:

```sh
 sar -V 
 # mostra la versione del programma 
```
```sh
 sar 
 # mostra info sulla CPU
```
```sh
 sar -q 
 # mostra info sul carico medio
```
```sh
 sar -q 1 3 
 # mostra info sul carico medio 3 volte con un 
 # intervallo da 1 secondo
```
```sh
 sar -q -f /var/log/sa/sa15 
 # mostra informazioni sul carico 
 # medio del giorno 15 del mese su distro RH-based
```
```sh
 sar -q -f /var/log/sysstat/sa15 
 # mostra informazioni sul 
 # carico medio del giorno 15 del mese su distro Debian-based
```
```sh
 sar -w 
 # processi creati al secondo e context switch al secondo
```
```sh
 sar -n DEV 
 # statistiche sull'interfaccia di rete specificata 
 # tipo "eth0"
```
```sh
 sar -b 
 # dati sulle attività di I/O generale
```
```sh
 sar -q -s 10:00:00 -e 11:00:00 
 # mostra informazioni di carico 
 # medio dalle 10 alle 11 del giorno corrente "-s" (start time) "
 # -e" (end time)
```
```sh
 sar -w -s 14:00:00 -e 20:00:00 -f /var/log/sa/sa11 
 # mostra 
 # informazioni sui processi e i context switch tra le 14 e le 20 
 # dal giorno 11 del mese su distro RH-based, basta cambiare la 
 # locazione del file per le distro Debian-based
```

### Monitoring Grafico con CollectD

Per mostrare informazioni grafiche di monitoring, dobbiamo 
installare collectd. Possiamo installarlo attraverso:

```sh
 sudo apt-get install collectd
```
La configurazione varia molto a differenza della distro, bisogna 
guardare la documentazione.Compilare programmi

Possiamo compilare programmi, innanzitutto scaricando i sorgenti, 
questo è possibile attraverso:

```sh
 sudo apt-get source nomePGM 
 # scarica il codice sorgente del 
 # programma nomePGM
```
una volta scaricato il source-code possiamo trovarlo in "
/usr/src/nomePGMeVersione", quindi ci sposteremo nella directory 
interessata per potere procedere con la compilazione

## Compilare programmi

Possiamo compilare programmi, innanzitutto scaricando i sorgenti, 
questo è possibile attraverso:

```sh
 sudo apt-get source nomePGM 
 # scarica il codice sorgente del 
 # programma nomePGM
```
una volta scaricato il source-code possiamo trovarlo in `/usr/src/nomePGMeVersione`,
quindi ci sposteremo nella directory interessata per potere procedere 
con la compilazione, ma prima verifichiamo di aver installato i pacchetti 
fondamentali per poter compilare:

```sh
 sudo apt-get install build-essential 
 # installa i pacchetti 
 # fondamentali per la compilazione, sulle distro RH-based 
 # eseguiremo invece un "yum groupinstall "Development Tools"
```


Poi i classici tre comandi in genere per compilare un programma scritto
in C/C++ sono:

```sh
./configure
# genera il makefile
```

```sh
make
# compila il programma
```

```sh
make install
# installa il programma nelle directory di sistema
```

Nota che possiamo specificare opzioni di compilazione in genere quando eseguiamo
il comando `./cofigure`, ad esempio se volessimo compilare un determinato
pacchetto con il supporto per determinate features (e.g., vim con clipboard o
emacs senza xorg eccetera).

In genere per poter visualizzare le opzioni disponibili ci basta o leggere il
file di `configure` oppure: 

```sh
./cofigure --help
# mostra le opzioni disponibili
```



## Gentoo Linux

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

### USE Flags

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

### Kinds of USE Flags


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

### Cambiare Impostazioni su USE flag


Possiamo cambiare impostazioni per gli USE flag globalmente o per 
singoli pacchetti.

####  Configurazione Globale

To change this default setting, add or remove keywords to/from 
the USE variable. This is done globally by defining the USE 
variable in "/etc/portage/make.conf". In this variable one can 
add the extra USE flags required, or remove the USE flags that 
are no longer needed. This latter is done by prefixing the 
keyword with the minus-sign (-). 

####  Configurazione per Pacchetto

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


### Portage Quick Tutorial

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


### Ricerca di informazioni su un pacchetto o su USE flags

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

### equery


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
### pfl


Il programma pfl fa riferimento al sito web [Portage File Dist](http://www.portagefilelist.de/)

```sh
 e-file nomeComandoOnomeFile 
 # ricerca i pacchetti anche non 
 # installati che contengono uno specifico comando/file
```

### Overlays

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


### eselect

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

### eclean

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

### Pacchetti Precompilati


Gentoo permette all'utente di installare pacchetti precompilati, 
ad esempio possiamo addirittura settare un server ftp dove 
teniamo i precompilati, supponiamo questo sia al'indirizzo "
ftp:#buildhost/gentoo", allora a questo punto possiamo impostare 
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

### Licenze


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
### Dove posso trovare le licenze ? 


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
### Modifiche agli USE Flag


A volte capita installando nuovo software, che per essere 
installato o il software stesso o almeno una delle dipendenze, 
richieda la modifica degli USE flag, per mettere a posto questo 
problema abbiamo a disposizione due soluzioni:

1. modificare il file delle configurazioni globali "/etc/portage/make.conf",
  aggiungendo il flag necessario nella voce relativa agli USE flags
2. modificare il file "/etc/portage/package.use" inserendo 
   singolarmente pacchetto per pacchetto gli use flag necessari


### Aggiornare il sistema

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


## Debian

Debian ha tre maggiori distribuzioni:

* Stable
* Testing
* Unstable (sempre chiamata sid)

Per capire che versione stiamo runnando facciamo:

```sh
 lsb_release -a
```
However some systems might have sources.list files with multiple 
entries corresponding to different distributions. This could 
happen if the administrator is tracking different packages from 
different Debian distributions. This is frequently referred to as 
apt-pinning. These systems might run a mixture of distributions. 

Gli autori di un pacchetto possiamo trovarli in "/usr/share/doc/PACKAGE/copyright".

Per compilare programmi abbiamo bisogno del pacchetto 
build-essential, possiamo anche aver bisogno per alcuni pacchetti 
di autoconf o gettext.

Per compilarmi un programma posso eseguire, anche se le 
dipendenze in realtà vengono installate e non compilate (da 
verificare):

```sh
 apt-get build-dep foo;apt-get source --build foo
```
Le librerie sono installate in appositi package denominati "
package-dev", infatti se mi serve la libreria libx.so molto 
probabilmente la troverò nel package "libx-dev".

Le pagine di man per altre lingue, sono disponibili col pacchetto 
"manpages-LANG" ad esempio per le pagine in italiano il pacchetto 
è "manpages-it" e così via; Inoltre l'utente deve settare la 
variabile LC_MESSAGES in modo appropriato per vedere i man nella 
lingua scelta.


### Pacchetti

Packages generally contain all of the files necessary to 
implement a set of related commands or features. There are two 
types of Debian packages:

* Binary packages, which contain executables, configuration 
  files, man/info pages, copyright information, and other 
  documentation. These packages are distributed in a 
  Debian-specific archive format (see What is the format of a 
  Debian binary package?, Section 7.2); they are usually 
  distinguished by having a '.deb' file extension. Binary 
  packages can be unpacked using the Debian utility dpkg 
  (possibly via a frontend like aptitude); details are given in 
  its manual page.
* Source packages, which consist of a .dsc file describing the 
  source package (including the names of the following files), a 
  .orig.tar.gz file that contains the original unmodified source 
  in gzip-compressed tar format and usually a .diff.gz file that 
  contains the Debian-specific changes to the original source. 
  The utility dpkg-source packs and unpacks Debian source 
  archives; details are provided in its manual page. (The program 
  apt-get can get used a frontend for dpkg-source.) 

The Debian binary package file names conform to the following 
convention: 
```
<foo>_<VersionNumber>-<DebianRevisionNumber>_<DebianArchitecture>.deb
```

Ai pacchetti possono essere associati diversi flag, questi sono 
chiamati "want" flags tell what the user wanted to do with a 
package (as indicated either by the user's actions in the 
"Select" section of dselect, or by the user's direct invocations 
of dpkg).

Their meanings are:

* unknown - the user has never indicated whether he wants the package
* install - the user wants the package installed or upgraded
* remove - the user wants the package removed, but does not want to 
  remove any existing configuration files.
* purge - the user wants the package to be removed completely, 
  including its configuration files.
* hold - the user wants this package not to be processed, i.e., 
  he wants to keep the current version with the current status 
  whatever that is. 


### Compilare pacchetti

How do I build binary packages from a source package?

The preferred way to do this is by using various wrapper tools. 
We'll show how it's done using the devscripts tools. Install this 
package if you haven't done so already.

Now, first get the source package:

```sh
 apt-get source foo
```
and change to the source tree:

```sh
 cd foo-*
```
Then install needed build-dependencies (if any):

```sh
 sudo apt-get build-dep foo
```
Then create a dedicated version of your own build (so that you 
won't get confused later when Debian itself releases a new 
version)

```sh
 dch -l local 'Blah blah blah'
```
And finally build your package

```sh
 debuild -us -uc
```
If everything worked out fine, you should now be able to install 
your package by running

```sh
 sudo dpkg -i ../*.deb
```
If you prefer to do things manually, and don't want to use 
devscripts, follow this procedure:

You will need all of foo_*.dsc, foo_*.tar.gz and foo_*.diff.gz to 
compile the source (note: there is no .diff.gz for some packages 
that are native to Debian).

Once you have them (How do I install a source package?, Section 
7.13), if you have the dpkg-dev package installed, the following 
command:

```sh
 dpkg-source -x foo_version-revision.dsc
```
will extract the package into a directory called foo-version.

If you want just to compile the package, you may cd into 
foo-version directory and issue the command

```sh
 dpkg-buildpackage -rfakeroot -b
```
to build the package (note that this also requires the fakeroot 
package), and then

```sh
 dpkg -i ../foo_version-revision_arch.deb
```
to install the newly-built package(s). 


### Installare grossi gruppi di pacchetti

Possiamo usare tasksel, per installare grossi gruppi di 
pacchetti, come ad esempio la suite di KDE, o GNOME, molto utile 
nel momento in cui dobbiamo installare DE.

```sh
 sudo tasksel
```

### Tenere aggiornare i repository regolarmente


You can use cron-apt, this tool updates the system at regular 
interval by using a cron job. By default it just updates the 
package list and download new packages without installing. 


### Tenere aggiornati i repository di più macchine

If you have more than one Debian machine on your network, it is 
useful to use apt-proxy to keep all of your Debian systems 
up-to-date.

apt-proxy reduces the bandwidth requirements of Debian mirrors by 
restricting the frequency of Packages, Releases and Sources file 
updates from the back end and only doing a single fetch for any 
file, independently of the actual request it from the proxy. 
apt-proxy automatically builds a Debian HTTP mirror based on 
requests which pass through the proxy.

For more details, see the apt-proxy homepage at 
http:#apt-proxy.sourceforge.net/

Of course, you can get the same benefit if you are already using 
a standard caching proxy and all your systems are configured to 
use it. 


### Using dpkg-divert

How do I override a file installed by a package, so that a 
different version can be used instead?

Suppose a sysadmin or local user wishes to use a program 
"login-local" rather than the program "login" provided by the 
Debian login package.

Do not: Overwrite /bin/login with login-local.

The package management system will not know about this change, 
and will simply overwrite your custom /bin/login whenever login 
(or any package that provides /bin/login) is installed or 
updated.

Rather, do

Execute:

```sh
 dpkg-divert --divert /bin/login.debian /bin/login
```
in order to cause all future installations of the Debian login 
package to write the file /bin/login to /bin/login.debian 
instead.

Then execute:

```sh
 cp login-local /bin/login
```
to move your own locally-built program into place.

Run 

```sh
 dpkg-divert --list 
```
to see which diversions are currently active on your system.

Details are given in the manual page dpkg-divert(8). 


### Alternative a categorie di programmi

Possiamo browsare la directory /etc/alternatives, varie categorie 
di programmi, e utilizzare il comando:

```sh
 update-alternatives --display x-window-manager 
 # mostra le 
 # alternative, della categoria x-window-manager, le alternative 
 # mostrate sono quelle installate sul sistema
```
```sh
 update-alternatives --config x-window-manager 
 # mi permette di 
 # cambiare window manager con una procedura guidata
```
se un'alternativa non compare tra le alternative possiamo usare:

```sh
 update-alternatives --install /usr/bin/x-window-manager \ 
  x-window-manager /usr/local/bin/wmaker-cvs 50 
 # in questo caso, 
 # l'ultimo attributo è la priorità, una priorità più alta 
 # significa che questo window manager sarà più probabilmente 
 # settato come window manager di default
```
per rimuovere un'alternativa eseguiamo:

```sh
 update-alternatives --remove x-window-manager /usr/local/bin/wmaker-cvs 
 # rimuove un'alternativa
```

### Fixare il sistema dopo aver rimosso dei pacchetti

In this case, look for /var/log/apt/history.log, look for the 
time around which your system was broken. Copy the removed 
packages which would be in the format of:

```
libapt-inst1.5:amd64 (0.9.7.9+deb7u5, 0.9.7.9+deb7u6), 
apt-utils:amd64 (0.9.7.9+deb7u5, 0.9.7.9+deb7u6).
```
e poi li reinstalliamo con un classico:

```sh
 sudo apt-get install <listaPacchetti>
```

### Repository non fidati e chiavi GPG

Può capitare cambiando i repository di incappare in questo 
errore:

```
W: GPG error: http://http.kali.org /kali Release: The following 
signatures couldn't be verified because the public key is not 
available: NO_PUBKEY ED444FF07D8D0BF6
```

In questo cass d'uso ho utilizzato un debootstrap per creare un 
ambiente debian in una distro debian, e nel sottoambiente ho 
voluto impostare i repository di kali una distribuzione linux 
derivata da debian (cambiano solo i repo) incentrata sui 
penetration test, per risolvere questo problema ci basta 
eseguire:

```sh
 gpg --keyserver pgpkeys.mit.edu --recv-key ED444FF07D8D0BF6 
 # questo pgpkeys.mit.edu è un server in cui sono presenti 
 # moltissime chiavi, quindi probabilmente ci ritroveremo spesso 
 # ad usarlo
```
```sh
 gpg -a --export ED444FF07D8D0BF6 > nomeChiave.txt
```
```sh
 sudo apt-key add nomeChiave.txt
```


### Gestione delle chiavi gpg su Debian

Possiamo gestire le chiavi su sistemi Debian o Debian based con i 
seguenti comandi:

```sh
 apt-key list 
 # questo mostra l'intera lista di chiavi
```
```sh
 apt-key del "C23F 55C5" 
 # questo cancella ad esempio una 
 # chiave, per l'id della chiave prendiamo gli ultimi 8 caratteri 
 # del fingerprint che vediamo in apt-key list, oppure a volte 
 # abbiamo un identificativo in apt-key list come "pub 
 # 1024D/437D05B5 2004-09-12" in questo caso l'id della chiave è "
 # 437D05B5"
```


### Supporto per i PPA

Molte volte si cita come svantaggio di Debian rispetto alle 
distro Ubuntu based, l'assenza di PPA, cioè repository secondari, 
in realtà questi si possono utilizzare, è molto semplice, basterà 
seguire i seguenti passi:

1. andare sul sito del PPA desiderato e scegliere una versione a 
  caso di Ubuntu e copiare le stringhe relative al repository (in 
  realtà ci basterebbe solo quella del sorgente "deb-src", una 
  volta copiate queste due stringhe mettiamole all'interno di 
  /etc/apt/sources.list
2. aggiungiamo la chiave GPG del PPA con "apt-key adv --keyserver 
  keyserver.ubuntu.com --recv-keys 
  `<stringa_dopo_lo_slash_sotto_la_voce_signing_key_sul_sito_del_ppa>`
3. apt-get update
4. apt-get source -b nomePacchetto #questo compila il pacchetto, 
  potrebbe darmi problemi di compilazione, devo installare i 
  pacchetti necessari che mancano al processo di compilazione, 
  questo creerà un paio di pacchetti ".deb" solitamente
5. dpkg -i nomePacchetto.deb #questo installa il programma, 
  anche qui potrei avere problemi di dipendenze, anche in questo 
  caso andrò ad installarle

## Audio

Per gestire l'output ho trovato i comandi utili:

```sh
 amixer -q set Master 10%+ 
 # incremento il livello di volume del 
 # 10%, il flag "-q" (quiet) serve a sopprimere l'output)
```
```sh
 amixer -q set Master 10%- 
 # decremento il livello di volume del 
 # 10% 
```
```sh
 amixer -q set Master mute 
 # muto l'audio
```
```sh
 amixer -q set Master unmute 
 # unmuto l'audio
```
```sh
 amixer get Master 
 # mi fornisce il livello di volume attuale
```
```sh
 alsamixer 
 # visualizzo i livelli di volume dell'audio e posso 
 # modificarli attraverso un'interfaccia TUI
```

Un programma molto utile per gestire l'audio e per capire a volte
la sorgente di alcuni problemi e' `pavucontrol`.


## Filesystem tmp

The cleaning of /tmp is done by the upstart script 
/etc/init/mounted-tmp.conf. The script is run by upstart 
everytime /tmp is mounted. Practically that means at every boot. 
The script does roughly the following: if a file in /tmp is older 
than $TMPTIME days it will be deleted. The default value of 
$TMPTIME is 0, which means every file and directory in /tmp gets 
deleted. $TMPTIME is an environment variable defined in 
/etc/default/rcS.

Notice that we can create temporary files with mktemp, for 
example: 

```sh
my_tmp_file=$(mktemp)
```
and write to it with:

```sh
echo "ciaooo" > "$my_tmp_file"
```
remove it with: 

```sh
rm "$my_tmp_file"
```
we can even create a temporary directory:

```sh
my_tmp_dir=$(mktemp -d)
```

## Note sui Laptop (e alcuni PC)

### Backlight


Su alcuni laptop la gestione del backlight potrebbe non 
funzionare bene, in questi casi è consigliabile modificare dei 
parametri con cui lanciamo il nostro sistema operativo da grub, 
nello specifico andiamo a modificare il file /etc/default/grub 
(su molte distro è questo) la linea che dice "
GRUB_CMDLINE_LINUX_DEFAULT", infatti questa voce dovrà essere 
qualcosa di simile a questo:

```sh
 GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi=Linux acpi_backlight=vendor" 
 # imposta la backlight in modo che venga 
 # gestita da specifiche del produttore, nota che i parametri 
 # quiet e splash possono essere tolti per fornire un boot e uno 
 # shutdown verbose, nel caso dovessimo avere problemi al boot o 
 # allo shutdown
```
se questo non funziona possiamo provare con:

```sh
 GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi="
```
oppure altre volte con ad esempio i driver nouveau potrebbe 
funzionare una cosa del tipo:

```sh
 GRUB_CMDLINE_LINUX_DEFAULT="nouveau.modeset=0 rd.driver.blacklist=nouveau acpi_backlight=vendor quiet splash"
```
una volta effettuata una di queste modifiche, dobbiamo aggiornare 
la configurazione di grub, possiamo farlo con:

```sh
 sudo update-grub 
 # aggiorna la configurazione di grub
```
E' inoltre utile sapere che di default avremo una certa 
luminosità all'avvio della macchina, comunque questo valore è 
settabile tramite l'aggiunta di uno script che parte all'avvio 
che esegue:

```sh
 cat /sys/class/backlight/acpi_video0/max_brightness > /sys/class/backlight/acpi_video0/brightness
```

### Distro che non eseguono Boot

A volte potrebbe capitare di avere delle distro che non eseguono 
correttamente il boot, ad esempio si fermano sul logo della 
distro al boot, in questo caso il motivo molto probabilmente è 
legato alla scheda video, possiamo impostare da grub come opzione 
al kernel la voce:

```sh
 nomodeset
```
quindi da grub ci basterà schiacciare "e" una volta selezionata 
la voce di boot interessata della distro e nella riga che inizia 
per "linux" aggiungere in append l'opzione "nomodeset".

You may want to disable KMS for various reasons, such as getting 
a blank screen or a "no signal" error from the display, when 
using the Catalyst driver, etc. To disable KMS add nomodeset as a 
kernel parameter. See Kernel parameters for more info. A volte è 
necessario anche aggiungere altre opzioni oltre a nomodeset, in 
modo daindirizzare direttamente i nostri driver, come:

```sh
 nomodeset i915.modeset=0 nouveau.modeset=0
```


### ACPI and DSDT

In computing, the Advanced Configuration and Power Interface 
(ACPI) specification provides an open standard that the operating 
systems can use for computer hardware discovery, configuration, 
power management, and monitoring. Internally, ACPI exports the 
available functionalities by providing certain instruction lists 
as part of the system firmware, which the operating system kernel 
interprets and executes to perform desired operations, using a 
form of embedded virtual machine. First released in December 
1996, ACPI defines platform-independent interfaces for hardware 
discovery, configuration, power management and monitoring, and is 
designed to replace Advanced Power Management (APM), the 
MultiProcessor Specification and the Plug and Play BIOS (PnP) 
Specification. ACPI brings the power management under the control 
of the operating system, as opposed to the previous BIOS-central 
system that relied on platform-specific firmware to determine 
power management and configuration policies. The specification is 
central to Operating System-directed configuration and Power 
Management (OSPM), a system implementing ACPI which removes 
device management responsibilities from legacy firmware 
interfaces. Intel, Microsoft and Toshiba originally developed the 
standard, while HP and Phoenix also participated later.

ACPI can typically be configured from within the operating 
system. This is unlike APM where configuration often involves 
rebooting and entering the BIOS configuration screens to set 
parameters.

ACPI has several different software components:

* a **subsystem which controls hardware states** and functions that 
  may have previously been in the BIOS configuration.
  These states include:
    * thermal control
    * motherboard configuration
    * power states (sleep, suspend)
* a **policy manager**, which is software that sits on top of the 
  operating system and allows user input on the system policies
* the **ACPI** also has **device drivers** that control/monitor devices 
  such as a laptop battery, SMBus (communication/transmission 
  path) and EC (embedded controller).

ACPI is to laptop users what oxygen is to mankind. BIOS, by 
itself, provides very basic support for all the hardware 
typically found inside a laptop. It cannot, for example, handle 
what happens on opening/closing the laptop lid, plugging in/out 
the the AC adapter, pressing the brightness keys etc. Sleep and 
hibernate are two essential features for any laptop user which 
are too complex for BIOS to handle. All these laptop-specific 
tasks are instead handled by ACPI. The biggest advantage of ACPI 
is that it is OS-agnostic. So, ACPI features that work flawlessly 
on Windows can be almost always expected to work on Linux (the 
almost part will be explained in a moment).

DSDT (Differentiated System Description Table) is a table that 
describes the ACPI properties and functions of all your hardware. 
If certain ACPI feature is missing or functioning improperly on 
your laptop, you can safely put the blame on a badly coded DSDT. 
DSDT is written in a language known as ASL (ACPI Source Language) 
that looks at lot like C. Just like C, it needs to compiled 
before it can be used by the system. This is where the problem 
creeps in. ASL compilers are provided by Microsoft and Intel. 
Like all things Microsoft, their compiler is far too lenient when 
it comes to ASL syntax compared to Intel’s. Hence, DSDTs compiled 
using MS compiler are generally buggier and more problematic than 
Intel-compiled ones. Windows includes all sorts of hacks to mask 
the ineffectiveness of the MS compiler while Linux typically 
suffers in some way or the other (laptop not 
sleeping/hibernating, fan spinning constantly, brightness keys 
not working etc.).

Lament not, you can extract the DSDT of your system, edit it to 
fix the errors, and replace the original DSDT with the fixed one 
to resolve most issues.

Un pacchetto utile per l'acpi, è il pacchetto "acpi", questo ci 
permette di vedere informazioni sulla batteria, eccetera.

Oppure sui sistemi linux un sistema per il power management è "
acpid", che contiene l'eseguibile "acpi_listen" che ci permette 
di ascoltare gli eventi dell'acpi.


### Working with the DSDT

The first thing to do is to grab the latest copy of the Intel ASL 
Compiler from your distro repositories or the source code from 
the download section of the acpica website, or by searching "dsdt"
 or "acpica-tools" or "acpi" from the software repository.

We can extract the DSDT of our system with:

```sh
 sudo cat /sys/firmware/acpi/tables/DSDT > dsdt.aml
```
questo file "dsdt.aml" però sarà per noi illegibile, dobbiamo 
quindi decompilarlo attraverso il pacchetto installato per il 
dsdt in precedenza, attraverso il comando:

```sh
 iasl -d dsdt.aml 
 # decompila il file "dsdt.aml"
```
This will generate a dsdt.dsl file that you can open in any text 
editor and start editing. But it’s a better idea to recompile the 
file to see if it produces any errors, or if there are any errors 
with the compiling tools.

```sh
 iasl -tc dsdt.dsl 
 # compila il file dsdt.dsl
```


### Risparmiare potenza e allungare la durata della batteria

Un tool utile a questo scopo è "powertop".

## Audio

```sh
 aplay -l 
 # visualizza le interfacce audio disponibili, 
 # solitamente ne abbiamo una a parte e se c'è una porta hdmi, 
 # questa costituisce una vera e propria scheda audio a parte, 
 # attaccata alla scheda video.
```


## Bash Shell Scripting

In questa sezione vediamo lo shell scripting. Diamo innanzitutto 
una carrellata di variabili d'ambiente che possono essere utili 
nell shell scripting.

```sh
 $PWD 
 # la directory corrente
```
```sh
 $IFS 
 # contiene il carattere utilizzato come separatore, 
 # rappresenta come la shell separa i parametri e i valori in 
 # genere, di default è assegnato al carattere "spazio" (space)
```
```sh
 $PS1 
 # il prompt visualizzato dalla shell
```
```sh
 $CDPATH 
 # è una variabile d'ambiente che può contenere 
 # directory aggiuntive che vengono considerate sempre nel momento 
 # in cui eseguiamo "cd", ad esempio se accediamo spesso alla 
 # directory "/etc" in quanto nella directory "/etc" sono 
 # contenute le directory "/etc/x" ed "/etc/y" che sono di nostro 
 # interesse, allora possiamo eseguire "export CDPATH=/etc" a 
 # questo punto in qualasiasi directory ci dovessimo trovare, 
 # possiamo eseguire semplicemente un "cd x" per accedere alla 
 # directory /etc/x ed "cd y" per accedere alla directory "/etc/y"
 # , è anche utilizzata per impostare la directory a cui andiamo 
 # quando eseguiamo "cd", che di default oggigiorno è la "home" 
 # dell'utente
```
```sh
 $PS2 
 # il secondo prompt visualizzato dalla shell, quello 
 # comumente indicato con ">"
```
```sh
 $$ 
 # il pid della shell attuale, in uno script è il PID dello 
 # script
```
```sh
 $SHELL 
 # il tipo di shell utiizzata
```
```sh
 $LD_LIBRARY_PATH 
 # il percorso delle librerie
```
```sh
 $EDITOR 
 # il tipo di editor che viene aperto in automatico 
 # quando richiesto
```
```sh
 $PATH 
 # il percorso da dove vengono presi gli eseguibili per 
 # essere lanciati come comandi
```
```sh
 $RANDOM 
 # se stampata, mostra un valore casuale generato dalla 
 # bash
```
```sh
 $# 
 # (utile negli script) il numero di parametri passati ad uno 
 # script
```
```sh
 $0 
 # (utile negli script) nome dello script
```
```sh
 $@ 
 # (utile negli script) una variabile unica contenente la 
 # lista di parametri passati allo script, usa come separatore lo "
 # spazio", questo è preferibile rispetto alla versione "$*", in 
 # quanto questa dipende da IFS
```
```sh
 $* 
 # (utile negli script) una variabile unica contenente la 
 # lista di parametri passati allo script, usa come separatore il 
 # carattere nella variabile "IFS"
```
```sh
 $1, $2, ... 
 # (utile negli script), è il parametro passato, ad 
 # esempio $1, è il primo parametro passato, $2 il secondo 
 # parametro passato e così via
```


### Stringhe

Vediamo alcune operazioni sulle stringhe in Bash.

```sh
var=ciao

# stampa "ciao"
echo "$var" 	

# uguale al precedente, stampa "ciao"
echo "$var"	

# stampa "$var", gli apici singoli sono diversi dagli apici doppi
echo '$var'	

# stampa solo il primo carattere, cioè "c"
echo "${var::1}" 

# stampa solo i primi due caratteri, posso leggerlo come 
# "stampa #fino al carattere 2", quindi "ci"
echo "${var::2}" 



# stampa tutta la stringa senza l'ultimo carattere
echo "${var::(-1)}" 

# stampa tutta la stringa senza gli ultimi due caratteri
echo "${var::(-2)}" 

# stampa tutta la stringa senza l'ultimo carattere
echo "${var:0:-1}"  

# stampa solo i caratteri dal secondo al penultimo
echo "${var:1:-1}" 

# in questo modo concateno le stringhe
var_seconda=($var$var) 

# stampa la stringa senza gli ultimi 4 caratteri
echo "${var::-4}"

# stampa gli ultimi 3 caratteri della stringa, quindi "iao"
echo "${var:(-3)}"

# stampa i caratteri dal 3 alla fine quindi "ao"
echo "${var:3}"

# per ricavare la lunghezza di una stringa eseguiamo
length=${#var}

# salva l'output di un programma/comando in una variabile
output=$(comando -arg1 23 -opz1)
```

### Conditionals


Ci sono due modi per effettuare test, 

```sh
 # il comando test
```

* come ad esempio: if test -f nome.txt

```sh
 il comando [ 
 # che per convenzione di leggibilità viene 
 # aggiunto il carattere ] alla fine del conditional
```

* come ad esempio: if [ -f nome.txt ]

Vediamo un esempio di blocco if

```sh

if [ -f fred.c ]
then
	...
elif
	...
else
	...
fi

# versione alternativa su una sola linea
# dobbiamo specificare il ; se non mettiamo il then 
# su una nuova linea

if [ -f fred.c ]; then
	...
elif
	...
else
	...
endif
```
i tipi di condizioni che possiamo usare col comando "test", sono 3:

* string comparison
* arithmetic comparison
* file conditionals

The following table describes these condition types:


| String Comparison   |                    Result                    |
|:-------------------:|:--------------------------------------------:|
|  string1==string2   |        true if the strings are equal         |
| string1 != string2  |      true if the strings are not equal       |
|     -n string       |        true if the string is not null        |
|     -z string       | true if the string is null (an empty string) |



|    Arithmetic Comparison     |                       Result                       |
|:----------------------------:|:--------------------------------------------------:|
| expression1 -eq expression2  |         vera se le espressioni sono uguali         |
| expression1 -ne expression2  |       vera se le espressioni non sono uguali       |
| expression1 -gt expression2  |     vera se expression1 è maggiore dell'altra      |
| expression1 -ge expression2  | vera se expression1 è maggiore o uguale dell'altra |
| expression1 -lt expression2  |      vera se expression1 è minore dell'altra       |
| expression1 -le expression2  | vera se expression1 minore o uguale di expression2 |
|        ! expression          |     vera se l'espressione è falsa, e viceversa     |



| File Conditionals  |                                              Result                                              |
|:------------------:|:------------------------------------------------------------------------------------------------:|
|      -d file       |                    vera se il file è una directory, o se la directory esiste                     |
|      -e file       | vera se il file esiste, nota che storicamente l'opzione "-e" non è portable, quindi si usa "-f"  |
|      -f file       |                           vera se il file è un file regolare (esiste)                            |
|      -g file       |                       vera se il set-group-id (SGID) è settato su un file                        |
|      -r file       |                                    vera se il file è readable                                    |
|      -s file       |                          vera se il file ha dimensioni diverse da zero                           |
|      -u file       |                          vera se il set-user-id SUID è settato sul file                          |
|      -w file       |                                    vera se il file è writable                                    |
|      -x file       |                                   vera se il file è executable                                   |


è da ricordare che uno script termina correttamente con "exit 0", 
mentre si usa un numero diverso da zero per segnalare una 
terminazione unsuccessful dello script.

Inoltre è convenzione racchiudere le stringhe sempre tra "" doppi 
apici, anche se contenute in variabili, in quanto l'assenza di 
questi ultimi potrebbe dare problemi, quindi dobbiamo usare "
$miaStringa" e non $miaStringa.


### Cicli for

La struttura base di un ciclo for è:

```sh
#!/bin/sh

for variable in values
do 
	statements
	...
done

exit 0
```

vediamo un esempio pratico:

```sh
#!/bin/sh

for foo in ciao1 ciao2 32 6 lol
do 
	echo $foo
done

exit 0
```

in questa caso vengono stampate le stringhe mostrate dopo "in". 
Vediamo un altro esempio, con una notazione "one-line":

```sh
#!/bin/sh

# this is wrong... we should not use ls, since it is an 
# interactive tool we should use "f*.sh"

# the correct form is

# for file in f*.sh do ; echo "$file

for file in $(ls f*.sh); do
	echo $file
done

exit 0
```

quello compreso tra `$()` viene eseguito come comando e preso 
l'output.

Vediamo un esempio di ciclo in stile C:

```sh
for i in {1..5} 
do    
	echo "Welcome $i times" 
done
```

un'altro esempio, potrebbe essere:

```sh
# in questo caso specifichiamo anche lo step da usare

for i in {1..10..2} 
do    
	echo "Welcome $i times" 
done
```

possiamo eseguire cicli infiniti con:
```sh
for (( ; ; ))
do    
	echo "infinite loops [ hit CTRL+C to stop]" 
done
```

### Cicli while


La struttura base di un ciclo while è:
```sh
#!/bin/sh

echo "Enter Password"
read trythis

while [ "$trythis" != "secret" ];do
	echo "Sorry, try again"
	read trythis
done

exit 0
```


### Ciclo Until

La struttura base di un ciclo until è:
```sh
#!/bin/sh

until condizione
do
	statements
	...
	...
done

exit 0
```

Un esempio di base è:
```sh
#!/bin/sh

until who | grep "$1" > /dev/null 
#in questo caso viene fatto un un do fino a che  non c'è l'utente 
# indicato come parametro nella lista degli account loggati, 
# la parte ">/dev/null" serve solo per redirigere l'output di alcuni comandi
do
	statements
	...
	...
done

exit 0
```


### Case Switch

La struttura base di un case switch è:
```sh
#!/bin/sh

##N.B.: Attenzione a come vengono usate le wildcard 
##nei case switch, perchè in realtà solo la 
##prima opzione di una wildcard verrà 
##presa in considerazione

echo "Is it morning ? Please answer yes or no"
read timeofday
case "$timeofday" in
	yes) echo "Good Morning";;
	no ) echo "Good Afternoon";;
	y  ) echo "Good Morning";;
	n  ) echo "Good Afternoon";;
	*  ) echo "Sorry, answer not recognized";;
esac

exit 0
```

vediamo un'alternativa struttura di uno switch case:

```sh
#!/bin/sh

##N.B.: Attenzione a come vengono usate le wildcard 
##nei case switch, perchè in realtà solo la 
##prima opzione di una wildcard verrà 
##presa in considerazione

echo "Is it morning ? Please answer yes or no"
read timeofday
case "$timeofday" in
	yes | Y | Yes | YES) echo "Good Morning";;
	n* | N* ) echo "Good Afternoon";;
	*  ) echo "Sorry, answer not recognized";;
esac


##in questo caso le wildcard funzionano
##correttamente, l'unico problema è che 
##stringhe come never o Never
##avranno la stessa valenza di "no" ad esempio

exit 0
```

una struttura alternativa di uno switch case in cui vengono 
specificate più istruzioni all'interno di un case è:

```sh
#!/bin/sh

##N.B.: Attenzione a come vengono usate le wildcard 
##nei case switch, perchè in realtà solo la 
##prima opzione di una wildcard verrà 
##presa in considerazione

echo "Is it morning ? Please answer yes or no"
read timeofday

case "$timeofday" in
	[yY] | [yY][eE][sS]) 
		echo "Good Morning";;
		echo "Up bright and early this morning"
		;;
	[nN]*) 
		echo "Good Afternoon"
		;;
	*) 
		echo "Sorry, answer not recognized"
		echo "Please answer yes or no"
		exit 1
		;;
esac

##in questo caso le wildcard funzionano
##correttamente, l'unico problema è che 
##stringhe come never o Never
##avranno la stessa valenza di "no" ad esempio

exit 0
```

### Liste AND e liste OR


Possiamo concatenare comandi a livello condizionale, ad esempio:

```sh
#!/bin/sh


##Esempio Lista AND
if [ -f file_one ] && echo "ciao" && [ -f file_two]
then
	echo "in if"
fi

##Esempio Lista OR

if [ -f file_one ] || echo "ciao" || [ -f file_two ]
then 
	echo "The first one is executed"
fi

exit 0
```

l'esempio con la lista AND, esegue i vari comandi da sinistra a 
destra solo se lìultimo eseguito è vero, cioè se la prima 
condizione è vera, allora viene eseguita la seconda (echo è 
sempre vero), se la seconda è vera viene eseguita la terza, nel 
caso una condizione non fosse vera, allora l'istruzione 
successiva non viene eseguita e l'intero if risulterebbe falso.

Mentre nel caso di lista OR, in pratica viene eseguito il primo 
comando vero e tutti gli altri vengono scartati dopo che è stato 
eseguito il primo comando vero.

### Operazioni matematiche


Per effettuare operazioni matematiche utilizziamo generalmente 
bc, infatti la bash shell può effettuare operazioni matematiche 
nativamente solo con numeri interi, per operazioni più complesse 
siamo costretti ad usare bc, vediamo alcuni esempi:

```sh
#effettuo il calcolo 1/3

echo "1/3" | bc -l; 

#oppure

a=2; 
b=5; 

res=$(bc -l <<< "$a * 3.4 + 4 / $b") 

#l'operatore "<<<" serve a redirigere nello standard input del 
#programma avviato



#setta la precisione del risultato a 2 cifredopo la virgola
echo "scale=2; 3/8" | bc


#radice quadrata
echo "sqrt(100)" | bc



#elevamento a potenza
echo "10^10" | bc
```


vediamo ora alcuni esempi di operazioni con interi supportate 
nativamente dalla bash:

```sh
#operazioni con numeri interi di bash

A=$(( B * C ))

B=$(( 1 + 5 / (59 *3) ))
```

Possiamo lanciare anche bc da terminale eseguendo:

```sh
 bc -l 
 # il flag "-l" ci permette di avere numeri con la 
 # virgola, altrimenti nel caso non venisse abilitato, all'interno 
 # di bc, dovremmo eseguire "scale=5" ad esempio per impostare il 
 # numero di cifre dopo la virgola a 5
```
### Funzioni


Possiamo definire funzioni shell in questo modo:

```sh
nome_funzione() {
	statements
	...
	...
}
# se nessun return è usato, viene usato come valore 
# di return dell'ultimo comando eseguito
```




è utile ricordare che possiamo fare prototipi di funzioni dalla 
shell anche solo eseguendo dalla command-line:

```sh
nome_funzione() {
    istruzione1
    istruzione2
    commento
    ...
    istruzioneN
} 
# questo indica la fine del programma
```
e per visualizzare un funzione possiamo eseguire:

```sh
 declare -f nome_funzione 
 # questo mostrerà il codice della 
 # funzione
```
il comando declare è molto utile anche nel caso volessimo salvare 
funzioni create sul momento e metterle in un file, andando a 
redirigere l'output nel file di configurazione della shell o nel 
file in cui andiamo a salvare le funzioni builtin.

```sh
### arr pag81 continuare dal libro beginning linux programming
```


### Array

```sh
arr=(Hello world) #definisco un array con due elementi stringa
arr2=(`echo {0..9}{0..9}{0..9}{0..9}`)


arr[0]=Hello
arr[1]=world

echo ${arr[0]} ${arr[1]} #stampa i vettori
```

vediamo un altro esempio:

```sh
DIGIT_CODE_ARRAY=(`echo {0..9}{0..9}{0..9}{0..9}`)
password="UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ"
number_combo=${#DIGIT_CODE_ARRAY[@]}

# use for loop read all combos

for (( i=0; i<${number_combo}; i++ )); 

do       

	echo "$password ${DIGIT_CODE_ARRAY[$i]}" 

done
```

### Interazione con finestre grafiche, ovvero xdotool (o xdo)


Vediamo un esempio di script che seleziona una finestra il cui 
titolo contiene la stringa "stringInAWindow" (questo potrebbe 
anche non essere il titolo completo della finestra), la attiva e 
poi preme la combinazione di tasti "space+z" all'infinito:

xdotool search "stringInAWindow" windowactivate; while true; do 
xdotool key space+z; done

altro esempio, in cui attiviamo una finestra e premiamo la 
combinazione Ctrl+q:

xdotool search "giuseppe" windowactivate && xdotool key ctrl+q

per i tasti f1-f12 usiamo:

xdotool search "giuseppe" windowactivate && xdotool key alt+f4 

possiamo mandare stringhe, ad esempio:

xdotool type 'ab cd' in questo caso stiamo mandando "a" poi "b" 
poi "spazio" poi "c" e poi "d".

Possiamo mandare ue tasti con:

xdotool key a b in questo caso mandiamo a e poi b.

Per mandare caratteri distanziati da 1ms, facciamo:

```sh
xdotool type --delay 1 'abc'
```

Possiamo anche aspettare che un'applicazione sia prima partita 
prima di lanciargli comandi, ad esempio:

```sh
google-chrome & xdotool search --sync --onlyvisible --class "google-chrome"x-terminal-emulator
```

### Snippet di Codice Utili con xdotool

```sh
# === Check per super-user (i.e., sei root ?) ===
#Ricorda che il valore UID per l'utente root è 0

if [ $UID -ne 0 ]; then 
	echo "Non root user. Please run as root."
else 
	echo "Root user"
fi
```

### Fare screenshot da terminale

```sh
 import namefile.jpg
 # ci permette di selezionare un'area rettangolare
 # in questo caso salviamo un file jpeg
 # cambiando il nome del file in namefile.png
 # il file in output sara' del formato png
```


## Linux per Applicazioni Embedded

### Creare un Initial Ram File System con sistema di base


Per creare un initial ram filesystem con file di base eseguiamo:

```sh
 mkdir rootfs
```
```sh
 cd rootfs
```
```sh
 mkdir bin dev etc home lib proc sbin sys tmp usr usr/{bin,lib,sbin} var var/log 
 # creazione delle directory di base
```
possiamo poi pensare ad esempio di copiare busybox all'interno 
del nostro initramfs, e poi una volta fatto dovremo copiare le 
librerie, l'insieme minimo è:

* ld-linux
* libc
* libm

nel dubbio cerchiamo la libreria dell'architettura interessata ad 
esempio nel caso dell'armhf cerchiamo, ld-linux-armhf.so.3, 
libc.so, libm.so. Se voglio risparmiare spazio posso usare "strip"
, col comando file possiamo capire se un file è già stato 
strippato o meno, possiamo eseguire strip su arm ad esempio con:

```sh
 arm-linux-gnueabihf-strip libc.so
```
e possiamo eseguirla per tutte le librerie, nel caso non 
volessimo avere problemi con le librerie possiamo copiare tutta 
la directory delle librerie, con lo strip si riesce a risparmiare 
il 20% dello spazio. Esistono inoltre alcuni device di base di 
cui abbiamo bisogno per avviare una shell, questi possiamo 
crearli con:

```sh
 sudo mknod -m 666 dev/null c 1 3
```
```sh
 sudo mknod -m 600 dev/console c 5 1
```
ora una volta che abbiamo creato il nostro rootfs possiamo creare 
l'initial ram disk con:

```sh
 cd rootfs
```
```sh
 find . | cpio -H newc -ov --owner root:root > ../initramfs.cpio
```
```sh
 cd ..
```
```sh
 gzip initramfs.cpio
```
ora questo file "initramfs.cpio.gz" è già leggibile da qemu, 
comunque possiamo creare un initramfs da bootare su un device 
reale con:

```sh
 mkimage -A arm -O linux -T ramdisk -d initramfs.cpio.gz uRamdisk
```
A questo punto se volessimo risparmiare spazio dobbiamo 
considerare una delle seguenti opzioni:

* fare il kernel più piccolo lasciando fuori qualche modulo in più
* fare busybox più piccolo lasciando qualche utility fuori in più
* usare uClibc o musl libc al posto di glibc
* compilare busybox staticamente, (attuabile solo nel caso in cui ci 
  devono girare pochissimi programmi sul sistema embedded)

per effettuare il boot di un initramfs ad esempio con Qemu 
considerando una board beaglebone:

```sh
 QEMU_AUDIO_DRV=none \ qemu-system-arm -m 256M -nographic -M \
 vexpress-a9 -kernel zImage -append "console=ttyAMA0 rdinit=/bin/sh" \
 -dtb vexpress-v2p-ca9.dtb -initrd initramfs.cpio.gz
```

### Cross Compilare Busybox per arm

Quando dobbiamo cross compilare è sempre buona norma quando si 
impostano configurazioni di default come "defconfig" prima 
specificare l'architettura, il modo corretto ad esempio per cross 
compilare busybox è:

```sh
 make distclean
```
```sh
 make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- defconfig 
 # carichiamo le impostazioni di default
```
```sh
 make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- menuconfig 
 # per cambiare le impostazioni che vogliamo
```
```sh
 make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- 
 # compiliamo
```
```sh
  make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- install CONFIG_PREFIX=/home/export/rootfs 
 # installiamo nella directory che desideriamo
```


### Comunicazione in Seriale

Possiamo connetterci ad un dispositivo seriale, attraverso:

```sh
 screen /dev/ttyUSB0 115200 
 # in pratica /dev/ttyUSB0 è un 
 # dispositivo d'esempio a cui connetterci e 115200 e la velocità 
 # della seriale
```
altri programmi alternativi sono:

```sh
 gtkterm -p /dev/ttyUSB0 -s 115200
```
oppure possiamo provare minicom e picocom.

N.B.: Se abbiamo un device esterno, come ad esempio una 
electronic board, un SoC (System on a Chip) o un device con 
interfaccia seriale in genere (cioè piedini TX,RX e GND) dobbiamo 
utilizzare un circuito FTDI per interfacciarci. Da provare è 
anche "stty" ad esempio stty -F /dev/ttyAMA0 9600 ma è da 
verificare.

Vediamo un esempio per leggere da seriale con minicom:

```sh
 minicom -b 115200 -o -D /dev/ttyUSB0 
 # in questo caso leggiamo 
 # da ttyUSB0 alla velocità di 115200
```
attenzione è buona norma ben configurare minicom, possiamo 
accedere al menu delle opzioni premendo:

```sh
 # Ctrl+A, e poi Z
```
da qui possiamo entrare nella configurazione con "o" e qui 
assicuriamoci che da entrambi i lati della comunicazione sia 
impostata la stessa velocità in "baud" e che:

* la voce "Hardware Flow Control" sia impostata su "No"
* la voce "Software Flow Control" sia impostata su "Yes"

possiamo anche salvare le impostazioni come dfl, in questo modo 
il setting sarà permanente.

In pratica l'Hardware Flow Control uses extra wires on the serial 
port, beyond just GND, TX and RX, a formal "serial port" like the 
9 pin RS232 port on old computers includes control lines like 
"Data Terminal Ready indicator", so hardware flow control is 
telling the computer to expect those extra signals


### GPIO Pins

GPIO mean "General Purpose Input/Output" and is a special pin 
present in some chip that can be set as input or output and used 
to move a signal high or low (in output mode) or to get the 
signal current status (in input mode). Usually these pin are 
directly managed by kernel modules but there are an easy way to 
manage these pins also from user space.

Standard Linux kernel have inside a special interface allow to 
access to GPIO pins. Once executed kernel menuconfig you can 
easily verify is this interface is active in your kernel and, in 
case, enable them. The kernel tree path is the following:

```
Device Drivers  ---> GPIO Support  ---> /sys/class/gpio/... (sysfs interface)
```

If not, enable this feature and recompile the kernel before 
continue to read. The interface to allow working with GPIO is at 
the following filesystem path:

```sh
 # /sys/class/gpio
```
Basically if you want to work with a particular GPIO you must 
first to reserve it, set the input/output direction and start 
managing it. Once you reserved the GPIO and finished to use you 
need to free it for allow other modules or process to use them. 
This rule is valid in both cases you want to use GPIO from kernel 
level or user level. From the user level side this "operation" 
for reserve the GPIO is called "export" the GPIO. For make this 
export operation you simply need to echo the GPIO number you are 
interested to a special path as follow (change XX with the GPIO 
number you need):

```sh
 echo XX > /sys/class/gpio/export
```
if the operation is successful (the possible case of operation 
failed is explained below) a new "folder" will show up in the 
GPIO interface path as example below:

```sh
 /sys/class/gpio/gpioXX/
```
This new "folder" will allow you to work with the GPIO you just 
reserved. In particular if you want to set the in/out direction 
you simply need to execute the following echo commands: 

```sh
 echo "out" > /sys/class/gpio/gpioXX/direction
```
or 

```sh
 echo "in" > /sys/class/gpio/gpioXX/direction
```
In case you set out direction you can directly manage the value 
of GPIO. You can make this operation by executing additional echo 
commands like:

```sh
 echo 1 > /sys/class/gpio/gpioXX/value
```
or

```sh
 echo 0 > /sys/class/gpio/gpioXX/value
```
Since GPIO is a single pin the possible states allowed are high 
(1) and low (0). In case you set in direction you can read the 
current pin value by using the following command:

```sh
 cat /sys/class/gpio/gpioXX/value
```
Once finished to use your GPIO you can free it by make the same 
echo command but to different path:

```sh
 echo XX > /sys/class/gpio/unexport
```
In case of GPIO folder not showed after export operation is very 
likely that the GPIO is already reserved by some module. For 
verify the current reserved GPIO map you must first verify if in 
your kernel is enabled the following feature:

Kernel configuration ---> Kernel hacking ---> Debug FS

As usual, if not enabled, enable it and recompile the kernel. The 
next step is to launch the following command line for mount 
debugfs:

```sh
mount -t debugfs none /sys/kernel/debug
```

and dump the current GPIO configuration by using:
```sh
cat /sys/kernel/debug/gpio
```

The output will show you the current list og reserved GPIO. Una 
libreria molto comoda per gestire il GPIO è "WiringPI", inoltre 
ha diversi binding per vari linguaggi di programmazione.

## TO ADD

* cgroups
* lxc
* network namespace
* xen
* active directory
* dpms
* xrandr
* xsetroot or hsetroot
* power management (section)
* Xclip
* cross compiling
* xev
* xdotool
* xset, with this we can control leds on computers/laptops or 
* even mouse speed, the keyboard repeat delay and rate and if the 
* repeat is enabled or not
* tunctl
* bridge ethernet
* xmodmap to remap the keys
* acpid
* ulimit: Commands and resources ulimit -n 
* view number of 
* processes change /etc/security/limits.conf or 
* /etc/security/limits.d/90-xxxxx.conf, ulimit -a views the list 
* of all the limits on the machine
* audio (utile pavucontrol)
* sysctl (used mostly on bsd systems, even for laptop features 
* such as lid closing/opening events)
* strace, ftrace, ltrace, stap, perf, sysdig
* bash scripting
* tun/tap
* setterm 
* to manage screen blanking in pure terminal 
* environments
* gcore 
* fc
* check the content of the program in memory
* apt-pinning
* dget and backporting packages in debian
* come aprire un file di man tipo "pagina.1" con man
* MULTIMEDIA: Convert (Swiss Army Knife for Images) and Sox 
* (Swiss Army Knife for Audio)
* imagemagick, convert or compare:
* compare image1.jpg image2.jpg #gives us the difference 
    between images

* rename files
```sh
# Full rename of filenames, directories, and contents foo -> bar:
repren --full --preserve-case --from foo --to bar .
# Recover backup files whatever.bak -> whatever:
repren --renames --from '(.*)\.bak' --to '\1' *.bak
# Same as above, using rename, if available:
rename 's/\.bak$//' *.bak
# be careful with rename, its function changes from distribution
# to distribution
```
or
```sh
# Renames all the *.md files in *.txt files
rename .md .txt *.md 
```

* nginx configuration e.g., this is useful:

nginx to act as a deployment proxy for random wsgi or other web server:
```nginx
server {
  listen 80;
  server_name example.org;
  access_log  /var/log/nginx/example.log;

  location / {
      proxy_pass http://127.0.0.1:8000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## Miscellaneous

```sh
 fortune | cowsay -f dragon-and-cow | lolcat 
 # o al posto di 
 # fortune un echo "ciao", anche figlet funziona bene, tipo 
 # 'echo "ciao" | figlet'
```

```sh
 figlet ciao
 # stampa a schermo la stringa "ciao"
 # asciizzata
```

#### Video Terminals

```sh
 echo $TERM # ci mostra il terminale con cui stiamo lavorando
```

```sh
infocmp | less # ci mostra le feature che possiede il nostro terminale 
```
ad esempio i video terminali vt100 non supportano i colori mentre gli 
xterm-256 li supportano.

```sh
 tput colors 
 #  questo comando ci dice se il nostro terminale supporta i colori
 #  se l'output e' -1 vuol dire che non li supporta, altrimenti ci mostra
 #  il numero di colori supportati, e.g., 256
```

```sh
 tput cups
 #  questo comand ci dice se il nostro terminale supporta lo spostamento del cursore
```

uno dei video terminali con meno features e' il dumb.
Possiamo cambiare terminale eseguendo:

```sh
 export TERM=dumb
```
Per utilizzare i colori utilizzano escape sequences.

Nota che per molti terminal emulator, le impostazioni sono settabili dal file
`.Xresources`.

### Debug di Applicazioni


#### Strace
Possiamo tracciare le chiamate di sistema eseguite da un processo con strace.

```sh
strace nome_programma arg1 arg2 
```

Possiamo vedere quale system call e' piu' lunga/lenta attraverso il seguente
comando:
```sh
trace -r your-program
# il flag -r stampa i tempi relativi
```

Possiamo vedere quanto tempo impiega ogni system call attraverso la seguente
opzione:
```sh
strace -T your-program
# il flag -T stampa i tempi assoluti impiegati da ciascuna system call
```

Possiamo produrre delle statistiche attraverso:
```sh
trace -c nome_proramma arg1 arg2
# il flag -c produce delle statistiche sulle system call utilizzate
```

Ad esempio se volessimo tracciare tutte le chiamate di sistema che interagiscono 
con i file di un programma lanciandolo con:
```sh
strace -ff -e trace=file nome_programma arg1 arg2  > log.txt 2>&1 
# il flag -ff traccia anche i processi forkati, in genere questa e' una 
# buona idea
# mentre il flag -e e' usato per specificare dei filtri sulle chiamate di sistema
# visualizzate
```

possiamo anche avere la lista dei file acceduti in tempo reale dando in pasto a
strace un Process ID (PID), questo pero' non terra' traccia dei file aperti in
passato dal processo. Possiamo farlo con:

```sh
strace -p <PID>
```

Un'altra opzione equivalente al comando precedente e' utilizzare lsof, cosi:
```sh
lsof -n -p  <PID_of_APP>
```

Vediamo altri esempi di utilizzo di strace:
```sh
strace -e trace=open,read -p 22254 -s 80 -o debug.txt
# in questo caso tracciamo solo le chiamate di sistema open e read del processo
# con PID 22254 e come lunghezza massima di stringa d'output concediamo 80
# caratteri (di default questo parametro e' settato a 32), inoltre l'output e'
# salvato nel file chiamato "debug.txt"
```

#### Ltrace

ltrace tracks and records the dynamic (runtime) library calls made by a process
and the signals received by it. It can also track the system calls made within a
process. It's usage is similar to strace


#### Modificare la memoria di un processo in running

Possiamo modificare il contenuto della memoria di un processo, mentre e' in
running attraverso questo snippet di codice in C:

```sh
#include <sys/ptrace.h>
...
ptrace(PTRACE_ATTACH, pid, NULL, NULL); 
// or use PTRACE_SEIZE instead of PTRACE_ATTACH if 
// you don't want to suspend the process

int data = 4;
ptrace(PTRACE_POKEDATA, pid, 0x83040, &data);
```




## Licenza

Il testo completo della licenza può essere trovato qui, [https:#www.gnu.org/licenses/fdl.html||Licenza GFDL].

