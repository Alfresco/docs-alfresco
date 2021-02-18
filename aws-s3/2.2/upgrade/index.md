---
title: Upgrade Content Connector for AWS S3
---

Use this information to upgrade the S3 Connector from a previous version (such as 1.3.x) to 2.x for Tomcat-based 
deployments only.

1.  Stop the Alfresco Content Services server.

2.  Navigate to the root directory of your installation.

3.  Use the following command to check for the module you wish to delete:

    ```bash
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    ```

    This displays a list of the installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `org_alfresco_integrations_S3Connector`.

4.  Use the Module Management Tool (MMT) to uninstall the AMP from the repository WAR (`alfresco.war`). For example:

    ```bash
    java -jar bin/alfresco-mmt.jar uninstall org_alfresco_integrations_S3Connector 
     tomcat/webapps/alfresco.war
    ```

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/6.1/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Uninstalling an Alfresco Module Package]({% link content-services/6.1/install/zip/amp.md %}#uninstall-an-amp-file).

5.  Navigate to the `amps` directory.

6.  Delete any previously installed S3 Connector AMP.

7.  Copy the AMP file you downloaded during [installation]({% link aws-s3/2.2/install/index.md %}#installing) to the `amps` directory.

8.  Use the Module Management Tool (MMT) to install the AMP into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/6.1/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/6.1/install/zip/amp.md %}).

9.  Check that the [configuration]({% link aws-s3/2.2/config/index.md %}) is set up correctly for your environment.

10. Start the server.
