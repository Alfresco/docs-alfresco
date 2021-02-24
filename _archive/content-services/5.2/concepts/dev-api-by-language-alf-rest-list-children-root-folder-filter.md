---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Filter contents of a folder

Listing the contents of a folder in the repository is really useful, here we also cover how to filter the contents we are listing.

|API Call|GET nodes/\{id\}/children|
|--------|-------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/listNodeChildren](http://localhost:8080/api-explorer/#!/nodes/listNodeChildren)|
|See also|[Listing contents of a folder](dev-api-by-language-alf-rest-list-children-root-folder.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When you know how to list the contents of a folder the next step is usually to filter out content that you are not interested in. Such as filtering out anything that is not of a specific content type.

We use the same URL as when we list the contents of a folder, just with an extra parameter called `where`:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/children?where=\(<filter expression\>\)**

You can think of the where clause in a similar way to how you would think of it in a database query. Firstly, the isFile property can be used to just return files that represent content with type cm:content or a subtype:

**nodes/\{id\}/children?where=\(isFile=true\)**

The same result can be achieved by using the isFolder property too:

**nodes/\{id\}/children?where=\(isFolder=false\)**

To filter the results by a specific content type nodeType can be used in the where clause, for example, to retrieve just the Sites folder use the following URL:

**nodes/\{id\}/children?where=\(nodeType=st:sites\)**

This will result in a single result as shown below:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?where=(nodeType=st:sites)' | jq
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-10-03T08:37:18.732+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-03T08:37:29.544+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "Sites",
          "id": "c1a73d2a-9a5b-422b-8c95-77e694b248a3",
          "nodeType": "st:sites",
          "parentId": "695c2c56-3ba0-4539-b301-12bd9bb47712"
        }
      }
    ]
  }
}
```

To retrieve all nodes of a specific type and its subtypes use the `INCLUDESUBTYPES` moniker, for example:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?relativePath=My%20Stuff&where=(nodeType='acme:document INCLUDESUBTYPES')" | jq            
```

In this example we are listing content in the **/Company Home/My Stuff** folder that has the node type `acme:document` or a subtype of this type.

Finally, the items returned can also be ordered via the `orderBy` query parameter. By default, the **nodes/\{id\}/children** endpoint uses `orderBy=isFolder DESC,name ASC` as the default sort order, which means folders first alphabetically followed by files. To mix files and folders and order them alphabetically in reverse order use the following URL:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?relativePath=My%20Stuff&orderBy=name%20DESC" | jq 
```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

