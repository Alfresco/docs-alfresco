---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: createVersion
---

# `createVersion`

`createVersion(history, major)` this method creates a version snapshot of the current document.

Note: this will add the cm:versionable aspect.

## Parameters

-   **description**

    Version history note. A description of the change made.

-   **major**

    True to save as a major version increment, false for minor version.


## Returns

Returns a ScriptVersion object for the new version of the document.

**Parent topic:**[Versions API](../references/API-JS-Versions.md)

