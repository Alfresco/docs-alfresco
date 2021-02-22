---
author: Alfresco Documentation
source: 
audience: 
---

# Installing Alfresco Outlook Integration

There are three steps to installing Alfresco Outlook Integration: install the Alfresco AMP files \(the Alfresco Outlook Server software\), apply the licenses and then install the Microsoft Outlook zip file \(the Alfresco Outlook Client software\).

Make sure you are running the correct versions of operating system and software before you install the AMP files. See [Prerequisites for using Alfresco Outlook Integration](../concepts/Outlook-reqs_v2.md) for more information.

1.  Stop the Alfresco server.

2.  Browse to the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com) and download and unzip the Alfresco Outlook Integration zip package:

    -   alfresco-outlook-integration-2.2.0.zip
3.  Copy the provided AMP files to the Alfresco amps and amps\_share directories.

    For 5.0 and above, copy this file to the Alfresco amps directory:

    -   alfresco-outlook-repository-2.2.0.amp
    and this file to the Alfresco amps\_share directory:

    -   alfresco-outlook-share-2.2.0.amp
    For 4.2, copy the following file to the Alfresco amps directory:

    -   alfresco-outlook-42-repository-2.2.0.amp
    and this file to the Alfresco amps\_share directory:

    -   alfresco-outlook-share-2.2.0.amp
4.  To install the AMP files, run the apply\_amps.bat file from the Alfresco bin directory.

    Check the output from the script to ensure that the AMP files have installed successfully.

5.  Restart the Alfresco server.

6.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar to see the Outlook configuration section.

    The URL is:

    ```
    http://localhost:8080/share/page/console/admin-console/mail-customization-config
    ```

    where `localhost:8080` is your Alfresco server and port number.


-   **[Installing server and client licenses in Alfresco Share](../tasks/Outlook-license.md)**  
Use Alfresco Share Admin Tools to install your Alfresco Outlook Integration server and client licenses.
-   **[Installing the Alfresco Outlook Client in Microsoft Outlook](../tasks/Outlook-install_v2.md)**  
Inside the Alfresco Outlook Integration zip is another zip file, which installs the Alfresco Outlook Client into Microsoft Outlook.
-   **[Uninstalling Alfresco Outlook Integration](../tasks/outlook-uninstall.md)**  
To uninstall the Alfresco Outlook files, use the Module Management Tool \(MMT\).

**Parent topic:**[Installing and configuring Alfresco Outlook Integration](../concepts/Outlook-install-intro.md)

