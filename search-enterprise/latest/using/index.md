---
title: Search query syntax
---

Alfresco Search Enterprise supported and unsupported search queries.

* ACL Permission checks @Martin what else can go here?

* Sorting by relevancy @martin ditto

## Searching by content type and controlling paging and sorting

@martin I have added this in twice because it is mentioned twice on the features page on the wiki. Which one do you want me to remove? cheers. 

As with all the v1 ReST APIs paging can also be controlled, it's just done via the body rather than a query parameter. 
The results can also be sorted. The example body below shows how to execute a search to find all files ordered by the 
`cm:name` property, only show 25 results rather than the default of 100 and skip the first 10 results:

```json
{
  "query": {
    "query": "+TYPE:\"cm:content\"",
    "language": "afts"
  },
  "paging": {
    "maxItems": "25",
    "skipCount": "10"
  },
  "sort": [{"type":"FIELD", "field":"cm:name", "ascending":"false"}]
}
```

This also shows how you can search for a specific content type with the `TYPE` keyword.

Here is how the call looks like, assuming that we have stored the query JSON data in a file called `paging-sort-query.json`:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@paging-sort-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 13836    0 13622  100   214  31387    493 --:--:-- --:--:-- --:--:-- 31880
{
  "list": {
    "pagination": {
      "count": 25,
      "hasMoreItems": true,
      "skipCount": 10,
      "maxItems": 25
    },
    "entries": [
      {
        "entry": {
           "name": "WebSiteReview.mp4",
...        }
      },
      {
        "entry": {
           "name": "turbine.JPG",
...        }
      },
      {
        "entry": {
           "name": "translatable.ftl",
...        }
      },
      {
        "entry": {
          "name": "text-file.txt",
...        }
      },
      {
          "name": "test return value.js.sample",
...        }
      },
      {
        "entry": {
          "name": "test-file.txt",
...        }
      },
      {
          "name": "system-overview.html",
...        }
      },
      {
        "entry": {
          "name": "start-pooled-review-workflow.js",
...        }
      },
      {
        "entry": {
          "name": "some-stuff.txt",
...        }
      },
      {
        "entry": {
          "name": "somefile.txt",
...        }
      },
 ...
    ]
  }
}
```

The result have been truncated a bit here for clarity.

## Faceted search

Now when we have covered the basics let's look at a couple of the more interesting features of the search API, faceting and term highlighting.

There are two types of facets; queries and fields. A query facet returns the count of results for the given query, you 
can provide multiple facet queries in one request. A field facet returns a number of "buckets" for a field, providing 
the count of results that fit into each bucket.

It's much easier to understand with an example, the body below shows a search request that will look for files that have 
a `cm:name` or `cm:title` starting with "test". We also specify that we want to know how many of the results are small 
files, how many are plain text files, how many are images and how many are Office files. Additionally, we are also asking 
for the `creator` facet field to be included, which will indicate how many of the results were created by each user:

```json
{
  "query": {
    "query": "(name:\"test*\" OR title:\"test*\") AND TYPE:\"cm:content\""
  },
  "facetQueries": [
    {"query": "content.size:[0 TO 10240]", "label": "Small Files"},
    {"query": "content.mimetype:'text/plain'", "label": "Plain Text"},
    {"query": "content.mimetype:'image/jpeg' OR content.mimetype:'image/png' OR content.mimetype:'image/gif'", "label": "Images"},
    {"query": "content.mimetype:'application/msword' OR content.mimetype:'application/vnd.ms-excel'", "label": "Office"}
  ], 
  "facetFields": {"facets": [{"field": "creator"}]}
}
```

Here is how the call looks like, assuming that we have stored the query JSON data in a file called `facet-query.json`:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@facet-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  6359    0  5793  100   566   141k  14150 --:--:-- --:--:-- --:--:--  159k
{
  "list": {
    "pagination": {
      "count": 9,
      "hasMoreItems": false,
      "totalItems": 9,
      "skipCount": 0,
      "maxItems": 100
    },
    "context": {
      "consistency": {
        "lastTxId": 193
      },
      "facetQueries": [
        {
          "label": "Office",
          "filterQuery": "content.mimetype:'application/msword' OR content.mimetype:'application/vnd.ms-excel'",
          "count": 3
        },
        {
          "label": "Small Files",
          "filterQuery": "content.size:[0 TO 10240]",
          "count": 3
        },
        {
          "label": "Plain Text",
          "filterQuery": "content.mimetype:'text/plain'",
          "count": 1
        },
        {
          "label": "Images",
          "filterQuery": "content.mimetype:'image/jpeg' OR content.mimetype:'image/png' OR content.mimetype:'image/gif'",
          "count": 3
        }
      ],
      "facetsFields": [
        {
          "label": "creator",
          "buckets": [
            {
              "label": "admin",
              "filterQuery": "creator:\"admin\"",
              "count": 9,
              "display": "Administrator"
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
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-11-07T10:43:43.279+0000",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 9,
            "encoding": "UTF-8"
          },
          "parentId": "6b661ba4-830b-457d-af04-46f174351536",
          "createdAt": "2019-11-07T10:43:43.279+0000",
          "isFolder": false,
          "search": {
            "score": 1
          },
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "test-file.txt",
          "location": "nodes",
          "id": "9613e418-b1c1-4889-8866-4dccda66a258"
        }
      },
      ...
    ]
  }
}
```

