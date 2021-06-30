---
title: Install with MSI
---

The Alfresco Document Transformation Engine is installed by using `alfresco-document-transformation-engine-server-2.3.0.msi`. Download the file from the [Alfresco Support Portal](http://support.alfresco.com){:target="_blank"}.
In previous versions the installation files were contained within a .zip file which also included .amp files that enabled you to Install the Alfresco Transformation client into Alfresco Content Services. This is no longer possible 

The package contains a keystore that is used by the Tomcat SSL connector. This keystore is shipped for demonstration purposes only and should not be used in production environments. You can edit the file, `conf/server.xml`, to integrate a custom keystore. Remember to change the attributes, `keystoreFile` and `keystorePass`.

## Install the standalone Document Transformation Engine

The standalone Document Transformation Engine is installed using the MSI file.

> **Note:** When upgrading the Document Transformation Engine, the previous installation must be uninstalled first. If your old version of the Document Transformation Engine is earlier than 1.3.1, use the Control Panel **Uninstall a program** option to remove the old version, and then manually remove the Document Transformation Engine directory. By default, the Document Transformation Engine directory is `C:\Program Files (x86)\Transformation Engine\`. If your old version of the Document Transformation Engine is 1.3.1 or later, the new Document Transformation Engine MSI package prompts you to uninstall the previous version. When the uninstall is complete, you can run the MSI package again to install the new version. There is no need to manually remove anything.

1. Log onto the Windows Server as a user with administrator rights.

2. Double click the MSI installer package `alfresco-document-transformation-engine-server-2.3.0.msi`.

3. (Optional) Select DTE T-Engine **Note:** The Document Transformation Engine T-engine can also be installed. This allows transformation of MSG and EML files into PDF format when used with the Transform Service.

4. Click **Next** and the license information screen displays.

5. Click **Next** and select an installation folder or accept the default folder, and then click **Next**.

6. Select the TCP/IP ports used by the Document Transformation Engine.

    The default values are `8080` (HTTP) and `8443` (HTTPS) but you can also use the standard ports `80` and `443` (or any other port) if this fits better into your network infrastructure.

7. Click **Next** to start the installation.

    You will see a progress bar and a command line window during the installation. The installer will show a confirmation when the installation is finished.

8. Click **Close** to finish the installation.

9. Verify that the installation has completed successfully.

    1. Check the Windows Services in the management console.

    2. Locate the new service called **Document Transformation Engine**, and check that it is **Started**.

> **Note:** Each time a file is transformed in Alfresco Content Services, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List (CRL). Depending on the access that the Document Transformation Engine has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file. To prevent this, use the Windows server firewall to block internet access for all office binaries.

<!-- (Will be commented back in once 2.4 is released)

## Install the Alfresco Transformation client into Alfresco Content Services

The Alfresco Transformation client is installed as two Alfresco Module Packages (AMP) files into Alfresco Content Services and requires the license to be updated.

Before starting verify that:

* Your Alfresco Content Services server is correctly configured and tested.
* You have the correct Document Transformation Engine ZIP file for the version of Alfresco Content Services that you are running.
* You have an updated license file (a `*.lic` file). You can request a license from the [Alfresco Support Portal](http://support.alfresco.com){:target="_blank"}.

1. Stop the Alfresco Content Services server.

2. Open a terminal (Linux) or command line window (Windows).

3. Unzip the `alfresco-document-transformation-engine-2.3.x.zip` file.

4. Copy `alfresco-document-transformation-engine-repo-2.3.x.amp` to the `<ALFRESCO_HOME>/amps` folder, and copy `alfresco-document-transformation-engine-share-2.3.x.amp` to the `<ALFRESCO_HOME>/amps_share` folder.

5. Install the AMP files using the Module Management Tool (MMT).

6. Copy your updated license file into the Alfresco Content Services installation folder.

    Delete all files with the extension `*.installed` in this directory.

7. Start the Alfresco Content Services server.

8. Monitor the Alfresco Content Services log.

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package (depending on the configuration of your log level).
-->

### Install T-Engine using Docker Compose {#tengine-docker}

To deploy the Outlook Integration T-Engine with the Transform Service, you'll need to update your Docker Compose file to include the Outlook T-Engine.

> **Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment.

1. Add Outlook Integration T-Engine container to your `docker-compose.yaml` file:

    ```yaml
    transform-outlook:
        image: quay.io/alfresco/transform-outlook:1.0.0
        mem_limit: 2g
        environment:
            JAVA_OPTS: " -Xms256m -Xmx512m"
            ACTIVEMQ_URL: "nio://activemq:61616"
            ACTIVEMQ_USER: "admin"
            ACTIVEMQ_PASSWORD: "admin"
            FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
        ports:
            - 8091:8090
        links:
            - activemq
    ```

2. Add the following `JAVA_OPTS` property to the `alfresco` container:

    ```yaml
    -DlocalTransform.transform-outlook.url=http://transform-outlook:8090/
    ```

3. If you're using Content Services 6.2.2 (i.e. not 7.x), you'll need to set the following properties in your Docker Compose file:

    ```yaml
    -Dlegacy.transform.service.enabled=false
    -Dlocal.transform.service.enabled=true
    ```

    > **Note:** If these settings are missing for Content Services 6.2.2, the transformation of MSG and EML files to PDFs won't work. You can ignore these settings for Content Services 7, as they're already set by default.

See the Content Services documentation - [T-Engine configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/creating-a-t-engine.md#t-engine-configuration){:target="_blank"} for more details. For further development, see [Content Transformers and Renditions Extension Points]({% link content-services/latest/develop/repo-ext-points/content-transformers-renditions.md %}).