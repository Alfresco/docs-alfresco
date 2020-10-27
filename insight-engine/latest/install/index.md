---
title: Overview
---

Installing Search and Insight Engine introduces additional features, including new sharding methods and sharding with SSL. Mutual TLS is not just used to encrypt data in transit, it is also used as an authentication mechanism between the repository and Search and Insight Engine.

It is possible to deploy Alfresco Content Services without mutual TLS between the repository and Search and Insight Engine, however this will expose internal APIs that give full access to the repository without authentication. In such a setup, it is critical to properly protect these APIs.

You may choose to secure Search and Insight Engine with SSL.

> **Note:** When choosing to secure Search and Insight Engine with SSL, be aware that there is a known issue when using Solr 6 where the SSL truststore and keystore passwords are visible as text in the Solr 6 process arguments. Alfresco recommends that you ensure the server running Solr 6 is security hardened and access is restricted to admin users only. For more information, see [Apache](https://issues.apache.org/jira/browse/SOLR-8897){:target="_blank"}.

> **Important:** Alfresco strongly recommends that you use firewalls and other infrastructure means to ensure that the Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search and Insight Engine.

You can download the Search and Insight Engine installation file from the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}. Click **Downloads**, and then select the version of the product you require.

## Prerequisites

The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco Content Services.

Before you install Search and Insight Engine you must install Alfresco Content Services 6.2 or later. You can install Search and Insight Engine using the distribution zip and docker compose, but the docker compose method of installation is only for development and test environments.

See [Supported platforms]({% link insight-engine/latest/support/index.md %}) for information about prerequisites and requirements.

## Solr overview

Alfresco Content Services supports use of the Solr search platform for searching within the repository.

Solr is an open source enterprise search platform that uses lucene as indexing and search engine. Solr is written in Java and runs as a standalone search server. Alfresco Content Services sends HTTP and XML input to Solr and searches for content. Solr updates the cores or indexes and returns the result of the query in XML or JSON format.

In all previous Alfresco Content Services versions, `Solr.war` was bundled with the repository. With Alfresco Content Services 5.2.3, you no longer deploy a `Solr.war` to your application server. Solr 6 is an independently executable standalone application powered by a Jetty server. Alfresco Content Services 5.2 uses Solr 4 as the default search service index. For an improved and efficient search functionality, you can upgrade to Alfresco Content Services with Alfresco Search and Insight Engine (Solr 6).

There are two cores or indexes in Solr:

**alfresco**: used for searching all live content stored at `<SOLR_HOME>/solrhome/alfresco` within the Solr search server.

**archive**: used for searching content that has been marked as deleted at `<SOLR_HOME>/solrhome/archive` within the Solr search server.

![]({% link insight-engine/images/solr.png %})

**Important:** For security reasons, it is advised that you generate a new set of keys to secure your Solr communication and access to the Solr Admin Console.

