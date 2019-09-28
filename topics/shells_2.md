

## Shell testuale ( DA RIGUARDARE)

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

## Priorità dei file di Configurazione per la Bash Shell


Per le Shell di Login la shell Bash cerca di eseguire nell'ordine
sottocitato i seguenti file:

1. `/etc/profile`
2. `~/.bash_profile`
3. `~/.bash_login`
4. `~/.profile`

e quando esce o si effettua il logout prova ad eseguire:

1. `~/.bash_logout`

Per le Shell non di Login, la shell Bash cerca di eseguire
nell'ordine sottocitato i seguenti file:

1. `/etc/bash.bashrc`
2. `~/.bashrc`

## Shell di Login o Shell di Non Login ?


Per controllare se siamo in una shell di login o in una shell non
di login quando usiamo una shell Bash, possiamo usare il comando:

```sh
 shopt -q login_shell && echo 'Login shell' || echo 'Not login shell'
 # mostra video un messaggio mostrando se la shell in
 # utilizzo è di login o non di login
```

oppure:
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


## Variabili d'ambiente della shell

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
 # copia l'output del comando nella clipboard di sistema pronto per essere
 # incollato, utile quanto ad esempio vogliamo utilizzare servizi di paste online
```

```sh
 \nomeComando
 # utile per fare in modo di utilizzare il comando
 # senza alias, se ad esempio abbiamo un alias impostato su "ls" e
 # vogliamo invece utilizzare "ls" nella sua versione originale
 # senza alias, eseguiamo "\ls", comodo soprattutto quando
 # applichiamo alias su "rm"
```
## Configurazione e Personalizzazione della Shell Bash


Possiamo cambiare la dimensione della history, andando ad
inserire nel file ".bashrc", cercando la stringa "HIST", possiamo
cambiare le due varibili relative chiamate "HISTSIZE" ed "
HISTFILESIZE", una volta applicate le modifiche possiamo o
sloggare e riloggare oppure eseguire:

```sh
 source .bashrc
```

## Shortcut per Bash e altre shell


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


## Variabili d'ambiente

Le variabili d'ambiente ci permettono di memorizzare dati
all'interno della nostra shell, quindi il loro valore può variare
da utente ad utente. Ad esempio, nel caso volessimo salvare una
variabile chiamata "TEST", che rappresenta l'indirizzo di un sito
web, allora facciamo:

```sh
 export TEST='http://linuxacademy.tv'
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

* `\a`, an ASCII bell character (07)
* `\d`, the date in "Weekday Month Date" format (e.g., "Tue May 26")
* `\D{format}`, the format is passed to strftime(3) and the result
    is inserted into the prompt string; an empty format results in
    a locale-specific time representation. The braces are required
* `\e`, an ASCII escape character (033)
* `\h`, the hostname up to the first '.'
* `\H`, the hostname
* `\j`, the number of jobs currently managed by the shell
* `\l`, the basename of the shell?s terminal device name
* `\n`, newline
* `\r`, carriage return
* `\s`, the name of the shell, the basename of $0 (the portion following the final slash)
* `\t`, the current time in 24-hour HH:MM:SS format
* `\T`, the current time in 12-hour HH:MM:SS format
* `\@, t`he current time in 12-hour am/pm format
* `\A`, the current time in 24-hour HH:MM format
* `\u`, the username of the current user
* `\v`, the version of bash (e.g., 2.00)
* `\V`, the release of bash, version + patch level (e.g., 2.00.0)
* `\w`, the current working directory, with $HOME abbreviated with a tilde
* `\W`, the basename of the current working directory, with $HOME abbreviated
    with a tilde
* `\!`, the history number of this command
* `\`  : the command number of this command
* `\$`, if the effective UID is 0, a `#` , otherwise a `$`
* `\nnn`, the character corresponding to the octal number nnn
* `\\`, a backslash
* `\[`, begin a sequence of non-printing characters, which could
    be used to embed a terminal control sequence into the prompt
* `\]`, end a sequence of non-printing characters
* `\u`, nomeutente
* `\h`, hostname
* `\w`, directory corrente
* `\@, o`ra corrente con indicazione AM/PM
* `\t`, ora corrente con indicazione dei secondi
* `\j`, numero di job in esecuzione
* `\d`, data corrente
* `\$, m`ostra il simbolo "$" se l'utente corrente non è root
    mentre in caso contrario mostra il simbolo "#"

