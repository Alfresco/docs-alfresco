---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Delete or Cancel Workflow Instance

Either cancels or deletes the specified workflow instance.

`DELETE /alfresco/service/api/workflow-instances/{workflow_instance_id}?forced={forced?}`

To cancel call with no arguments, to delete set the forced argument to true.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Workflow](../references/RESTful-Workflow.md)

