---
author: Alfresco Documentation
---

# Eventual consistency

Alfresco 4 introduces the concept of eventual consistency to overcome the scalability limitations of in-transaction indexing.

Alfresco 4 with Solr subsystem, does not to include any transactional indexing operation. In other words, Alfresco 4 removes the requirement to have the database and indexes in perfect sync at any given time and relies on an index that gets updated on a configurable interval \(default: 15s\) by Solr itself.

The index tracker will take care of polling Alfresco for new transactions and will proceed to update its index. In this sense, indexes will eventually be consistent with the database.

**Parent topic:**[Configuring Solr](../concepts/solr-webapp-config.md)

