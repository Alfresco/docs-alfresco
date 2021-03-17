---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Surf API
audience: 
category: API
option: findPageAssociations
---

# `findPageAssociations`

`findPageAssociations(String sourceId, String destId, String associationType)` - searches for PageAssociation instances within the Web Application that are of the specified association type and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.

## Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.

-   **associationType**

    A string representing the association type.


## Returns

Returns an array of `Object` instances that represent the PageAssociation results of the search.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

