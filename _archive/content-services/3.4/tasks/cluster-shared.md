---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: clustering shared content stores
---

# Clustering through shared content stores

This section describes how to configure clustering through shared content stores.

1.  Ensure the following stores exist on a shared file system:

    1.  Content Store

    2.  Audit Content Store

    3.  Deleted Content Store

2.  Open the <ClasspathRoot\>/alfresco-global.properties file.

3.  Add the following properties:

    ```
    dir.contentstore=<new_location>/contentstore 
    dir.contentstore.deleted=<new_location>/contentstore.deleted 
    dir.auditcontentstore=<new_location>/audit.contentstore 
    ```

4.  Save the file.


**Parent topic:**[Initiating clustering](../tasks/jgroups-repo.md)

