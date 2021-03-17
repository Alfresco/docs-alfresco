---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get an audit entry \(log\)

Get the metadata \(i.e. properties\) for a group in the repository.

|API Call|GET /groups/\{id\}|
|--------|------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/getGroup](http://localhost:8080/api-explorer/#!/groups/getGroup)|
|See also|[How to get the members \(people and groups\) of a group](dev-api-by-language-alf-rest-manage-people-groups-list-people-groups-in-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Getting the metadata \(i.e. properties\) for a group is done with the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/\{id\}**

The identifier for the group we want to get metadata for is specified with the `{id}` parameter.

To get metadata for a group with id `engineering` make the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    86    0    86    0     0  10750      0 --:--:-- --:--:-- --:--:-- 10750
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering UPDATED",
    "id": "GROUP_engineering"
  }
}
```

Note that the group `id` has to be prefixed with `GROUP_`.

The `include` parameter can be used to return `parentIds` and `zones`:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering?include=parentIds,zones' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   136    0   136    0     0  11333      0 --:--:-- --:--:-- --:--:-- 11333
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering UPDATED",
    "parentIds": [],
    "id": "GROUP_engineering",
    "zones": [
      "APP.DEFAULT",
      "AUTH.ALF"
    ]
  }
}
```

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

