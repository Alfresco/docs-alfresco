---
title: Managing Folders and Files
---

This section is all about managing folders and files.

In this section we will cover how to manage folders and files, also referred to as nodes, with the Alfresco ReST API.

After walking through this section you should have a good understanding of how to list contents of a folder, 
create a folder, upload a file, set metadata for a folder or file, update a file, delete folders and files, and much more.

## List contents of a folder {#listcontentsfolder}

Listing the contents of a folder in the repository is really useful, here we walk through several examples of how to do that.

**API Explorer URL**: [http://localhost:8080/api-explorer/#!/nodes/listNodeChildren](http://localhost:8080/api-explorer/#!/nodes/listNodeChildren){:target="_blank"}

**See also**: [Filter contents of a folder](#filtercontentsfolder)

Listing the folders and files in the top folder of the repository is often something you often need to do to get an idea 
of what’s stored in the Repository. The top folder of the Repository is called `/Company Home` and referred to as root.

The following URL is used to list children of the root folder and we pass in the authentication token:

```bash
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

If you are familiar with Alfresco, then you will recognize the folders that are returned in the response 
(`/Data Dictionary`, `/Guest Home` etc). The response format is standardized and you will see it used for other APIs 
that return a list of entities. First is a `pagination` object with information about the total number of items 
available and if any items were skipped. Then follows an array called `entries` with the actual content. Each content 
item (in this case a folder or file) is contained in an `entry` object.

The new v1 REST APIs are following a "performance first" principle, meaning by default, they only return the data that 
is the most performant to collect. More data can be requested but the client has to make a conscious decision to request 
more data and sacrifice a slight performance hit. We will see how to request more data back later in this section.

Let’s have a more detailed look at the URL and explain the different parts:

* `http://localhost:8080/alfresco`: the ACS server we are talking to
* `/api`: the Alfresco ReST API v1 is accessed
* `/-default-`: the default tenant is accessed (not usually changed unless you are running a multi tenant installation)
* `/public`: this is a supported public endpoint in the ReST API (in contrast to an internal or custom API endpoint)
* `/alfresco`: the Core API is accessed
* `/versions/1`: version 1 of the API is used
* `/nodes`: working with the node entity, which represents things like folders and files
* `/-root-`: specifically working with the top level folder node entity instance
* `/children`: execute the children operation on the top level folder
* `?skipCount=0`: return all nodes from beginning, don’t skip any
* `&maxItems=100`: return max 100 nodes (folders and files)

There's a lot more stuff you can configure when making the `/nodes/{id}/children` call.

You might have noticed in the response that aspects (also known as secondary types) are not returned. To return aspects for each entry you have to use the `include` query parameter as follows:

```bash
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

Now we get an extra array called `aspectNames` for each `entry` with all the aspects that have been applied to the node. 
However, the properties for these aspects are not returned, such as `cm:title` for the `cm:titled` aspect. For the 
properties to be returned we need to add the `properties` value to the `include` parameter:

```bash
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

The responses we got so far contain quite a lot of data. What if we are developing a mobile Alfresco client, then we 
might want to save on the bandwidth and only send back just the data we are going to display. We can achieve that by 
using another query parameter called fields. Define exactly the `fields` (i.e. content model properties) that you want 
in the response:

```bash
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

The `include` parameter works independently from the `fields` parameter, so to slim it down even further and not include 
aspect information you can remove the `include` parameter:

```bash
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

Another really useful parameter of the `/children` operation is the `relativePath` parameter. It can be used to navigate 
to another folder relative to the `/{id}` folder, in this case relative to `-root-`. So if I wanted to list the children 
of the Data Dictionary folder I wouldn’t have to know the Alfresco Node Identifier (e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e) 
for the `Data Dictionary` folder. I can do a call as follows instead using the `relativePath` parameter:

```bash
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

The `relativePath` parameter can be used to navigate down several folders, such as in this example where we list contents 
of the `/Company Home/Data Dictionary/Email Templates` folder:

```bash
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

So far, we've only used `-root-` as the folder id, we can of course also use an explicit node id, for example to retrieve 
the children of my `/Company Home/Data Dictionary` folder I would use the following URL:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/ec5e2242-e2cf-4fca-977c-f980efa289aa/children`

## Filter contents of a folder {#filtercontentsfolder}

Listing the contents of a folder in the repository is really useful, here we also cover how to filter the contents we are listing.

**API Explorer URL**: [http://localhost:8080/api-explorer/#!/nodes/listNodeChildren](http://localhost:8080/api-explorer/#!/nodes/listNodeChildren){:target="_blank"}

**See also**: [Listing contents of a folder](#listcontentsfolder)

When you know how to list the contents of a folder the next step is usually to filter out content that you are not 
interested in. Such as filtering out anything that is not of a specific content type.

We use the same URL as when we list the contents of a folder, just with an extra parameter called `where`:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/children?where=(<filter expression>)`

You can think of the where clause in a similar way to how you would think of it in a database query. Firstly, the `isFile` 
property can be used to just return files that represent content with type `cm:content` or a subtype:

`nodes/{id}/children?where=(isFile=true)`

The same result can be achieved by using the `isFolder` property too:

`nodes/{id}/children?where=(isFolder=false)`

To filter the results by a specific content type `nodeType` can be used in the where clause, for example, to retrieve 
just the Sites folder use the following URL:

`nodes/{id}/children?where=(nodeType=st:sites)`

This will result in a single result as shown below:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?where=(nodeType=st:sites)' | jq
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-10-03T08:37:18.732+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-03T08:37:29.544+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "Sites",
          "id": "c1a73d2a-9a5b-422b-8c95-77e694b248a3",
          "nodeType": "st:sites",
          "parentId": "695c2c56-3ba0-4539-b301-12bd9bb47712"
        }
      }
    ]
  }
}
```

To retrieve all nodes of a specific type and its subtypes use the `INCLUDESUBTYPES` moniker, for example:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?relativePath=My%20Stuff&where=(nodeType='acme:document INCLUDESUBTYPES')" | jq            
```

In this example we are listing content in the `/Company Home/My Stuff` folder that has the node type `acme:document` or 
a subtype of this type.

Finally, the items returned can also be ordered via the `orderBy` query parameter. By default, the `nodes/{id}/children` 
endpoint uses `orderBy=isFolder DESC,name ASC` as the default sort order, which means folders first alphabetically 
followed by files. To mix files and folders and order them alphabetically in reverse order use the following URL:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?relativePath=My%20Stuff&orderBy=name%20DESC" | jq 
```

## Get folder/file metadata

Getting the metadata for a node returns the properties for the node type and applied aspects.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/getNode](http://localhost:8080/api-explorer/#!/nodes/getNode){:target="_blank"}

Sometimes it is useful to get all metadata (i.e. everything except the content, such as content type, aspects, 
properties, associations etc) for just one node (e.g. folder, file etc) in the Repository. This can be done with the 
following HTTP GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}`

The `{id}` part can be any of the constants `-root-`, `-my-`, `-shared-` or an Alfresco Node Identifier 
(e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e). The `relativePath` parameter can also be used in combination with the `id`.

To get the metadata, meaning all properties, for the root folder in the Repository (i.e. `/Company Home`) make the following call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   502  100   502    0     0  38615      0 --:--:-- --:--:-- --:--:-- 38615
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable",
      "app:uifacets"
    ],
    "createdAt": "2018-07-04T12:57:32.431+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "System",
      "displayName": "System"
    },
    "modifiedAt": "2018-07-04T12:57:37.547+0000",
    "modifiedByUser": {
      "id": "System",
      "displayName": "System"
    },
    "name": "Company Home",
    "id": "444be4a6-5693-4d10-af4b-b55448fe4f97",
    "nodeType": "cm:folder",
    "properties": {
      "cm:title": "Company Home",
      "cm:description": "The company root space",
      "app:icon": "space-icon-default"
    }
  }
}
```

When you request data for a single node the aspects and properties are returned by default, in contrast to when listing 
children of a node.

We can see the Alfresco Node Identifier in the response above (i.e. `id`). We can use it instead of the `-root-` constant:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/444be4a6-5693-4d10-af4b-b55448fe4f97' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   502  100   502    0     0  11952      0 --:--:-- --:--:-- --:--:-- 11952
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable",
      "app:uifacets"
    ],
    "createdAt": "2018-07-04T12:57:32.431+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "System",
      "displayName": "System"
    },
    "modifiedAt": "2018-07-04T12:57:37.547+0000",
    "modifiedByUser": {
      "id": "System",
      "displayName": "System"
    },
    "name": "Company Home",
    "id": "444be4a6-5693-4d10-af4b-b55448fe4f97",
    "nodeType": "cm:folder",
    "properties": {
      "cm:title": "Company Home",
      "cm:description": "The company root space",
      "app:icon": "space-icon-default"
    }
  }
}
```

