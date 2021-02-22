---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API savedSearch, savedSearch]
---

# `savedSearch`

`savedSearch(node)` returns an array of `ScriptNode` objects that were found by executing the Saved Search referenced by the supplied `node` object. The node object contains the XML that represents the saved search.

## Parameters

-   **node**

    The node object representing the saved search node.


## Returns

Array of `ScriptNode` objects

## Example

```

    var node = companyhome.childByNamePath("Data Dictionary/Saved Searches/SilverSearch");
    if (node){        
        var nodes = search.savedSearch(node);
        model.nodes = nodes;
        model.message = "Nodes found from saved search:";
    }
    else{
        model.message = "Saved search not found";
    }
      
```

**Parent topic:**[Search API](../references/API-JS-Search.md)

## ```savedSearch(noderef)```

`savedSearch(noderef)` this method returns an array of `ScriptNode` objects that were found by executing the Saved Search referenced by the supplied `noderef` string.

### Parameters

-   **noderef**

    The noderef string representing the saved search node.


### Returns

Array of `ScriptNode` objects

### Example

```

    var node = companyhome.childByNamePath("Data Dictionary/Saved Searches/GoldSearch");
    if (node){
        
        var nodeRef = node.nodeRef;
        var nodeRefString = nodeRef.toString();

        if (nodeRef.isNodeRef(nodeRefString)){
            var nodes = search.savedSearch(nodeRefString);
            model.nodes = nodes;
            model.message = "Nodes found from saved search:";
        }
        else{
            model.message = "nodeRefString not valid!";
        }
    }
    else{
        model.message = "Saved search not found";
    }

      
```

