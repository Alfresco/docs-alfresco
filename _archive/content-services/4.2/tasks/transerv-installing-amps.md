---
author: Alfresco Documentation
---

# Installing the Document Transformation Server on Alfresco

This section describes how to install the Document Transformation Server AMP and to update the required license.

Before you start, make sure that you verify the following prerequisites:

-   Check that your Alfresco server is correctly configured and tested
-   Make sure that you have the correct Document Transformation Server ZIP file for the version of Alfresco that you are running
-   Make sure that you have an updated license file \(a \*.lic file\)

1.  Stop the Alfresco server.

2.  Open a terminal \(Linux\) or command line window \(Windows\).

3.  Unzip the alfresco-transformationserver-2.0.0.zip file.

4.  Move the repo AMP file to the <ALFRESCO\_HOME\>/amps folder, and move the share AMP file to the <ALFRESCO\_HOME\>/amps\_share folder.

5.  Install the AMP files using the Module Management Tool \(MMT\).

6.  Copy your updated license file into the Alfresco installation folder. 

    Delete all files with extension \*.installed in this directory.    

7.  Start the Alfresco server.

8.  Monitor the Alfresco log. 

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package \(depending on the configuration of your log level\).

    **Note:**

    Each time a file is transformed in Alfresco, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List \(CRL\).

    Depending on the access that the Document Transformation Server has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file.

    To prevent this, use the Windows server firewall to block internet access for all office binaries.


**Parent topic:**[Installing the Document Transformation Server](../concepts/transerv-installing.md)