For more information, see [Configuring using the Admin Console]({% link insight-engine/latest/config/index.md %} and [Secure keys]({% link insight-engine/latest/config/keys.md %}.

## Eventual consistency

Alfresco Content Services 6.2 introduces the concept of eventual consistency to overcome the scalability limitations of in-transaction indexing.

Here's some background information on the evolution of eventual consistency in Alfresco:

* Alfresco Enterprise 3.x supported a transactional index of metadata using Apache Lucene.
* Alfresco Enterprise 4.0 introduced an eventually consistent index based on Apache Solr 1.4.
* Alfresco One 5.0 moved to Solr 4 and also introduced transaction metadata query (TMDQ). TMDQ was added specifically to support the transactional use cases that used to be addressed by the Lucene index in the previous versions. TMDQ uses the database and adds a collection of required indexes as optional patches.
* Alfresco One 5.1 supports a later version of Solr 4 and made improvements to TMDQ.
* Alfresco Content Services 5.2.x supports Solr 4, Solr 6, and TMDQ.
* Alfresco Content Services 6.x supports Solr 6, and TMDQ

When changes are made to the repository they are picked up by Solr via a polling mechanism. The required updates are made to the Index Engine to keep the two in sync. This takes some time. The Index Engine may well be in a state that reflects some previous version of the repository. It will eventually catch up and be consistent with the repository (assuming the repository is not constantly changing).

When a query is executed, it can happen in any one of the following ways:

* By default, if the query can be executed against the database, it will be.
* If not, the query goes to the Solr index.

There are some minor differences between the results. For example, collation and how permission are applied. Some queries are not supported by TMDQ, for example, facets, full text, in tree, and structure. If a query is not supported by TMDQ, it can only go to the Index Engine.

## What does eventual consistency mean?

If the Index Engine is up to date, a query against the database or the Index Engine will see the same state. The results may still be slightly different. If the index engine is behind the repository, the query may produce results that do not, as yet, reflect all the changes that have been made to the repository.

## Why the database and Index Engine may not be in sync

### Nodes may have been deleted

* Nodes are present in the index but deleted from the repository
  * Deleted nodes are filtered from the results when they are returned from the query. So, you may see a *short page* of results even though there are more results.
  * The result count may be lower than the facet counts.
  * Faceting will include the *to be deleted nodes* in the counts.

### Nodes may have been added

* Nodes have been added to the repository but are not yet in the index at all. These new nodes will not be found in the results or included in faceting.
* Nodes have been added to the repository but only the metadata is present in the index. These nodes cannot be found by the content.

### Nodes metadata has changed

* The index reflects out of date metadata.
  * Some out of date nodes may be in the results when they should not be.
  * Some out of date nodes may be missing from the results when they should not be.
  * Some nodes may be counted in the wrong facets due to out of date metadata.
  * Some nodes may be ordered using out of date metadata.

### Node Content has changed

* The index reflects out of date content but the metadata is up to date.
  * Some out of date nodes may be in the results when they should not be.
  * Some out of date nodes may be missing from the results when they should not be.

### Node Content and metadata has changed

* The index reflects the out of date metadata and content.
  * The index reflects out of date content (the metadata is updated first).
  * Some out of date nodes may be in the results when they should not be.
  * Some out of date nodes may be missing from the results when they should not be.
  * Some nodes may be counted in facets due to out of date metadata.

### An update has been made to an ACL (adding an access control entry to a node)

* The old ACL is reflected in queries
  * Some out of date nodes may be in the results when they should not be.
  * Some out of date nodes may be missing from the results when they should not be.
  * The ACLs that are enforced may be out of date but are consistent with the repository state when the node was added to the index. The node and ACL may be out of date but permission for the content and metadata is consistent with this prior state. For nodes in the version index, they are assigned the ACL of the *live* node when the version was added to the index.

### A node may be continually updated

* It is possible that such a node may never appear in the index.
* By default, when the Index Engine tracks the repository, it only picks up changes that are older than one second. This is configurable. For example, if we are indexing node 27 in state 120, we only add information for node 27 if it is still in that state. If the node has moved on to state 236, we will skip node 27 until we have indexed state 236 (assuming it has not moved on again). This avoids pulling *later* information into the index which may have an updated ACE or present an overall view inconsistent with a repository state. An out-of-date state means we have older information in the index.

## Dealing with eventual consistency

Handling eventual consistency varies from one situation to another. If you need a transactional answer, the default behaviour will give you one, if it can. For some queries, it is not possible to get a transactional answer. If you are using Solr 6, the response from the [Search public LINK API](https://docs.alfresco.com/6.1/concepts/search-api.html) will return some information to help. It will report the index state consistent with the query.

```json
"context": {
    "consistency": {
        "lastTxId": 18
    }
},
```

This can then be compared with the last transaction on the repository. If they are equal, the query was consistent. The repository state for each node is known when it is added to the index.

If your query goes to the Index Server and it is not up to date, it could be any of the reasons described [Why the database and Index Engine may not be in sync](#why-the-database-and-index-engine-may-not-be-in-sync).

Using the Index Engine based on Solr 6 gives better consistency for metadata updates. Some update operations that infrequently require many nodes to be updated are now done in the background. These are mostly `move` and `rename` operations that affect structure. So, a node is now renamed quickly. Any structural information that is consequently changed on all of its children is done afterwards.

Search and Insight Engine 1.0 also includes improved commit coordination and concurrency improvements. This reduces the time for the changes to be reflected in the index. Some of the delay also comes from the work that Solr does before an index goes live. This can be reduced by tuning. The cost is usually a query performance hit later.

For most use cases, eventual consistency is perfectly fine. For transactional use cases, TMDQ is the only solution unless the index and repository are in sync.
