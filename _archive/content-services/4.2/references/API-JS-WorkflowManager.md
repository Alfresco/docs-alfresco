---
author: Alfresco Documentation
---

# Workflow Manager

The Workflow Manager is the entry point to the Workflow JavaScript API. It is the only object in this API exposed to the root scripting scope. In the root scripting scope, the WorkflowManager object is identified as `workflow`.

## Properties

-   **`allDefinitions`**

    Returns an array of all \(old and current\) versions of deployed workflow definitions For current versions only, use latestDefinitions.

-   **`assignedTasks`**

    Returns an array of all tasks that are currently in progress assigned to the current user.

-   **`completedTasks`**

    Returns an array of all completed tasks assigned to the current user.

-   **latestDefinitions**

    Returns an array of the latest version of all deployed workflow definitions For all versions, use allDefinitions.


-   **[createPackage](../references/API-JS-WorkflowManager-createPackage.md)**  
`createPackage()` creates a package. A package is a container node that can store content associated with a workflow instance.
-   **[getAllDefinitions](../references/API-JS-WorkflowManager-getAllDefinitions.md)**  
`getAllDefinitions()` - Returns all versions of the deployed workflow definitions.
-   **[getAssignedTasks](../references/API-JS-WorkflowManager-getAssignedTasks.md)**  
`getAssignedTasks()` - Get tasks assigned to the current user. Note that this will only return in-progress tasks.
-   **[getCompletedTasks](../references/API-JS-WorkflowManager-getCompletedTasks.md)**  
`getCompletedTasks()` - Get completed tasks assigned to the current user.
-   **[getDefinition](../references/API-JS-WorkflowManager-getDefinition.md)**  
`getDefinition(id)` returns a workflow definition with the specified ID.
-   **[getDefinitionByName](../references/API-JS-WorkflowManager-getDefinitionByName.md)**  
`getDefinitionByName(name)` gets the workflow definitions corresponding to the specified name.
-   **[getInstance](../references/API-JS-WorkflowManager-getInstance.md)**  
`getInstance(workflowInstanceId)` gets the workflow instance with the specified ID.
-   **[getLatestDefinitions](../references/API-JS-WorkflowManager-getLatestDefinitions.md)**  
`getLatestDefinitions()` - Gets the latest versions of the deployed, workflow definitions.
-   **[getPooledTasks](../references/API-JS-WorkflowManager-getPooledTasks.md)**  
`getPooledTasks(authority)` gets pooled workflow task instances available to the given authority.
-   **[getTask](../references/API-JS-WorkflowManager-getTask.md)**  
`getTask(id)` returns the workflow task instance with the specified ID.
-   **[getTaskById](../references/API-JS-WorkflowManager-getTaskById.md)**  
`getTaskById(id)` returns the workflow task instance with the specified ID.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

