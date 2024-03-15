---
title: Set up clustering
---

You can implement multiple Content Services instances in a clustered environment.

A cluster represents a collection of nodes. Clustering is implemented to provide high scalability and resilience. Improved performance is enhanced through redundant nodes that provide services when other nodes fail. When integrated with a load balancer, performance is enhanced by distributing, or balancing, server workload across a collection of nodes.

## Prerequisites for upgrades

There are a number of prerequisites for upgrading from a version of Content Services prior to 4.2 in a clustered environment.

Before upgrading, ensure that all files and configuration are backed up. Any customization(s) that you've made, for example, creation of custom caches, might need to be reapplied using the new Content Services clustering infrastructure.

The following libraries are no longer used in Content Services 4.2 onwards, so any configuration related to these libraries should be removed before upgrading:

* JGroups
* EHCache

> **Note:** You do not need to follow these steps if you're upgrading from Content Services 4.2. This information is only relevant if you're upgrading from any version prior to 4.2.

Follow the steps to remove the configuration not supported in version 7.0:

1. Browse to the `<classpathRoot>` directory.

    For example, for Tomcat 7, browse to the `$TOMCAT_HOME/shared/classes/alfresco/extension/` directory.

2. Delete the `ehcache-custom.xml` file.

3. Browse to the `<classpathRoot>` directory.

    For example, for Tomcat 7, browse to the `$TOMCAT_HOME/shared/classes/` directory.

4. Open the `alfresco-global.properties` file.

5. Remove the following legacy properties from the `alfresco-global.properties` file:

    * `alfresco.ehcache.rmi.hostname`
    * `alfresco.ehcache.rmi.port`
    * `alfresco.ehcache.rmi.remoteObjectPort`
    * `alfresco.jgroups.defaultProtocol`
    * `alfresco.jgroups.bind_address`
    * `alfresco.jgroups.bind_interface`
    * `alfresco.tcp.start_port`
    * `alfresco.tcp.initial_hosts`
    * `alfresco.tcp.port_range`
    * `alfresco.udp.mcast_addr`
    * `alfresco.udp.mcast_port`
    * `alfresco.udp.ip_ttl`
    * `filesystem.cluster.enabled`
    * `filesystem.cluster.configFile`

6. Browse to the `<classpathRoot>` directory.

    For example, for Tomcat 7, browse to the `$TOMCAT_HOME/shared/classes/alfresco/extension` directory.

7. Remove the Hazelcast configuration file, `hazelcastConfig.xml`, as a centralized configuration is now included within the `alfresco.war` deployment archive.

    The `filesystem.cluster.configFile` property mentioned in Step 5 refers to the `hazelcastConfig.xml` file.

8. After you've performed all the specified steps, if you want to initiate clustering, see [Setting up repository server cluster](#setuprepocluster).

## Components of a Content Services solution

This information gives an overview of the main components of your Content Services solution.

Within your solution, you have components such as Alfresco Share, Content Services, database, index (Solr), transformations, and the content store. As illustrated in the following diagram, some of these components can be clustered while others are optional.

![alf-solution]({% link content-services/images/alf-solution.png %})

Clusterable components:

* Alfresco Share
* Content Services
* Content store
* Database

Non-clusterable and replicable components:

* Transformation Server
* Solr 6 index

It is important to decide how many installations you need and which of the specified components you'll put on which node.

To explain this further, let's consider an example. Assume that your application has six nodes. Ideally, it's recommended that you should have one component on each node. So, for example, node1 has database, node2 is content store, node3 is Content Services, node4 is Alfresco Share, node5 is Solr, and node6 is Transformation Server.

Use the following table as a template to design your solution.

| Clusters/ nodes | Alfresco components | DNS | IP address (optional) | Additional information |
| --------------- | ------------------- | --- | --------------------- | ---------------------- |
| 1 | Database | | | |
| 2 | Content store | | | |
| 3 | Content Services | | | |
| 4 | Alfresco Share | | | |
| 5 | Solr 6 |  | | |
| 6 | Transformation Server | | | |

