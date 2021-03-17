---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Wiki
audience: 
category: Administration
option: content store selector
---

# Content store selector

The content store selector provides a mechanism to control the store used for the content file associated with a particular content item.

By applying the `cm:storeSelector` aspect and setting its `cm:storeName` property to the name of a selectable store, the content will be automatically moved from its current location to the new store. The store does not, therefore, store content itself, it defines and manages those stores that are available for selection.

This allows storage polices to be implemented to control which underlying physical storage is used, based on your applications needs or business policies.

-   **[Content store selector configuration example](../tasks/store-filestore-define.md)**  
The following example defines two file stores, in addition to the standard default file store. By setting the `cm:storeName` property to either of these new stores or the default store, the content is automatically moved from its existing store to the relevant new store.
-   **[Using the new content store](../concepts/store-using.md)**  
The new content store is set using the `cm:storeName` property.
-   **[Content Store Selector full configuration example](../concepts/store-config-fullexample.md)**  
The following example shows the full definition of creating new stores using the Content Store Selector.

**Parent topic:**[Using content stores](../concepts/manage-cs-home.md)

