---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Adminstration
option: content store selector add
---

# Using the new content store

The new content store is set using the `cm:storeName` property.

The `cm:storeName` property can be set in number of ways:

-   Manually, by exposing this property so its value can be set by either Explorer or Share
-   Running a script action that sets the `cm:storeName` property value within the script
-   Using a rule that runs a script action to set the property

The expected behavior is as follows:

-   When the `cm:storeSelector` aspect is not present or is removed, the content is copied to a new location in the 'default' store
-   When the `cm:storeSelector` aspect is added or changed, the content is copied to the named store
-   Under normal circumstances, a trail of content will be left in the stores, just as it would be if the content were being modified. The normal processes to clean up the orphaned content will be followed.

**Parent topic:**[Managing the content store](../concepts/store-manage-content.md)

