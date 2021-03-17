---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Get activities

Use this to get a list of recent activities, optionally filtered by siteId.

## Method

Using the HTTP GET method:-

```

people/<personId>/activities[?siteId=siteId?who=me|others]
```

A personID is always the email address that they registered with. The method accepts two http parameters which can be used singly, or together to filter the results:-

-   **siteId**

    The id of a specific site. Specifying this parameter filters the returned collection to include just those activities for the specific site.

-   **who**

    Specifying a value of me filters the returned collection to include just those activities for the specified user. Specifying a value of others filters the returned collection to include just those activities that are not for the specified user.


## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/activities?who=me
```

## Response

-   If the personId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

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
    "entries" : [ {
      "entry" : {
        "postPersonId" : "fred.bloggs@yourcompany.com",
        "id" : 1886,
        "siteId" : "test-test",
        "networkId" : "yourcompany.com",
        "feedPersonId" : "fred.bloggs@yourcompany.com",
        "activitySummary" : {
          "lastName" : "Bloggs",
          "title" : "Fred Bloggs (ffred.bloggs@yourcompany.com)",
          "memberPersonId" : "fred.bloggs@yourcompany.com",
          "memberLastName" : "Bloggs",
          "role" : "",
          "firstName" : "Fred",
          "memberFirstName" : "Fred"
        },
        "activityType" : "org.alfresco.site.user-left",
        "postedAt" : "2012-08-22T19:45:00.000+0000"
      }
    }, {
      "entry" : {
        "postPersonId" : "ffred.bloggs@yourcompany.com",
        "id" : 1882,
        "siteId" : "test-test",
        "networkId" : "yourcompany.com",
        "feedPersonId" : "fred.bloggs@yourcompany.com",
        "activitySummary" : {
          "lastName" : "Bloggs",
          "title" : "Fred Bloggs (fred.bloggs@yourcompany.com)",
          "memberPersonId" : "ffred.bloggs@yourcompany.com",
          "memberLastName" : "Bloggs",
          "role" : "SiteConsumer",
          "firstName" : "Fred",
          "memberFirstName" : "Fred"
        },
        "activityType" : "org.alfresco.site.user-joined",
        "postedAt" : "2012-08-22T19:43:43.000+0000"
      }
    }, {
      "entry" : {
        "postPersonId" : "fred.bloggs@yourcompany.com",
        "id" : 1878,
        "siteId" : "fred-blogs-alfresco-com",
        "networkId" : "yourcompany.com",
        "feedPersonId" : "fred.bloggs@yourcompany.com",
        "activitySummary" : {
          "lastName" : "Bloggs",
          "title" : "testing",
          "objectId" : "e8680e58-0701-4b64-950d-66cce277fbc7",
          "firstName" : "Fred"
        },
        "activityType" : "org.alfresco.comments.comment-deleted",
        "postedAt" : "2012-08-22T19:24:48.000+0000"
      }
    } ]
  }
}
```

**Parent topic:**[Activities](../../../pra/1/concepts/pra-people-activities.md)

