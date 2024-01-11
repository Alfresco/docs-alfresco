---
title: Query languages
---

AFTS is the primary query language for use with Search Enterprise. In addition to AFTS the Lucene, and CMIS query languages are also supported. If you require any additional queries to be written in the future, Alfresco recommends the use of AFTS.

The search string syntax depends on the given query language and can differ significantly between AFTS, Lucene, and CMIS. However, there are some shared aspects that provide the same behavior in the languages, for more see [Field queries]({% link search-enterprise/3.3/using/field.md %}).

For a list of unsupported features see [Unsupported]({% link search-enterprise/3.3/using/unsupported.md %}).

## Lucene query language

The Lucene language is provided by the IR framework and the query API is built on top of the Lucene standard query parser. For more details see [Apache Lucene - Query Parser Syntax](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html){:target="_blank"}. The Search Enterprise documentation provides Apache Lucene - Query Parser Syntax information specific to Alfresco.

Properties are attributes defined in an Alfresco content model. They are identified by qualified names, meaning they are composed of:

* a namespace
* a local name

This avoids conflicts between local names used in multiple models, for example `finance:name` and `cm:name`.

A property can be declared in queries using three notations:

* Unqualified name, for example `title`. In this case it will be associated to the default namespace. The property is therefore assumed to exist and to be valid in the default content model.

```afts
@title:OOP
@title:(Object Oriented Programming)
```

* Prefixed name, for example `cm:title`. The prefix is the short form of a given namespace. It must be uniquely associated to a namespace and to a content model.

```afts
@cm:title:OOP
@cm:title:(Object Oriented Programming)
```

* Fully qualified name. In this case the property name uses the full namespace and the local name.

```http
@{http://www.alfresco.org/model/content/1.0}title:OOP
@{http://www.alfresco.org/model/content/1.0}title:(Object Oriented Programming)
```

When prefixes and fully qualified names are used, the property has to be prefixed with the @ symbol and this is one of the main differences between AFTS and Lucene. Special characters (i.e. characters that have a special meaning in Lucene) need to be escaped using the backslash.

## CMIS query language

The CMIS query language can be used with the Search Enterprise v1 REST API or by using the CMIS interface. CMIS is often used when you migrate to or from Alfresco. If you want to use the v1 REST API you must indicate this by using the parameter `language=CMIS`. The [CMIS specification](https://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html){:target="_blank"} outlines the usable search query syntax. Queries run with CMIS are generally used to make sure that what you have imported has worked correctly. You can also use third-party tools that use CMIS as their query language.

> **Note:** When checking equality of a string field `SELECT * FROM cmis:document WHERE abc:stringfield = 'stringvalue'` when using the exact term search feature, it is important to consider how the field is indexed. For more details see [Exact term search]({% link search-enterprise/3.3/config/index.md %}#exact-term-search).

### CMIS queries

These are some examples of the CMIS query language.

```sql
- strict queries
SELECT * FROM Document WHERE CONTAINS("quick")
- Alfresco extensions
SELECT * FROM Document D WHERE CONTAINS(D, 'cmis:name:\'Tutorial\'')
SELECT cmis:name as BOO FROM Document D WHERE CONTAINS('BOO:\'Tutorial\'')
```

```sql
Simple select examples - unfiltered
SELECT * FROM cmis:document
SELECT * FROM cm:person
```

```sql
Select with where clauses
SELECT * FROM cmis:folder WHERE cmis:description IS NOT NULL
SELECT * FROM cmis:document WHERE CONTAINS('apple')
SELECT * FROM cmis:document WHERE cmis:name <> 'carrot.docx'
```

```sql
Joining aspects to filter by properties
SELECT * FROM cmis:document AS D JOIN exif:exif AS E ON D.cmis:objectId = E.cmis:objectId WHERE E.exif:pixelXDimension <= 640
```
