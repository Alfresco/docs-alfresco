---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Running the CIFS server from a normal user account

To avoid running the Alfresco set up as root and be able use the CIFS server with standard ports, it can be configured to run using non-privileged ports, and then you can use firewall rules to forward requests from the privileged ports \(TCP 139/445 UDP 137/138\) to the non-privileged ports.

1.  If you are running on Mac OS X 10.10 \(Yosemite\) or later, set up the `pf` firewall to forward to the non-privileged TCP 1139/1445 ports. You will need admin rights to perform these actions:

    1.  In the /etc directory, locate the `pf.conf` file and the `pf.anchors` folder.

        Take a copy of the `pf.conf` file and rename it as `pf-alfresco-cifs.conf`.

    2.  Add the following code to the `pf-alfresco-cifs.conf` file:

        ```
        rdr-anchor “alfresco-forwarding"
        load anchor "alfresco-forwarding" from "/etc/pf.anchors/alfresco.cifs.forwarding"
        ```

    3.  Create a new file in the /etc/pf.anchors folder called `alfresco.cifs.forwarding` and add the following code:

        ```
        rdr pass on en0 inet proto tcp from any to any port 445 -> 127.0.0.1 port 1445 
        rdr pass on en0 inet proto tcp from any to any port 139 -> 127.0.0.1 port 1139
        ```

    4.  Add the following code to the end of the `pf.conf` file:

        ```
        rdr-anchor “alfresco-forwarding"
        load anchor "alfresco-forwarding" from "/etc/pf.anchors/alfresco.cifs.forwarding"
        ```

    5.  Enable port forwarding using this command:

        ```
        pfctl -ef /etc/pf-alfresco-cifs.conf
        ```

2.  For other platforms, configure the CIFS server to use non-privileged ports, use the following property settings:

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
3.  On Mac OS X 10.9 and earlier, use these commands:

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

4.  On Linux, you can use the following commands to get started, but be aware these commands will delete all existing firewall and NAT rules and could be a security risk:

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

5.  On Solaris 10, you can use ipfilter out of the box with the following commands.

    Ensure that your Network address translation \(NAT\) terminal is able to forward IP packets. Use the `routeadm` command to enable or disable the global packet-forwarding function on all IPv4 or IPv6 interfaces of a system.

    ```
    rdr nge0 192.168.244.25/32 port 445 -> 192.168.244.25 port 1445
    rdr nge0 192.168.244.25/32 port 137 -> 192.168.244.25 port 1137
    rdr nge0 192.168.244.25/32 port 138 -> 192.168.244.25 port 1138
    rdr nge0 192.168.244.25/32 port 139 -> 192.168.244.25 port 1139
    ```

    Enable packet filtering for the interface type you are using by uncommenting the appropriate line\(s\) in the /etc/ipf/pfil.ap file and starting the IP filter services.

    ```
    $ svcadm restart network/pfil
    $ svcadm restart ipfilter
    $ ipnat -l 
    ```


**Parent topic:**[Configuring the Common Internet File System \(CIFS\) server](../concepts/fileserv-subsystem-CIFS.md)

