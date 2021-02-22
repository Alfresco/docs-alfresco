---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Installing the Document Transformation Server on Alfresco

Use this information to install the Document Transformation Server AMP and to update the required license.

Before you start, make sure that you verify that:

-   Your Alfresco server is correctly configured and tested
-   You have the correct Document Transformation Server ZIP file for the version of Alfresco that you are running
-   You have an updated license file \(a \*.lic file\). You can request a license from the [Alfresco Support Portal](www.support.alfresco.com)

1.  Stop the Alfresco server.

2.  Open a terminal \(Linux\) or command line window \(Windows\).

3.  Unzip the alfresco-transformationserver-1.5.2-25.zip file.

4.  Move the repo AMP file to the <ALFRESCO\_HOME\>/amps folder, and move the share AMP file to the <ALFRESCO\_HOME\>/amps\_share folder.

5.  Install the AMP files using the Module Management Tool \(MMT\).

6.  Copy your updated license file into the Alfresco installation folder. 

    Delete all files with extension \*.installed in this directory.

7.  Start the Alfresco server.

8.  Monitor the Alfresco log. 

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package \(depending on the configuration of your log level\).


**Parent topic:**[Installing the Document Transformation Server](../concepts/transerv-installing.md)

