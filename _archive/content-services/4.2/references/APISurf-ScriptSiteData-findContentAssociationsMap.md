---
author: [Alfresco Documentation, Alfresco Documentation]
source: Spring Surf API
audience: 
category: API
option: findContentAssociationsMap
---

# `findContentAssociationsMap`

`findContentAssociationsMap(String sourceId, String sourceType, String destId, String assocType, String formatId)` - provides a map of ScriptModelObjects that wrap ContentAssociation instances. The map is keyed by ContentAssociation object id.

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

