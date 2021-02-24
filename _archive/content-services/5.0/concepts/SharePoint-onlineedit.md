---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring SharePoint Protocol for Online Editing

The following issues are known for configuring the SharePoint Protocol for Online Editing.

-   There is a known issue where Online Editing is not available using the 64-bit version of Internet Explorer. See [Plan browser support \(SharePoint Server 2010\)](http://technet.microsoft.com/en-us/library/cc263526(v=office.14)) for more information.
-   It is important to set the `vti.server.external.host` and `vti.server.external.port` properties in the alfresco-global.properties file to the externally resolvable host and port name that SharePoint clients will communicate with. These properties default to the host machine's local name and port 7070, respectively. These values are used by Share to generate the **Edit Online** link, which opens the document using the SharePoint module.
-   There is a known issue with Office 2003 and 2007 Office documents opening as read-only in Internet Explorer for all versions before Vista SP1.

    Refer to the knowledge base article [870853](http://support.microsoft.com/kb/870853) on the Microsoft website to enable the Online Editing functionality.

-   To use Online Editing on Windows 7, you must set `BasicAuthLevel` in the registry.

    Basic authentication is disabled on Office 2010 by default. To enable it, create or edit the following registry key: `HKCU\Software\Microsoft\Office\14.0\Common\Internet: BasicAuthLevel=2`.

    Alternatively, use Pass-through or Kerberos authentication.

-   There is a known issue with MS Office 2014 for Mac with the latest patch \(14.3.6\).

    Refer to the knowledge base article [2498069](http://support.microsoft.com/kb/2498069) on the Microsoft website to enable the Online Editing functionality.

    Use the following command to store the correct preference for MS Office 14.3.x:

    ```
    defaults -currentHost write com.microsoft.registrationDB hkey_current_user\\hkey_local_machine\\software\\microsoft\\office\\14.0\\common\\internet\\basicauthlevel -int 2
    ```


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

