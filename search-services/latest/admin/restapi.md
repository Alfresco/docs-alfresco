---
title: SOLR Admin REST API
---
In addition to default SOLR Core Admin API actions, Alfresco SOLR provides several actions that can be executed via HTTP requests that specify an action parameter, with additional action specific arguments provided as additional parameters.

The Base URL for every action is:

```http
http://localhost:8983/solr/admin/cores?action=<action>
```

> **Note:** `<action>` is the name of the action to be invoked.

By default, responses are expressed in XML but if you add the URL parameter `wt=json` the response will be in JSON.

Every action response includes a `responseHeader` with the execution time and the status of the request.

```json
{
    "responseHeader": {
      "QTime": 1,
      "status": 0
  }
}
```

> **Note:** When the status is `0`, the request has been executed successfully. You do need to review all additional nodes in the response to check they also executed successfully. When the status isn't `0`, the server logs contain an internal error raised by the request.

## Synchronous Actions

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

The table shows the differences of the admin endpoints.

|Action|Master|Slave|
|------|------|-----|
|check|Returns an empty response from Solr (only the response header) without an error message.|Same as master.|
|nodereport*|Full node report response is returned.|Minimal node report response including a warning message that alerts you about the slave nature of the receiver (i.e. "This response comes from a slave core and it contains minimal information").|
|aclreport*|Full acl report response is returned.|A response with a warning message that will alert you that the action is not available on slave nodes.|
|txreport|Full Tx report response is returned.|A response with a warning message that will alert you that the action is not available on slave nodes.|
|acltxreport*|Full response is returned.|A response with a warning message that will alert you that the action is not available on slave nodes.|
|rangecheck|Full RangeCheck response (only if the core is using `DBID_RANGE` routing).|A response with a warning message that will alert you that the action is not available on slave nodes.|
|expand|Full Expand response (only if the core is using `DBID_RANGE` routing).|A response with a warning message that will alert you that the action is not available on slave nodes.|
|report|Full core report.|A response with a warning message that will alert you that the action is not available on slave nodes.|
|purge, reindex, retry, index, fix|Action correctly executed.|No action taken. Empty response returned.|
|summary*|Master/Standalone node summary.|Slave node summary (minimal, compared with master).|
|new core/new index|No difference between master and slave.|No difference between master and slave.|
|updatecore/updateindex|No difference between master and slave.|No difference between master and slave.|
|updateshared|No difference between master and slave.|No difference between master and slave.|
|removecore|No difference between master and slave.|No difference between master and slave.|
|newdefaultindex/newdefaultcore|No difference between master and slave.|No difference between master and slave.|
|log4j|No difference between master and slave.|No difference between master and slave.|

> **Note:** * If the `core` or `coreName` parameter is missing the response will return the report for each registered core.

## Actions for Reloading Resources

The following actions are for reloading property files in memory for SOLR Cores.

### `updateShared`

To update memory loading from the shared.properties file for each core.

```http
http://localhost:8983/solr/admin/cores?action=updateShared
```

### `log4j`

To update memory loading from the log4j.properties file for each core.

```http
http://localhost:8983/solr/admin/cores?action=log4j
```

## Asynchronous Actions

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

### `purge`

Add a `nodeid`, `txid`, `acltxid`, or `aclid` to be purged from a SOLR core or from every SOLR core on the next maintenance operation performed by `MetadataTracker` and `AclTracker`.

```http
http://localhost:8983/solr/admin/cores?action=purge
```

> **Note:** If indexing has been disabled the `purge` request cannot be executed. Enable indexing and then resubmit the command..

The optional URL parameters that can be added:

* **`core`**

    The name of the core to be purged.

* **`txid`**

    The number of the transaction to purge.

* **`acltxid`**

    The number of the ACL transaction to purge.

* **`nodeId`**

    The number of the node to purge.

* **`aclid`**

    The number of the ACL to purge.

### `reindex`

