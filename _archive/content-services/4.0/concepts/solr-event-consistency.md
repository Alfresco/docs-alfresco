---
author: Alfresco Documentation
---

# Eventual Consistency

Alfresco 4 introduces the concept of eventual consistency to overcome the scalability limitations of in-transaction indexing.

An Alfresco installation configured to use Solr does not include any transactional indexing operations, and therefore, the database and indexes does not need to be in perfect synchronization at any given time. It relies on an index that is updated at a configurable interval. By default, this interval is 15 seconds. See [Solr core configuration properties](solrcore-properties-file.md).

The index tracker records all new transactions for Alfresco and updates the indexes. In this way, the indexes will be eventually consistent with the database.

**Parent topic:**[Solr overview](../concepts/solr-overview.md)

