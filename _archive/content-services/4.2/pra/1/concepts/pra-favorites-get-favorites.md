---
author: Alfresco Documentation
---

# Get a list of favorites

Use this to get a list of favorites for a specific person. You can tailor the information returned by providing the **WHERE** HTML parameter.

## Method

Using the HTTP GET method:-

```

people/<personId>/favorites
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/favorites
```

## Parameters

You can use the **where** parameter to restrict the list in the response to entries of a specific kind. The **where** parameter takes a value. The value is a single predicate that may include one or more **EXISTS** conditions. The **EXISTS** condition uses a single operand to limit the list to include entries that include that one property. The property values are:-

-   target/file
-   target/folder
-   target/site

For example, the following **where** parameter restricts the returned list to the file favorites for a person:

```
where=(EXISTS(target/file)) 
```

You can specify more than one condition using **OR**. The predicate must be enclosed in parentheses.

For example, the following **where** parameter restricts the returned list to the file and folder favorites for a person:

```
where=(EXISTS(target/file OR EXISTS(target/folder))
```

The -me- string can be used in place of <personId\> to get the favorites of the currently authenticated user.

## Response

-   If the request is successful an HTTP `OK` is returned \(status 200\).
-   If an invalid **where** parameter was specified an HTTP `Bad Request` is returned \(status 400\).
-   If the **personId** does not exist in this network an HTTP `Not Found` is returned \(status 404\).
-   If the current user does not have permission to access the favorites of the **personId**, an HTTP `Not Found` is returned \(status 404\).

## Example response body

```

{
  "list" : {
     "pagination" : {
       "count" : 3,
       "hasMoreItems" : false,
       "skipCount" : 0,
       "maxItems" : 100
     },
     "entries": [  
      {
        "entry": {                                                
            "targetGuid" : "54a924c0-d437-4482-8cbc-78c2995c83ae",
            "createdAt" : "2012-07-20T21:46:09.659+0000",
            "target": {
               "file" : {
                 "id" : "54a924c0-d437-4482-8cbc-78c2995c83ae",
                 "guid" : "54a924c0-d437-4482-8cbc-78c2995c83ae",
                 "name" : "fred.txt",
                 "title" : "Fred Bloggs's Document",
                 "description" : "This is Fred’s resume",
                 "createdAt" : "2013-01-09T13:23:07.894-05:00",
                 "modifiedAt" : "2013-01-16T15:41:35.265-05:00",
                 "createdBy" : "fred.bloggs@yourcompany.com",
                 "modifiedBy" : "wilma.bloggs@yourcompany.com",
                 "mimeType" : "text/plain",
                 "sizeInBytes" : "1024",
                 "versionLabel" : "1.0"
               }
            }
          }
        },
      {
        "entry": {                                                
            "targetGuid" : "f504ba02-d36c-49ca-8159-a53f7f6efc4f",
            "createdAt" : "2012-07-20T21:46:09.659+0000",
            "target": {
               "folder" : {
                 "id" : "f504ba02-d36c-49ca-8159-a53f7f6efc4f",
                 "guid" : "f504ba02-d36c-49ca-8159-a53f7f6efc4f",
                 "name" : "Fred Bloggs's Folder",
                 "title" : "Fred Bloggs's Folder",
                 "description" : "This is Fred’s folder",
                 "createdAt" : "2010-03-26T11:22:09.600+0000",
                 "modifiedAt" : "2013-01-16T15:41:35.265-05:00",
                 "createdBy" : "fred.bloggs@yourcompany.com",
                 "modifiedBy" : "wilma.bloggs@yourcompany.com"
               }
            }
          }
        },
        {
        "entry": {                                                
           "targetGuid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
           "createdAt" : "2012-07-20T21:46:09.659+0000",
           "target": {
               "site" : {
                 "id" : "foo-site",
                 "guid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
                 "title" : "The Foo Site",
                 "visibility" : "PRIVATE",
                 "description" : "The Foo Site",
                 "role" : "SiteManager"
                }
             }
          }                                                                                    
       }                                                                                  
     ]
   }    
} 
```

**Parent topic:**[Favorites](../../../pra/1/concepts/pra-favorites.md)