As well as the expected list of files, the response also contains a `facetQueries` and a `facetsFields` object 
containing the counts we requested. The `facetQueries` object has an entry for each query supplied in the result whereas 
the `facetsFields` object contains an entry for each requested field which in turn contains the count for each bucket.

## Filter by content size and mimetype

@martin where is a good place to put this? Any more info?

## Requesting optional item information

We have taken what we're calling a "performance first" approach with the API. This means that each endpoint, by default, only returns the item information that is efficient to retrieve.

If additional processing is required on the server side to obtain the item information, then it's made available via the `include` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?include=properties,aspectNames` request shows how you can also include the properties and aspects for each node in your home folder when listing its children.

As with the `orderBy` and `where` parameters, the `include` parameter is specific to the endpoint so you’ll need to consult the API Explorer to see what extra item information is available.

## Search for a single term

@martin, on the in depth page, we have Search for exact term, which also includes Single term underneath it. Is this the same thing? I have not copied it out

Single terms are tokenized before the search according to the appropriate data dictionary definition(s).

If you do not specify a field, it will search in the content and properties. This is a shortcut for searching all properties of type content. Terms cannot contain a whitespace.

```bash
banana
TEXT:banana
```

Both of these queries will find any nodes with the word "banana" in any property of type `d:content`.

If the appropriate data dictionary definition(s) for the field supports both FTS and untokenized search, then FTS search will be used. FTS will include synonyms if the analyzer generates them. Terms cannot contain whitespace.

## Search in fields

@martin there is a Fields heading on the In depth page, how do you want me to handle that info? Is it different to this info?

Search specific fields rather than the default. Terms, and phrases etc @martin what can we use here instead of etc? can all be preceded by a field. If not the default field TEXT is used.

```bash
field:term
field:"phrase"
=field:exact
~field:expand
```

Fields fall into three types, property fields, special fields, and fields for data types. Property fields evaluate the search term against a particular property, special fields are described in the following table, and data type fields evaluate the search term against all properties of the given type.

|Type|Description|
|-----------|----|
|Property|Fully qualified property, for example `{http://www.alfresco.org/model/content/1.0}name:apple`. |
|Poroperty|Fully qualified property, for example `@{http://www.alfresco.org/model/content/1.0}name:apple`. |
|Property|CMIS style property, for example `cm_name:apple`.|
|Property|Prefix style property, for example `cm:name:apple`.|
|Property|Prefix style property, for example `@cm:name:apple`.|
|Property|TEXT, for example `TEXT:apple`.|
|Special|ID, for example `ID:"NodeRef"`.|
|Special|ISROOT, for example `ISROOT:T`.|
|Special|TX, for example `TX:"TX"`.|
|Special|PARENT, for example `PARENT:"NodeRef"`.|
|Special|PRIMARYPARENT, for example `PRIMARYPARENT:"NodeRef"`.|
|Special|QNAME, for example `QNAME:"app:company_home"`.|
|Special|CLASS, for example `CLASS:"qname"`.|
|Special|EXACTCLASS, for example `EXACTCLASS:"qname"`.|
|Special|TYPE, for example `TYPE:"qname"`.|
|Special|EXACTTYPE, for example `EXACTTYPE:"qname"`.|
|Special|ASPECT, for example `ASPECT:"qname"`.|
|Special|EXACTASPECT, for example `EXACTASPECT:"qname"`.|
|Special|ISUNSET, for example `ISUNSET:"property-qname"`.|
|Special|ISNULL, for example `ISNULL:"property-qname"`.|
|Special|ISNOTNULL, for example `ISNOTNULL:"property-qname"`.|
|Special|EXISTS, for example `EXISTS:"name of the property"`.|
|Special|SITE, for example `SITE:"shortname of the site"`.|
|Special|TAG. TAG: "name of the tag" **Note:** `TAG` must be in upper case.|
|Fully qualified data type|Data Type, for example `http://www.alfresco.org/model/dictionary/1.0}content:apple`|
|prefixed data type|Data Type, d:content:apple|

## Search for a phrase

@martin, on the in depth page, we have Search for exact term, which also includes phrase underneath it. How do you want me to handle this? Is it the same?

