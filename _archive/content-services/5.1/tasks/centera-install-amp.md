---
author: Alfresco Documentation
---

# Installing the Alfresco EMC Centera Connector module

These steps describe how to install the Alfresco EMC Centera Connector module to an instance of Alfresco.

The Alfresco EMC Centera Connector is packaged as an Alfresco Module Package \(AMP\) file.

1.  Browse to the Alfresco Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download the alfresco-centera-connector-2.1.0.amp file.

3.  Use the Module Management Tool \(MMT\) to install the AMP.

    `java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-centera-connector-2.1.0.amp <installLocation>\tomcat\webapps\alfresco.war`

    If your Alfresco installation is running within the Tomcat application server, you can use the <installLocation\>\\bin\\apply\_amps command to apply all AMP files that are located in the <installLocation\>\\amps directory.

4.  Restart the Alfresco server.


**Parent topic:**[Installing and configuring the Alfresco EMC Centera Connector](../concepts/centera-intro.md)

