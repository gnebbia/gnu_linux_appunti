
We can install various dns servers, a common one is "bind" also
found as "bind9", we can install this package on our distro, una
volta installato possiamo verificare che sia in running
controllando quale processo sta occupando la porta 53 (porta
usata dal protocollo DNS), attraverso:

```sh
 sudo netstat -ntlp
 # mostra i processi attivi sulle relative
 # porte
```
dovremo vedere un processo chiamato "named", che corrisponde
proprio a bind, nel caso in cui bind si sia appropriato
dell'indirizzo di localhost possiamo testarlo eseguendo:

```sh
 dig www.example.com @127.0.0.1
 # esegue una query dns
 # utilizzando come local nameserver localhost, dobbiamo
 # verificare che la "answer section" sia valida, se è valida
 # allora il demone sta funzionando correttamente
```
Ricordiamo che di default bind funziona in modalità "caching-only"
 mode, so no information is cached (stored persistently).

N.B.: Everytime we want to clear the cache of a DNS server it is
sufficient to just restart the relative daemon.

## Configurazione di BIND


Per visualizzare dove è presente il file di configurazione di
bind ci basterà dare un'occhiata ai file installati col
pacchetto, quindi possiamo ad esempio in una distro Debian-based
eseguire:

```sh
 dpkg -L bind9
 # mostra i file installati dal paccheto
```
a questo punto scopriamo che il file di configurazione principale
è in "/etc/bind/named.conf" che è leggibile in genere, mentre un
altro file di configurazione chiamato "/etc/bind/rndc.key" è
leggibile solo dall'utente e dal gruppo "bind". Possiamo
controllare la versione di bind utilizzando:

```sh
 named -v
 # mostra la versione
```
```sh
 named -V
 # mostra la versione e informazioni aggiuntive, è più
 # verbose rispetto al "-v"
```
DA CONTINUARE
TODO


