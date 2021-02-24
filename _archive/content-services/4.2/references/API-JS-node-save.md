---
author: Alfresco Documentation
---

# `save`

`save()` this method persists the modified properties of this node.

## Example

```

var node = companyhome.createFile("TEST_FILE_1.TXT");

node.properties.description = "This is an example description.";
node.save(); // persist changes to database
       
```

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

