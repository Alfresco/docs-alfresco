---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: TagScope Object API
---

# TagScope object

The tagging-related `ScriptNode` methods such as `getTagScope` return `TagScope` objects.

A TagScope object describes the tags scoped to a node.

## Properties

The `TagScope` object type provides the following property:

-   **`tags`**

    A read-only array containing the tag details in count order.


-   **[getCount](../references/API-JS-TagScope-getCount.md)**  
`getCount(tag)` gets the count of a tag; that is, how many times the tag is used within the tag scope. This is zero if the tag is not present.
-   **[getTopTags](../references/API-JS-TagScope-getTopTags.md)**  
`getTopTags(topN)` gets the top tags ordered by count.
-   **[refresh](../references/API-JS-TagScope-refresh.md)**  
`refresh()` refreshes the tag scope, causing the tags and counts within the tag scope to be updated.

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

