---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getCount
---

# `getCount`

`getCount(tag)` this method gets the count of a tag, that is how many times the tag is used within the tag scope. This is zero if the tag is not present.

## Parameters

-   **tag**

    A string representing the tag to return the count for.


## Example

The following code snippet would return the count for the tag “cool”:

```

    var node = companyhome.childByNamePath("TAG_SCOPE_FOLDER/TEST_FILE_1.TXT");
    if (node){

        model.message = "Node found";

        var tagScope = node.getTagScope();
        if (tagScope){
            model.tags = tagScope.tags;
            model.count = tagScope.getCount("cool");
        }        
    }
    else {
        model.message = "Node not found!";
    }        
    
```

**Parent topic:**[TagScope object](../references/API-JS-TaggingService-tagScope.md)

