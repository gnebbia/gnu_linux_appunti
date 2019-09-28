

## Ext Utilities

Other useful utilities on ext filesystems are attributes, which
are characteristics of files, we can view attributes with

```sh
 lsattr to view attributes
```
or we can change attributes with:

```sh
 chattr +i fileName
```
the attributes "i" says that now the file is not deletable, there
are many flags, and it is recommended to view them by doing a "
man chattr", for example a good way to reduce I/O is to tell the
OS to not save date and hour informations on disk with a certain
flag, which is "A" (very useful for laptops), it is a good idea
for the Orlov block allocator to set the /home directory with a "
T" flag, since its subdirectories are not related and can be on
separated disk's blocks.


