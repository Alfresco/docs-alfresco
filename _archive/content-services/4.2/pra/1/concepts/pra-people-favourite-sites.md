---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Favorite sites

The sites that a person has marked as favorite in Alfresco \(Deprecated\). Use the favorites entity and methods.

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

-   **[Get a person's favorite sites](../../../pra/1/concepts/pra-people-get-favourite-sites.md)**  
Use this to get a list of sites that a specific person is a member of \(Deprecated\).

**Parent topic:**[People](../../../pra/1/concepts/pra-people.md)

