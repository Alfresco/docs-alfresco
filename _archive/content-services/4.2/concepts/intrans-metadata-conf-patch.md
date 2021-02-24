---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring an optional patch for upgrade

TMDQ requires two optional patches to be applied for full support. If no patch is applied, there is no database support.

The first patch does not support boolean, float, or double properties, and disjunction \(`OR`\). It adds the database support for TMDQ that is equivalent to a vanilla Alfresco One 5.0 install \(where float, double, boolean, and disjunctions are not supported\).

The second patch adds the database support for TMDQ that is equivalent to a vanilla Alfresco One 5.1 install. Some CMIS QL use cases where `OR` would be used are supported by using `IN`.

From Alfresco One 5.1 onwards, these restrictions can be removed by applying all TMDQ optional patches. The database size would be approximately 25% larger with all indexes applied. CMIS QL does not support URI and HTML types.

To enable the patch that adds the required indexes to the database, set the following property in the alfresco-global.properties file :

```
system.metadata-query-indexes.ignored=false 
```

If this patch has not been run, the metadata query will not be used, regardless of the configuration. This configuration is checked when the subsystem is reloaded.

For a new install, the default behaviour is to use the `TRANSACTIONAL_IF_POSSIBLE` metadata queries. For an upgraded system, the `TRANSACTIONAL_IF_POSSIBLE` metadata queries will be used only if the upgrade patch has been run.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

