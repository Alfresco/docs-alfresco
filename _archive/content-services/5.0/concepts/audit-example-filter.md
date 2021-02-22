---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Example filter

Each property value defines a list of regular expressions that will be used to match the actual audit map values.

Creating an audit filter involves setting some auditing-related global properties. These are set in the alfresco-global.properties file.

```
audit.filter.alfresco-access.default.enabled=true
audit.filter.alfresco-access.default.user=~System;.*
audit.filter.alfresco-access.default.type=cm:folder;cm:content
audit.filter.alfresco-access.default.path=/app:company_home/.*
audit.filter.alfresco-access.transaction.user=
audit.filter.alfresco-access.login.user=jblogs
... 
```

In the example, events created by any user except for the internal user *"System"* will be recorded by default for all event actions. However the property for the *transaction* event action overrides this to record even *"System"* events.

For any filters to be applied to an event action, that action's filters must be enabled with an *"enabled"* property set to *"true"*. However this can also be done by using the *default* event action, as shown in the example. Property names have a *"audit.filter."* prefix and use '.' as a separator where as components of rootPath and keys in the audit map use '/'.

Lists are evaluated from left to right allowing one flexibility to accept or reject different combinations of values. If no match is made by the end of the list the value is rejected. If there is not a property for a given value or an empty list is defined \(as specified for the *"user"* value on a *"transaction"* action\) any value is accepted. Each regular expression in the list is separated by a semicolon \(';'\). Expressions that include a semicolon can be escaped using a '\\'. An expression that starts with a '~' indicates that any matching value should be rejected. If the first character of an expression needs to be a '~', it too can be escaped with a '\\'.

A property value can be a reference to another property, which saves having multiple copies of the same regular expression. This is indicated by a '$' as the first character of the property value. If the first character of an expression needs to be a '$' it too can be escaped with a '\\'.

**Parent topic:**[Audit filters](../concepts/audit-filters.md)

