
We'll use postfix as MTA, but there is even exim;

```sh
 sudo apt-get install postfix
```
then we run

```sh
 service postfix start
 # to start the service, or systemctl start postfix
```

The path where mail for individual users are stored is "/var/mail",
l'utente root invece è diverso dagli altri utenti, in quanto
lui può ricevere mail dal kernel, o dal sistema operativo per
diversi avvisi. Vediamo alcuni esempi:

```sh
 mail -s "Questo è l'oggetto" indirizzo@mail
 # mandiamo una
 # mail, all'indirizzo mail indicato, al posto dell'indirizzo
 # avremmo potuto mettere anche il nome di qualche utente del
 # sistema, una volta premuto invio, possiamo scrivere la mail, e
 # terminare l'inserimento del corpo con "Ctrl+D"
```
E' utile fare script ad esempio che mandano mail in automatico,
ad esempio per scrivere direttamente mail con un file di corpo
predefinito chiamato "body.txt", possiamo effettuare, all'interno
dello script l'istruzione:

```sh
 mail -s "Lo script è completato" < /root/bin/body.txt root
```

Per leggere le mail possiamo effettuare:

```sh
 mail -u
 # questo comando visualizzerà la lista delle mail, e
 # aspetterà un input, ci basterà inserire l'id della mail
 # interessata per leggerla, e schiacciare poi:
```

* "r" per rispondere alla mail, e "Ctrl+D" per mandare la
    risposta una volta finito l'inserimento
* "d" per cancellare la mail
* "q" per uscire dal programma

oppure per leggere la mail queue, cioè la coda di email (è dove
le mail vengono salvate nel caso non riuscissero ad arrivare al
server di destinazione, per motivi di diversa natura)


## Inoltro delle mail

Un altro file importante, è "/etc/aliases", questo file gestisce
gli alias degli utenti, ad esempio nel caso volessi che sia i
messaggi che arrivano a giuseppe arrivino anche a root, allora
inserisco una riga con scritto:

```sh
 giuseppe: root
 # aggiunge un alias, potrebbe essere utile, nel
 # caso bloccassimo degli utenti, o non ci dovessero essere più,
 # ma abbiamo comunque bisogno di ricevere la mail al posto
 # dell'utente giuseppe
```
possiamo ora lanciare "newaliases" per aggiornare gli alias degli
utenti

Un'altra tecnica utilizzabile per l'inoltro delle mail è quella
di creare un file chiamato ".forward" nella home directory di un
utente, in questo file ci basta scrivere il nome utente a cui
inoltrare le mail.


