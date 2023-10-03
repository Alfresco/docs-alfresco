---
title: Smart Folders
---

A Smart Folder is a way of grouping files from different locations in Alfresco Share into a single folder, so that you can quickly find similar files.

A search runs when you open the contents of the Smart Folder, and the results are displayed. It is “smart”, because there is no physical folder to represent it in the repository.

For example, a Smart Folder called My video files might be created to contain all files that I created that have a video format. Every time I open the My video files folder, the search runs, and all my video files are available in that folder, wherever in the repository I have created them.

You might not even know that you are using Smart Folders. If you see this icon, ![Folder with a magnifying glass representing a Smart Folder]({% link content-services/images/sf.png %}), then the folder is smart. Files are also automatically classified when they're uploaded into these folders.

The diagram shows a physical file system, and how a Smart Folder structure is created to contain files relevant to a particular customer:![Smart folder mapping]({% link content-services/images/sf-mapping.png %})

Smart Folders have a limited set of actions:

* **Add/Create**: You can add files to a Smart Folder. The file is put into a physical folder, as specified by the filing rule.
* **Update**: You can update files in a Smart Folder. Updating a property might result in a file being removed from the current Smart Folder (because it no longer meets the query criteria).
* **Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy** actions for files are not supported.

The Smart Folder itself can't be edited in Content Services, except through the Smart Folder Template. For more information about Smart Folder Templates, see [Applying a Smart Folder Template](#applysmartfoldertemplate).

Your system administrator creates templates that you can load for different purposes, for example; a structure for a claim, or to file PDF files separately from video or audio files, or just to personalise the folder structure by user.

Take a look at the videos to learn more: [Smart Folders videos]({% link content-services/7.2/tutorial/video/content.md%}#smart-folder-overview)

System administrators and business analysts can find more information here: [Configuring Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}).

> **Note:** The videos and labels within images are in English.

## Applying a Smart Folder Template {#applysmartfoldertemplate}

You can apply a Smart Folder structure to a physical folder by using aspects.

1. In a site, select Document Library.

2. Click Create, then Folder to create a new folder. Enter the folder name and Save.

    Alternatively, select an existing physical folder. A physical folder is one that you have created: ![Physical folder icon]({% link content-services/images/folder.png %})

3. Hover over the folder and from the menu, select More, then Manage Aspects.

4. In the Select Aspects window, add one or more of the predefined Smart Folder aspects (System Smart Folder or Custom Smart Folder depending on the templates added by your organization), and Save.

    Ask your business analyst or system administrator whether System or Custom Smart Folders are set up for your organization.

5. Hover again over the new folder and from the menu, select Edit Properties, and All Properties. Select the Smart Folder Template that you want, and Save.

    If your system administrator has created templates for your organization, you can find these by drilling down to `Data Dictionary/Smart Folder Templates`.

    System administrators can find more information about the templates here: [Enabling Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}).

    The physical folder that you selected now has a Smart Folder structure under it, containing files that apply to the search criteria in the Smart Folders Template. For example, if you apply the standard smartFoldersExample.json template, you have a number of folders:

    * My Content: every file in the repository, containing:
    * All site content (Documents and Multimedia Files, filed according to type)
    * This folder's content (Documents and Multimedia Files, filed according to type)
    * Contributions
    * My content modified by other users
    * User home
    * Tagged 'Confidential'

    Folders contain files according to what files you have in your site. For example, if you have created audio files in the site, you will see these if you drill down to All site `content/Multimedia Files/Audio content` and any specific to this physical folder in `This folder's content/Multimedia Files/Audio content`. Any of your files that are marked as Confidential in the metadata appear in the `Tagged 'Confidential'` folder.

## Smart Folders FAQs

If you have any problems with Smart Folders, try these suggestions to resolve your issue.

### What are the main features of Smart Folders?

With Smart Folders you can:

* Find content by what it is, not where it is stored
* Define stored searches in a template and display them in a hierarchical folder tree
* Run a search when you open a folder and the results are displayed as the "folder's content"
* Federate content that is distributed across the repository into a single view or Smart Folder
* Provide one or more metadata-driven taxonomies to build a folder tree, so that any folder or file can be displayed in multiple folders, appropriate to the business context without the need for filing
* Automatically classify new files and inherit or map metadata to the file itself
* Easily replicate Smart Folder structures
* Apply to existing content without the need to restart Content Services

### Can I delete a file from a Smart Folder?

No, you can't. This option is not available. You must delete the file from it's physical location, or edit the properties so that it does not meet the filing criteria for the Smart Folder.

### Can I create a new folder or file inside a Smart Folder?

You can create a new file, but not a folder. The file is put into a physical folder, as specified by the filing rule.

### Can I update a file in a Smart Folder?

Yes you can, but if you change the properties of the file, it might cause the file to move out of the Smart Folder.

### Can I move or copy a file from a Smart Folder?

No, you can't. The file does not physically live in that folder so can't be moved or copied.

### Why can't I like or favorite a Smart Folder?

You can't perform certain folder actions with Smart Folders; for example, Favorite, Like and Comment options are not available (because the folder does not physically exist).

Other actions that are not available include Delete, Move to, Copy to, Upload, and Create.

### Why is a new file not showing in a Smart Folder?

It can take a few seconds for a new file to appear in the Smart Folder. This often happens if the index is not up-to-date. Check with your system administrator if you are having problems.
