---
title: Install with zip
---

Use these instructions to install the Intelligence Services AMP files to an instance of Alfresco Content Services.

The Intelligence Services distribution zip file, `alfresco-ai-distribution-1.2.x.zip`, includes all the files required to provide Intelligence Services. Ensure that you've installed the required software and completed the AWS set up before installing Intelligence Services.

See [prerequisites]({% link intelligence-services/latest/install/index.md %}) and how to [set up services in AWS]({% link intelligence-services/latest/install/setup.md %}) before you start the installation.

1. Download the Intelligence Services distribution zip file.

2. Extract the `alfresco-ai-distribution-1.2.x.zip` file into a system directory; for example, `<installLocation>/`.

    In this directory you'll see the following content:

    * `alfresco-ai-repo-1.2.x.amp`: AMP to be applied to the Alfresco Content Services repository
    * `alfresco-ai-share-1.2.x.amp`: AMP to be applied to Alfresco Share
    * `ai-pipeline-routes.json`: custom Transform Router configuration properties
    * `app.extensions.json`: custom extension file for Alfresco Digital Workspace

3. Stop the Alfresco Content Services server.

4. Copy the provided AMP files to the Alfresco `amps` and `amps_share` directories.

    Copy the repository AMP file to the `amps` directory:

    * `alfresco-ai-repo-1.2.x.amp`

    Copy the Share AMP file to the `amps_share` directory:

    * `alfresco-ai-share-1.2.x.amp`

5. Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders in the Alfresco Content Services installation directory.

6. Navigate to the `bin` directory to run the Module Management Tool (MMT) file to install the AMP files into the relevant WAR file:

    1. For the Alfresco Content Services repository:

        ```java
        java -jar <alfrescoInstallLocation>/bin/alfresco-mmt.jar install <installLocation>/amps-repository/alfresco-ai-repo-1.2.x.amp <installLocation>/tomcat/webapps/alfresco.war
        ```

    2. For Alfresco Share:

        ```java
        java -jar <alfrescoInstallLocation>/bin/alfresco-mmt.jar install <installLocation>/amps-share/alfresco-ai-share-1.2.x.amp <installLocation>/tomcat/webapps/share.war
        ```

    For more information, see [Using the Module Management Tool (MMT)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html)(#LINK) and [Installing an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/amp-install.html)(#LINK).

    Check the output to ensure that the AMP files have installed successfully.

7. Check that the [configuration]({% link intelligence-services/latest/config/index.md %}) is set up correctly for your environment.

8. Restart the Alfresco Content Services server.
