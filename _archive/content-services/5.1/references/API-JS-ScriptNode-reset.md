---
author: Alfresco Documentation
---

# `reset`

`reset()` resets the node cached state of a node.

This resets properties as follows:

```

        this.name = null;
        this.type = null;
        this.properties = null;
        this.aspects = null;
        this.targetAssocs = null;
        this.sourceAssocs = null;
        this.childAssocs = null;
        this.children = null;
        this.hasChildren = null;
        this.parentAssocs = null;
        this.displayPath = null;
        this.qnamePath = null;
        this.isDocument = null;
        this.isContainer = null;
        this.parent = null;
        this.primaryParentAssoc = null;
        this.activeWorkflows = null;
        this.siteName = null;
        this.siteNameResolved = false;      
    
```

## Example

The following would reset the cached state of the node:

```

node.reset();

```

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

