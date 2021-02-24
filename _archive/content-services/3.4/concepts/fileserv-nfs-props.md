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

**Parent topic:**[Configuring the NFS file server](../concepts/fileserv-nfs-intro.md)

