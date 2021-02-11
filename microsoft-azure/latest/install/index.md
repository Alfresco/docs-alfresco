---
title: Install the Azure Connector
---

Use this information to install the Azure Connector as an alternative content store.

Using an Alfresco Module Package (AMP), the connector allows an additional content store option for the file system underlying Alfresco Content Services.

Starting from version 1.2, the Azure Connector module provides out of the box content store subsystems, which can easily be set up based on the most suitable configuration. The subsystem approach allows a more flexible use of the Azure content store, even in conjunction with existing content stores.

The steps for both options are very similar, but the second allows you to add `AzMultipleStorageContainers` as a third alternative for the Azure content store subsystem.

## Prerequisites for using Azure Connector

There are a number of software requirements for installing Azure Connector.

### Alfresco requirements

* Alfresco Content Services 6.2 or later.

### Azure related requirements

In order to use the Azure Connector, you need an Azure storage account so that you can configure the Azure Connector successfully.

## Install the Azure Connector

There are several options for installing the Azure Connector:

* Installing the Azure Connector
* Installing the Azure Connector with AzMultipleStorageContainers subsystem

These steps describe how to install the Alfresco Content Connector for Azure to an instance of Alfresco Content Services.

The Azure Connector is packaged as an Alfresco Module Package (AMP) file.

> **Note:** Ensure that you don't start Alfresco Content Services before installing the Azure Connector AMP.

