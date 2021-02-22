---
author: Alfresco Documentation
---

# Favorite sites

The sites that a person has marked as favorite in Alfresco \(Deprecated\). Use the favorites entity and methods.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/people](https://api-explorer.alfresco.com/api-explorer/#/people). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/people](http://localhost:8080/api-explorer/#/people).

## Favorite-sites object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|email id|string|The person's personId. The email address the person registered with.|
|site|[site](pra-sites.md)|object|An embedded site object.|

## Example of a favorite-sites object

```

{
  "list" : {
    "pagination" : {
      "count" : 1,
      "hasMoreItems" : false,
      "totalItems" : 1,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
          "id" : "fred-bloggs-yourcompany-com",
          "title" : "Fred Bloggs's Home",
          "visibility" : "PRIVATE",
          "description" : "Fred Bloggs's private home site."
      }
    } ]
  }
}
```

## List order

Lists of these entities are returned ordered by ascending `title`.

**Parent topic:**[People](../../../pra/1/concepts/pra-people.md)

