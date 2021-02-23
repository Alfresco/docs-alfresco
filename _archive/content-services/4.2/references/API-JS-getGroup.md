---
author: Alfresco Documentation
---

# `getGroup`

`getGroup(shortName)` this method gets a group given its short name.

## Parameters

-   **shortName**

    A string representing the short name of the group to return.


## Returns

Returns a `ScriptGroup` object, or null if the group cannot be found.

## Example

```

var shortName = "MY_GROUP";

model.scriptGroup = groups.getGroup(shortName);
```

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

