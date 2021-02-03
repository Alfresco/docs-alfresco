---
author: [Alfresco Documentation, Alfresco Documentation]
---

# **Configuring** multiple storage containers using Azure Connector

Starting from version 1.2, the Azure Connector contains an Azure content store sample. If enabled, this adds `AzMultipleStorageContainers` as a third alternative for the Azure content store subsystems.

Review the prerequisites in [Azure Connector content store subsystems](azure-contentstore-subsystems.md) which introduces the Azure content store subsystems added in version 1.2. The out-of-the-box Azure subsystems have two possible types: Azure and AzureOnPrem.

**Overview**

The Azure multiple storage containers sample is a new store subsystem that is based on the `storeSelectorContentStore`. The Store selector has two stores \(instances of the Azure content store\):

-   `store1.azureBlobContentStore` as the default
-   `store2.azureBlobContentStore` as the second one

The sample files can be found in `alfresco-azure-connector-1.2.x.amp`.

-   `azure-multiple-storage-containers-context.xml.sample` in `config/alfresco/extension`
-   `azure-mc-contentstore-context.xml.sample` and `azure-mc-contentstore.properties.sample` are in `config/alfresco/extension/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers`

**azure-multiple-storage-containers-context.xml.sample**

This provides a new Spring child Application Context based on the `*.xml` files and `*.properties` files found in `alfresco/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers`.



**azure-mc-contentstore-context.xml.sample**

The subsystem configuration file is split in sections to make it easier to extend:

-   Deleted content store
-   Stores
-   Store selector
-   Caching content store



-   **Deleted content store**

    ```
    <bean id="azureDeletedServiceAdapter" class="org.alfresco.integrations.connector.AzureBlobServiceAdapter" parent="store1.abstractAzureServiceAdapter" init-method="init">
            <property name="containerName" value="${connector.az.deleted.containerName}" />
    </bean>
    
    <bean id="deletedContentStore" class="org.alfresco.integrations.connector.AzureBlobContentStore" depends-on="azureDeletedServiceAdapter">
        <property name="serviceAdapter" ref="azureDeletedServiceAdapter" />
        <property name="objNamePrefix" value="${connector.az.deleted.objectNamePrefix}" />
        <property name="objNameSuffix" value="${connector.az.deleted.objectNameSuffix}" />
    </bean>
    ```

    **Note:** All deleted files will go to the `connector.az.deleted.containerName` container of the first store if you enable the deleted content store.

-   **Stores**

    ```
    <!-- [Start] Store 1 -->
    
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



-   **Store selector**

    ```
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



-   **Caching content store**

    The caching content store is defined over the content store selector so that we have one cache for all stores and makes the sample easier to extend when adding more stores.

    ```
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




**azure-mc-contentstore.properties.sample**

This provides the subsystem properties where the `AzMultipleStorageContainers` subsystem declares default values for all the properties it requires.

See the Alfresco Content Services documentation on [Subsystem properties](https://docs.alfresco.com/6.2/concepts/subsystem-props.html) for more details.

**Deleted content store support provided by the repository vs. managed by Azure capabilities**

The deleted content store support in Alfresco Content Services moves the deleted content in a dedicated storage container, defined by the `connector.az.deleted.containerName` property. System administrators can schedule a job to delete the binaries from this location. Previous versions of the Azure Connector support the deleted content store provided by the repository.

Starting with version 1.2, Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services.

However, you can enable the Alfresco Content Services deleted content store, if required, by uncommenting this part from the `deletedContentStore` bean in the `azure-multiple-storage-containers-context.xml.sample` file.

See [Azure Connector deleted content store](azure-contentstore-delete.md) for more details.



-   **[Installing the Azure Connector with AzMultipleStorageContainers subsystem](../tasks/azure-mc-amp-install.md)**  
These steps describe how to install the Azure Connector to an instance of Alfresco Content Services, and how to enable the `AzMultipleStorageContainers` subsystem sample.
-   **[Adding new Azure store to AzMultipleStorageContainers subsystem](../tasks/azure-mc-add-store.md)**  
These steps describe how to add a new Azure store starting from the AzMultipleStorageContainers subsystem sample, and how to move content between content stores.

**Parent topic:**[Installing and configuring the Azure Connector](../concepts/azure-install-intro.md)

