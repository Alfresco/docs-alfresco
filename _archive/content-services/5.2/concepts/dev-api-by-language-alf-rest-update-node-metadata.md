---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Update metadata for a folder or file

Update the properties, also referred to as metadata, for a folder or file.

|API Call|PUT nodes/\{id\}|
|--------|----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode)|
|See also|[How to add aspects](dev-api-by-language-alf-rest-add-aspects-to-node.md) and [how to remove aspects](dev-api-by-language-alf-rest-remove-aspects-from-node.md) and [how to get and set permissions](dev-api-by-language-alf-rest-get-set-node-permissions.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Quite often you want to update some metadata for a folder or file. It can for example be as part of a business process that is used to process content, and at different places in the flow, folders and files should be updated to reflect the processing state. The ReST API implements partial update via PUT. Although technically this is not RESTful it was decided to bend the rules here to keep things as simple as possible for clients, meaning the client only needs to send the data that is changing, with one exception related to aspects.

Metadata is all the information about the folder or file node except the actual content, if it's a file node. Folder nodes don't have any content. This is properties, aspects, associations, content type etc.

To update metadata for a node use the following HTTP PUT call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}**

The Node Identifier for the folder or file node to be updated is specified with the `{id}` parameter. Then a body is created with all the data that makes up the update.

The following call will update the metadata for a text file identified with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier. The data that is passed in the PUT call looks as follows:

```
{ 
  "name":"newfilename.txt",
  "properties": { 
    "cm:title":"UPDATED My text file", 
    "cm:description":"UPDATED My text file description"
  }
}
```

And here is the call:

```
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

In the returned `entry` object we can see that the `name` of the file has been updated successfully plus the `cm:titled` aspect properties.

This PUT call can also be used to rename the node by just providing a `cm:name` property in the properties as shown below:

```
{
  "properties":
  {
    "cm:name":"renamed-name.txt"
  }
}‍‍‍‍‍‍
```

Alternatively, the top level `name` property can also be used as in our example above:

```
{
  "name":"renamed-file.txt"
}‍‍‍
```

Similarly, the owner of the node can be updated, just provide the `cm:owner` property as follows:

```
{
  "properties":
  {
    "cm:owner":"mbergljung"
  }
}‍‍‍‍‍‍
```

There is one exception to the partial update rule and that is for managing aspects. To change the aspects applied to a node the whole complete array has to be provided. Any aspects the node has applied but are not present in the array will be removed. Conversely, any aspects in the array that the node does not have applied are added. See the link at the beginning of this page to a section about adding aspects.

Finally, the type of the node can also be changed by updating the `nodeType` property, for example to change our node type to `cm:savedquery` use the following body:

```
{
  "nodeType":"cm:savedquery"
}‍‍‍
```

In the examples above we've used a file, everything can obviously also be done for folders.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

