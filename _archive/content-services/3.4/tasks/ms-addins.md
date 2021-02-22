---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, MS Office Add-in, Extensions/Third Party Tools]
keyword: [MS Office Add-in, Extensions/Third Party Tools]
---

# Installing Microsoft Office Add-ins

This task describes how to install Alfresco Add-ins for Microsoft® Office applications, such as Word, Excel, and PowerPoint. The Alfresco Add-Ins have been designed for Microsoft Office 2003.

Before you start, make sure that:

-   The .NET Programmability Support option is installed for each of the Office applications that you are installing the Add-ins \(such as Word, Excel, and PowerPoint\). To find these options, run the Office Setup program and expand the list of available options for each application. You may require your original Office 2003 install media to add these required components.
-   The installing user has Windows administrator privileges.
-   Any Microsoft Office applications on your system are NOT running, including Outlook if you use Word as an email editor.

**Note:** If you are running Office 2007 on Windows Vista, note that Microsoft have rewritten the WebDAV parts of Vista which means you will experience READ ONLY access to the Alfresco repository over WebDAV. This is a known problem with Vista and affects many applications, including Microsoft's own SharePoint Server. There is no known workaround at the time of writing. CIFS access is unaffected and works as it does with Windows XP. Therefore, use CIFS to obtain read/write access to Alfresco using Windows Vista.

1.  Browse to the Alfresco Enterprise download area.

2.  Run the Microsoft setup file:

    alfresco-enterprise-office-addins-3.4.14.zip

    This example refers to the Office installer that installs all three Add-ins. You can also use individual installers to add Alfresco to one of the three Office applications.

    These individual installers are:

    -   alfresco-enterprise-word2003-addin-3.4.14.zip
    -   alfresco-enterprise-excel2003-addin-3.4.14.zip
    -   alfresco-enterprise-powerpoint2003-addin-3.4.14.zip
3.  Run setup.exe.

    If required, the setup program will download the required components from the Microsoft website. These components are .NET 2.0 framework, and Visual Studio 2005 Tools for Office Second Edition runtime.

    The setup is complete.

4.  Run the Office application, for example, run Word.

    A Welcome window with configuration options displays. You can return to the configuration options at any time using the link at the bottom of the Add-In window.

5.  In the **Web Client URL** field, enter the location of Alfresco Explorer.

    For example: http://server:8080/alfresco/

6.  In the **WebDAV URL** field, append webdav/ to the Alfresco Explorer URL.

    For example: http://server:8080/alfresco/webdav/

7.  In the **CIFS Server** field, enter the path to the CIFS server. The Add-in will try to auto-complete this value, but you should verify for the correct address.

    For example: \\\\server\_a\\alfresco\\ or \\\\servera\\alfresco\\

    If you intend to use the CIFS interface to save documents via the Add-in, it is very important that you are authenticated automatically. Limitations in the Microsoft Office APIs mean that an error is shown instead of an authentication dialog box if the Alfresco CIFS interface rejects your connection attempt.If you are not in an Enterprise environment, where it may not be possible to configure automatic authentication, you can map a network drive to the Alfresco CIFS interface instead.

8.  In the **Authentication** area, enter your Alfresco user name and password.

    The Add-In will always try to automatically log you in to Alfresco in order to present your checked-out documents and your assigned tasks. If you are using the CIFS interface, authentication is usually automatic. However, sometimes the Add-In needs to present your Alfresco user name and password for authentication. It is recommended that you enter and save your Alfresco credentials. All values are stored in the Windows registry and your password is encrypted against casual hacking attempts.

9.  Click **Save Settings**.

10. Before you can use the Microsoft Add-ins, ensure that you adjust the Basic Authentication Level key in the Registry Editor:

    1.  Open the Registry Editor by selecting **Start \> Run**, and then typing `regedit`.

    2.  Select the `HKLM_LOCAL_MACHINE" \SYSTEM\CurrentControlSet\Services\WebClient\Parameters\` key.

    3.  Set the basic authentication level to 2. For example, `BasicAuthLevel = 2`.


-   **[Setting up Microsoft Office Add-ins to work with HTTPS](../tasks/MSAddin-HTTPS-setup.md)**  
This section describes how to configure the Alfresco server and a client machine to run the Alfresco Microsoft Office Add-ins over HTTPS.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

