---
title: Features
---

Alfresco Search Enterprise 3.0 provides a subset of the searching features provided by Alfresco Search Services.

## Applications & Frameworks

* [ADF Search Components](https://www.alfresco.com/abn/adf/docs/)
* [ACA - Alfresco Content Application](https://github.com/alfresco/alfresco-content-app)
* [ADW - Alfresco Digital Workspace](https://docs.alfresco.com/digital-workspace/latest/)
* [ReST API (only when using FTS search syntax)](https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/searching/)

> **Note:** Alfresco Share web application is not supported

## Search Features

* ACL Permission checks
* Sorting by relevancy
* (Paging)[https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/searching/#searching-by-content-type-and-controlling-paging-and-sorting]{:target="_blank"}
* (Faceting)[https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/searching/#faceted-search]{:target="_blank"}
* Filter by content size and mimetype
* (Inclusion of additional properties in search results)[https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/#requesting-optional-item-information]{:target="_blank"}

Note that not all faceting features available for Solr are currently supported. See the following tickets for more details:
* [SEARCH-2681 Add Facet Interval Support](https://alfresco.atlassian.net/browse/SEARCH-2681){:target="_blank"}
* [SEARCH-2682 Add Facet Range Support](https://alfresco.atlassian.net/browse/SEARCH-2682){:target="_blank"}
* [SEARCH-2749 Add support for Tag & Exclusion facets](https://alfresco.atlassian.net/browse/SEARCH-2749){:target="_blank"}

## Search Syntax

### Search for a single term

Single terms are tokenized before the search according to the appropriate data dictionary definition(s).

If you do not specify a field, it will search in the content and in the following properties: name, title and description. This is a shortcut for searching *all properties of type content*. Terms can not contain a whitespace.

```sql
banana
TEXT:banana
```

Both of these queries will find any nodes with the word "banana" in any property of type `d:content`. howeveer, the first one will also get results from properties `cm:name`, `cm:title` or `cm:description`.

If the appropriate data dictionary definition(s) for the field supports both FTS and untokenized search, then FTS search will be used. FTS will include synonyms if the analyzer generates them.

### Search in fields

Search specific fields rather than the default. Terms, phrases, etc. can all be preceded by a field. If not the default field TEXT is used.

```bash
field:term
field:"phrase"
field:'phrase'
=field:exact
~field:expand
```

> **Note:** Exact Term searching, using equals operator (`=field:exact` in the samples above), is only allowed if default Alfresco Repository configuration has been changed in order to enable this feature.

Fields fall into three types: property fields, special fields, and fields for data types.

Property fields evaluate the search term against a particular property, special fields are described in the following table, and data type fields evaluate the search term against all properties of the given type.

|Type|Description|
|-----------|----|
|Property|Fully qualified property, for example `{http://www.alfresco.org/model/content/1.0}name:apple`|
|Property|Fully qualified property, for example `@{http://www.alfresco.org/model/content/1.0}name:apple`|
|Property|CMIS style property, for example `cm_name:apple`.|
|Property|Prefix style property, for example `cm:name:apple`.|
|Property|Prefix style property, for example `@cm:name:apple`.|
|Property|ID, for example `ID:'599a6862-070c-49a7-a744-b88da949c31e'`|
|Property|TEXT, for example `TEXT:apple`.|
|Property|OWNER, for example `OWNER:'admin'`|
|Property|READER, for example `READER:'GROUP_EVERYONE'`|
|Property|DENIED, for example `DENIED:'GROUP_EVERYONE'`|
|Special|TYPE, for example `TYPE:"qname"`.
|Special|ASPECT for example `ASPECT:"qname"`.|
|Special|TAG for example `TAG:"name of the tag"`.|
|Special|ALL, for example `ALL:'admin'`|
|Special|EXISTS, for example `EXISTS cm:name:'Sample-Document.docx'`|
|Special|ISNODE, for example `ISNODE cm:name:'Sample-Document.docx'`|
|Field for Data Type|Fully qualified Data Type, `{http://www.alfresco.org/model/dictionary/1.0}content:apple`|
|Field for Data Type|Data Type style property, `d:content:apple`|

### Search for a phrase

Phrases are enclosed in double quotes. Any embedded quotes can be escaped using ``. If no field is specified then the default TEXT field will be used, as with searches for a single term.

The whole phrase will be tokenized before the search according to the appropriate data dictionary definition(s).

```sql
"big yellow banana"
```

### Search for wildcards

Wildcards are supported in terms, phrases, and exact phrases using `*` to match zero, one, or more characters and `?` to match a single character.

The `*` wildcard character can appear on its own and implies Google-style. The "anywhere after" wildcard pattern can be combined with the `=` prefix for identifier based pattern matching. Search will return and highlight any word that begins with the root of the word truncated by the `*` wildcard character.

The following will all find the term apple.

```sql
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

> **Note:** Exact Term searching, using equals operator (`=*ple` in the samples above), is only allowed if default Alfresco Repository configuration has been changed in order to enable this feature.

When performing a search that includes a wildcard character, it is best to wrap your search term in double quotation marks. This ensures all metadata and content are searched.

### Search for conjunctions

Single terms, phrases, and so on can be combined using `AND` in upper, lower, or mixed case.

The `AND` operator is interpreted as "every term is required".

```
big AND yellow
```
These queries search for nodes that contain all the terms `big` and `yellow` in any content or in properties `cm:name`, `cm:title` or `cm:description`.

### Search for disjunctions

Single terms, phrases, and so on can be combined using `OR` in upper, lower, or mixed case.

The `OR` operator is interpreted as "at least one is required, more than one or all can be returned".

If not otherwise specified, by default search fragments will be `ORed` together.

```text
big yellow banana
big OR yellow OR banana
TEXT:big TEXT:yellow TEXT:banana
TEXT:big OR TEXT:yellow OR TEXT:banana
```

These queries search for nodes that contain at least one of the terms `big`, `yellow`, or `banana` in any content. The first two ones will also get results from properties `cm:name`, `cm:title` or `cm:description`.

### Search for negation

You can narrow your search results by excluding words with the `NOT` syntax.

Single terms, phrases, and so on can be combined using “`NOT`” in upper, lower, or mixed case, or prefixed with “`!`” or “`-`”.

These queries search for nodes that contain the terms yellow in any content.

```text
yellow NOT banana
yellow !banana
yellow -banana
NOT yellow banana
-yellow banana
!yellow banana
```

> **Note:** In the three initial samples above, since `OR` is default operator for searching, results are expected to include every node with "yellow" and every node without "banana" term. If you want to get nodes with "yellow" term and without term "banana", use following expression: `yellow AND NOT banana`

The `NOT` operator can only be used for string keywords; it doesn’t work for numerals or dates.

Prefixing any search qualifier with a `-` excludes all results that are matched by that qualifier.

### Search for optional, mandatory, and excluded elements of a query

Sometimes `AND` and `OR` are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".

|Operator|Description|
|--------|-----------|
|","|The field, phrase, group is optional; a match increases the score.|
|"+"|The field, phrase, group is mandatory (Note: this differs from Google - see "=")|
|"-", "!"|The field, phrase, group must not match.|

The following example finds documents that contain the term "car", score those with the term "red" higher, but does not match those just containing "red":

```sql
+car |red
```

> **Note:** At least one element of a query must match (or not match) for there to be any results.

All `AND` and `OR` constructs can be expressed with these operators.

### Escaping characters

Any character can be escaped using the backslash "`\`" in terms, IDs (field identifiers), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.

For example:

```sql
cm:my\ content:my\ name
```

### Search for ranges

Inclusive ranges can be specified in Google-style. There is an extended syntax for more complex ranges. Unbounded ranges can be defined using MIN and MAX for numeric and date types and "u0000" and "FFFF" for text (anything that is invalid).

|Lucene|Google|Description|Example|
|------|------|-----------|-------|
|`[#1 TO #2]`|`#1..#2`|The range #1 to #2 inclusive ``#1 <= x <= #2``|`0..5``[0 TO 5]`|
|`<#1 TO #2]`| |The range #1 to #2 including #2 but not #1.`#1 < x <= #2`|`<0 TO 5]`|
|`[#1 TO #2>`| |The range #1 to #2 including #1 but not #2.`#1 <= x < #2`|`[0 TO 5>`|
|`<#1 TO #2>`| |The range #1 to #2 exclusive.`#1 < x < #2`|`<0 TO 5>`|

```sql
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

Last four items will be replaced with 0 when the date component is missing in the minimum date in a range expression, e.g. [1950 to 2021] will be executed as [1950-01-01T00:00:00 TO 2021-01-01T23:59:59].

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

### Search for an exact term

> **Note:** Exact Term searching is only allowed if default Alfresco Repository configuration has been changed in order to enable this feature.

To search for an exact term you must prefix it with "=". The supported syntax:

```
=term
=term1 =term2
="multi term phrase"
=field:term
=field:term1 =field:term2
=field:“multi term phrase”
```

If you don’t specify a field the search runs against name, description, title, and content. If the field specified is `TOKENIZED=false`, only the full field is matched. If the field you specified is `TOKENIZED=TRUE` or `TOKENIZED=BOTH` then the search is run on the cross locale tokenized version of the field.

## Query Languages

A search request allows the specification of the search language to be used. The supported languages in addition to the default `AFTS` are:

* Lucene: the query language provided by the popular IR framework

The search string syntax depends on the given query language and can differ significantly between AFTS and Lucene. However, there are some shared aspects that provide the same exact behavior in both languages, particularly for **Field Queries**.

## Additional considerations

### Type and Aspect Queries

Type and Aspect queries have several things in common: both of them expect a name as the field value. Specifically:

* If the value is an unqualified name, it will be expanded to a fully qualified name using the default namespace
* If the value is a prefixed name, the prefix is expanded (e.g. cm:name => {http://www.alfresco.org/model/content/1.0}content}name)
* If the value is a fully qualified name then it is used in that form

Known Limitations:

* No support for prefix/wildcard queries in the namespace part (e.g. "TYPE:{http://www.*}person" won't work, "TYPE:{http://www.alfresco.org/model/content/1.0}pers*" works)
* No support for descendant expansion in prefix/wildcard queries (e.g. TYPE: cm:pers* won't expand to cm:person descendants)

### ALL

The ALL virtual field (i.e. it is not in the index) expands to all fields defined

* in the SearchParameters::allAttributes (the object representation of the corresponding attribute in the REST API Search Request)
OR, in case they are empty.

* in the DictionaryService::getAllProperties.

### TEXT

The TEXT virtual field (i.e. it is not in the index) expands to all fields defined:

* in the SearchParameters::textAttributes (the object representation of the corresponding attribute in the REST API Search Request)
OR, in case they are empty

* in the AlfrescoDefaultTextFields (i.e. cm:name, cm:title, cm:description, cm:content)

This generates a term centric multi-field query:

For example:

```sql
TEXT:(test AND file AND term3 )
```

This query is expanded to:

```bash
(cm:title:test OR cm:name:test OR cm:description:test OR cm:content:test) AND
(cm:title:file OR cm:name:file OR cm:description:file OR cm:content:file) AND
(cm:title:term3 OR cm:name:term3 OR cm:description:term3 OR cm:content:term3)
```

**Note:** this means that a full query in AND matches documents that contains all the terms in the query, in any of the fields involved.

### DataType

This query is executed when the field name corresponds to a datatype definition using its prefixed or fully qualified form (e.g. d:text, {http://www.alfresco.org/model/dictionary/1.0}text).

The actual query produced is a boolean query which includes an optional clause for each property associated to the input datatype definition.

### Permission Queries

Fields that are related to ACL information are stored directly as part of the Elasticsearch documents. As a consequence of that, the corresponding queries are plain term/range/prefix/fuzzy queries using the following fields:

* OWNER
* READER
* DENIED
* AUTHORITY

### ID

The ID (virtual) field maps to Elasticsearch document id (_id) and it corresponds to the Alfresco node identifier (e.g. 5fef4b5d-4527-40e5-94fa-1878ef7a54eb)

### EXISTS

The query intent can be summarized in “give me all nodes that have a value for the property/field I requested”. This is very similar to the previous one, the difference is that the NULLPROPERTIES field is not involved in this scenario.

The value of a clause whose field is EXISTS could be:

* an unqualified name: it will be expanded to a fully qualified name using the default namespace
* a prefixed name: the prefix is expanded (e.g. cm:name => {http://..}content}name)
* a fully qualified name
* a field name (e.g. ID, OWNER, READER)

If the value is associated to a property definition then a boolean query is executed having the following clauses:

* PROPERTIES:<prefixed form of the property definition> (MUST) Otherwise, in case of a field (e.g. OWNER, ID, READER) a wildcard query is built using that field (e.g. OWNER:*)

### Properties

Properties are attributes defined in an Alfresco content model. They are identified by qualified names, meaning with that they are composed by:

* a namespace
* a local name

That avoids conflicts between local names used in multiple models (e.g. finance:name and cm:name).

A property can be declared in queries using three notations:

* Unqualified name (e.g. title): in this case it will be associated to the default namespace. The property is therefore assumed to exist and to be valid in the default content model

```bash
@title:OOP
@title:(Object Oriented Programming)
```

* Prefixed name (e.g. cm:title): the prefix is the short form of a given namespace. It must be uniquely associated to a namespace and to a content model.

```bash
@cm:title:OOP
@cm:title:(Object Oriented Programming)
```

* Fully qualified name: in this case the property name uses the full namespace and the local name

```bash
@{http://www.alfresco.org/model/content/1.0}title:OOP
@{http://www.alfresco.org/model/content/1.0}title:(Object Oriented Programming)
```

When prefixes and fully qualified names are used, the property has to be prefixed with the @ symbol: this is one of the main differences between AFTS and Lucene.

Special characters (i.e. characters that have a special meaning in lucene) need to be escaped using the backslash

## Unsupported Features

The following features, which were supported with Search 2.x (Solr) are not supported in the latest release for Search 3.x (Elasticsearch). These features are under consideration for inclusion in a future release.

> **Note:** The list below is subject to change, and requires review before publishing

### Indexing

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

### Search Features

* Site queries
* Path queries (partially)
* Aspect queries (it works only using exact aspect name)
* Tag queries
* Highlighting
* Fingerprinting
* Multi-lingual support (documents will be accepted and searchable with multiple languages, but only English grammar rules will be applied)
* Template search
* Resource limiting
* Scoped search
* Statistics

### Search Syntax

* Search for optional, mandatory, and excluded elements of a query
* Search for an exact term
* Fuzzy matching
* Grouped search queries
* Proximity search
* Search for spans and positions
* Search using date math
* Search for boosts
* Wildcards in phrase queries
* Exact Match Queries
* Field Facets Pagination
* Field Facets Tags Exclusion

### Field Queries

* PATH
* PATHWITHREPEATS
* PNAME
* NPATH
* PARENT
* PRIMARYPARENT
* QNAME
* TAG
* SITE
* ANCESTOR
* PRIMARYASSOCQNAME
* PRIMARYASSOCTYPEQNAME
* ISNULL
* ISNOTNULL
* ISUNSET
* FINGERPRINT
* ISROOT
* ISCONTAINER
* ASPECT
* EXACTASPECT
* CASCADETX
* DBID
* TX
* TXID
* INTXID
* TXCOMMITTIME
* ACLID
* INACLTXID
* ACLTXID
* ACLTXCOMMITTIME
* TENANT
* OWNERSET
* READERSET
* AUTHSET
* DENYSET
* FTSSTATUS

In order to guarantee ADW basic functionalities when a query contains an unsupported field the query part will be ignored and the REST API will return a 200 HTTP code. A warning message will be produced in the Alfresco Repository log.

In order to All unsupported fields will be ignored in queries and filters following the schema below:

* The query contains only an unsupported field, e.g. `QNAME:hello` returns an empty result.
* the query contains a supported field, e.g. `hello AND QNAME:goodbye` returns only documents containing “hello”.
* A filter contains only an unsupported field, e.g. `query=banana`, `filter=QNAME:hello` returns only documents containing “banana”.
* a filter contains two filters or a filter with a supported field and an unsupported field e.g. query=banana filter=[QNAME:hello, cm:name:test], returns all documents containing test and banana, and e.g. query=banana filter=QNAME:hello OR cm:name:test -> returns all documents containing test and banana.

In the examples above, filter queries must be executed using the REST API and not using Alfresco Digital Workspace or Alfresco Share.

### Query Languages

* CMIS query language
* SQL query language using JDBC Driver

### Tools & Components

* Alfresco Search and Insight Engine
* Alfresco Governance Services
* Alfresco Federation Services
* Alfresco Intelligence Services
* Alfresco Content Connector for AWS Glacier
* Alfresco Content Connector for Salesforce
* Alfresco Content Connector for SAP applications
* Alfresco Collaboration Connector for Microsoft 365
* Alfresco Outlook Integration
* Alfresco Office Services
* Alfresco Google Docs Integration
* Alfresco Enterprise Viewer
* Alfresco Content Accelerator

### Unsupported data types and properties

This page describes types supported for Search 2.0 that are not currently supported for Search 3.0.

* http&#65279;://www.alfresco.org/model/cmis/1.0/cs01}id
* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}category
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}noderef
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname

## Troubleshooting

### Search for failed Transformations

It is possible to search for all documents that have failed to transform by running a simple query using Kibana or the Elasticsearch REST API:

```json
{
  "query": {
      "term": {
        "cm%3Acontent%2Etr_status": {
          "value": "TRANSFORM_FAILED"
        }
      }
  }
}
```

### Debug queries generated for Elasticsearch

Enabling slowly queries in Elasticsearch with threshold 0 seconds, should dump every query received by Elasticsearch in the logs.

```bash
$ curl -XPUT "http://elasticsearch:9200/alfresco/_settings" -H 'Content-Type: application/json' -d'{  
 "index.search.slowlog.threshold.query.warn": "0s",  
 "index.search.slowlog.threshold.query.info": "0s",
 "index.search.slowlog.threshold.query.debug": "0s",  
 "index.search.slowlog.threshold.query.trace": "0s",  
 "index.search.slowlog.threshold.fetch.warn": "0s",  
 "index.search.slowlog.threshold.fetch.info": "0s",  
 "index.search.slowlog.threshold.fetch.debug": "0s",  
 "index.search.slowlog.threshold.fetch.trace": "0s",  
 "index.indexing.slowlog.threshold.index.warn": "0s",  
 "index.indexing.slowlog.threshold.index.info": "0s",  
 "index.indexing.slowlog.threshold.index.debug": "0s",  
 "index.indexing.slowlog.threshold.index.trace": "0s",
 "index.indexing.slowlog.level": "trace",  
 "index.indexing.slowlog.source": "1000"}'
```

> **Note:** This setting is only recommended when debugging.
