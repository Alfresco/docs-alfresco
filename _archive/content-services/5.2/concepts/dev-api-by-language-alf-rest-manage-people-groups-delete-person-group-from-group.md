---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Delete a person or group from a group

Deleting a person or group from a group in the repository.

|API Call|DELETE /groups/\{id\}/members/\{id\}|
|--------|------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/groups/deleteGroupMembership](http://localhost:8080/api-explorer/#!/groups/deleteGroupMembership)|
|See also|[How to add a person or group to a group](dev-api-by-language-alf-rest-manage-people-groups-add-person-group-to-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To delete a group membership you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To remove a group or a user from a group the following DELETE call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/\{groupId\}/members/\{memberId\}**

The group that you want to remove the membership from is identified with the `groupId` parameter. The membership \(i.e. user or group\) that you want to remove is idenfied with the `memberId`.

To remove a user with id `test` from a group with id `engineering` use the following DELETE call:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members/test' | jq
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                  Dload  Upload   Total   Spent    Left  Speed
   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
```

Note that you always have to prefix group identifiers with `GROUP_`.

To remove a group with id `system-architects` from a group with id `engineering` use the following call:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members/GROUP_system-architects' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
```

Let's double check that the user and group really has been removed from the Engineering group, we can use the **GET /groups/\{group id\}/members** call for that:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering/members' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   113    0   113    0     0    342      0 --:--:-- --:--:-- --:--:--   342
{
  "list": {
    "pagination": {
      "count": 0,
      "hasMoreItems": false,
      "totalItems": 0,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": []
  }
}
```

The Engineering group is empty as the user and group we removed were the only members.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

