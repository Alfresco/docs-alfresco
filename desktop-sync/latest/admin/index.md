---
title: Administer Desktop Sync
---

If you’re an IT administrator, you can configure a number of features to centrally manage your Desktop Sync clients.

## Manage automatic configuration updates

If you're an IT administrator, you can upload a new configuration file to the repository so that it's automatically 
provided to all Desktop Sync clients.

This allows you to update the configuration file for all your Desktop Sync users without any manual intervention.

1. Create a **Desktop Sync** folder in the Alfresco Content Services repository path: `/Data Dictionary/`

2. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"} and download the configuration file: `AlfrescoSync.conf`.

3. Save the file in the new **Desktop Sync** folder.

    >**Note:** Don't rename the file, otherwise the configuration update won't work.

    Once the configuration file is uploaded, users receive a notification telling them that the new configuration 
    file has been downloaded.

    When the Desktop Sync client connects to the repository for file updates, it checks for new versions of the configuration. 
    The client periodically checks for new configuration files - no more than once per 24 hour period. 
    When a new configuration file is found, it's downloaded and retained in the appropriate folder. For example:

    * Windows: `<userHome>\AppData\Local\Alfresco`
    * Mac: `~/Library/Application Support/Alfresco`

    The existing configuration file is kept as a backup (i.e. `AlfrescoSync-backup.conf`).

    Users will have to restart Desktop Sync to apply the changes.

    >**Note:** If you're a Windows user, you'll see a message stating:
    >
    >```text
    >C:\Users\Program Files\AppData\Local\Alfresco\AlfrescoSync.conf
    >This file has been modified by another program. Do you want to reload it?
    >```

4. Select **OK** to apply the changes to your configuration.

## Manage automatic installation updates

If you're an IT administrator, you can upload new installation files into the repository to automatically update 
all users with Desktop Sync clients.

This ensures users with Desktop Sync clients are always up to date with minimal manual intervention.

1. Create a **Desktop Sync** folder in the Alfresco Content Services repository path: `/Data Dictionary/`
2. Upload the latest installer files for Windows and Mac clients to this location.

    >**Note:** Don't rename the files, otherwise the client upgrade won't work.

    Once the installer files are uploaded, users receive a notification telling them that an update is available and a 
    new installation file has been downloaded.

    Users will have to restart Desktop Sync to apply the new installation file.

    See [Updating Desktop Sync]({% link desktop-sync/latest/upgrade/index.md %}) for more information about how an update is applied.

## SAML authentication

Starting from version 1.4, Alfresco Desktop Sync users can authenticate through a SAML identity provider.

The following prerequisites are required - see the [Supported platforms]({% link sync-service/latest/support/index.md %}) page for specific versions:

* Alfresco Content Services
* Alfresco Sync Service
* Identity Service

SAML authentication in Desktop Sync clients (Windows and Mac) is automatically enabled if the 
Alfresco Content Services repository is configured to use the Identity Service.

