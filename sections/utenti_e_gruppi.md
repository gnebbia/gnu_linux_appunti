
## useradd

```sh
 useradd nomeutente
 # crea un utente
```
```sh
 useradd username -m
 # il flag "-m" mi crea la home directory
 # per l'utente username, dovrebbe essere l'opzione di default
```
```sh
 useradd username -m -G video,wheel,audio
 # il flag "-G" mi
 # setta i gruppi di appartenenza dell'utente username
```
```sh
 useradd username -M
 # crea uno username chiamato username ma
 # non crea la directory home per questo utente
```
```sh
 useradd username -m -k /etc/skelTech
 # crea un utente chiamato
 # username e copia nella home directory il contenuto della
 # directory "skelTech", è da ricordare che di default, se non
 # viene specificato il flag "-k" i file che vengono copiati nella
 # nuova home sono contenuti in "/etc/skel/". Questo flag è molto
 # utile in quanto mi permette di creare dei template di utenti
```
```sh
 useradd -c Antonio -e 2013-12-31 nomeUtente
 # crea un nuovo
 # utente di nome nomeUtente, con full name "Antonio" attraverso
 # il flag "-c" e con data di scadenza impostata al 2013-12-31
 # attraverso il flag "-e"
```
Le impostazioni di default del comando useradd sono contenute
all'interno del file "/etc/default/useradd", questo file contiene
informazioni come, dove salvare la home directory, la directory
scheletro, la data di scadenza eccetera.

## passwd

```sh
 passwd nomeutente
 # cambia o imposta la password
```
```sh
 passwd -l nomeUtente
 # disabilita l'utente nomeUtente
```
```sh
 passwd -u nomeUtente
 # riabilita l'utente nomeUtente eviene
 # reimpostata la password che aveva in precedenza
```
Esistono un paio di file nella directory /etc di interesse:

```sh
 # /etc/passwd
```

* contiene la lista degli utenti, con informazioni relative ad
    essi come l'id dell'utente, l'id del gruppo, se la password è
    "shadowed", la posizione della home directory (che è la
    directory in cui veniamo reindirizzati quando effettuiamo il
    login) e il tipo di shell che utilizzano, questo è il luogo
    perfetto per cercare degli utenti sulla macchina o capire
    quanti utenti esistono. Per rendere un account utente
    inutilizzabile potremo mettere al posto di "/bin/bash" il
    percorso al nologin, che di solito è "/usr/sbin/nologin".

```sh
 # /etc/shadow
```

* il file shadow, contiene le password criptate degli utenti,
    in realtà ogni riga è composta da 9 campi separati dal
    simbolo ":" che contengono:


    1. user name:nome di login dell'utente
    2. password: campo contenente la password sottoposta ad un
      algorithm di hashing dell'utente più altre informazioni,
      infatti questo campo può essere suddiviso in tre sottocampi
      divisi dal carattere "$", il primo campo è l'algoritmo
      usato per l'hashing, infatti le possibili soluzioni per
      questo campo sono:
      (a) $1 = MD5 hashing algorithm
      (b) $2 =Blowfish Algorithm
      (c) $2a=eksblowfish Algorithm
      (d) $5 =SHA-256 Algorithm
      (e) $6 =SHA-512 Algorithm
      il secondo campo è il valore del "salt", mentre il terzo
      campo è l'hash di salt+password
    3. last password change: data in cui è stata modificata la
      password l'ultima volta
    4. minimum validity: il minimo numero di giorni richiesti per
      poter cambiare la password
    5. maximum validity: il massimo numero di giorni per cui la
      password è valida, dopo questo numero di giorni l'utente è
      forzato a cambiare la sua password
    6. warn: numero di giorni prima della scadenza della
      password, durante i quali l'utente viene avvisato della
      necessità di cambiarla
    7. inactive: durata massima di validità dell'utenza dopo che
      la password è scaduta
    8. expire: data di scadenza dell'utenza
    9. reserved: campo riservato per usi futuri

    E' da notare che le date sono espresse in numero di giorni a
    partire dal 1/1/1970, e che per garantire sicurezza il file
    shadow dovrebbe appartenere all'utente root e si abbia
    esclusivamente il permesso di lettura per il proprietario
    (0400).