Add a `nodeid`, `txid`, `acltxid`, or `aclid` or SOLR query to be reindexed on a SOLR core or on every SOLR core on the next maintenance operation performed by the `MetadataTracker` and `AclTracker`. SOLR documents are removed and then indexed in this section.

```http
http://localhost:8983/solr/admin/cores?action=reindex
```

> **Note:** If indexing has been disabled the `reindex` request cannot be executed. Enable indexing and then resubmit the command..

The optional URL parameters that can be added:

* **`core`**

    The name of the core to be rendexed.

* **`txid`**

    The number of the transaction to reindex.

* **`acltxid`**

    The number of the ACL transaction to reindex.

* **`nodeId`**

    The number of the node to reindex.

* **`aclid`**

    The number of the ACL to purge.

* **`query`**

    The SOLR query to reindex the results, for example `cm:name:A*`.

### `retry`

Reindex every node marked as ERROR in a core or in every core. Error mode Ids are included in the response for every core.

```http
http://localhost:8983/solr/admin/cores?action=retry
```

> **Note:** If indexing has been disabled the `retry` request cannot be executed. Enable indexing and then resubmit the command..

The optional URL parameter that can be added:

* **`core`**

    The name of the core to be retried.

```json
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

### `fix`

Find transactions and ACLs missing or duplicated in the cores and add them to be reindexed on the next maintenance operation performed by `MetadataTracker` and `AclTracker` transactions. ACLs to be reindexed are included in the response.

```http
http://localhost:8983/solr/admin/cores?action=fix
```

> **Note:** If indexing has previously been disabled the `dryRun` parameter will be forced to be true which will result in no work being scheduled.

The optional URL parameters that can be added:

* **`core`**

    The name of the core to be fixed.

* **`dryRun`**

    This optional parameter when set to true generates a health report but reindex work is not scheduled. When set to false reindex work is scheduled. The default value is `true`.

* **`fromTxCommitTime`**

    This optional parameter indicates the lower bound (the minimum transaction commit time) of the target transactions that you want to check or fix.

* **`toTxCommitTime`**

    This optional parameter indicates the upper bound (the maximum transaction commit time) of the target transactions that you want to check or fix.

Sample `scheduled` response

```json
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

### `enable-indexing`

Starts the tracking process. The following syntax enables indexing on all (master or standalone) cores:

```http
http://localhost:8983/solr/admin/cores?action=enable-indexing
```

If you call the REPORT action there will be additional information returned

```xml
<str name="ACL Tracker>enabled</str>
<str name="Metadata Tracker>enabled</str>
```

If you call the SUMMARY action there will be additional information returned

```xml
<bool name="ACLTracker Enabled">true</str>
<bool name="MetadataTracker Enabled">true</str>
<bool name="ContentTracker Enabled">true</str>
<bool name="CascadeTracker Enabled">true</str>
```

The URL parameters that can be used:

* **`core` (Optional)**

    The name of the core. In the instance that it is missing the command is applied to all master or standalone cores.

### `disable-indexing`

Stops the tracking process. The following syntax disables indexing on all (master or standalone) cores.:

> **Note:** If tracking has started and this command is used then a rollback of all the trackers is performed. To start tracking again, use `enabled-indexing`.

```http
http://localhost:8983/solr/admin/cores?action=disable-indexing
```

If you call the REPORT action there will be additional information returned

```xml
<str name="ACL Tracker>enabled</str>
<str name="Metadata Tracker>enabled</str>
```

If you call the SUMMARY action there will be additional information returned

```xml
<bool name="ACLTracker Enabled">true</str>
<bool name="MetadataTracker Enabled">true</str>
<bool name="ContentTracker Enabled">true</str>
<bool name="CascadeTracker Enabled">true</str>
```

The URL parameters that can be used:

* **`core` (Optional)**

    The name of the core. In the instance that it is missing the command is applied to all master or standalone cores.

## Generic Reports

The following actions return the requested report for a core including nodes, transactions, and ACLs.

### `report`

Get a detailed report for a specific core or for every core. The API accepts filtering based on `commitTime`, `txid`, and `acltxid`.

