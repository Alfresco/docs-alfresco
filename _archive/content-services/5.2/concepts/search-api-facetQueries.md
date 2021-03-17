---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# facetQueries

The `facetQueries` element specifies the facet queries to include. These queries are used to generate a single-facet value based on the number of documents that matched the overall query and the facet query.

## Parameters

The parameters for the `facetQueries` element are:

|Parameter|Type|Description|
|---------|----|-----------|
|`query`|String|A facet query.|
|`label`|String|A label to include in place of the facet query.|

## Ungrouped facet queries

-   Between Alfresco Content Services 5.2.0 and Alfresco Content Services 5.2.1:

    Executing ungrouped facet queries returned individual facet query. You can use `label` to find and group them together but that doesn't lend itself in the same way as behaving between different type of faceting.

    **Example:** Here's an example of three ungrouped facet queries. The search request will look for content nodes with any name. We also specify that we want to know how many of the results are small, medium, and large.

    ```
    {
      "query": {
          "query": "name:*"
      },
      "facetQueries": [
         {"query": "content.size:[o TO 102400]", "label": "small"},
         {"query": "content.size:[102400 TO 1048576]", "label": "medium"},
         {"query": "content.size:[1048576 TO 16777216]", "label": "large"}
    ]
    }
    ```

    **Response:**

    The response contains a `facetQueries` object containing the count we requested. It also has an entry for each query supplied in the result.

    ```
    {
        "list": {
            "pagination": {
                "count": 100,
                "hasMoreItems": true,
                "totalItems": 816,
                "skipCount": 0,
                "maxItems": 100
            },
            "context": {
                "facetQueries": [
                    {
                        "label": "small",
                        "filterQuery": "content.size:[o TO 102400]",
                        "count": 192
                    },
                    {
                        "label": "large",
                        "filterQuery": "content.size:[1048576 TO 16777216]",
                        "count": 3
                    },
                    {
                        "label": "medium",
                        "filterQuery": "content.size:[102400 TO 1048576]",
                        "count": 20
                    }
                ]
            },
    ```

-   From Alfresco Content Services 5.2.1 onwards:

    You can get the same new format and behaviour as with [grouping facet queries](search-api-facetQueries.md#gfq) by specifying an explicit flag, `"facetFormat": "V2"`, as shown in the example below:

    ```
    {
      "query": {
          "query": "name:*"
      },
      "facetFormat": "V2",
      "facetQueries": [
         {"query": "content.size:[o TO 102400]", "label": "small"},
         {"query": "content.size:[102400 TO 1048576]", "label": "medium"},
         {"query": "content.size:[1048576 TO 16777216]", "label": "large"}
    ]
    }
    ```

    **Response:**

    ```
    "facets": [
                    {
                        "type": "query",
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
    ```


## Grouping facet queries

Another way of doing this is by grouping the queries together in the same group by using the `group` label as shown below:

```
{
        "query": {
        "query": "name:*"
        },
        "facetQueries": [
        {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
        {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
        {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
        ]
        }
```

The above query returns the results as faceted field grouped under the label `size`. The response shows a new format of grouping facets as type, label, and bucket. Each individual bucket has a label and a `filterQuery` that you can use to apply the condition for that particular bucket. It also returns the metrics in terms of count and its value. So, all these things are grouped together in the same facet \(in the same way as [facetFields](search-api-facetFields.md)\).

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
                                {
                                "label": "large",
                                "filterQuery": "content.size:[1048576 TO 16777216]",
                                "metrics": [
                                {
                                "type": "count",
                                "value": {
                                "count": 3
                                }
                                }
                                ]
                                },
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
                                }
                                ]
