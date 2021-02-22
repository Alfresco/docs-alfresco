---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Configuring an optional patch for upgrade

You can configure an optional patch for upgrade.

To use or run a query against the `float`, `double`, or `boolean` property data types, you need to run an optional patch that adds the required indexes to the database. To do so, set the following property in the alfresco-global.properties file:

```
system.metadata-query-indexes-more.ignored=false 
```

When using all other data types \(such as `string`, `integer`, `id`, or `datetime`\), to enable the patch that adds the required indexes to the database, set the following property in the alfresco-global.properties file :

```
system.metadata-query-indexes.ignored=false 
```

If these optional patches are not run, the metadata query will not be used, regardless of the configuration. This configuration is checked when the subsystem is reloaded.

For a new install, the default behaviour is to use the `TRANSACTIONAL_IF_POSSIBLE` metadata queries. For an upgraded system, the `TRANSACTIONAL_IF_POSSIBLE` metadata queries will be used only if the upgrade patches have been run.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

