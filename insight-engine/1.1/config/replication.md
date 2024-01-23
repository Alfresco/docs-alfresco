---
title: Solr replication
---

Solr replication uses the master-slave model to distribute complete copies of a master index to one or more slave servers.

The master server receives all updates and all changes are made against a single master server. Changes made on the master are distributed to all the slave servers which service all query requests from the clients. This enables Solr to remain responsive even with high query traffic.

All trackers must be enabled on master nodes, while only model tracker and metadata tracker should be enabled on slaves.

The figure below shows a Solr configuration using index replication. The master server's index is replicated on the slaves.

![]({% link insight-engine/images/solr-replication.png %})

The master-slave replication requires non-SSL communication between the master server and the slave server.

## Advantages and disadvantages of a master-slave index replication

### Advantages

* Splits read and write load and operations
* Load distribution for search queries
* High availability for searching
* Any number of slave instances can be created to scale query performance
* Usually less frequent index updates on the slaves and better use of the cache

### Disadvantages

* Increased latency (sum of tracking and Solr replication latency)
* Occasional large IO load to replicate large merges
* Complicated load balance and management
* Reconfiguration if the master is lost

### Difference between the master-master and master-slave replication

|Master-master replication|Master-slave replication|
|-------------------------|------------------------|
|Requires all Solr nodes to do the leg-work of indexing.|Only the master server indexes or re-indexes. The slave servers only pull the completed indexes.|
|It is simple to set up. Each Solr node may have the same setup if the queries from Solr to the repository go through a load balancer instead of to a specific repository node.|It is not as simple as the master-master replication.|
|Achieves eventual consistency much more quickly than the master-slave replication.|Solr indexing is eventually consistent irrespective of the method used. It takes slightly longer in a master-slave replication because first the master index is updated and then that index change is replicated to the slave.|
|In a master-master replication, the master nodes can't be configured to perform differently in different situations.|In the master-slave replication, the master and slave nodes can be configured to perform better under different situations. For example, the master node can be configured for optimal indexing performance, while the slave node can be configured for optimal search performance.|
|Neither the master-master replication nor the master-slave replication includes any inbuilt functionality to switch Solr targets, in case one node fails.|Neither the master-master replication nor the master-slave replication includes any inbuilt functionality to switch Solr targets, in case one node fails.|
|If a master node went down, the load balancer will direct all the query requests to a Solr node that was still running.|If a slave node went down, the same load-balancer behaviour would be relied on. But if the master node went down, then intervention would be required to Designate a new master, then point the slaves to that new master, and then Point the new master to the repository|
| |Requires an additional master node, so has slightly higher pre-requisites.|

## Solr replication configuration

The Solr replication feature is implemented as a `RequestHandler`. The simplest configuration involves one Alfresco Content Services node, one Solr master, and one Solr slave.

The Solr master is configured to track the Alfresco Content Services instance while the Solr slave is configured to track the Solr master. The Alfresco Content Services instance is configured to send all the queries to the SOLR slave.

![]({% link insight-engine/images/solr-replication-conf.png %})

## Configuring the Alfresco Content Services instance

As usual, no SSL queries configured go to the slave.

### Configuring Solr master

The configuration affecting replication is controlled by a single file, `alfresco-insight-engine/solrhome/templates/re-rank/conf/solrconfig.xml`. To configure the master server, follow the steps below:

1. Edit the `alfresco-insight-engine/solrhome/templates/re-rank/conf/solrconfig.xml` file on the master server to change the default replication handler configuration. Remember to uncomment the `master` section.

    ```bash
    <requestHandler name="/replication" class="org.alfresco.solr.handler.AlfrescoReplicationHandler" > 
        <!--
           To enable simple master/slave replication, uncomment one of the 
           sections below, depending on whether this solr instance should be
           the "master" or a "slave".  If this instance is a "slave" you will 
           also need to fill in the masterUrl to point to a real machine.
        -->
           <lst name="master">
             <str name="replicateAfter">commit</str>
             <str name="replicateAfter">startup</str>
             <str name="confFiles">schema.xml,stopwords.txt</str>
           </lst>

        <!--
           <lst name="slave">
             <str name="masterUrl">http://your-master-hostname:8983/solr</str>
             <str name="pollInterval">00:00:60</str>
           </lst>
        -->
    </requestHandler>
    ```

    where:

    |Parameter|Description|
    |--------------|-----------|
    |replicateAfter|String specifying action after which replication should occur. Valid values are, `commit`which triggers replication whenever a commit is performed on the master index,`optimize` which triggers replication whenever the master index is optimized and `startup` which triggers replication whenever the master index starts up. There can be multiple values for this parameter. If you use `startup`, you need to have a `commit` and/or `optimize` entry also if you want to trigger replication on future commits or optimizes.|
    |confFiles|Comma-separated list of configuration files to replicate.|

2. Make sure that the solrcore.properties file has the following settings:

    ```bash
    enable.master=true
    enable.slave=false
    ```

### Configuring Solr slave

Here again, the solrconfig.xml file controls the configuration affecting replication. To configure the slave server, follow the steps below:

