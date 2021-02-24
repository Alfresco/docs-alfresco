---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Create a link to a file

Create a link to a file or folder stored somewhere else.

|API Call|POST nodes/\{parentFolderNodeId\}/children|
|--------|------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode)|
|See also|[How to manage associations between folders and files](dev-api-by-language-alf-rest-set-up-assoc-folders-files.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Sometimes it's really useful to be able to create a link in a folder to a file or folder stored somewhere else. You want one source of truth for your content and avoid uploading a file more than once.

It's possible to link to both folders and files. The content model type for a file link is `app:filelink` and it's defined as follows:

```
<type name="app:filelink">
  <title>File Link Object</title>
  <parent>cm:link</parent>
</type>
```

It inherits from the content model type `cm:link`, which is also the base type for the folder link type `app:folderlink`. The `cm:link` type is defined as follows:

```
<type name="cm:link">
   <title>Link Object</title>
   <parent>cm:cmobject</parent>
   <properties>
      <property name="cm:destination">
         <title>Link Destination</title>
         <type>d:noderef</type>
         <mandatory>true</mandatory>
      </property>
   </properties>
</type>
```

By the looks of it we would need to make a POST call with what link type we want, the destination node, and a name of the link:

```
{
  "name": "The name of this link",
  "nodeType": "[app:filelink | app:folderlink]",
  "properties" : {
     "cm:destination" : "file or folder Node Identifier"
  }
}
```

The following HTTP POST call is used \(same as when creating file and folder nodes\):

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/children**

So we are basically making a POST call to the children collection for a folder where we want to create a link.

The `{id}` parameter represents the folder under which we want to create the link. The `id` can be either one of the constants `-root-`, `-shared-`, `-my-` or an Alfresco Node Identifier \(e.g. d8f561cc-e208-4c63-a316-1ea3d3a4e10e\).

As an example we will look at how to create a file link under a folder called **My Folder** with Node Identifier 8eadf31b-46e9-45cc-81d0-b6d2f2141d22.

We will POST the following data where the link is to a text file identified by the Node Identifier 7279b5c5-da55-4e98-8b12-72d33b90c810:

```
{
  "name": "Link to a text file",
  "nodeType": "app:filelink",
  "properties" : {
    "cm:destination" : "7279b5c5-da55-4e98-8b12-72d33b90c810"
  }
}
```

The call looks like this:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUX2I1YmVjODNkZTQ2ZDI5NDAzMTMzZTk2N2EwYjNjYmE5NjExYmYzOWY=' -d '{ "name": "Link to a text file", "nodeType": "app:filelink", "properties" : { "cm:destination" : "7279b5c5-da55-4e98-8b12-72d33b90c810" } }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/8eadf31b-46e9-45cc-81d0-b6d2f2141d22/children' | jq
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                              Dload  Upload   Total   Spent    Left  Speed
100   642    0   503  100   139   7289   2014 --:--:-- --:--:-- --:--:--  9171
{
  "entry": {
    "aspectNames": [
      "cm:auditable"
    ],
    "createdAt": "2019-12-05T07:43:19.536+0000",
    "isFolder": false,
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-12-05T07:43:19.536+0000",
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Link to a text file",
    "id": "56671a45-48a7-4640-9fb5-04887a8eb7d2",
    "nodeType": "app:filelink",
    "properties": {
      "cm:destination": "7279b5c5-da55-4e98-8b12-72d33b90c810"
    },
    "parentId": "8eadf31b-46e9-45cc-81d0-b6d2f2141d22"
  }
}
```

We can see that the file link was created successfully with the Node Identifier \(`id`\) returned in the response.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

