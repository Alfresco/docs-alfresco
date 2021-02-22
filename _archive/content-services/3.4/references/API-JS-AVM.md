---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# AVM API

The Alfresco Versioning Machine \(AVM\) API provides access to Web Content Management \(WCM\) stores and their associated file and folder nodes. A WCM project is divided into "stores" such as the staging store and various user sandbox stores and the child nodes of these stores.

-   **[avm.lookupStore](../references/API-JS-avm-lookupStore.md)**  
`avm.lookupStore(storeid)`
-   **[avm.lookupStoreRoot](../references/API-JS-avm-lookupStoreRoot.md)**  
`avm.lookupStoreRoot(storeid)`
-   **[avm.lookupNode](../references/API-JS-avm-lookupNode.md)**  
`avm.lookupNode(path)`
-   **[AVM Store API](../references/API-JS-AVM-store.md)**  
Store objects returned by the AVM API have this additional API.
-   **[AVM Node API](../references/API-JS-AVM-node.md)**  
AVM specific node objects have an additional API.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

## Properties

The API provides the following properties:

-   **`avm.stores`**

    Returns an Array of all store objects in the AVM

-   **`avm.webappsFolderPath`**

    The well known root path to the AVM webapp folder for a store


