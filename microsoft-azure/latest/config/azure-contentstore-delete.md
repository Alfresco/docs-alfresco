---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Azure Connector deleted content store

The deleted content store support in Alfresco Content Services moves the deleted content in a dedicated storage container \(defined by the `connector.az.deleted.containerName` property\). System administrators can schedule a job to delete the binaries from this location.

**Deleted content store support provided by the repository vs. managed by Azure capabilities**

Starting with version 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services.

However, you can enable the Alfresco Content Services deleted content store, if required. Just add a context file, such as `enable-deleted-content-store-context.xml`, in the `extension` directory:

```
$CATALINA_HOME/shared/classes/alfresco/extension
```

You can find a sample file in alfresco-azure-connector-1.2.x.amp:

-   `enable-deleted-content-store-context.xml.sample` in `config/alfresco/extension`

This creates a proxy bean to the deleted content store defined in the subsystem. By doing this, the repository knows about it when the subsystem is started.

```
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



**Parent topic:**[Installing and configuring the Azure Connector](../concepts/azure-install-intro.md)

