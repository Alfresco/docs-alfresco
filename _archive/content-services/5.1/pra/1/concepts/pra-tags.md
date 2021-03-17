---
author: Alfresco Documentation
---

# Tags

Any item of Alfresco content can be tagged. API methods exist to return a list of tags currently being used in a network.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/tags](https://api-explorer.alfresco.com/api-explorer/#/tags). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/tags](http://localhost:8080/api-explorer/#/tags).

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

**Parent topic:**[Entity reference](../../../pra/1/concepts/pra-resources.md)

