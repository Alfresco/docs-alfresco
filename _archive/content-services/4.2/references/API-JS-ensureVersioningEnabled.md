---
author: Alfresco Documentation
---

# `ensureVersioningEnabled`

`ensureVersioningEnabled(autoVersion, autoVersionProps)` ensures that this node has the `cm:versionable` aspect applied to it, and that it has the initial version in the version store.

Calling this on a versioned node with a version store entry will have no effect. Calling this on a newly uploaded share node will have versioning enabled for it.

## Parameters

-   **autoVersion**

    If set to true auto versioning will also be applied if the `cm:versionable` aspect is applied.

-   **autoVersionProps**

    If set to true auto versioning of properties will also be applied, if the `cm:versionable` aspect is applied.


## Returns

ScriptVersion

## Example

```

    var version;
    var createdDate;
    var creator;

    var node = companyhome.createFile("TEST_FILE_999.TXT");

    node.ensureVersioningEnabled(true, true);

    if (node.isVersioned){
        version = node.getVersion("1.0");
        createdDate = version.createdDate;
        creator = version.creator;
    }

      
```

**Parent topic:**[Versions API](../references/API-JS-Versions.md)

