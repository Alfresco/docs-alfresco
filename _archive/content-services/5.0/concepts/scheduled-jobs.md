---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Scheduled jobs

Alfresco runs a number of scheduled jobs that assist in the maintenance of a production environment.

These jobs are defined in the [scheduled-jobs-context.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/scheduled-jobs-context.xml) file.

|Scheduled job|Description|
|-------------|-----------|
|`contentStoreCleanerTrigger`|Launches the `contentStoreCleaner` bean, which identifies, and deletes or purges orphaned content from the content store while the system is running. Content is said to be orphaned when all references to a content binary have been removed from the metadata. By default, this job is triggered at 4:00 am each day. In a clustered environment, this job could be enabled on a headless \(non-public\) node only, which will improve efficiency.|
|`nodeServiceCleanupTrigger`|Performs cleanup operations on DM node data, including old deleted nodes and old transactions. In a clustered environment, this job could be enabled on a headless \(non-public\) node only, which will improve efficiency.|
|`tempFileCleanerTrigger`|Cleans up all Alfresco temporary files that are older than the given number of hours. Subdirectories are also emptied and all directories below the primary temporary subdirectory are removed. The job data must include the `protectHours` property, which is the number of hours to protect a temporary file from deletion since its last modification.|

**Parent topic:**[Monitoring Alfresco](../concepts/monitoring-intro.md)

