---
author: Alfresco Documentation
---

# `getAssignedTasks`

`getAssignedTasks()` - Get tasks assigned to the current user. Note that this will only return in-progress tasks.

## Parameters

None

## Returns

Returns the list of assigned \(in-progress\) tasks.

## Example

```
   
model.assignedTasks = workflow.getAssignedTasks();        
      
```

**Parent topic:**[Workflow Manager](../references/API-JS-WorkflowManager.md)

