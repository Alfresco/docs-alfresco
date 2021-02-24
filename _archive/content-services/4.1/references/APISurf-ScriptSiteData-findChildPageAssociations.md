---
author: [Alfresco Documentation, Alfresco Documentation]
source: Spring Surf API
audience: 
category: API
option: findChildPageAssociations
---

# `findChildPageAssociations`

`findChildPageAssociations(String sourceId, String destId)` - searches for PageAssociation instances within the Web Application that are of association type 'child' and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.

## Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.


## Returns

Returns an array of `Object` instances that represent the PageAssociation results of the search.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

