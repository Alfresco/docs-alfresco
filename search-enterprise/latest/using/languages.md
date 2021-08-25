---
title: Query languages
---

A search request allows the specification of the search language to be used. In addition to AFTS the Lucene query language is also supported. It is the query language provided by the IR framework. The Lucene query API is built on top of the Lucene standard query parser. The query language syntax is described in details on the project web site. @martin where is this syntax?

This page doesn’t repeat what is written in that documentation; instead, it provides things specific to Alfresco that should be considered when using this query language.

The search string syntax depends on the given query language and can differ significantly between AFTS and Lucene. However, there are some shared aspects that provide the same exact behavior in both languages. What are these aspects, is it important @martin?

A search request allows the specification of the search language to be used. The supported languages in addition to the default AFTS are:

Lucene: the query language provided by the popular IR framework (Supported from M2 release)
The search string syntax depends on the given query language and can differ significantly between AFTS and Lucene. However, there are some shared aspects that provide the same exact behavior in both languages, particularly for field queries.

## Lucene Query Language

The Lucene query API is built on top the Lucene standard query parser. The query language syntax is described in details on the project web site[1].

This page doesn’t repeat what is written in that documentation; instead, it provides things specific to Alfresco that should be considered when using this query language.

Fields
Fields are special attributes that can be used in queries and that are not part of any content model. The behaviour and the usage of those attributes is in common with the AFTS query language and for that reason it has been described here.

Properties
Properties are attributes defined in an Alfresco content model. They are identified by qualified names, meaning with that they are composed by:

a namespace
a local name
That avoids conflicts between local names used in multiple models (e.g. finance:name and cm:name).

A property can be declared in queries using three notations:

Unqualified name (e.g. title): in this case it will be associated to the default namespace. The property is therefore assumed to exist and to be valid in the default content model
@title:OOP

@title:(Object Oriented Programming)
Prefixed name (e.g. cm:title): the prefix is the short form of a given namespace. It must be uniquely associated to a namespace and to a content model.
@cm\:title:OOP

@cm\:title:(Object Oriented Programming)
Fully qualified name: in this case the property name uses the full namespace and the local name
@{http\:\/\/www.alfresco.org\/model\/content\/1.0}title:OOP

@{http\:\/\/www.alfresco.org\/model\/content\/1.0}title:(Object Oriented Programming)
When prefixes and fully qualified names are used, the property has to be prefixed with the @ symbol: this is one of the main differences between AFTS and Lucene.

Special characters (i.e. characters that have a special meaning in lucene) need to be escaped using the backslash

[1] note the page refers to an old lucene version. Although the current version, at the time of writing is 8.8.2 no changes have been introduced since 2.9.4 in the lucene syntax so what is described in the page can be considered valid and updated.

### Unsupported Languages

* CMIS query language
* SQL query language using JDBC Driver
