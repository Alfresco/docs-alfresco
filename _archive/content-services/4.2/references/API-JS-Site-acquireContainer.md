---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: acquireContainer
---

# `acquireContainer`

`acquireContainer(...)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

**Parent topic:**[Site object](../references/API-JS-Site.md)

## `acquireContainer`

`acquireContainer(String componentId)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

### Parameters

-   **component ID**

    A string specifying the component ID.


### Returns

A `ScriptNode` object representing the newly created container.

## `acquireContainer`

`acquireContainer(String componentId, String folderType)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

### Parameters

-   **componentId**

    A string specifying the component ID.

-   **folderType**

    The folder type to create.


### Returns

A `ScriptNode` object representing the newly created container.

## `acquireContainer`

`acquireContainer(String componentId, String folderType, Object properties)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

### Parameters

-   **componentId**

    A string specifying the component ID.

-   **folderType**

    The folder type to create.

-   **properties**

    The properties to set on the container.


### Returns

A `ScriptNode` object representing the newly created container.

