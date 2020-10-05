---
title: Specific Reports
---
The following actions return the requested report for a node, transaction, and an ACL.

## `nodeReport`

Get a report from a nodeId with the associated `txId` and the indexing status.

```http
http://localhost:8983/solr/admin/cores?action=nodeReport&nodeid=(nodeid)
```

* **`(nodeid)`**

    The Id of the node to get the report.

Optional URL parameters can be added:

* **`core`**

    The name of the core used to get the report.

Sample response.

```json
{
  "responseHeader": {
    "QTime": 110,
    "status": 0
  },
  "report": {
    "alfresco": {
      "Node DBID": 200,
      "DB TX status": "UPDATED",
      "DB TX": 6,
      "Indexed Node Doc Count": 0
    },
    "archive": {
      "Node DBID": 200,
      "DB TX status": "UPDATED",
      "DB TX": 6,
      "Indexed Node Doc Count": 0
    }
  }
}
```

## `aclReport`

Get a report from an aclId with the count of documents associated with the ACL.

```http
http://localhost:8983/solr/admin/cores?action=aclReport&aclid=(aclid)
```

* **`(aclid)`**

    The Id of the ACL to get the report.

Optional URL parameters can be added:

* **`core`**

    The name of the core used to get the report.

Sample response.

```json
{
  "responseHeader": {
    "QTime": 31,
    "status": 0
  },
  "report": {
    "alfresco": {
      "Acl doc in index": 1,
      "Acl Id": 1
    },
    "archive": {
        "Acl doc in index": 1,
        "Acl Id": 1
    }
  }
}
```

## `txReport`

Get a report from a txId with detailed information related to the transaction.

```http
http://localhost:8983/solr/admin/cores?action=txReport&txid=(txid)
```

* **`(txid)`**

    The Id of the transaction to get the report.

Optional URL parameters can be added:

* **`core`**

    The name of the core used to get the report.

Sample response.

```json
{
  "responseHeader": {
    "QTime": 162,
  "status": 0
  },
  "report": {"alfresco": {
    "txDbNodeCount": 0,
    "nodes": {},
    "TXID": 1,
    "transaction": {
        "Node count with FTSStatus Dirty": 0,
        "Last indexed change set commit time": 1581004383258,
        "Count of acl transactions in the index but not the DB": 0,
        "Index node count": 1837,
        "Last TX id before holes": -1,
        "Index unindexed count": 0,
        "Count of duplicate unindexed docs in the index": 0,
        "Index error count": 0,
        "Count of duplicated acl transactions in the index": 0,
        "Node count with FTSStatus Clean": 501,
        "Count of missing acl transactions from the Index": 0,
        "Last indexed transaction commit date": "2020-02-06T15:53:03",
        "DB transaction count": 1,
        "Last indexed change set commit date": "2020-02-06T15:53:03",
        "Count of missing transactions from the Index": 0,
        "Count of duplicate nodes in the index": 0,
        "Count of duplicated transactions in the index": 0,
        "Index unique acl transaction count": 235,
        "Index transaction count": 568,
        "DB acl transaction count": 0,
        "Last indexed transaction commit time": 1581004383280,
        "Index acl transaction count": 235,
        "Count of transactions in the index but not the DB": 0,
        "Alfresco version": "5.0.0",
        "Last changeset id before holes": -1,
        "Count of duplicate error docs in the index": 0,
        "Node count with FTSStatus New": 0,
        "Index unique transaction count": 568
    }
  }}
}
```

## `aclTxreport`

Get a report from a aclTxId with detailed information related to nodes indexed for an ACL inside a transaction.

```http
http://localhost:8983/solr/admin/cores?action=aclTxReport&acltxid=(acltxid)
```

* **`acltxid`**

    The Id of the ACL transaction to get the report.

Optional URL parameters can be added:

 **`core`**

   The name of the core to get the report.

Sample response.

```json
{
    "responseHeader": {
      "QTime": 296,
        "status": 0
    },
    "report": {
      "alfresco": {
         "nodes": {
            "ACLID 1": {
                "Acl doc in index": null,
                "Acl Id": 1
            },
            "ACLID 2": {
                "Acl doc in index": null,
                "Acl Id": 2
            }
          },
          "aclTxDbAclCount": 2,
          "TXID": 1,
          "transaction": {
            "Node count with FTSStatus Dirty": 0,
            "Last indexed change set commit time": 1581004503216,
            "Count of acl transactions in the index but not the DB": 0,
            "Index node count": 1846,
            "Last TX id before holes": -1,
            "Index unindexed count": 0,
            "Count of duplicate unindexed docs in the index": 0,
            "Index error count": 0,
            "Count of duplicated acl transactions in the index": 0,
            "Node count with FTSStatus Clean": 502,
            "Count of missing acl transactions from the Index": 0,
            "Last indexed transaction commit date": "2020-02-06T15:55:03",
            "DB transaction count": 0,
            "Last indexed change set commit date": "2020-02-06T15:55:03",
            "Count of missing transactions from the Index": 0,
            "Count of duplicate nodes in the index": 0,
            "Count of duplicated transactions in the index": 0,
            "Index unique acl transaction count": 237,
            "Index transaction count": 571,
            "DB acl transaction count": 1,
            "Last indexed transaction commit time": 1581004503241,
            "Index acl transaction count": 237,
            "Count of transactions in the index but not the DB": 0,
            "Alfresco version": "5.0.0",
            "Last changeset id before holes": -1,
            "Count of duplicate error docs in the index": 0,
            "Node count with FTSStatus New": 0,
            "Index unique transaction count": 571
          }
        }
    }
}
```
