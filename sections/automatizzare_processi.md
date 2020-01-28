
Nei sistemi unix-like due strumenti molto utilizzati per
automatizzare processi sono:

* cron (e anacron per macchine non server)
* AT


## Cron

Cron è uno strumento nato per pianificare processi/operazioni,
devo ricordare che esistono diverse gerarchie di configurazione:

```sh
 System Cron
 # Un sistema di automatizzazione processi a livello
 # di sistema
```

* Il file in cui sono contenute le configurazioni di sistema è "
    /etc/crontab", e una volta modificato e salvato il file, le
    modifche verranno applicate automaticamente, senza nessuna
    necessità di riavviare servizi.

```sh
 User Cron
 # Un sistema di automatizzazione processi a livello
 # utente
```

* Le configurazioni a livello utente invece sono contenute
    nella directory "/var/spool/cron" o "/var/spool/crontab/", la
    collocazione della directory dipende dalla distro, anche se è
    sconsigliato mettere mano direttamente a questi file,
    l'editing deve avvenire tramite comando "crontab -e"

Possiamo modificare la configurazione di un utente attraverso il
comando:

```sh
 crontab -e
 # modifica la configurazione di crontab a livello
 # utente, è valido per l'utente che ha lanciato il comando, una
 # volta modificato, il file sarà salvato all'interno della
 # directory "/var/spool/cron/" o "/var/spool/crontab", mentre i
 # log sono memorizzati in "/var/log/cron" o in "var/log/crontab",
 # anche in questo caso dipende dalla distro utilizzata.
```
Vediamo altri esempi di comandi crontab:

```sh
 crontab -l
 # visualizza il file di crontab
```
```sh
 crontab -r
 # rimuove i file di crontab
```
```sh
 crontab -v
 # mostra l'ultima volta che è stato modificato il
 # file di crontab
```
```sh
 tail -f /var/log/cron
 # mostra in tempo reale il log del cron,
 # è utile sia per effettuare verifiche che per monitorare alcune
 # attività del sistema
```
Analizziamo ora la configurazione di sistema, le prime righe del
file "/etc/crontab" contengono alcune opzioni, come il tipo di
shell utilizzata, dove andare a pescare i programmi eeguibili,
eccetera. Solitamente (in alcune distro) sono contenuti già dei
processi di automatizzazione di default che puntano a determinate
directory, vediamo un esempio di file di configurazione globale:

```conf
01 * * * * root run-parts /etc/cron.hourly

02 4 * * * root run-parts /etc/cron.daily

22 4 * * 0 root run-parts /etc/cron.weekly

42 4 1 * * root run-parts /etc/cron.monthly
```

In pratica tutto quello contenuto in queste directory viene
inteso come processo da automatizzare, questo grazie all'opzione
inserita "run-parts". Recapitolando le directory importanti sono:

```sh
 /etc/crontab
 # file di configurazione globale
```
```sh
 /var/spool/cron || /var/spool/crontab
 # file di configurazione
 # a livello utente
```
```sh
 /var/log/cron || /var/log/crontab
 # file di log relativi al
 # crontab
```
Altri file importanti sono:

```sh
 /etc/cron.deny
 # tutti gli utenti elencati in questo file non
 # possono usare cron, gli utenti sono separati da un invio
```
```sh
 /etc/cron.allow
 # a tutti gli utenti del sistema non è
 # possibile usare cron eccetto a quelli elencati in questo file
```
N.B.: Solo uno dei file elencati sopra deve esistere, altrimenti
le informazioni fornite dai due file sono in conflitto, inoltre è
da ricordare che l'utente di root è esente da queste regole, root
può sempre tutto.


## Come pianificare le operazioni nei file di crontab

La pianificazione di un'operazione è suddivisa su 7 campi:

1. indica i minuti
2. indica le ore
3. indica il giorno del mese
4. indica il mese
5. indica il giorno della settimana
6. indica l'utente con cui eseguire il comando
7. indica il comando da eseguire

