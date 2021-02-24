---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List groups a person is a member of

List all the groups that a person is a member of.

|API Call|GET /people/\{id\}/groups|
|--------|-------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/listGroupMembershipsForPerson](http://localhost:8080/api-explorer/#!/groups/listGroupMembershipsForPerson)|
|See also|[How to list all members \(people and groups\) of a group](dev-api-by-language-alf-rest-manage-people-groups-list-people-groups-in-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

You might know how to list members of a group but you can also list all groups that a person is a member of.

The following call is used for that:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{id\}/groups**

The identifier for the person we want to list group memberships for is specified with the `{id}` parameter.

Here is how to get all group memberships for a user with id `abeecher`:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/abeecher/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   350    0   350    0     0  12500      0 --:--:-- --:--:-- --:--:-- 12500
{
  "list": {
    "pagination": {
      "count": 3,
      "hasMoreItems": false,
      "totalItems": 3,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isRoot": false,
          "id": "GROUP_EVERYONE"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "site_swsdp",
          "id": "GROUP_site_swsdp"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteCollaborator",
          "id": "GROUP_site_swsdp_SiteCollaborator"
        }
      }
    ]
  }
}
```

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

