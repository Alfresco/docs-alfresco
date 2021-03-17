---
author: Alfresco Documentation
---

# Get networks for the current authenticated person

Use this to get a list of networks for the current authenticated user.

## Method

Using the HTTP GET method on the root URL.

## Example request URL

```

https://api.alfresco.com/
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
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
          "id" : "yourcompany.com",
          "homeNetwork" : true,
          "createdAt" : "2012-06-07T10:22:28.000+0000",
          "quotas" : [ {
            "limit" : 52428800,
            "id" : "fileUploadQuota"
          }, {
            "limit" : 5368709120,
            "usage" : 149102356,
            "id" : "fileQuota"
          }, {
            "limit" : -1,
            "usage" : 29,
            "id" : "siteCountQuota"
          }, {
            "limit" : -1,
            "usage" : 33,
            "id" : "personCountQuota"
          }, {
            "limit" : -1,
            "usage" : 15,
            "id" : "personInternalOnlyCountQuota"
          }, {
            "limit" : 0,
            "usage" : 0,
            "id" : "personNetworkAdminCountQuota"
          } ],
          "paidNetwork" : false,
          "isEnabled" : true,
          "subscriptionLevel" : "Free"
        }
      }
    ]
  }
}
```

**Parent topic:**[Networks](../../../pra/1/concepts/pra-networks.md)