Response should be the same.

When fetching metadata for a node via the `GET /nodes/{id}` call you can add an extra parameter called `include` and use 
it to request extra data in the response. One of the values the include parameter can have is `association`, which will 
return the parent association type for the node. In the following example we request the parent association for the 
`/Company Home/Data Dictionary` node as follows (**note** also the use of the `relativePath` parameter):

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-?relativePath=Data%20Dictionary&include=association' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   631    0   631    0     0   7170      0 --:--:-- --:--:-- --:--:--  7170
{
  "entry": {
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2020-01-13T14:32:38.482+0000",
    "association": {
      "isPrimary": true,
      "assocType": "cm:contains"
    },
    "nodeType": "cm:folder",
    "parentId": "e4cccfba-bb11-4e8a-965a-e7389cc3bc89",
    "aspectNames": [
      "cm:titled",
      "cm:auditable",
      "app:uifacets"
    ],
    "createdAt": "2020-01-13T14:32:02.506+0000",
    "isFolder": true,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Data Dictionary",
    "id": "1bd5508f-8e3c-4539-92fd-bbe0d67d30c6",
    "properties": {
      "cm:title": "Data Dictionary",
      "cm:description": "User managed definitions",
      "app:icon": "space-icon-default"
    }
  }
}
```

At first you might get the idea that the `include=association` parameter would give a collection of all child and peer 
associations for the node. But it will actually just return the primary parent type as in the above example 
(and note that the `association` value is actually not written in plural):

```json
...
    "association": {
      "isPrimary": true,
      "assocType": "cm:contains"
    },
 ...
```

If you wanted to get all the peer associations for a node have a look at this [page](#workingwithrelbetweennodes) instead, 
it explains how you can use `GET /nodes/{id}/sources` and `GET /nodes/{id}/targets` calls for that. And you can of 
courser get the parent-child associations for a node with the `GET /nodes/{id}/children` call.

There are more data that you can include in the response, such as folder path to the node and permissions set on the node. 
In the following example we request this extra data by setting `include=association,path,permissions`:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-?relativePath=Data%20Dictionary/Email%20Templates&include=association,path,permissions' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1212    0  1212    0     0  39096      0 --:--:-- --:--:-- --:--:-- 39096
{
  "entry": {
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2020-01-13T14:32:11.005+0000",
    "association": {
      "isPrimary": true,
      "assocType": "cm:contains"
    },
    "nodeType": "cm:folder",
    "parentId": "1bd5508f-8e3c-4539-92fd-bbe0d67d30c6",
    "aspectNames": [
      "cm:titled",
      "cm:auditable",
      "app:uifacets"
    ],
    "createdAt": "2020-01-13T14:32:02.642+0000",
    "path": {
      "name": "/Company Home/Data Dictionary",
      "isComplete": true,
      "elements": [
        {
          "id": "e4cccfba-bb11-4e8a-965a-e7389cc3bc89",
          "name": "Company Home",
          "nodeType": "cm:folder",
          "aspectNames": [
            "cm:titled",
            "cm:auditable",
            "app:uifacets"
          ]
        },
        {
          "id": "1bd5508f-8e3c-4539-92fd-bbe0d67d30c6",
          "name": "Data Dictionary",
          "nodeType": "cm:folder",
          "aspectNames": [
            "cm:titled",
            "cm:auditable",
            "app:uifacets"
          ]
        }
      ]
    },
    "isFolder": true,
    "permissions": {
      "inherited": [
        {
          "authorityId": "GROUP_EVERYONE",
          "name": "Consumer",
          "accessStatus": "ALLOWED"
        }
      ],
      "settable": [
        "Contributor",
        "Collaborator",
        "Coordinator",
        "Editor",
        "Consumer"
      ],
      "isInheritanceEnabled": true
    },
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Email Templates",
    "id": "25ea1b4b-23c0-412e-ae71-e6a9ec56d072",
    "properties": {
      "cm:title": "Email Templates",
      "cm:description": "Email templates",
      "app:icon": "space-icon-default"
    }
  }
}
```

Note the new `path` and `permission` properties in the response.

## Create a folder

Creating a folder means creating a node with metadata.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode){:target="_blank"}

**See also:** 

* [How to update metadata](#updatemetadatanode) 
* [How to add aspects](#addaspectnode)
* [How to manage associations (contains examples of creating folder)](#workingwithrelbetweennodes)

When we are familiar with how to list the contents of a folder, and fetch metadata for a folder or file, then it makes 
sense to start looking at creating nodes. Let’s start by looking at how to create a folder. The following HTTP POST call is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/children`

So we are basically making a POST call to the children collection for a folder when we are creating a node, such as a 
folder. The `{id}` part represents the folder under which we want to create a sub-folder. The `id` can be either one of 
the constants `-root-`, `-shared-`, `-my-` or an Alfresco Node Identifier (e.g. 444be4a6-5693-4d10-af4b-b55448fe4f97). 
The POST data defines the folder metadata and looks like in this example:

```json
{
  "name": "My Folder",
  "nodeType": "cm:folder",
  "properties": {
    "cm:title": "My Folder",
    "cm:description": "My new folder"
  }
}
```

Here is how to create a folder with the name `My Folder` directly under the `/Company Home` (i.e. `-root-`) folder:

```bash
$ curl -H "Content-Type: application/json" -d '{"name":"My Folder","nodeType":"cm:folder", "properties": { "cm:title":"My Folder", "cm:description":"My new folder"}}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   622  100   503  100   119  10702   2531 --:--:-- --:--:-- --:--:-- 13234
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable"
    ],
    "createdAt": "2019-09-02T12:24:52.887+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-02T12:24:52.887+0000",
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "My Folder",
    "id": "1e8d8df6-7d33-4966-83db-0333a7f6277a",
    "nodeType": "cm:folder",
    "properties": {
      "cm:title": "My Folder",
      "cm:description": "My new folder"
    },
    "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
  }
}
```

When you create a node a JSON object is returned with the data that was created by the system, such as the properties of the `cm:auditable` aspect (i.e. `cm:created`, `cm:creator` etc). The generated Alfresco Node Identifier (i.e. `id`) is also returned.

You may have noticed that slightly more information about the node (`aspectNames` and `properties`) is returned by default even through we are still using a "performance first" principle. In the same way the `include` parameter is used when listing nodes, it can also be used when creating nodes to list extra information or limit what is listed.

## Upload a file {#uploadfile}

Uploading a file to the Repository means creating a node with metadata and content.

**API Explorer URL**: [http://localhost:8080/api-explorer/#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode){:target="_blank"}

**See also:**

* [How to update metadata](#updatemetadatanode) 
* [How to add aspects](#addaspectnode)
* [How to manage associations (contains examples of uploading files)](#workingwithrelbetweennodes)

Creating a file is slightly different from creating a folder as a file also has content. The following HTTP POST call is 
used (same as when creating other types of nodes, such as folders):

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/children`

So we are basically making a POST call to the children collection for a folder when we are creating a file. The `{id}` 
part represents the folder under which we want to create the file. The `id` can be either one of the constants `-root-`, 
`-shared-`, `-my-` or an Alfresco Node Identifier (e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e).

As well as accepting JSON when creating a node with metadata, the same endpoint (i.e. `nodes/{id}/children`) also accepts 
`multipart/form-data`, allowing us to upload content from a standard HTML form or from the command line using curl.

