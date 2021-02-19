---
title: Configure the Azure Connector
---

The Azure Connector is configured using properties set in the global properties file.

## Settings

For a complete list of all configuration properties, see the [Properties reference](#Properties-reference).

## Basic configuration properties

1. Open the `<classpathRoot>/alfresco-global.properties` file.

    If you have existing content in a local contentstore (i.e. where Alfresco Content Services is deployed on-premises), it won't be migrated automatically but it'll still be available in the original location. New content will always be written to Azure.

2. Add the `connector.az.authentication.mode` property, for example:

    ```bash
    connector.az.authentication.mode=
    ```

    The authentication modes and supported values (shown in brackets) are:

    * Shared Key credentials (`sharedKey`)
    * Shared Access Signatures (`sas`)
    * Managed Identity with Azure AD (`managedIdentityAD`)
    * Application registered with Azure AD (`applicationAD`)
    * Key Vault with Secret Key (`keyVault`)

3. Choose your preferred authentication mechanism, and add any additional properties based on the following options.

    The Azure storage account name must be unique across all Azure accounts. See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more.

    Remember to replace the placeholder values (i.e. `my*`) with your own values.

    1. Using Azure storage Shared Key credentials:

        ```bash
        connector.az.account.name=myazureaccount
        connector.az.authentication.mode=sharedKey
        connector.az.account.key=mysharedkey
        ```

        `connector.az.account.key` is the Azure storage account access key, for example:

        ```bash
        connector.az.account.key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
        ```

        See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more.

    2. Using Azure storage Shared Access Signatures (SAS):

        ```bash
        connector.az.account.name=myazureaccount
        connector.az.authentication.mode=sas
        connector.az.container.sasToken=mysastoken
        ```

        See [Create a user delegation SAS for a container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-user-delegation-sas-create-cli#create-a-user-delegation-sas-for-a-container){:target="_blank"} for more.

    3. Using Azure Managed Identity with Azure Active Directory (AD):

        ```bash
        connector.az.account.name=myazureaccount
        connector.az.authentication.mode=managedIdentityAD
        ```

        See [Configure managed identities for Azure resources](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm){:target="_blank"} for more.

        **Note:** This authentication mode can only be used in an Azure cloud environment, such as an Azure Virtual Machine running with RBAC access granted to Azure storage account. See [RBAC roles for blobs and queues](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal#rbac-roles-for-blobs-and-queues){:target="_blank"} for more details.

    4. Using Azure Application with Azure Active Directory (AD):

        ```bash
        connector.az.account.name=myazureaccount
        connector.az.authentication.mode=applicationAD
        connector.az.application.clientId=myclientid
        connector.az.application.clientSecret=myclientsecret
        connector.az.application.tenantId=mytenantid
        ```

        See [Acquire a token from Azure AD for authorizing requests from a client application](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app?toc=/azure/storage/blobs/toc.json){:target="_blank"} for more.

    5. Using Azure Key Vault with Storage Shared Key stored as Key Vault secret:

        ```bash
        connector.az.account.name=myazureaccount
        connector.az.authentication.mode=keyVault
        connector.az.application.clientId=myclientid
        connector.az.application.clientSecret=myclientsecret
        connector.az.application.tenantId=mytenantid
        connector.az.keyVault.name=mykeyvaultname
        connector.az.keyVault.secret.name=mykeyvaultsecretname
        ```

        See [Manage storage account access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&tabs=azure-portal){:target="_blank"} for more.

4. Add the `connector.az.containerName` property, for example:

    ```bash
    connector.az.containerName=myazurecontainer
    ```

    Within a given storage account, every container must have a unique name. If the container does not already exist, it will be created, but the name must not have already been taken. Note that two storage accounts can have containers with the same name. For more details on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).

    See [Naming and Referencing Containers, Blobs, and Metadata](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata){:target="_blank"} for more.

5. Add the `connector.az.deleted.containerName` property, for example:

    ```bash
    connector.az.deleted.containerName=myazuredeletedcontainer
    ```

    This is the container that stores content once it has been deleted. For more details on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).

6. Set where the cached content is stored, and how much cache size you need.

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

7. Save the `alfresco-global.properties` file.

    You are now ready to start Alfresco Content Services.

## Properties reference

The Azure Connector provides a number of properties on installation and for customizing your configuration.

| Property | Description |
| -------- | ----------- |
| connector.az.authentication.mode | Controls the type of supported authentication mechanism. The authentication modes and supported values (in brackets) are:{::nomarkdown}<ol><li>Shared Key credentials (sharedKey)</li><li>Shared Access Signatures (sas)<li>Managed Identity with Azure AD (managedIdentityAD)</li><li>Application registered with Azure AD (applicationAD)</li><li>Key Vault with Secret Key (keyVault)</li></ol><p>Added in Azure Connector 1.1.</p>{:/} |
| connector.az.account.name | This is the Azure storage account name, and must be unique across all Azure accounts. See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more details.
| connector.az.account.key | This is the Azure storage account access key. See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more details.
| connector.az.container.sasToken | This is a token that's required to authorize resource access requests as part of service-level Shared Access Signature (SAS) authentication. See [Azure storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview){:target="_blank"} for more details. Added in Azure Connector 1.1.
| connector.az.application.clientId | Defines the application (client) ID to be used for Azure authentication. Added in Azure Connector 1.1.
| connector.az.application.clientSecret | Defines the client secret to be used for Azure authentication. Added in Azure Connector 1.1.
| connector.az.application.tenantId | Defines the Azure AD tenant ID (or directory ID) to be used for Azure authentication. Added in Azure Connector 1.1.
| connector.az.keyVault.name | Defines a unique vault name to be used for Azure Key Vault authentication. Added in Azure Connector 1.1.
| connector.az.keyVault.secret.name | Defines a secret to the vault to be used for Azure Key Vault authentication. Added in Azure Connector 1.1.
| connector.az.storeProtocol | Defines the store protocol name. Choosing your own store protocol name allows you to run multi-cloud deployments and have a consistent content URL regardless of where the content is added. The default value is `azb`, to represent the Azure Blob connector as the default protocol. Added in Azure Connector 1.1.
| connector.az.containerName | Within a given storage account, every container must have a unique name. Every Blob within a given container must also have a unique name within that container. If the container does not already exist, it will be created, but the name must not have already been taken. Note that two accounts can have containers with the same name, see [Naming and Referencing Containers, Blobs, and Metadata](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata){:target="_blank"} for more details. For more information on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).
| connector.az.deleted.containerName | Content is copied here once it has been deleted. This includes after content is removed from the recycle bin and after a 14 day grace period. In order for the content to be removed entirely it must be deleted manually by an Administrator. For more information on what a content store is, see [Manage content stores]({% link content-services/latest/admin/content-stores.md %}#manage-content-stores).
| connector.az.maxErrorRetries | The maximum number of attempts to retry reads or writes to the Blob container in case of failed transfers. The default is `3`. This configuration uses exponential retries. See [Exponential back-off retry policy](https://docs.microsoft.com/en-us/azure/architecture/best-practices/retry-service-specific#azure-storage){:target="_blank"} for more details.
| connector.az.tryTimeout | Indicates the maximum time (in seconds) allowed for any single try of an HTTP request. When transferring large amounts of data, the default tryTimeout will probably not be sufficient. To overcome this, we compute the upload try timeout using: {::nomarkdown}<pre>uploadTryTimeout = tryTimeout * anticipatedPayloadSizeInMb</pre>{:/} |
| connector.az.objectNamePrefix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
| connector.az.objectNameSuffix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
| connector.az.deleted.objectNamePrefix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
| connector.az.deleted.objectNameSuffix | You can attach a prefix or suffix when you build the Blob ObjectName from the GUID. This prefix or suffix is not stored in the database, which means correct configuration is needed when using this property. **Note:** The use of this property is strongly discouraged. If you need to separate Blobs from different connectors or systems, then you should use different containers. |
