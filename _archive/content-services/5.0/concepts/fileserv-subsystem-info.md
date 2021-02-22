---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Additional information for CIFS on Windows

This section provides additional information to assist you when setting up CIFS servers on Windows.

CIFS on Windows works only with NetBIOS.

The process CIFS uses on a supported Windows installation is:

-   The client sends a request to the CIFS server.
-   If the client wants to access a path that starts with the Windows server name, then the CIFS request will be handled by Windows CIFS.
-   If the path starts with the Alfresco CIFS server name, then the CIFS request will be handled by Alfresco CIFS.

The dispatching is made at the Windows-level by the NetBIOS Windows DLLs, however this dispatching is not available with native CIFS \(port 445\).

If you leave port 445 open, requests aimed at Alfresco CIFS are routed to Windows CIFS and will fail. A CIFS client does not know in advance if a CIFS server listens on NetBIOS ports \(137, 138, 139\) or native CIFS port \(445\). It typically sends two connections requests: one to the NetBIOS ports and one to the native CIFS port. The faster request wins and, as native CIFS is typically faster, the connection is likely to fail.

**Note:** The Java CIFS code that Alfresco supports on Linux is not supported on Windows.

The drawback of using CIFS on a Windows server is performance degradation.

The supported process of using CIFS on Windows forces the clients to use NetBIOS to talk to Alfresco. NetBIOS is a protocol that is much less efficient and more chatty than the more recent native CIFS \(port 445\) protocol. An Alfresco CIFS setup on Windows will suffer performance issues when compared to a Linux/Unix system due to this chattiness.

**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

