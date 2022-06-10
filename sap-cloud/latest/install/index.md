---
title: Install SAP Cloud Connector
---

The Content Connector for SAP Cloud capability is delivered in a repository Alfresco Module Package (AMP) file.

In these topics you'll install and set up everything you need to run the SAP Cloud Connector. See [Prerequisites](#prerequisites) and [Supported Platforms]({% link sap-cloud/latest/support/index.md %}) for information on what you require before you start the installation.

## Prerequisites

There are a number of software requirements for installing and using the SAP Cloud Connector.

See [Supported platforms]({% link sap-cloud/latest/support/index.md %}) for more information.

### General requirements

You also need to [install a valid license](#install-license) for the SAP Cloud Connector.

## Install SAP Cloud Connector {#install-connector}

The SAP Cloud Connector is packaged as an {% include tooltip.html word="AMP" text="AMP" %} file. These steps describe how to install the SAP Cloud Connector to an instance of Content Services.

1. Go to [Hyland Community](https://community.hyland.com/){:target="_blank"}, and then download the Alfresco Content Connector for SAP Cloud delivery package. It is provided as a ZIP file and contains at least the following files:

    * Module `sap-content-connector-cmis-repo-1.2.x.amp` for Content Services:
        * This contains the business logic for the SAP Cloud Connector.
    * Module `sap-content-connector-genericXchange-1.x.x.amp` for Content Services:
        * This contains the business logic for additional data exchange.
        * See [Configure GenericXchange]({% link sap-cloud/latest/config/genericxchange.md %}) for more details.
    * `alfresco-global.properties_append` template:
        * This is only required if using GenericXchange, and contains required keys/properties to add to the current `alfresco-global.properties` file.
    * `sap-content-connector-jco-packer-x.x`:
        * This is only required if using GenericXchange with RFC (SAP JavaConnector).
        * See [Re-package the repository AMP]({% link sap/latest/install/index.md %}#re-package-the-repository-amp) for more details.

2. To install the two {% include tooltip.html word="AMP" text="AMP" %} files from the delivery package:

    * Use the Module Management Tool (MMT) to install both repository AMP files into the repository WAR (`alfresco.war`). For more information, see:

        * [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt)
        * [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %})

3. Start Content Services.

## Install the license {#install-license}

The access and use of the SAP Cloud Connector is managed by a license. If you don't have a license yet, you can request a trial license from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

> **Note:** Make sure you have a valid license file before continuing. The name of the license file is `content-connector-for-sap-cloud.l4j`.

### Apply the license via the file system

1. Open the `alfresco-global.properties` file and search for the key **`dir.license.external`**. Note down this value as you'll need it in the following steps.
2. Navigate to the folder provided in the property value.
3. Copy the license file `content-connector-for-sap-cloud.l4j` into that folder.
4. Restart the Content Services application server.
