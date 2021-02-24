---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring Hazelcast between Share instances using multicast

This section describes the configuration of Hazelcast clustering between instances of Share using multicast.

In a load balanced environment, Alfresco Share now uses Hazelcast to provide multicast messaging between the web-tier nodes. As a result, Share caches no longer need to be disabled for any node, simple cache invalidation message are sent to all nodes when appropriate. Each node functions practically as fast as a single Share instance, enhancing the overall performance of Share.

To enable Hazelcast clustering between Share instances, configure the custom-slingshot-application-context.xml file found at <TOMCAT-HOME\>/shared/classes/alfresco/web-extension. This file is used to override the Spring application context beans for Share.

**Note:** An example custom-slingshot-application-context.xml.sample file is provided in the Alfresco distribution, which now includes this configuration.

To enable the Hazelcast cluster messaging, edit this section on each Share Tomcat instance:

```
<!-- 
     Hazelcast distributed messaging configuration - Share web-tier cluster config (3.4.8 and 4.0.1)
     - see http://www.hazelcast.com/docs.jsp
     - and specifically http://www.hazelcast.com/docs/1.9.4/manual/single_html/#SpringIntegration 
-->
<!-- Configure cluster to use either Multicast or direct TCP-IP messaging - multicast is default -->
<!-- Optionally specify network interfaces - server machines likely to have more than one interface -->
<!-- The messaging topic - the "name" is also used by the persister config below -->
<hz:topic id="topic" instance-ref="webframework.cluster.slingshot" name="slingshot-topic"/>
<hz:hazelcast id="webframework.cluster.slingshot">
   <hz:config>
      <hz:group name="slingshot" password="alfresco"/>
      <hz:network port="5801" port-auto-increment="true">
         <hz:join>
            <hz:multicast enabled="true"
                      multicast-group="224.2.2.5"
                      multicast-port="54327"/>
            <hz:tcp-ip enabled="false">
                <hz:members></hz:members>
            </hz:tcp-ip>
         </hz:join>
         <hz:interfaces enabled="false">
            <hz:interface>192.168.1.*</hz:interface>
         </hz:interfaces>
      </hz:network>
   </hz:config>
</hz:hazelcast>

<bean id="webframework.slingshot.persister.remote" class="org.alfresco.web.site.ClusterAwarePathStoreObjectPersister" parent="webframework.sitedata.persister.abstract">
   <property name="store" ref="webframework.webapp.store.remote" />
   <property name="pathPrefix"><value>alfresco/site-data/${objectTypeIds}</value></property>
   <property name="hazelcastInstance" ref="webframework.cluster.slingshot" />
   <property name="hazelcastTopicName"><value>slingshot-topic</value></property>
</bean>

<bean id="webframework.factory.requestcontext.servlet" class="org.alfresco.web.site.ClusterAwareRequestContextFactory" parent="webframework.factory.base">
   <property name="linkBuilderFactory" ref="webframework.factory.linkbuilder.servlet" />
   <property name="extensibilityModuleHandler" ref="webscripts.extensibility.handler" />
   <property name="dependencyHandler" ref="dependency.handler" /> 
   <property name="clusterObjectPersister" ref="webframework.slingshot.persister.remote" />
</bean> 
```

This configuration enables the Hazelcast Spring integration, which in turn, starts the Hazelcast server. The Hazelcast server is easily configurable and can use either multicast \(default\) or [TCP-IP direct](../tasks/hazelcast-cluster-tcp.md), if preferred. For more information, see the [Hazelcast Documentation](http://hazelcast.org/docs/latest/manual/html-single/hazelcast-documentation.html#spring-integration).

If this configuration is enabled, the Share instance becomes a cluster node and Hazelcast is started. If this configuration is disabled \(such as, for a default install\), then Hazelcast is not started. While using Share, only when any of the following actions occur, the cache invalidation messages will be sent from the affected node to other nodes in the cluster:

-   an existing site/user dashboard layout is modified
-   new site or user dashboard is created
-   runtime application properties are changed

**Note:** For activating the default set up, apply identical configuration to each Share node.

The following is a sample output that you get when you start Share:

```
INFO: /192.168.2.8:5801 [slingshot] Hazelcast 1.9.4.6 (20120105) starting at Address[192.168.2.8:5801]
19-Jan-2012 13:58:57 com.hazelcast.system
INFO: /192.168.2.8:5801 [slingshot] Copyright (C) 2008-2011 Hazelcast.com
19-Jan-2012 13:58:57 com.hazelcast.impl.LifecycleServiceImpl
INFO: /192.168.2.8:5801 [slingshot] Address[192.168.2.8:5801] is STARTING
19-Jan-2012 13:58:59 com.hazelcast.impl.MulticastJoiner
INFO: /192.168.2.8:5801 [slingshot]
Members [1] {
        Member [192.168.2.8:5801] this
}
19-Jan-2012 13:58:59 com.hazelcast.impl.management.ManagementCenterService
INFO: /192.168.2.8:5801 [slingshot] Hazelcast Management Center started at port 5901.
19-Jan-2012 13:58:59 com.hazelcast.impl.LifecycleServiceImpl
INFO: /192.168.2.8:5801 [slingshot] Address[192.168.2.8:5801] is STARTED
```

The above message shows that the configuration has successfully initialized Hazelcast between Share instances.

**Parent topic:**[Setting up Share cluster](../concepts/cluster-share.md)

**Related information**  


[Configuring Hazelcast between Share instances using TCP Direct](../tasks/hazelcast-cluster-tcp.md)