## Il comando `userdel`

```sh
 userdel nomeUtente
 # cancella l'utente, quindi non potrà più
 # essere effettuato il login a nome suo, ma i suoi file rimangono
 # intatti, quindi la home directory non viene cancellata, è da
 # ricordare che se l'utente è loggato, la cancellazione non può
 # avvenire
```
```sh
 userdel -f nomeUtente
 # cancella l'utente anche se è loggato,
 # alcune distro non permettono questa operazione
```

* per rimuovere correttamente un utente loggato, basta uccidere
    il processo indicato quando si prova a rimuoverlo con userdel
    nomeUtente, una volta ucciso il processo possiamo procedere
    con una rimozione normale

```sh
 userdel -r nomeUtente
 # cancella l'utente e due sue directory,
 # nello specifico, la sua home directory, e il suo spool di mail,
 # eccetera, questo avviene attraverso il flag "-r", è da
 # ricordare che però file al di fuori di queste directory
 # appartenenti a nomeUtente non vengono eliminati, è il comando
 # adatto per rimuovere del tutto un utente da un sistema
```

* quello che viene fatto quando viene avviato questo comando è
    cancellare le voci relastive all'utente nei fil "/etc/passwd"
    e "/etc/shadow"

N.B.:Alcune distro hanno anche i comandi "deluser" e "adduser"
che non sono altro che degli script creati per rendere più
user-friendly e interattive le operazioni di cancellazione e
creazione degli utenti.

## Il comando `chfn`

Questo comando è utile nel momento in cui voglio cambiare le
informazioni aggiuntive sull'utente come nome completo "fullname"
, numero di telefono, interno, ecc...

```sh
 chfn
 # avvia la procedura guidata di sostituzione dati
 # aggiuntivi
```

## Il comando `chsh`

Questo comando è utile per cambiare il tipo di shell dell'utente

```sh
 chsh
 # avvia la procedura guidata per cambiare il tipo di shell
```
  Usermod

```sh
 usermod -G wheel,video nomeUtente
 # imposta i gruppi "wheel" e "
 # video" come gruppi secondari all'utente nomeUtente, ATTENZIONE,
 # quando si vogliono aggiungere utenti secondari è sempre meglio
 # aggiungerli, in append, vedi esempio successivo
```
```sh
 usermod -a -G wheel,video nomeUtente
 # aggiunge i gruppi "wheel"
 # e "video" come gruppi secondari all'utente nomeUtente
```
```sh
 usermod -g nomeGruppo nomeUtente
 # imposta all'utente
 # nomeUtente il gruppo primario nomeGruppo, il gruppo primario è
 # il gruppo attivato appena l'utente effettua il login
```
```sh
 usermod -l nomeUtenteNuovo nomeUtente
 # cambia il nome di login
 # di un utente, è molto utile, in quanto non dobbiamo eliminare e
 # ricreare l'utente in caso di rinomina del nome utente, tutti i
 # file di appartenenza a nomeUtente apparterranno a
 # nomeUtenteNuovo e anche le informazioni nel passwd vengono
 # aggiornate, la home directory rimane la stessa ma può essere
 # cambiata col flag "-d", come nell'esempio successivo
```
```sh
 usermod -d /home/homeAlternativaUtente nomeUtente
 # cambia la
 # directory home dell'utente nomeUtente, è da ricordare che la
 # directory home costituisce anche la directory d'accesso quando
 # viene effettuato il login, questo andrà automaticamente a
 # modificare il file "passwd" con la nuova home
```
```sh
 usermod -L nomeUtente
 # blocca l'account nomeUtente, è
 # un'alternativa a passwd -l nomeUtente, sono analoghi
```
```sh
 usermod -U nomeUtente
 # sblocca l'account nomeUtente, è
 # un'alternativa a passwd -u nomeUtente, sono analoghi
```


## Gpasswd

```sh
 gpasswd -d username nomeGruppo
 # rimuove l'utente chiamato "
 # username" dal gruppo chiamato "nomeGruppo"
```

## Chage

E' un programma molto utile su sistemi con molti utenti, per
gestire le politiche di mantenimento delle password e di validità
degli account, ma ha le stesse potenzialità di programmi già
visti come useradd e usermod, vediamo alcuni esempi applicativi:

