# Start Process Instance

To start process instances, use:

```
POST api/enterprise/process-instances
```

With a json body that contains following properties:

-   `processDefinitionId`: The process definition identifier. Do not use it with processDefinitionKey.

-   `processDefinitionKey`: The process definition key. Do not use it with `processDefinitionId`.

-   `name`: The name to give to the created process instance.

-   `values`: A JSON object with the form field Id and form field values. The Id of the form field is retrieved from the start form call \(see above\).

-   `outcome`: If the start form has outcomes, this is one of those values.

-   `variables`: Contains a JSON array of variables. Values and outcomes can’t be used with variables.


The response will contain the process instance details including the ID.

Once started, the completed form \(if defined\) can be fetched using:

```
GET /enterprise/process-instances/{processInstanceId}/start-form
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

