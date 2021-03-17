---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List contents of a folder

Listing the contents of a folder in the repository is really useful, here we walk through several examples of how to do that.

|API Call|GET nodes/\{id\}/children|
|--------|-------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/listNodeChildren](http://localhost:8080/api-explorer/#!/nodes/listNodeChildren)|
|See also|[Filter contents of a folder](dev-api-by-language-alf-rest-list-children-root-folder-filter.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Listing the folders and files in the top folder of the repository is often something you often need to do to get an idea of what’s stored in the Repository. The top folder of the Repository is called **Company Home** and referred to as root.

The following URL is used to list children of the root folder and we pass in the authentication token:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2764  100  2764    0     0  38388      0 --:--:-- --:--:-- --:--:-- 38388
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:32.509+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:55.796+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "Data Dictionary",
          "id": "ec5e2242-e2cf-4fca-977c-f980efa289aa",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:32.799+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2019-01-14T14:59:30.806+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "Guest Home",
          "id": "18f06331-a7e2-450b-9951-4d27bc2597f9",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:32.874+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:32.874+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "Imap Attachments",
          "id": "676acc2b-e3aa-4509-a9f1-834459ff3418",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:32.885+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:32.885+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "IMAP Home",
          "id": "d067bfc2-f66f-4447-b636-53fe6ec95377",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:32.845+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:32.845+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "Shared",
          "id": "b6557d7e-a032-4da4-85cc-c26fa2c32b8b",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:35.908+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:53.593+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "Sites",
          "id": "0f972ddd-39e4-489d-a9b6-bc5741738634",
          "nodeType": "st:sites",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
      {
        "entry": {
          "createdAt": "2018-07-04T12:57:32.835+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:32.835+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "User Homes",
          "id": "f02a301d-db13-4fc2-b9e7-aa0bac9c6b1d",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      }
    ]
  }
}
```

If you are familiar with Alfresco, then you will recognize the folders that are returned in the response \(Data Dictionary, Guest Home etc\). The response format is standardized and you will see it used for other APIs that return a list of entities. First is a `pagination` object with information about the total number of items available and if any items were skipped. Then follows an array called `entries` with the actual content. Each content item \(in this case a folder or file\) is contained in an `entry` object.

The new v1 REST APIs are following a "performance first" principle, meaning by default, they only return the data that is the most performant to collect. More data can be requested but the client has to make a conscious decision to request more data and sacrifice a slight performance hit. We will see how to request more data back later in this section.

Let’s have a more detailed look at the URL and explain the different parts:

-   **http://localhost:8080/alfresco**: the ACS server we are talking to
-   **/api**: the Alfresco ReST API v1 is accessed
-   **/-default-**: the default tenant is accessed \(not usually changed unless you are running a multi tenant installation\)
-   **/public**: this is a supported public endpoint in the ReST API \(in contrast to an internal or custom API endpoint\)
-   **/alfresco**: the Core API is accessed
-   **/versions/1**: version 1 of the API is used
-   **/nodes**: working with the node entity, which represents things like folders and files
-   **/-root-**: specifically working with the top level folder node entity instance
-   **/children**: execute the children operation on the top level folder
-   **?skipCount=0**: return all nodes from beginning, don’t skip any
-   **&maxItems=100**: return max 100 nodes \(folders and files\)

There's a lot more stuff you can configure when making the `/nodes/{id}/children` call.

You might have noticed in the response that aspects \(also known as secondary types\) are not returned. To return aspects for each entry you have to use the `include` query parameter as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?include=aspectNames&skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3170  100  3170    0     0  11321      0 --:--:-- --:--:-- --:--:-- 11321
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "aspectNames": [
            "cm:titled",
            "cm:auditable",
            "app:uifacets"
          ],
          "createdAt": "2018-07-04T12:57:32.509+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:55.796+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "Data Dictionary",
          "id": "ec5e2242-e2cf-4fca-977c-f980efa289aa",
          "nodeType": "cm:folder",
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
...
```

