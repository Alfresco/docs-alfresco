---
author: Alfresco Documentation
---

# Installing the Transformation Server on Alfresco

This section describes how to install the Transformation Server AMP and to update the required license.

Before you start, make sure that you verify the following prerequisites:

-   Check that your Alfresco Enterprise server is correctly configured and tested
-   Make sure that you have the correct Transformation Server ZIP file for the version of Alfresco that you are running
-   Make sure that you have an updated license file \(a \*.lic file\)

1.  Stop the Alfresco server.

2.  Open a terminal \(Linux\) or command line window \(Windows\).

3.  Navigate to the <ALFRESCO\_HOME\>/amps directory.

4.  Copy the alfresco-transformationserver-repo-*version*.amp file to the <ALFRESCO\_HOME\>/amps folder.

5.  Install the AMP package using the apply\_amps command.

    -   Linux: bin/apply\_amps.sh
    -   Windows: bin\\apply\_amps.bat
6.  Copy your updated license file into the Alfresco installation folder. 

    Delete all files with extension \*.installed in this directory.    

7.  Start the Alfresco server.

8.  Monitor your Alfresco log. 

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package \(depending on the configuration of your log level\).


**Parent topic:**[Installing the Alfresco Transformation Server](../concepts/transerv-installing.md)

