---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List audit entries \(logs\) for a node

List all the audit entries \(logs\) for a node, such as a folder or file.

|API Call|GET /nodes/\{id\}/audit-entries|
|--------|-------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/listAuditEntriesForNode](http://localhost:8080/api-explorer/#!/audit/listAuditEntriesForNode)|
|See also|[How to list audit entries \(logs\) for an audit app](dev-api-by-language-alf-rest-manage-audit-apps-list-audit-entries-for-app.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Sometimes you need to list audit entries for a single node, such as a folder or a file. Most other audit log endpoints requires the caller to be an admin. Not in this case though, the user just need to have access to the node.

The following GET call is used for this:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/audit-entries**

The identifier for the node we want to list audit entries \(logs\) for is specified with the `{id}` parameter.

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

The response contains a high level view of the audit entries that have been created for the node, which in this case is a text file. However, it doesn't show you any detailed information about what operation\(s\) that was performed on the file. Was the file just created, updated, or what?

We can get more detailed audit log entry information by using the `include` parameter and setting it to `include=values`.

Here is the call again with more info returned:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/f0587f6b-f6ec-44ed-a7d2-db18865fd1db/audit-entries?include=values' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  4143    0  4143    0     0  60926      0 --:--:-- --:--:-- --:--:-- 61835
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
          "values": {
            "/alfresco-access/transaction/sub-actions": "createNode updateNodeProperties createContent updateContent addNodeAspect",
            "/alfresco-access/transaction/aspects/add": [
              {
                "namespaceURI": "http://www.alfresco.org/model/content/1.0",
                "localName": "titled",
                "prefixString": "titled"
              },
              {
                "namespaceURI": "http://www.alfresco.org/model/application/1.0",
                "localName": "inlineeditable",
                "prefixString": "inlineeditable"
              }
            ],
            "/alfresco-access/transaction/path": "/app:company_home/app:user_homes/cm:test/cm:somefile.txt",
            "/alfresco-access/transaction/action": "CREATE",
            "/alfresco-access/transaction/properties/add": {
              "{http://www.alfresco.org/model/content/1.0}created": "2020-01-02T13:29:09.409+0000",
              "{http://www.alfresco.org/model/content/1.0}title": {
                "en": ""
              },
              "{http://www.alfresco.org/model/content/1.0}description": {
                "en": ""
              },
              "{http://www.alfresco.org/model/content/1.0}creator": "test",
              "{http://www.alfresco.org/model/system/1.0}node-uuid": "f0587f6b-f6ec-44ed-a7d2-db18865fd1db",
              "{http://www.alfresco.org/model/content/1.0}name": "somefile.txt",
              "{http://www.alfresco.org/model/system/1.0}store-protocol": "workspace",
              "{http://www.alfresco.org/model/content/1.0}content": {
                "contentUrl": "store://2020/1/2/13/29/a3c77bab-9a9d-490a-b85c-6b5f831d99a1.bin",
                "mimetype": "text/plain",
                "size": 9,
                "encoding": "UTF-8",
                "locale": "en_GB",
                "id": 325,
                "infoUrl": "contentUrl=store://2020/1/2/13/29/a3c77bab-9a9d-490a-b85c-6b5f831d99a1.bin|mimetype=text/plain|size=9|encoding=UTF-8|locale=en_GB_"
              },
              "{http://www.alfresco.org/model/system/1.0}store-identifier": "SpacesStore",
              "{http://www.alfresco.org/model/system/1.0}node-dbid": 975,
              "{http://www.alfresco.org/model/system/1.0}locale": "en_GB",
              "{http://www.alfresco.org/model/application/1.0}editInline": true,
              "{http://www.alfresco.org/model/content/1.0}modifier": "test",
              "{http://www.alfresco.org/model/content/1.0}modified": "2020-01-02T13:29:09.409+0000"
            },
            "/alfresco-access/transaction/type": "cm:content",
            "/alfresco-access/transaction/user": "test"
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
          "values": {
            "/alfresco-access/transaction/sub-actions": "readContent",
            "/alfresco-access/transaction/path": "/app:company_home/app:user_homes/cm:test/cm:somefile.txt",
            "/alfresco-access/transaction/action": "READ",
            "/alfresco-access/transaction/type": "cm:content",
            "/alfresco-access/transaction/user": "test"
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
          "values": {
            "/alfresco-access/transaction/sub-actions": "updateNodeProperties updateContent",
            "/alfresco-access/transaction/properties/from": {
              "{http://www.alfresco.org/model/content/1.0}content": {
                "contentUrl": "store://2020/1/2/13/29/a3c77bab-9a9d-490a-b85c-6b5f831d99a1.bin",
                "mimetype": "text/plain",
                "size": 9,
                "encoding": "UTF-8",
                "locale": "en_GB",
                "id": 325,
                "infoUrl": "contentUrl=store://2020/1/2/13/29/a3c77bab-9a9d-490a-b85c-6b5f831d99a1.bin|mimetype=text/plain|size=9|encoding=UTF-8|locale=en_GB_"
              },
              "{http://www.alfresco.org/model/content/1.0}modified": "2020-01-02T13:29:09.409+0000"
            },
            "/alfresco-access/transaction/properties/to": {
              "{http://www.alfresco.org/model/content/1.0}content": {
                "contentUrl": "store://2020/1/2/14/9/8cf7b50f-ce6a-4ce3-8d40-6324beca0f1e.bin",
                "mimetype": "text/plain",
                "size": 17,
                "encoding": "UTF-8",
                "locale": "en_GB",
                "id": 328,
                "infoUrl": "contentUrl=store://2020/1/2/14/9/8cf7b50f-ce6a-4ce3-8d40-6324beca0f1e.bin|mimetype=text/plain|size=17|encoding=UTF-8|locale=en_GB_"
              },
              "{http://www.alfresco.org/model/content/1.0}modified": "2020-01-02T14:09:28.975+0000"
            },
            "/alfresco-access/transaction/path": "/app:company_home/app:user_homes/cm:test/cm:somefile.txt",
            "/alfresco-access/transaction/action": "UPDATE CONTENT",
            "/alfresco-access/transaction/type": "cm:content",
            "/alfresco-access/transaction/user": "test"
          },
          "auditApplicationId": "alfresco-access",
          "id": 52
        }
      }
    ]
  }
}
```

Now we get a much better idea of what has been going on with the file. It was first created by user **test**, then read by user **test**, and finally updated by user **test**.

It's also possible to fetch logs for a certain time period. Let's say we just wanted logs for the text file after 2020-01-02 14:00:00, we can achieve this by using the `where` clause and the `BETWEEN` keyword. The `where` clause would look like `where=(createdAt BETWEEN ('2020-01-02T14:00:00.000+0000','2020-01-29T00:00:00.000+0000'))` for our example. We can see that the date and time format matches the response above, where the created date has been returned in the same format \(e.g. `"createdAt": "2020-01-02T14:09:29.018+0000"`\). It's possible to specify the date and time in other formats too, the following works: `'2020-01-02T14:00:00.000+00:00','2020-01-29T00:00:00.000+00:00' and '2020-01-02T14:00:00.000Z','2020-01-29T00:00:00.000Z'`.

Here is the call to demonstrate this:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/f0587f6b-f6ec-44ed-a7d2-db18865fd1db/audit-entries?where=(createdAt%20BETWEEN%20('2020-01-02T14%3A00%3A00.000%2B0000'%2C'2020-01-29T00%3A00%3A00.000%2B0000'))" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   428    0   428    0     0    160      0 --:--:--  0:00:02 --:--:--   160
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

Now we got only the 2 log entries back that matches the date range.

A few things to note here when using **curl** to make this call. Because the date and time format uses single quotes \('\) the whole URL string needs to be enclosed with double quotes \("\) and the `where` clause need to be encoded.

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

