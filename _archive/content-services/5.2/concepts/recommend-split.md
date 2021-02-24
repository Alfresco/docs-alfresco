---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Recommendations for split architecture

There are a number of recommendations for splitting the Alfresco Content Services architecture in a distributed or clustered environment.

Generally, there are two complementary purposes for distributing or clustering your installation.

-   To achieve redundancy or high availability
-   To provide high-performance and/or throughput

Main decision is involved around when to split and how to split.

**When to split:** There are a number of indicators to help you decide when to split your architecture from a single node environment to a distributed node environment. Some of the indicators to look for include:

-   Low disk space
-   CPU running out of memory
-   High indexing load

**How to split:** When you have decided to upgrade from a single node environment to a distributed or clustered environment, you must find the most appropriate way to cluster architecture.

Consider the following scenarios for setting up a cluster and installing Solr in a cluster.

-   **[Scenario: Clustering for redundancy](../concepts/cluster-scenario-redundancy.md)**  
This is a scenario-based topic describing the clustering architecture for redundancy and high availability of Alfresco Content Services services.
-   **[Scenario: Clustering for high throughput](../concepts/cluster-scenario-throughput.md)**  
This is a scenario-based topic describing the clustering architecture for maximizing throughput of Alfresco Content Services services.

**Parent topic:**[Setting up an Alfresco Share cluster](../concepts/cluster-share.md)

