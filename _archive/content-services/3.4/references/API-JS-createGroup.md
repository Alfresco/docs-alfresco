---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: createGroup
---

# `createGroup`

These methods create groups.

**Parent topic:**[People API](../references/API-JS-People.md)

## `createGroup(groupName)`

`createGroup(groupName)`

This method creates a new top-level where groupName is the unique group name to create.

### Parameters

-   **group**

    The unique group name to create


## `createGroup(parentGroup,groupName)`

`createGroup(parentGroup, groupName)`

This method creates a new group as a child of the specified parent group node. This can be null for a top-level group.

### Parameters

-   **parentGroup**

    The parent group


-   **groupName**

    The group name