1. Go to the [Alfresco Support Portal](http://support.alfresco.com){:target="_blank"}.

2. Download the `alfresco-azure-connector-1.1.x.amp` file.

3. Use the Module Management Tool (MMT) to install the AMP into the repository WAR (alfresco.war).

    For more information, see [Using the Module Management Tool (MMT)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html){:target="_blank"}(#LINK) and [Installing an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/amp-install.html){:target="_blank"}(#LINK).

    > **Note:** You must install the Azure Connector AMP using `-force`.

4. Check that the [configuration](../config/index.md) is set up correctly for your environment.

> **Note:** Starting from version 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services. For details on how to re-enable it, see <xref href="../concepts/azure-contentstore-delete.dita".

5. Start Alfresco Content Services.

## Install the Azure Connector with AzMultipleStorageContainers subsystem

These steps describe how to install the Azure Connector to an instance of Alfresco Content Services, and how to enable the `AzMultipleStorageContainers` subsystem sample.

The Azure Connector is packaged as an Alfresco Module Package (AMP) file.

> **Note:** Ensure that you don't start Alfresco Content Services before installing the Azure Connector AMP.

1. Go to the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}.

2. Download the `alfresco-azure-connector-1.2.x.amp` file.

3. Use the Module Management Tool (MMT) to install the AMP into the repository WAR (alfresco.war).

    For more information, see [Using the Module Management Tool (MMT)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html) and [Installing an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/amp-install.html).

    **Note:** You must install the Azure AMP using `-force`.

4. Unzip the `alfresco-azure-connector-1.2.x.amp` file.

5. Copy the three sample files and rename them by removing the `.sample` extension.

    The sample files are located under `alfresco-azure-connector-1.2.x.amp/config/alfresco/extension/`

    They need to be copied to the relevant paths under the following folder: `$CATALINA_HOME/shared/classes/alfresco/extension/...`

    1. Copy and rename `azure-multiple-storage-containers-context.xml.sample` to `azure-multiple-storage-containers-context.xml`

    2. Copy and rename:
    
    ```bash
    subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore-context.xml.sample
    ```
    
    to:
    
    ```bash
    subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore-context.xml
    ```

    3. Copy and rename
    
    ```bash
    subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore.properties.sample
    ```
    
    to:
    
    ```bash
    subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore.properties
    ```

6. Check that the configuration is set up correctly for your environment.

    1. Check the Azure Connector properties for store 1 (for example, `connector.az.*`)

        See `azure-mc-contentstore.properties` for the complete list.

        The minimum properties required are:

        ```bash
        -Dconnector.az.account.name=${AZURE_STORAGE_ACCOUNT_NAME}
        -Dconnector.az.authentication.mode=sharedKey
        -Dconnector.az.account.key=${AZURE_STORAGE_ACCOUNT_KEY}
        -Dconnector.az.containerName=${AZURE_CONTAINER_NAME}
        -Dconnector.az.deleted.containerName=${AZURE_DELETED_CONTAINER_NAME}
        ```

        See [Configure the Azure Connector](azure-config.md) for the supported authentication modes.

    2. Check the Azure Connector properties for store 2 (for example, `connector.az.store2.*`)

       See `azure-mc-contentstore.properties` for the complete list.
        The minimum properties required are:

        ```bash
        -Dconnector.az.store2.containerName=${AZURE_STORE2_CONTAINER_NAME}
        ```

    3. Set Azure multiple storage containers as the default file content store subsystem:

        ```bash
        -Dfilecontentstore.subsystem.name=AzMultipleStorageContainers
        ```

7. Check that the [Configuration]({% link microsoft-azure/latest/config/index.md %} is set up correctly for your environment.

8. Start Alfresco Content Services.

## Azure Connector deleted content store

The deleted content store support in Alfresco Content Services moves the deleted content in a dedicated storage container (defined by the `connector.az.deleted.containerName` property). System administrators can schedule a job to delete the binaries from this location.

**Deleted content store support provided by the repository vs. managed by Azure capabilities**

Starting with version 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services.

However, you can enable the Alfresco Content Services deleted content store, if required. Just add a context file, such as `enable-deleted-content-store-context.xml`, in the `extension` directory.

```text
$CATALINA_HOME/shared/classes/alfresco/extension
```

You can find a sample file in `alfresco-azure-connector-1.2.x.amp`.

`enable-deleted-content-store-context.xml.sample` in `config/alfresco/extension`

This creates a proxy bean to the deleted content store defined in the subsystem. By doing this, the repository knows about it when the subsystem is started.

```bash
    <bean id="deletedContentStore" class="org.alfresco.repo.management.subsystems.SubsystemProxyFactory">
        <property name="sourceApplicationContextFactory">
            <ref bean="${filecontentstore.subsystem.name}" />
        </property>
        <property name="sourceBeanName">
            <value>deletedContentStore</value>
        </property>
        <property name="interfaces">
            <list>
                <value>org.alfresco.repo.content.ContentStore</value>
            </list>
        </property>
    </bean>
```

The `sourceApplicationContextFactory` property has to point to the name of the bean which defines the subsystem.

## Upgrade

Use this information to upgrade the Azure Connector from a previous version for Tomcat-based deployments only.

1. Stop the Alfresco Content Services server.

2. Navigate to the root directory of your installation.

3. Use the following command to check for the module you wish to delete:

    ```bash
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    ```

    This displays a list of the installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `org_alfresco_integrations_AzureConnector`.

4. Use the Module Management Tool (MMT) to uninstall the AMP from the repository WAR (`alfresco.war`). For example:

    ```bash
    java -jar bin/alfresco-mmt.jar uninstall  org_alfresco_integrations_AzureConnector tomcat/webapps/alfresco.war
    ```

    For more information, see [Using the Module Management Tool (MMT)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html){:target="_blank"}(#LINK) and [Uninstalling an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/uninstall-amp.html){:target="_blank"}(#LINK).

5. Navigate to the `amps` directory.

6. Delete any previously installed Azure Connector AMP.

7. Copy the AMP file you downloaded during installation to the `amps` directory.

8. Use the Module Management Tool (MMT) to install the AMP into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html){:target="_blank"}(#LINK) and [Uninstalling an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/uninstall-amp.html){:target="_blank"}(#LINK).

    > **Note:** You must install the Azure Connector AMP using `-force`.

9. Check that the [configuration](../config/index.md) is set up correctly for your environment.

 > **Note:** When upgrading from Azure Connector version 1.0, make sure you define the Azure authentication mode and a supported value in your `alfresco-global.properties` file.

> **Note:** To upgrade a system that's never used the file system (i.e. on-premises installation without locally saved binaries), we recommend that you choose a pure Azure content store. See <xref
href="../concepts/azure-contentstore-subsystems.dita" format="dita"/> for more details.

10. Start the server.

> **Note:** Starting from version 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services. For details on how to re-enable it see [Azure Connector deleted content store](azure-contentstore-delete.md).