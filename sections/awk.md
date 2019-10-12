# Awk

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


