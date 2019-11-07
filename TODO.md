# TODO List

* ARP vs IP:
    >>> There is a historical reason for this, as @ronmaupin alludes to.

    >>> In small networks, you don't need a layer 3 protocol. All the devices are
    >>> directly addressable, so layer 2 addresses work fine. As networks got bigger and
    >>> became interconnected, there was a need to know how to get from one network to
    >>> another. That is the function of routing, which is done at layer 3.
    
    >>> IP was not the only (or even the most popular) L3 protocol, and Ethernet was not
    >>> the only layer 2 protocol. That is why there are layers. You can isolate the
    >>> function of one from the other. It made developing network software easier
    >>> because you didn't have to have a special version for every type of network.
   
    >>> The layer 3 function doesn't know or care whether you use Ethernet, token ring,
    >>> PPP, or a dozen other obsolete network protocols. Similarly, the layer 2
    >>> protocol doesn't care if you're using IP, IPX, or something else.
  
    >>> The price you pay for layering is that you have to "map" between a 32 bit IP
    >>> address and a 48 bit MAC address (for Ethernet). That is the purpose of the ARP
    >>> protocol - to map between layer 2 and layer 3.

* aptitude why <packagename> to understand why a package was installed or 
on fedora/centos repoquery --whatrequires <packagename> what about arch/gentoo?
* Write about tcpwrapper as a tool for network access control
* More on nginx configurations, to enable tls with certbot and http2
* More on RAID and LVM
* consider to move the part on bash scripting in the bash tutorial
* fix fix fix style
* Check where is the formula spazio occupato and so on
* ip netns list/add and man ip-netns
* break entire guide into pieces - ok -