However, you can configure your distribution differently. Each distribution and clustering solution has its own advantages and disadvantages. To configure distribution and clustering optimally, contact [Alfresco Consulting](https://www.alfresco.com/services/consulting){:target="_blank"} or your Alfresco certified partner.

For a better understanding of initiating clustering for high availability and high throughput, see [Scenario: Clustering for redundancy](#scenarioredundancycluster) and [Scenario: Clustering for high throughput](#scenariohighthrucluster).

## Recommendations for split architecture

There are a number of recommendations for splitting the Content Services architecture in a distributed or clustered environment.

Generally, there are two complementary purposes for distributing or clustering your installation.

* To achieve redundancy or high availability
* To provide high-performance and/or throughput

The main decision is involved around when to split and how to split.

**When to split:** There are a number of indicators to help you decide when to split your architecture from a single node environment to a distributed node environment. Some of the indicators to look for include:

* Low disk space
* CPU running out of memory
* High indexing load

**How to split:** When you've decided to upgrade from a single node environment to a distributed or clustered environment, you must find the most appropriate way to cluster architecture.

Consider the following scenarios for setting up a cluster and installing Solr in a cluster.

### Scenario: Clustering for redundancy {#scenarioredundancycluster}

This is a scenario-based topic describing the clustering architecture for redundancy and high availability of Content Services services.

This scenario shows a single repository database and content store, and two Tomcat nodes/web servers on two separate machines accessing the content simultaneously. The configuration does not guard against the content store or database failure, but allows multiple servers to share the web load, and provides redundancy in case of a server failure. Each server has local indexes (in the local content store).

This is the simplest cluster to set up and is ideal for small-scale installations. A cluster consisting of two or more machines working together provides a higher level of availability, reliability, and scalability than can be obtained from a single node.

![cluster-redundancy]({% link content-services/images/cluster-redundancy.png %})

A hardware load balancer balances the web requests among multiple servers. The load balancer must support 'sticky' sessions so that each client always connects to the same server during the session. The content store and database will reside on separate servers, which allows us to use alternative means for content store and database replication.

> **Note:** All the servers in a cluster should have static IP addresses assigned to them.

### Scenario: Clustering for high throughput {#scenariohighthrucluster}

This is a scenario-based topic describing the clustering architecture for maximizing throughput of Content Services services.

This setup shows a single repository database and content store. There are four nodes with Content Services/Alfresco Share and two nodes with Solr, all accessing the content simultaneously. This set up provides a higher level of availability, reliability, and scalability, thereby maximizing the throughput of various services. Nodes in a cluster are positioned behind a load balancer that delegates requests to cluster members based on any one member’s ability/availability to handle the load.

Each Share instance is deployed into its own Tomcat servlet container. Content Services services and CPU runtime footprint are optimized for high throughput under heavy concurrency with such a deployment. The load balancer fronts the cluster, and directs traffic to the member of the cluster most able to handle the current request.

> **Note:** All the servers in a cluster should have static IP addresses assigned to them.

![cluster-throughput]({% link content-services/images/cluster-throughput.png %})

In this deployment scenario the following flows are present:

* Client flow:
  * Client sends the request to the main load balancer to reach Share application.
  * Main load balancer analyses the load and redirects the client to one of Share hosts.
  * Main load balancer uses the `JSESSIONID` cookie to stick the client to one of Share nodes.
  * Share sends the web scripts requests to the local repository instance, renders the page, and returns it to the user via the main load balancer.

* Content Services internal flow:
  * Repositories intercommunication is done via Hazelcast to replicate caches.
  * Repositories share the same contentstore available via NFS/SAMBA share.
  * Repositories share the same database schema.

* Solr flow:
  * Tracking tier: Two Solr instances periodically query repositories to detect new transactions, fetch new content, and build local indexes. Tracking is done through Solr load balancer, which analyses the load and distributes it across the repositories.
  * Search tier: Four repository instances query two Solr instances on demand through the Solr load balancer.

## Setting up an Alfresco Share cluster

Use this information to configure a cluster for Share.

### Configure Hazelcast between Alfresco Share instances

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
                http://www.hazelcast.com/schema/spring/hazelcast-spring-5.3.xsd">
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

This configuration enables the Hazelcast Spring integration, which in turn, starts the Hazelcast server. The Hazelcast server is easily configurable and can use either multicast (default) or TCP-IP direct, if preferred. For more information, see the [Hazelcast Documentation](https://hazelcast.com/products/in-memory-computing/#resources){:target="_blank"}.

If this configuration is enabled, the Share instance becomes a cluster node and Hazelcast is started. If this configuration is disabled (such as, for a default install), then Hazelcast is not started. While using Share, only when any of the following actions occur, the cache invalidation messages will be sent from the affected node to other nodes in the cluster:

* an existing site/user dashboard layout is modified
* new site or user dashboard is created
* runtime application properties are changed

>**Note:** For activating the default set up, apply identical configuration to each Share node.

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

### Configure Alfresco Share clustering

These steps are required for cluster configuration for Share. If you're using an HTTP load-balancing mechanism in front of a clustered installation, ‘sticky’ routing must be enabled for the HTTP requests made by the Share tier to the repository tier (the `/alfresco` application).

This can be achieved in one of two ways:

1. Hard-wire each /share instance to its own `/alfresco` instance, bypassing the load balancer.

    This can be achieved by populating each `share-config-custom.xml` file with a host name and port number that is not behind your load balancing mechanism.

2. If Kerberos authentication is enabled with SSO, then Share will use cookie-based sessions and you can configure your load balancer to use sticky routing using the `JSESSIONID` cookie.

    To enable Kerberos with SSO, refer to the instructions in [Configuring authentication]({% link content-services/latest/admin/auth-sync.md %}#configauthsubsystems) to configure `alfrescoNtlm` or Kerberos authentication, and set (`kerberos.authentication.sso.enabled=true`).

    > **Note:** If you're configuring a cluster, refer to [Setting up clustering]({% link content-services/latest/admin/cluster.md %}).

## Set up repository server cluster {#setuprepocluster}

Use this information to implement a repository server cluster.

The repository server cluster consists of the following components:

* Database server
* Content store
* Solr server
* Load balancer
* (Optional) Hazelcast cluster

### Install and configure Content Services nodes

Use this information to install and configure nodes in a cluster based on the scenario described in Clustering for high throughput.

1. Install the Content Services nodes.

    See [Installing using distribution zip]({% link content-services/latest/install/zip/index.md %}) for more information.

2. Set up multiple Content Services instances in a clustered environment.

    See [Setting up clustering]({% link content-services/latest/admin/cluster.md %}) for more information.

### Install and configure Solr nodes

This topic describes the instructions for installing and configuring Solr nodes in a cluster.

1. Configure Solr nodes.

    See [Installing Alfresco Search Services]({% link search-services/latest/install/index.md %}) for more information.

2. Edit the `<SOLR_HOME>/solrhome/templates/rerank/conf/solrcore.properties` file.

    If you've already started Solr and the cores (`alfresco` and `archive`) already exist, open the following files:

    ```text
    <SOLR_HOME>/solrhome/alfresco/conf/solrcore.properties
    <SOLR_HOME>/solrhome/archive/conf/solrcore.properties
    ```

3. Set the following Solr properties in the `solrcore.properties` file:

    ```text
    alfresco.host=localhost
    alfresco.port.ssl=8443    (if using HTTPS transport, specify the SSL port)
    alfresco.port=8080        (if using HTTP transport, specify the HTTP port)
    alfresco.secureComms=none (if using HTTP transport, or https if HTTPS transport is being used)
    ```

4. If you're using HTTPS transport, then make sure that your load balancer is configured to use the Alfresco certificate.

    You'll need to generate your own `browser.p12` certificate, and add it to your load balancer configuration.

5. If you're using HTTP transport, then make sure that the following property is set in `<classpathRoot>/alfresco-global.properties`:

    ```text
    solr.secureComms=none
    ```

6. If you wish to proceed with the default embedded Hazelcast clustering mechanism, you're done.

    However, if you wish to manage your own external Hazelcast cluster, you should additionally follow the instructions highlighted in the next section [Set up repository clustering via external Hazelcast](#set-up-repository-clustering-via-external-hazelcast).

### Set up repository clustering via external Hazelcast

Managing your own Hazelcast cluster allows you to scale repository and Hazelcast instances independently, while also allowing you to manage resources allocation on an individual level. This kind of setup provides more fine-grained control at the cost of more necessary preliminary work.

1. Prepare a valid Hazelcast XML configuration file including all caches definitions required by the repository. This can be mostly auto-generated for you by doing the following:

    1. Locate the `caches.properties` file within the `alfresco.war:WEB-INF\lib\alfresco-repository-*.jar` archive.
    2. Copy the `caches.properties` file to an easily accessible directory.
    3. Clone the [alfresco-community-repo.git](https://github.com/Alfresco/alfresco-community-repo.git){:target="_blank"} repository locally.
    4. Move into the previously cloned repository's directory.
    5. Making sure that Python 3 is installed and available in the `PATH` by running the following command in your terminal of choice, replacing the path to the `caches.properties` file accordingly:

        ```bash
        python repository/scripts/hazelcast-init/generate-hazelcast-config.py -s </path/to/caches.properties>
        ```

    6. You should now have an auto-generated `repository/scripts/hazelcast-init/alfresco-hazelcast-config.xml` file including all required caches definitions.

2. Replace the `<cluster-name>` within the `alfresco-hazelcast-config.xml` file with a secure value that is hard to guess. For all intents and purposes this field should be treated as a password, as if matching it allows client-server / member-member connection.

3. Add the desired network configuration to the `alfresco-hazelcast-config.xml` to appropriately define your cluster topology as explained by the [Hazelcast Network Configurations documentation](https://docs.hazelcast.com/hazelcast/5.3/clusters/network-configuration){:target="_blank"}.

4. Apply the generated XML configuration to your Hazelcast nodes according to the [Hazelcast documentation](https://docs.hazelcast.com/hazelcast/5.3/configuration/configuring-declaratively){:target="_blank"}.

5. Configure the repository nodes so that they’re able to connect to your external Hazelcast cluster and won’t spin up an embedded Hazelcast instance. This can be done by setting the following repository properties:

    ```text
    # turns off the embedded Hazelcast initialization
    alfresco.hazelcast.embedded=false
    # points to a single member of the Hazelcast cluster to connect to
    alfresco.hazelcast.client.address=my-hazelcast-node:5701
    # should match the cluster-name just specified in the alfresco-hazelcast-config.xml
    alfresco.cluster.name=MySecureClusterName
    ```

6. (Optional) If, after having configured all repository nodes, you notice there are Hazelcast cluster members that haven't been configured as the `alfresco.hazelcast.client.address` for any of the repository nodes, then all repository nodes should be additionally configured to have the following property appropriately set:

    ```text
    # should be a comma-separated list of all external Hazelcast nodes that have not been configured
    # as the alfresco.hazelcast.client.address for ANY instance within the repository cluster
    alfresco.cluster.additional-members=some-hazelcast-node:5701,some-other-hazelcast-node:5701
    ```

This ensures that the cluster information is more appropriately registered and validated via the process explained in [Testing the cluster](#testing-the-cluster). It should only be necessary in the eventuality that there are more Hazelcast nodes than repository nodes, as otherwise it should always be possible to configure the repository nodes to connect to a different member of the external Hazelcast cluster until all such members are exhausted, without the need to configure the `alfresco.cluster.additional-members` property at all.

### Install and configure Hazelcast

In order to meet high availability deployment requirements, Content Services uses Hazelcast, an open-source distributed in-memory object store that supports a wide variety of data structures such as Map, Set, and List. It is important to harden (improve the security) of the cluster because it may expose sensitive data, including user session information, from the application layer to the network layer if the default configuration is not changed.

**Note:** Hazelcast Community Edition security features are limited, thus the mitigations are mainly related to the network layer plus application layer checks, where Alfresco programmatically permits only to database stored nodes the access to the cluster.

#### Secure Hazelcast Community Edition

Follow the steps below as soon as you create your cluster:

* Don’t allow Hazelcast to bind to all network interfaces (deactivated by default, defined via the `alfresco.hazelcast.bind.any=false` property).
* Specify which network interfaces should be used by Hazelcast for clustering purposes, see [Step 3: Set up repository server cluster]({% link content-services/latest/admin/cluster.md %}#setuprepocluster) for more information (the interface specification is disabled by default).
* Specify the Hazelcast port and don’t enable the port auto-increment feature, see [Clustering properties]({% link content-services/latest/admin/cluster.md %}#clustering-properties) for more information.
* Configure the network appropriately within the cluster, so that Hazelcast ports are only reachable within the boundaries of the internal network that connects the cluster members within each other.

Optionally, the default Alfresco Hazelcast XML configuration can be completely overridden for fine-tuning purposes. To change the configuration file, override the `alfresco.hazelcast.configLocation` property and provide your own configuration file.

#### Secure Hazelcast Enterprise Edition

Depending on your organization security policies and guidelines, a Hazelcast Enterprise license might be required to implement further hardening on the cluster. Alfresco does not provide this license so please refer to the [Hazelcast Security Suite](https://hazelcast.com/product-features/security-suite/){:target="_blank"} for details.

We recommend to enable:

* TLS to encrypt the data transmission among the nodes of the cluster in case a malicious user gains access to the network layer
* mTLS to authenticate nodes with certificates so that their identity can be cryptographically verified

#### Use a unique random UUID as cluster name

Given that the Hazelcast cluster name consists of the Repository name and the Repository ID, you should consider changing this value to one that can’t be easily guessed.

> **Note:** This compensating control applies to Content Services up to (and including) [version 7.3.x]({% link content-services/7.3/admin/cluster.md %}#setuprepocluster). From Content Services 7.4.0 onwards, this procedure is applied automatically.

1. Open the Admin Console.

2. In the Repository Services section, click **Repository Server Clustering**. You should now see the Repository Server Clustering page.

3. Take note of the current Cluster ID (for example: `MainRepository-3c8081c0-8c36-4719-805e-4132f7a4430e`).

4. Shut down all nodes in the cluster.

5. You will need to generate a random UUID. Choose your preferred tool, below is an example with JShell:

    ```JShell
    jshell> UUID.randomUUID()
    $1 ==> e1c3e8e5-9e6c-480b-a822-f0d80db0abba
    ```

6. Create a new cluster name with the generated random UUID according to this formula `{REPOSITORY_NAME}-{RANDOM_UUID}` (according to the current example, the result in this case would be: `MainRepository-e1c3e8e5-9e6c-480b-a822-f0d80db0abba`).

7. Calculate the CRC-32 checksum for the new cluster name. For example, with JShell:

    ```JShell
    jshell> java.util.zip.CRC32 crc = new java.util.zip.CRC32()
    jshell> crc.update("MainRepository-e1c3e8e5-9e6c-480b-a822-f0d80db0abba".getBytes("UTF-8"))
    jshell> crc.getValue()
    $2 ==> 2144787869
    ```

8. Get the last 16 characters from the new cluster name (in the current example, it would be: `822-f0d80db0abba`).

9. Prepare the SQL statement to replace the legacy cluster according to the following template:

    ```SQL
    UPDATE
        alf_prop_string_value
    SET
        string_value = [NEW CLUSTER NAME],
        string_end_lower = [LAST 16 CHARACTERS],
        string_crc = [CALCULATED CRC]
    WHERE
        id = (
        SELECT
            id
        FROM
            alf_prop_string_value
        WHERE
            string_value =[LEGACY CLUSTER NAME])
    ```

    Replace the values within the square brackets, in the context of the current example the prepared statement would look like this:

    ```SQL
    UPDATE
        alf_prop_string_value
    SET
        string_value = 'MainRepository-e1c3e8e5-9e6c-480b-a822-f0d80db0abba',
        string_end_lower = '822-f0d80db0abba',
        string_crc = 2144787869
    WHERE
        id = (
        SELECT
            id
        FROM
            alf_prop_string_value
        WHERE
            string_value = 'MainRepository-3c8081c0-8c36-4719-805e-4132f7a4430e')
    ```

10. Execute the prepared SQL statement.

11. Ensure that each node is fully started before starting the next one.

### Set up repository server cluster

Follow these steps to set up a repository cluster.

By default, all Enterprise servers connected to the same database will form a repository cluster.

Follow these steps for each server in the cluster:

1. Install and configure the repository server. See the install documentation for deploying Content Services (`alfresco.war`). In addition, ensure that:

    * The content store is available to all members in the cluster.
    * Each cluster member must be set up to access the same database, using the same database properties as in `alfresco-global.properties`.
    * Deploy a Solr indexing server for use across the cluster and configure the properties of each cluster member to utilize this Solr server.

2. Ensure that port number `5701` (the default clustering port) is accessible on each repository server by all the other repository servers in the cluster.

3. Specify a wildcard (for example, `10.50.*.*`) or exact (for example, `192.168.1.100`) IP address of the network interface for clustering to use.

    The advantage of using a wildcard IP address is that the configuration can be used on multiple servers without local changes. The java property name to use is `alfresco.cluster.interface` (optional).

4. (Optional) Set the following java property to activate Hazelcast’s own JMX reporting:

    ```text
    hazelcast.jmx=true
    ```

5. Open the `alfresco-global.properties` file.

    1. Set the following repository properties.

        ```text
        dir.root=<ALFRESCO_HOME>/alf_data
        dir.remote=/nfs/or/samba/share/common/for/all/nodes
        dir.contentstore=${dir.remote}/contentstore
        dir.contentstore.deleted=${dir.remote}/contentstore.deleted
        dir.cachedcontent=${dir.remote}/cachedcontent
        ```

    2. Set the following Search properties for mutual TLS (i.e. https).

        ```text
        index.subsystem.name=solr6
        dir.keystore=${dir.root}/keystore (Specifies the path to the keystore file)
        solr.secureComms=https
        solr.port.ssl=8983                (Specifies the Solr load balancer SSL port)
        solr.host=172.31.50.59            (Specifies the Solr load balancer IP address or hostname)
        ```

    3. Set the following Search properties if you're not using mutual TLS (i.e. http)

        ```text
        index.subsystem.name=solr6
        solr.port=8983             (Specifies the Solr load balancer port)
        solr.secureComms=none      (For HTTP transport between Alfresco and Solr)
        solr.host=172.31.50.59     (Specifies the Solr load balancer IP address or hostname)
        ```

### Starting the repository server cluster

Use this information to start the repository server cluster.

In most cases, it's not necessary to apply any clustering-specific configuration - just starting the servers will result in a cluster.

Let's suppose you have two cluster members on IP addresses, 10.244.50.101 and 10.244.50.102. Upon starting the first member, you should see the log message similar to the one shown:

```text
2013-08-05 17:06:31,794  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Cluster started,
      name: MainRepository-2c0aa5c6-e38a-4f64-bd29-1a7cf9894350
2013-08-05 17:06:31,797  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Current cluster members:
  10.244.50.101:5701 (hostname: repo1.local)
```

This shows that a cluster name has been automatically generated, based on the repository name (`MainRepository`) and a UUID (a random/unique identifier). Finally, the cluster has been started and the cluster members are listed. As shown in the log message, only one cluster member is present currently.

Upon starting the second member, you should see the log message similar to the one shown:

```text
2013-08-05 17:06:58,350  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Cluster started,
      name: MainRepository-2c0aa5c6-e38a-4f64-bd29-1a7cf9894350
2013-08-05 17:06:58,353  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Current cluster members:
  10.244.50.102:5701 (hostname: repo2.local)
  10.244.50.101:5701 (hostname: repo1.local)
```

This log message shows that both the servers are now members of the same cluster.

> **Note:** When starting up a clustered environment, the nodes in the cluster should be started in a rolling start, such that each node is fully started before the next is started in the cluster. This prevents any resource/load concurrency conflicts. Additionally, if relying on external Hazelcast nodes for repository clustering purposes, it is recommended to verify that all Hazelcast cluster members are up and running before starting any of the repository instances.

### Managing members of a cluster {#managecluster}

Use the Repo Admin Console for repository server clustering.

Servers connected to the same database instance are usually clustered automatically. In most cases no additional configuration is necessary.

>**Note:** Ensure that clustering is enabled for your license.

1. Open the **Repo Admin Console**.

2. In the **Repository Services** section, click **Repository Server Clustering**.

    You see the **Repository Server Clustering** page.

3. Set the clustering properties:

    **For Host Server:**

    | Property | Description |
    | -------- | ----------- |
    | Server Name | This specifies the name of the host server that you're currently connected to, for example `ip-x-x-x-x`. |
    | Cluster | This shows if clustering is enabled or disabled. You need to have a correct license to enable clustering. |
    | IP Address | This specifies the IP address of the server, for example `x.x.x.x`. |
    | Cluster ID | This specifies the unique id of the server, for example `xxxxxx`. |

    **For Cluster Members: Server Details**

    | Property | Description |
    | -------- | ----------- |
    | Server | This specifies the server name of the cluster member, for example `ip-x-x-x-x`. |
    | IP | This specifies the IP address of the server, for example `x.x.x.x`. |
    | Port | This specifies the port number of the server, for example `5701`. |
    | Last Registered | This specifies the date and time when the cluster member was last started, for example `02-Oct-2013 12:48:37`. |
    | Node Type | This specifies the server type, for example `Repository server` / `Hazelcast server`. |
    | Repository IP | If the Node Type is `Hazelcast server`, this specifies the IP address of the linked Repository instance. Otherwise, it will be blank as the Repository IP is already specified by the `IP` property. |
    | Number of Members | This specifies the total number of members in the cluster, for example `1`. |

    **For Offline Cluster Members: Server Details**

    | Property | Description |
    | -------- | ----------- |
    | Server | This specifies the server name of a previously clustered server member that is no longer a member of the cluster, for example `ip-x-x-x-x`. |
    | IP | This specifies the IP address of the offline server, for example `x.x.x.x`. |
    | Port | This specifies the port number of the offline server, for example `5701`. |
    | Last Registered | This specifies the date and time when the offline cluster server was last started, for example `02-Oct-2013 12:48:37`. |
    | Node Type | This specifies the server type, for example `Repository server` / `Hazelcast server`. |
    | Repository IP | If the Node Type is `Hazelcast server`, this specifies the IP address of the linked Repository instance. Otherwise, it will be blank as the Repository IP is already specified by the `IP` property. |

4. Click **Remove from list** to decommission a particular cluster member.

    The offline cluster member no longer appears in the **Offline Cluster Members** list.

5. Set the clustering properties for **Connected Non-Clustered Server(s)**:

    In exceptional cases, a server may be connected to the same database as other cluster members, and yet it may not be a member of the repository cluster. In other words, it'll have clustering disabled. Such a server is called connected non-clustered server.

    | Property | Description |
    | -------- | ----------- |
    | Server | This specifies the name of the server, for example `ip-x-x-x-x`. |
    | IP | This specifies the IP address of the server, for example `x.x.x.x`. |

6. To check if clustering is working properly, click **Validate Cluster**.

    You see the **Cluster Validation** page. This page shows the validation results for a cluster.

    Cluster validation performs a check to ensure that communication between the cluster members is working correctly. For a cluster to be considered validated, all cluster members should show success status. If one server fails in a two-server cluster, then both the servers will be marked as failed.

7. Click **Close**.

### Testing the cluster

There are a number of steps required to test repository server clustering.

The quickest and easiest way to test the cluster is by using the Repo Admin Console.

Ensure that the Content Services server is running.

1. Enter the following URL in a browser window:

    ```http
    http://<your-host-name>:8080/alfresco/service/enterprise/admin
    ```

    Where `<your-host-name>` is the host name where you're running the server.

    An **Authentication Required** prompt displays, showing the IP address or name and the port number of the server.

2. Enter your user name and password.

    Your user name and password must be for an account with administrator permissions.

    The Admin Console displays in a browser window. The first page you see is the [System Summary]({% link content-services/latest/admin/admin-console.md %}#systemsummary).

3. In the **Repository Services** section, click **Repository Server Clustering**.

    You see the **Repository Server Clustering** page.

    This page displays information regarding the current cluster members under the Cluster Members section.

4. Click **Validate Cluster** to start a quick test to check that communication is available between each pair of cluster members.

    You see the Cluster Validation page. This page displays the result in a matrix form showing cluster communication as either Success or Failure.

### Clustering properties

Configure the repository server cluster by setting these properties in the alfresco-global.properties file.

> **Note:** These properties are optional.

| Property | Description |
| -------- | ----------- |
| alfresco.cluster.enabled | This enables clustering, for example `true`. |
| alfresco.cluster.interface | This specifies a particular network interface to use for clustering. It might be a wildcard value, such as `10.256.*.*`, which means an attempt is made to bind with an interface having an IP address beginning with `10.256.`|
| alfresco.cluster.nodetype | This specifies the human-friendly description of the cluster member, for example `Repository Server`. It is useful to give a name to the non-clustered servers, such as a transformation server that it attached to the same database as the cluster, but not participating in it (for example, `alfresco.cluster.enabled=false`). |
| alfresco.hazelcast.port | This specifies the port to use for clustering, for example `5701`. |
| alfresco.hazelcast.autoinc.port | This enables Hazelcast to make several attempts to find a free port starting at the value of `alfresco.hazelcast.port`.<br><br>**Note:** It's recommended that you do not use this property, for example `false`. |
| alfresco.hazelcast.max.no.heartbeat.seconds | This specifies the maximum timeout of heartbeat in seconds for a node to assume it is dead, for example `15`. |
| alfresco.hazelcast.embedded | This specifies if Hazelcast should be embedded or if the repository should rely on an external Hazelcast cluster instead. Default: `true`. |
| alfresco.hazelcast.client.address | This specifies the address of one of the members of the external Hazelcast cluster to connect to, for example `192.168.1.123:5701`.<br><br>This is only relevant if `alfresco.hazelcast.embedded=false`. |
| alfresco.hazelcast.client.configLocation | This specifies location of the XML file that is used to configure the Hazelcast client used by Alfresco to connect to the external Hazelcast cluster. Default: `classpath:alfresco/hazelcast/hazelcast-client.xml`.<br><br>This is only relevant if `alfresco.hazelcast.embedded=false`. |
| alfresco.cluster.name | This needs to match the name of the configured external Hazelcast cluster if `alfresco.hazelcast.embedded=false`. |
| alfresco.cluster.additional-members | This should be a comma-separated list of all external Hazelcast members that are not already configured as the `alfresco.hazelcast.client.address` for any ACS instance in the cluster, for example `192.168.1.124:5701,192.168.1.125:5701`.<br><br>This is only relevant if `alfresco.hazelcast.embedded=false.` |

## Tracking clustering issues

Use this information to track clustering issues.

* The main clustering debug information can be customized using the following log4j setting (default value is `INFO`):  

    ```text
    logger.alfresco-enterprise-repo-cluster.name=org.alfresco.enterprise.repo.cluster
    logger.alfresco-enterprise-repo-cluster.level=info
    ```

* For a better control and more detailed clustering debug information, the following category can be configured:  

    ```text
    org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap
    ```

    This controls clustering initialization and shutdown. It provides `INFO` level startup and shutdown messages.
    It also provides `WARN` level messages, if clustering is disabled or an invalid license is installed.

    Here is an example output:

    ```text
    12:38:38,769 INFO [org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap] Cluster started, name:
          MainRepository-35ee3b27-0276-4224-9613-3fd8089c6e11
    12:38:38,776 INFO [org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap] Current cluster
          members:
        10.248.10.205:5701 (hostname: node1.alf.example.com)
        10.208.63.40:5701 (hostname: node2.alf.example.com)
    ```

* When a cluster member leaves or joins, the following class generates an informative `INFO` level message:

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

* An important aspect of clustering is caching. To log cache creation (for example, increase the cache related logging to DEBUG level), enable the following log categories:

    ```text
    logger.alfresco-enterprise-repo-cluster-cache.name=org.alfresco.enterprise.repo.cluster.cache
    logger.alfresco-enterprise-repo-cluster-cache.level=info
    logger.alfresco-repo-cache.name=org.alfresco.repo.cache
    logger.alfresco-repo-cache.level=info
    ```

* The underlying clustering technology, Hazelcast, is configured to use `log4j` for logging. Therefore, you can configure logging for the whole Hazelcast top-level package, as shown:

    ```text
    logger.hazelcast.name=com.hazelcast
    logger.hazelcast.level=info
    ```

    To increase logging from Hazelcast’s member joining mechanism, enable the following log category:

    ```text
    logger.hazelcast-impl-TcpIpJoiner.name=com.hazelcast.impl.TcpIpJoiner
    logger.hazelcast-impl-TcpIpJoiner.level=debug
    ```

* Alfresco uses the Hazelcast library internally for clustering synchronization of data. With the addition of Java 11 modules, there is a warning in the application startup log for the repository app, as shown:

    ```text
    WARNING [localhost-startStop-1] com.hazelcast.instance.HazelcastInstanceFactory.null Hazelcast is starting
        in a Java modular environment (Java 9 and newer) but without proper access to required Java packages. Use
        additional Java arguments to provide Hazelcast access to Java internal API. The internal API access is used
        to get the best performance results. Arguments to be used:
    --add-modules java.se
    --add-exports java.base/jdk.internal.ref=ALL-UNNAMED
    --add-opens java.base/java.lang=ALL-UNNAMED
    --add-opens java.base/java.nio=ALL-UNNAMED
    --add-opens java.base/sun.nio.ch=ALL-UNNAMED
    --add-opens java.management/sun.management=ALL-UNNAMED
    --add-opens jdk.management/com.sun.management.internal=ALL-UNNAMED
    ```

    See the [Hazelcast documentation](https://docs.hazelcast.org/docs/3.11/manual/html-single/index.html#running-in-modular-java){:target="_blank"} for more details.

    For more details about the danger of using those parameters, see [https://openjdk.java.net/jeps/261](https://openjdk.java.net/jeps/261){:target="_blank"}. Note the warning on that page:

    > **Note:** The `--add-exports` and `--add-opens` options must be used with great care. You can use them to gain access to an internal API of a library module, or even of the JDK itself, but you do so at your own risk: If that internal API is changed or removed, then your library or application will fail.

    We decided not to hide this warning, since that may hide other problems in other areas of the code. This decision won't impact the performance or security of the repository app. Any required modifications will be reviewed and addressed in the next available Java releases. It is assumed that Hazelcast will probably do the same.
