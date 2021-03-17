---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing the S3 Connector

These steps describe how to install S3 Connector 2.0 to an instance of Alfresco Content Services.

The S3 Connector is packaged as an Alfresco Module Package \(AMP\) file.

**Note:** Ensure that you don't start Alfresco Content Services before installing the S3 Connector AMP.

1.  Go to the [Alfresco Support Portal](http://support.alfresco.com).

2.  Download the alfresco-s3-connector-2.0.0.amp file.

3.  Use the Module Management Tool \(MMT\) to install the AMP into the repository WAR \(alfresco.war\).

    For more information, see [Using the Module Management Tool \(MMT\)](http://docs.alfresco.com/5.2/concepts/dev-extensions-modules-management-tool.html) and [Installing an Alfresco Module Package](http://docs.alfresco.com/5.2/tasks/amp-install.html).

    **Note:** You must install the S3 AMP using `-force`.

4.  Check that the [configuration](s3-contentstore-config.md) is set up correctly for your environment.

5.  Start Alfresco Content Services.


**Parent topic:**[Installing and configuring the S3 Connector](../concepts/s3-contentstore-install-intro.md)

