---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# What does a response look like?

All responses are JSON objects. The format of the response object depends on the request. The object can contain an entry object, an entry and a relations object, a list object, or an error object. Note that if a property or an entire object has no value, then it is not returned in the parent object.

## Entry object

An API call which returns information about a single entity will return in an entry object. Here is an example response from a request for information on a site with a specific site-id:

```

{
   "entry":{
      "title":"Fred Blogg's Home",
      "description":"Fred Blogg's private home site.",
      "visibility":"PRIVATE",
      "id":"fred-bloggs-yourcompany-com"
   }
}
```

Note that the entry object's properties are variable and depend on the API call made.

## Relations object

If an API method specifies the [relations](pra-relations-filter.md) parameter, then any included children will be returned in a relations object. Here is an example of a relations object:

```
      
      "relations" : {
        "containers" : {
          "list" : {
            "pagination" : {
              "count" : 1,
              "hasMoreItems" : false,
              "totalItems" : 1,
              "skipCount" : 0,
              "maxItems" : 100
            },
            "entries" : [ {
              "entry" : {
                "id" : "b9f8c112-66b9-4733-a77d-46e61c395706",
                "folderId" : "documentLibrary"
              }
            } ]
          }
        }
      }
```

## List object

An API call which returns information about a several entities will return in a list object. A list will always have two properties, `pagination` and `entries`. The pagination object is described in [Pagination](pra-pagination.md). The entries object is an array of entry objects. Here is an example response from a request for information on all sites:

```

{
   "list":{
      "pagination":{
         "count":1,
         "hasMoreItems":false,
         "totalItems":1,
         "skipCount":0,
         "maxItems":10
      },
      "entries":[
         {
            "entry":{
               "title":"Fred Blogg's Home",
               "description":"Fred Blogg's private home site.",
               "visibility":"PRIVATE",
               "id":"fred-bloggs-yourcompany-com"
            }
         }
      ]
   }
}
```

## Error object

An API call which fails for some reason will return an error object containing these properties:-

-   **errorKey**

    A unique string identifier

-   **statusCode**

    The HTTP status code for the type of error. The same code is returned in the HTTP response.

-   **briefSummary**

    description of the cause of the error

-   **descriptionUrl**

    A URL to a detailed description of the error

-   **stackTrace**

    If an exception was thrown, this contains the Java stack trace as a string

-   **additionalState**

    This optional property if it is present contains a free-form JSON object with additional information on the state of the server and/or the request


Here is an example of an error object from a request for a specific site-id that does not exist on the server:

```

 {
  "error" : {
    "statusCode" : 404,
    "briefSummary" : "07220488 The entity with id: frank-bloggs-yourcompany-com was not found",
    "stackTrace" : "[org.alfresco.rest.api.impl.SitesImpl.validateSite(SitesImpl.java:111), org.alfresco.rest.api.impl.SitesImpl.getSite(SitesImpl.java:137), ... ,java.lang.Thread.run(Thread.java:662)]",
    "descriptionURL" : "http://someError?id=null"
  }
}
```

Note that the stack trace has been truncated for this example.

-   **[Date and time format](../../../pra/1/concepts/pra-dates.md)**  
 Dates in the JSON response object are encoded as character strings using the extended format defined by ISO standard 8601:2004. They are always in UTC.

**Parent topic:**[Getting started](../../../pra/1/concepts/pra-getting-started.md)

