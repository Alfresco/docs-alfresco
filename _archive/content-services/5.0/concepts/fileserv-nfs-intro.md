---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the NFS file server

It is recommended that TCP connections are used to connect to the Alfresco NFS server. Using a read/write size of 32 KB will also help to optimize the performance.

-   **[NFS file server properties](../concepts/fileserv-nfs-props.md)**  
The following properties can be configured for the NFS server.
-   **[NFS advanced Spring overrides](../tasks/fileserv-nfs-adv.md)**  
The NFS server beans are declared in the file-servers-context.xml file. Using the subsystem extension classpath mechanism, site specific customization of these default values can be placed in a Spring bean file in <extension\>\\subsystems\\fileServers\\default\\default\\custom-file-servers-context.xml \(note that the default\\default part of the path is intentional\).

**Parent topic:**[Configuring file servers](../concepts/fileserv-subsystem-intro.md)

