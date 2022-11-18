---
title: Query languages
---

In addition to AFTS the Lucene, and CMIS query languages are supported. The Lucene language is provided by the IR framework and the query API is built on top of the Lucene standard query parser. For more details see [Apache Lucene - Query Parser Syntax](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html){:target="_blank"}. The CMIS query language can be used with the Search Enterprise API and by using the CMIS interface. CMIS is often used when you migrate to or from Alfresco. Queries run with CMIS are generally used to make sure what you have imported has worked correctly. You may also use third party tools that use CMIS as their query language. Where possible Alfresco has conformed to the current specification for CMIS, for more see [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html){:target="_blank"}. For unsupported features for both query languages, see [Unsupported]({% link search-enterprise/latest/using/unsupported.md %}).

The Search Enterprise documentation provides Apache Lucene - Query Parser Syntax information specific to Alfresco.

The search string syntax depends on the given query language and can differ significantly between AFTS, Lucene, and CMIS. However, there are some shared aspects that provide the same behavior in the languages, for more see [Field queries]({% link search-enterprise/latest/using/field.md %}).

## Lucene Query Language

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

When prefixes and fully qualified names are used, the property has to be prefixed with the @ symbol and this is one of the main differences between AFTS and Lucene. Special characters (i.e. characters that have a special meaning in lucene) need to be escaped using the backslash.
