---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Triggering dumps by using JMX

Schema dumps can also be triggered manually by using a JMX client.

In addition to automatic dumping, dumps can be manually invoked by use of the JMX interface.

The JMX category **Alfresco**, **DatabaseInformation**, **SchemaExport** contains two operations:

1.  `java.util.List dumpSchemaToXML()`
2.  `java.util.List dumpSchemaToXML(String prefixList)`

The first operation takes no parameters and when invoked will create three dump files one for each prefix 'alf\_' and 'act\_'. The prefix means that only tables and sequences whose names begin with the prefix will be included in the dump. Related items, such as the indexes belonging to a particular table, will be dumped regardless of name.

The second variation takes a single String parameter and is a comma-separated list of prefixes that you wish to dump. If this operation were invoked with the parameter "alf\_acl\_, alf\_node\_" for example, then two files would be created \(one for each prefix\). The tables dumped in the first file would include `alf_acl_change_set` and `alf_acl_member`. Tables in the second file would include `alf_node_aspects` and `alf_node_assoc`. Neither file would include `alf_locale` or `alf_permission` since they do not carry one of the supplied prefixes.

Both of these calls will result in the log showing the location of the dumped files, but they also return a `List` of path names. JConsole will helpfully display these lists in a copy/paste friendly manner.

**Parent topic:**[Performing schema dumps](../concepts/schema-diff-tool-dumps.md)

