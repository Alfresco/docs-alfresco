# Process Definitions

Get a list of process definitions \(visible within the tenant of the user\):

```
GET api/enterprise/process-definitions
```

**Example response:**

```
{
     "size": 5,
     "total": 5,
     "data": [
          {
                                "id": "demoprocess:1:7504",
                                "name": "Demo process",
                                "description": null,
                                "key": "demoprocess",
                                "category": "http://www.activiti.org/test",
                                "version": 1,
                                "deploymentId": "7501",
                                "tenantId": "tenant_1",
                                "hasStartForm": true
                  },
          ...
     ],
     "start": 0
}
```

Following parameters are available:

-   `latest`: A boolean value, indicating that only the latest versions of process definitions must be returned.

-   `appDefinitionId`: Returns process definitions that belong to a certain app.


To get the candidate starters associated to a process definition:

```
GET api/enterprise/process-definitions/{processDefinitionId}/identitylinks/{family}/{identityId}
```

Where:

-   `processDefinitionId`: The ID of the process definition to get the identity links for.

-   `family`: Indicates groups or users, depending on the type of identity link.

-   `identityId`: The ID of the identity.


To add a candidate starter to a process definition:

```
POST api/enterprise/process-definitions/{processDefinitionId}/identitylinks
```

**Request body \(user\)**:

```
{
    "user" : "1"
}
```

**Request body \(group\)**:

```
{
    "group" : "1001"
}
```

To delete a candidate starter from a process definition:

```
DELETE api/enterprise/process-definitions/{processDefinitionId}/identitylinks/{family}/{identityId}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

