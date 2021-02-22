---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Setting up SharePoint Protocol Support with a non-SSL connection

You can enable basic authentication over a non-SSL connection on Windows 7/Windows Vista clients using Office 2010/2013 for the SharePoint Protocol.

Alfresco supports Office 2010/2013 clients and Office 2007/2010 on Windows 7.

**Note:** If you are not [Setting up SharePoint Protocol to work with HTTPS](SharePoint-HTTPS-setup.md), and are using a non-SSL connection instead, follow the workaround as specified by Microsoft to [Enable basic authentication over a non-SSL connection](http://support.microsoft.com/kb/2123563).

1.  Set the following registry keys.

    Each registry key takes the following values:

        |**0**|Basic authentication disabled|
    |**1**|Basic authentication enabled for SSL shares only|
    |**2 or greater**|Basic authentication enabled for SSL shares and for non-SSL shares|

    1.  Enable basic authentication on the client machine. Change or create the following registry key and set its value to 2:

        ```
        "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters\BasicAuthLevel" (REG_DWORD)
        ```

    2.  Update the registry on the client machine, using the appropriate registry key for your version of Office. Change or create the following registry key and set its value to 2:

        For Office 2010:

        ```
        “HKEY_CURRENT_USER\Software\Microsoft\Office\14.0\Common\Internet\BasicAuthLevel” (REG_DWORD)
        ```

        For Office 2013:

        ```
        “HKEY_CURRENT_USER\Software\Microsoft\Office\15.0\Common\Internet\BasicAuthLevel” (REG_DWORD)
        ```

    3.  Restart the web client Windows service for the changes to take effect.

2.  If the Office client requests credentials for each operation, this might relate to domain policy and client settings. See the Microsoft article, [Prompt for Credentials When Accessing FQDN Sites From a Windows Vista or Windows 7 Computer](http://support.microsoft.com/kb/943280), if you experience one of the following problems:

    -   Windows 7 prompts for authentication when accessing SharePoint documents
    -   You are prompted to enter your credentials when you access an FQDN site from a computer that is running Windows Vista or Windows 7 and has no proxy configured
    **Note:** If you are not being prompted for your credentials, try clicking the small down arrow next to the **Open** button \(instead of clicking the **Open** button itself\). The client will then prompt you for your credentials and you can start working with documents from Alfresco sites. 


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

