# iptables n'at
# Reference: [IpTables NAT by David Wittman](https://gist.github.com/DavidWittman/3805130)

### Source NAT
Source NAT changes the **source address** in IP header of a packet. It may also change the **source port** in the TCP/UDP headers. The typical usage is to change the a private (rfc1918) address/port into a public address/port for packets leaving your network. Available _only_ in the POSTROUTING chain in iptables.

#### Syntax
`iptables -t nat -A POSTROUTING -i eth1 -j SNAT --to-source 1.2.3.4[:port]`

#### Example
```
Host A (10.0.0.2) -------> Router (10.0.0.1 / 1.2.3.4 ) -> Host B (5.6.7.8)
Source IP:	10.0.0.2	   Source IP:	1.2.3.4
Dest IP:	5.6.7.8	 	   Dest IP:     5.6.7.8
```

### Destination NAT
Destination NAT changes the **destination address** in IP header of a packet. It may also change the **destination port** in the TCP/UDP headers. The typical usage of this is to redirect incoming packets with a destination of a public address/port to a private IP address/port inside your network.

#### Syntax
`iptables -t nat -A POSTROUTING -i eth0 -p tcp --dport 2222 -j DNAT --to-destination 10.0.0.2:22`

#### Example
```
Host B (5.6.7.8) ----> Router (1.2.3.4 / 10.0.0.1) -> Host A (10.0.0.2)
Source IP:	5.6.7.8    Source IP:	5.6.7.8
Dest IP:	1.2.3.4	   Dest IP:     10.0.0.2
Dest Port:	22		   Dest Port:	2222
```
### Masquerade
Masquerading is a special form of Source NAT where the source address is unknown at the time the rule is added to the tables in the kernel. If you want to allow hosts with private address behind your firewall to access the Internet and the external address is variable (DHCP) this is what you need to use. Masquerading will modify the source IP address and port of the packet to be the primary IP address assigned to the outgoing interface. 

*Note:* If your outgoing interface has a address that is static, then you should use Source NAT (SNAT), which will be a little faster because it does not need to determine the external IP of your forwarding interface every time.

#### Syntax
`iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE`

### Redirect
REDIRECT, like DNAT, alters the destination IP address and port, but is only meant for local traffic -- packets won't be forwarded externally. In other words, locally generated packets are mapped to the 127.0.0.1 address (and a port of choice). If you only want to redirect the traffic between services on the local machine, it will be a good choice.

`iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 2222 -j REDIRECT --to-port 22`

#### Example
```
Host B (5.6.7.8) ----> Host A (1.2.3.4)
Source IP:  5.6.7.8    Source IP:	5.6.7.8
Dest IP:    1.2.3.4    Dest IP:    127.0.0.1
Dest Port:  2222	   Dest Port:	22
```

##### Source
- http://serverfault.com/questions/119365/what-is-the-difference-between-a-source-nat-destination-nat-and-masquerading
