---
title: Install SAP Cloud Connector
---

The Content Connector for SAP Cloud capability is delivered in a repository Alfresco Module Package (AMP) file.

In these topics you'll install and set up everything you need to run the SAP Cloud Connector. See [Prerequisites](#prerequisites) and [Supported Platforms]({% link sap-cloud/latest/support/index.md %}) for information on what you require before you start the installation.

## Prerequisites

Below are the environment/software prerequisites for installing and using the SAP Cloud Connector.

* Content Services 6.2 or later.
* A valid license for the SAP Cloud Connector.
* SAP <!--full product name?-->version that supports CMIS - SAP S4/HANA 1909 (minimum).

## Install SAP Cloud Connector {#install-license}

The SAP Cloud Connector is packaged as an {% include tooltip.html word="AMP" text="AMP" %} file. These steps describe how to install the SAP Cloud Connector to an instance of Content Services.

1. Download the Alfresco Content Connector for SAP Cloud software from the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}, and then download the SAP Cloud Connector:

    * `sap-content-connector-cmis-repo-1.0.x.amp` for Content Services.

2. Use the Module Management Tool (MMT) to install the repository AMP file into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

3. Start Content Services.

## Install the license

The access and use of the Alfresco Content Connector for SAP Cloud is managed by a license. If you don't have a license yet, you can request a trial license from the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}.

> **Note:** Make sure you have a valid license file before continuing. The name of the license file is `content-connector-for-sap-cloud.l4j`.

### Apply the license via the file system

1. Open the `alfresco-global.properties` file and search for the key **`dir.license.external`**.

    Note down this value as you'll need it next.

2. Navigate to the folder provided in the property value.
3. Copy the license file `content-connector-for-sap-cloud.l4j` into that folder.
4. Restart the Content Services application server.
