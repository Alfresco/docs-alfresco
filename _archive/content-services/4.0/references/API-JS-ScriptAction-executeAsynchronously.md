---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: executeAsynchronously
---

# `executeAsynchronously()`

`executeAsynchronously(node)` executes the action against the specified node asynchronously.

The action \(and its parameters\) may be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action may be changed.

When called, this method returns immediately, the action executing in a separate thread.

## Parameters

-   **node**

    The node on which to execute the action.


## Example

```

   
        
```

**Parent topic:**[ScriptAction API](../references/API-JS-ScriptAction.md)

