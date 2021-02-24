# Task Identity links

To get all identity links for a task:

```
GET api/enterprise/tasks/{taskId}/identitylinks
```

To create an identity link on a task:

```
POST api/enterprise/tasks/{taskId}/identitylinks
```

**Example response**:

```
{
     "user": "1",
     "type": "customType"
}
```

To get a single identity link on a task:

```
GET api/enterprise/tasks/{taskId}/identitylinks/{family}/{identityId}/{type}
```

To delete an identity link on a task:

```
DELETE api/enterprise/tasks/{taskId}/identitylinks/{family}/{identityId}/{type}
```

Where:

-   `taskId`: The ID of the task.

-   `family`: Indicates either groups or users, depending on the type of identity.

-   `identityId`: The ID of the identity.

-   `type`: The type of identity link.


**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

