---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Restore deleted folders and files \(Trashcan\)

Folders and files are "soft deleted", meaning they are not physically gone from the system when deleted, so they can be restored as described on this page.

|API Call|POST deleted-nodes/\{id\}/restore|
|--------|---------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/trashcan/restoreDeletedNode](http://localhost:8080/api-explorer/#!/trashcan/restoreDeletedNode)|
|See also|[How to list deleted files](dev-api-by-language-alf-rest-list-trashcan.md) and [how to deleted a folder or file](dev-api-by-language-alf-rest-delete-a-node.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Soft deleted folders and files that live in the so called Trashcan can be restored so they are visible in the user interface again. They will show up in the folder from where they were deleted. Use the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes/\{id\}/restore**

The `{id}` parameter represents the node identifier and you can get it by first listing the deleted nodes.

Let's say that we have the following deleted image file node called luna\_1.jpeg with Node ID `4bda2a4d-5013-46fa-93bd-104dd58e1596`, we can get info about it with the following **/deleted-nodes/\{node id\}** GET call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes/4bda2a4d-5013-46fa-93bd-104dd58e1596?include=path' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1220    0  1220    0     0   6354      0 --:--:-- --:--:-- --:--:--  6354
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2020-03-02T07:34:07.547+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "image/jpeg",
      "mimeTypeName": "JPEG Image",
      "sizeInBytes": 5704,
      "encoding": "UTF-8"
    },
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:thumbnailModification",
      "exif:exif",
      "cm:ownable",
      "cm:titled",
      "cm:dublincore",
      "cm:auditable",
      "cm:author"
    ],
    "createdAt": "2020-02-25T14:05:21.137+0000",
    "archivedAt": "2020-03-02T07:36:22.001+0000",
    "path": {
      "name": "/Company Home",
      "isComplete": true,
      "elements": [
        {
          "id": "ffbc5c54-2efb-4b84-8ba9-40450620023c",
          "name": "Company Home",
          "nodeType": "cm:folder",
          "aspectNames": [
            "cm:titled",
            "cm:auditable",
            "app:uifacets"
          ]
        }
      ]
    },
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "luna_1.jpeg",
    "archivedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "id": "4bda2a4d-5013-46fa-93bd-104dd58e1596",
    "properties": {
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:subject": "adds the aspect automatically",
      "exif:pixelYDimension": 225,
      "cm:owner": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "exif:pixelXDimension": 225,
      "cm:lastThumbnailModification": [
        "doclib:1582639531285",
        "imgpreview:1582639533828"
      ]
    }
  }
}
```

Note that by setting the `include` parameter to `path` the full folder path for the deleted node is also returned. In this case the node was stored under **/Company Home**.

To restore this node we can make the following **/deleted-nodes/\{node id\}/restore** POST call:

```
curl -X POST -H 'Content-Type: text/plain;charset=UTF-8' -H 'Content-Length: 0' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes/4bda2a4d-5013-46fa-93bd-104dd58e1596/restore' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   883    0   883    0     0   2201      0 --:--:-- --:--:-- --:--:--  2196
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2020-03-02T07:34:07.547+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "image/jpeg",
      "mimeTypeName": "JPEG Image",
      "sizeInBytes": 5704,
      "encoding": "UTF-8"
    },
    "parentId": "ffbc5c54-2efb-4b84-8ba9-40450620023c",
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:dublincore",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "exif:exif"
    ],
    "createdAt": "2020-02-25T14:05:21.137+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "luna_1.jpeg",
    "id": "4bda2a4d-5013-46fa-93bd-104dd58e1596",
    "properties": {
      "exif:pixelYDimension": 225,
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:subject": "adds the aspect automatically",
      "exif:pixelXDimension": 225,
      "cm:lastThumbnailModification": [
        "doclib:1582639531285",
        "imgpreview:1582639533828"
      ]
    }
  }
}
```

The response contains an `entry` object with the metadata for the restored node.

Note that when you make the above restore POST call there's no JSON data supplied. Because of this it's important that the `-H 'Content-Type: text/plain;charset=UTF-8' -H 'Content-Length: 0'` headers are set.

Now, if the target folder is no longer there \(i.e. it's been deleted after the file node was deleted\), then you must supply a new parent folder node id \(`targetParentId`\) with a call looking like this:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{
  "targetParentId": "5a858591-752f-49d0-b686-e2e1a830ea8d",
  "assocType": "cm:contains"
}' 
'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes/4bda2a4d-5013-46fa-93bd-104dd58e1596/restore' | jq
...
```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

