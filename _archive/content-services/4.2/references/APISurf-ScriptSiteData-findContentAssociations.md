---
author: [Alfresco Documentation, Alfresco Documentation]
source: Spring Surf API
audience: 
category: API
option: findContentAssociations
---

# `findContentAssociations`

`findContentAssociations(String sourceId, String sourceType, String destId, String assocType, String formatId)` - searches for ContentAssociation instances within the Web Application that match the specified constraints. If a constraint is set to null, it is not considered as part of the search.

## Parameters

-   **sourceId**

    A string representing the source id.

-   **sourceType**

    A string representing the source type.

-   **destId**

    A string representing the destination id.

-   **assocType**

    A string representing the association type.

-   **formatId**

    A string representing the format id.


## Returns

Returns an array of `Object` instances that wrap the ContentAssociation results of the search.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

