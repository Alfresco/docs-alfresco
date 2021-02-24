---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get folder/file metadata

Getting the metadata for a node returns the properties for the node type and applied aspects.

|API Call|GET nodes/\{id\}|
|--------|----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/getNode](http://localhost:8080/api-explorer/#!/nodes/getNode)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Sometimes it is useful to get all metadata \(i.e. everything except the content, such as content type, aspects, properties, associations etc\) for just one node \(e.g. folder, file etc\) in the Repository. This can be done with the following HTTP GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}**

The `{id}` part can be any of the constants `-root-`, `-my-`, `-shared-` or an Alfresco Node Identifier \(e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e\). The `relativePath` parameter can also be used in combination with the `id`.

To get the metadata, meaning all properties, for the root folder in the Repository \(i.e. Company Home\) make the following call:

```
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

When you request data for a single node the aspects and properties are returned by default, in contrast to when listing children of a node.

We can see the Alfresco Node Identifier in the response above \(i.e. `id`\). We can use it instead of the `-root-` constant:

```
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

When fetching metadata for a node via the **GET /nodes/\{id\}** call you can add an extra parameter called `include` and use it to request extra data in the response. One of the values the include parameter can have is `association`, which will return the parent association type for the node. In the following example we request the parent association for the **/Company Home/Data Dictionary** node as follows \(*note* also the use of the `relativePath` parameter\):

```
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

At first you might get the idea that the `include=association` parameter would give a collection of all child and peer associations for the node. But it will actually just return the primary parent type as in the above example \(and note that the `association` value is actually not written in plural\):

```
...
    "association": {
      "isPrimary": true,
      "assocType": "cm:contains"
    },
 ...
```

If you wanted to get all the peer associations for a node have a look at this [page](dev-api-by-language-alf-rest-set-up-assoc-folders-files.md) instead, it explains how you can use **GET /nodes/\{id\}/sources** and **GET /nodes/\{id\}/targets** calls for that. And you can of courser get the parent-child associations for a node with the **GET /nodes/\{id\}/children** call.

There are more data that you can include in the response, such as folder path to the node and permissions set on the node. In the following example we request this extra data by setting `include=association,path,permissions`:

```
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

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

