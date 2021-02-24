---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# query

The `query` element specifies the basic query to be parsed. This is the only mandatory parameter with any query.

## Parameters

The parameters for the `query` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`language`|String|The query language in which the query is written.|The default search language is `afts` but `cmis` and `lucene` are also supported. See [Alfresco Full Text Search Reference](rm-searchsyntax-intro.md).|
|`userQuery`|String|The exact search request typed in by the user.| |
|`query`|String|The query which may have been generated in some way from the `userQuery`.| |

## Examples

**Example 1**: Here's a basic query that searches for the term *lorem*:

```
{
  "query": {
    "query": "lorem"
  }
}
```

The above example uses the default search language `afts`.

**Example 2:** Here's an example of a simple CMIS query:

```
{
  "query": {
    "query": "select * from cmis:folder",
    "language": "cmis"
  }
}
```

**Example 3:** Here's a simple CMIS query to find all content with a name starting with *test*:

```
{
  "query":{
    "query":"select * from cmis:document WHERE cmis:name LIKE 'test.%'",
    "language":"cmis"
  }
}
```

**Example 4:** Here's a simple `lucene` query to find all the content modified in the last week:

```
{
  "query":{
    "query":"+@cm\\:modified:[NOW/DAY-7DAYS TO NOW/DAY+1DAY] +TYPE:\"cm:content\"",
    "language":"lucene"
  }
}
```

-   **[Structure, tags, categories, and query](../concepts/additional-query-fields.md)**  
Alfresco Content Services 5.2.7 supports structural queries to find documents by how they are arranged in a folder structure, how they are categorised, and how they have been tagged.

**Parent topic:**[Search API](../concepts/search-api.md)