Per poter modificare i colori o gli stili del testo invece
esistono dei codici, ad esempio il verde non grassetto
corrisponde al codice "0;32", però l'inizio e la fine dello
stile/colore deve essere delimitata dalle sequenze:

* `\[\e[codiceColorem\]`, per iniziare con codiceColore
*  `\[\e[m\]`, per terminare con l'ultimo codice con cui abbiamo iniziato

ad esempio, nel caso volessimo avere un prompt con il nome utente
e l'hostname con carattere di separazione "@" tutto di colore "0;32" seguiti
dalla directory corrente con stile/colore "0;31" allora facciamo:

```sh
 export PS1='\[\e[0;32m\]\u@\h\[\e[m\]\[\e[0;31m\]\w\[\e[m\]'
```
Per una lista di tutti gli stili/colori disponibili, è
consigliato consultare.
[Guida ai Colori del Prompt di Shell](https://wiki.archlinux.org/index.php/Color_Bash_Prompt)

Vediamo un altro esempio:
```sh
  PS1="$HC$FYEL[ $FBLE${debian_chroot:+($debian_chroot)}\u$FYEL:$FBLE\w $FYEL]\\$ $RS" PS2="$HC$FYEL&gt; $RS"
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


## Opzioni di Shell

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
[Guida al comando Set e alle Opzioni di Shell](http://www.tldp.org/LDP/abs/html/options.html)

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

## Zsh

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
## Funzioni d'Ambiente


Come per le variabili possiamo anche creare "comandi" (cioè
funzioni) che saranno accessibili solo all'utente, questo è
possibile andando a salvare nel file ".bashrc" o ".profile" a
differenza dei file che vengono eseguiti all'avvio (ergo dipende
molto dal setup dell'ambiente). Vediamo un esempio di funzioni
inserite all'interno del file .bashrc:

```sh
# Set Proxy

function nomecomandopersonaleuno() {
	export {http,https,ftp}_proxy="http://proxy-server:port"
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
## Memorizzare Comandi e Riprodurli


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

## Terminal Multiplexers

I Terminal Multiplexer permettono di lavorare in ambienti con più
sessioni di terminale all'interno dello stesso terminale, è
l'analogo dei desktop virtuali per le GUI fatto per le TUI. I due
più famosi Terminal Multiplexer sono:

* tmux
* screen
* terminator (GUI)


## Tmux

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

* `c`, crea una nuova window
* `n`, va alla window successiva
* `p`, va alla window precedente
* `&`, killa la window corrente
* `s`, mostra lo stato di tutte le window
* `,`, rinomina la window corrente
* `w`, mostra la lista delle window all'interno della sessione corrente
* `0-9`, va alla finestra identificata dall'id specificato

Per quanto riguarda i pane, abbiamo a disposizione i seguenti comandi:

* `"`, splitta in modo orizzontale la window in due pane
* `%`, splitta in modo verticale la window in due pane
* `o`, switcha tra un pane e l'altro
* `;`, switcha tra il pane corrente e il precedente

* `;`, va all'ultimo pane attivo
* `!`, converte il pane in una finestra separata
* `x`, chiude il pane o una window se e' presente un unico pane
* `$`, rinomina la corrente sessione tmux

* `tasti direzionali`, ridimensiona un pane
* `spacebar`, cambia il layout tra alcuni predefiniti
* `z`, mette un pane in fullscreen, dobbiamo ripetere lo shortcut # per rimetterlo a posto
* `{,}`, spostiamo il pane a destra o a sinistra


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

```tmux
 join-pane -s 1
 # joina la window 1 come pane alla window
 # corrente
```
```tmux
 join-pane -b -s 5 -t 2
 # joins window 5 to the left of pane 2
 # in the current window
```
```tmux
 join-pane -s 1 -t 0
 # joina la finestra uno come pane alla
 # finestra corrente
```
```tmux
 swap-window -s 2 -t 1
 # swappa la finestra 2 con la numero 1
```
Guardare ovviamente il man per altre opzioni


## Screen

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


## Terminator

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
