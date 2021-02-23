---
author: Alfresco Documentation
---

# Get a person's preferences

Use this to get a list of preferences for a specific person.

**Note:** In some instances, sites that have been deleted can appear in the response to this method. To avoid this, use the newer [Favorites API](pra-favorites.md).

## Method

Using the HTTP GET method:-

```

people/<personId>/preferences
```

A personID is always the email address that they registered with.

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/preferences
```

## Response

-   If the personId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
  "list" : {
    "pagination" : {
      "count" : 3,
      "hasMoreItems" : false,
      "skipCount" : 0,
      "maxItems" : 100
    },
      "entries":[
        {
            "entry":{
              "value":"4452493d-675f-42f2-9fb9-50ee97c8c5c9,b8a10d93-b383-4127-9f36-ff0ec5f2c450",
              "id":"org.alfresco.share.documents.favourites"
            }
         },
         {
            "entry":{
              "value":true,
              "id":"org.alfresco.share.sites.favourites.fred-bloggs-yourcompany-com"
            }
         },
         {
            "entry":{
              "value":true,
              "id":"org.alfresco.share.sites.favourites.test-site-1"
            }
         }
      ]
   }
}
```

**Parent topic:**[Preferences](../../../pra/1/concepts/pra-people-preferences.md)

