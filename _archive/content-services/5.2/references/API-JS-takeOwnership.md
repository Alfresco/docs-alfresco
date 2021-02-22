---
author: Alfresco Documentation
---

# `takeOwnership`

`takeOwnership()` this method results in the authenticated user running the script to take ownership of the node.

## Example

If running the script while authenticated as `admin`, the following code would result in `admin` being returned as the owner.

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setOwner("fred.bloggs"); // owner is now 'fred.bloggs'

//...

node.takeOwnership(); // currently authenticated user running script is 'admin'

model.owner = node.getOwner();
  
```

**Parent topic:**[Ownership API](../references/API-JS-Ownership.md)

