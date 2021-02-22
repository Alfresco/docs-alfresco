---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# WorkflowTaskItem API

A wrapper around a WorkflowTask item.

|Property|Description|
|--------|-----------|
|`description`|The task description value.|
|`id`|The task ID.|
|`initiator`|Returns a `TemplateNode` representing the user who initiated the workflow task.|
|`isCompleted`|Boolean value true if the task has been completed.|
|`name`|The task name value.|
|`outcome`|A string representing the outcome label from a completed task.|
|`package`|Returns the `NodeRef` to the workflow package node.|
|`packageResources`|Returns a list of `TemplateContent` objects representing the node resources from the package attached to this workflow task.|
|`properties`|A map of all the properties for the task; includes all appropriate Activiti and BPM model properties.|
|`qnameType`|A string representing the underlying QName model type of the workflow task.|
|`startDate`|Start date of the workflow task.|
|`transitions`|Returns a map of the available task transition names to transition Labels and IDs.|
|`type`|Workflow task type value.|

**Parent topic:**[Workflow API](../references/API-FreeMarker-Workflow.md)

