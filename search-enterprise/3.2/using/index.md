---
title: Search query syntax
---

Alfresco Search Enterprise supported search query syntax.

## Applications and Frameworks

* [ADF Search Components](https://www.alfresco.com/abn/adf/docs/){:target="_blank"}
* [ACA - Alfresco Content Application](https://github.com/alfresco/alfresco-content-app){:target="_blank"}
* [Alfresco Digital Workspace]({% link digital-workspace/latest/index.md %})
* [ReST API (only when using FTS search syntax)]({% link content-services/latest/develop/rest-api-guide/searching.md %})

> **Note:** Alfresco Share web application is not supported

## Search Features

* ACL Permission checks
* Sorting by relevancy
* [Searching by content type and controlling paging and sorting]({% link content-services/latest/develop/rest-api-guide/searching.md %}#searching-by-content-type-and-controlling-paging-and-sorting)
* [Faceted search]({% link content-services/latest/develop/rest-api-guide/searching.md %}#faceted-search)
* Filter by content size and mimetype
* Inclusion of additional properties in search results

## Search for a single term

Single terms are tokenized before the search according to the appropriate data dictionary definition(s).

If you do not specify a field, it will search in the content and in the following properties: name, title and description. This is a shortcut for searching *all properties of type content*. Terms can not contain a whitespace.

```bash
banana
TEXT:banana
```

Both of these queries will find any nodes with the word "banana" in any property of type `d:content`, however the first one will also get results from properties `cm:name`, `cm:title` or `cm:description`.

If the appropriate data dictionary definition(s) for the field supports both FTS and un-tokenized search, then FTS search will be used. FTS will include synonyms if the analyzer generates them.

## Search in fields

Search specific fields rather than the default. Terms, and phrases can all be preceded by a field. If not the default field `TEXT` is used.

```bash
field:term
field:"phrase"
field:'phrase'
=field:exact
~field:expand
```

> **Note:** Exact Term searching, using the equals operator (`=field:exact` in the samples above) is only allowed if the default Alfresco Repository configuration has been changed to enable this feature.

Fields fall into three types, property fields, special fields, and fields for data types. Property fields evaluate the search term against a particular property, special fields are described in the following table, and data type fields evaluate the search term against all properties of the given type.

|Type|Description|
|-----------|----|
|Property|Fully qualified property, for example `{http://www.alfresco.org/model/content/1.0}name:apple`.|
|Property|Fully qualified property, for example `@{http://www.alfresco.org/model/content/1.0}name:apple`.|
|Property|CMIS style property, for example `cm_name:apple`.|
|Property|Prefix style property, for example `cm:name:apple`.|
|Property|Prefix style property, for example `@cm:name:apple`.|
|Property|ID, for example `ID:'599a6862-070c-49a7-a744-b88da949c31e'`.|
|Property|TEXT, for example `TEXT:apple`.|
|Property|OWNER, for example `OWNER:'admin'`.|
|Property|READER, for example `READER:'GROUP_EVERYONE'`.|
|Property|DENIED, for example `DENIED:'GROUP_EVERYONE'`.|
|Special|TYPE, for example `TYPE:"qname"`.|
|Special|ASPECT, for example `ASPECT:"qname"`.|
|Special|SITE, for example `SITE:"shortname of the site"`.|
|Special|TAG, for example `TAG:"name of the tag"`.|
|Special|ALL, for example `ALL:'admin'`.|
|Special|EXISTS, for example `EXISTS cm:name:'Sample-Document.docx'`.|
|Special|ISNODE, for example `ISNODE cm:name:'Sample-Document.docx'`.|
|Field for Data Type|Fully qualified Data Type, for example `{http://www.alfresco.org/model/dictionary/1.0}content:apple`.|
|Field for Data Type|Data Type style property, for example `d:content:apple`.|

## Search in multi-value fields

When you search in multi-value fields there are additional options available than for [Search in fields](#search-in-fields). To search in multi-value fields your properties must have `Multiple` values enabled, for more see [Create a property
]({% link content-services/latest/config/models.md %}#create-a-property).

The following example queries are executed using a sample multi-valued property `"mul:os"` that stores values `"MacOS"` and `"Linux"`.

`mul:os:"MacOS"`

Returns the document because `"MacOS"` is one of the values of the property.

`mul:os:("MacOS" AND "Windows")`

Does not return a document because the property doesn't contain the value `"Windows"`.

`mul:os:("MacOS" OR "Windows")`

Returns the document because `"MacOS"` is one of the values of the property, even though `"Windows"` is not.

## Search for a phrase

Phrases are enclosed in double quotes. Any embedded quotes can be escaped using ''. If no field is specified then the default `TEXT` field will be used, as with searches for a single term.

The whole phrase will be tokenized before the search according to the appropriate data dictionary definition(s).

```afts
"big yellow banana"
```

## Search for wildcards

Wildcards are supported in terms, phrases, and exact phrases using `*` to match zero, one, or more characters and `?` to match a single character.

The `*` wildcard character can appear on its own and implies Google-style. The "anywhere after" wildcard pattern can be combined with the `=` prefix for identifier based pattern matching. Search will return and highlight any word that begins with the root of the word truncated by the `*` wildcard character.

All of the following will find the term apple.

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

> **Note:** Exact Term searching, using the equals operator (`=*ple` in the samples above), is only allowed if the default Alfresco Repository configuration has been changed in order to enable this feature.

When performing a search that includes a wildcard character, it is best to wrap your search term in double quotation marks. This ensures all metadata and content are searched.

## Search for conjunctions

Single terms, and phrases can be combined using `AND` in upper, lower, or mixed case.

The `AND` operator is interpreted as "every term is required".

```afts
big AND yellow
```

These queries search for nodes that contain all the terms `big` and `yellow` in any content or in properties `cm:name`, `cm:title` or `cm:description`.

### Search for disjunctions

Single terms, and phrases can be combined using `OR` in upper, lower, or mixed case.

The `OR` operator is interpreted as "at least one is required, more than one or all can be returned".

By default search fragments will be `ORed` together.

```text
big yellow banana
big OR yellow OR banana
TEXT:big TEXT:yellow TEXT:banana
TEXT:big OR TEXT:yellow OR TEXT:banana
```

These queries search for nodes that contain at least one of the terms `big`, `yellow`, or `banana` in any content. The first two will also get results from properties `cm:name`, `cm:title` or `cm:description`.

## Search for negation

You can narrow your search results by excluding words with the `NOT` syntax. Single terms, and phrases can be combined using “`NOT`” in upper, lower, or mixed case, or prefixed with “`!`” or “`-`”. These queries search for nodes that contain the terms yellow in any content.

```text
yellow NOT banana
yellow !banana
yellow -banana
NOT yellow banana
-yellow banana
!yellow banana
```

> **Note:** In the three initial samples above, since `OR` is the default operator for searching, the results are expected to include every node with "yellow" and every node without the "banana" term. If you want to get nodes with the "yellow" term and without the term "banana", use the following expression: `yellow AND NOT banana`.

The `NOT` operator can only be used for string keywords and doesn’t work for numerals or dates.

Prefixing any search qualifier with a `-` excludes all results that are matched by that qualifier.

## Search for optional, mandatory, and excluded elements of a query

Sometimes `AND` and `OR` are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".

|Operator|Description|
|--------|-----------|
|","|The field, phrase, group is optional; a match increases the score.|
|"+"|The field, phrase, group is mandatory. |
|"-", "!"|The field, phrase, group must not match.|

The following example finds documents that contain the term "car", score those with the term "red" higher, but does not match those just containing "red":

```afts
+car |red
```

> **Note:** At least one element of a query must match, or not match, for there to be any results.

All `AND` and `OR` constructs can be expressed with these operators.

## Escaping characters

Any character can be escaped using the backslash "`\`" in terms, IDs (field identifiers), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.

For example:

```afts
cm:my\ content:my\ name
```

## Search for ranges

Inclusive ranges can be specified in Google-style. There is an extended syntax for more complex ranges. Unbounded ranges can be defined using MIN and MAX for numeric and date types and "u0000" and "FFFF" for text (anything that is invalid).

|Lucene/CMIS|Google|Description|Example|
|------|------|-----------|-------|
|`[#1 TO #2]`|`#1..#2`|The range #1 to #2 inclusive ``#1 <= x <= #2``|`0..5``[0 TO 5]`|
|`<#1 TO #2]`| |The range #1 to #2 including #2 but not #1.`#1 < x <= #2`|`<0 TO 5]`|
|`[#1 TO #2>`| |The range #1 to #2 including #1 but not #2.`#1 <= x < #2`|`[0 TO 5>`|
|`<#1 TO #2>`| |The range #1 to #2 exclusive.`#1 < x < #2`|`<0 TO 5>`|

```afts
TEXT:apple..banana
my:int:[0 TO 10]
my:float:2.5..3.5
my:float:0..MAX
mt:text:[l TO "uFFFF"]
```

When searching for a date range you can use a partial date. Elasticsearch replaces the missing date components with the values below:

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

### Search using date math

Date range queries can be more powerful when applying date math functions. AFTS supports adding and subtracting periods, as well as rounding:

| AFTS query | Description |
| ---------- | ----------- |
| `acme:projectStartDate:[NOW TO NOW+1DAY>` | Documents that have a project start date in the next twenty four hours. |
| `acme:projectStartDate:[NOW/DAY TO NOW/DAY+1DAY>` | Documents that have a project start date from the current day. The current day is defined as from midnight to midnight (UTC), **Note:** The subtle difference between this query and the one above. |
| `acme:projectStartDate:[NOW-1MONTH/YEAR TO NOW-1MONTH/YEAR+1DAY>` | Documents with a project start date in the first day of the current year, or in the first day of last year if it is currently January. **Note:** It's possible to chain date math functions together. |
| `cm:created:[2020-11-01T12:34:00/YEAR TO NOW>` | Documents that were created since the the start of 2020. **Note:** It's also possible to apply date math to absolute points in time. |

All of these examples have used an inclusive lower bound and an exclusive upper bound. Other bounds can be used but Search Enterprise performs rounding based on the type of bound being used:

| AFTS Bound | Description | Elasticsearch rounding behaviour |
| ---------- | ------- | ----------------------- |
| `[NOW/YEAR TO ...` | Inclusive lower bound. | From the start of the current year. |
| `<NOW/YEAR TO ...` | Exclusive lower bound. | After the end of the current year. |
| `... TO NOW/YEAR]` | Inclusive upper bound. | Until the end of the current year. |
| `... TO NOW/YEAR>` | Exclusive upper bound. | Before the start of the current year. |

For more details see the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html#range-query-date-math-rounding).

## Search for an exact term

> **Note:** Exact Term searching is only allowed if default Alfresco Repository configuration has been changed in order to enable this feature.

To search for an exact term you must prefix it with "=". The supported syntax:

```afts
=term
=term1 =term2
="multi term phrase"
=field:term
=field:term1 =field:term2
=field:“multi term phrase”
```

If you don’t specify a field the search runs against name, description, title, and content. If the field specified is `TOKENIZED=false`, only the full field is matched. If the field you specified is `TOKENIZED=TRUE` or `TOKENIZED=BOTH` then the search is run on the cross locale tokenized version of the field.

> **Note:** Exact Term Search is disabled by default, for more see [Pre-indexing considerations]({% link search-enterprise/3.2/admin/index.md %}#pre-indexing-considerations).

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

## Search for proximity

Google-style proximity is supported.

To specify proximity for fields, use grouping.

```sql
big * apple
TEXT:(big * apple)
big *(3) apple
TEXT:(big *(3) apple)
```

## Requesting optional item information

We have taken what we're calling a "performance first" approach with the API. This means that each endpoint, by default, only returns the item information that is efficient to retrieve.

If additional processing is required on the server side to obtain the item information, then it's made available via the `include` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?include=properties,aspectNames` request shows how you can also include the properties and aspects for each node in your home folder when listing its children.

As with the `orderBy` and `where` parameters, the `include` parameter is specific to the endpoint so you’ll need to consult the API Explorer to see what extra item information is available.
