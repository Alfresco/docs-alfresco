---
author: Alfresco Documentation
---

# Get a person's networks

Use this to get a list of networks of which a specific person is a member.

## Method

Using the HTTP GET method:-

```

people/<personId>/networks
```

A personID is always the email address that they registered with.

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/networks
```

## Response

-   If the personId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
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
        "network" : {
          "id" : "alfresco.com",
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
    } ]
  }
}
```

**Parent topic:**[Networks](../../../pra/1/concepts/pra-people-networks.md)

