---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# facetIntervals

The `facetIntervals` element specifies facet intervals. It is more restrictive but fast range-based faceting. It enables you to control the ranges using `Intervals` and provides much more flexibility on what you get in your ranges. In `intervals`, the ranges don't overlap so you can double-count the entries and use date maths expressions, such as TODAY, THIS WEEK, THIS MONTH, and THIS YEAR.

## Parameters

The parameter for the `facetIntervals` element is:

|Parameter|Description|
|---------|-----------|
|`sets`|Sets the intervals for all fields.|
|`intervals`|Specifies the fields to facet by interval.|

The filters used with the `sets` parameter are:

|Filters|Type|Description|
|-------|----|-----------|
|`label`|String|This specifies the label to use to identify the set.|
|`start`|String|This specifies the start of the range.|
|`end`|String|This specifies the end of the range.|
|`startInclusive`|Boolean|When true, the set will include values greater or equal to `start`. The default value is `true`.|
|`endInclusive`|Boolean|When true, the set will include values less than or equal to `end`. The default value is `true`.|

The filters used with the `intervals` parameter are:

|Filters|Type|Description|
|-------|----|-----------|
|`field`|String|This specifies the field to facet on.|
|`label`|String|This specifies the label to use to identify the field facet.|
|`sets`|String|This restricts the possible constraints to only indexed values with a specified prefix.|

Even though `range` and `intervals` look similar, there is a slight difference between them. For example:

-   Overlapping content: In `range`, you get a series of content and it cannot overlap, except if you are using `include`. With `intervals`, you specify exactly what you want for every interval, so you can have overlapping ranges. You can specify any interval, for example, `TODAY`, `THIS WEEK`, `THIS MONTH`, `LAST YEAR`, and count things more than once. You cannot do this with `range`.
-   Nested query: You can embed a range in another nested pivot but `intervals` cannot be nested.

**Note:** There is a known issue in Solr 4 with intervals - Label on an interval does not work.

**Note:** Solr 6 supports text intervals. Make sure you use non-tokenised or interval-based fields with text. Also, intervals are similar to range facet queries and can take advantage of doc values in Solr.

## Examples

**Interval - date:** In this example, we have defined a group of intervals. Each interval contains a label and a field. Within each field is a group of sets that you want to report on. The first set specifies that the query should return results during the year 2016-2017. You can also specify if you want to include the end. The second set specifies that the query should return results according to the specified date maths expression. The third set specifies that the query should return the result according to the wildcard that allows open-ended range. So, this set specifies everything before 2016.

```
{
  "query": {
    "query": "name:*",
    "language": "afts"
  },
  "filterQueries": [{"query": "cm:created:[* TO 2016>"}],
  "facetIntervals": {
    "intervals": [
      {
        
        "field": "cm:created",
          "sets": [
            {
              "label": "lastYear",
              "start": "2016",
              "end": "2017",
              "endInclusive" : false
            },
            {
              "label": "currentYear",
              "start": "NOW/YEAR",
              "end": "NOW/YEAR+1YEAR"
            },
          {
            "label": "earlier",
            "start": "*",
            "end": "2016",
            "endInclusive" : false
          }
        ]
      }
    ]
  }
}
```

**Interval - date - timezone:** By specifying the `timezone` and `locales`, the query adjusts the year based on your timezone. In the following example, the first set explicitly specifies the year range, so the response will bring back intervals based on the dates that you have asked for. In the second set, the Solr date math expression will consider the specified time zone.

```
{
  "query": {
    "query": "name:*",
    "language": "afts"
  },
  "filterQueries": [{"query": "cm:created:[* TO 2016>"}],
   "localization":  
    {
       "timezone": "GMT+6",
       "locales" : [ "fr", "en" ]                
    },
  "facetIntervals": {
    "intervals": [
      {
        "label" : "TheCreated",
        "field": "cm:created",
          "sets": [
            {
              "label": "lastYear",
              "start": "2016",
              "end": "2017",
              "endInclusive" : false
            },
            {
              "label": "currentYear",
              "start": "NOW/YEAR",
              "end": "NOW/YEAR+1YEAR"
            },
          {
            "label": "earlier",
            "start": "*",
            "end": "2016",
            "endInclusive" : false
          }
        ]
      }
    ]
  }
}
```

**Interval - numeric:** This only works with numbers. In this example, we want to generate intervals that overlap, for example, 0-100, 0-10000, and 110-600. You can also specify `startInclusive` and `endInclusive`. The set\(s\) defined within `facetIntervals` will apply to all the fields.

```
{
  "query": {
    "query": "name:*"
  },
  "facetIntervals": {
    "sets":[
         { "start": "0", "startInclusive": false, "end": "100", "endInclusive": false, "label":"exclusive"}
     ],
    "intervals" : [ 
         {
           "field": "content.size",
           
           "sets":[
               { "start": "0", "startInclusive": true, "end": "100", "endInclusive": false, "label":"inclusive1"},
               { "start": "0", "startInclusive": true, "end": "10000", "endInclusive": false, "label":"inclusive2"},
               { "start": "110", "startInclusive": true, "end": "600", "endInclusive": true, "label":"inclusive3"}
              ]
         }
    ]
}
}
```

**Interval - text:** Intervals can also be used with text. In this example, we want to query on everything under `name` and filtered for things that start with `b*` even if they are not untokenized. The result is faceted on terms starting with a, b, and c.

```
{
                "query": {
                    "query": "name:*"
                },
                "filterQueries": [
    {
      "query": "=name:b*"
    }
  ],
                
                
                 "facetIntervals": {
    "intervals" : [ 
         {
           "field": "name",
           "sets":[
               { "start": "a", "startInclusive": true, "end": "b", "endInclusive": false},
               { "start": "b", "startInclusive": true, "end": "c", "endInclusive": false},
               { "start": "c", "startInclusive": true, "end": "d", "endInclusive": false}
              ]
         }
    ]
}
}
```

The response returns intervals that are text based.

**Parent topic:**[Search API](../concepts/search-api.md)

