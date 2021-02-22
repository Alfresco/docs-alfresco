---
author: Alfresco Documentation
audience: [, ]
category: 
option: 
---

# Rules autocomplete options

If you type part of a record property at any place in the path then autocomplete options are displayed.

For example, if you type *rm* then you'll be offered options that include:

-   Date filed \{node.rma:dateFiled\}
-   Identifier \{node.rma:identifier\}
-   Location \{node.rma:location\}

Records will be put into the File Plan based on each individual record property value.

So for example you could set a path of */category/\{node.rma:location\}*. When the rule is run records with a Location property of *US* would be put in */category/US*, and records with a Location property of *France* would be put in */category/France*.

Date options set that part of the path to the date the rule is run. For example if it's run on *Monday* then:

-   Short Day \{date.day.short\} = Mon
-   Long Day \{date.day.long\} = Monday

By default  autocomplete options are based on the first two letters you type, and only five options for each type of suggestion are offered at a time. Type more letters to narrow down the displayed options.

**Tip:** This can be configured in the properties file.

Available autocomplete options are:

-   Last accessed = *node.cm:accessed*
-   When created = *node.cm:created*
-   Creator = *node.cm:creator*
-   Description = *node.cm:description*
-   Last modified = *node.cm:modified*
-   Modifier = *node.cm:modifier*
-   Name = *node.cm:name*
-   Title = *node.cm:title*
-   Date filed = *node.rma:dateFiled*
-   Unique database ID = *node.rma:dbUniquenessId*
-   Identifier = *node.rma:identifier*
-   Location = *node.rma:location*
-   Original = *node name node.rma:origionalName*
-   Node ID = *node.sys:node-uuid*
-   Store ID = *node.sys:store-identifier*
-   Store protocol = *node.sys:store-protocol*
-   Short Day \(for example, Mon\) = *date.day.short, date.day*
-   Long Day \(for example, Monday\) = *date.day.long*
-   Day Number \(for example, 1\) = *date.day.number*
-   Day of Month \(for example, 18\) = *date.day.month*
-   Day of Year \(for example, 216\) = *date.day.year*
-   Short Month \(for example, Jan\) = *date.month.short*
-   Month \(for example, Jan\) = *date.month*
-   Long Month \(for example, January\) = *date.month.long*
-   Month Number \(for example, 01\) = *date.month.number*
-   Short Year \(for example, 14\) = *date.year.short*
-   Year \(for example, 14\) = *date.year*
-   Long Year \(for example, 2014\) = *date.year.long*
-   Week of Year \(for example, 31\) = *date.year.week*

**Parent topic:**[../tasks/rm-rules-define-create.md](../tasks/rm-rules-define-create.md)

