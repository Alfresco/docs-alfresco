---
author: Alfresco Documentation
---

# Solr 6 subsystem

Search is contained in a subsystem and it has an implementation of Solr 6.

Just like all previous versions of Solr, the activation and configuration of the Solr 6 subsystem can be done either by using the alfresco-global.properties file or the [Admin Console](../tasks/adminconsole-searchservice-solr6.md).

Set the following Solr-related properties in the alfresco-global.properties file.

```
### Solr indexing ###
index.subsystem.name=solr6
solr.secureComms=none
solr.port=8983
solr.host=localhost
solr.baseUrl=/solr
```

These configuration properties are used by Alfresco to talk to Solr 6.

**Parent topic:**[Installing and configuring Solr 6](../concepts/solr6-install-config.md)

