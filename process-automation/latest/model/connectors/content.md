---
title: Content service 
---

The Content service is used to execute actions against the Content Services repository. The actions available involve creating, selecting, updating and managing content throughout a process. The content can be uploaded as part of the process, retrieved from the repository or stored in the repository.

All Content service actions are displayed on the process diagram with the Alfresco logo.

## Create a Content service task

Content services are stored separately in the palette from other services. To create a Content service:

1. Sign into the Modeling Application and open a project and process.

2. Click the Alfresco logo in the tool palette and select the content action.

3. Drag the action onto the diagram canvas and fill in the properties.

> **Note**: The Content service does not have any [configuration parameters]({% link process-automation/latest/model/connectors/index.md %}#configuration-parameters) as it connects directly to the Content Services repository. This means that only a single instance of the service is required per project.

## Properties

The Content service is implemented as a [service task]({% link process-automation/latest/model/processes/bpmn.md %}#service-task). All the properties available to a service task are those required by the Content service. The three most important ones to understand for the Content service are:

| Property | Description |
| -------- | ----------- |
| Implementation | *Required.* Displays the name of the service the task is using. This will be **_content-service_**. |
| Action | *Required.* Selects which action the Content service task should execute, for example `SELECT_FILE`. |
| Mapping type | *Required.* Sets how data should be passed between the service and the process by mapping the [input and output parameters]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping). For example, setting the details of the file to select and which process variable will store it. |

### Parameter precedence

When using actions to manage content within a process it is important to understand the precedence of their parameters.

Files and folders can all be selected in multiple ways for each action. The following order dictates which parameter will be used if multiple parameters are passed to the Content service:

**nodeId / fileId / folderId** > **file / folder** > **path / filePath / folderPath** > **searchQuery**

If an action can take a file or a folder as an input and both are filled in, the file will take precedence over the folder.  

## Create actions

Create actions are used to create a new file or folder to store in the repository, reuse in another task within the process, or both.

The create actions are:

* [Create a file](#create-file)
* [Create a folder](#create-folder)

### Create file

The **CREATE_FILE** action is used to create a new file.

The input parameters to create a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| fileName | String | *Required.* A name for the file to be created. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to create the new file in. |
| targetFolderId | String | *Requires one.* The nodeId of the folder to create the new file in. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to create the new file in. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| autorename | Boolean | *Optional.* If set to `true`, the new file will have an integer added to its name if a file already exists with the same `fileName`. |
| targetFileType | Content-Type | *Optional.* The type to set the new file as, for example `fin:invoice`. |
| targetFileMetadata | Content-Metadata | *Optional.* Metadata to store with the new file. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `targetFileMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. The output `response` will also have its prefixes replaced. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |

> **Note**: `underscoreMetadata` can be set to `true` and the `targetFileMetadata` input can still use `:` with the service successfully executing the action. If `underscoreMetadata` is set to `false` and `targetFileMetadata` uses `_` then the service will fail to execute the action.

An example of the `targetFileMetadata` that can be sent with the file is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from creating a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call creating the folder. |
| file | File | *Optional.* The created file available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

### Create folder

The **CREATE_FOLDER** action is used to create a new folder.

The input parameters to create a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| folderName | String | *Required.* A name for the folder to be created. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to create the new folder in. |
| targetFolderId | String | *Requires one.* The nodeId of the folder to create the new folder in. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to create the new folder in. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| autorename | Boolean | *Optional.* If set to `true`, the new folder will have an integer added to its name if a folder already exists with the same `folderName`. |
| targetFolderType | Content-Type | *Optional.* The type to set the new folder as. |
| targetFolderMetadata | Content-Metadata | *Optional.* Metadata to store with the new folder. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `targetFolderMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. The output `response` will also have its prefixes replaced. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |

> **Note**: `underscoreMetadata` can be set to `true` and the `targetFolderMetadata` input can still use `:` with the service successfully executing the action. If `underscoreMetadata` is set to `false` and `targetFolderMetadata` uses `_` then the service will fail to execute the action.

An example of the `targetFolderMetadata` that can be sent with the folder is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from creating a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call creating the folder. |
| folder | Folder | *Optional.* The created folder available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

## Select actions

Select actions are used to select a file, a files content, a folder or the metadata for a node and store it in a process variable to use in another task within the process.

The selection actions are:

* [Select a file](#select-file)
* [Select a folder](#select-folder)
* [Select a node's metadata](#select-metadata)

### Select file

The **SELECT_FILE** action is used to select a file and store it in a variable.

The input parameters to select a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to select. |
| nodeId | String | *Requires one.* The nodeId of the file to select. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the file to select. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| searchQuery | String | *Requires one.*  A search query to find the file to select. This is in Alfresco Full Text Search (AFTS) format, for example: `cm:title:test`. |
| searchMaxItems | Integer | *Optional.* The maximum number of items returned by the `searchQuery`. The default value is `100`. |
| searchSkipCount | Integer | *Optional.* The number of items in the result to skip before returning the results. The default value is `0`. |

The output parameters from selecting a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call selecting the file. |
| file | File | *Optional.* The selected file available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

### Select folder

The **SELECT_FOLDER** action is used to select a folder and store it in a variable.

The input parameters to select a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to select. |
| nodeId | String | *Requires one.* The nodeId of the folder to select. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the folder to select. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| searchQuery | String | *Requires one.*  A search query to find the folder to select. This is in Alfresco Full Text Search (AFTS) format, for example: `cm:title:test`. |
| searchMaxItems | Integer | *Optional.* The maximum number of items returned by the `searchQuery`. The default value is `100`. |
| searchSkipCount | Integer | *Optional.* The number of items in the result to skip before returning the results. The default value is `0`. |

The output parameters from selecting a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call selecting the folder. |
| folder | Folder | *Optional.* The selected folder available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

### Select metadata

The **SELECT_METADATA** action is used to select the metadata for a file or folder and store it in a variable.

The input parameters to select the metadata of a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to select the metadata for. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to select the metadata for. |
| nodeId | String | *Requires one.* The ID of the node to select the metadata for. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to select the metadata for. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the output `metadata` will have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |

The output parameters from selecting the metadata of a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call selecting the metadata of the file or folder. |
| metadata | Content-Metadata | *Required.* The metadata of the selected file or folder. This is a JSON object of key value pairs that can be mapped to a process variable of type JSON. See below for an example. |

## Copy and move actions

Cope and move actions are used copy and move files and folders within the repository.

The copy and move actions are:

* [Copy a file](#copy-file)
* [Move a file](#move-file)
* [Copy a folder](#copy-folder)
* [Move a folder](#move-folder)

### Copy file

The **COPY_FILE** action is used to copy a file and place the copy in a new location.

The input parameters to copy a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| sourceFile | File | *Requires one source.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to select the file to copy. |
| sourceId | String | *Requires one source.* The nodeId of the file to copy. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| sourcePath | String | *Requires one source.* The location path or relative path of the file to copy. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| targetFolder | Folder | *Requires one target.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to move the copied file into. |
| targetFolderId | String | *Requires one target.* The nodeId of the folder to move the copied file into. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one target.* The location path or relative path of the folder to move the copied file into. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

The output parameters from copying a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call copying the file. |
| file | File | *Optional.* The copied file available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

### Move file

The **MOVE_FILE** action is used to move a file from one location to another.

The input parameters to move a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| sourceFile | File | *Requires one source.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to select the file to move. |
| sourceId | String | *Requires one source.* The nodeId of the file to move. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| sourcePath | String | *Requires one source.* The location path or relative path of the file to move. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| targetFolder | Folder | *Requires one target.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to move the file into. |
| targetFolderId | String | *Requires one target.* The nodeId of the folder to move the file into. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one target.* The location path or relative path of the folder to move the file into. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

The output parameters from moving a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call moving the file. |
| file | File | *Optional.* The moved file available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

### Copy folder

The **COPY_FOLDER** action is used to copy a folder and place the copy in a new location.

The input parameters to copy a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| sourceFolder | Folder | *Requires one source.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to select the folder to copy. |
| sourceId | String | *Requires one source.* The nodeId of the folder to copy. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| sourcePath | String | *Requires one source.* The location path or relative path of the folder to copy. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| targetFolder | Folder | *Requires one target.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to move the copied folder into. |
| targetFolderId | String | *Requires one target.* The nodeId of the folder to move the copied folder into. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one target.* The location path or relative path of the folder to move the copied folder into. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

The output parameters from copying a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call copying the folder. |
| folder | Folder | *Optional.* The copied folder available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

### Move folder

The **MOVE_FOLDER** action is used to move a folder from one location to another.

The input parameters to move a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| sourceFolder | Folder | *Requires one source.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to select the folder to move. |
| sourceId | String | *Requires one source.* The nodeId of the folder to move. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| sourcePath | String | *Requires one source.* The location path or relative path of the folder to move. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| targetFolder | Folder | *Requires one target.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to move the source folder into. |
| targetFolderId | String | *Requires one target.* The nodeId of the folder to move the source folder into. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one target.* The location path or relative path of where to move the source folder into. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

The output parameters from moving a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call moving the folder. |
| folder | Folder | *Optional.* The moved folder available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

## Update actions

Update actions are used to update the contents of files and folders as well as setting other properties on nodes, such as permissions, tags, aspects and lock status.

The update actions are:

* [Update the contents of a file](#update-file-content)
* [Update the metadata of a node](#update-metadata)
* [Set permissions on a node](#set-permissions)
* [Lock a node](#lock-node)
* [Unlock a node](#unlock-node)
* [Add an aspect to a node](#add-aspect)
* [Remove an aspect from a node](#remove-aspect)
* [Update tags for a node](#update-tag)
* [Set the content type of a node](#set-type)

### Update file content

The **UPDATE_FILE_CONTENT** action is used to update the contents of a file, creating a new version of it.

The input parameters to update the content of a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| targetFile | File | *Requires one target.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file that should be updated. |
| targetFileId | String | *Requires one target.* The nodeId of the file to that should be updated. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFilePath | String | *Requires one target.* The location path or relative path of the file that should be updated. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| sourceFile | File | *Requires one source.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file that is the new, updated file. |
| sourceText | String | *Requires one source.* The new source for the file described as a block of text. |
| sourceJson | JSON | *Requires one source.* The new source for the file described in JSON format.
| newName | String | *Optional.* A new file name for the file being updated, including the file extension. For example `updated_draft.txt`. |
| majorVersion | Boolean | *Optional.* If set to `true` then the update will create a new major version of the file. |
| versionComment | String | *Optional.* A comment that will appear in the version history of the updated file. |

The output parameters from updating the contents of a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call updating the contents of the file. |

### Update metadata

The **UPDATE_METADATA** action is used to update the metadata for a file or folder.

The input parameters to update the metadata of a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to update. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to update. |
| nodeId | String | *Requires one.* The ID of the node to update. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to update. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| metadata | Content-Metadata | *Required.* Metadata to update the file or folder with. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `metadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. The output `response` will also have its prefixes replaced. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |

> **Note**: `underscoreMetadata` can be set to `true` and the `metadata` input can still use `:` with the service successfully executing the action. If `underscoreMetadata` is set to `false` and `metadata` uses `_` then the service will fail to execute the action.

An example of the `metadata` that can be sent with the file or folder is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from updating the metadata of a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call updating the metadata of the file or folder. |

### Set permissions

The **SET_PERMISSIONS** action is used to assign roles to a list of users on a file or folder.

The input parameters to set permissions are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to set the permissions for. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to set the permissions for. |
| nodeId | String | *Requires one.* The ID of the node to set the permissions for. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to set the permission for. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| users | Array | *Required.* An array of users to give the permissions to, for example `hruser, salesuser` or `["hruser", "salesuser"]`. |
| role | String | *Required.* The role to provide to the users, for example `Contributor`. |

The output parameters from setting permissions are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call setting permissions. |

### Lock node

The **LOCK_NODE** action is used to lock a file or folder so that it cannot be edited.

The input parameters to lock a node are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to lock. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to lock. |
| nodeId | String | *Requires one.* The ID of the node to lock. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to lock. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| lockType | String | *Required.* The type of lock to apply to the node: {::nomarkdown} <ul><li><b>ALLOW_OWNER_CHANGES</b>: Allows the owner of the node to continue to edit it. This is the default value.</li><li><b>FULL</b>: No changes can be made to the node until it is unlocked.</li></ul>{:/} |
| timeToExpire | Integer | *Required.* The number of seconds until the lock expires. If set to `0` then the lock will not expire until it is explicitly unlocked using an [unlock](#unlock-node) event. |
| lifetime | String | *Required.* Set whether the lock is persisted in the database or not, the possible values are: {::nomarkdown} <ul><li><b>PERSISTENT</b>:  The lock will be persisted in the database. This is the default value.</li><li><b>EPHEMERAL</b>: The lock will be a volatile in-memory lock. This should be used if frequent short-term locks are being used that don't need to be kept when the repository restarts to avoid the overhead of writing to the database.</li></ul>{:/} |

The output parameters from locking a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call locking the file or folder. |

### Unlock node

The **UNLOCK_NODE** action is used to unlock a locked file or folder so that it is editable.

The input parameters to unlock a node are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to unlock. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to unlock. |
| nodeId | String | *Requires one.* The ID of the node to unlock. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to unlock. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

The output parameters from unlocking a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call unlocking the file or folder. |

### Add aspect

The **ADD_ASPECT** action is used to add an aspect to a file or folder.

The input parameters to add an aspect are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to add the aspect to. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to add the aspect to. |
| nodeId | String | *Requires one.* The ID of the node to add the aspect to. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to add the aspect to. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| aspect | Content-Aspect-Selector | *Required.* The aspect to add to the file or folder, for example `rv:reviewable`. |
| nodeMetadata | Content-Metadata | *Optional.* Metadata to store with the file or folder. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `nodeMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. The output `response` will also have its prefixes replaced. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |

> **Note**: `underscoreMetadata` can be set to `true` and the `nodeMetadata` input can still use `:` with the service successfully executing the action. If `underscoreMetadata` is set to `false` and `nodeMetadata` uses `_` then the service will fail to execute the action.

An example of the `nodeMetadata` that can be sent with the file or folder is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from adding an aspect are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call adding the aspect. |

### Remove aspect

The **REMOVE_ASPECT** action is used to remove an aspect from a file or folder.

The input parameters to remove an aspect are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to remove the aspect from. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to remove the aspect from. |
| nodeId | String | *Requires one.* The ID of the node to remove the aspect from. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to remove the aspect from. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| aspect | Content-Aspect-Selector | *Required.* The aspect to remove from the file or folder, for example `rv:reviewable`. |

The output parameters from removing an aspect are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call removing the aspect. |

### Update tag

The **UPDATE_TAG** action is used to update the tags for a file or folder.

The input parameters to update tags are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to update the tags for. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to update the tags for. |
| nodeId | String | *Requires one.* The ID of the node to update the tags for. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to update the tags for. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| tags | Array | *Required.* A list of tags to update for the file or folder, for example `wip, draft` or `["wip", "draft"]`. |

The output parameters from updating tags are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call updating tags. |

### Set type

The **SET_TYPE** action is used to set the content type for a file or folder.

The input parameters to set the type of a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to set the type for. |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to set the type for. |
| nodeId | String | *Requires one.* The ID of the node to set the type for. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| path | String | *Requires one.* The location path or relative path of the node to set the type for. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| nodeType | Content-Type-Selector | *Required.* The type to set for the file or folder, for example `fin:invoice`. |
| nodeMetadata | Content-Metadata | *Optional.* Metadata to store with the file or folder. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `nodeMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. The output `response` will also have its prefixes replaced. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |

> **Note**: `underscoreMetadata` can be set to `true` and the `nodeMetadata` input can still use `:` with the service successfully executing the action. If `underscoreMetadata` is set to `false` and `nodeMetadata` uses `_` then the service will fail to execute the action.

An example of the `nodeMetadata` that can be sent with the file or folder is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from setting the type of a file or folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call selecting the metadata of the file or folder. |

## Governance actions

The governance actions are used to declare content as records in the repository.

> **Note:** Governance actions require [Alfresco Governance Services]({% link governance-services/latest/index.md %}) to be installed in Alfresco Cloud.

The governance actions are:

* [Declare a record](#declare-record)

### Declare record

The **DECLARE_RECORD** action is used to declare a file as a record.

The input parameters to declare a record are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to declare as a record. |
| fileId | String | *Requires one.* The nodeId of the file to declare as a record. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| filePath | String | *Requires one.* The location path or relative path of the file to declare as a record. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| hideRecord | Boolean | *Optional.* Set whether the record is hidden from its current parent folder, for example `true`. |
| targetFolder | Folder | *Optional.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to store the record in. |
| targetFolderId | String | *Optional.* The nodeId of the folder to store the record in. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Optional.* The location path or relative path of the folder to store the record in. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

The output parameters from declaring a record are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call declaring the record. |

## Security Marks

The **ADD_SECURITY_MARKS** action is used to add security marks to specific content.  
To add security marks in Process Automation you must have configured security marks in Governance Services. For information on security marks in Governance Services, see [Security Marks and Classification
]({% link governance-services/latest/using/smc.md %})

The input parameters from add security marks are:

| Property | Type | Description |
| -------- | ---- | ----------- |
| file | file | *Required.* Alfresco Content Services file to be updated. File variables are initialised by content actions or content events in triggers. E.g: 'Initialise a file variable by mapping it to the output of the generated document task. |
| folder | folder | *Required.* Alfresco Content Services folder to be updated. Folder variables are initialised by content actions or content events in triggers. |
| path | String | *Required.* Location or relative path of the node to be updated. For example, a location path could be `/app:company_home/app:user_homes/cm:hruser` and a relative path could be `/User Homes/hruser` (by default the relative path is from Company Home). |  
| nodeId | String | *Required.* Node ID of the file or folder in Alfresco Content Services. For example: `a6a977a6-c728-4038-8dbc-d914c4d8cfb3`. |
| securityGroupName | String | *Required.* Security group that contains the security marks to be assigned. E.g: 'PII'. |
| securityMarks | array | *Required.* Array including the name of the security marks to be added. |

The output parameters from add security marks are:

| Property | Type | Description |
| -------- | ---- | ----------- |
| response | json | Response for the calls. |

The **GET_SECURITY_MARKS** action is used to get security marks from specific content.

The input parameters from get security marks are:

| Property | Type | Description |
| -------- | ---- | ----------- |
| file | file | *Required.* Alfresco Content Services file from which security maks are retrieved. File variables are initialised by content actions or content events in triggers. E.g: 'Initialise a file variable by mapping it to the output of the generated document task. |
| folder | folder | *Required.* Alfresco Content Services folder from which security maks are retrieved. Folder variables are initialised by content actions or content events in triggers. |
| path | String | *Required.* Location or relative path of the node in Alfresco Content Services. For example a location path could be `/app:company_home/app:user_homes/cm:hruser` and a relative path could be `/User Homes/hruser` (by default the relative path is from Company Home). |
| nodeId | String | *Required.* Node ID of the file or folder in Alfresco Content Services. Example:\n'a6a977a6-c728-4038-8dbc-d914c4d8cfb3 |
| securityGroupName | String | *Required.* Security group that contains the security marks to be assigned. E.g: 'PII'. |

The output parameters from get security marks are:

| Property | Type | Description |
| -------- | ---- | ----------- |
| response | json | Response for the calls. |
| securityMarks | array | Array including security marks of the node for the provided security group. |

## Delete actions

The delete actions are used to delete files and folders from the repository.

The delete actions are:

* [Delete a file](#delete-file)
* [Delete a folder](#delete-folder)

### Delete file

The **DELETE_FILE** action is used to delete a file.

The input parameters to delete a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to delete. |
| fileId | String | *Requires one.* The nodeID of the file to delete. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| permanent | Boolean | *Optional.*  If set to `true` the file will be deleted permanently and not moved to the trashcan. |

The output parameters from deleting a file are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call deleting the file. |

### Delete folder

The **DELETE_FOLDER** action is used to delete a folder.

The input parameters to delete a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| folder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to delete. |
| folderId | String | *Requires one.* The nodeID of the folder to delete. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| permanent | Boolean | *Optional.*  If set to `true` the folder will be deleted permanently and not moved to the trashcan. |

The output parameters from deleting a folder are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | JSON | *Optional.* The response from the call deleting the folder. |

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Content service are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| INVALID_RESULT_FORMAT | The service result payload cannot be parsed. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. |
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
| CONFLICT | The request conflicts with current state of the server. |
| GONE | No longer available. |
| UNPROCESSABLE_ENTITY | The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. |
| LOCKED | The resource that is being accessed is locked. |
| FAILED_DEPENDENCY | The request failed due to failure of a previous request. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |
