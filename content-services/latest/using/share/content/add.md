---
title: Add content
---

You build up site content by creating an organized folder structure then adding content to it.

There are two ways to add content to Alfresco Share: create new content or upload existing content from your computer.

There are different options available depending on whether you're adding files or adding folders.

### Adding folders

You can add folders from outside Alfresco Share and create new folders within a site.

There are three ways to add folders:

* Click Create in the Document Library - see [Creating folders](../tasks/library-create-folder.md)
* Drag and drop folders from your computer - see [Drag and drop folders](../tasks/library-folder-dragdrop.md)
* Create folders from templates - see [Creating folders from a template](../tasks/library-folder-template.md)

### Creating folders

The **Library** section of the explorer panel shows the folder structure for the current site. A new site contains just one folder named Documents. Add new folders here.

1. Choose where you want to add a folder, either by using the explorer panel or by clicking through folders in the file list.

2. Click **Create** then **Folder**.

3. Enter a name for the folder.

    The folder name does not support the following special characters: * " < > \ / . ? : and \|. When the name contains a disallowed character the **Save** button is disabled.

    > **Note:** The folder name *can* include a period as long as it is not the last character.

4. Add a title and description for the folder.

5. Click **Save**.

You'll see the new folder in the explorer panel.

### Drag and drop folders

You can drag and drop folders straight from your computer into Alfresco Share.

> **Note:** Drag and drop isn't available in all browsers - we recommend using with Google Chrome or Firefox.

When you drop a folder, subfolders or files in the dropped folder will also be added. This means that you can add whole sets of files and folders and maintain their structure.

If empty folders exist in the folder structure you upload then they'll also be created.

> **Note:** Thumbs.db, desktop.ini, and DS_Store files aren't uploaded, even if they exist within a folder you drag and drop.

1. Choose where you want to add a folder, either by using the explorer panel or by clicking through folders in the file list.

2. Click on the folder in Windows Explorer, Apple Finder, or on your desktop. Hold down the mouse button while you drag the folder then let it go to drop the folder.

    You can drag and drop folders into the current level or directly onto another folder. An arrow will be displayed when the files are correctly positioned over a folder to be dropped. You can't drag and drop content directly into folders in Table, Audio, or Media views.

    You can't upload folders whose names contain the following special characters: * " < > \ / . ? : and \|.

    > **Note:** The folder name *can* include a period as long as it is not the last character.

    If you drop files or folders into a location where there's already a file or folder with that name, then they'll be added as another file with "-1" added to their filename.

### Creating files from a template

As well as creating files from scratch, you can also create files from templates.

> **Note:** Templates are only available if your Alfresco administrator has [set some up for you](link ../concepts/templated-nodes-intro.md).

1. Select the folder where you want to add the content.

    The file list displays the current contents of the selected folder. The files you create will be added here.

2. Click **Create** then **Create document from template**.

    A list of available templates will be displayed.

3. Select the template.

    A new file based on the template is added to the document library.