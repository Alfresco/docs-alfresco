---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
keyword: [global, properties, composite]
---

# Setting composite properties in the global properties file

This section uses the `imap.server.mountPoints` property as an example.

The `ImapConfigMountPointsBean` class that holds the component beans has four properties of its own:

-   `beanName`
-   `store`
-   `rootPath`
-   `mode`

1.  Open the <classpathRoot\>/alfresco-global.properties file.

2.  To set some overall defaults for all component instances, use the format:

    ```
    <property>.default.<component property>
    ```

    These values would show up, for example, when you added a new component instance but did not specify its properties.

    For example:

    ```
    imap.server.mountPoints.default.store=${spaces.store}
    imap.server.mountPoints.default.rootPath=/${spaces.company_home.childname}
    imap.server.mountPoints.default.mode=virtual
    ```

    This example does not define a default for `beanName` because there is a way of populating it for each instance.

3.  To set up the `imap.server.mountPoints` with a composite value, set the master composite property using a comma-separated list.

    For example:

    ```
    imap.server.mountPoints=Repository_virtual,Repository_archive
    ```

    This defines that the property contains two `ImapConfigMountPointsBean` instances, named `Repository_virtual` and `Repository_archive`. Because `ImapConfigMountPointsBean` implements the `BeanNameAware` Spring interface and has a `beanName` property, these instance names are automatically set as the bean names.

4.  To define component properties specific to each component instance, use the format:

    ```
    <property>.value.<component instance name>.<component property>
    ```

    For example:

    ```
    imap.server.mountPoints.value.Repository_virtual.mode=virtual
    imap.server.mountPoints.value.Repository_archive.mode=archive
    
    ```


**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

