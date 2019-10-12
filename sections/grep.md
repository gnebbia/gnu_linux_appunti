# Grep, Egrep ed Fgrep

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
