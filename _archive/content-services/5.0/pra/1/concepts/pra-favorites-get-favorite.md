---
author: Alfresco Documentation
---

# Get a favorite

Use this to get a specific favorite for a specific person.

## Method

Using the HTTP GET method:-

```

people/<personId>/favorites/<targetGuid>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/favorites/8ac18731-601b-4bb4-be1a-cd5d252cce3f
```

## Response

-   If the request is successful an HTTP `OK` is returned \(status 200\).
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If there is no favorite with the **targetGuid** for the **personId** an HTTP `Not Found` is returned \(status 404\).
-   If the current user does not have permission to access the favorites of the **personId**, an HTTP `Not Found` is returned \(status 404\).

## Example response body

```

{  
  "entry" : {
     "targetGuid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
     "createdAt" : "2012-07-20T21:46:09.659+0000",
     "target": {
         "site" : {
           "id" : "foo",
           "guid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
           "title" : "The Foo Site",
           "visibility" : "PRIVATE",
           "description" : "The Foo Site",
           "role" : "SiteManager"
         }
      }
   }
}

```

**Parent topic:**[Favorites](../../../pra/1/concepts/pra-favorites.md)

