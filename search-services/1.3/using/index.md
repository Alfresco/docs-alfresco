---
title: Full text search reference
---

The following sections describe the Alfresco Full Text Search (FTS) syntax.

The Alfresco Full Text Search (FTS) query text can be used standalone or it can be embedded in CMIS-SQL using the `contains()` predicate function. The CMIS specification supports a subset of FTS. The full power of FTS can not be used and, at the same time, maintain portability between CMIS repositories.

FTS is exposed directly by the interface, which adds its own template, and is also used as its default field. The default template is:

```sql
%(cm:name cm:title cm:description ia:whatEvent ia:descriptionEvent lnk:title lnk:description TEXT)
```

When FTS is embedded in CMIS-SQL, only the CMIS-SQL-style property identifiers (`cmis:name`) and aliases, CMIS-SQL column aliases, and the special fields listed can be used to identify fields. The SQL query defines tables and table aliases after `from` and `join` clauses. If the SQL query references more than one table, the `contains()` function must specify a single table to use by its alias. All properties in the embedded FTS query are added to this table and all column aliases used in the FTS query must refer to the same table. For a single table, the table alias is not required as part of the `contains()` function.

When FTS is used standalone, fields can also be identified using `prefix:local-name` and `{uri}local-name` styles.

## Query time boosts

Query time boosts allow matches on certain parts of the query to influence the score more than others.

All query elements can be boosted: terms, phrases, exact terms, expanded terms, proximity (only in filed groups), ranges, and groups.

```bash
term^2.4
"phrase"^3
term~0.8^4
=term^3
~term^4
cm:name:(big * yellow)^4
1..2^2
[1 TO 2]^2
yellow AND (car OR bus)^3
```

## Search using date math

The date field types in Solr support the date math expressions.

The date math expression makes it easy to create times relative to fixed moments in time and includes the current time which can be represented using the special value of `NOW`.

### Date math syntax

The date math expressions consist either adding some quantity of time in a specified unit, or rounding the current time by a specified unit. Expressions can be chained and are evaluated left to right.

For example, to represents a point in time two months from now, use:

```text
NOW+2MONTHS
```

To represents a point in time one day ago, use:

```text
NOW-1DAY
```

A slash is used to indicate rounding. To represents the beginning of the current hour, use:

```text
NOW/HOUR
```

To represent a point in time six months and three days into the future and then rounds that time to the beginning of that day, use:

```text
NOW+6MONTHS+3DAYS/DAY
```

While date math is most commonly used relative to `NOW`, it can be applied to any fixed moment in time as well:

```text
1972-05-20T17:33:18.772Z+6MONTHS+3DAYS/DAY
```

> **Note:** Solr 6 date math supports `TODAY`.

## Search for disjunctions

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

## Escaping characters

Any character can be escaped using the backslash "" in terms, IDs (field identifiers), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.

For example:

