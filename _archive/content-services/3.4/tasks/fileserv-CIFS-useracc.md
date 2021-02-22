---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem SMB CIFS
---

# Running SMB/CIFS from a normal user account

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
2.  On Mac OS X the following commands can be used:

    ```
    sysctl -w net.inet.ip.fw.enable=1
    sysctl -w net.inet.ip.forwarding=1
    sysctl -w net.inet.ip.fw.verbose=1
    sysctl -w net.inet.ip.fw.debug=0
    ipfw flush
    ipfw add 100 allow ip from any to any via lo0
    # Forward native SMB and NetBIOS sessions to non-privileged ports
    ipfw add 200 fwd <local-ip>,1445 tcp from any to me dst-port 445
    ipfw add 300 fwd <local-ip>,1139 tcp from any to me dst-port 139
    # Forward NetBIOS datagrams to non-privileged ports (does not currently work)
    ipfw add 400 fwd <local-ip>,1137 udp from any to me dst-port 137
    ipfw add 500 fwd <local-ip>,1138 udp from any to me dst-port 138
    ```

    Replace `<local-ip>` with the IP address of the server that Alfresco is running on.

3.  On Linux, the following commands can be used to get started, but be aware these commands will delete all existing firewall and NAT rules and could be a security risk:

    ```
    echo 1 > /proc/sys/net/ipv4/ip_forward
    modprobe iptable_nat
    iptables -F
    iptables -t nat -F
    iptables -P INPUT ACCEPT
    iptables -P FORWARD ACCEPT
    iptables -P OUTPUT ACCEPT
    iptables -t nat -A PREROUTING -p tcp --dport 445 -j REDIRECT --to-ports 1445
    iptables -t nat -A PREROUTING -p tcp --dport 139 -j REDIRECT --to-ports 1139
    iptables -t nat -A PREROUTING -p udp --dport 137 -j REDIRECT --to-ports 1137
    iptables -t nat -A PREROUTING -p udp --dport 138 -j REDIRECT --to-ports 1138
    ```

    The UDP forwarding does not work, which affects the NetBIOS name lookups. A workaround is either to add a DNS entry matching the CIFS server name and/or add a static WINS mapping, or add an entry to the clients LMHOSTS file.


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

