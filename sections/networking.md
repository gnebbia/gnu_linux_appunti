## Interfacce di rete

E' importante parlare di interfacce quando si parla di
networking, un'interfaccia è tutto quello che ci permette di
avere un'indirizzo ip e una connessione, esempi di interfaccia
possono essere:

* lo: loopback interface
  presente su tuti i sistemi e
  utilizzata da un sistema per riferirsi a se stesso, solitamente
  è assegnato l'indirizzo "127.0.0.1" ma può assumere tutti gli
  indirizzi nel range 127.0.0.0/8 address block. That is,
  127.0.0.1 through 127.255.255.254 all represent your computer.
* vpn: interfaccia per rete vpn
* ppp: interfaccia per connessione point to point
* eth: interfaccia ethernet
* wlan: interfaccia wlan
* ecc...


## Socket

A network socket is an endpoint of an inter-process communication
across a computer network. Today, most communication between
computers is based on the Internet Protocol; therefore most
network sockets are Internet sockets.

A socket API is an application programming interface (API),
usually provided by the operating system, that allows application
programs to control and use network sockets. Internet socket APIs
are usually based on the Berkeley sockets standard.

A socket address is the combination of an IP address and a port
number, much like one end of a telephone connection is the
combination of a phone number and a particular extension. Based
on this address, internet sockets deliver incoming data packets
to the appropriate application process or thread.

Un socket, in informatica, nei sistemi operativi moderni, indica
un'astrazione software progettata per poter utilizzare delle API
standard e condivise per la trasmissione e la ricezione di dati
attraverso una rete oppure come meccanismo di IPC (interprocess
communication, cioè comunicazione tra processi). È il punto in
cui il codice applicativo di un processo accede al canale di
comunicazione per mezzo di una porta, ottenendo una comunicazione
tra processi che lavorano su due macchine fisicamente separate.
Dal punto di vista di un programmatore un socket è un particolare
oggetto sul quale leggere e scrivere i dati da trasmettere o
ricevere. Ci sono due tipi fondamentali di socket:

* IP socket, usati in molti sistemi operativi per le comunicazioni 
    attraverso un protocollo di trasporto (come TCP o UDP);
    Esistono due tipi di socket IP:
    * LISTEN, che rappresentano la possibilità di ricevere nuove
        connessioni. Un socket di questo tipo è identificato dalla
        terna protocollo di trasporto, indirizzo IP del computer,
        numero di porta;
    * ESTABLISHED, che rappresentano una particolare connessione
        attiva. Un socket di questo tipo è identificato dalla 5-tupla
        protocollo di trasporto, indirizzo IP sorgente, indirizzo IP
        destinazione, numero di porta sorgente, numero di porta
        destinazione.

* Unix domain socket, detti anche socket locali o socket in
    dominio Unix), usati nei sistemi operativi POSIX per le
    comunicazioni tra processi residenti sullo stesso computer.

In base alla modalità di connessione, inoltre, si distinguono:

* Stream socket: connection-oriented, basati su TCP;
* Datagram socket: connectionless, basati su UDP;
* Raw socket: utilizzati per lo sviluppo di protocolli.

I socket sono stati introdotti nel 1983 in BSD e poi sono stati
ripresi da praticamente tutti gli altri sistemi operativi. Per
questo motivo solitamente le funzioni di programmazione dei
socket vengono chiamate Berkeley socket API. Si consiglia di dare
un'occhiata alla pagina inglese di wikipedia, per informazioni
dettagliate sull'argomento.


## Calcolo di Indirizzi IP

Possiamo trovare informazioni su un indirizzo di rete o un indirizzo IP con
subnet mask con un programma chiamato `ipcalc`, nonostante questo programma non
sia installato by default in genere, e' un tool molto utilizzato per questo tipo
di operazioni, vediamone un esempio:

```sh
ipcalc 192.168.1.0/16
```

## Alcune informazioni utili su IPv4

Esistono alcune convenzioni che vengono seguite nell'assegnazioni
di indirizzi in una rete:

* 192.168.1.1 "Default gateway"
* 192.168.1.2 "Firewall"
* 192.168.1.5 "DNS/Active Directory/LDAP"
* 192.168.1.100 "SNMP or Monitoring"
* 192.168.1.255 "Network Broadcast" (questo a differenza degli altri è uno standard)

## Indirizzi IP Privati


Una piccola tabella rappresentante gli indirizzi IP privati,
questa scelta è stata fatta per la scarsità degli indirizzi
pubblici con IPv4.

|     Nome      | Indirizzo Iniziale  | Indirizzo Finale  |        Classi          |    Blocco CIDR più grande    |
|:-------------:|:-------------------:|:-----------------:|:----------------------:|:----------------------------:|
| 24-bit block  |      10.0.0.0       |  10.255.255.255   |   Singola Classe A     |    10.0.0.0/8 (255.0.0.0)    |
| 20-bit block  |     172.16.0.0      |  172.31.255.255   | 16 Classi B Contigue   | 172.16.0.0/12 (255.240.0.0)  |
| 16-bit block  |    192.168.0.0      | 192.168.255.255   | 256 Classi C Contigue  | 192.168.0.0/16 (255.255.0.0) |


Ricorda che l'IPv6 non ha questa distinzione tra indirizzi privati e pubblici.

Questi indirizzi vengono in genere chiamati "non globally-routable" oppure
si parla di spazio "non globally routable" (say ULA IPv6 or RFC1918 IPv4).

Nota che in genere le schede di rete droppano pacchetti non indirizzati a loro.
Cio' vuol dire che accetteranno tutti i pacchetti diretti al loro indirizzo IP,
agli indirizzi di broadcast (indicati con `ip a`) e agli indirizzi di multicast,
(indicati con `netstat -ng`).

Ricorda che possiamo aggiungere un'interfaccia di rete a diversi gruppi di
multicast, ad esempio su alcune macchine GNU/Linux, potremmo vedere di default
tutto il traffico multicast per mDNS, ma ad esempio non visualizzare il traffico
in multicast SSDP per l'assenza del relativo indirizzo di multicast.
Vedere sotto come aggiungere un indirizzo di multicast ad una interfaccia di
rete.

## ifconfig

Se abbiamo installato il pacchetto net-tools in cui risiede il
comando ifconfig possiamo effettuare un:

```sh
 ifconfig
 # visualizza la lista delle interfacce di rete con le
 # relative informazioni
```
In assenza di ifconfig possiamo effettuare un:

```sh
 ip a
 # visualizza la lista delle interfacce di rete con le
 # relative informazioni, è analogo al precedente
```
Vediamo alcuni esempi di comandi di rete:

```sh
 ifconfig eth0 down
 # in questo caso spegniamo l'interfaccia
 # eth0
```
```sh
 ifconfig eth0 up
 # in questo caso accendiamo l'interfaccia eth0
```
```sh
 ifconfig eth0 promisc
 # in questo caso accendiamo l'interfaccia
 # eth0 in modalità "promiscua"
```
```sh
 ifdown --all
 # spegne tutte le interfacce
```
Per le reti wifi, una volta veniva utilizzato "iwconfig", ma ora
è deprecato e viene utilizzato invece al suo posto il programma "
iw", mentre ifconfig è deprecato in favore di "ip".

Per conoscere il nostro IP esterno invece dobbiamo fare il
retrieving da un sito esterno, il modo più semplice al momento è:

```sh
 curl ifconfig.me
 # scarica attraverso curl, l'informazione
 # fornita dal sito ifconfig.me che fornisce il mio IP esterno
```
in alternativa possiamo eseguire:
```sh
 curl ipecho.net/plain
```

possiamo anche utilizzare:
```sh
 curl ipinfo.io
```

oppure utilizzare lo stesso comando ricavare
informazioni su un IP è:

```sh
 curl ipinfo.io/74.207.244.221
 # mi da informazioni sull'ip
 # fornito, in questo caso è stato utilizzato un IP d'esempio
```
nel caso usassimo un proxy socks, possiamo controllare in modo
veloce il nostro ip esterno attraverso:

```sh
 curl --socks5 127.0.0.1:9050 http://checkip.amazonaws.com/
```


## ip

In pratica al posto di ifconfig e del relativo pacchetto di
appartenenza "net-tools", che è ritenuto ormai deprecato,
oggigiorno dovrebbe essere utilizzato ip e il relativo pacchetto "
iproute2", vediamo alcuni comandi d'esempio:

```sh
 ip addr show
 # mostra gli indirizzi ip, simile ad ifconfig -a
```
```sh
 ip neigh
 # mostra la tabella arp, simile ad un "arp -na"
```
```sh
 ip addr add 192.168.1.103/24 dev wlan0
 # assegna
 # all'interfaccia wlan0 l'indirizzo ip indicato, se siamo già
 # connessi dovremo sconnetterci e riconnetterci per vedere i
 # cambiamenti
```
```sh
 ip a add 192.168.1.200/255.255.255.0 dev eth0
 # imponiamo sia
 # indirizzo ip che subnet mask adll'interfaccia eth0
```
```sh
 ip addr del 192.168.50.5/24 dev eth1
 # in questo caso
 # eliminiamo un indirizzo ip
```
```sh
 ip addr show
 # mostra gli indirizzi ip, mostra più informazioni
 # di "ip link list"
```
```sh
 ip link set eth0 up
 # accendo l'interfaccia eth0
```
```sh
 ip link set eth0 down
 # spengo l'interfaccia eth0
```
```sh
 ip route help
 # mostra l'help per l'opzione route di ip
```
```sh
 ip route show
 # mostra la tabella di routing
```
```sh
 ip route get 8.8.8.8
 # mostra a quale indirizzo si appoggia per
 # arrivare all'indirizzo ip menzionato, utile per
 # troubleshooting, o per capire con quale interfaccia mi sto
 # connettendo ad internet od ad una determinata rete
```
```sh
 ip route add 10.10.20.0/24 via 192.168.50.100 dev eth0
 # aggiunge una voce alla tabella di routing
```
```sh
 ip route del 10.10.20.0/24
 # rimuove una voce dalla tabella di
 # routing
```
```sh
 ip route add default via 192.168.50.100
 # setto il default
 # gateway, cioè in pratica l'interfaccia con cui cui mi collego
 # ad internet, ricordiamo che non possiamo eliminare tutte le
 # voci di default in tutti i casi, quando abbiamo degli errori,
 # anzichè eliminare l'interfaccia di default aggiungiamone una
```
```sh
 ip route del default via 192.168.50.100
 # elimino il default
 # gateway associato all'indirizzo menzionato
```
```sh
 ip -s link
 # mostra le statistiche di rete
```
```sh
 ip -s -s link
 # mostra ancora più statistiche di rete
```
```sh
 # ip monitor all
```

