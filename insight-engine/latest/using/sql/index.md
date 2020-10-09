---
title: Supported/Unsupported SQL commands
---
Below is a list of the supported and unsupported SQL commands available to use when writing queries against your Solr datastore.

## Supported SQL

> **Note:** If a SQL command is not listed it is not supported. For a list of unsupported SQL commands see [Unsupported SQL Commands](unsupported-sql.md).

## Select Statements

The basic syntax of the SQL select statement is as follows:

```sql
Select DBID, cm_creator as creator, `cm_content.size`  as `size` from alfresco where `cm_content.size` > 1000 order by  `cm_content.size` desc limit 100
```

## Table

The only table that can be specified is the alfresco table. The alfresco table contains the documents and fields that have been indexed within the Alfresco Indexing Server’s main Alfresco index.

## Fields

### Standard Fields

Alfresco has a set of standard fields, which can be referred to by name in the SQL field list. The DBID field in the example `SELECT` statement above is an example of a standard field.

The most useful ones are: `PARENT`, `PATH`, `ANCESTOR`, `TYPE`, `ASPECT`, `PROPERTIES`, `FIELDS`, `LID`, and `DBID`.

### Fields from Content Models

Fields from Alfresco’s out of-the-box content models, as well as fields from custom content models can be referred to using the content model property qname, as in AFTS and the CMIS query language. The `cm_creator` field in the example SQL statement refers to the creator field in the out-of-the-box cm content model. Fields that have a unique local name over all prefixes do not need to use the prefix.

> **Note:** Use "_" to separate the prefix and the locale name as ":" would have to be escaped.

### Escaping Fields

