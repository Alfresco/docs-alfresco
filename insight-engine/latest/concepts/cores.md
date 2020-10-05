---
title: Actions for Cores
---
The following actions are for SOLR Core operations.

## `newCore` and its alias `newindex`

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

## `newDefaultIndex` and its alias `newdefaultcore`

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

## `updateCore` and its alias `updateindex`

To reload an existing core in Solr.

```http
http://localhost:8983/solr/admin/cores?action=updateCore&coreName=(coreName)
```

* **`(coreName)`**

    The name of the core you want to update.

## `check`

Enable check flag on a SOLR core or on every SOLR core.

```http
http://localhost:8983/solr/admin/cores?action=check
```

Optional URL parameters can be added to the URL.

* **`coreName`**

    The name of the core you want to create.
