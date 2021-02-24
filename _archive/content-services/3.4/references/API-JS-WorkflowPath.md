---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# JscriptWorkflowPath

The workflow path represents the current state \(position\) of a workflow instance.

The path stores the current position in the workflow as well as the path taken through the workflow to reach this point. An in-progress workflow can have multiple workflow paths if the process contains any forking nodes. The workflow path can be signaled to transition to the next node in the process.

-   **[signal](../references/API-JS-signal.md)**  
`signal(transitionId)`

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

## Properties

The JscriptWorkflowPath provides the following properties:

-   **`id`**

    Returns the ID for this workflow path


-   **`instance`**

    Returns the workflow instance to which this workflow path belongs


-   **`node`**

    Returns the current node \(position\) of the workflow path


-   **`isActive`**

    Returns true if this node is a task node, or false otherwise


-   **`tasks`**

    Returns an array of all the task instances associated with this workflow path


