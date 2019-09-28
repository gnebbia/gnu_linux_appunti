
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



