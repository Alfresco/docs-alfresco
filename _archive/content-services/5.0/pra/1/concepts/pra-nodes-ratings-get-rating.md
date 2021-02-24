---
author: Alfresco Documentation
---

# Get a specific rating

Use this to get a specific rating on a specific node.

## Method

Using the HTTP GET method:

```

nodes/<nodeId>/rating/rating/<ratingId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b9ee-8687d9fd1e82/rating/likes
```

## Response

-   If the nodeId does not exist an HTTP `Not Found` is returned \(status 404\).
-   If the ratingId does not exist an HTTP `Bad request` is returned \(status 400\).
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```
{
  "entry" : {
    "id" : "likes",
    "aggregate" : {
      "numberOfRatings" : 0
    }
  }
}
```

**Parent topic:**[Ratings](../../../pra/1/concepts/pra-nodes-ratings.md)

