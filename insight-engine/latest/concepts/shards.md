---
title: Actions for Shards
---
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
