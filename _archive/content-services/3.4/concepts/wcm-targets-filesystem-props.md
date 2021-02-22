---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Web Content Management, Deployment]
option: Web Content Management deployment target avm
---

# Filesystem deployment target properties and metadata

The following table shows the properties that can be configured on the file system deployment target.

|Property|Description|
|--------|-----------|
|`name`|This is the target name. To select this deployment target, the value of this property should be entered in the "Target Name" box of the UI. \(string\)|
|`autoFix`|The flag controlling the automatic repair of metadata. \(boolean\)

|
|`rootDirectory`|The directory on the file system which will receive files deployed to this target. Note: this directory must be unique to each target. At this time it is not possible to configure multiple targets that deploy to a single shared directory. \(string\)

|
|`metaDataDirectory`|The directory on the file system which stores information relating to the current contents of this target's rootDirectory. \(string\)

|
|`fileSystemReceiverService`|Indicates the File System Receiver Service bean which is associated with this deployment target. \(bean reference or declaration\)

|
|`authenticator`|A link to an implementation of the DeploymentReceiverAuthenticator interface. May be either DeploymentReceiverAuthenticatorSimple \(preconfigured username/password\) or DeploymentReceiverAuthenticatorAuthenticationService \(full Alfresco authentication.\) \(bean reference or declaration\)

|

The File System Deployment Target has a simple repository of metadata to track which files, directories and versions are on the target file system. This data is maintained automatically by the File System Deployment Target. It reduces the amount of files that need to be deployed.

To force a full redeploy, you can safely delete the contents of the metadata directory, but you must ensure that a deployment is not already in progress.

The location of the metadata is configured for each target through the `metaDataDirectory` property.

If there are multiple file system targets on the same deployment engine, consider whether any of the targets share metadata or have one set of metadata per target. The simplest configuration is to use a separate folder for each target's metadata with a folder structure like <receieverRoot\>/<metadata\>/<targetName\>.

File System Deployment Targets have functionality to validate that the metadata and the target deployment are consistent. Validation occurs after the deployment engine starts and after detecting an inconsistency. For example trying to delete a file that does not exist or overwriting a file that was outside the control of the File System Deployment Target.

The File System Deployment Target can either issue an error upon detecting a problem or automatically fix the problem. The autoFix parameter in the definition of the Target controls whether the File System Deployment Target will attempt to fix the metadata itself or just issue a warning. Set the value to true to fix or false to not fix.

**Parent topic:**[Filesystem deployment target](../concepts/wcm-targets-filesystem.md)

