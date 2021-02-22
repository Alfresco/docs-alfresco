---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getOwner
---

# `getOwner`

`getOwner()` gets the owner of the node as a user ID.

## Example

The following would return an owner of `fred.bloggs`.

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setOwner("fred.bloggs");

// ...

model.owner = node.getOwner();

```

**Parent topic:**[Ownership API](../references/API-JS-Ownership.md)