When we make the POST with curl we have to do it as form data submission, with each form field specified with `-F`. The 
`filedata` field will point to the contents of the file we are uploading. The `name` field specifies the name we want to 
give the file when it’s stored in the Repository (i.e. `cm:name`). The `nodeType` field is used to set the content type 
that the file should have. We can use the `relativePath` field to store the file in a different location relative to the 
`{id}`. Any other field that we specify will be treated as a property that should be set on the node (e.g. `cm:title`).

Here is how to create a file under a folder called `My Folder`, which is located under the root folder (i.e. `-root-`). 
If the folder does not exist, then it will be created:

```bash
$ curl -X POST -F filedata=@test.txt -F "name=somefile.txt" -F "nodeType=cm:content" -F "cm:title=My text" -F "cm:description=My text document description" -F "relativePath=My Folder" -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1483  100   702  100   781   4680   5206 --:--:-- --:--:-- --:--:--  9886
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-05T08:58:24.463+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 34,
      "encoding": "ISO-8859-1"
    },
    "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author"
    ],
    "createdAt": "2019-09-05T08:58:24.463+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "0305fc9c-fc1d-405a-abf0-af482a9239ec",
    "properties": {
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:description": "My text document description"
    }
  }
}
```

The call returns an `entry` object with all the information about the new file node. Note that versioning is turned on by default.

When uploading content it's quite common for a file with the same name to exist, this will generate an error by default, 
to avoid the error the `autoRename` form field can be set to `true`. If a filename clash is detected a suffix will be 
added to the filename, for example `my-file.txt` will become `my-file-1.txt`.

Let's try and upload the `somefile.txt` again as above but with the `autoRename` parameter set to `true`:

```bash
$ curl -X POST -F filedata=@test.txt -F "name=somefile.txt" -F "nodeType=cm:content" -F "cm:title=My text" -F "cm:description=My text document description" -F "relativePath=My Folder" -F "autoRename=true" -H 'Authorization: Basic VElDS0VUX2I1YmVjODNkZTQ2ZDI5NDAzMTMzZTk2N2EwYjNjYmE5NjExYmYzOWY=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1615    0   704  100   911   3555   4601 --:--:-- --:--:-- --:--:--  8197
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-07T09:36:10.410+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 61,
      "encoding": "ISO-8859-1"
    },
    "parentId": "e41886ee-f2f5-49aa-b081-ce13c3536032",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author"
    ],
    "createdAt": "2019-10-07T09:36:10.410+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile-1.txt",
    "id": "7dc41a62-3cc8-425b-bbfd-bbf383c6168f",
    "properties": {
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:description": "My text document description"
    }
  }
}
```

We can see that the file was created with the name `somefile-1.txt` as expected.

Another feature of the repository we can control when uploading content is the generation of a rendition. To have the 
Share thumbnail rendition generated, provide a `renditions` form field with a value of `doclib` as shown here:

```bash
$ curl -X POST -F filedata=@test.txt -F "name=somefile.txt" -F "nodeType=cm:content" -F "cm:title=My text" -F "cm:description=My text document description" -F "relativePath=My Folder" -F "autoRename=true" -F "renditions=doclib" -H 'Authorization: Basic VElDS0VUX2I1YmVjODNkZTQ2ZDI5NDAzMTMzZTk2N2EwYjNjYmE5NjExYmYzOWY=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
```

Currently only one rendition can be requested, there are plans to allow multiple in the future hence the plural form 
field name.

## Upload a file with custom type {#uploadfilecustomtype}

Uploading a file with a custom type to the Repository means creating a node with a type other than `cm:content`.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode){:target="_blank"}

**See also:**

