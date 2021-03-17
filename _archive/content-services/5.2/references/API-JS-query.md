---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: query
---

# `query`

`query(search)` performs a search on `ScriptNode` objects.

## Parameters

-   **search**

    The search object. The search object is defined as follows:

    ```
    
    search
    {
        query: string,          mandatory, in appropriate format and encoded for the given language
        store: string,          optional, defaults to 'workspace://SpacesStore'
        language: string,       optional, one of: lucene, xpath, jcr-xpath, fts-alfresco - defaults to 'lucene'
        templates: [],          optional, Array of query language template objects (see below) - if supported by the language 
        sort: [],               optional, Array of sort column objects (see below) - if supported by the language
        page: object,           optional, paging information object (see below) - if supported by the language
        namespace: string,      optional, the default namespace for properties
        defaultField: string,   optional, the default field for query elements when not explicit in the query
        onerror: string         optional, result on error - one of: exception, no-results - defaults to 'exception'
    }
    
    sort
    {
        column: string,         mandatory, sort column in appropriate format for the language
        ascending: boolean      optional, defaults to false
    }
    
    page
    {
        maxItems: int,          optional, max number of items to return in result set
        skipCount: int          optional, number of items to skip over before returning results
    }
    
    template
    {
        field: string,          mandatory, custom field name for the template
        template: string        mandatory, query template replacement for the template
    }
    
                  
    ```


## Returns

Returns an array of `ScriptNode` objects representing the search results.

## Example

The `search` object defines the search to be executed as is constructed in this way:

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

This interface supports multi-column sorting and any of the Alfresco Content Services search languages. Future versions of the API will allow the search definition objects to be extended with additional properties while maintaining backward compatibility.

**Parent topic:**[Search API](../references/API-JS-Search.md)

