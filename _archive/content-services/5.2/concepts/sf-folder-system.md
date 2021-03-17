---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# System Smart Folders

System Smart Folders are best used when you want to see content \(that is distributed across the repository\) in context; for example, all my files, or all files that are tagged as confidential.

These are the key elements of System Smart Folders:

-   Best used to apply multiple taxonomies to find content in context
-   Loaded using the System Smart Folder \(smf:systemConfigSmartFolder\) aspect
-   Default template selected using the Smart Folder Template called `smartFoldersExample.json`
-   New templates can be added in Repository/Data Dictionary/Smart Folder Templates.

    **Note:** When you add a template to Repository/Data Dictionary/Smart Folder Templates, select Change Type and choose the Smart Folder Template type, to ensure that the new template is displayed in the list in Repository/Data Dictionary/Smart Folder Templates.


Advanced Smart Folders settings are provided in the <tomcat\>/shared/classes/alfresco-global.properties.sample file.

See [Applying a Smart Folder Template](../tasks/sf-using-aspects.md) for more information.

**Parent topic:**[Type-based, System, and Custom Smart Folders](../concepts/sf-folder.md)