See the Alfresco Sync Service documentation for [SAML configuration]({% link sync-service/latest/config/index.md %}#saml-configuration) details.

Once users have entered the repository URL (shown in step 2 of [Setting up Desktop Sync]({% link desktop-sync/latest/install/index.md %}#setting-up-desktop-sync-on-windows) for Windows and [Setting up Desktop Sync]({% link desktop-sync/latest/install/index.md %}#faq/mac) for Mac), they will be asked to enter their username and password into the SAML provider login page via their default browser.

> **Note:** In earlier versions of Desktop Sync, the user was logged out every 30 minutes and needed to enter their credentials again to re-authenticate. Starting from Desktop Sync 1.17, the logged in session will not terminate unless the system has unforeseen issues.

## Manage sync configuration

As an IT administrator, you can manage the configuration of your Desktop Sync client apps via the Desktop Sync UI and a configuration file. You can choose to enable or disable the content selection dialog from the UI for all your Desktop Sync clients, while setting enforced paths to sync from the configuration file.

The content selection dialog is displayed by default. The property that controls if this dialog appears is `syncui.enableManageContent` which is `true` by default. If you want to hide the whole dialog, change the value of the property to `false`, so that the user is only prompted to set the sync target location. Next, define enforced sync paths as described in [Manage enforced sync](#manage-enforced-sync).

The property to *enable/disable the content selection dialog* is specified as:

```text
syncui.enableManageContent = <true/false>
```

* The property defaults to `true`, even if it's not specified.

* If there are enforced sync paths in the configuration file and the content selection dialog is enabled, those path are always marked as checked/unchecked in the UI as specified in the configuration file.

* If there are no valid enforced sync paths from the configuration file (i.e. paths that exist and that the user can access), the value for this property is automatically set to `true`. So the value from the configuration file isn't taken into account, and the content selection dialog is enabled.

> **Note:** A special case that's worth highlighting from the last comment is where you can't add a folder as a constraint that's already covered by an enforced sync path. For example, setting the following values results in the content selection dialog being displayed, even though the `syncui.enableManageContent` property is set to `false`, since it would result in there being no valid paths to sync:
>
> ```text
> syncui.enableManageContent = false
>
> # Enforced sync path
> test.path.1 = /User Homes/username/folder1
>
> # Incorrect sync path to exclude - results in no valid paths to sync
> test.excludePath.1 = /User Homes/username
> ```

## Manage enforced sync

If you're an IT administrator, you can configure Desktop Sync client apps to enforce the sync of specific paths or Sites, and optionally enforce the exclusion of sub-folders for those paths or Sites. This allows you to restrict what your Desktop Sync clients sync by pre-selecting the sync folders.

When you add this configuration, users can't select anything to sync as the Desktop Sync client hides the content selection dialog.

The properties to *enforce sync* are specified as:

```text
test.path.<n> = <enforced-sync-path>
test.siteName.<n> = <enforced-sync-siteId>
```

where `<n>` is an ascending index number starting at `1`. These must be consecutive otherwise, if a number is skipped, all paths that follow are ignored.

The properties to *enforce exclusion* are specified as:

```text
test.subfolderFilter.<enforced-sync-path> = <relative path to folder to be excluded>
test.subfolderFilter.<enforced-sync-siteId> = <relative path to folder to be excluded>
```

Here's an example of how these properties are configured:

```bash
test.path.1 = /Shared
test.path.2 = /Sites/siteId/documentLibrary/folder3
test.path.3 = /User Homes/username
test.subFolderFilter./Shared=folder8,folder9
test.subFolderFilter./User Homes/username=folder7
```

> **Note:**
>
> * The exclusion property `test.subfolderFilter` can't be used on its own - it needs to be applied to one of the paths specified by `test.path.<n>`.
> * If all enforced sync paths are specified incorrectly, then the content selection dialog is enabled.
> * If, for example, one of two paths is invalid and one is valid, the content selection dialog is disabled and only the valid path is synced.
> * If an excluded folder is renamed, then that folder will be synced after a restart.

## Manage hidden sync

If you're an IT administrator, you can configure Desktop Sync client apps to hide specific paths or Sites. This allows you to restrict what your Desktop Sync clients can sync by hiding those locations from view in the content selection dialog.

The properties to *hide content from sync* are specified as:

```bash
test.excludePath.<n>=<full-path-to-folder-or-site>
test.excludeSite.<n>=<siteId>
```

where `<n>` is an ascending index number starting at `1`.

Adding this configuration ensures that users aren't able to sync the defined content. In addition:

* The folder/site will not be shown in the content selection dialog.
* If the excluded folder is inside a synced path, the excluded folder will be skipped when syncing.
* The sync folder selection is checked every time the Desktop Sync client restarts. If a sync location is hidden by the administrator, then that content is removed from the client.
