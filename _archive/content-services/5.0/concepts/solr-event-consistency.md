---
author: Alfresco Documentation
---

# Eventual consistency

Alfresco One 5.0 introduces the concept of eventual consistency to overcome the scalability limitations of in-transaction indexing.

Alfresco One 5.0 with the Solr 4 subsystem does not include any transactional indexing. In other words, Alfresco removes the need to have the database and indexes in perfect sync at any given time and relies on an index that gets updated at configurable intervals \(default: 15s\) by Solr 4 itself.

The index tracker takes care of polling Alfresco for new transactions and proceeds to update its index. In this sense, indexes will eventually be consistent with the database.

**Parent topic:**[Solr overview](../concepts/solr-overview.md)

