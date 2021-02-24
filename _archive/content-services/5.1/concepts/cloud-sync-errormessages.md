---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enterprise to Cloud Sync error messages

Use the following list of common error messages for troubleshooting the possible solutions.

|End user error message|Description|Possible causes|Solutions|
|----------------------|-----------|---------------|---------|
|Could not create sync|Authorized account is not suitable for synchronization|The network you are trying to authorize is not a standard, enterprise or partner network, or you have exceeded your Cloud storage quota.|Create and authorize a standard, enterprise or partner network.To prevent this issue, disable Enterprise to Cloud Sync on the replica on-premise server. For more information, see [Enterprise to Cloud Sync on replica on-premise instances](cloud-sync-config-instances.md#system).

|
|Unable to connect to the sync server|Unable to connect to Alfresco Cloud.|The server on which Alfresco Cloud is running is disconnected.|Connect to the synchronization server. If the server is down, contact Alfresco Cloud support.|
|Could not remove sync|Unable to remove synchronization|Files within the synchronized folder or its subfolders are locked for editing in Alfresco Cloud.|Make sure that all files within the synchronized folder and its subfolders are unlocked for editing in Alfresco Cloud.|
|Could not request sync|Unable to put in a request to synchronize content from on-premise cloud into Alfresco Cloud.|Your on-premise Alfresco, cannot communicate with the Alfresco Cloud.|Make sure that your on-premise Alfresco is up and running and that you are logged in to it.Make sure that Alfresco Cloud is up and running.

|
|A node already exists in the target folder with the same name|Unable to synchronize content between Alfresco Cloud and Alfresco Share on-premise|The node with the same name exists on Alfresco Cloud.|Rename the on-premise node and try syncing again or delete the node with the same name from Alfresco Cloud and try synchronizing again.|
|Target folder could not be found|The folder specified as the target folder does not exist in Alfresco Cloud.|The folder specified as the target folder for the synchronization does not exist on Alfresco Cloud.|Specify a different target folder on Alfresco Cloud or create a new folder with a matching name.|
|Content cannot be created, it is already synchronized from somewhere else|Content with the same name cannot be synchronized twice to the same location in Alfresco Cloud|Different users are trying to synchronize content item at the same time to the same Alfresco Cloud target location.|Synchronize content to a different location.|
|Content has already been synchronized from somewhere else|A content item can be synchronized only once and to one location in Alfresco Cloud.|The content item that you are trying to synchronize, has already been synchronized|Make sure that the content item does not exist anywhere else on Alfresco Cloud or that the content item has not already been synchronized.|
|Content no longer exists on the remote system|Unable to synchronize content as the content item no longer exists on cloud.|Content does not exist on Alfresco Cloud.|Make sure that the content item exists on Alfresco Cloud.|
|Content can not be updated, access denied|Unable to update content on Alfresco Cloud.|The user does not have permission to update content on Alfresco Cloud|Make sure that the user has the correct permissions to update content.|
|Content size violation \(limit exceeded\)|Unable to synchronize content on to Alfresco Cloud|The user has exceed the allocated content size limit for an individual file on a network.|Try to reduce the size of the content item, if that is not possible, contact Alfresco Support to request an increase to content size limit for individual file for your cloud Network.|
|Quota violation \(limit exceeded\)|Unable to synchronize content on to Alfresco Cloud|User has exceeded the allocated quota of storage space on cloud|Try to reduce the size of the content item and/or empty your trashcan by using the Account settings. If that is not possible, contact Alfresco Support to request an increase to the overall storage space quota for your cloud Network.|
|Unable to push changes for this node. The authentication details are no longer valid.|Unable to make any changes to the content on to this node in Alfresco Cloud.|The user has not provided valid authentication details|Make sure that the user has valid authentication details to gain access to the cloud.|
|Unable to push changes for this node. The owner no longer exists.|Unable to make any changes to the content on to this node in Alfresco Cloud.|The owner of this node no longer exists|Unsynchronize the content.|
|No network is enabled for sync|No network is enabled for synchronization|The user has not set the correct URL for Alfresco Cloud in the alfresco-global.properties file.|Set a valid URL for Alfresco Cloud in the alfresco-global.properties file and run on-premise Alfresco again.|

**Parent topic:**[Troubleshooting Enterprise to Cloud Sync](../concepts/cloud-sync-troubleshooting.md)

