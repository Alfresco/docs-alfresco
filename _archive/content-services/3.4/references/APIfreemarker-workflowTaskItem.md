---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# WorkflowTaskItem API

The WorkflowTaskItem API represents a single `WorkflowTask` object. It will probably contain a package of one or more objects that contains references to the objects pertinent to the workflow item, such as a document or folder of documents scheduled for review.

|Type|Description|
|----|-----------|
|`type`|Workflow task type value.|
|``qnameType``|Underlying QName model type of the workflow task.|
|`name`|The task name value.|
|``description``|The task description value.|
|`id`|The task ID.|
|``isCompleted``|Boolean value true if the task has been completed.|
|``startDate``|Start date of the workflow task.|
|``transitions``|Returns a map of the available task transition names to transition Labels and IDs.|
|``initiator``|Returns a `TemplateNode` representing the user who initiated the workflow task.|
|``outcome``|The outcome label from a completed task.|
|```package```|Returns the `NodeRef` to the workflow package node.|
|``packageResources``|Returns a sequence of the node resources from the package attached to this workflow task.|
|``properties``|A map of all the properties for the task; includes all appropriate BPM model properties.|

**Parent topic:**[Workflow API](../references/APIfreemarker-workflowAPI.md)