Per visualizzare i gruppi multicast assegnati a ciascuna scheda di rete
possiamo eseguire:
```sh
ip maddr show
```

Per aggiungere una interfaccia di rete ad un gruppo multicast,
in questo caso al gruppo multicast relativo al protocollo SSDP,
possiamo eseguire:
```sh
ip addr add 239.255.255.250 dev eth1 autojoin
# dove eth1 e' l'interfaccia di rete considerata
# mentre 239.255.255.250 e' l'indirizzo di multicast del protocollo
# SSDP
```

Nota che alcune distro user-friendly come ubuntu alcuni indirizzi di multicast
non compaiono nell membership, ma comunque le macchine ricevono traffico (devo
ancora scoprire che trick c'e' sotto, questo e' da verificare in realta'
perche' questo comportamento era presente su una mint VM di windows, quindi
probabilmente il traffico era forzato dalla macchina Windows).


## ip vs ifconfig

Vediamo una piccola tabella di confronto per i due tool ip ed ifconfig:
net-tools 			iproute2
ifconfig 			ip addr, ip link
ifconfig (interface stats) 	ip -s link
route 				ip route
arp 				ip neigh
netstat 			ss
netstat -M 			conntrack -L
netstat -g 			ip maddr
netstat -i 			ip -s link
netstat -r 			ip route
iptunnel 			ip tunnel
ipmaddr 			ip maddr
tunctl 				ip tuntap (since iproute-2.6.34)
(none) for interface rename 	ip link set dev OLDNAME name NEWNAME
brctl 				bridge (since iproute-3.5.0)


