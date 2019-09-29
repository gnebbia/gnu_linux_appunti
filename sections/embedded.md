
## Creare un Initial Ram File System con sistema di base


Per creare un initial ram filesystem con file di base eseguiamo:

```sh
 mkdir rootfs
```
```sh
 cd rootfs
```
```sh
 mkdir bin dev etc home lib proc sbin sys tmp usr usr/{bin,lib,sbin} var var/log
 # creazione delle directory di base
```
possiamo poi pensare ad esempio di copiare busybox all'interno
del nostro initramfs, e poi una volta fatto dovremo copiare le
librerie, l'insieme minimo è:

* ld-linux
* libc
* libm

nel dubbio cerchiamo la libreria dell'architettura interessata ad
esempio nel caso dell'armhf cerchiamo, ld-linux-armhf.so.3,
libc.so, libm.so. Se voglio risparmiare spazio posso usare "strip"
, col comando file possiamo capire se un file è già stato
strippato o meno, possiamo eseguire strip su arm ad esempio con:

```sh
 arm-linux-gnueabihf-strip libc.so
```
e possiamo eseguirla per tutte le librerie, nel caso non
volessimo avere problemi con le librerie possiamo copiare tutta
la directory delle librerie, con lo strip si riesce a risparmiare
il 20% dello spazio. Esistono inoltre alcuni device di base di
cui abbiamo bisogno per avviare una shell, questi possiamo
crearli con:

```sh
 sudo mknod -m 666 dev/null c 1 3
```
```sh
 sudo mknod -m 600 dev/console c 5 1
```
ora una volta che abbiamo creato il nostro rootfs possiamo creare
l'initial ram disk con:

```sh
 cd rootfs
```
```sh
 find . | cpio -H newc -ov --owner root:root > ../initramfs.cpio
```
```sh
 cd ..
```
```sh
 gzip initramfs.cpio
```
ora questo file "initramfs.cpio.gz" è già leggibile da qemu,
comunque possiamo creare un initramfs da bootare su un device
reale con:

```sh
 mkimage -A arm -O linux -T ramdisk -d initramfs.cpio.gz uRamdisk
```
A questo punto se volessimo risparmiare spazio dobbiamo
considerare una delle seguenti opzioni:

* fare il kernel più piccolo lasciando fuori qualche modulo in più
* fare busybox più piccolo lasciando qualche utility fuori in più
* usare uClibc o musl libc al posto di glibc
* compilare busybox staticamente, (attuabile solo nel caso in cui ci
  devono girare pochissimi programmi sul sistema embedded)

per effettuare il boot di un initramfs ad esempio con Qemu
considerando una board beaglebone:

```sh
 QEMU_AUDIO_DRV=none \ qemu-system-arm -m 256M -nographic -M \
 vexpress-a9 -kernel zImage -append "console=ttyAMA0 rdinit=/bin/sh" \
 -dtb vexpress-v2p-ca9.dtb -initrd initramfs.cpio.gz
```

## Cross Compilare Busybox per arm

Quando dobbiamo cross compilare è sempre buona norma quando si
impostano configurazioni di default come "defconfig" prima
specificare l'architettura, il modo corretto ad esempio per cross
compilare busybox è:

```sh
 make distclean
```
```sh
 make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- defconfig
 # carichiamo le impostazioni di default
```
```sh
 make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- menuconfig
 # per cambiare le impostazioni che vogliamo
```
```sh
 make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf-
 # compiliamo
```
```sh
  make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- install CONFIG_PREFIX=/home/export/rootfs
 # installiamo nella directory che desideriamo
```


## Comunicazione in Seriale

Possiamo connetterci ad un dispositivo seriale, attraverso:

```sh
 screen /dev/ttyUSB0 115200
 # in pratica /dev/ttyUSB0 è un
 # dispositivo d'esempio a cui connetterci e 115200 e la velocità
 # della seriale
```
altri programmi alternativi sono:

```sh
 gtkterm -p /dev/ttyUSB0 -s 115200
```
oppure possiamo provare minicom e picocom.

N.B.: Se abbiamo un device esterno, come ad esempio una
electronic board, un SoC (System on a Chip) o un device con
interfaccia seriale in genere (cioè piedini TX,RX e GND) dobbiamo
utilizzare un circuito FTDI per interfacciarci. Da provare è
anche "stty" ad esempio stty -F /dev/ttyAMA0 9600 ma è da
verificare.