Now we get an extra array called `aspectNames` for each `entry` with all the aspects that have been applied to the node. However, the properties for these aspects are not returned, such as `cm:title` for the `cm:titled` aspect. For the properties to be returned we need to add the `properties` value to the `include` parameter:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?include=aspectNames,properties&skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3947  100  3947    0     0  49337      0 --:--:-- --:--:-- --:--:-- 49337
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "aspectNames": [
            "cm:titled",
            "cm:auditable",
            "app:uifacets"
          ],
          "createdAt": "2018-07-04T12:57:32.509+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "System",
            "displayName": "System"
          },
          "modifiedAt": "2018-07-04T12:57:55.796+0000",
          "modifiedByUser": {
            "id": "System",
            "displayName": "System"
          },
          "name": "Data Dictionary",
          "id": "ec5e2242-e2cf-4fca-977c-f980efa289aa",
          "nodeType": "cm:folder",
          "properties": {
            "cm:title": "Data Dictionary",
            "cm:description": "User managed definitions",
            "app:icon": "space-icon-default"
          },
          "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
        }
      },
...
```

Now, that’s better. We now got an extra `properties` object with all the extra properties contained in the aspects.

The responses we got so far contain quite a lot of data. What if we are developing a mobile Alfresco client, then we might want to save on the bandwidth and only send back just the data we are going to display. We can achieve that by using another query parameter called fields. Define exactly the `fields` \(i.e. content model properties\) that you want in the response:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?include=aspectNames,properties&fields=nodeType,name&skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1680  100  1680    0     0  25074      0 --:--:-- --:--:-- --:--:-- 25454
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "aspectNames": [
            "cm:titled",
            "cm:auditable",
            "app:uifacets"
          ],
          "name": "Data Dictionary",
          "nodeType": "cm:folder",
          "properties": {
            "cm:title": "Data Dictionary",
            "cm:description": "User managed definitions",
            "app:icon": "space-icon-default"
          }
        }
      },
...
```

The `include` parameter works independently from the `fields` parameter, so to slim it down even further and not include aspect information you can remove the `include` parameter:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?fields=nodeType,name&skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   497  100   497    0     0   9940      0 --:--:-- --:--:-- --:--:--  9940
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "name": "Data Dictionary",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Guest Home",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Imap Attachments",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "IMAP Home",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Shared",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Sites",
          "nodeType": "st:sites"
        }
      },
      {
        "entry": {
          "name": "User Homes",
          "nodeType": "cm:folder"
        }
      }
    ]
  }
}
```

Another really useful parameter of the **/children** operation is the `relativePath` parameter. It can be used to navigate to another folder relative to the `/{id}` folder, in this case relative to `-root-`. So if I wanted to list the children of the Data Dictionary folder I wouldn’t have to know the Alfresco Node Identifier \(e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e\) for the **Data Dictionary** folder. I can do a call as follows instead using the `relativePath` parameter:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?relativePath=Data%20Dictionary&fields=nodeType,name&skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1461  100  1461    0     0  18037      0 --:--:-- --:--:-- --:--:-- 18262
{
  "list": {
    "pagination": {
      "count": 22,
      "hasMoreItems": false,
      "totalItems": 22,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "name": "Email Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Imap Configs",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Messages",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Models",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Node Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Presentation Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Publishing Root",
          "nodeType": "pub:Environment"
        }
      },
      {
        "entry": {
          "name": "Rendering Actions Space",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Replication Actions Space",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "RSS Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Saved Searches",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Scheduled Actions",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Scripts",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Smart Folder Downloads",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Smart Folder Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Solr Facets Space",
          "nodeType": "srft:facets"
        }
      },
      {
        "entry": {
          "name": "Space Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Transfers",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Web Client Extension",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Web Scripts",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Web Scripts Extensions",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Workflow Definitions",
          "nodeType": "cm:folder"
        }
      }
    ]
  }
}
```

The `relativePath` parameter can be used to navigate down several folders, such as in this example where we list contents of the **/Company Home/Data Dictionary/Email Templates** folder:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?relativePath=Data%20Dictionary/Email%20Templates&fields=nodeType,name&skipCount=0&maxItems=100' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   488  100   488    0     0   6506      0 --:--:-- --:--:-- --:--:--  6506
{
  "list": {
    "pagination": {
      "count": 6,
      "hasMoreItems": false,
      "totalItems": 6,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "name": "activities",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Following Email Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "invite",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Invite Email Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Notify Email Templates",
          "nodeType": "cm:folder"
        }
      },
      {
        "entry": {
          "name": "Workflow Notification",
          "nodeType": "cm:folder"
        }
      }
    ]
  }
}
```

So far, we've only used `-root-` as the folder id, we can of course also use an explicit node id, for example to retrieve the children of my **/Company Home/Data Dictionary** folder I would use the following URL:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/ec5e2242-e2cf-4fca-977c-f980efa289aa/children**

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

