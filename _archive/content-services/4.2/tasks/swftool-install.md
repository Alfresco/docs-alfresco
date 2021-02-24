---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [SWF Windows, Extensions/Third Party Tools]
---

# Installing SWF Tools on Windows

This section describes the steps used to install the SWF Tools.

1.  Browse to the SWF Tools website: [http://www.swftools.org](http://www.swftools.org)).

2.  Download the latest \(stable\) version of the SWF Tools for your platform. The Windows version is designated with the suffix .exe.

    **Note:** Download a version post 0.9.2 to ensure that all functionality is supported with Alfresco.

3.  Browse to the location of your downloaded file and install the application.

    A wizard guides you through the installation.

4.  Accept the license agreement and click **Next**.

5.  Select the installation directory.

6.  Select whether you want to install the SWF Tools for all users or only for the current user.

7.  Click **Next** to begin the install process.

    By default, the options to **Create start menu** and **Create desktop shortcut** are selected.

8.  Click **Finish**.

9.  Modify the `swf.exe=` property in the alfresco-global.properties file to point to the SWF Tools root directory, for example: `swf.exe=C:/Alfresco/bin/pdf2swf`

    **Note:** Ensure that you do not include a slash \(`/`\) at the end of the path. For example, `/usr/bin/`


The SWF Tools are installed. For the most up-to-date instructions on installing the SWF Tools, refer to the SWF Tools website.

**Parent topic:**[Installing SWF Tools](../concepts/swftool-intro.md)

