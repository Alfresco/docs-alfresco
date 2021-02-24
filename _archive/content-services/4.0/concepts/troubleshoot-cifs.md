---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting error messages
---

# Troubleshooting CIFS

This section provides help for diagnosing and resolving any issues that might arise when configuring CIFS.

**Issue**

Unable to connect to locally installed Alfresco server via CIFS.

**Troubleshooting**

To troubleshoot this issue, perform the following steps, testing after each step to determine if the issue is resolved. If the issue is not resolved, continue to the next item in the list.

-   Check if Alfresco has finished loading. Look for a *Server startup* message in the log file.
-   Does the connection work if you use the IP address instead of the host name.
-   Check if Alfresco Share shows the `nbtstat -n` message on the Windows server.
-   Check if Alfresco Share shows the `nbtstat -na <server ip>` message on the client machine.
-   Enable all the NB-Name-In and NB-Session\_In rules by navigating to **Windows Firewall Advanced Settings \> Inbound Rules \> File and Printer Sharing** tab.
-   Check if Alfresco can bind to the necessary ports. To do so, check for errors in the log file related to java.net.BindException errors.
-   Change the `cifs.serverName` property and restart Alfresco.
-   If using Windows server, verify that the following DLLs are available to Alfresco \(usually in C:\\Alfresco\\tomcat\\bin\):
    -   Win32NetBIOS.dll
    -   Win32NetBIOSx64.dll
    -   Win32Utils.dll
    -   Win32Utilsx64.dll

        These DLLs handle the connection between the native CIFS server and Alfresco.

-   Finally, if you can connect to the Alfresco server but cannot authenticate your login details, check if you can use the same user name and password to login to Share.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

