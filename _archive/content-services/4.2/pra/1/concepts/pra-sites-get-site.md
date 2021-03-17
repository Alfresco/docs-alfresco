---
author: Alfresco Documentation
---

# Get information for a site

Use this to get a site object for a specific site.

## Method

Using the HTTP GET method:-

```

sites/<siteId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com
```

## Response

-   If the siteId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
      "entry":{
         "title":"Fred Blogg's Home",
         "description":"Fred Blogg's private home site.",
         "visibility":"PRIVATE",
         "id":"fred-bloggs-yourcompany-com"
      }
}
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-methods.md)

