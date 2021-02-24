---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# limits

The `limits` element limits the time and resources used for query execution. Limits applied to the query go to the database.

## Parameters

The parameters for the `limits` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`permissionEvaluationTime`|Integer|The maximum time for post query permission evaluation.|The default value is 20000.

|
|`permissionEvaluationCount`|Integer|The maximum count of post query permission evaluations.|The default value is 2000.

|

## Example

Example of limiting how long the query will take by using the limits JSON body parameter:

```
"limits": {
  "permissionEvaluationTime": 20000,
  "permissionEvaluationCount": 2000
}
```

**Parent topic:**[Search API](../concepts/search-api.md)

