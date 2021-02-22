---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# paging

Use the `paging` element to restrict the number of results to be displayed. By default, results are limited to the first 100.

## Parameters

The parameters for the `paging` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`maxItems`|Integer|The maximum number of items to return in the query result.|The default value is 100.

|
|`skipCount`|Integer|The number of items to skip from the start of the query set.|The minimum value is 0.The default value is 0.

|

## Example

Here's an example to ensure that the results are limited by final size - skipping the first 28 results and returning the next 50.

```
"paging": {
  "maxItems": "50",
  "skipCount": "28"
}
```

**Parent topic:**[Search API](../concepts/search-api.md)

