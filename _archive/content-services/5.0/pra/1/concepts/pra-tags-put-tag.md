---
author: Alfresco Documentation
---

# Update a tag

Use this to update an existing tag.

## Method

Using the HTTP PUT method:

```
tags/<tagId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/tags/159d7f5d-680f-4504-b92e-8687d9fd1e82
```

## PUT body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|tag|string|string|The new tag value|

## Example PUT body

```

{
    "tag": "new value"
}
```

## Response

-   If the tagId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK response \(status 200\) is returned.

## Example response body

```

{
  "entry" : {
    "id" : "159d7f5d-680f-4504-b92e-8687d9fd1e82",
    "tag" : "new value"
  }
}
```

**Parent topic:**[Tags](../../../pra/1/concepts/pra-tags.md)

