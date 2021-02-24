---
author: Alfresco Documentation
---

# Current Date

The date object returns the current date.

In FreeMarker there is no such variable as today. Therefore, the current date \(as a new `Date()` Java object\) is provided in all templates as the `date` object in the root of the model.

## Example

The following code snippet shows an example of use:

```


<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
${date?string(datetimeformat)}


```

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

