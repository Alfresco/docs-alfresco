---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# JscriptWorkflowNode

A workflow node is a single point in the workflow process. Some workflow nodes are task nodes with associated tasks that must be completed before the workflow can transition to the next node.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

## Properties

The JscriptWorkflowNode provides the following properties:

-   **`description`**

    Returns the description for this workflow node


-   **`name`**

    Returns the name when this workflow node


-   **`title`**

    Returns the title for this workflow node


-   **`transitions`**

    Returns the list of transitions that are available for this node


-   **`isTaskNode`**

    Returns true if this node is a task node, or false otherwise


