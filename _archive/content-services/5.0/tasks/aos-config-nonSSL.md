---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Setting up Alfresco Office Services using a non-SSL connection

If you are using AOS with a non-SSL connection, you must edit the Windows registry, or run a command at the Mac terminal for every client machine.

We strongly recommend that you activate SSL when using Alfresco Office Services. For more information, see [Secure Sockets Layer \(SSL\) and the Alfresco repository](../concepts/configure-ssl-intro.md). This information is provided in the case where it is not possible to set up SSL in your environment.

1.  If you are using Microsoft Office for Mac 2011 without SSL, run this command on the client machine:

    ```
    defaults -currentHost write com.microsoft.registrationDB hkey_current_user\\hkey_local_machine\\software\\microsoft\\office\\14.0\\common\\internet\\basicauthlevel -int 2
    ```

2.  Follow the remaining steps if you are using Microsoft Office 2010 or 2013. Set the following registry keys:

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

3.  If the Office client requests credentials for each operation, this might relate to domain policy and client settings. See the Microsoft article, [Prompt for Credentials When Accessing FQDN Sites From a Windows Vista or Windows 7 Computer](http://support.microsoft.com/kb/943280), if you experience one of the following problems:

    -   Windows 7 prompts for authentication when accessing documents
    -   You are prompted to enter your credentials when you access an FQDN site from a computer that is running Windows Vista or Windows 7 and has no proxy configured
    **Note:** If you are not being prompted for your credentials, try clicking the small down arrow next to the **Open** button \(instead of clicking the **Open** button itself\). The client will then prompt you for your credentials and you can start working with documents from Alfresco sites. 


**Parent topic:**[Configuring Alfresco Office Services](../concepts/aos-config.md)

