---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Surf API
audience: 
category: API
option: findComponents
---

# `findComponents`

`findComponents(String scope, String regionId, String sourceId, String componentTypeId)` - searches for Component instances within the Web Application that match the provided constraints. If a constraint is set to null, it is not considered as part of the search.

## Parameters

-   **scope**

    The value of the scope property of the instance.

-   **regionId**

    The value of the regionId property of the instance.

-   **sourceId**

    The value of the sourceId property of the instance

-   **componentTypeId**

    The value of the componentTypeId property of the instance


## Returns

Returns an array of `ScriptModelObject` instances that wrap the Component results of the search.

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

