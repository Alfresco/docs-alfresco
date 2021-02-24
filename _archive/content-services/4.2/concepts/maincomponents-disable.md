---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Disabling Alfresco features

You can disable common product components if you do not require them for your Alfresco instance. This summary gives the example property settings for disabling the main components.

**Note:** **If you are unsure of the effect of disabling a feature, contact Alfresco Support for recommendations.**

Add the following property settings to the alfresco-global.properties file.

|Property|Description|
|--------|-----------|
|system.usages.enabled=false|Disables quotas or user usages.**Note:** When using Enterprise to Cloud Sync, avoid setting this property to true, as the service may be impacted. For example, when a quota is reached and it is no longer possible to push new content to the on-premise Alfresco, you will still be able to push content to the Cloud \(new version or new content\). The on-premise Alfresco will attempt to pull the modifications locally but will fail because of the quota limit, and this may cause an inconsistency between Cloud and on-premise Alfresco.

|
|replication.enabled=false|Disables content replication.|
|audit.enabled=false|Specifies a way to globally enable or disable the auditing framework.|
|cifs.enabled=false|Specifies whether to enable or disable the CIFS server.|
|ftp.enabled=false|Specifies whether to enable or disable the FTP server.|
|system.workflow.engine.jbpm.enabled=false|Specifies whether to enable or disable the jBPM workflow engine. The jBPM workflow engine is disabled by default.|
|system.workflow.engine.activiti.enabled=false|Specifies whether to enable or disable the Activiti workflow engine. The Activiti workflow engine is enabled by default.|
|transferservice.receiver.enabled=false|Disables the Transfer or Replication Service receiver.|
|sync.mode=OFF|Use this property to disable synchronization permanently.|
|lucene.indexer.cacheEnabled=false|Specifies whether to enable or disable index level caching.|
|lucene.indexer.contentIndexingEnabled=false|Specifies whether or not the content of the document is indexed. If false, content is not indexed.|
|index.tracking.cronExpression=\* \* \* \* \* ? 2099|Specifies the scheduled Lucene index tracking for the future.**Note:** Do not use this property if you are using `index.subsystem.name=lucene`

|
|audit.alfresco-access.enabled=false|To enable generation of audit data that you can view in Explorer or Share, you will need to enable the `audit.alfresco-access.enabled` property.|
|audit.filter.alfresco-access.default.enabled=false|Disables auditing of Alfresco accesses.**Note:** Do not use this property if you require auditing.

|
|home.folder.creation.eager=false|Disables the automatic creation of home folder for new users.|
|db.schema.update=false|Specifies whether the system bootstrap should create or upgrade the database schema automatically.|
|syncService.mode=OFF|Disables Enterprise to Cloud Sync.|
|activities.feed.notifier.enabled=false|Disables the Share Activities email notification.|
|sync.pullJob.enabled=false|Use this Enterprise to Cloud Sync property to disable synchronization temporarily.|
|sync.pushJob.enabled=false|Use this Enterprise to Cloud Sync property to disable synchronization temporarily.|

**Parent topic:**[Day Zero configuration](../concepts/zeroday-config.md)

**Parent topic:**[Configuration overview](../concepts/configuration-overview.md)

