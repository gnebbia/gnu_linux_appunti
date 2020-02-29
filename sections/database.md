
Esistono diverse applicazioni utilizzabili su GNU/Linux per
funzionare da server per database, ma una scelta comune
open-source è "MySQL", quindi nelle prossime sezioni tratteremo
MySQL, ad ogni modo altri server per database famosi sono "Microsoft Database Server",
"Oracle Database Server", "Postgres".


## MySQL

## Installazione su Red-Hat Based Distro

Per installare mySQL su distribuzioni basate su Red-Hat,
effettuiamo

```sh
 yum search mysql
 # cerca pacchetti riguardanti mySQL nei
 # repository
```
I pacchetti che ci interessano da questa ricerca sono:

```sh
 mysql-server
 # i pacchetti che faranno da server
```
```sh
 mysql
 # i pacchetti che permetteranno di interfacciarci al
 # server
```
quindi effettueremo un:

```sh
 yum install mysql-server mysql
 # installa i pacchetti
 # mysql-server e mysql
```

Una volta installato, possiamo verificarne la corretta
installazione, effettuando un controllo sul demone mysqld

```sh
 service mysqld status
 # verifica lo stato del processo demone
 # (servizio) mysqld, ci aspettiamo qualcosa che ci dica che il
 # servizio non è attivo ma in stato di "Stop"
```
a questo punto, iniziamo il demone attraverso il comando:

```sh
 service mysqld start
 # inizia il processo mysqld
```
per inserire la password dell'utente root lanciamo:

```sh
 mysqladmin -u root password exampleOfPassword
 # crea una
 # password per l'utente di root, la password è composta dalla
 # stringa "exampleOfPassword"
```
Ora l'ambiente mysql è pronto.

## Installazione su Debian Based Distro


Per installare mySQL su distribuzioni basate su Debian,
effettuiamo

```sh
 apt-cache search mysql | mysql
 # cerca pacchetti riguardanti
 # mySQL nei repository
```
I pacchetti che ci interessano da questa ricerca sono:

```sh
 mysql-server
 # i pacchetti che faranno da server
```
```sh
 mysql-client
 # i pacchetti che permetteranno di interfacciarci
 # al server
```
quindi effettueremo un:

```sh
 apt-get install mysql-server mysql-client
 # installa i
 # pacchetti mysql-server e mysql-client
```
In questo caso, comparirà una procedura guidata per impostare la
password di root, e non dovremo inserirla manualmente.

Ora possiamo verificare la corretta installazione di MySQL
attraverso il comando:

```sh
 /etc/init.d/mysql status
 # verifica lo stato del processo
 # demone associato a mysql
```
oppure in alternativa possiamo lanciare:

```sh
 service mysql status
 # verifica lo stato del processo demone
 # associato a mysql
```
Ora l'ambiente mysql è pronto.


## Gestione di database con MySQL

Per entrare in mysql, eseguiamo:

```sh
 mysql -u root -p
 # esegue l'accesso con l'utente "-u" root,
 # richiedendo la password "-p", il flag "-p" è richiesto ogni
 # qualvolta un utente è munito di password, nel caso in cui non
 # venisse messo, allora il login non viene effettuato
```
Una volta effettuato il login, vedremo a schemo il prompt di
mysql, da questo prompt possiamo effettuare diverse operazioni
come ad esempio creare database, creare tabelle o in genere
effettuare query. Vediamo alcuni esempi di comandi:

```sql
 show databases;
 -- mostra i database presenti, di default
 -- potremmo vedere due o tre database d'esempio
```
```sql
 create database dbName;
 -- crea un database con nome "dbName", è
 -- da notare che il simbolo ";" è utilizzato per terminare le
 -- istruzioni, un semplice invio permette invece di continuare un
 -- comando, nota che se il nome dovesse contenere caratteri
 -- particolari come ad esempio "-" (dash) o doppi apici o
 -- parentesi, dobbiamo rinchiudere il nome del database tra apici
 -- retroversi "`".
