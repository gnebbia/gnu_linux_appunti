
I file di testo e la loro gestione ricopre un ruolo importante
nei sistemi GNU/Linux, in quanto qualsiasi cosa è alla fine vista
come un file di testo, i più comuni editor di testo sono "vi" e "
nano", anche se i standard "de facto" per i power users sono "vi"
ed "emacs".


## Vi (Editor di Testo)

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
## Vim


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
anni 80, per disabilitare questa feature dobbiamo modificare il nostro
file di configurazione shell ad esempio `~/.bash_profile` or
`~/.bashrc`, con la seguente stringa:
```sh
stty -ixon
```

P.S.: Per navigare i file è molto comodo il plugin "Ctrl+P".


## Richiamare programmi esterni su blocchi di righe

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


## Cercare documentazione in vim

Possiamo cercare documentazione una volta posizionato il cursore
su una determinata funzione/keyword premendo "shift+k". Ad
esempio se programmiamo in Perl, questo funziona solo se abbiamo
installato il pacchetto "perl-doc" o se programmiamo in python
solo se abbiamo installato "pydoc" e così via.

Inoltre per cercare ad esempio il prototipo di una funzione
scritta da noi, possiamo (cercare :h tags, :h ctags, :h cscope,
:h include-search :help include-search ->
http://vimhelp.appspot.com/tagsrch.txt.html#include-search)


## Editare file con sudo

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
## Folding/Unfolding di testo


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
## Navigare Codice Sorgente


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


## File di template in Vim

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


## Documentazione per sorgenti

Nel file relativo alla configurazione del linguaggio in uso, ad
esempio "~/.vim/after/ftplugin/python.vim" possiamo aggiungere:

```sh
 set keywordprg=:new\|setl\ buftype=nofile\ nobuflisted\|r\ !\ pydoc
 # questo ci permetterà di aprire un nuovo buffer
 # temporaneo in cui comparirà la documentazione
```


## Window, buffers e Tab Management

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


## Comandi per gestire le Window

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


## Comandi per gestire i Buffer

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

## Comandi per gestire le Tab


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


## Auto Indentazione di Codice

Per autoindentare codice, possiamo fare nella normal mode:

```sh
 gg=G
 # autoindenta il codice, e mette a posto la formattazione,
 # in pratica il comando indenta è =, quindi con gg ci
 # posizioniamo a inizio file, = indenta e con G gli diciamo di
 # indentare fino a fine file
```
## Vim Plugins


Esistono molti plugin, e molti plugin manager (consigliatissimo
se non obbligatorio usarli), ad esempio uno dei più famosi è "
pathogen" ma c'è anche "apt-vim" e molti altri, con pathogen per
installare un plugin eseguiamo:

```sh
 # cd ~/.vim/bundle && git clone
  https://github.com/scrooloose/nerdtree.git
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

## Configurazione Vim per tipo di File


Potrebbe capitare che per file con estensione ".c" vogliamo che
il tab sia di 8 caratteri mentre per file con estensione ".rb" il
tab sia di "2" caratteri, per cambiare queste impostazioni per
tipo di file ci basta creare una directory chiamata "
.vim/after/ftplugin" e poi creare dei file ".vim" per ciascuna
estensione desiderata, ad esempio, andiamo a modificare la
larghezza del tab per i file con estensione ".rb" (per il
linguaggio ruby), possiamo fare così:

```sh
 mkdir -p ~/.vim/after/ftplugin
```
```sh
 touch ruby.vim
```
e ora in "c.vim" inseriamo ad esempio:

```txt
set ts=2
set sw=2
set et
```

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
`~/.vim/after/ftplugin/sh.vim` con le impostazioni desiderate.


## Registri

In vim possiamo copiare ed incollare da vari registri... possiamo
selezionare un registro con il doppio apice ", inoltre c'è un
registro speciale chiamato "blackhole" indicato conl'underscore "\_",
ad esempio nel caso volessimo buttare via una riga senza
copiarla, possiamo tagliarla e incollarla nel registro blackhole
con: `"_dd`, mentre per salvare una riga nel registro b, possiamo
usare `"bdd`.

## Make e Automatizzare Compilazioni


Possiamo impostare il comando "make" con:

```sh
 :set makeprg=bash\ myscript.sh
```
oppure per evitare di usare escape possiamo usare:

```sh
 :let &makeprg = "cd cmt && make"
```
oppure possiamo cambiare il comando make a differenza del tipo di
file, ad esempio:

```sh
 set makeprg=redcarpet\ %\ >/tmp/%<.html
```
where % means the file currently edited, and `%<` means the file
currently edited without extension


## Streams and Redirects, Redirection

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


## Cat, wc, split, diff e shuf

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

Un utilizzo molto utile di diff e' quando vogliamo controllare quali righe
all'interno di un file A non sono presenti all'interno del file B, per fare
questo possiamo eseguire:

```sh
diff --new-line-format="" --unchanged-line-format="" <(sort file1) <(sort file2)
# praticamente i file vengono ordinati con una sort e vengono poi
# stampate in output le righe presenti in file1 ma assenti in file2
```
Possiamo anche controllare il contrario e cioe' quali righe di file2 non sono
presenti in file1, solo andando a cambiare l'ordine e cioe' mettendo file1 al
posto di file2 nel comando.

Ricorda che in realta' il comando `diff -u` e' equivalente a:
```sh
diff --old-line-format="-%L" --unchanged-line-format=" %L" --new-line-format="+%L" file1 file2
```

Nota che il comando diff non puo' essere utilizzato per file binari,
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


## Pipes

Permettono di usare l'output di un comando come input per un
altro comando. Quello che viene preso è l'output inteso come
contenuto del file relativo allo stdout. Ad esempio:

```sh
 ls /etc | sort -f
 # questo comando prende il listato prodotto
 # da ls e lo da in pasto a sort che lo ordina, il parametro -f
 # indica di usare la modalità "case insensitive"
```


## Tee

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


## Cut

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

Ricorda che cut puo' utilizzare solo singoli caratteri come delimitatori, quindi
per poter ad esempio utilizzare insiemi di caratteri come delimitatori (ad
esempio piu' spazi) possiamo combinarlo con il programma `tr`, ad esempio:
```sh
md5sum file.txt | tr -s ' ' | cut -d ' ' -f 2
# in questo caso il programma tr con l'opzione -s effettua uno squeeze
# del carattere spazio andando a rimuovere le ripetizioni.
```


## Regular Expressions (o RegEx)

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
loro funzionalita' come da regex nella versione standard.
Mentre nella versione extended al contrario se vengono escapati assumono
solo un significato di semplice carattere.
Quindi in un programma che utilizza le regex
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


## Anchors

Queste sono le anchors:

* `^`, indica l'inizio di una linea o di una stringa
* `$`, indica la fine di una stringa o di una linea


## Quantifiers

* `*`, 0 o piu'
* `{3}`, esattamente 3
* `+`, 1 o piu'
* `{3,}`, 3 o piu' (almeno 3)
* `?`, 0 o 1 (opzionale)
* `{3,5}`, 3, 4 o 5 (minimo 3, massimo 5)


## Character Classes

Character Classes sono classi di caratteri, come:

* `\c`, Control character
* `\s`, White space # questo comprende spazi, tab, eccetera
* `\S`, Not white space
* `\t`, tab, questo è compreso anche in "\s"
* `\r`, carriage return
* `\n`, line feed
* `\b`, inizio o fine di una parola
* `\<`, inizio di una parola
* `\>`, fine di una parola
* `\d`, Digit
* `\D`, Not digit
* `\w`, Word
* `\W`, Not word
* `\x`, Hexade­cimal digit
* `\O`, Octal digit



## Range

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


## Stringhe POSIX

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


## Raggruppamenti

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


## Lookaheads

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


## Lookbehinds

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


## Esempi per capire

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

## Regexes: Note Aggiuntive

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
  che lo spazio non sia un comando, e rende le regex leggibili, debuggabili,
  comprensibili e manutenibili. Ove possibile utilizzare sempre questo formato.
  In Perl ad esempio per poter utilizzare questa modallita' basta mettere in
  append alla regex la lettera 'x', quindi `/regex/x`, in altri linguaggi
  bisogna mettere all'inizio della regex la sequenza `(?x)`.
  Alcuni dialetti/linguaggi non supportano questa opzione di extended
  formatting, ad esempio Javascript, in questi linguaggi comunque si puo'
  truccare ad esempio costruendo le regex come concatenazioni di
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
  in genere inoltre se proprio abbiamo la necessita' di utilizzarlo, facciamolo
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
  Questo permette di matchare elementi in testi come questo:
```text
<1,24,<7,<10,11>,9>,121,23,42>
```



## Grep, Egrep ed Fgrep

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
## Sed

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
 # viene fatta prendendo come riferimento il file "team". Ricorda
 # di redirigere l'output al buco nero /dev/null se non si vuole
 # vedere nulla sullo standard output
```
```sh
 sed '/^## / s/_/ /g' mioFile > mioFileNuovo
 # sostituisce tutte le occorrenze del carattere underscore '_'
 # con spazi, ma questo avviene solo sulle righe che matchano
 # il pattern /^## / come regex, cioe' che iniziano la riga per '## '
 # e' interessante vedere come in sed e' del tutto possibile
 # scrivere programmini per l'editing del testo.
 # In questo caso diciamo prima match le righe con /^## / e poi effettua
 # la sostituzione
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


## Sed Scripts

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


## Append, Insert and Change in Sed

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


## Other Sed Examples

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


## Awk

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

Una domanda comune ai colloqui di lavoro per amministratori di sistema, e' come
eliminare le linee duplicate all'interno di un file, questo e' fattibile in awk
con una sola istruzione:
```sh
awk '!seen[$0]++' <filename>
```

```sh
awk '{if(gsub(/##+/,"")){name=$0;}else{print > name".md"}}' file
# questo spezza un grande file markdown in piu' file relativi alle
# diverse sezioni
```


