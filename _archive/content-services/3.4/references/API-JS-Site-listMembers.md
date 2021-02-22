---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [listMembers, Site object]
---

# `listMembers`

`listMembers(nameFilter, roleFilter, size, collapseGroups)`

This method gets a map of members of the site filtered by user name and/or user role.

## Parameters

-   **nameFilter**

    User name filter.

-   **roleFilter**

    User role filter.

-   **size**

    Maximum results size. Crop if greater than 0.

-   **collapseGroups**

    True if collapse member groups into user list, false otherwise.


## Returns

Returns the list of members of a site with their roles or all site members if no name or role filter is specified.

**Parent topic:**[Site object](../references/API-JS-Site.md)