* [How to update metadata](#updatemetadatanode) 
* [How to add aspects](#addaspectnode)
* [How to manage associations (contains examples of uploading files)](#workingwithrelbetweennodes)

In the last section we saw how to upload a file and set an out-of-the-box content type (i.e. `cm:content`). Another common 
scenario is to upload a file and set a custom content type. To demonstrate this we need to first apply a custom content 
model to the Repository.

### The following steps show how to create a custom content model that can be deployed to ACS

1.  Describe the custom content model with XML

    Let’s use the following content model, which defines the custom type `acme:document`:
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <model name="acme:contentModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">
       <description>Sample Document Model</description>
       <author>My Name</author>
       <version>1.0</version>
    
       <imports>
           <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
           <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
           <import uri="http://www.alfresco.org/model/system/1.0" prefix="sys"/>
       </imports>
    
       <namespaces>
           <namespace uri="http://www.acme.org/model/content/1.0" prefix="acme"/>
       </namespaces>
    
       <constraints>
           <constraint name="acme:securityClassificationOptions" type="LIST">
               <parameter name="allowedValues">
                   <list>
                       <value></value>
                       <value>Public</value>
                       <value>Client Confidential</value>
                       <value>Company Confidential</value>
                       <value>Strictly Confidential</value>
                   </list>
               </parameter>
           </constraint>
       </constraints>
    
       <types>
           <type name="acme:document">
               <title>Sample Document Type</title>
               <parent>cm:content</parent>
               <properties>
                   <property name="acme:documentId">
                       <title>Document Identification Number</title>
                       <type>d:text</type>
                   </property>
               </properties>
               <mandatory-aspects>
                   <aspect>acme:securityClassified</aspect>
               </mandatory-aspects>
           </type>
       </types>
    
       <aspects>
           <aspect name="acme:securityClassified">
               <title>ACME Security Classified</title>
               <description>Content has been security classified</description>
               <properties>
                   <property name="acme:securityClassification">
                       <type>d:text</type>
                       <index enabled="true">
                           <atomic>true</atomic>
                           <stored>false</stored>
                           <tokenised>false</tokenised>
                       </index>
                       <constraints>
                           <constraint ref="acme:securityClassificationOptions"/>
                       </constraints>
                   </property>
               </properties>
           </aspect>
       </aspects>
    </model>
    ```
    
    This model also has a custom aspect `acme:securityClassified`, so we can see how aspects can be applied at the same time as we set a custom content type. Store the XML in a file called, for example, `acme-content-model.xml`.

2.  Create a file that bootstraps the content model

    For the custom content model to be applied to the Repository we need to define a bootstrap file that points to the `acme-content-model.xml` file. Create a file called `acme-bootstrap-context.xml` with the following XML:
    
    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
        <bean id="acme.extension.dictionaryBootstrap" 
                parent="dictionaryModelBootstrap" 
                depends-on="dictionaryBootstrap">
            <property name="models">
              <list>                
                <value>alfresco/extension/acme-content-model.xml</value>
              </list>
            </property>
        </bean>
    </beans>
    ```

3.  Create a directory somewhere for Repository extension files and copy the files there

    Now, copy both the `acme-content-model.xml` file and the `acme-bootstrap-context.xml` file into this new directory. This directory could also contain the `api-explorer.war` if you have applied it to your ACS installation.
    
    There are now two different ways of deploying this content model depending on if you are using an ACS Trial or an Alfresco SDK project.
    
    If you are using a trial version of ACS then you follow the first approach described below. If you are using the Alfresco SDK you would want to follow the second approach. The main difference between the two is that the first one will lead to loss of the data that you are working with as the ACS trial Docker Compose file does not use volumes (i.e. it does not store data externally but instead inside the container).

### Installing the custom content model into an ACS Trial environment 

>**IMPORTANT!** you will lose your data/content when you do this

1.  Create a `Dockerfile` for the new custom Repository Docker Image

    As a developer you are most likely running ACS 6.x via a Docker Compose file, either via trial or SDK. The `Dockerfile` will be based on the Repository Image that is used in the `docker-compose.xml` file. Have a look in it and you should see that it starts with defining the Alfresco Repository Docker image:
    
    ```text
    version: "2"
    
    services:
        alfresco:
            image: alfresco/alfresco-content-repository:6.1.0
            ...
    ```
    
    With this information we know what Docker Image to base our custom Repo Docker Image on. Create a `Dockerfile` in the same directory as the content model XML files and have it look like this:
    
    ```text
    FROM alfresco/alfresco-content-repository:6.1.0
      
    ARG TOMCAT_DIR=/usr/local/tomcat
    
    # Make sure we got the ReST API Explorer available
    COPY api-explorer.war $TOMCAT_DIR/webapps/
    
    # Copy in the custom content model for upload file example
    COPY acme-content-model.xml acme-bootstrap-context.xml $TOMCAT_DIR/shared/classes/alfresco/extension/
    ```
    
    What this `Dockerfile` will do is build a custom Repository Docker image that is based on the out-of-the-box Alfresco Repository Docker image that you are using. It will then copy in the `api-explorer.war` into the `tomcat/webapps` directory followed by a copy of the custom content model files into an extension directory where they can be picked up and bootstrapped.

2.  Build the custom Alfresco Repository Docker image

    When we got the Dockerfile completed we just need to build the custom Docker image as follows, standing in the directory with all the files:
    
    ```bash
    repo mbergljung$ docker build -t alf-repo-custom:1.0 .
    Sending build context to Docker daemon  954.4kB
    Step 1/4 : FROM alfresco/alfresco-content-repository:6.1.0
     ---> 5439a493ee0a
    Step 2/4 : ARG TOMCAT_DIR=/usr/local/tomcat
     ---> Using cache
     ---> cf2a1261adf4
    Step 3/4 : COPY api-explorer.war $TOMCAT_DIR/webapps/
     ---> Using cache
     ---> 52f10e1f00d6
    Step 4/4 : COPY acme-content-model.xml acme-bootstrap-context.xml $TOMCAT_DIR/shared/classes/alfresco/extension/
     ---> 1766782c545a
    Successfully built 1766782c545a
    Successfully tagged alf-repo-custom:1.0
    ```
    
    Check that you got the custom Docker image:
    
    ```bash
    repo mbergljung$ docker image ls |grep alf-
    alf-repo-custom                                                  1.0                                          1766782c545a        About a minute ago   1.16GB
    ```

3.  Update the `docker-compose.xml` file to use the new custom image

    Open up the `docker-compose.xml` file and change it so the Repository service is based on the custom Docker Image we just created. It should now look something like this:
    
    ```text
    version: "2"
    
    services:
        alfresco:
            image: alf-repo-custom:1.0
            ...
    ```

4.  Restart ACS

    We have made changes only to the Repository container, also known as the **alfresco** Docker Compose service, but we need to remove and restart all containers so data is in sync (basically we are starting over with an empty repository). After we have created our own Docker Image for the Alfresco Repository container and configured Docker Compose with it we can restart as follows by doing **Ctrl-C** out of the log, this will stop all containers, we then remove them, followed by starting it up again:
    
    ```bash
    ^CGracefully stopping... (press Ctrl+C again to force)
    Stopping acs61_alfresco-pdf-renderer_1 ... done
    ...
    
    acs61 mbergljung$ docker-compose rm 
    Going to remove acs61_alfresco-pdf-renderer_1, acs61_transform-router_1, acs61_libreoffice_1, acs61_tika_1, acs61_imagemagick_1, acs61_proxy_1, acs61_share_1, acs61_postgres_1, acs61_digital-workspace_1, acs61_alfresco_1, acs61_activemq_1, acs61_solr6_1, acs61_shared-file-store_1
    Are you sure? [yN] y
    Removing acs61_alfresco-pdf-renderer_1 ... done
    ...
    
    acs61 mbergljung$ docker-compose up 
    Creating acs61_alfresco-pdf-renderer_1 ... done 
    ...                     
    ```

### Installing the custom content model into an Alfresco SDK AIO project

1.  Verify what content model that is currently defined in the SDK project

    When you generate an Alfresco SDK project, such as an All-In-One (AIO) project, it comes with a predefined content model that already includes the `acme:document` type and the `acme:securityClassified` aspect. Look in the `aio/acs-aio-platform/src/main/resources/alfresco/module/acs-aio-platform/model/content-model.xml` file and check what is currently defined. If you see the type and the aspect, then you don't have to copy the files into the SDK project.

2.  (**OPTIONAL**) Copy the content model files into the SDK project

    Copy both the `acme-content-model.xml` file and the `acme-bootstrap-context.xml` file into the `aio/aio-platform-docker/src/main/docker` AIO SDK directory.

3.  (**OPTIONAL**) Open up the platform/repository `Dockerfile` and add the command to copy the content model files into an `alfresco/extension` directory

    The platform (repository) Docker file is located in the `aio/aio-platform-docker/src/main/docker` AIO SDK directory. Add the following COPY command at the end of this file:
    
    ```text
    ...
    
    # Copy in the custom content model for upload file example
    COPY acme-content-model.xml acme-bootstrap-context.xml $TOMCAT_DIR/shared/classes/alfresco/extension/
    ```
    
    What this Dockerfile will do is build a custom Repository Docker image that is based on the out-of-the-box Alfresco Repository Docker image that you are using. After it has copied in all the extensions, config files, license etc it will finish by copying in the `acme-content-model.xml` and `acme-bootstrap-context.xml` files into the `tomcat/shared/classes/alfresco/extension` directory where it will be picked up and deployed.

4.  (**OPTIONAL**) Restart the platform/repository container

    We have changed only the platform/repository, so it is enough to just restart this container:
    
    ```bash
    acs61-aio mbergljung$ ./run.sh reload_acs
    Killing docker_acs61-aio-acs_1 ... done
    Going to remove docker_acs61-aio-acs_1
    Removing docker_acs61-aio-acs_1 ... done
    ...
    ```
    
    >**Note**. this does not remove any content or metadata.

### Test uploading file and setting custom type

We now got a custom content model applied with a custom content type called `acme:document`. We can use it when uploading 
a file as follows:

```bash
$ curl -X POST -F filedata=@test.txt -F "name=somefile.txt" -F "nodeType=acme:document" -F "acme:documentId=DOC001" -F "aspectNames=acme:securityClassified" -F "acme:securityClassification=Public" -F "cm:title=My text" -F "cm:description=My custom text document description" -F "relativePath=My Custom Folder" -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1957  100   804  100  1153    761   1091  0:00:01  0:00:01 --:--:--  1853
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-09T07:38:55.060+0000",
    "nodeType": "acme:document",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 34,
      "encoding": "ISO-8859-1"
    },
    "parentId": "69470c63-ea8f-4a93-a408-673d5668e369",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "acme:securityClassified",
      "cm:author"
    ],
    "createdAt": "2019-09-09T07:38:55.060+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "d8f561cc-e208-4c63-a316-1ea3d3a4e10e",
    "properties": {
      "cm:title": "My text",
      "acme:securityClassification": "Public",
      "cm:versionType": "MAJOR",
      "acme:documentId": "DOC001",
      "cm:versionLabel": "1.0",
      "cm:description": "My custom text document description"
    }
  }
}
```

We can see that the custom content type (i.e. `acme:document`) has been set correctly, including the property it 
contains (i.e. `acme:documentId`). At the same time we also show how to apply new aspects with the `aspectNames` field 
(note that some aspects are set automatically when you upload a file, such as `cm:author`, `cm:auditable` etc). 
So this call is quite powerful.

## Upload a new version of file {#uploadnewversionfile}

Uploading a new version of a file means replacing the content and creating a new entry in the version history.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/updateNodeContent](http://localhost:8080/api-explorer/#!/nodes/updateNodeContent){:target="_blank"}

**See also:**

* [Upload a file](#uploadfile) 
* [Upload a file with custom type](#uploadfilecustomtype)

When we have files in the Repository it is common to want to update the content for them. The following HTTP PUT call 
is used to upload a new version of a file:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/content?majorVersion=[true|false]&comment=<comment about what changed>`

We need to specify the Node Identifier (i.e. `{id}`) for the file node that should have its content updated. You can 
choose to do a major version update or a minor version update using the `majorVersion` parameter. A comment about the 
content update can be specified with the `comment` parameter.

Here is how to update a text file with Node Identifier d8f561cc-e208-4c63-a316-1ea3d3a4e10e and make a major version change:

```bash
$ curl -X PUT -H 'Content-Type: text/plain' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d 'This text file has had a major change...' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/content?majorVersion=false&name=somefile.txt' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   991  100   951  100    40   1571     66 --:--:-- --:--:-- --:--:--  1635
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-09T09:14:23.914+0000",
    "nodeType": "acme:document",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 40,
      "encoding": "ISO-8859-1"
    },
    "parentId": "69470c63-ea8f-4a93-a408-673d5668e369",
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "acme:securityClassified",
      "cm:failedThumbnailSource",
      "cm:author",
      "cm:thumbnailModification"
    ],
    "createdAt": "2019-09-09T07:38:55.060+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "d8f561cc-e208-4c63-a316-1ea3d3a4e10e",
    "properties": {
      "cm:title": "My text",
      "cm:versionType": "MINOR",
      "acme:documentId": "DOC001",
      "cm:versionLabel": "1.1",
      "acme:securityClassification": "Public",
      "cm:lastThumbnailModification": [
        "pdf:1568015091834",
        "doclib:1568015093159"
      ],
      "cm:description": "My custom text document description"
    }
  }
}
```

The call returns an `entry` object with all the information about the updated file node. Note that the `cm:versionLabel` 
has changed to `1.1` as we choose to do a minor version update. If we would have done a major version update, then it 
would have been set to 2.0. When versioning is turned on for a file, such as in this case, each previous version of the 
file is saved on disk.

## Get file version history

When a file has versioning turned on you can get its version history.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/versions/listVersionHistory](http://localhost:8080/api-explorer/#!/versions/listVersionHistory){:target="_blank"}

**See also:** [Upload a new version of a file](#uploadnewversionfile)

When we have a file with versioning turned on (i.e. the `cm:versionable` aspect applied) we can retrieve its version 
history. This will give us information about all the previous versions of the file that are available for download. 
The following HTTP GET call is used to fetch the version history:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/versions`

We need to specify the Node Identifier (i.e. `{id}`) for the versioned file node.

Here is how to fetch the version history for a text file with Node Identifier 90d0dd09-93d2-448c-9c23-24de24c3f6ff:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUX2M3YzdkOWFjODA2ZDRiNTNhNIxMjA3NTU1MDM4NDFmMWUzMmMyNjM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/90d0dd09-93d2-448c-9c23-24de24c3f6ff/versions' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1461    0  1461    0     0  41742      0 --:--:-- --:--:-- --:--:-- 41742
{
  "list": {
    "pagination": {
      "count": 4,
      "hasMoreItems": false,
      "totalItems": 4,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isFolder": false,
          "isFile": true,
          "modifiedAt": "2019-10-07T13:49:54.736+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "somefile.txt",
          "id": "1.3",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 473,
            "encoding": "UTF-8"
          }
        }
      },
      {
        "entry": {
          "isFolder": false,
          "isFile": true,
          "modifiedAt": "2019-10-07T13:49:17.597+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "somefile.txt",
          "id": "1.2",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "application/octet-stream",
            "mimeTypeName": "Binary File (Octet Stream)",
            "sizeInBytes": 473,
            "encoding": "UTF-8"
          }
        }
      },
      {
        "entry": {
          "isFolder": false,
          "isFile": true,
          "modifiedAt": "2019-10-07T13:48:42.333+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "docker-compose.yml",
          "versionComment": "Some minor changes to the text",
          "id": "1.1",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "application/octet-stream",
            "mimeTypeName": "Binary File (Octet Stream)",
            "sizeInBytes": 473,
            "encoding": "UTF-8"
          }
        }
      },
      {
        "entry": {
          "isFolder": false,
          "isFile": true,
          "modifiedAt": "2019-10-07T13:48:42.333+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "docker-compose.yml",
          "id": "1.0",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 19,
            "encoding": "UTF-8"
          }
        }
      }
    ]
  }
}
```

The call returns a `pagination` object with information about the number of versions available for this file, in this 
case 4, which are described in `entry` objects. To retrieve the content for a version other than the latest, which is 
returned when getting content for a file, use the following GET call:

`/nodes/{nodeId}/versions/{versionId}/content`

So, to get the content for the first version of this file use the `versionId` 1.0 as follows:

```bash
$ curl -X GET -H 'Accept: text/plain' -H 'Authorization: Basic VElDS0VUX2M3YzdkOWFjONTU1MDM4NDFmMWUzMmMyNjM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/90d0dd09-93d2-448c-9c23-24de24c3f6ff/versions/1.0/content'
This is a text file     
```

The `versionId` is the same as the version label.

To revert to a previous version of the file we have to POST the following:

```json
{
  "majorVersion": true,
  "comment": "Reverted to original"
}
```

To the following URL:

`/nodes/{nodeId}/versions/{versionId}/revert`

‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍We are able to specify whether the reverted version will create a new minor or major version and again provide a 
comment describing the reason for the additional version.

## Download a file {#downloadfile}

Downloading the file means getting the file content from the Repository, which has it stored on disk.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/getNodeContent](http://localhost:8080/api-explorer/#!/nodes/getNodeContent){:target="_blank"}

**See also:** [Downloading multiple files](#downloadmultiplefiles)

When you know how to upload content to the Repository it is natural to want to download content from the Repository. 
The following HTTP GET call is used to download a file:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/content`

