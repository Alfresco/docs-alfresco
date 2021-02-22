---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Add aspects to a folder or file

Addning aspects to a folder or file is a bit more complicated than just updating properties. Here is how to do it.

|API Call|PUT nodes/\{id\}|
|--------|----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode)|
|See also|[How to update metadata](dev-api-by-language-alf-rest-update-node-metadata.md) and [how to remove aspects](dev-api-by-language-alf-rest-remove-aspects-from-node.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When you set a property on a file via the update node call the associated aspect will be applied automatically for you, if it’s not already set on the node. Let’s take the out-of-the-box `cm:effectivity` aspect for example, it has two properties `cm:from` and `cm:to`. If we set one or both of these properties, then the aspect should be applied automatically.

The following HTTP PUT call is used \(same as when updating metadata for a node\):

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}**

The folder or file node that should be updated with a new aspect is specified with the `{id}` parameter, which represents the Node Identifier. Then a body is created with all the properties belonging to the aspect.

The following call will add the `cm:effectivity` aspect to the text file identified with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier. The data that is passed in the PUT call looks as follows:

```
{ 
  "properties": { 
    "cm:from":"2019-09-10T08:00:00.000+0000", 
    "cm:to": "2019-09-12T21:00:00.000+0000"
  }
}
```

And here is the call:

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "properties": { "cm:from": "2019-09-10T08:00:00.000+0000", "cm:to": "2019-09-12T21:00:00.000+0000"}}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1021  100   919  100   102   4048    449 --:--:-- --:--:-- --:--:--  4497
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-09T12:47:20.877+0000",
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
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity"
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
      "cm:from": "2019-09-10T08:00:00.000+0000",
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:to": "2019-09-12T21:00:00.000+0000",
      "cm:lastThumbnailModification": [
        "doclib:1567673959670",
        "pdf:1567673964745"
      ],
      "cm:description": "My text document description"
    }
  }
}
```

In the returned entry we can see that the `cm:effectivity` aspect has been applied to the node and the associated properties `cm:from` and `cm:to` have been set accordingly. These properties are of the `datetime` data type and must be specified using the extended format defined by ISO standard 8601:2004. They are always in UTC.

What about an aspect that does not have any properties, a so called “marker” aspect, how do you add it to a folder or file? You will first use the get node metadata call to get all aspects, then you will add the “marker” aspect to this list. Then call the update node call with the new aspect list. Here is how to do this:

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

*2\) Add the “marker” aspect to this list:*

Let’s use the following out-of-the-box aspect:

```
<aspect name="cm:classifiable">
  <title>Classifiable</title>
</aspect>
```

The `cm:classifiable` aspect makes it possible to apply different types of categories to a node, such as a country. The updated aspect list that will be passed in the PUT call looks as follows:

```
{
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity",
      "cm:classifiable"
    ]
}
```

*3\) Here is how the call looks like:*

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{
    "aspectNames": [
      "rn:renditioned",
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "cm:thumbnailModification",
      "cm:effectivity",
      "cm:classifiable"
    ]
}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  | jq
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-16T06:36:09.968+0000",
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
      "cm:thumbnailModification",
      "cm:effectivity"
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
      "cm:from": "2019-09-10T08:00:00.000+0000",
      "cm:title": "My text",
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "cm:to": "2019-09-12T21:00:00.000+0000",
      "cm:lastThumbnailModification": [
        "doclib:1567673959670",
        "pdf:1567673964745"
      ],
      "cm:description": "My text document description"
    }
  }
}
```

We can see in the response under `aspectNames` that the new `cm:classifiable` aspect has been applied to the node.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

