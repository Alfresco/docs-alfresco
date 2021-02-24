---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# JscriptWorkflowInstance

The workflow instance holds various data about a workflow such as its start date, due date, current state, and so on. A workflow instance can be cancelled \(made inactive\), or deleted.

-   **[cancel](../references/API-JS-cancel.md)**  
`cancel()`
-   **[delete](../references/API-JS-delete.md)**  
`delete()`

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

## Properties

The JscriptWorkflowInstance provides the following properties:

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


-   **`isActive`**

    Returns true if the workflow instance is in progress, or false otherwise


-   **`cancel`**

    Cancels the workflow instance


-   **`delete`**

    Deletes the workflow instance


