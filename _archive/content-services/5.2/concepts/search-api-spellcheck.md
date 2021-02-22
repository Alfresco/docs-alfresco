---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# spellcheck

The `spellcheck` element specifies a request that spellcheck fragments should be added to the result set rows. The properties reflect Solr spellcheck parameters.

**Note:** Spell check only works on Alfresco Search Services with Solr 6 if you have already enabled suggestions.

## Parameters

The parameter for the `spellcheck` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`query`|String|A facet query.|

## Example

For spell checking you can use a query like this:

```
{
  "query": {
    "query": "cm:title:alfrezco"
  },
  "spellcheck": {"query": "alfrezco"}
}
```

Alternatively, if you are already specifying [userQuery](search-api-query.md), the following example produces the same result:

```
{
  "query": {
    "query": "cm:title:alfrezco",
    "userQuery": "alfrezco"
  },
  "spellcheck": {}
}
```

The spellcheck response includes a `spellCheck` context like this:

```
"context": {
  "spellCheck": {
    "type": "searchInsteadFor",
    "suggestions": ["alfresco"]
  }
},
```

**Parent topic:**[Search API](../concepts/search-api.md)

