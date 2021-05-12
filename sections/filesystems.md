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


## Mount FileSystem Files (.img)

Reference: https://unix.stackexchange.com/questions/82314/how-to-find-the-type-of-an-img-file-and-mount-it

Try running the command 

    fdisk -l <img file>

Typically if the .img files are entire disks from say a KVM VM then they're technically a virtual disk.
Example

I've got a CentOS KVM VM which shows up like so with the file command:

    file centostest.img 

centostest.img: x86 boot sector; partition 1: ID=0x83, active, starthead
1, startsector 63, 208782 sectors; partition 2: ID=0x8e, starthead 0,
startsector 208845, 20755980 sectors, code offset 0x48

Running fdisk with it:

    sudo /sbin/fdisk -lu /kvm/centostest.img

last_lba(): I don't know how to handle files with mode 81ed
You must set cylinders.
You can do this from the extra functions menu.

Disk /kvm/centostest.img: 0 MB, 0 bytes
255 heads, 63 sectors/track, 0 cylinders, total 0 sectors
Units = sectors of 1 * 512 = 512 bytes

                Device Boot      Start         End      Blocks   Id  System
    /kvm/centostest.img1   *          63      208844      104391   83  Linux
    /kvm/centostest.img2          208845    20964824    10377990   8e  Linux LVM
    Partition 2 has different physical/logical endings:
        phys=(1023, 254, 63) logical=(1304, 254, 63)

If you'd like to mount one of these partitions you can do so as follows:
fdisk (cylinder output)

    block-size of 512 bytes and the start-block is 63.
    The offset is 512 * 63 = 32256.

fdisk (sector output)

    block-size of 512 bytes and the start-block is 1.
    The offset is 512 * 1 = 512.

So the mount command would be:
in cylinders:

    mount -o loop,offset=32256 centostest.img /mnt/tmp

To mount the other partition (512 * 208845 = 106928640):

    mount -o loop,offset=106928640 centostest.img /mnt/tmp

in sectors

    mount -o loop,offset=512 centostest.img /mnt/tmp

To mount the other partition (512 * 14 = 7168):

    mount -o loop,offset=7168 centostest.img /mnt/tmp

NOTE

This will only work if mount can determine the type of filesystem within
the "partition" you're attempting to mount. You may need to include -t
auto, or be specific and tell mount that's it's -t ext4 for example.
