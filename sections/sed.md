# Sed

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

- `p`, print (visualizza allo stdout),
- `d`, delete (cancella),
- `i`, insert
- `s`, substitute (sostituisce)
- `=`, print number line (stampa il numero di riga)
- `y`, translate (opera in modo simile a `tr` effettua sostituzione di caratteri)
- `N`, go to next line (va alla riga successiva, molto utile negli script)

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
sed '/^Windows/d' infile
# cancella ogni riga che inizia con la parola "Windows"
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
 # prints from line 1 to 10
 sed -n '1,10 p' file
 # does not print from line 11 to end of file
 sed -n '11,$ !p' file
 # does not delete from line 1 to line 10
 sed '1,10 !d'  file
 # deletes from line 11 to end of file
 sed '11,$ d' file
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

In questo caso verranno effettuate tutte le sostituzioni indicate
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

In questo caso verranno effettuate tutte le sostituzioni tra la
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


## Append, Insert e Change con Sed

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


## Altri Esempi con sed

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
