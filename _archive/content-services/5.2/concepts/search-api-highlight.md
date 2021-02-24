---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# highlight

The `highlight` element specifies the request that highlight fragments should be added to the result set rows. The properties reflect Solr highlighting parameters.

## Parameters

The parameter for the `highlight` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`prefix`|String|The string used to mark the start of a highlight in a fragment.|
|`postfix`|String|The string used to mark the end of a highlight in a fragment.|
|`snippetCount`|Integer|The maximum number of distinct highlight snippets to return for each highlight field.|
|`fragmentSize`|Integer|The character length of each snippet.|
|`maxAnalyzedChars`|Integer|The number of characters to be considered for highlighting. Matches after this count will not be shown.|
|`mergeContiguous`|Boolean|If fragments overlap, they can be merged into one larger fragment|
|`usePhraseHighlighter`|Boolean|This specifies if phrases should be identified.|
|`fields`|Boolean|The fields to highlight and field specific configuration properties for each field. The properties are:-   `field`: This string type specifies the name of the field to highlight.
-   `snippetCount`
-   `fragmentSize`
-   `mergeContiguous`
-   `prefix`
-   `postfix`

|

## Example

Here's an example query for search highlighting:

```
{
  "query": {
    "query": "description:workflow",
    "userQuery":"workflow"
  },
  "highlight": {
    "prefix": "¿",
    "postfix": "?",
    "mergeContiguous": true,
    "fields": [
      {
        "field": "cm:title"
      },
      {
        "field": "description",
        "prefix": "(",
        "postfix": ")"
      }

    ]
  }
}
```

The above example changes the default for all fields for highlighting `prefix` to `¿`, `postfix` to `?`, and `description` to `()`. The highlight information is added in each node entry response. Here's an example \(partial\) response:

```
*"entry": \{
        "createdAt": "2016-10-12T15:24:31.202+0000",
        "isFolder": true,
        "search": \{
          "score": 1,
          "highlight": \[
            \{
              "field": "cm:title",
              "snippets": \[
                "Customized ¿Workflow? Process Definitions"
              \]
            \},
            \{
              "field": "description",
              "snippets": \[
                "Customized \(Workflow\) Process Definitions"
              \]
            \}
          \]
      \},*
```

**Parent topic:**[Search API](../concepts/search-api.md)

