# Permessi 2

Access Control Lists (ACLs) are a way to assign fine tuned
permissions in Linux apart from using the chmod command. When the
chmod command is used only one owner and one group can be
assigned permissions on a file or directory. If multiple users
need access to a resource we need to place them in a group and
then give that group the necessary permissions. But with File
ACLs in Linux we can assign fine grained permissions to each user
and group on a file and even deny access to a particular user
even if the file has world permissions. This tutorial on Linux
File ACL will explain the usage of the commands getfacl and
setfacl.

If you get a command not found error for getfacl and setfacl it
means the acl package is not installed, so use yum or apt-get
according to your operating system to install the package:

```sh
 sudo apt-get install acl
```
```sh
 sudo yum install acl
```

Solitamente ci accorgiamo che su un file sono impostati dei
permessi ACL attraverso il simbolo + davanti alla stringa dei
permessi quando eseguiamo ad esempio "ls -Al", se ad esempio
notiamo una stringa del tipo "drw-r--r--+" questo significa che
quel file è affetto da permessi ACL.

Per ricavare i permessi ACL di un file/directory eseguiamo:

```sh
 getfacl nomeFileODirectory
 # mostra i permessi sul file
 # includendo anche quelli ACL
```
Per impostare dei permessi ACL eseguiamo:

```sh
 setfacl -m -u:nomeUtente:rwx nomeFile
 # imposta i diritti per  l'utente chiamato nomeUtente abilitando
 # lettura, scrittura ed esecuzione sul file menzionato
```
```sh
 setfacl -R -m u:username:rwx /path/to/directory
 # imposta i diritti per l'utente chiamato username su una directory,
 # infatti il flag "-R" è utilizzato per applicare ricorsivamente
 # i permessi sulle directory
```
```sh
 setfacl -m g:groupname:r-x /path/to/filename
 # imposta i diritti per il gruppo chiamato groupname abilitando
 # lettura ed esecuzione sul file menzionato
```
```sh
 setfacl -m:user1:- /path/to/file
 # nega tutti i permessi (lettura, scrittura ed esecuzione) per l'utente
 # chiamato user1 sul file menzionato
```
```sh
 setfacl -x u:username /path/to/file
 # elimina la entry ACL relativa all'utente menzionato
```
```sh
 setfacl -b nomeFile
 # elimina tutti i permessi ACL applicati al file menzionato
```

Su alcuni filesystem potrebbe non essere possibile effettuare il
comando setfacl, questo è dovuto al fatto che deve essere
attivata un'opzione sul filesystem su cui vogliamo applicare i
permessi ACL.

```sh
 getfacl -R /some/path > permissions.txt setfacl --restore=permissions.txt
 # questo e' utile per salvare i permessi di un file
 # e poi ripristinarli in un secondo momento
```

Consultare le man page di getfacl e setfacl per ulteriori
informazioni molto ben dettagliate.


## Sulla mia partizione è possibile usare il sistema di permessi ACL ?

Possiamo vedere se l'opzione per i permessi ACL è impostata o
meno sul filesystem prima eseguiamo:

```sh
 mount | column -t
 # visualizza i filesystem correntemente
 # montati con le relative opzioni, attenzione alcune opzioni
 # potrebbero essere attive anche se non mostrate col comando
 # mount, queste sono chiamate "opzioni di default"
```
se l'opzione "acl" non è visualizzata allora controlliamo le
opzioni implicite di default, per poterle visualizzare eseguiamo:

```sh
 tune2fs -l /dev/sdaX
 # in questo output cerchiamo una voce che
 # dice "Default mount options" o qualcosa di simile
```
Nel caso in qui anche con questo comando manca la stringa "acl"
tra le opzioni di mount di default, allora dobbiamo impostarli
usando il file "/etc/fstab" e andando ad aggiungere l'opzione "
acl" al filesystem interessato, ad esempio:

```
/dev/sda2	/	ext4    acl,errors=remount-ro	0	1
```

