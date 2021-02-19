---
title: Configure the Azure Connector
---

The Azure Connector is configured using properties set in the global properties file.

## Settings

For a complete list of all configuration properties, see the [Properties reference](#Properties-reference).

## Basic configuration properties

1. Open the `<classpathRoot>/alfresco-global.properties` file.

    If you have existing content in a local contentstore (i.e. where Alfresco Content Services is deployed on-premises), it won't be migrated automatically but it'll still be available in the original location. New content will always be written to Azure.

2. Add the `connector.az.containerName` property, for example:

    ```bash
    connector.az.containerName=myazurecontainer
    ```

    Within a given storage account, every container must have a unique name. If the container does not already exist, it will be created, but the name must not have already been taken. Note that two storage accounts can have containers with the same name. For more details on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).

    See [Naming and Referencing Containers, Blobs, and Metadata](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata){:target="_blank"} for more.

3. Add the `connector.az.deleted.containerName` property, for example:

    ```bash
    connector.az.deleted.containerName=myazuredeletedcontainer
    ```

    This is the container that stores content once it has been deleted. For more details on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).

4. Set where the cached content is stored, and how much cache size you need.

    The cached content location (and default value) is `dir.cachedcontent=${dir.root}/cachedcontent`.

    See [CachingContentStore properties]({% link content-services/latest/admin/content-stores.md %}#cachingcontentstore-properties) for more information on the caching content store.

    > **Note:** The size of the local caching content store can be configured as necessary to limit its use to a maximum overall size or by files with a maximum file size.

    For example:

    ```bash
    # Maximum disk usage for the cache in MB
    system.content.caching.maxUsageMB=51200
    # Maximum size of files which can be stored in the cache in MB (zero implies no limit)
    system.content.caching.maxFileSizeMB=0
    ```

    The Azure Connector supports multipart uploads where files larger than 20MB are split. The file upload is attempted and retried, in case there are issues, up to a specific limit.

5. Save the `alfresco-global.properties` file.

    You are now ready to start Alfresco Content Services.

## Properties reference

The Azure Connector provides a number of properties on installation and for customizing your configuration.

| Property | Description |
| -------- | ----------- |
| connector.az.account.name | This is the Azure storage account name, and must be unique across all Azure accounts. See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more details.
| connector.az.account.key | This is the Azure storage account access key. See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more details.
| connector.az.containerName | Within a given storage account, every container must have a unique name. Every Blob within a given container must also have a unique name within that container. If the container does not already exist, it will be created, but the name must not have already been taken. Note that two accounts can have containers with the same name, see [Naming and Referencing Containers, Blobs, and Metadata](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata){:target="_blank"} for more details. For more information on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).
| connector.az.deleted.containerName | Content is copied here once it has been deleted. This includes after content is removed from the recycle bin and after a 14 day grace period. In order for the content to be removed entirely it must be deleted manually by an Administrator. For more information on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).
| connector.az.maxErrorRetries | The maximum number of attempts to retry reads or writes to the Blob container in case of failed transfers. The default is `3`. This configuration uses exponential retries. See [Exponential back-off retry policy](https://docs.microsoft.com/en-us/azure/architecture/best-practices/retry-service-specific#azure-storage){:target="_blank"} for more details.
| connector.az.tryTimeout | Indicates the maximum time (in seconds) allowed for any single try of an HTTP request. When transferring large amounts of data, the default tryTimeout will probably not be sufficient. To overcome this, we compute the upload try timeout using: {::nomarkdown}<pre>uploadTryTimeout = tryTimeout * anticipatedPayloadSizeInMb</pre>{:/} |
| connector.az.objectNamePrefix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
| connector.az.objectNameSuffix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
| connector.az.deleted.objectNamePrefix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
| connector.az.deleted.objectNameSuffix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
