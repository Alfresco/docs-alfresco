---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getMembers
---

# `getMembers`

These methods return an array of people nodes belonging to the specified group \(including all subgroups\).

**Parent topic:**[People API](../references/API-JS-People.md)

## `getMembers`

`getMembers(group)`

This method gets specified group members.

### Parameters

-   **group**

### Returns

Returns an array of people nodes belonging to the specified group \(including all subgroups\).

## `getMembers`

`getMembers(group, recurse)`

This method gets specified group members. Only people of subgroups are returned if `recurse` is specified as true.

### Parameters

-   **group**

-   **recurse**

### Returns

Returns an array of people nodes belonging to the specified group or people of subgroups if `recurse` was set to true.

