---
title: Creating Solr shards manually
---
You can control the distribution of your index by creating, configuring, and registering shards manually.

## Manual sharding overview

An index can be distributed over several Solr nodes by creating and configuring shards. This can be achieved in three steps. First, the Solr nodes (i.e. instances of Alfresco Content Services) must be started, second the shards must be created, and finally Alfresco Content Services must be configured to point to the Solr nodes.

1. Set the configuration properties that apply to all the cores in a Solr instance in the <ALFRESCO\_HOME>/alfresco-insight-engine/solrhome/conf/shared.properties file.

    For shard registration, Alfresco Content Services needs to know the Solr port where the requests should be sent. This can be configured, along with an explicit host name.

    ```bash
    solr.host=<hostname>
    solr.port=8983
    ```

    These properties will be used when registering all cores found under the <SOLR\_HOME> directory. For more information, see [About shared.properties file](../concepts/solr-shared-properties.md).

    Once the basic configuration is [complete](../concepts/solr-config-files.md#) then start the Solr nodes.

2. Setup and configure the Solr nodes.

### Example: Creating shards

Let's consider an example for creating 8 shards, 3 instances of each shard, and 6 Solr nodes. As shown below, each node will get 4 different shards.

    ||Shard 0|Shard 1|Shard 2|Shard 3|Shard 4|Shard 5|Shard 6|Shard 7|
    |--|-------|-------|-------|-------|-------|-------|-------|-------|
    |Node 1|x||||x|x|x||
    |Node 2||x||||x|x|x|
    |Node 3||x|x||||x|x|
    |Node 4|x||x|x||||x|
    |Node 5|x||x|x|x||||
    |Node 6||x||x|x|x|||

    To achieve this sharding configuration, follow the steps below for each Solr node N:

    1. Delete any existing `alfresco` and `archive` cores using the following commands.

        ```http
        https://<hostnameN>:8983/solr/admin/cores?action=removeCore&storeRef=workspace://SpacesStore&coreName=alfresco
        https://<hostnameN>:8983/solr/admin/cores?action=removeCore&storeRef=workspace://SpacesStore&coreName=archive
        ```

    2.  Recreate the sharded cores to set up index tracking.

        Call the following URLs:

        ```http
        http://<hostnameN>:<portN>/solr/admin/cores?action=newCore&storeRef=workspace://SpacesStore&numShards=8&nodeInstance=N&replicationFactor=3&numNodes=6&template=rerank
        http://<hostnameN>:<portN>/solr/admin/cores?action=newCore&storeRef=archive://SpacesStore&numShards=8&nodeInstance=N&replicationFactor=3&numNodes=6&template=rerank
        ```

    3.  For each core (alfresco and archive), the properties can be set at the creation time or updated later.

        ```http
        https://<hostnameN>:<portN>/solr/admin/cores?action=updateCore&storeRef=system://system&property.data.dir.store=<SOME_VALUE>
        ```

    You should now have six nodes with four cores, each actively tracking the repository. The following URL options are available for use:

    |URL option|Description|Example|
    |----------|-----------|-------|
    |numShards|Specifies the number of logical shards.|`8`|
    |storeRef|Specifies reference to a node store.|`workspace://SpacesStore`|
    |template|Defines the base configuration for a new Solr core with some configuration properties set using the URL as shown in Step 1(b).For more information, see [Core templates](../concepts/solr-core-templates.md).

    |`template=rerank`|
    |replicationFactor|Specifies the number of copies of each document (or, the number of physical instances to be created for each logical shard). A `replicationFactor` of 3 means that there will be 3 instances for each logical shard.|`3`|
    |nodeInstance|Specifies the Solr node instance being configured.|`6`|
    |numNodes|Returns the total number of Solr nodes.|`6`|
    |coreName|Specifies the name of the Solr core.|`alfresco`|
    |property.<>|Specifies the property and its value.|`property.data.dir.store=...`|

3. Configure Alfresco Content Services by setting the Solr subsystem properties.

    Set the three Solr subsystem properties for both the `alfresco` and `archive` cores in the alfresco-global.properties file. For example, you can set the properties as shown below:

    ```bash
    solr6.store.mappings.value.solrMappingAlfresco.nodeString=<hostname1>:<port1>/<url1>,<hostname2>:<port2>/<url2>
    solr6.store.mappings.value.solrMappingAlfresco.numShards=8
    solr6.store.mappings.value.solrMappingAlfresco.replicationFactor=3
    solr6.store.mappings.value.solrMappingArchive.nodeString=<hostname1>:<port1>/<url1>,<hostname2>:<port2>/<url2>
    solr6.store.mappings.value.solrMappingArchive.numShards=8
    solr6.store.mappings.value.solrMappingArchive.replicationFactor=3
    ```

    In the above examples, `nodeString` is a list of URLs where the `alfresco` core can be accessed.

    For a two node system with Solr node 1: `http://<hostname1>:<port1>/solr/#/alfresco`, and Solr node 2: `http://<hostname2>:<port2>/solr/#/alfresco`, then:

    ```bash
    solr6.store.mappings.value.solrMappingAlfresco.nodeString=<hostname1>:<port1>/solr/#/alfresco,<hostname2>:<port2>/solr/#/alfresco
    ```

    Similarly, set `nodeString` for the `archive` core.

    > **Note:** These properties can also be configured via a JMX client or using the subsystem properties to reference the composite beans.

> **Note:** If the host, port, or URL is missing, the subsystem default values (the ones set for a single index) will be used. Ensure the hosts are in the correct order. This is because Solr assumes that the shards are located on node 1, etc. as defined in the above list when generating queries. At query time, a Solr core is selected at random to do the distribution of all shards, again, selected at random.
