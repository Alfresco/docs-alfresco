---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: TagScope Object API
---

# TagScope object

Tag Scope Object

The tagging-related `ScriptNode` methods such as `getTagScope` can return `TagScope` objects. A TagScope object describes the tags scoped to a node.

## Properties

The `TagScope` object type provides the following property:

-   **`tags`**

    A read-only array containing the tag details in count order


-   **[getTopTags](../references/API-JS-TaggingService-getTopTags.md)**  
`getTopTags(topN)` this method gets the top N tags ordered by count.
-   **[getCount](../references/API-JS-TaggingService-getCount.md)**  
`getCount(tag)` this method gets the count of a tag, that is how many times the tag is used within the tag scope. This is zero if the tag is not present.
-   **[refresh](../references/API-JS-TaggingService-refresh.md)**  
`refresh()` this method refreshes the tag scope, causing the tags and counts within the tag scope to be updated.

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

