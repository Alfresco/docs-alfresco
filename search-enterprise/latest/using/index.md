---
title: Features
---

Alfresco Search Enterprise provides a subset of the searching features provided by Alfresco Search Services.

* [Applications & Frameworks](#applications---frameworks)
* [Search Features](#search-features)
* [Search Syntax](#search-syntax)
* [Field Queries](#field-queries)
* [Query Languages](#query-languages)

## Applications & Frameworks

* ADF
* ADW

## Search Features

* ACL Permission checks
* Sorting by relevancy
* Paging - https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/searching/#searching-by-content-type-and-controlling-paging-and-sorting
* Faceting - https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/searching/#faceted-search
* Filter by content size and mimetype (Supported from M2 release)
* Inclusion of additional properties in search results - https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/#requesting-optional-item-information

<!--
Note that not all faceting features available for Solr are currently supported. See the following tickets for more details:
* [2681](https://alfresco.atlassian.net/browse/SEARCH-2681){:target="_blank"}
* [2682](https://alfresco.atlassian.net/browse/SEARCH-2682{:target="_blank"}
* [2749](https://alfresco.atlassian.net/browse/SEARCH-2749{:target="_blank"}
-->

## Search Syntax

### Search for a single term

Single terms are tokenized before the search according to the appropriate data dictionary definition(s).

If you do not specify a field, it will search in the content and properties. This is a shortcut for searching all properties of type content. Terms can not contain a whitespace.

```sql
banana
TEXT:banana
```

Both of these queries will find any nodes with the word "banana" in any property of type `d:content`.

If the appropriate data dictionary definition(s) for the field supports both FTS and untokenized search, then FTS search will be used. FTS will include synonyms if the analyzer generates them. Terms cannot contain whitespace.

### Search in fields

Search specific fields rather than the default. Terms, phrases, etc. can all be preceded by a field. If not the default field TEXT is used.

```bash
field:term
field:"phrase"
=field:exact
~field:expand
```

Fields fall into three types: property fields, special fields, and fields for data types.

Property fields evaluate the search term against a particular property, special fields are described in the following table, and data type fields evaluate the search term against all properties of the given type.

|Type|Description|
|-----------|----|
|Property|Fully qualified property, for example `{http://www.alfresco.org/model/content/1.0}name:apple`|
|Poroperty|Fully qualified property, for example `@{http://www.alfresco.org/model/content/1.0}name:apple`|
|Property|CMIS style property, for example `cm_name:apple`.|
|Property|Prefix style property, for example `cm:name:apple`.|
|Property|Prefix style property, for example `@cm:name:apple`.|
|Property|TEXT, for example `TEXT:apple`.|
|Special|ID, for example `ID:"NodeRef"`|
|Special|ISROOT, for example `ISROOT:T`|
|Special|TX, for example `TX:"TX"`|
|Special|PARENT, for example `PARENT:"NodeRef"`|
|Special|PRIMARYPARENT, for example `PRIMARYPARENT:"NodeRef"`.|
|Special|QNAME, for example `QNAME:"app:company_home"`.|
|Special|CLASS, for example `CLASS:"qname"`.|
|Special|EXACTCLASS, for example `EXACTCLASS:"qname"`.
|Special|TYPE, for example `TYPE:"qname"`.
|Special|EXACTTYPE, for example `EXACTTYPE:"qname"`.
|Special|ASPECT for example `ASPECT:"qname"`.|
|Special|EXACTASPECT, for example `EXACTASPECT:"qname"`.|
|Special|ISUNSET for example `ISUNSET:"property-qname"`|
|Special|ISNULL, for example `ISNULL:"property-qname"`.|
|Special|ISNOTNULL, for example `ISNOTNULL:"property-qname"`.|
|Special|EXISTS for example `EXISTS:"name of the property"`.|
|Special|SITE for example `SITE:"shortname of the site"`.|
|Special|TAG. TAG: "name of the tag" **Note:** `TAG` must be in upper case.|
|Fully qualified data type|Data Type, `http://www.alfresco.org/model/dictionary/1.0}content:apple`|
|prefixed data type|Data Type, d:content:apple|

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

When performing a search that includes a wildcard character, it is best to wrap your search term in double quotation marks. This ensures all metadata and content are searched.

## Search for conjunctions

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

These queries search for nodes that contain at least one of the terms `big`, `yellow`, or `banana` in any content.

[Search for negation](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#search-for-negation){:target="_blank"}

[Search for optional, mandatory, and excluded elements of a query](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#search-for-optional-mandatory-and-excluded-elements-of-a-query){:target="_blank"}

### Escaping characters

Any character can be escaped using the backslash "" in terms, IDs (field identifiers), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.

For example:

```sql
cm:my content:my name
```

[Search using Type]({% link content-services/latest/develop/rest-api-guide/searching.md %}#searching-by-content-type-and-controlling-paging-and-sorting)

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

> **Note:** Only numeric values since M2 release and date values, since M3 release)

### Search for an exact term

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

`alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`

`alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`

`alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`

## Field Queries

* [TEXT (Field, Prefix, Range, Wildcard, Fuzzy)](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#text){:target="_blank"}
* [ID (Field, Prefix, Wildcard)](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#id){:target="_blank"}
* [ALL (Field, Prefix, Range, Wildcard, Fuzzy)](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#all){:target="_blank"}
* [EXISTS (Field)](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#exists){:target="_blank"}
* [<DataType> (Field, Prefix, Range, Wildcard, Fuzzy)](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#datatype){:target="_blank"}
* PROPERTY (Field, Prefix, Range, Wildcard, Fuzzy)
* OWNER (Field, Prefix, Wildcard, Fuzzy)
* READER (Field, Prefix, Wildcard, Fuzzy)
* AUTHORITY (Field, Prefix, Wildcard, Fuzzy)
* DENIED (Field, Prefix, Wildcard, Fuzzy)
* [ISNODE (Field, Prefix, Wildcard)](https://github.com/Alfresco/alfresco-search-enterprise-docs/wiki/Search-Syntax-in-depth#exists){:target="_blank"}

## Query Languages

A search request allows the specification of the search language to be used. The supported language in addition to the default AFTS is:

* Lucene: the query language provided by the IR framework

The search string syntax depends on the given query language and can differ significantly between AFTS and Lucene. However, there are some shared aspects that provide the same exact behavior in both languages.

**Administration Features**

* Administration console to manage the key interactions between Alfresco and Elasticsearch from Alfresco Repository
* Ability to determine the high-level health of the Elastic Search index via the administration console

## Search Query Syntax

### Search for negation

You can narrow your search results by excluding words with the `NOT` syntax.

Single terms, phrases, and so on can be combined using "`NOT`" in upper, lower, or mixed case, or prefixed with "`!`" or "`-`".

These queries search for nodes that contain the terms `yellow` in any content.

```sql
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

```sql
taxi AND driver NOT yellow
```

the query will be executed as:

```sql
taxi AND driver OR NOT passenger
```

If you expect a different behavior, you have to specify the boolean conjunction:

```sql
taxi AND driver AND NOT passenger
```

### Search for optional, mandatory, and excluded elements of a query

Sometimes AND and OR are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".

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

Using the mandatory operator we should occur, comparing with other search engines, in a weird behavior about the mandatory operator (+). For instance, executing the query below:

```sql
+taxi +driver
```

We will expect for all results containing _taxi_ and _driver_, but because AFTS language will compose the query using the boolean operator OR as default operator, the query will be translated to:

```sql
+taxi OR +driver
```

Returning all items that contain "taxi" or driver.

### Search for Exact Term

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

`alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`

`alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`

`alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`

Single Term

```sql
=taxi 
```

Multi Term

```sql
=taxi =driver
```

Phrase

```sql
="taxi driver"
```

> **Note:** Exact Term Search is disabled by default, to enable it please refer to Indexing documentation and the configuration file: exactTermSearch.properties

### Searches that involve stopwords

[Stopwords](_https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-tokenfilter.html#analysis-stop-tokenfilter-stop-words-by-lang_){:target="_blank"} are removed from the query.

For example:

```sql
stopword1 quick fox stopword2 brown
```

becomes

```sql
quick fox brown
```

This behavior is different from Search Services in that it keeps stopwords in the query to build positional queries, for example:

```sql
stopword1 quick fox stopword2 brown
```

becomes

```sql
stopword1_quick quick fox_stopword2 fox stopword2_brown brown
```

### Field Queries and execution behavior

The fields (and the corresponding query execution behavior) listed in this section are common to AFTS and Lucene query languages.

### Type and Aspect Queries

Type and Aspect queries have several things in common: both of them expect a name as the field value. Specifically:

* If the value is an unqualified name, it will be expanded to a fully qualified name using the default namespace
* If the value is a prefixed name, the prefix is expanded (e.g. cm:name => {http://www.alfresco.org/model/content/1.0}content}name)
* If the value is a fully qualified name then it is used in that form

Known Limitations:

* No support for prefix/wildcard queries in the namespace part (e.g. "TYPE:{http://www.*}person" won't work, "TYPE:{http://www.alfresco.org/model/content/1.0}pers*" works)
* No support for descendant expansion in prefix/wildcard queries (e.g. TYPE: cm:pers* won't expand to cm:person descendants)

### Expanded Queries

Queries in this category are expanded to a boolean query with several clauses using criteria that are specific to each field. 

#### ALL

The ALL virtual field (i.e. it is not in the index) expands to all fields defined

* in the SearchParameters::allAttributes (the object representation of the corresponding attribute in the REST API Search Request)
OR, in case they are empty.

* in the DictionaryService::getAllProperties.

#### TEXT

The TEXT virtual field (i.e. it is not in the index) expands to all fields and defined:

* in the SearchParameters::textAttributes (the object representation of the corresponding attribute in the REST API Search Request)
OR, in case they are empty

* in the AlfrescoDefaultTextFields (i.e. cm:name, cm:title, cm:description, cm:content)

This generates a term centric multi-field query:

For example:

```sql
TEXT:(test AND file AND term3)
```

This query is expanded to:

```bash
(cm:title:test OR cm:name:test OR cm:description:test OR cm:content:test) AND
(cm:title:file OR cm:name:file OR cm:description:file OR cm:content:file) AND
(cm:title:term3 OR cm:name:term3 OR cm:description:term3 OR cm:content:term3)
```

> **Note:** This means that a full query in AND matches documents that contains all the terms in the query, in any of the fields involved.

#### DataType

This query is executed when the field name corresponds to a datatype definition using its prefixed or fully qualified form, for example `d:text, {http://www.alfresco.org/model/dictionary/1.0}text)`.

The query produced is a boolean query which includes an optional clause for each property associated to the input datatype definition.

#### Permission Queries

Fields that are related to ACL information are stored directly as part of the Elasticsearch documents. Consequently, the corresponding queries are plain `term`/`range`/`prefix`/`fuzzy` queries using the following fields:

* OWNER
* READER
* DENIED
* AUTHORITY

## Other Fields

### ID

The ID (virtual) field maps to Elasticsearch document id (_id) and it corresponds to the Alfresco node identifier, for example `5fef4b5d-4527-40e5-94fa-1878ef7a54eb`.

### EXISTS

The query intent can be summarized as “give me all nodes that have a value for the property/field I requested”. This is very similar to the previous one, the difference is that the `NULLPROPERTIES` field is not involved in this scenario.

The value of a clause whose field is `EXISTS` could be:

* an unqualified name: it will be expanded to a fully qualified name using the default namespace
* a prefixed name: the prefix is expanded, for example `cm:name` => `{http://..}content}name`
* a fully qualified name
* a field name, for example `ID`, `OWNER`, `READER`

If the value is associated to a property definition then a boolean query is executed with the following clauses:

* PROPERTIES:<prefixed form of the property definition> (MUST) Otherwise, in case of a field (e.g. OWNER, ID, READER) a wildcard query is built using that field (e.g. OWNER:*)

### ISNODE

At time of writing SearchService 3.0 indexes only nodes so the ISNODE query becomes a “MatchAll” or “MatchNothing” query.

## Query Languages

### Lucene Query Language

The Lucene query API is built on top the Lucene standard query parser. The query language syntax is described in details on the project web site[1].

This page doesn’t repeat what is written in that documentation; instead, it provides things specific to Alfresco that should be considered when using this query language.

#### Fields

Fields are special attributes that can be used in queries and that are not part of any content model. The behaviour and the usage of those attributes is in common with the AFTS query language and for that reason it has been described here. 

#### Properties

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

[1] note the page refers to an old lucene version. Although the current version, at the time of writing is 8.8.2 no changes have been introduced since 2.9.4 in the lucene syntax so what is described in the page can be considered valid and updated.

## Search for ranges

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

## Unsupported Features

The following features, which were supported in Search Services and Search and Insight Engine 2.x (Solr) are not supported in the latest release of Search Enterprise 3.x.

> **Note: (Martin S)** The list below is subject to change, and requires review before publishing

### Index and re-index

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.
* Re-index of permissions and content associated with indexed nodes.

### Search Features

* Site queries
* Path queries
* Aspect queries (works using only the exact aspect name)
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

To guarantee ADW basic functionalities when a query contains an unsupported field the query part will be ignored and the REST API will return a 200 HTTP code. A warning message will be produced in the Alfresco Repository log.

In order to All unsupported fields will be ignored in queries and filters following the schema below:

* The query contains only an unsupported field, e.g. `QNAME:hello` returns an empty result.
* the query contains a supported field, e.g. `hello AND QNAME:goodbye` returns only documents containing “hello”.
* A filter contains only an unsupported field, e.g. `query=banana`, `filter=QNAME:hello` returns only documents containing “banana”.
* a filter contains two filters or a filter with a supported field and an unsupported field e.g. query=banana filter=[QNAME:hello, cm:name:test], returns all documents containing test and banana, and e.g. query=banana filter=QNAME:hello OR cm:name:test -> returns all documents containing test and banana.

In the examples above, filter queries must be executed using the REST API and not using Alfresco Digital Workspace or Alfresco Share.

## Query Languages

* CMIS query language
* SQL query language using JDBC Driver

## Tools & Components

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

## Deployment Methods

* Kubernetes & Helm

## Unsupported data types and properties

* http&#65279;://www.alfresco.org/model/cmis/1.0/cs01}id
* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}category
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}noderef
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname

## Troubleshooting

## Search for failed Transformations

You can search for all documents that have failed to transform by running a simple query using Kibana or the Elasticsearch REST API:

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

## Debug queries generated for Elasticsearch

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
