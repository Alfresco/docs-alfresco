---
author: Alfresco Documentation
---

# Delete a favorite

Use this to remove a favorite of a specific person.

## Method

Using the HTTP DELETE method:-

```
people/<personId>/favorites/<targetGuid>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/favorites/8ac18731-601b-4bb4-be1a-cd5d252cce3f
```

## Response

-   If the request is successful the favorite is removed and an HTTP `No Content` is returned.
-   If the personId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If no favorite exists with the specified targetGuid, an HTTP `Not Found` \(status 404\) is returned.

**Parent topic:**[Favorites](../../../pra/1/concepts/pra-favorites.md)

