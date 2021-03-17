---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Overview of transactional metadata query

The noindex subsystem, also referred to as TMDQ, supports queries only against the database. TMDQ supports cases where eventual consistency is not efficient and there is a short delay between when the content is added, updated, or deleted, and when the index is updated to reflect this.

Improvements to tracking in the Alfresco Solr 4 has reduced the lag to metadata indexing. Metadata updates are less impacted by content indexing or the bulk updates to `PATH` queries for move, rename, link and unlink operations.

Let's compare the Lucene and Solr search subsystems with respect to transactional metadata query, prior to Alfresco One 4.2.

The Lucene search subsystem supports transactional indexing on a single machine. It indexes your transactions when you commit them. However, in a clustered environment, where there is more than one machine, the Lucene index does not support transactional query. This is because while one machine might have finished tracking and be up-to-date, another may still be catching up and be out of date.

On the other hand, the Solr search subsystem does not support transactional indexing. The Solr subsystem is eventually consistent. A change may take anytime to be reflected in the index, ranging from a few seconds to several minutes. Solr indexes the metadata and the content of each updated node, in the order in which the nodes were last changed. The rate at which the nodes are indexed is mainly determined by the time it takes to transform the content and the rate at which the nodes are being changed.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

