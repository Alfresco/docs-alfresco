---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get audit application metadata

Get the metadata \(i.e. properties\) for an audit application in the repository.

|API Call|GET /audit-applications/\{id\}|
|--------|------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/getAuditApp](http://localhost:8080/api-explorer/#!/audit/getAuditApp)|
|See also|[How to list audit applications](dev-api-by-language-alf-rest-manage-audit-apps-list-apps.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To get metadata for an audit application you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

Getting the metadata \(i.e. properties\) for an audit application is done with the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/\{id\}**

The identifier for the audit application we want to get metadata for is specified with the `{id}` parameter.

To get metadata for an audit application with id `alfresco-access` make the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    76    0    76    0     0   4222      0 --:--:-- --:--:-- --:--:--  4222
{
  "entry": {
    "isEnabled": true,
    "name": "alfresco-access",
    "id": "alfresco-access"
  }
}
```

As usual, the `fields` parameter can be used to return more or less data. If we wanted to only return info about if the audit application is enabled or not, then we could set `fields=isEnabled` as in the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access?fields=isEnabled' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    28    0    28    0     0    848      0 --:--:-- --:--:-- --:--:--   848
{
  "entry": {
    "isEnabled": true
  }
}
```

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

