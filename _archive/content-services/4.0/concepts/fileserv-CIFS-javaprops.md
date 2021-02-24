---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem SMB CIFS
---

# Java-based SMB properties

The following properties will only take effect on non-Windows servers, where the Java-based SMB implementation is used, unless it is enabled on Windows using the advanced Spring bean definition overrides.

-   **cifs.broadcast**

    Specifies the broadcast mask for the network.

-   **cifs.bindto**

    Specifies the network adapter to which to bind. If not specified, the server will bind to all available adapters/addresses.

-   **cifs.tcpipSMB.port**

    Controls the port used to listen for the SMB over TCP/IP protocol \(or native SMB\), supported by Win2000 and above clients. The default port is 445.

-   **cifs.ipv6.enabled**

    Enables the use of IP v6 in addition to IP v4 for native SMB. When `true`, the server will listen for incoming connections on IPv6 and IPv4 sockets.

-   **cifs.netBIOSSMB.namePort**

    Controls the NetBIOS name server port on which to listen. The default is 137.

-   **cifs.netBIOSSMB.datagramPort**

    Controls the NetBIOS datagram port. The default is 138.

-   **cifs.netBIOSSMB.sessionPort**

    Controls the NetBIOS session port on which to listen for incoming session requests. The default is 139.

-   **cifs.WINS.autoDetectEnabled**

    When `true` causes the `cifs.WINS.primary` and `cifs.WINS.secondary` properties to be ignored.

-   **cifs.WINS.primary**

    Specifies a primary WINS server with which to register the server name.

-   **cifs.WINS.secondary**

    Specifies a secondary WINS server with which to register the server name.

-   **cifs.disableNIO**

    Disables the new NIO-based CIFS server code and reverts to using the older socket based code.


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

