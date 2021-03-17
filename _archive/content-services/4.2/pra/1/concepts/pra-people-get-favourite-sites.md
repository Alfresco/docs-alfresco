---
author: Alfresco Documentation
---

# Get a person's favorite sites

Use this to get a list of sites that a specific person is a member of \(Deprecated\).

**Note:** This method is deprecated. Use the [Favorites](pra-favorites.md) entity and methods.

## Method

Using the HTTP GET method:-

```

people/<personId>/favorite-sites
```

A personID is always the email address that they registered with.

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/favorite-sites
```

## Response

-   If the personId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
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
                    "id":"fred-bloggs-yourcompany-com",
                    "title":"Fred Bloggs's Home",
                    "visibility":"PRIVATE"
                 }
            }
       ]
    }
}
```

Note that each entry in the response list is a [Favorite sites](pra-people-favourite-sites.md) entity.

**Parent topic:**[Favorite sites](../../../pra/1/concepts/pra-people-favourite-sites.md)

