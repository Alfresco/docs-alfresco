---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, Workflow Manager API]
---

# Workflow Manager

The Workflow Manager is the entry point to the Workflow JavaScript API. It is the only object in this API exposed to the root scripting scope. In the root scripting scope, the WorkflowManager object is identified as `workflow`.

## Properties

-   **`allDefinitions`**

    Returns an array of all \(old and current\) versions of deployed workflow definitions For current versions only, use latestDefinitions.

-   **`latestDefinitions`**

    Returns an array of the latest version of all deployed workflow definitions For all versions, use allDefinitions.

-   **`assignedTasks`**

    Returns an array of all tasks that are currently in progress assigned to the current user.

-   **`completedTasks`**

    Returns an array of all completed tasks assigned to the current user.


-   **[getDefinitionByName](../references/API-JS-WorkflowManager-getDefinitionByName.md)**  
`getDefinitionByName(name)` this method get the workflow definitions corresponding to the specified name.
-   **[getDefinition](../references/API-JS-WorkflowManager-getDefinition.md)**  
`getDefinition(id)` this method returns a workflow definition with the specified ID.
-   **[getInstance](../references/API-JS-WorkflowManager-getInstance.md)**  
`getInstance(workflowInstanceId)` this method gets the workflow instance with the specified ID.
-   **[getPooledTasks](../references/API-JS-WorkflowManager-getPooledTasks.md)**  
`getPooledTasks(authority)` this method gets pooled workflow task instances available to the given authority.
-   **[getTask](../references/API-JS-WorkflowManager-getTask.md)**  
`getTask(id)` this method returns the workflow task instance with the specified ID.
-   **[getTaskById](../references/API-JS-WorkflowManager-getTaskById.md)**  
`getTaskById(id)` this method returns the workflow task instance with the specified ID.
-   **[createPackage](../references/API-JS-WorkflowManager-createPackage.md)**  
`createPackage()` this method creates a package. A package is a container node that can store content associated with a workflow instance.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

