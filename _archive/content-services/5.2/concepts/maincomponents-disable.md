---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Disabling Alfresco Content Services features

You can disable common product components, if you do not require them for your Alfresco Content Services instance. This summary gives the example property settings for disabling the main components.

**Note:** If you are unsure of the effect of disabling a feature, contact Alfresco Support for recommendations.

Add the following property settings to the alfresco-global.properties file:

|Property|Description|
|--------|-----------|
|system.usages.enabled=false|Disables quotas or user usages.

|
|audit.enabled=false|Specifies a way to globally enable or disable the auditing framework.|
|cifs.enabled=false|Specifies whether to enable or disable the CIFS server.|
|sync.mode=OFF|Use this property to disable synchronization permanently.|
|audit.alfresco-access.enabled=false|Disables generation of audit data.|
|home.folder.creation.eager=false|Use this property to create home folders \(unless it is disabled using the home.folder.creation.disabled=true property\) when people are created \(true\) or created lazily \(false\).

 Lazy creation \(false\) means that the home folder will not be created when the user is created.

|
|home.folder.creation.disabled=true|Disables the creation of home folders.

|
|db.schema.update=false|Specifies whether the system bootstrap should create or upgrade the database schema automatically.|
|activities.feed.notifier.enabled=false|Disables the Share Activities email notification.|

**Note:** The `system.workflow.engine.activiti.enabled` property is no longer available.

**Parent topic:**[Configuration overview](../concepts/configuration-overview.md)

