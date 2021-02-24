---
author: Alfresco Documentation
---

# Installing the Transformation Server on Alfresco

This section describes how to install the Transformation Server AMP and to update the required license.

Before you start, make sure that you verify the following prerequisites:

-   Check that your Alfresco Enterprise server is correctly configured and tested
-   Check that you have the right AMP file for the version of Alfresco you have installed \(there are separate AMP files for the 3.4 and 4.0 Alfresco versions\)
-   Make sure that you have an updated license file \(a \*.lic file\)

1.  Stop the Alfresco server.

2.  Open a terminal \(Linux\) or command line window \(Windows\).

3.  Navigate to the <ALFRESCO\_HOME\>/amps directory.

4.  Copy the transformation-client-1.0.0-x.x.amp file to the <ALFRESCO\_HOME\>/amps folder.

    -   transformation-client-1.0.0-4.0.amp
    -   transformation-client-1.0.0-3.4.amp
    **Note:** The AMP installation will check that you are applying the correct AMP version for your version of Alfresco.

5.  Install the relevant AMP package using the apply\_amps command.

    -   Linux: bin/apply\_amps.sh
    -   Windows: bin\\apply\_amps.bat
    The apply\_amps command checks the version of Alfresco so that you install the relevant AMP package to the correct Alfresco version.

6.  Copy your updated license file into the Alfresco installation folder. 

    Delete all files with extension \*.installed in this directory.    

7.  Start the Alfresco server.

8.  Monitor your Alfresco log. 

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package \(depending on the configuration of your log level\).


**Parent topic:**[Installing the Alfresco Transformation Server](../concepts/transerv-installing.md)

