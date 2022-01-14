---
title: Install Content Connector for AWS S3
---

Use this information to install and configure the Content Connector for AWS S3 as an alternative content store.

Using an Alfresco Module Package (AMP), the connector supplies a new content store which replaces the default file system-based implementation for the standard and (optionally) the deleted content stores. 
The content store implementation is responsible for reading and writing content streams using the S3 API, 
however, in order to improve performance a local Caching Content Store is used which uses the local disk to cache recently-used content items.

>**Note:** By default the module configures the caching content store to use a maximum of 50 GB of disk, with no limit on individual file sizes.

## Prerequisites

There are a number of software requirements for installing Content Connector for AWS S3 version 2.2.

**Alfresco requirements**

* Alfresco Content Services 6.0 or later releases. See [Alfresco Supported Platforms](https://www.alfresco.com/services/subscription/supported-platforms) for more information.

**Java requirements**

* OpenJDK 11.

**AWS related requirements**

In order to use the S3 Connector, you will need an AWS account so that you can configure the S3 Connector successfully.

**Summary of features**

If you want to use the functionality introduced in S3 Connector 2.0, you can configure the following:

* For IAM roles integration, see [Configuring AWS Identity and Access Management]({% link aws-s3/2.2/config/index.md %}#configiam).
* For KMS integration, see [Configuring AWS Key Management Service]({% link aws-s3/2.2/config/index.md %}#configkeymgmt).

If you want to use the functionality introduced in S3 Connector 2.1, you can configure the following:

* For S3 Connector on-premises configuration, see [Configuring S3 Connector on-premises]({% link aws-s3/2.2/config/index.md %}#onpremconfig).
* For AWS Storage Classes configuration, see [Configuring AWS Storage Classes]({% link aws-s3/2.2/config/index.md %}#configstorageclass).

## Installing

These steps describe how to install the Content Connector for AWS S3 to an instance of Alfresco Content Services.

The S3 Connector is packaged as an Alfresco Module Package (AMP) file.

>**Note:** Ensure that you don't start Alfresco Content Services before installing the S3 Connector AMP.

1. Go to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2. Download the `alfresco-s3-connector-2.2.x.amp` file.

3. se the Module Management Tool (MMT) to install the AMP into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/6.1/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/6.1/install/zip/amp.md %}).

4. Check that the [configuration]({% link aws-s3/2.2/config/index.md %}) is set up correctly for your environment.

5. Start Alfresco Content Services.
