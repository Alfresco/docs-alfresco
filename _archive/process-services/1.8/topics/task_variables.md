# Task Variables

To create new task variables:

```
POST api/enterprise/tasks/{taskId}/variables
```

To get all task variables:

```
GET api/enterprise/tasks/{taskId}/variables
```

To get a task variable by name:

```
GET api/enterprise/tasks/{taskId}/variables/{variableName}
```

To update an existing task variable:

```
PUT api/enterprise/tasks/{taskId}/variables/{variableName}
```

**Example response**:

```
{
     "name":"myVariable",
     "scope":"local",
     "type":"string",
     "value":"myValue"
}
```

Where:

-   `name` - Name of the variable.

-   `scope` - Global or local. If global is provided, then the variable will be a process-instance variable.

-   `type` - Type of variable, such as string.

-   `value` - Value of the variable.


To delete a task variable:

```
DELETE api/enterprise/tasks/{taskId}/variables/{variableName}
```

To delete all task variables:

```
DELETE api/enterprise/tasks/{taskId}/variables
```

Where, `taskId` is the ID of the task.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

