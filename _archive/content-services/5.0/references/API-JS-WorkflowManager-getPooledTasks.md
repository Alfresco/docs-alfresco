---
author: Alfresco Documentation
---

# `getPooledTasks`

`getPooledTasks(authority)` gets pooled workflow task instances available to the given authority.

A pooled task can be assigned to a group of users, and then one of those users may take ownership and progress the task.

## Parameters

-   **authority**

## Returns

Returns an array of the pooled workflow task instances available to the given authority.

## Example

```

    model.pooledTasks = workflow.getPooledTasks("GROUP_SUPERUSERS");          
      
```

**Parent topic:**[Workflow Manager](../references/API-JS-WorkflowManager.md)

