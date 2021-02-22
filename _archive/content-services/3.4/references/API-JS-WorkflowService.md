---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Workflow service

The Workflow JavaScript API lets you access Alfresco advanced workflows from within JavaScript.

This API provides the ability to:

-   Access and manage workflow definitions, instances, paths, tasks, and transitions
-   Create workflow packages
-   Start, cancel, or delete workflow instances
-   End and progress workflow paths to the next node with a specified transition

**Note:** The object model for this API is similar to that of the Advanced Workflow Java API. The relationships between the various types used in this API are the same as the relationships between the various classes used in the Advanced Workflow API. Each class in the Workflow JavaScript API mirrors a class in the Advanced Workflow API, however, the JavaScript classes are simpler making them more easily accessible from JavaScript. All the JavaScript classes implement the Serializable interface, which allows them to be stored in Scriptable objects

-   **[Workflow Manager](../references/API-JS-WorkflowManager.md)**  

-   **[JscriptWorkflowDefinition](../references/API-JS-WorkflowDefinition.md)**  

-   **[JscriptWorkflowInstance](../references/API-JS-WorkflowInstance.md)**  

-   **[JscriptWorkflowNode](../references/API-JS-WorkflowNode.md)**  

-   **[JscriptWorkflowPath](../references/API-JS-WorkflowPath.md)**  
The workflow path represents the current state \(position\) of a workflow instance.
-   **[JscriptWorkflowTask](../references/API-JS-WorkflowTask.md)**  

-   **[JscriptWorkflowTransition](../references/API-JS-WorkflowTransition.md)**  


**Parent topic:**[Services API](../references/API-JS-Services.md)

