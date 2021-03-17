---
author: [Alfresco Documentation, Alfresco Documentation]
source: Spring Surf API
audience: 
category: API
option: removeTemplate
---

# `removeTemplate`

`removeTemplate(String pageId, String formatId)` - looks up the given Page and unbinds any Template instances that are bound to the page \(keyed by formatId\). If you would like to remove the default Template instance, set formatId to null.

## Parameters

-   **pageId**

    A string representing the page id.

-   **formatId**

    A string representing the format id.


## Returns

void

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

