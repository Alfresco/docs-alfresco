---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing the Azure Connector with AzMultipleStorageContainers subsystem

These steps describe how to install the Azure Connector to an instance of Alfresco Content Services, and how to enable the `AzMultipleStorageContainers` subsystem sample.

The Azure Connector is packaged as an Alfresco Module Package \(AMP\) file.

**Note:** Ensure that you don't start Alfresco Content Services before installing the Azure Connector AMP.

1.  Go to the [Alfresco Support Portal](https://support.alfresco.com).

2.  Download the alfresco-azure-connector-1.2.x.amp file.

3.  Use the Module Management Tool \(MMT\) to install the AMP into the repository WAR \(alfresco.war\).

    For more information, see [Using the Module Management Tool \(MMT\)](https://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html) and [Installing an Alfresco Module Package](https://docs.alfresco.com/6.2/tasks/amp-install.html).

    **Note:** You must install the Azure AMP using `-force`.

4.  Unzip the alfresco-azure-connector-1.2.x.amp file.

5.  Copy the three sample files and rename them by removing the `.sample` extension.

    The sample files are located under:

    ```
    alfresco-azure-connector-1.2.x.amp/config/alfresco/extension/...
    ```

    They need to be copied to the relevant paths under the following folder:

    ```
    $CATALINA_HOME/shared/classes/alfresco/extension/...
    ```

    1.  Copy and rename `azure-multiple-storage-containers-context.xml.sample` to:

        ```
        azure-multiple-storage-containers-context.xml
        ```

    2.  Copy and rename `subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore-context.xml.sample` to:

        ```
        subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore-context.xml
        ```

    3.  Copy and rename `subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore.properties.sample` to:

        ```
        subsystems/ContentStore/AzMultipleStorageContainers/AzMultipleStorageContainers/azure-mc-contentstore.properties
        ```

6.  Check that the configuration is set up correctly for your environment.

    1.  Check the Azure Connector properties for store 1 \(for example, `connector.az.*`\)

        See `azure-mc-contentstore.properties` for the complete list.

        The minimum properties required are:

        ```
        -Dconnector.az.account.name=${AZURE_STORAGE_ACCOUNT_NAME}
        -Dconnector.az.authentication.mode=sharedKey
        -Dconnector.az.account.key=${AZURE_STORAGE_ACCOUNT_KEY}
        -Dconnector.az.containerName=${AZURE_CONTAINER_NAME}
        -Dconnector.az.deleted.containerName=${AZURE_DELETED_CONTAINER_NAME}
        ```

        See [Configuring the Azure Connector](azure-config.md) for the supported authentication modes.

    2.  Check the Azure Connector properties for store 2 \(for example, `connector.az.store2.*`\)

        See `azure-mc-contentstore.properties` for the complete list..

        The minimum properties required are:

        ```
        -Dconnector.az.store2.containerName=${AZURE_STORE2_CONTAINER_NAME}
        ```

    3.  Set Azure multiple storage containers as the default file content store subsystem:

        ```
        -Dfilecontentstore.subsystem.name=AzMultipleStorageContainers
        ```

7.  Check that any other [configuration](azure-config.md) is set up correctly for your environment.

8.  Start Alfresco Content Services.


**Parent topic:**[Configuring multiple storage containers using Azure Connector](../concepts/azure-multiple-storage.md)

