---
author: Alfresco Documentation
---

# Get a list a node's tags

Use this to get a list of all tags for a specific node.

## Method

Using the HTTP GET method:-

```

nodes/<nodeId>/tags
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/e8680e58-0701-4b64-950d-66cce277fbc7/tags
```

## Response

-   If the nodeId does not exist an HTTP `Not Found` is returned \(status 404\).
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
        "id" : "3ccdc60e-1853-4cc0-9d29-280a3f7d3c03",
        "tag" : "test-tag"
      }
    } ]
  }
}
```

**Parent topic:**[Tags](../../../pra/1/concepts/pra-nodes-tags.md)

