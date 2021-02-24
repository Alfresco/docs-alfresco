---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Installing Alfresco Outlook Integration

There are three steps to installing Alfresco Outlook Integration: install the Alfresco AMP files \(the Alfresco Outlook Server software\), apply the licenses and then install the Microsoft Outlook zip file \(the Alfresco Outlook Client software\).

Make sure you are running the correct versions of operating system and software before you install the AMP files. See [Prerequisites for using Alfresco Outlook Integration](../concepts/Outlook-reqs.md) for more information.

1.  Stop the Alfresco server.

2.  Browse to the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com) and download and unzip the Alfresco Outlook Integration zip package: alfresco-outlook-integration-1.1.2-alfresco41-2.zip

3.  Copy the provided AMP files to the Alfresco amps and amps\_share directories.

    There are three AMP files:

    -   alfresco-outlook-repository-1.1.2-alfresco41.amp
    -   alfresco-outlook-repository-utils-1.1.5-RELEASE.amp
    -   alfresco-outlook-share-1.1.2-alfresco41.amp
    Copy alfresco-outlook-repository-1.1.2-alfresco41.amp and alfresco-outlook-repository-utils-1.1.5-RELEASE.amp into the Alfresco amps directory, and copy alfresco-outlook-share-1.1.2-alfresco41.amp into the Alfresco amps\_share directory.

4.  To install the AMP files, run the apply\_amps.bat file from the Alfresco bin directory.

    Check the output from the script to ensure that the three AMP files have installed successfully.

5.  Restart the Alfresco server.

6.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and under Email Client there are the following options for configuration:

    -   **Email Integration Settings**
    -   **Email Access Tokens**
    -   **Email Licenses**
    -   **Email System Info**

The Alfresco Outlook Server AMP files are installed successfully and you are ready to apply the server and client licenses in Alfresco Share.

-   **[Installing server and client licenses in Alfresco Share](../tasks/Outlook-license.md)**  
Use Alfresco Share Admin Tools to install your Alfresco Outlook Integration server and client licenses.
-   **[Installing the Alfresco Outlook Client in Microsoft Outlook](../tasks/Outlook-install.md)**  
Inside the Alfresco Outlook Integration zip is another zip file, which installs the Alfresco Outlook Client into Microsoft Outlook.

**Parent topic:**[Installing and configuring Alfresco Outlook Integration](../concepts/Outlook-install-intro.md)

