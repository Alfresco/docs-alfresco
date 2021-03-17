---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Networks

A network is the group of users and sites that belong to an organization. Networks are organized by email domain. When a user signs up for an Alfresco account , their email domain becomes their Home Network.

## Network object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|string|This network's unique id|
|homeNetwork|boolean|boolean|Is this the home network?|
|isEnabled|boolean|boolean|Is this network active?|
|createdAt|Date Time|String|The date time this network was created|
|quotas|array|array|Limits and usage of each quota. A network will have quotas for File space, the number of sites in the network, the number of people in the network, and the number of network administrators.|
|paidNetwork|boolean|boolean|Is this a paid network?|
|subscriptionLevel|enumerated string|string|The type of subscription for this network. Possible values are `Free`, `Standard`, and `Enterprise`|

## Example of a network object

```

  "entry" : {
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

## List order

Lists of these entities are returned ordered by ascending `id`.

-   **[Get a specific network](../../../pra/1/concepts/pra-networks-get-network.md)**  
Use this to get information for a specific network.
-   **[Get networks for the current authenticated person](../../../pra/1/concepts/pra-networks-get-networks.md)**  
Use this to get a list of networks for the current authenticated user.

**Parent topic:**[API Reference](../../../pra/1/concepts/pra-resources.md)

