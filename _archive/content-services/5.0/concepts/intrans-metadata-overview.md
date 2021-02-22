---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Overview of transactional metadata query

Alfresco supports the execution of a subset of the CMIS Query Language \(CMIS QL\) and Alfresco Full Text Search \(AFTS\) queries directly against the database. This feature is called transactional metadata query. This section provides an overview on the transactional metadata query.

Prior to Alfresco One 4.2, the Solr search subsystem does not support transactional indexing. The Solr subsystem is eventually consistent. A change can take anytime to be reflected in the index, ranging from a few seconds to several minutes. Solr indexes the metadata and the content of each updated node, in the order in which the nodes were last changed. The rate at which the nodes are indexed is mainly determined by the time it takes to transform the content and the rate at which the nodes are being changed.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

