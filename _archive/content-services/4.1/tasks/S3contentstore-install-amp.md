---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing the Alfresco S3 Connector

These steps describe how to install the Alfresco S3 Connector to an instance of Alfresco.

The Alfresco S3 Connector functionality is packaged as an Alfresco Module Package \(AMP\) file.

**Note:** Ensure that you do not start Alfresco before installing the S3 AMP.

1.  Browse to the Alfresco Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download the alfresco-s3-connector-1.1.0.2-7.amp file.

    This file is contained within the alfresco-s3-connector-1.1.0.2-7.zip file.

3.  Use the Module Management Tool \(MMT\) to install the AMP into the repository WAR \(alfresco.war\). If your Alfresco installation is running within the Tomcat application server, you can use the <installLocation\>\\bin\\apply\_amps command to apply all AMP files that are located in the amps directory. For more information, see [Installing an Alfresco Module Package](amp-install.md).

4.  Restart the Alfresco server.


**Parent topic:**[Installing and configuring Alfresco S3 Connector](../concepts/S3content-intro.md)