Phrases are enclosed in double quotes. Any embedded quotes can be escaped using ``. If no field is specified then the default TEXT field will be used, as with searches for a single term.

The whole phrase will be tokenized before the search according to the appropriate data dictionary definition(s).

```afts
"big yellow banana"
```

## Search for wildcards

Wildcards are supported in terms, phrases, and exact phrases using `*` to match zero, one, or more characters and `?` to match a single character.

The `*` wildcard character can appear on its own and implies Google-style. The "anywhere after" wildcard pattern can be combined with the `=` prefix for identifier based pattern matching. Search will return and highlight any word that begins with the root of the word truncated by the `*` wildcard character.

The following will all find the term apple.

```afts
TEXT:app?e
TEXT:app*
TEXT:*pple
appl?
*ple
=*ple
"ap*le"
"***le"
"?????"
```

When performing a search that includes a wildcard character, it is best to wrap your search term in double quotation marks. This ensures all metadata and content are searched.

## Search for conjunctions

The ability to use AND in the search query.

## Search for disjunctions

Single terms, and phrases can be combined using `OR` in upper, lower, or mixed case.

The `OR` operator is interpreted as "at least one is required, more than one or all can be returned".

If not otherwise specified, by default search fragments will be `ORed` together.

```text
big yellow banana
big OR yellow OR banana
TEXT:big TEXT:yellow TEXT:banana
TEXT:big OR TEXT:yellow OR TEXT:banana
```

These queries search for nodes that contain at least one of the terms `big`, `yellow`, or `banana` in any content.

## Search for negation

You can narrow your search results by excluding words with the `NOT` syntax.

Single terms, phrases, and so on can be combined using "`NOT`" in upper, lower, or mixed case, or prefixed with "`!`" or "`-`".

These queries search for nodes that contain the terms `yellow` in any content.

```afts
yellow NOT banana
yellow !banana
yellow -banana
NOT yellow banana
-yellow banana
!yellow banana
```

The `NOT` operator can only be used for string keywords; it doesn't work for numerals or dates.

Prefixing any search qualifier with a `-` excludes all results that are matched by that qualifier.

When you search using negation the query will be built using the default field operator (OR). For instance, if you are querying for negation:

```afts
taxi AND driver NOT yellow
```

the query will be executed as:

```afts
taxi AND driver OR NOT passenger
```

If you expect a different behavior, you have to specify the boolean conjunction:

```afts
taxi AND driver AND NOT passenger
```

## Search for optional, mandatory, and excluded elements of a query

Sometimes AND and OR are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".

|Operator|Description|
|--------|-----------|
|","|The field, phrase, group is optional; a match increases the score.|
|"+"|The field, phrase, group is mandatory **Note:** this differs from Google - see "=")|
|"-", "!"|The field, phrase, group must not match.|

The following example finds documents that contain the term "car", score those with the term "red" higher, but does not match those just containing "red":

```afts
+car |red
```

> **Note:** At least one element of a query must match (or not match) for there to be any results.

All `AND` and `OR` constructs can be expressed with these operators.

Using the mandatory operator we should occur, comparing with other search engines, in a weird behavior about the mandatory operator (+). For instance, executing the query below:

```afts
+taxi +driver
```

We will expect for all results containing _taxi_ and _driver_, but because AFTS language composes the query using the boolean operator OR as default operator, the query will be translated to:

```afts
+taxi OR +driver
```

Returning all items that contain "taxi" or driver.

## Escaping characters

Any character can be escaped using the backslash "" in terms, IDs (field identifiers), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.

For example:

```afts
cm:my content:my name
```

## Searching by content type and controlling paging and sorting

@Martin we have another section called Type and Aspect Queries on the in depth page. Is that needed here?

As with all the v1 ReST APIs paging can also be controlled, it's just done via the body rather than a query parameter. 
The results can also be sorted. The example body below shows how to execute a search to find all files ordered by the 
`cm:name` property, only show 25 results rather than the default of 100 and skip the first 10 results:

```json
{
  "query": {
    "query": "+TYPE:\"cm:content\"",
    "language": "afts"
  },
  "paging": {
    "maxItems": "25",
    "skipCount": "10"
  },
  "sort": [{"type":"FIELD", "field":"cm:name", "ascending":"false"}]
}
```

This also shows how you can search for a specific content type with the `TYPE` keyword.

