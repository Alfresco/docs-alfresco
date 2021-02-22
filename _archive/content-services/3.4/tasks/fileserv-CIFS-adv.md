---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem SMB CIFS
---

# SMB/CIFS advanced Spring overrides

The SMB/CIFS server beans are declared in the file-servers-context.xml file in <configRoot\>\\classes\\alfresco\\subsystems\\fileServers\\default\\.

When using the subsystem extension classpath mechanism, create a Spring bean override file called <extension\>\\subsystems\\fileServers\\default\\default\\file-servers-context.xml \(note that the you need to include the default\\default part of the path, which is intentional\). Add the site-specific customization of these default values to the override file.

The main bean that drives the CIFS server configuration is called `cifsServerConfig`. This has several properties that can be populated with child beans that control various optional SMB implementations.

-   **tcpipSMB**

    Controls the Java-based SMB over TCP/IP implementation, which is compatible with Windows 2000 clients and later.

-   **netBIOSSMB**

    Controls the Java-based NetBIOS over TCP/IP implementation, which is compatible with all Windows clients.

-   **win32NetBIOS**

    Controls the JNI-based NetBIOS over TCP/IP implementation, which is only enabled for Alfresco servers running on Windows.


When one of the above properties is not set, it deactivates support for the corresponding protocol implementation. The `tcpipSMB` and `netBIOSSMB` beans have a platforms property that allows their configuration to be targeted to Alfresco servers running on specific platforms. The property is formatted as a comma-separated list of platform identifiers. Valid platform identifiers are `linux`, `solaris`, `macosx`, and `aix`.

1.  To run the native SMB over TCP/IP protocol under Windows, you need to disable Windows from using the port by editing, or creating, the following registry key:

    ```
    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NetBT\Parameters]
     "SMBDeviceEnabled"=dword:00000000
    ```

2.  To enable the Java socket based NetBIOS implementation under Windows disable NetBIOS on one or all network adapters.

    This can be done using the Network Connections control panel in the advanced TCP/IP properties for each adapter.

3.  The `serverComment` of the `cifsServerConfig` bean controls the comment that is displayed in various information windows.

4.  The `sessionDebugFlags` property of the `cifsServerConfig` bean enables debug output levels for CIFS server debugging. The value should be in the form of a comma-separated list of the flag names.

    |**Flag**|**Description**|
    |--------|---------------|
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

5.  The log4j.properties file must also have SMB/CIFS protocol debug output enabled using:

    ```
    log4j.logger.org.alfresco.smb.protocol=debug
    ```

6.  The following logging level must also be enabled to log debug output from the core file server code:

    ```
    log4j.logger.org.alfresco.fileserver=debug
    ```


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

