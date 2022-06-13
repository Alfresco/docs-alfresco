---
title: Configure Desktop Sync
---

If you're an IT administrator, you can configure Desktop Sync for central installation purposes using the `AlfrescoSync.conf` file located at:

* (Windows): `<userHome>\AppData\Local\Alfresco`
* (For Mac): `~/Library/Application Support/Alfresco`

Using the configuration file, you can update:

* timer values, such as polling and retry intervals
* sync constraint patterns for files/folders to be ignored by Desktop Sync
* disk space limits
* custom content type mappings for particular file extensions
* user interface defaults and customization (including localization)
* network access configuration
* debug logging
* [timezone](#change-timezone) used in `AlfrescoDesktopSync.log` file

The configuration properties values are case sensitive and use the format `name.subname=value`, 
for example, `syncmanager.deferFileSyncTimer=15`.

## Sharing files

You can configure a file sharing URL, (defined by `syncmanager.quickShareURL`), so that when you share a link to a file, 
a correctly formatted URL is provided. This link should either access Alfresco Digital Workspace or Alfresco Share.

The format for this property is: `<protocol>://<yourserveraddress>/<path>/`, where:

* `<protocol>` is set to either `http` or `https`
* `<yourserveraddress>` is the address of the server
* `<path>` is the path to access a link in either Alfresco Digital Workspace or Alfresco Share

Here are examples of how you can set the URL to access a file:

* For Digital Workspace: `syncmanager.quickShareURL=https://workspace.mycompany.com/#/preview/s/`
* For Share: `syncmanager.quickShareURL=https://alfresco.mycompany.com/share/s/`

>**Note:** You must choose to share links either in Alfresco Digital Workspace or Alfresco Share but not both. 
>The URL must also use an `http` or `https` protocol. If the property is left blank or not set correctly, 
>the file sharing feature won't be available in Desktop Sync.

For more information, see [Sharing files]({% link desktop-sync/latest/using/sharing.md %}).

## User interface

Use the user interface properties to configure the Desktop Sync UI.

|Property|Default value|Description|
|--------|-------------|-----------|
|syncui.defaultServer| |Specifies a default server URL to be entered in the login screen when Desktop Sync is run for the first time (usually at the end of the installation process).The user can change the URL on the login screen, if required.|
|syncui.enableAnalytics|true|Controls whether Alfresco Content Services collects anonymized data. Applies to Mac only.|
|syncui.language| |Add this property to specify the language for the Desktop Sync UI (requires app restart). See [Localization](#localization) for supported values.|
|syncui.showConsistencyCheck|true|Specifies whether the **Consistency Check** option is available in Desktop Sync.As an Administrator, you can disable this option as consistency check scans all the folders that are synced to Desktop Sync, and this may effect your server's performance. Applies to Windows only.|
|syncui.showMyFilesTab|true|Controls whether My Files is shown in the content selection dialog.|
|syncui.showSharedFilesTab|true|Controls whether Shared Files is shown in the content selection dialog.|
|syncui.showSitesTab|true|Controls whether Sites is shown in the content selection dialog.|
|syncui.showRepositoryTab|true|Controls whether Company Home is shown in the content selection dialog.|
|syncmanager.userMemberSitesMaxItems|250|Add this property to change the number of sites shown in the content selection dialog.|
|syncui.enableAspects| |Controls which aspects are shown in the **Property** dialog.Format: `syncui.enableAspects=<aspect1>,<aspect2>, ...`|
|syncui.disableProperties| |Controls which properties are hidden for a given aspect.Format: `syncui.disableProperties.<index>=<aspect>|<property1>,<property2>, ...`|
|syncui.fileCustomTypes| |Controls the file custom types that are visible in the **Property** dialog. Format: `syncui.fileCustomTypes=display_name (type_id),...`. Note that the display name is optional.|
|syncui.folderCustomTypes| |Controls the file custom types that are visible in the **Property** dialog. Format: `syncui.fileCustomTypes=display_name (type_id),...`. Note that the display name is optional.|

## Enable analytics (Mac only)

Alfresco Content Services collects some anonymized information about fatal errors and basic usage which are used to 
help us improve the product in the future. There's no data that could identify a customer, user, or machine. 
If you wish to prevent this anonymized data from being sent, change the value of the `syncui.enableAnalytics` property to `false` 
to turn it off.

Here are some examples of the information that's collected:

* Application crash logs
* Event metrics for specific features:
    * Conflict detected
    * Conflict resolved: Keep my Changes, Discard my Changes, error
    * Check out: success / error
    * Cancel check out: success / error
    * Check in: success / error, Has comment: yes / no, Major version: yes / no
    * Remove Account: Initial sync finished: yes / no, Has conflict: yes / no
    * Initial sync started

## Desktop Sync UI

As an IT administrator, you can control the parts of the Desktop Sync UI that users can access, 
so that they can't sync content from specific areas in Alfresco Content Services. 

By default, the content selection dialog (see [selecting content to sync]({% link desktop-sync/latest/using/select-to-sync.md %})) 
displays **My Files**, **Shared Files**, **Sites**, and **Company Home**. 
If you want to hide any of these areas, change the value of the relevant `syncui.show*` property to `false`.

## View and edit properties

As an IT administrator, you can control which aspects and properties that your end users can view and edit from their desktops. 
By default, users can view and edit general properties for files or folders, such as the Title, Name, Description, and Author 
(if they have the correct permissions).

You can extend this functionality to allow users to view and edit additional properties. Add the `syncui.enableAspects` and 
(optional) `syncui.disableProperties` settings to your central configuration file.

>**Note:** We recommend adding `syncui.disableProperties` so that your end users aren't overwhelmed by properties they don't need to see, 
> such as system properties or potentially sensitive values.
>
>Here are a few examples:
>
>```bash
>syncui.enableAspects=cm:titled,exif:exif,dp:restrictable
>syncui.disableProperties.1=cm:titled|cm:title
>syncui.disableProperties.2=exif:exif|exif:exposureTime,exif:orientation,exif:flash
>```

As an IT administrator, you can also control the list of available custom types for files and folders that your end users 
can apply to their content from their desktops. If either `syncui.fileCustomTypes` or `syncui.folderCustomTypes` are missing 
from the configuration file, the custom types are fetched from the repository. 
Otherwise, the custom type field is populated with the values read from the configuration file.

In the **Property** dialog > **General Properties** tab, there's a drop-down menu with the custom types that can be 
applied to a file or folder. This menu lists only custom types created using the Content Model Manager API.

Example:

```bash
syncui.fileCustomTypes=My custom type (model-1:custom_type_name)
```

>**Note:**
>
>* If a custom type is applied to the file/folder from the **Properties** dialog, all data entered that was not saved will be discarded. We suggest you save your changes first before applying a custom type.
>* If the file or folder already has a custom type applied, then the custom type drop-down will contain only sub-types of that custom type. You can't change between unrelated custom types, as the Content Model Manager API doesn't allow it.

## Sync manager timers

|Property|Default value|Description|
|--------|-------------|-----------|
|alfrescosync.initialPollInterval|15 seconds|Sets the number of seconds before the first server polling after application startup:{::nomarkdown}<ul><li>Minimum value: 0 seconds</li><li>Maximum allowed value: 18000 seconds (5 hours)</li></ul>{:/}|
|alfrescosync.pollingInterval|300 seconds|Sets the number of seconds between polling of the sync server for server-side file change events. This does not affect the processing of desktop file change events; they are always processed immediately:{::nomarkdown}<ul><li>Minimum value: 10 seconds</li><li>Maximum allowed value: 18000 seconds (5 hours)</li></ul>{:/}|
|syncmanager.deferFileSyncTimer|15 seconds|Sets the number of seconds between retries of a deferred update for a file, such as when an application still has the file open:{::nomarkdown}<ul><li>Minimum value: 10 seconds</li><li>Maximum allowed value: 60 seconds</li></ul>{:/}|
|syncmanager.deferDelayRetryTimer|3600 seconds|Sets the number of seconds to retry syncing a deferred update for a file. If you wish to override the default setting, add this property in the configuration file:{::nomarkdown}<ul><li>Minimum value: 10 seconds</li><li>Maximum allowed value: 36000 seconds (10 hours)</li></ul>{:/}|
|syncmanager.deferOnlineCheckTimer|60 seconds|Sets the number of seconds between retries when a server connection is offline. This may be due to server being down, no network connection, or no route to the server:{::nomarkdown}<ul><li>Minimum value: 15 seconds</li><li>Maximum allowed value: 600 seconds</li></ul>{:/}|
|syncmanager.consistencyCheckRetryInterval|120 seconds|Sets the number of seconds between consistency check retry attempts. A consistency check may be aborted when too many file system changes are received during the consistency check scan:{::nomarkdown}<ul><li>Minimum value: 30 seconds</li><li>Maximum allowed value: 3600 seconds</li></ul>{:/}|
|syncmanager.freeSpaceCheckTimer|120 seconds|Sets the number of seconds between free space checks when syncing has been paused due to the local free disk space threshold being reached:{::nomarkdown}<ul><li>Minimum value: 15 seconds</li><li>Maximum allowed value: 1800 seconds</li></ul>{:/}|

## Sync manager constraints

Use the sync constraints configuration section to specify desktop files and folders that should not be 
synced to the server, such as temporary files or work files.

Constraint rules are specified as `syncmanager.constraint.<n>=<rule>`, where:

* `<n>` is an ascending number starting at one
* `<rule>` is specified as `<ruletype>|<parameter>[,<parameter>,...]`

The available constraint rule types are:

|Constraint rule type|Description|
|--------------------|-----------|
|FileExt|Ignores files with a particular file extension. Multiple extensions can be specified per rule.|
|Name|Ignores files with a particular name. Multiple names can be specified per rule.|
|NamePattern|Ignores files that match a regular expression. Multiple regular expressions can be specified per rule.|
|FolderNamePattern|Ignores folders that match a regular expression. Multiple regular expressions can be specified per rule. |

Here is a sample sync constraints configuration section:

```bash
# Sync constraints

syncmanager.constraint.1=FileExt|.tmp,.temp
syncmanager.constraint.2=Name|desktop.ini,thumbs.db,.DS_Store
syncmanager.constraint.3=NamePattern|~\\$.*\\.doc,~\\$.*\\.docx,~\\$.*\\.xlsx,~\\$.*\\.pptx,~\\$.*\\.xls,~\\$.*\\.ppt,~\\$.*\\.xlsm
syncmanager.constraint.4=NamePattern|\\._.*
syncmanager.constraint.5=NamePattern|^[0-9A-F]{8}
syncmanager.constraint.6=FolderNamePattern|^[0-9A-F]{8}
```

## Disk space limits

Desktop Sync is initially configured to only sync content when the available disk space on a computer is above a 
specific limit (defined by `syncmanager.freeSpaceLimit`). By default value, the minimum amount of free space required 
is set to 3GB. Below this value, Desktop Sync will pause syncing, until the available disk space reaches an 
upper limit (`syncmanager.freeSpaceRestart`). When the available disk space reaches this value, syncing will restart. 
The default value for restarting sync is set to 3500MB (or 3.5GB).

If you wish to override the default settings, add these entries to your configuration file with new values:

```bash
# Free space limits
    
syncmanager.freeSpaceLimit=3G
syncmanager.freeSpaceRestart=3500M
```

>**Note:** Since floating point values aren't valid, you can set a property value to `3500M` (that's 3500MB) 
>to represent 3.5GB. Also, `syncmanager.freeSpaceRestart` should have a higher value than `syncmanager.freeSpaceLimit`.

The free space properties are specified as `syncmanager.freeSpace<Property>=<value>[<scale>]` where:

* `<value>` is an integer
* `<scale>` provides optional scaling using `K|M|G|T` for kilobyte, megabyte, gigabyte, and terabyte values
* add `+/-` in front of the `<value>` to specify values relative to the currently available free space: '+' specifies the limit above the currently available disk space; '-' specifies the limit below the currently available disk space.

To specify a simple limit, without using any scaling, use this example:

```bash
syncmanager.freeSpaceLimit=1073741824
```

In this example, the minimum amount of disk space required for content syncing is set to 1GB.

To specify relative values above the current available disk space, use this example:

```bash
syncmanager.freeSpaceLimit=+2G
syncmanager.freeSpaceRestart=+2500M
```

In this example, the `freeSpaceLimit` is set 2GB above the available space and the `freeSpaceRestart` is set 2.5GB above the current available space. So if you have 3GB of free disk space and your `freeSpaceLimit` is set 2GB, when the free space on your hard drive reaches 5GB, sync will pause. Sync only resumes once your hard drive has 5.5GB of free space.

You can also specify relative values below the current available disk space, use this example:

```bash
syncmanager.freeSpaceLimit=-3G
syncmanager.freeSpaceRestart=-3500M
```

In this example, the `freeSpaceLimit` is set 3GB below the available space and the `freeSpaceRestart` is set 3.5GB below the current available space.

## Force maximum size for user sync

You can limit the amount of data that a user can select to sync by setting `syncmanager.maxSyncSize` to `10` bytes or more. This property is only checked in the content selection dialog. When this is set and the data to sync exceeds the limit, you'll be notified in the content selection dialog, and the **Sync** button is disabled.

The `syncmanager.maxSyncSize` property is specified as:

```bash
syncmanager.maxSyncSize=<number of bytes greater than 10>
```

> **Note:**
>
> * If the size is set to `0` or less than `10` bytes, then no limit is set.
> * The value of the property must be an integer followed by one character: `K|M|G|T` for kilobyte, megabyte, gigabyte, and terabyte values (where 1K = 1 kilobyte = 1024 bytes).
> * If the value is not set correctly, then the maximum size limit defaults to bytes. For example, if there's an illegal character in the value, like `12W345K`, then the limit will be set to just `12` bytes.

## CMIS transfers

Use the CMIS transfer properties to control problems with slow or stalled data transfers when Desktop Sync is 
downloading or uploading content to/from the Alfresco Content Services CMIS server.

|Property|Default value|Description|
|--------|-------------|-----------|
|cmis.lowSpeedTime|30 seconds|Specifies the number of seconds of low speed transfer that are required for a data transfer to be aborted.|
|cmis.lowSpeedLimit|1 bytes per second|Specifies the number of bytes per second that is considered to be a slow data transfer.|
|syncmanager.resumeDownloadFileSize|500K|Specifies the size limit above which a download will resume. Default value is 500KB.|

## CMIS content type mappings

When files are uploaded to the Alfresco Content Services CMIS server they should have a mimetype associated with them. 
Desktop Sync contains a list of built-in file extension to mimetype mappings, but in some cases it may be necessary 
to add new mappings or override existing mappings.

The CMIS content type mappings are specified as `cmis.contentType.<n>=<extension>,<mimetype>`, 
where `<n>` is an ascending number starting at one.

Here is a sample CMIS content type mapping configuration section:

```bash
# CMIS content type mappings

cmis.contentType.1=pptx,application/vnd.ms-powerpoint
cmis.contentType.2=test,application/test
```

## Networking

|Property|Default value|Description|
|--------|-------------|-----------|
|net.SSLVerifyPeer|true|Specifies whether an SSL connection to the Alfresco server does full SSL verification. If the Alfresco server is using a self-signed certificate for SSL, the value must be set to `false`.|
|net.syncServer.SSLVerifyPeer|true|Specifies whether an SSL connection to the sync server does full SSL verification. If the sync server is using a self-signed certificate for SSL, the value must be set to `false`.|

## Debug logging

Desktop Sync can generate a lot of debug information or error level logging information.

The log output configuration contains two sections.

Use the first section to setup the log location, default logging level, formatting, rotation, and compression.

Here is a sample logging configuration section:

```bash
# Logging

logging.loggers.root.channel = c1
logging.loggers.root.level = error
logging.channels.c1.class = FileChannel
logging.channels.c1.path = ${alfresco.configDir}/AlfrescoDesktopSync.log
logging.channels.c1.formatter.class = PatternFormatter
logging.channels.c1.formatter.pattern = %Y-%m-%d %H:%M:%S.%c %N[%P]:%s:%q:%t
logging.channels.c1.rotation=daily
logging.channels.c1.compress=true
logging.channels.c1.purgeAge=7 days
logging.channels.c1.archive=timestamp
logging.formatters.f1.class = PatternFormatter
#logging.formatters.f1.formatter.pattern = %Y-%m-%d %H:%M:%S.%c %N[%P]:%s:%q:%t
logging.formatters.f1.times = UTC
```

This logging configuration will create a log file called `AlfrescoDesktopSync.log` in the following folder:

* Windows: `<userHome>\AppData\Local\Alfresco`
* Mac: `~/Library/Application Support/Alfresco`

The log files are rotated daily and the old log files are compressed. Only the last 7 days of log files are kept.

Use the later section of the log output configuration to enable debug output from different components of Desktop Sync. 
This is done by configuring individual logging levels as shows below:

```bash
logging.loggers.l<n>.name = <logging level name>
logging.loggers.l<n>.level = <debug|error>
```

where `<n>` is an ascending index number starting at one. Both the configuration lines must use the same index number.

The available debug logging levels are:

|Debug logging level|Description|
|-------------------|-----------|
|AccountSetup|Account setup, create/remove sync targets|
|AlfrescoAPI|Alfresco API calls|
|AlfrescoFileStoreMonitor|Remote file system event polling|
|CMISAPI|CMIS API calls|
|CMISFileStore|Remote file I/O|
|CMISFilter|Repository node type/aspect filters|
|CMISObjectCache|CMIS objects cache|
|DeferredCheckSyncPattern|Deferred files special handling|
|DeleteAddSyncPattern|Delete/add (drag/drop cut/paste) local event special handling|
|DeleteRenameSyncPattern|Delete/rename local event special handling|
|DeviceRegAPI|Device registration API calls|
|DirectoryWatcher|Low level local file system event handling|
|DirRouter|Routing of local file system events|
|DumpJSON|JSON request responses|
|KeychainAPI|MacOS keychain access|
|LibCURLAPI|LibCurl low level HTTP network I/O processing|
|LocalFileStore|Local file I/O|
|LocalSyncScanner|Sync manager startup local sync area scanner|
|PocoSQLiteDB|Sync database access|
|RenameShuffleSyncPattern|MS Office rename/shuffle local event special handling|
|RESTAPI|Base REST API processing|
|SharedWin32FileStoreMonitorSharedMacOSXFileStoreMonitor|Local file system monitoring|
|SyncChecker|Consistency checker|
|SyncClientAPI|Shell extension to sync client application calls|
|SyncConstraint|File/folder name/extension constraints|
|SyncEventManager|Event queue manager|
|SyncManager|The top level sync component|
|SyncServiceAPI|Sync Service API calls|
|SyncServiceRouter|Shared synchronization service polling/event routing|
|SyncTarget|Handles the connection between a single local/remote folder|
|SyncUI|Desktop Sync UI configuration properties|
|TargetDelete|Sync target delete parent folder special handling|
|TargetMoveToFrom|Move files/folders between sync targets special handling|
|TargetRename|Sync target parent folder rename special handling|
|WaterMark|File watermarking (not currently used)|

Here's a sample Desktop Sync logging configuration:

```bash
# Logging

logging.loggers.root.channel = c1
logging.loggers.root.level = error
logging.channels.c1.class = FileChannel
logging.channels.c1.path = ${alfresco.configDir}/AlfrescoDesktopSync.log
logging.channels.c1.formatter.class = PatternFormatter
logging.channels.c1.formatter.pattern = %Y-%m-%d %H:%M:%S.%c %N[%P]:%s:%q:%t
logging.channels.c1.rotation=daily
logging.channels.c1.compress=true
logging.channels.c1.purgeAge=7 days
logging.channels.c1.archive=timestamp
logging.formatters.f1.class = PatternFormatter
#logging.formatters.f1.formatter.pattern = %Y-%m-%d %H:%M:%S.%c %N[%P]:%s:%q:%t
logging.formatters.f1.times = UTC

logging.loggers.l1.name = SyncManager
logging.loggers.l1.level = debug

logging.loggers.l2.name = SyncTarget
logging.loggers.l2.level = debug

logging.loggers.l3.name = DirectoryWatcher
logging.loggers.l3.level = error

logging.loggers.l4.name = SharedMacOSXFileStoreMonitor
logging.loggers.l4.level = error

logging.loggers.l5.name = CMISAPI
logging.loggers.l5.level = error

logging.loggers.l6.name = PocoSQLiteDB
logging.loggers.l6.level = error
```

For more details on the logging configuration, see the [PocoProject](https://pocoproject.org/){:target="_blank"} documentation.

## Change timezone {#change-timezone}

The default timezone used in the `AlfrescoDesktopSync.log` file is `UTC`. As an IT administrator, if you want to change this so that the log file uses your local timezone, edit the configuration file:

1. Remove the line `logging.formatters.f1.times = UTC`.
2. Add the following lines:

    ```bash
    logging.channels.c1.formatter.times = local
    logging.formatters.f1.times = local
    ```

3. Restart the Desktop Sync client, and open the log file to see the changes.

## Localization

Desktop Sync supports 16 languages across the user interface, notifications and right-click context menu. 
The language is automatically set based on your computer locale settings, but this can be overridden by 
adding one of the following `syncui.language` values:

|Language|Value (Windows)|Value (Mac)|
|--------|-----------------|-------------|
|English (US)|en|en|
|Brazilian Portuguese|pt-BR|pt\_BR|
|Czech|cs-CZ|cs|
|Danish|da-DK|da|
|Dutch|nl-NL|nl|
|Finnish|fi-FI|fi|
|French|fr-FR|fr|
|German|de-DE|de|
|Italian|it-IT|it|
|Japanese|ja-JP|ja|
|Norwegian Bokmål|nb-NO|nb|
|Polish|pl-PL|pl|
|Russian|ru-RU|ru|
|Simplified Chinese|zh-CN|zh\_CN|
|Spanish|es-ES|es|
|Swedish|sv-SE|sv|

>**Note:** If you're using MacOS Mojave, after switching languages (e.g. from Japanese to Spanish), 
>the options in the content context menu in Finder will remain in the first language. 
>To fix this, reset the Desktop Sync Finder Extension and **Relaunch** Finder:
>
>1. Hold the ⌥ (alt/option) key on your keyboard.
>2. Right-click on the **Finder** icon in your Dock.
>3. Click **Relaunch**.

## Automatic installation updates

You can manage the installation of your Desktop Sync client apps by uploading an installation file in a 
central location in Alfresco Content Services. This allows you to update the installed version of all your 
Desktop Sync clients without any manual intervention.

See [Managing automatic installation updates]({% link desktop-sync/latest/admin/index.md %}#manage-automatic-installation-updates) for more.

## Automatic configuration updates

You can manage the configuration of your Desktop Sync client apps by uploading a configuration file in a 
central location in Alfresco Content Services. This allows you to update the configuration settings for all your 
Desktop Sync clients without any manual intervention.

See [Managing automatic configuration updates]({% link desktop-sync/latest/admin/index.md %}#manage-automatic-configuration-updates) for more.

## Manage sync configuration methods

As an IT administrator, you can manage the configuration of your Desktop Sync client apps via the Desktop Sync UI and a configuration file. You can choose to enable or disable the content selection dialog from the UI for all your Desktop Sync clients, while setting enforced paths to sync from the configuration file.

See [Manage sync configuration]({% link desktop-sync/latest/admin/index.md %}#manage-sync-configuration) for more.

## Force users to sync specific paths {#force-user-sync}

You can configure your Desktop Sync client apps to enforce the sync and exclusion of specific paths or Sites that are added to the configuration file. This allows you to restrict what your Desktop Sync clients sync by pre-selecting the sync folders.

See [Manage enforced sync]({% link desktop-sync/latest/admin/index.md %}#manage-enforced-sync) for more.

## Hide specific paths from users {#hide-from-sync}

You can configure your Desktop Sync client apps to hide specific paths or Sites that are added to the configuration file. This allows you to restrict what your Desktop Sync clients sync by hiding those locations from view in the content selection dialog.

See [Manage hidden sync]({% link desktop-sync/latest/admin/index.md %}#manage-hidden-sync) for more.