Here is how the call looks like, assuming that we have stored the query JSON data in a file called `paging-sort-query.json`:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --header 'Authorization: Basic VElDS0VUXzIxYzAzOWMxNjFjYzljMDNmNmNlMzAwYzAyMDY5YTQ2OTQwZmYzZmM=' --data-binary '@paging-sort-query.json' 'http://localhost:8080/alfresco/api/-default-/public/search/versions/1/search' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 13836    0 13622  100   214  31387    493 --:--:-- --:--:-- --:--:-- 31880
{
  "list": {
    "pagination": {
      "count": 25,
      "hasMoreItems": true,
      "skipCount": 10,
      "maxItems": 25
    },
    "entries": [
      {
        "entry": {
           "name": "WebSiteReview.mp4",
...        }
      },
      {
        "entry": {
           "name": "turbine.JPG",
...        }
      },
      {
        "entry": {
           "name": "translatable.ftl",
...        }
      },
      {
        "entry": {
          "name": "text-file.txt",
...        }
      },
      {
          "name": "test return value.js.sample",
...        }
      },
      {
        "entry": {
          "name": "test-file.txt",
...        }
      },
      {
          "name": "system-overview.html",
...        }
      },
      {
        "entry": {
          "name": "start-pooled-review-workflow.js",
...        }
      },
      {
        "entry": {
          "name": "some-stuff.txt",
...        }
      },
      {
        "entry": {
          "name": "somefile.txt",
...        }
      },
 ...
    ]
  }
}
```

The result have been truncated a bit here for clarity.

## Search for ranges

Inclusive ranges can be specified in Google-style. There is an extended syntax for more complex ranges. Unbounded ranges can be defined using MIN and MAX for numeric and date types and "u0000" and "FFFF" for text (anything that is invalid).

|Lucene|Google|Description|Example|
|------|------|-----------|-------|
|`[#1 TO #2]`|`#1..#2`|The range #1 to #2 inclusive ``#1 <= x <= #2``|`0..5``[0 TO 5]`|
|`<#1 TO #2]`| |The range #1 to #2 including #2 but not #1.`#1 < x <= #2`|`<0 TO 5]`|
|`[#1 TO #2>`| |The range #1 to #2 including #1 but not #2.`#1 <= x < #2`|`[0 TO 5>`|
|`<#1 TO #2>`| |The range #1 to #2 exclusive.`#1 < x < #2`|`<0 TO 5>`|

```afts
TEXT:apple..banana
my:int:[0 TO 10]
my:float:2.5..3.5
my:float:0..MAX
mt:text:[l TO "uFFFF"]
```

When searching for a date range you can use a partial date. Elasticsearch replaces missing date components with the values below:

* Month of year: 01
* Day of month: 01
* Hour of day: 23
* Minute of hours:  59
* Second of minute: 59
* Nano of second:   999_999_999

The last four items will be replaced with 0 when the date component is missing in the minimum date in a range expression, e.g. [1950 to 2021] will be executed as [1950-01-01T00:00:00 TO 2021-01-01T23:59:59].

In the REST API you can specify the timezone to be used in search for date ranges.

```json
{
    "query": {
        "query": "cm:created:['2021-05-01T09:00:00' TO '2021-05-28T09:05:59']",
        "language": "afts"
    },
    "localization": {
        "timezone": "Asia/Yerevan"
    }
}
```

## Search for an exact term

To search for an exact term you must prefix it with "=". The supported syntax:

* `=term`
* `=term1 =term2`
* `=“multi term phrase”`

    > **Note:** `=“multi term phrase”` returns documents only with the exact phrase and terms in the exact order.

* `=field:term`
* `=field:term1 =field:term2`
* `=field:“multi term phrase”`

If you don’t specify a field the search runs against name, description, title, and content. If the field specified is `TOKENIZED=false`, only the full field is matched. If the field you specified is `TOKENIZED=TRUE` or `TOKENIZED=BOTH` then the search is run on the cross locale tokenized version of the field.

> **Note:** If cross locale is not configured for the field then an exception occurs.

The list of the default supported types as declared in the `<alfresco_home>/solr4/conf/shared.properties` file:

* `alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`
* `alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`
* `alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`

Single Term

```afts
=taxi 
```

Multi Term

```afts
=taxi =driver
```

Phrase

```afts
="taxi driver"
```

> **Note:** Exact Term Search is disabled by default, to enable it refer to Indexing documentation and the configuration file: `exactTermSearch.properties`.

## Searches that involve stopwords

[Stopwords](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-tokenfilter.html#analysis-stop-tokenfilter-stop-words-by-lang){:target="_blank"} are removed from the query.

For example:

```afts
stopword1 quick fox stopword2 brown
```

becomes

```afts
quick fox brown
```

This behavior is different from Search and Insight Engine and Search Services in that it keeps stopwords in the query to build positional queries, for example:

```afts
stopword1 quick fox stopword2 brown
```

becomes

```afts
stopword1_quick quick fox_stopword2 fox stopword2_brown brown
```

### Field Queries and execution behavior

The fields and the corresponding query execution behavior listed in this section, are common to AFTS and Lucene query languages.
