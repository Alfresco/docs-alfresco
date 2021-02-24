---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring Hazelcast for JLAN Clustering

This section describes the configuring options available for JLAN clustering.

The Hazelcast library provides support for distributed data structures and communications channels that allow certain components of the Alfresco content repository server to function properly within a clustered environment. While configuring JLAN clustering, if you wish to cluster CIFS, FTP or NFS protocols with an Alfresco repository, you will need to configure the `hazelcastConfig.xml` file. This file is located at alfresco/tomcat/shared/classes/alfresco/extension.

You can configure the `hazelcastConfig.xml` file to create separate clusters by specifying the group-name and group-password. Also, you need to specify the network interface and multicast discovery option that Hazelcast should use. For more information, see the [Hazelcast Documentation](http://www.hazelcast.com/docs.jsp).

```
<group>
   <name>dev</name>
   <password>dev-pass</password>
</group>
<network>
   <port auto-increment="true">5701</port>
   <join>
      <multicast enabled="true">
        <multicast-group>224.2.2.3</multicast-group>
        <multicast-port>54327</multicast-port>
      </multicast>
      <tcp-ip enabled="false">
        <interface>127.0.0.1</interface>
      </tcp-ip>
   </join>
      <interfaces enabled="true">
        <interface>10.244.10.119</interface>
      </interfaces>
```

To enable hazelcast clustering, you need to set the following in your alfresco-global.properties file:

```
filesystem.cluster.enabled=true 
filesystem.cluster.configFile=c:\\temp\\hazelcastConfig.xml 
```

where `filesystem.cluster.enabled` allows you to enable or disable the filesystem cluster and `filesystem.cluster.configFile` is the location of Hazelcast configuration file.

**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

