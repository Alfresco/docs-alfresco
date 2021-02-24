---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Delete an audit entry \(log\) for an audit application

Delete a single audit entry \(log\) for an audit application.

|API Call|DELETE /audit-applications/\{id\}/audit-entries/\{auditEntryId\}|
|--------|----------------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/deleteAuditEntry](http://localhost:8080/api-explorer/#!/audit/deleteAuditEntry)|
|See also|[Delete multiple audit entries for an app](dev-api-by-language-alf-rest-manage-audit-apps-delete-audit-entries-for-app.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To delete an audit entry for an audit application you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To delete an audit entry \(log\) from an audit app the following DELETE call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/\{id\}/audit-entries/\{auditEntryId\}**

The audit application that you want to delete the audit entry from is identified with the `id` parameter. The audit entry that you want to delete is idenfied with the `auditEntryId`.

To demonstrate deleting a single audit entry we will fetch a few audit entries for a file node and then delete one of them.

Here is how to get all audit entries for a text file with Node id `f0587f6b-f6ec-44ed-a7d2-db18865fd1db`:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/f0587f6b-f6ec-44ed-a7d2-db18865fd1db/audit-entries' | jq  
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   586    0   586    0     0  14650      0 --:--:-- --:--:-- --:--:-- 14650
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
          "createdAt": "2020-01-02T13:29:09.671+0000",
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "auditApplicationId": "alfresco-access",
          "id": 26
        }
      },
      {
        "entry": {
          "createdAt": "2020-01-02T14:09:21.862+0000",
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "auditApplicationId": "alfresco-access",
          "id": 51
        }
      },
      {
        "entry": {
          "createdAt": "2020-01-02T14:09:29.018+0000",
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "auditApplicationId": "alfresco-access",
          "id": 52
        }
      }
    ]
  }
}
```

To delete the audit entry with the id `26` from the audit application with id `alfresco-access` use the following DELETE call:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries/26' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
```

To verify that the audit entry has indeed been deleted we can get all the audit entries for the node again:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/f0587f6b-f6ec-44ed-a7d2-db18865fd1db/audit-entries' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   428    0   428    0     0   8230      0 --:--:-- --:--:-- --:--:--  8230
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
          "createdAt": "2020-01-02T14:09:21.862+0000",
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "auditApplicationId": "alfresco-access",
          "id": 51
        }
      },
      {
        "entry": {
          "createdAt": "2020-01-02T14:09:29.018+0000",
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "auditApplicationId": "alfresco-access",
          "id": 52
        }
      }
    ]
  }
}
```

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

