---
title: User interfaces
---

The user interfaces (UI) section sets an end-user interface for users to interact with content, tasks and processes for the project using the [Alfresco Digital Workspace]({% link process-automation/latest/using/index.md %}).

## Properties

The basic properties of a user interface are:

| Property | Description |
| -------- | ----------- |
| UI name | *Required.* The name of the interface. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example `order-template`. |
| UI description | *Optional.* A description of what the interface should be used for, for example `A template for orders to follow.` |

## Create a user interface

To create a user interface:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

3. Select how to create the interface:

    * **Create > UI** creates a new, empty user interface.

    * **Upload > UI** allows for uploading an existing user interface into the Modeling Application.

    Alternatively use the **+** or **Upload** buttons next to **UI** in the left-hand menu.

4. Enter a name and optional description.

## User interface modeling

Once a user interface has been created, set the type to `content` to deploy the Digital Workspace with the application. This can be accessed by users once a project has been [deployed]({% link process-automation/latest/admin/release.md %}#deployment) using the format `ui/<name>`, for example `https://alfresco.com/finance-project/ui/content-app`.

> **Note**: An instance of Digital Workspace will be deployed with each application that can only start processes created within that same application. Only users assigned [user access]({% link process-automation/latest/admin/release.md %}#deploy-steps/user) to the application will be able to access the interface.

Custom end-user actions can be created for the Digital Workspace. This enables custom options in menus that can be set to display on files or folders with specific names, or when an aspect is applied to a node. There are three parts to defining custom actions:

* The [action](#actions) itself that will executed when the option is clicked.
* A list of one or more [rules](#rules) to describe which nodes the action will be displayed on.
* The [feature](#features) the action will be displayed on, for example the header or a context menu.

### Actions

There are four types of end-user action that can be configured:

* [Event](#event)
* [Form](#form)
* [Navigation](#navigation)
* [Start process](#start-process)

#### Event

#### Form

#### Navigation

#### Start process

### Rules




#### Application evaluators

The application evaluators are:

| Evaluator | Description |
| --------- | ----------- |
| app.selection.canDelete | User has permission to delete selected node(s). |
| app.selection.canDownload | User can download selected node(s). |
| app.selection.notEmpty | At least one node is selected. |
| app.selection.canUnshare | User is able to remove selected node(s) from public sharing. |
| app.selection.canAddFavorite | User can add selected node(s) to favorites. |
| app.selection.canRemoveFavorite | User can remove selected node(s) from favorites. |
| app.selection.first.canUpdate | User has permission to update selected node(s). |
| app.selection.file | A single File node is selected. |
| app.selection.file.canShare | User is able to share the selected file. |
| app.selection.file.isShared | A shared node is selected. |
| app.selection.file.isLocked | File is locked for editing. |
| app.selection.file.isLockOwner | File is locked and current user is the lock owner. |
| app.selection.file.canUploadVersion | User can update file version. |
| app.selection.library | A single Library node is selected. |
| app.selection.isPrivateLibrary | A private Library node is selected. |
| app.selection.hasLibraryRole | The selected Library node has a role property. |
| app.selection.hasNoLibraryRole | The selected Library node has no role property. |
| app.selection.folder | A single Folder node is selected. |
| app.selection.folder.canUpdate | User has permissions to update the selected folder. |
| app.selection.file.canLock | User has permissions to lock file. |
| app.selection.file.canUnlock | User has permissions to unlock file. |
| repository.isQuickShareEnabled | Whether the quick share repository option is enabled or not. |
| canCopyNode | Checks if user can copy selected node. |
| canToggleJoinLibrary | Checks if user can perform 'Join' or 'Cancel Join Request' on a library. |
| canEditFolder | Checks if user can edit the selected folder. |
| isTrashcanItemSelected | Checks if user has trashcan item selected. |
| canViewFile | Checks if user can view the file. |
| canLeaveLibrary | Checks if user can Leave selected library. |
| canToggleSharedLink | Checks if user can toggle shared link mode. |
| canShowInfoDrawer | Checks if user can show Info Drawer for the selected node. |
| canManageFileVersions | Checks if user can manage file versions for the selected node. |
| canManagePermissions | Checks if user can manage permissions for the selected node. |
| canToggleEditOffline | Checks if user can toggle Edit Offline mode for selected node. |
| user.isAdmin | Checks if user is admin. |
| app.canShowLogout | Whether logout action should be present or not. |
| app.isLibraryManager | Checks if user is library manager. |

#### Navigation evaluators

The navigation evaluators are:

| Evaluator | Description |
| --------- | ----------- |
| app.navigation.folder.canCreate | User can create content in the currently opened folder. |
| app.navigation.folder.canUpload | User can upload content to the currently opened folder. |
| app.navigation.isTrashcan | User is using the Trashcan page. |
| app.navigation.isNotTrashcan | Current page is not a Trashcan. |
| app.navigation.isLibraries | User is using a Libraries or Library Search Result page. |
| app.navigation.isNotLibraries | Current page is not a Libraries page. |
| app.navigation.isSharedFiles | User is using the Shared Files page. |
| app.navigation.isNotSharedFiles | Current page is not Shared Files. |
| app.navigation.isFavorites | User is using the Favorites page. |
| app.navigation.isNotFavorites | Current page is not Favorites. |
| app.navigation.isRecentFiles | User is using the Recent Files page. |
| app.navigation.isNotRecentFiles | Current page is not Recent Files. |
| app.navigation.isSearchResults | User is using the Search Results page. |
| app.navigation.isNotSearchResults | Current page is not the Search Results. |
| app.navigation.isSharedPreview | Current page is preview Shared Files. |
| app.navigation.isFavoritesPreview | Current page is preview Favorites. |
| app.navigation.isSharedFileViewer | Current page is shared file preview page. |
| app.navigation.isPreview | Current page is Preview. |
| app.navigation.isPersonalFiles | Current page is Personal Files. |
| app.navigation.isLibraryFiles | Current page is Library Files. |

#### Node property evaluators

The node property evaluators are:

| Evaluator | Description |
| --------- | ----------- |
| selection.files.type | All the selected files are of the input type. |
| selection.files.aspect | All the selected files have the input aspect. |
| selection.files.property | All the selected files have the indicated property and their values satisfy the condition. |
| selection.files.name | All the selected files match the condition in their name. |
| selection.folders.type | All the selected folders are of the input type. |
| selection.folders.aspect | All the selected folders have the input aspect. |
| selection.folders.property | All the selected folders have the indicated property and their values satisfy the condition. |
| selection.folders.name | All the selected folders match the condition in their name. |
| selection.currentFolder.type | The current folder is of the input type. |
| selection.currentFolder.aspect | The current folder has the input aspect. |
| selection.currentFolder.property | The current folder has the indicated property and their values satisfy the condition. |
| selection.currentFolder.name | The current folder matches the condition in their name. |


### Features











## Custom user interfaces

Custom user interfaces can be [developed]({% link process-automation/latest/develop/index.md %}) with the [Application Development Framework](https://www.alfresco.com/abn/adf/docs/){:target="_blank"} and deployed as part of the project.

## User interface actions

The actions that can be run against an interface are:

| Action | Description |
| ------ | ----------- |
| Download UI | Download the JSON for the interface. |
| Validate | Run validation against the interface. Any errors can be seen in the log history at the bottom of the Modeling Application and are flagged in a pop-up box. |
| Save | Save any changes made to the interface. |
| Delete | Delete the interface. |
