# Profile

This operation returns account information for the current user. This is useful to get the name, email, the groups that the user is part of, the user picture, and so on.

```
GET api/enterprise/profile
```

**Response:**

```
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
     "tenantName": "test",
     "lastName": "Doe",
     "id": 1000,
     "lastUpdate": "2015-01-08T13:34:22.273+0000",
     "email": "johndoe@alfresco.com",
     "status": "active",
     "fullname": "John Doe",
     "groups": [
          {
               "capabilities": null,
               "name": "analytics-users",
               "tenantId": 1,
               "users": null,
               "id": 1,
               "groups": null,
               "externalId": null,
               "status": "active",
               "lastSyncTimeStamp": null,
               "type": 0,
               "parentGroupId": null
          },
          {
               "capabilities": null,
               "name": "Engineering",
               "tenantId": 1,
               "users": null,
               "id": 2000,
               "groups": null,
               "externalId": null,
               "status": "active",
               "lastSyncTimeStamp": null,
               "type": 1,
               "parentGroupId": null
          },
          {
               "capabilities": null,
               "name": "Marketing",
               "tenantId": 1,
               "users": null,
               "id": 2001,
               "groups": null,
               "externalId": null,
               "status": "active",
               "lastSyncTimeStamp": null,
               "type": 1,
               "parentGroupId": null
          }
     ]
}
```

To update user information \(first name, last name or email\):

```
POST api/enterprise/profile
```

The body of the request should resemble the following text:

```
{
    "firstName" : "John",
    "lastName" : "Doe",
    "email" : "john@alfresco.com",
    "company" : "Alfresco"
}
```

To get the user picture, use following REST call:

```
GET api/enterprise/profile-picture
```

To change this picture, do an HTTP POST to the same URL, with the picture as multipart file in the body.

Finally, to change the password:

```
POST api/enterprise/profile-password
```

with a json body that looks like

```
{
    "oldPassword" : "12345",
    "newPassword" : "6789"
}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

