---
author: Alfresco Documentation
---

# Workflow API

The `workflow` root object provides read access to the in-progress and finished tasks for the current user. It also provides a function to look up a single task by its task ID. The functions described mostly return `WorkflowTaskItem` objects.

|Property|Description|
|--------|-----------|
|`assignedTasks`|Returns a list of `WorkflowTaskItem` objects representing the assigned tasks for the current user.|
|`completedTasks`|Returns a list of `WorkflowTaskItem` objects representing the pooled tasks for the current user.|
|`pooledTasks`|Returns a list of `WorkflowTaskItem` objects representing the pooled tasks for the current user.|

## Example

For example, Workflow Tasks Todo for the current user:

```

            
            My Tasks Todo:
 <table cellspacing=0 cellpadding=2>
   <tr>
      <th>ID</th>
      <th>Type</th>
      <th>Name</th>
      <th>Description</th>
      <th>Created Date</th>
      <th>Start Date</th>
      <th>Due Date</th>
      <th>Priority</th>
      <th>% Complete</th>
      <th>Status</th>
      <th>Completed</th>
   <tr>
   <#list workflow.assignedTasks as t>
      <tr>
         <td>${t.id}</td>
         <td>${t.type}</td>
         <td>${t.name}</td>
         <td>${t.description}</td>
         <td>${t.properties["cm:created"]?datetime}</td>
         <td><#if t.properties["bpm:startDate"]?exists>${t.properties["bpm:startDate"]?datetime}<#else><i>None</i></#if></td>
         <td><#if t.properties["bpm:dueDate"]?exists>${t.properties["bpm:dueDate"]?datetime}<#else><i>None</i></#if></td>
         <td>${t.properties["bpm:priority"]}</td>
         <td>${t.properties["bpm:percentComplete"]}</td>
         <td>${t.properties["bpm:status"]}</td>
         <td>${t.isCompleted?string("Yes", "No")}</td>
      </tr>
   </#list>
 </table>
 
      
```

The preceding code snippet would return something similar to \(depending on what tasks are in the system\):

|ID|Type|Name|Description|Created Date|Start Date|Due Date|Priority|% Complete|Status|Completed|
|--|----|----|-----------|------------|----------|--------|--------|----------|------|---------|
|activiti$144|Adhoc Task|Adhoc Task allocated by colleague|Admin please review this and return! Thanks!|Dec 14, 2011 10:40:11 AM|Dec 14, 2011 10:40:11 AM|Dec 31, 2011 12:00:00 AM|2|0|In Progress|No|
|activiti$207|Adhoc Task|Adhoc Task allocated by colleague|Meeting minutes need reviewing!|Dec 14, 2011 10:42:06 AM|Dec 14, 2011 10:42:06 AM|Dec 31, 2011 12:00:00 AM|2|0|In Progress|No|

In the preceding example the Activiti engine is used, as can be seen from the IDs. However, the `bpm:*` properties are independent of the engine used, so they are returned by the Activiti engine. Before handing over the task and its properties, the Activiti `workflowService` implementation maps Activiti-specific fields and variables \(description, duedate, and so on\) to the corresponding `bpm:*` properties.

-   **[getTaskById](../references/API-FreeMarker-Workflow-getTaskById.md)**  
`getTaskById(taskId)` returns a single object representing a task for the specified Task ID for the current user.
-   **[WorkflowTaskItem API](../references/API-FreeMarker-WorkflowTaskItem.md)**  
A wrapper around a WorkflowTask item.

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

