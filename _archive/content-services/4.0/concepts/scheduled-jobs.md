---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: scheduled jobs ftsIndexerTrigger contentStoreCleanerTrigger openOfficeConnectionTesterTrigger indexBackupTrigger tempFileCleanerTrigger avmOrphanReaperJob avmExpiredContentTrigger
---

# Scheduled jobs

Alfresco runs a number of scheduled jobs that assist in the maintenance of a production environment. These jobs are defined in the <configRoot\>/scheduled-jobs-context.xml file.

|Scheduled job|Description|
|-------------|-----------|
|`ftsIndexerTrigger`|Triggers the full text indexing of uploaded or modified documents.|
|`contentStoreCleanerTrigger`|Launches the `contentStoreCleaner` bean, which identifies, and deletes or purges orphaned content from the content store while the system is running. Content is said to be orphaned when all references to a content binary have been removed from the metadata. By default, this job is triggered at 4:00 am each day. In a clustered environment, this job could be enabled on a headless \(non-public\) node only, which will improve efficiency.|
|`nodeServiceCleanupTrigger`|Performs cleanup operations on DM node data, including old deleted nodes and old transactions. In a clustered environment, this job could be enabled on a headless \(non-public\) node only, which will improve efficiency.|
|`openOfficeConnectionTesterTrigger`|Maintains the connection with OpenOffice.|
|`indexBackupTrigger`|Creates a safe backup of the Lucene directories.|
|`tempFileCleanerTrigger`|Cleans up all Alfresco temporary files that are older than the given number of hours. Subdirectories are also emptied and all directories below the primary temporary subdirectory are removed. The job data must include the `protectHours` property, which is the number of hours to protect a temporary file from deletion since its last modification.|
|`avmOrphanReaperJob`|Quartz wrapper for OrphanReaper, which is a background thread for reaping nodes that are no longer referenced in the AVM repository. These orphans arise from purge operations.|
|`avmExpiredContentTrigger`|Searches for expired content in the web project staging area and prompts the last modifier of the content to review it.|
|`ehCacheTracerJob`|Collects detailed cache usage statistics and outputs them to the console, depending on how logging has been configured for the server. By default, this job is not activated. To activate this job, uncomment the `scheduler` property.|

**Parent topic:**[Monitoring Alfresco](../concepts/monitoring-intro.md)

