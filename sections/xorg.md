# Xorg 

Many Linux and Unixoid users (Unix and Unix-like systems) have
heard of window managers, window decorators, desktop
environments, and such. But what exactly are these and how do
they relate to each other? I hope to clarify some of these topics
and explain how it all works.

##  First of all, a Graphical User Interface (GUI)

is an interface that allows users to interact with the system in
a visual manner. GUIs typically have icons, windows, or graphics
of some kind. An alternative to GUIs are command-lines which may
also be called CLIs (Command-Line Interfaces) or CUIs (Console
USer Interfaces). An example of this is DOS, FreeDOS, Bash, many
server distros, etc. Basically, with a CLI, users interact with
the machine through text. Users type a command and the machine
performs the action and provides text as the output. A TUI (Text
User Interface) is a step up from CLIs. TUIs are still
text-based, but the screen is more ornamented and organized. The
Ncurses interface is an example of a TUI. Most BIOS systems use a
TUI interface (gray background and other coloring with menus).
More advanced TUIs may have a cursor. The "dialog" command used
to make interfaces for scripts is an example of an advanced TUI.

The core of most GUIs is a windowing system (sometimes called a
display server). Most windowing systems use the WIMP structure
(Windows, Icons, Menus, Pointer). X11 is a protocol used by the
common windowing system called Xorg used on Linux systems. Xorg,
like other windowing systems, allows the movement of windows and
input interactions (such as the mouse and keyboard). Windowing
systems provide the basic framework for other parts of the GUI.
Windowing systems do not control the appearance of the GUI.
Rather, the windowing system offers the core functionality.

##  Xlib

is a C-programming library for interacting with display servers
using the X11 protocol (X Window System Version 11). Not all
graphical components above the display server are compatible with
the display server itself.

The part of the GUI that controls the way windows appear is
called the window manager. Window managers manage the size and
placement of windows. Window managers also draw and own the
close, maximize, minimize, etc. buttons and the scroll bars and
menus (like the "File" menu) commonly seen on many windows. In
other words, window managers control the frames that surround
applications and the placement of these frames. The term "window
decoration" refers to the usable part of the window frame like
the close, minimize, etc. buttons, scroll bars, etc. However,
sometimes the window manager will allow the application to
control the appearance of the window. To understand this, think
about the "complete themes" in Firefox that change the appearance
of the windows and scroll bars. Not all window managers are
compatible with the different display-managers/windowing-systems.
Examples of window managers include Mutter, Metacity, KWin, twm,
and IceWM.

##  A widget-toolkit

is a set of software or a library that works with the window
manager to design the window's appearance. For example, the GTK
toolkit defines how a window should appear. Then, a window
manager draws and manages the window. When users customize the
theme of their desktop, they are choosing which GTK design to
use. To help clarify, toolkits (like Qt and GTK) are programming
frameworks that specify the appearance of a theme. Different
themes are basically different sets of code written in GTK, Qt,
or some other widget toolkit. When a programmer designs a
program, they may add some code that interfaces with a widget
library (like GTK or Qt) to hard-code how a window appears. Think
about your desktop and notice how you may have a few programs
that look like an entirely different theme compared to your other
applications. Such "odd" applications may have their appearance
hard-coded. Examples of widget toolkits include SDL, Qt, GTK,
AWT, and Motif.

Notice that some of the windows have an appearance that differs
from the others (Clementine is more gray and box-like wile the
calculator has rounded buttons and a lighter color).

##  A display manager

is the "login screen". LightDM, KDM (KDE display manager), GDM
(GNOME Display Manager), etc. are pieces of software that manage
the appearance of the login screen.

##  A desktop

is the "invisible window" that allows users to set a
wallpaper/background and place "desktop icons". A virtual desktop
refers to a desktop that is on the outside of the screen. Think
about "workspaces" or "workspace switchers". You see your
desktop, but there is more of it than what you see on the
physical screen.

## A dock, launcher, launch bar, or taskbar

is a graphical element that may be its own entity or a component
of another graphical software. In Ubuntu, the launcher on the
side and the bar at the top are components of Unity. Cairo-Dock
is an example of a dock that is its own entity. Their purpose is
to give users access to file and applications.

## Screensavers

are special programs that protect the screen from phosphor
burn-in on CRT (tube-based monitors) and plasma monitors.
However, they are also used for entertainment and security
purposes. Screensavers can be set to activate when the
workstation has not seen any activity from the user. Screensavers
would then require a password to allows users to see the desktop
and interact with the machine. Screensavers may be simple like a
solid color or they can be graphics intensive like a video game.

## A Desktop Environment

is a collection of software that provides a standard look and
feel. For example, the KDE Plasma Desktop uses the X11 windowing
system, the KWin window manager, the Qt widget, the KDE display
manager, and the KDE Software Compilation (the many KDE
applications such as Kate, Konsole, Phonon, and the many KDE
applications).