Here we are getting the content for a file with the Node Identifier specified as the `{id}` URL part.

The following example gets content for a text file with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier:

```bash
$ curl -X GET -H 'Accept: text/plain' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/content
Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
```

You can also just make this call (i.e. `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/c4980e44-92ac-41a5-91dc-2b2183c61de8/content`) 
in a Web Browser and the file will be downloaded. If you want to preview the file in the Web Browser you would need to 
add an extra query parameter called `attachment` and set it to `false` (i.e. 
`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/c4980e44-92ac-41a5-91dc-2b2183c61de8/content?attachment=false`).

## Download multiple files {#downloadmultiplefiles}

It's possible to download multiple files as a ZIP.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/getNodeContent](http://localhost:8080/api-explorer/#!/nodes/getNodeContent){:target="_blank"}

**See also:** [Downloading a single file](#downloadfile)

Sometimes it is useful to be able to download multiple files in one go. You can create such a download with the 
following HTTP POST call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads`

You POST the following type of body with the Node Identifiers for the files that should be downloaded:

```json
{
    "nodeIds":
     [
       "node identifier for file 1",
       "node identifier for file 2",
       "node identifier for file 3", 
       and so on...
     ]
}
```

The response to this call will contain a ZIP Download Node Identifier that can be used in subsequent calls to check the 
status of the download and ultimately download the archive. This call will start an asynchronous process on the server 
side that will put together a ZIP package with the files. You can check the status of this process with the 
following HTTP GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads/{id}`

Here we are getting the status for a ZIP download with the Node Identifier specified as the `{id}` URL part.

Let's see how this works with an example. I got two text files with Node Identifiers 
7279b5c5-da55-4e98-8b12-72d33b90c810 and 1cf35d69-f85f-4446-94cd-f31ccf16c2e3 that I want to download. So the POST data 
will look like this:

```json
{
    "nodeIds":
     [
       "7279b5c5-da55-4e98-8b12-72d33b90c810",
       "1cf35d69-f85f-4446-94cd-f31ccf16c2e3"
     ]
}
```

The call will then look like this:

```bash
$ curl -X POST -H "Content-Type: application/json" -H 'Accept: application/json' -d '{"nodeIds":["7279b5c5-da55-4e98-8b12-72d33b90c810","1cf35d69-f85f-4446-94cd-f31ccf16c2e3"]}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   225    0   134  100    91    822    558 --:--:-- --:--:-- --:--:--  1380
{
  "entry": {
    "filesAdded": 0,
    "bytesAdded": 0,
    "totalBytes": 0,
    "id": "3ea71d75-e2fa-4f23-9239-438c9b048574",
    "totalFiles": 0,
    "status": "PENDING"
  }
}
```

The response contains the status of the download and its `id` that we can use later on to check the status and download 
the ZIP archive.

We can now make a GET call to the **/downloads/{id}** URL and check the status until we see `status` set to `DONE`:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads/3ea71d75-e2fa-4f23-9239-438c9b048574 | jq
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   133    0   133    0     0   6650      0 --:--:-- --:--:-- --:--:--  6650
{
  "entry": {
    "filesAdded": 2,
    "bytesAdded": 56,
    "totalBytes": 56,
    "id": "3ea71d75-e2fa-4f23-9239-438c9b048574",
    "totalFiles": 2,
    "status": "DONE"
  }
}
```

The ZIP file with Node Identifier 3ea71d75-e2fa-4f23-9239-438c9b048574 is now ready to be downloaded. It is stored in 
the hidden `/sys:system/sys:downloads` folder.

To download the ZIP file follow instructions for [downloading a single file](#downloadfile). In this case the call to 
download the ZIP would look like this:

```bash
$ curl -X GET -H 'Accept: application/octet-stream' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/3ea71d75-e2fa-4f23-9239-438c9b048574/content
Binary output...
```

It's better to try the download from a browser.

>**Note:** The download ZIP file node can be deleted using the [delete a file](#deletenode) endpoint if needed.

By default, if the download node is not deleted it will be picked up by a cleaner job which removes download nodes older 
than a configurable amount of time (default is 1 hour).

## List file renditions

A file can have a number of renditions generated for it. This is how you get a list these renditions.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/renditions/listRenditions](http://localhost:8080/api-explorer/#!/renditions/listRenditions){:target="_blank"}

A file can have a number of renditions for its content, such as a thumbnail or a preview. A rendition is basically a 
different representation of the file content. To see what renditions that are available for a file use the following 
HTTP GET call, it returns all renditions wether they have been created or not:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/renditions`

Here we are getting the renditions for the file with Node Identifier specified as the `{id}` URL part.

The following example gets renditions for a text file with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/renditions | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   867  100   867    0     0  41285      0 --:--:-- --:--:-- --:--:-- 41285
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
          "id": "avatar",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "avatar32",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "doclib",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image",
            "sizeInBytes": 432,
            "encoding": "UTF-8"
          },
          "status": "CREATED"
        }
      },
      {
        "entry": {
          "id": "imgpreview",
          "content": {
            "mimeType": "image/jpeg",
            "mimeTypeName": "JPEG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "medium",
          "content": {
            "mimeType": "image/jpeg",
            "mimeTypeName": "JPEG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "pdf",
          "content": {
            "mimeType": "application/pdf",
            "mimeTypeName": "Adobe PDF Document",
            "sizeInBytes": 8238,
            "encoding": "UTF-8"
          },
          "status": "CREATED"
        }
      }
    ]
  }
}
```

In this case we got back information about six renditions for this text file, each contained in an `entry` object. 
Note that only two of those have been created and can be downloaded (i.e. they have `status` set to `CREATED`).

## Get file rendition content

Get the rendition file content, if it has been generated.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/renditions/getRenditionContent](http://localhost:8080/api-explorer/#!/renditions/getRenditionContent){:target="_blank"}

If you know that a file has a rendition you can retrieve the content for it with the following HTTP GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/renditions/{renditionId}/content`

