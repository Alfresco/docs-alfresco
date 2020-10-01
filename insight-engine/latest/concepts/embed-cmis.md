---
title: Embed queries in CMIS.
---
These examples show how to embed queries in CMIS.

## Embedded in CMIS contains()

```sql
- strict queries
SELECT * FROM Document WHERE CONTAINS('\'zebra\'')
SELECT * FROM Document WHERE CONTAINS('\'quick\'')        

- Alfresco extensions       
SELECT * FROM Document D WHERE CONTAINS(D, 'cmis:name:\'Tutorial\'')
SELECT cmis:name as BOO FROM Document D WHERE CONTAINS('BOO:\'Tutorial\'')
```

## Search Service

```
ResultSet results = searchService.query(storeRef, SearchService.LANGUAGE_FTS_ALFRESCO, "quick");
```

```
SearchService.LANGUAGE_FTS_ALFRESCO = "fts-alfresco"
```

## Node Browser

FTS is supported in the node browser.

## JavaScript

```sql
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

For example:

```sql
 var def =
  {
     query: "cm:name:test*",
     language: "fts-alfresco"
  };
  var results = search.query(def); 
```

## Templates

FTS is not supported in FreeMarker.
