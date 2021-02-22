---
author: Alfresco Documentation
---

# Delete a site membership request

Use this to remove a site membership request.

## Method

Using the HTTP DELETE method:

```
people/<personId>/site-membership-requests/<siteId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/site-membership-requests/secret-site
```

## Response

-   If the request is successful the site membership request is removed and an HTTP `No Content` \(status 204\) is returned.
-   If the processId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the **siteId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the **siteId** does not match a site membership request for **personId**, an HTTP `Not Found` is returned \(status 404\).
-   If the current user does not match the **personId**, the user does not have permission to delete this site membership request, and an HTTP `Not Found` is returned \(status 404\).

**Parent topic:**[Site membership requests](../../../pra/1/concepts/pra-sitereq.md)

