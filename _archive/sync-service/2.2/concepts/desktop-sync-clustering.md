---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco, Administration, Configuration]
keyword: sync service
---

# Setting up clustering

There are a number of prerequisites and configuration properties to consider when setting up Sync Service in a clustered environment.

**Prerequisites**

For the Sync Service to run in clustered mode, ensure that your Alfresco instance has a clustering license installed and clustering is enabled.

**Clustering through load balancer**

If you're using a load balancer, set the **dsync.service.uris** property to point to the address of the load balancer in `alfresco-global.properties`.

For example, if a load balancer is set up to run on `http://172.29.102.168:9999/alfresco`, modify the `alfresco-global.properties` file to include the following:

```
### DesktopSync ###
dsync.service.uris=http://172.29.102.168:9999/alfresco
```

**Clustering properties**

Configure the sync server cluster by setting the following properties in the `config.yml` file.

**Note:** These properties are optional.

|Clustering property|Example setting|Description|
|-------------------|---------------|-----------|
|`sync.cluster.enabled`|true|This enables clustering.|
|`sync.cluster.interface`|10.256.\*.\*|This specifies a particular network interface to use for clustering. It might be a wildcard value, such as `10.256.*.*`, which means an attempt is made to bind with an interface having an IP address beginning with `10.256`.|
|`sync.clusterCheck.timeout`|4000|This specifies the time to wait for a cluster node ping before marking the node as not alive \(ms\).|
|`sync.hazelcast.password`|synccluster|This specifies the password used by the cluster members to access or join the Hazelcast cluster.|
|`sync.hazelcast.port`|5701|This specifies the port to use for clustering.|
|`sync.hazelcast.autoinc.port`|false|This enables Hazelcast to make several attempts to find a free port, starting at the value of `alfresco.hazelcast.port`. **Note:** It's recommended that you don't use this property.

|
|`sync.hazelcast.max.no.heartbeat.seconds`|15|This specifies the maximum timeout of heartbeat \(in seconds\) for a node to assume it is dead.|
|`sync.hazelcast.bind.any`|false|This specifies if Hazelcast can bind to any/all interfaces. This must be `false` for the `sync.cluster.interface` property to have any meaningful effect.|
|`sync.hazelcast.mancenter.enabled`|false|This specifies if the Hazelcast Management Center \(mancenter\) is being used for cluster management. See the [Hazelcast documentation](https://docs.hazelcast.org/docs/management-center/3.8.4/manual/html/Deploying_and_Starting.html) for more information.|
|`sync.hazelcast.mancenter.url`|http://<host-ip\>:<port\>/mancenter|This specifies the mancenter URL.|

**Note:** Please ensure that:

1.  Clocks on all the sync server nodes \(cluster members\) are synchronized using a tool like [ntp.org](http://www.ntp.org/).
2.  All the cluster nodes have the same settings in `config.yml` file, with one possible exception. Only change the `<sync.cluster.interface>` property, if the IP address of the cluster node is specified instead of a wildcard value.

-   **[AWS Auto Scaling groups](../tasks/ds-aws-autoscaling.md)**  
An AWS Auto Scaling group monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. Using AWS Auto Scaling, it's easy to setup application scaling for multiple resources across multiple services in minutes.

**Parent topic:**[Administering Sync Service](../concepts/desktop-sync.md)

