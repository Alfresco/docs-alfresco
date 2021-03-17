---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [JavaScript API, API/Script]
keyword: [JavaScript API, getActiveWorkflows]
---

# `getActiveWorkflows`

`getActiveWorkflows()`

This method returns an array of all active workflows in which this node is involved. Null is returned if the node is not part of an active workflow.

## Returns

Returns an array of the nodes found. If no results are matched, returns an empty array.

## Example

The following code snippet obtains a list of workflow objects for the file TEST\_FILE\_0.TXT:

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
var workflows = node.getActiveWorkflows();

```

**Parent topic:**[ScriptNode Object API](../references/API-JS-ScriptNode.md)

