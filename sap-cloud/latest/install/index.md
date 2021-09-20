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

1. Go to the [Hyland/Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}, and then download the Alfresco Content Connector for SAP Cloud delivery package. It is provided as a ZIP-file and contains at least the following files:

* Module `sap-content-connector-cmis-repo-1.2.x.amp` for Content Services. It contains the business logic for the SAP Cloud Connector.
* Module `sap-content-connector-genericXchange-1.x.x.amp` for Content Services. It contains the business logic for the additional data exchange. Refer to the [GenericXchange]({% link sap-cloud/latest/config/genericxchange.md %}) section.
* `alfresco-global.properties_append` template for required keys to be appended to the current alfresco-global.properties if in GenericXchange is used.
* `sap-content-connector-jco-packer-x.x` only required if the GenericXchange should be used with RFC (SAP JavaConnector). Refer to [Re-package the repository AMP](https://docs.alfresco.com/sap/latest/install/#re-package-the-repository-amp).

To install the two {% include tooltip.html word="AMP" text="AMP" %} files from the delivery package:
1. Use the Module Management Tool (MMT) to install both repository AMP files into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

2. Start Content Services.

## Install the license {#install-license}

The access and use of the SAP Cloud Connector is managed by a license. If you don't have a license yet, you can request a trial license from the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}.

> **Note:** Make sure you have a valid license file before continuing. The name of the license file is `content-connector-for-sap-cloud.l4j`.

### Apply the license via the file system

1. Open the `alfresco-global.properties` file and search for the key **`dir.license.external`**. Note down this value as you'll need it in the following steps.
2. Navigate to the folder provided in the property value.
3. Copy the license file `content-connector-for-sap-cloud.l4j` into that folder.
4. Restart the Content Services application server.
