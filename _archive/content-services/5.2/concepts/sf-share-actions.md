---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring Share Actions with Smart Folders

Share actions are disabled, by default, when using Smart Folders in Alfresco Content Services.

If you need to enable Share actions, these must be explicitly set in the following files:

-   <configRootShare\>/classes/alfresco/share-documentlibrary-config.xml: these are Share standard defaults, do not modify them
-   <classpathRoot\>/alfresco/web-extension/share-config-custom.xml: for standard Share actions
-   <classpathRoot\>/alfresco/web-extension/smartfolders-amp-actions-config.xml: for custom module actions and Google Docs

For example:

```
<action index="100" id="document-download" appendEvaluators="true">
<evaluator>evaluator.doclib.action.DocumentEnableInSmartFolder</evaluator> 
</action> 
```

In each file, you can find the new evaluators to enable actions in the `actionGroups` section:

-   `DocumentEnableInSmartFolder`: enable action for documents in a Smart Folder
-   `FolderEnableInSmartFolder`: enable action for folders in a Smart Folder
-   `SmartFolderEnable`: enable action for Smart Folders
-   `FolderAndSmartFolderEnable`: enable action for folders and Smart Folders

Action limitations on Smart Folders include:

-   Alfresco permissions apply when viewing objects in a Smart Folder \(permissions on the object are required\)
-   Alfresco permissions apply when viewing a Smart Folder \(permissions on the physical parent folder are required\)
-   Suppressed actions in Share: Comment, Like, Favorite
-   Unsupported actions: Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy
-   Rules can't be used on a Smart Folder
-   Permissions can't be set on a Smart Folder

**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

