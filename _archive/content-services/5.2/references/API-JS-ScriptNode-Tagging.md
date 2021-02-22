---
author: Alfresco Documentation
---

# Tagging API

A tag is a non-hierarchical keyword or term assigned to a piece of information.

## Properties

-   **`tags`**

    An array of tag name strings. If a string array of tags is applied to this property they will overwrite the tags currently applied to the node.

-   **`isTagScope`**

    A boolean. If true, the node is a tag scope node and false otherwise.


-   **[clearTags](../references/API-JS-ScriptNode-Tagging-clearTags.md)**  
`clearTags()` deletes all the tags from the node.
-   **[addTag](../references/API-JS-ScriptNode-Tagging-addTag.md)**  
`addTag(tag)` adds a single tag to a node.
-   **[addTags](../references/API-JS-ScriptNode-Tagging-addTags.md)**  
`addTags(tags)` adds several tags to a node.
-   **[removeTag](../references/API-JS-ScriptNode-Tagging-removeTag.md)**  
`removeTag(tag)` removes the specified tag from a node.
-   **[removeTags](../references/API-JS-ScriptNode-Tagging-removeTags.md)**  
`removeTags(tags)` removes the specified tags from a node.
-   **[getTagScope](../references/API-JS-ScriptNode-Tagging-getTagScope.md)**  
`getTagScope()` gets the nearest tag scope to this node by traversing up the parent hierarchy until one is found. If none is found, null is returned.
-   **[setIsTagScope](../references/API-JS-ScriptNode-Tagging-setIsTagScope.md)**  
`setIsTagScope(boolean value)`
-   **[childrenByTags](../references/API-JS-ScriptNode-Tagging-childrenByTags.md)**  
`childrenByTags(tag)` gets all children of the node that have the tag specified. The methods fetch the children of the node in a deep \(recursive\) fashion.

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

