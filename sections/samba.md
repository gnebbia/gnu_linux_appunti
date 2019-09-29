
Samba can be thought as an alternative to NFS, when we are working in an
environment comprehending Windows machines.

Samba can be used both to:
* Access Shared Directories/Printers
* Act as a Domain Controller (rare application)

Nota che di default Windows puo' condividere directory sia richiedendo
credenziali di un utente esistente sulla macchina, sia non richiedendole
Questa impostazione deve essere settata dal pannello di controllo, nelle voci
relative alla rete e alle condivisioni.
Possiamo quindi disabilitare la richiesta di password per gli
"share" nelle impostazioni di rete.


## Linux come client

```sh
smbclient
```



