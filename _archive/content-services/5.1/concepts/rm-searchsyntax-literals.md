---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search query literals

When you search, entries are generally a term or a phrase. The string representation you type in will be transformed to the appropriate type for each property when executing the query. For convenience, there are numeric literals but string literals can also be used.

**Date formatting**

You can specify either a particular date or a date literal. A date literal is a fixed expression that represents a relative range of time, for example last month, this week, or next year.

`dateTime` field values are stored as Coordinated Universal Time \(UTC\). The date fields represent a point in time with millisecond precision. For date field formatting, Solr uses [DateTimeFormatter.ISO\_INSTANT](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#ISO_INSTANT). The ISO instant formatter formats an instant in Coordinated Universal Time \(UTC\), for example:

```
YYYY-MM-DDThh:mm:ssZ
```

where,

-   `YYYY` is the year.
-   `MM` is the month.
-   `DD` is the day of the month.
-   `hh` is the hour of the day as on a 24-hour clock.
-   `mm` is minutes.
-   `ss` is seconds.
-   `Z` is a literal `Z` character indicating that this string representation of the date is in UTC.

**Note:** No time zone can be specified. The string representation of dates is always expressed in UTC, for example:

```
1972-05-20T17:33:18Z
```

**String literals**

String literals for phrases can be enclosed in double quotes or single quotes. Java single character and `\uXXXX`-based escaping are supported within these literals.

Integer and decimal literals conform to the Java definitions.

Dates as any other literal can be expressed as a term or phrase. Dates are in the format `......` Any or all of the time can be truncated.

In range queries, strings, term, and phrases that do not parse to valid type instance for the property are treated as open ended.

```
test:integer[ 0 TO MAX] matches anything positive
```

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/rm-searchsyntax-intro.md)

