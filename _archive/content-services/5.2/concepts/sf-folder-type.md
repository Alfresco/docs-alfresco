---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Type-based Smart Folders

Type-based Smart Folders replicate a Smart Folder structure and apply it to many folders of a specific type, or carrying a specific aspect.

These are the key elements of Type-based Smart Folders:

-   Best used to replicate a Smart Folder structure on multiple objects
-   Allows you to configure new sections that are automatically embedded into folder and file properties
-   Allows you to associate a Smart Folder Template with a specific type or an object that has a specific aspect
-   New templates can be added in Repository/Data Dictionary/Smart Folder Templates
-   Names must match. For example, in our tutorial the Smart Folder Template clex\_claimFolder.json matches the Claim Folder \(clex:claimFolder\) type
-   Additional alfresco-global.properties settings required to enable this method. You could use any of these examples:

    ```
    smart.folders.config.type.templates.qname.filter=* 
    smart.folders.config.type.templates.qname.filter=clex:claimFolder,dam:*
    smart.folders.config.type.templates.qname.filter=none
    ```


The `smart.folders.config.type.templates.qname.filter` property can be set to one of the following:

-   `none` for no types or aspects
-   `*` for all types and aspects
-   `<prefix>:*` for all types and aspects that are defined within a specified namespace
-   `<prefix>:<name>` for a type or aspect with the specified name

Advanced Smart Folders settings are provided in the <tomcat\>/shared/classes/alfresco-global.properties.sample file.

The setup of Type-based Smart Folders is somewhat complex, but is explained in detail in the tutorial. See [Configuring claims management](../tasks/sf-tutorial-configure.md) and [Creating a new claim](../tasks/sf-tutorial-create.md) for more information.

**Parent topic:**[Type-based, System, and Custom Smart Folders](../concepts/sf-folder.md)

