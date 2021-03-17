---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting error messages
---

# Troubleshooting WebDAV

This section provides help for diagnosing and resolving any issues that might arise when configuring WebDAV.

**Issue**

Unable to connect to locally installed Alfresco server via WebDAV.

**Troubleshooting**

To troubleshoot this issue, perform the following steps, testing after each step to determine if the issue is resolved. If the issue is not resolved, continue to the next item in the list.

-   Check if Alfresco has finished loading. Look for a *Server startup* message in the log file.
-   Does the connection work if you use the IP address instead of the host name.
-   Check if you can browse folders using https://<alfresco\_ip\>/alfresco/webdav in a web browser.
-   Add your Alfresco server IP to the Trusted sites list in Windows Internet Explorer.
-   Make sure the Webclient service is running. To do so, follow the steps below:

    1.  Start services.msc.
    2.  Start the Webclient service.
    **Note:** For details on running the WebClient service, see Step 1 of [Mapping an Alfresco space to a drive](../tasks/tuh-maptodrive.md).

-   Make sure to set the value of BasicAuthLevel as shown below:

    ```
    `[HKLM\SYSTEM\CurrentControlSet\services\WebClient\Parameters] "BasicAuthLevel"=2`
    ```

    **Note:** For details on setting the Basic Authentication Level key in the Registry Editor, see Step 2 and Step 3 of [Mapping an Alfresco space to a drive](../tasks/tuh-maptodrive.md).

-   Finally, if you can connect to the Alfresco server but cannot authenticate your login details, check if you can use the same user name and password to login to Share.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

