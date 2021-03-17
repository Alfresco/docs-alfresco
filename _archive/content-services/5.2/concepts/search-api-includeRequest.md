---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# includeRequest

To include the original request in the response, set `includeRequest` to `true` in the JSON body. The default value is `false`.

## Examples

**Example 1:** Let's consider an example to shows the use of `includeRequest` parameter in the JSON body. There is also a request for a particular type of mimetype, plain text.

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
  "filterQueries": [{"query": "content.mimetype:\"text/plain\""}],
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response**

```
"request": {
                "query": {
                    "query": "name:*"
                },
                "filterQueries": [
                    {
                        "query": "content.mimetype:\"text/plain\""
                    }
                ],
                "facetFields": {
                    "facets": [
                        {
                            "field": "content.mimetype",
                            "missing": false,
                            "offset": 0,
                            "mincount": 1,
                            "facetEnumCacheMinDf": 0
                        }
                    ]
                },
                "facetQueries": [
                    {
                        "query": "content.size:[o TO 102400]",
                        "label": "small",
                        "group": "size"
                    },
                    {
                        "query": "content.size:[102400 TO 1048576]",
                        "label": "medium",
                        "group": "size"
                    },
                    {
                        "query": "content.size:[1048576 TO 16777216]",
                        "label": "large",
                        "group": "size"
                    }
                ],
                "facetFormat": "V2"
            }
        },
```

**Example 2:** Additionally, you can use `mimetype()` with `facetFields` to group `content.mimetype` into logical groupings that are easy to understand, such as document, image, and spread sheet. For example:

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
  "facetFields": {"facets": [{"field": "mimetype()"}]}
}
```

**Response**

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
                                        "count": 192
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
                                        "count": 20
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "field",
                    "label": "mimetype()",
                    "buckets": [
                        {
                            "label": "image",
                            "filterQuery": "mimetype():\"image\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "48"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "other",
                            "filterQuery": "mimetype():\"other\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "13"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "web",
                            "filterQuery": "mimetype():\"web\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "28"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "document",
                            "filterQuery": "mimetype():\"document\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "121"
                                    }
                                }
                            ]
                        },
```

**Parent topic:**[Search API](../concepts/search-api.md)

