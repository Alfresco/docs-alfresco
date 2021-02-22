---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Setting up SharePoint Protocol Support to work with Office

This section describes how to configure the SharePoint Protocol Support to work with Office 2010 on Windows 7 or Windows Vista, or Microsoft Office for Mac.

Alfresco supports the use of Office 2010 clients and Office 2007/2010 on Windows 7, Microsoft Office for Mac 2011, and Office for Mac 14.3.1. Some installations of Windows 7 restrict access to Basic HTTP authentication on non-SSL connections.

1.  For Windows: Set the following registry keys.

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

2.  On Windows Vista, ensure that the Microsoft patch for the Web Folders component \(KB907306\) is installed on your Windows Vista client. This patch contains a fix for a bug in Web Folders for Windows Server 2003 or Windows Vista. To install this patch:

    1.  Download the patch KB907306 from the following location: [http://www.microsoft.com/downloads/details.aspx?familyid=17C36612-632E-4C04-9382-987622ED1D64&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=17C36612-632E-4C04-9382-987622ED1D64&displaylang=en)

    2.  Double-click the Webfldrs-KB907306-ENU.exe file.

        The default installation location is \\Program Files\\Common Files\\Microsoft Shared\\Web Folders.

    3.  Follow the instructions in the setup wizard to complete the installation.

3.  If the Office client requests credentials for each operation, it may be related to domain policy and the client settings. For example:

    -   **Windows 7 Prompting for Authentication When Accessing SharePoint Documents**
    -   **You are prompted to enter your credentials when you access an FQDN site from a computer that is running Windows Vista or Windows 7 and has no proxy configured** [http://support.microsoft.com/kb/943280](http://support.microsoft.com/kb/943280)
    **Note:** If you experience problems with the prompts for your credentials, click the small down arrow on the right side of the **Open** button \(instead of clicking the **Open** button itself\). When you have clicked this arrow, the client will prompt you for your credentials and you can start working with documents from the Alfresco sites. 

4.  If you are using Microsoft Office for Mac 2011, follow the guidance here: [Microsoft support - Mac 2011](http://support.microsoft.com/kb/2498069)

5.  If you are using Microsoft Office for Mac 14.3.1, follow the guidance in step 3, but use the following command at the terminal prompt:

    ```
    defaults -currentHost write com.microsoft.registrationDB hkey_current_user\\hkey_local_machine\\software\\microsoft\\office\\14.0\\common\\internetbasicauthlevel -int [Authentication]
    ```


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

