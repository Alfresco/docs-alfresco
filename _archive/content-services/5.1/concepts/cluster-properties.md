---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Clustering properties

Configure the repository server cluster by setting these properties in the alfresco-global.properties file.

**Note:** These properties are optional.

|Clustering property|Example setting|What is it?|
|-------------------|---------------|-----------|
|**alfresco.cluster.enabled**|true|This enables clustering.|
|**alfresco.cluster.interface**|10.256.\*.\*|This specifies a particular network interface to use for clustering. It might be a wildcard value, such as `10.256.*.*`, which means an attempt is made to bind with an interface having an IP address beginning with `10.256.`|
|**alfresco.cluster.nodetype**|Repository Server|This specifies the human-friendly description of the cluster member. It is useful to give a name to the non-clustered servers, such as a transformation server that it attached to the same database as the cluster, but not participating in it \(for example, `alfresco.cluster.enabled=false`\).|
|**alfresco.hazelcast.password**|alfrescocluster|This specifies the password used by the cluster members to access or join the Hazelcast cluster.|
|**alfresco.hazelcast.port**|5701|This specifies the port to use for clustering.|
|**alfresco.hazelcast.autoinc.port**|false|This enables Hazelcast to make several attempts to find a free port starting at the value of `alfresco.hazelcast.port`. **Note:** Alfresco recommends that you do not use this property.

|
|**alfresco.hazelcast.max.no.heartbeat.seconds**|15|This specifies the maximum timeout of heartbeat in seconds for a node to assume it is dead.|

**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

