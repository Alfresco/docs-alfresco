---
author: Alfresco Documentation
---

# Get a specific network

Use this to get information for a specific network.

## Method

Using the HTTP GET method:-

```

networks/<networkId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/networks/yourcompany.com
```

## Response

-   If the networkId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
    "id" : "yourcompany.com",
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
```

**Parent topic:**[Networks](../../../pra/1/concepts/pra-networks.md)

