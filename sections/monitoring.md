
In questa sezione ci occuperemo di:


1. misurare l'utilizzo di risorse
2. risolvere problemi relativi all'utilizzo di risorse
3. migliorare la gestione delle risorse

Strumenti standard per la gestione delle risorse che sono
installati sulla maggior parte delle distro di default sono:

* vmstat
* uptime
* who
* top
* lsof
* netstat
* pstree
* lsof
* ps

## Vmstat


Il programma "vmstat" costituisce uno dei programmi più
importanti di quelli forniti di default, possiamo lanciarlo con:

```sh
 vmstat
 # avvia vmstat
```
```sh
 vmstat -S M
 # avvia vmstat mostrando gli utilizzi di memoria in
 # MB
```
```sh
 vmstat -a
 # avvia vmstat mostrato la memoria attiva/inattiva
```
```sh
 vmstat 5 3
 # avvia vmstat, si avvierà 3 volte distanziate da 5
 # secondi
```
vedremo diverse informazioni sullo schermo dove:

* r: numero totale di processi che aspettano tempo CPU, ergo coda processi
* b: numero totale di processi bloccati che sono in attesa di risorse come disco o rete
* Swpd: memoria virtuale usata
* Free: memoria virtuale libera
* Buff: memoria usata come buffer (percorsi delle directory e cosa c'è all'interno)
* Cache: memoria usata come cache (contenuto dei file)
* Si: quantità di memoria swappata dal disco ogni secondo
* So: quantità di memoria swappata sul disco ogni secondo
* Bi: blocchi in ingresso al secondo
* Bo: blocchi in uscita al secondo
* In: interrupt al secondo
* Cs: context switch che avvengono al secondo

possiamo utilizzare:

```sh
 sudo bash -c "echo 3 > /proc/sys/vm/drop_caches"
 # libera la
 # memoria utilizzata dal buffer e dalla cache
```
Il problema con questi tool citati presenti nel package "procps"
e che non ci permettono di lavorare con dati storici, quindi non
possiamo visualizzare in modo comodo una history ed inoltre hanno
funzionalità basilari, vedremo nelle prossime sezioni strumenti
più avanzati.


## Monitoring da riga di comando

Per avere un sistema di monitoring più avanzato è utile
installare il pacchetto "sysstat" che costituisce un'evoluzione
del precedente vmstat dal pacchetto "procps", il pacchetto "
sysstat" contiene tool simili a procps come ad esempio "iostat" e
"mpstat" e ci permettono di raccogliere informazioni
periodicamente in modo da avere quadri precisi delle prestazioni
e un monitoring più completo. I dati con sysstat vengono raccolti
ogni 10 minuti e possono essere letti attraverso "sar", in
pratica lo script "sa1" raccoglie dati ogni 10 minuti e lo script
"sa2" ne fa un resoconto quotidiano; questi due script, sa1 e sa2
sono abilitati attraverso cron. Possiamo quindi installare
sysstat con:

```sh
 sudo apt-get install sysstat
```
sulle distro Debian-based dopo l'installazione dobbiamo abilitare
il raccoglimento di dati attraverso il file "/etc/default/sysstat"
 andando ad abilitare la stringa "ENABLED="true""

Una volta installato possiamo visualizzare il cron relativo con:

```sh
 sudo cat /etc/cron.d/sysstat
 # visualizza il file di cron di
 # sysstat, di default, raccoglie dati ogni 10 minuti con sa1 e fa
 # un resoconto giornaliero con sa2
```
Gli strumenti di sysstat sono:

```sh
 iostat
 # fornisce informazioni su CPU e I/O disk
```
```sh
 mpstat
 # fornisce informazioni dettagliate su CPU
```
```sh
 pidstat
 # mostra informazioni sui processi
```
```sh
 cifsiostat
 # mostra informazioni su SAMBA
```
```sh
 nfsiostat
 # mostra informazioni su NFS
```
```sh
 sar
 # raccoglie e mostra dati sull'attività del sistema
```
Vediamo alcuni esempi applicativi:

```sh
 sar -V
 # mostra la versione del programma
```
```sh
 sar
 # mostra info sulla CPU
```
```sh
 sar -q
 # mostra info sul carico medio
```
```sh
 sar -q 1 3
 # mostra info sul carico medio 3 volte con un
 # intervallo da 1 secondo
```
```sh
 sar -q -f /var/log/sa/sa15
 # mostra informazioni sul carico
 # medio del giorno 15 del mese su distro RH-based
```
```sh
 sar -q -f /var/log/sysstat/sa15
 # mostra informazioni sul
 # carico medio del giorno 15 del mese su distro Debian-based
```
```sh
 sar -w
 # processi creati al secondo e context switch al secondo
```
```sh
 sar -n DEV
 # statistiche sull'interfaccia di rete specificata
 # tipo "eth0"
```
```sh
 sar -b
 # dati sulle attività di I/O generale
```
```sh
 sar -q -s 10:00:00 -e 11:00:00
 # mostra informazioni di carico
 # medio dalle 10 alle 11 del giorno corrente "-s" (start time) "
 # -e" (end time)
```
```sh
 sar -w -s 14:00:00 -e 20:00:00 -f /var/log/sa/sa11
 # mostra
 # informazioni sui processi e i context switch tra le 14 e le 20
 # dal giorno 11 del mese su distro RH-based, basta cambiare la
 # locazione del file per le distro Debian-based
```

## Monitoring Grafico con CollectD

Per mostrare informazioni grafiche di monitoring, dobbiamo
installare collectd. Possiamo installarlo attraverso:

```sh
 sudo apt-get install collectd
```
La configurazione varia molto a differenza della distro, bisogna
guardare la documentazione.Compilare programmi

Possiamo compilare programmi, innanzitutto scaricando i sorgenti,
questo è possibile attraverso:

```sh
 sudo apt-get source nomePGM
 # scarica il codice sorgente del
 # programma nomePGM
```
una volta scaricato il source-code possiamo trovarlo in "
/usr/src/nomePGMeVersione", quindi ci sposteremo nella directory
interessata per potere procedere con la compilazione

