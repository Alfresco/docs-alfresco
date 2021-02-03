---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Adding new Azure store to AzMultipleStorageContainers subsystem

These steps describe how to add a new Azure store starting from the AzMultipleStorageContainers subsystem sample, and how to move content between content stores.



1.  Locate the file `azure-mc-contentstore-context.xml` in folder:

    ```
    $CATALINA_HOME/shared/classes/alfresco/extension/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers
    ```

2.  Duplicate the **Store 2** section, and replace `store2.` with `store3.`

    ```
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

3.  Add the new store to the Store Selector Content Store.

    For example:

    ```
    <entry key="azContentStore3">
        <ref bean="store3.azureBlobContentStore"/>
    </entry>
    ```

4.  Locate the file `azure-mc-contentstore.properties` in folder:

    ```
    $CATALINA_HOME/shared/classes/alfresco/extension/subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers
    ```

5.  Duplicate the **Store 2** section, and replace `.store2` with `.store3`:

    ```
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

    **Move content between content stores**

    If you've configured two content stores \(as in the provided sample\), you can use the `storeSelectorContentStore` to move content between them.

6.  Add the `cm:storeSelector` aspect to the document.

    This aspect adds a new property to the document - `cm:storeName`.

7.  Set the property value to match the second content store name \(i.e. `azContentStore2`, as shown in the provided sample\).

    Once the property is set, all the content store properties are added for the node. For example, the content is copied to the second container if you've configured a different name for the second content store.

    See the Alfresco Content Services documentation, [Content store selector](https://docs.alfresco.com/6.2/concepts/store-manage-content.html), for more details on how the content store selector works.


**Parent topic:**[Configuring multiple storage containers using Azure Connector](../concepts/azure-multiple-storage.md)

