---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Workflow Manager

The Workflow Manager is the entry point to the Workflow JavaScript API. It is the only object in this API exposed to the root scripting scope. In the root scripting scope, the WorkflowManager object is identified as workflow.

-   **[getDefinitionByName](../references/API-JS-getDefinitionByName.md)**  
`getDefinitionByName(name)`
-   **[getDefinition](../references/API-JS-getDefinition.md)**  
`getDefinition(id)`
-   **[getInstance](../references/API-JS-getInstance.md)**  
`getInstance(workflowInstanceId)`
-   **[getPooledTasks](../references/API-JS-getPooledTasks.md)**  
`getPooledTasks(authority)`
-   **[getTask](../references/API-JS-getTask.md)**  
`getTask(id)`
-   **[createPackage](../references/API-JS-createPackage.md)**  
`createPackage()`

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

## Properties

The Workflow Manager provides the following properties:

-   **`allDefinitions`**

    Returns an array of all \(old and current\) versions of deployed workflow definitions For current versions only, use latestDefinitions


-   **`assignedTasks`**

    Returns an array of all tasks that are currently in progress assigned to the current user


-   **`completedTasks`**

    Returns an array of all completed tasks assigned to the current user


-   **`latestDefinitions`**

    Returns an array of the latest version of all deployed workflow definitions For all versions, use allDefinitions


