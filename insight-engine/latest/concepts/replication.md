---
title: Solr replication configuration
---
The Solr replication feature is implemented as a `RequestHandler`. The simplest configuration involves one Alfresco Content Services node, one Solr master, and one Solr slave.

The Solr master is configured to track the Alfresco Content Services instance while the Solr slave is configured to track the Solr master. The Alfresco Content Services instance is configured to send all the queries to the SOLR slave.

![](../images/solr-replication-conf.png)

## Configuring the Alfresco Content Services instance

As usual, no SSL queries configured go to the slave.

### Configuring Solr master

The configuration affecting replication is controlled by a single file, alresco-insight-engine/solrhome/templates/re-rank/conf/solrconfig.xml. To configure the master server, follow the steps below:

1. Edit the alresco-insight-engine/solrhome/templates/re-rank/conf/solrconfig.xml file on the master server to change the default replication handler configuration. Remember to uncomment the `master` section.

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

    |Parameter name|Description|
    |--------------|-----------|
    |`replicateAfter`|String specifying action after which replication should occur. Valid values are:    -   `commit`: triggers replication whenever a commit is performed on the master index.
    -   `optimize`: triggers replication whenever the master index is optimized.
    -   `startup`: triggers replication whenever the master index starts up.
There can be multiple values for this parameter. If you use `startup`, you need to have a `commit` and/or `optimize` entry also if you want to trigger replication on future commits or optimizes.|
    |`confFiles`|Comma-separated list of configuration files to replicate.|

2.  Make sure that the solrcore.properties file has the following settings:

    ```bash
    enable.master=true
    enable.slave=false
    ```

### Configuring Solr slave

Here again, the solrconfig.xml file controls the configuration affecting replication. To configure the slave server, follow the steps below:\`

1.  Uncomment the `slave` section.

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
    |`pollInterval`|Interval in which the slave should poll master .Format is *hh:mm:ss*. If this is missing, the slave server does not poll automatically.|
    |`masterUrl`|Fully qualified URL for the replication handler of master. Make sure the `masterUrl` ends with <tomcat base url\>/solr/alfresco.|

2.  Set the master URL to point to the Solr master. Also, set how often the slave server should poll for changes.

    ```bash
    <str name="masterUrl">http://your-master-hostname:8983/solr/alfresco</str>
    <str name="pollInterval">00:00:60</str>
    ```

3.  Set the following properties in the solrcore.properties file:

    ```bash
    enable.master=false
    enable.slave=true
    ```

    In this configuration, the Solr instance will only track model changes from the Alfresco Content Services platform.


**Additional Solr configuration**

Any configuration changes related to the core schema and configuration, or any changes in <solr\_home\>/conf must be made to all Solr instances. Replication can be configured to manage the distribution of other core related configuration files.
