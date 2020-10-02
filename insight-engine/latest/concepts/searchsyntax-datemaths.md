---
author: Alfresco Documentation
---
# Search using date math

The date field types in Solr support the date math expressions.

The date math expression makes it easy to create times relative to fixed moments in time and includes the current time which can be represented using the special value of `NOW`.

**Date math syntax**

The date math expressions consist either adding some quantity of time in a specified unit, or rounding the current time by a specified unit. Expressions can be chained and are evaluated left to right.

For example, to represents a point in time two months from now, use:

```
NOW+2MONTHS
```

To represents a point in time one day ago, use:

```
NOW-1DAY
```

A slash is used to indicate rounding. To represents the beginning of the current hour, use:

```
NOW/HOUR
```

To represent a point in time six months and three days into the future and then rounds that time to the beginning of that day, use:

```
NOW+6MONTHS+3DAYS/DAY
```

While date math is most commonly used relative to `NOW`, it can be applied to any fixed moment in time as well:

```
1972-05-20T17:33:18.772Z+6MONTHS+3DAYS/DAY
```

> **Note:** Solr 6 date math supports `TODAY`.

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/searchsyntax-intro.md)
