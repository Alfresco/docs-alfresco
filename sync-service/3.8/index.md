---
title: Alfresco Sync Service
---

Alfresco Sync Service is an add-on module that synchronizes files between the desktop and repository using web services. It's part of the Desktop Sync solution that consists of three components: Sync Service, Desktop Sync for Windows, and Desktop Sync for Mac. This documentation describes how to install, configure, and administer the Sync Service.

This release of Sync Service is a compatibility release to support Alfresco Content Services 7.3.

Here is a summary of the key capabilities:

* Clustering for scalability support
* Support for various databases: PostgreSQL, Oracle, MySQL, and AWS Aurora MySQL
* Support for AWS deployment
* Events monitoring for content, Governance Services, and permission changes

> **Note:** The Sync Service module can be applied to Alfresco Content Services. See [prerequisites]({% link sync-service/3.8/install/index.md %}) and [Supported platforms]({% link sync-service/3.8/support/index.md %}) for more.

The following diagram shows a simple representation of how Alfresco Content Services and the Sync Service interact with the Desktop Sync clients. See [Sync Service architecture]({% link sync-service/3.8/admin/index.md %}) for more.

![Simple architecture for Sync Service]({% link sync-service/images/sync-simple-arch.png %})
