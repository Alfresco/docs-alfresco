---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: ScriptNode createFolder
---

# `setMembership`

`setMembership\(userName, role\)`

This method sets the membership details for a user.

If the user is not already a member of the site, then they are added with the role given. If the user is already a member of the site, then their role is updated to the new role.

Only a site manager can modify memberships. There must be at least one site manager at all times.

## Parameters

-   **userName**

    The user's name

-   **role**

    The role for the user


**Parent topic:**[Site object](../references/API-JS-Site.md)

