# Alfresco SOLR Admin REST API

In addition to default SOLR Core Admin API actions, Alfresco SOLR provides several actions that can be executed via HTTP requests that specify an action parameter, with additional action specific arguments provided as additional parameters.

The Base URL for every action is:

```
http://localhost:8983/solr/admin/cores?action=<action>
```

**Note:** `<action>` is the name of the action to be invoked.

By default, responses are expressed in XML but if you add the URL parameter `wt=json` the response will be in JSON.

Every action response includes a `responseHeader` with the execution time and the status of the request.

```
{
    "responseHeader": {
      "QTime": 1,
      "status": 0
  }
}
```

**Note:** When the status is `0`, the request has been executed successfully. You do need to review all additional nodes in the response to check they also executed successfully. When the status isn't `0`, the server logs contain an internal error raised by the request.

## Action types

-   **Synchronous Actions**

    The execution of the action is performed as part of the request handling. An `action.status` value is included in the response that indicates if the action has been performed successfully or not. If the action fails, an additional `errorMessage` value is included in the response.

-   **Asynchronous Actions**

    The execution of the action is performed as part of the maintenance step in Tracker scheduled jobs. The `action.status` value in the response is always set to scheduled and the details of the action are logged with INFO level in classes `org.alfresco.solr.tracker.MetadataTracker` and `org.alfresco.solr.tracker.AclTracker`.

-   **Reports**

    The execution of these actions returns a response including details for the requested report.


-   **[Synchronous Actions](../concepts/solr-admin-sync-actions.md)**  
The execution of the action is performed as part of the request handling. An `action.status` value is included in the response that indicates if the action has been performed successfully or not. If the action fails, an additional `errorMessage` value is included in the response.
-   **[Asynchronous Actions](../concepts/solr-admin-asynchronous-actions.md)**  
The following actions are performed as part of a maintenance step in Tracker scheduled jobs. The value of `action.status` is always set to `scheduled` and the details of the action are logged with INFO level in classes `org.alfresco.solr.tracker.MetadataTracker` and `org.alfresco.solr.tracker.AclTracker`.
-   **[Generic Reports](../concepts/solr-admin-generic-reports.md)**  
The following actions return the requested report for a core including nodes, transactions, and ACLs.
-   **[Specific Reports](../concepts/solr-admin-specific-reports.md)**  
The following actions return the requested report for a node, transaction, and an ACL.

**Parent topic:**[Administering Alfresco Search and Insight Engine](../concepts/search-admin.md)