Here we are getting the rendition content for the rendition specified with `{renditionId}` for the file with 
Node Identifier specified as the `{id}` URL part.

The following example gets the `doclib` rendition (i.e. the thumbnail) content for a text file with the 
d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier and stores it in a local file called `somerendition.png`:

```bash
$ curl -X GET --output somerendition.png -H 'Accept: image/png' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/renditions/doclib/content'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   432  100   432    0     0  19636      0 --:--:-- --:--:-- --:--:-- 19636
```

## Update metadata for a folder or file {#updatemetadatanode}

Update the properties, also referred to as metadata, for a folder or file.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode){:target="_blank"}

**See also:** 

* [How to add aspects](#addaspectnode) 
* [How to remove aspects](#removeaspectsnode) 
* [How to get and set permissions](#setpermissionsnode)

Quite often you want to update some metadata for a folder or file. It can for example be as part of a business process 
that is used to process content, and at different places in the flow, folders and files should be updated to reflect the 
processing state. The ReST API implements partial update via PUT. Although technically this is not RESTful it was decided 
to bend the rules here to keep things as simple as possible for clients, meaning the client only needs to send the data 
that is changing, with one exception related to aspects.

Metadata is all the information about the folder or file node except the actual content, if it's a file node. Folder nodes 
don't have any content. This is properties, aspects, associations, content type etc.

To update metadata for a node use the following HTTP PUT call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}`

The Node Identifier for the folder or file node to be updated is specified with the `{id}` parameter. Then a body is 
created with all the data that makes up the update.

The following call will update the metadata for a text file identified with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e 
Node Identifier. The data that is passed in the PUT call looks as follows:

```json
{ 
  "name":"newfilename.txt",
  "properties": { 
    "cm:title":"UPDATED My text file", 
    "cm:description":"UPDATED My text file description"
  }
}
```

And here is the call:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{"name":"newfilename.txt", "properties": { "cm:title":"UPDATED My text file", "cm:description":"UPDATED My text file description"}}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  | jq
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-09T09:58:51.492+0000",
    "nodeType": "acme:document",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 40,
      "encoding": "ISO-8859-1"
    },
    "parentId": "69470c63-ea8f-4a93-a408-673d5668e369",
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "acme:securityClassified",
      "cm:author",
      "cm:thumbnailModification"
    ],
    "createdAt": "2019-09-09T07:38:55.060+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "newfilename.txt",
    "id": "d8f561cc-e208-4c63-a316-1ea3d3a4e10e",
    "properties": {
      "cm:title": "UPDATED My text file",
      "cm:versionType": "MINOR",
      "acme:documentId": "DOC001",
      "cm:versionLabel": "1.1",
      "acme:securityClassification": "Public",
      "cm:lastThumbnailModification": [
        "pdf:1568020467536",
        "doclib:1568020468157"
      ],
      "cm:description": "UPDATED My text file description"
    }
  }
}
```

In the returned `entry` object we can see that the `name` of the file has been updated successfully plus the `cm:titled` 
aspect properties.

This PUT call can also be used to rename the node by just providing a `cm:name` property in the properties as shown below:

```json
{
  "properties":
  {
    "cm:name":"renamed-name.txt"
  }
}‍‍‍‍‍‍
```

Alternatively, the top level `name` property can also be used as in our example above:

```json
{
  "name":"renamed-file.txt"
}‍‍‍
```

Similarly, the owner of the node can be updated, just provide the `cm:owner` property as follows:

```json
{
  "properties":
  {
    "cm:owner":"mbergljung"
  }
}‍‍‍‍‍‍
```

There is one exception to the partial update rule and that is for managing aspects. To change the aspects applied to a 
node the whole complete array has to be provided. Any aspects the node has applied but are not present in the array will 
be removed. Conversely, any aspects in the array that the node does not have applied are added. See the link at the 
beginning of this page to a section about adding aspects.

Finally, the type of the node can also be changed by updating the `nodeType` property, for example to change our node 
type to `cm:savedquery` use the following body:

```json
{
  "nodeType":"cm:savedquery"
}‍‍‍
```

In the examples above we've used a file, everything can obviously also be done for folders.

## Add aspects to a folder or file {#addaspectnode}

Addning aspects to a folder or file is a bit more complicated than just updating properties. Here is how to do it.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode){:target="_blank"}

**See also:** 

* [How to update metadata](#updatemetadatanode)  
* [How to remove aspects](#removeaspectsnode) 

When you set a property on a file via the update node call the associated aspect will be applied automatically for you, 
if it’s not already set on the node. Let’s take the out-of-the-box `cm:effectivity` aspect for example, it has two properties 
`cm:from` and `cm:to`. If we set one or both of these properties, then the aspect should be applied automatically.

The following HTTP PUT call is used (same as when updating metadata for a node):

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}`

The folder or file node that should be updated with a new aspect is specified with the `{id}` parameter, which represents 
the Node Identifier. Then a body is created with all the properties belonging to the aspect.

The following call will add the `cm:effectivity` aspect to the text file identified with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e 
Node Identifier. The data that is passed in the PUT call looks as follows:

```json
{ 
  "properties": { 
    "cm:from":"2019-09-10T08:00:00.000+0000", 
    "cm:to": "2019-09-12T21:00:00.000+0000"
  }
}
```

And here is the call:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "properties": { "cm:from": "2019-09-10T08:00:00.000+0000", "cm:to": "2019-09-12T21:00:00.000+0000"}}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1021  100   919  100   102   4048    449 --:--:-- --:--:-- --:--:--  4497
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-09T12:47:20.877+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 34,
      "encoding": "ISO-8859-1"
    },
    "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d",
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity"
    ],
    "createdAt": "2019-09-05T08:58:24.463+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "0305fc9c-fc1d-405a-abf0-af482a9239ec",
    "properties": {
      "cm:from": "2019-09-10T08:00:00.000+0000",
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:to": "2019-09-12T21:00:00.000+0000",
      "cm:lastThumbnailModification": [
        "doclib:1567673959670",
        "pdf:1567673964745"
      ],
      "cm:description": "My text document description"
    }
  }
}
```

In the returned entry we can see that the `cm:effectivity` aspect has been applied to the node and the associated 
properties `cm:from` and `cm:to` have been set accordingly. These properties are of the `datetime` data type and must be 
specified using the extended format defined by ISO standard 8601:2004. They are always in UTC.

What about an aspect that does not have any properties, a so called “marker” aspect, how do you add it to a folder or file? 
You will first use the get node metadata call to get all aspects, then you will add the “marker” aspect to this list. 
Then call the update node call with the new aspect list. Here is how to do this:

*Get the list of aspects for the node, set `fields=aspectNames` so you only get back aspects:*

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e?fields=aspectNames' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   144  100   144    0     0   4235      0 --:--:-- --:--:-- --:--:--  4235
{
  "entry": {
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity"
    ]
  }
}
```

*Add the “marker” aspect to this list:*

Let’s use the following out-of-the-box aspect:

```xml
<aspect name="cm:classifiable">
  <title>Classifiable</title>
</aspect>
```

The `cm:classifiable` aspect makes it possible to apply different types of categories to a node, such as a country. 
The updated aspect list that will be passed in the PUT call looks as follows:

```json
{
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity",
      "cm:classifiable"
    ]
}
```

*Here is how the call looks like:*

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity",
      "cm:classifiable"
    ]
}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  | jq
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-16T06:36:09.968+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 34,
      "encoding": "ISO-8859-1"
    },
    "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d",
    "aspectNames": [
      "rn:renditioned",
      "cm:classifiable",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity"
    ],
    "createdAt": "2019-09-05T08:58:24.463+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "0305fc9c-fc1d-405a-abf0-af482a9239ec",
    "properties": {
      "cm:from": "2019-09-10T08:00:00.000+0000",
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:to": "2019-09-12T21:00:00.000+0000",
      "cm:lastThumbnailModification": [
        "doclib:1567673959670",
        "pdf:1567673964745"
      ],
      "cm:description": "My text document description"
    }
  }
}
```

