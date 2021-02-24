---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# End Workflow Task

Ends a task for an in-flight workflow with the passed-in transition or the default.

`POST /alfresco/service/api/workflow/task/end/{taskId}/{transitionId}`

`POST /alfresco/service/api/workflow/task/end/{taskId}`

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Workflow](../references/RESTful-Workflow.md)

