---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring file servers

The File Server subsystem allows access to the Alfresco Content Services data stores through the SMB/CIFS and FTP protocols. This allows you to browse to the repository using Windows Explorer or by creating a Network Place.

**Note:** We recommend that you implement an allowed authentication mechanism relative to the file server you are using. For more information on the different types of authentication subsystems and their use, see [Authentication subsystem types](auth-subsystem-types.md).

As with other Alfresco Content Services subsystems, the File Server subsystem exposes all of its configuration options as properties that can be controlled through a JMX interface or the global properties file.

-   **[Enabling file servers](../tasks/adminconsole-fileservers.md)**  
Alfresco Content Services supports access using the CIFS and FTP protocols. Use File Servers in the Admin Console to enable, configure, and disable these services.
-   **[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)**  
The server includes Java socket-based implementations of the SMB/CIFS protocol that can be used on any platform.
-   **[Configuring the FTP file server](../concepts/fileserv-ftp-intro.md)**  
Use this information to configure the FTP file server.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

