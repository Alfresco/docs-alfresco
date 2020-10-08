---
title: Synchronous Actions
---
The execution of the action is performed as part of the request handling. An `action.status` value is included in the response that indicates if the action has been performed successfully or not. If the action fails, an additional `errorMessage` value is included in the response.

Generic `success` response:

```json
{
  "responseHeader": {
    "QTime": 1,
    "status": 0
  },
  "action": {
    "status": "success"
  }
}
```

Generic `error` response:

```json
{
   "responseHeader": {
      "QTime": 1,
      "status": 0
  },
  "action": {
    "errorMessage": "Core alfresco has NOT been created as storeRef param is required",
    "status": "error"
  }
}
```

## Actions for Cores

The following actions are for SOLR Core operations.

### `newCore` and its alias `newindex`

To create a new SOLR core.

```http
http://localhost:8983/solr/admin/cores?action=newCore&coreName=(coreName)&storeRef=(storeRef)
```

* **`(coreName)`**

    The name of the core you want to create.

* **`(storeRef)`**

    The name of the SOLR Core store. For example `workspace://SpaceStore`, `archive://SpaceStore`.

Optional URL parameters can be added to the URL.

* **`shardIds`**

    A string that includes a list of ShardIds that are separated with a comma.

* **`numShards`**

    The number of shards to be created.

* **`template`**

    The name of the SOLR template used to create the core (rerank, norerank).

* **`replicationFactor`**

    The number of core replicas.

* **`nodeInstance`**

    Number of the node instance.

* **`numNodes`**

    Number of nodes.

### `newDefaultIndex` and its alias `newdefaultcore`

To create a new core in SOLR with default settings.

```http
http://localhost:8983/solr/admin/cores?action=newDefaultIndex&coreName=(coreName)
```

* **`(coreName)`**

    The name of the core you want to create.

Optional URL parameters can be added to the URL.

* **`storeRef`**

    The name of the SOLR core store. For example workspace://SpaceStore, archive://SpaceStore.

* **`template`**

    The name of the SOLR template used to create the core (rerank, norerank).

### `updateCore` and its alias `updateindex`

To reload an existing core in Solr.

```http
http://localhost:8983/solr/admin/cores?action=updateCore&coreName=(coreName)
```

* **`(coreName)`**

    The name of the core you want to update.

### `check`

Enable check flag on a SOLR core or on every SOLR core.

```http
http://localhost:8983/solr/admin/cores?action=check
```

Optional URL parameters can be added to the URL.

* **`coreName`**

    The name of the core you want to create.

## Master/Slave differences of the admin endpoints
---
The table shows the differences of the admin endpoints.

|Action|Master|Slave|
|------|------|-----|
|check|Returns an empty response from Solr (only the response header) without an error message.

|Same as master.

|
|nodereport\*|Full node report response is returned.

|Minimal node report response including a warning message that alerts you about the slave nature of the receiver (i.e. "This response comes from a slave core and it contains minimal information").

|
|aclreport\*|Full acl report response is returned.

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|txreport|Full Tx report response is returned.

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|acltxreport\*|Full response is returned.|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|rangecheck|Full RangeCheck response (only if the core is using `DBID_RANGE` routing).

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|expand|Full Expand response (only if the core is using `DBID_RANGE` routing).

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|report|Full core report.

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|purge, reindex, retry, index, fix|Action correctly executed.

|No action taken. Empty response returned.

|
|summary\*|Master/Standalone node summary.

|Slave node summary (minimal, compared with master).

|
|new core/new index|No difference between master and slave.

|No difference between master and slave.

|
|updatecore/updateindex|No difference between master and slave.|No difference between master and slave.

|
|updateshared|No difference between master and slave.|No difference between master and slave.

|
|removecore|No difference between master and slave.|No difference between master and slave.

|
|newdefaultindex/newdefaultcore|No difference between master and slave.|No difference between master and slave.

|
|log4j|No difference between master and slave.|No difference between master and slave.

|

> **Note:** \* If the `core` or `coreName` parameter is missing the response will return the report for each registered core.

## Actions for Shards

The following actions are for SOLR shard operations.

## `rangecheck`

To get a detailed report including storage and sizing for the shards configured with the `Shard_DB_ID_RANGE` method.

> **Note:** If SOLR is not using this configuration, the node `expand` is set to `-1` in the response.

```http
http://localhost:8983/solr/admin/cores?action=rangecheck&coreName=(coreName)
```

-   **`(coreName)`**

    The name of the core you want to check.


Sample successful response:

```
{
  "responseHeader": {
    "QTime": 1,
    "status": 0
  },
  "action": {
    "status": "success"
  }
  "start": 0,
  "end": 10000,
  "nodeCount": 1000,
  "minDbid": 1,
  "maxDbid": 5000,
  "density": 50,
  "expand": 10000,
  "expanded": false
}
```

## `expand`

Use this to expand the range for a shard configured with the `DB_ID_RANGE` method when more than 75% of your space has been used. The configuration does not persist in the solrcore.properties file. If the expansion has not been applied, the node expand is set to `-1` in the response.

```http
http://localhost:8983/solr/admin/cores?action=expand&coreName=(coreName)&add=(add)
```

* **`(coreName)`**

    The name of the core you want to expand.

* **`(add)`**

    The count of the DB ID numbers to be added to the range.

Sample successful response:

```json
{
  "responseHeader": {
    "QTime": 1,
    "status": 0
  },
  "action": {
    "status": "success"
  }
  "expand": 10000
}
```

## Actions for Reloading Resources

The following actions are for reloading property files in memory for SOLR Cores.

## `updateShared`

To update memory loading from the shared.properties file for each core.

```http
http://localhost:8983/solr/admin/cores?action=updateShared
```

## `log4j`

To update memory loading from the log4j.properties file for each core.

```http
http://localhost:8983/solr/admin/cores?action=log4j
```
