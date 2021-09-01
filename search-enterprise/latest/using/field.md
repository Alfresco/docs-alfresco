---
title: Field queries
---

The fields listed and the corresponding query execution behavior are common to AFTS and Lucene query languages.

## Type and Aspect Queries

Type and Aspect queries have several things in common: both of them expect a name as the field value. Specifically:

* If the value is an unqualified name, it will be expanded to a fully qualified name using the default namespace
* If the value is a prefixed name, the prefix is expanded (e.g. cm:name => {http://www.alfresco.org/model/content/1.0}content}name)
* If the value is a fully qualified name then it is used in that form

**Known Limitations**

No support for prefix/wildcard queries in the namespace part (e.g. "TYPE:{http://www.*}person" won't work, "TYPE:{http://www.alfresco.org/model/content/1.0}pers*" works)
No support for descendant expansion in prefix/wildcard queries (e.g. TYPE: cm:pers* won't expand to cm:person descendants)

## Expanded Queries

Queries in this category are expanded to a boolean query with several clauses using criteria that are specific to each field.

## ALL (Field, Prefix, Range, Wildcard, Fuzzy)

The ALL virtual field (i.e. it is not in the index) expands to all fields defined

* in the SearchParameters::allAttributes (the object representation of the corresponding attribute in the REST API Search Request) OR, in case they are empty
* in the DictionaryService::getAllProperties

## TEXT (Field, Prefix, Range, Wildcard, Fuzzy)

The TEXT virtual field (i.e. it is not in the index) expands to all fields defined

* in the `SearchParameters::textAttributes` (the object representation of the corresponding attribute in the REST API Search Request) OR, in case they are empty

* in the `AlfrescoDefaultTextFields` (i.e. `cm:name`, `cm:title`, `cm:description`, `cm:content`)
This generates a term centric multi-field query:

For example:

```afts
TEXT:(test AND file AND term3 )
```

This query is expanded to:

```afts
(cm:title:test OR cm:name:test OR cm:description:test OR cm:content:test) AND
(cm:title:file OR cm:name:file OR cm:description:file OR cm:content:file) AND
(cm:title:term3 OR cm:name:term3 OR cm:description:term3 OR cm:content:term3)
```

> **Note:** this means that a full query in AND matches documents that contains all the terms in the query, in any of the fields involved.

## DataType (Field, Prefix, Range, Wildcard, Fuzzy)

@martin added in datatype here even tho its not on the features page. That ok with you?

This query is executed when the field name corresponds to a datatype definition using its prefixed or fully qualified form (e.g. d:text, {http://www.alfresco.org/model/dictionary/1.0}text).

The query produced is a boolean query which includes an optional clause for each property associated to the input datatype definition.

## Permission Queries

Fields that are related to ACL information are stored directly as part of the Elasticsearch documents. As a consequence of that, the corresponding queries are plain term/range/prefix/fuzzy queries using the following fields:

* Property (Field, Prefix, Range, Wildcard, Fuzzy)  
* OWNER (Field, Prefix, Wildcard, Fuzzy)
* READER (Field, Prefix, Wildcard, Fuzzy)
* AUTHORITY (Field, Prefix, Wildcard, Fuzzy)
* DENIED (Field, Prefix, Wildcard, Fuzzy)

## ID (Field, Prefix, Wildcard)

The ID (virtual) field maps to Elasticsearch document id (_id) and it corresponds to the Alfresco node identifier (e.g. 5fef4b5d-4527-40e5-94fa-1878ef7a54eb)

## EXISTS (Field)

The query intent can be summarized in “give me all nodes that have a value for the property/field I requested”. This is very similar to the previous one, the difference is that the NULLPROPERTIES field is not involved in this scenario.

The value of a clause whose field is EXISTS could be:

* an unqualified name: it will be expanded to a fully qualified name using the default namespace
* a prefixed name: the prefix is expanded (e.g. cm:name => {http://..}content}name)
* a fully qualified name
* a field name (e.g. ID, OWNER, READER)

If the value is associated to a property definition then a boolean query is executed having the following clauses:

* PROPERTIES: (MUST) Otherwise, in case of a field (e.g. OWNER, ID, READER) a wildcard query is built using that field (e.g. OWNER:*)

## ISNODE (Field, Prefix, Wildcard)

Search Enterprise 3.0 only indexes nodes so the `ISNODE` query becomes a “MatchAll” or “MatchNothing” query.

The fields (and the corresponding query execution behavior) listed in the following section are common to AFTS and Lucene query languages.
