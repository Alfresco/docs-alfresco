---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, JscriptWorkflowPath]
---

# JscriptWorkflowPath

The workflow path represents the current state \(position\) of a workflow instance.

The path stores the current position in the workflow as well as the path taken through the workflow to reach this point. An in-progress workflow can have multiple workflow paths if the process contains any forking nodes. The workflow path can be signaled to transition to the next node in the process.

## Properties

-   **`active`**

    Returns true if this node is a task node, or false otherwise

-   **`id`**

    Returns the ID for this workflow path

-   **`instance`**

    Returns the workflow instance to which this workflow path belongs

-   **`node`**

    Returns the current node \(position\) of the workflow path

-   **`tasks`**

    Returns an array of all the tasks associated with this workflow path


-   **[signal](../references/API-JS-WorkflowPath-signal.md)**  
`signal(transitionId)` signals the workflow path to transition to the next node.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

