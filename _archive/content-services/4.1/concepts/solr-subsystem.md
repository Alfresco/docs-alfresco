---
author: Alfresco Documentation
---

# Solr Subsystem

Search is contained within a subsystem, and it has an implementation of either `solr` or `lucene`.

The Alfresco Solr search subsystem supports the same query languages as the embedded Lucene subsystem, and the same fields \(`ID` , `PARENT`\) are also available. The following properties in  the alfresco-global.properties file are related to Solr and are setup as follows, by default:

```
### Solr indexing ###
index.subsystem.name=solr
dir.keystore=${dir.root}/keystore
solr.port.ssl=8443
```

**Note:** As shown above, note that search has been moved into a subsystem with a solr and lucene implementation.

**Parent topic:**[Configuring Solr](../concepts/solr-webapp-config.md)