```sql
cm:my content:my name
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

The list of default supported Alfresco properties is declared in the `<search_services_home>/solrhome/conf/shared.properties` file:

```text
alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}name
alfresco.cross.locale.property.1={http://www.alfresco.org/model/content/1.0}lockOwner
```

You can extend that capability by uncommenting the lines below and performing a full reindex. This has the result of enabling cross locale on all properties defined with those property types:

```text
alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
```

## Search in fields

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
|Property|Fully qualified property, for example `@{http://www.alfresco.org/model/content/1.0}name:apple`|
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

## Mixed FTS ID behavior

This relates to the priority defined on properties in the data dictionary, which can be both tokenized or untokenized.

Explicit priority is set by prefixing the query with "=" for identifier pattern matches.

The tilde (`~`) can be used to force tokenization.

## Search for fuzzy matching

Alfresco supports fuzzy searches based on the Lucene default Levenshtein Distance.

To do a fuzzy search use the tilde (`~`) symbol at the end of a single word term with a parameter between 0 and 1 to specify the required similarity. Use a value closer to 1 for higher similarity.

For example, to search for a term similar in spelling to *roam* use the fuzzy search:

```bash
roam~0.9
```

This search will find terms like *foam*, *roaming*, and *roams*.

## Search for grouping

Use parentheses to encapsulate `OR` statements for the search engine to execute them properly.

The `OR` operator is executed as "I would like at least one of these terms".

Groupings of terms are made using `( and )`. Groupings of all query elements are supported in general. Groupings are also supported after a field - field group.

The query elements in field groups all apply to the same field and cannot include a field.

```sql
(big OR large) AND banana  
title:((big OR large) AND banana)
```

## Search query literals

When you search, entries are generally a term or a phrase. The string representation you type in will be transformed to the appropriate type for each property when executing the query. For convenience, there are numeric literals but string literals can also be used.

### Date formatting

You can specify either a particular date or a date literal. A date literal is a fixed expression that represents a relative range of time, for example last month, this week, or next year.

`dateTime` field values are stored as Coordinated Universal Time (UTC). The date fields represent a point in time with millisecond precision. For date field formatting, Solr uses [DateTimeFormatter.ISO_INSTANT](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#ISO_INSTANT){:target="_blank"}. The ISO instant formatter formats an instant in Coordinated Universal Time (UTC), for example:

```bash
YYYY-MM-DDThh:mm:ssZ
```

where,

* `YYYY` is the year.
* `MM` is the month.
* `DD` is the day of the month.
* `hh` is the hour of the day as on a 24-hour clock.
* `mm` is minutes.
* `ss` is seconds.
* `Z` is a literal `Z` character indicating that this string representation of the date is in UTC.

> **Note:** No time zone can be specified. The string representation of dates is always expressed in UTC, for example:

```bash
1972-05-20T17:33:18Z
```

### String literals

String literals for phrases can be enclosed in double quotes or single quotes. Java single character and `uXXXX`-based escaping are supported within these literals.

Integer and decimal literals conform to the Java definitions.

Dates as any other literal can be expressed as a term or phrase. Dates are in the format `......` Any or all of the time can be truncated.

In range queries, strings, term, and phrases that do not parse to valid type instance for the property are treated as open ended.

```bash
test:integer[ 0 TO MAX] matches anything positive
```

## Search for negation

You can narrow your search results by excluding words with the `NOT` syntax.

Single terms, phrases, and so on can be combined using "`NOT`" in upper, lower, or mixed case, or prefixed with "`!`" or "`-`".

These queries search for nodes that contain the term "yellow" but do not contain the term "banana" in the content.

```sql
yellow AND NOT banana
yellow AND !banana
yellow AND -banana
```
These queries search for nodes that contain the term "banana" but do not contain the term "yellow" in the content.

```sql
NOT yellow banana
-yellow banana
!yellow banana
```
The `AND` operator can be omitted for Share. 

The `NOT` operator can only be used for string keywords; it doesn't work for numerals or dates.

Prefixing any search qualifier with a `-` excludes all results that are matched by that qualifier.

## Search for optional, mandatory, and excluded elements of a query

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

## Search for a phrase

Phrases are enclosed in double quotes. Any embedded quotes can be escaped using ``. If no field is specified then the default TEXT field will be used, as with searches for a single term.

The whole phrase will be tokenized before the search according to the appropriate data dictionary definition(s).

```sql
"big yellow banana"
```

## Search for operator precedence

Operator precedence is SQL-like (not Java-like). When there is more than one logical operator in a statement, and they are not explicitly grouped using parentheses, `NOT` is evaluated first, then `AND`, and finally `OR`.

The following shows the operator precedence from highest to lowest:

```sql
"
[, ], <, >
()
~ (prefix and postfix), =
^
+, |, -
NOT,
AND
OR
```

`AND` and `OR` can be combined with `+`, `|`, `-` with the following meanings:

|AND (no prefix is the same as +)|Description|
|----------------------------------|-----------|
|`big AND dog`|big and dog must occur|
|`+big AND +dog`|big and dog must occur|
|`big AND +dog`|big and dog must occur|
|`+big AND dog`|big and dog must occur|
|`big AND \|dog`|big must occur and dog should occur|
|`\|big AND dog`|big should occur and dog must occur|
|`\|big AND \|dog`|both big and dog should occur, and at least one must match|
|`big AND -dog`|big must occur and dog must not occur|
|`-big AND dog`|big must not occur and dog must occur|
|`-big AND -dog`|both big and dog must not occur|
|`\|big AND -dog`|big should occur and dog must not occur|

|OR (no prefix is the same as +)|Description|
|---------------------------------|-----------|
|`dog OR wolf`|dog and wolf should occur, and at least one must match|
|`+dog OR +wolf`|dog and wolf should occur, and at least one must match|
|`dog OR +wolf`|dog and wolf should occur, and at least one must match|
|`+dog OR wolf`|dog and wolf should occur, and at least one must match|
|`dog OR \|wolf`|dog and wolf should occur, and at least one must match|
|`\|dog OR wolf`|dog and wolf should occur, and at least one must match|
|`\|dog OR \|wolf`|dog and wolf should occur, and at least one must match|
|`dog OR -wolf`|dog should occur and wolf should not occur, one of the clauses must be valid for any result|
|`-dog OR wolf`|dog should not occur and wolf should occur, one of the clauses must be valid for any result|
|`-dog OR -wolf`|dog and wolf should not occur, one of the clauses must be valid for any result|

## Embed queries in CMIS

These examples show how to embed queries in CMIS.

## Embedded in CMIS contains()

```sql
- strict queries
SELECT * FROM Document WHERE CONTAINS("zebra")
SELECT * FROM Document WHERE CONTAINS("quick")

- Alfresco extensions
SELECT * FROM Document D WHERE CONTAINS(D, 'cmis:name:\'Tutorial\'')
SELECT cmis:name as BOO FROM Document D WHERE CONTAINS('BOO:\'Tutorial\'')
```

## Search Service

```java
ResultSet results = searchService.query(storeRef, SearchService.LANGUAGE_FTS_ALFRESCO, "quick");
```

```bash
SearchService.LANGUAGE_FTS_ALFRESCO = "fts-alfresco"
```

## Node Browser

FTS is supported in the node browser.

## JavaScript

```javascript
search
{
   query: string,          mandatory, in appropriate format and encoded for the given language
   store: string,          optional, defaults to 'workspace://SpacesStore'
   language: string,       optional, one of: lucene, xpath, jcr-xpath, fts-alfresco - defaults to 'lucene'
   templates: [],          optional, Array of query language template objects (see below) - if supported by the language 
   sort: [],               optional, Array of sort column objects (see below) - if supported by the language
   page: object,           optional, paging information object (see below) - if supported by the language
   namespace: string,      optional, the default namespace for properties
   defaultField: string,   optional, the default field for query elements when not explicit in the query
   onerror: string         optional, result on error - one of: exception, no-results - defaults to 'exception'
}

sort
{
   column: string,         mandatory, sort column in appropriate format for the language
   ascending: boolean      optional, defaults to false
}

page
{
   maxItems: int,          optional, max number of items to return in result set
   skipCount: int          optional, number of items to skip over before returning results
}

template
{
   field: string,          mandatory, custom field name for the template
   template: string        mandatory, query template replacement for the template
}
```

For example:

```javascript
 var def =
  {
     query: "cm:name:test*",
     language: "fts-alfresco"
  };
  var results = search.query(def); 
```

## Templates

FTS is not supported in FreeMarker.

## Search for proximity

Google-style proximity is supported.

To specify proximity for fields, use grouping.

```sql
big * apple
TEXT:(big * apple)
big *(3) apple
TEXT:(big *(3) apple)
```

## Search query templates

The FTS query language supports query templates. These are intended to help when building application specific searches.

A template is a query but with additional support to specify template substitution.

* **%field**

    Insert the parse tree for the current `ftstest` and replace all references to fields in the current parse tree with the supplied field.

* **%(field1, field2)%(field1 field2)**

    (The comma is optional.) Create a disjunction, and for each field, add the parse tree for the current `ftstest` to the disjunction, and then replace all references to fields in the current parse tree with the current field from the list.

|Name|Template|Example Query|Expanded Query|
|----|--------|-------------|--------------|
|t1|%cm:name|t1:n1|cm:name:n1|
|t1|%cm:name|t1:"n1"|cm:name:"n1"|
|t1|%cm:name|~t1:n1^4|~cm:name:n1^4|
|t2|%(cm:name, cm:title)|t2:"woof"|(cm:name:"woof" OR cm:title:"woof")|
|t2|%(cm:name, cm:title)|~t2:woof^4|(~cm:name:woof OR ~cm:title:woof)^4|
|t3|%cm:name AND my:boolean:true|t3:banana|(cm:name:banana AND my:boolean:true)|

Templates can refer to other templates.

```sql
nameAndTitle -> %(cm:name, cm:title)
nameAndTitleAndDesciption -> %(nameAndTitle, cm:description)
```

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
```

## Search for a single term

Single terms are tokenized before the search according to the appropriate data dictionary definition(s).

If you do not specify a field, it will search in the content and properties. This is a shortcut for searching all properties of type content. Terms can not contain a whitespace.

```sql
banana
TEXT:banana
```

Both of these queries will find any nodes with the word "banana" in any property of type `d:content`, `d:text` or `d:mltext`.

If the appropriate data dictionary definition(s) for the field supports both FTS and untokenized search, then FTS search will be used. FTS will include synonyms if the analyzer generates them. Terms cannot contain whitespace.

## Search for spans and positions

Spans and positions are not implemented. Positions will depend on tokenization.

Anything more detailed than one *(2) two are arbitrarily dependent on the tokenization. An identifier and pattern matching, or dual FTS and ID tokenization, might be the answer in these cases.

```sql
term[^] - start
term[$] - end
term[position]
```

These are of possible use but excluded for now. Lucene surround extensions:

```sql
and(terms etc)
99w(terms etc)
97n(terms etc)
```

## Search for term expansion

To force tokenization and term expansion, prefix the term with `~`.

For a property with both ID and FTS indexes, where the ID index is the default, force the use of the FTS index.

```sql
~running
```

## Search for wildcards

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
