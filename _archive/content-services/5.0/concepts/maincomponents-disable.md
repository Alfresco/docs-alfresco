---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Disabling Alfresco Features

You can disable common product components, if you do not require them for your Alfresco instance. This summary gives the example property settings for disabling the main components.

**Note:** If you are unsure of the effect of disabling a feature, contact Alfresco Support for recommendations.

Add the following property settings to the alfresco-global.properties file:

|Property|Description|
|--------|-----------|
|system.usages.enabled=false|Disables quotas or user usages.**Note:** When using Enterprise to Cloud Sync, avoid setting this property to true, as the service may be impacted. For example, when a quota is reached and it is no longer possible to push new content to the on-premise Alfresco, you will still be able to push content to the Cloud \(new version or new content\). The on-premise Alfresco will attempt to pull the modifications locally but will fail because of the quota limit, and this may cause an inconsistency between Cloud and on-premise Alfresco.

|
|audit.enabled=false|Specifies a way to globally enable or disable the auditing framework.|
|cifs.enabled=false|Specifies whether to enable or disable the CIFS server.|
|system.workflow.engine.jbpm.enabled=false|Specifies whether to enable or disable the jBPM workflow engine. The jBPM workflow engine is disabled by default.|
|system.workflow.engine.activiti.enabled=false|Specifies whether to enable or disable the Activiti workflow engine. The Activiti workflow engine is enabled by default.|
|sync.mode=OFF|Use this property to disable synchronization permanently.|
|audit.alfresco-access.enabled=false|Disables generation of audit data.|
|home.folder.creation.eager=false|Disables the automatic creation of home folder for new users.|
|db.schema.update=false|Specifies whether the system bootstrap should create or upgrade the database schema automatically.|
|syncService.mode=OFF|Disables Enterprise to Cloud Sync.|
|activities.feed.notifier.enabled=false|Disables the Share Activities email notification.|
|sync.pullJob.enabled=false|Use this Enterprise to Cloud Sync property to disable synchronization temporarily.|
|sync.pushJob.enabled=false|Use this Enterprise to Cloud Sync property to disable synchronization temporarily.|

**Parent topic:**[Day Zero configuration](../concepts/zeroday-config.md)

