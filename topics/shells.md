
Esistono varie shell, la shell di default sui sistemi GNU/Linux è
la Bash,questa è la shell più comune infatti lo scripting fatto
per le altre shell è solitamente compatibile con quello Bash,
comunque le shell più famose sono:

* bash: shell di default su GNU/Linux e altri sistemi operativi
  UNIX based o inspired
* ksh: usata come shell di default su OpenBSD
* csh/tcsh: usata come shell di default su FreeBSD, la tcsh non
  è altro che una csh con feature aggiunte (come
  autocompletamento, ecc...)
* zsh: una shell avanzata che raggruppa molte delle feature di
  tutte le altre, questa è la mia preferita!

ognuna di queste shell ha i propri vantaggi/svantaggi, per poter
visualizzare la lista delle shell disponibili su un sistema
possiamo eseguire:

```sh
 cat /etc/shells
 # visualizza tutte le shell disponibili
```
una volta individuata la shell che vogliamo possiamo eseguire:

```sh
 chsh -s {shell-name} {user-name}
 #  dove l'opzione "-s" indica
 # il percorso della shell
```
vediamo degli esempi pratici:

```sh
 chsh -s /bin/zsh
 # cambia la shell dell'utente che lancia il
 # comando ad una zsh
```
oppure un utente root potrebbe cambiare le shell degli altri
utenti con:

```sh
 chsh -s /bin/zsh utenteacaso
 # cambia la shell dell'utente "
 # utenteacaso" ad una zsh
```
per vedere ad un utente quale shell è impostata possiamo
visualizzare il file "/etc/passwd" alla riga corrispondente al
suo nome.

Per capire con che shell sto lavorando attualmente posso
eseguire:

```sh
 ps | grep $$
 # visualizza il processo corrente, cioè la shell,
 # vedremo bash se la shell è una bash, oppure zsh e così via.
```


