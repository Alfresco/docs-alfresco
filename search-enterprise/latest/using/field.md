---
title: Field queries
---

The fields listed and the corresponding query execution behavior are common to AFTS, Lucene, and CMIS query languages.

## Type and Aspect Queries

Type and Aspect queries have several things in common and both of them expect a name as the field value, specifically:

* If the value is an unqualified name it will be expanded to a fully qualified name using the default namespace.
* If the value is a prefixed name the prefix is expanded, for example `cm:name => {http://www.alfresco.org/model/content/1.0}content}name`.
* If the value is a fully qualified name then it is used in that form.

**Important:** Prefix and wildcard queries in the namespace part, for example `TYPE:{http://www.*}person` won't work, whereas `TYPE:{http://www.alfresco.org/model/content/1.0}pers*` does work. Descendant expansion in prefix and wildcard queries, for example `TYPE: cm:pers*` will not expand to `cm:person descendants`.

## ALL (Field, Prefix, Range, Wildcard, Fuzzy)

The ALL virtual field (i.e. it is not in the index) expands to all fields defined:

* In `SearchParameters::allAttributes` (the object representation of the corresponding attribute in the ReST API search request) or if they are empty in `DictionaryService::getAllProperties`.

## SITE (Field)

The `SITE` virtual field allows you to limit the search results of a given site. This example describes how to narrow down your search results to a single site called `mysite`:

```afts
test AND SITE:mysite
```

You can limit the results to **any** site. To do this you need to use a special site value `_ALL_SITES_`, for example:

```afts
test AND SITE:_ALL_SITES_
```

You can use the `_EVERYTHING_` special value when the `SITE` condition should be ignored, for example:

```afts
test AND SITE:_EVERYTHING_
```

## TEXT (Field, Prefix, Range, Wildcard, Fuzzy)

The TEXT virtual field (i.e. it is not in the index) expands to all fields defined:

* In `SearchParameters::textAttributes` (the object representation of the corresponding attribute in the ReST API Search Request) or if they are empty, the `AlfrescoDefaultTextFields` (i.e. `cm:name`, `cm:title`, `cm:description`, `cm:content`).
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

> **Note:** This means that a full query in AND matches documents that contains all the terms in the query, in any of the fields involved.

## DataType (Field, Prefix, Range, Wildcard, Fuzzy)

This query is executed when the field name corresponds to a `datatype` definition using its prefixed or fully qualified form, for example `d:text, {http://www.alfresco.org/model/dictionary/1.0}text)`.

The query produced is a boolean query which includes an optional clause for each property associated to the input `datatype` definition.

## Permission Queries

Fields that are related to ACL information are stored directly as part of the Elasticsearch documents. As a consequence of that, the corresponding queries are plain `term`/ `range` / `prefix` / `fuzzy` queries using the following fields:

* Property (Field, Prefix, Range, Wildcard, Fuzzy)  
* OWNER (Field, Prefix, Wildcard, Fuzzy)
* READER (Field, Prefix, Wildcard, Fuzzy)
* AUTHORITY (Field, Prefix, Wildcard, Fuzzy)
* DENIED (Field, Prefix, Wildcard, Fuzzy)

## ID (Field, Prefix, Wildcard)

The ID (virtual) field maps to an Elasticsearch document id (_id) and it corresponds to the Alfresco node identifier, for example `5fef4b5d-4527-40e5-94fa-1878ef7a54eb`.

## EXISTS (Field)

The query intent can be summarized in “give me all nodes that have a value for the property/field I requested”. This is very similar to the previous one, the difference is that the `NULLPROPERTIES` field is not involved in this scenario.

The value of a clause whose field is `EXISTS` could be:

* An unqualified name will be expanded to a fully qualified name using the default namespace.
* a prefixed name is expanded, for example `cm:name => {http://..}content}name)`.
* a fully qualified name.
* a field name, for example ID, OWNER, READER.

If the value is associated to a property definition then a boolean query is executed that has the following clause:

* `PROPERTIES` (MUST) Otherwise, in case of a field (e.g. OWNER, ID, READER) a wildcard query is built using that field, for example `OWNER:*`.
