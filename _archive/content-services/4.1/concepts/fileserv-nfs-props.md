---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem NFS
---

# NFS file server properties

The following properties can be configured for the NFS server.

-   **nfs.enabled**

    Enables or disables the NFS server.

-   **nfs.user.mappings**

    A composite property that configures the user ID/group ID to the Alfresco user name mappings that are used by the current RPC authentication implementation.


For example, the following configuration gives `admin` a `uid` and `gid` of 0 and `auser` a `uid` and `gid` of 501.

```
nfs.user.mappings=admin,auser
nfs.user.mappings.value.admin.uid=0
nfs.user.mappings.value.admin.gid=0
nfs.user.mappings.value.auser.uid=501
nfs.user.mappings.value.auser.gid=501
```

-   **nfs.nfsServerPort**

    The port number used to run the main NFS server service on. The default NFS port: 2049 allocated by default. Ensure that this port number does not clash with a running native NFS server.


-   **nfs.mountServerPort**

    The port number used to run the mountserver service on. The default is to allocate an available non-privileged port.


-   **nfs.portMapperPort**

    The port number used to run the portmapper service on. The default port is 111. To prevent the NFS server and mount server registering with a portmapper set this property to -1


-   **nfs.rpcRegisterPort**

    This is the RPC registration port, the value 0 in this property allocates the next available port.


-   **nfs.portMapperEnabled**

    This property enables the built-in portmapper service. This would usually be enabled on Windows where there isn't a default portmapper service. Under Linux/Unix operating systems the built-in portmapper service can be used, this also saves having to run the Alfresco server using the root account.


The following properties are overridable on the nfsServerConfig bean

-   **portMapperEnabled**

    Enables the built-in portmapper service. This would usually be enabled on Windows where there isn't a default portmapper service. Under Linux/Unix operating systems the built-in portmapper service can be used, this also saves having to run the Alfresco server using the root account.


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


-   **debugFlags**

    This property enables debug output levels for NFS server debugging. The value for this property should be in the form of a comma-separated list of the flag names in the table below.

    |Flag|Description|
    |----|-----------|
    |RxData|Request data details|
    |TxData|Response data details|
    |DumpData Hex|dump request/response data|
    |Search|Folder searches|
    |Info|File information requests|
    |File|File open/close|
    |FileIO|File read/write|
    |Error|Error responses|
    |Directory|Directory requests \(readdir/readdirplus\)|
    |Timing|Request timing|
    |Session|Session creation/deletion|
    |
    |


**Parent topic:**[Configuring the NFS file server](../concepts/fileserv-nfs-intro.md)

