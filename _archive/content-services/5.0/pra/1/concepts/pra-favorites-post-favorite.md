---
author: Alfresco Documentation
---

# Add a favorite

Use this to add a favorite for a specific person.

## Method

Using the HTTP POST method:

```

people/<personId>/favorites
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/favorites
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|target|object|object|An object identifying the entity to be favorited. The object consists of a single property which is an object with name of **site**, **file**, or **folder**. The content of that object is the **guid** of the target entity.|

## Example POST body

```

{                                                
  "target": {
      "site" : {
        "guid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f"
      }
   }
}
```

## Response

-   If the request is successful an HTTP Created is returned \(status 201\).
-   If the target guid does not describe a site, file, or folder an HTTP `Bad Request` is returned \(status 400\).
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the target entity does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If a favorite already exists with the id of the posted does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If an entity does exist with the id of the posted object, but is not the same type of the posted object, an HTTP `Not Found` is returned \(status 404\).
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

