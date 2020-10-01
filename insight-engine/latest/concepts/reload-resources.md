---
title: Actions for Reloading Resources
---
The following actions are for reloading property files in memory for SOLR Cores.

## `updateShared`

To update memory loading from the shared.properties file for each core.

```http
http://localhost:8983/solr/admin/cores?action=updateShared
```

## `log4j`

To update memory loading from the log4j.properties file for each core.

```http
http://localhost:8983/solr/admin/cores?action=log4j
```
