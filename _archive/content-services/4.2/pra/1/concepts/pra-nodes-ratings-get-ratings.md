---
author: Alfresco Documentation
---

# Get a node's ratings

Use this to get the ratings on a specific node.

## Method

Using the HTTP GET method:-

```

nodes/<nodeId>/ratings
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b9ee-8687d9fd1e82/ratings
```

## Response

-   If the nodeId does not exist an HTTP `Not Found` is returned \(status 404\).
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

Note that the return object is always a list with an entry for each rating scheme id. If node has not been rated in a scheme, then the `ratedAt` and `myRating` properties are null, and are not present in the response object.

```
{
  "list" : {
    "pagination" : {
      "count" : 2,
      "hasMoreItems" : false,
      "totalItems" : 2,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "id" : "likes",
        "aggregate" : {
          "numberOfRatings" : 1
        },
        "ratedAt" : "2012-07-30T17:31:32.242+0000",
        "myRating" : true
      }
    }, {
      "entry" : {
        "id" : "fiveStar",
        "aggregate" : {
          "numberOfRatings" : 0
        }
      }
    } ]
  }
}
```

**Parent topic:**[Ratings](../../../pra/1/concepts/pra-nodes-ratings.md)

