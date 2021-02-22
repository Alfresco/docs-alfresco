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

    This property is used to enable or disable the NFS server.

-   **nfs.user.mappings**

    This is a composite property that is used to configure the user ID and the group ID for the Alfresco user name mappings that are used by the current authentication implementation.


For example, the following configuration gives `admin` a `uid` and `gid` of 0 and `auser` a `uid` and `gid` of 501.

```
nfs.user.mappings=admin,auser
nfs.user.mappings.value.admin.uid=0
nfs.user.mappings.value.admin.gid=0
nfs.user.mappings.value.auser.uid=501
nfs.user.mappings.value.auser.gid=501
```

-   **nfs.nfsServerPort**

    This is the property that contains the port number to run the main NFS server on. The default is to allocate the default NFS port: 2049. This may clash with a running native NFS server.


-   **nfs.mountServerPort**

    This is the property that contains the port number to run the mountserver service on. The default is to allocate an available non-privileged port.


-   **nfs.portMapperPort**

    This is the property that contains the port number to run the portmapper service on. The default port is 111.

    **Tip:** To prevent the NFS server and mount server registering with a portmapper set nfs.portMapperPort to -1.


-   **nfs.rpcRegisterPort**

    This is the property that contains the port number for the RPC registration port. A value of 0 in this property will allocate next available port.


-   **nfs.portMapperEnabled**

    This property enables the built-in portmapper service.

    **Note:** The portmapper service is usually enabled on Windows where there is no default portmapper service. On the Linux and Unix operating systems the built-in portmapper service can be used, this also saves having to run the Alfresco server using the root account.


**Parent topic:**[Configuring the NFS file server](../concepts/fileserv-nfs-intro.md)

