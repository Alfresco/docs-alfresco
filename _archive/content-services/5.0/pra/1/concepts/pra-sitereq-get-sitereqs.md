---
author: Alfresco Documentation
---

# Get a list of site membership requests

Use this to get a list of site membership requests for a specific person.

## Method

Using the HTTP GET method:

```

people/>personId>/site-membership-requests
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/site-membership-requests
```

## Response

-   If the request is successful an HTTP `OK` is returned \(status 200\).
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the current user does not have permission to access the site membership requests of the **personId**, an HTTP `Not Found` is returned \(status 404\).

## Example response body

```

{
   "list" : {
      "pagination" : {
        "count" : 2,
        "hasMoreItems" : false,
        "skipCount" : 0,
        "maxItems" : 100
      },
      "entries": [  {
         "entry": {                                
           "id" : "fred-bloggs-yourcompany-com",
           "createdAt" : "2012-07-20T21:46:09.659+0000",
           "site": {
               "id" : "fred-bloggs-yourcompany-com",
               "guid" : "9de68812-720c-5ed4-de2d-fe4a364ddb2e",
               "title" : "Fred Bloggs's Site",
               "visibility" : "MODERATED",
               "description" : "Fred Bloggs's Site"
           }
         }                                                                    
       },  
       {                                            
         "entry": {                                
           "id" : "the-secret-site",
           "createdAt" : "2012-08-20T21:46:09.659+0000",
           "modifiedAt" : "2012-09-20T21:46:09.672+0000",
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
    ]
  }    
}  
```

**Parent topic:**[Site membership requests](../../../pra/1/concepts/pra-sitereq.md)

