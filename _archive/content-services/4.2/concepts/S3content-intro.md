---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Installing and configuring Alfresco S3 Connector

The Alfresco S3 Connector is an add-on module that provides an alternative content store.

Using an Alfresco Module Package, the connector supplies a new content store which replaces the default file system-based implementation for the standard and deleted content stores. The content store implementation is responsible for reading and writing content streams using the S3 API, however, in order to improve performance a local Caching Content Store is used which uses the local disk to cache recently-used content items.

**Note:** By default the module configures the caching content store to use a maximum of 50GB of disk, with no limit on individual file sizes.

The Alfresco S3 Connector uses a single S3 bucket and all content is stored in that bucket within one of the following directories:

```
<bucket-root>/contentstore for the main content store
<bucket-root>/contentstore.deleted for the 'deleted' content store
```

-   **[Installing the Alfresco S3 Connector](../tasks/S3contentstore-install-amp.md)**  
These steps describe how to install the Alfresco S3 Connector to an instance of Alfresco.
-   **[Configuring the Alfresco S3 Connector](../tasks/S3-Content-Store-connection-config.md)**  
The Alfresco S3 Connector is configured using properties set in the global properties file.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

