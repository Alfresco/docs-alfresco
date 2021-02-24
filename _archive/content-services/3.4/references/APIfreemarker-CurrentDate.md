---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Current Date

In FreeMarker there is no such variable as today. Therefore, the current date \(as a new `Date()` Java object\) is provided in all templates as the `date` object in the root of the model. For example:

```
<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
${date?string(datetimeformat)}

```

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/APIfreemarker-intro.md)

