---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List groups

List groups in the repository.

|API Call|GET /groups|
|--------|-----------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/listGroups](http://localhost:8080/api-explorer/#!/groups/listGroups)|
|See also|[How to list members \(people and groups\) of a group.](dev-api-by-language-alf-rest-manage-people-groups-list-people-groups-in-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To list groups in the repository use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups**

Here is how to make the call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1321    0  1321    0     0   4316      0 --:--:-- --:--:-- --:--:--  4316
{
  "list": {
    "pagination": {
      "count": 12,
      "hasMoreItems": false,
      "totalItems": 12,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isRoot": true,
          "displayName": "Engineering UPDATED",
          "id": "GROUP_engineering"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_MODEL_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_MODEL_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_SEARCH_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_SEARCH_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "EMAIL_CONTRIBUTORS",
          "id": "GROUP_EMAIL_CONTRIBUTORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "SITE_ADMINISTRATORS",
          "id": "GROUP_SITE_ADMINISTRATORS"
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
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteConsumer",
          "id": "GROUP_site_swsdp_SiteConsumer"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteContributor",
          "id": "GROUP_site_swsdp_SiteContributor"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteManager",
          "id": "GROUP_site_swsdp_SiteManager"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "System Architects",
          "id": "GROUP_system-architects"
        }
      }
    ]
  }
}
```

This can return a lot of groups, by default it will return up to 100. Use the `maxItems` parameter to limit the number of groups returned:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups?fields=id&maxItems=5' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   351    0   351    0     0  23400      0 --:--:-- --:--:-- --:--:-- 23400
{
  "list": {
    "pagination": {
      "count": 5,
      "hasMoreItems": true,
      "totalItems": 12,
      "skipCount": 0,
      "maxItems": 5
    },
    "entries": [
      {
        "entry": {
          "id": "GROUP_engineering"
        }
      },
      {
        "entry": {
          "id": "GROUP_ALFRESCO_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "id": "GROUP_ALFRESCO_MODEL_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "id": "GROUP_ALFRESCO_SEARCH_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "id": "GROUP_EMAIL_CONTRIBUTORS"
        }
      }
    ]
  }
}
```

Here we have also used the `fields` parameter to only include the `id` property in the response.

You can also filter groups with the `where` clause, the `isRoot` and `zones` properties can be used. For example, to return only root groups use the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups?where=(isRoot=true)' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   799    0   799    0     0   7198      0 --:--:-- --:--:-- --:--:--  7198
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isRoot": true,
          "displayName": "Engineering UPDATED",
          "id": "GROUP_engineering"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_MODEL_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_MODEL_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_SEARCH_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_SEARCH_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "EMAIL_CONTRIBUTORS",
          "id": "GROUP_EMAIL_CONTRIBUTORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "SITE_ADMINISTRATORS",
          "id": "GROUP_SITE_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "site_swsdp",
          "id": "GROUP_site_swsdp"
        }
      }
    ]
  }
}
```

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