Possiamo consultare il link sottostante per una lista di motivi per non usare
piu' ifconfig ma invece sempre preferire ip o in genere il pacchetto iproute2.
[ifconfig sucks](http://inai.de/2008/02/19)


## iw

La suite di comandi "iw" gestisce le interfaccie wireless.
Per connetterci ad un AP che non utilizza un sistema di autenticazione oppure
che usa WEP possiamo utilizzare `iw connect`.
In caso contrario, nel caso in cui il sistema di autenticazione e' WPA/WPA2
allora dobbiamo fare uso di `wpa_supplicant`.

Vediamo alcuni esempi di utilizzo di iw.

```sh
 iw help
 # mostra l'help
```
```sh
 iw list
 # mostra informazioni dettagliate sull'hardware, questo
 # è utile per capire anche le modalità di lavoro supportate da
 # una scheda di rete, ad esempio possiamo verificare se la nostra
 # scheda di rete può funzionare da Access Point, questo è
 # verificato se esiste la stringa "AP" nelle voci "Supported
 # interface modes:" allora sicuramente può fare da Access Point
```
```sh
 iw dev
 # mostra tutte le interfaccie wireless, questo mi
 # mostrerà alcune informazioni come:

 # * Designated name: phy#1
 #
 # * Device names: wlan0
 #
 # * Interface Index: 4. Usually as per connected ports (which can
 #     be an USB port).
 #
 # * Type: Managed. Type specifies the operational mode of the
 #     wireless devices. managed means the device is a WiFi station
 #     or client that connects to an access point.
```

```sh
 iw dev wlan scan
 # esegue una scansione delle reti disponibili
```
```sh
 iw event
 # si mette in ascolto di eventi
```
```sh
 iw event -f
 # si mette in ascolto di eventi in tempo reale,
 # utile per il debugging
```
```sh
 iw event -t
 # si mette in ascolto di eventi in tempo reale, con
 # informazioni anche sul tempo, utile per il debugging
```
```sh
 iw wlan0 connect apName
 # si collega all'access point chiamato "
 # apName"
```
```sh
 iw wlan0 connect apName 2432
 # si collega all'access point
 # chiamato "apName", nel caso ci fossero più Access point con
 # questo nome, in questo caso specifichiamo la frequenza dell'AP
 # desiderato
```
```sh
 iw wlan0 connect apName keys 0:abcde d:1:0011223344
 # si
 # connette all'access point chiamato "apName" con encryption WEP
 # attraverso la chiave menzionata
```
```sh
 iw dev wlan1 station dump
 # mi da informazioni statistiche
 # sulla connessione all'access point
```
```sh
 iw dev wlan0 set power_save on
 # imposta il power save su on
```
```sh
 iw dev wlan0 get power_save
 # mi dice se sull'interfaccia
 # specificata è impostato il power save
```
```sh
 iw dev moni0 del
 # rimuove l'interfaccia moni0
```
```sh
 ip link show wlan0
 # mostra info sull'interfaccia wlan0, se
 # vedo la parola "DOWN", significa che l'interfaccia è spenta,
 # mentre se vedo "UP", significa che l'interfaccia è attiva
```
```sh
 ip link set wlan0 up
 # attiva l'interfaccia wlan0
```
```sh
 iw wlan0 link
 # mostra se l'interfaccia è collegata a qualcosa
 # o meno
```
```sh
 iw wlan0 scan
 # esegue una scansione delle reti disponibili
```
```sh
 iw reg set US
 # sets the power level of the wifi card on US
 # level
```
```sh
 iwconfig wlan0 txpower 27
 # changes the power level to 27dBm,
 # only if for the current selected country is allowed this power
 # level, if not, we can still change the country
```
```sh
 iw reg set BO
 # sets the power level of the wifi card on
 # Bolivia
```
```sh
 iwconfig wlan0 txpower 28
 # changes the power level to 27dBm,
 # only if for the current selected country is allowed this power
 # level, if not, we can still change the country
```
```sh
 ifconfig wlan1 down; iwconfig wlan0 mode monitor
 # imposta la
 # scheda di rete in modalità monitor (per sniffare il traffico)
```
```sh
 ifconfig wlan1 down; iwconfig wlan0 mode managed
 # imposta la
 # scheda di rete in modalità managed (modalità classica che
 # utilizziamo per connetterci ad un access point)
```
Per connetterci ad una rete WPA/WPA2, una volta che l'interfaccia
di rete wireless è attiva eseguiamo:

```sh
 wpa_passphrase ApName myExampleApPassword >> /etc/wpa_supplicant.conf
 # salva un file di configurazione che
 # può essere utilizzato da wpa_supplicant per connettersi alla
 # rete wifi wpa/wpa2
```
```sh
 wpa_supplicant -B -D nl80211,wext -i wlan0 -c /etc/wpa_supplicant.conf
 # dove:
 # * -B means run wpa_supplicant in the background
 # * -D specifies the wireless driver, wext is the generic driver
 # * -c specifies the path for the configuration file.
```
se questo non dovesse essere abbastanza allora eseguiamo:

```sh
 dhclient wlan0
 # eseguiamo una richiesta DHCP all'interfaccia
 # wlan0
```
Ricordiamo che alcuni device wifi usano un vecchio driver
chiamato "wext" (wireless extension) e non i più recenti nl80211,
per verificare se il nostro kernel ha abilitato il supporto wext
possiamo eseguire:

```sh
 zgrep WEXT /proc/config.gz
 # dove il percorso menzionato deve
 # essere il file di configurazione del kernel
```
Per scrivere gli script o ottenere informazioni sulla rete wifi,
possiamo usare "wgetid", è un tool che ci fornisce informazioni
in modo molto chiaro e veloce, molto utile per ottenere
informazioni, ad esempio con "iwgetid -r" per ottenere il nome
dell'access point a cui sono connesso.


## Arp

Possiamo visualizzare la tabella di associazione indirizzo IP,
mac address locale interrogando il sistema con:

```sh
 sudo arp
 # visualizza la tabella locale del sistema
```
oppure effettuare interrogazione in funzione di un indirizzo IP
con:

```sh
 sudo arp 192.168.0.1
 # visualizza il mac address dell'indirizzo
 # IP menzionato
```


## Modalità wireless 802.11

Questo protocollo prevede 4 modalità operative:

* **Master mode** (also called AP or infrastructure mode) is used to
  create a service that looks like a traditional access point.
  The wireless card creates a network with a specified name
  (called the SSID) and channel, and offers network services on
  it. While in master mode, wireless cards manage all
  communications related to the network (authenticating wireless
  clients, handling channel contention, repeating packets, etc.)
  Wireless cards in master mode can only communicate with cards
  that are associated with it in managed mode.
* **Managed mode** is sometimes also referred to as client mode.
  Wireless cards in managed mode will join a network created by a
  master, and will automatically change their channel to match
  it. They then present any necessary credentials to the master,
  and if those credentials are accepted, they are said to be
  associated with the master. Managed mode cards do not
  communicate with each other directly, and will only communicate
  with an associated master.
* **Ad-hoc mode** creates a multipoint-to-multipoint network where
  there is no single master node or AP. In ad-hoc mode, each
  wireless card communicates directly with its neighbors. Nodes
  must be in range of each other to communicate, and must agree
  on a network name and channel.
* **Monitor mode** is used by some tools (such as Kismet, chapter
  six) to passively listen to all radio traffic on a given
  channel. When in monitor mode, wireless cards transmit no data.
  This is useful for analyzing problems on a wireless link or
  observing spectrum usage in the local area. Monitor mode is not
  used for normal communications.


## Network Manager

Un comune software per la gestione delle connessioni è network
manager, questo può essere usato in tre modalità:

```sh
 nm-applet
 # modalità grafica
```
```sh
 nmtui
 # interfaccia tui, molto intuitiva e comoda
```
```sh
 nmcli
 # programma utilizzato sia da terminale che negli script
```
siccome i primi due sono molto intuitivi e non hanno bisogno di
ulteriore documentazione per le operazioni di base ci
focalizzeremo sul terzo.


## nmcli

Vediamo alcuni comandi di base di nmcli:

```sh
 nmcli device wifi list
 # mostra la lista degli access point wifi
```
```sh
 nmcli device wifi rescan
 # rieffettua lo scan degli access point disponibili
```
```sh
 nmcli device wifi connect <SSID|BSSID>
 # ci connettiamo ad una rete wifi aperta
```
```sh
 nmcli device wifi connect <SSID|BSSID> password <password>
 # ci connettiamo ad una rete protetta sia wpa1 che wpa2
```
```sh
 nmcli device status
 # mostra lo stato delle varie connessioni e
 # lo stato dei device di rete, ad esempio se sono connesso e a
 # quale rete sono connesso con quale device
```
```sh
 nmcli connection show
 # visualizza la lista delle connessioni
```
```sh
 nmcli connection edit con-name <name of new connection>
 #  crea una nuova connessione chiamata con un nome deciso da noi
```
```sh
 nmcli connection edit <connection name>
 # modifica la connessione identificata col nome menzionato
```
```sh
 nmcli connection up id <connection name>
 # mi collego alla connessione menzionata
```
```sh
 nmcli connection down id <connection name>
 # mi scollego dalla connessione menzionata
```
il comando più utile è comunque:

```sh
 man nmcli-examples
 # pagina di man con diversi esempi di applicazione
```


## Gestione della rete con Network Manager oppure no?

I file di configurazione di network manager sono situati nella
directory:

```sh
 # /etc/NetworkManager
```
un file importante è "/etc/NetworkManager/system-connections"
questo contiene tutte le password dei wifi a cui ci siamo
collegati.

Per fare in modo di disabilitare network manager dobbiamo
disabilitareil corrispettivo demone, con ad esempio:

```sh
 sudo systemctl disable NetworkManager.service
```
attenzione in quanto il file /etc/network/interfaces ci potrà
sembrare strano quando gestiamo la rete con NetworkManager in
quanto conterrà solo l'interfaccia di loopback, in realtà questo
è normale, in quanto NetworkManager gestisce le interfacce a modo
suo, comunque c'è un modo all'interno del file di configurazione
per indicargli di leggere i file di configurazione di sistema. Si
consiglia comunque di leggere il file qui sotto riportato per la
gestione della configurazione di NetworkManager:

```sh
 less /usr/share/doc/network-manager/README
 # visualizza la documentazione di network manager
```


## Bridge

Possiamo configurare un bridge, con due schede di rete ethernet
(non wifi) attraverso il programma "brctl", per vedere le opzioni
disponibili eseguiamo:

```sh
 brctl
 # visualizza tutte le opzioni disponibili
```
vediamo altri esempi di applicazione del comando:

```sh
 brctl addbr br0
 # crea il bridge chiamato br0
```
```sh
 brctl delbr br0
 # elimina il bridge chiamato br0
```
```sh
 brctl addif br0 eth0
 # aggiunge il device eth0 al bridge
```
```sh
 brctl addif br0 eth1
 # aggiunge il device eth1 al bridge
```
```sh
 brctl show
 # mostra i vari bridge configurati
```
```sh
 brctl showmacs br0
 # mostra i mac address del bridge indicato
```
```sh
 ifconfig br0 up
 # attiva l'interfaccia bridge
```
## Esempio di configurazione


Uno scenario d'esempio per configurare una macchina come bridge
puro è:

```sh
 ifconfig eth0 0.0.0.0
```
```sh
 ifconfig eth1 0.0.0.0
```
```sh
 brctl addbr mybridge
```
```sh
 brctl addif mybridge eth0
```
```sh
 brctl addif mybridge eth1
```
```sh
 ifconfig mybridge up
```
in questo caso il bridge non avrà un proprio indirizzo IP, quindi
non potremo farci accesso via TCP/IP, nel caso volessimo invece
assegnargli un indirizzo IP, allora sostituiamo l'ultima
istruzione con:

```sh
 ifconfig mybridge 192.168.100.5 netmask 255.255.255.0
```
oppure nel caso in cui volessimo assegnargli un indirizzo IP con
il DHCP eseguiamo:

```sh
 dhclient mybridge
```


## Connessione Point to Point (PPP) tra due Host

Possiamo connettere due computer tramite cavo ethernet cross
oppure tramite classico cavo "straight" se le schede di rete
(almeno una delle due (da verificare)) lo permettono, la
configurazione è semplicissima, basta effettuare sulla macchina
A:

```sh
 sudo ifconfig eth0 192.168.0.5
 # imposto un IP per la macchina A
```
mentre sulla macchina B

```sh
 sudo ifconfig eth0 192.168.0.6
 # imposto un IP per la macchina B
```
la scelta dell'IP è arbitraria, ma è meglio ad esempio scegliere
una rete diversa rispetto ad esempio ad un'altra interfaccia,
cioè se ad esempio abbiamo su un'altra interfaccia wlan0 wireless
l'indirizzo ip 192.168.1.4 non andrò ad impostare un indirizzo
.1.x sulla mia interfaccia eth0, in modo da rendere più lineare
possibile la comunicazione e non avere conflitti.


## Configurazione di rete su distro Debian based

Nelle distro Debian-based le interfacce sono configurate
attraverso il file "/etc/network/interfaces", e la directory "/etc/network/"
è dove sono collocati gli script di rete, vediamo
un esempio di configurazione classico del file interfaces:

```conf
auto lo

iface lo inet loopback

#
auto eth0
iface eth0 inet static #utilizza un ip statico
address 192.168.1.17
netmask 255.255.255.0
gateway 192.168.1.1
network 192.168.1.0
broadcast 192.168.1.255
dns-nameservers 192.168.1.195

# così imposto staticamente una voce della tabella di routing
up ip route add -net 192.168.1.128 netmask 255.255.255.128 gw 192.168.1.2

up ip route add default gw 192.168.1.200
down ip route del default gw 192.168.1.200
down ip route del -net 192.168.1.128 netmask 255.255.255.128 gw 192.168.1.2
```

una volta modificato il file, ci basterà riavviare il servizio di
rete attraverso:

```sh
 service networking restart
 # o utilizzando il comando
 # systemctl, anche se per grossi cambiamenti è più sicuro
 # eseguire un reboot
```

Possiamo notare nel file che le linee che iniziano con "auto"
servono ad identificare interfacce fisiche che vengono attivate
col comando "ifup -a" o ad esempio negli script di sistema. Le
riche "up" e "down" possono essere presenti per ogni interfaccia
e indicano le operazioni da effettuare per "up" quando
l'interfaccia viene accesa e per "down" quando l'interfaccia
viene spenta, sono possibili anche direttive come "pre-up" e "post-down".

Vediamo un altro esempio di file di configurazione:

```conf
auto lo
iface lo inet loopback
#
auto eth0
iface eth0 inet dhcp # utilizza un indirizzo dhcp
gateway 192.168.1.1
```

In questo caso dopo inet viene specificata la direttiva "dhcp",
quindi viene usato il dhcp al posto di un indirizzo statico come
nel caso precedente.

Vediamo ora un altro esempio:

```conf
auto lo iface lo inet loopback
auto wlan0 iface wlan0 inet static address 192.168.1.104 gateway 192.168.1.1
\netmask 255.255.255.0 network 192.168.1.0 broadcast 192.168.1.255
pre-up sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf -D wext
post-down sudo killall -q wpa_supplicant
```

In questo caso andiamo a collegarci attraverso `wpa_supplicant` ad
una rete wifi.

N.B.: Ricordiamo di consultare per esempi la pagina di man
interfaces(5) con:

```sh
 man 5 interfaces
 # visualizza la pagina di man del file
 # interfaces per la configurazione della rete su distro Debian based
```


## Configurazione di rete su distro Red-Hat/CentOS based

Nelle distro basate su Red-Hat le configurazioni delle interfacce
sono collocate in "/etc/sysconfig/network-scripts", in questa
directory abbiamo molti script e file, quelli che interessano
maggiormente a noi possiamo visualizzarli con:

```sh
 ls -al ifcfg*
 # per configurazione indirizzo/subnet/gw
```
```sh
 ls -al route*
 # per configurazione voci della tabella di
 # routing
```
troveremo un file per ogni interfaccia, supponiamo di avere
un'interfaccia chiamata "eth0", allora avremo qualcosa del tipo "
ifcfg-eth0", aprendo questo file con un editor di testo, possiamo
visualizzare le diverse opzioni, vediamo ad esempio un file che
imposta un indirizzo ip statico:

```conf
DEVICE=eth0
BOOTPROTO=none
ONBOOT=yes
NETWORK=10.0.1.0
NETMASK=255.255.255.0
IPADDR=10.0.1.27
USERCTL=no
```

vediamo ora invece un file che utilizza dhcp per l'indirizzo ip:

```conf
DEVICE=eth0
BOOTPROTO=dhcp
ONBOOT=yes
```

per impostare invece una voce nella tabella di routing avremo un
file tipo "route-eth0" così costruito:

```conf
10.10.20.0/24 via 192.168.50.100 dev eth0
```
per riavviare i servizi di rete ad esempio dopo una modifica,
eseguiamo:

```sh
 sudo /etc/init.d/network restart
 # riavvia il servizio di rete,
 # anche se per grossi cambiamenti è più sicuro eseguire un reboot
```


## File di networking importanti

Vediamo ora una serie di file molto importanti per la
configurazione di rete.


### Il file resolv.conf

Il file resolv.conf è utilizzato per definire i server DNS,
cercare domini e gestire active directory. Esistono tuttavia
delle differenze tra le distro basate su Debian e quelle basate
su Red-Hat.

###  Distro Debian-Based

Il file resolv.conf è localizzato in "/etc/resolv.conf", possiamo
aggiungere l'indirizzo del server DNS aggiungendo una voce:

```txt
nameserver 8.8.8.8
# abbiamo aggiunto il DNS server 8.8.8.8
```

Un altro esempio tipico di configurazione potrebbe essere questo:

```txt
nameserver 8.8.8.8
nameserver 8.8.8.4
search myowndomain.xyz
```
In questo caso diciamo che il nameserver principale e' 8.8.8.8 mentre
quello secondario e' 8.8.8.4, e poi indichiamo come dominio di
default di ricerca "myowndomain.xyz", questo significa che di default
nel momento proviamo a comunicare con una macchina chiamata "pippo"
automaticamente il nostro resolver provera' a chiamare la macchina
"pippo.myowndomain.xyz". Questa opzione e' molto utile soprattutto nel
momento in cui stiamo installando una macchina all'interno di un
dominio; in questo caso se provassimo ad accedere col nostro browser
ad "http://foo", automaticamente la richiesta avviene a
"http://foo.myowndomain.xyz".

le modifiche saranno applicate subito, senza necessità di
riavviare i servizi di rete, ad ogni modo questa configurazione
sarà temporanea, in quanto al prossimo reboot il file resolv.conf
verrà reimpostato alla sua configurazione originale, per
modificare in modo assoluto la configurazione, andiamo nella
directory "/etc/resolvconf/resolv.conf.d/" e in questa directory
abbiamo due file di configurazione:

```sh
 head
 # in questo file inseriamo le direttive che verranno messe
 # in testa al file resolv.conf, quindi quelle con priorità
 # maggiore
```
```sh
 base
 # in questo file inseriamo le direttive che verranno messe
 # sotto quelle indicate dal file head
```
i nostri nameserver possiamo inserirli all'interno di questi
file, quindi aggiungeremo in uno dei due la direttiva "nameserver
8.8.8.8", una volta fatto, per andare a cambiare il file
resolv.conf attuale eseguiremo:

```sh
 resolvconf -u
 #  disponibile solo su alcune distro Debian-based
```
altre direttive che possono essere date al file resolv.conf oltre
ai nameserver possono essere ad esempio "domain mydomain.local"
se la nostra macchina fa da server DNS per un particolare dominio
o è membro di un dominio. Esistono poi diverse opzioni come "
options timeout:1" che significa, non perdere più di un secondo
per una richiesta DNS oppure "search yourdomain.local", significa
che non siamo membri di un determinato dominio ma vogliamo
includerlo nella ricerca DNS. Vediamo un esempio di file
resolv.conf:

```conf
nameserver 8.8.8.8
nameserver 192.168.1.1
domain mydomain.local
options timeout:1
search yourdomain.local
```


### Il file hosts

Il file "hosts" e collocato nella directory "/etc/hosts",
permette di associare ad indirizzi ip dei nomi. Nella maggior
parte dei casi in questo file di default vedremo:

```conf
127.0.0.1 localhost
127.0.1.1 nomeComputer
```

quindi questo vuol dire che tutte le volte che faremo un ping a
localhost, verrà utilizzato quell'indirizzo. Un caso pratico è,
vogliamo riferirci nella nostra LAN alle varie macchine con nomi
significativi, questo può essere fatto semplicemente con:

```sh
localhost 127.0.0.1
127.0.1.1 nomeComputer
192.168.1.105 jack
192.168.1.114 max
192.168.1.104 serverAndromeda
```

è possibile anche reindirizzare siti web, ad esempio:

```conf
127.0.0.1 localhost
127.0.1.1 nomeComputer
192.168.1.16 www.yahoo.com
192.168.1.16 yahoo.com
```

Ora ogni qualvolta io faccio un ping a www.yahoo.com o a
yahoo.com in realtà verrà fatto un ping all'indirizzo
192.168.1.16 e anche nel browser se la pagina non è in cache,
vedremo il webserver all'indirizzo "192.168.1.16". Possiamo
utilizzare il file hosts anche come filtro, ad esempio, nel caso
volessimo bloccare l'accesso a "www.playboy.com", basterebbe fare
"127.0.0.1 www.playboy.com" e "127.0.0.1 playboy.com", è sempre
meglio mettere tuti i riferimenti ad un sito web, in quanto
solitamente è accessibile almeno con due nomi di dominio. E'
possibile accorpare più domini sotto un solo ip, ad esempio:

```conf
127.0.0.1 localhost
127.0.1.1 nomeComputer
192.168.1.16 www.yahoo.com yahoo.com www.playboy.com playboy.com
```

Nel caso sopracitato stiamo reindirizzando sia richieste verso il
sito di yahoo che richieste verso il sito di playboy verso
l'indirizzo ip specificato.


### Il file hostname

Il file hostname contiene informazioni sul nome della nostra
macchina, il nome con cui possiamo accedere alla nostra macchina
dall'interno o dall'esterno; hostname può essere un file o un
comando o entrambi a differenza della distro utilizzata. Nelle
distro Debian based il file è collocato in "/etc/hostname" mentre
nelle Red-Hat based possiamo visualizzare l'hostname attraverso
la voce "HOSTNAME" all'interno del file "/etc/sysconfig/network".
Esiste anche il comando "hostname", vediamo alcuni esempi
applicativi:

```sh
 hostname
 # visualizza l'hostname corrente
```
```sh
 hostname nomeNuovoHostName
 # imposta un nuovo nome hostname
 # temporaneo alla macchina, infatti al riavvio avremo ancora il
 # nostro hostname precedente, per effettuare modifiche permanenti
 # dovremo andare a modificare i file sopracitati
```

Possiamo visualizzare anche informazioni aggiuntive su molte distro attrverso il
comando `hostnamectl`, semplicement eseguiamo:
```sh
 hostnamectl
 # questo ci mostrera' anche se siamo all'interno di una macchina virtuale
```

Attenzione queste modifiche potrebbero non funzionare se la nostra macchina e'
virtuale ed e' gestita da un server esterno che si occupa di reimpostare i nomi
ad ogni reboot.


### Il file nsswitch.conf


Il "Name Service Switch" (NSS) è un meccanismo nei sistemi
operativi Unix-Like che fornisce una varietà di sorgenti per
configurazioni comuni di database e risoluzione di nomi. Il file
nsswitch esiste quindi in tutte le distro, localizzato sempre
nella stessa posizione cioè "/etc/nsswitch.conf", questo file
regola la priorità che hanno le diverse configurazioni di diversi
elementi, ad esempio l'ordine con cui vengono gestite le risoluzioni
dns, o l'ordine con cui vengono gestiti o acceduti gli account.
Generalmente possiamo affermare che configura i name services del sistema
operativo. Un' esempio esplicativo di riga potrebbe essere:

```sh
 hosts: files dns mdns4
 # questa riga significa: per risolvere i
 # dns prima guarda il file di configurazione di sistema ovvero "/etc/hosts",
 # questo ha la priorità massima, nel caso dovessi
 # avere problemi allora affidati al servizio dns (trovato "/etc.resolv.conf")
 # e stessa cosa per "mdns4".
```
Questo file e' importante quando si gestiscono ambienti simili ad active
directory come LDAP o NIS.

Quindi possiamo ad esempio scegliere con quale priorita' vengono cercati gli
account, se diamo priorita' ad LDAP, allora a quel punto sara' LDAP il
responsabile primario degli account.

Un esempio di file di configurazione (con commenti esplicativi)
potrebbe essere:

```txt
# The entry '[NOTFOUND=return]' means that the search for an
# entry should stop if the search in the previous entry turned
# up nothing. Note that if the search failed due to some other reason
# (like no NIS server responding) then the search continues with the next entry.

# Legal entries are:
# nisplus Use NIS+ (NIS version 3)
# nis Use NIS (NIS version 2), also called YP
# dns Use DNS (Domain Name Service)
# files Use the local files
# db Use the /var/db databases

# [NOTFOUND=return] Ferma la ricerca se la entry non è trovata
# nel servizio appena specificato

passwd: files ldap
shadow: files
group: files ldap
hosts: dns nis files
ethers: files nis
netmasks: files nis
networks: files nis
protocols: files nis
rpc: files [NOTFOUND=return] nis
services: files [NOTFOUND=return] nis
automount: files
aliases: files
```

L'ordine dei servizi elencati determina l'ordina in cui NSS
cercherà di usare questi servizi per resolvere query che vengono
effettuate al sistema. Un programma utile nel caso avessimo un
sistema di risoluzione DNS lento è quello di usare un computer
come cache DNS, questo può essere fatto con programmi tipo "nscd"
o meglio ancora "pdnsd" o "unbound".


### Il file /etc/services

Nel file /etc/services possiamo trovare la lista delle porte più
comuni con i vari servizi associati, possiamo ad esempio
effettuare:

```sh
 grep -iw 21 /etc/services
 # in questo caso ci viene mostrato a
 # quale servizio viene solitamente (per convenzione) associato
 # alla porta 21
```
altri esempi di utilizzo possono essere:

```sh
 grep ssh /etc/services
 # in questo caso ci viene mostrato su
 # quale porta per convenzione girerebbe il servizio ssh
```


## Strumenti di Traffic Control

E' possibile configurare il kernel packet scheduler in GNU/Linux attraverso
l'utility chiamata 'tc'.
In generale possiamo giocare con 'tc' se vogliamo:

* sperimentare con lo scheduler di pacchetti del kernel di GNU/Linux
* simulare particolare situazioni di rete con packet loss o packet delays
* limitare la banda per una particolare connessione di rete

Vediamo di seguito alcuni esempi.

Possiamo aggiungere un **delay costante** ad un'interfaccia di rete con:

```sh
tc qdisc add dev eth0 root netem delay 200ms
# qdisc: modifica lo scheduler (aka queuing discipline)
# add: aggiunge una nuova regola
# dev eth0: selezione l'interfaccia di rete 'eth0' per l'applicazione delle regole
# netem: utilizza il network emulator per emulare una property WAN 
# delay: il nome della network property modificata
# 200ms: il ritardo di aggiunto che e' in questo caso di 200 millisecondi
```

Note: this adds a delay of 200 ms to the egress scheduler, exclusively. If
it were to add the delay to both the ingress and egress schedulers,
the total delay would have totaled 400 ms. In general, all of these
traffic control rules are applied to the egress scheduler only.

Possiamo **mostrare le impostazioni attive** con:
```sh
tc qdisc show  dev eth0
```

possiamo **cancellare tutte le regole presenti su un'interfaccia di rete** con:
```sh
tc qdisc del dev eth0 root
```

Possiamo **aggiungere un delay di 100ms piu' un delay +-10ms distribuiti con
distribuzione uniforme** con:
```sh
tc qdisc change dev eth0 root netem delay 100ms 10ms
```

Oppure possiamo **aggiungere un delay di 100ms con in aggiunta un delay 
con una distribuzione uniforme +-10ms e correlazione 25%**
(in quanto in genere i delay network non sono del tutto casuali) con:
```sh
tc qdisc change dev eth0 root netem delay 100ms 10ms 25%
```

Possiamo **aggiungere un delay di 100ms piu' un delay di +-10ms distribuiti con
distribuzione normale** con:
```sh
tc qdisc add dev eth0 root netem delay 100ms 20ms distribution normal
 ```
Altre opzioni utilizzabili al posto di 'normal' sono 'pareto' e 'paretonormal'.

Possiamo simulare una **perdita di pacchetti del 10%** con:
```sh
 tc qdisc add dev eth0 root netem loss 10%
```

Possiamo anche **corrompere il 5% dei pacchetti, andando ad un introdurre un
single bit error ad un offset random**, con:
```sh
tc qdisc change dev eth0 root netem corrupt 5%
```

Possiamo anche **duplicare l'1% dei pacchetti**:
```sh
tc qdisc change dev eth0 root netem duplicate 1%
```

Vediamo invece ora come limitare la banda.

Possiamo **limitare la banda in uscita 'egress'** con:
```sh
tc qdisc add dev eth0 root tbf rate 1mbit burst 32kbit latency 400ms
# tbf: use the token buffer filter to manipulate traffic rates
# rate: sustained maximum rate
# burst: maximum allowed burst
# latency: packets with higher latency get dropped
```

Il modo migliore per testare queste impostazioni e' attraverso il comando 
`iperf`, possiamo infatti provare a lanciarlo prima e dopo l'applicazione delle
regole per vedere se le modifiche sono state apportate correttamente.
Il comando `iperf` puo' essere lanciato con:
```sh
iperf -c 172.31.0.142
# dove l'indirizzo IP deve essere opportunamente settato
```

## route & ip route

Il comando "route" ci mostrerà il routing attivo sul nostro
sistema, il comando mostra di default diverse colonne, ma le più
importanti sono:
 * **Destination**: Mostra la destinazione, per "default" si intende
   reste del mondo
 * **Gateway**: Indica l'indirizzo di gateway utilizzato per accedere
   agli indirizzi indicati da "Destination"
 * **Genmask**: Indica la subnet mask utilizzata
 * **Flags**: Mostra diversi flag, possiamo leggere una breve
   descrizione eseguendo "man route" e andando a leggere la
   sezione "Flags":
    * U: Questo flag indica che questa voce di routing è "Up", cioè
        attiva

    * G: Questo flag indica che questa voce di routing è relativa
        al gateway, se questa voce non è presenta vuol dire che le
        due reti menzionate sono connesse direttamente

    * H: Questo flag indica che la destinazione è un host, se non è
        presente, allora vuol dire che la destinazione è un intero
        network

    * D: Questo flag indica che questa voce della tabella di
        routing è stata creata da un redirect

    * M: Questo flag indica che questa voce della tabella di
        routing è modificata da un redirect
 * **Iface**: Indica l'interfaccia per cui è valida la regola di routing


Per gli altri campi, basterà leggere il manuale del comando "route".
Per vedere la tabella di routing, eseguiamo:

```sh
 route -n
 # mostra la tabella di routing, ma ho bisogno dei
 # permessi di root
```
Un'alternativa a route, se non si hanno i diritti di root e si
vuole comunque visualizzare la tabella di routing è:

```sh
 netstat -rn
 # mostra informazioni di routing, senza i permessi
 # di root
```

Vediamo alcune applicazioni dei comandi di routing:
```sh
 route add default gw 192.168.1.1
 # aggiunge "add" una voce alla
 # tabella di routing imposta come destinazione "default" e come
 # gateway "192.168.1.1"
```
```sh
 route add -host 192.168.1.3 reject
 # aggiunge una voce alla
 # tabella di routing, atta a rendere non raggiungibile l'host
 # 192.168.1.3, nei flag vedremo "!H"
```
```sh
 route add -net 192.168.1.0 netmask 255.255.255.0 reject
 # aggiunge una voce alla tabella di routing, atta a rendere non
 # raggiungibile l'intero network 192.168.1.0, nei flag vedremo "
 # !H"
```
```sh
 route del default gw 192.168.1.1
 # rimuove una voce dalla
 # tabella di routing, quella avente come destinazione "default" e
 # gateway "192.168.1.1", per rimuovere una voce in pratica
 # aggiungo gli stessi campi come se la stessi reinserendo, solo
 # che al posto della voce "add" metto "del"
```
```sh
 route add -net 10.1.5.0 netmask 255.255.255.0 gw 192.168.1.5
 # rende raggiungibile la rete 10.1.5.0 attraverso il default
 # gateway 192.168.1.5
```
```sh
 route del -net 10.1.5.0 netmask 255.255.255.0 gw 192.168.1.5
 # rimuove la voce inserita nell'esempio precedente
```
In realtà oggigiorno, "route" è deprecato, ed è consigliato
l'utilizzo di "ip route", che ha comunque sintassi simile al
comando precedente, basta solo aggiungere davanti "ip".

You can use the route command's "-ifscope" option to bind a route
to a specific interface. This lets you create multiple routes
that point to the same destination, differentiated only by which
interface is in play. Routes so bound show up in netstat output
with the I flag.


## Ping

Ping è un programma utilizzato a diversi scopi, possiamo testare
reti per connettività, per misurare la congestione all'interno di
una rete, scoprire indirizzi ip di hostname e in genere misurare
la qualità di una rete. Vediamo alcuni esempi di ping:

```sh
 ping www.nomesito.com
 # esegue un ping al sito indicato
```
```sh
 ping -a www.nomesite.com
 # esegue un ping audibile, cioè emette
 # un beep, quando il target diventa disponibile, utile per
 # troubleshooting all'interno di una rete, in cui stiamo facendo
 # manutenzione, in modo che non dobbiamo rieseguire il comando
 # per verificare se il target è raggiungibile o no
```
```sh
 ping -A www.nomesito.com
 # esegue un ping adattativo, cioè le
 # richieste si adattano al Round Trip Time, dobbiamo stare
 # attenti in quanto potrebbe appesantire un server con richieste
 # molto frequenti
```
```sh
 ping -c 10 www.nomesito.com
 # esegue 10 ping
```
```sh
 ping -c 5 -q 127.0.0.1
 # l'opzione "-q" permette di stampare a
 # schermo solo il sommario del traffico generato
```
```sh
 ping -w 10 www.nomesito.com
 # l'opzione "-w" specifica una
 # deadline in termini di tempo (in secondi), quindi in questo
 # caso manderemo pacchetti per 10 secondi
```
```sh
 ping -i 2 www.google.it
 # con l'opzione "-i" specifico
 # l'intervallo alla quale mandare pacchetti in secondi, in questo
 # caso mando un ping ogni 2 secondi
```
```sh
 ping -f www.nomesito.com
 # esegue ping in modalità "flood",
 # manda pacchetti il più velocemente flessibile, bisogna avere i
 # permessi di root per poter lanciare questo comando, e dobbiamo
 # stare attenti in quanto potrebbe appesantire un server con
 # richieste molto frequenti
```

```sh
 ping -b <broadcast_address>
 # esegue ping su tutti gli host nella sottorete, questo e' un buon metodo
 # per capire quali sono gli host attivi in una sottorete
```


```sh
 ping -f -i 2 www.nomesito.com
 # esegue ping in modalità "flood"
 # , ma manda un pacchetto ogni intervallo di 2 secondi
```
```sh
 ping -n www.nomesito.com
 # esegue ping ma non effettua "name
 # resolution"
```
```sh
 ping -q www.nomesito.com
 # esegue ping senza visualizzare
 # output su schermo, e visualizzerà in questo caso il risultato
 # del ping solo quando il processò verrà terminato
```
```sh
 ping -s 100 www.nomesite.com
 # con il flag "-s" (size) cambio
 # la dimensione del payload ICMP dei pacchetti mandati, la
 # dimensione di default in questione è 56 byte, in questo caso
 # questa dimensione viene cambiata a 100 byte, dobbiamo ricordare
 # che l'header dell'ICMP ha una dimensione di 8 byte, inoltre
 # quando viene considerato il pacchetto nella sua dimensione
 # totale dobbiamo aggiungere l'header del pacchetto IP che è 20
 # byte, quindi di default abbiamo 56+8+20 (byte), mentre nel caso
 # in questione la dimensione totale sarà 100+8+20 (byte)
```
```sh
 ping -f -i .5 -c 100 www.nomesito.com > results.txt
 # esegue un
 # ping in modalità flood con intervallo ogni mezzo secondo
 # eseguendo in totale 100 richieste di ping al sito indicato e
 # stampa i risultati nel file "results.txt"
```
```sh
 ping -t 1 www.nomesite.com
 # esegue un ping impostando il ttl a
 # "1", questo è molto utile ad esempio come "hack" quando non
 # possiamo eseguire un traceroute con ICMP, allora possiamo
 # sfruttare il ping per effettuare un traceroute andando mano a
 # mano a modificare il valore di TTL da 1 fino a "n" dove per "n"
 # si intende un nodo per cui anche incrementando il TTL rimane
 # invariato
```
```sh
 ping hop1 hop2 hop3 .. hopN destination
 # in questo modo sto
 # scegliendo il percorso attraverso il quale eseguire il ping,
 # molto utile per eseguire troubleshooting
```
```sh
 ping -R www.nomesito.com
 # mostra tutti gli host che vengono
 # attraversati, utile per capire gli spostamenti del pacchetto
```
Un comando utile durante il ping è "Ctrl+|", questo manda un
segnale di SIGQUIT al processo e mostra una statistica breve al
momento dell'invio del segnale, il processo intanto continua con
la sua normale procedura.


## Traceroute e DNS

### Traceroute

Per poter visualizzare i vari host attraversati per arrivare ad
un certo percorso di rete, possiamo utilizzare traceroute:

```sh
 traceroute www.example.com
 # esegue un traceroute
 # sull'indirizzo indicato
```
che è analogo a:

```sh
 traceroute www.example.com -U
 # esegue un traceroute
 # utilizzando il protocollo UDP, questa opzione su sistemi
 # GNU/Linux può essere omessa, in quanto di default è quello che
 # avviene
```
talvolta il traceroute potrebbe mostrare degli asterischi su
alcuni host, questo è perchè non si riceve risposta da quelle
macchine, questo può essere dovuto a diverse ragioni:

 * il nodo filtra i pacchetti UDP o ICMP
 * tempo di timeout troppo breve
 * il nodo non risponde a pacchetti che hanno TTL=0 con il
   pacchetto "TTL exceeded" e quindi non si riceve risposta

esistono alcune possibili soluzioni, una possibile soluzione al
primo problema è cambiare il protocollo utilizzato dal
traceroute, infatti su GNU/Linux di default viene utilizzato il
protocollo UDP, ma può essere cambiato con:

```sh
 traceroute www.example.com -T
 # esegue un traceroute con il
 # protocollo TCP
```
```sh
 traceroute www.example.com -I
 # esegue un traceroute
 # utilizzando il protocollo ICMP
```
```sh
 traceroute www.example.com -U
 # esegue un traceroute
 # utilizzando il protocollo UDP, è l'opzione di default quindi
 # può anche essere omessa
```
una possibile soluzione invece per il tempo di timeout, potrebbe
essere cambiarlo, questo può essere fatto con:

```sh
 traceroute www.example.com -w 10 -T
 # imposto il tempo di
 # timeout a 10 secondi e utilizzo il protocollo TCP
```
  Spigazione dell'output di traceroute

Nell'output vedremo righe come questa:

```text
fra07s31-in-f23.1e100.net (173.194.112.151)  27.287 ms  26.825 ms 28.280 ms
```

in cui nella prima colonna c'è il nome dell'host, o l'indirizzo
IP se l'host non ha un nome specifico, nella seconda colonna,
l'indirizzo IP, nelle tre colonne successive i vari tempi di RTT,
il traceroute procede finchè i tre pacchetti mandati non sono
persi per più di due volte e quindi il percorso non può essere
valutato. Vediamo un altro esempio di possibile riga risultante
da traceroute:

```text
10.254.0.105 (10.254.0.105)  50.172 ms  50.353 ms 10.254.0.109 (10.254.0.109)  51.629 ms
```

in questo caso, possiamo vedere che al primo e al secondo RTT
veniamo collegati all'indirizzo IP 10.254.0.105, ma al terzo RTT
passiamo per un altro indirizzo IP, questo può essere dovuto alla
configurazione della rete, un esempio potrebbe essere uno
scenario in cui viene effettuato un load balancing, è doveroso
ricordare che generalmente richieste diverse possono essere
reindirizzate a macchine diverse, bisogna anche considerare che i
router effettuano calcoli di percorsi ottimali e scelgono il
percorso più veloce in funzione dell'algoritmo utilizzato, quindi
la scelta del percorso può dipendere da vari fattori, solitamente
i router ad esempio scelgono come prossima macchina quella meno
congestionata, o quella con la banda più larga che porta il
pacchetto un hop più vicino alla destinazione.

N.B.: Ricorda che quando si esegue un traceroute ad un sito ad
esempio www.fsf.org, il primo indirizzo molto probabilmente è il
gateway locale, subito dopo abbiamo l'indirizzo del nodo di
accesso del nostro provider e poi una sfilza di indirizzi privati
appartenenti alla rete locale del nostro provider, fino a quando
non si esce, e si passa su altri server esterni per arrivare poi
infine alla destinazione finale.

A volte il primo indirizzo trovato in un traceroute non
corrisponde a quello del gateway visto con `route -n`, questa situazione
puo' essere spiegata attraverso diverse motivazioni:
* il primo nodo, potrebbe non alterare il valore TTL lasciandolo a 1
  e fare semplicemente forward al nodo successivo
* il primo nodo potrebbe avere piu' interfacce di rete quindi utilizzare
  indirizzi IP diversi, quindi ad esempio in route -n vedrei l'indirizzo
  IP di ingresso mentre con traceroute l'indirizzo in uscita
* e' presente un meccanismo di VRRP

Il protocollo (VRRP) Virtual Router Redundancy Protocol, permette
una struttura di rete più robusta, questo è reso possibile dalla
creazione di router virtuali, che sono una rappresentazione astratta
di un insieme di router, es. master e backup router, che opera come un gruppo.
Il default router assegnato ad un host è il router virtuale, non il
router fisico. Se il router fisico che sta attualmente
instradando si rompesse, un altro router fisico verrebbe
selezionato per rimpiazzarlo. Il router fisico che sta inoltranto
i pacchetti in un dato istante è detto master router.

Un altro protocollo simile a VRRP è Hot Standby Router Protocol
(HSRP) ma è proprietario e di Cisco.

Or still another option is the Common Address Redundancy Protocol
or "CARP" is a computer networking protocol which allows multiple
hosts on the same local area network to share a set of IP
addresses. Its primary purpose is to provide failover redundancy,
especially when used with firewalls and routers. In some
configurations, CARP can also provide load balancing
functionality. CARP provides functionality similar to VRRP and to
Cisco Systems' HSRP. It is implemented in several BSD-based
operating systems and has been ported to Linux.

Un'alternativa a traceroute più completa è costituita da
programmi come "mtr" che forniscono anche statistiche, per capire
qual'è il collo di bottiglia su una rete.


#### Motivo per asterischi in traceroute indipendentemente dal protocollo

```text
This is because some machines don't send ICMP "TTL exceeded"
errors, that's all to not respond to ICMP or that

<> ok but what about TCP ? and UDP ?

<grawity> it has nothing to do with what protocol the original
packets use

<grawity> no matter what you send, traceroute works by receiving
*error messages* back

<grawity> and those are always ICMP

<grawity> maybe some routers don't generate those error packets,
or maybe they have a firewall preventing them from being sent
<UncleDrax> or it's being throttled (since responding to ICMP
takes CPU a very busy router has other things to do with)
```
In generale qualsiasi host non risponde al pacchetto con TTL=0, a volte
questo e' disabilitato per diversi motivi, performance, sicurezza eccetera.

Ricordiamo comunque che alcune volte non possiamo determinare chi sono gli host
dietro gli asterischi `* * *` ed e' comunque doveroso ricordare che bisogna
prendere con le pinze i risultati di un traceroute.
Ad esempio alcuni host potrebbero semplicemente non alterare il valore del TTL
e semplicemente fare un forward del pacchetto (o alterarlo), in questo caso
il nodo che non decrementa il TTL non verra' mostrato nei risultati
del traceroute.


#### Traceroute senza root, ovvero tracepath

Nel caso non avessimo i permessi di root, possiamo eseguire:

```sh
 tracepath www.example.com
 # esegue un traceroute più semplice
 # senza permessi di root
```
un'altra alternativa piu' completa di traceroute e' `mtr`.


#### Tracerouting Alternativo con `mtr`

Per capire qual'e' il collo di bottiglia su una rete possiamo anche utilizzare
un tool di tracerouting piu' avanzato chiamato `mtr`.

Ad esempio per visualizzare un traceroute verso `example.com` allora possiamo
eseguire:

```sh
mtr www.example.com
# mtr ci mostrera' statistiche di base sul traffico rispetto ad ogni nodo a
# partire dalla macchina che esegue il comando fino al target
```


### DNS

Per avere informazioni sul DNS eseguiamo:

```sh
 host www.example.com
```
o per un esame più avanzato sul DNS eseguiamo:

```sh
 dig www.example.com
```

Possiamo eseguire un whois enumeration per avere alcuni
dettagli sul dominio con:

```sh
whois example.com
```


```sh
 dig a example.com @nameserver
 # eseguo una query di tipo A utilizzando come nameserver quello indicato
```

```sh
 dig mx example.com @nameserver
 # eseguo una query di tipo MX utilizzando come nameserver quello indicato
```

```sh
 dig axfr example.com @nameserver
 # eseguo un zone transfer, questo non dovrebbe essere possibile su una rete
 # esterna
```


possiamo anche eseguire dei reverse lookups con:

```sh
 host 66.11.33.112
```
```sh
 dig -x 66.11.33.112
 # esegue un reverse lookup
```

```sh
 dig www.ciao.it
 # esegue una query di tipo A per l'hostname
 # menzionato
```

Attraverso dig possiamo anche capire chi e' il nostro server DNS, quindi se
eseguiamo:
```sh
 dig google.it | grep SERVER
 # mostriamo chi e' il server che risponde alle nostre query
```
Per capire chi e' il nostro DNS server possiamo anche semplicemente utilizzare
nslookup.


```sh
 dig -t A www.ciao.it
 # analogo al precedente, ma specifichiamo esplicitamente
 # il tipo di query
```
```sh
 dig -t MX www.ciao.it
 # esegue una query di tipo MX per localizzare i server mail
```
```sh
 dig -t A www.ciao.it +nocomments +noauthority
 # rimuove
 # dall'output i commenti e la sezione authority, in genere la
```
In genere i vari switch che possiamo utilizzare con dig per disabilitare o
abilitare sezioni di output sono:
* `+nocomments` -- Turn off the comment lines
* `+noauthority` -- Turn off the authority section
* `+noadditional` -- Turn off the additional section
* `+nostats` -- Turn off the stats section
* `+noanswer` -- Turn off the answer section (Of course, you
    wouldn’t want to turn off the answer section)
* `+noall` - Turn off everything, this is in general used to be
    coupled with +answer so to only display the answer section

```sh
 dig @8.8.8.8 www.google.com A
 # eseguo una query di tipo A
 # utilizzando come resolver il server all'indirizzo 8.8.8.8
```
```sh
 dig PTR 33.164.60.185.in-addr.arpa
 # esegue una query di tipo PTR
 #  all'indirizzo IP 33.164.60.185
```
```sh
 dig MX google.com
 # esegue una query di tipo MX
```
```sh
 dig www.ciao.it +trace +additional
 # vediamo tutte le risposte
 # anche quelle "additional" in modo da vedere anche le risposte
 # parziali
```
```sh
 dig www.ciao.it +short
 # To view just the ip-address of a web
 # site (i.e the A record), use the short form option as shown
 # below.
```
```sh
 dig axfr @10.10.10.13 esempio.it
 # implementa uno
 # zone-transfer, in pratica se sappiamo che la macchina
 # all'indirizzo IP 10.10.10.13 hosta come sito esempio.it e ha la
 # porta 53 DNS in tcp aperta, è possibile a in certi casi
 # effettuare uno zone transfer, in questo caso avremo in output
 # la lista di tutte le entri relative al server dns, cioè una
 # lista di host disponibili
```
```sh
 host -t axfr zonetransfer.me nsztm1.digi.ninja.
 # implementa
 # uno zone-transfer utilizzando host
```
Possiamo provare uno zone-transfer utilizzando il sito messo a
disposizione `zonetransfer.me`.

un comando alternativo a "dig" comune agli utenti Microsoft
Windows ma disponibile anche per GNU/Linux è nslookup, possiamo
in basilare eseguirlo con:

```sh
 nslookup www.google.it
 # risolve www.google.it
```
E' da notare che dig ed nslookup potrebbero fornire due output
diversi, questo è dovuto al fatto che dig utilizza lo stub
resolver del Sistema Operativo mentre nslookup ne implementa uno
tutto suo.

Conn nslookup dopo aver effettuato una query possiamo anche capire chi e' il
nostro server DNS all'interno della rete.

Il programma nslookup comunque fornisce una riga di comando tutta sua, ad
esempio nel caso volessimo avere informazioni sul dominio ebay.it,
possiamo procedere con i seguenti comandi:
```sh
nslookup
set querytype=any
ebay.com
```

oppure possiamo fare query piu' specifiche come ad esempio:
```sh
nslookup
set querytype=A
ebay.com
```

Possiamo risalire al nostro nome hostname e dominio con molti provider
attraverso il comando nslookup, infatti eseguendo:
```sh
curl ifconfig.me
# in questo modo possiamo visualizzare l'indirizzo IP esterno
nslookup <ip-address>
# in questo modo otteniamo il nostro hostname e dominio
```

Ad ogni modo per ottenere velocemente informazioni dns su un dominio
che non conosciamo possiamo usare "dnsdumpster.com"


## Netcat

Netcat è il coltellino svizzero dell'amministratore di rete, ci
permette di gestire connessioni in senso lato, possiamo
utilizzarlo per aprire dei stream in rete, effettuare chat
primitive, o addirittura scambiare file, costruire server,
effettuare particolari richieste, eccetera.

### Semplice comunicazione su una porta (Chat Primitiva)

Se per esempio volessimo comunicare sulla porta "3333" allora sul
server eseguiamo:

```sh
 netcat -l 192.168.1.122 3333
 # l'opzione "-l" sta per listen ed
 # è quella che ci permette di implementare server
```
mentre sul client eseguiamo:

```sh
 netcat 192.168.1.122 3333
```
a questo punto tutto quello che scriviamo da una parte lo vediamo
dall'altra.

###  Semplice Server Web

Possiamo ad esempio creare un semplice file chiamato myFile.html
così strutturato:

```http
HTTP/1.0 200 OK

<html>
<body>
<h1>Prova...</h1>
</body>
</html>
```

ora una volta creato questo file possiamo eseguire:

```sh
 netcat -l ourIPAddress portOnWhichToListen < myFile.html
 #
 # questo si metterà in ascolto sull'interfaccia alla quale è
 # collegato l'indirizzo IP, e alla porta specificata un server
 # web con la pagine myFile.html, attenzione dopo che un'utente
 # carica il sito, il server va giu
```
###  Trasferimento File

Se da un server avente indirizzo 192.168.1.122 volessimo
trasferire un file dalla porta 3333, eseguiamo:

```sh
 cat backup.iso | netcat -l 192.168.1.122 3333
```
mentre sul client eseguiamo:

```sh
 netcat 192.168.1.122 3333 > backup.iso
```
Purtroppo netcat non mostra nessuna barra di progresso, per
questo possiamo utilizzare un programmino esterno chiamato "pv"
(da installare) e questa volta da server effettuare:

```sh
 cat backup.iso | pv -b | nc -l 192.168.1.122 3333
```
mentre da client eseguire:

```sh
 nc 192.168.1.122 3333 | pv -b > backup.iso
```

###  Netcat come Port Scanner

Anche se non è lo strumento più indicato per agire da port
scanner, può essere utilizzato in assenza di altro, ad esempio:

```sh
 nc -z 192.168.0.1 80-90
 # esegue un port scan sull'ip indicato
 # dalla porta 80 alla porta 90
```
## Telnet


Vediamo un comando che funge quasi da alternativa a netcat,
questo è telnet, per connetterci ad un host eseguiamo:

```sh
 telnet pel.unipv.it 80
 # si connette all'host richiesto con la
 # porta specificata
```
## Wget


Wget è un programma molto utile per scaricare qualsiasi cosa dal
web, ad esempio:

```sh
 wget http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2
 # scarica il file specificato
```
```sh
 wget -O taglist.zip http://www.vim.org/scripts/download_script.php?src_id=7701
 # scarica il file specificato e lo salva col nome menzionato
 # col flag "-O", che sta per "output"
```
```sh
 wget --limit-rate=200k http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2
 # imposta un limite di velocità in download
```
```sh
 wget -c http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2
 # scarica il file, se è già stato parzialmente scaricato,
 # continua dall'ultimo punto di interruzione
```
```sh
 wget -b http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2
 # scarica in background, e crea un file chiamato wget-log,
 # possiamo osservarlo con "tail -f wget-log"
```
```sh
 wget --user-agent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3" URL-TO-DOWNLOAD
 # scaricare un file, fingendo di essere un browser, in quanto
 # alcuni server non permettono il download se non si è in un
 # browser
```
```sh
 wget --tries=75 DOWNLOAD-URL
 # imposta un numero di tentativi
 # per il download, dovrebbe essere interessante se combinato con "
 # -c"
```
```sh
 wget -i download-file-list.txt
 # scatica tutti gli url
 # contenuti nel file menzionati, "-i" sta per "input"
```
```sh
 wget --mirror -p --convert-links -P ./LOCAL-DIR WEBSITE-URL
 # scarica un sito web nella sua interezza
```
```sh
 wget --reject=gif WEBSITE-TO-BE-DOWNLOADED
 # scarica un sito
 # senza determinati tipi di file
```
```sh
 wget -r -A.pdf http://url-to-webpage-with-pdfs/
 # scarica
 # ricorsivamente "-r" tutti i file con estensione ".pdf" nella
 # pagina specificata
```
```sh
 wget -r www.sitoweb.com/paginaACaso/
 # scarica ricorsivamente
 # tutti i file presenti in questa pagina
```
```sh
 wget ftp-url
 # scarica un url ftp
```
```sh
 wget --ftp-user=USERNAME --ftp-password=PASSWORD DOWNLOAD-URL
 # scarica un url ftp, con accesso credenziali
```
```sh
 wget --user=vivek --password='myPassword' http://theos.in/protected/area/foo.pdf
 # Scarica un file che ha
 # bisogno di credenziali su un server per essere scaricato
```
```sh
 wget -r -l 2 www.website.com
 # scarica il sito web, con un
 # livello di profondità uguale a 2, mentre utilizzando --mirror,
 # il livello di profondità è infinito
```


## Curl

curl is a tool to transfer data from or to a server, using one of
the supported protocols (DICT, FILE, FTP, FTPS, GOPHER, HTTP,
HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP,
SFTP, SMB, SMBS, SMTP, SMTPS, TELNET and TFTP). The com‐ mand is
designed to work without user interaction. Curl is very important
we can think about curl as the netcat for web applications.

curl offers a busload of useful tricks like proxy support, user
authentication, FTP upload, HTTP post, SSL connections, cook‐
ies, file transfer resume, Metalink, and more. Curl is a linux
utility that is used to make HTTP requests to a given url. It
outputs HTTP response to standard output and is actually very
easy to use. Here are some examples to show its usage:

```sh
 curl www.website.com
 # visualizza la pagina HTML del sito, di
 # default esegue il comando HTTP GET
```
```sh
 curl --request GET 'http://ciao.it'
 #  questo fa la stessa cosa
 # del precedente, cioè esegue una richiesta GET alla locazione
 # indicata
```
vediamo altri esempi:

```sh
 curl --request POST 'http://www.somedomain.com/'
 # l'opzione
 # --request può essere sostituito dal flag -X
```
```sh
 curl -XDELETE 'http://www.somedomain.com/'
```
```sh
 curl -XPUT 'http://www.somedomain.com/'
```
possiamo mandare dei dati in "POST" attraverso il flag "-d", ad
esempio:

```sh
 curl -XPOST 'http://localhost:9200/_count?pretty' -d ' { "query": { "match_all": {} } } '
 # in questo caso mandiamo JSON
 # in POST, ma qualsiasi dato volessimo mandare in POST possiamo
 # farlo attraverso il flag "-d"
```
dovremmo poterci autenticare con HTTP attraverso
un'autenticazione basic o digest attraverso:

```sh
 curl -u username:password http://awebsite.com
 # basic authentication
```
```sh
 curl --digest -u username:password http://awebsite.com
 # digest authentication
```
Nel caso volessimo eseguire una richiesta attraverso
un proxy possiamo fare uso del flag `-x`. Ad esempio:
```sh
 curl -x http://localhost:8080 -XPOST www.google.it -d "param1=ciao&param2=esempio"
 # esegue una richiesta attraverso il proxy in ascolto sulla
 # porta 8080 attraverso il flag '-x' e poi utilizzando
 # il metodo POST e inserendo nel body della richiesta
 # i parametri indicati col parametro '-d'
 # un'alternativa al flag -x e' l'opzione --proxy
```
A volte i proxy hanno credenziali di accesso,
possiamo specificarle con curl semplicemente in questo
modo:

```sh
 curl -x http://proxy_server:proxy_port --proxy-user \
 username:password http://url.com
 # esegue una richiesta attraverso il proxy indicato
 # utilizzando le credenziali specificate attraverso
 # l'opzione --proxy-user
```

Se il proxy e' di tipo socks e quindi non http, possiamo
indicarlo con:
```sh
 curl --socks5 http://url:8080 http://example.com/
 # usa un proxy di tipo socks5 per eseguire una richiesta
 # all'url example.com
```

Ricordiamoci che a volte i webserver rispondono con un
messaggio che indica una location, con un response code
di tipo 3XX, per seguire la location possiamo utilizzare
il flag `-L` o l'opzione `--location`. Ad esempio:

```sh
 curl -L http://example.com/
 # in questo caso seguiamo un'eventuale
 # redirection che avviene con dei response code 3XX
```

```sh
 curl -i http://example.com
 # in questo caso attraverso -i vediamo gli header della risposta e il body
 # molto utile per mostrare velocemente l'intera risposta comprensiva di header
```

```sh
 curl -v http://example.com
 # in questo caso mostriamo in modo verbose la richiesta (con i suoi header) e
 # la risposta anche essa comprensiva di header
```



Altri esempi:

```curl
http methods                    curl -XTRACE  <url>

x-forwarded-for                 curl -H "X-Forwarded-For: 10.0.0.1" <url>

basic authentication            curl -u <user>:<password> <url>

post form                       curl -XPOST --form "b=4_1" <url>

cookie                          curl --cookie "PHPSESSID=5ved46gn34dopkjhstrrfgdkk1;" <url>

cookie files (save & send)      curl -c /tmp/cookie.txt -b /tmp/cookie.txt <url>

set user-agent                  curl -A "Mozilla" <url>

referer                         curl -H "Referer: https://www.cnn.com" <url>

json                            curl -XPOST -H "Content-Type: application/json" -d "[[\"create\",{\"type\":\"trial\",\"name\":\"bug\"}]] <url>

silent                          curl -s <url>

verbose                         curl -v <url>

ignore certifikate issues       curl -k <url>

follow redircts                 curl -L <url>

redirect output into file       curl -o <file> <url>

curl with proxy                 curl -x <proxy>:<port> <url>

curl SSL V3                     curl -k -v --sslv3 <url>

curl max time (4 seconds)       curl -m4 <url>

file upload                     curl -XPOST -F ul=30000 -F location=/tmp/upload-form-data.txt -F userfile=@/tmp/upload-file.txt <url>

shell-shock                     curl -k -L -H 'User-Agent: () { :;}; curl -L  <return-server>;'  <url>

post data from file             curl -data '@<filename>' <url>

curl output response time       curl -o /dev/null -w%{time_connect}:%{time_starttransfer}%{time_total} <url>

curl output request size        curl -o /dev/null -w%{size_request} %{size_upload} <url>

curl output http status code    curl -o /dev/null -w%%{http_code} <url>

curl resolve ip from other dns  curl --resolve "www.cnn.com:80:8.8.8.8" http://www.cnn.com
```

Let's see other typical usage of curl:

```curl
curl http://curl.haxx.se
curl http://site.{one,two,three}.com
curl ftp://ftp.numericals.com/file[1-100].txt
curl ftp://ftp.numericals.com/file[001-100].txt
curl ftp://ftp.letters.com/file[a-z].txt
curl http://any.org/archive[1996-1999]/vol[1-4]/part{a,b,c}.html
curl http://www.numericals.com/file[1-100:10].txt
curl http://www.letters.com/file[a-z:2].txt
curl -o index.html http://curl.haxx.se/
curl http://curl.haxx.se/ > index.html
curl -# http://curl.haxx.se/ > index.html
curl -0 http://curl.haxx.se/
curl --http1.1 http://curl.haxx.se/
curl --http2 http://curl.haxx.se/
curl -1 http://curl.haxx.se/
curl --tlsv1 http://curl.haxx.se/
curl -2 http://curl.haxx.se/
curl --sslv2 http://curl.haxx.se/
curl -3 http://curl.haxx.se/
curl --sslv3 http://curl.haxx.se/
curl -4 http://curl.haxx.se/
curl --ipv4 http://curl.haxx.se/
curl -6 http://curl.haxx.se/
curl --ipv6 http://curl.haxx.se/
curl -A "wget/1.0" http://curl.haxx.se/
curl --user-agent "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)" [URL]
curl --user-agent "Mozilla/4.73 [en] (X11; U; Linux 2.2.15 i686)" [URL]
curl -b "phpsession=Testtest" http://demo.com/
curl --cookie "name=Daniel" http://curl.haxx.se
curl -c cookies.txt http://curl.haxx.se/
curl --cookie-jar cookies.txt http://curl.haxx.se
curl -d "username=admin&password=pass" http://curl.haxx.se/
curl --data "birthyear=1905&press=%20OK%20"  http://curl.haxx.se/when.cgi
curl --data-urlencode "name=I am Daniel" http://curl.haxx.se
curl --data "<xml>" --header "Content-Type: text/xml" --request PROPFIND url.com
curl -e "http://referer" http://demo.com/
curl --referer http://curl.haxx.see http://curl.haxx.se
curl --header "Host:" http://curl.haxx.se
curl --header "Destination: http://nowhere" http://curl.haxx.se
curl -D - http://curl.haxx.se/
curl --dump-header headers_and_cookies http://curl.haxx.se
curl -L http://github.com/
curl --location http://curl.haxx.se
curl --dns-servers 8.8.8.8 http://demo.com/
curl --trace-ascii debugdump.txt http://curl.haxx.se/
curl --form upload=@localfilename --form press=OK [URL]
curl --upload-file uploadfile http://curl.haxx.se/receive.cgi
curl --user name:password http://curl.haxx.se
curl --proxy-user proxyuser:proxypassword curl.haxx.se
curl --cert mycert.pem https://secure.example.com
```

per mandare un file in post ad esempio contenente XML, possiamo
eseguire:

```sh
 curl -d @test.txt http://10.10.10.78/hosts.php
```

possiamo mostrare tutti gli header di richiesta e risposta utilizzando un
semplice:
```sh
curl -v http://host.tld
```

ad ogni modo se questo ci sembra troppo verbose, possiamo anche solo stampare
l'intera risposta con gli header attraverso:
```sh
curl -sD - http://example.com
# -s evita di stampare le progress bar
# mentre -D fa il dump degli header su file che in questo case e' lo stdin '-'
```

