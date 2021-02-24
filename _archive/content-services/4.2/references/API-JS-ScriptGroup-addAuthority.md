---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: addAuthority
---

# `addAuthority`

`addAuthority(fullAuthorityName)` this method adds an existing authority as a child of this group.

## Parameters

-   **fullAuthorityName**

    A string representing the full name of the authority.


## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now add authority to this group

var fullName = "GROUP_MY_TEST_GROUP";
group.addAuthority(fullName);        
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

