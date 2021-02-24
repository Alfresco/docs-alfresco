---
author: Alfresco Documentation
---

# Creating new audit filters

Audit filters are essentially global properties that specify a way of filtering audit events by specifying regular expression to include or exclude audit events. Audit filters are typically added to alfresco-global.properties.

The format of an audit filter is as follows:

```
audit.filter.<data_producer>.<path>
```

**Note:** It is important to note that it is the **data producer** that is specified and *not* the name of the audit application.

First look at the default audit filters:

```

# Audit map filter for AccessAuditor - restricts recorded events to user driven events                                                                                                      
audit.filter.alfresco-access.default.enabled=false
audit.filter.alfresco-access.transaction.user=~System;~null;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content;st:site
audit.filter.alfresco-access.transaction.path=~/sys:archivedItem;~/ver:;.*      
    
```

**Note:** In the above syntax of the filter `alfresco-access` is the **data producer** *not* the audit application name. The filter path is the actual mapped path value to filter against.

When setting up an audit filter, you need to enable \(or disable\) the filter at the service level first or globally. In the above example this is done via `audit.filter.alfresco-access.default.enabled=false`. This switches off audit events for the `alfresco-access` data producer.

Then establish your more granular `rootPath` mapped filters for that data producer path and event. Each property value you set the filter equal to, defines a list of regular expressions that will be used to match the actual full path mapped value in your audit application.

For any filters to be applied to an event action, that action's filters must be enabled with an `enabled` property set to `true`.

Property names have an `audit.filter.*` prefix and use '.' as a separator where as components of rootPath and keys in the audit map use '/'.

Lists are evaluated from left to right allowing flexibility to accept or reject different combinations of values. If no match is made by the end of the list the value is rejected. If there is not a property for a given value or an empty list is defined any value is accepted.

Each regular expression in the list is separated by a semicolon \(';'\). Expressions that include a semicolon can be escaped using a '\\'.

An expression that starts with a '~' indicates that any matching value should be rejected. If the first character of an expression needs to be a '~', it can be escaped with a '\\'.

A property value can be a reference to another property, which saves having multiple copies of the same regular expression. This is indicated by a '$' as the first character of the property value. If the first character of an expression needs to be a '$' it can be escaped with a '\\'.

You can use the default audit filters as a starting point to create your own custom audit filters, or override these defaults.

## Example 1

Here is an example of filter for data produced by the `alfresco-api` data producer:

```

audit.filter.alfresco-api.post.AuthenticationService.authenticate.args.userName=~System;~null;~admin;.*
    
```

This example filter illustrates **not** recording on a post authenticating `userName` produced by the `alfresco-api` producer that is equal to System, null or admin.

## Example 2

```

audit.filter.alfresco-access.default.enabled=true
audit.filter.alfresco-access.transaction.user=~System;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content
audit.filter.alfresco-access.transaction.path=/app:company_home/.*
audit.filter.alfresco-access.login.user=jblogs
... 
```

In this example, events created by any user except for the internal user `System` will be recorded for all event actions.

**Parent topic:**[Audit filters](../concepts/audit-filters.md)

