---
author: Alfresco Documentation
---

# Redirected properties

It is possible for one property to reference another property.

A property value may be a reference to another property, which saves having multiple copies of the same regular expression. This is indicated by a '$' as the first character of the property value. If the first character of an expression needs to be a '$' it too may be escaped with a '\\'. An example of this is shown below:

```
audit.filter.alfresco-access.transaction.type=$transaction.content.types

transaction.content.types=$general.content.types
general.content.types=cm:folder;cm:content
```

**Parent topic:**[Audit filters](../concepts/audit-filters.md)

