---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Delete audit entries \(logs\) for an audit application

Permanently delete audit entries \(logs\) for an audit application.

|API Call|DELETE /audit-applications/\{id\}/audit-entries|
|--------|-----------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/deleteAuditEntriesForAuditApp](http://localhost:8080/api-explorer/#!/audit/deleteAuditEntriesForAuditApp)|
|See also|[How to delete a single audit entry \(log\) for an app](dev-api-by-language-alf-rest-manage-audit-apps-delete-audit-entry-for-app.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To permanently delete audit entries for an audit application you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To delete audit entries the following DELETE call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/\{id\}/audit-entries?where=\(datetime range or id range\)**

The audit application that you want to delete audit entries from is identified with the `id` parameter.

It's mandatory to specify a `where` clause with a date and time range or an audit entry id range. This range is inclusive.

To demonstrate deleting audit entries we will work with the `alfresco-access` audit application and a number of audit entried \(logs\) in a specific time range.

In this example we just want logs between 2019-12-20T09:00:00 and 2019-12-20T10:00:00, we can achieve this by using the `where` clause and the `BETWEEN` keyword. The `where` clause would look like `where=(createdAt BETWEEN ('2019-12-20T09:00:00.000+0000','2019-12-20T10:00:00.000+0000'))` for our example.

Here is the call to get these logs, so we know how many that would be deleted:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries?where=(createdAt%20BETWEEN%20('2019-12-20T09%3A00%3A00.000%2B0000'%2C'2019-12-20T10%3A00%3A00.000%2B0000'))" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   598    0   598    0     0  11074      0 --:--:-- --:--:-- --:--:-- 11074
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
          "createdAt": "2019-12-20T09:42:51.037+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 1
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T09:42:51.102+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 2
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T09:42:51.116+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 3
        }
      }
    ]
  }
}
```

We got 3 log entries back and if we use the same date and time range when deleting, then these are the logs that will be removed permanently. A few things to note here when using **curl** to make this call. Because the date and time format uses single quotes \('\) the whole URL string needs to be enclosed with double quotes \("\) and the `where` clause need to be encoded.

To delete log entries permanently that matches the 2019-12-20T09:00:00 and 2019-12-20T10:00:00 time range for the `alfresco-access` audit application use the following DELETE call:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries?where=(createdAt%20BETWEEN%20('2019-12-20T09%3A00%3A00.000%2B0000'%2C'2019-12-20T10%3A00%3A00.000%2B0000'))" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
```

To check that the entries are indeed deleted we can try and get them again:

```
curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzIwMTI2NTNhODU1MTFjYWUxNTFmMzM5M2MwMDdiZDYzZjA1NDE2NGM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries?where=(createdAt%20BETWEEN%20('2019-12-20T09%3A00%3A00.000%2B0000'%2C'2019-12-20T10%3A00%3A00.000%2B0000'))" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   113    0   113    0     0   6277      0 --:--:-- --:--:-- --:--:--  6277
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

We can also remove audit entries for an audit application using audit entries id ranges. The above audit entries we just deleted using a date and time range could also have been deleted using the following where clause: `where=(id BETWEEN ('1', '3')`. Both the date and time range and the id range are inclusive.

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

