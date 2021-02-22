---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: query
---

# `query`

`query(search)`

This method performs a search on `ScriptNode` objects.

## Parameters

-   **search**

## Returns

Returns an array of `ScriptNode` objects representing the search results.

## Example

The `search` object defines the search to be executed as is constructed in this way:

```

search 
{ 
  query: string,      mandatory, in appropriate format, encoded for given language 
  store: string,      optional, defaults to 'workspace://SpacesStore' 
  language: string,   optional, one of: lucene, xpath, jcr-xpath, fts-alfresco, sql-cmis-strict - defaults to 'lucene'
  sort: [],           optional, Array of sort column options 
  page: object        optional, paging information object if supported by language 
} 

sort 
{ 
  column: string,     mandatory, sort column in appropriate format for language 
  ascending: boolean  optional, defaults to false 
}

page 
{ 
  maxItems: int,      optional, max number of items to return in result set 
  skipCount: int      optional, number of items to skip over before returning results (NOT IMPLEMENTED YET) 
}

```

The search definition object can be as simple to use as:

`var results = search.query({query: "TEXT:alfresco"});`

Or as richly defined as:

```

var sort1 = 
{ 
  column: "@{http://www.alfresco.org/model/content/1.0}modified", 
  ascending: false 
}; 
var sort2 = 
{ 
  column: "@{http://www.alfresco.org/model/content/1.0}created", 
  ascending: false
}; 
var paging = 
{ 
  maxItems: 100, 
  skipCount: 0 
}; 
var def = 
{ 
  query: "cm:name:test*", 
  store: "workspace://SpacesStore", 
  language: "fts-alfresco", 
  sort: [sort1, sort2], 
  page: paging 
}; 
var results = search.query(def); 

```

This interface supports multi-column sorting and any of the Alfresco search languages. Future versions of the API will allow the search definition objects to be extended with additional properties while maintaining backward compatibility.

**Parent topic:**[Search API](../references/API-JS-Search.md)

