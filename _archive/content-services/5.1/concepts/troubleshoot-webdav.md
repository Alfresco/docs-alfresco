---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: troubleshooting error messages
---

# Troubleshooting WebDAV

Diagnose and resolve issues that might arise when configuring WebDAV.

Alfresco uses two implementations of WebDAV:

-   RFC-compliant WebDAV: alfresco/webdav
-   Microsoft-compliant WebDAV: alfresco/aos

Microsoft WebDAV extensions \(MS-DAVEXT\) are only partially compatible with the WebDAV standard, therefore it is recommended that you use /alfresco/aos on Windows clients and /alfresco/webdav on Linux-based systems.

\(Windows\)

## Unable to connect to locally installed Alfresco server by using WebDAV

-   Check if Alfresco has finished loading. Look for a *Server startup* message in the log file
-   Check if the connection works if you use the IP address instead of the host name
-   Check if you can browse folders using https://<alfresco\_ip\>/alfresco/aos in a web browser
-   Add your Alfresco server IP to the Trusted sites list in Windows Internet Explorer
-   Make sure the **WebClient** service is running. To do so, follow the steps:

    1.  Start services.msc.
    2.  Start the **WebClient** service.
    **Note:** For details on running the **WebClient** service, see [Enabling the WebClient service in Windows](https://blogs.msdn.microsoft.com/johnguin/2012/06/24/enabling-the-webclient-service-in-windows/).

-   If you are not using SSL, check your connection configuration for Windows and Microsoft Office.

    **Note:** Refer to Microsoft for details on setting the Basic Authentication Level key in the Registry Editor.

-   If you can connect to the Alfresco server but cannot authenticate your login details, check if you can use the same user name and password to log in to Share.

## Moving a file or folder using WebDAV on an Ubuntu client causes loss of metadata and creates a new node reference

There is a known problem where Ubuntu creates a new nodeRef when you move a file or a folder in WebDAV, because it uses PUT and DELETE methods instead of a MOVE method. As a result, the nodeRef for the file or folder changes and any associated metadata is lost. This issue applies to all versions of Ubuntu, but does not occur when using a Windows client.

## Editor role cannot edit content using WebDAV and Cyberduck version 4.4+

There is a known issue when using WebDAV with Cyberduck 4.4 and later, where content cannot be edited due to insufficient permissions. To avoid this problem, you can either use a version of Cyberduck earlier than 4.4, or assign permissions to the user to allow them to create files.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

