
Debian ha tre maggiori distribuzioni:

* Stable
* Testing
* Unstable (sempre chiamata sid)

Per capire che versione stiamo runnando facciamo:

```sh
 lsb_release -a
```
However some systems might have sources.list files with multiple
entries corresponding to different distributions. This could
happen if the administrator is tracking different packages from
different Debian distributions. This is frequently referred to as
apt-pinning. These systems might run a mixture of distributions.

Gli autori di un pacchetto possiamo trovarli in "/usr/share/doc/PACKAGE/copyright".

Per compilare programmi abbiamo bisogno del pacchetto
build-essential, possiamo anche aver bisogno per alcuni pacchetti
di autoconf o gettext.

Per compilarmi un programma posso eseguire, anche se le
dipendenze in realtà vengono installate e non compilate (da
verificare):

```sh
 apt-get build-dep foo;apt-get source --build foo
```
Le librerie sono installate in appositi package denominati "
package-dev", infatti se mi serve la libreria libx.so molto
probabilmente la troverò nel package "libx-dev".

Le pagine di man per altre lingue, sono disponibili col pacchetto
"manpages-LANG" ad esempio per le pagine in italiano il pacchetto
è "manpages-it" e così via; Inoltre l'utente deve settare la
variabile LC_MESSAGES in modo appropriato per vedere i man nella
lingua scelta.


## Pacchetti

Packages generally contain all of the files necessary to
implement a set of related commands or features. There are two
types of Debian packages:

* Binary packages, which contain executables, configuration
  files, man/info pages, copyright information, and other
  documentation. These packages are distributed in a
  Debian-specific archive format (see What is the format of a
  Debian binary package?, Section 7.2); they are usually
  distinguished by having a '.deb' file extension. Binary
  packages can be unpacked using the Debian utility dpkg
  (possibly via a frontend like aptitude); details are given in
  its manual page.
* Source packages, which consist of a .dsc file describing the
  source package (including the names of the following files), a
  .orig.tar.gz file that contains the original unmodified source
  in gzip-compressed tar format and usually a .diff.gz file that
  contains the Debian-specific changes to the original source.
  The utility dpkg-source packs and unpacks Debian source
  archives; details are provided in its manual page. (The program
  apt-get can get used a frontend for dpkg-source.)

The Debian binary package file names conform to the following
convention:
```
<foo>_<VersionNumber>-<DebianRevisionNumber>_<DebianArchitecture>.deb
```

Ai pacchetti possono essere associati diversi flag, questi sono
chiamati "want" flags tell what the user wanted to do with a
package (as indicated either by the user's actions in the
"Select" section of dselect, or by the user's direct invocations
of dpkg).

Their meanings are:

* unknown - the user has never indicated whether he wants the package
* install - the user wants the package installed or upgraded
* remove - the user wants the package removed, but does not want to
  remove any existing configuration files.
* purge - the user wants the package to be removed completely,
  including its configuration files.
* hold - the user wants this package not to be processed, i.e.,
  he wants to keep the current version with the current status
  whatever that is.


## Compilare pacchetti

How do I build binary packages from a source package?

The preferred way to do this is by using various wrapper tools.
We'll show how it's done using the devscripts tools. Install this
package if you haven't done so already.

Now, first get the source package:

```sh
 apt-get source foo
```
and change to the source tree:

```sh
 cd foo-*
```
Then install needed build-dependencies (if any):

```sh
 sudo apt-get build-dep foo
```
Then create a dedicated version of your own build (so that you
won't get confused later when Debian itself releases a new
version)

```sh
 dch -l local 'Blah blah blah'
```
And finally build your package

```sh
 debuild -us -uc
```
If everything worked out fine, you should now be able to install
your package by running

```sh
 sudo dpkg -i ../*.deb
```
If you prefer to do things manually, and don't want to use
devscripts, follow this procedure:

You will need all of foo_*.dsc, foo_*.tar.gz and foo_*.diff.gz to
compile the source (note: there is no .diff.gz for some packages
that are native to Debian).

Once you have them (How do I install a source package?, Section
7.13), if you have the dpkg-dev package installed, the following
command:

```sh
 dpkg-source -x foo_version-revision.dsc
```
will extract the package into a directory called foo-version.

If you want just to compile the package, you may cd into
foo-version directory and issue the command

```sh
 dpkg-buildpackage -rfakeroot -b
```
to build the package (note that this also requires the fakeroot
package), and then

```sh
 dpkg -i ../foo_version-revision_arch.deb
```
to install the newly-built package(s).


## Installare grossi gruppi di pacchetti

Possiamo usare tasksel, per installare grossi gruppi di
pacchetti, come ad esempio la suite di KDE, o GNOME, molto utile
nel momento in cui dobbiamo installare DE.

```sh
 sudo tasksel
```

## Tenere aggiornare i repository regolarmente


You can use cron-apt, this tool updates the system at regular
interval by using a cron job. By default it just updates the
package list and download new packages without installing.


## Tenere aggiornati i repository di più macchine

If you have more than one Debian machine on your network, it is
useful to use apt-proxy to keep all of your Debian systems
up-to-date.

apt-proxy reduces the bandwidth requirements of Debian mirrors by
restricting the frequency of Packages, Releases and Sources file
updates from the back end and only doing a single fetch for any
file, independently of the actual request it from the proxy.
apt-proxy automatically builds a Debian HTTP mirror based on
requests which pass through the proxy.

