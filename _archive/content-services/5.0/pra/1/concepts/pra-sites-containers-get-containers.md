---
author: Alfresco Documentation
---

# Get a list of containers

Use this to get a list of the top-level containers object for a specific site.

**Note:** Only containers that have the st:siteContainer aspect are returned.

## Method

Using the HTTP GET method:-

```

sites/<siteId>/containers
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com/containers
```

## Response

-   If the siteId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
   "list":{
      "pagination":{
         "count":1,
         "hasMoreItems":false,
         "skipCount":0,
         "maxItems":100
      },
      "entries":[
         {
            "entry":{
               "folderId":"documentLibrary",
               "id":"7fb6c69b-f462-429a-a168-87762f660c65"
            }
         }
      ]
   }
}
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-containers-methods.md)

