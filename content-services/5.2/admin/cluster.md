---
title: Setting up clustering
---

You can implement multiple Alfresco Content Services instances in a clustered environment.

A cluster represents a collection of nodes. Clustering is implemented to provide high scalability and resilience. Improved performance is enhanced through redundant nodes that provide services when other nodes fail. When integrated with a load balancer, performance is enhanced by distributing, or balancing, server workload across a collection of nodes.

-   **[Prerequisites for upgrades](#prerequisites-for-upgrades)**  
There are a number of prerequisites for upgrading from a version of Alfresco Content Services prior to 4.2 to 5.2.7 in a clustered environment.
-   **[Components of an Alfresco Content Services solution](#components-of-an-alfresco-content-services-solution)**  
This information gives an overview of the main components of your Alfresco Content Services solution.
-   **[Setting up an Alfresco Share cluster](#setting-up-an-alfresco-share-cluster)**  
Use this information to configure a cluster for Share.
-   **[Setting up repository server cluster](#setting-up-repository-server-cluster)**  
Use this information to implement a repository server cluster.
-   **[CIFS clustering through load balancer](#cifs-clustering-through-load-balancer)**  
Follow these steps to configure CIFS clustering through the load balancer.
-   **[Tracking clustering issues](#tracking-clustering-issues)**  
Use this information to track clustering issues.

## Prerequisites for upgrades

There are a number of prerequisites for upgrading from a version of Alfresco Content Services prior to 4.2 to 5.2.7 in a clustered environment.

Before upgrading, ensure that all files and configuration are backed up. Any customization(s) that you have made, for example, creation of custom caches, might need to be reapplied using the new Alfresco Content Services 5.2.7 clustering infrastructure.

The following libraries are no longer used in Alfresco Content Services 4.2 onwards, so any configuration related to these libraries should be removed before upgrading:

-   JGroups
-   EHCache

> **Note:** You do not need to follow these steps if you are upgrading from Alfresco Content Services 4.2 to Alfresco Content Services 5.2.7. This information is only relevant if you are upgrading from any version prior to 4.2.

Follow the steps to remove the configuration not supported in version 5.2.7:

1.  Browse to the `<classpathRoot>` directory.

    For example, for Tomcat 7, browse to the `$TOMCAT_HOME/shared/classes/alfresco/extension/` directory.

2.  Delete the `ehcache-custom.xml` file.

3.  Browse to the `<classpathRoot>` directory.

    For example, for Tomcat 7, browse to the `$TOMCAT_HOME/shared/classes/` directory.

4.  Open the `alfresco-global.properties` file.

5.  Remove the following legacy properties from the `alfresco-global.properties` file:

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

6.  Browse to the `<classpathRoot>` directory.

    For example, for Tomcat 7, browse to the $TOMCAT_HOME/shared/classes/alfresco/extension directory.

7.  Remove the Hazelcast configuration file, `hazelcastConfig.xml`, as a centralized configuration is now included within the `alfresco.war` deployment archive.

    The `filesystem.cluster.configFile` property mentioned in Step 5 refers to the `hazelcastConfig.xml` file.

8.  After you have performed all the specified steps, if you want to initiate clustering, see [Setting up repository server cluster](#setting-up-repository-server-cluster) for the instructions on installing an Alfresco Content Services 5.2.7 cluster.

## Components of a Content Services solution

This information gives an overview of the main components of your Alfresco Content Services solution.

Within your solution, you have components such as Alfresco Share, Alfresco Content Services, database, indexes (Solr), transformations, and the content store. As illustrated in the following diagram, some of these components can be clustered while others are optional.

![]({% link content-services/images/52-alf-solution.png %})

**Clusterable components**

-   Alfresco Share
-   Alfresco Content Services
-   Content store
-   Database

**Non-clusterable and replicable components**

-   Transformation Server
-   Solr index
-   Solr 4 index

It is important to decide how many installations you need and which of the specified components you will put on which node.

To explain this further, let's consider an example. Assume that your application has six nodes. Ideally, it's recommended that you should have one component on each node. So, for example, node1 has database, node2 is content store, node3 is Alfresco Content Services, node4 is Alfresco Share, node5 is Solr, and node6 is Transformation Server.

Use the following table as a template to design your solution.

|Clusters/ nodes|Alfresco components|DNS|IP address (optional)|Additional information|
|---------------|-------------------|---|-----------------------|----------------------|
|1|Database| | | |
|2|Content store| | | |
|3|Alfresco Content Services| | | |
|4|Alfresco Share| | | |
|5|Solr| | | |
|5|Solr 4| | | |
|6|Transformation Server| | | |

However, you can configure your distribution differently. Each distribution and clustering solution has its own advantages and disadvantages. To configure distribution and clustering optimally, contact [Alfresco Consulting](https://www.alfresco.com/services/consulting){:target="_blank"} or your Alfresco certified partner.

For a better understanding of initiating clustering for high availability and high throughput, see [Scenario: Clustering for redundancy](#scenario:-clustering-for-redundancy) and [Scenario: Clustering for high throughput](#scenario:-clustering-for-high-throughput).

## Setting up an Alfresco Share cluster

Use this information to configure a cluster for Share.

-   **[Configuring Hazelcast between Alfresco Share instances](#configuring-hazelcast-between-alfresco-share-instances)**  
This information describes the configuration of Hazelcast clustering between instances of Share.
-   **[Configuring Alfresco Share clustering](#configuring-alfresco-share-clustering)**  
These steps are required for cluster configuration for Share. If you are using an HTTP load-balancing mechanism in front of a clustered installation, ‘sticky’ routing must be enabled for the HTTP requests made by the Share tier to the repository tier (the /alfresco application).
-   **[Recommendations for split architecture](#recommendations-for-split-architecture)**  
There are a number of recommendations for splitting the Alfresco Content Services architecture in a distributed or clustered environment.

### Configuring Hazelcast between Alfresco Share instances

This information describes the configuration of Hazelcast clustering between instances of Share.

In a load balanced environment, Share now uses Hazelcast to provide multicast messaging between the web-tier nodes. As a result, Share caches no longer need to be disabled for any node, simple cache invalidation message are sent to all nodes when appropriate. Each node functions practically as fast as a single Share instance, enhancing the overall performance of Share.

To enable Hazelcast clustering between Share instances, configure the `custom-slingshot-application-context.xml` file found at `<TOMCAT-HOME>/shared/classes/alfresco/web-extension`. This file is used to override the Spring application context beans for Share.

> **Note:** An example `custom-slingshot-application-context.xml.sample` file is provided in the distribution, which now includes this configuration.

To enable the Hazelcast cluster messaging, edit this section on each Share Tomcat instance:

```xml
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

This configuration enables the Hazelcast Spring integration, which in turn, starts the Hazelcast server. The Hazelcast server is easily configurable and can use either multicast (default) or TCP-IP direct, if preferred. For more information, see the [Hazelcast Documentation](https://www.hazelcast.com/docs.jsp){:target="_blank"}.

If this configuration is enabled, the Share instance becomes a cluster node and Hazelcast is started. If this configuration is disabled (such as, for a default install), then Hazelcast is not started. While using Share, only when any of the following actions occur, the cache invalidation messages will be sent from the affected node to other nodes in the cluster:

-   an existing site/user dashboard layout is modified
-   new site or user dashboard is created
-   runtime application properties are changed

> **Note:** For activating the default set up, apply identical configuration to each Share node.

The following is a sample output that you get when you start Share:

```text
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

### Configuring Alfresco Share clustering

These steps are required for cluster configuration for Share. If you are using an HTTP load-balancing mechanism in front of a clustered installation, ‘sticky’ routing must be enabled for the HTTP requests made by the Share tier to the repository tier (the `/alfresco` application).

This can be achieved in one of two ways:

1.  Hard-wire each /share instance to its own /alfresco instance, bypassing the load balancer.

    This can be achieved by populating each `share-config-custom.xml` file with a host name and port number that is not behind your load balancing mechanism.

2.  If NTLM or Kerberos authentication is enabled with SSO, then Share will use cookie-based sessions and you can configure your load balancer to use sticky routing using the JSESSIONID cookie.

    To enable NTLM or Kerberos with SSO, refer to the instructions in [Configuring authentication]({% link content-services/5.2/admin/auth-sync.md %}#configuring-authentication-subsystems) to configure alfrescoNtlm, passthru, or Kerberos authentication, and set either `ntlm.authentication.sso.enabled=true` or `kerberos.authentication.sso.enabled=true`).

    > **Note:** If you are configuring a cluster, refer to [Setting up clustering](#setting-up-clustering).

### Recommendations for split architecture

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

-   **[Scenario: Clustering for redundancy](#scenario:-clustering-for-redundancy)**  
This is a scenario-based topic describing the clustering architecture for redundancy and high availability of Alfresco Content Services services.
-   **[Scenario: Clustering for high throughput](#scenario:-clustering-for-high-throughput)**  
This is a scenario-based topic describing the clustering architecture for maximizing throughput of Alfresco Content Services services.

#### Scenario: Clustering for redundancy

This is a scenario-based topic describing the clustering architecture for redundancy and high availability of Alfresco Content Services services.

This scenario shows a single repository database and content store, and two Tomcat nodes/web servers on two separate machines accessing the content simultaneously. The configuration does not guard against the content store or database failure, but allows multiple servers to share the web load, and provides redundancy in case of a server failure. Each server has local indexes (in the local content store).

This is the simplest cluster to set up and is ideal for small-scale installations. A cluster consisting of two or more machines working together provides a higher level of availability, reliability, and scalability than can be obtained from a single node.

![]({% link content-services/images/cluster-redundancy.png %})

A hardware load balancer balances the web requests among multiple servers. The load balancer must support 'sticky' sessions so that each client always connects to the same server during the session. The content store and database will reside on separate servers, which allows us to use alternative means for content store and database replication.

> **Note:** All the servers in a cluster should have static IP addresses assigned to them.

#### Scenario: Clustering for high throughput

This is a scenario-based topic describing the clustering architecture for maximizing throughput of Alfresco Content Services services.

This setup shows a single repository database and content store. There are four nodes with Alfresco Content Services/Alfresco Share and two nodes with Solr, all accessing the content simultaneously. This set up provides a higher level of availability, reliability, and scalability, thereby maximizing the throughput of various services. Nodes in a cluster are positioned behind a load balancer that delegates requests to cluster members based on any one member’s ability/availability to handle the load.

Each Share instance is deployed into its own Tomcat servlet container. Alfresco Content Services services and CPU runtime footprint are optimized for high throughput under heavy concurrency with such a deployment. The load balancer fronts the cluster, and directs traffic to the member of the cluster most able to handle the current request.

> **Note:** All the servers in a cluster should have static IP addresses assigned to them.

![]({% link content-services/images/cluster-throughput.png %})

In this deployment scenario the following flows are present:

-   Client flow:
    -   Client sends the request to the main load balancer to reach Share application.
    -   Main load balancer analyses the load and redirects the client to one of Share hosts.
    -   Main load balancer uses the JSESSIONID cookie to stick the client to one of Share nodes.
    -   Share sends the web scripts requests to the local repository instance, renders the page, and returns it to the user via the main load balancer.

-   Alfresco Content Services internal flow:
    -   Repositories intercommunication is done via Hazelcast to replicate caches.
    -   Repositories share the same contentstore available via NFS/SAMBA share.
    -   Repositories share the same database schema.

-   Solr flow:
    -   Tracking tier: Two Solr instances periodically query repositories to detect new transactions, fetch new content, and build local indexes. Tracking is done through Solr load balancer, which analyses the load and distributes it across the repositories.
    -   Search tier: Four repository instances query two Solr instances on demand through the Solr load balancer.

-   **[Installing and configuring Alfresco Content Services Nodes](#installing-and-configuring-alfresco-content-services-nodes)**  
Use this information to install and configure nodes in a cluster based on the scenario described in Scenario: Clustering for high throughput.
-   **[Installing and configuring Solr nodes](#installing-and-configuring-solr-nodes)**  
This topic describes the instructions for installing and configuring Solr nodes in a cluster.

##### Installing and configuring Alfresco Content Services Nodes

Use this information to install and configure nodes in a cluster based on the scenario described in Scenario: Clustering for high throughput.

1.  Install the Alfresco Content Services nodes. See [Installing in a distributed environment]({% link content-services/5.2/install/index.md %}#installing-in-a-distributed-environment) for more information.

2.  Set up multiple Alfresco Content Services instances in a clustered environment. See [Setting up clustering](#setting-up-clustering) for more information.

3.  Open the `alfresco-global.properties` file.

    1.  Set the following repository properties.

        ```text
        dir.root=<ALFRESCO_HOME>/alf_data
        dir.remote=/nfs/or/samba/share/common/for/all/nodes
        dir.contentstore=${dir.remote}/contentstore
        dir.contentstore.deleted=${dir.remote}/contentstore.deleted
        dir.cachedcontent=${dir.remote}/cachedcontent
        ```

    2.  Set the following clustering property.

        ```text
        alfresco.hazelcast.password=bm0013 (Specifies a password for security reasons (optional)).
        ```

    3.  Set the following search properties.

        ```text
        index.subsystem.name=solr
        dir.keystore=${dir.root}/keystore (Specifies the path to keystore file. This is optional, required only if SSL communication is being used.)
        solr.port=80 (Specifies the Solr load balancer port.)
        solr.secureComms=none (for HTTP transport between Alfresco and SOLR), ssl for HTTPS transport
        solr.port.ssl=8443 (Specifies the Solr load balancer ssl port.)
        solr.host=172.31.50.59 (Specifies the Solr load balancer IP address or hostname.)
        ```

##### Installing and configuring Solr nodes

This topic describes the instructions for installing and configuring Solr nodes in a cluster.

1.  Configure Solr nodes. See [Configuring search]({% link content-services/5.2/admin/search.md %}#configuring-search-with-solr-4) for more information.

2.  Open the `<ALFRESCO_HOME>/alf_data/solr/archive-SpacesStore/conf/solrcore.properties` file.

3.  Open the `<ALFRESCO_HOME>/alf_data/solr/workspace-SpacesStore/conf/solrcore.properties` file.

4.  Set the following solr properties.

    ```text
    alfresco.host=localhost
    alfresco.port=8080 (if using HTTP transport, specify the HTTP port)
    alfresco.port.ssl=8443 (if using HTTPS transport, specify the SSL port)
    alfresco.secureComms=none or https (depending on whether HTTP or HTTPS transport is being used)
    ```

5.  Comment out or delete all the `<security-constraint>` properties in the web.xml file in alfresco.war and solr.war.

    In the `<ALFRESCO_HOME>/tomcat/webapps/alfresco/WEB-INF/web.xml` file, comment out the following:

    In the `<ALFRESCO_HOME>/tomcat/webapps/solr4/WEB-INF/web.xml` file, comment out the following:

If you are using HTTP transport, make sure that the following properties are set:

-   `solr.secureComms=none` in the `alfresco-global.properties` file
-   `alfresco.secureComms=none` in the `solrcore.properties` file

Additionally, you need to comment out or delete all the `<security-constraint>` properties in the web.xml file in alfresco.war and solr.war. For example, in the `<ALFRESCO_HOME>/tomcat/webapps/alfresco/WEB-INF/web.xml` file, comment out the following:

```xml
<security-constraint>
        <web-resource-collection>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>repository</role-name>
        </auth-constraint>
        <user-data-constraint>
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>
        </user-data-constraint>
    </security-constraint>

    <login-config>
        <auth-method>CLIENT-CERT</auth-method>
        <realm-name>Solr</realm-name>
    </login-config>

    <security-role>
       <role-name>repository</role-name>
    </security-role>
```

and in the `<ALFRESCO_HOME>/tomcat/webapps/solr4/WEB-INF/web.xml` file, comment out the following:

```xml
<security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/service/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/s/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/wcservice/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/wcs/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <login-config>
      <auth-method>CLIENT-CERT</auth-method>
      <realm-name>Repository</realm-name>
   </login-config>
   
   <security-role>
     <role-name>repoclient</role-name>
   </security-role>
```

If you are using HTTPS transport, make sure that your load balancer is configured to use the Alfresco certificate. You may need to generate your own certificate from browser.p12, which is shipped with Alfresco Solr, and add it to your load balancer configuration.

## Setting up repository server cluster

Use this information to implement a repository server cluster.

The repository server cluster consists of the following components:

-   Database server
-   Content store
-   Solr server
-   Load balancer

-   **[Setting up repository server cluster](#setting-up-repository-server-cluster)**  
Follow these steps to set up a repository cluster.
-   **[Starting the repository server cluster](#starting-the-repository-server-cluster)**  
Use this information to start the repository server cluster.
-   **[Managing members of a cluster](#managing-members-of-a-cluster)**  
Use the Admin Console for repository server clustering.
-   **[Testing the cluster](#testing-the-cluster)**  
There are a number of steps required to test repository server clustering.
-   **[Clustering properties](#clustering-properties)**  
Configure the repository server cluster by setting these properties in the `alfresco-global.properties` file.

### Set up repository server cluster

Follow these steps to set up a repository cluster.

By default, all Enterprise servers connected to the same database will form a repository cluster.

Follow these steps for each server in the cluster:

1.  Install and configure the repository server. See the install documentation for deploying Alfresco Content Services (alfresco.war). In addition, ensure that:

    -   The content store is available to all members in the cluster.
    -   Each cluster member must be set up to access the same database, using the same database properties as in `alfresco-global.properties`.
    -   Deploy a Solr indexing server for use across the cluster and configure the properties of each cluster member to utilize this Solr server.
2.  Ensure that port number 5701 (the default clustering port) is accessible on each repository server by all the other repository servers in the cluster.

3.  Specify a wildcard (for example, `10.50.*.*`) or exact (for example, `192.168.1.100`) IP address of the network interface for clustering to use.

    The advantage of using a wildcard IP address is that the configuration can be used on multiple servers without local changes. The java property name to use is `alfresco.cluster.interface` (optional).

4.  Set the following java property to activate Hazelcast’s own JMX reporting (optional).

    ```text
    hazelcast.jmx=true
    ```

5.  For security reasons, set the cluster password with the following java property:

    ```text
    alfresco.hazelcast.password
    ```

    > **Note:** If you are creating three clusters on the same network it is important to ensure they have different passwords to help distinguish them apart.

### Starting the repository server cluster

Use this information to start the repository server cluster.

In most cases, it is not necessary to apply any clustering-specific configuration - just starting the servers will result in a cluster.

Let's suppose you have two cluster members on IP addresses, `10.244.50.101` and `10.244.50.102`. Upon starting the first member, you should see the log message similar to the one shown:

```text
2013-08-05 17:06:31,794  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Cluster started,
      name: MainRepository-2c0aa5c6-e38a-4f64-bd29-1a7cf9894350
2013-08-05 17:06:31,797  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Current cluster members:
  10.244.50.101:5701 (hostname: repo1.local)
```

This shows that a cluster name has been automatically generated, based on the repository name (`MainRepository`) and a UUID (a random/ unique identifier). Finally, the cluster has been started and the cluster members are listed. As shown in the log message, only one cluster member is present currently.

Upon starting the second member, you should see the log message similar to the one shown:

```text
2013-08-05 17:06:58,350  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Cluster started,
      name: MainRepository-2c0aa5c6-e38a-4f64-bd29-1a7cf9894350
2013-08-05 17:06:58,353  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Current cluster members:
  10.244.50.102:5701 (hostname: repo2.local)
  10.244.50.101:5701 (hostname: repo1.local)
```

This log message shows that both the servers are now members of the same cluster.

> **Note:** When starting up a clustered environment, the nodes in the cluster should be started in a rolling start, such that each node is fully started before the next is started in the cluster. This prevents any resource/load concurrency conflicts.

### Managing members of a cluster

Use the Admin Console for repository server clustering.

Servers connected to the same database instance are usually clustered automatically. In most cases no additional configuration is necessary.

> **Note:** Ensure that clustering is enabled for your license.

1.  Open the Admin Console.

2.  In the **Repository Services** section, click **Repository Server Clustering**.

    You see the Repository Server Clustering page.

3.  Set the clustering properties:

    **For Host Server:**

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |Server Name|ip-x-x-x-x|This specifies the name of the host server that you are currently connected to.|
    |Cluster|Enabled or Disabled|This shows if clustering is enabled or disabled. You need to have a correct license to enable clustering.|
    |IP Address|x.x.x.x|This specifies the IP address of the server.|
    |Cluster ID|xxxxxx|This specifies the unique id of the server.|

    **For Cluster Members: Server Details**

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |Server|ip-x-x-x-x|This specifies the server name of the cluster member.|
    |IP|x.x.x.x|This specifies the IP address of the server.|
    |Port|5701|This specifies the port number of the server.|
    |Last Registered|02-Oct-2013 12:48:37|This specifies the date and time when the cluster member was last started.|
    |Number of Members|1|This specifies the total number of members in the cluster.|

    **For Offline Cluster Members: Server Details**

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |Server|ip-x-x-x-x|This specifies the server name of a previously clustered server member that is no longer a member of the cluster.|
    |IP|x.x.x.x|This specifies the IP address of the offline server.|
    |Port|5701|This specifies the port number of the offline server.|
    |Last Registered|02-Oct-2013 12:48:37|This specifies the date and time when the offline cluster server was last started.|

4.  Click **Remove from list** to decommission a particular cluster member.

    The offline cluster member no longer appears in the **Offline Cluster Members** list.

5.  Set the clustering properties for **Connected Non-Clustered Server(s)**:

    In exceptional cases, a server may be connected to the same database as other cluster members, and yet it may not be a member of the repository cluster. In other words, it will have clustering disabled. Such a server is called connected non-clustered server.

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |Server|ip-x-x-x-x|This specifies the name of the server.|
    |IP|x.x.x.x|This specifies the IP address of the server.|

6.  To check if clustering is working properly, click **Validate Cluster**.

    You see the **Cluster Validation** page. This page shows the validation results for a cluster.

    Cluster validation performs a check to ensure that communication between the cluster members is working correctly. For a cluster to be considered validated, all cluster members should show success status. If one server fails in a two-server cluster, then both the servers will be marked as failed.

7.  Click **Close**.

### Testing the cluster

There are a number of steps required to test repository server clustering.

The quickest and easiest way to test the cluster is by using the Admin Console.

Ensure that the Alfresco Content Services server is running.

1.  Enter the following URL in a browser window:

    ```text
    http://<your-host-name>:8080/alfresco/service/enterprise/admin
    ```

    Where `<your-host-name>` is the host name where you are running the server.

    An Authentication Required prompt displays, showing the IP address or name and the port number of the server.

2.  Enter your user name and password.

    Your user name and password must be for an account with administrator permissions.

    The Admin Console displays in a browser window. The first page you see is the [System Summary]({% link content-services/5.2/admin/admin-console.md %}#viewing-the-system-summary).

3.  In the Repository Services section, click Repository Server Clustering.

    You see the Repository Server Clustering page.

    This page displays information regarding the current cluster members under the Cluster Members section.

4.  Click **Validate Cluster** to start a quick test to check that communication is available between each pair of cluster members.

    You see the Cluster Validation page. This page displays the result in a matrix form showing cluster communication as either Success or Failure.

### Clustering properties

Configure the repository server cluster by setting these properties in the `alfresco-global.properties` file.

> **Note:** These properties are optional.

|Clustering property|Example setting|What is it?|
|-------------------|---------------|-----------|
|alfresco.cluster.enabled|true|This enables clustering.|
|alfresco.cluster.interface|10.256.*.*|This specifies a particular network interface to use for clustering. It might be a wildcard value, such as `10.256.*.*`, which means an attempt is made to bind with an interface having an IP address beginning with `10.256.`|
|alfresco.cluster.nodetype|Repository Server|This specifies the human-friendly description of the cluster member. It is useful to give a name to the non-clustered servers, such as a transformation server that it attached to the same database as the cluster, but not participating in it (for example, `alfresco.cluster.enabled=false`).|
|alfresco.hazelcast.password|alfrescocluster|This specifies the password used by the cluster members to access or join the Hazelcast cluster.|
|alfresco.hazelcast.port|5701|This specifies the port to use for clustering.|
|alfresco.hazelcast.autoinc.port|false|This enables Hazelcast to make several attempts to find a free port starting at the value of `alfresco.hazelcast.port`.<br>**Note:** It's recommended that you do not use this property.|
|alfresco.hazelcast.max.no.heartbeat.seconds|15|This specifies the maximum timeout of heartbeat in seconds for a node to assume it is dead.|

## CIFS clustering through load balancer

Follow these steps to configure CIFS clustering through the load balancer.

Setting up a CIFS cluster involves configuring the Balance application and the HAProxy load balancer.

Balance is a load balancing solution for simple TCP proxy with round robin load balancing and fail over mechanisms.

1.  Configure Balance.

    For Linux from Source:

    1.  Download Balance from the [Balance download page](https://balance.inlab.net/){:target="_blank"}.

        Ensure that building toolchains specific to your OS version are installed. For example, GNU Compiler Collection (GCC), GNU make, or any other related packages.

    2.  Run the following commands to install Balance:

        ```bash
        make
        make install
        ```

        This installs Balance at `/usr/sbin/` and the man page at `/usr/man/man1`.

    3.  Enable Balance to bind on port `445` of the local IPv4 IP address and distribute connections to `<host1_IP>, port 445`, and `<host2_IP>, port 445`.

        ```text
        #balance -fb ::ffff:<IP>  445 <host1_IP>:445 % <host2_IP>:445
        ```

        where `<IP>` is the local IPv4 IP address, `<host1_IP>` is the IPv4 address of the first server hostname, and `<host2_IP>` is the IPv4 address of the second server hostname.

2.  Configure HAProxy.

    1.  To configure HAProxy on Solaris, [download the appropriate version of HAProxy](https://www.haproxy.org/download/){:target="_blank"} in accordance to your server (x86 or Sparc).

        For example, `haproxy-1.4.18-pcre-solaris10-x86.stripped.gz`.

    2.  Get Perl Compatible Regular Expressions (PCRE) and its dependencies from [https://www.pcre.org/](https://www.pcre.org/){:target="_blank"}.

        1.  Unzip the PCRE library.

            ```bash
            gunzip prce-x.x.tar.gz
             tar xf prce-x-x.tar
            cd prce-x.x
            ```

        2.  Run the following commands:

            ```bash
            ./configure --enable-static --enable-shared --prefix=/usr/local--enable-unicode-properties
            make && make install
            ```

    3.  Create a new user and group with name `haproxy`.

    4.  Run the following commands:

        ```bash
        gunzip haproxy-1.4.x-pcre-solaris10-x86.stripped.gz
        mv haproxy-1.4.x-pcre-solaris10-x86.stripped haproxy
        mv haproxy /usr/bin/
        chmod +x /usr/bin/haproxy
        mkdir -p /etc/haproxy
        ```

    5.  Create and edit the `/etc/haproxy/haproxy.cfg` configuration file by adding the configuration shown below:

        ```text
        global
            log 127.0.0.1  local0 notice
            user haproxy
            group  haproxy
            chroot /etc/haproxy #directory
            daemon
            nbproc  7
            pidfile /var/run/haproxy.pid
        
        defaults
              log global
              option tcplog
              option redispatch
              contimeout     3000
              clitimeout     5000
              srvtimeout     5000
        
        listen hostname  <IP>:445
              mode tcp
              balance roundrobin
              server hostname <host1_IP>:445 weight  77
              server hostname <host2_IP>:445 weight 179
        ```

        > **Note:** Make sure you have `/usr/bin` in your environment path.

    6.  Run HAProxy with the following command:

        ```bash
        haproxy -f /etc/haproxy/haproxy.cfg -D
        ```

When a proxy is used for mapping the CIFS drive, CIFS clients from multiple IP addresses access Alfresco Content Services CIFS through the same IP address. To ensure that Alfresco Content Services CIFS is aware that all client IP addresses used for accessing CIFS will use the same IP address (address of your proxy/load balancer), set the following property in the `alfresco-global.properties` file, on all nodes in the cluster:

```text
cifs.loadBalancerList = <IP address of the Load Balancer>
```

## Tracking clustering issues

Use this information to track clustering issues.

-   The main clustering debug information can be customized using the following log4j setting (default value is `INFO`):  

```text
log4j.logger.org.alfresco.enterprise.repo.cluster=info
```

-   For a better control and more detailed clustering debug information, the following category can be configured:  

```text
org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap
```

This controls clustering initialization and shutdown. It provides `INFO` level startup and shutdown messages. It also provides `WARN` level messages, if clustering is disabled or an invalid 5.2.7 license is installed.

Here is an example output:

```text
12:38:38,769 INFO [org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap] Cluster started, name:
      MainRepository-35ee3b27-0276-4224-9613-3fd8089c6e11
12:38:38,776 INFO [org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap] Current cluster
      members: 
    10.248.10.205:5701 (hostname: node1.alf.example.com)
    10.208.63.40:5701 (hostname: node2.alf.example.com)    
```

-   When a cluster member leaves or joins, the following class generates an informative `INFO` level message:

```text
org.alfresco.enterprise.repo.cluster.core.MembershipChangeLogger  
```

Here is an example output:

```text
12:38:47,560 INFO [org.alfresco.enterprise.repo.cluster.core.MembershipChangeLogger] Member joined:
      10.65.41.64:5701 (hostname: node1.alf.example.com)
12:38:47,569 INFO [org.alfresco.enterprise.repo.cluster.core.MembershipChangeLogger] Current cluster
      members:
    10.208.63.40:5701 (hostname: solr.alf.example.com)
    10.248.10.205:5701 (hostname: node2.alf.example.com)
    10.65.41.64:5701 (hostname: node1.alf.example.com)
```

-   An important aspect of clustering is caching. To log cache creation (for example, increase the cache related logging to DEBUG level), enable the following log categories:

    ```text
    log4j.logger.org.alfresco.enterprise.repo.cluster.cache=DEBUG
    log4j.logger.org.alfresco.repo.cache=DEBUG
    ```


-   The underlying clustering technology, Hazelcast, is configured to use `log4j` for logging. Therefore, you can configure logging for the whole Hazelcast top-level package, as shown:

```text
log4j.logger.com.hazelcast=info
```

To increase logging from Hazelcast’s member joining mechanism, enable the following log category:

```text
log4j.logger.com.hazelcast.impl.TcpIpJoiner=debug
```
