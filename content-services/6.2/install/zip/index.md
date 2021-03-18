---
title: Install with zip
---

This page describes how to manually install Content Services using the distribution zip.

For a description of the system paths used within this documentation, see [System path conventions]({% link content-services/6.2/admin/index.md %}#system-paths-convention).
## Prerequisites

To install Content Services using the distribution zip (which also contains the WAR files), make sure that the required software is available on your system:

* Java: OpenJDK 11 is recommended
* Application server: Apache Tomcat
* Database: PostgreSQL or MySQL
* Message broker: ActiveMQ
* LibreOffice
* ImageMagick

For a list of supported components and versions, refer to the `VERSIONS.md` file in the distribution zip.

## Install overview

Use this section to get an overview of the main stages for installing Content Services using the distribution zip. It's designed for users who just need a simple checklist to follow.

Only the main stages for setting up and configuring Content Services are summarized. These include preparing your system for installation, installing the application, configuring it based on your requirements, and finally, testing and getting familiar with Content Services.

Before you start, validate that you have access to the prerequisite software so you can install them in the right order. This includes a JRE, a supported database, Tomcat application server, a message broker (i.e. ActiveMQ), Alfresco Search Services, and additional components (such as ImageMagick).

> **Note:** ActiveMQ is required when manually installing Content Services 6.2 onwards. For more information on installing and configuring ActiveMQ, see [Configuring ActiveMQ]({% link content-services/6.2/config/activemq.md %}).

To get started, prepare your production server by installing the prerequisite software (JRE, database, and message broker) before continuing.

1. Download the distribution zip file by accessing the Alfresco Support Portal.
2. Generate certificates for mutual TLS.
3. Download Tomcat and review the installation steps required.
4. Set up Tomcat.
5. Install and configure Content Services.
6. Install any Alfresco Module Packages such as Alfresco Share, Google Docs Integration, and Alfresco Office Services.
7. Set up ActiveMQ.
8. Install third-party software used by Content Services. This includes LibreOffice, ImageMagick, and Alfresco PDF Renderer.

Review and test your setup to check that all the installation steps are complete:

1. Start and configure your database.
2. Start and configure ActiveMQ.
3. Start the repository.

Follow the remaining links in this guide to see the detailed step-by-step instructions for manually installing Content Services.

## What you need to install Content Services

There are a number of different installation files available to you, each of which you can choose depending on what's already installed on your system.

For new installations or upgrades, use the distribution zip. Use the Alfresco WAR file to install Content Services within an existing Tomcat. The WAR file is included in the distribution zip. In addition, you must install all the required additional components manually.

All files are available from the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}. Click **Product Downloads**, and then select the version of the product you require.

See the [Supported platforms]({% link content-services/6.2/support/index.md %}) for more.

Here's a list of the files to download and install.

| File | Description |
| ---- | ----------- |
| alfresco-content-services-distribution-6.2.x.zip | Content Services distribution zip for new installations or upgrades. Alfresco WAR files (in distribution zip) for a manual install into an existing Tomcat application server. This distribution zip also contains the Module Management Tool (MMT) and the sample extension files, such as `alfresco-global.properties`. |
|alfresco-search-services-1.4.x.zip | Alfresco Search Services distribution zip.<br><br>See [Install Alfresco Search Services]({% link search-services/latest/install/index.md %}) for more information. |
| alfresco-content-services-file-transfer-receiver-6.2.1.zip | Content Services File Transfer Receiver installation file. The File System Transfer Receiver transfers folders and content from an Content Services core repository (the DM) to configured targets using the Transfer Service, for example, a remote file system.<br><br>See [Configure the File System Transfer Receiver]({% link content-services/6.2/admin/import-transfer.md %}#configure-file-system-transfer-receiver) for more information. |

## Preparing the filesystem and database

These steps describe how to prepare a suitable location for data storage and the database.

1. Create a new folder on your local filesystem.

    This folder can be located anywhere, but you need to make sure that the user account under which Tomcat will run has full read/write access to this location.

    In a clustered environment, this folder needs to be shared between all cluster nodes.

2. Create a new database for Content Services.

    It's good security practice to create a new user account for Content Services which only has permissions to this database.

    For PostgreSQL, run the following commands:

    ```sql
    create database alfresco encoding 'utf8';
    create role alfresco LOGIN password 'alfresco';
    grant all on database alfresco to alfresco;
    ```
