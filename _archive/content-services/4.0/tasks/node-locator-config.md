---
author: Alfresco Documentation
---

# Creating node locators

This section describes how to configure the `NodeLocatorService`.

The `NodeLocatorService` looks up node locators by name and out-of-the-box node locators are defined in a configuration file.

1.  Edit the node-locator-context.xml file.

    This Spring configuration file defines a base bean that can be used to define new node locator implementations. If you use this bean, the node locator is automatically registered with the repository and made available.

2.  To define the example node locator, the following Spring configuration can be used in a repository custom context file:

    This section uses an example node locator to describe the service. It allows a named folder to be found.

    ```
    <bean id="namedFolderNodeLocator" class="com.example.NamedFolderNodeLocator" parent="baseNodeLocator">
       <property name="NodeService" ref="NodeService" />
       <property name="FileFolderService" ref="FileFolderService" />
    </bean>
    ```


**Parent topic:**[NodeLocator service](../concepts/node-locator-intro.md)

