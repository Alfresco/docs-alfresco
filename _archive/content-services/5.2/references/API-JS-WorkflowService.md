---
author: Alfresco Documentation
---

# Workflow service

The Workflow JavaScript API lets you access Alfresco Content Services advanced workflows from within JavaScript.

This API provides the ability to:

-   Access and manage workflow definitions, instances, paths, tasks, and transitions
-   Create workflow packages
-   Start, cancel, or delete workflow instances
-   End and progress workflow paths to the next node with a specified transition

**Note:** The object model for this API is similar to that of the Advanced Workflow Java API. The relationships between the various types used in this API are the same as the relationships between the various classes used in the Advanced Workflow API. Each class in the Workflow JavaScript API mirrors a class in the Advanced Workflow API, however, the JavaScript classes are simpler, making them more easily accessible from JavaScript. All the JavaScript classes implement the Serializable interface, which allows them to be stored in Scriptable objects.

-   **[JscriptWorkflowDefinition](../references/API-JS-WorkflowDefinition.md)**  
The workflow definition is the type \(or template\) of a workflow process. A workflow process definition relates to a workflow instance like a Java class definition relates to an instance of that class. You can use the workflow definition to create and start new workflow instances of that type, as well as to find all currently active instances of that type.
-   **[JscriptWorkflowInstance](../references/API-JS-WorkflowInstance.md)**  
The workflow instance holds various data about a workflow such as its start date, due date, current state, and so on. A workflow instance can be cancelled \(made inactive\), or deleted.
-   **[JscriptWorkflowNode](../references/API-JS-WorkflowNode.md)**  
A workflow node is a single point in the workflow process. Some workflow nodes are task nodes with associated tasks that must be completed before the workflow can transition to the next node.
-   **[JscriptWorkflowPath](../references/API-JS-WorkflowPath.md)**  
The workflow path represents the current state \(position\) of a workflow instance.
-   **[JscriptWorkflowTask](../references/API-JS-WorkflowTask.md)**  
JscriptWorkflowTask represents a specific instance of a workflow task as opposed to a workflow task definition \(the task type\). A workflow task instance represents a user action, which is usually something that cannot be automated in the workflow.
-   **[JscriptWorkflowTransition](../references/API-JS-WorkflowTransition.md)**  
The workflow transition is a simple Data Transfer Object \(DTO\) representing a single transition type.
-   **[Workflow Manager](../references/API-JS-WorkflowManager.md)**  
The Workflow Manager is the entry point to the Workflow JavaScript API. It is the only object in this API exposed to the root scripting scope. In the root scripting scope, the WorkflowManager object is identified as `workflow`.

**Parent topic:**[Services API](../references/API-JS-Services.md)

