---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Setting up repository server cluster

This section describes how to implement an Alfresco One 5.0 repository server cluster.

The repository server cluster consists of the following components:

-   Database server
-   Content store, for example, NFS server
-   Solr server
-   Load balancer
-   Hazelcast mancenter server \(optional\)

-   **[Setting up repository server cluster](../tasks/cluster-setup.md)**  
This topic describes the steps for setting up a repository cluster.
-   **[Starting the repository server cluster](../concepts/cluster-startup.md)**  
This topic describes the process of starting the repository server cluster.
-   **[Testing the cluster](../tasks/cluster-test.md)**  
There are a number of steps required to test repository server clustering.
-   **[Clustering properties](../concepts/cluster-properties.md)**  
Configure the repository server cluster by setting these properties in the alfresco-global.properties file.
-   **[Setting up Hazelcast dashboard \(mancenter\)](../tasks/hazelcast-setup.md)**  
The Hazelcast Management Center \(mancenter\) enables you to monitor and manage your servers running hazelcast. Additionally, mancenter enables you to monitor the overall state of your clusters, and analyze and browse your data structures in detail. This topic describes the instructions for setting up a Hazelcast dashboard \(mancenter\).

**Parent topic:**[Setting up clustering](../concepts/ha-intro.md)

