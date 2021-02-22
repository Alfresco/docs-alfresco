---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Configuring an optional patch for upgrade

This topic describes how to configure an optional patch for upgrade.

To enable the patch that adds the required indexes to the database, set the following property in the alfresco-global.properties file :

```
system.metadata-query-indexes.ignored=false 
```

If this patch has not been run, the metadata query will not be used, regardless of the configuration. This configuration is checked when the subsystem is reloaded.

For a new install, the default behaviour is to use the `TRANSACTIONAL_IF_POSSIBLE` metadata queries. For an upgraded system, the `TRANSACTIONAL_IF_POSSIBLE` metadata queries will be used only if the upgrade patch has been run.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

