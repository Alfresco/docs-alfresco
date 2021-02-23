---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [OpenOffice, transformations]
---

# Installing LibreOffice

In Alfresco, you can transform a document from one format to another, for example, a text file to a PDF file. To have access to these transformation facilities in Alfresco, you must install LibreOffice. This is optional, and can be done any time after Alfresco is installed.

1.  Browse to the LibreOffice download site: [LibreOffice download site](https://www.libreoffice.org/download/libreoffice-fresh/)

2.  Download the latest \(stable\) version of OpenOffice for your platform.

3.  When prompted, specify a download destination.

4.  Browse to the location of your downloaded file, and install the application.

5.  Change the installation directory to:

    -   \(Windows\) c:\\Alfresco\\LibreOffice
    -   \(Linux\) /opt/alfresco/LibreOffice
    If you are installing LibreOffice on Linux, you also need a number of libraries to be installed. See [Installing Linux libraries manually](../concepts/install-lolibfiles.md) for more information.

6.  Modify the `ooo.exe=` property in the <classpathRoot\>/alfresco-global.properties file to point to the LibreOffice application libreoffice.app.

    **Note:** For Windows, set the path using the \\\\ separator or use the forward slash / Unix path separator. For example: c:\\\\Alfresco\\\\LibreOffice\\\\libreoffice.app or c:/Alfresco/LibreOffice/libreoffice.app.

7.  If the Alfresco server is running, stop and restart the server.


**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

