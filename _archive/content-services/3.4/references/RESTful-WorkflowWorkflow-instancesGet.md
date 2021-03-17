---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get Workflow Instance Collection

Retrieves all workflow instances, the returned list can be optionally filtered by the state of the workflow instance and by the authority that initiated the workflow instance.

`GET /alfresco/service/api/workflow-instances?state={state?}&initiator={initiator?}&priority={priority?}&dueBefore={dueBefore?}&dueAfter={dueAfter?}&definitionId={definitionId?}&definitionName={definitionName?}&startedBefore={startedBefore?}&startedAfter={startedAfter?}&completedBefore={completedBefore?}&completedAfter={completedAfter?}&maxItems={maxItems?}&skipCount={skipCount?}&exclude={exclude?}`

`GET /alfresco/service/api/workflow-definitions/{workflow_definition_id}/workflow-instances?state={state?}&initiator={initiator?}&priority={priority?}&dueBefore={dueBefore?}&dueAfter={dueAfter?}&startedBefore={startedBefore?}&startedAfter={startedAfter?}&completedBefore={completedBefore?}&completedAfter={completedAfter?}&maxItems={maxItems?}&skipCount={skipCount?}&exclude={exclude?}`

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Workflow](../references/RESTful-Workflow.md)

