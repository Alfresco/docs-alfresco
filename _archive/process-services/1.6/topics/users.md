# Users

Following REST endpoints are **only available for users that are either a tenant admin or a tenant manager**.

Get a list of users:

```
GET api/enterprise/admin/users
```

with parameters

-   `filter` : Filters by user name.

-   `status` : Possible values are `pending`, `inactive`, `active`, `deleted`.

-   `sort` : Possible values are `createdAsc`, `createdDesc`, `emailAsc` or `emailDesc` \(default `createdAsc`\).

-   `start` : Used for paging.

-   `size` : Use for paging.


To create a new user:

```
POST api/enterprise/admin/users
```

with a json body that **must** have following properties:

-   email

-   firstName

-   lastName

-   password

-   status \(possible values are `pending`, `inactive`, `active`, `deleted`\)

-   type \(enterprise or trial. Best to set this to enterprise\)

-   tenantId


Update user details:

```
PUT api/enterprise/admin/users/{userId}
```

with a json body containing `email`, `firstName` and `lastName`

Update user password:

```
PUT api/enterprise/admin/users
```

with a json body like

```
{
        "users" : [1098, 2045, 3049]
        "password" : "123"
}
```

Note that the `users` property is an array of user ids. This allows for bulk changes.

Update user status:

```
PUT api/enterprise/admin/users
```

with a json body like

```
{
        "users" : [1098, 2045, 3049]
        "status" : "inactive"
}
```

Note that the `users` property is an array of user ids. This allows for bulk changes.

Update user tenant id \(only possible for \_tenant manager\):

```
PUT api/enterprise/admin/users
```

with a json body like

```
{
        "users" : [1098, 2045, 3049]
        "tenantId" : 1073
}
```

Note that the `users` property is an array of user ids. This allows for bulk changes.

**Parent topic:**[Identity Management](../topics/identity_management.md)

