---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: createTag
---

# `createTag`

`createTag(store, tag)` creates a node representing the tag.

## Parameters

-   **store**

    A string designating the store in which to create the tag.

-   **tag**

    A string designating the tag to create.


## Returns

A ScriptNode object corresponding to the created tag. Null if the tag can not be created.

## Example

```

    model.node = taggingService.createTag("workspace://SpacesStore", "cloud");        
      
```

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

