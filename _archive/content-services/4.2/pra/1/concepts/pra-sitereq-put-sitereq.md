---
author: Alfresco Documentation
---

# Modifying a site membership request

Use this to modify an existing request to join a site. For example, if a user requested access to a site but the site manager has not yet acted on the request, the user can update the request with a message providing more details on why access was needed or to remind the site manager that a request is pending. The modifiedAt property records the modification date and time.

## Method

Using the HTTP PUT method:-

```

people/<personId>/site-membership-requests/<siteId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/site-membership-requests/secret-site
```

## PUT body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|message|string|string|An optional message describing why site membership is being requested.|

## Example PUT body

```

{ 
    "message" : "I need this access for national security reasons!"
}
```

## Response

-   If the request is successful an HTTP `Created` is returned \(status 200\).
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the **siteId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the **siteId** does match a site membership request for **personId**, an HTTP `Not Found` is returned \(status 404\).
-   If the current user does not match the **personId**, the user does not have permission to modfiy this site membership request, and an HTTP `Not Found` is returned \(status 404\).

## Example response body

```

 {                                            
   "entry": {                                
     "id" : "the-secret-site",
     "createdAt" : "2012-07-20T21:46:09.659+0000",
     "modifiedAt" : "2012-08-20T21:46:09.659+0000",
     "message" : "I need this access for national security reasons!",
     "site": {
         "id" : "the-secret-site",
         "guid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
         "title" : "The Company’s Secret Site",
         "visibility" : "MODERATED",
         "description" : "The Company’s Secret Site"
    }
  }                                                                      
}
```

**Parent topic:**[Site membership requests](../../../pra/1/concepts/pra-sitereq.md)

