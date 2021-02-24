---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Adding people and groups to a group

Adding members \(i.e. people or groups\) to a group in the repository.

|API Call|POST /groups/\{id\}/members|
|--------|---------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/createGroupMembership](http://localhost:8080/api-explorer/#!/groups/createGroupMembership)|
|See also|[How to create a group](dev-api-by-language-alf-rest-manage-people-groups-create-group.md) and [how to set permissions for a group](dev-api-by-language-alf-rest-manage-people-groups-set-permissions-for-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When you have a group, the next step is most likely to add people and other groups to it so they can work on behalf of the group's permissions. It's common to set permissions for groups on folders. Then you just add users to the group and they get the group's permissions on the folder.

To add a user or a group to a group we POST the following data:

```
{
     "id": "group or person identifier",
     "displayName": "name of the group or person",
     "memberType": "GROUP or PERSON"
}
```

This data is posted to the following URL:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/\{id\}/members**

The `id` parameter is the identifier of the group that the user or group that specified in the POST data should be added to.

Before we try this out let's add a person and two groups to use in an example.

Create a test user by POSTing the following body \(make sure that user id `test` doesn't already exist\):

```
{
  "id": "test",
  "firstName": "Test",
  "lastName": "User",
  "password": "test"
  "email": "test@alfresco.com"
}
```

to:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people**

The call looks like this \(you must be logged in as a user with admin rights for this to work\):

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "test", "firstName": "Test", "lastName": "User", "password": "test", "email": "test@alfresco.com"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   347    0   241  100   106    607    267 --:--:-- --:--:-- --:--:--   871
{
  "entry": {
    "firstName": "Test",
    "lastName": "User",
    "capabilities": {
      "isGuest": false,
      "isAdmin": false,
      "isMutable": true
    },
    "displayName": "Test User",
    "emailNotificationsEnabled": true,
    "company": {},
    "id": "test",
    "enabled": true,
    "email": "test@alfresco.com"
  }
}
```

Now create a group by POSTing the following body \(make sure that group id `engineering` doesn't already exist\):

```
{
   "id": "engineering",
   "displayName": "Engineering"
}
```

to:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups**

The call looks like this \(you must be logged in as a user with admin rights for this to work\):

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "engineering", "displayName": "Engineering" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   131    0    78  100    53   1098    746 --:--:-- --:--:-- --:--:--  1819
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering",
    "id": "GROUP_engineering"
  }
}
```

The group id always starts with "GROUP\_". If this is omitted, as in this case, it will be added automatically. This format is also returned when listing groups or group memberships. It should be noted that the other group-related operations also expect the id to start with "GROUP\_".

Now add another group called "system-architects" that we will add as a member to the "engineering" group:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "system-architects", "displayName": "System Architects" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   155    0    90  100    65   1956   1413 --:--:-- --:--:-- --:--:--  3369
{
  "entry": {
    "isRoot": true,
    "displayName": "System Architects",
    "id": "GROUP_system-architects"
  }
}
```

We are now ready to add the "test" user and the "system-architects" group as members of the "engineering" group.

Let's start by adding the System Architects group to the Engineering group. This is what we need to POST:

```
{
     "id": "GROUP_system-architects",
     "displayName": "System Architects",
     "memberType": "GROUP"
}
```

Here is the call:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "GROUP_system-architects", "displayName": "System Architects", "memberType": "GROUP"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   190    0    97  100    93   1077   1033 --:--:-- --:--:-- --:--:--  2111
{
  "entry": {
    "displayName": "System Architects",
    "id": "GROUP_system-architects",
    "memberType": "GROUP"
  }
}
```

Note how the group identifier in the POST data and in the URL need to be prefixed with "GROUP\_".

Now, let's add the Test User user to the Engineering group, we need to POST this:

```
{
     "id": "test",
     "displayName": "Test user",
     "memberType": "PERSON"
}
```

Here is the call:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "test", "displayName": "Test user", "memberType": "PERSON"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   133    0    66  100    67   1157   1175 --:--:-- --:--:-- --:--:--  2333
{
  "entry": {
    "displayName": "test",
    "id": "test",
    "memberType": "PERSON"
  }
}
```

Let's double check that the user and group really has been added to the Engineering group, we can use the **GET /groups/\{group id\}/members** call for that:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   277    0   277    0     0    893      0 --:--:-- --:--:-- --:--:--   893
{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "displayName": "System Architects",
          "id": "GROUP_system-architects",
          "memberType": "GROUP"
        }
      },
      {
        "entry": {
          "displayName": "test",
          "id": "test",
          "memberType": "PERSON"
        }
      }
    ]
  }
}

```

When the Engineering group has been populated with users and groups we can start configuring folder and file permissions for it.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

