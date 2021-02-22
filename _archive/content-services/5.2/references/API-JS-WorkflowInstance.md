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

-   **`active`**

    Returns true if the workflow instance is in progress, or false otherwise

-   **`description`**

    Returns the description for this workflow instance

-   **`endDate`**

    Returns the date when this workflow instance ended

-   **`id`**

    Returns the ID for this workflow instance

-   **`paths`**

    Returns an array containing all the paths associated with this workflow instance

-   **`startDate`**

    Returns the date when this workflow instance started


-   **[cancel](../references/API-JS-WorkflowInstance-cancel.md)**  
`cancel()` cancels the workflow instance.
-   **[remove](../references/API-JS-WorkflowInstance-remove.md)**  
`remove()` removes the workflow instance.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