Fields that include reserved words or special characters will need to be escaped using the back tick character (`). The `cm_content.size` field in the example SQL statement is an example of back tick escaping. The only non-word character that can be used without escaping is the underscore “_”. We use Apache Calcite which has a list of reserved words that also need to be escaped, see [https://calcite.apache.org/docs/reference.html](https://calcite.apache.org/docs/reference.html). You are most likely to hit reserved keywords picking aliases for fields.

### Select Queries

A curated set of fields are returned by default when * is used as the field list. Any field in the curated list of fields can be used in the SQL predicate and order by clause of a select * query.

The curated set of fields that are returned with select * queries include:

* `cm_name`
* `cm_created`
* `cm_creator`
* `cm_modified`
* `cm_modifier`
* `cm_owner`
* `OWNER`
* `TYPE`
* `LID`
* `DBID`
* `cm_title`
* `cm_description`
* `cm_content.size`
* `cm_content.mimetype`
* `cm_content.encoding`
* `cm_content.locale`
* `cm_lockOwner`
* `SITE`
* `PRIMARYPARENT`
* `PARENT`
* `PATH`
* `ASPECT`
* `QNAME`

If you are using a custom model you can specify the extra fields to appear in a select * query. You must add them to alfresco-insight-engine/solrhome/conf/shared.properties and they can take the form of either of the following formats:

> **Note:** The field list is case insensitive.

```sql
#Custom Model
solr.sql.alfresco.fieldnames=finance:amount, finance:emp,expense:recorded_at
```

Or

```sql
#Custom Model
solr.sql.alfresco.fieldnames=finance_amount, finance_emp,expense_recorded_at
```

Select * will also return any fields that appear in the predicates for the query, in the following format:

> **Note:** The predicates are case insensitive.

```sql
select * from alfresco where finance_amount > 0 and expense_recorded_at <= 'NOW/DAY'
```

This query will also return the fields `finance_amount` and `expense_recorded_at` in addition to the curated set of fields.

### Arithmetic Operators

You can use arithmetic operations (+ - * /) on the SELECT clause.

```sql
select `expense:Amount` / `expense:ExchangeRate` from alfresco where TYPE = 'expense:expenseReport'
```

```sql
Select Site, sum(`cm:content.size`)/1000 as `Storage Used` from alfresco group by Site
```

```sql
Select expense_Currency, max(`expense:Amount`) * 100 as MaxAmount, sum(`expense:Amount`)/100 as SumAmount from alfresco group by expense_Currency
```

> **Note:** You can't use WHERE, GROUP BY, HAVING, and ORDER clauses with arithmetic operations.

### Field Aliases

SQL field aliases are supported in the field list. Field aliases that contain special characters or reserved words need to be escaped with the back tick.

> **Note:** You can't use the WHERE, ORDER BY or HAVING clauses with field aliases.

To display the Aliases correctly use the following format:

```sql
select sum(`cm:content.size`) as StorageUsed from alfresco
```

If using Apache Zeppelin please note that aliases are only supported for the aggregate fields (count, sum, min, max, avg) and are ignored for non aggregate fields. For example, the following format would not display the field alias in Apache Zeppelin:

```sql
select `cm:content.size` as StorageUsed from alfresco
```

You can use the table prefix 'alfresco' within your queries or `()`. The following two examples return the same information.

```sql
select alfresco.`cm_content.size`, alfresco.cm_name from alfresco
```

Or

```sql
select (alfresco.`cm_content.size`), alfresco.cm_name from alfresco
```

### Count

Alfresco’s SQL count query is an aggregate function that is used to return the number of rows from a table that fulfil the criteria specified.

The following query returns the number of rows that have a value for cm_title.

```sql
SELECT count(cm_title) from alfresco
```

The following query returns the number of rows that have a distinct value for cm_title.

```sql
SELECT count(distinct(cm_title)) from alfresco
```

> **Note:** `count(field)` and `count( distinct field)` queries are not supported with a group by clause, for example:

```sql
SELECT Type, count(cm_name) from alfresco group by Type
```

Also the following data types are not supported when using `count(field)` and `count(distinct field)` queries: boolean, cm:content, text: if the text fields are defined as non-facetable and tokenised (free-text). For example they have the following indexing configuration:

```sql
<index enabled="true">
  <tokenised>TRUE</tokenised>
  <facetable>false</facetable>
</index> 
```

### Predicate

Alfresco’s SQL predicate is designed to take advantage of the rich search capabilities available in the Alfresco Search Services.

### Predicates on Text Fields

The basic predicate on a text field performs a phrase search. Below is the syntax of a basic predicate on a text field. It will search for the phrase 'hello world' in the cm_content field.

```sql
select cm_name, `cm_content.size` from alfresco where (cm_content = ‘hello world’)  
```

To gain full control of the search predicate for a specific field you can wrap the predicate in parenthesis and enter the query using Alfresco full text search syntax. For example to search for (hello OR world) in the cm_content field the following search predicate can be used:

```sql
select cm_name, `cm_content.size` from alfresco where cm_content = ‘(hello OR world)’
```

### Predicates on String Identifier Fields

Predicates on string identifier fields will perform an exact match on the field. Below is an example of a SQL statement that will perform an exact match on the LID field:

```sql
select cm_name, `cm_content.size` from alfresco where LID = ‘value’
```

> **Note:** Most fields from the content models will perform full text search matches unless the property is defined as tokenised false in the model. This may not be what you expect.

### Predicates on Numeric Fields

The predicate on numeric fields can perform =, >=, <= and Alfresco Solr range queries.

Below is an examples using the =, >=, <= range operators.

```sql
select cm_name, `cm_content.size` from alfresco where cm_content.size = 2000
select cm_name, `cm_content.size` from alfresco where cm_content.size >= 2000
select cm_name, `cm_content.size` from alfresco where cm_content.size <= 2000
select cm_name, `cm_content.size` from alfresco where `cm_content.size` ='[* TO 2000>'
```

Below are examples of Alfresco Solr range queries:

Selects all cm_content.size below 2000, with inclusive ranges. The square brackets are inclusive ranges.

```sql
select cm_name, `cm_content.size` from alfresco where cm_content.size ='[* TO 2000]'
```

Selects all cm_content.size below 2000, with an exclusive top range. < and > are exclusive ranges.

```sql
select cm_name, `cm_content.size` from alfresco where cm_content.size ='[* TO 2000>'
```

Selects all cm_content.size above 2000, with inclusive ranges.

```sql
select cm_name, `cm_content.size` from alfresco where cm_content.size ='[2000 TO *]'
```

Selects all cm_content.size above 2000, with an exclusive bottom range.

```sql
select cm_name, `cm_content.size` from alfresco where cm_content.size ='<2000 TO *]'
```

Selects all cm_content.size above 100 and below 2000, exclusively.

```sql
select cm_name, `cm_content.size` from alfresco where cm_content.size ='<100 TO 2000>'
```

### Predicates on Null Fields

Predicates on null values can be constructed using IS NULL, IS NOT NULL, IN (NULL), and NOT IN (NULL) operands to obtain the results.

The following IS NULL query will return all the rows that have a value of NULL for the field cm_content.size .

```sql
select cm_name, `cm_content.size` from alfresco where `cm_content.size` IS NULL
```

The following IS NOT NULL query will return all the rows that have a value different from NULL for the field cm_content.size.

```sql
select cm_name, `cm_content.size` from alfresco where `cm_content.size` IS NOT NULL
```

The following IN NULL query will return all the rows that have cm_content.size in 'system' or NULL.

```sql
select cm_name, cm_creator, `cm_content.size` from alfresco where cm_creator IN ('System', NULL)
```

The following NOT IN NULL query will return all the rows that have cm_content.size not in 'system' or NULL.

```sql
select cm_name, cm_creator, `cm_content.size` from alfresco where cm_creator NOT IN ('System', NULL)
```

The following NOT IN (NULL) query will return all the rows where cm_content.size is not equal to 0 and is not NULL.

```sql
select cm_name, `cm_content.size` from alfresco where `cm_content.size` NOT IN (0, NULL)
```

### Nested Boolean Predicates

SQL predicates can be combined with Boolean operators AND, OR and NOT and nested with parenthesis.

```sql
SITE = ‘MySite’ AND `cm_content.mimetype` = 'text/plain'
```

### SQL IN Operator

The SQL IN operator can be used in the predicate for both numeric and string fields. Null values are accepted as values in the filter list.

### SQL NOT IN Operator

The SQL NOT IN operator can be used in the predicate for both numeric and string fields. Null values are accepted as values in the filter list, but due to SQL limitations the query will produce no results.

> **Note:** Use an equivalent query when fetching NULL values instead of including the null as a value of a NOT IN list.

### Order By

SQL SELECT statements can contain an ORDER BY clause with one or more order by fields. String identifiers and numeric fields can be specific in the ORDER BY clause.

Below is an example of an ORDER BY on a numeric field:

```sql
select cm_creator, cm_name, exif_manufacturer, audio_trackNumber from alfresco order by audio_trackNumber asc
```

### Limit

SQL SELECT statements can contain a LIMIT clause. If no limit is specified a default limit of 1000 is set.

> **Note:** Caution should be used when increasing the default limit as performance and memory consumption increase as the limit increases.

## SELECT DISTINCT statements

The basic syntax for SELECT DISTINCT is as follows:

```sql
select distinct cm_name from alfresco where cm_content = 'alfresco' order by cm_name asc
```

SELECT DISTINCT queries can also have multiple fields and multiple order by fields.

### Is Null statements

The basic syntax for Is Nulls is as follows:

```sql
select cm_name, `cm:content.size` from alfresco where `cm:content.size` IS NULL
```

## Is Not Null statements

The basic syntax for Is Not Null is as follows:

```sql
select cm_name, `cm_content.size` from alfresco where `cm_content.size` IS NOT NULL
```

## Aggregations Without GROUP BY

SQL aggregations without a GROUP BY clause return a single result tuple with the aggregation results. See below for an example:

```sql
select count(*) as docCount, avg(`cm_content.size`) as content_size from alfresco where cm_owner = 'xyz
```

### Aggregate functions

Alfresco SQL supports the following aggregation functions:

* `count(*)`
* `count(field)`
* `count(distinct field)`
* `sum(numeric_field)`
* `avg(numeric_field)`
* `min(numeric_field)`
* `max(numeric_field)`

### Aggregate Fields

Any numeric field can be used within the aggregations sum, avg, min, and max. As with the basic SELECT statements, aggregation fields defined by content models can be referenced using the content model prefix. Fields that are reserved words or contain special characters need to be escaped with the back tick character.

### Aggregate Result Tuple

If a field alias is specified for an aggregate function then the field alias will appear in the result tuple. If field aliases are not used then the field name for the aggregate functions will appear as follows: EXPR$1, EXPR$2. These values refer to the function expression by the order they appear in the field list, starting from 1. For example the first function that appears in the query will be named EXPR$1 in the result tuples.

## Aggregations With GROUP BY

SQL aggregations with a GROUP BY clause are also supported and take the following form:

```sql
select `cm_content.mimetype`, count(*) as total_count from alfresco group by `cm_content.mimetype` having count(*) < 4 order by count(*) asc
```

### Aggregate functions

Alfresco SQL supports the following aggregation functions:

* `count(*)`
* `count(field)`
* `count(distinct field)`
* `sum(numeric_field)`
* `avg(numeric_field)`
* `min(numeric_field)`
* `max(numeric_field)`

### Aggregation fields

Any numeric field can be used within the aggregations sum, avg, min, and max. As with the basic SELECT statements fields defined by content models can be referenced using the content model prefix. Fields that are reserved words or contain special characters need to be escaped with the back tick character.

### Group By Fields

One or more fields can be specified as group by fields. Fields that are designated as facetable in a content model will provide the best aggregation results.

> **Note:** Group by is supported for text fields when the content model has the following setting for the text field.

* LOV whole or partial match
* unique match: partial, many

It’s not supported when the text field is either freetext or none.

### Aggregate Result Tuples

If a field alias is specified for an aggregate function then the field alias will appear in the result tuple. If field aliases are not used then the field name for the aggregate functions will appear as follows: EXPR$1, EXPR$2. These values refer to the function expression by the order they appear in the query, starting from 1. For example the first function that appears in the query will be named EXPR$1 in the result tuples.

### Order By

One or more fields may be used in the ORDER BY clause. The ORDER BY can include both fields from the field list and the result of the COUNT function. ORDER BY for other aggregate functions is not yet supported. Field aliases cannot be used in the ORDER BY clause. When referring to an aggregate function in the ORDER BY clause the function call as it appears in the field list should be used.

> **Note:** Order by is supported for text fields when the content model has the following setting for the text field.

* LOV whole or partial match
* unique match: partial, many

It’s not supported when the text field is either freetext or none.

### Having

The HAVING clause is supported for aggregation functions only. Boolean logic and nested HAVING clauses are supported. The following comparison operations are supported in the HAVING clause: =, >=, <=, !=.

> **Note:** Support is limited for the HAVING clause in Alfresco Search and Insight Engine 2.0.

### Limit

A LIMIT clause can be used to limit the number of aggregations results. If no LIMIT clause is provided a default limit of 1000 is applied.

![]({% link insight-engine/images/hr.png %})

### Time Series Aggregations

There is specific support for SQL time series reporting through the use of virtual time dimensions. The following section describes how virtual time dimensions are used.

*Virtual Time Dimensions*

Search and Insight Engine automatically creates virtual time dimensions for every datetime field stored in the Alfresco Search Service. The three virtual time dimensions supported are: _day, _month, _year. To use the virtual time dimensions append the virtual time dimension to any datetime field and use it in the GROUP BY clause. Below is an example where the _day dimension is appended to the cm_created datetime field. The query creates a daily time series report using the cm_created_day virtual time dimension.

```sql
select cm_created_day, count(*) as total from alfresco where cm_created >= 'NOW/DAY' group by cm_created_day
```

![]({% link insight-engine/images/hr.png %})

## Datetime Predicates

A datetime predicate can be used in the WHERE clause to control the datetime range of the time series report. This is a datetime predicate on the cm_created field. Its important to note that the virtual time dimension field is only used in the field list and GROUP BY clause. The predicate is applied to the non-virtual datetime field in the index. This example uses a date math expression to specify a lower boundary for the time series report and is a datetime predicate on the cm_created field.

```sql
where cm_created >= 'NOW/DAY'
```

### Unbounded Time Series Reports

> **Note:** The sections below describe how to set lower and upper boundaries using both fixed date and date math predicates.

If no datetime predicate is supplied, the following default lower and upper boundaries for the different time dimensions are used:

**day:**

* **lower:** current day minus 1 month
* **upper:** current full day

**month:**

* **lower:** current month minus 24 months
* **upper:** current full month

**year:**

* **lower:** current year minus 5 years
* **upper:** current full year

### Fixed Datetime Predicates

Fixed datetime predicates are formatted according to a subset of ISO 8601. They require the full precision to be expressed in the statement, see the example below:

```sql
select cm_created_day, count(*) from alfresco where cm_created >= '2010-02-01T01:01:01Z' and cm_created <= '2010-02-14T23:59:59Z' group by cm_created_day
```

### Date Math Predicates

Search and Insight Engine also supports a rich set of date math expressions. The example below uses a time series aggregation using date math predicates. The NOW clause signifies the current point in time with milli-second precision. The NOW/MONTH clause rounds the current point in time down to the current MONTH i.e. The -6MONTHS subtracts 6 months from the current month. See the [Solr date math guide](https://lucene.apache.org/solr/guide/6_6/working-with-dates.html#WorkingwithDates-DateMathSyntax) for more details on date math syntax.

```sql
select cm_created_month, count(*) from alfresco where cm_created >= 'NOW/MONTH-6MONTHS' and cm_created <= 'NOW' group by cm_created_month
```

### Autofilled Date/Time Ranges

Time series aggregation queries return an aggregation value for all date/time values that fall within the range. Date/time values that do not have data present within the range still appear in the result set with aggregation values of 0.

### Single Dimension Group By

Time series aggregations that group by virtual time dimensions are currently limited to using a single group by field.

### Order By

By default time series aggregation results are sorted in datetime ascending order. An order by clause can be used to change the direction of the datetime sort or sort by the result of the COUNT function. ORDER BY for other aggregate functions is not yet supported.

### Having

A HAVING clause can be used to filter time series aggregations results.

## Unsupported SQL

Alfresco Search and Insight Engine supports a subset of SQL. Below is a list of commonly used SQL commands that are not currently supported:

## Commands

* `CMIS QL functions IN_TREE, IN_FOLDER, SCORE, CONTAINS`
* `DATEDIFF`
* `DBID Range Queries`
* `HAVING` : Can only be applied to aggregate functions.
* `JOIN`
* `LIKE`
* `Multivalued fields`
* `String, Math Operators`
* `SUB-QUERIES`
* `UNION`

## Search using conjunctions

Single terms, phrases, and so on can be combined using "`AND`" in upper, lower, or mixed case.

```sql
big AND yellow AND banana
TEXT:big and TEXT:yellow and TEXT:banana
```

These queries search for nodes that contain the terms "big", "yellow", and "banana" in any content.
