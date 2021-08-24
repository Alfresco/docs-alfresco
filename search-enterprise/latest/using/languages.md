---
title: Query languages
---

A search request allows the specification of the search language to be used. In addition to AFTS the Lucene query language is also supported. It is the query language provided by the IR framework. The Lucene query API is built on top of the Lucene standard query parser. The query language syntax is described in details on the project web site. @martin where is this syntax?

This page doesn’t repeat what is written in that documentation; instead, it provides things specific to Alfresco that should be considered when using this query language.

The search string syntax depends on the given query language and can differ significantly between AFTS and Lucene. However, there are some shared aspects that provide the same exact behavior in both languages. What are these aspects, is it important @martin?

### Unsupported Languages

* CMIS query language
* SQL query language using JDBC Driver
