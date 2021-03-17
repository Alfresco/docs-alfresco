---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Surf API
audience: 
category: API
option: newPreset
---

# `newPreset`

`newPreset(String presetId, Scriptable tokens)` - creates model objects based on a given preset id. The preset is looked up and processed by the PresetManager bean. The various objects found in the preset will be generated using the supplied name/value map of tokens.

## Parameters

-   **presetId**

    A string representing the ID of the preset to generate.

-   **tokens**

    Token name/value map.


## Returns

void

**Parent topic:**[sitedata](../references/APISurf-sitedata.md)

