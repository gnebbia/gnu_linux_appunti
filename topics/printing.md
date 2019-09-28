
Per stampare sui sistemi GNU/Linux il programma principale
utilizzato è CUPS, anche se in passato era molto utilizzato LPD e
molte distro ancora lo supportano, quindi diamo un'occhiata ad
entrambi.


## LPD (Linux Printer Daemon)

LPD ha costituito per molti anni un sistema di gestione del
sistema di stampa, è utile conoscerlo in quanto il più moderno
CUPS è compatibile con LPD, e i comandi sono analoghi. Per
installa il sistema LPD, eseguiamo:

```sh
 sudo apt-get install lpr
 # installa il sistema LPD, nota che
 # LPD non può essere installato assieme a CUPS, possiamo avere o
 # l'uno o l'altro
```
Vediamo alcuni esempi di applicazione dei comandi di stampa:

```sh
 lpr -P PDF test.txt
 # in questo caso, eseguiamo una stampa, e
 # col flag "-P" scegliamo la stampante, che è un file PDF, mentre
 # il file da stmpare è test.txt
```
```sh
 lpr test.txt
 # in questo caso stampa con la stampante di
 # default
```
```sh
 lpstat -d
 # mostra il nome della stampante di default
```
```sh
 lpstat -p
 # mostra la lista di tutte le stampanti associate
 # alla macchina
```
```sh
 lpoptions -d nomeStampante
 # mostra informazioni sulla
 # stampante, le info mostrate con questo comando devono essere
 # messe nel file "/etc/printcap" se non già esistenti, (non in
 # tutte le distro esiste questo file) che è un link al file "
 # /etc/cups/printers.conf" (questo esiste in tutte le distro)
 # infatti all'interno di questo file troviamo anche la lista
 # delle stampanti con le relative informazioni
```
Per stampare possiamo sia usare il comando "lp" che il comando "
lpr", sono analoghi, differiscono solo per parametri, ad esempio:

```sh
 lp -d nomeStampante nomefile
 # stampa il file chiamato nomeFile
 # con la stampante nomeStampante
```
```sh
 lpr -P nomeStampante nomefile
 # stampa il file chiamato
 # nomeFile con la stampante nomeStampante
```
```sh
 xpp
 # apre il gestore grafico adibito alla stampa, comodo
 # quando abbiamo X a disposizione
```
```sh
 cupsenable nomeStampante
 # riabilita una stampante se è stata
 # disabilitata
```


## CUPS (Common Unix Printing System)

CUPS è un sistema di stampa per sistemi GNU/Linux caratterizzato
da un sistema di gestione via browser, che semplifica il
settaggio delle impostazioni, possiamo di default accedere a
questo sistema, collegandoci a "localhost:631". E' sempre buona
norma installare una stampante PDF, che è molto utile. Per
installa cups, facciamo:

```sh
 apt-get install cups
 # installa cups
```
```sh
 apt-get install cups-pdf
 # installa la stampante pdf
```
Per quanto riguarda la linea di comando, valgono gli stessi
comandi utilizzati per LPD, sia per stampare, che per
gestire/visualizzare le stampanti.

Infatti CUPS mantiene una certa compatibilità con LPD, ad esempio
la maggior parte dei comandi sono rimasti uguali, rimpiazza LPD
con un sistema di più semplice gestione. Di default, CUPS è
basato su due demoni, che gestiscono il sistema di stampa:

* cupsd
* cups-browsed

Per avviare (o riavviare) il demone di che gestisce il sistema di
stampa, che può essere in alcune distro un'operazione necessaria
dopo l'installazione, possiamo effettuare:

```sh
 /etc/init.d/cupsd restart
 # riavvia il demone che gestisce il
 # sistema di stampa, con systemd sarebbe "systemctl restart cupsd"
```
```sh
 /etc/init.d/cups-browsed restart
 # riavvia il demone che
 # gestisce il sistema di configurazione via web, con systemd
 # sarebbe "systemctl restart cups-browsed"
```
Inoltre se al riavvio non è abilitato, è buona norma abilitarlo
dopo ogni boot (la maggior parte delle distro dovrebbe farlo di
default), con systemd possiamo usare:

```sh
 systemctl enable cupsd
 # abilita anche dopo il boot cupsd
```
```sh
 systemctl enable cups-browsed
 # abilita anche dopo il boot
 # cups-browsed
```
Vediamo ora alcuni file di configurazione e directory importanti:

* "/etc/cups/cups-browsed.conf": questo file di configurazione
  contiene le impostazioni di configurazione del server di
  stampa, in questo file, possiamo abilitare o disabilitare
  indirizzi ip per cercare/trovare stampanti, possiamo
  restringere il range di ip, da cui gli altri ad esempio possono
  stampare

* "/etc/cups/cupsd.conf": questo file di configurazione contiene
  la porta di configurazione di CUPS e l'indirizzo a cui è
  hostato il webserver di configurazione, che di default è "localhost:631"

* "/var/spool/cups": questa directory contiene tutti i file
  rappresentanti i Job per cui è stata richiesta una stampa,
  finchè questi job non vengono rimossi da qui, una richiesta di
  stampa può essere rieseguita


## Gestione delle Code con CUPS

Vediamo ora alcuni comandi per gestire le code con CUPS:

```sh
 lpstat -a
 # mostra lo stato di tutte le stampanti
```
```sh
 lpq
 # mostra la coda di stampa, ad ogni richiesta di stampa è
 # associato un "Job" ID che permette di identificare univocamente
 # la richiesta, se quando effettuiamo questo comando leggiamo in
 # testa che la stampante non è pronta, ma con lpstat invece dice
 # che è pronta ad accettare richieste, questo vuol dire che la
 # stampante è in pausa
```
```sh
 lpq -P nomeStampante
 # mostra la coda di stampa per la
 # stampante nomeStampante
```
```sh
 lprm
 # rimuove tutti i Job per la stampante di default
```
```sh
 lprm 22
 # rimuove il job con ID 22
```
```sh
 cupsenable nomeStampante
 # riabilita la stampante
 # nomeStampante, se era in pausa ora è di nuovo possibile
 # stampare
```
```sh
 cupsdisable nomeStampante
 # disabilita la stampante
 # nomeStampante, mettendola in uno stato di pausa, le richieste
 # verranno messe in coda
```
```sh
 cupsreject nomeStampante
 # non permette di effettuare stampe,
 # le richieste non verranno messe in coda, ma reiettate
```
```sh
 cupsaccept nomeStampante
 # riabilita la stampante dallo stato
 # di "reject" abilitato col comano precedente
```
