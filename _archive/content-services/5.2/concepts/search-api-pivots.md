---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# pivots

The `pivots` element specifies a list of pivot keys. It enables nested facet fields where you can put any number of single facet fields inside each other so that it becomes a chain of fields.

## Parameters

The parameter for the `pivots` element is:

|Parameter|Description|
|---------|-----------|
|`key`|A key corresponding to a matching field facet label.|

**Note:** You can't nest intervals in a pivot. Intervals exist separately at the top.

**Note:** Range and Stats have to be at the end of pivots.

## Example

**Example 1:** In this example, we are combining flat facet and a simple nested pivot section together in the JSON body parameter. The aim is to get a count of each type of `facetField`. The `pivot` section contains a `key` for the top level breakdown, followed by a nested `pivot` section with a `key` for next level of breakdown, and so on.

Simple nested pivots can only have one `key` at each depth.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "content.mimetype", "label": "mimetype"},
         {"field": "SITE", "label": "site"},
         {"field": "TYPE", "label": "type"}
      ]
    },
    "pivots" : [
      {
        "key": "site",
        "pivots": [
          {
            "key": "type",
            "pivots": [
              {
                "key": "mimetype"
              }
              ]
          }
          ]
      }
      ]
}
```

**Response**: In the result, we see that pivot only does the count, just like `facetField` does. We have a **site** at the top level; inside this **site**, there is a sub-facet with another type of `pivot` with a `label` **type**. This corresponds to the second nested pivot in the query. The second-level of nesting shows information on the type of document.

Inside the `pivot` **type**, there is a sub-facet for mimetype. This contains information for every site and every type, a count of each mimetype.

If you want to filter down in to the type, you can use the string from the `filterQuery`. If you want to filter on a particular bucket in this hierarchy, you can take the type and the sites, and add a `filterQuery` for each one of those.

```
"facets": [
                {
                    "type": "pivot",
                    "label": "**site**",
                    "buckets": [
                        {
                            "label": "_REPOSITORY_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 711
                                    }
                                }
                            ],
                            "**facets**": [
                                {
                                    "type": "**pivot**",
                                    "label": "**type**",
                                    "buckets": [
                                        {
                                            "label": "{http://www.alfresco.org/model/content/1.0}category",
                                            **"filterQuery": "TYPE:\\"\{http://www.alfresco.org/model/content/1.0\}category\\"",**
                                            "metrics": [
                                                {
                                                    "type": "count",
                                                    "value": {
                                                        "count": 335
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "label": "{http://www.alfresco.org/model/content/1.0}content",
                                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/content/1.0}content\"",
                                            "metrics": [
                                                {
                                                    "type": "count",
                                                    "value": {
                                                        "count": 141
                                                    }
                                                }
                                            ],
                                            "facets": [
                                                {
                                                    "type": "pivot",
                                                    "label": "mimetype",
                                                    "buckets": [
                                                        {
                                                            "label": "text/plain",
                                                            "filterQuery": "content.mimetype:\"text/plain\"",
                                                            "display": "Plain Text",
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
                                                            "label": "application/x-javascript",
                                                            "filterQuery": "content.mimetype:\"application/x-javascript\"",
                                                            "display": "JavaScript",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 10
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "label": "text/html",
                                                            "filterQuery": "content.mimetype:\"text/html\"",
                                                            "display": "HTML",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 6
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "label": "text/xml",
                                                            "filterQuery": "content.mimetype:\"text/xml\"",
                                                            "display": "XML",
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
                                                            "label": "image/jpeg",
                                                            "filterQuery": "content.mimetype:\"image/jpeg\"",
                                                            "display": "JPEG Image",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 2
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
```

**Pivots with Stats and Range**

**Example 1:** In this example, we have combination of `facetField` called *site*, some `stats` for *content.size*, some `ranges` for *created* date, and a `pivot` for *site*, including *size* statistics for each site. In the pivots, we specify that we want to query on the sites on the basis of their size.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "SITE", "label": "site"}
      ]
    },
    "stats": [
        {
            "field": "content.size",
            "label": "size",
            "min": true,
            "max": true,
            "stddev": true,
            "missing": true, 
            "sum": true,
            
            "sumOfSquares": true,
            "percentiles": ["1","12.5","25","50","75","99"],
            "distinctValues": false,
            "countDistinct": true,
            "cardinality": true,
            "cardinalityAccuracy": 0.1
      }
      ],
    "ranges":[ 
                {
                    "field": "created",
                    "start": "NOW/YEAR-5YEARS",
                    "end": "NOW/YEAR+1YEAR",
                    "gap": "+1YEAR",
                    "label": "created"
                }],
    "pivots" : [
      {
        "key": "**site**",
        "pivots": [
          {
            "key": "**size**"
          }
          ]
      }
      ]
}
```

**Response:** The result shows site-specific breakdown. It returns a pivot with sites and within each site, we have got all the metrics that come from the stats on size. For example, for a site called REPOSITORY, the results display the breakdown of PERCENTILES that is specific to REPOSITORY, nodes in that site that don't have content, sum, total count of content in that site, max and min content size in the site, and other information.

This information is repeated for each site.

```
 "context": {
            "facets": [
                {
                    "type": "range",
                    "label": "created",
                    "buckets": [
                        {
                            "label": "[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",
                            "filterQuery": "created:[\"2012-01-01T00:00:00Z\" TO \"2013-01-01T00:00:00Z\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2012-01-01T00:00:00Z",
                                "end": "2013-01-01T00:00:00Z",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "[2017-01-01T00:00:00Z - 2018-01-01T00:00:00Z]",
                            "filterQuery": "created:[\"2017-01-01T00:00:00Z\" TO \"2018-01-01T00:00:00Z\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "686"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2017-01-01T00:00:00Z",
                                "end": "2018-01-01T00:00:00Z",
                                "endInclusive": "true"
                            }
                        }
                    ]
                },
                {
                    "type": "pivot",
                    "label": "site",
                    "buckets": [
                        {
                            "label": "_**REPOSITORY**_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 711
                                    }
                                }
                            ]
                        },
                        {
                            "label": "swsdp",
                            "filterQuery": "SITE:\"swsdp\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 103
                                    }
                                }
                            ]
                        },
                        {
                            "label": "surf-config",
                            "filterQuery": "SITE:\"surf-config\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 2
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "stats",
                    "label": "size",
                    "buckets": [
                        {
                            "metrics": [
                                {
                                    "type": "missing",
                                    "value": {
                                        "missing": 601
                                    }
                                },
                                {
                                    "type": "sumOfSquares",
                                    "value": {
                                        "sumOfSquares": 30775603176391
                                    }
                                },
                                {
                                    "type": "max",
                                    "value": {
                                        "max": 3737049
                                    }
                                },
                                {
                                    "type": "stddev",
                                    "value": {
                                        "stddev": 370197.67997948296
                                    }
                                },
                                {
                                    "type": "mean",
                                    "value": {
                                        "mean": 82057.55813953489
                                    }
                                },
                                {
                                    "type": "sum",
                                    "value": {
                                        "sum": 17642375
                                    }
                                },
                                {
                                    "type": "countValues",
                                    "value": {
                                        "countValues": 215
                                    }
                                },
                                {
                                    "type": "min",
                                    "value": {
                                        "min": 25
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
```

This resembles doing a pivot in Microsoft Excel with fields and text values in all columns and measures like, count or average, in the middle.

**Example 2:** Instead of stats, you can also use ranges. In this case, for each site, the results will show a breakdown of when content was created.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "SITE", "label": "site"}
      ]
    },
    "stats": [
        {
            "field": "content.size",
            "label": "size",
            "min": true,
            "max": true,
            "stddev": true,
            "missing": true, 
            "sum": true,
            
            "sumOfSquares": true,
            "percentiles": ["1","12.5","25","50","75","99"],
            "distinctValues": false,
            "countDistinct": true,
            "cardinality": true,
            "cardinalityAccuracy": 0.1
      }
      ],
    "ranges":[ 
                {
                    "field": "created",
                    "start": "NOW/YEAR-5YEARS",
                    "end": "NOW/YEAR+1YEAR",
                    "gap": "+1YEAR",
                    "label": "created"
                }],
    "pivots" : [
      {
        "key": "**site**",
        "pivots": [
          {
            "key": "**created**"
          }
          ]
      }
      ]
}
```

**Response:** The response shows an overall breakdown and you see a range for created. After that is the pivot and for each `site`, there is `range` and `buckets`. At the top-level, there is also a `range` for `created`. Under that is the pivot and for each site, there's a range with buckets.

You can use these stats for creating reports, for example, for the REPOSITORY as a whole, you can create reports around when the first and last content was created or for what period of time that site was active.

```
"context": {
            "facets": [
                {
                    "type": "**range**",
                    "label": "**created**",
                    "buckets": [
                        {
                            "label": "[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",
                            "filterQuery": "created:[\"2012-01-01T00:00:00Z\" TO \"2013-01-01T00:00:00Z\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2012-01-01T00:00:00Z",
                                "end": "2013-01-01T00:00:00Z",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "[2017-01-01T00:00:00Z - 2018-01-01T00:00:00Z]",
                            "filterQuery": "created:[\"2017-01-01T00:00:00Z\" TO \"2018-01-01T00:00:00Z\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "686"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2017-01-01T00:00:00Z",
                                "end": "2018-01-01T00:00:00Z",
                                "endInclusive": "true"
                            }
                        }
                    ]
                },
                {
                    "type": "pivot",
                    "label": "site",
                    "buckets": [
                        {
                            "label": "_REPOSITORY_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 711
                                    }
                                }
                            ]
                        },
                        {
                            "label": "swsdp",
                            "filterQuery": "SITE:\"swsdp\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 103
                                    }
                                }
                            ]
                        },
                        {
                            "label": "surf-config",
                            "filterQuery": "SITE:\"surf-config\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 2
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "stats",
                    "label": "size",
                    "buckets": [
                        {
                            "metrics": [
                                {
                                    "type": "missing",
                                    "value": {
                                        "missing": 601
                                    }
                                },
                                {
                                    "type": "sumOfSquares",
                                    "value": {
                                        "sumOfSquares": 30775603176391
                                    }
                                },
                                {
                                    "type": "max",
                                    "value": {
                                        "max": 3737049
                                    }
                                },
                                {
                                    "type": "stddev",
                                    "value": {
                                        "stddev": 370197.67997948296
                                    }
                                },
                                {
                                    "type": "mean",
                                    "value": {
                                        "mean": 82057.55813953489
                                    }
                                },
                                {
                                    "type": "sum",
                                    "value": {
                                        "sum": 17642375
                                    }
                                },
                                {
                                    "type": "countValues",
                                    "value": {
                                        "countValues": 215
                                    }
                                },
                                {
                                    "type": "min",
                                    "value": {
                                        "min": 25
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
```

Using version store for reports: An index will store every version, so you can find out when a version was created. This gives you some measure of activity.

**Parent topic:**[Search API](../concepts/search-api.md)

