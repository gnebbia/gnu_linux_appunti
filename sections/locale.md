

## Date, e cal

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


## Localtime e Timezone

## Localtime

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


## Timezone

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


## Lingua dei pacchetti e locale

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

## Tastiera


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

### Modifiche permanenti al layout della tastiera

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
### Settaggio permanente della lingua con startx

Nel caso non si usasse systemd, possiamo aggiungere il comando "
setxkbmap it" per aggiungere il layout nel file ".xinitrc", nel
caso usassimo "startx" per avviare l'ambiente grafico, la voce va
aggiunta prima dell'exec dell'ambiente grafico.

### Settaggio permanente della lingua senza startx e senza systemd

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


## Character Encoding

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


## Iconv

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


## Hwclock

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


## NTP (Network Time Protocol)

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