For more details, see the apt-proxy homepage at
http://apt-proxy.sourceforge.net/

Of course, you can get the same benefit if you are already using
a standard caching proxy and all your systems are configured to
use it.


## Using dpkg-divert

How do I override a file installed by a package, so that a
different version can be used instead?

Suppose a sysadmin or local user wishes to use a program
"login-local" rather than the program "login" provided by the
Debian login package.

Do not: Overwrite /bin/login with login-local.

The package management system will not know about this change,
and will simply overwrite your custom /bin/login whenever login
(or any package that provides /bin/login) is installed or
updated.

Rather, do

Execute:

```sh
 dpkg-divert --divert /bin/login.debian /bin/login
```
in order to cause all future installations of the Debian login
package to write the file /bin/login to /bin/login.debian
instead.

Then execute:

```sh
 cp login-local /bin/login
```
to move your own locally-built program into place.

Run

```sh
 dpkg-divert --list
```
to see which diversions are currently active on your system.

Details are given in the manual page dpkg-divert(8).


## Alternative a categorie di programmi

Possiamo browsare la directory /etc/alternatives, varie categorie
di programmi, e utilizzare il comando:

```sh
 update-alternatives --display x-window-manager
 # mostra le
 # alternative, della categoria x-window-manager, le alternative
 # mostrate sono quelle installate sul sistema
```
```sh
 update-alternatives --config x-window-manager
 # mi permette di
 # cambiare window manager con una procedura guidata
```
se un'alternativa non compare tra le alternative possiamo usare:

```sh
 update-alternatives --install /usr/bin/x-window-manager \
  x-window-manager /usr/local/bin/wmaker-cvs 50
 # in questo caso,
 # l'ultimo attributo è la priorità, una priorità più alta
 # significa che questo window manager sarà più probabilmente
 # settato come window manager di default
```
per rimuovere un'alternativa eseguiamo:

```sh
 update-alternatives --remove x-window-manager /usr/local/bin/wmaker-cvs
 # rimuove un'alternativa
```

## Fixare il sistema dopo aver rimosso dei pacchetti

In this case, look for /var/log/apt/history.log, look for the
time around which your system was broken. Copy the removed
packages which would be in the format of:

```
libapt-inst1.5:amd64 (0.9.7.9+deb7u5, 0.9.7.9+deb7u6),
apt-utils:amd64 (0.9.7.9+deb7u5, 0.9.7.9+deb7u6).
```
e poi li reinstalliamo con un classico:

```sh
 sudo apt-get install <listaPacchetti>
```

## Repository non fidati e chiavi GPG

Può capitare cambiando i repository di incappare in questo
errore:

```
W: GPG error: http://http.kali.org /kali Release: The following
signatures couldn't be verified because the public key is not
available: NO_PUBKEY ED444FF07D8D0BF6
```

In questo cass d'uso ho utilizzato un debootstrap per creare un
ambiente debian in una distro debian, e nel sottoambiente ho
voluto impostare i repository di kali una distribuzione linux
derivata da debian (cambiano solo i repo) incentrata sui
penetration test, per risolvere questo problema ci basta
eseguire:

```sh
 gpg --keyserver pgpkeys.mit.edu --recv-key ED444FF07D8D0BF6
 # questo pgpkeys.mit.edu è un server in cui sono presenti
 # moltissime chiavi, quindi probabilmente ci ritroveremo spesso
 # ad usarlo
```
```sh
 gpg -a --export ED444FF07D8D0BF6 > nomeChiave.txt
```
```sh
 sudo apt-key add nomeChiave.txt
```


## Gestione delle chiavi gpg su Debian

Possiamo gestire le chiavi su sistemi Debian o Debian based con i
seguenti comandi:

```sh
 apt-key list
 # questo mostra l'intera lista di chiavi
```
```sh
 apt-key del "C23F 55C5"
 # questo cancella ad esempio una
 # chiave, per l'id della chiave prendiamo gli ultimi 8 caratteri
 # del fingerprint che vediamo in apt-key list, oppure a volte
 # abbiamo un identificativo in apt-key list come "pub
 # 1024D/437D05B5 2004-09-12" in questo caso l'id della chiave è "
 # 437D05B5"
```


## Supporto per i PPA

Molte volte si cita come svantaggio di Debian rispetto alle
distro Ubuntu based, l'assenza di PPA, cioè repository secondari,
in realtà questi si possono utilizzare, è molto semplice, basterà
seguire i seguenti passi:

1. andare sul sito del PPA desiderato e scegliere una versione a
  caso di Ubuntu e copiare le stringhe relative al repository (in
  realtà ci basterebbe solo quella del sorgente "deb-src", una
  volta copiate queste due stringhe mettiamole all'interno di
  /etc/apt/sources.list
2. aggiungiamo la chiave GPG del PPA con "apt-key adv --keyserver
  keyserver.ubuntu.com --recv-keys
  `<stringa_dopo_lo_slash_sotto_la_voce_signing_key_sul_sito_del_ppa>`
3. apt-get update
4. apt-get source -b nomePacchetto #questo compila il pacchetto,
  potrebbe darmi problemi di compilazione, devo installare i
  pacchetti necessari che mancano al processo di compilazione,
  questo creerà un paio di pacchetti ".deb" solitamente
5. dpkg -i nomePacchetto.deb #questo installa il programma,
  anche qui potrei avere problemi di dipendenze, anche in questo
  caso andrò ad installarle

