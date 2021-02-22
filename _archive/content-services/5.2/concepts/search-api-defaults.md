---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# defaults

The `defaults` element specifies the common query defaults that are not usually changed.

## Parameters

The parameters that can be used to set the default/implicit `AND` or `OR` behaviour are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`textAttributes`|String|A list of query fields/properties used to expand `TEXT:` queries.You can include all content properties using `d:content` or list all individual content properties or types. As more terms are included, the query size, complexity, memory impact, and query time will increase.

|The default value is `cm:content`.

|
|`defaultFTSOperator`|String|The default way to combine query parts when `AND` or `OR` is not explicitly stated.It also includes `!`, `-`, `+`, `one`, `two`, and `three`.

|The default value is `AND`.

|
|`defaultFTSFieldOperator`|String|The default way to combine query parts in field query groups when `AND` or `OR` is not explicitly stated. It also includes `!`, `-`, `+`, `FIELD:` \(`one`, `two`, and `three`\).

|The default value is `AND`.

|
|`namespace`|String|This is the default name space to use, if the name space is not already specified.|The default value is `default: cm`.

|
|`defaultFieldName`|String| |The default value is `TEXT`.

|

## Example

Example of specifying the defaults by using the `defaults` JSON body parameter:

```
"defaults": {
  "textAttributes": [
    "cm:content", "cm:name"
  ],
  "defaultFTSOperator": "AND",
  "defaultFTSFieldOperator": "OR",
  "namespace": "cm",
  "defaultFieldName": "PATH"
}
```

**Parent topic:**[Search API](../concepts/search-api.md)

