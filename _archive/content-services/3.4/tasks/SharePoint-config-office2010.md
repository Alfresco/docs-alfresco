---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, SharePoint Protocol Support, Extensions/Third Party Tools]
keyword: [Sharepoint, Extensions/Third Party Tools]
---

# Setting up SharePoint Protocol Support to work with Office 2010

This section describes how to configure the SharePoint Protocol Support to work with Office 2010 on Windows 7.

Alfresco supports the use of Office 2010 clients and Office 2007/2010 on Windows 7 with Alfresco Enterprise 3.4.0 or later. Some installations of Windows 7 restrict access to Basic HTTP authentication on non-SSL connections.

1.  Set the following registry keys.

    Each regkey takes the following values:

        |**0**|Basic authentication disabled|
    |**1**|Basic authentication enabled for SSL shares only|
    |**2 or greater**|Basic authentication enabled for SSL shares and for non-SSL shares|

    1.  Change or create the following registry key and set its value to 2.

        ```
        "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters\BasicAuthLevel" (REG_DWORD)
        ```

    2.  Change or create the following registry key and set its value to 2:

        ```
        “HKEY_CURRENT_USER\Software\Microsoft\Office\14.0\Common\Internet\BasicAuthLevel” (REG_DWORD)
        ```

    3.  Restart the web client Windows service for the changes to take effect.

2.  Ensure that the Microsoft patch for the Web Folders component \(KB907306\) is installed on your Windows Vista/Windows 7 client. This patch contains a fix for a bug in Web Folders for Windows Server 2003, Windows Vista, and Windows 7. To install this patch, use the following instructions:

    1.  Download the patch KB907306 from the following location: [http://www.microsoft.com/downloads/details.aspx?familyid=17C36612-632E-4C04-9382-987622ED1D64&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=17C36612-632E-4C04-9382-987622ED1D64&displaylang=en)

    2.  Double-click the Webfldrs-KB907306-ENU.exe file on your hard disk.

        The default installation location is \\Program Files\\Common Files\\Microsoft Shared\\Web Folders.

    3.  Follow the instructions in the setup wizard to complete the installation.

3.  If the Office client requests credentials for each operation, it may be related to domain policy and the client settings. Fixes are available using the instructions in the following articles:

    -   **Windows 7 Prompting for Authentication When Accessing SharePoint Documents** [http://www.quantumofgeek.com/2010/02/windows-7-prompting-for-authentication-when-accessing-sharepoint-documents/](http://www.quantumofgeek.com/2010/02/windows-7-prompting-for-authentication-when-accessing-sharepoint-documents/).
    -   **You are prompted to enter your credentials when you access an FQDN site from a computer that is running Windows Vista or Windows 7 and has no proxy configured** [http://support.microsoft.com/kb/943280](http://support.microsoft.com/kb/943280)
    **Note:** If you experience problems with the prompts for your credentials, clicking small down arrow on the right side of the **Open** button \(instead of clicking the **Open** button itself\). When you have clicked this arrow, the client will prompt you for your credentials and you can start working with documents from the Alfresco sites. 


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