Vediamo un esempio per leggere da seriale con minicom:

```sh
 minicom -b 115200 -o -D /dev/ttyUSB0
 # in questo caso leggiamo
 # da ttyUSB0 alla velocità di 115200
```
attenzione è buona norma ben configurare minicom, possiamo
accedere al menu delle opzioni premendo:

```sh
 # Ctrl+A, e poi Z
```
da qui possiamo entrare nella configurazione con "o" e qui
assicuriamoci che da entrambi i lati della comunicazione sia
impostata la stessa velocità in "baud" e che:

* la voce "Hardware Flow Control" sia impostata su "No"
* la voce "Software Flow Control" sia impostata su "Yes"

possiamo anche salvare le impostazioni come dfl, in questo modo
il setting sarà permanente.

In pratica l'Hardware Flow Control uses extra wires on the serial
port, beyond just GND, TX and RX, a formal "serial port" like the
9 pin RS232 port on old computers includes control lines like
"Data Terminal Ready indicator", so hardware flow control is
telling the computer to expect those extra signals


## GPIO Pins

GPIO mean "General Purpose Input/Output" and is a special pin
present in some chip that can be set as input or output and used
to move a signal high or low (in output mode) or to get the
signal current status (in input mode). Usually these pin are
directly managed by kernel modules but there are an easy way to
manage these pins also from user space.

Standard Linux kernel have inside a special interface allow to
access to GPIO pins. Once executed kernel menuconfig you can
easily verify is this interface is active in your kernel and, in
case, enable them. The kernel tree path is the following:

```
Device Drivers  ---> GPIO Support  ---> /sys/class/gpio/... (sysfs interface)
```

If not, enable this feature and recompile the kernel before
continue to read. The interface to allow working with GPIO is at
the following filesystem path:

```sh
 # /sys/class/gpio
```
Basically if you want to work with a particular GPIO you must
first to reserve it, set the input/output direction and start
managing it. Once you reserved the GPIO and finished to use you
need to free it for allow other modules or process to use them.
This rule is valid in both cases you want to use GPIO from kernel
level or user level. From the user level side this "operation"
for reserve the GPIO is called "export" the GPIO. For make this
export operation you simply need to echo the GPIO number you are
interested to a special path as follow (change XX with the GPIO
number you need):

```sh
 echo XX > /sys/class/gpio/export
```
if the operation is successful (the possible case of operation
failed is explained below) a new "folder" will show up in the
GPIO interface path as example below:

```sh
 /sys/class/gpio/gpioXX/
```
This new "folder" will allow you to work with the GPIO you just
reserved. In particular if you want to set the in/out direction
you simply need to execute the following echo commands:

```sh
 echo "out" > /sys/class/gpio/gpioXX/direction
```
or

```sh
 echo "in" > /sys/class/gpio/gpioXX/direction
```
In case you set out direction you can directly manage the value
of GPIO. You can make this operation by executing additional echo
commands like:

```sh
 echo 1 > /sys/class/gpio/gpioXX/value
```
or

```sh
 echo 0 > /sys/class/gpio/gpioXX/value
```
Since GPIO is a single pin the possible states allowed are high
(1) and low (0). In case you set in direction you can read the
current pin value by using the following command:

```sh
 cat /sys/class/gpio/gpioXX/value
```
Once finished to use your GPIO you can free it by make the same
echo command but to different path:

```sh
 echo XX > /sys/class/gpio/unexport
```
In case of GPIO folder not showed after export operation is very
likely that the GPIO is already reserved by some module. For
verify the current reserved GPIO map you must first verify if in
your kernel is enabled the following feature:

Kernel configuration ---> Kernel hacking ---> Debug FS

As usual, if not enabled, enable it and recompile the kernel. The
next step is to launch the following command line for mount
debugfs:

```sh
mount -t debugfs none /sys/kernel/debug
```

and dump the current GPIO configuration by using:
```sh
cat /sys/kernel/debug/gpio
```

The output will show you the current list og reserved GPIO. Una
libreria molto comoda per gestire il GPIO è "WiringPI", inoltre
ha diversi binding per vari linguaggi di programmazione.

