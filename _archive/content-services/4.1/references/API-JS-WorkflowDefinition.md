---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, JscriptWorkflowDefinition]
---

# JscriptWorkflowDefinition

The workflow definition is the type \(or template\) of a workflow process. A workflow process definition relates to a workflow instance like a Java class definition relates to an instance of that class. You can use the workflow definition to create and start new workflow instances of that type, as well as to find all currently active instances of that type.

## Properties

-   **`id`**

    Returns an ID for this workflow definition

-   **`name`**

    Returns a string name for this workflow definition

-   **`version`**

    Returns a version number for this workflow definition

-   **`title`**

    Returns a title for this workflow definition

-   **`description`**

    Returns a description for this workflow definition

-   **`activeInstances`**

    Returns an array of all active workflow instances for this workflow definition.


-   **[startWorkflow](../references/API-JS-WorkflowDefinition-startWorkflow.md)**  
`startWorkflow()` these methods create and start a new workflow instance of the workflow definition's type.

**Parent topic:**[Workflow service](../references/API-JS-WorkflowService.md)

