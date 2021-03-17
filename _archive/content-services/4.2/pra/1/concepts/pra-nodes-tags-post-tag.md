---
author: Alfresco Documentation
---

# Create a tag

Use this to create a new tag or tags on a specific node.

## Method

Using the HTTP POST method:-

```
nodes/<nodeId>/tags
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b9ee-8687d9fd1e82/tags
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|tag|string|string|The tag to be created. Note that you can provide an array of tags.|

## Example POST body

Creating a single tag:

```

{
  "tag": "test-tag-1"
}
```

Creating more than one tag:

```

[
   {
      "tag":"test-tag-1"
   },
   {
      "tag":"test-tag-2"
   }
]
```

## Response

-   If the nodeId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP CREATED response \(status 201\) is returned.

## Example response body

When creating a single tag:

```

{
  "entry" : {
    "id" : "d4919919-2d49-4365-9f35-806914542245",
    "tag" : "test-tag-1"
  }
}
```

When creating than one tag, and array is returned:

```

[ {
  "tag" : "test-tag-1",
  "id" : "bd69d53d-e104-4ac8-b2b6-d1283276d74f"
}, {
  "tag" : "test-tag-2",
  "id" : "27cbd230-0c5e-4a54-87fb-3258c70956cc"
} 
]
```

**Parent topic:**[Tags](../../../pra/1/concepts/pra-nodes-tags.md)

