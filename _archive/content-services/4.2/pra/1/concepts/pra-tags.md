---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Tags

Any item of Alfresco content can be tagged. API methods exist to return a list of tags currently being used in a network.

## Tag object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|string|string|The unique id of the tag|
|tag|string|string|The value of the tag|

## Example of a tag object

```

{
  "id" : "ed2444b5-d0c1-440b-b5b8-34a53e578091",
  "tag" : "test tag 1"
}
```

-   **[Get a list of all tags](../../../pra/1/concepts/pra-tags-get-tags.md)**  
Use this to get a list of all tags used in your network.
-   **[Update a tag](../../../pra/1/concepts/pra-tags-put-tag.md)**  
Use this to update an existing tag.

**Parent topic:**[API Reference](../../../pra/1/concepts/pra-resources.md)

