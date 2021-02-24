# Tenants

Following REST endpoints are **only available for users that are either a tenant admin or a tenant manager**.

Get all tenants \(tenant manager only\):

```
GET api/enterprise/admin/tenants
```

Create a new tenant \(tenant manager only\):

```
POST api/enterprise/admin/tenants
```

the json body of this post contains two properties: `name` and `active` \(boolean\).

Update a tenant:

```
PUT api/enterprise/admin/tenants/{tenantId}
```

the json body of this post contains two properties: `name` and `active` \(boolean\).

Get tenant details:

```
GET api/enterprise/admin/tenants/{tenantId}
```

Delete a tenant:

```
DELETE api/enterprise/admin/tenants/{tenantId}
```

Get tenant events:

```
GET api/enterprise/admin/tenants/{tenantId}/events
```

Get tenant logo:

```
GET api/enterprise/admin/tenants/{tenantId}/logo
```

Change tenant logo:

```
POST api/enterprise/admin/tenants/{tenantId}/logo
```

where the body is a multi part file.

**Note:** The *Create a new tenant* and *Delete a tenant* endpoints are not available where you have installed a *single-tenant* license.

**Parent topic:**[Identity Management](../topics/identity_management.md)

