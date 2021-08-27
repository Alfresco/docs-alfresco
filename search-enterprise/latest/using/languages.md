---
title: Query languages
---

A search request allows the specification of the search language to be used. In addition to AFTS the Lucene query language is also supported. It is the query language provided by the IR framework. The Lucene query API is built on top of the Lucene standard query parser. For more details on the query language syntax see [Apache Lucene - Query Parser Syntax
](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html).

The Search Enterprise documentation provides Apache Lucene - Query Parser Syntax information specific to Alfresco that should be considered when using this query language.

The search string syntax depends on the given query language and can differ significantly between AFTS and Lucene. However, there are some shared aspects that provide the same exact behavior in both languages, particularly for Add LINK to Field Queries page.

## Lucene Query Language

### Fields

Fields are special attributes that can be used in queries and are not part of any content model. The behavior and the usage of these attributes is in common with the AFTS query language.

### Properties

Properties are attributes defined in an Alfresco content model. They are identified by qualified names, meaning they are composed of:

* a namespace
* a local name

This avoids conflicts between local names used in multiple models (e.g. finance:name and cm:name).

A property can be declared in queries using three notations:

* Unqualified name (e.g. title): in this case it will be associated to the default namespace. The property is therefore assumed to exist and to be valid in the default content model.

```afts
@title:OOP
@title:(Object Oriented Programming)
```

* Prefixed name (e.g. cm:title): the prefix is the short form of a given namespace. It must be uniquely associated to a namespace and to a content model.

```afts
@cm:title:OOP
@cm:title:(Object Oriented Programming)
```

* Fully qualified name: in this case the property name uses the full namespace and the local name.

```http
@{http://www.alfresco.org/model/content/1.0}title:OOP
@{http://www.alfresco.org/model/content/1.0}title:(Object Oriented Programming)
```

When prefixes and fully qualified names are used, the property has to be prefixed with the @ symbol. This is one of the main differences between AFTS and Lucene.
Special characters (i.e. characters that have a special meaning in lucene) need to be escaped using the.
