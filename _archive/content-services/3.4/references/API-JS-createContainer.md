---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: ScriptNode createFolder
---

# `createContainer`

The createContainer methods create new site containers.

**Parent topic:**[Site object](../references/API-JS-Site.md)

## `createContainer`

`createContainer(componentId)```

This method creates a new site container of type cm:folder.

### Parameters

-   **componentId**

    The component identifier


## `createContainer`

`createContainer(componentId,folderType)`````

This method a new site container of the given type \(type of container of subtype of cm:folder\).

### Parameters

-   **componentId**

    The component identifier

-   **folderType**

    The type of folder to create. If this is null, it creates a standard folder.


## `createContainer`

`createContainer(componentId,folderType, permissions)`````

This method creates a new site container of the given type and applies the provided permissions \(a map of authorities and permissions\) to the created container.

### Parameters

-   **componentId**

    The component identifier

-   **folderType**

    The type of folder to create. If this is null, it creates a standard folder.

-   **permissions**

    The permissions for the site