```http
http://localhost:8983/solr/admin/cores?action=report
```

Optional URL parameters can be added:

* **`core`**

    The name of the core used to get the report.

* **`fromTime`**

    The time from transaction commit to filtering the report results.

* **`toTime`**

    The time to transaction commit to filtering the report results.

* **`fromTx`**

    From transaction Id to filtering report results.

* **`toTx`**

    To transaction Id time to filter report results.

* **`toCalTx`**

    To ACL tranasction Id to filter transaction Id time to filter report results.

Sample response

```json
{
  "responseHeader": {
    "QTime": 2834,
    "status": 0
  },
  "report": {
    "alfresco": {
      "Node count with FTSStatus Dirty": 0,
      "Last indexed change set commit time": 1580999915335,
      "Count of acl transactions in the index but not the DB": 0,
      "Index node count": 1783,
      "Last TX id before holes": -1,
      "Index unindexed count": 0,
      "Count of duplicate unindexed docs in the index": 0,
      "Index error count": 0,
      "Count of duplicated acl transactions in the index": 0,
      "Node count with FTSStatus Clean": 495,
      "Count of missing acl transactions from the Index": 0,
      "Last indexed transaction commit date": "2020-02-06T14:38:35",
      "DB transaction count": 557,
      "Last indexed change set commit date": "2020-02-06T14:38:35",
      "Count of missing transactions from the Index": 0,
      "Count of duplicate nodes in the index": 0,
      "Count of duplicated transactions in the index": 0,
      "Index unique acl transaction count": 223,
      "Index transaction count": 555,
      "DB acl transaction count": 225,
      "Last indexed transaction commit time": 1580999915357,
      "Index acl transaction count": 223,
      "Count of transactions in the index but not the DB": 0,
      "Alfresco version": "5.0.0",
      "Last changeset id before holes": -1,
      "Count of duplicate error docs in the index": 0,
      "Node count with FTSStatus New": 0,
      "Index unique transaction count": 555
    }
  }
}
```

The **`report`** action compares the database with the index and generates an overall status report with the following details:

* DB transaction count: the transaction count on the database.
* DB acl transaction count: the ACL transaction count on the database.
* Count of duplicated transactions in the index: the number of transactions that appear more than once in the index. The value of this property should be zero. If it isn't zero there is an issue with the index.
* Count of duplicated acl transactions in the index: the number of ACL transactions that appear more than once in the index. The value of this property should be zero. If it isn't zero there is an issue with the index.
* Count of transactions in the index but not the database: the number of transactions in the index but not in the database. This count includes empty transactions that have been purged from the database. The value of this property should be zero. If it isn't zero there is an issue with the index.
* Count of acl transactions in the index but not the DB: the number of ACL transactions in the index but not in the database. The value of this property should be zero. If it isn't zero there is an issue with the index.

    > **Note:** Empty ACL transactions are not purged from the database.

* Count of missing transactions from the Index: the number of transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.
* Count of missing acl transactions from the Index: the number of ACL transactions in the database but not in the index. The value of this property should be zero when the index is up-to-date.
* Index transaction count: the number of transactions in the index.
* Index acl transaction count: the number of ACL transactions in the index.
* Index unique transaction count: the number of unique transactions in the index.
* Index unique acl transaction count: the number of unique ACL transactions in the index.
* Index leaf count: the number of docs and folders in the index.
* Count of duplicate leaves in the index: the number of duplicate docs or folders in the index. The value of this property should be zero. If it isn't zero there is an issue with the index.
* Last index commit time: the time stamp for the last transaction added to the index. It also indicates that transactions after this time stamp have not yet been indexed.
* Last Index commit date: the time stamp set as a date for the last transaction added to the index. It also indicates that transactions after this date have not yet been indexed.
* Last TX id before holes: indicates that transactions after this ID will be checked again to make sure they have not been missed. This is computed from the index at start up time. By default, it is set an hour after the last commit time found in the index. Solr tracking, by default, goes back an hour from the current time to check that no transactions have been missed.
* First duplicate: indicates if there are duplicate transactions in the index. It returns the ID of the first duplicate transaction.
* First duplicate acl tx: indicates if there are duplicate ACL transactions in the index. It returns the ID of the first duplicate ACL transaction.
* First transaction in the index but not the DB: if the related count is > 0, it returns the ID of the first offender.
* First acl transaction in the index but not the DB: if the related count is > 0, it returns the ID of the first offender.
* First transaction missing from the Index: if the related count is > 0, it returns the ID of the first offender.
* irst acl transaction missing from the Index: if the related count is > 0, it returns the ID of the first offender.
* First duplicate leaf in the index: if the related count is > 0, it returns the ID of the first offender.

