---
title: Asynchronous Actions
---
The following actions are performed as part of a maintenance step in Tracker scheduled jobs. The value of `action.status` is always set to `scheduled` and the details of the action are logged with INFO level in classes `org.alfresco.solr.tracker.MetadataTracker` and `org.alfresco.solr.tracker.AclTracker`.

Sample `scheduled` Response:

```json
{
  "responseHeader": {
    "QTime": 1,
    "status": 0
  },
  "action": {
    "status": "scheduled"
  }
}
```

## `purge`

Add a `nodeid`, `txid`, `acltxid`, or `aclid` to be purged from a SOLR core or from every SOLR core on the next maintenance operation performed by `MetadataTracker` and `AclTracker`.

```http
http://localhost:8983/solr/admin/cores?action=purge
```

> **Note:** If indexing has been disabled the `purge` request cannot be executed. Enable indexing and then resubmit the command..

The optional URL parameters that can be added:

-   **`core`**

    The name of the core to be purged.

-   **`txid`**

    The number of the transaction to purge.


-   **`acltxid`**

    The number of the ACL transaction to purge.


-   **`nodeId`**

    The number of the node to purge.

-   **`aclid`**

    The number of the ACL to purge.


## `reindex`

Add a `nodeid`, `txid`, `acltxid`, or `aclid` or SOLR query to be reindexed on a SOLR core or on every SOLR core on the next maintenance operation performed by the `MetadataTracker` and `AclTracker`. SOLR documents are removed and then indexed in this section.

```http
http://localhost:8983/solr/admin/cores?action=reindex
```

> **Note:** If indexing has been disabled the `reindex` request cannot be executed. Enable indexing and then resubmit the command..

The optional URL parameters that can be added:

-   **`core`**

    The name of the core to be rendexed.

-   **`txid`**

    The number of the transaction to reindex.


-   **`acltxid`**

    The number of the ACL transaction to reindex.


-   **`nodeId`**

    The number of the node to reindex.

-   **`aclid`**

    The number of the ACL to purge.

-   **`query`**

    The SOLR query to reindex the results, for example `cm:name:A*`.


## `retry`

Reindex every node marked as ERROR in a core or in every core. Error mode Ids are included in the response for every core.

```
http://localhost:8983/solr/admin/cores?action=retry 
```

> **Note:** If indexing has been disabled the `retry` request cannot be executed. Enable indexing and then resubmit the command..

The optional URL parameter that can be added:

-   **`core`**

    The name of the core to be retried.


```
{
  "responseHeader": {
    "QTime": 1,
    "status": 0
  },
  "action": {
    "status": "scheduled",
    "alfresco": [1, 2]
  }
}
```

## `fix`

Find transactions and ACLs missing or duplicated in the cores and add them to be reindexed on the next maintenance operation performed by `MetadataTracker` and `AclTracker` transactions. ACLs to be reindexed are included in the response.

```
http://localhost:8983/solr/admin/cores?action=fix
```

> **Note:** If indexing has previously been disabled the `dryRun` parameter will be forced to be true which will result in no work being scheduled.

The optional URL parameters that can be added:

-   **`core`**

    The name of the core to be fixed.

-   **`dryRun`**

    This optional parameter when set to true generates a health report but reindex work is not scheduled. When set to false reindex work is scheduled. The default value is `true`.

-   **`fromTxCommitTime`**

    This optional parameter indicates the lower bound (the minimum transaction commit time) of the target transactions that you want to check or fix.

-   **`toTxCommitTime`**

    This optional parameter indicates the upper bound (the maximum transaction commit time) of the target transactions that you want to check or fix.


Sample `scheduled` response

```
{
  {
     "responseHeader": {    
         "QTime": 1,   
         "status": 0
  },   
  "action": {     
      "status": "scheduled",     
      "txToReindex": {        
        "txInIndexNotInDb": {              
             "192": 282  <- Tx 192 is associated to 282 nodes (they will be deleted)        
             "827": 99   <- Tx 827 is associated to 99 nodes (they will be deleted)
              ...
         },        
        "duplicatedTx": {
             "992": 8  <- Tx 992 is associated to 8 nodes (they will be deleted)              
             "127": 82   <- Tx 127 is associated to 82 nodes (they will be deleted)
             ...
        },        
        "missingTx": {
             "888": 84  <- Tx 888 is associated to 84 nodes (they will be added/replaced in the index)
             "929": 12   <- Tx 929 is associated to 12 nodes (they will be added/replaced in the index)
             ...
        }
      }, 
      "aclChangeSetToReindex": {
            // Provides the same subsection as txToReindex, 
            // ACLTXID -> ACLs counts instead of TXID -> DBID   
      }
}
```

## `enable-indexing`

Starts the tracking process. The following syntax enables indexing on all (master or standalone) cores:

```
http://localhost:8983/solr/admin/cores?action=enable-indexing 
```

If you call the REPORT action there will be additional information returned

```
<str name="ACL Tracker>enabled</str> 
<str name="Metadata Tracker>enabled</str>
```

If you call the SUMMARY action there will be additional information returned

```
<bool name="ACLTracker Enabled">true</str>
<bool name="MetadataTracker Enabled">true</str>
<bool name="ContentTracker Enabled">true</str>
<bool name="CascadeTracker Enabled">true</str>
```

The URL parameters that can be used:

-   **`core` (Optional)**

    The name of the core. In the instance that it is missing the command is applied to all master or standalone cores.


## `disable-indexing`

Stops the tracking process. The following syntax disables indexing on all (master or standalone) cores.:

> **Note:** If tracking has started and this command is used then a rollback of all the trackers is performed. To start tracking again, use ENABLED-INDEXING.

```
http://localhost:8983/solr/admin/cores?action=disable-indexing 
```

If you call the REPORT action there will be additional information returned

```
<str name="ACL Tracker>enabled</str> 
<str name="Metadata Tracker>enabled</str>
```

If you call the SUMMARY action there will be additional information returned

```
<bool name="ACLTracker Enabled">true</str>
<bool name="MetadataTracker Enabled">true</str>
<bool name="ContentTracker Enabled">true</str>
<bool name="CascadeTracker Enabled">true</str>
```

The URL parameters that can be used:

-   **`core` (Optional)**

    The name of the core. In the instance that it is missing the command is applied to all master or standalone cores.


**Parent topic:**[Alfresco SOLR Admin REST API](../concepts/alfresco-solr-admin-rest-api.md)

