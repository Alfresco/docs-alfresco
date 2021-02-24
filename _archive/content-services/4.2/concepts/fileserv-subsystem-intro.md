---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring file servers

The File Server subsystem allows access to the Alfresco data stores through the SMB/CIFS, FTP, and NFS protocols. This allows you to browse to the repository using Windows Explorer or by creating a Network Place.

**Note:** Alfresco recommends that you implement an allowed authentication mechanism relative to the file server you are using. For more information on the different types of authentication subsystems in Alfresco and their use, see [Authentication subsystem types](auth-subsystem-types.md).

As with other Alfresco subsystems, the File Server subsystem exposes all of its configuration options as properties that can be controlled through a JMX interface or the global properties file.

The sections that follow describe each of the configurable properties supported by the File Server subsystem.

-   **[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)**  
The server includes Java socket-based implementations of the SMB/CIFS protocol that can be used on any platform.
-   **[Configuring the FTP file server](../concepts/fileserv-ftp-intro.md)**  
This section describes how to configure the FTP file server.
-   **[Configuring the NFS file server](../concepts/fileserv-nfs-intro.md)**  
It is recommended that TCP connections are used to connect to the Alfresco NFS server. Using a read/write size of 32K will also help to optimize the performance.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

