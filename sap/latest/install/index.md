---
title: Install SAP Connector
---

The SAP Connector capability for Content Services is delivered as a distribution zip file containing repository and Share {% include tooltip.html word="AMP" text="AMP" %} files, server files for the SAP Connector, and third-party license information.

In these topics you'll install and set up everything you need to run the SAP Connector. See [Prerequisites]({% link sap/latest/install/index.md %}#prerequisites) and [Supported platforms]({% link sap/latest/support/index.md %}) for information on what you require before you start the installation.

You can download the Alfresco Content Connector for SAP applications software from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

## Prerequisites

Below are the environment/software prerequisites for installing and using the SAP Connector.

### General requirements

* A valid license for SAP Connector.
* Both systems, Content Services and SAP, must be available in the same network, or connected through a VPN.
* Access to the [SAP Support Portal](https://support.sap.com/){:target="_blank"} to download the native libraries of the SAP Java Connector for your current system architecture.

### SAP requirements

* SAP {% include tooltip.html word="SAP_ECC" text="ECC" %} 6.0 (or up to latest) with at least SAP GUI 7.30
* SAP S/4HANA (build 1809 or up to latest) with at least SAP GUI 7.50
* SAP dialog user who is able to:
  * Create new SAP Content Repositories (transaction `OAC0`)
  * Create related ArchiveLink customization as described in the SAP Implementation Guide (available via transaction `SPRO`)
  * Test the ArchiveLink interface in any related module (for example transaction `FB03` for Finance)
* SAP system user who is able to:
  * Invoke BAPIs ({% include tooltip.html word="SAP_ABAP" text="ABAP" %} function modules via RFC connection)
* SAP Java Connector (JCo): JCo 3.1.x must be installed

### Alfresco requirements

* Content Services - see [Supported platforms]({% link sap/latest/support/index.md %}) for compatible versions.
* Alfresco server system architecture must be one of the following (for these architectures, SAP offers native Java Connector versions):
  * Linux 64bit x86
  * Windows 64bit x86
  * Windows 64bit Itanium
  * Linux 64bit Itanium
  * Linux IBM eServer z Series 64bit
  * Linux IBM PowerPC processors 64bit BE and LE
  * HP-UX 64bit PA-RISC
  * HP-UX 64bit Itanium
  * IBM AIX 64bit
  * IBM z/OS 64bit
  * IBM i 64bit
  * Sun OS 64bit SPARC
  * Sun OS 64bit x86
  * Mac OS X (for Intel) 64bit x86
* Firewall does not block HTTP traffic on port 80 / 8080 / 8082.
* Access to the Content Services server with administrator privileges to:
  * Apply the SAP Connector {% include tooltip.html word="AMP" text="AMP" %} files
  * Edit `alfresco-global.properties` file
  * Stop/start the application server
* Alfresco user with administrator permissions.

## Install overview

The SAP Connector is packaged as Alfresco Module Package (AMP) files. There are several stages to installing the SAP Connector: re-package the repository AMP, and then install the AMP files.

> **Note:** The SAP Connector uses the advantages of the SAP Java Connector for the communication between Content Services and the SAP system. According to the SAP terms & conditions, the redistribution of the native Java Connector libraries is no longer allowed. Hence, these libraries aren't included in the SAP Connector delivery package, and must be downloaded manually from the SAP Support Portal (requires an S-ID to log in). Once done, these libraries must be merged with the repository AMP file for the SAP Connector before starting the installation.

## Download files

Use the following steps to download the files required to install the SAP Connector.

1. Go to [Hyland Community](https://community.hyland.com/products/alfresco){:target="_blank"}, click **Product downloads**, and then download the SAP Connector distribution zip, which contains the following files:

    * `sap-content-connector-repo-5.3.x.amp` for Content Services.
    * `sap-content-connector-share-5.3.x.amp` for Alfresco Share.
    * `sap-content-connector-jco-packer-1.x.jar` - the **SAP JCo Packer tool** for merging the native SAP Java Connector libraries into the repository AMP file.
    * `sap-content-connector-encryptor-1.1.jar` to [encrypt plain-text passwords]({% link sap/latest/admin/reference.md %}#encryptpwd) for all SAP Connector related properties in the `alfresco-global.properties` file.
    * `alfresco-global.properties_append` contains all required property keys to be added in the `alfresco-global.properties` for an SAP connection.

2. Log in to the [SAP Support Portal](https://support.sap.com/){:target="_blank"} with your SAP Universal ID:

    1. [Download](https://support.sap.com/en/product/connectors/jco.html){:target="_blank"} the native libraries for the SAP Java Connector based on your current system architecture.

        > **Important:** Ensure you download the correct SAP Java Connector version, which is related to the current system architecture of your Content Services server.

        ![]({% link sap/images/sap_packer_001.png %})

    2. Once all the required files have been downloaded, the next step is to copy the required SAP Java Connector libraries into the SAP Connector repository AMP file before starting the installation.

## Re-package the repository AMP

Use the SAP JCo Packer tool provided in the distribution zip to merge the native SAP Java Connector libraries into the SAP Connector repository AMP.

Before continuing, make sure you've [downloaded all the required files](#download-files).

The re-packaging is done by using the SAP JCo Packer tool (`sap-content-connector-jco-packer-1.x.jar`), which helps to create a merged AMP file that's used as the foundation for the installation.

> **Important**: You must have at least **Java Version 8** installed in order to run the distributed SAP JCo Packer tool.

1. Prepare the files for merge:

    1. Create a new temporary directory and copy the following files into it:

        * `sap-content-connector-jco-packer-1.x.jar`
        * `sap-content-connector-repo-5.3.x.amp`
        * `sapjco31P_3-20009381.zip` (example file name for native Java Connector libraries, downloaded from the SAP Support Portal)

            > **Note:** The ZIP name could be different, depending on your chosen system architecture.

        ![]({% link sap/images/sap_packer_002.png %})

    2. Verify the `sap-content-connector-repo-5.3.x.amp` file size. It should be less than 1 MB.

2. Run the merge tool:

    Starting from your temporary folder, run the SAP JCo Packer tool:

    ```java
    java -jar .\sap-content-connector-jco-packer-1.x.jar
    ```

    ![]({% link sap/images/sap_packer_003.png %})

    You'll see a few log statements to show what's happening, and the tool should finally return: **Processing finished...**

3. Verify the merge:

    Verify that the merge is successful and double-check the file size of the `sap-content-connector-repo-5.3.x.amp` again. This should now be much larger than before.

    > **Note:** Depending on the chosen system architecture of the SAP Java Connector, the repository AMP file may be up to 7 MB. This indicates that the required native SAP libraries are now available inside the AMP file.

    ![]({% link sap/images/sap_packer_004.png %})

4. Copy and save the re-packaged AMP file:

    The re-packaged `sap-content-connector-repo-5.3.x.amp` file should now be saved for the future. This is the final file that's needed to [install](#installsapconnamps) the SAP Connector.

    > **Note:** You only need to merge the native SAP Java Connector libraries once for a specific release of the SAP Connector.

5. Cleanup:

    Once the re-packaged AMP file is saved and stored outside the current temporary folder, you can safely delete the temporary folder.

## Install the SAP Connector {#installsapconnamps}

These steps describe how to install the SAP Connector to an instance of Content Services.

> **Note**: Ensure that you've followed the instructions to [repackage the repository AMP](#re-package-the-repository-amp) before installing the SAP Connector AMPs.

1. You need the following files to apply the SAP Connector:

    * `sap-content-connector-repo-5.3.x.amp` for Content Services

        > **Note**: This must be the re-packed file which includes the native SAP Java Connector libraries. Don't use the original file from the delivery package without the required changes.

    * `sap-content-connector-share-5.3.x.amp` for Alfresco Share

2. Use the Module Management Tool (MMT) to install the {% include tooltip.html word="AMP" text="AMP" %} files into the Repository WAR (`alfresco.war`) and the Share WAR (`share.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

3. Add the related properties to the `alfresco-global.properties` file.

    See [Configure repository](#configrepo) for more information.

    You'll need to adapt the related property values to your configuration.

4. Check that the [configuration]({% link sap/latest/config/index.md %}) is set up correctly for your environment.

5. Start Content Services.

## Configure repository {#configrepo}

These are the minimum required properties that must be appended to the `alfresco-global.properties` in order to establish the connection between Content Services (the Repository) and SAP.

> **Note:** There are additional properties that can be used to login to the SAP system via the SAP JavaConnector (such as using Logon Groups instead of the Gateway). See [Additional SAP JCo properties]({% link sap/latest/admin/reference.md %}#sapjavaconprops) which lists the additional properties that are supported.

1. Open `alfresco-global.properties` in your Content Services installation.

2. Add all properties from the table below to the end of the file and set their values according to your environment.

3. Save the file.

    > **Note:** There are up to 100 possible SAP System Configurations. The table below shows the basic configuration for the first configuration. Therefore, the property contains the number **1** in the key.

    The letters **al** in some keys are the abbreviation for **A**rchive**l**ink. These settings are mandatory for the basic communication between SAP and Content Services.

| Property Key | Description |
| ------------ | ----------- |
| integrations.sap.system.1.al.alfrescoUser | Username for the connection used to login to Content Services (should have administrator role). <br>Example value: `admin` |
| integrations.sap.system.1.al.alfrescoPassword | Password for the user. Either plain-text or use encrypted password. See [Encrypting passwords]({% link sap/latest/admin/reference.md %}#encryptpwd) for more. <br>Example value: `H3ll0W0rlD112!` or `ENC(XbfE4Z112==)` |
| integrations.sap.system.1.al.archiveIds | Comma separated list of all connected SAP Content Repositories of this configuration. <br>Example value: `M1` or `M2,M3,M4` |
| integrations.sap.system.1.al.documentRoot | The document root folder where all documents from the SAP Content Repositories of the current SAP System Configuration are stored. Must exist and must be entered in XPath syntax. <br>Example value: `/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents` |
| integrations.sap.system.1.al.checkSignature | Enables the signature check for the HTTP Content Server interface. If disabled, all requests will be accepted no matter if they are signed or not. <br>Example value: `true` (default) or `false` |
| integrations.sap.system.1.al.checkExpiration | If enabled, a check occurs, whether the signed requests have been sent in the valid time window. <br>Example value: `true` (default) or `false` |
| integrations.sap.system.1.enabled | Whether data replication should be enabled for the current SAP System Configuration or not. If `true`, the following properties must be present with correct values. <br>Example value: `true` or `false` (default) |
| integrations.sap.system.1.name | An arbitrary value for the current SAP System Configuration. Should not contain special characters. Must be unique across all available SAP System Configurations. Recommendation: Should contain the name of the connected SAP system. <br>Example value: `NSP SAP System` or `NSP Repos M1, M2` |
| integrations.sap.system.1.host | The IP address of the SAP server or the SAP Router string. <br>Example value: `192.168.112.112` or `sap.mydomain.com` or `/H/80.112.112.112/H/192.168.112.112/S/3201` |
| integrations.sap.system.1.client | The SAP client used to log in to the SAP system. <br>Example value: `100` or `800` |
| integrations.sap.system.1.systemNumber | The SAP system number. <br>Example value: `00` or `01` |
| integrations.sap.system.1.user | SAP system user used for the login. <br>Example value: `ALFR3SC0` |
| integrations.sap.system.1.password | Password for the SAP user. Either plain-text or use encrypted password. See [Encrypting passwords]({% link sap/latest/admin/reference.md %}#encryptpwd) for more. <br>Example value: `H3ll0W0rlD112!` or `ENC(XbfE4Z112==)` |
| integrations.sap.system.1.language | The SAP system language used to login. <br>Example value: `EN` or `DE` |
| integrations.sap.system.5.webClient.enabled | Enables the document action "Open corresponding business object in SAP" in Alfresco Share to be opened in the SAP Web-GUI. If `true`, the `webclient.url` below must resolve. <br>Example value: `true` or `false` (default) |
| integrations.sap.system.5.webClient.url | The url to the SAP Web-GUI. <br>Example value: `https://sapserver:port/sap/bc/gui/sap/its/webgui` |
| integrations.sap.system.1.jobs. sapContentConnectorReplicate.enabled | Enables the metadata replication job. Adds the aspect **SAP Replicate Details** <br>Example value: `true` or `false` (default) |
| integrations.sap.system.1.jobs. sapContentConnectorReplicate.cronExpression | The CRON expression used for the job. <br>Example value: `0 0/1 * 1/1 * ? *` |
| integrations.sap.system.1.jobs. sapContentConnectorPlus.enabled | Enables the additional metadata replication job. Adds the aspect **SAP Replicate Plus Details** <br>Example value: `true` or `false` (default) |
| integrations.sap.system.1.jobs. sapContentConnectorPlus.cronExpression | The CRON expression used for the job. <br>Example value: `0 0/1 * 1/1 * ? *` |
| integrations.sap.system.1.jobs. sapContentConnectorBarcode.enabled | Enables the barcode job. <br>Example value: `true` or `false` (default) |
| integrations.sap.system.1.jobs. sapContentConnectorBarcode.cronExpression | The CRON expression used for the job. <br>Example value: `0 0/1 * 1/1 * ? *` |
| integrations.sap.system.1.jobs. sapContentConnectorDirReplicate.enabled | Enables the SAP DIR replication job. Adds the aspect **SAP Document Info Record (DIR) Details** <br>Example value: `true` or `false` (default) |
| integrations.sap.system.1.jobs. sapContentConnectorDirReplicate.cronExpression | The CRON expression used for the job. <br>Example value: `0 0/1 * 1/1 * ? *` |

## Install the license

The access and use of the SAP Connector is managed by a license. Any limitations are set when you purchased the license. To increase the limitations, contact Alfresco to obtain a new license. If you don't have a license yet, you can request a trial license.

> **Note:** Make sure you have a valid license file available before continuing. The name of the license file is `content-connector-for-sap.l4j`.

### Apply the license via the Alfresco Share user interface

1. Log in to Alfresco Share as an administrator.
2. Navigate to **Admin Tools** and click menu **SAP Integration**. This displays the SAP Connector Administration Console.

3. In the **License Information** section click **Choose Files**.
4. Select file `content-connector-for-sap.l4j`, and then click **Upload**.

    > **Note:** The new license is applied immediately- no restart of Content Services is required.

    ![sap_inst_001_license]({% link sap/images/sap_inst_001_license.png %})

An existing license file is backed up, renamed with the current time stamp, and remains on the file system (for example: `sapContentConnectorYYYY-mm-dd_hh:mm:ss.l4j`).

### Apply the license via the file system

1. Open the file `alfresco-global.properties` and search for the key `dir.license.external`. Note this value as you'll need it next.
2. Navigate to the folder provided in the property value.
3. Copy the license file `content-connector-for-sap.l4j` into that folder.
4. Restart the Content Services application server.

## Set up in a cluster

To set up the SAP Connector in clustered landscapes for high availability:

1. Install the `sap-content-connector-repo-5.x.amp` for Content Services on each node in the cluster.

    >  **Important:** Make sure you only use the merged SAP Connector repository AMP file, which includes the native SAP libraries, as described in [Installing overview]({% link sap/latest/install/index.md %}).

2. Install the `sap-content-connector-share-5.x.amp` for Alfresco Share on each node in the cluster.
3. Update the `alfresco-global.properties` with the SAP related properties.
4. On the SAP side, for each SAP Content Repository (transaction `OAC0`), the HTTP-Server must point to the load balancer instead of a dedicated application server instance. See the Content Services documentation for [high availability]({% link content-services/latest/admin/cluster.md %}#scenariohighthrucluster).
