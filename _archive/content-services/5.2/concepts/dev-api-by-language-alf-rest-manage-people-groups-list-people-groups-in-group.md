---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List all people and groups in a group

List all members \(people and groups\) of a group in the repository.

|API Call|GET /groups/\{id\}/members|
|--------|--------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/listGroupMemberships](http://localhost:8080/api-explorer/#!/groups/listGroupMemberships)|
|See also|[How to list all groups a person is a member of](dev-api-by-language-alf-rest-manage-people-groups-list-person-group-membership.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To list all groups and users that are members of a group use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/\{id\}/members**

The `id` parameter is the group identifier and it must be prefixed with `GROUP_`.

For example, to list all members of a group with identifier "engineering" the following call can be used:

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

You can use the `where` parameter to filter the return groups by `memberType`. To return only the members that are groups use the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members?where=(memberType='GROUP')" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   210    0   210    0     0    843      0 --:--:-- --:--:-- --:--:--   843
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
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
      }
    ]
  }
}
```

We can use this call to return all users that are members of a specific Alfresco Share site group. First we need to figure out the group identifier and then prefix it with `GROUP_`. For example, there is a default site in the repository with id `swsdp` and we can figure out the site groups based on the `site_{id}_[SiteCollaborator|SiteConsumer|SiteContributor|SiteManager]` template.

So, to see all users with manager access to the site we can get all members of the `site_swsdp_SiteManager` group, rember to prefix with `GROUP_`:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_site_swsdp_SiteManager/members' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   256    0   256    0     0  16000      0 --:--:-- --:--:-- --:--:-- 16000
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
          "displayName": "admin",
          "id": "admin",
          "memberType": "PERSON"
        }
      },
      {
        "entry": {
          "displayName": "mjackson",
          "id": "mjackson",
          "memberType": "PERSON"
        }
      }
    ]
  }
}
```

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

