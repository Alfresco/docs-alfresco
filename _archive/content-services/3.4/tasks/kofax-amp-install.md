---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Installing the Alfresco Kofax Release script AMP

The following describes how to install the Alfresco Kofax Release script AMP file \(alfresco-kofax-3.4.14.amp\) on your Alfresco server.

1.  Shut down your Alfresco server.

2.  Move or copy the alfresco-kofax-3.4.14.amp file to the amps directory in your Alfresco installation.

    -   \(Windows\) c:\\Alfresco\\amps
    -   \(Linux\) /opt/alfresco/amps
3.  From the command line, browse to the Alfresco bin directory.

    -   \(Windows\) c:\\Alfresco\\bin
    -   \(Linux\) /opt/alfresco/bin
4.  Install the Alfresco Kofax AMP using the Module Management Tool.

    -   \(Windows\) java -jar alfresco-mmt.jar install c:\\Alfresco\\bin\\amps\\alfresco-kofax-3.4.14.ampc:\\Alfresco\\tomcat\\webapps\\alfresco.war
    -   \(Linux\) java -jar alfresco-mmt.jar install /opt/alfresco/amps/alfresco-kofax-3.4.14.amp/opt/alfresco/tomcat/webapps/alfresco.war
    **Note:** Alternatively for Tomcat, you can run the apply\_amps.bat command in the root Alfresco directory to install the alfresco-kofax-3.4.14.amp. This batch file applies all the AMPs that are located in the amps directory.

5.  Remove your existing expanded Alfresco web application directory to allow updates to be picked up when the server restarts.

    -   \(Windows\) c:\\Alfresco\\tomcat\\webapps\\alfresco.war
    -   \(Linux\) /opt/alfresco/tomcat/webapps/alfresco

**Parent topic:**[Installing Kofax Release script](../tasks/kofax-install.md)

