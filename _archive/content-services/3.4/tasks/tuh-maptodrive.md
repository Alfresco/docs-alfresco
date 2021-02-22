---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
keyword: webdav
---

# Mapping an Alfresco space to a drive

Alfresco allows you to map a space to a drive on your computer, which allows you to work offline.

A shared network drive \(*network share*\) is a folder on a network computer that you have mapped to a virtual drive on your own computer. If you have the correct permissions, working with files on the shared drive is no different from working with files on your local drive. In exactly the same way, Alfresco allows you to map a space to a drive on your computer. If you add a file into any of the directories on the mapped drive and then refresh your browser, the added file will also appear in the corresponding space in Alfresco. If you then delete the file in Alfresco, the file is simultaneously deleted from your mapped drive.

This feature allows you to work offline.

1.  Before you map Alfresco using WebDAV, ensure that the **WebClient** service is running.

    1.  Open the Services window by selecting **Start \> Run**, and then typing `services.msc`.

        Alternatively, open the Control Panel, click **Administrative Tools**, and then click **Services**.

    2.  Start the WebClient service.

    **Note:** On Windows Server 2008, the WebClient service is not available by default. You must install the Desktop Experience feature to enable this service.

2.  Adjust the Basic Authentication Level key in the Registry Editor.

    1.  Open the Registry Editor by selecting **Start \> Run**, and then typing `regedit`.

        **Note:** On Windows XP and above, select **Start** \> **Accessories** \> **Run**.

    2.  Locate the key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\WebClient\Parameters\`.

    3.  Create a new DWORD value for basic authentication. On Windows XP, set the basic authentication parameter to 1.

        Examples:

        -   On Windows XP, create the DWORD parameter `UseBasicAuth` and set the value to 1. For example, `UseBasicAuth = 1`.
        -   On Windows Vista and above, create the DWORD parameter `BasicAuthLevel` and set the value to 2. For example, `BasicAuthLevel = 2`.
        **Note:** Alfresco WebDAV can be remounted after a delay of 60 seconds since the last unmounting on Windows XP. This is because it does not accept connections from root and on paths higher than /alfresco/webdav. All these paths are interpreted by MiniRedir as non-DAV servers and it caches the paths with a 60-second timeout by default. You can change this behavior by adding and/or setting the DWORD parameter `ServerNotFoundCacheLifeTimeInSec` to a smaller or higher value, for example, 10 seconds. Setting the value to zero is also valid because caching of non-DAV servers is disabled. This parameter is set in the Registry Editor at the same level as the Basic Authentication Level parameter.

3.  Adjust the read-only settings in the Registry Editor.

    **Note:** If you are using Office 2010 with a non-SSL connection to Alfresco, then skip steps a to c and start at step d.

    1.  In the Registry Editor, select the key `HKEY_CURRENT_USER\Software\Microsoft\Office\<version_number>\Common\Internet`.

    2.  Create a new DWORD value called `OpenDocumentsReadWriteWhileBrowsing`.

    3.  Set the value of `OpenDocumentsReadWriteWhileBrowsing` to 1.

        **Note:** Unless you are using Office 2010 with a non-SSL connection to Alfresco then continue at step 5.

    4.  In the Registry Editor, select the key `HKEY_CURRENT_USER\Software\Microsoft\Office\14.0\Common\Internet`.

    5.  Create a new DWORD value called `BasicAuthLevel`.

    6.  Set the value of `BasicAuthLevel` to 2.

4.  Close the Registry Editor and open Windows Explorer.

5.  Right click on **Computer**, and then select **Map Network Drive**.

6.  Choose a drive letter.

7.  Use the following as the WebDAV location:

    http://localhost:8080/alfresco/webdav

    **Note:** The following issues relate to using WebDAV on Windows XP:

    -   On Windows XP, use http://localhost:80/alfresco/webdav. Windows XP WebDAV MiniRedir does not support custom ports in a WebDAV URL, therefore it is only possible to mount Alfresco WebDAV as a network drive by accessing Alfresco using port 80.
    -   On Windows XP, NTLM auth is not supported when mapping WebDAV as a network drive.
    -   On Windows XP, it is not possible to map a drive to Alfresco WebDAV unless the application server handles an OPTIONS request to the root context. This is enabled on a default Tomcat installation.
8.  If single sign-on is not active, select **Connect Using Different Credentials**.

9.  Click **OK** and enter your credentials.


You can now connect to Alfresco using WebDAV.

**Note:** Windows XP introduced a new feature called WebDav redirector. The redirector allows mapping of DAV shares to drive letters and conversion of DAV URLs to UNC paths for applications which explicitly rely on WinAPI compatibility. For this reason, Alfresco recommends using WebDAV only as a network drive on Windows XP and above for full WebDav access.

If you try to connect to Alfresco using WebDAV mapped as a network location, you may see an error when trying to open files from different applications for editing. Some Windows applications cannot correctly understand WebDAV paths when connected as a network location because they try to combine the WebDAV document path and the active Windows working directory path.

The Office 2003 WebDAV component is not completely compatible with the functionality of WebDAV MiniRedir on Windows Vista or above. You may see errors connected with invalid UNC paths while working with WebDAV network drives via Office 2003 applications. Alfresco recommends using Office 2007 or above on Windows Vista or above for normal access to Alfresco WebDAV. Office 2003 may be used on Windows XP or below. WebDAV MiniRedir on Windows Vista pre SP2 has several issues connected with mandatory support of WebDAV requests on all the folders up to root context of a WebDAV URL. Alfresco requires that SP2 updates are installed on Windows Vista to work with Alfresco WebDAV because the root context is under the control of the Web Application Server and not Alfresco.

**Parent topic:**[Getting Started](../concepts/cuh-gettingstarted.md)

