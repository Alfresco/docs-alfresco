---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getContainer
---

# `getContainer`

`getContainer(componentId)` this method gets \(or creates\) the container folder \(node\) folder for the specified component identifier with the container type `cm:folder`.

The type of container is either the one specified by the caller \(which must be `cm:folder` or a subtype of\), or `cm:folder`, if a type is not specified at all.

## Parameters

-   **componentId**

    The component identifier


## Returns

Returns a `ScriptNode` object representing the container folder.

**Parent topic:**[Site object](../references/API-JS-Site.md)

