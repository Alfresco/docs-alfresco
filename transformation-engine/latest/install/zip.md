---
title: Install with Zip
---

The Alfresco Document Transformation Engine is installed in three parts.

The following file is used to install the standalone Document Transformation Engine `alfresco-document-transformation-engine-2.3.x.zip`

The zip file contains the following files:

* `alfresco-document-transformation-engine-repo-2.3.x.amp`
* `alfresco-document-transformation-engine-share-2.3.x.amp`
* `alfresco-document-transformation-engine-server.msi`

The package contains a keystore that is used by the Tomcat SSL connector. This keystore is shipped for demonstration purposes only and should not be used in production environments. You can edit the file, `conf/server.xml`, to integrate a custom keystore. Remember to change the attributes, `keystoreFile` and `keystorePass`.

## Install the standalone Document Transformation Engine

The standalone Document Transformation Engine is installed using the MSI file.

> **Note:** When upgrading the Document Transformation Engine, the previous installation must be uninstalled first. If your old version of the Document Transformation Engine is earlier than 1.3.1, use the Control Panel **Uninstall a program** option to remove the old version, and then manually remove the Document Transformation Engine directory. By default, the Document Transformation Engine directory is `C:\Program Files (x86)\Transformation Engine\`. If your old version of the Document Transformation Engine is 1.3.1 or later, the new Document Transformation Engine MSI package prompts you to uninstall the previous version. When the uninstall is complete, you can run the MSI package again to install the new version. There is no need to manually remove anything.

1. Log onto the Windows Server as a user with administrator rights.

2. Double click the MSI installer package `alfresco-document-transformation-engine-server.msi`.

3. (Optional) Select DTE T-Engine > **Note:** The Document Transformation Engine T-engine can also be installed. This allows transformation of MSG and EML files into PDF format when used with the Transform Service.

3. Click **Next** and the license information screen displays.

4. Click **Next** and select an installation folder or accept the default folder, and then click **Next**.

5. Select the TCP/IP ports used by the Document Transformation Engine.

    The default values are `8080` (HTTP) and `8443` (HTTPS) but you can also use the standard ports `80` and `443` (or any other port) if this fits better into your network infrastructure.

6. Click **Next** to start the installation.

    You will see a progress bar and a command line window during the installation. The installer will show a confirmation when the installation is finished.

7. Click **Close** to finish the installation.

8. Verify that the installation has completed successfully.

    1. Check the Windows Services in the management console.

    2. Locate the new service called **Document Transformation Engine**, and check that it is **Started**.

> **Note:** Each time a file is transformed in Alfresco Content Services, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List (CRL). Depending on the access that the Document Transformation Engine has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file. To prevent this, use the Windows server firewall to block internet access for all office binaries.

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
