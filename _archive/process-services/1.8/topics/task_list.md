# Task List

To return a list of tasks, use:

```
POST api/enterprise/tasks/query
```

which includes a JSON body containing the query parameters. Following parameters are available:

-   `appDefinitionId`

-   `processInstanceId`

-   `processDefinitionId`

-   `text` \(the task name will be filtered with this, using *like* semantics : %text%\)

-   `assignment`

    -   `assignee` : where the current user is the assignee

    -   `candidate`: where the current user is a task candidate

    -   `group_x`: where the task is assigned to a group where the current user is a member of. The groups can be fetched through the profile REST endpoint

    -   no value: where the current user is involved

-   `state` \(*completed* or *active*\)

-   `sort` \(possible values are *created-desc*, *created-asc*, *due-desc*, *due-asc*\)

-   `start` \(for paging, default 0\)

-   `size` \(for paging, default 25\)


**Example response:**

```
{
        "size": 6,
        "total": 6,
        "start": 0,
        "data":[
                {
                        "id": "2524",
                        "name": "Task",
                        "description": null,
                        "category": null,
                        "assignee":{"id": 1, "firstName": null, "lastName": "Administrator", "email": "admin@app.activiti.com"},
                        "created": "2015-01-08T10:58:37.193+0000",
                        "dueDate": null,
                        "endDate": null,
                        "duration": null,
                        "priority": 50,
                        "processInstanceId": "2511",
                        "processDefinitionId": "teststep:3:29",
                        "processDefinitionName": "Test step",
                        "processDefinitionDescription": null,
                        "processDefinitionKey": "teststep",
                        "processDefinitionCategory": "http://www.activiti.org/test",
                        "processDefinitionVersion": 3,
                        "processDefinitionDeploymentId": "26",
                        "formKey": "5"
                }
                ...
        ]
}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

