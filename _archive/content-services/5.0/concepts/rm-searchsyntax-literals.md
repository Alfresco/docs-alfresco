---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search query literals

When you search, entries are generally a term or a phrase. The string representation you type in will be transformed to the appropriate type for each property when executing the query. For convenience, there are numeric literals but string literals can also be used.

String literals for phrases can be enclosed in double quotes or single quotes. Java single character and `\uXXXX`-based escaping are supported within these literals.

Integer and decimal literals conform to the Java definitions.

Dates as any other literal can be expressed as a term or phrase. Dates are in the format `......` Any or all of the time can be truncated. All of the date must be present.

The date type also supports `NOW` syntax.

In range queries, strings, term, and phrases that do not parse to valid type instance for the property are treated as open ended.

```
test:integer[ 0 TO MAX] matches anything positive
```

Date ranges do not respect the truncated resolution that can be presented in range queries.

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/rm-searchsyntax-intro.md)