### `summary`

Get a detailed report for a core for every core including information related to handlers and trackers.

```http
http://localhost:8983/solr/admin/cores?action=summary&core=(coreName)
```

Optional URL parameters can be added:

* **`detail`**

    When true provides statistics per tracking thread.

* **`hist`**

    When true provides a histogram of the times taken for tracking operations for each tracking thread.

* **`values`**

    When true adds reports for the last 50 values recorded for each tracking operation for each thread.

    > **Note:** This parameter is boolean and when false returns 0 values for each tracking operation for each thread.

* **`reset`**

    When true resets all tracking statistics.

Sample response

```json
{
    "responseHeader":{
      "QTime":13,
      "status":0
    },
    "Summary":{
      "alfresco":{
          "Id for last Change Set in index":226,
          "MetadataTracker Active":false,
          "Alfresco Transactions in Index":555,
          "Date for last TX on server":"2020-02-06T14:41:59.950Z",
          "/alfresco":{
            "75thPcRequestTime":0,
            "5minRateRequestsPerSecond":0,
            "totalTime":0,
            "timeouts":0,
            "clientErrors":0,
            "requests":0,
            "avgRequestsPerSecond":0,
            "medianRequestTime":0,
            "serverErrors":0,
            "15minRateRequestsPerSecond":0,
            "avgTimePerRequest":0,
            "999thPcRequestTime":0,
            "handlerStart":1581000031727,
            "99thPcRequestTime":0,
            "errors":0,
            "95thPcRequestTime":0
        },
        "/cmis":{
            "75thPcRequestTime":0,
            "5minRateRequestsPerSecond":0,
            "totalTime":0,
            "timeouts":0,
            "clientErrors":0,
            "requests":0,
            "avgRequestsPerSecond":0,
            "medianRequestTime":0,
            "serverErrors":0,
            "15minRateRequestsPerSecond":0,
            "avgTimePerRequest":0,
            "999thPcRequestTime":0,
            "handlerStart":1581000031728,
            "99thPcRequestTime":0,
            "errors":0,
            "95thPcRequestTime":0
        },
        "Last Index Change Set Commit Time":1580999915335,
        "Model sync times (ms)":{
            "Mean":246.96260820000003,
            "StdDev":326.9164253039973,
            "Min":94.789114,
            "Start":"2020-02-06T14:40:33.545Z",
            "Max":1161.517117,
            "Varience":106874.34913354406,
            "N":10
        },
        "ContentTracker Active":false,
        "Alfresco Error Nodes in Index":0,
        "Acl index time (ms)":{
            "Mean":13.28818242857143,
            "StdDev":25.299723059509738,
            "Min":0.568837,
            "Start":"2020-02-06T14:40:40.367Z",
            "Max":99.07898,
            "Varience":640.0759868878888,
            "N":14
        },
        "Alfresco States in Index":2,
        "Doc Transformation time (ms)":{
            "Mean":134.3180220945674,
            "StdDev":122.68196650026313,
            "Min":12.922844,
            "Start":"2020-02-06T14:41:00.304Z",
            "Max":1585.515237,
            "Varience":15050.864904371685,
            "N":497
        },
        "/alfrescoAuthorityCache":{
            "lookups":0,
            "hits":0,
            "cumulative_evictions":0,
            "size":0,
            "hitratio":0,
            "evictions":0,
            "cumulative_lookups":0,
            "cumulative_hitratio":0,
            "warmupTime":0,
            "inserts":0,
            "cumulative_inserts":0,
            "cumulative_hits":0
        },
        "Approx content indexing time remaining":"0.095 Seconds",
        "Approx change sets remaining":1,
        "Approx transactions remaining":2,
        "/filterCache":{
            "lookups":15,
            "hits":15,
            "cumulative_evictions":0,
            "size":8,
            "hitratio":1,
            "evictions":0,
            "cumulative_lookups":15,
            "cumulative_hitratio":1,
            "warmupTime":0,
            "inserts":8,
            "cumulative_inserts":8,
            "cumulative_hits":15
        },
        "Last Index TX Commit Date":"2020-02-06T14:38:35.357Z",
        "TX Duration":"P0YT3M24.593S",
        "Searcher":{
            "numDocs":3269,
            "searcherName":"Searcher@b4ba711[alfresco] main",

"reader":"ExitableDirectoryReader(UninvertingDirectoryReader(Uninverting(_b(6.
6.0):C3268/355:delGen=1) Uninverting(_7(6.6.0):C1)
Uninverting(_c(6.6.0):C355)))",
             "deletedDocs":355,
             "registeredAt":"2020-02-06T14:41:20.191Z",
             "maxDoc":3624,
             "indexVersion":40,
             "warmupTime":0,
             "caching":true,

"readerDir":"org.apache.lucene.store.NRTCachingDirectory:NRTCachingDirectory(M
MapDirectory@/opt/alfresco-search-services/solrhome/alfresco/index
lockFactory=org.apache.lucene.store.NativeFSLockFactory@1fba8d61;
maxCacheMB=48.0 maxMergeSizeMB=4.0)",
              "openedAt":"2020-02-06T14:41:20.188Z"
            },
            "Per node B":2689,
            "Node index time (ms)":{
              "Mean":1.8261068141263945,
              "StdDev":3.3853503764200137,
              "Min":0.018597,
              "Start":"2020-02-06T14:40:41.487Z",
              "Max":97.921274,
              "Varience":11.460597171127128,
              "N":2690
            },
            "Active":false,
            "/alfrescoPathCache":{
              "lookups":0,
              "hits":0,
              "cumulative_evictions":0,
              "size":0,
              "hitratio":0,
              "evictions":0,
              "cumulative_lookups":0,
              "cumulative_hitratio":0,
              "warmupTime":0,
              "inserts":0,
              "cumulative_inserts":0,
              "cumulative_hits":0
            },
            "Change Set Lag":"204 s",
            "Alfresco Unindexed Nodes":0,
            "Id for last TX in index":885,
            "Approx change set indexing time remaining":"0.005 Seconds",
            "FTS":{
              "Node count with FTSStatus Dirty":0,
              "Node count with FTSStatus Clean":495,
              "Node count with FTSStatus New":0
            },
            "Date for last Change Set on server":"2020-02-06T14:41:59.890Z",
            "Total Searcher Cache (GB)":0,
            "Timestamp for last TX on server":1581000119950,
            "Last Index TX Commit Time":1580999915357,
            "/afts":{
              "75thPcRequestTime":0,
              "5minRateRequestsPerSecond":0,
              "totalTime":0,
              "timeouts":0,
              "clientErrors":0,
              "requests":0,
              "avgRequestsPerSecond":0,
              "medianRequestTime":0,
              "serverErrors":0,
              "15minRateRequestsPerSecond":0,
              "avgTimePerRequest":0,
              "999thPcRequestTime":0,
              "handlerStart":1581000031727,
              "99thPcRequestTime":0,
              "errors":0,
              "95thPcRequestTime":0
            },
            "/queryResultCache":{
              "lookups":27,
              "hits":16,
              "cumulative_evictions":0,
              "size":11,
              "hitratio":0.59,
              "evictions":0,
              "cumulative_lookups":27,
              "cumulative_hitratio":0.59,
              "warmupTime":0,
              "inserts":11,
              "cumulative_inserts":11,
              "cumulative_hits":16
            },
            "Timestamp for last Change Set on server":1581000119890,
            "Number of Searchers":1,
            "AclTracker Active":false,
            "Searcher-0":{
              "Searcher":{
                "numDocs":3269,
                "searcherName":"Searcher@b4ba711[alfresco] main",
"reader":"ExitableDirectoryReader(UninvertingDirectoryReader(Uninverting(_b(6.
6.0):C3268/355:delGen=1) Uninverting(_7(6.6.0):C1)
Uninverting(_c(6.6.0):C355)))",
                "deletedDocs":355,
                "registeredAt":"2020-02-06T14:41:20.191Z",
                "maxDoc":3624,
                "indexVersion":40,
                "warmupTime":0,
                "caching":true,
"readerDir":"org.apache.lucene.store.NRTCachingDirectory:NRTCachingDirectory(M
MapDirectory@/opt/alfresco-search-services/solrhome/alfresco/index
lockFactory=org.apache.lucene.store.NativeFSLockFactory@1fba8d61;
maxCacheMB=48.0 maxMergeSizeMB=4.0)",
"openedAt":"2020-02-06T14:41:20.188Z"
            }
         },
         "ModelTracker Active":false,
         "Alfresco Acl Transactions in Index":223,
         "Last Index Change Set Commit Date":"2020-02-06T14:38:35.335Z",
         "Docs/Tx":{
            "Mean":5.816216216216217,
            "StdDev":25.00964629977419,
            "Min":1,
            "Start":"2020-02-06T14:40:43.852Z",
            "Max":547,
            "Varience":625.4824080398088,
            "N":555
           },
           "Approx transaction indexing time remaining":"0.047 Seconds",
           "Id for last Change Set on server":227,
           "TX Lag":"204 s",
           "Alfresco Acls in Index":706,
           "Change Set Duration":"P0YT3M24.555S",
           "Id for last TX on server":887,
           "Alfresco Nodes in Index":1783,
           "On disk (GB)":"0.004466"
       }
   }
}
```

