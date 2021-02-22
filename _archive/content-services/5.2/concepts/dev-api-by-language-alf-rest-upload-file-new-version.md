---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Upload a new version of file

Uploading a new version of a file means replacing the content and creating a new entry in the version history.

|API Call|PUT nodes/\{id\}/content|
|--------|------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/updateNodeContent](http://localhost:8080/api-explorer/#!/nodes/updateNodeContent)|
|See also|[Upload a file](dev-api-by-language-alf-rest-upload-file.md) and [Upload a file with custom type](dev-api-by-language-alf-rest-upload-file-custom-type.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When we have files in the Repository it is common to want to update the content for them. The following HTTP PUT call is used to upload a new version of a file:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/content?majorVersion=\[true\|false\]&comment=<comment about what changed**\>

We need to specify the Node Identifier \(i.e. `{id}`\) for the file node that should have its content updated. You can choose to do a major version update or a minor version update using the `majorVersion` parameter. A comment about the content update can be specified with the `comment` parameter.

Here is how to update a text file with Node Identifier d8f561cc-e208-4c63-a316-1ea3d3a4e10e and make a major version change:

```
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

The call returns an `entry` object with all the information about the updated file node. Note that the `cm:versionLabel` has changed to `1.1` as we choose to do a minor version update. If we would have done a major version update, then it would have been set to 2.0. When versioning is turned on for a file, such as in this case, each previous version of the file is saved on disk.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

