---
author: Alfresco Documentation
---

# `checkin`

The `checkin` methods perform check in operations on working copy nodes.

**Parent topic:**[Check in/check out API](../references/API-JS-CheckInOut.md)

## `checkin()`

`checkin()` this method performs a check in operation on a working copy node. It copies the current state of the working copy to the original node \(including any content updated in the working node\). This method can only be called on a working copy node.

### Returns

Returns the original node that was previously checked out.

## `checkin(description)`

`checkin(description)` this method performs a check in operation on a working copy node applying the specified version history note text.

### Parameters

-   **description**

    A version history note. A description of the change made.


### Returns

Returns the original node that was previously checked out.

### Example

```

    var workingCopy;
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);
    
    if (node.isVersioned){
        
        workingCopy = node.checkout();
        workingCopy.content = "Add some content.";
        workingCopy.checkin("Added some content.");
    }

        
```

## `checkin(description, majorVersion)`

`checkin(description, majorVersion)` this method performs a check in operation on a working copy node.

It applies the specified version history note text and as a major or minor version increment as required.

### Parameters

-   **description**

    A version history note. A description of the change made.

-   **majorVersion**

    True to save as a major version increment, false for minor version


### Returns

Returns the original node that was previously checked out.

