---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: startWorkflow
---

# `startWorkflow`

The `startWorkflow()` methods create and start a new workflow instance of the workflow definition type.

**Parent topic:**[JscriptWorkflowDefinition](../references/API-JS-WorkflowDefinition.md)

## `startWorkflow(properties)`

`startWorkflow(properties)` this method creates and starts a new workflow instance of the workflow definition's type.

### Parameters

-   **properties**

    If not of type `ScriptableObject`, the properties parameter will be ignored


### Returns

Returns the workflow path \(JscriptWorkflowPath\) for the created instance. This method does not set a package container.

## `startWorkflow(workflowPackage, properties)`

`startWorkflow(properties)` this method creates and starts a new workflow instance of the workflow definition's type.

### Parameters

-   **workflowPackage**

    Workflow package node to attach to the new workflow.

-   **properties**

    If not of type `ScriptableObject`, the properties parameter will be ignored


### Returns

Returns the workflow path \(JscriptWorkflowPath\) for the created instance.

