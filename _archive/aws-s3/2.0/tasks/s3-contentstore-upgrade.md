---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Upgrading the S3 Connector

Use this information to upgrade the S3 Connector from a previous version \(such as 1.3.x\) to 2.0.

1.  Stop the Alfresco Content Services server.

2.  Navigate to the root directory of your installation.

3.  Use the following command to check for the module you wish to delete:

    ```
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    ```

    This displays a list of the installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `org_alfresco_integrations_S3Connector`.

4.  Use the Module Management Tool \(MMT\) to uninstall the AMP from the repository WAR \(`alfresco.war`\). For example:

    ```
    java -jar bin/alfresco-mmt.jar uninstall org_alfresco_integrations_S3Connector 
     tomcat/webapps/alfresco.war
    ```

    For more information, see [Using the Module Management Tool \(MMT\)](http://docs.alfresco.com/5.2/concepts/dev-extensions-modules-management-tool.html) and [Uninstalling an Alfresco Module Package](http://docs.alfresco.com/5.2/tasks/uninstall-amp.html).

5.  Navigate to the `amps` directory.

6.  Delete any previously installed S3 Connector AMP.

7.  Copy the AMP file you downloaded during [installation](s3-contentstore-amp-install.md) to the `amps` directory.

8.  Use the Module Management Tool \(MMT\) to install the AMP into the repository WAR \(alfresco.war\).

    For more information, see [Using the Module Management Tool \(MMT\)](http://docs.alfresco.com/5.2/concepts/dev-extensions-modules-management-tool.html) and [Installing an Alfresco Module Package](http://docs.alfresco.com/5.2/tasks/amp-install.html).

    **Note:** You must install the S3 AMP using `-force`.

9.  Check that the [configuration](s3-contentstore-config.md) is set up correctly for your environment.

10. Start the server.


**Parent topic:**[Alfresco Content Connector for AWS S3 2.0](../concepts/s3-contentstore-overview.md)

