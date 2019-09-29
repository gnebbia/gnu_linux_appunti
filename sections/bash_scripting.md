
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


## Stringhe

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

## Conditionals


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


## Cicli for

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

## Cicli while


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


## Ciclo Until

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


## Case Switch

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

## Liste AND e liste OR


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

## Operazioni matematiche


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
## Funzioni


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
## arr pag81 continuare dal libro beginning linux programming
```


## Array

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

## Interazione con finestre grafiche, ovvero xdotool (o xdo)


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

## Snippet di Codice Utili con xdotool

```sh
# === Check per super-user (i.e., sei root ?) ===
#Ricorda che il valore UID per l'utente root è 0

if [ $UID -ne 0 ]; then
	echo "Non root user. Please run as root."
else
	echo "Root user"
fi
```

## Fare screenshot da terminale

```sh
 import namefile.jpg
 # ci permette di selezionare un'area rettangolare
 # in questo caso salviamo un file jpeg
 # cambiando il nome del file in namefile.png
 # il file in output sara' del formato png
```


