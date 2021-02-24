---
author: Alfresco Documentation
---

# Installing the Kofax Integration AMP

The following describes how to install the Kofax Integration AMP file on your Alfresco Content Services server.

1.  Browse to the Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download the alfresco-kofax-integration-2.0.0-13.zip file.

3.  Shut down your Alfresco Content Services server.

4.  Extract the ZIP file into a relevant directory.

5.  Move or copy the alfresco-kofax-integration-2.0.0-13.amp file to the amps directory in your Alfresco Content Services installation.

    -   \(Windows\) c:\\Alfresco\\amps
    -   \(Linux\) /opt/alfresco/amps
6.  From the command line, browse to the Alfresco bin directory.

    -   \(Windows\) c:\\Alfresco\\bin
    -   \(Linux\) /opt/alfresco/bin
7.  Install the Kofax Integration AMP using the Module Management Tool.

    For more information on MMT, see [Installing an Alfresco Module Package](amp-install.md).

    For Windows:

    -   `java -jar alfresco-mmt.jar install c:\Alfresco\amps\alfresco-kofax-integration-2.0.0-13.amp c:\Alfresco\tomcat\webapps\alfresco.war`
    For Linux:

    -   `java -jar alfresco-mmt.jar install /opt/alfresco/amps/alfresco-kofax-integration-2.0.0-13.amp /opt/alfresco/tomcat/webapps/alfresco.war`
    **Note:** Alternatively for Tomcat, you can run the apply\_amps.bat command in the root Alfresco directory to install the alfresco-kofax-integration-2.0.0-13.amp. This batch file applies all the AMPs that are located in the amps directory.

8.  Remove your existing expanded web application directory to allow updates to be picked up when the server restarts.

    -   \(Windows\) c:\\Alfresco\\tomcat\\webapps\\alfresco
    -   \(Linux\) /opt/alfresco/tomcat/webapps/alfresco

**Parent topic:**[Installing the Kofax Integration](../tasks/kofax-install.md)

