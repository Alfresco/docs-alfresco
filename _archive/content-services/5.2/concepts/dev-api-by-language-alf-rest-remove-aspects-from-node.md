---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Remove aspects from a folder or file

Removing aspects from a folder or file is a bit more complicated than just updating properties. Here is how to do it.

|API Call|PUT nodes/\{id\}|
|--------|----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode)|
|See also|[How to update metadata](dev-api-by-language-alf-rest-update-node-metadata.md) and [how to add aspects](dev-api-by-language-alf-rest-add-aspects-to-node.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Removing an aspect from a node is similar to how you add a “marker” aspect. You first get the list of aspects currently applied to the node. Then you remove the aspect from the list. And finally you use an update node call with the updated aspect list.

To demonstrate how to remove an aspect and its properties we will assume that we have a node with id d8f561cc-e208-4c63-a316-1ea3d3a4e10e that has the `cm:effectivity` aspect applied and its properties `cm:from` and `cm:to` set. Here are the steps to remove the aspect:

*1\) Get the list of aspects for the node, set `fields=aspectNames` so you only get back aspects:*

```
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

*2\) Take the aspect list and remove this aspect so you end up with the following list:*

```
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

*3\) Use this new updated list in the update node call as follows:*

```
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

As we can see in the response under `aspectNames`, the new `cm:effectivity` aspect is no longer applied to the node. Note also that in the properties list the `cm:to` and `cm:from` properties have been removed automatically.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

