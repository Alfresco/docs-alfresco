---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem NFS
---

# NFS advanced Spring overrides

The NFS server beans are declared in the file-servers-context.xml file in <configRoot\>\\classes\\alfresco\\subsystems\\fileServers\\default.

When using the subsystem extension classpath mechanism, create a Spring bean override file called <extension\>\\subsystems\\fileServers\\default\\default\\file-servers-context.xml \(note that the you need to include the default\\default part of the path, which is intentional\). Add the site-specific customization of these default values to the override file.

The following properties can be overridden on the `nfsServerConfig` bean.

-   **portMapperEnabled**

    Enables the built-in portmapper service. This would usually be enabled on Windows where there is no default portmapper service. Under Linux/Unix operating systems, the built-in portmapper service can be used, which also saves having to run the Alfresco server using the root account.

-   **threadPool**

    Sets the size of the RPc processing thread pool. The minimum number of threads is 4, the default setting is 8.

-   **packetPool**

    Sets the size of the packet pool used to receive RPC requests and send RPC replies. The minimum number of packets is 10, the default setting is 50.

-   **portMapperPort**

    The port number to run the portmapper service on. The default port is 111.

-   **mountServerPort**

    The port number to run the mountserver service on. The default is to allocate an available non-privileged port.

-   **nfsServerPort**

    The port number to run main NFS server service on. The default is to allocate the default NFS port: 2049. This will likely clash with a running native NFS server.


1.  The `debugFlags` property enables debug output levels for NFS server debugging. The value should be in the form of a comma-separated list of the flag names in the following table.

    |**Flag**|**Description**|
    |--------|---------------|
    |`RxData`|Request data details|
    |`TxData`|Response data details|
    |`DumpData`|Hex dump request/response data|
    |`Search`|Folder searches|
    |`Info`|File information requests|
    |`File`|File open/close|
    |`FileIO`|File read/write|
    |`Error`|Errors|
    |`Directory`|Directory commands|
    |`Timing`|Time packet processing|
    |`Session`|Session creation/deletion|

2.  The log4j.properties file must also have NFS protocol debug output enabled using:

    ```
    log4j.logger.org.alfresco.nfs.server=debug
    ```

3.  The following logging level must also be enabled to log debug output from the core file server code:

    ```
    log4j.logger.org.alfresco.fileserver=debug
    ```

4.  There are also the following log4j output options for the NFS/mount/portmapper services:

    ```
    log4j.logger.org.alfresco.nfs.protocol=debug
    ```

5.  Output server level debug information from the NFS, mount and portmapper services.

    ```
    log4j.logger.org.alfresco.nfs.protocol.auth=debug
    ```


**Parent topic:**[Configuring the NFS file server](../concepts/fileserv-nfs-intro.md)

