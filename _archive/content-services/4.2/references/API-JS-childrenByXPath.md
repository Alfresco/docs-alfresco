---
author: Alfresco Documentation
---

# `childrenByXPath`

`childrenByXPath(xpath)` - performs an XPath-based query relative to the current node.

## Parameters

-   **xpath**

    XPath query to select nodes.


## Returns

Returns an array of the nodes found. If no results are matched, returns an empty array.

## Example

`var nodes = userhome.childrenByXPath("*[@cm:name='Finance Documents']/*");`

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

