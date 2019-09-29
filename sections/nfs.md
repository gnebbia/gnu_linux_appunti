
NFS (Network File System) is a distributed file system protocol
originally developed by Sun in 1984. allowing a user on a client
computer to access files over a computer network much like local
storage is accessed. NFS, like many other protocols, builds on
the Open Network Computing Remote Procedure Call (ONC RPC)
system. On a debian machine we can check if we support NFS with:

```sh
 grep NFSD /boot/config-`uname -r`
```
more generally with any other distros we should check the kernel
configuration file.


### Server-Side

On the server we install:

```sh
 sudo apt-get install nfs-kernel-server
```
then we create the directory we want to share, for example:

```sh
 sudo mkdir /var/nfsroot
 # we create a directory in "/var"
```
then, we have the table of exports in the file "/etc/exports", in
this file we add a line with:

```sh
 /var/nfsroot <client private ip>/32(rw,root_squash,subtree_check)
 # where for client private
 # ip we put the ip address or an entire subnet, notice that since
 # we put root_squash, in this case the root account on the client
 # machine will have the same privilege level as the root on the
 # server machine. This option has security implications; do not
 # use unless you are sure you need it.
```
we then update the table of exported directories with:

```sh
 sudo exportfs -a
```
and we have to be sure of having the daemon started with:

```sh
 sudo service nfs-kernel-server start
 # starts the kernel, even
 # a "restart" could be used
```
Notice that in order to not give root access to the filesystem to
any NFS client, all queries appearing to come from a root user
are considered by the server as coming from the nobody user. This
behavior corresponds to the `root_squash` option, and is enabled by
default. The n`o_root_squash` option, which disables this behavior,
is risky and should only be used in controlled environments. The
anonuid=uid and anongid=gid options allow specifying another fake
user to be used instead of UID/GID 65534 (which corresponds to
user nobody and group nogroup).


## Example

Let's see some example of sharing directory:

```sh
 mkdir /home/client1; chown nobody:nogroup /home/client1; chmod 755 /home/client1
 # in this case we are sharing a directory the
 # owner user and owner group should be these ones, if we want the
 # directory to be writeable by clients, even in this case they
 # must be root
```
the following step is adding this directory to the NFS
configuration file "/etc/exports" with:

```conf
/home/client1 192.168.0.101/32(rw,root_squash,subtree_check)
# here we share the directory, we use default options
```


## Server-Side Options

Let's see some of the possible options we can set server-side,
these options can be specified in the /etc/exports entry:

```sh
 # rw: Read/write filesystem.
```
```sh
 # ro: Force clients to connect in the read-only filesystem mode
 # only.
```
```sh
 # no_root_squash: The root account on the client machine will
 # have the same privilege level as the root on the server
 # machine. This option has security implications; do not use
 # unless you are sure you need it.
```
```sh
 # no_subtree_check: Disable file location checks on partial
 # volume exports. This option will speed up transfers on full
 # volume exports.
```
```sh
 # sync: Force all transfers to operate in synchronous mode, so
 # all clients will wait until their operations are really done.
 # This can avoid data corruption in the event of a server crash.
```


## Client-Side

On the client side what we do is:

```sh
 sudo apt-get install nfs-common
```
then we create the local directory where we will mount our remote
directory with:

```sh
 sudo mkdir /mnt/remotenfs
```
then we add the following line to the /etc/fstab file:

```conf
<server private ip>:/var/nfsroot /mnt/remotenfs nfs rw,async,hard,intr 0 0
```

then we can mount the directory with:

```sh
 sudo mount /mnt/remotenfs
```
In order to see on which port nfs is listening we do:

```sh
 sudo rpcinfo -p 192.168.0.102
 # here we will see various rows,
 # what we are interested is the presence of "NFS" and its port,
 # notice that the default port is 2049
```
then we can see which directories are shared by the server by
doing:

```sh
 sudo showmount -e 192.168.0.102
 # in this way we show which
 # directories are shared by the mentioned server IP address
```


## Client-Side Options

Let's see some of the possible options we have "Client-Side",
these options can be specified using the mount command, or in the
/etc/fstab entry:


* `rw`: Read/write filesystem.
* `ro`: Read-only filesystem. Remote NFS clients can’t modify the filesystem.
* `hard`: Applications using files stored on an NFS will always
  wait if the server goes down. User cannot terminate the process
  unless the option intr is set.
* `soft`: Applications using files stored on an NFS will wait a
  specified time (using the timeo option) if the server goes
  down, and after that, will throw an error.
* `intr`: Allows user interruption of processes waiting on a NFS request.
* `timeo=<num>`: For use with the soft option. Specify the timeout for an NFS request.
* `nolock`: Disable file locks. Useful with older NFS servers.
* `noexec`: Disable execution of binaries or scripts on an NFS share.
* `nosuid`: Prevents users from gaining ownership of files on the NFS share.
* `rsize=<num>`: Sets the read block data size. Defaults to 8192 on NFSv2 and NFSv3, and 32768 on NFSv4.
* `wsize=<num>`: Sets the write block data size. Defaults to 8192 on NFSv2 and NFSv3, and 32768 on NFSv4.