```
```sql
 drop database dbName;
 -- elimina il database con nome "dbName"
```
```sql
 SHOW GLOBAL VARIABLES LIKE 'PORT';
 -- mostra su quale porta sta girando mysql
```
```sql
 SHOW GLOBAL VARIABLES;
 -- mostra tutte le variabili globali
```

N.B.: Nota che in SQL, per indicare nomi con caratteri speciali,
dobbiamo racchiudere il nome tra apici retroversi \`\`.

## Gestione Utenti in MySQL


```sql
 CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
 -- crea un utente chiamata "newuser" con la password specificato
```
```sql
 GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
 -- fornire permessi all'utente altrimenti non può fare nulla
```
Nel caso questo dovesse dare errore 1133, possiamo aggiungere:
```sql
 GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost' IDENTIFIED BY 'password';
 -- fornire permessi all'utente altrimenti non può fare nulla
```
```sql
 FLUSH PRIVILEGES;
 -- aggiorna i privilegi
```
```sql
 SET PASSWORD FOR 'root'@'localhost' = PASSWORD('MyNewPass');

 -- reimposta la password per l'account di root sul server locale
 -- "localhost"
```

## Creazione di tabelle e gestione delle tabelle

Una volta creato un database, per poterci lavorare dovremo prima
indicare l'intenzione di utilizzare il database attraverso:

```sql
 use dbName;
 -- seleziono il database con nome "dbName"
```
Vediamo alcuni comandi per gestire le tabelle:

```sql
 show tables;
 -- mostra le tabelle presenti all'interno del
 -- database
```
```sql
 show columns from `nome Tabella`;
 -- mostra le colonne della
 -- tabella col tipo di dato, è anche utile per capire qual'è la
 -- chiave primaria e che opzioni sono applicate sui campi
```
```sql
 CREATE TABLE nomeTab (id int(5) PRIMARY KEY, name varchar(255),
 email varchar(255), description text);
 -- crea una tabella
 -- chiamata "nomeTab", con tre attributi, uno di tipo intero con
 -- massimo 5 cifre che sarà anche la chiave primaria, e gli altri
 -- due di tipo stringa con un numero massimo di caratteri ammessi
 -- di 255
```
```sql
 CREATE TABLE users ( user_id int NOT NULL auto_increment,
 username varchar(20) NOT NULL, password char(40) NOT NULL, mail
 varchar(255), PRIMARY KEY (user_id), UNIQUE KEY username
  (username) );
 -- crea una tabella con alcuni attributi NOT NULL,
 -- e il primo attributo "user_id" con l'auto increment attivato
```
```sql
 DESCRIBE nomeTab;
 -- mostra la struttura della tabella chiamata
 -- nomeTab, con i propri attributi, il tipo e le chiavi
```
```sql
 ALTER TABLE users CHANGE COLUMN id id INT(11) PRIMARY KEY AUTO_INCREMENT;
 -- cambia una colonna chiamata "id" nella
 -- tabella "users" e la rinomina ancora "id", la imposta come
 -- chiave primaria
```
```sql
 ALTER TABLE websites CHANGE COLUMN hash hash varchar(64) NULL;
 -- sulla tabella websites importa l'attributo hash in modo che
 -- possa essere null
```
```sql
 ALTER TABLE websites CHANGE COLUMN hash hash varchar(64) NOT NULL;
 -- sulla tabella websites importa l'attributo hash in modo
 -- che non possa essere null
```
```sql
 ALTER TABLE users CHANGE COLUMN id user_id INT(11) PRIMARY KEY AUTO_INCREMENT;
 -- cambia una colonna chiamata "id" nella
 -- tabella "users" e la rinomina col nome attributo "user_id", la
 -- imposta come chiave primaria
```
```sql
 INSERT INTO nomeTab (id, name, values) VALUES (1, 'anthony', 'anthony@me.com');
 -- inserisce nella tabella chiamata nomeTab
 -- una tupla nell'ordine specificato (id, name, values) coi valori
 -- (1, "anthony"m "anthony@me.com")
