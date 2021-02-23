---
author: Alfresco Documentation
---

# `getDefinition`

`getDefinition(id)` returns a workflow definition with the specified ID.

## Parameters

-   **id**

    A string representing the ID of the workflow definition.


## Returns

Returns the workflow definition with the given ID. Returns null if no workflow definition with the given ID exists.

## Example

```

    var id = "activiti$activitiAdhoc:1:4";
    
    model.definition = workflow.getDefinition(id);        
      
```

**Parent topic:**[Workflow Manager](../references/API-JS-WorkflowManager.md)

