---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing and configuring the S3 Connector

Use this information to install and configure S3 Connector as an alternative content store.

Using an Alfresco Module Package \(AMP\), the connector supplies a new content store which replaces the default file system-based implementation for the standard and deleted content stores. The content store implementation is responsible for reading and writing content streams using the S3 API, however, in order to improve performance a local Caching Content Store is used which uses the local disk to cache recently-used content items.

**Note:** By default the module configures the caching content store to use a maximum of 50 GB of disk, with no limit on individual file sizes.

-   **[Prerequisites for using S3 Connector](../concepts/s3-contentstore-reqs.md)**  
There are a number of software requirements for installing S3 Connector 2.1.
-   **[Installing the S3 Connector](../tasks/s3-contentstore-amp-install.md)**  
These steps describe how to install the S3 Connector to an instance of Alfresco Content Services.
-   **[Configuring the S3 Connector](../tasks/s3-contentstore-config.md)**  
The S3 Connector is configured using properties set in the global properties file.
-   **[Properties reference](../references/s3-contentstore-ref-config-props.md)**  
The S3 Connector provides a number of properties on installation and for customizing your configuration.

**Parent topic:**[Alfresco Content Connector for AWS S3 2.1](../concepts/s3-contentstore-overview.md)

