---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List deleted folders and files \(Trashcan\)

Listing the content of the so called trashcan is useful if you want to restore soft deleted nodes.

|API Call|GET deleted-nodes|
|--------|-----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/trashcan/listDeletedNodes](http://localhost:8080/api-explorer/#!/trashcan/listDeletedNodes)|
|See also|[How to deleted a file](dev-api-by-language-alf-rest-delete-a-node.md) and [how to restore a deleted file](dev-api-by-language-alf-rest-restore-trashcan-items.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When folders and files are deleted from the Repository, they are actually not physically deleted. They just have their metadata changed a bit so they don’t show up in the user interface. They live in what’s referred to as the Trashcan. If you want to list stuff contained in the Trashcan, then you use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes**

This will list nodes, such as folders and files, that the currently logged in user is the owner of. If you are logged in as an Administrator, then you will see all deleted nodes.

Here is how to make this call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5737  100  5737    0     0   101k      0 --:--:-- --:--:-- --:--:--  101k
{
  "list": {
    "pagination": {
      "count": 10,
      "hasMoreItems": false,
      "totalItems": 10,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-09-09T07:38:55.060+0000",
          "archivedAt": "2019-09-09T10:18:38.832+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-09-09T10:05:50.020+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "newfilename2.txt",
          "archivedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "id": "d8f561cc-e208-4c63-a316-1ea3d3a4e10e",
          "nodeType": "acme:document",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 40,
            "encoding": "ISO-8859-1"
          }
        }
      },
      {
        "entry": {
          "createdAt": "2019-09-05T08:52:16.785+0000",
          "archivedAt": "2019-09-05T08:58:20.746+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-09-05T08:52:16.785+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "somefile.txt",
          "archivedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "id": "8f1c3f76-0eaf-452a-be66-c5405af67dbc",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 34,
            "encoding": "ISO-8859-1"
          }
        }
      },
. . .
```

The response starts with the familiar `pagination` object, which tells you how many `entries`, in this case deleted nodes, that was returned with this call.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

