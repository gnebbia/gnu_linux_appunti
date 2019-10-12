
```sh
 fortune | cowsay -f dragon-and-cow | lolcat
 # o al posto di
 # fortune un echo "ciao", anche figlet funziona bene, tipo
 # 'echo "ciao" | figlet'
```

```sh
 figlet ciao
 # stampa a schermo la stringa "ciao"
 # asciizzata
```


The \*NIX version of the russian roulette is:
```sh
[ $[ $RANDOM % 6 ] == 0 ] && echo "boom" || echo "click"
```



### Video Terminals

```sh
 echo $TERM # ci mostra il terminale con cui stiamo lavorando
```

```sh
infocmp | less # ci mostra le feature che possiede il nostro terminale
```
ad esempio i video terminali vt100 non supportano i colori mentre gli
xterm-256 li supportano.

```sh
 tput colors
 #  questo comando ci dice se il nostro terminale supporta i colori
 #  se l'output e' -1 vuol dire che non li supporta, altrimenti ci mostra
 #  il numero di colori supportati, e.g., 256
```

```sh
 tput cups
 #  questo comand ci dice se il nostro terminale supporta lo spostamento del cursore
```

uno dei video terminali con meno features e' il dumb.
Possiamo cambiare terminale eseguendo:

```sh
 export TERM=dumb
```
Per utilizzare i colori utilizzano escape sequences.

Nota che per molti terminal emulator, le impostazioni sono settabili dal file
`.Xresources`.

## Debug di Applicazioni


### Strace
Possiamo tracciare le chiamate di sistema eseguite da un processo con strace.

```sh
strace nome_programma arg1 arg2
```

Possiamo vedere quale system call e' piu' lunga/lenta attraverso il seguente
comando:
```sh
trace -r your-program
# il flag -r stampa i tempi relativi
```

Possiamo vedere quanto tempo impiega ogni system call attraverso la seguente
opzione:
```sh
strace -T your-program
# il flag -T stampa i tempi assoluti impiegati da ciascuna system call
```

Possiamo produrre delle statistiche attraverso:
```sh
trace -c nome_proramma arg1 arg2
# il flag -c produce delle statistiche sulle system call utilizzate
```

Ad esempio se volessimo tracciare tutte le chiamate di sistema che interagiscono
con i file di un programma lanciandolo con:
```sh
strace -ff -e trace=file nome_programma arg1 arg2  > log.txt 2>&1
# il flag -ff traccia anche i processi forkati, in genere questa e' una
# buona idea
# mentre il flag -e e' usato per specificare dei filtri sulle chiamate di sistema
# visualizzate
```

possiamo anche avere la lista dei file acceduti in tempo reale dando in pasto a
strace un Process ID (PID), questo pero' non terra' traccia dei file aperti in
passato dal processo. Possiamo farlo con:

```sh
strace -p <PID>
```

Un'altra opzione equivalente al comando precedente e' utilizzare lsof, cosi:
```sh
lsof -n -p  <PID_of_APP>
```

Vediamo altri esempi di utilizzo di strace:
```sh
strace -e trace=open,read -p 22254 -s 80 -o debug.txt
# in questo caso tracciamo solo le chiamate di sistema open e read del processo
# con PID 22254 e come lunghezza massima di stringa d'output concediamo 80
# caratteri (di default questo parametro e' settato a 32), inoltre l'output e'
# salvato nel file chiamato "debug.txt"
```

### Ltrace

ltrace tracks and records the dynamic (runtime) library calls made by a process
and the signals received by it. It can also track the system calls made within a
process. It's usage is similar to strace


### Modificare la memoria di un processo in running

Possiamo modificare il contenuto della memoria di un processo, mentre e' in
running attraverso questo snippet di codice in C:

```sh
#include <sys/ptrace.h>
...
ptrace(PTRACE_ATTACH, pid, NULL, NULL);
// or use PTRACE_SEIZE instead of PTRACE_ATTACH if
// you don't want to suspend the process

int data = 4;
ptrace(PTRACE_POKEDATA, pid, 0x83040, &data);
```


## Il comando `yes`


Il comando yes stampa finche' non viene ucciso/fermato la stringa "y" a schermo,
questo comando era utile soprattutto in passato per rendere automatici programmi
interattivi che chiedevano input all'utente. Oggigiorno molti programmi
includono flag/opzioni per rispondere automaticamente "y" ad esempio `apt -y`
oppure `rm -f`.

Vediamo un esempio di utilizzo di yes:
```sh
yes | rm *.txt 
# ovviamente oggigiorno si puo' semplicemente effettuare 
# rm -f *.txt
```

Possiamo passare a yes un argomento per stampare una stringa diversa, ad esempio
con `yes NO`, il programma continuera' a stampare la stringa "NO" fino alla sua
morte.


Oggigiorno il comando yes puo' tornare utile per stampare velocemente file con
contenuto utilizzato per testing. Ad esempio, generare file con un numero
prestabilito di linee. 
Un esempio e':
```sh
yes 1234567 | head -1000 > file 
```
Questo generera' un file di 1000 righe contenenti "1234567".
