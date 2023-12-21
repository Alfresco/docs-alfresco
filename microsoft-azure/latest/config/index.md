---
title: Configure the Azure Connector
---

The Azure Connector is configured using properties set in the global properties file.

For a complete list of all configuration properties, see the [Properties reference](#properties-reference).

## Default configuration properties
These are the configuration properties that are applied when you install the Azure Connector:

```text
# Configuration option for the store protocol
connector.az.storeProtocol=azb

# A number of retries in case an error occurs
connector.az.maxErrorRetries=3

# Indicates the maximum time (in seconds) allowed for any single try of an HTTP request.
connector.az.tryTimeout=10

# Cloud Storage Properties configuration
connector.az.nativeStorageProperties=x-ms-access-tier,x-ms-archive-status,x-ms-rehydrate-priority
connector.az.restorePriorityDefault=Standard
connector.az.restoreAccessTierDefault=Cool
```

## Basic configuration properties
The following properties needs to be set up specifically for your environment and access to Azure storage.

1. Open the `<classpathRoot>/alfresco-global.properties` file.

    If you have existing content in a local contentstore (i.e. where Content Services is deployed on-premises), it won't be migrated automatically but it'll still be available in the original location. New content will always be written to Azure.

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

    See [CachingContentStore properies]({% link content-services/latest/admin/content-stores.md %}#cachingcontentstore-properties) for more information on the caching content store.

    > **Note:** The size of the local caching content store can be configured as necessary to limit its use to a maximum overall size or by files with a maximum file size.

    For example:

    ```bash
    # Maximum disk usage for the cache in MB
    system.content.caching.maxUsageMB=51200
    # Maximum size of files which can be stored in the cache in MB (zero implies no limit)
    system.content.caching.maxFileSizeMB=0
    ```

    The Azure Connector supports multipart uploads where files larger than 20MB are split. The file upload is attempted and retried, in case there are issues, up to a specific limit.

     > **Note:** Starting from version 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services. For details on how to re-enable it, see [Azure Connector deleted content store](#azure-connector-deleted-content-store).

7. Save the `alfresco-global.properties` file.

    You are now ready to start Content Services.

## Cloud Storage Properties configuration {#cloud-storage-properties}
Cloud Storage Properties are represented as a key-value pair (String-String) collection. Mentioned pairs are either directly
retrieved from Cloud Storage Provider APIs object headers or derived from their values.

Storage Properties are reflected at the content level and content may (especially when in Cloud Storage) or
may not have at least one such property. **Storage Properties are not persisted as part of the metadata** (or any other way),
so we rely on the `ContentStore` and `ServiceAdapter` implementations to provide the means to retrieve/derive the
storage properties information.

When cloud connectors do not provide functionality to retrieve storage properties, none will be returned.

Configuration properties applicable to Azure Cloud Storage Properties functionality:

|Property name |Property value|Description|  
|---|---|---|
|`connector.az.nativeStorageProperties`|`x-ms-access-tier,x-ms-archive-status,x-ms-rehydrate-priority`|Limits the list of Azure specific storage properties to be retrived|
|`connector.az.rehydratePriorityDefault`|`Standard` / `High`|Default rehydrate (archive-restore) priority. Used when no respective value passed in archive-restore request.|
|`connector.az.rehydrateAccessTier`|`Hot` / `Cold`| Blob access tier set for content within archive-restore request.|

The following properties are currently (by default) returned from Azure Storage:

|Name |Possible values|  
|---|---|
|`x-ms-access-tier`|`Hot` / `Cool` / `Archive`|
|`x-ms-archive-status`|`rehydrate-pending-to-hot` / `rehydrate-pending-to-cool`|
|`x-ms-rehydrate-priority`|`High` / `Standard`|

Derived Storage Properties are Alfresco specific and currently reflecting information whether content is archived
(offline) and whether it is being restored from offline state (and for how long):

|Name |Possible values|Description|  
|---|---|---|
|`x-alf-archived`|`true`, `false`|Indicates whether content is archived (offline) and not immediately accessible|
|`x-alf-archive-restore-in-progress`|`true`, `false`|Indicates whether a request to restore content from archive is progress.|

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

## Azure Connector content store subsystems {#azure-subsystems}

Starting from version 1.2, the Azure Connector provides out-of-the-box content store subsystems. Older versions of the Azure Connector hard-wired the Microsoft Azure content store directly into Content Services.

The subsystem approach allows a more flexible use of the Azure content store, even in conjunction with existing content stores. A subsystem can be started, stopped, and configured independently, and it has its own isolated Spring application context and configuration. The Azure subsystems belong to the `ContentStore` category, and have types `Azure` or `AzureOnPrem`.

See the Content Services documentation on [Subsystems Extension Point]({% link content-services/latest/develop/repo-ext-points/subsystems.md %}) for more information.

### AzureOnPrem content store subsystem

This defines an aggregating content store with Azure as the primary content store and the file system as the secondary one.

This configuration is similar to what's used in previous Azure Connector versions (i.e. 1.0, 1.1) and is set as the default content store.

### Azure content store subsystem

This defines a pure Azure content store, which uses Microsoft's Azure Storage as the only storage mechanism for Content Services.

This content store is recommended for a clean Content Services and Azure Connector installation, or an upgrade of an installation that's never used the file system.

### Using an Azure content store subsystem

The default subsystem that's enabled on installation is `AzureOnPrem`. This ensures that the new AMP version is compatible with a previous installation.

You can change the subsystem used by overwriting the global variable `filecontentstore.subsystem.name`, for example:

```bash
filecontentstore.subsystem.name=Azure
```

**Important:** Do not switch to a pure `Azure` content store from `AzureOnPrem` if binaries have already been saved on the file system.

### Customizing the subsystem properties

You can manage subsystems by using a JMX client under `MBeans > Alfresco > Configuration > ContentStore > managed`. Here, you can change all the properties defined for the subsystem, and restart the subsystem. Another way to extend a subsystem is to add a `*-context.xml` and a properties file, in the extension path for that subsystem:

```text
alfresco/extension/subsystems/ContentStore/Azure/Azure/*-context.xml
alfresco/extension/subsystems/ContentStore/Azure/Azure/*.properties
```

> **Note:** In Content Services 7.2 and Azure Connector 3.0, changing the current content store subsystem using the JMX client isn't supported. There's a limitation in Content Services which only allows switching between the embedded content stores.

### Deleted content store support in the repository versus Azure

The deleted content store support in Content Services moves the deleted content in a dedicated storage container, defined by the `connector.az.deleted.containerName` property. System administrators can schedule a job to delete the binaries from this location.

Previous versions of the Azure Connector support the deleted content store provided by the repository.

Starting with 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services. However, you can enable the Content Services deleted content store, if required.

See [Azure Connector deleted content store]({% link microsoft-azure/latest/install/index.md %}#azure-connector-deleted-content-store) for more details.

## Configuring multiple storage containers

Starting from version 1.2, the Azure Connector contains an Azure content store sample. If enabled, this adds `AzMultipleStorageContainers` as a third alternative for the Azure content store subsystems.

Review the prerequisites in [Azure Connector content store subsystems](#azure-connector-content-store-subsystems) which introduces the Azure content store subsystems. The out-of-the-box Azure subsystems have two possible types: Azure and AzureOnPrem.

The Azure multiple storage containers sample is a new store subsystem that is based on the `storeSelectorContentStore`. The Store selector has two stores (instances of the Azure content store):

* `store1.azureBlobContentStore` as the default
* `store2.azureBlobContentStore` as the second one

The sample files can be found in `alfresco-azure-connector-4.0.x.amp`.

* `azure-multiple-storage-containers-context.xml.sample` in `config/alfresco/extension`
* `azure-mc-contentstore-context.xml.sample` and `azure-mc-contentstore.properties.sample` are in `config/alfresco/extension/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers`

### azure-multiple-storage-containers-context.xml.sample

This provides a new Spring child Application Context based on the `*.xml` files and `*.properties` files found in `alfresco/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers`.

### azure-mc-contentstore-context.xml.sample

The subsystem configuration file is split in sections to make it easier to extend:

* Deleted content store
* Stores
* Store selector
* Caching content store

### Deleted content store

```bash
    <bean id="azureDeletedServiceAdapter" class="org.alfresco.integrations.connector.AzureBlobServiceAdapter" parent="store1.abstractAzureServiceAdapter" init-method="init">
            <property name="containerName" value="${connector.az.deleted.containerName}" />
    </bean>
    <bean id="deletedContentStore" class="org.alfresco.integrations.connector.AzureBlobContentStore" depends-on="azureDeletedServiceAdapter">
        <property name="serviceAdapter" ref="azureDeletedServiceAdapter" />
        <property name="objNamePrefix" value="${connector.az.deleted.objectNamePrefix}" />
        <property name="objNameSuffix" value="${connector.az.deleted.objectNameSuffix}" />
    </bean>
```

> **Note:** All deleted files will go to the `connector.az.deleted.containerName` container of the first store if you enable the deleted content store.

### Stores

```bash
    <bean id="store1.authConfig" class="org.alfresco.integrations.connector.authentication.AuthConfig" >
        <property name="accountName" value="${connector.az.account.name}" />
        <property name="accountKey" value="${connector.az.account.key}" />
        <property name="sasToken" value="${connector.az.container.sasToken}" />
        <property name="clientId" value="${connector.az.application.clientId}" />
        <property name="clientSecret" value="${connector.az.application.clientSecret}" />
        <property name="tenantId" value="${connector.az.application.tenantId}" />
        <property name="secretKeyName" value="${connector.az.keyVault.secret.name}" />
        <property name="vaultName" value="${connector.az.keyVault.name}" />
    </bean>

    <bean id="store1.managedIdentityAD" class="org.alfresco.integrations.connector.authentication.AzureADManagedIdentityAuthentication" >
        <constructor-arg index="0"  ref="store1.authConfig" />
    </bean>

    <bean id="store1.applicationAD" class="org.alfresco.integrations.connector.authentication.AzureADApplicationAuthentication" >
        <constructor-arg index="0"  ref="store1.authConfig" />
    </bean>

    <bean id="store1.sas" class="org.alfresco.integrations.connector.authentication.AzureSasAuthentication" >
        <constructor-arg index="0"  ref="store1.authConfig" />
    </bean>

    <bean id="store1.sharedKey" class="org.alfresco.integrations.connector.authentication.AzureSharedKeyAuthentication" >
        <constructor-arg index="0"  ref="store1.authConfig" />
    </bean>

    <bean id="store1.keyVault" class="org.alfresco.integrations.connector.authentication.AzureKeyVaultAuthentication" >
        <constructor-arg index="0"  ref="store1.authConfig" />
    </bean>

    <bean id="store1.abstractAzureServiceAdapter" class="org.alfresco.integrations.connector.AzureBlobServiceAdapter" abstract="true">
        <property name="azureAuthentication" ref="store1.${connector.az.authentication.mode}"/>
        <property name="tryTimeout" value="${connector.az.tryTimeout}"/>
        <property name="maxErrorRetries" value="${connector.az.maxErrorRetries}" />
        <!-- sets a maximum file size for all content. See content-services-context.xml for defaultContentLimitProvider bean -->
        <property name="contentLimitProvider" ref="defaultContentLimitProvider" />
    </bean>

    <bean id="store1.azureServiceAdapter" class="org.alfresco.integrations.connector.AzureBlobServiceAdapter" parent="store1.abstractAzureServiceAdapter" init-method="init">
        <property name="containerName" value="${connector.az.containerName}" />
    </bean>

    <bean id="store1.azureBlobContentStore" class="org.alfresco.integrations.connector.AzureBlobContentStore" depends-on="store1.azureServiceAdapter">
        <property name="serviceAdapter" ref="store1.azureServiceAdapter" />
        <property name="objNamePrefix" value="${connector.az.objectNamePrefix}" />
        <property name="objNameSuffix" value="${connector.az.objectNameSuffix}" />
        <property name="storeProtocol" value="${connector.az.storeProtocol}" />
    </bean>

    <!-- [End] Store 1 -->
```

### Store selector

```bash
    <!-- [Start] Store Selector -->

    <!-- Override the selector to add in the Azure Connector stores -->
    <bean id="storeSelectorContentStore" parent="storeSelectorContentStoreBase">
        <property name="defaultStoreName">
            <value>default</value>
        </property>
        <property name="storesByName">
            <map>
                <entry key="default">
                    <ref bean="store1.azureBlobContentStore"/>
                </entry>
                <entry key="azContentStore2">
                    <ref bean="store2.azureBlobContentStore"/>
                </entry>
            </map>
        </property>
    </bean>

    <!-- Overwrite the store constraint with a no op constraint for now-->
    <bean id="storeSelectorContentStore.constraint" class="org.alfresco.repo.dictionary.constraint.NoOpConstraint" init-method="initialize" >
        <property name="shortName">
            <value>defaultStoreSelector</value>
        </property>
        <property name="registry">
            <ref bean="cm:constraintRegistry" />
        </property>
    </bean>

    <!-- [End] Store Selector -->
```

### Caching content store

The caching content store is defined over the content store selector so that we have one cache for all stores and makes the sample easier to extend when adding more stores.

```bash
    <bean id="cachingContentStore"
          class="org.alfresco.repo.content.caching.CachingContentStore"
          init-method="init">
        <property name="backingStore" ref="storeSelectorContentStore"/>
        <property name="cache" ref="contentCache"/>
        <property name="cacheOnInbound" value="true"/>
        <property name="quota" ref="standardQuotaManager"/>
    </bean>

    <bean id="az.contentStoresToClean" class="java.util.ArrayList">
        <constructor-arg>
            <list>
                <ref bean="cachingContentStore" />
            </list>
        </constructor-arg>
    </bean>
```

### azure-mc-contentstore.properties.sample

This provides the subsystem properties where the `AzMultipleStorageContainers` subsystem declares default values for all the properties it requires.

See the Content Services documentation on [Subsystem properties]({% link content-services/latest/config/subsystems.md %}#subsystem-properties) for more details.

### Adding new Azure store to AzMultipleStorageContainers subsystem

These steps describe how to add a new Azure store starting from the AzMultipleStorageContainers subsystem sample, and how to move content between content stores.

1. Locate the file `azure-mc-contentstore-context.xml` in folder:

    ```text
    $CATALINA_HOME/shared/classes/alfresco/extension/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers
    ```

2. Duplicate the **Store 2** section, and replace `store2.` with `store3.`

    ```bash
    <bean id="store2.authConfig" class="org.alfresco.integrations.connector.authentication.AuthConfig" >
        <property name="accountName" value="${connector.az.store2.account.name}" />
        <property name="accountKey" value="${connector.az.store2.account.key}" />
        <property name="sasToken" value="${connector.az.store2.container.sasToken}" />
        <property name="clientId" value="${connector.az.store2.application.clientId}" />
        <property name="clientSecret" value="${connector.az.store2.application.clientSecret}" />
        <property name="tenantId" value="${connector.az.store2.application.tenantId}" />
        <property name="secretKeyName" value="${connector.az.store2.keyVault.secret.name}" />
        <property name="vaultName" value="${connector.az.store2.keyVault.name}" />
    </bean>

    <bean id="store2.managedIdentityAD" class="org.alfresco.integrations.connector.authentication.AzureADManagedIdentityAuthentication" >
        <constructor-arg index="0"  ref="store2.authConfig" />
    </bean>

    <bean id="store2.applicationAD" class="org.alfresco.integrations.connector.authentication.AzureADApplicationAuthentication" >
        <constructor-arg index="0"  ref="store2.authConfig" />
    </bean>

    <bean id="store2.sas" class="org.alfresco.integrations.connector.authentication.AzureSasAuthentication" >
        <constructor-arg index="0"  ref="store2.authConfig" />
    </bean>

    <bean id="store2.sharedKey" class="org.alfresco.integrations.connector.authentication.AzureSharedKeyAuthentication" >
        <constructor-arg index="0"  ref="store2.authConfig" />
    </bean>

    <bean id="store2.keyVault" class="org.alfresco.integrations.connector.authentication.AzureKeyVaultAuthentication" >
        <constructor-arg index="0"  ref="store2.authConfig" />
    </bean>

    <bean id="store2.abstractAzureServiceAdapter" class="org.alfresco.integrations.connector.AzureBlobServiceAdapter" abstract="true">
        <property name="azureAuthentication" ref="store2.${connector.az.store2.authentication.mode}"/>
        <property name="tryTimeout" value="${connector.az.tryTimeout}"/>
        <property name="maxErrorRetries" value="${connector.az.maxErrorRetries}" />
        <!-- sets a maximum file size for all content. See content-services-context.xml for defaultContentLimitProvider bean -->
        <property name="contentLimitProvider" ref="defaultContentLimitProvider" />
    </bean>

    <bean id="store2.azureServiceAdapter" class="org.alfresco.integrations.connector.AzureBlobServiceAdapter" parent="store2.abstractAzureServiceAdapter" init-method="init">
        <property name="containerName" value="${connector.az.store2.containerName}" />
    </bean>

    <bean id="store2.azureBlobContentStore" class="org.alfresco.integrations.connector.AzureBlobContentStore" depends-on="store2.azureServiceAdapter">
        <property name="serviceAdapter" ref="store2.azureServiceAdapter" />
        <property name="objNamePrefix" value="${connector.az.store2.objectNamePrefix}" />
        <property name="objNameSuffix" value="${connector.az.store2.objectNameSuffix}" />
        <property name="storeProtocol" value="${connector.az.store2.storeProtocol}" />
    </bean>
    ```

3. Add the new store to the Store Selector Content Store.

    For example:

    ```bash
    <entry key="azContentStore3">
    <ref bean="store3.azureBlobContentStore"/>
    </entry>
    ```

4. Locate the file `azure-mc-contentstore.properties` in folder:

    ```text
    $CATALINA_HOME/shared/classes/alfresco/extension/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers
    ```

5. Duplicate the **Store 2** section, and replace `.store2` with `.store3`:

    ```text
    connector.az.store2.authentication.mode=${connector.az.authentication.mode}
    connector.az.store2.account.name=${connector.az.account.name}
    connector.az.store2.account.key=${connector.az.account.key}
    connector.az.store2.container.sasToken=${connector.az.container.sasToken}
    connector.az.store2.application.clientId=${connector.az.application.clientId}
    connector.az.store2.application.clientSecret=${connector.az.application.clientSecret}
    connector.az.store2.application.tenantId=${connector.az.application.tenantId}
    connector.az.store2.keyVault.name=${connector.az.keyVault.name}
    connector.az.store2.keyVault.secret.name=${connector.az.keyVault.secret.name}
    connector.az.store2.containerName=
    connector.az.store2.objectNamePrefix=
    connector.az.store2.objectNameSuffix=
    connector.az.store2.storeProtocol=azb
    ```

#### Move content between content stores

If you've configured two content stores (as in the provided sample), you can use the `storeSelectorContentStore` to move content between them.

1. Add the `cm:storeSelector` aspect to the document.

    This aspect adds a new property to the document - `cm:storeName`.

2. Set the property value to match the second content store name (i.e. `azContentStore2`, as shown in the provided sample).

    Once the property is set, all the content store properties are added for the node. For example, the content is copied to the second container if you've configured a different name for the second content store.

    See the Content Services documentation, [Content store selector]({% link content-services/latest/admin/content-stores.md %}#content-store-selector) for more details on how the content store selector works.
