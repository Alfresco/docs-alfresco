---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List Workflow Tasks

Lists all Workflow Task Instances associated with an authority and of a given State.

`GET /alfresco/service/api/task-instances?authority={authority?}&state={state?}&priority={priority?}&pooledTasks={pooledTasks?}&dueBefore={dueBefore?}&dueAfter={dueAfter?}&properties={properties?}&maxItems={maxItems?}&skipCount={skipCount?}&exclude={exclude?}`

`GET /alfresco/service/api/workflow-instances/{workflow_instance_id}/task-instances?authority={authority?}&state={state?}&priority={priority?}&dueBefore={isoDate?}&dueAfter={isoDate?}&properties={prop1, prop2, prop3...?}&maxItems={maxItems?}&skipCount={skipCount?}&exclude={exclude?}`

The list of returned tasks also includes pooled tasks which the specified authority is eligible to claim.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Workflow](../references/RESTful-Workflow.md)

