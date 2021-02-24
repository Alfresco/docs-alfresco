---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Enterprise to Cloud Sync error scenarios

These are examples of typical error scenarios for Enterprise to Cloud Sync.

**Transient sync failure**

If the target system is unavailable to the source system \(for example, due to a network connectivity issue, maintenance, or an unscheduled outage\) the user in the source system will see `Temporary sync error` failures in the Document Library user interface for affected sync set member nodes.

The source system logs will show:

```
ERROR [repo.remoteconnector.RemoteConnectorServiceImpl] [DefaultScheduler_Worker-1] executeRequest: remote connector server exception:  
[503] Service Unavailable: Back-end server is at capacity
```

To diagnose a connectivity related problem, check that [my.alfresco.com](https://my.alfresco.com) is available. For my.alfresco.com, check [status.alfresco.com](http://status.alfresco.com/).

During connectivity problem, users in the on-premise source system are also not able to manage sync sets. For example, it is not possible for a user in the source system to invoke actions which need to synchronously connect to my.alfresco.com.

In these circumstances, it will not be possible to create a new sync set. The **Sync to Cloud** action fails because it is not possible to connect to my.alfresco.com to select a target folder.

Similarly, the user will not be able to add \(or edit\) their remote credentials either when creating their first sync set or via their user profile \(**Cloud Sync -\> Sign in to Alfresco in the Cloud**\). Instead, users see an error in Share, such as **Unable to validate credentials**.

Once the target system is available, you will see the following message in the log:

```
INFO  [repo.sync.SyncTrackerComponent] [DefaultScheduler_Worker-2] Remote system is available
```

**Non-transient sync failure**

Should a sync failure occur while both the Source and Target systems are online and connected, the user will be notified in the Share document library user interface. They have the option to "Request Sync" \(to re-create the nodes in the target\) or "Unsync from Cloud".

These are the declared types of sync exceptions that can cause a sync to fail:

-   `TARGET_FOLDER_NAME_CLASH`: When a node \(folder or file\) is synced to Cloud and at the target location there is already a node with the same name.
-   `TARGET_NODE_OTHER_SYNC_SET`: When a sync definition identified from a change event is different from the definition of which the target node is currently part of.  The possible cause is that the change audit log is consumed after the nodes were unsynced/synced, so the target node is part of a different sync set.
-   `TARGET_NODE_ALREADY_SYNCED`: When trying to sync a node with the same name as a document/folder already existing on the target, synced from a different location.
-   `TARGET_NODE_NO_LONGER_EXISTS`: When a synced node is deleted from the target \(but the sync set is not configured to also delete from the source\) then further updates to the source node will cause a sync failure, since the target no longer exists.
-   `DELETED_ON_CLOUD`: When content is pushed to Cloud, but the target location was deleted.
-   `OWNER_NOT_FOUND`: Push is done as the creator/owner of the sync definition. If the user no longer exists, the sync operation will fail.  A solution is for the administrator user to become the new owner of the sync definition by using the action **Become Owner** in the Cloud Sync Manager console, or, alternatively, to unsync the node.
-   `SOURCE_NODE_ACCESS_DENIED / TARGET_NODE_ACCESS_DENIED`: The user does not have permission to update content on Alfresco on-premise / Cloud.
-   `CONTENT_LIMIT_VIOLATION`: When content changes pushed to the target system exceed the allocated content size limit for an individual file on a network.
-   `QUOTA_LIMIT_VIOLATION`: When changes pushed to the target system go over the user's network quota.
-   `AUTHENTICATION_ERROR`: When the authentication details of the linked Cloud account are no longer valid.
-   `UNKNOWN`: Any other unidentified exception that causes a sync operation to fail.

Another more subtle example might be that a node already exists with the same name but is not part of the sync set. This might occur if a directly synced document \(or folder\) is moved into another synced folder and subsequent changes attempt to add the same document \(or folder\) in the other system.

A failed sync is marked on the source node by adding:

-   the `sync:failed` aspect
-   properties describing the exception: `sync:errorCode`, `sync:errorDetails`, and `sync:errorTime`

For more information on troubleshooting synchronization problems, see [Troubleshooting Enterprise to CloudSync](cloud_sync_troubleshooting.md).

**Parent topic:**[Supported Use Cases for Enterprise to Cloud Sync](../concepts/cloud-sync-supported-use-cases.md)

