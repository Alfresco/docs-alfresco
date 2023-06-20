---
title: Managing Audit Applications and Logs
---

This section walks through how to manage audit applications and their audit logs via the ReST API.

Audit logging is not enabled by default, but when it is enabled it is essential to be able to manage audit applications 
and their logs.

The ReST API supports listing audit applications, listing audit entries (logs), deleting audit entries etc.

If you are not familiar with audit logging in ACS, then have a look at this [page]({% link content-services/7.2/admin/audit.md %}).

## Enable auditing and Alfresco Access audit application {#enableauditing}

Enable auditing in Alfresco repo and enable the out-of-the-box preconfigured "Alfresco Access" Audit Application.

This section has a lot of examples where the "Alfresco Access" audit application has been enabled. So in order to get a 
better feeling for how the Audit ReST API works, it make sense to enable this audit application before moving on with 
the examples in this section.

This [page]({% link content-services/7.2/admin/audit.md %}#enableauditing) has all the info you need to enable this 
audit application.

## List audit applications {#listauditapps}

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/listAuditApps](http://localhost:8080/api-explorer/#!/audit/listAuditApps){:target="_blank"}

**See also:** [How to list audit entries (logs) for an application](#listauditlogsforapp)

To list audit applications you must have admin rights. What this means is that the user that is making the ReST call must 
be a member of the `ALFRESCO_ADMINISTRATORS` group.

To list audit applications use the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications`

Here is how to make the call:

```bash
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

In this case the repository has two audit applications enabled. We can see that they are enabled by looking at the 
`isEnabled` property.

When we want to get more data for a specific audit application we will use the `id`.

As in many other endpoints you can use the `fields` parameter to specify what properties you want returned per entry.

If we wanted to return only the audit app identifier, then we could set `fields=id` as follows:

```bash
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

## Get audit application metadata {#getauditappmetadata}

Get the metadata (i.e. properties) for an audit application in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/getAuditApp](http://localhost:8080/api-explorer/#!/audit/getAuditApp){:target="_blank"}

**See also:** [How to list audit applications](#listauditapps)

To get metadata for an audit application you must have admin rights. What this means is that the user that is making the 
ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

Getting the metadata (i.e. properties) for an audit application is done with the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/{id}`

The identifier for the audit application we want to get metadata for is specified with the `{id}` parameter.

To get metadata for an audit application with id `alfresco-access` make the following call:

```bash
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

As usual, the `fields` parameter can be used to return more or less data. If we wanted to only return info about if the 
audit application is enabled or not, then we could set `fields=isEnabled` as in the following call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access?fields=isEnabled' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    28    0    28    0     0    848      0 --:--:-- --:--:-- --:--:-* 848
{
  "entry": {
    "isEnabled": true
  }
}
```

## Enable/Disable an audit application {#enabledisableapp}

Enabling and disabling an audit application in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/updateAuditApp](http://localhost:8080/api-explorer/#!/audit/updateAuditApp){:target="_blank"}

To update an audit application you must have admin rights. What this means is that the user that is making the ReST call 
must be a member of the `ALFRESCO_ADMINISTRATORS` group.

It’s possible to update the audit app's `isEnabled` property. Use the following PUT call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/{id}`

The identifier for the audit app to be updated is specified with the `{id}` parameter.

The body for an audit app update call looks like this:

```json
{
    "isEnabled": [true | false]
}
```

To disable an audit application with the id `alfresco-access` make the following call:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "isEnabled": false }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    99    0    77  100    22   1327    379 --:--:-- --:--:-- --:--:--  1706
{
  "entry": {
    "isEnabled": false,
    "name": "alfresco-access",
    "id": "alfresco-access"
  }
}
```

The response shows that the audit app has indeed been disabled.

New audit entries (logs) will not be created for a disabled audit application until it's re-enabled (and system-wide 
auditing is also enabled).

Note, it's still possible to query and/or delete any existing audit entries (logs) even if auditing is disabled for the 
audit application.

## List audit entries (logs) for an audit application {#listauditlogsforapp}

List audit entries for an audit application in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/listAuditEntriesForAuditApp](http://localhost:8080/api-explorer/#!/audit/listAuditEntriesForAuditApp){:target="_blank"}

**See also:** 

* [How to list all audit apps](#listauditapps) 
* [How to list audit entries for a node, such as folder or file](#listauditlogsnode)

To list audit entries you must have admin rights. What this means is that the user that is making the ReST call must be 
a member of the `ALFRESCO_ADMINISTRATORS` group.

To list all audit entries (logs) for an audit application use the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/{id}/audit-entries`

The `id` parameter is the audit app identifier.

For example, to list all audit entries (logs) for an audit application with the identifier `alfresco-access` the 
following call can be used:

```bash
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

The response contains a high level view of the audit entries that have been created for the audit app. However, it doesn't 
show you any detailed information about what operation that was performed. Was there a login, logout, file created, 
folder created etc?

We can get more detailed audit log entry information by using the `include` parameter and setting it to `include=values`.

Here is the call again with more info returned:

```bash
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

Now we get a much better idea of what has been going on in the repository. Who has been accessing it and when (login, 
logout) and what content that was read. We can also see that a file was created by user martin.

It's also possible to fetch logs for a certain time period. Let's say we just wanted logs between 2019-12-20T09:00:00 
and 2019-12-20T10:00:00, we can achieve this by using the `where` clause and the `BETWEEN` keyword. The `where` clause 
would look like `where=(createdAt BETWEEN ('2019-12-20T09:00:00.000+0000','2019-12-20T10:00:00.000+0000'))` for our 
example. We can see that the date and time format matches the response above, where the created date has been returned 
in the same format (e.g. `"createdAt": "2019-12-20T11:53:25.534+0000"`). It's possible to specify the date and time in 
other formats too, the following works: `'2019-12-20T09:00:00.000+00:00','2019-12-20T10:00:00.000+00:00' and '2019-12-20T09:00:00.000Z','2019-12-20T10:00:00.000Z'`.

Here is the call to demonstrate this:

```bash
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

A few things to note here when using **curl** to make this call. Because the date and time format uses single quotes 
(') the whole URL string needs to be enclosed with double quotes (") and the `where` clause need to be encoded.

## List audit entries (logs) for a node {#listauditlogsnode}

List all the audit entries (logs) for a node, such as a folder or file.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/listAuditEntriesForNode](http://localhost:8080/api-explorer/#!/audit/listAuditEntriesForNode){:target="_blank"}

**See also:** [How to list audit entries (logs) for an audit app](#listauditlogsforapp)

Sometimes you need to list audit entries for a single node, such as a folder or a file. Most other audit log endpoints 
requires the caller to be an admin. Not in this case though, the user just need to have access to the node.

The following GET call is used for this:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/audit-entries`

The identifier for the node we want to list audit entries (logs) for is specified with the `{id}` parameter.

Here is how to get all audit entries for a text file with Node id `f0587f6b-f6ec-44ed-a7d2-db18865fd1db`:

```bash
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

The response contains a high level view of the audit entries that have been created for the node, which in this case is 
a text file. However, it doesn't show you any detailed information about what operation(s) that was performed on the file. 
Was the file just created, updated, or what?

We can get more detailed audit log entry information by using the `include` parameter and setting it to `include=values`.

Here is the call again with more info returned:

```bash
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

Now we get a much better idea of what has been going on with the file. It was first created by user **test**, then read 
by user **test**, and finally updated by user **test**.

It's also possible to fetch logs for a certain time period. Let's say we just wanted logs for the text file after 
2020-01-02 14:00:00, we can achieve this by using the `where` clause and the `BETWEEN` keyword. The `where` clause would 
look like `where=(createdAt BETWEEN ('2020-01-02T14:00:00.000+0000','2020-01-29T00:00:00.000+0000'))` for our example. 
We can see that the date and time format matches the response above, where the created date has been returned in the same 
format (e.g. `"createdAt": "2020-01-02T14:09:29.018+0000"`). It's possible to specify the date and time in other formats too, 
the following works: `'2020-01-02T14:00:00.000+00:00','2020-01-29T00:00:00.000+00:00' and '2020-01-02T14:00:00.000Z','2020-01-29T00:00:00.000Z'`.

Here is the call to demonstrate this:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/f0587f6b-f6ec-44ed-a7d2-db18865fd1db/audit-entries?where=(createdAt%20BETWEEN%20('2020-01-02T14%3A00%3A00.000%2B0000'%2C'2020-01-29T00%3A00%3A00.000%2B0000'))" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   428    0   428    0     0    160      0 --:--:--  0:00:02 --:--:-* 160
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

A few things to note here when using **curl** to make this call. Because the date and time format uses single quotes (') 
the whole URL string needs to be enclosed with double quotes (") and the `where` clause need to be encoded.

## Get an audit entry (log) {#getauditentry}

Get the metadata (i.e. properties) for an audit entry (i.e. log) in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/getAuditEntry](http://localhost:8080/api-explorer/#!/audit/getAuditEntry){:target="_blank"}

To get metadata for an audit entry you must have admin rights. What this means is that the user that is making the
ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

Getting the metadata (i.e. properties) for an audit entry is done with the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/{id}/audit-entries/{entryId}`

The identifier for the audit application we want to get metadata for is specified with the `{id}` parameter, and the 
audit entry is specified with the `{entryId}` parameter.

## Delete audit entries (logs) for an audit application {#deletemultipleauditentries}

Permanently delete audit entries (logs) for an audit application.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/deleteAuditEntriesForAuditApp](http://localhost:8080/api-explorer/#!/audit/deleteAuditEntriesForAuditApp){:target="_blank"}

**See also:** [How to delete a single audit entry (log) for an app](#deletesingleentry)

To permanently delete audit entries for an audit application you must have admin rights. What this means is that the 
user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To delete audit entries the following DELETE call is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/{id}/audit-entries?where=(datetime range or id range)`

The audit application that you want to delete audit entries from is identified with the `id` parameter.

It's mandatory to specify a `where` clause with a date and time range or an audit entry id range. This range is inclusive.

To demonstrate deleting audit entries we will work with the `alfresco-access` audit application and a number of 
audit entries (logs) in a specific time range.

In this example we just want logs between 2019-12-20T09:00:00 and 2019-12-20T10:00:00, we can achieve this by using the 
`where` clause and the `BETWEEN` keyword. The `where` clause would look like `where=(createdAt BETWEEN ('2019-12-20T09:00:00.000+0000','2019-12-20T10:00:00.000+0000'))` 
for our example.

Here is the call to get these logs, so we know how many that would be deleted:

```bash
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

We got 3 log entries back and if we use the same date and time range when deleting, then these are the logs that will 
be removed permanently. A few things to note here when using **curl** to make this call. Because the date and time format 
uses single quotes (') the whole URL string needs to be enclosed with double quotes (") and the `where` clause need to be encoded.

To delete log entries permanently that matches the 2019-12-20T09:00:00 and 2019-12-20T10:00:00 time range for the 
`alfresco-access` audit application use the following DELETE call:

```bash
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries?where=(createdAt%20BETWEEN%20('2019-12-20T09%3A00%3A00.000%2B0000'%2C'2019-12-20T10%3A00%3A00.000%2B0000'))" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:-*   0
```

To check that the entries are indeed deleted we can try and get them again:

```bash
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

We can also remove audit entries for an audit application using audit entries id ranges. The above audit entries we 
just deleted using a date and time range could also have been deleted using the following where clause: 
`where=(id BETWEEN ('1', '3'))`. Both the date and time range and the id range are inclusive.

## Delete an audit entry (log) for an audit application {#deletesingleentry}

Delete a single audit entry (log) for an audit application.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/audit/deleteAuditEntry](http://localhost:8080/api-explorer/#!/audit/deleteAuditEntry){:target="_blank"}

**See also:** [Delete multiple audit entries for an app](#deletemultipleauditentries)

To delete an audit entry for an audit application you must have admin rights. What this means is that the user that is 
making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

To delete an audit entry (log) from an audit app the following DELETE call is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/{id}/audit-entries/{auditEntryId}`

The audit application that you want to delete the audit entry from is identified with the `id` parameter. The audit 
entry that you want to delete is identified with the `auditEntryId`.

To demonstrate deleting a single audit entry we will fetch a few audit entries for a file node and then delete one of them.

Here is how to get all audit entries for a text file with Node id `f0587f6b-f6ec-44ed-a7d2-db18865fd1db`:

```bash
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

```bash
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access/audit-entries/26' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:-*   0
```

To verify that the audit entry has indeed been deleted we can get all the audit entries for the node again:

```bash
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