In summary, a desktop environment is the collection or a bundled
package of various GUI components. Each component performs some
function in producing a graphical way of interacting with your
machine. The windowing system (think about Xorg) is the lowest
level portion of the GUI that controls the input interaction
(mouse and keyboard). The window manager puts applications in
designated portions of the screen called "windows". Window
managers provide a way to change the window size. Users may also
use the window manager to close an application. The widget
toolkits provide a set (predefined) appearance that the window
manager should draw. Such toolkits tell the window manager where
to place the close, maximize, etc. buttons and how they should
appear. Menus are also drawn by window managers after a toolkit
declares how the menu should appear. Display managers a graphical
login interfaces that allows users to login and choose the
environment to load (if the user has more than one environment
installed). Docks and launchers allow users to access certain
application and files. The desktop is an "invisible" background
window that appears to be behind (or at the bottom - below) all
of your other windows and docks.

All these pieces of software work together to create the
applications we see on the screen.

## A display server or window system

The display server controls and manages the low-level features to
help integrate the parts of the GUI. For instance, display
servers manage the mouse and help match the mouse movements with
the cursor and GUI events caused by the cursor. The display
server also provides various protocols and communicates with the
kernel directly. There are different sets of display server
protocols and different display servers that implement a specific
protocol.

NOTE: Display servers do not draw anything. They just manage the
interface. Libraries, toolkits, and other software perform the
drawing.

L'X Window System (noto in gergo come X Window, X11 o
semplicemente come X), in informatica, è un gestore grafico molto
diffuso, standard de facto per molti sistemi Unix-like (Linux e
FreeBSD compresi). L'implementazione ufficiale open source di X è
X.Org (o più semplicemente XOrg), ed il suo sviluppo è curato
dalla fondazione X.Org Foundation.

In passato era necessaria la configurazione di un file di
configurazione Xorg, questo file conteneva diverse sezioni per la
configurazione del monitor, refresh rate, opzioni video eccetera,
oggi questo file di configurazione non è più richiesto, in quanto
i driver che installiamo della scheda video si occupano di
configurare il tutto per noi. Nel caso volessimo visualizzare il
file di configurazione che viene generato nel momento
dell'installazione e della configurazione di xorg, possiamo farlo
con:

```sh
 cat /etc/X11/xorg.conf.failsafe
 # visualizza il file di
 # configurazione di Xorg che viene generato durante
 # l'installazione e la configurazione di xorg, ma non è presente
 # su tutte le distribuzioni
```
Un comando utile fin da subito per uccidere tutti i processi del
server grafico e quindi terminarlo è:

```sh
 pkill X
 # uccide tutti i processi relativi ad X
```

un'alternativa potrebbe essere uccidere il display manager,
in quanto il display manager è il processo padre del processo
relativo al Desktop Environment o al Window Manager

possiamo generare un file di configurazione di xorg,
assicurandoci prima che Xorg non sia in esecuzione, (o uccidendo
tutti i processi relativi a Xorg attraverso il comando
precedentemente citato) attraverso:

```sh
 cd /etc/X11 && Xorg -configure
 # genera un file di
 # configurazione per Xorg
```
per testare il nuovo file di configurazione possiamo effettuare
un:

```sh
 X -config -retro /directory/nuovoFileConfig
 # imposta come file
 # di configurazione per X il file "nuovoFileConfig"
```
```sh
 startx
 # per avviare il server grafico col nuovo file di
 # configurazione
```
```sh
 startx /path/to/WM/or/DE
 # posso usare questo per lanciare un
 # window manager o desktop environment per una sessione
 # temporanea (comodo per provare ambienti o configurazioni
 # temporanee)
```
Se volessi runnare altri desktop environment allora possiamo
eseguire all'interno di un altro tty il comando:

```sh
 startx -- :2
 # questo inizia una sessione di Xorg sul display 2,
 # il display 2 solitamente è mappato al tasto f9 ma non sempre,
 # possiamo cioè accederci con "Ctrl+alt+f9"
```
```sh
 startx /usr/bin/gdm -- :2
 # avvia gdm sul display 2
```
Ricorda che:

* For a Linux computer with 6 allowed shell sessions, the virtual
  displays are numbered 0 to 5
* Shell sessions are mapped to function keys F1 through F6
* Virtual displays are mapped to function keys F7 through F12

I file di log, possono essere visionati al percorso "/var/log/Xorg.?.log".

## Problemi Incontrati

Nel caso un utente non dovesse essere abilitato ad avviare
startx, con messaggi tipo "User is not authorized to run X",
dobbiamo andare a scrivere nel file "/etc/X11/Xwrapper.config" ed
inserire nella voce "allowed_users" la stringa "anybody".

## Troubleshooting con X

In genere per fare troubleshooting sugli errori generati da X,
possiamo ispezionare i seguenti file: `~/.xsession-errors`,
`/var/log/Xorg.*/var/log/messages`.

