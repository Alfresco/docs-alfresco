---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: cancelCheckout
---

# `cancelCheckout`

`cancelCheckout()`

This method cancels the check-out of a working copy document.

The working copy is deleted and any changes made to it are lost.

**Note:** This method can only be called on a working copy node. Any reference to this working copy node should be discarded.

## Returns

Returns the original node that was previously checked out.

**Parent topic:**[Check In/Check Out API](../references/API-JS-CheckInOut.md)