```sh
 chage -E date nomeUtente
 # imposta la data in cui scadrà la
 # password dell'utente nomeUtente
```
```sh
 chage -I nroGiorni nomeUtente
 # imposta il numero di giorni di
 # inattività che deve passare prima di bloccare un account
```
```sh
 chage -m nroGiorni nomeUtente
 # imposta il numero minimo di
 # giorni per cui una password non può essere cambiata
```
```sh
 chage -M nroGiorni nomeUtente
 # imposta il numero massimo di
 # giorni per cui una password è valida
```


## Groups

```sh
 groups nomeutente
 # mi fa vedere i gruppi di afferenza di un
 # account
```
Quando si parla di gruppi è molto utile è il file "/etc/groups"
che contiene la lista dei gruppi con le varie proprietà del
gruppo e la lista utenti per ogni gruppo, è analogo al file "
/etc/passwd" usato per gli utenti. Per convenzione si parla di
gruppi o utenti "di sistema" se l'id è minore o uguale a 500,
anche se in alcune distro recenti il numero è diventato 1000,
probabilmente per ragioni dovute al significativo quantitativo di
gruppi o utenti di sistema. Recapitolando utenti o gruppi con id
numerico oltre la costante (500 o 1000 a differenza della distro)
sono considerati utenti o gruppi "normali" viceversa si parla di "
utenza di sistema". E' importante ricordare che quando avvengono
modifiche sui gruppi, ad esempio quando vengono aggiunti gruppi
ad utenti, le modifiche vengono apportate al prossimo login.

## Groupadd

```sh
 groupadd nomeGruppo
 # aggiunge un gruppo chiamato nomegruppo
```
```sh
 groupadd -g id nomeGruppo
 # aggiunge un nuovo gruppo con un
 # numero group id specificato al posto di "id", se non viene
 # inserito il flag "-g", il sistema stabilisce automaticamente il
 # group id del gruppo
```
```sh
 groupadd -f nomeGruppo
 # forza la creazione del gruppo
 # nomeGruppo anche se questo già esiste
```
To add a group called myGroup we just do

```sh
 addgroup myGroup
```


##  Groupmod

```sh
 groupmod -g id nomeGruppo
 # modifica l'id numerico del gruppo
 # nomeGruppo
```
```sh
 groupmod -o -g id nomeGruppo
 # modifica l'id numerico del
 # gruppo nomeGruppo, il flag "-o" permette di impostare l'id di
 # nomeGruppo indipendentemente dal fatto che ci siano altri
 # gruppi con lo stesso id, quindi è possibile avere più gruppi
 # con lo stesso id
```
```sh
 groupmod -n nomeGruppoNuovo nomeGruppo
 # modifica il nome del
 # gruppo nomeGruppo in nomeGruppoNuovo
```

## Groupdel

```sh
 groupdel nomeGruppo
 # elimina il gruppo nomeGruppo
```
## Chgrp

Per cambiare gruppo ad una directory o ad un file possiamo
effettuare:

```sh
 chgrp nomeGruppo nomeFile
 # associa al file nomeFile il gruppo
 # nomeGruppo
```
Per effettuarlo ricorsivamente (nel caso di directory)
aggiungiamo un -R, quindi avremo:

```sh
 chgrp -R nomeGruppo nomeDirectory
 # associa alla directory
 # nomeDirectory il gruppo nomeGruppo
```


## Newgrp

Imposta tutti i file creati dal momento in cui viene lanciato in
poi appartenenti ad uno specifico gruppo, o in altri termini
permette ad un utente di switchare su un altro gruppo, è da
ricordare infatti che un utente ha un gruppo principale e poi una
serie di gruppi secondari, per switchare ad un gruppo secondario
si utilizza quindi questo comando, ad esempio:

```sh
 newgrp myGroup
 # tutti i file che verranno creati dopo l'avvio
 # di questo comando apparterranno al gruppo myGroup
```
```sh
 newgrp - gruppoAppenaAggiunto
 # questo comando è utile quando
 # vengono effettuate modifiche ai gruppi (ad esempio viene
 # aggiunto un gruppo secondario ad un utente) e non si vuole
 # rifare il login per vedere applicate le nuove modifiche
```