Quali sono errori che potrebbero dipendere da X ?
Beh nel caso notassimo rallentamenti grafici non giustificati,
oppure finestre che si bloccano e bisogna riavvarle per
farle funzionare.
Ricorarsi di iconsultare i file di log sopracitati, ad esempio:

    cat /var/log/Xorg.0.log

Visualizzando i log possiamo capire se ci sono messaggi di errore
che possono essere associati a questi blocchi o rallentamenti.
A volte la soluzione e' quella di aggiornare o effettuare il
downgrade del kernel.

## Copy & Paste (ossia copia e incolla)

Xorg ha tre clipboard, in cui vengono memorizzati i copia
incolla, una utility molte efficace è "xclip", questa ci permette
di copiare o incollare dati da terminale, ad esempio:

```sh
 dmesg | xclip -selection clipboard
 # copia nella clipboard di X
 # l'output di dmesg, ora possiamo incollarlo in qualsiasi altro
 # programma grafico con "ctrl+v" o tasto destro del mouse e "
 # incolla", potrebbe essere utile creare un alias per fare in
 # modo che automaticamente quando si esegue xclip si intende "
 # xclip -selection clipboard", in quanto a mio parere è l'opzione
 # più utilizzata quando si utilizzata xclip
```
```sh
 xclip -selection clipboard nomeFile.log
 # copia nella clipboard
 # di X il contenuto del file menzionato
```
Xclip permette anche l'utilizzo di display diversi.

The ICCCM (Inter-Client Communication Conventions Manual)
standard defines three "selections": PRIMARY, SECONDARY, and
CLIPBOARD. Despite the naming, all three are basically
"clipboards". Rather than the old "cut buffers" system where
arbitrary applications could modify data stored in the cut
buffers, only one application may control or "own" a selection at
one time. This prevents inconsistencies in the operation of the
selections. However, in some cases, this can produce strange
outcomes, such as a bidirectional shared clipboard with Windows
(which uses a single-clipboard system) in a virtual machine.

Of the three selections, users should only be concerned with
PRIMARY and CLIPBOARD. SECONDARY is only used inconsistently and
was intended as an alternate to PRIMARY. Different applications
may treat PRIMARY and CLIPBOARD differently; however, there is a
degree of consensus that CLIPBOARD should be used for
Windows-style clipboard operations, while PRIMARY should exist as
a "quick" option, where text can be selected using the mouse or
keyboard, then pasted using the middle mouse button (or some
emulation of it). This can cause confusion and, in some cases,
inconsistent or undesirable results from rogue applications.

In pratica il buffer primario è associato ai copia incolla che
eseguiamo con la rotellina del mouse, mentre il buffer clipboard,
quelli che generalmente eseguiamo con "ctrl+c" e "ctrl+v", o
comunque quando non incolliamo con la rotellina del mouse.

Di default "xclip" copia attraverso il buffer primario, quindi
per incollare dobbiamo premere la rotellina del mouse.

## Xhost


Il programma xhost è molto utile per poter avviare programmi da
remoto, può lavorare in due modalità:

```sh
 access control enabled '-'
 # solo gli utenti contenuti
 # all'interno di una lista, possono usarlo, l'accesso a xhost non
 # è garantito a tutti
```
```sh
 access control disabled '+'
 # tutti gli utenti possono usarlo,
 # l'accesso a xhost è garantito a tutti
```
```sh
 xhost + 192.168.1.101
 # serve a garantire l'accesso a xhost
 # solo ad uno specifico indirizzo
```
Lanciando solo:

```sh
 xhost
 # mostra la configurazione attuale per l'accesso a xhost
```
Un'altra informazione utile è visualizzare la variabile
d'ambiente $DISPLAY con:

```sh
 set | grep DISPLAY
 # visualizza il valore della variabile
 # display
```

l'output di questo comando sarà nella forma
`DISPLAY=:numeroDisplay.numeroSchermo`

il nome del display può anche essere visionato con:

```sh
 xdpyinfo | grep display
```
Quindi avendo due sistemi A e B, se su A impostiamo come
variabile d'ambiente DISPLAY con l'indirizzo IP di B e un display
esistente su B, possiamo redirigere l'output di X di A su B,
quindi su A effettueremo:

```sh
 export DISPLAY=192.168.1.87:0.0
 # imposta la variabile
 # d'ambiente DISPLAY in modo che l'output grafico di X venga
 # rediretto su B al display 0 dello schermo 0.
```
dopo aver impostato la variabile d'ambiente DISPLAY possiamo
effettuare un test, lanciando un'applicazione grafica come:

```sh
 xterm
 # avvia l'applicazione xterm
```
Xhost risulta molto utile nel momento in cui vogliamo che un
server si occupi del carico grafico, mentre su una macchina
remota vengano visualizzati solo i risultati all'interno del
server grafico.


## Xnest

E' possibile avviare desktop environment o window manager
annidati attraverso Xnest. Oppure con un wrapper che semplifica
queste operazioni e cioè Xephyr.


## Xwininfo

