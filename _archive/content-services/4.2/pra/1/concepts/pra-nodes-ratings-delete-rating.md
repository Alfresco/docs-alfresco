---
author: Alfresco Documentation
---

# Remove a rating

Use this to remove a rating.

## Method

Using the HTTP DELETE method:-

```
nodes/<nodeId>/ratings/<ratingId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/ratings/e8680e58-0701-4b64-950d-66cce277fbc7/ratings/likes
```

## Response

-   If the nodeId or ratingId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP `No Content` is returned \(status 204\), and the rating is removed.

**Parent topic:**[Ratings](../../../pra/1/concepts/pra-nodes-ratings.md)

