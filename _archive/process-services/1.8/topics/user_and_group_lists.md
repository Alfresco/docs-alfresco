# User and Group lists

A common use case is when a user wants to select another user or group, for example, when assigning a task.

To retrieve users:

```
GET api/enterprise/users
```

Use the following parameters:

-   `filter`: Filters by the user’s first and last name.

-   `email`: Retrieves users by email

-   `externalId`: Retrieves users by their external ID.

-   `externalIdCaseInsensitive`: Retrieves users by external ID, ignoring case.

-   `externalId`: Retrieves users by their external ID \(set by the LDAP sync, if used\)

-   `excludeTaskId`: Excludes users that are already part of this task.

-   `excludeProcessId`: Excludes users that are already part of this process instance.


**Example response:**

```
{
        "size": 2,
        "total": 2,
        "start": 0,
        "data": [
                {
                        "id": 1,
                        "firstName": null,
                        "lastName": "Administrator",
                        "email": "admin@app.activiti.com"
                },
                {
                        "id": 1000,
                        "firstName": "John",
                        "lastName": "Doe",
                        "email": "johndoe@alfresco.com"
                }
        ]
}
```

To retrieve a picture of a user:

```
GET api/enterprise/users/{userId}/picture
```

To retrieve groups:

```
GET api/enterprise/groups
```

with optional parameter `filter` that filters by group name.

Additional options:

-   `externalId`: Retrieves a group by their external ID.

-   `externalIdCaseInsensitive`: Retrieves a group by their external ID, ignoring case.


**Example response:**

```
{
     "size": 2,
     "total": 2,
     "data": [
          {
               "externalId": null,
               "name": "Engineering",
               "id": 2000
          },
          {
               "externalId": null,
               "name": "Marketing",
               "id": 2001
          }
     ],
     "start": 0
}
```

Get the users for a given group:

```
GET api/enterprise/groups/{groupId}/users
```

**Example response:**

```
{
     "size": 3,
     "total": 3,
     "data": [
          {
               "email": "john@alfresco.com",
               "lastName": "Test",
               "firstName": "John",
               "id": 10
          },
          {
               "email": "mary@alfresco.com",
               "lastName": "Test",
               "firstName": "Mary",
               "id": 8
          },
          {
               "email": "patrick@alfresco.com",
               "lastName": "Test",
               "firstName": "Patrick",
               "id": 9
          }
     ],
     "start": 0
}
```

With a json body that contains:

-   `order` : An array of user task filter IDs


**Parent topic:**[Historic processes and tasks](../topics/history.md)