```
```sql
 INSERT INTO users (name, mail) VALUES ('giuseppe', 'giuseppe@casa.it');
 -- nel caso avessimo un campo "id" con
 -- autoincremento, basta solo non citarlo all'interno della insert
 -- into, e per magia l'autoincremento verrà gestito da mysql
```
```sql
 select * from nomeTab;
 -- mostra tutte le tuple della tabella
 -- chiamata "nomeTab"
```
```sql
 select name from nomeTab;
 -- mostra solo il campo "name" di
 -- tutte le tuple della tabella chiamata "nomeTab"
```
```sql
 select * from nomeTab where name="anthony";
 -- mostra tutte le
 -- tuple della tabella con nome "nomeTab" che hanno come attributo
 -- "name" esattamente il valore "anthony"
```
```sql
 UPDATE nomeTab SET id=3;
 -- cambia il campo "id" di tutte le
 -- tuple della tabella "nomeTab" al valore "3"
```
```sql
 UPDATE nomeTab SET id=1 where name="anthony";
 -- cambia il campo
 -- "id" solo delle tuple il cui nome è esattamente "anthony"
```
```sql
 DELETE from nomeTab where id=3;
 -- elimina la tupla con valore
 -- id=3 dalla tabella "nomeTab"
```
```sql
 desc nomeTabella;
 -- mostra uno schema che ci dice come è fatta
 -- una tabella, MOOLTO UTILE!
```
```sql
 select * from nomeTab where id=1 or id=2;
 -- mostra tutte le
 -- tuple con id=1 o id=2
```
```sql
select * FROM users  where name LIKE '%m%'
 -- mostra tutti gli utenti che hanno nel loro username
 -- la lettera `m`
 -- questa query e' molto utile nel caso di match parziali con
 -- stringhe
```
```sql
 select * from nomeTab order by id asc;
 -- mostra tutte le tuple
 -- ordinate in ordine crescente in funzione del campo "id"
```
```sql
 select * from nomeTab order by id desc;
 -- mostra tutte le tuple
 -- ordinate in ordine decrescente in funzione del campo "id"
```
```sql
 select nomeTab.email, nomeTab.name as customers_name,
 nomeTab2.name from nomeTab, nomeTab2 where
 nomeTab.id=nomeTab2.id;
 -- mostra una tabella sia con campi
 -- della tabella chiamata "nomeTab" che della tabella chiamata "
 -- nomeTab2", la keyword "as" ci permette di visualizzare un
 -- determinato campo con un altro nome a schermo nel momento in
 -- cui la tabella viene visualizzata, in questo caso abbiamo
 -- effettuato un "join"
```
```sql
 ALTER TABLE Persons AUTO_INCREMENT=100;
 -- in questo caso
 -- facciamo in modo che la tabella persons cominci l'auto
 -- incremento dal valore 100
```
Vediamo ora come inserire una chiave esterna, se abbiamo ad
esempio una tabella negozio, e poi una tabella prodotti, ed in
prodotti, vogliamo avere un riferimento al negozio, allora
innanzitutto creiamo una nuova voce nella tabella prodotti
chiamata "id_negozio", con:

```sql
 ALTER TABLE prodotti ADD COLUMN id_negozio int not null;
```
e ora possiamo includere la chiave esterna con:

```sql
 ALTER TABLE prodotti ADD FOREIGN KEY fk_id_negozio(id_negozio)
 REFERENCES negozi(id_negozio) ON DELETE CASCADE ON UPDATE
 CASCADE;
```
oppure se esiste già la colonna su cui andare a referenziarci
possiamo usare:

```sql
 CREATE TABLE Orders ( O_Id int NOT NULL, OrderNo int NOT NULL, P_Id int, PRIMARY KEY (O_Id), FOREIGN KEY (P_Id) REFERENCES Persons(P_Id) );
