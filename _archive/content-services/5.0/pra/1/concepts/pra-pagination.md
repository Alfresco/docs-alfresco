---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Pagination

As a developer, the REST API gives you control on how much of a returned collection you want to receive.

The collection returned by a simple request can contain a large number of entities. You can control the size of the list using pagination. So for example if a node with an id of `e8680e58-0701-4b64-950d-66cce277fbc7` has 100 comments the following request will return a list of 100 entities:

```

      nodes/e8680e58-0701-4b64-950d-66cce277fbc7/comments
      
```

You can get just the first 10 items using the maxItems parameter:

```

      nodes/e8680e58-0701-4b64-950d-66cce277fbc7/comments?maxItems=10
      
```

You can then get the second page of 10 items using the skipCount parameter:

```

      nodes/e8680e58-0701-4b64-950d-66cce277fbc7/comments?maxItems=10&skipCount=10
      
```

A returned list object will always contain a pagination object which has the following properties:

-   **skipCount**

    An integer describing how many entities exist in the collection before those included in this list.

-   **maxItems**

    The maxItems parameter used to generate this list, or if there was no maxItems parameter the default value, 10.

-   **count**

    The number of objects in the entries array.

-   **hasMoreItems**

    A boolean value which is true if there are more entities in the collection beyond those in this response. A true value means request with a larger value for the skipCount or the maxItems parameter will return more entities.

-   **totalItems**

    An integer describing the total number of entities in the collection. The API might not be able to determine this value, in which case this property will not be present.


**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

