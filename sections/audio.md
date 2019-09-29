
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

Un programma molto utile per gestire l'audio e per capire a volte
la sorgente di alcuni problemi e' `pavucontrol`.

Un altro software utile per visualizzare le interfacce audio disponibili e'
aplay, vediamone un esempio:

```sh
 aplay -l
 # visualizza le interfacce audio disponibili,
 # solitamente ne abbiamo una a parte e se c'è una porta hdmi,
 # questa costituisce una vera e propria scheda audio a parte,
 # attaccata alla scheda video.
```
