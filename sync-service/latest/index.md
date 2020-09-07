---
title: Alfresco Sync Service
---

Alfresco Sync Service is an add-on module that synchronizes files between the desktop and repository using web services. It's part of the Desktop Sync solution that consists of three components: Sync Service, Desktop Sync for Windows, and Desktop Sync for Mac. This documentation describes how to install, configure, and administer the Sync Service.

Here is a summary of the key capabilities:

* Clustering for scalability support
* Added support for more databases: PostgreSQL, Oracle, MySQL, and AWS Aurora MySQL
* Support for AWS deployment
* Events monitoring for content, Governance Services, and permission changes

> **Note:** The Sync Service module can be applied to Alfresco One, and previous versions of Alfresco Content Services. See [prerequisites]({% link sync-service/latest/install/index.md %}) for more.

The following diagram shows a simple representation of how Alfresco Content Services and the Sync Service interact with the Desktop Sync clients. See [Sync Service architecture]({% link sync-service/latest/admin/index.md %}) for more.

![Simple architecture for Sync Service]({% link sync-service/images/syncservice-simple-architecture.png %})

For earlier releases of the Sync Service, see the **Previous Versions** section of [https://docs.alfresco.com](https://docs.alfresco.com){:target="_blank"}.