Per aiutarci nella configurazione o nell'apprendimento di cron
possiamo utilizzare siti come [crontab.guru](https://crontab.guru/)

Vediamo alcuni esempi (ricorda che il nomeUtente è incluso solo
nel file "/etc/crontab" quindi nella configurazione globale,
mentre per le configurazioni locali basta mettere solo il comando
dopo aver specificato i primi 5 campi):


```sh
 * 2 * * * nomeUtente nomeComando
 # indica di eseguire il
 # comando "nomeComando" alle 2 AM, per tutti i minuti (quindi
 # dalle 2.00 alle 2.59), tutti i giorni del mese, tutti i mesi,
 # tutti i giorni della settimana
```
```sh
 * 2-5 * * * nomeUtente nomeComando2
 # indica di eseguire il
 # comando "nomeComando2" dalle 2AM alle 5AM, per tutti i minuti
 # (quindi dalle 2.00 alle 5.59), tutti i giorni del mese, tutti i
 # mesi, tutti i giorni della settimana
```
```sh
 * 2,5 * * * nomeUtente nomeComando3
 # indica di eseguire il
 # comando "nomeComando3" dalle 2AM alle 3 AM e dalle 5AM alle 6
 # AM, per tutti i minuti, tutti i giorni del mese, tutti i mesi,
 # tutti i giorni della settimana
```
```sh
 * * 1-20 * * nomeUtente nomeComando4
 # indica di eseguire il
 # comando "nomeComando4" per tutti i minuti, tutte le ore, ma
 # solo per i giorni dall'1 al 20 del mese, tutti i mesi, tutti i
 # giorni della settimana
```
```sh
 * * * * 5 nomeUtente nomeComando5
 # indica di eseguire il
 # comando "nomeComando5" per tutti i minuti, tutte le ore, tutti
 # i mesi, solo il venerdì
```
```sh
 * * * * 0 nomeUtente nomeComando5
 # indica di eseguire il
 # comando "nomeComando5" per tutti i minuti, tutte le ore, tutti
 # i mesi, solo la domenica
```
```sh
 */2 * * * * nomeUtente nomeComando6
 # indica di eseguire il
 # comando "nomeComando6" ogni due minuti, col carattere slash
 # indichiamo la frequenza
```
```sh
 3-50/2 * * * * nomeUtente nomeComando7
 # indica di eseguire il
 # comando "nomeComando dal minuto 3 al minuto 50 di ogni ora di
 # ogni giorno ogni 2 minuti
```
```sh
 @reboot macchanger -r wlan0
 # in questo caso questa operazione
 # viene effettuata ad ogni reboot, quindi ogni volta che
 # accendiamo il computer, viene avviata l'applicazione macchanger
 # per fare in modo che il nostro MAC address venga cambiato con
 # uno generato casualmente
```
```sh
 40 * * * * cd /home/user/scripts/ && bash myscript.sh
 # execute
 # a bash script every hour at minute 40
```
nel caso volessimo schedulare più comandi ogni x minuti ma uno
successivo all'altro possiamo usare un trucchetto, questo
trucchetto ci permette di avere una granularità al secondo con
cron:

```conf
*/2 * * * * cd /home/user/scripts && bash first.sh

*/2 * * * * cd /home/user/scripts && sleep 15 bash second.sh

*/2 * * * * cd /home/user/scripts && sleep 30 bash third.sh >
/home/user/logs/log.txt 2>&1

*/2 * * * * cd /home/user/scripts && sleep 45 bash fourth.sh
```

E' utile ricordare che il sistema manda dei messaggi all'utente
in /var/mail/$USER. Possiamo assicurarci che cron si sia avviato
da /var/log/syslog o /var/log/cron, è utile ricordare che
dobbiamo riavviare il servizio di cron ongi qualvolta cambiamo la
configurazione.


## AT

Il programma "at" ci permette di pianificare operazioni che
dovranno avvenire nel futuro, ma a differenza di Cron che
pianifica operazioni periodiche, AT ci permette di pianificare
operazioni che devono essere effettuate una volta sola. Vediamo
subito qualche esempio applicativo:

```sh
 at now + 1 minute
 # esegui le operazioni che ti indicherò dopo
 # l'invio tra un minuto, una volta inseriti i comandi, dobbiamo
 # premere Ctr+D per terminare
```
```sh
 at now + 3 minutes
 # esegui le operazioni che ti indicherò dopo
 # l'invio tra tre minuti, una volta inseriti i comandi, dobbiamo
 # premere Ctr+D per terminare
```
```sh
 atq
 # visualizza le operazioni pianificate col comando at, e
 # quando verranno eseguite
```
```sh
 at now + 5 hours
 # esegui le operazioni che ti indicherò dopo
 # l'invio tra cinque ore, una volta inseriti i comandi, dobbiamo
 # premere Ctr+D per terminare
```
```sh
 at 1430
 # esegui le operazioni che ti indicherò dopo l'invio
 # alle 14.30, una volta inseriti i comandi, dobbiamo premere
 # Ctr+D per terminare
```
```sh
 at teatime
 # esegui le operazioni che ti indicherò dopo l'invio
 # alle 4 PM, una volta inseriti i comandi, dobbiamo premere Ctr+D
 # per terminare
```
```sh
 atrm jobNumber
 # rimuove un'operazione pianificata con "at", il
 # jobNumber possiamo visualizzarlo eseguendo "atq"
```
Vediamo altri esempi possibili autoesplicativi:

```sh
 at now 2:30 PM tomorrow
```
```sh
 at 2:30 PM next month
```
```sh
 at 2:30 PM Fri
```
```sh
 at 9:00 AM
```
```sh
 at midnight
```
```sh
 at noon
```
```sh
 at 2:30 PM 21.10.14
```
```sh
 at 2:30 PM 10/21/2014
```
```sh
 at 4 PM + 2 days
```
```sh
 at now + 3 weeks
```
```sh
 at now + 4 months
```
```sh
 at next monday
```
```sh
 at now + 5 years
```

Alcuni file importanti sono:

* /etc/at.deny
  tutti gli utenti elencati in questo file non
  possono usare at, gli utenti sono separati da un invio
* /etc/at.allow
  a tutti gli utenti del sistema non è possibile
  usare at eccetto a quelli elencati in questo file

N.B.: Solo uno dei file elencati sopra deve esistere, altrimenti
le informazioni fornite dai due file sono in conflitto, inoltre è
da ricordare che l'utente di root è esente da queste regole, root
può sempre tutto.


