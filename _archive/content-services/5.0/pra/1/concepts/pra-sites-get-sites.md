---
author: Alfresco Documentation
---

# Get a list of sites

Use this to get a list of sites in your network.

## Method

Using the HTTP GET method:

```

sites
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
   "list":{
      "pagination":{
         "count":1,
         "hasMoreItems":false,
         "totalItems":1,
         "skipCount":0,
         "maxItems":10
      },
      "entries":[
         {
            "entry":{
               "title":"Fred Blogg's Home",
               "description":"Fred Blogg's private home site.",
               "visibility":"PRIVATE",
               "id":"fred-bloggs-yourcompany-com"
            }
         }
      ]
   }
}
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-methods.md)

