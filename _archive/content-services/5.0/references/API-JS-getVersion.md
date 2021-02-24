---
author: Alfresco Documentation
---

# `getVersion`

`getVersion(label)` gets a specific version of a document identified by `label`.

## Parameters

-   **label**

    The version label of the node to get.


## Returns

A ScriptVersion object representing the version of this node requested.

## Example

```

    var version;
    var createdDate;
    var creator;
    
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    if (node.isVersioned){
        version = node.getVersion("1.0");
        createdDate = version.createdDate;
        creator = version.creator;          
    }
       
```

**Parent topic:**[Versions API](../references/API-JS-Versions.md)

