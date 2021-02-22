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

    -   For 5.1: alfresco-outlook-integration-2.0.1-27.zip
    -   For 5.0 and 4.2: alfresco-outlook-integration-2.0.0-19.zip
3.  Copy the provided AMP files to the Alfresco amps and amps\_share directories.

    For 5.1, copy this file to the Alfresco amps directory:

    -   alfresco-outlook-repository-2.0.1-27.amp
    and this file to the Alfresco amps\_share directory:

    -   alfresco-outlook-share-2.0.1-27.amp
    For 4.2 and 5.0, copy the following files to the Alfresco amps directory:

    -   alfresco-outlook-repository-2.0.0-19.amp
    -   alfresco-outlook-repository-utils-2.0.0-19.amp
    and this file to the Alfresco amps\_share directory:

    -   alfresco-outlook-share-2.0.0-19.amp
4.  To install the AMP files, run the apply\_amps.bat file from the Alfresco bin directory.

    Check the output from the script to ensure that the AMP files have installed successfully.

5.  Restart the Alfresco server.

6.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and under Email Client there are the following options for configuration:

    -   **Email Integration Settings**
    -   **Email Access Tokens**
    -   **Email Licenses**
    -   **Email System Info**

-   **[Installing server and client licenses in Alfresco Share](../tasks/Outlook-license.md)**  
Use Alfresco Share Admin Tools to install your Alfresco Outlook Integration server and client licenses.
-   **[Installing the Alfresco Outlook Client in Microsoft Outlook](../tasks/Outlook-install_v2.md)**  
Inside the Alfresco Outlook Integration zip is another zip file, which installs the Alfresco Outlook Client into Microsoft Outlook.
-   **[Uninstalling Alfresco Outlook Integration](../tasks/outlook-uninstall.md)**  
To uninstall the Alfresco Outlook files, use the Module Management Tool \(MMT\).

**Parent topic:**[Installing and configuring Alfresco Outlook Integration](../concepts/Outlook-install-intro.md)

