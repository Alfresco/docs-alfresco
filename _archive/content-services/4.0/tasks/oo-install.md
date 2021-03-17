---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [OpenOffice, transformations]
---

# Installing OpenOffice

Within Alfresco, you can transform a document from one format to another, for example, a text file to a PDF file. To have access to these transformation facilities in Alfresco, you must install OpenOffice. This is optional, and can be done any time after Alfresco is installed.

1.  Browse to the OpenOffice.org download site: [http://download.openoffice.org](http://download.openoffice.org)

2.  Download the latest \(stable\) version of OpenOffice for your platform.

3.  When prompted, specify a download destination.

4.  Browse to the location of your downloaded file, and install the application.

    A wizard guides you through the installation.

    All OpenOffice components, including Writer are required. If you install OpenOffice on Ubuntu using the `apt-get` utility rather than the OpenOffice installer, use the following command to install all of the components:

    ```
    sudo apt-get install openoffice.org
    ```

5.  Accept the license agreement, and then click **Next**.

6.  Enter Customer information as appropriate, and then click **Next**.

7.  Select the set up type and **Custom**, and then click **Next**.

8.  Change the installation directory to:

    -   \(Windows\) c:\\Alfresco\\OpenOffice
    -   \(Linux\) /opt/alfresco/OpenOffice
9.  Optionally, select the files for which you want OpenOffice to be the default application, and then click **Next**.

10. Start one of the OpenOffice programs for the initial registration, and then close the program.

11. Modify the `ooo.exe=` property in the <classpathRoot\>/alfresco-global.properties file to point to the OpenOffice binary soffice.exe.

    **Note:** For Windows, set the path using the \\\\ separator or use the forward slash / Unix path separator. For example: c:\\\\Alfresco\\\\OpenOffice\\\\soffice.exe or c:/Alfresco/OpenOffice/soffice.exe.

    **Note:** For Solaris, ensure that the <configRoot\>/classes/alfresco/subsystems/OOoDirect/default/openoffice-transform-context.xml file can start OpenOffice. Remove the quotes from the connection string values:

    ```
      <value>-accept=socket,host=localhost,port=8100;urp;StarOffice.ServiceManager</value>
      <value>-env:UserInstallation=file:///${ooo.user}</value> 
    ```

12. If the Alfresco server is running, stop and restart the server.


You can configure the OpenOffice transformation settings using one of the OpenOffice subsystems.

Refer to [Configuring OpenOffice](../concepts/OOo-subsystems-intro.md).

**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

