# Process Engine REST API

The Process Engine REST API is a supported equivalent of the Activiti Open Source API. This means that all operations described in the [Activiti User Guide](http://activiti.org/userguide/index.html#_rest_api) are available as documented there, except for REST endpoints that are not relevant for the enterprise product \(for example, forms, as they are implemented differently\).

This REST API is available on `<your-server-and-context-root>/api/`

For example, fetching process definitions is described as an HTTP GET on `repository/process-definitions`. This maps to:

```
<your-server-and-context-root>/api/repository/process-definitions
```

**Note:** You can control access to the Engine API using the “Access the Activiti REST API” capability \(Identity Management -\> Capabilities\). This matches the Activiti Engine \(Java\) API, which is agnostic of user permissions. This means that when calling any of the operations, the tenant identifier must **always be provided in the url**, even if the system does not have multitenancy \(there will always be one tenant in that case\):

For example `<your-server-and-context-root>/api/repository/process-definitions?tenantId=tenant_1`

**Parent topic:**[REST API](../topics/rest_api.md)

