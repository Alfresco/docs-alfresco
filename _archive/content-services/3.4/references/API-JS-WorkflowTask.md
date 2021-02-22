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

-   **[endTask](../references/API-JS-endtask.md)**  
`endTask(transitionId)`

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

