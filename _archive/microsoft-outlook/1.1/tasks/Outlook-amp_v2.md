---
author: Alfresco Documentation
source: 
audience: 
---

# Installing Alfresco Outlook Integration

There are three steps to installing Alfresco Outlook Integration: install the Alfresco AMP files \(the Alfresco Outlook Server software\), apply the licenses and then install the Microsoft Outlook zip file \(the Alfresco Outlook Client software\).

Make sure you are running the correct versions of operating system and software before you install the AMP files. See [Prerequisites for using Alfresco Outlook Integration](../concepts/Outlook-reqs_v2.md) for more information.

1.  Stop the Alfresco server.

2.  Browse to the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com) and download and unzip the Alfresco Outlook Integration zip package: alfresco-outlook-integration-2.0.0-19.zip

3.  Copy the provided AMP files to the Alfresco amps and amps\_share directories.

    There are three AMP files:

    -   alfresco-outlook-repository-2.0.0-19.amp
    -   alfresco-outlook-repository-utils-2.0.0-19.amp
    -   alfresco-outlook-share-2.0.0-19.amp
    Copy alfresco-outlook-repository-2.0.0-19.amp and alfresco-outlook-repository-utils-2.0.0-19.amp into the Alfresco amps directory, and copy alfresco-outlook-share-2.0.0-19.amp into the Alfresco amps\_share directory.

4.  To install the AMP files, run the apply\_amps.bat file from the Alfresco bin directory.

    Check the output from the script to ensure that the three AMP files have installed successfully.

5.  Restart the Alfresco server.

6.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and under Email Client there are the following options for configuration:

    -   **Email Integration Settings**
    -   **Email Access Tokens**
    -   **Email Licenses**
    -   **Email System Info**

