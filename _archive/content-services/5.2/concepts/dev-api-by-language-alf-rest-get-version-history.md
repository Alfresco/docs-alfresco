---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get file version history

When a file has versioning turned on you can get its version history.

|API Call|GET nodes/\{id\}/versions|
|--------|-------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/versions/listVersionHistory](http://localhost:8080/api-explorer/#!/versions/listVersionHistory)|
|See also|[Upload a new version of a file](dev-api-by-language-alf-rest-upload-file-new-version.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When we have a file with versioning turned on \(i.e. the `cm:versionable` aspect applied\) we can retrieve its version history. This will give us information about all the previous versions of the file that are available for download. The following HTTP GET call is used to fetch the version history:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/versions**\>

We need to specify the Node Identifier \(i.e. `{id}`\) for the versioned file node.

Here is how to fetch the version history for a text file with Node Identifier 90d0dd09-93d2-448c-9c23-24de24c3f6ff:

```
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

The call returns a `pagination` object with information about the number of versions available for this file, in this case 4, which are described in `entry` objects. To retrieve the content for a version other than the latest, which is returned when getting content for a file, use the following GET call:

**/nodes/\{nodeId\}/versions/\{versionId\}/content**

So, to get the content for the first version of this file use the `versionId` 1.0 as follows:

```
$ curl -X GET -H 'Accept: text/plain' -H 'Authorization: Basic VElDS0VUX2M3YzdkOWFjONTU1MDM4NDFmMWUzMmMyNjM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/90d0dd09-93d2-448c-9c23-24de24c3f6ff/versions/1.0/content'
This is a text file     
```

The `versionId` is the same as the version label.

To revert to a previous version of the file we have to POST the following:

```
{
  "majorVersion": true,
  "comment": "Reverted to original"
}
```

To the following URL:

**/nodes/\{nodeId\}/versions/\{versionId\}/revert**

‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍We are able to specify whether the reverted version will create a new minor or major version and again provide a comment describing the reason for the additional version.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

