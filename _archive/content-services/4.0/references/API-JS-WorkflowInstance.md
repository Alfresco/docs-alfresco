---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, JscriptWorkflowInstance]
---

# JscriptWorkflowInstance

The workflow instance holds various data about a workflow such as its start date, due date, current state, and so on. A workflow instance can be cancelled \(made inactive\), or deleted.

## Properties

-   **`id`**

    Returns the ID for this workflow instance

-   **`description`**

    Returns the description for this workflow instance

-   **`startDate`**

    Returns the date when this workflow instance started

-   **`endDate`**

    Returns the date when this workflow instance ended

-   **`active`**

    Returns true if the workflow instance is in progress, or false otherwise

-   **`paths`**

    Returns an array containing all the paths associated with this workflow instance


-   **[cancel](../references/API-JS-WorkflowInstance-cancel.md)**  
`cancel()` this method cancels the workflow instance.
-   **[delete](../references/API-JS-WorkflowInstance-delete.md)**  
`delete()` this method deletes the workflow instance.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

