---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring Hazelcast between Alfresco Share instances

This information describes the configuration of Hazelcast clustering between instances of Share.

In a load balanced environment, Share now uses Hazelcast to provide multicast messaging between the web-tier nodes. As a result, Share caches no longer need to be disabled for any node, simple cache invalidation message are sent to all nodes when appropriate. Each node functions practically as fast as a single Share instance, enhancing the overall performance of Share.

To enable Hazelcast clustering between Share instances, configure the custom-slingshot-application-context.xml file found at < TOMCAT-HOME\>/shared/classes/alfresco/web-extension. This file is used to override the Spring application context beans for Share.

**Note:** An example custom-slingshot-application-context.xml.sample file is provided in the distribution, which now includes this configuration.

To enable the Hazelcast cluster messaging, edit this section on each Share Tomcat instance:

```
<?xml version='1.0' encoding='UTF-8'?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:hz="http://www.hazelcast.com/schema/spring"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
                http://www.hazelcast.com/schema/spring
                http://www.hazelcast.com/schema/spring/hazelcast-spring-2.4.xsd">
   
   <!--
        Hazelcast distributed messaging configuration - Share web-tier cluster config
        - see http://www.hazelcast.com/docs.jsp
        - and specifically http://docs.hazelcast.org/docs/2.4/manual/html-single/#SpringIntegration
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
   
   <bean id="webframework.cluster.clusterservice" class="org.alfresco.web.site.ClusterTopicService" init-method="init">
      <property name="hazelcastInstance" ref="webframework.cluster.slingshot" />
      <property name="hazelcastTopicName"><value>slingshot-topic</value></property>
   </bean>

</beans> 
```

This configuration enables the Hazelcast Spring integration, which in turn, starts the Hazelcast server. The Hazelcast server is easily configurable and can use either multicast \(default\) or TCP-IP direct, if preferred. For more information, see the [Hazelcast Documentation](http://www.hazelcast.com/docs.jsp).

If this configuration is enabled, the Share instance becomes a cluster node and Hazelcast is started. If this configuration is disabled \(such as, for a default install\), then Hazelcast is not started. While using Share, only when any of the following actions occur, the cache invalidation messages will be sent from the affected node to other nodes in the cluster:

-   an existing site/user dashboard layout is modified
-   new site or user dashboard is created
-   runtime application properties are changed

**Note:** For activating the default set up, apply identical configuration to each Share node.

The following is a sample output that you get when you start Share:

```
INFO: /127.0.0.1]:5801 [slingshot] Hazelcast Community Edition 2.4 (20121017) starting at Address[127.0.0.1]:5801
Dec 13, 2014 12:09:36 PM com.hazelcast.system
INFO: /127.0.0.1]:5801 [slingshot] Copyright (C) 2008-2012 Hazelcast.com
Dec 13, 2014 12:09:36 PM com.hazelcast.impl.LifecycleServiceImpl
INFO: /127.0.0.1]:5801 [slingshot] Address[127.0.0.1]:5801 is STARTING
Dec 13, 2014 12:09:37 PM com.hazelcast.impl.TcpIpJoiner
INFO: /127.0.0.1]:5801 [slingshot] Connecting to possible member: Address[127.0.0.1]:5802
Dec 13, 2014 12:09:37 PM com.hazelcast.impl.TcpIpJoiner
INFO: /127.0.0.1]:5801 [slingshot] Connecting to possible member: Address[127.0.0.1]:5803
Dec 13, 2014 12:09:37 PM com.hazelcast.nio.SocketConnector
INFO: /127.0.0.1]:5801 [slingshot] 

Members [1] {
	Member [127.0.0.1]:5801 this
}

Dec 13, 2014 12:09:38 PM com.hazelcast.impl.management.ManagementCenterService
INFO: /127.0.0.1]:5801 [slingshot] Hazelcast Management Center started at port 5901.
Dec 13, 2014 12:09:38 com.hazelcast.impl.LifecycleServiceImpl
INFO: /127.0.0.1]:5801 [slingshot] Address[127.0.0.1]:5801 is STARTED
```

The message shows that the configuration has successfully initialized Hazelcast between Share instances.

**Parent topic:**[Setting up an Alfresco Share cluster](../concepts/cluster-share.md)

