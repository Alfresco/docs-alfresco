---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Create a folder

Creating a folder means creating a node with metadata.

|API Call|POST nodes/\{id\}/children|
|--------|--------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode)|
|See also|[How to update metadata](dev-api-by-language-alf-rest-update-node-metadata.md) and [how to add aspects](dev-api-by-language-alf-rest-add-aspects-to-node.md) and [how to manage associations \(contains examples of creating folder\)](dev-api-by-language-alf-rest-set-up-assoc-folders-files.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When we are familiar with how to list the contents of a folder, and fetch metadata for a folder or file, then it makes sense to start looking at creating nodes. Let’s start by looking at how to create a folder. The following HTTP POST call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/children**

So we are basically making a POST call to the children collection for a folder when we are creating a node, such as a folder. The `{id}` part represents the folder under which we want to create a sub-folder. The `id` can be either one of the constants `-root-`, `-shared-`, `-my-` or an Alfresco Node Identifier \(e.g. 444be4a6-5693-4d10-af4b-b55448fe4f97\). The POST data defines the folder metadata and looks like in this example:

```
{
  "name": "My Folder",
  "nodeType": "cm:folder",
  "properties": {
    "cm:title": "My Folder",
    "cm:description": "My new folder"
  }
}
```

Here is how to create a folder with the name **My Folder** directly under the Company Home \(i.e. `-root-`\) folder:

```
$ curl -H "Content-Type: application/json" -d '{"name":"My Folder","nodeType":"cm:folder", "properties": { "cm:title":"My Folder", "cm:description":"My new folder"}}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   622  100   503  100   119  10702   2531 --:--:-- --:--:-- --:--:-- 13234
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable"
    ],
    "createdAt": "2019-09-02T12:24:52.887+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-02T12:24:52.887+0000",
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "My Folder",
    "id": "1e8d8df6-7d33-4966-83db-0333a7f6277a",
    "nodeType": "cm:folder",
    "properties": {
      "cm:title": "My Folder",
      "cm:description": "My new folder"
    },
    "parentId": "444be4a6-5693-4d10-af4b-b55448fe4f97"
  }
}
```

When you create a node a JSON object is returned with the data that was created by the system, such as the properties of the `cm:auditable` aspect \(i.e. `cm:created`, `cm:creator` etc\). The generated Alfresco Node Identifier \(i.e. `id`\) is also returned.

You may have noticed that slightly more information about the node \(`aspectNames` and `properties`\) is returned by default even through we are still using a "performance first" principle. In the same way the `include` parameter is used when listing nodes, it can also be used when creating nodes to list extra information or limit what is listed.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

