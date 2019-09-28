

Vediamo qui alcune configurazioni del web server più famoso, cioè
"Apache", una volta installato con:

```sh
 apt install apache2
```
oppure

```sh
 yum install httpd
```
dobbiamo abilitare il servizio di apache attraverso ad esempio:

```sh
 systemctl start apache2
```
una volta abilitato, possiamo leggere i log all'interno di "
/var/log/apache2/":

```sh
 tail -f /var/log/apache2/*
 # leggo i log in runtime
```
la directory di default varia da distro a distro, comunque
solitamente è in "/var/www" oppure in "/srv/www/htdocs", ma
potrebbe essere anche in altre directory. Il file di
configurazione di apache2 è in "/etc/apache2", anche in questo
caso varia da distro a distro ma è o "apache2.conf" o "httpd.conf"
 Vediamo ora alcune configurazioni comuni.

Siccome configurazioni diverse possono essere in file diversi è
bene eseguire dei "grep -nir configurazioneCercata" per cercare
le configurazioni.


## Configurazione centralizzata vs Configurazione decentralizzata

Apache mantiene i file di configurazione nella directory /etc/,
ad ogni modo è possibile avere dei file di configurazione per
directory, chiamati ".htaccess", l'utilizzo di questi file è
consigliato solo se non si hanno i permessi di accesso all'intero
server, in quanto implica degli slow down significativi alla
navigazione, questi file potrebbero ad esempio essere utilizzati
da servizi di hosting quando ci viene fornita solo una directory
all'interno di un server. Quindi nel momento in cui abbiamo
accesso completo al server le impostazioni che dovremmo mettere
nel file .htaccess le andiamo a mettere nelle varie sezioni `<Directory>`
dei file di ocnfigurazione principali. Ad ogni modo
l'utilizzo dei file ".htaccess" deve essere permesso comunque
dalla configurazione principale di Apache (i.e., quella nei file
/etc/), l'opzione che disabilita questa impostazione è:

```sh
 AllowOverride None
 # disabilito l'utilizzo dei file .htaccess
 # all'interno della directory a cui fa parte questa
 # configurazione
```
per abilitare l'utilizzo dei file ".htaccess" invece dobbiamo
avere:

```sh
 AllowOverride All
 # abilito l'utilizzo dei file .htaccess
 # all'interno della directory a cui fa parte questa
 # configurazione
```


## Directory Listing

Basta aggiungere nel file di configurazione di apache in una
delle `<Directory>` e facciamo:

```apache
<Directory "/var/www/html">

# Show directory listing, and allow symbolic links
Options Indexes FollowSymLinks

# With the following option we impose that configuration cannot be overriden with .htaccess files.
AllowOverride None

# With the following options we controls who can get stuff from this server
Order allow,deny
Allow from all
</Directory>
```


## Mod Rewrite


## Redirection di qualsiasi richiesta all'interno di una directory

Possiamo all'interno di una configurazione `<Directory>`
includere il modulo "mod_rewrite.c" e gestire redirections, ad
esempio:

```apache
<IfModule mod_rewrite.c>
	RewriteEngine on
	RewriteRule (.*) webroot/ [L]
</IfModule>
```

in questo caso `(.*)` significa qualsiasi stringa

in questo caso ad ogni richiesta redirigo alla directory
webroot/, il flag "[L]" serve ad indicare che questa è una
richiesta "last", cioè eseguita questa le eventuali prossime
richieste non devono essere eseguite, questa è equivalente ad un "
break;" in altri linguaggi di programmazione, per le rewrite
rule, il primo parametro è un regular expression e la seconda è
un indirizzo a cui redirigere, il terzo campo è composto dagli
eventuali flag.


## Se un file richiesto non esiste eseguire un determinato script

In questo caso si utilizzano le condizioni "RewriteCond", la
meccanica è questa, se tutte le rewrite condition sono vere
(bisogna considerarle in AND logico) allora viene eseguita
l'istruzione successiva "RewriteRule". In pratica quello che
avviene è, se la risorsa richiesta non è un file e non è una
directory (cioè se non esiste) allora si esegue la rewrite rule,
in questo caso si esegue lo script chiamato "script.php".

```apache
<IfModule mod_rewrite.c>
	RewriteEngine on
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule ^(.*)$ script.php [PT,L]
</IfModule>
```


## Porta del Server

Possiamo cercare la porta su cui è in ascolto apache eseguendo
nella directory in cui sono contenuti i file di configurazione di
apache:

```sh
 grep -nir listen
```
Possiamo mettere apache in ascolto su un'altra porta attraverso:
l'opzione `Listen` che ci permette di bindare Apache ad un indirizzo IP
e poera specifica. Possiamo ad esempio mettere in ascolto apache
sulla porta 8000 con il seguente pezzo di configurazione:

```conf
Listen 8000
```


## Virtual Hosts

Per impostare virtual host localmente (ad esempio per testare
diverse web applications in locale), allora innanzitutto dobbiamo
assegnare a "localhost" (i.e., 127.0.0.1) i vari nomi dei domini,
quindi nel file "/etc/hosts" andremo a scrivere:

127.0.0.1 myfirstwebapp

127.0.0.1 mysecondwebapp

127.0.0.1 mythirdwebapp

una volta scritti questi, nella configurazione di apache
principale, quella dove sono segnati i "localhost", ad esempio su
debian in "/etc/apache2/sites-enabled/000-default.conf" e qui
dovremo avere una configurazione del tipo:

```apache
<VirtualHost *:80>
	# Con ServerName impostiamo il nome del dominio
	ServerName myfirstwebapp

	# Con DocumentRoot impostiamo la directory in cui è contenuta la web app
	DocumentRoot /var/www/html/myfirst
</VirtualHost>

<VirtualHost *:80>
	ServerName mysecondwebapp
	DocumentRoot /var/www/html/mysecond
</VirtualHost>

<VirtualHost *:80>
	ServerName mythirdwebapp
	DocumentRoot /var/www/html/mythirdandlast
</VirtualHost>
```

la configurazione è identica per siti web hostati sullo stesso
webserver, ricordiamo che i virtual host sono supportati dalla
versione 1.1 dell'HTTP.

## Debugging di Apache

E' possibile effettuare benchmark e debugging attraverso il
programma `ab`.
E' possibile effettuare debugging in modo piu' avanzato utilizzando
il programma `siege`.



