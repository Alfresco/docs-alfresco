---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing the Document Transformation Engine on Alfresco Content Services

Use this information to install the Document Transformation Engine AMP and to update the required license.

Before you start, make sure that you verify that:

-   Your Alfresco Content Services server is correctly configured and tested
-   You have the correct Document Transformation Engine ZIP file for the version of Alfresco Content Services that you are running
-   You have an updated license file \(a \*.lic file\). You can request a license from the [Alfresco Support Portal](http://support.alfresco.com)

1.  Stop the Alfresco Content Services server.

2.  Open a terminal \(Linux\) or command line window \(Windows\).

3.  Unzip the alfresco-documenttransformationserver-2.1.6.zip file.

4.  Copy alfresco-documenttransformationserver-repo-2.1.6.amp to the <ALFRESCO\_HOME\>/amps folder, and copy alfresco-documenttransformationserver-share-2.1.6.amp to the <ALFRESCO\_HOME\>/amps\_share folder.

5.  Install the AMP files using the Module Management Tool \(MMT\).

6.  Copy your updated license file into the Alfresco Content Services installation folder. 

    Delete all files with extension \*.installed in this directory.

7.  Start the Alfresco Content Services server.

8.  Monitor the Alfresco Content Services log. 

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package \(depending on the configuration of your log level\).


**Parent topic:**[Installing the Document Transformation Engine](../concepts/transerv-installing.md)

