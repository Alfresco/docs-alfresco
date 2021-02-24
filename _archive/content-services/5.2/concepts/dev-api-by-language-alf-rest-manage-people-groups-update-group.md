---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Update a group

Updating the metadata \(i.e. properties\) for a group in the repository.

|API Call|PUT /groups/\{id\}|
|--------|------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/updateGroup](http://localhost:8080/api-explorer/#!/groups/updateGroup)|
|See also|[How to create a group](dev-api-by-language-alf-rest-manage-people-groups-create-group.md) and [How to add members \(people and groups\) to a group](dev-api-by-language-alf-rest-manage-people-groups-add-person-group-to-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To update a group you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

It’s possible to update the group's `displayName`. Use the following PUT call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1//groups/\{id\}**

The identifier for the group to be updated is specified with the `{id}` parameter.

The body for a group update call looks like this:

```
{
    "displayName": "string"
}
```

To update the display name for a group with the id `engineering` make the following call:

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "displayName": "Engineering UPDATED" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   126    0    86  100    40   1755    816 --:--:-- --:--:-- --:--:--  2571
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering UPDATED",
    "id": "GROUP_engineering"
  }
}
```

Note that you have to prefix the group id with `GROUP_`.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

