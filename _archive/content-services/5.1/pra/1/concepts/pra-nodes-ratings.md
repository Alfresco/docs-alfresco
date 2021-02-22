---
author: Alfresco Documentation
---

# Ratings

A person can rate an item of content by liking it. They can also remove their like of an item of content. API methods exist to get a list of ratings and to add a new rating.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/ratings](https://api-explorer.alfresco.com/api-explorer/#/ratings). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/ratings](http://localhost:8080/api-explorer/#/ratings).

## Rating object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|string|The rating scheme id. There are two schemes defined, `likes` and `fiveStar`. Only the `likes` scheme is used in Alfresco Cloud.|
|aggregate|object|object|An object with properties specific to the rating scheme. For `likes` this will contain a single property `numberOfRatings`. For `fiveStar` this will contain `numberOfRatings` and `average`.|
|ratedAt|Date Time|string|The date time the current authenticated user rated the item of content.|
|myRating|boolean or number|boolean or number|The value of the rating. For the `likes` scheme, values are `true` or `true`. For the `fiveStar` scheme, the value is an integer between one and five inclusively.|

## Example of a rating object

```

"id":"likes",
"aggregate":{
   "numberOfRatings":1
},
"ratedAt":"2012-05-25T09:08:01.846+0000",
"myRating":true
```

**Parent topic:**[Nodes](../../../pra/1/concepts/pra-nodes.md)

