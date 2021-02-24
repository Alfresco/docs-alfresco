---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List audit applications

List audit appplications.

|API Call|GET /audit-applications|
|--------|-----------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/listAuditApps](http://localhost:8080/api-explorer/#!/audit/listAuditApps)|
|See also|[How to list audit entries \(logs\) for an application.](dev-api-by-language-alf-rest-manage-audit-apps-list-audit-entries-for-app.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To list audit applications you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To list audit applications use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications**

Here is how to make the call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   267    0   267    0     0   3985      0 --:--:-- --:--:-- --:--:--  3926
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
          "isEnabled": true,
          "name": "Alfresco Tagging Service",
          "id": "tagging"
        }
      },
      {
        "entry": {
          "isEnabled": true,
          "name": "alfresco-access",
          "id": "alfresco-access"
        }
      }
    ]
  }
}
```

In this case the repository has two audit applications enabled. We can see that they are enabled by looking at the `isEnabled` property.

When we want to get more data for a specific audit application we will use the `id`.

As in many other endpoints you can use the `fields` parameter to specify what properties you want returned per entry.

If we wanted to return only the audit app identifier, then we could set `fields=id` as follows:

```
curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications?fields=id' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   174    0   174    0     0  10875      0 --:--:-- --:--:-- --:--:-- 10875
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
          "id": "tagging"
        }
      },
      {
        "entry": {
          "id": "alfresco-access"
        }
      }
    ]
  }
}
```

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

