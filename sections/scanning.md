
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


## Programmi per Scansione Documenti

Possiamo usare il programma "xscanimage" per scandire
un'immagine, questo programma è contenuto solitamente nel
pacchetto "sane-frontends". AGGIUNGERE UN MINITUTORIAL A
XSCANIMAGE


## Gestire documenti pdf

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


