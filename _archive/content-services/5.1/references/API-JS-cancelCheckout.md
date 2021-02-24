---
author: Alfresco Documentation
---

# `cancelCheckout`

`cancelCheckout()` cancels the check-out of a working copy document.

The working copy is deleted and any changes made to it are lost.

**Note:** This method can only be called on a working copy node. Any reference to this working copy node should be discarded.

## Returns

Returns the original node that was previously checked out.

## Example

```

    var workingCopy;
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);
    
    if (node.isVersioned){
        
        workingCopy = node.checkout();
        workingCopy.content = "Add some content.";
        
        // changed mind

        node = workingCopy.cancelCheckout();

    }
       
```

**Parent topic:**[Check in/check out API](../references/API-JS-CheckInOut.md)