Il programma xwininfo è molto utile per reperire informazioni
sulle finestre attive su Xorg. Vediamo subito alcuni esempi
applicativi:

```sh
 xwininfo
 # ci mostra informazioni sulla finestra su cui
 # clickiamo dopo aver lanciato il comando
```
```sh
 xwininfo idFinestra
 # ci mostra informazioni sulla finestra con
 # l'id specificato
```
```sh
 xwininfo titoloFinestra
 # ci mostra informazioni sulla finestra
 # col titolo specificato
```
```sh
 xwininfo -root
 # mostra informazioni sulla finestra "root" cioè
 # quella da cui derivano tutte le altre finestra, quindi
 # mostreremo a schermo informazioni come risoluzione e geometrie
 # dell'intero desktop
```
```sh
 xwininfo -events
 # mostra gli eventi di cui è in ascolta la
 # finestra su cui clickeremo
```
```sh
 xwininfo -wm
 # mostra informazioni relative al process ID
 # dell'applicazione che ha lanciato quella finestra, il display
 # su cui è attiva la finestra eccetera
```
```sh
 xwininfo -root -children
 # mostra le informazioni di tutti i
 # componenti X attivi con padre e figli, ma è poco leggibile
```
```sh
 xwininfo -root -tree
 # mostra le stesse informazioni del
 # comando precedente ma in forma più leggibile
```
```sh
 xwininfo -root -children -all
 # mostra tutte le informazioni
 # possibili su tutti i componenti di X
```
N.B.: Gli ultimi comandi sono utili nel caso di programmazione di
Desktop ENvironment, nel momento in cui facciamo riferimento a
elementi di X.

Altro comando utile per reperire informazioni su oggetti, font,
finestre o display è:

```sh
 xprop
 # dopo averlo avviato dovremo selezionare la finestra
 # d'interesse
```
```sh
 xprop | grep -i pid
 # mi fornisce il PID della finestra, utile
 # se abbiamo ad esempio più istanze di un programma avviato e
 # vogliamo chiuderne uno nello specifico senza influire sugli
 # altri
```
un'altro comando utilissimo per vedere i nomi dei comandi delle
applicazioni che abbiamo in running in X è:

```sh
 xlsclients
 # visualizza il nome dei comandi delle applicazioni
 # grafiche in running su X
```
```sh
 xlsclients -l
 # è più dettagliato
```
un'altro utile tool per ottenere informazioni sulle finestre è "
wmctrl", guardare il man per utili esempi di utilizzo.

Possiamo dare focus a una finestra che non vediamo più con:

```sh
 xdotool windowfocus 0x1a00ad2
 # dove l'id è preso da xlsclients
```


## Xrefresh

E' un comodo comando per fare il refresh del server X, nel caso
in cui una o più parti devono essere ridisegnate


## Xdpyinfo

Il programma xdpyinfo fornisce informazioni sul display manager;
vediamo subito alcuni esempi:

```sh
 xdpyinfo | grep display
 # fornisce informazioni sul display
```
```sh
 xdpyinfo
 # fornisce molte informazioni sul display
```
```sh
 xdpyinfo | grep extensions
 # fornisce il numero di estensioni
 # installate per il display
```
```sh
 xdpyinfo -queryExtensions
 # fornisce informazioni tecniche
 # sulle estensioni caricate, utili per i programmatori
```

## Xinput

Questo comando è utile per capire le periferiche di input a
disposizione, come ad esempio mouse eccetera, le loro features, e
le eventuali configurazioni, possiamo eseguire:

```sh
 xinput
 # mostra la lista delle periferiche di input per il
 # server X
```
```sh
 xinput --disable 10
 # disabilita la periferica con ID=10
```
```sh
 xinput --enable 9
 # abilita la periferica con ID=9
```
```sh
 xinput --list --short
 # mostra con una lista concisa tutte le
 # periferiche di input
```
```sh
 xinput --list-props "Logitech USB-PS/2 Optical Mouse"
 # mostra
 # le proprietà di una delle periferiche (indicata tra doppi
 # apici) mostrata dal comando "xinput --list --short"
```
```sh
 xinput --set-prop "SynPS/2 Synaptics TouchPad" "Device Accel Constant Deceleration" 1.5
 # imposta il parametro "Device Accel
 # Constant Deceleration" del device "SynPS/2 Synaptics TouchPad"
 # al valore di "1.5"
```
```sh
 xinput --set-prop "Logitech USB-PS/2 Optical Mouse" "libinput Accel Speed" -0.6
 # imposta il parametro "libinput Accel Speed"
 # del device "Logitech USB-PS/2 Optical Mouse" al valore di "-0.6",
 # in questo caso un valore negativo riduce l'accelerazione e
 # velocità del mouse.
```


## xwd

Il programma xwd (X Window Dump) è un utile tool per effettuare
screenshot dello schermo, possiamo avviarlo con:

```sh
 xwd
 # attenzione in questo caso il comando è inutile, in quanto
 # una volta selezionata la finestra, verrà stampata l'immagine
 # sull stdout, con caratteri incomprensibili
```
invece modi utili per utilizzare questa utility sono:

