---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Clustering prerequisites when upgrading to Alfresco 4.2

Consider these prerequisites when upgrading to Alfresco 4.2 in a clustered environment.

Before upgrading, ensure that all files and configuration are backed up. Any customization\(s\) that you have made; for example, creation of custom caches, might need to be reapplied using the new Alfresco 4.2 clustering infrastructure.

The following libraries are no longer used in Alfresco 4.2, so any configuration related to these libraries should be removed before upgrading:

-   JGroups
-   EHCache

Follow the steps below to remove the configuration not supported in version 4.2:

1.  Browse to the <classpathRoot\> directory.

    For example, for Tomcat 6, browse to the $TOMCAT\_HOME/shared/classes/alfresco/extension/ directory.

2.  Delete the ehcache-custom.xml file.

3.  Browse to the <classpathRoot\> directory.

    For example, for Tomcat 6, browse to the $TOMCAT\_HOME/shared/classes/ directory.

4.  Open the alfresco-global.properties file.

5.  Remove the following legacy properties from the alfresco-global.properties file:

    -   `alfresco.ehcache.rmi.hostname`
    -   `alfresco.ehcache.rmi.port`
    -   `alfresco.ehcache.rmi.remoteObjectPort`
    -   `alfresco.jgroups.defaultProtocol`
    -   `alfresco.jgroups.bind_address`
    -   `alfresco.jgroups.bind_interface`
    -   `alfresco.tcp.start_port`
    -   `alfresco.tcp.initial_hosts`
    -   `alfresco.tcp.port_range`
    -   `alfresco.udp.mcast_addr`
    -   `alfresco.udp.mcast_port`
    -   `alfresco.udp.ip_ttl`
    -   `filesystem.cluster.enabled`
    -   `filesystem.cluster.configFile`
6.  Browse to the <classpathRoot\> directory.

    For example, for Tomcat 6, browse to the $TOMCAT\_HOME/shared/classes/alfresco/extension directory.

7.  Remove the Hazelcast configuration file, hazelcastConfig.xml, as a centralised configuration is now included within the alfresco.war deployment archive.

    The `filesystem.cluster.configFile` property mentioned in Step 5 refers to the hazelcastConfig.xml file.

8.  After you have performed all the above steps, if you want to initiate clustering, see [Setting up repository server cluster](../concepts/cluster-overview.md) for the instructions on installing an Alfresco 4.2 cluster.


**Parent topic:**[Setting up clustering](../concepts/ha-intro.md)

