# Process instance variables

A process instance can have several variables.

To get process instance variables:

```
GET api/enterprise/process-instances/{processInstanceId}/variables
```

Where, `processInstanceId` is the Id of the process instance.

To create process instance variables:

```
POST api/enterprise/process-instances/{processInstanceId}/variables
```

To update existing variables in a process instance:

```
PUT api/enterprise/process-instances/{processInstanceId}/variables
```

**Example response**:

```
{
     "name":"myVariable",
     "type":"string",
     "value":"myValue"
}
```

Where:

-   **name** - Name of the variable

-   **type** - Type of variable, such as string

-   **value** - Value of the variable


To update a single variable in a process instance:

```
PUT api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

To get a single variable in a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

To get all process instance variables:

```
GET api/enterprise/process-instances/{processInstanceId}/variables
```

To get a specific process instance variable:

```
GET api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

To delete a specific process instance variable:

```
DELETE api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

