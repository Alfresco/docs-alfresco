---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search syntax

The following sections describe the Alfresco search syntax.

-   **[Search for a single term](../concepts/rm-searchsyntax-single.md)**  
Single terms are tokenized before the search according to the appropriate data dictionary definition\(s\).
-   **[Search for a phrase](../concepts/rm-searchsyntax-phrase.md)**  
Phrases are enclosed in double quotes. Any embedded quotes may be escaped using `"\"`. If no field is specified then the default TEXT field will be used, as with searches for a single term.
-   **[Search for an exact term](../concepts/rm-searchsyntax-exact.md)**  
To search for an exact term, prefix the term with "=". This ensures that the term will not be tokenized, therefore you can search for stop words.
-   **[Search for term expansion](../concepts/rm-searchsyntax-term.md)**  
To force tokenization and term expansion, prefix the term with "~".
-   **[Search for conjunctions](../concepts/rm-searchsyntax-conjunct.md)**  
Single terms, phrases, and so on can be combined using "AND" in upper, lower, or mixed case.
-   **[Search for disjunctions](../concepts/rm-searchsyntax-disjunct.md)**  
Single terms, phrases, and so on can be combined using "OR" in upper, lower, or mixed case.
-   **[Search for negation](../concepts/rm-searchsyntax-negate.md)**  
 Single terms, phrases, and so on can be combined using "NOT" in upper, lower, or mixed case, or prefixed with "!" or "-".
-   **[Search for optional, mandatory, and excluded elements of a query](../concepts/rm-searchsyntax-optional.md)**  
Sometimes AND and OR are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".
-   **[Search for fields](../concepts/rm-searchsyntax-fields.md)**  
Search specific fields rather than the default. Terms, phrases, etc. can all be preceded by a field. If not the default field TEXT is used.
-   **[Search for wildcards](../concepts/rm-searchsyntax-wildcards.md)**  
Wildcards are supported in terms, phrases, and exact phrases using "\*" to match zero, one, or more characters and "?" to match a single character. The "\*" wildcard character may appear on its own and implies Google-style. The "anywhere after" wildcard pattern can be combined with the "=" prefix for identifier based pattern matching.
-   **[Search for ranges](../concepts/rm-searchsyntax-ranges.md)**  
Inclusive ranges can be specified in Google-style. There is an extended syntax for more complex ranges. Unbounded ranges can be defined using MIN and MAX for numeric and date types and "\\u0000" and "\\FFFF" for text \(anything that is invalid\).
-   **[Search for fuzzy matching](../concepts/rm-searchsyntax-fuzzy.md)**  
 Fuzzy matching is not currently implemented. The default Lucene implementation is Levenshtein Distance, which is expensive to evaluate.
-   **[Search for proximity](../concepts/rm-searchsyntax-proximity.md)**  
 Google-style proximity is supported.
-   **[Search for boosts](../concepts/rm-searchsyntax-boosts.md)**  
Query time boosts allow matches on certain parts of the query to influence the score more than others.
-   **[Search for grouping](../concepts/rm-searchsyntax-grouping.md)**  
 Groupings of terms are made using "\(" and "\)". Groupings of all query elements are supported in general. Groupings are also supported after a field - field group.
-   **[Search for spans and positions](../concepts/rm-searchsyntax-spans.md)**  
Spans and positions are not currently implemented. Positions will depend on tokenization.
-   **[Escaping characters](../concepts/rm-searchsyntax-escaping.md)**  
Any character may be escaped using the backslash "\\" in terms, IDs \(field identifiers\), and phrases. Java unicode escape sequences are supported. Whitespace can be escaped in terms and IDs.
-   **[Mixed FTS ID behavior](../concepts/rm-searchsyntax-ftsid.md)**  
 This relates to the priority defined on properties in the data dictionary, which can be both tokenized or untokenized.
-   **[Search for order precedence](../concepts/rm-searchsyntax-precedence.md)**  
Operator precedence is SQL-like \(not Java-like\). When there is more than one logical operator in a statement, and they are not explicitly grouped using parentheses, `NOT` is evaluated first, then `AND`, and finally `OR`.

**Parent topic:**[Reference](../concepts/share-reference.md)

**Parent topic:**[Reference](../concepts/ch-reference.md)

**Related information**  


[Search for a single term](rm-searchsyntax-single.md)

[Search for a phrase](rm-searchsyntax-phrase.md)

[Search for an exact term](rm-searchsyntax-exact.md)

[Search for term expansion](rm-searchsyntax-term.md)

[Search for conjunctions](rm-searchsyntax-conjunct.md)

[Search for disjunctions](rm-searchsyntax-disjunct.md)

[Search for negation](rm-searchsyntax-negate.md)

[Search for optional, mandatory, and excluded elements of a query](rm-searchsyntax-optional.md)

[Search for fields](rm-searchsyntax-fields.md)

[Search for wildcards](rm-searchsyntax-wildcards.md)

[Search for ranges](rm-searchsyntax-ranges.md)

[Search for fuzzy matching](rm-searchsyntax-fuzzy.md)

[Search for proximity](rm-searchsyntax-proximity.md)

[Search for boosts](rm-searchsyntax-boosts.md)

[Search for grouping](rm-searchsyntax-grouping.md)

[Search for spans and positions](rm-searchsyntax-spans.md)

[Search for characters](rm-searchsyntax-escaping.md)

[Search for FTS ID behavior](rm-searchsyntax-ftsid.md)

[Search for order precedence](rm-searchsyntax-precedence.md)

