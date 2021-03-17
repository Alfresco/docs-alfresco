---
author: Alfresco Documentation
---

# `childByNamePath`

`childByNamePath(path)` performs a path-based query based on the name property of the nodes.

## Parameters

-   **path**

    The path to the node.


## Returns

Returns a node found at the specified path relative to the current node. If this is not found, null is returned.

## Example

`var testingFolder =userhome.childByNamePath("QA/Performance/Testing");`

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