We can see in the response under `aspectNames` that the new `cm:classifiable` aspect has been applied to the node.

## Remove aspects from a folder or file {#removeaspectsnode}

Removing aspects from a folder or file is a bit more complicated than just updating properties. Here is how to do it.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode){:target="_blank"}
**See also:**

* [How to update metadata](#updatemetadatanode)
* [How to add aspects](#addaspectnode)

Removing an aspect from a node is similar to how you add a “marker” aspect. You first get the list of aspects currently 
applied to the node. Then you remove the aspect from the list. And finally you use an update node call with the updated 
aspect list.

To demonstrate how to remove an aspect and its properties we will assume that we have a node with id d8f561cc-e208-4c63-a316-1ea3d3a4e10e 
that has the `cm:effectivity` aspect applied and its properties `cm:from` and `cm:to` set. Here are the steps to 
remove the aspect:

*Get the list of aspects for the node, set `fields=aspectNames` so you only get back aspects:*

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e?fields=aspectNames' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   144  100   144    0     0   4235      0 --:--:-- --:--:-- --:--:--  4235
{
  "entry": {
    "aspectNames": [
      "rn:renditioned",
      "cm:classifiable",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity"
    ]
  }
}
```

We can see that the node has the `cm:effectivity` aspect applied.

*Take the aspect list and remove this aspect so you end up with the following list:*

```json
{
    "aspectNames": [
      "rn:renditioned",
      "cm:classifiable",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification"
    ]
}
```

*Use this new updated list in the update node call as follows:*

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{
    "aspectNames": [
      "rn:renditioned",
      "cm:classifiable",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification"
    ]
}
' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  | jq
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-16T06:57:54.854+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 34,
      "encoding": "ISO-8859-1"
    },
    "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d",
    "aspectNames": [
      "rn:renditioned",
      "cm:classifiable",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification"
    ],
    "createdAt": "2019-09-05T08:58:24.463+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "0305fc9c-fc1d-405a-abf0-af482a9239ec",
    "properties": {
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:lastThumbnailModification": [
        "doclib:1567673959670",
        "pdf:1567673964745"
      ],
      "cm:description": "My text document description"
    }
  }
}
```

As we can see in the response under `aspectNames`, the new `cm:effectivity` aspect is no longer applied to the node. 
Note also that in the properties list the `cm:to` and `cm:from` properties have been removed automatically.

## Get and Set permissions for a folder or file {#setpermissionsnode}

Get and set permissions for a user or group on a folder or file node.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode){:target="_blank"}

**See also:** 

* [How to update a folder or file](#updatemetadatanode)
* [How to add aspects](#addaspectnode) 
* [How to remove aspects](#removeaspectsnode) 

In most Alfresco solutions it's a requirement to set permissions on folders and files for different groups and users. 
Groups, users, and group memberships are usually synced/imported from an LDAP directory in a production environment. 
It's common to configure permissions for groups on folders so we will look at that and at the same time show also how 
to set permissions on nodes for users.

>**Note:** In Alfresco Content Services 6.2.2 and above changing permissions on a node with no explicit permissions (i.e. all permissions are inherited from a parent) has a time limit for the ACL propagation on children. This is needed for large node-trees where changes cannot be performed synchronously in one transaction due to resource limitations. In these cases the updates to the nodes will be scheduled for asynchronous processing which will be used for all changes that could not be completed within the set time limit. The limit can be configured by changing the `system.fixedACLs.maxTransactionTime` property in the `tomcat/shared/classes/alfresco-global.properties` file. The processing is handled by the `fixedACLsUpdater` job which can be scheduled to run by changing a CRON expression in the property: `system.fixedACLsUpdater.cronExpression`.

Permissions are set on nodes (i.e. folders and files) by updating the metadata for the node.

The following HTTP PUT call is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}`

The Node Identifier for the folder or file node to configure permissions for is specified with the `{id}` parameter. 
Then a body is created with all the data that makes up the permission update.

Here is how the PUT body looks like:

```json
{
  "permissions":
    {
      "isInheritanceEnabled": [true = inherit permissions from parent folder | false = don't inherit any permission settings from parent],
      "locallySet": - array of permissions set locally on the folder
        [
          { "authorityId": "group id or user id",
            "name": "permission role - see below",
            "accessStatus":"[ALLOWED = permission role is allowed| DENIED = permission role is denied]"},
          ...
          }
        ]
    }
}
```

The following list explains the practical meanings of the different high level permission roles:

* **Consumer** - Can read/access folders and files.
* **Contributor** - Consumer + permission to add folders and files.
* **Editor** - Consumer + permission to update folders and files.
* **Collaborator** - Contributor + Editor + permission to update folders and files created by other users.
* **Coordinator** - Full rights, similar to an admin.

There are also more low level permission roles, such as *Read* and *Write*.

If you want to add or remove locally set permissions, then you must first use the GET `/nodes/{id}?include=permissions` 
call to get the complete set of the already locally set permissions. And then update this list of locally set permissions 
to match what you want, you cannot just set a new permission and then expect it to be merged with existing local permissions 
on the server side, this have to be done on the client side.

Let's assume we have a folder called `Engineering` that is created directly under `/Company Home`. To get currently set 
local permissions for this folder use the following call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-?relativePath=/Engineering&include=permissions' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   643    0   643    0     0   3632      0 --:--:-- --:--:-- --:--:--  3653
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable"
    ],
    "createdAt": "2019-12-02T07:54:35.401+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-12-02T07:54:35.401+0000",
    "permissions": {
      "inherited": [
        {
          "authorityId": "GROUP_EVERYONE",
          "name": "Consumer",
          "accessStatus": "ALLOWED"
        }
      ],
      "settable": [
        "Contributor",
        "Collaborator",
        "Coordinator",
        "Editor",
        "Consumer"
      ],
      "isInheritanceEnabled": true
    },
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Engineering",
    "id": "d9cb3cf4-d7fc-4240-acd4-2483c4ca932c",
    "nodeType": "cm:folder",
    "parentId": "32d4ff8a-7f5e-4c90-99d5-e4ac54855b35"
  }
}
```

The `permissions` property contains all the information about what permissions that have been set locally on the folder 
and what permissions that have been inherited from parent folders. In this case there are no locally set permissions, 
just the inherited **Consumer** role permission for group **EVERYONE**.

When we get the permissions for a node we also get back a list of permission roles, in the `settable` property, that can 
be set on the node (depends on the node type).

Let's also look at a the permissions for a public Share site, we can get the document library node information for the 
out-of-the-box site with id `swsdp` as follows:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-?relativePath=/Sites/swsdp/documentLibrary&include=permissions' | jq
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
100  1665    0  1665    0     0   108k      0 --:--:-- --:--:-- --:--:--  116k
{
 "entry": {
   "isFile": false,
   "createdByUser": {
     "id": "mjackson",
     "displayName": "Mike Jackson"
   },
   "modifiedAt": "2011-02-15T20:16:28.292+0000",
   "nodeType": "cm:folder",
   "parentId": "b4cff62a-664d-4d45-9302-98723eac1319",
   "aspectNames": [
     "cm:tagscope",
     "st:siteContainer",
     "cm:ownable",
     "cm:titled",
     "cm:auditable"
   ],
   "createdAt": "2011-02-15T20:16:28.292+0000",
   "isFolder": true,
   "permissions": {
     "inherited": [
       {
         "authorityId": "GROUP_site_swsdp_SiteContributor",
         "name": "SiteContributor",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_site_swsdp_SiteConsumer",
         "name": "SiteConsumer",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_site_swsdp_SiteManager",
         "name": "SiteManager",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_site_swsdp_SiteCollaborator",
         "name": "SiteCollaborator",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_EVERYONE",
         "name": "SiteConsumer",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_EVERYONE",
         "name": "ReadPermissions",
         "accessStatus": "ALLOWED"
       }
     ],
     "settable": [
       "Contributor",
       "Collaborator",
       "Coordinator",
       "Editor",
       "Consumer"
     ],
     "isInheritanceEnabled": true
   },
   "modifiedByUser": {
     "id": "mjackson",
     "displayName": "Mike Jackson"
   },
   "name": "documentLibrary",
   "id": "8f2105b4-daaf-4874-9e8a-2152569d109b",
   "properties": {
     "cm:tagScopeCache": {
       "contentUrl": "store://2019/1/16/15/53/ff4d2006-ec20-4877-b6a3-acc5c44d6410.bin",
       "mimetype": "text/plain",
       "size": 0,
       "encoding": "UTF-8",
       "locale": "en_GB",
       "id": 155,
       "infoUrl": "contentUrl=store://2019/1/16/15/53/ff4d2006-ec20-4877-b6a3-acc5c44d6410.bin|mimetype=text/plain|size=0|encoding=UTF-8|locale=en_GB_"
     },
     "cm:tagScopeSummary": [],
     "cm:owner": {
       "id": "admin",
       "displayName": "Administrator"
     },
     "st:componentId": "documentLibrary",
     "cm:description": "Document Library"
   }
 }
}
```

Here we have a few more inherited permission settings that have been automatically set up when the site was created. 
When you create a site four new groups are also created automatically and default permissions are set up for those. 
Note that the permission role names (`SiteConsumer`, `SiteContributor`, `SiteCollaborator`, and `SiteManager`) are 
slightly different from the ones used when setting local permissions (i.e. `settable`).

Now, let's look at an example of how to update the permissions for the `Engineering` folder node. It should be straight 
forward as we know that this folder doesn't have any locally set permissions.

We will use the following POST body to set new permissions for a group and a user:

```json
{
  "permissions":
    {
      "isInheritanceEnabled": true,
      "locallySet":
        [
          {"authorityId": "GROUP_engineering", "name": "Collaborator", "accessStatus":"ALLOWED"},
          {"authorityId": "test", "name": "Contributor", "accessStatus":"ALLOWED"}
        ]
    }
}
```

In this case we are giving a group with identifier `engineering` **Collaborator** permissions on the `/Company Home/Engineering` 
folder. Note that group identifiers have to be prefixed with `GROUP_`. At the same time we also give the user identified 
with username `test` **Contributor** permissions on the `Engineering` folder.

And here is the call, note that we cannot use the `relativePath` parameter here, instead we have to use the Node Identifier 
for the `Engineering` folder, which we know from the GET call above:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "permissions": { "isInheritanceEnabled": true, "locallySet": [ {"authorityId": "GROUP_engineering", "name": "Collaborator", "accessStatus":"ALLOWED"},{"authorityId": "test", "name": "Contributor", "accessStatus":"ALLOWED"} ] } }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d9cb3cf4-d7fc-4240-acd4-2483c4ca932c?include=permissions'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1099    0   869  100   230  39500  10454 --:--:-- --:--:-- --:--:-- 52333
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable"
    ],
    "createdAt": "2019-12-02T08:50:11.922+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-12-02T09:20:03.409+0000",
    "permissions": {
      "inherited": [
        {
          "authorityId": "GROUP_EVERYONE",
          "name": "Read",
          "accessStatus": "ALLOWED"
        },
        {
          "authorityId": "guest",
          "name": "Read",
          "accessStatus": "ALLOWED"
        }
      ],
      "locallySet": [
        {
          "authorityId": "test",
          "name": "Contributor",
          "accessStatus": "ALLOWED"
        },
        {
          "authorityId": "GROUP_engineering",
          "name": "Collaborator",
          "accessStatus": "ALLOWED"
        }
      ],
      "settable": [
        "Contributor",
        "Collaborator",
        "Coordinator",
        "Editor",
        "Consumer"
      ],
      "isInheritanceEnabled": true
    },
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Engineering",
    "id": "d0ec1a36-0bda-40b9-8602-804b787f800e",
    "nodeType": "cm:folder",
    "parentId": "209d2313-f9e8-4075-b778-08d9d4725cd2"
  }
}
```

Note that by using the `/nodes/d9cb3cf4-d7fc-4240-acd4-2483c4ca932c?include=permissions` PUT call the new permission 
configuration (i.e. the `permissions` property) is returned in the response, so we can see immediately that the new 
local permissions have been set properly in the `locallySet` property.

If you now wanted to update the locally set permissions for the "Engineering" folder again, then you would have to 
include the permissions we just set, and if you don't know them use the `GET /nodes/-root-?relativePath=/Engineering&include=permissions` 
call to fetch them, otherwise they would be removed:

```json
{
  "permissions":
    {
      "isInheritanceEnabled": true,
      "locallySet":
        [
          {"authorityId": "GROUP_engineering", "name": "Collaborator", "accessStatus":"ALLOWED"}, -- permission already set that we want to keep
          {"authorityId": "test", "name": "Contributor", "accessStatus":"ALLOWED"},               -- permission already set that we want to keep
          {"authorityId": more new permission settings here...},
          ...
        ]
    }
}
```

If you wanted to remove all locally set permissions for a node, then you could use the following body in the call:

```json
{
  "permissions": {
    "isInheritanceEnabled": true,
    "locallySet": [ ]
    }
}
```

## Working with relationships between folders/files {#workingwithrelbetweennodes}
## Manage comments for a folder or file
## Manage tags for a folder or file
## Copy folders and files
## Move folders and files
## Lock a file for editing
## Create a link to a file
## Delete a folder or file {#deletenode}
## List deleted folders and files (Trashcan)
## Restore deleted folders and files (Trashcan)
