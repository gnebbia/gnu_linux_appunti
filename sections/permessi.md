

## Permessi e Impostazioni

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

### Modalità simbolica

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


### Modalità Numerica

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


### Special Permission Bits

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


### Note Aggiuntive sui Permessi

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


## Permessi di Default, ossia Umask

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


