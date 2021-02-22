# Checklists

You can add checklists to a task for tracking purposes.

To get a checklist:

```
GET api/enterprise/tasks/{taskId}/checklist
```

To create a checklist:

```
POST api/enterprise/tasks/{taskId}/checklist
```

**Example request body:**

```
{
    "assignee": {"id": 1001},
    "name": "mySubtask",
    "parentTaskId": "20086"
}
```

To change the order of the items on a checklist:

```
PUT api/enterprise/tasks/{taskId}/checklist
```

with a json body that contains an ordered list of checklist items ids:

-   `order` : Array of checklist item ids


**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

