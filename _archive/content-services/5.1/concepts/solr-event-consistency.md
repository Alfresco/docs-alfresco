---
author: Alfresco Documentation
---

# Eventual consistency

Alfresco One 5.1.5 introduces the concept of eventual consistency to overcome the scalability limitations of in-transaction indexing.

Alfresco One 5.1.5 with the Solr subsystem does not include any transactional indexing. In other words, Alfresco removes the need to have the database and indexes in perfect sync at any given time and relies on an index that gets updated at configurable intervals \(default: 15s\) by Solr itself.

The index tracker takes care of polling Alfresco for new transactions and proceeds to update its index. In this sense, indexes will eventually be consistent with the database.

**Parent topic:**[Solr overview](../concepts/solr-overview.md)