The `summary` action provides the status of the tracking index and reports the progress of each tracking thread and generates a report with the following details:

* Active: the tracker for the core active.
* Last Index Commit Time: the time stamp for the last transaction that was indexed.
* Last Index Commit Date: indicates the time stamp as a date for the last transaction that was indexed.

    > **Note:** Changes made after this time are not yet in the index.

* Lag: the difference in seconds between the last transaction time stamp on the server and the time stamp for the last transaction that was indexed.
* Duration: the time lag as an XML duration.
* Approx transactions remaining: the approximate number of transactions to index in order to bring the index up-to-date. It is calculated by using the last transaction ID on the server minus the last transaction ID indexed. It includes all the missing and empty transactions.
* Approx transaction indexing time remaining: it is based on approx transactions remaining, the average number of nodes per transaction and the average time to index a node (how long the index will take to be up-to-date). The estimate is seconds, minutes, hours and days.
* Model sync times (ms): summary statistics for the model sync time. It supports additional information with &detail=true, &hist=true and &value=true.
* Acl index time (ms): summary statistics for ACL index time. It supports additional information with &detail=true, &hist=true and &value=true.
* Node index time (ms): summary statistics for node index time. It supports additional information with &detail=true, &hist=true and &value=true.
* Acl tx index time (ms): summary statistics for ACL transaction index time. It supports additional information with &detail=true, &hist=true and &value=true.
* Tx index time (ms): summary statistics for transaction index time. It specifies the estimated time required to bring the index up-to-date.
* Docs/Tx: summary statistics for the number of documents per transaction. It supports additional information with &detail=true, &hist=true and &value=true.
* Doc Transformation time (ms): summary statistics for document transformation time. It supports additional information with &detail=true, &hist=true and &value=true.

## Specific Reports

The following actions return the requested report for a node, transaction, and an ACL.

### `nodeReport`

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

### `aclReport`

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

### `txReport`

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

### `aclTxreport`

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
