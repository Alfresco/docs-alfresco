---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# sort

The `sort` element lets you sort the results of a query. It specifies an array of sort specifications. The array order defines the ordering precedence.

## Parameters

The parameters for the `sort` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`type`|String|This specifies how to order - either by using a field or based on the position of the document in the index, or by score/relevance.|The default value is `FIELD`.|
|`field`|String|The name of the field.| |
|`ascending`|Boolean|The sorting order.The ordering of nulls is determined by the Solr configuration.

|The default value is `false`.|

## Example

Example of sorting the result:

```
"sort": [{"type":"FIELD", "field":"cm:description", "ascending":"true"}]
```

**Note:** The `sort` element is not supported for CMIS queries.

**Parent topic:**[Search API](../concepts/search-api.md)

