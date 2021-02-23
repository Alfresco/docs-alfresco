---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getTag
---

# `getTag`

`getTag(store, tag)` returns a tag node for the specified store and tag.

## Parameters

-   **store**

    A store reference string designating the store to scan for tags.

-   **tag**

    A string designating the tag to fetch.


## Returns

A ScriptNode object corresponding to the specified tag. Null if tag not found.

## Example

```

    model.node = taggingService.getTag("workspace://SpacesStore", "cold");    
      
```

The preceding code snippet would return a node for the tag “cold”. The node details can be displayed using the following FreeMarker template code:

```


   <p>${node.name}, ${node.nodeRef}, ${node.type}</p>

        
```

This would display information such as:

```

  cold, workspace://SpacesStore/0b0cbfd3-4c2d-4d7a-885d-c3ba6e471a9a, {http://www.alfresco.org/model/content/1.0}category

```

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

