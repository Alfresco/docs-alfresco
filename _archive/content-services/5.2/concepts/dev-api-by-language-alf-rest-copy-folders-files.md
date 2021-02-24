---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Copy folders and files

Copying folders and files means copying nodes.

|API Call|POST nodes/\{id\}/copy|
|--------|----------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/copyNode](http://localhost:8080/api-explorer/#!/nodes/copyNode)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Copying folders and files is a useful feature when you want to base new work on something that already exists. The following HTTP POST call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/copy**

The Node Identifier for the folder or file node to be copied is specified with the \{id\} parameter. The destination folder is specified with the following POST request data:

```
{
  "targetParentId": "<a folder node identifier>"
}
```

If a folder is copied, then all its content \(i.e. sub folders and files\) is also copied recursively. The copied folder or file will have the same name in the new location, unless you pass on a `name` property with a new name.

The following call will copy a text file identified with the 3817c238-976f-426a-9a18-c6727dbab9dd Node Identifier to a destination folder identified with the Node Identifier e5989b9a-3fad-4742-8b14-bef1e13efd25:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/3817c238-976f-426a-9a18-c6727dbab9dd/copy' -d '{ "targetParentId": "e5989b9a-3fad-4742-8b14-bef1e13efd25" }' | jq

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   669    0   609  100    60   4578    451 --:--:-- --:--:-- --:--:--  5030
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-30T12:42:03.055+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 19,
      "encoding": "UTF-8"
    },
    "parentId": "e5989b9a-3fad-4742-8b14-bef1e13efd25",
    "aspectNames": [
      "cm:copiedfrom",
      "cm:titled",
      "cm:auditable",
      "app:inlineeditable"
    ],
    "createdAt": "2019-09-30T12:42:03.055+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "ae84a06e-1b70-404a-94ed-20faf8ebaf5e",
    "properties": {
      "app:editInline": true
    }
  }
}
```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

