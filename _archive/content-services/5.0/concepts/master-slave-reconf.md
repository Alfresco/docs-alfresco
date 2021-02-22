---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr master-slave reconfiguration

This topic describes some additional master-slave configuration requirements, such as adding a slave server and promoting a slave server.

**Adding a slave server**

To add another slave server to an existing replication configuration, see [configuring Solr slave](solr-replication-conf.md).

**Promoting a slave**

In the event of a downed master in a master-slave configuration, the slave servers can continue to service queries, but will no longer be able to index until a new master is instated. The process of promoting a slave to a master is manual. The state of slave servers may differ, so choose the most up-to-date slave to promote as the master server.

To promote a slave, follow the steps below:

1.  Nominate the most up-to-date slave as the master.

    To choose the most up-to-date slave, follow the steps below:

    1.  Go to Solr 4 Admin web interface using [https://localhost:8443/solr4](https://localhost:8443/solr4).
    2.  Select the appropriate core from the **Core Selector** list.
    3.  Select **Replication**.

        The Replication screen shows the current replication status for the core, and lets you enable/disable replication. It also displays the version of the master and slave servers.

    4.  Identify for the slave whose index is closest to the master server or pick a slave that has the highest version.
    ![](../images/slave-version.png)

2.  Stop the Solr server on the new master.
3.  In the solrconfig.xml file, replace the Solr configuration in the replication handler that defines the slave with the one that defines the master.

    ```
    <requestHandler name="/replication" class="solr.ReplicationHandler" > 
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

4.  Set the following properties in the solrcore.properties file:

    ```
    enable.master=true
    enable.slave=false
    ```

5.  Configure all other slave servers \(if any\) to point to the new master server. Make sure that the state of the slave indexes is either behind or equal to the state of the master server. For more information, see [configuring Solr slave](solr-replication-conf.md).

After the previously broken master server is fixed, it can either be discarded, run as a slave, or run as a second master. To run as a slave, make sure it is behind the new master. It can be restored from a back up of another slave or the current master server.

**Parent topic:**[Solr 4 replication](../concepts/solr-replication.md)

**Related information**  


[See Index Replication in Apache Solr 4.10 Reference Guide](https://archive.apache.org/dist/lucene/solr/ref-guide/apache-solr-ref-guide-4.10.pdf)

