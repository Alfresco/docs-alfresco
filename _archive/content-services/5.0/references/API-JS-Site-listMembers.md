---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [listMembers, Site object]
---

# `listMembers`

`listMembers(nameFilter, roleFilter, size, collapseGroups)` gets a map of members of the site filtered by user name and/or user role.

If no name or role filter is specified all members of the site are listed.

This list includes both users and groups if collapseGroups is set to false, otherwise all groups that are members are collapsed into their component users and listed.

## Parameters

-   **nameFilter**

    User name filter string.

-   **roleFilter**

    User role filter string.

-   **size**

    Limit the return results to this number of items. The default, 0, returns all results.

-   **collapseGroups**

    True if collapse member groups into user list; false otherwise.


## Returns

Returns the list of members of a site with their roles or all site members if no name or role filter is specified.

## Example

The following code snippet would return all members with no filtering, and the members of groups are also collapsed into the member list returned:

```
        
  model.members = site.listMembers(null, null, 0, true);        
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

