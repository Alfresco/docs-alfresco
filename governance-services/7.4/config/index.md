---
title: Configure Governance Services
---

Use the information on this page to configure Governance Services.

## Alfresco global properties settings

Use this information to understand the `alfresco-global.properties` properties related to the Governance Services.

Properties for the Governance Services are listed in the `<configRoot>/classes/alfresco/module/org_alfresco_module_rm/alfresco-global.properties` 
file. 

For example:

```text
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
rm.dispositionlifecycletrigger.batchsize=500
```

> **Note:** These settings supplement any settings in the `<classpathRoot>/alfresco-global.properties` file. If a property appears in both files, the Governance Services property overrides the `<classpathRoot>/alfresco-global.properties` value.

Any property that is `false` by default, is not shown in the `alfresco-global.properties` file.

A full listing of the properties and their values is shown in this table:

|Setting|Meaning|
|-------|-------|
|audit.enabled|Enable/disable auditing. Default is `true`.|
|audit.rm.enabled|Enable/disable Governance Services auditing. Default is `true`.|
|audit.rm.runas|Set the user that the audit log runs under. Default is `system`. Alfresco doesn't audit events triggered by the system; for example, cron jobs. Set this value to `admin` for these jobs if you want them to be captured in the audit log.<br><br>Alternatively, create a user, provide the correct permissions and configure the jobs to run as that user.|
|audit.rm.viewLog.maxSize=100|The log can be viewed from Share or directly via the Audit log web script. By default the log does not exceed 100 entries. If the maximum size of the log is not configured in the alfresco-global-properties file then it will default to 100. If you include the size parameter in the request it will only be applied if it is less than or equal to the maximum size allowed, or it will be ignored.|
|cache.writersSharedCache.cluster.type|Extended permission service cache: type of cluster used. Default is `fully-distributed`.|
|cache.writersSharedCache.maxItems|Extended permission service cache: maximum number of items (node references) that are stored in the writer caches. Default is `10000`.|
|dm.classified.content.cleansing.trashcan.enabled|Use this setting to override the trashcan functionality of Content Services. The default value is `false`.|
|imap.server.attachments.extraction.enabled|Enable/disable IMAP server attachments. Default is `false`.|
|rm.autocompletesuggestion.maxsuggestions.date|Auto-complete suggestions: maximum number of date suggestions to provide. Default is `5`.|
|rm.autocompletesuggestion.maxsuggestions.node|Auto-complete suggestions: maximum number of node suggestions to provide. Default is `5`.|
|rm.autocompletesuggestion.maxsuggestions.path|Auto-complete suggestions: maximum number of path suggestions to provide. Default is `5`.|
|rm.autocompletesuggestion.minfragmentsize|Auto-complete suggestions: Minimum size of fragment to trigger a search. Default is `2`.|
|rm.autocompletesuggestion.nodeParameterSuggester.aspectsAndTypes|Auto-complete suggestions: Comma-separated list of types and aspects used by the node parameter autocomplete suggester. Default is `rma:record,cm:content`.|
|rm.completerecord.mandatorypropertiescheck.enabled|This setting is used to ensure completion of records. When it is set to true, Governance Services will only complete a record if all the mandatory properties have a value. When it is set to false you can complete a record with mandatory properties missing. <br><br> **Note:** This setting should be set to false when using Governance Services with Outlook Integration.|
|rm.content.cleaner|This setting is used in conjunction with `rm.content.cleansing.enabled=true`. Default is `contentCleanser.522022M`.<br><br>When content is sent for deletion, it is cleansed using the default 5220.22-M algorithm. The content is then destroyed, and the node is deleted (if ghosting is not enabled).<br><br>If you add a custom content cleaner bean, this can be specified using this property.|
|rm.content.cleansing.enabled|Set whether content can be deleted immediately (data cleansing). This applies to deleted (destroyed) classified records and classified documents.<br><br>The default setting of `false` allows deleted (destroyed) files to be restored (from the Trashcan if they are documents, or by using a recovery tool, if they are records).<br><br>This approach is only effective for installations with a single magnetic disk. In other situations, such as RAID or SSD, hardware techniques or process ensure that the content is non-recoverable.|
|rm.dispositionlifecycletrigger.cronexpression|Disposition lifecycle trigger cron job expression. Default is `0 0/5 * * * ?`.|
|rm.dispositionlifecycletrigger.batchsize|Disposition lifecycle batch size to process records. Default is `500` and value must be greater than `0`.|
|rm.ghosting.enabled|Enable/disable ghosting of records, when a record is deleted. Default is `true`.|
|rm.notification.role|Specify which role receives notifications; for example, when notifications when vital records are due for review. Default is `RecordsManager`.<br><br>A background job executes by default every 15 minutes to search for vital records that are due for review, and sends a notification. The template for the email notification is editable, and is stored in the Governance Services section of the Data Dictionary.|
|rm.record.contributors.group.enabled|Set which groups can perform Governance Services actions; for example, File as Record. Default is `false`. <br><br>If this is set to `true`, only members of the RECORD_CONTRIBUTORS group can perform these actions.|
|rm.rule.runasadmin|Require admin rights/ normal rights to run rules. Default is `true`.|
|version.store.enableAutoVersionOnTypeChange|Set whether a version is automatically created when the type of a document is changed. Default is `false`.|

## Customizing the end of the financial year {#customize-end-of-year}

You can set the end date of the financial year and the end of the financial quarter.

> **Important:** If you make adjustments to your financial year as per the instructions below, it is important you carry out the same procedure on your new installation every time you upgrade to a new version of Governance Services.

1. Navigate to the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/lib/alfresco-repository-xxx.jar` file in your installation.

2. Copy the `alfresco-repository-xxx.jar` to `<temp-dir>/alfresco-repository-xxx.zip` and extract the contents

2. From the extracted ZIP file copy `alfresco/period-type-context.xml` to `<TOMCAT_HOME>/shared/classes/alfresco/extension`.

3. Rename the file to `custom-period-type-context.xml`.

4. Change all the `value` properties to suit the dates of your financial year.

    For example, the following would customize your system to start the financial year in October.

    ```xml
    <bean id="period.end.of.financial.month" class="org.alfresco.repo.dictionary.types.period.EndOfFinancialMonth" >
       <property name="startDayOfMonth">
           <value>1</value>
       </property>
       <property name="startMonth">
           <value>10</value>
       </property>
    </bean>
    <bean id="period.end.of.financial.quarter" class="org.alfresco.repo.dictionary.types.period.EndOfFinancialQuarter" >
       <property name="startDayOfMonth">
           <value>1</value>
       </property>
       <property name="startMonth">
           <value>12</value>
       </property>
    </bean>
    <bean id="period.end.of.financial.year" class="org.alfresco.repo.dictionary.types.period.EndOfFinancialYear" >
       <property name="startDayOfMonth">
           <value>1</value>
       </property>
       <property name="startMonth">
           <value>9</value>
       </property>
    </bean>
    ```

5. Restart the server.

6. (Optional) If you change your financial periods this does not update any previously set calculated schedules and you will need to edit all {% include tooltip.html word="retentionschedule" text="retention schedule" %}s to ensure the new period start date is used. See [Editing a retention schedule]({% link governance-services/7.4/using/retention-schedules.md %}#editing-a-retention-schedule).  
