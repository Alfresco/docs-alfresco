---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Workflow

This section describes the Workflow web scripts within the `/org/alfresco/repository/workflow` package.

 

-   **[End Workflow Task](../references/RESTful-WorkflowEnd-taskPost.md)**  
 Ends a task for an in-flight workflow with the passed-in transition or the default.
-   **[Gets Workflow Task Instance](../references/RESTful-WorkflowTask-instanceGet.md)**  
 Gets the details of a task.
-   **[Updates Workflow Task Instance](../references/RESTful-WorkflowTask-instancePut.md)**  
 Updates the properties of a specific task and returns a detailed representation of the updated task instance.
-   **[List Workflow Tasks](../references/RESTful-WorkflowTask-instancesGet.md)**  
 Lists all Workflow Task Instances associated with an authority and of a given State.
-   **[List Deployed Workflow Definitions](../references/RESTful-WorkflowWorkflow-definitionsGet.md)**  
 Returns a simple representation of all deployed workflow definitions.
-   **[Delete Workflow Instance](../references/RESTful-WorkflowWorkflow-instanceDelete.md)**  
 Either cancels or deletes the specified workflow instance.
-   **[Get Workflow Instance](../references/RESTful-WorkflowWorkflow-instanceGet.md)**  
 Retrieves a specific workflow instance, optionally with all the tasks.
-   **[Get Workflow Instance Collection for NodeRef](../references/RESTful-WorkflowWorkflow-instances-for-nodeGet.md)**  
 Retrieves all active workflow instances that the given node is part of.
-   **[Get Workflow Instance Collection](../references/RESTful-WorkflowWorkflow-instancesGet.md)**  
 Retrieves all workflow instances, the returned list can be optionally filtered by the state of the workflow instance and by the authority that initiated the workflow instance.

**Parent topic:**[Repository](../references/RESTful-Repository.md)

