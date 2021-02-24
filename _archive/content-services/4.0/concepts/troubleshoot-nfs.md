---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: NFS
---

# Troubleshooting NFS

This section provides help for diagnosing and resolving any issues that might arise when configuring NFS.

## NFS server port number is not ephemeral

If the `NFSServerPort` property is not given, it defaults to 2049. This is likely to conflict with a native NFS server, if any. The portmapper daemon, when properly used, removes any dependency upon a well known port number, however neither Alfresco nor any native NFS server seem to use this functionality.

## Running native and Alfresco NFS servers on the same host

If you wish to run the native server along side the Alfresco NFS server, you cannot depend upon the portmapper, as there is a 50 percent chance that it will retain the native NFS details. When using `nfs-utils-1.0.10` version on Linux, `mount.nfs` will defer to the portmapper for the port-number, version-number, and protocol of the NFS server in question. Only if all three of these are supplied on the command line will the mount command directly contact the Alfresco NFS server. Failing this, `mount.nfs` will fail as it cannot find the server you have described in the portmapper table. You must therefore configure both `MountServerPort` and `NFSServerPort` to known values above 1024. Afterward the following command line should succeed:

```
mount -oport=yourNfsPort,mountport=yourMountPort,proto=tcp yourFfsServerName:/alfresco /mnt/alfresco/
```

The `proto` option may be either `tcp` or `udp`. It is desirable to have functionality to resolve the NFS server required by the volume requested, however, the portmapper only searches for the NFS server on the version and protocol.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

