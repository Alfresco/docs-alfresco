---
author: Alfresco Documentation
---

# Alfresco Full Text Search Reference

The following sections describe the Alfresco Full Text Search (FTS) syntax.

The Alfresco Full Text Search (FTS) query text can be used standalone or it can be embedded in CMIS-SQL using the `contains()` predicate function. The CMIS specification supports a subset of FTS. The full power of FTS can not be used and, at the same time, maintain portability between CMIS repositories.

FTS is exposed directly by the interface, which adds its own template, and is also used as its default field. The default template is:

```
%(cm:name cm:title cm:description ia:whatEvent ia:descriptionEvent lnk:title lnk:description TEXT)
```

When FTS is embedded in CMIS-SQL, only the CMIS-SQL-style property identifiers (`cmis:name`) and aliases, CMIS-SQL column aliases, and the special fields listed can be used to identify fields. The SQL query defines tables and table aliases after `from` and `join` clauses. If the SQL query references more than one table, the `contains()` function must specify a single table to use by its alias. All properties in the embedded FTS query are added to this table and all column aliases used in the FTS query must refer to the same table. For a single table, the table alias is not required as part of the `contains()` function.

When FTS is used standalone, fields can also be identified using `prefix:local-name` and `{uri}local-name` styles.

-   **[Search for a single term](../concepts/searchsyntax-single.md)**  
Single terms are tokenized before the search according to the appropriate data dictionary definition(s).
-   **[Search for a phrase](../concepts/searchsyntax-phrase.md)**  
Phrases are enclosed in double quotes. Any embedded quotes can be escaped using `\`. If no field is specified then the default TEXT field will be used, as with searches for a single term.
-   **[Search for an exact term](../concepts/searchsyntax-exact.md)**  
To search for an exact term you must prefix it with "=". The supported syntax:
-   **[Search for term expansion](../concepts/searchsyntax-term.md)**  
To force tokenization and term expansion, prefix the term with `~`.
-   **[Search for conjunctions](../concepts/searchsyntax-conjunct.md)**  
Single terms, phrases, and so on can be combined using "`AND`" in upper, lower, or mixed case.
-   **[Search for disjunctions](../concepts/searchsyntax-disjunct.md)**  
Single terms, phrases, and so on can be combined using `OR` in upper, lower, or mixed case.
-   **[Search for negation](../concepts/searchsyntax-negate.md)**  
 You can narrow your search results by excluding words with the `NOT` syntax.
-   **[Search for optional, mandatory, and excluded elements of a query](../concepts/searchsyntax-optional.md)**  
Sometimes AND and OR are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".
-   **[Search in fields](../concepts/searchsyntax-fields.md)**  
Search specific fields rather than the default. Terms, phrases, etc. can all be preceded by a field. If not the default field TEXT is used.
-   **[Search for wildcards](../concepts/searchsyntax-wildcards.md)**  
Wildcards are supported in terms, phrases, and exact phrases using `*` to match zero, one, or more characters and `?` to match a single character.
-   **[Search for ranges](../concepts/searchsyntax-ranges.md)**  
Inclusive ranges can be specified in Google-style. There is an extended syntax for more complex ranges. Unbounded ranges can be defined using MIN and MAX for numeric and date types and "\\u0000" and "\\FFFF" for text (anything that is invalid).
-   **[Search for fuzzy matching](../concepts/searchsyntax-fuzzy.md)**  
 Alfresco supports fuzzy searches based on the Lucene default Levenshtein Distance.
-   **[Search for proximity](../concepts/searchsyntax-proximity.md)**  
 Google-style proximity is supported.
-   **[Search for boosts](../concepts/searchsyntax-boosts.md)**  
Query time boosts allow matches on certain parts of the query to influence the score more than others.
-   **[Search for grouping](../concepts/searchsyntax-grouping.md)**  
 Use parentheses to encapsulate `OR` statements for the search engine to execute them properly.
-   **[Search for spans and positions](../concepts/searchsyntax-spans.md)**  
Spans and positions are not implemented. Positions will depend on tokenization.
-   **[Escaping characters](../concepts/searchsyntax-escaping.md)**  
Any character can be escaped using the backslash "\\" in terms, IDs (field identifiers), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.
-   **[Mixed FTS ID behavior](../concepts/searchsyntax-ftsid.md)**  
 This relates to the priority defined on properties in the data dictionary, which can be both tokenized or untokenized.
-   **[Search for operator precedence](../concepts/searchsyntax-precedence.md)**  
Operator precedence is SQL-like (not Java-like). When there is more than one logical operator in a statement, and they are not explicitly grouped using parentheses, `NOT` is evaluated first, then `AND`, and finally `OR`.
-   **[Search query syntax APIs](../concepts/searchsyntax-APIs.md)**  
These examples show how to embed queries in CMIS.
-   **[Search query templates](../concepts/searchsyntax-querytemplates.md)**  
The FTS query language supports query templates. These are intended to help when building application specific searches.
-   **[Search query literals](../concepts/searchsyntax-literals.md)**  
When you search, entries are generally a term or a phrase. The string representation you type in will be transformed to the appropriate type for each property when executing the query. For convenience, there are numeric literals but string literals can also be used.
-   **[Search using date math](../concepts/searchsyntax-datemaths.md)**  
The date field types in Solr support the date math expressions.