```

**General Example**

-   Here's an example of a complete query for faceting via the `content.size` field:

    ```
    {
                                    "query": {
                                    "query": "presentation",
                                    "language": "afts"
                                    },
                                    "facetQueries": [
                                    {"query": "content.size:[0 TO 10240]", "label": "xtra small"},
                                    {"query": "content.size:[10240 TO 102400]", "label": "small"},
                                    {"query": "content.size:[102400 TO 1048576]", "label": "medium"},
                                    {"query": "content.size:[1048576 TO 16777216]", "label": "large"},
                                    {"query": "content.size:[16777216 TO 134217728]", "label": "xtra large"},
                                    {"query": "content.size:[134217728 TO MAX]", "label": "XX large"}
                                    ],
                                    "facetFields": {"facets": [{"field": "'content.size'"}]}
                                    }
    ```

    The response will contain a matching `context` section and the `label` will match the facet query.

    ```
    "context": {
                                    "facetQueries": [
                                    { "label": "small","count": 2 },
                                    { "label": "large","count": 0 },
                                    { "label": "xtra small","count": 5 },
                                    { "label": "xtra large","count": 56},
                                    { "label": "medium","count": 4 },
                                    { "label": "XX large", "count": 1 }
                                    ]
                                    },
    ```

-   You can specify several facet queries using the `facetQueries` JSON body parameter, for example:

    ```
    "facetQueries": [{"query": "created:2016","label": "CreatedThisYear"}]
    ```

    The response will contain a matching `context` section and the `label` will match the facet query.

    ```
    "context": {
                                    "facetQueries": [
                                    {"label": "CreatedThisYear","count": 3}
                                    ]
                                    },
    ```


## Easy filter queries

You can easily add filter queries to a request where each facet includes the filter to use. The response displays both the field facet and the query facet. The search request will look for content nodes with any name. We also specify that we want to know how many of the results are small, medium, and large. Additionally, we are also asking for the `content.mimetype` `facetField` to be included in the response.

```
{
  "query": {
      "query": "name:*"
  },
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response**

```
"context": {
            "facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[0 TO 102400]",
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
                    "type": "field",
                    "label": "content.mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": **"content.mimetype:\\"text/plain\\""**,
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
```

**Easy filter queries - Adding a filter:**

In this example, we will add a filter by taking the string from the `filterQuery` in the above response and adding it to the `filterQueries` in the request, and constraining it to that particular selection in your facet.

For example, from the above query's [response](search-api-facetQueries.md#1), locate the `[filterQuery](search-api-facetQueries.md#2)` of the `content.mimetype` format. Now, copy the string \(`"content.mimetype:\"text/plain\""`\) as it appears from the `filterQuery` and use that by adding `filterQueries` in the query.

```
"filterQueries": [{"query": "content.mimetype:\"text/plain\""}],
```

**Complete query:**

```
{
  "query": {
      "query": "name:*"
  },
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[0 TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  **"filterQueries": \[\{"query": "content.mimetype:\\"text/plain\\""\}\],**
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response:** The results will come back constrained and display the total count of plain text files, along with their details as shown below:

```
"facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[0 TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 120
                                    }
                                }
                            ]
                        },
                       ...
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
                        }
                    ]
                }
            ]
        },
        "entries": [
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.612+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 5301,
                        "encoding": "UTF-8"
                    },
                    "parentId": "f7217cfd-6ced-489c-af9f-c92884bf0e00",
                    "createdAt": "2017-06-21T09:38:11.612+0000",
                    "isFolder": false,
                    "search": {
                        "score": 1.1348674
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "invite-email-add-direct.html_de.ftl",
                    "location": "nodes",
                    "id": "d1799aae-d80a-44fe-87ab-ede249c7e1db"
                }
            },
```

**Easy filter queries - with request**

To include the original request in the response, use the `includeRequest` parameter in the JSON body. For example:

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

**Response**:

The response returns a `request` object which displays exactly what you had requested for.

```
 "context": {
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
                                        "count": 120
                                    }
                                }
                            ]
                        },
                        {
                            "label": "large",
                            "filterQuery": "content.size:[1048576 TO 16777216]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 0
                                    }
                                }
                            ]
                        },
                        {
                            "label": "medium",
                            "filterQuery": "content.size:[102400 TO 1048576]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 0
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
                        }
                    ]
                }
            ],
            **"request":** {
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

**Parent topic:**[Search API](../concepts/search-api.md)