```sh
 xwd > myshot.xwd
 # stampa l'immagine in un file chiamato
 # myshot.xwd
```
```sh
 xwd -out myshot.xwd
 # stampa l'immagine in un file chiamato
 # myshot.xwd
```
```sh
 xwd -frame -out myshot.xwd
 # stampa l'immagine, mostrando anche
 # il frame della finestra
```
```sh
 xwd -root -out myshot.xwd
 # esegue uno screenshot dell'intero
 # desktop
```
per visualizzare le immagini possiamo utilizzare "xwud", quindi
eseguiamo:

```sh
 xwud -in screenshot.xwd
 # visualizza l'immagine .xwd
```
se abbiamo installato imagemagick, possiamo anche convertirla in
un altro formato ad esempio con:

```sh
 convert shot.xwd shot.jpg
 # converte l'immagine .xwd in .jpg
```


## Xrandr

RandR ("resize and rotate") is a communications protocol written
as an extension to the X11[2] and Wayland[3] protocols for
display servers. Both XRandR and WRandR provide the ability to
resize, rotate and reflect the root window of a screen. RandR is
also responsible for setting the screen refresh rate. The program
xrandr is a primitive command line interface to RandR extension
used to manage monitor configurations, let's see some examples:

```sh
 xrandr
 # shows the actual configuration
```
```sh
 xrandr --output VGA1 --off
 # turns off the VGA1 interface, keep
 # in mind that the available displays are shown when "xrandr"
 # alone is executed
```
```sh
 xrandr --output VGA1 --auto --left-of eDP1
 # in this case VGA1 is
 # set with the maximum resolution automatically detected "--auto",
 # and on the left of the interface eDP1, notice that we can
 # specify multiple configurations of various monitor interface,
 # we just have to keep in mind the structure of the xrandr
 # command
```
```sh
 xrandr --output DFP1 --mode 1024x768
 # imposta la risoluzione
 # indicata per il monitor indicato
```
the structure of the xrandr command is usually
```sh
xrandr --output <monitorInterface> --option1 <value> --option2 <value> ... ..."
```

Let's see other examples:

```sh
 xrandr --output LVDS --auto --rotate normal --pos 0x0 --output VGA \
 --auto --rotate left --right-of LVDS
 # Sets an output called LVDS
 # to its preferred mode, and on its right put an output called
 # VGA to preferred mode of a screen which has been physically
 # rotated clockwise
```

```sh
 randr --output HDMI1 --off --output LVDS1 --primary --mode 1366x768 --pos 0x0 \
 --rotate normal --output VIRTUAL1 --off --output DP1 --off
  --output VGA1 --mode 1280x1024 --pos 1366x0 --rotate normal
 # this is a complete setup of all the interfaces, notice the "--primary"
 # option is used to set the LVDS1 interface as primary
```
```sh
 xrandr --output LVDS --mode 1280x800 --rate 75
 # imposta l'output
 # di LVDS alla risoluzione e alla frequenza selezionata
```
queste impostazioni non saranno permanenti ma possono essere rese
permanenti attraverso uno script che parte all'avvio.

Inoltre xrandr può gestire le schede video esterne, ad esempio in
alcuni portatili potremo non vedere interfacce HDMI, o VGA,
questo è perchè in alcune configurazioni Hardware, alcune
interfacce tipo VGA sono collegate ad una scheda video, mentre
altre tipo HDMI, all'altra scheda video. Vediamo un esempio, nel
caso d'esempio supponiamo che la porta hdmi sia collegata ad una
scheda video mentre la porta vga ad un'altra scheda video, allora
possiamo eseguire:

```sh
 xrandr --listproviders
 # mi mostra su quanti e su quali
 # dispositivi video xrandr può agire, il primo a comparire sarà
 # quello in utilizzo attualmente, potremo ad esempio visionare
 # una lista tipo "0: Intel 1:nouveau", questo è anche l'ordine di
 # priorità che viene dato ai dispositivi di uscita
```
ora possiamo cambiare l'ordine eseguendo:

prima deve essere attiva la scheda video nouveau:

```sh
 optirun ls
 # ls è un esempio, qualsiasi comando va bene, serve
 # solo ad accendere la scheda video
```
```sh
 xrandr --setprovideroutputsource nouveau Intel
 # impone un nuovo
 # ordine ai moduli video, ora nouveau è impostato per gestire gli
 # output video come modulo primario
```
NOTA BENE: Un caso pratico e molto comune in cui questo può
essere necessario è su laptop, in cui infatti solitamente
esistono due schede video, una integrata ed un'altra esterna, in
questo caso, dobbiamo assicurarci di aver installato bumblebee o
che comunque entrambe le schede video funzionino correttamente e
che i driver vengano caricati senza errori.


### Impostare una risoluzione personalizzata

