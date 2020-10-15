---
title: Install Content Connector for SAP Applications
---

The SAP Connector capability for Alfresco Content Services is delivered as a distribution zip file containing repository 
and Share AMP files, server files for the SAP Connector, and third-party license information.

In these topics you'll install and set up everything you need to run the SAP Connector. 
See [Prerequisites]({% link sap/latest/install/index.md %}#prerequisites) and [Supported Platforms]({% link sap/latest/support/index.md %}) 
for information on what you require before you start the installation.

You can download the Alfresco Content Connector for SAP applications software from the: [Alfresco Support Portal](https://support.alfresco.com/)

To set up Communication via HTTPS see this [section]({% link sap/latest/config/index.md %}#securecomms).

## Prerequisites

This topic lists the environment/software prerequisites for installing and using the SAP Connector.

**General requirements**

* A valid license for SAP Connector is required.
* Both systems, Alfresco Content Services and SAP, must be available in the same network, or connected through a VPN.

**SAP requirements**

* SAP ECC 6.0 (or up to latest) with at least SAP GUI 7.30
* SAP S/4HANA (build 1809 or up to latest) with at least SAP GUI 7.50
* SAP dialog user who is able to:
    * Create new SAP Content Repositories (transaction `OAC0`)
    * Create related ArchiveLink customizing in SAP Implementation Guide (transaction `IMG`)
    * Test the ArchiveLink interface in any related module (for example transaction `FB03` for Finance)
* SAP system user who is able to:
    * Invoke BAPIs (ABAP function modules via RFC connection)
* SAP Java Connector (JCo): JCo 3.0.x must be installed

**Alfresco requirements**

* Alfresco Content Services 5.2.1 and later
* Alfresco server system architecture must be one of the following:
    * Linux 64bit x86
    * Windows 64bit x86
    * Contact Alfresco Support if running Alfresco on these platforms:
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
* Access to the Alfresco Content Services server with admin privileges to:
    * Apply the SAP Connector AMP files
    * Edit `alfresco-gobal.properties` file
    * Stop/start the application server
* Alfresco user with admin permissions.

## Installing the SAP Connector

These steps describe how to install the SAP Connector to an instance of Alfresco Content Services.

The SAP Connector is packaged as Alfresco Module Package (AMP) files.

>**Note:** Ensure that you don't start Alfresco Content Services before installing the SAP Connector AMPs.

1.  Go to the [Alfresco Support Portal](https://support.alfresco.com), click **Product Downloads**, and then download the SAP Connector distribution zip, which contains the following files:

    * `sap-content-connector-repo-5.x.amp` for Alfresco Content Services
    * `sap-content-connector-share-5.x.amp` for Alfresco Share

2.  Use the Module Management Tool (MMT) to install the AMP files into the Repository WAR (`alfresco.war`) and the Share WAR (`share.war`).

    For more information, see [Using the Module Management Tool (MMT)](TODO_LINK:https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html) and [Installing an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/amp-install.html).

3.  Add the related properties to the `alfresco-global.properties` file.

    See [configure repository](#configrepo) for more information.

    You'll need to adapt the related property values to your configuration.

4.  Check that the [sap connector configuration]({% link sap/latest/config/index.md %}) is set up correctly for your environment.

5.  Start Alfresco Content Services.

## Configure Alfresco Repository {#configrepo}

These are the minimum required properties that must be appended to the `alfresco-global.properties` in order to 
establish the connection between Alfresco Content Services (the Repository) and SAP.

>**Note:** There are additional properties that can be used to login to the SAP system via the SAP JavaConnector (such as using Logon Groups instead of the Gateway). See [Additional SAP JCo properties](TODO:../references/sap-connector-additional-jco-properties.md) which lists the additional properties that are supported.

1.  Open `alfresco-global.properties` in your Alfresco Content Services installation.

2.  Add all properties from the table below to the end of the file and set their values according to your environment.

3.  Save the file.

    >**Note:** There are up to 100 possible SAP System Configurations. The table below shows the basic configuration for the first configuration. Therefore, the property contains the number **1** in the key.

    The letters **al** in some keys are the abbreviation for **A**rchive**l**ink. These settings are mandatory for the basic communication between SAP and Alfresco Content Services.

|Property Key|Description|Example Value|
|------------|-----------|-------------|
|integrations.sap.system.1.al.alfrescoUser|Username for the connection used to login to Alfresco. Should have admin role.|`admin`|
|integrations.sap.system.1.al.alfrescoPassword|Password for the user. Either plain-text or use encrypted password. See [Encrypting passwords]({% link sap/latest/config/index.md %}#encryptpwd) for more.|`H3ll0W0rlD112!` or `ENC(XbfE4Z112==)`|
|integrations.sap.system.1.al.archiveIds|Comma separated list of all connected SAP Content Repositories of this configuration.|`M1` or `M2,M3,M4`|
|integrations.sap.system.1.al.documentRoot|The document root folder where all documents from the SAP Content Repositories of the current SAP System Configuration are stored. Must exist and must be entered in XPath syntax.|`/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents`|
|integrations.sap.system.1.al.checkSignature|Enables the signature check for the HTTP Content Server interface. If disabled, all requests will be accepted no matter if they are signed or not.|`true` (default) or `false`|
|integrations.sap.system.1.al.checkExpiration|If enabled, a check occurs, whether the signed requests have been sent in the valid time window.|`true` (default) or `false`|
|integrations.sap.system.1.enabled|Whether data replication should be enabled for the current SAP System Configuration or not. If `true`, the following properties must be present with correct values.|`true` or `false` (default)|
|integrations.sap.system.1.name|An arbitrary value for the current SAP System Configuration. Should not contain special characters. Must be unique across all available SAP System Configurations. Recommendation: Should contain the name of the connected SAP system.|`NSP SAP System` or `NSP Repos M1, M2`|
|integrations.sap.system.1.host|The IP address of the SAP server or the SAP Router string.|`192.168.112.112` or `sap.mydomain.com` or `/H/80.112.112.112/H/192.168.112.112/S/3201`|
|integrations.sap.system.1.client|The SAP client used to log in to the SAP system.|`100` or `800`|
|integrations.sap.system.1.systemNumber|The SAP system number.|`00` or `01`|
|integrations.sap.system.1.user|A SAP *system* user used for the login.|`ALFR3SC0`|
|integrations.sap.system.1.password|Password for the SAP user. Either plain-text or use encrypted password. See [Encrypting passwords]({% link sap/latest/config/index.md %}#encryptpwd) for more.|`H3ll0W0rlD112!` or `ENC(XbfE4Z112==)`|
|integrations.sap.system.1.language|The SAP system language used to login.|`EN` or `DE`|
|integrations.sap.system.5.webClient.enabled|Enables the document action "Open corresponding business object in SAP" in Alfresco Share to be opened in the SAP Web-GUI. If `true`, the `webclient.url` below must resolve.|`true` or `false` (default)|
|integrations.sap.system.5.webClient.url|The url to the SAP Web-GUI.|`https://sapserver:port/sap/bc/gui/sap/its/webgui`|
|integrations.sap.system.1.jobs. sapContentConnectorReplicate.enabled|Enables the metadata replication job. Adds the aspect **SAP Replicate Details**|`true` or `false` (default)|
|integrations.sap.system.1.jobs. sapContentConnectorReplicate.cronExpression|The CRON expression used for the job.|`0 0/1 * 1/1 * ? *`|
|integrations.sap.system.1.jobs. sapContentConnectorPlus.enabled|Enables the additional metadata replication job. Adds the aspect **SAP Replicate Plus Details**|`true` or `false` (default)|
|integrations.sap.system.1.jobs. sapContentConnectorPlus.cronExpression|The CRON expression used for the job.|`0 0/1 * 1/1 * ? *`|
|integrations.sap.system.1.jobs. sapContentConnectorBarcode.enabled|Enables the barcode job.|`true` or `false` (default)|
|integrations.sap.system.1.jobs. sapContentConnectorBarcode.cronExpression|The CRON expression used for the job.|`0 0/1 * 1/1 * ? *`|
|integrations.sap.system.1.jobs. sapContentConnectorDirReplicate.enabled|Enables the SAP DIR replication job. Adds the aspect **SAP Document Info Record (DIR) Details**|`true` or `false` (default)|
|integrations.sap.system.1.jobs. sapContentConnectorDirReplicate.cronExpression|The CRON expression used for the job.|`0 0/1 * 1/1 * ? *`|

## Installing the license

The access and use of the SAP Connector is managed by a license. Any limitations are set when you purchase the license. 
To increase the limitations, contact Alfresco to obtain a new license. If you don't have a license yet, 
you can request a trial license.

>**Note:** Make sure you have a valid license file available. The name of the license file is `sapContentConnector.l4j`.

### Apply the license via the Alfresco Share user interface

1.  Open the SAP Connector Administration Console.
2.  Navigate to **Admin Tools** (requires Administrator permission) and then click menu **SAP Integration**.
3.  In the **License Information** section click **Choose Files**.
4.  Select file `sapContentConnector.l4j` , and then click **Upload**.

    >**Note:** The new license is applied immediately. No restart of Alfresco Content Services required.

    ![sap_inst_001_license]({% link sap/images/sap_inst_001_license.png %})

An existing license file is backed up, renamed with the current time stamp, and remain on the file system 
(for example: `sapContentConnectorYYYY-mm-dd_hh:mm:ss.l4j`).

### Apply the license via the file system

1.  Open the file `alfresco-global.properties` and search for the key `dir.license.external`. Note this value as you'll need it next.
2.  Navigate to the folder provided in the property value.
3.  Copy the license file `sapContentConnector.l4j` into that folder.
4.  Restart the Alfresco Content Services application server.

## Set up in a cluster

Set up SAP Connector in clustered landscapes to provide high availability.

You must perform the following steps to install the SAP Connector in a clustered landscape.

1.  Install the `sap-content-connector-repo-5.x.amp` for Alfresco Content Services on each node in the cluster.
2.  Install the `sap-content-connector-share-5.x.amp` for Alfresco Share on each node in the cluster.
3.  The `alfresco-global.properties` on each node must be updated with the SAP related properties.
4.  On the SAP side, for each SAP Content Repository (transaction `OAC0`) the HTTP-Server must point to the load balancer instead a dedicated application server instance.
    Refer to the Alfresco Content Services documentation to learn more about high availability.

