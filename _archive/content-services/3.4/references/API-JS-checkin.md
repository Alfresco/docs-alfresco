---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: checkin
---

# `checkin`

The check in methods perform check in operations on working copy nodes.

**Parent topic:**[Check In/Check Out API](../references/API-JS-CheckInOut.md)

## `checkin()`

`checkin()`

This method performs a check in operation on a working copy node. It copies the current state of the working copy to the original node \(including any content updated in the working node\). This method can only be called on a working copy node.

### Returns

Returns the original node that was previously checked out.

## `checkin(description)`

`checkin(description)`

This method performs a check in operation on a working copy node applying the specified version history note text.

### Parameters

-   **description**

### Returns

Returns the original node that was previously checked out.

## `checkin(description, majorVersion)`

`checkin(description, majorVersion)`

This method performs a check in operation on a working copy node.

It applies the specified version history note text and as a major or minor version increment as required.

### Parameters

-   **description**

-   **majorVersion**

### Returns

Returns the original node that was previously checked out.

