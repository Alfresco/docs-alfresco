---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, ScriptUser object]
---

# ScriptUser object

A `ScriptUser` object represents an Alfresco user.

## Properties

-   **authorityType**

    Gets or sets the authority type \(user, group, role\)

-   **displayName**

    Gets or sets the display name of the user

-   **fullName**

    Gets or sets the full name of the user

-   **person**

    Gets the ScriptNode object representing the person

-   **personNodeRef**

    Gets the nodeRef for the user

-   **shortName**

    Gets or sets the short name of the user

-   **userName**

    Gets the user name of the user


-   **[getPerson](../references/API-JS-ScriptUser-getPerson.md)**  
`getPerson()` - returns a script node wrapping the person.
-   **[getZones](../references/API-JS-ScriptUser-getZones.md)**  
`getZones()` - returns all the zones of this user.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

