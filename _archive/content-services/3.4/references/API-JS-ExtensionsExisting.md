---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Extensions

There are various properties and methods that are extensions to the existing ScriptNode to provide an API to retrieve and manipulate tags on a node.

-   **[clearTags](../references/API-JS-clearTags.md)**  
`clearTags()`
-   **[addTag](../references/API-JS-addTag.md)**  
`addTag(tag)`
-   **[addTags](../references/API-JS-addTags.md)**  
`addTags(tags)`
-   **[removeTag](../references/API-JS-removeTag.md)**  
`removeTag(tag)`
-   **[removeTags](../references/API-JS-removeTags.md)**  
`removeTags(tags)`
-   **[childrenByTag](../references/API-JS-childrenByTag.md)**  
`childrenByTag(tag)`
-   **[tagSearch](../references/API-JS-ExtensionsExistingSearch.md)**  
`tagSearch(store, tag)`

**Parent topic:**[TagDetails object](../references/API-JS-TagDetails.md)

## Properties

-   **`isTagScope`**

    A read/write Boolean property indicating whether the node is a tag scope


-   **`tagScope`**

    A read property that provides the nearest tag scope for the node. This is null if no tag scope is found.


-   **`tags`**

    A read/write string array property of tags applied to this node. Setting the value of this property resets all the tags on that node.


