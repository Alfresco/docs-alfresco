---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Create a group

Creating a group in the repository.

|API Call|POST /groups|
|--------|------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/createGroup](http://localhost:8080/api-explorer/#!/groups/createGroup)|
|See also|[How to update a group](dev-api-by-language-alf-rest-manage-people-groups-update-group.md) and [how to add members to a group](dev-api-by-language-alf-rest-manage-people-groups-add-person-group-to-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To create a group you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

Creating a group is done with the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups**

The POST body for a group create call looks like this:

```
{
"entry": {
    "id": "string",
    "displayName": "string",
    "isRoot": true,
    "parentIds": [
        "string"
    ],
    "zones": [
        "string"
    ]
    }
}
```

You don't need to pass in all these properties. For example, to create a group called **Engineering** with id `engineering`, use the following POST body:

```
{
   "id": "engineering",
   "displayName": "Engineering"
}
```

The call looks like this:

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

The group id always starts with "GROUP\_". If this is omitted, as in this case, it will be added automatically. This format is also returned when listing groups or group memberships.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

