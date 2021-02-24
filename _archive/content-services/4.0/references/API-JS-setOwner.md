---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: setOwner
---

# `setOwner`

`setOwner(userId)` this method sets the owner of the node.

## Parameters

-   **userId**

    A string representing the user ID.


## Example

The following sets the user `fred.bloggs` to be the owner of the file.

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setOwner("fred.bloggs");
      
```

**Parent topic:**[Ownership API](../references/API-JS-Ownership.md)

