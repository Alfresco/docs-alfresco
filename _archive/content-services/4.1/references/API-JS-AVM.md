---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# AVM API

The Alfresco Versioning Machine \(AVM\) API provides access to Web Content Management \(WCM\) stores and their associated file and folder nodes. A WCM project is divided into "stores" such as the staging store and various user sandbox stores and the child nodes of these stores.

## Properties

-   **`stores`**

    Returns an Array of all store objects in the AVM

-   **`webappsFolderPath`**

    The well known root path to the AVM webapp folder for a store


-   **[lookupStore](../references/API-JS-avm-lookupStore.md)**  
`lookupStore(store)` returns the store object for the specified store id.
-   **[lookupStoreRoot](../references/API-JS-avm-lookupStoreRoot.md)**  
`avm.lookupStoreRoot(storeid)`
-   **[lookupNode](../references/API-JS-avm-lookupNode.md)**  
`lookupNode(path)` returns a single AVM node for the given path.
-   **[getModifiedItems](../references/API-JS-avm-getModifiedItems.md)**  
`getModifiedItems(storeId, username, webapp)` returns the list of modified items for the specified user sandbox against the staging store, for a specific web application.
-   **[stagingStore](../references/API-JS-avm-stagingStore.md)**  
`stagingStore(storeId)` returns the staging store name for the given store ID.
-   **[userSandboxStore](../references/API-JS-avm-userSandboxStore.md)**  
`userSandboxStore(storeId, username)` returns the sandbox store name for the given store ID and username.
-   **[websiteStagingUrl](../references/API-JS-avm-websiteStagingUrl.md)**  
`websiteStagingUrl(storeId)` returns the preview URL to the staging store for the specified store ID.
-   **[websiteUserSandboxUrl](../references/API-JS-avm-websiteUserSandboxUrl.md)**  
`websiteUserSandboxUrl(storeId, username)` returns the preview URL to the user sandbox for the specified store ID and username.
-   **[assetUrl](../references/API-JS-avm-assetUrl.md)**  
`assetUrl()` these methods return the preview URL to the specified asset.
-   **[AVM Store API](../references/API-JS-AVM-store.md)**  
Store objects returned by the AVM API have this additional API.
-   **[AVM Node API](../references/API-JS-AVM-node.md)**  
AVM specific node objects have an additional API.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

