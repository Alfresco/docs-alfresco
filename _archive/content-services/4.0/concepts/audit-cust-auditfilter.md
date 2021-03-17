---
author: Alfresco Documentation
---

# Custom audit filter

The most common customization is to change the default audit filter values.

These filter values are used to include or exclude selected events. Global property names identifies elements in the generated audit data. Each property value is a list of regular expressions that either accept or reject the generated data value. If any value is rejected in a set of data the whole set is rejected. For example, to audit the users `"jblogs"` and any user that starts with `"temp"` other than `"tempmanager"`, override the following global property value. If using tomcat, add a value to the <tomcat\>/shared/classes/alfresco-global.properties file.

The following is an example custom filter:

```
audit.filter.alfresco-access.transaction.user=~tempManager;test.*;jblogs 
```

The list is semicolon separated. Any regular expression that starts with a '~' indicates that a matching value should be rejected. The list is evaluated from left to right until there is a match. If no match is made the value is rejected. If the list is empty \(zero length\) all values are accepted. It is possible to filter on any of the generated data values. Refer to the audit filtering section for a more detailed description of filter properties.

**Parent topic:**[Content auditing customizations](../concepts/audit-cust.md)

