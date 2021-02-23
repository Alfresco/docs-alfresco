---
author: Alfresco Documentation
---

# Get a list of all tags

Use this to get a list of all tags used in your network.

## Method

Using the HTTP GET method:-

```

tags
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/tags
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
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "id" : "ed2444b5-d0c1-440b-b5b8-34a53e578091",
        "tag" : "test tag 1"
      }
    } ]
  }
}
```

**Parent topic:**[Tags](../../../pra/1/concepts/pra-tags.md)

