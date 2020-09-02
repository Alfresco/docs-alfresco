---
title: Install the Azure Connector
---

Use this information to install the Azure Connector as an alternative content store.

Using an Alfresco Module Package (AMP), the connector allows an additional content store option for the file system underlying Alfresco Content Services.

## Prerequisites for using Azure Connector

There are a number of software requirements for installing Azure Connector.

### Alfresco requirements

* Alfresco Content Services 6.2 or later release

    See [Alfresco Supported Platforms](https://www.alfresco.com/services/subscription/supported-platforms){:target="_blank"} for more information.

### Azure related requirements

In order to use the Azure Connector, you will need an Azure storage account so that you can configure the Azure Connector successfully.

## Install the Azure Connector

These steps describe how to install the Alfresco Content Connector for Azure to an instance of Alfresco Content Services.

The Azure Connector is packaged as an Alfresco Module Package (AMP) file.

> **Note:** Ensure that you don't start Alfresco Content Services before installing the Azure Connector AMP.

1. Go to the [Alfresco Support Portal](http://support.alfresco.com){:target="_blank"}.

2. Download the `alfresco-azure-connector-1.1.x.amp` file.

3. Use the Module Management Tool (MMT) to install the AMP into the repository WAR (alfresco.war).

    For more information, see [Using the Module Management Tool (MMT)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html){:target="_blank"}(#LINK) and [Installing an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/amp-install.html){:target="_blank"}(#LINK).

    > **Note:** You must install the Azure Connector AMP using `-force`.

4. Check that the [configuration](../configure/index.md) is set up correctly for your environment.

5. Start Alfresco Content Services.