```

Possiamo anche leggere file di sistema con mysql (se abbiamo i permessi
necessari) con:
```sh
select load_file("/etc/file_to_read.txt");
```


## Backup Database

```sh
 mysqldump -u nomeUtente -p --databases nomeDb1 nomeDb2 > dump.sql
 # crea un file con il backup del database
```

```sh
 mysql -u nomeUtente -p -h localhost nomeNuovoDB < dump.sql
 # questo serve ad importare i DB all'interno di uno scritto
```
```sh
 mysql -u nomeUtente -p -h localhost nomeNuovoDB < dump.sql
 # if you do not know the database name or database name is included
 # in sql dump you can try out something as follows
```
```sh
 mysql -u nomeUtente -p -h 27.12.4.121 nomeNuovoDB < dump.sql
 # importa su un database remoto uno script dump
```
oppure exportato un file da ad esempio phpmyadmin, possiamo
importarlo con:

```sh
 mysql -u username -p database_name < file.sql
 # il database deve essere già esistente
```


## PostgreSQL

PostgreSQL è un progetto open-source, guidato dalla community,
che segue il modello ad oggetti e relazionale.

```sh
 sudo apt-get install postgresql postgresql-client
 # installa
 # sia il server che il client di postgresql
```
una volta installato dobbiamo eseguire il login come utente root,
per poter collegarci alla sua shell, quindi:

```sh
 su
 # switcha all'utente di root
```
```sh
 su - postgres
 # switcha all'utente postgres, volendo potrei
 # anche impostare una password per questo utente
```
ora dalla shell adesso possiamo creare un nuovo utente con il
comando:

```sql
 createuser --interactive
 -- il programma createuser fa parte del
 -- pacchetto postgresql-client Trucchetto: If you create a
 -- PostgreSQL user with the same name as your Linux username, it
 -- allows you to access the PostgreSQL database shell without
 -- having to specify a user to login (which makes it quite
 -- convenient).
```
```sql
 createdb dbNameIWant
 -- creo il database con il nome che
 -- preferisco
```
adesso possiamo avviare il client psql con l'utente corrente

```sh
 psql -d NomeDBACuiConnettermi
 # questo avvia la shell di
 # PostgreSQL, se non specifichiamo un database, psql proverà a
 # collegarsi ad un database che ha lo stesso nome utente
 # dell'utente che ha lanciato il comando
```
ora la shell "psql" oltre a supportare i classici comandi SQL
come ad esempio "DROP DATABASE nomeDb;" (e altri, ricordare
sempre il punto e virgola ";" per i comandi SQL) supporta anche
dei comandi "shortcut" questi comandi chiamati nel gergo "
metacomandi" hanno la caratteristica di iniziare col carattere "\"
, vediamo qualche esempio:

```sh
 \help
 # mostra l'elenco di tutti i comandi disponibili
```
```sh
 \c <database>
 # si collega al database menzionato
```
```sh
 \du
 # elenca tutti gli utenti con relativo livello di permessi
```
```sh
 \dt
 # show summary information about all tables in the current
 # database
```
```sh
 \q
 # esce dalla console psql, per questo può anche essere
 # utilizzato il la combinazione di tasti CTRL+d
```
```sh
 \l
 # elenca i database esistenti
```
```sh
 \?
 # mostra la lista di meta comandi
```
N.B.: il prompt del comando "psql" mostra sempre il nome del
database a cui siamo attualmente connessi.

N.B.: Non dobbiamo cambiare la password dell'account postgres col
comando "passwd" in quanto in questo caso l'acount diventa
loggabile e noi non vogliamo fare in modo di poter effettuare il
login. Quindi eseguo:

```sh
 sudo -u postgres psql postgres
 # con sudo -u eseguo un comando
 # (in questo caso "psql postgres") col nomeutente specificato
 # come parametro
```
poi una volta all'interno di psql eseguiamo:

```sh
 \password postgres
 # questo ci permetterà di impostare la nuova
 # password
