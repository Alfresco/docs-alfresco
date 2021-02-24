---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem SMB CIFS
---

# Running the CIFS server from a normal user account

On Unix-like systems such as Linux and Solaris, the default Alfresco setup must be run using the root user account so that the CIFS server can bind to the privileged ports \(TCP 139/445 UDP 137/138\).

The CIFS server can be configured to run using non-privileged ports and then use firewall rules to forward requests from the privileged ports to the non-privileged ports.

1.  To configure the CIFS server to use non-privileged ports, use the following property settings:

    ```
    cifs.tcpipSMB.port=1445
    cifs.netBIOSSMB.namePort=1137
    cifs.netBIOSSMB.datagramPort=1138
    cifs.netBIOSSMB.sessionPort=1139
    ```

    Other port numbers can be used but must be above 1024 to be in the non-privileged range.

    The firewall rules should then be set up to forward requests:

    -   TCP ports 139/445 to TCP 1139/1445
    -   UDP ports 137/138 to UDP 1137/1138
2.  On Linux, use the following commands to get started, but be aware these commands will delete all existing firewall and NAT rules and could be a security risk:

    ```
    modprobe iptable_nat
    iptables -F
    iptables -t nat -F
    iptables -P INPUT ACCEPT
    iptables -P FORWARD ACCEPT
    iptables -P OUTPUT ACCEPT
    iptables -t nat -A PREROUTING -p tcp --dport 445 -j DNAT --to-destination :1445
    iptables -t nat -A PREROUTING -p tcp --dport 139 -j DNAT --to-destination :1139
    iptables -t nat -A PREROUTING -p tcp --dport 137:139 -j DNAT --to-destination :1137-1139
    iptables -t nat -A PREROUTING -p udp --dport 137:139 -j DNAT --to-destination :1137-1139
    ```

    The UDP forwarding does not work, which affects the NetBIOS name lookups. A workaround is either to add a DNS entry matching the CIFS server name and/or add a static WINS mapping, or add an entry to the clients LMHOSTS file.

3.  On Solaris 10, ipfilter can be used out of the box, use the following commands. Ensure that your Network address translation \(NAT\) terminal is able to forward IP packets. Use the `routeadm` command to enable or disable the global packet-forwarding function on all IPv4 or IPv6 interfaces of a system.

    ```
    rdr nge0 192.168.244.25/32 port 445 -> 192.168.244.25 port 1445
    rdr nge0 192.168.244.25/32 port 137 -> 192.168.244.25 port 1137
    rdr nge0 192.168.244.25/32 port 138 -> 192.168.244.25 port 1138
    rdr nge0 192.168.244.25/32 port 139 -> 192.168.244.25 port 1139
    ```

    Enable packet filtering for the interface type you are using by uncommenting the appropriate line\(s\) in the /etc/ipf/pfil.ap file and start the IP filter services.

    ```
    $ svcadm restart network/pfil
    $ svcadm restart ipfilter
    $ ipnat -l 
    ```


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

