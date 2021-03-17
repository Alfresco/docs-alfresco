---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List audit entries \(logs\) for an audit application

List audit entries for an audit application in the repository.

|API Call|GET /audit-applications/\{id\}/audit-entries|
|--------|--------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/listAuditEntriesForAuditApp](http://localhost:8080/api-explorer/#!/audit/listAuditEntriesForAuditApp)|
|See also|[How to list all audit apps](dev-api-by-language-alf-rest-manage-audit-apps-list-apps.md) [How to list audit entries for a node, such as folder or file](dev-api-by-language-alf-rest-manage-audit-apps-list-audit-entries-node.md)

|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To list audit entries you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To list all audit entries \(logs\) for an audit application use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/\{id\}/audit-entries**

The `id` parameter is the audit app identifier.

For example, to list all audit entries \(logs\) for an audit application with the identifier "alfresco-access" the following call can be used:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2403    0  2403    0     0  68657      0 --:--:-- --:--:-- --:--:-- 70676
{
  "list": {
    "pagination": {
      "count": 14,
      "hasMoreItems": false,
      "totalItems": 14,
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
      },
      {
        "entry": {
          "createdAt": "2019-12-20T10:01:01.475+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 4
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:13.567+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 5
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:13.681+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 6
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:13.860+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 7
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:20.310+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 8
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:23.755+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 9
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:29.067+0000",
          "createdByUser": {
            "id": "martin",
            "displayName": "Martin Bergljung"
          },
          "auditApplicationId": "alfresco-access",
          "id": 10
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:35:39.285+0000",
          "createdByUser": {
            "id": "martin",
            "displayName": "Martin Bergljung"
          },
          "auditApplicationId": "alfresco-access",
          "id": 11
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:36:30.698+0000",
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "auditApplicationId": "alfresco-access",
          "id": 12
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:52:45.670+0000",
          "createdByUser": {
            "id": "martin",
            "displayName": "Martin Bergljung"
          },
          "auditApplicationId": "alfresco-access",
          "id": 13
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-20T11:53:25.534+0000",
          "createdByUser": {
            "id": "martin",
            "displayName": "Martin Bergljung"
          },
          "auditApplicationId": "alfresco-access",
          "id": 14
        }
      }
    ]
  }
}
```

The response contains a high level view of the audit entries that have been created for the audit app. However, it doesn't show you any detailed information about what operation that was performed. Was there a login, logout, file created, folder created etc?

We can get more detailed audit log entry information by using the `include` parameter and setting it to `include=values`.

Here is the call again with more info returned:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries?include=values' | jq
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
100  6593    0  6593    0     0   109k      0 --:--:-- --:--:-- --:--:--  109k
{
 "list": {
   "pagination": {
     "count": 14,
     "hasMoreItems": false,
     "totalItems": 14,
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
         "values": {
           "/alfresco-access/transaction/sub-actions": "readContent",
           "/alfresco-access/transaction/path": "/app:company_home/app:dictionary/cm:webscripts/cm:org/cm:alfresco/cm:sample/cm:categorysearch.get.desc.xml",
           "/alfresco-access/transaction/action": "READ",
           "/alfresco-access/transaction/type": "cm:content",
           "/alfresco-access/transaction/user": "System"
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
         "values": {
           "/alfresco-access/transaction/sub-actions": "readContent",
           "/alfresco-access/transaction/path": "/app:company_home/app:dictionary/cm:webscripts/cm:org/cm:alfresco/cm:sample/cm:blogsearch.get.desc.xml",
           "/alfresco-access/transaction/action": "READ",
           "/alfresco-access/transaction/type": "cm:content",
           "/alfresco-access/transaction/user": "System"
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
         "values": {
           "/alfresco-access/transaction/sub-actions": "readContent",
           "/alfresco-access/transaction/path": "/app:company_home/app:dictionary/cm:webscripts/cm:org/cm:alfresco/cm:sample/cm:folder.get.desc.xml",
           "/alfresco-access/transaction/action": "READ",
           "/alfresco-access/transaction/type": "cm:content",
           "/alfresco-access/transaction/user": "System"
         },
         "auditApplicationId": "alfresco-access",
         "id": 3
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T10:01:01.475+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/login/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 4
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:13.567+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/login/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 5
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:13.681+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/transaction/sub-actions": "readContent",
           "/alfresco-access/transaction/path": "/sys:system/sys:people/cm:admin",
           "/alfresco-access/transaction/action": "READ",
           "/alfresco-access/transaction/type": "cm:person",
           "/alfresco-access/transaction/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 6
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:13.860+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/transaction/sub-actions": "readContent",
           "/alfresco-access/transaction/path": "/sys:system/sys:people/cm:admin",
           "/alfresco-access/transaction/action": "READ",
           "/alfresco-access/transaction/type": "cm:person",
           "/alfresco-access/transaction/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 7
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:20.310+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/transaction/sub-actions": "readContent",
           "/alfresco-access/transaction/path": "/sys:system/sys:people/cm:admin",
           "/alfresco-access/transaction/action": "READ",
           "/alfresco-access/transaction/type": "cm:person",
           "/alfresco-access/transaction/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 8
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:23.755+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/logout/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 9
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:29.067+0000",
         "createdByUser": {
           "id": "martin",
           "displayName": "Martin Bergljung"
         },
         "values": {
           "/alfresco-access/login/user": "martin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 10
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:35:39.285+0000",
         "createdByUser": {
           "id": "martin",
           "displayName": "Martin Bergljung"
         },
         "values": {
           "/alfresco-access/logout/user": "martin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 11
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:36:30.698+0000",
         "createdByUser": {
           "id": "admin",
           "displayName": "Administrator"
         },
         "values": {
           "/alfresco-access/login/user": "admin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 12
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:52:45.670+0000",
         "createdByUser": {
           "id": "martin",
           "displayName": "Martin Bergljung"
         },
         "values": {
           "/alfresco-access/login/user": "martin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 13
       }
     },
     {
       "entry": {
         "createdAt": "2019-12-20T11:53:25.534+0000",
         "createdByUser": {
           "id": "martin",
           "displayName": "Martin Bergljung"
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
           "/alfresco-access/transaction/path": "/app:company_home/app:user_homes/cm:martin/cm:Stuff/cm:more-todo.txt",
           "/alfresco-access/transaction/action": "CREATE",
           "/alfresco-access/transaction/properties/add": {
             "{http://www.alfresco.org/model/content/1.0}created": "2019-12-20T11:53:25.466+0000",
             "{http://www.alfresco.org/model/content/1.0}title": {
               "en": ""
             },
             "{http://www.alfresco.org/model/content/1.0}description": {
               "en": ""
             },
             "{http://www.alfresco.org/model/content/1.0}creator": "martin",
             "{http://www.alfresco.org/model/system/1.0}node-uuid": "4b0ea273-e4da-4e74-84a5-007dba3f83a0",
             "{http://www.alfresco.org/model/content/1.0}name": "more-todo.txt",
             "{http://www.alfresco.org/model/system/1.0}store-protocol": "workspace",
             "{http://www.alfresco.org/model/content/1.0}content": {
               "contentUrl": "store://2019/12/20/11/53/d2d9d598-8991-4980-a241-22c7e7fd83ae.bin",
               "mimetype": "text/plain",
               "size": 14,
               "encoding": "UTF-8",
               "locale": "en_GB",
               "id": 323,
               "infoUrl": "contentUrl=store://2019/12/20/11/53/d2d9d598-8991-4980-a241-22c7e7fd83ae.bin|mimetype=text/plain|size=14|encoding=UTF-8|locale=en_GB_"
             },
             "{http://www.alfresco.org/model/system/1.0}store-identifier": "SpacesStore",
             "{http://www.alfresco.org/model/system/1.0}node-dbid": 974,
             "{http://www.alfresco.org/model/system/1.0}locale": "en_GB",
             "{http://www.alfresco.org/model/application/1.0}editInline": true,
             "{http://www.alfresco.org/model/content/1.0}modifier": "martin",
             "{http://www.alfresco.org/model/content/1.0}modified": "2019-12-20T11:53:25.466+0000"
           },
           "/alfresco-access/transaction/type": "cm:content",
           "/alfresco-access/transaction/user": "martin"
         },
         "auditApplicationId": "alfresco-access",
         "id": 14
       }
     }
   ]
 }
}
```

Now we get a much better idea of what has been going on in the repository. Who has been accessing it and when \(login, logout\) and what content that was read. We can also see that a file was created by user martin.

It's also possible to fetch logs for a certain time period. Let's say we just wanted logs between 2019-12-20T09:00:00 and 2019-12-20T10:00:00, we can achieve this by using the `where` clause and the `BETWEEN` keyword. The `where` clause would look like `where=(createdAt BETWEEN ('2019-12-20T09:00:00.000+0000','2019-12-20T10:00:00.000+0000'))` for our example. We can see that the date and time format matches the response above, where the created date has been returned in the same format \(e.g. `"createdAt": "2019-12-20T11:53:25.534+0000"`\). It's possible to specify the date and time in other formats too, the following works: `'2019-12-20T09:00:00.000+00:00','2019-12-20T10:00:00.000+00:00' and '2019-12-20T09:00:00.000Z','2019-12-20T10:00:00.000Z'`.

Here is the call to demonstrate this:

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

Now we got only the 3 log entries back that matches the date range.

A few things to note here when using **curl** to make this call. Because the date and time format uses single quotes \('\) the whole URL string needs to be enclosed with double quotes \("\) and the `where` clause need to be encoded.

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

