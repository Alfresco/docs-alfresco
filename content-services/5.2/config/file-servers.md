---
title: Configuring file servers
---

The File Server subsystem allows access to the Alfresco Content Services data stores through the SMB/CIFS and FTP protocols. This allows you to browse to the repository using Windows Explorer or by creating a Network Place.

> **Note:** We recommend that you implement an allowed authentication mechanism relative to the file server you are using. For more information on the different types of authentication subsystems and their use, see [Authentication subsystem types]({% link content-services/5.2/admin/auth-sync.md %}#authentication-subsystem-types).

As with other Alfresco Content Services subsystems, the File Server subsystem exposes all of its configuration options as properties that can be controlled through a JMX interface or the global properties file.

-   **[Enabling file servers](#enabling-file-servers)**  
Alfresco Content Services supports access using the CIFS and FTP protocols. Use File Servers in the Admin Console to enable, configure, and disable these services.
-   **[Configuring SMB/CIFS server](#configuring-smb/cifs-server)**  
The server includes Java socket-based implementations of the SMB/CIFS protocol that can be used on any platform.
-   **[Configuring the FTP file server](#configuring-the-ftp-file-server)**  
Use this information to configure the FTP file server.

## Enabling file servers {#enabling-file-servers}

Alfresco Content Services supports access using the CIFS and FTP protocols. Use File Servers in the Admin Console to enable, configure, and disable these services.

1.  Open the Admin Console.

2.  In the Virtual File Systems section, click **File Servers**.

    You see the File Servers page.

3.  Set the File Systems properties:

    |File Systems property|Example setting|What is it?|
    |---------------------|---------------|-----------|
    |**File System Name**|Alfresco|The name given to the file system when using CIFS, WebDAV, or FTP.|

4.  Set the CIFS properties:

    |CIFS property|Example setting|What is it?|
    |-------------|---------------|-----------|
    |**CIFS Enabled**|Yes|This enables or disables the CIFS server.|
    |**Server Name**|${localname}A|The CIFS server host name. This can be a maximum of 16 characters and must be unique on the network. You can use the special token ${localname} in place of the local server's host name and generate a unique name by prepending/appending to it.|
    |**Host Announce**|True|Enables the announcement of the CIFS server to the local domain/workgroup so that it shows up in the Network Places/Network Neighborhood.|
    |**Session Timeout (seconds)**|900|The default CIFS session timeout is 15 minutes. If no I/O occurs on the session within this time then the session will be closed by the server. Windows clients send keep-alive requests, usually within 15 minutes.|
    |**Domain**| |The domain or workgroup to which the server belongs. If not specified then the domain/workgroup of the server is used.|

5.  Set the FTP properties:

    |FTP property|Example setting|What is it?|
    |------------|---------------|-----------|
    |**FTP Enabled**|Yes|This enables or disables the FTP server.|
    |**Port**|2121|This specifies the port on which the FTP server listens for connections.|
    |**Dataport From**| |This specifies the lower limit of the range of data ports.|
    |**Dataport To**| |This specifies the upper limit of the range of data ports.|

6.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


## Configuring SMB/CIFS server {#configuring-smb/cifs-server}

The server includes Java socket-based implementations of the SMB/CIFS protocol that can be used on any platform.

The server can listen for SMB traffic over the TCP protocol (native SMB) supported by Windows 2000 and later versions, and the NetBIOS over TCP (NBT) protocol, supported by all Windows versions. There is also a Windows-specific interface that uses Win32 NetBIOS API calls using JNI code. This allows the CIFS server to run alongside the native Windows file server.

The default configuration uses the JNI-based code under Windows and the Java socket based code under Linux, Solaris, and Mac OS X.

-   **[CIFS file server properties](#cifs-file-server-properties)**  
The following properties can be configured for the SMB/CIFS server.
-   **[Java-based SMB properties](#java-based-smb-properties)**  
The following properties will only take effect on non-Windows servers, where the Java-based SMB implementation is used.
-   **[Running SMB/CIFS from a normal user account](#running-smb/cifs-from-a-normal-user-account)**  
On Unix-like systems such as Linux and Solaris, the default setup must be run using the root user account so that the CIFS server can bind to the privileged ports (TCP 139/445 UDP 137/138).
-   **[SMB/CIFS advanced Spring overrides](#smb/cifs-advanced-spring-overrides)**  
The SMB/CIFS server beans are declared in the file-servers-context.xml file. Using the subsystem extension classpath mechanism, you can place site specific customization of these default values in a Spring bean file in <extension>\subsystems\fileServers\default\default\custom-file-servers-context.xml (note that the default\default part of the path is intentional).
-   **[Additional information for CIFS on Windows](#additional-information-for-cifs-on-windows)**  
Use this information to assist you when setting up CIFS servers on Windows.

### CIFS file server properties {#cifs-file-server-properties}

The following properties can be configured for the SMB/CIFS server.

-   **cifs.enabled**

    Enables or disables the CIFS server.

-   **cifs.serverName**

    Specifies the host name for the CIFS server. If Alfresco Content Services is installed on a Windows server, the name of the machine must not exceed 14 characters and must be unique on the network. Use the special token `${localname}` in place of the local server's host name and you can generate a unique name by prepending/appending to it, for example, `${localname}A`. The combined `${localname}` value must not exceed 15 characters.

    On Windows systems, the value of this property must be different from the server's host name, it should resolve to the same IP address as the server, and must be different from any other host name on the network.

-   **cifs.domain**

    An optional property. When not empty, specifies the domain or workgroup to which the server belongs. This defaults to the domain/workgroup of the server, if not specified.

-   **cifs.hostannounce**

    Enables announcement of the CIFS server to the local domain/workgroup so that it shows up in Network Places/Network Neighborhood. The default value is `true`.

-   **cifs.sessionTimeout**

    Specifies the CIFS session timeout value in seconds. The default session timeout is 15 minutes (900 seconds). If no I/O occurs on the session within this time then the session will be closed by the server. Windows clients send keep-alive requests, usually within 15 minutes.


### Java-based SMB properties {#java-based-smb-properties}

The following properties will only take effect on non-Windows servers, where the Java-based SMB implementation is used.

-   **cifs.broadcast**

    Specifies the broadcast mask for the network.

-   **cifs.bindto**

    Specifies the network adapter to which to bind. If not specified, the server will bind to all available adapters/addresses.

-   **cifs.tcpipSMB.port**

    Controls the port used to listen for the SMB over TCP/IP protocol (or native SMB), supported by Win2000 and above clients. The default port is 445.

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


### Running SMB/CIFS from a normal user account {#running-smb/cifs-from-a-normal-user-account}

On Unix-like systems such as Linux and Solaris, the default setup must be run using the root user account so that the CIFS server can bind to the privileged ports (TCP 139/445 UDP 137/138).

The CIFS server can be configured to run using non-privileged ports and then use firewall rules to forward requests from the privileged ports to the non-privileged ports.

1.  If you are running on Mac OS X 10.10 (Yosemite) or later, set up the `pf` firewall to forward to the non-privileged TCP 1139/1445 ports. You will need admin rights to perform these actions:

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

    Set up the firewall rules to forward requests:

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

    Replace `<local-ip>` with the IP address of the server that Alfresco Content Services is running on.

4.  On Linux, you can use the following commands to get started, but be aware these commands will delete all existing firewall and NAT rules and could be a security risk:

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


### SMB/CIFS advanced Spring overrides {#smb/cifs-advanced-spring-overrides}

The SMB/CIFS server beans are declared in the file-servers-context.xml file. Using the subsystem extension classpath mechanism, you can place site specific customization of these default values in a Spring bean file in <extension>\subsystems\fileServers\default\default\custom-file-servers-context.xml (note that the default\default part of the path is intentional).

The main bean that drives the CIFS server configuration is called `cifsServerConfig`. This has several properties that can be populated with child beans that control various optional SMB implementations.

-   **tcpipSMB**

    Controls the Java-based SMB over TCP/IP implementation, which is compatible with Windows 2000 clients and later.

-   **netBIOSSMB**

    Controls the Java-based NetBIOS over TCP/IP implementation, which is compatible with all Windows clients.

-   **win32NetBIOS**

    Controls the JNI-based NetBIOS over TCP/IP implementation, which is only enabled for Alfresco servers running on Windows.


When one of the specified properties is not set, it deactivates support for the corresponding protocol implementation. The `tcpipSMB` and `netBIOSSMB` beans have a platforms property that allows their configuration to be targeted to Alfresco Content Services servers running on specific platforms. The property is formatted as a comma-separated list of platform identifiers. Valid platform identifiers are `linux`, `solaris`, `macosx`, and `aix`.

1.  The `serverComment` of the `cifsServerConfig` bean controls the comment that is displayed in various information windows.

2.  Use the following steps for troubleshooting CIFS.

    1.  The `sessionDebugFlags` property of the `cifsServerConfig` bean enables debug output levels for CIFS server debugging. The value should be in the form of a comma-separated list of the flag names.

        |Flag|Description|
        |----|-----------|
        |`NetBIOS`|NetBIOS layer|
        |`State`|Session state changes|
        |`Tree`|File system connection/disconnection|
        |`Search`|Folder searches|
        |`Info`|File information requests|
        |`File`|File open/close|
        |`FileIO`|File read/write|
        |`Tran`|Transaction requests|
        |`Echo`|Echo requests|
        |`Errors`|Responses returning an error status|
        |`IPC`|IPC$ named pipe|
        |`Lock`|File byte range lock/unlock|
        |`Pkttype`|Received packet type|
        |`Dcerpc`|DCE/RPC requests|
        |`Statecache`|File state caching|
        |`Notify`|Change notifications|
        |`Streams`|NTFS streams|
        |`Socket`|NetBIOS/native SMB socket connections|
        |`PktPool`|Memory pool allocations/de-allocations|
        |`PktStats`|Memory pool statistics dumped at server shutdown|
        |`ThreadPool`|Thread pool|

    2.  The log4j.properties file must also have SMB/CIFS protocol debug output enabled using:

        ```
        log4j.logger.org.alfresco.smb.protocol=debug
        ```

    3.  The following logging level must also be enabled to log debug output from the core file server code:

        ```
        log4j.logger.org.alfresco.fileserver=debug
        ```


### Additional information for CIFS on Windows {#additional-information-for-cifs-on-windows}

Use this information to assist you when setting up CIFS servers on Windows.

CIFS on Windows works only with NetBIOS.

The process CIFS uses on a supported Windows installation is:

-   The client sends a request to the CIFS server.
-   If the client wants to access a path that starts with the Windows server name, then the CIFS request will be handled by Windows CIFS.
-   If the path starts with the CIFS server name, then the CIFS request will be handled by CIFS.

The dispatching is made at the Windows-level by the NetBIOS Windows DLLs, however this dispatching is not available with native CIFS (port 445).

If you leave port 445 open, requests aimed at CIFS are routed to Windows CIFS and will fail. A CIFS client does not know in advance if a CIFS server listens on NetBIOS ports (137, 138, 139) or native CIFS port (445). It typically sends two connections requests: one to the NetBIOS ports and one to the native CIFS port. The faster request wins and, as native CIFS is typically faster, the connection is likely to fail.

> **Note:** The Java CIFS code supported on Linux is not supported on Windows.

The drawback of using CIFS on a Windows server is performance degradation.

The supported process of using CIFS on Windows forces the clients to use NetBIOS to talk to Alfresco Content Services. NetBIOS is a protocol that is much less efficient and more chatty than the more recent native CIFS (port 445) protocol. A CIFS setup on Windows will suffer performance issues when compared to a Linux/Unix system due to this chattiness.

## Configuring the FTP file server {#configuring-the-ftp-file-server}

Use this information to configure the FTP file server.

For more information about configuring the FTP file server using the Admin Console, see [Enabling file servers](#enabling-file-servers).

-   **[FTP file server properties](#ftp-file-server-properties)**  
The following properties can be configured for the FTP server.
-   **[FTP advanced Spring overrides](#ftp-advanced-spring-overrides)**  
The FTP server beans are declared in the file-servers-context.xml file.

### FTP file server properties {#ftp-file-server-properties}

The following properties can be configured for the FTP server.

-   **ftp.enabled**

    Enables or disables the FTP server.

-   **ftp.port**

    Specifies the port that the FTP server listens for incoming connections on. Defaults to port 21. On some platforms ports below 1024 require the server to be run under a privileged account.

-   **ftp.bindto**

    Specifies the network adapter to bind with. If the network adapter is not specified, the server will bind to all the available adapters/addresses.

-   **ftp.sessionDebug**

    Enable debug output by setting the `SSL` debug flag using `ftp.sessionDebug=SSL`, and also by enabling the `log4j.logger.org.alfresco.fileserver=debug` log4j output.

-   **ftp.dataPortFrom**

    Limits the data ports to a specific range of ports. This property sets the lower limit.

-   **ftp.dataPortTo**

    Limits the data ports to a specific range of ports. This property sets the upper limit.

-   **ftp.keyStore**

    Specifies the path to the keystore file for FTPS support.

-   **ftp.keyStoreType**

    Specifies the file type of the keystore file. The default is JKS.

-   **ftp.keyStorePassphrase**

    Specifies the passphrase for the keystore file.

-   **ftp.trustStore**

    Specifies the path to the truststore file for FTPS support.

-   **ftp.trustStoreType**

    Specifies the file type of the truststore file. The default is JKS.

-   **ftp.trustStorePassphrase**

    Specifies the passphrase for the truststore file.

-   **ftp.requireSecureSession**

    Specifies whether only secure FTPS sessions will be allowed to log in to the FTP server. To force all connections to use FTPS, set `ftp.requireSecureSession=true`.

-   **ftp.sslEngineDebug**

    Specifies the FTP session debug flags, which enables additional debug output from the Java SSLEngine class. The list of values can be STATE, RXDATA, TXDATA, DUMPDATA, SEARCH, INFO, FILE, FILEIO, ERROR, PKTTYPE, TIMING, DATAPORT, DIRECTORY, SSL.


If you have IPv6 enabled on your system, Alfresco Content Services automatically uses IPv6.

The FTPS support runs over the same socket as normal connections; the connection is switched into SSL mode at the request of the client, usually before the user name and password is sent. The client can switch the socket back to plain text mode using the `CCC` command.

The `ftp.keyStore`, `ftp.trustStore`, and respective `ftp.keyStorePassphrase` and `ftp.trustStorePassphrase` values must all be specified to enable FTPS support. Only explicit FTP over SSL/TLS mode is supported. Encrypted data sessions are not supported.

To setup the keystore and truststore files, follow the instructions from the Java6 JSSE Reference Guide. This will provide the values required for the `ftp.keyStore`, `ftp.trustStore`, `ftp.keyStorePassphrase` and `ftp.trustStorePassphrase` values.

### FTP advanced Spring overrides {#ftp-advanced-spring-overrides}

The FTP server beans are declared in the file-servers-context.xml file.

Using the subsystem extension classpath mechanism, site specific customization of these default values can be placed in a Spring bean file. Create a file called custom-file-servers-context.xml and place it in a folder with the path <extension>\subsystems\fileServers\default\default\custom-file-servers-context.xml (note that the default\default part of the path is intentional).

The following properties can be overridden on the `ftpServerConfig` bean.

-   **bindTo**

    Specifies the address the FTP server binds to, if not specified the server will bind to all available addresses.


1.  The `debugFlags` property enables debug output levels for FTP server debugging. The value should be a comma-separated list of flag names from the following table:

    |**Flag**|**Description**|
    |--------|---------------|
    |`State`|Session state changes|
    |`Search`|Folder searches|
    |`Info`|File information requests|
    |`File`|File open/close|
    |`FileIO`|File read/write|
    |`Error`|Errors|
    |`Pkttype`|Received packet type|
    |`Timing`|Time packet processing|
    |`Dataport`|Data port|
    |`Directory`|Directory commands|

2.  Configure logging levels for the FTP server in $ALF_HOME/tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties using:

    ```
    log4j.logger.org.alfresco.ftp.protocol=debug
    log4j.logger.org.alfresco.ftp.server=debug
    ```


