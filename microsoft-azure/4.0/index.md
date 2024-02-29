---
title: Alfresco Content Connector for Azure
---

The Alfresco Content Connector for Azure is an add-on module that provides an alternative content store. It uses Microsoft's Azure Blob Storage as the storage mechanism for Alfresco Content Services, allowing for virtually unlimited and inexpensive storage.

This release of the Azure Connector is a compatibility release to support Alfresco Content Services 23.1.

Other features introduced in previous versions include:

* [Azure content store subsystems]({% link microsoft-azure/4.0/config/index.md %}#azure-subsystems)
* [Multiple Azure storage container configuration]({% link microsoft-azure/4.0/config/index.md %}#configuring-multiple-storage-containers)
* Support for [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction#blob-storage){:target="_blank"} for on-premises or Azure Cloud installation of Content Services
* Support for hot and cool access tiers (based on storage account)
* Based on the [Azure SDK for Java](https://github.com/Azure/azure-sdk-for-java){:target="_blank"}
* Storage path approach optimized for high-throughput reads and writes
* Configurable retries and timeouts for large file uploads and downloads
* Accelerate local content download using [Direct Access URLs]({% link microsoft-azure/4.0/config/direct-access.md %})
* [Cloud Storage Properties]({% link microsoft-azure/4.0/config/index.md %}#cloud-storage-properties)

> **Note:** For improved performance of the Azure Connector, you may wish to run your Content Services instance on an Azure VM connected to Azure Blob storage.

The following diagram shows a simple representation of how Content Services and the Azure Connector interact with Azure resources. The storage account has a Blob container, which in turn contains Blobs. The naming convention is flat and only consists of the content UUID which follows Microsoft's recommendations. See [Naming and Referencing Containers, Blobs, and Metadata](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata){:target="_blank"} for more details.

![Simple architecture for Azure Connector]({% link microsoft-azure/images/azure-sml-architecture.png %})
