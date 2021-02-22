---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Move folders and files

Moving folders and files means moving nodes.

|API Call|POST nodes/\{id\}/move|
|--------|----------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/moveNode](http://localhost:8080/api-explorer/#!/nodes/moveNode)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Moving folders and files is a useful feature when you want to restructure your repository. The following HTTP POST call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/move**

The Node Identifier for the folder or file node to be moved is specified with the `{id}` parameter. The destination folder is specified with the following POST request data:

```
{
  "targetParentId": "<a folder node identifier>"
}
```

If a folder is moved, then all its content \(i.e. sub folders and files\) is also moved recursively. The moved folder or file will have the same name at the destination, unless you pass on a name property with a new name.

The following call will move a text file identified with the 3817c238-976f-426a-9a18-c6727dbab9dd Node Identifier to a destination folder identified with the node identifier e5989b9a-3fad-4742-8b14-bef1e13efd25:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/3817c238-976f-426a-9a18-c6727dbab9dd/move' -d '{ "targetParentId": "e5989b9a-3fad-4742-8b14-bef1e13efd25" }' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   773    0   713  100    60   3961    333 --:--:-- --:--:-- --:--:--  4294
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-30T12:59:32.725+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 19,
      "encoding": "UTF-8"
    },
    "parentId": "e5989b9a-3fad-4742-8b14-bef1e13efd25",
    "aspectNames": [
      "rn:renditioned",
      "cm:titled",
      "app:inlineeditable",
      "cm:auditable",
      "cm:thumbnailModification"
    ],
    "createdAt": "2019-09-30T12:35:29.239+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "3817c238-976f-426a-9a18-c6727dbab9dd",
    "properties": {
      "app:editInline": true,
      "cm:lastThumbnailModification": [
        "pdf:1569846933467",
        "doclib:1569847995534"
      ]
    }
  }
}
```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

