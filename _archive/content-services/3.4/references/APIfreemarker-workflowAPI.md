---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Workflow API

The `workflow` root object provides read access to the in-progress and finished tasks for the current user. It also provides a function to look up a single task by its task ID. The functions described mostly return `WorkflowTaskItem` objects.

|Type|Description|
|----|-----------|
|`assignedTasks`|The sequence `WorkflowTaskItem` objects representing the assigned tasks for the current user.|
|`pooledTasks`|The sequence `WorkflowTaskItem` objects representing the pooled tasks for the current user.|
|`completedTasks`|The sequence `WorkflowTaskItem` objects representing the pooled tasks for the current user.|
|`getTaskById(taskId)`|Returns a single task given a known task ID.

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

|

-   **[WorkflowTaskItem API](../references/APIfreemarker-workflowTaskItem.md)**  


**Parent topic:**[Template models](../concepts/APIfreemarker-models.md)

