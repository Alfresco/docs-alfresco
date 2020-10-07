---
title: Indexing JMX client
---
You can use a JMX client, such as JConsole, for monitoring the status of all the available indexes, shards and its instances, and other related information.

The JMX view of all the instancess, shards, and indexes that stick together is displayed at the **MBeans > Alfresco > FlocAdmin > Attributes > Flocs** node. The **Flocs** node displays a tabular view of all the indexes formed by shard instances by registering with any member of the Alfresco Content Services cluster.

1. Open a command console.

2. Enter the following command:

    jconsole

    The **JConsole: New Connection** window displays.

3. Double-click on the Java process.

    For Tomcat, the Java process is usually labelled as `org.apache.catalina.startup.Bootstrap start`.

    The **Java Monitoring & Management** window displays.

4. Select the **MBeans** tab.

    The available managed beans display in JConsole.

5. Navigate to **Alfresco > FlocAdmin**.

    The **Attributes** and **Operations** display below it in the tree.

6. Select **Attributes**.

   * **Floc/Index level information**

        All instances that stick together to form an index have the same value for the following settings:

        |Attribute name|Description|Is configurable or displays state|Example value|
        |--------------|-----------|---------------------------------|-------------|
        |activeTrackingMode|Specifies if the instances for the index are all `SLAVE`, `MASTER`, or `MIXED`.> **Note:** The `SLAVE` and `MIXED` instances are not supported for a sharded installation.

        |State|`MASTER`|
        |hasContent|If the index contains content, the value of this attribute is `true`, otherwise `false`.|Configurable|`true`|
        |lowReplicaShards|Specifies a comma separated list of shards that have less than `maxReplicas`.|State| |
        |maxReplicas|Specifies the number of instances for the shard which has the maximum number of instances.|State|1|
        |maxRepoChangeSetId|Specifies the maximum changeset id in the repository.|State|`5029`|
        |maxRepoTxId|Specifies the maximum transaction id in the repository.|State|`16903`|
        |maxTransactions|Specifies the maximum number of transactions in any instance.|State| |
        |minReplicas|Specifies the number of instances for the shard which has the minimum number of instances.|State|`1`|
        |missingShards|Specifies a comma separated list of shards with no instances.|State| |
        |numberOfShards|Specifies the total number of shards.|Configurable|`2`|
        |shardMethod|Specifies how the nodes and ACLs are split into shards.|Configurable|`MOD_ACL_ID`|
        |shards|Click to display tabular data for each shard.|Displays details|**`Shards`**|
        |stores|Specifies the stores that are indexed.|Configurable|`workspace://SpacesStore`|
        |template|Specifies the name of the template used to create each core with common configuration.|Configurable|`rerank`|

      * **Shard level information**

        You can navigate through each shard using the tabular navigation.

        |Attribute name|Description|Is configurable or displays state?|Example value|
        |--------------|-----------|----------------------------------|-------------|
        |\#|Specifies the shard number.|Configurable|`0`|
        |activeCount|Specifies the number of instances that are currently able to answer queries.|State|`1`|
        |activeTrackingMode|Specifies if the instances for the shard are all `SLAVE`, `MASTER`, or `MIXED`.> **Note:** The `SLAVE` and `MIXED` instances are not supported for a sharded installation.

        |State|`MASTER`|
        |laggingCount|Specifies the number of instances that are currently unable to answer queries because they are too far behind.|State|0|
        |maxTransactionsRemaining|Specifies the maximum number of transactions left to index for any shard instance.|State|0|
        |maxTxId|Specifies the maximum number of transaction id indexes by any instance.|State|16903|
        |silentCount|Specifies the number of instances that are no longer tracking.|State| |
        |replicas|Provide details for each instance in the shard.|Displays details|**`Instances`**|

      * **Instance level information**

        |Attribute name|Description|Displays location or state?|Example value|
        |--------------|-----------|---------------------------|-------------|
        |baseUrl|Specifies the URL to access the instance.|Location|`/solr4/alfresco-0/`|
        |host|Specifies the host where the instance is located.|Location|`172.31.42.83`|
        |port|Specifies the port on the host where the instance is located.|Location| |
        |lastIndexedChangeSetCommitTime|Specifies the date and time of the last indexed changeset.|State|`Wed Oct 28 12:09:41 GMT 2015`|
        |lastIndexedChangeSetId|Specifies the last indexed changeset id in the repository.|State|5029|
        |lastIndexedTxCommitTime|Specifies the date and time of the last indexed transaction.|State|`Wed Oct 28 12:30:33 GMT 2015`|
        |lastIndexedTxId|Specifies the transaction id of the last indexed transaction.|State|`16903`|
        |lastUpdated|Specifies when the instance was last updated.|State|`Wed Oct 28 13:31:30 GMT 2015`|
        |state|Specifies if the instance state is `ACTIVE`, `SILENT`, or `LAGGING`.|State|`ACTIVE`|
        |trackingMode|Specifies if the tracking is performed by the master.|State|`MASTER`|
        |transactionsRemaining|Specifies the number of transactions remaining to be indexed.|State|`5`|

7. Select **Operations**.

     `removeAgedOutShards` removes all the shards which are too far behind and no longer tracking or are unresponsive.

     `removeAll` removes all the shards that have registered and starts from clean.

8. If you are using a sharded installation, go to **MBeans > Alfresco > Configuration > Search > managed > solr6 > Attributes** and set the number of filters using the `solr.defaultShardedFacetLimit` property.

    ```bash
    solr.defaultShardedFacetLimit=20
    ```

9. If you are using a non-sharded installation, go to **MBeans > Alfresco > Configuration > Search > managed > solr6 > Attributes** and set the number of filters using the `solr.defaultUnshardedFacetLimit` property.

    ```bash
    solr.defaultUnshardedFacetLimit=100
    ```
