---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# filterQueries

The `filterQueries` also support multi-select facets to enable building complex `filterQueries`. It limits the result found and specifies the constraints that apply to the results set but do not affect the score or the rank of the results found by the query.

## Parameters

The parameters for the `filterQueries` element are:

|Parameter|Type|Description|
|---------|----|-----------|
|`query`|String|The filter query expression. For multi-select facets, selected facets must be ordered together.|
|`tags`|String|The tags used exclude the filters from facet evaluation for multi-select facet support.|

## Example

In the following example, we will use the `queries` option to specify multiple mimetypes.

With multi-select facet, you must use `exclude` in `facetFields` so that `filterQueries` is not used as a part of faceting.

```
{
  "query": {
      "query": "name:*"
  },
  "includeRequest": true,
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "filterQueries": [{"queries": ["content.mimetype:\"text/plain\"", "content.mimetype:\"image/png\""], "tags": ["exclude"]}],
  "facetFields": {"facets": [{"field": "content.mimetype", "excludeFilters":["exclude"]}]}
}
```

**Response**

The response will filter everything out and display results for mimetype - `text/plain` and `image/png`.

```
"facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[o TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 147
                                    }
                                }
                            ]
                        },
                        ...
                        {
                            "label": "medium",
                            "filterQuery": "content.size:[102400 TO 1048576]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 11
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "field",
                    "label": "content.mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": "content.mimetype:\"text/plain\"",
                            "display": "Plain Text",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "120"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "image/png",
                            "filterQuery": "content.mimetype:\"image/png\"",
                            "display": "PNG Image",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "38"
                                    }
                                }
                            ]
                        },
```

**Parent topic:**[Search API](../concepts/search-api.md)

