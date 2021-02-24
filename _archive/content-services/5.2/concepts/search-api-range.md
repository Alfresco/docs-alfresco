---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# range

The `range` element keeps together a series of range queries on any date or numeric field that supports range queries. It allows you to create a number of buckets and then group things by those.

## Parameters

The parameter for the `highlight` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`range`|String|This specifies the field to facet by range.|
|`start`|String|This specifies the start of the facet range.|
|`end`|Integer|This specifies the end of the facet range.|
|`gap`|Integer|This specifies the span of the range as a value to be added to the lower bound.|
|`hardend`|Integer|This boolean parameter specifies how Solr handles a range gap that cannot be evenly divided between the range start and end values. If true, the last range constraint will have the `facet.range.end` value an upper bound. If false, the last range will have the smallest possible upper bound greater than `facet.range.end` such that the range is the exact width of the specified range gap. The default value for this parameter is false.|
|`include`|Boolean|This specifies inclusion and exclusion preferences for the upper and lower bounds of the range.|
|`other`|Boolean|This specifies counts for Solr to compute in addition to the counts for each facet range `constraint.facet.range.method`.|
|`method`|Boolean|This specifies the algorithm or method to use for calculating facets.|

Range is similar to filter queries and filter cache. If you are using lot of range, it will filter through the cache and make it bigger.

## Examples

**Range - date:** In this example, we want to query anything within a name field. The result should have a range with label *created*, a start date, an end date, and a gap of one year.

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "created",
                    "start": "2012",
                    "end": "2017",
                    "gap": "+1YEAR"
                }]
}
```

**Response**

The response shows a facet entry of `type` *range*. As the label was not specified in the query, the returned range has a `label` by field, *created*. Each individual bucket also has an auto-generated label, for example, `"[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",`. You can also build your own custom labels. Each bucket has a gap of one year. The metric displays the count of results found. Each bucket has a `bucketInfo` section that shows the start and end value.

```
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
                }
            ]
        },
```

By default, range includes the bottom of the range and not the top, but it will include the boundary. The last bucket in the range includes both the start and the end. So, in the above example, we count everything up to the end of 2018 and this is also reflected in the `label` and the `filterQuery`, as shown below:

```
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
```

**Range - date - timezone**: In this example, we want to do a range with label *created*. We have also specified the start and end date using Solr date math expression, which makes it easy to create times relative to fixed moments in time and include the current time which can be represented using the special value of `NOW`. Here we have taken today's date and round it to a year. So, we want the query to range from the beginning of this year and go back five years with a gap of one year. Based on the localization parameters, the query will search for English and French tokenization and sort everything according to French.

```
{
    "query": {
        "query": "name:*"
    },
    "ranges":[ {
        "field": "created",
        "start": "2012",
        "end": "2017",
        "gap": "+1YEAR"
    }],
    "localization":  
    {
       "timezone": "GMT+6",
       "locales" : [ "fr", "en" ]                
    }
}
```

**Range - numeric:** Range allows you to split content in numeric buckets. It counts documents by their size. In this example, we want to query on the name field with label *content.size*. The result will create 10 buckets of documents between 0 to 1000000 with a gap of 100000.

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "content.size",
                    "start": "0",
                    "end": "1000000",
                    "gap": "100000"
                }]
}
```

**Response**

```
"facets": [
                {
                    "type": "range",
                    "label": "content.size",
                    "buckets": [
                        {
                            "label": "[0 - 100000)",
                            "filterQuery": "content.size:[\"0\" TO \"100000\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "192"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "0",
                                "end": "100000",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "[900000 - 1000000]",
                            "filterQuery": "content.size:[\"900000\" TO \"1000000\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "1"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "900000",
                                "end": "1000000",
                                "endInclusive": "true"
                            }
                        }
                    ]
                }
            ]
        },
```

**Range - options:** This allows you to add some options \(for example, `hardend` and `include`\) to a query so that you can control what you get in the report.

When you set `hardend` to true, it buckets the results from start to end based on the gap. If you go over the end value, the bucket will be truncated so that you don't include results beyond the end point. The default is to just add that over the end point.

Additionally, you can also decide what to include using `include`. For example:

```
`"include":["lower", "upper", "edge"]`
```

The above query specifies that if you choose `lower`, every bucket that is generated, will include the lower value. If you choose `upper`, every bucket will include the upper value, and if you include `edge`, the lowest bucket will include its lowest value and the upper bucket will include its highest value. Ideally, you will choose `edge` with `upper` or `lower`. The default is `lower` with `edge`, so you don't double count values. The risk using `lower` with `upper` is that you may double-count things if they fall on the boundary of two buckets.

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "content.size",
                    "start": "0",
                    "end": "950000",
                    "gap": "100000",
                    "hardend": true,
                    "include":["lower", "upper", "edge"] 
                }]
}
```

Here's an example of a range option using `edge`:

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "content.size",
                    "start": "0",
                    "end": "950000",
                    "gap": "100000",
                    "hardend": true,
                    "include":["edge"] 
                }]
}
```

**Response:** The result shows that the first bucket includes the outer range whereas the rest of the buckets do not include the start or the end point as neither `upper` nor `lower` has been specified. The last bucket includes the upper boundary and includes a `true` condition. It is also truncated at the end point of 950000.

```
"facets": [
                {
                    "type": "range",
                    "label": "content.size",
                    "buckets": [
                        {
                            "label": "[0 - 100000)",
                            "filterQuery": "content.size:[\"0\" TO \"100000\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "192"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "0",
                                "end": "100000",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "(900000 - 950000]",
                            "filterQuery": "content.size:<\"900000\" TO \"950000\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "false",
                                "start": "900000",
                                "end": "950000",
                                "endInclusive": "true"
                            }
                        }
                    ]
                }
            ]
        },
```

**Parent topic:**[Search API](../concepts/search-api.md)

