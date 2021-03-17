---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: ScriptNode createFolder
---

# `getContainer`

`getContainer(componentId)`

This method gets \(or creates\) the container folder \(node\) folder for the specified component identifier with the container type `cm:folder`.

The type of container is either the one specified by the caller \(which must be `cm:folder` or a subtype of\), or `cm:folde``r`, if a type is not specified at all.

## Parameters

-   **componentId**

    The component identifier


## Returns

Returns the container folder.

**Parent topic:**[Site object](../references/API-JS-Site.md)

## `getContainer`

`getContainer\(componentId,folderType\)`

This method gets \(or creates\) the container folder \(node\) folder for the specified component identifier with the container type `cm:folder`.

### Parameters

-   **componentId**

    The component identifier

-   **folderType**

    The type of folder to create. If this is null, it creates a standard folder.


### Returns

Returns the container folder. This is null if the container cannot be created.

