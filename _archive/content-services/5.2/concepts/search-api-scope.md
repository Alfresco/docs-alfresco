---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# scope

The `scope` element specifies the scope or the locations that are queried. By default, search uses the `nodes` location, which is the `workspace://SpacesStore` content store. To change the scope to another location, you can use the `locations` JSON body parameter.

## Parameters

The parameter for the `scope` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`locations`|String|The locations to include in the query. The possible values are:-   `nodes` - default value
-   `versions`
-   `deleted-nodes`

|

## Example

Example to change the scope to another location - `deleted-nodes`:

```
"scope": {
    "locations": ["deleted-nodes"]
}
```

**Parent topic:**[Search API](../concepts/search-api.md)

