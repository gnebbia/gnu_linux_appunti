
## Backlight


Su alcuni laptop la gestione del backlight potrebbe non
funzionare bene, in questi casi è consigliabile modificare dei
parametri con cui lanciamo il nostro sistema operativo da grub,
nello specifico andiamo a modificare il file /etc/default/grub
(su molte distro è questo) la linea che dice "
GRUB_CMDLINE_LINUX_DEFAULT", infatti questa voce dovrà essere
qualcosa di simile a questo:

```sh
 GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi=Linux acpi_backlight=vendor"
 # imposta la backlight in modo che venga
 # gestita da specifiche del produttore, nota che i parametri
 # quiet e splash possono essere tolti per fornire un boot e uno
 # shutdown verbose, nel caso dovessimo avere problemi al boot o
 # allo shutdown
```
se questo non funziona possiamo provare con:

```sh
 GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi="
```
oppure altre volte con ad esempio i driver nouveau potrebbe
funzionare una cosa del tipo:

```sh
 GRUB_CMDLINE_LINUX_DEFAULT="nouveau.modeset=0 rd.driver.blacklist=nouveau acpi_backlight=vendor quiet splash"
```
una volta effettuata una di queste modifiche, dobbiamo aggiornare
la configurazione di grub, possiamo farlo con:

```sh
 sudo update-grub
 # aggiorna la configurazione di grub
```
E' inoltre utile sapere che di default avremo una certa
luminosità all'avvio della macchina, comunque questo valore è
settabile tramite l'aggiunta di uno script che parte all'avvio
che esegue:

```sh
 cat /sys/class/backlight/acpi_video0/max_brightness > /sys/class/backlight/acpi_video0/brightness
```

## Distro che non eseguono Boot

A volte potrebbe capitare di avere delle distro che non eseguono
correttamente il boot, ad esempio si fermano sul logo della
distro al boot, in questo caso il motivo molto probabilmente è
legato alla scheda video, possiamo impostare da grub come opzione
al kernel la voce:

```sh
 nomodeset
```
quindi da grub ci basterà schiacciare "e" una volta selezionata
la voce di boot interessata della distro e nella riga che inizia
per "linux" aggiungere in append l'opzione "nomodeset".

You may want to disable KMS for various reasons, such as getting
a blank screen or a "no signal" error from the display, when
using the Catalyst driver, etc. To disable KMS add nomodeset as a
kernel parameter. See Kernel parameters for more info. A volte è
necessario anche aggiungere altre opzioni oltre a nomodeset, in
modo daindirizzare direttamente i nostri driver, come:

```sh
 nomodeset i915.modeset=0 nouveau.modeset=0
```


## ACPI and DSDT

In computing, the Advanced Configuration and Power Interface
(ACPI) specification provides an open standard that the operating
systems can use for computer hardware discovery, configuration,
power management, and monitoring. Internally, ACPI exports the
available functionalities by providing certain instruction lists
as part of the system firmware, which the operating system kernel
interprets and executes to perform desired operations, using a
form of embedded virtual machine. First released in December
1996, ACPI defines platform-independent interfaces for hardware
discovery, configuration, power management and monitoring, and is
designed to replace Advanced Power Management (APM), the
MultiProcessor Specification and the Plug and Play BIOS (PnP)
Specification. ACPI brings the power management under the control
of the operating system, as opposed to the previous BIOS-central
system that relied on platform-specific firmware to determine
power management and configuration policies. The specification is
central to Operating System-directed configuration and Power
Management (OSPM), a system implementing ACPI which removes
device management responsibilities from legacy firmware
interfaces. Intel, Microsoft and Toshiba originally developed the
standard, while HP and Phoenix also participated later.

ACPI can typically be configured from within the operating
system. This is unlike APM where configuration often involves
rebooting and entering the BIOS configuration screens to set
parameters.

ACPI has several different software components:

* a **subsystem which controls hardware states** and functions that
  may have previously been in the BIOS configuration.
  These states include:
    * thermal control
    * motherboard configuration
    * power states (sleep, suspend)
* a **policy manager**, which is software that sits on top of the
  operating system and allows user input on the system policies
* the **ACPI** also has **device drivers** that control/monitor devices
  such as a laptop battery, SMBus (communication/transmission
  path) and EC (embedded controller).

ACPI is to laptop users what oxygen is to mankind. BIOS, by
itself, provides very basic support for all the hardware
typically found inside a laptop. It cannot, for example, handle
what happens on opening/closing the laptop lid, plugging in/out
the the AC adapter, pressing the brightness keys etc. Sleep and
hibernate are two essential features for any laptop user which
are too complex for BIOS to handle. All these laptop-specific
tasks are instead handled by ACPI. The biggest advantage of ACPI
is that it is OS-agnostic. So, ACPI features that work flawlessly
on Windows can be almost always expected to work on Linux (the
almost part will be explained in a moment).

DSDT (Differentiated System Description Table) is a table that
describes the ACPI properties and functions of all your hardware.
If certain ACPI feature is missing or functioning improperly on
your laptop, you can safely put the blame on a badly coded DSDT.
DSDT is written in a language known as ASL (ACPI Source Language)
that looks at lot like C. Just like C, it needs to compiled
before it can be used by the system. This is where the problem
creeps in. ASL compilers are provided by Microsoft and Intel.
Like all things Microsoft, their compiler is far too lenient when
it comes to ASL syntax compared to Intel’s. Hence, DSDTs compiled
using MS compiler are generally buggier and more problematic than
Intel-compiled ones. Windows includes all sorts of hacks to mask
the ineffectiveness of the MS compiler while Linux typically
suffers in some way or the other (laptop not
sleeping/hibernating, fan spinning constantly, brightness keys
not working etc.).

Lament not, you can extract the DSDT of your system, edit it to
fix the errors, and replace the original DSDT with the fixed one
to resolve most issues.

Un pacchetto utile per l'acpi, è il pacchetto "acpi", questo ci
permette di vedere informazioni sulla batteria, eccetera.

Oppure sui sistemi linux un sistema per il power management è "
acpid", che contiene l'eseguibile "acpi_listen" che ci permette
di ascoltare gli eventi dell'acpi.


## Working with the DSDT

The first thing to do is to grab the latest copy of the Intel ASL
Compiler from your distro repositories or the source code from
the download section of the acpica website, or by searching "dsdt"
 or "acpica-tools" or "acpi" from the software repository.

We can extract the DSDT of our system with:

```sh
 sudo cat /sys/firmware/acpi/tables/DSDT > dsdt.aml
```
questo file "dsdt.aml" però sarà per noi illegibile, dobbiamo
quindi decompilarlo attraverso il pacchetto installato per il
dsdt in precedenza, attraverso il comando:

```sh
 iasl -d dsdt.aml
 # decompila il file "dsdt.aml"
```
This will generate a dsdt.dsl file that you can open in any text
editor and start editing. But it’s a better idea to recompile the
file to see if it produces any errors, or if there are any errors
with the compiling tools.

```sh
 iasl -tc dsdt.dsl
 # compila il file dsdt.dsl
```


## Risparmiare potenza e allungare la durata della batteria

Un tool utile a questo scopo è "powertop".

