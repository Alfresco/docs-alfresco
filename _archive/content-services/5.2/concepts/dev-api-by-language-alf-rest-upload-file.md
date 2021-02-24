---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Upload a file

Uploading a file to the Repository means creating a node with metadata and content.

|API Call|POST nodes/\{id\}/children|
|--------|--------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode)|
|See also|[How to update metadata](dev-api-by-language-alf-rest-update-node-metadata.md) and [how to add aspects](dev-api-by-language-alf-rest-add-aspects-to-node.md) and [how to manage associations \(contains examples of uploading files\)](dev-api-by-language-alf-rest-set-up-assoc-folders-files.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Creating a file is slightly different from creating a folder as a file also has content. The following HTTP POST call is used \(same as when creating other types of nodes, such as folders\):

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/children**

So we are basically making a POST call to the children collection for a folder when we are creating a file. The `{id}` part represents the folder under which we want to create the file. The `id` can be either one of the constants `-root-`, `-shared-`, `-my-` or an Alfresco Node Identifier \(e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e\).

As well as accepting JSON when creating a node with metadata, the same endpoint \(i.e. **nodes/\{id\}/children**\) also accepts `multipart/form-data`, allowing us to upload content from a standard HTML form or from the command line using curl.

When we make the POST with curl we have to do it as form data submission, with each form field specified with `-F`. The `filedata` field will point to the contents of the file we are uploading. The `name` field specifies the name we want to give the file when it’s stored in the Repository \(i.e. `cm:name`\). The `nodeType` field is used to set the content type that the file should have. We can use the `relativePath` field to store the file in a different location relative to the `{id}`. Any other field that we specify will be treated as a property that should be set on the node \(e.g. `cm:title`\).

Here is how to create a file under a folder called **My Folder**, which is located under the root folder \(i.e. `-root-`\). If the folder does not exist, then it will be created:

```
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

When uploading content it's quite common for a file with the same name to exist, this will generate an error by default, to avoid the error the `autoRename` form field can be set to `true`. If a filename clash is detected a suffix will be added to the filename, for example my-file.txt will become my-file-1.txt.

Let's try and upload the somefile.txt again as above but with the `autoRename` parameter set to `true`:

```
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

We can see that the file was created with the name somefile-1.txt as expected.

Another feature of the repository we can control when uploading content is the generation of a rendition. To have the Share thumbnail rendition generated, provide a `renditions` form field with a value of `doclib` as shown here:

```
$ curl -X POST -F filedata=@test.txt -F "name=somefile.txt" -F "nodeType=cm:content" -F "cm:title=My text" -F "cm:description=My text document description" -F "relativePath=My Folder" -F "autoRename=true" -F "renditions=doclib" -H 'Authorization: Basic VElDS0VUX2I1YmVjODNkZTQ2ZDI5NDAzMTMzZTk2N2EwYjNjYmE5NjExYmYzOWY=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
```

Currently only one rendition can be requested, there are plans to allow multiple in the future hence the plural form field name.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