```
un errore comune è quello di avere "Failed to connect to the
database: FATAL: role "giuseppe" does not exist", in questo caso
dobbiamo creare il ruolo mancante, possiamo farlo ad esempio,
andando ad eseguire:

```sh
 sudo -u postgres psql
 # eseguo la shell di postgresql
 # utilizzando l'utente adibito "postgres"
```
```sql
 CREATE ROLE giuseppe superuser;
```
```sql
 CREATE USER giuseppe;
```
```sql
 ALTER ROLE giuseppe WITH LOGIN;
 -- and then enable login that
 -- user, so you can run e.g.: psql template1, from normal $
 -- terminal
```
possiamo loggare in psql con:

```sh
 psql -d databaseName -U user -W
 # con il flag "-d" indichiamo
 # il nome del database, col flag "-U" indico il nome utente, col
 # flag "-W" indico di effettuare un prompt per la password
```
```sh
 psql -d databaseName -U usernameIWant -W -h localhost
 # questa
 # è l'alternativa nel caso in cui ci da l'errore Fatal Error:
 # Peer Authentication Failed, possiamo evitare di specificare
 # ogni volta il localhost andando a impostare una variabile
 # d'ambiente chiamata PGHOST e impostandola a "localhost"
```
possiamo creare un database con "proprietario" (owner) un account
specifico, attraverso:

```sql
 CREATE DATABASE dbNameIWant OWNER existingUserIPrefer;
```
Per rimuovere un utente invece dall'account abilitato per psql
eseguiamo:

```sql
 dropuser nomeUtenteDaRimuovere
```

### Exploring a Postgresql Database

Una volta connessi ad un database postgresql ad esempio col comando:
```sh
psql -U username -p 5432 -W
 # il flag -U e' per lo username
 # il flag -p e' per la porta, in questo caso 5432
 # il flag -W e' per usare una password per fare login
```
Possiamo esplorare i vari database presenti con i seguenti comandi:
```sh
 \list # mostra la lista dei database presenti
 \c [DATABASE] # si connette al database menzionato
 \d # elenca le tabelle presenti nel database corrente
```

Possiamo anche leggere un file di sistema con postgresql attraverso la seguente
sequenza di comandi:
```sh
 CREATE TABLE demo(t text);
 COPY demo from '[FILENAME]';
 SELECT * FROM demo;
