---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# JscriptWorkflowTask

JscriptWorkflowTask represents a specific instance of a workflow task as opposed to a workflow task definition \(the task type\). A workflow task instance represents a user action, which is usually something that cannot be automated in the workflow.

Task instances can be associated with workflow nodes within the process definition. When the workflow path reaches a node with an associated task, it will not progress until the task is complete and the user signals a transition. A workflow task instance can be signaled with a transition causing the workflow path to progress to the next node with the specified transition.

Some typical examples of where tasks might be used include reviewing and approving documents, editing and appending documents, and marking exam papers.

## Properties

-   **complete**

    Returns whether the task is complete or not. True means the task is complete, false not complete.

-   **description**

    Returns the description for the workflow task instance

-   **id**

    Returns the ID for the workflow task instance

-   **name**

    Returns the name for the workflow task instance

-   **packageResources**

    Returns an array of NodeRefs of the content stored in the package container associated with this workflow task instance

-   **pooled**

    Gets or sets if this is a pooled task instance or not \(true or false\). A pooled task instance can be assigned to a group of users, of which one can take ownership and progress the task

-   **properties**

    Gets or sets a map containing all the properties associated with this task instance

-   **title**

    Returns the title for the workflow task instance

-   **transitions**

    Returns a map containing all the transition IDs \(map keys\) and transition titles \(map values\) for the task instance


-   **[endTask](../references/API-JS-WorkflowTask-endtask.md)**  
`endTask(transitionId)` this method ends the task and signals the associated workflow path to progress to the next node using the specified transition.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

