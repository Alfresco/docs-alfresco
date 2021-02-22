---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getContainerGroups
---

# `getContainerGroups`

`getContainerGroups(person)` gets the groups that contain the specified authority.

## Parameters

-   **person**

    The user \(cm:person\) to get the containing groups for.


## Example

The following code returns a list of groups that `abeecher` is a member of:

```

var user = people.getPerson("abeecher");

if(user){
    model.containers = people.getContainerGroups(user);
}
```

**Parent topic:**[People API](../references/API-JS-People.md)

