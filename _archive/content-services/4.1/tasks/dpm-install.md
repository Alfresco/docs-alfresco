---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing the Alfresco Distribution Policies Module

These steps describe how to install the Alfresco Distribution Policies Module to an instance of Alfresco.

The Alfresco Distribution Policies Module functionality is packaged as a zip file containing two artifacts, an Alfresco Module Package \(AMP\) file and a JAR file.

1.  Download the Alfresco Distribution Policies Module package from the [Alfresco Support Portal](http://support.alfresco.com.) using your Alfresco login details.

2.  Install the AMP file contained in the alfresco-distributionpolicies-1.0.0-3.zip by following the installation steps described in [Installing an Alfresco Module Package](amp-install.md).

3.  Copy the alfresco-distributionpolicies-share-1.0.0.jar to the shared/lib folder as defined in your application server's configuration.

    For Tomcat, this is the `shared.loader` property within the <TOMCAT-HOME\>/conf/catalina.properties file:

    ```
    shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar
    ```

4.  Restart the Alfresco server and Share application.


**Parent topic:**[Installing and verifying the Distribution Policies Module](../concepts/dist-pol-intro.md)

