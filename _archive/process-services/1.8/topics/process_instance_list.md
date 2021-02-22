# Process Instance List

To get the list of process instances:

```
POST api/enterprise/process-instances/query
```

with a json body containing the query parameters. The following parameters are possible:

-   `processDefinitionId`

-   `appDefinitionId`

-   state \(possible values are `running`, `completed` and `all`\)

-   sort \(possible values are `created-desc`, `created-asc`, `ended-desc`, `ended-asc`\)

-   start \(for paging, default 0\)

-   size \(for paging, default 25\)


**Example response:**

```
{
        "size": 6,
        "total": 6,
        "start": 0,
        "data":[
                {"id": "2511", "name": "Test step - January 8th 2015", "businessKey": null, "processDefinitionId": "teststep:3:29"...},
                ...
        ]
}
```

To get a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}
```

To get diagram for a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}/diagram
```

To delete a Process Instance:

```
DELETE api/enterprise/process-instances/{processInstanceId}
```

To suspend a process instance:

```
PUT api/enterprise/process-instances/{processInstanceId}/suspend
```

To activate a process instance:

```
PUT api/enterprise/process-instances/{processInstanceId}/activate
```

Where, `processinstanceId` is the Id of the process instance.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