1. Uncomment the `slave` section.

    ```bash
    <requestHandler name="/replication" class="org.alfresco.solr.handler.AlfrescoReplicationHandler" > 
        <!--
           To enable simple master/slave replication, uncomment one of the 
           sections below, depending on whether this solr instance should be
           the "master" or a "slave".  If this instance is a "slave" you will 
           also need to fill in the masterUrl to point to a real machine.
        -->
       <!--
       <lst name="master">
             <str name="replicateAfter">commit</str>
             <str name="replicateAfter">startup</str>
             <str name="confFiles">schema.xml,stopwords.txt</str>
           </lst>
       -->
           <lst name="slave">
             <str name="masterUrl">http://your-master-hostname:8983/solr</str>
             <str name="pollInterval">00:00:60</str>
           </lst>
    </requestHandler>
    ```

    where:

    |Parameter name|Description|
    |--------------|-----------|
    |pollInterval|Interval in which the slave should poll master .Format is *hh:mm:ss*. If this is missing, the slave server does not poll automatically.|
    |masterUrl|Fully qualified URL for the replication handler of master. Make sure the `masterUrl` ends with `<tomcat base url>/solr/alfresco`.|

2. Set the master URL to point to the Solr master. Also, set how often the slave server should poll for changes.

    ```bash
    <str name="masterUrl">http://your-master-hostname:8983/solr/alfresco</str>
    <str name="pollInterval">00:00:60</str>
    ```

3. Set the following properties in the solrcore.properties file:

    ```bash
    enable.master=false
    enable.slave=true
    ```

In this configuration, the Solr instance will only track model changes from the Alfresco Content Services platform.

## Additional Solr configuration

Any configuration changes related to the core schema and configuration, or any changes in `<solr_home>/conf` must be made to all Solr instances. Replication can be configured to manage the distribution of other core related configuration files.

## Solr master-slave reconfiguration

There are additional master-slave configuration requirements for Solr, such as adding a slave server and promoting a slave server.

## Adding a slave server

To add another slave server to an existing replication configuration, see [Configuring Solr slave](#configuring-solr-slave).

## Promoting a slave

In the event of a downed master in a master-slave configuration, the slave servers can continue to service queries, but will no longer be able to index until a new master is instated. The process of promoting a slave to a master is manual. The state of slave servers may differ, so choose the most up-to-date slave to promote as the master server.

To promote a slave, follow the steps below:

1. Nominate the most up-to-date slave as the master.

    To choose the most up-to-date slave, follow the steps below:

    1. Go to Solr Admin web interface using:

        ```http
        https://localhost:8443/solr
        ```

    2. Select the appropriate core from the **Core Selector** list.
    3. Select **Replication**.

        The Replication screen shows the current replication status for the core, and lets you enable/disable replication. It also displays the version of the master and slave servers.

    4. Identify the slave whose index is closest to the master server or pick a slave that has the highest version.
    ![]({% link insight-engine/images/slave-version.png %})

2. Stop the Solr server on the new master.
3. In the alfresco-insight-engine/solrhome/templates/re-rank/conf/solrconfig.xml file, replace the Solr configuration in the replication handler that defines the slave with the one that defines the master.

    ```bash
    <requestHandler name="/replication" class="org.alfresco.solr.handler.AlfrescoReplicationHandler"> 
        <!--
           To enable simple master/slave replication, uncomment one of the 
           sections below, depending on whether this solr instance should be
           the "master" or a "slave".  If this instance is a "slave" you will 
           also need to fill in the masterUrl to point to a real machine.
        -->
           <lst name="master">
             <str name="replicateAfter">commit</str>
             <str name="replicateAfter">startup</str>
             <str name="confFiles">schema.xml,stopwords.txt</str>
           </lst>
       <!--
           <lst name="slave">
             <str name="masterUrl">http://your-master-hostname:8983/solr</str>
             <str name="pollInterval">00:00:60</str>
           </lst>
        -->
    </requestHandler>
    ```

4. Set the following properties in the solrcore.properties file:

    ```bash
    enable.master=true
    enable.slave=false
    ```

5. Configure all other slave servers (if any) to point to the new master server. Make sure that the state of the slave indexes is either behind or equal to the state of the master server. For more information, see [Configuring Solr slave](#configuring-solr-slave).

After the previously broken master server is fixed, it can either be discarded, run as a slave, or run as a second master. To run as a slave, make sure it is behind the new master. It can be restored from a back up of another slave or the current master server.

## Solr master-master reconfiguration

Use this information for setting up a master-master replication.

1. Set up two separate Solr instances where neither of them know about each other.

    See [Configuring Search and Insight Engine]({% link insight-engine/1.1/config/index.md %}).

2. If you have a clustered environment, both the Solr installations can be done on their own Alfresco nodes in the cluster. If you don't have a clustered environment, both the Solr nodes can talk to their respective Alfresco node directly.

3. The Alfresco node can send queries to the load balancer and the load balancer can point them to either Solr node 1 (if it is up) or Solr node 2 (if Solr node 1 is down).

4. The load balancer will distribute the queries between the two Solr nodes, but then both the Solr nodes will be eventually consistent at different times.
