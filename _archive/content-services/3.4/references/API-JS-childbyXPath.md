---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, API/Script, JavaScript]
keyword: [Javascript API, childrenByXPath]
---

# `childrenByXPath`

childrenByXPath\(xpath\)

This method performs an XPath-based query relative to the current node.

## Parameters

-   **xpath**

## Returns

Returns an array of the nodes found. If no results are matched, returns an empty array.

## Example

`var nodes =userhome.childrenByXPath("("*[@cm:name='Finance Documents']/*");`

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

