---
author: Alfresco Documentation
---

# Installing the Centera Connector module

These steps describe how to install the Centera Connector module to an instance of Alfresco Content Services.

The Centera Connector is packaged as an Alfresco Module Package \(AMP\) file.

1.  Browse to the Alfresco Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download the alfresco-centera-connector-2.1.1.amp file.

3.  Use the Module Management Tool \(MMT\) to install the AMP.

    `java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-centera-connector-2.1.1.amp <installLocation>\tomcat\webapps\alfresco.war`

    If your Alfresco Content Services installation is running within the Tomcat application server, you can use the <installLocation\>\\bin\\apply\_amps command to apply all AMP files that are located in the <installLocation\>\\amps directory.

4.  Restart the Alfresco Content Services server.


**Parent topic:**[Installing and configuring the Alfresco Content Connector for EMC Centera](../concepts/centera-intro.md)

