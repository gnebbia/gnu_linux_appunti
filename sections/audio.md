# Audio

# Introduzione

Si sente parlare spesso su GNU/Linux di pulseaudio e ALSA.
Qual'e' la differenza tra questi due ?
In pratica ALSA in genere e' sempre presente ed e' la parte
kernel di linux che parla con le schede audio.
ALSA non supporta il mix di piu' tracce audio sulla stessa scheda
audio, quindi per fare questo si puo' usare un suo modulo userland
chiamato "dmix" oppure "pulseaudio".
Pulseaudio e' la soluzione piu' scelta oggigiorno dalle distribuzioni.
Pulseaudio e' molto flessibile e offre diversi vantaggi ma ha lo
svantaggio di aggiungere latenza per l'audio e questo puo' in sistemi
in cui sono richieste alte prestazioni audio non essere accettabile.

In pratica, quando apriamo ad esempio un software di editing/mixing
audio e.g., un DAW come Ardour vedremo che il nostro computer non
puo' usare l'audio se non con Ardour, penso che probabilmente
Ardour disabiliti pulseaudio per comunicare esclusivamente con ALSA
e in questo modo abbassare la latenza.

Inoltre e' esistita un'altra soluzione parallela ad ALSA chiamata
"OSS", che gestisce la parte kernel e permette alle applicazioni
userland di parlare direttamente con lei (nel kernel) riuscendo
ad effettuare mixing e stream come pulseaudio, ma non e' molto
popolare per il fatto che la licenza non e' GPL, quindi e'
raramente utilizzata su distro GNU/Linux.

Appunti da:
(https://superuser.com/questions/144648/how-do-alsa-and-pulseaudio-relate)


    ALSA is the kernel level sound mixer, it manages your sound card
    directly. ALSA by itself can only handle one application at a time. Of
    course, there is 'dmix', which was written to solve this problem. (It's
    an ALSA module.)

    PulseAudio is a software mixer, on top of the userland (like you'd run
    an app). When it runs, it uses Alsa - without dmix - and manages every
    kind of mixing, the devices, network devices, everything by itself.

    In 2014, you can still run only ALSA. But unless you compile your
    applications for yourself and enable ALSA support everywhere - or
    use a source-based distribution like Gentoo - you might get mixing
    problems. Pre-compiled applications that distros ship are usually only
    built with support for Pulseaudio, not pure ALSA. Ubuntu for example
    prefers PulseAudio. It comes with PulseAudio by default, so every
    application is compiled to only use PulseAudio.

    PulseAudio does have its benefits. People say that it is good for working
    with audio across a network, and it solves some issues with multi-channel
    audio streams that happened under pure ALSA. It's also supposedly easier
    to develop apps for PA. On the end-user side of things, it's easy to
    select new devices, to control volume by app, etc.

    However, in the default configuration it adds a not insignificant amount
    of latency into the mix. This is a big con for certain types of tasks
    that require low latency like some games and software.

    OSS is an alternative to both of these, but it's not licensed under the
    GPL, which makes it not likely to see a lot of adoption by distros.

    Illustration: Typical PulseAudio-powered sound systems, like Ubuntu:
    Kernel: ALSA -> Userland: PulseAudio -> app1, app2, app3 In the typical
    Linux system, PulseAudio mixes audio from all your different apps and
    feeds them up the chain to ALSA.

    ALSA: Kernel: ALSA -> dmix -> Userland: app1, app2, app3 With just pure
    ALSA, you need dmix to mix multiple apps. Without it, ALSA can only play
    an audio stream from one app at a time.

    OSS: Kernel: OSS -> Userland: app1, app2, app3 With OSS, the userland
    apps talk directly to OSS in the kernel, which mixes the streams itself.

    So to sum up, in your typical system these days, ALSA talks directly
    to your sound cards, and Pulseaudio talks to your apps and programs and
    feeds that into ALSA.


# Gestione audio con amixer

Per gestire l'output ho trovato i seguenti comandi utili:

```sh
 amixer -q set Master 10%+
 # incremento il livello di volume del
 # 10%, il flag "-q" (quiet) serve a sopprimere l'output)
```
```sh
 amixer -q set Master 10%-
 # decremento il livello di volume del
 # 10%
```
```sh
 amixer -q set Master mute
 # muto l'audio
```
```sh
 amixer -q set Master unmute
 # unmuto l'audio
```
```sh
 amixer get Master
 # mi fornisce il livello di volume attuale
```
```sh
 alsamixer
 # visualizzo i livelli di volume dell'audio e posso
 # modificarli attraverso un'interfaccia TUI
```

Un programma molto utile per gestire l'audio e per capire a volte la
sorgente di alcuni problemi e' `pavucontrol` (pulseaudio volume control).

Un altro software utile per visualizzare le interfacce audio disponibili e'
aplay, vediamone un esempio:

```sh
 aplay -l
 # visualizza le interfacce audio disponibili,
 # solitamente ne abbiamo una a parte e se c'è una porta hdmi,
 # questa costituisce una vera e propria scheda audio a parte,
 # attaccata alla scheda video.
```
