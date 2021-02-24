---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getTopTags
---

# `getTopTags`

`getTopTags(topN)` this method gets the top N tags ordered by count.

## Parameters

-   **topN**

    The number of top tags to return.


## Returns

Returns the top tag details ordered by count.

## Example

```

    var node = companyhome.childByNamePath("TAG_SCOPE_FOLDER/TEST_FILE_1.TXT");
    if (node){

        model.message = "Node found";

        var tagScope = node.getTagScope();
        if (tagScope){
            model.tags = tagScope.tags;
            model.topTags = tagScope.getTopTags(4);
        }        
    }
    else {
        model.message = "Node not found!";
    }        
      
```

The preceding code snippet would return results for tags and topTags such as the following:

```

Node found

Tags:

Tag: 'cool' @ 3 instances

Tag: 'ends' @ 3 instances

Tag: 'browsers' @ 2 instances

Tag: 'code' @ 2 instances

Tag: 'cold' @ 2 instances

Tag: 'first' @ 2 instances

Tag: 'fire' @ 2 instances

Tag: 'fir' @ 2 instances

Tag: 'fun' @ 1 instances

Top tags:

Tag: 'cool' @ 3 instances

Tag: 'ends' @ 3 instances

Tag: 'browsers' @ 2 instances

Tag: 'code' @ 2 instances  
  
```

**Parent topic:**[TagScope object](../references/API-JS-TaggingService-tagScope.md)

