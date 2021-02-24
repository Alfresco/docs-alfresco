---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search query literals

Everything is really a term or a phrase. The string representation you type in will be transformed to the appropriate type for each property when executing the query. For convenience, there are numeric literals but string literals may also be used.

String literals for phrases may be enclosed in double quotes or single quotes. Java single character and \\uXXXX based escaping are supported within these literals.

Integer and decimal literals conform to the Java definitions.

Dates as any other literal can be expressed as a term or phrase. Dates are in the format ...... Any or all of the time may be truncated. All of the date must be present.

The date type also supports NOW and may be extended in the future to support some date math - akin to what is used by SOLR.

In range queries, strings, term, and phrases that do not parse to valid type instance for the property are treated as open ended.

```
test:integer[ 0 TO MAX]
- matches anything positive
```

Date ranges do not currently respect the truncated resolution that may be presented in range queries.

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

