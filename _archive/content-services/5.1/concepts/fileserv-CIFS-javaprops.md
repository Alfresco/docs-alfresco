---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
---

# Java-based SMB properties

The following properties will only take effect on non-Windows servers, where the Java-based SMB implementation is used.

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

-   **cifs.sessionDebug**

    Specifies the CIFS session debug flags. This also enables the `org.alfresco.fileserver=debug` logging level. The comma delimeted list of levels include:

    ```
    NETBIOS, STATE, RXDATA, TXDATA, DUMPDATA, NEGOTIATE, TREE, SEARCH, INFO, FILE, FILEIO, TRANSACT
    ECHO, ERROR, IPC, LOCK, PKTTYPE, DCERPC, STATECACHE, TIMING, NOTIFY, STREAMS, SOCKET, PKTPOOL
    PKTSTATS, THREADPOOL, BENCHMARK
    ```

    For example, `cifs.sessionDebug=INFO`.

-   **cifs.pseudoFiles.enabled**

    Controls whether URL shortcuts or desktop actions are displayed on CIFS. The default value is true.

-   **cifs.pseudoFiles.shareURL.enabled**

    Controls whether the URL shortcut for Alfresco Share is shown. The default value is true.

-   **cifs.pseudoFiles.shareURL.fileName**

    Specifies the name of the CIFS URL for Alfresco Share.


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

