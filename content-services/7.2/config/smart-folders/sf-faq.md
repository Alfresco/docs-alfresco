---
title: Smart Folders FAQ
---

If you encounter any technical problems with Smart Folders, try these suggestions to resolve your issue.

## How do I enable Smart Folders?

Smart Folders can be enabled (and disabled) by your system administrator by adding the following property in the `alfresco-global.properties` file:

```bash
smart.folders.enabled=true
```

## How do Smart Folders affect Alfresco Content Services if the function is enabled, but not used?

Smart Folders is part of the standard repository, and there might be unexpected interactions if Smart Folders are enabled but not used. The most important impact is on performance. Alfresco Content Services performance might degrade based on the complexity and the number of Smart Folders used.

See [Best practices for Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}#best-practice) , and [Type-based, System, and Custom Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}#sf-type) for more information.

## Are there best practices to avoid performance problems?

Yes there are. See [Best practices when using Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}#best-practice) for more information.

## Where can I find technical documentation?

Use the Smart Folder tutorial, [Smart Folders tutorial]({% link content-services/7.2/tutorial/smart.md %}), to set up a working Smart Folder configuration. General configuration information is here: [Configure Smart Folders]({% link content-services/7.2/config/index.md %}).

## Which components or subsystems do Smart Folders provide?

Smart Folders introduce a private AspectJ-based, non-disruptive extension point implementation mechanism called TraitExtender.

The Smart Folders implementation extension bundle, which is a set of extensions that act as service interceptors for several services, is classified as a module because it can be added to and removed from the repository. They aren't publicly exposed currently.

## Which services do Smart Folders extend?

These services are extended:

* `DbNodeServiceImpl` basic node handling
* `FileFolderServiceImpl` basic file and folder modeling
* `PreferenceServiceImpl` node based preferences information handling (for example; favorites)
* `RatingServiceImpl` node based ratings
* `LockServiceImpl` node locking
* `PermissionServiceImpl` node permissions handling
* `CheckOutCheckInServiceImpl` node check out / check in
* `Version2ServiceImpl` node versioning

The `LockableAspectInterceptor` Spring interceptor is also extended.

## How can I extend Smart Folders? Which interfaces, APIs, and extension points exist?

There are currently no publicly exposed extension points for Smart Folders.

## As a developer, I want to create a custom application. How can I use Smart Folders in my code?

Use standard Alfresco Content Services APIs. All custom uses of nodes, files, and folders apply.

Note that Smart Folders do not show up in search queries, however, the content within a folder will show up if it matches the query.

## As a developer, creating my own custom application (separate from the Share evaluators), how do I distinguish between a Smart Folder and an object that is displayed in a Smart Folder?

Use this guidance to differentiate between a Smart Folder and an object that is displayed in a Smart Folder:

* Root folder, with Smart Folder sub folders:

  This is a standard folder and is referenced using normal NodeRefs. The only difference is the sub-folder content.

* Smart Folder structure, as defined by a Smart Folder Template:

  This structure has the `smf:smart` aspect, and is referenced using a special NodeRef. Repository clients must not use the NodeRef format to detect these nodes.

* Smart Folder structure, as defined by a query:

  This structure has the `smf:smartFolderChild` aspect, and is referenced using a special NodeRef. Repository clients must not use the NodeRef format to detect these nodes.

## I have created a new Share module. How can I enable Share actions for Smart Folders?

Any new Share action, by default, is not enabled, because not all actions are supported with Smart Folders (for example, data can't be persisted with a Smart Folder).

Ensure that you conduct adequate testing before enabling an action for Smart Folders.

To enable the new action, add an evaluator in the appropriate action group definition in your module, or add it to the Tomcat `shared/classes/alfresco/web-extension/smartfolders-amp-actions-config.xml` file.

## Which Share actions are enabled as standard for Smart Folders?

Smart Folders have a limited set of actions:

* Add / Create:

  You can add files to a Smart Folder. The file is put into a physical folder, as specified by the filing rule.

* Update:

  You can update files in a Smart Folder. Updating a property might result in a file being removed from the current Smart Folder (because it no longer meets the query criteria).

* Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy

  These actions aren't supported for files.

The Smart Folder itself can't be edited in Alfresco Content Services, except through the Smart Folder Template. For more information about Smart Folder Templates, see [Apply a Smart Folder Template]({% link content-services/7.2/using/smart-folders.md %}).

## Can I use multi-value properties with Smart Folders?

Properties that can have multiple values are supported in a query. However, you can't upload new content and set a value for a multi-value property.

## What is the Data Dictionary/Smart Folder Downloads folder used for?

The **Data Dictionary > Smart Folder Downloads** folder is used only when you use the **Download as Zip** function in Share, for a folder that contains Smart Folders. `Download as Zip` creates a temporary file in the `Smart Folder Downloads` folder that contains information about the Smart Folder contents.
