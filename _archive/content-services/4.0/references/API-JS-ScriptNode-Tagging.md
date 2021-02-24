---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, Tagging API]
---

# Tagging API

A tag is a non-hierarchical keyword or term assigned to a piece of information.

## Properties

-   **`tags`**

    An array of tag names

-   **`isTagScope`**

    A boolean. If true, the node is a tag scope node and false otherwise.


-   **[clearTags](../references/API-JS-ScriptNode-Tagging-clearTags.md)**  
`clearTags()` this method deletes all the tags from the node.
-   **[addTag](../references/API-JS-ScriptNode-Tagging-addTag.md)**  
`addTag(tag)` this method adds a single tag to a node.
-   **[addTags](../references/API-JS-ScriptNode-Tagging-addTags.md)**  
`addTags(tags)` this method adds several tags to a node.
-   **[removeTag](../references/API-JS-ScriptNode-Tagging-removeTag.md)**  
`removeTag(tag)` this method removes the specified tag from a node.
-   **[removeTags](../references/API-JS-ScriptNode-Tagging-removeTags.md)**  
`removeTags(tags)` removes the specified tags from a node.
-   **[getTagScope](../references/API-JS-ScriptNode-Tagging-getTagScope.md)**  
`getTagScope()` method gets the nearest tag scope to this node by traversing up the parent hierarchy until one is found. If none is found, null is returned.
-   **[childrenByTags](../references/API-JS-ScriptNode-Tagging-childrenByTags.md)**  
`childrenByTags(tag)` gets all children of the node that have the tag specified. The methods fetch the children of the node in a deep \(recursive\) fashion.

**Parent topic:**[ScriptNode Object API](../references/API-JS-ScriptNode.md)

