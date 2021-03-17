---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: removeAuthority
---

# `removeAuthority`

`removeAuthority(fullAuthorityName)` this method removes a child authority from this group.

## Parameters

-   **fullAuthorityName**

    A string representing the full name of the authority.


## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now remove authority from this group

var fullName = "GROUP_MY_TEST_GROUP";
group.removeAuthority(fullName);
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

