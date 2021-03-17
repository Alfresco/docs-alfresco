---
author: Alfresco Documentation
audience: [, ]
category: 
---

# Records Management global properties settings

Use this information to understand the alfresco-global.properties settings for Records Management.

Settings for Records Management are listed in the <configRoot\>/classes/alfresco/module/org\_alfresco\_module\_rm/alfresco-global.properties file. For example:

```

rm.ghosting.enabled=true
rm.notification.role=RecordsManager
imap.server.attachments.extraction.enabled=false
audit.enabled=true
audit.rm.enabled=true
audit.rm.runas=admin
cache.writersSharedCache.maxItems=10000
cache.writersSharedCache.cluster.type=fully-distributed
rm.rule.runasadmin=true
rm.autocompletesuggestion.minfragmentsize=2
rm.autocompletesuggestion.maxsuggestions.path=5
rm.autocompletesuggestion.maxsuggestions.node=5
rm.autocompletesuggestion.maxsuggestions.date=5
rm.autocompletesuggestion.nodeParameterSuggester.aspectsAndTypes=rma:record,cm:content
rm.dispositionlifecycletrigger.cronexpression=0 0/5 * * * ?
```

**Note:** These settings supplement any settings in the <classpathRoot\>/alfresco-global.properties file. If a value appears in both files, the Records Management value overrides the <classpathRoot\>/alfresco-global.properties value.

Any setting that is `false` by default, is not shown in the alfresco-global.properties.

A full listing of the settings and their values is shown in this table:

|Setting|Meaning|
|-------|-------|
|`audit.enabled`|Enable/disable auditing. Default is `true`.|
|`audit.rm.enabled`|Enable/disable Records Management auditing. Default is `true`.|
|`audit.rm.runas`|Set the user that the audit log runs under. Default is `system`. Alfresco doesn't audit events triggered by the system; for example, cron jobs. Set this value to `admin` for these jobs if you want them to be captured in the audit log.Alternatively, create a user, provide the correct permissions and configure the jobs to run as that user.

|
|`audit.rm.viewLog.maxSize=100`|The log can be viewed from Share or directly via the Audit log web script. By default the log does not exceed 100 entries. If the maximum size of the log is not configured in the alfresco-global-properties file then it will default to 100. If you include the size parameter in the request it will only be applied if it is less than or equal to the maximum size allowed, or it will be ignored.|
|`cache.writersSharedCache.cluster.type`|Extended permission service cache: type of cluster used. Default is `fully-distributed`.|
|`cache.writersSharedCache.maxItems`|Extended permission service cache: maximum number of items \(node references\) that are stored in the writer caches. Default is `10000`.|
|`imap.server.attachments.extraction.enabled`|Enable/disable IMAP server attachments. Default is `false`.|
|`rm.autocompletesuggestion.maxsuggestions.date`|Auto-complete suggestions: maximum number of date suggestions to provide. Default is `5`.|
|`rm.autocompletesuggestion.maxsuggestions.node`|Auto-complete suggestions: maximum number of node suggestions to provide. Default is `5`.|
|`rm.autocompletesuggestion.maxsuggestions.path`|Auto-complete suggestions: maximum number of path suggestions to provide. Default is `5`.|
|`rm.autocompletesuggestion.minfragmentsize`

|Auto-complete suggestions: Minimum size of fragment to trigger a search. Default is `2`.|
|`rm.autocompletesuggestion.`  
 `nodeParameterSuggester.aspectsAndTypes`

|Auto-complete suggestions: Comma-separated list of types and aspects used by the node parameter autocomplete suggester. Default is `rma:record,cm:content`.|
|`rm.content.cleaner`|This setting is used in conjunction with `rm.content.cleansing.enabled=true`. Default is `contentCleanser.522022M`. When content is sent for deletion, it is cleansed using the default 5220.22-M algorithm. The content is then destroyed, and the node is deleted \(if ghosting is not enabled\).

If you add a custom content cleaner bean, this can be specified using this property.

|
|`rm.content.cleansing.enabled`|Set whether content can be deleted immediately \(data cleansing\). This applies to deleted \(destroyed\) classified records and classified documents.The default setting of `false` allows deleted \(destroyed\) files to be restored \(from the Trashcan if they are documents, or by using a recovery tool, if they are records\).

This approach is only effective for installations with a single magnetic disk. In other situations, such as RAID or SSD, hardware techniques or process ensure that the content is non-recoverable.

|
|`rm.dispositionlifecycletrigger.`  
 `cronexpression`

|Disposition lifecycle trigger cron job expression. Default is `0 0/5 * * * ?`.|
|`rm.ghosting.enabled`|Enable/disable ghosting of records, when a record is deleted. Default is `true`.|
|`rm.notification.role`|Specify which role receives notifications; for example, when notifications when vital records are due for review. Default is `RecordsManager`.

 A background job executes by default every 15 minutes to search for vital records that are due for review, and sends a notification. The template for the email notification is editable, and is stored in the Records Management section of the Data Dictionary.

|
|`rm.record.contributors.group.`  
 `enabled`

|Set which groups can perform Records Management actions; for example, Declare as Record. Default is `false`.

 If this is set to `true`, only members of the RECORD\_CONTRIBUTORS group can perform these actions.

|
|`rm.rule.runasadmin`|Require admin rights/ normal rights to run rules. Default is `true`.|
|`version.store.enableAutoVersionOnTypeChange`|Set whether a version is automatically created when the type of a document is changed. Default is `false`.|

**Parent topic:**[Installing](../tasks/rm-install-proc.md)

