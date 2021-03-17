---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: knowledge base
---

# Adding an archive action to the document library

Add a new archive action to the document library page in Alfresco Share so that when users click the archive action, an HTTP POST is performed to the Alfresco repository server and the web script on that side puts your content into an Archived state.

1.  Add the file actions-common.get.head.ftl to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\documentlibrary

    **Note:**

    This customization includes additional JS reference.

    actions-common.get.head.ftl

    ```
    <#include "../component.head.inc">
    
    <!-- Actions -->
    <@script type="text/javascript" src="${page.url.context}/components/
    documentlibrary/actions.js"></@script>
    
    <!-- Simple Dialog -->
    <@script type="text/javascript" src="${page.url.context}/
    modules/simple-dialog.js"></@script>
    
    <!-- Copy-To -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/documentlibrary/copy-to.css" />
    <@script type="text/javascript" src="${page.url.context}/modules
    /documentlibrary/copy-to.js"></@script>
    
    <!-- Move-To -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/documentlibrary/move-to.css" />
    <@script type="text/javascript" src="${page.url.context}/
    modules/documentlibrary/move-to.js"></@script>
    
    <!-- Details -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/documentlibrary/details.css" />
    <@script type="text/javascript" src="${page.url.context}/
    modules/documentlibrary/details.js"></@script>
    
    <!-- Tag Library -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/taglibrary/taglibrary.css" />
    <@script type="text/javascript" src="${page.url.context}/
    modules/taglibrary/taglibrary.js"></@script>
    
    <!-- Assign Workflow -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/documentlibrary/workflow.css" />
    <@script type="text/javascript" src="${page.url.context}/
    modules/documentlibrary/workflow.js"></@script>
    
    <!-- People Finder Assets (req'd by Assign Workflow)  -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    components/people-finder/people-finder.css" />
    <@script type="text/javascript" src="${page.url.context}/
    components/people-finder/people-finder.js"></@script>
    
    <!-- Manage Permissions -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/documentlibrary/permissions.css" />
    <@script type="text/javascript" src="${page.url.context}/
    modules/documentlibrary/permissions.js"></@script>
    
    <!-- Manage Aspects -->
    <@link rel="stylesheet" type="text/css" href="${page.url.context}/
    modules/documentlibrary/aspects.css" />
    <@script type="text/javascript" src="${page.url.context}/modules/
    documentlibrary/aspects.js"></@script>
    
    <!-- KB Archive Action -->
    <script type="text/javascript" src="${page.url.context}-extension/
    components/documentlibrary/knowledgebase-actions.js"></script>
    ```

2.  Add the file documentlist.get.config.xml to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension

    **Note:**

    This includes additional archive action for documents.

    documentlist.get.config.xml

    ```
    <documentList>
    
       <actionSets>
    
          <actionSet id="empty"></actionSet>
    
          <actionSet id="document">
             <action id="onActionDownload" type="simple-link" 
                     href="{downloadUrl}" label="actions.document.download" />
             <action id="onActionDetails" type="action-link" permission="edit" 
                     label="actions.document.edit-metadata" />
             <action id="onActionUploadNewVersion" type="action-link" 
                     label="actions.document.upload-new-version" />
             <action id="onActionEditOnline" type="action-link" 
                     permission="edit,online-edit" 
                     label="actions.document.edit-online" />
             <action id="onActionEditOffline" type="action-link" 
                     permission="edit" label="actions.document.edit-offline" />
             <action id="onActionCopyTo" type="action-link" 
                     label="actions.document.copy-to" />
             <action id="onActionMoveTo" type="action-link" permission="delete" 
                     label="actions.document.move-to" />
             <action id="onActionDelete" type="action-link" permission="delete" 
                     label="actions.document.delete" />
             <action id="onActionAssignWorkflow" type="action-link" 
                     label="actions.document.assign-workflow" />
             <action id="onActionManagePermissions" type="action-link" 
                     permission="permissions" 
                     label="actions.document.manage-permissions" />
             <action id="onActionManageAspects" type="action-link" permission="edit" 
                     label="actions.document.manage-aspects" />
             <action id="onActionArchive" type="action-link" permission="" 
                     label="actions.document.archive" />
          </actionSet>
    
          <actionSet id="locked">
             <action id="onActionDownload" href="{downloadUrl}" type="simple-link" 
                     label="actions.document.download" />
          </actionSet>
    
          <actionSet id="lockOwner">
             <action id="onActionDownload" href="{downloadUrl}" type="simple-link" 
                     label="actions.document.download-original" />
          </actionSet>
    
          <actionSet id="workingCopyOwner">
             <action id="onActionUploadNewVersion" type="action-link" 
                     label="actions.document.upload-new-version" />
             <action id="onActionDownload" href="{downloadUrl}" type="simple-link" 
                     label="actions.document.download-again" />
             <action id="onActionCancelEditing" type="action-link" 
                     label="actions.document.cancel-editing" />
          </actionSet>
    
          <actionSet id="folder">
             <action id="onActionDetails" permission="edit" type="action-link" 
                     label="actions.folder.edit-metadata" />
             <action id="onActionMetadata" type="simple-link" href="{folderDetailsUrl}" 
                     label="actions.folder.view-metadata" />
             <action id="onActionCopyTo" type="action-link" 
                     label="actions.folder.copy-to" />
             <action id="onActionMoveTo" permission="delete" type="action-link" 
                     label="actions.folder.move-to" />
             <action id="onActionDelete" permission="delete" type="action-link" 
                     label="actions.folder.delete" />
             <action id="onActionManagePermissions" permission="permissions" 
                     type="action-link" label="actions.folder.manage-permissions" />
             <action id="onActionManageAspects" type="action-link" permission="edit" 
                     label="actions.folder.manage-aspects" />
          </actionSet>
    
          <actionSet id="link">
             <action id="onActionDelete" permission="delete" type="action-link" 
                     label="actions.link.delete" />
          </actionSet>
    
       </actionSets>
    
    </documentList>
    ```


**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