```


## MongoDB

MongoDB è un database NoSQL orientato ai documenti, che offre alte prestazioni,
alta disponibilità e facile scalabilità.
Come con mysql e pgsql, un singolo server mongodb ha in genere più database.

MongoDB works on the concepts of collections and documents.
MongoDB si basa sui concetti di **collection** e **document**.

Possiamo pensare alle collection come serie di documenti, proprio come le directory e
i file.
In particolare:
* Una **collection** è un gruppo di documenti MongoDB e può essere pensata come una
  equivalente di una tabella RDBMS. Una collezione esiste all'interno di un singolo database,
  si noti che, a differenza dei database SQL, le raccolte non impongono uno
  schema, quindi questo consente una significativa flessibilita'; comunque tipicamente tutti
  i documenti in una raccolta hanno uno scopo comune o sono correlati in qualche modo
* Un **documento** è un insieme di coppie valore-chiave. Un documento può essere
  pensato simile ad una riga nei database relazionali



Di default in MongoDB non si ha il concetto di chiavi primaria, quindi ogni documento
che ottiene creato verrà automaticamente assegnato un campo unico chiamato `_id` che
è un 12 numero esadecimale di byte che in realtà assicura l'unicità di ogni documento.
I 12 bytes di `_id` sono composti in questo modo:
* 4 byte per il timestamp corrente
* 3 byte per il machine id
* 2 byte per il process id del server MongoDB
* 3 byte rappresentano un valore incrementale

In MongoDB non c'e' nessun concetto di "relazione" tra diverse collection, le
relazioni tra informazioni sono incorporate all'interno dei subdocument, cioe'
ogni documento puo' incorporare quanti subdocument vogliamo.

I vantaggi di MongoDB rispetto ad altri database relazionali (RDBMS) sono:
* Schema-less, una singola collection puo' contenere documenti con schemi differenti,
  questo non e' possibile in un database relazionale in genere
* Non ci sono operazioni di join complesse
* Alta flessibilita' nel sistema di query ocn un linguaggio simile ad SQL
* Flessibilita' nelle operazioni di tuning
* Scalabilita', e' molto piu' semplice scalare un database MongoDB
* Non e' necessario un mapping o una conversione tra application objects e
  database objects
* Permette un accesso velcoe ai dati, caricando in memoria volatile la parte di
  database con cui stiamo lavorando


In genere MongoDB viene utilizzato nei seguenti scenari:
* Big Data
* Content Management and Delivery
* Mobile and Social Infrastructure
* User Data Management
* Data Hub

MongoDB supporta diversi tipi di dato, alcuni di questi sono:
* String, devono essere valide stringhe UTF-8, questo e' il tipo di dat piu'
  comune
* Integer, puo' essere 32 o 64 bit
* Boolean, usato per memorizzare valori booleani
* Double, usato per memorizzare valori floating point
* Min/Max Keys, usato per confrontare valori con il piu' piccolo e il piu'
  grande elemento BSON
* Arrays, used to store arrays or list or multiple values into one key
* Timestamp, ctimestamp, usato per memorizzare timestamp e generalmente
  utilizzato per registrare quando un documento e' stato modificato o aggiunto
* Object, usato per memorizzare embedded documents
* Null, e' usato per memorizzare valori nulli
* Symbol, e' quasi identico al tipo `String` ma viene usato per memorizzare
  stringhe appartenenti a lingue che usano simboli particolari
* Date, questo tipo di dato e' utilizzato per memorizzare date nel formato
  UNIX timestamp
* Object ID, questo tipo di dato e' utilizzato per memorizzare l'ID di un
  documento
* Binary Data, questo e' per memorizzare dati di tipo binario
* Code, questo viene utilizzato per memorizzare pezzi di codice javascript
  all'interno di un documento
* Regular Expression, questo viene utilizzato per memorizzare regex


### Basic Operations in mongodb

Una volta avviato il client di mongodb col comando `mongo` possiamo interagire
col database server per qualsiasi cosa vogliamo. Vediamo di seguito qualche
esempio di base.

Possiamo visualizzare la version di mongodb eseguendo:
```mongo
db.version()
```
Possiamo visualizzare statistiche sui database eseguendo
```mongo
db.stats()
# nota che di default mongodb utilizza un database chiamato "test"
```

Per creare un nuovo database (o switchare su un database nel caso esistesse
gia') possiamo eseguire:
```mongo
use <dbname>
```

Possiamo controllare il database attualmente selezionato eseguendo:
```mongo
db
```

Possiamo elencare la lista di database presenti eseguendo:
```mongo
show dbs
```

Un database create con `use` non comparira' nella lista a meno che non abbiamo
inserito almeno un documento.
Possiamo inserire un documento eseguendo:
```mongo
db.movie.insert({"name":"scarface"})
```

Possiamo eliminare un database eseguendo:
```mongo
db.dropDatabase()
# elimina il corrente database, se non ne abbiamo selezionato esplicitamente uno
# eliminera' il database chiamato `test`
```


### Lavorare con le Collection di MongoDB

Possiamo creare una nuova collezione all'interno del database corrente
eseguendo:
```mongo
db.createCollection(name, options)
# dove `name` e' il nome della collezione mentre `options`
# e' un documento JSON che rappresenta una serie di opzioni a cui deve aderire
# la collezione creata, nota ce options e' opzionale
```
Possiamo visualizzare le correnti collection all'interno di un database
eseguendo:
```sh
show collections
# mostra tutte le collections all'interno del database
```

Vediamo alcune opzioni piu' comunemente utilizzate:
* Capped (boolean): questo dice se la nostra collezione ha un numero massimo di
  documenti, una volta superato verra' sovrascritto il documento piu' vecchio,
  come accade per i log con logrotate in pratica
* autIndexId (boolean): se e' a vero crea automaticamente un indice sul campo
  `_id`
* Size (number): specifica la massima dimensione in byte per una collezione su
  cui e' stato impostato `Capped`. Se `Capped` e' true, allora dobbiamo
  obbligatoriamente utilizzare questa opzione
* Max (number): specifica il massimo numero di documenti in una collezione
  Capped


Vediamo alcuni esempi pratici di creazione di una collection:
```mongo
db.createCollection("mycollection")
```

```mongo
db.createCollection("mycol", {capped : true, autoIndexId: true, size: 6142800, max: 10000})
```

E' da notare che e' possibile anche non specificare esplicitamente l'intento di
creare una collezione, ad esempio MongoDB puo' anche creare collezioni
automaticamente se inseriamo un documento all'interno di una collezione non
esistente. Vediamo un esempio pratico:
```mongo
db.randomMyABCCollection.insert({"name": "Paolo"})
# in questo caso anche se la collection `randomMyABCCollection` non esiste
# verra' creata all'interno del database
```

Vediamo un inserimento di un documento piu' complesso:
```mongo
db.mycol.insert({
    _id: ObjectId(7df78ae9102c),
    title: 'mongodb notes',
    description: 'mongodb is an high performance db'
    tags: ['mongo', 'database', 'nosql'],
    liked: 300
})
```

Possiamo anche inserire piu' documenti contemporaneamente eseguendo:
```mongo
db.mycol.insert([{}, {}, {}, {}, {}])
# in questo caso stiamo inserendo 5 documenti
```

Possiamo eliminare una collection, eseguendo:
```mongo
db.mycollection.drop()
```


### Eseguire Query di ricerca in MongoDB

Possiamo effettuare ricerche in un database MongoDB utilizzando il metodo
`find()` oppure `fineOne()`.
La differenza e' che `find()` elenca tutte le occorrenze, mentre `findOne()`
elenca solo una occorrenza.


La sintassi di base per una ricerca e':
```mongo
db.collectionname.find({})
# mostrera' tutti i documenti appartenenti ad una collezione in modo non
# formattato
```

Possiamo mostrare i documenti in una modalita' formattata, eseguendo:
```mongo
db.collectionname.find({}).pretty()
```

E' da notare che all'interno di queste funzioni di ricerca possiamo specificare
del filtri per restringere la nostra ricerca, poiché la maggior parte delle
volte non vogliamo solo mostrare tutti i documenti in una collezione.

Possiamo quindi fare uso dei **filtri** che ci permettono di dare in pasto un
documento JSON ai metodi di ricerca per restringere le nostre ricerche.
Vediamo qualche esempio.

Vediamo un caso di uguaglianza:
```mongo
db.movies.find({"title":"Scarface"}).pretty()
# cerchiamo tutti i documenti con titolo uguale a "Scarface"
```

Vediamo un caso di non uguaglianza:
```mongo
db.movies.find({"title":{$ne:"Scarface"}}).pretty()
# cerchiamo tutti i documenti con titolo diverso da "Scarface"
```


Vediamo un caso di minore "less than":
```mongo
db.movies.find({"reviews":{$lt:50}}).pretty()
# cerchiamo tutti i documenti che hanno un numero di review minore a 50
```

Vediamo un caso di minore o uguale "less than or equal":
```mongo
db.movies.find({"reviews":{$lte:50}}).pretty()
# cerchiamo tutti i documenti che hanno un numero di review minore o uguale a 50
```

Vediamo un caso di maggiore "greater than":
```mongo
db.movies.find({"reviews":{$gt:50}}).pretty()
# cerchiamo tutti i documenti che hanno un numero di review maggiore a 50
```

Vediamo un caso di maggiore o uguale "greater than or equal":
```mongo
db.movies.find({"reviews":{$gte:50}}).pretty()
# cerchiamo tutti i documenti che hanno un numero di review maggiore o uguale a 50
```

Possiamo anche utilizzare condizioni piu' complesse con operatori logici,
vediamo un esempio di AND:
```mongo
db.movies.find(
    {
        $and: [
            {key1: "value1"}, {key2: "value2"}
            ]
    }
).pretty()
```
Vediamo un altro esempio:
```mongo
db.movies.find({$and:[{"reviews":{$gte:50}},{"reviews":{$lte:{100}}]}).pretty()
# cerchiamo tutti i film che hanno un numero di review maggiore o uguale a 50
# e minore o uguale a 100
```

Nota che al posto di $and possiamo anche usare $or.


Possiamo anche cercare match parziali con stringhe inserendo una regex nel JSON
dato in pasto alle funzioni di ricerca, ad esempio:

```mongo
db.movies.find({"title": /.*m.*/})
# in questo modo cerchiamo tutti i film che hanno nel titolo una `m`
```

oppure in maniera piu' sintetica:
```mongo
db.movies.find({"title": /m/})
# in questo modo cerchiamo tutti i film che hanno nel titolo una `m`
```

Nota che con i metodi di ricerca possiamo anche selezionare solo un subset di
campi attraverso un secondo argomento alla funzione `find()` o `findOne()`.
Vediamo un esempio:

```mongo
db.movies.find({}, {'title':1, _id:0, 'reviews': 0})
# questo mostrera' tutti i documenti della collection "movies" ma soltanto il
# campo 'title'
```

Possiamo anche limitare il numero di record in uscita, attraverso il metodo
limit().
Quindi un esempio potrebbe essere:
```mongo
db.movies.find()limit(20)
# in questo caso mostriamo solo 20 risultati in output
```


### Aggiornare documenti in MongoDB

Possiamo aggiornare un documento in MongoDB attraverso le operazioni di
`update()` o `save()`. La differenza tra questi due metodi e' che:

* update(), aggiorna i valori all'interno del documento presente
* save(), rimpiazza l'intero documento esistente con un altro documento passato
  come argomento

La sintassi di base del metodo update() e':
```mongo
db.collectionname.update(SELECTION_CRITERIA, UPDATED_DATA)
```

Vediamo un esempio pratico:
```mongo
db.movies.update({'title': 'Scface'}, {$set: {'title': 'Scarface'}})
# aggiorniamo il titolo del film, correggendolo solo un'istanza, vedi sotto...
```

ATTENZIONE di default mongoDB aggiornera' un singolo documento, nel caso
volessimo aggiornare tutti i documenti che rispettono i criteri di selezione
dobbiamo specificare un ulteriore parametero, vediamo un esempio:
```mongo
db.movies.update({'title': 'Scface'}, {$set: {'title': 'Scarface'}},{multi:true})
# aggiorniamo il titolo del film, correggendolo in tutti i documenti
```

Possiamo anche eliminare documenti attraverso il metodo `remove()`, e la
sintassi di base e':
```mongo
db.movies.remove(DELETION_CRITERIA)
```
Ad esempio:
```mongo
db.movies.remove({'title': 'Scarface'})
```

### Ordinare documenti in MongoDB

Possiamo ordinare i documenti in MongoDB all'interno di una collezione
attraverso il metodo `sort()`, questo metodo accetta un documento per i
parametri che dovra' contenere la lista di campi su cui effetturare
l'ordinamento e se bisogna eseguire un ordinamento crescente `1` o un
ordinamento decrescente `-1`.

Vediamo un esempio:
```mongo
db.moveis.find().sort({'reviews':1, 'likes':-1})
# qui eseguiamo un ordinamento crescente in funzione del campo `reviews`
# ed un ordinamento descrescente in funzione del campo `likes`
```