Per poter creare una risoluzione personalizzata, ad esempio
se non compare all'interno della lista di quelle rilevate
(anche se solitamente non e' proprio una buona idea) possiamo
provare a forzarla.

Ad esempio se volessimo forzare la modalita' 1680x1050 @ 60 Hz
prima dobbiamo generare la linee di configurazione per questa
modalita' e possiamo farlo attraverso:

```sh
 cvt 1680 1050 60
 # genera la configurazione per la risoluzione 1680x1050 a 60 Hz
```

Questo fornira' un output del tipo:
```text
1680x1050 59.95 Hz (CVT 1.76MA) hsync: 65.29 kHz; pclk: 146.25 MHz
Modeline "1680x1050_60.00"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
```

Ora possiamo utilizzare questo output per segnalare a xrandr
la nuova modalita' con:

```sh
 xrandr --newmode "1680x1050_60.00"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
 # crea la nuova modalita' per xrandr
```

a questo punto non ci basta che settarla con:
```sh
xrandr --addmode VGA-0 1680x1050_60.00
```


The changes are lost after reboot, to set up the resolution persistently,
create the file `~/.xprofile` with the content:

```sh
#!/bin/sh
xrandr --newmode "1680x1050_60.00"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
xrandr --addmode VGA-0 1680x1050_60.00
```


## DPMS

DPMS (Display Power Management Signaling) is a technology that
allows power saving behaviour of monitors when the computer is
not in use. This will allow you to have your monitors
automatically go into standby after a predefined period of time.

## Xorg e bash


Possiamo interagire con Xorg ad esempio mandando notifiche al
Desktop Environment o al Window Manager, una volta installato "
libnotify" con:

```sh
 notify-send "rsnapshot done :)"
```


## X e startx

### Premessa su Desktop Environment e Display Manager

E' importante capire la distinzione tra Desktop Environment o
Window Manger (ambiente più leggero, ma di concetto simile) e
Display Manager, il display manager (come ad esempio LightDM,
KDM, GDM, Qingy, ecc...) è un programma utile per sostituire la
procedura di login testuale e permettere all'utente la scelta del
Desktop Environment o Window Manager; mentre il Desktop
Environment o il Window Manager è costituito dai programmi atti a
gestire le finestre, i workspace e gli stili dell'ambiente
grafico.

### X, startx e xinit e come avviare applicazioni all'avvio del sistema se si usa "startx"

Il programma startx è uno script utilizzato per lanciare il
server grafico X utilizzando determinati driver e un determinato
window manager o desktop environment, startx fa uso del programma
"xinit" per lanciare la GUI (Graphical User Interface), possiamo
ad esempio automatizzare utente per utente l'avvio di determinate
applicazioni andando ad inserire il nome dell'applicazione da
lanciare nel file di configurazione adibito, che può essere a
differenza della distribuzione:

* ~/.xinitrc
* ~/.xsession

Mentre è comunque possibile automatizzare l'avvio di applicazioni
a livello globale (utile ad esempio per applicazioni enterprise)
attraverso i file di configurazione in "/etc" che anche in questo
caso possono variare da distribuzione a distribuzione ma comunque
dovrebbero avere un nome simile a uno di quelli precedenti
sopracitati; per trovare i nomi dei file che vengono usati
precisamente possiamo fare:

```sh
 whereis startx
 # mostra dove sono collocati gli eseguibili di
 # startx
```
```sh
 cat /percorso/startx | more
 # mostra lo script "startx"
```
Una volta visualizzato lo script basterà cercare i nomi dei file
collocati alle voci:

```sh
 userclientrc
 # indica le directory in cui sono situtati i file
 # di configurazione locale (utente per utente) di X
```
```sh
 sysclientrc
 # indica la directory in cui è situato il file di
 # configurazione globale (valido per tutti gli utenti) di X
```
Basterà creare questi file se non esistono e al loro interno
potremo scrivere i comandi da avviare all'avvio di X.
Recapitolando, startx è uno script che richiama:

```sh
 xinit
 # inizializzatore di X, che legge anche file di
 # configurazione a livello utente e a livello sistema
```
```sh
 # file di configurazione sia a livello utente che a livello
 # globale di sistema
```
```sh
 X
 # server per window system
```
per poter lanciare un desktop environment. Attenzione i file di
configurazione discussi in questa sezione, sono validi solo nel
momento in cui iniziamo la nostra sessione con "startx", in altri
casi (ad esempio gestione attraverso login manager) la
configurazione potrebbe essere diversa, e questi file potrebbero
del tutto essere ignorati; fare quindi sempre riferimento alla
configurazione del proprio login manager. Quando non si usa un
login manager, e quindi si fa uso dello script "startx", dobbiamo
inserire all'interno del file di autorun di X discusso a inizio
sezione (.xinitrc o .xsession, ci basta leggere le prime righe
dello script startx per capirlo) l'istruzione:

```sh
 exec percorsoDEoWM
 # dove al posto di percorsoDEoWM possiamo ad
 # esempio inserire "/usr/bin/startkde" o "/usr/bin/gnome-session"
 # o ancora "/usr/bin/startxfce4"
```
Un altro modo per avviare script o cose da terminale è quello di
usare il file /etc/rc.local per i sistemi sysVinit.


## Inittab e Xwindows

Il file inittab, è un file atto a specificare il default runlevel
del nostro sistema, anche se nella maggior parte delle distro
recenti, in pratica da quando il gestore di demoni "systemd" ha
sostituito "sysVinit" la mansione di questo file è stata delegata
ad altri insiemi di file in determinate directory; vediamo
innanzitutto alcuni comandi utili per gestire i runlevel:

```sh
 runlevel
 # mostra il runlevel attuale e il precedente
```
```sh
 telinit runlevelNumber
 # setta il runlevel al numero "runlevel
 # Number"
```
```sh
 init runlevelNumber
 # analogo al comando precedente
```
Storicamente la posizione del file "inittab" era "/etc/inittab",
per avere un'idea più precisa di come gestire i demoni, si
rimanda alla sezione sui processi e su systemd.


## Font

Che palle, questa la fai tu Jack, non ne vedo l'utilità. E' la
lezione 16 della seconda parte del corso.

## Xorg Oggi e come avviare applicazioni all'avvio del sistema se non si usa "startx"

Xorg, attualmente autoconfigura le impostazioni per l'ambiente
grafico, esistono diverse directory dove sono collocati i file di
configurazione, ad esempio, alcuni file di configurazione sono
in:

```sh
 /etc/X11
 # qui vengono gestite anche le applicazioni che
 # vengono autolanciate all'avvio di Xorg, nel file "Xsession" che
 # è uno script che richiama gli script nella directory
 # /etc/X11/Xsession.d/*, ed è qui che metteremo il programma che
 # ci interessa avviare automaticamente genericamente, in realtà i
 # programmi che vogliamo caricare automaticamente dopo il login,
 # dipendono dal login manager, quindi dovremo andare a vedere nel
 # file di configurazione del nostro login manager, ad esempio per
 # gdm3 il file di interesse è in "/etc/gdm3/Xsession"
```
```sh
 /etc/X11/xorg.conf.d
 # qui vengono messe i pezzi di
 # configurazione dell'utente, questi vanno a sovrascrivere la
 # configurazione di default. in quanto nella nuoava veesione di
 # Xorg, non esiste il classico xorg.conf dove esisteva la
 # configrazione globale, ma esistono pezzi di configurazione che
 # possono essere creati dall'utente
```
altri in:

```sh
 /usr/share/X11/xorg.conf.d/
 # qui solutamente vengono messi
 # file di applicazioni che sovrascrivono le impostazioni attuali
 # di xorg, infatti le configurazioni non vengono scritte tutte in
 # un file come una volta, questi file sono impostazioni di
 # default, normalmente invece se l'utente vuole impostare una sua
 # configurazione, deve copiare il file interessato nella
 # directory "/etc/X11/xorg.conf.d/nomeFile.conf", se la directory
 # "xorg.conf.d" in "/etc/X11" non esiste, dobbiamo crearla,
 # normalmente infatti questa non esiste almenochè non abbiamo già
 # modificato alcune cose attraverso questa procedura
```
La modalità standard per decidere che applicazioni avviare
all'avvio di una sessione grafica di uno specifico utente,
dobbiamo inserire il file ".desktop" della relativa applicazione
all'interno della directory ~/.config/autostart/, dove il file
desktop si può creare o si può trovare in "
/usr/share/applications".

Per informazioni aggiuntive, possiamo eseguire:

```sh
 man xorg.conf
 # visualizza le pagine di manuale su xorg
```


## Alcuni file importanti di Xorg

Elenchiamo alcuni file degni di nota:

```sh
 # .Xdefaults (versioni più vecchie o sistemi Unix puri, tipo BSD)
 # o .Xresources (più recente): contiene alcune impostazioni di
 # default di Xorg, oppure configurazioni per applicazioni di Xorg
 # low level, ad esempio qui possiamo trovare le impostazioni di
 # xterm o uxterm, di xclock, xpdf, rxvt-unicode e così via
```
per caricare un file di impostazioni come .Xdefaults o
.Xresources usiamo xrdb e possiamo eseguire:

```sh
 xrdb ~/.Xresources
 # carica le impostazioni con xrdb
```
```sh
 xrdb -q
 # mostra le impostazioni attuali
```


## Login Manager

Il login manager di default è specificato nel file:

```sh
 /etc/X11/default-login-manager
 # file dove è specificato il
 # percorso al login manager di default
```
possiamo cambiare il login manager modificando questo file,
attenzione, in questo file deve essere presente solo un percorso,
non sono ammessi commenti, nel caso il percorso fosse scorretto,
o ci fossero altri caratteri oltre al percorso del login manager,
allora il login manager al riavvio non partirà. E' dalla
configurazione del login manager che possiamo impostare le
applicazioni che devono avviarsi al suo avvio.


## Remap dei Tasti


## Gestione e Remap in ambiente Xorg


In un ambiente grafico con X possiamo usare xmodmap, dopo averlo
installato creiamo il file "~/.Xmodmap" (se non esiste) e
scriviamo al suo interno le seguenti stringhe ad esempio per
eseguire un classico remap, cioè l'assegnazione del tast esc al
tab:

remove Lock = Caps_Lock

keysym Caps_Lock = Escape

questo funziona in un ambiente X con GUI e per poter visualizzare
quale tasto a quale codice corrisponde possiamo utilizzare "xev"
e andare a vedere la stringa corrispondente al nome del tasto che
premiamo. Una volta effettuate le modifiche ci basterà eseguire:

```sh
 xmodmap ~/.Xmodmap
 # ricarica la configurazione prendendo in
 # input il file specificato
```
Per altri esempi, e spiegazione della relativa grammatica,
possiamo consultare l'efficace pagina di man di xmodmap. Con xev
guardo tutti i codici per le impostare in genere tutti i tasti
della tastiera (ad esempio per configurare i tasti Fn), un buon
inizio è guardare il codice del tasto interessato con xev e poi
andare nelle configurazioni del Desktop Environment o del Window
Manager e associare quel codice ad un determinato script/comando.

## Remap in ambiente senza Xorg


In un ambiente text only, dovremo invece andare a scrivere in
append nel file "~/.keymap" le seguenti stringhe:

keycode 1 = Caps_Lock

keycode 58 = Escape

e poi eseguiamo:

```sh
 loakeys ~/.keymap
```
per vedere i codici corrispettivi ai tasti in un ambiente solo
testo senza X, possiamo eseguire:

```sh
 sudo showkey -k
 # mostra i keycode dei tasti che premiamo, per
 # uscire dobbiamo aspettare 10 secondi o premere Ctrl+C che
 # funziona solo se viene eseguito in un ambiente con X
```


## Touchpad e configurazione

In questa sezione vedremo alcuni strumenti generali per la
gestione dei driver Synaptics input driver per i touchpad
Synaptics (e ALPS) che si trovano sulla maggior parte dei
notebook. Uno strumento molto utile, incluso all'interno del
pacchetto "xserver-xorg-input-synaptics", è molto semplice
l'utilizzo, possiamo effettuare:

```sh
 synclient
 # visualizza la configurazione attuale
```
```sh
 synclient TapButton1=1
 # imposta la variabile TapButton uguale
 # a 1, in questo caso stiamo abilitando il click col tocco
 # (tapping) del touchpad
```
Nel caso volessimo rendere standard questa configurazione, allora
dobbiamo copiare il file relativo a synaptics, solitamente
situato in "/usr/share/X11/xorg.conf.d/" nella directory "
/etc/X11/xorg.conf.d" (se non esiste la dobbiamo creare), il file
copiato può avere anche un nome diverso. Ora al suo interno
possiamo inserire l'opzione in append al file, nella sezione
specifica (qui basta leggere un attimo con attenzione il file):

```conf
Option "TabButton1" "1"
```
Al riavvio di X, l'opzione prenderà effetto.

### Gestione dei programmi di default e associazioni

Per associare a specifici tipi di file applicazioni preferite, dobbiamo imparare
a gestire XDG MIME Applications specification.

We can show what is the specific MIME type associated to a file with:
```sh
xdg-mime query filetype photo.jpeg
# will show us the mime type associated to the file photo.jpeg
```

Once we know the MIME type string, we can use this string to understand which
software is associated to this file with:
```sh
xdg-mime query default image/jpeg
# shows the name of the software associated to the mentioned MIME type,
# in this case image/jpeg
```

In order to open a file with its associated software we can do:
```sh
xdg-open filename.ext
# opens filename.ext with its XDG associated software
```

The XDG standard is the most common for configuring desktop environments.
Default applications for each MIME type are stored in mimeapps.list files, which
can be stored in several locations. They are searched in the following order,
with earlier associations taking precedence over later ones:

* `~/.config/mimeapps.list` user overrides
* `/etc/xdg/mimeapps.list` system-wide overrides
* `~/.local/share/applications/mimeapps.list` (deprecated) user overrides
* `/usr/local/share/applications/mimeapps.list` distribution-provided defaults
* `/usr/share/applications/mimeapps.list` distribution-provided defaults




## Utility in ambiente senza X

### setterm


The setterm command can set various terminal attributes:

```sh
 setterm -blank 15 -powersave powerdown -powerdown 60
 # In this
 # example, force screen to turn black in 15 minutes. Monitor
 # standby will occur at 60 minutes
```
```sh
 setterm -underline on; echo "Add Your Important Message Here"; setterm -underline off
 # In this example show underlined text
 # for xterm window
```
```sh
 setterm -cursor off
 # Another useful option is to turn on or
 # off cursor
```
```sh
 setterm -cursor on
 # Turn the cursor on
```


