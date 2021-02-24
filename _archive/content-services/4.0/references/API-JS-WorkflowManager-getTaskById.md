---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getTaskById
---

# `getTaskById`

`getTaskById(id)` this method returns the workflow task instance with the specified ID.

This method is functionally equivalent to the `getTask(id)` method.

## Parameters

-   **id**

    The ID of the workflow task instance.


## Returns

Returns the workflow task instance with the specified ID. Returns null if no workflow task instance with the given ID exists.

## Example

```

    var taskId = "activiti$144";

    model.task = workflow.getTaskById(taskId);        
      
```

**Parent topic:**[Workflow Manager](../references/API-JS-WorkflowManager.md)

