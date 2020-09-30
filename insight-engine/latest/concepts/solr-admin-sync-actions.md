# Synchronous Actions

The execution of the action is performed as part of the request handling. An `action.status` value is included in the response that indicates if the action has been performed successfully or not. If the action fails, an additional `errorMessage` value is included in the response.

Generic `success` response:

```
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

```
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

-   **[Actions for Cores](../concepts/solr-admin-actions-cores.md)**  
The following actions are for SOLR Core operations.
-   **[Master/Slave differences of the admin endpoints](../concepts/slave-master-diff-admin-endpoints.md)**  

-   **[Actions for Shards](../concepts/solr-admin-actions-shards.md)**  
The following actions are for SOLR shard operations.
-   **[Actions for Reloading Resources](../concepts/solr-admin-action-reload-resources.md)**  
The following actions are for reloading property files in memory for SOLR Cores.

**Parent topic:**[Alfresco SOLR Admin REST API](../concepts/alfresco-solr-admin-rest-api.md)

