# Groups

The following REST endpoints are **only available for users that are either a tenant admin or a tenant manager**.

Internally, there are two types of groups:

-   Functional groups: Map to organizational units.

-   System groups: Provide users capabilities. When you assign a capability to a group, every member of that group is assigned with the capability.


Get all groups:

```
GET api/enterprise/admin/groups
```

Optional parameters:

-   `tenantId` : Useful to a Tenant Manager user

-   `functional` \(boolean\): Only return functional groups if true


Get group details:

```
GET api/enterprise/admin/groups/{groupId}
```

**Example response:**

```
{
     "capabilities": [{
          "name": "access-reports",
          "id": 1
     }],
     "name": "analytics-users",
     "tenantId": 1,
     "users": [
          {
               "tenantId": 1,
               "firstName": null,
               "password": null,
               "type": "enterprise",
               "company": null,
               "externalId": null,
               "capabilities": null,
               "tenantPictureId": null,
               "created": "2015-01-08T08:30:25.164+0000",
               "pictureId": null,
               "latestSyncTimeStamp": null,
               "tenantName": null,
               "lastName": "Administrator",
               "id": 1,
               "lastUpdate": "2015-01-08T08:30:25.164+0000",
               "email": "admin@app.activiti.com",
               "fullname": " Administrator",
               "groups": null
          },
          {
               "tenantId": 1,
               "firstName": "John",
               "password": null,
               "type": "enterprise",
               "company": null,
               "externalId": null,
               "capabilities": null,
               "tenantPictureId": null,
               "created": "2015-01-08T13:22:36.198+0000",
               "pictureId": null,
               "latestSyncTimeStamp": null,
               "tenantName": null,
               "lastName": "Doe",
               "id": 1000,
               "lastUpdate": "2015-01-08T13:34:22.273+0000",
               "email": "johndoe@alfresco.com",
               "fullname": "John Doe",
               "groups": null
          }
     ],
     "id": 1,
     "groups": [],
     "externalId": null,
     "status": "active",
     "lastSyncTimeStamp": null,
     "type": 0,
     "parentGroupId": null
}
```

Use the optional request parameter `includeAllUsers` \(boolean value, by default true\) to avoid getting all the users at once \(not ideal if there are many users\).

Use the following call:

```
GET api/enterprise/admin/groups/{groupId}/users?page=2&pageSize=20
```

Create new group:

```
POST api/enterprise/admin/groups
```

Where the json body contains following properties:

-   `name`

-   `tenantId`

-   type \(0 for system group, 1 for functional group\)

-   `parentGroupId` \(only possible for functional groups. System groups can’t be nested\)


Update a group:

```
PUT api/enterprise/admin/groups/{groupId}
```

Only the `name` property can be in the json body.

Delete a group:

```
DELETE api/enterprise/admin/groups/{groupId}
```

Add a user to a group:

```
POST api/enterprise/admin/groups/{groupId}/members/{userId}
```

Delete a user from a group:

```
DELETE api/enterprise/admin/groups/{groupId}/members/{userId}
```

Get the list of possible capabilities for a system group:

```
GET api/enterprise/admin/groups/{groupId}/potential-capabilities
```

Add a capability from previous list to the group:

```
POST api/enterprise/admin/groups/{groupId}/capabilities
```

where the json body contains one property `capabilities` that is an array of strings.

Remove a capability from a group:

```
DELETE api/enterprise/admin/groups/{groupId}/capabilities/{groupCapabilityId}
```

**Parent topic:**[Identity Management](../topics/identity_management.md)

