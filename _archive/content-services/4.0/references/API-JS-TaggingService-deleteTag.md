---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: deleteTag
---

# `deleteTag`

`deleteTag(store, tag)` deletes the specified tag.

## Parameters

-   **store**

    A string designating the store in which the tag is located.

-   **tag**

    A string designating the tag to delete.


## Returns

void

## Example

```

    if(taggingService.getTag("workspace://SpacesStore", "cloud")){

        taggingService.deleteTag("workspace://SpacesStore", "cloud");
        model.message1 = "Tag successfully deleted!";

    }
    else {
        model.message1 = "Tag does not exist!";
    }

    // ensure deleted

    if(taggingService.getTag("workspace://SpacesStore", "cloud")){
        model.message2 = "Tag found!";
    }
    else {
        model.message2 = "Tag does not exist!";
    }
        
      
```

The preceding code snippet would result in the following messages if the tag was found and deleted:

```

Message1: Tag successfully deleted!

Message2: Tag does not exist!        
        
```

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

