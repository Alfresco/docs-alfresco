---
author: Alfresco Documentation
---

# Rate a node

Use this to rate a specific node.

## Method

Using the HTTP POST method:

```
nodes/<nodeId>/ratings
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b9ee-8687d9fd1e82/ratings
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|enumerated type|string|The rating scheme type. Possible values are `likes` and `fiveStar`.|
|myRating|boolean or integer|boolean or number|The rating. The type is specific to the rating scheme, boolean for the `likes` and an integer for the `fiveStar`|

## Example POST body

```

{
    "id": "likes",
    "myRating" : true
}
```

## Response

-   If the nodeId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP CREATED response \(status 201\) is returned.

## Example response body

```

{
  "entry" : {
    "id" : "likes",
    "aggregate" : {
      "numberOfRatings" : 1
    },
    "ratedAt" : "2012-07-30T19:07:34.975+0000",
    "myRating" : true
  }
}
```

**Parent topic:**[Ratings](../../../pra/1/concepts/pra-nodes-ratings.md)

