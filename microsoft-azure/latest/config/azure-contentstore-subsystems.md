---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Azure Connector content store subsystems

Starting from version 1.2, the Azure Connector provides out-of-the-box content store subsystems. Older versions of the Azure Connector hard-wired the Microsoft Azure content store directly into Alfresco Content Services.

The subsystem approach allows a more flexible use of the Azure content store, even in conjunction with existing content stores. A subsystem can be started, stopped, and configured independently, and it has its own isolated Spring application context and configuration. The Azure subsystems belong to the `ContentStore` category, and have types `Azure` or `AzureOnPrem`.

See the Alfresco Content Services documentation on [Subsystems](https://docs.alfresco.com/6.2/references/dev-extension-points-custom-subsystem.html) for more.

**`AzureOnPrem` content store subsystem**

This defines an aggregating content store with Azure as the primary content store and the file system as the secondary one.

This configuration is similar to what's used in previous Azure Connector versions \(i.e. 1.0, 1.1\) and is set as the default content store.

**`Azure` content store subsystem**

This defines a pure Azure content store, which uses Microsoft's Azure Storage as the only storage mechanism for Alfresco Content Services.

This content store is recommended for a clean Alfresco Content Services and Azure Connector installation, or an upgrade of an installation that's never used the file system.

**Using an Azure content store subsystem**

The default subsystem that's enabled on installation is **AzureOnPrem**. This ensures that the new AMP version is compatible with a previous installation.

You can change the subsystem used by overwriting the global variable `filecontentstore.subsystem.name`, for example:

```
filecontentstore.subsystem.name=Azure
```

**Important:** We don't recommend switching to a pure `Azure` content store from `AzureOnPrem`, if binaries have already been saved on the file system.

**Customizing the subsystem properties**

You can manage subsystems by using a JMX client under `MBeans > Alfresco > Configuration > ContentStore > managed`. Here, you can change all the properties defined for the subsystem, and restart the subsystem. Another way to extend a subsystem is to add a `*-context.xml` and a properties file, in the extension path for that subsystem:

```
alfresco/extension/subsystems/ContentStore/Azure/Azure/*-context.xml
alfresco/extension/subsystems/ContentStore/Azure/Azure/*.properties
```

**Important:** In Alfresco Content Services 6.2 and Azure Connector 1.2, changing the current content store subsystem using the JMX client isn't supported. There's a limitation in Alfresco Content Services which only allows switching between the embedded content stores.

**Deleted content store support provided by the repository vs. managed by Azure capabilities**

The deleted content store support in Alfresco Content Services moves the deleted content in a dedicated storage container, defined by the `connector.az.deleted.containerName` property. System administrators can schedule a job to delete the binaries from this location.

Previous versions of the Azure Connector support the deleted content store provided by the repository.

Starting with 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services. However, you can enable the Alfresco Content Services deleted content store, if required.

See [Azure Connector deleted content store](azure-contentstore-delete.md) for more details.



**Parent topic:**[Installing and configuring the Azure Connector](../concepts/azure-install-intro.md)

