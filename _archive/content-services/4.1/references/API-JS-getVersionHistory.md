---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getVersionHistory
---

# `getVersionHistory`

`getVersionHistory()`

Obtains the version history for the current node.

## Returns

Version history as a list of `ScriptVersion` objects.

## Example

```


    var versionHistory;
    var revisionDates = new Array();

    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);

    if (node.isVersioned){
        versionHistory = node.getVersionHistory();

        for (var i in versionHistory){
            revisionDates.push(versionHistory[i].createdDate);
        }
    }
      
```

**Parent topic:**[Versions API](../references/API-JS-Versions.md)

