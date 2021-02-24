---
author: Alfresco Documentation
---

# Join a site

Use this to join a site. If the site is public, the request is implicitly approved and the user is then a member of the site. If the site is moderated, then a site membership request is created, awaiting action by the site manager.

## Method

Using the HTTP POST method:

```

people/<personId>/site-membership-requests
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/site-membership-requests
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|string|string|The id of the site to be joined.|
|message|string|string|An optional message describing why site membership is being requested.|

## Example POST body

```

{                              
    "id" : "secret-site",
    "message" : "I need this access for national security reasons!"
}
```

## Response

-   If the request is successful an HTTP Created is returned \(status 201\).
-   If the **personId** is already a member of **siteId** an HTTP `Bad Request` is returned \(status 400\).
-   If an existing site membership request by **personId** for **siteId** exists, an HTTP `Bad Request` is returned \(status 400\).
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the **siteId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the **siteId** is private an HTTP `Not Found` is returned \(status 404\).
-   If the current user does not match the **personId**, the user does not have permission to create this site membership request, and an HTTP `Not Found` is returned \(status 404\).

## Example response body

```

{  
  "entry" : {
     "targetGuid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
     "createdAt" : "2012-07-20T21:46:09.659+0000",
     "target": {
         "site" : {
           "id" : "foo",
           "guid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
           "title" : "The Foo Site",
           "visibility" : "PRIVATE",
           "description" : "The Foo Site",
           "role" : "SiteManager"
         }
      }
   }
}
```

**Parent topic:**[Site membership requests](../../../pra/1/concepts/pra-sitereq.md)

