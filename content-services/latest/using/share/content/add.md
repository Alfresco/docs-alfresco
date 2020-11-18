---
title: Add content
---

You build up site content by creating an organized folder structure then adding content to it.

There are two ways to add content to Alfresco Share: create new content or upload existing content from your computer.

There are different options available depending on whether you're adding files or adding folders.

## Adding folders

You can add folders from outside Alfresco Share and create new folders within a site.

There are three ways to add folders:

* Click Create in the Document Library - see [Creating folders](#createfolders)
* Drag and drop folders from your computer - see [Drag and drop folders](#dragdropfolders)
* Create folders from templates - see [Creating folders from a template](#createfoldersfromtemplate)

### Creating folders {#createfolders}

The **Library** section of the explorer panel shows the folder structure for the current site. A new site contains just one folder named Documents. Add new folders here.

1. Choose where you want to add a folder, either by using the explorer panel or by clicking through folders in the file list.

2. Click **Create** then **Folder**.

3. Enter a name for the folder.

    The folder name does not support the following special characters: `* " < > \ / . ? : and |`. When the name contains a disallowed character the **Save** button is disabled.

    > **Note:** The folder name can include a period as long as it is not the last character.

4. Add a title and description for the folder.

5. Click **Save**.

You'll see the new folder in the explorer panel.

### Drag and drop folders {#dragdropfolders}

You can drag and drop folders straight from your computer into Alfresco Share.

> **Note:** Drag and drop isn't available in all browsers - we recommend using with Google Chrome or Firefox.

When you drop a folder, subfolders or files in the dropped folder will also be added. This means that you can add whole sets of files and folders and maintain their structure.

If empty folders exist in the folder structure you upload then they'll also be created.

> **Note:** Thumbs.db, desktop.ini, and DS_Store files aren't uploaded, even if they exist within a folder you drag and drop.

1. Choose where you want to add a folder, either by using the explorer panel or by clicking through folders in the file list.

2. Click on the folder in Windows Explorer, Apple Finder, or on your desktop. Hold down the mouse button while you drag the folder then let it go to drop the folder.

    You can drag and drop folders into the current level or directly onto another folder. An arrow will be displayed when the files are correctly positioned over a folder to be dropped. You can't drag and drop content directly into folders in Table, Audio, or Media views.

    You can't upload folders whose names contain the following special characters: `* " < > \ / . ? : and |`.

    > **Note:** The folder name can include a period as long as it is not the last character.

    If you drop files or folders into a location where there's already a file or folder with that name, then they'll be added as another file with `-1` added to their filename.

### Creating folders from a template {#createfoldersfromtemplate}

As well as creating folders from scratch, you can also create folders from templates.

>**Note:** Templates are only available if your Alfresco administrator has set some up for you.

1. Choose where you want to add the folder.

    The item list displays the current contents of the selected folder. The folder you create will be added here.

2. Click **Create** then **Create folder from template**.

    A list of available templates will be displayed.

3. Select the template.

    A new folder based on the template is added to the document library. If the template contains content and subfolders these will also be replicated in the new folder.

## Adding files

You can add both existing files from outside Alfresco Share and create new files within a site.

Use the **Upload** option to upload existing files from your computer into the library.

You can also drag and drop one or more files to the library view - even to a particular folder.

>**Tip:** In **Detailed View** you can drag and drop files into the current library level or directly onto a folder. An arrow will be displayed when the files are correctly positioned over the folder to be dropped. In all other views you can drop files into the current library level only. So if you want to drop them into a specific folder, that folder needs to be open in the library view.

The **Create** menu provides options for creating different kinds of content directly in the library: plain text, HTML, and XML documents, as well as three types of Google Docs content (documents, spreadsheets, presentations). You can also create content from a template.

### Uploading files

Adding files from your computer to Alfresco Share is simple. You can upload a single file or several files at a time.

You can upload files in two ways: drag and drop files from your computer directly into the library, or click ![Upload icon]({% link content-services/images/upload-icon.png %}){:height="18px" width="18px"} **Upload**. When you drag and drop a blue outline highlights the selected drop point.

>**Tip:** You can drag and drop files into the current library level or directly onto a folder. An arrow will be displayed when the files are correctly positioned over the folder to be dropped. You can't drag and drop content directly into folders in Table, Audio, or Media views.

>**Note:** Internet Explorer 8 and 9 do not support drag and drop functionality. If you are using one of these browsers, you need to click **Upload** to add content.

1. Select the folder in the document library where you want to add your content.

    When you select a folder in the explorer panel the item list displays the current contents of that folder. When using the **Upload** action the file(s) you select will be added here.

2. Click ![Upload icon]({% link content-services/images/upload-icon.png %}){:height="18px" width="18px"} **Upload**.

3. Click **Select files to upload** on the Upload Files dialog box.

4. Find and select the files that you want to upload from your computer.

The document library displays the uploaded content.

This video show you how to add content.

### Creating files

With the **Create** feature you can create plain text, HTML, and XML files directly in Alfresco Share.

You can also [create Google Docs content](#creategoogledocsfiles) and [create content from templates](#createfilefromtemplate).

1. Select the folder where you want to add the content.

    The file list displays the current contents of the selected folder. The content you create will be added here.

2. Click **Create** and then select the type of file you want to create.

    >**Note:** To create content from a template, click **Create document from template** and select from the list of templates made available by your administrator. A new file with the same name as the template is created. You can rename the new file and edit the default content. No other steps in this task are required.

3. Enter a **Name** for the content.

    The **Name** does not support the following special characters: `* " < > \ / . ? : and |`. When the name contains a disallowed character the **Create** button is disabled.

    >**Note:** The name can include a period as long as it is not the last character. This allows you to add an extension (for example, .txt, .html, or .xml) if you want, though it's not required.

4. Add a title and description for the file.

5. Add the file content in the **Content** box.

    For HTML documents you can use the additional formatting options, and for XML documents you can include any required XML tagging. For HTML documents you can also drag the bottom right corner to resize the text editor.

6. Click **Create**.

The file is saved to Alfresco Share and displayed in the file preview screen.

### Creating Google Docs files {#creategoogledocsfiles}

You can easily create Google Docs documents, spreadsheets, and presentations from Alfresco Share.

Files you edit are temporarily stored in Google Docs, then removed from Google Docs once they've been checked back in to Share.

1. Select the folder where you want to add the content.

    The file list displays the current contents of the selected folder. The content you create will be added here. You can create new folders as necessary.

2. Click **Create** and select the type of Google Docs file you want to create.

    >**Important:** The first time you access Google Docs you have to authorize Share to use your account. If you have a Google Username in your Alfresco Share profile then it will be used as the default account. After responding to the prompts a message lets you know that the authorization was successful.

    Share stores your Google Docs account information. You will need to authorize Share each session, but you won't have to re-enter your credentials each time.

    If your browser asks you to allow popups for Google Docs then go ahead and do so. If you're using Safari you won't be able to use Google Docs until you enable all popups in the settings, so for security reasons you may prefer to use a different browser.

    Google Docs opens with standard Google Docs functionality available, including the menu, the toolbar, and the features to add comments and share.

3. Click the default title to rename the file. On the Rename Document dialog box, enter a name and click **OK**.

    >**Note:** You can also rename the file in the Share.

4. Create your content.

    The file is saved to Google Docs, and locked in Alfresco until you check it in.

5. When you're done, close the Google Docs browser tab.

    In Share you'll see the file displays the ![Geolocation metadata icon]({% link content-services/images/ico-googledocs.png %}){:height="18px" width="18px"} icon to show that it's open in Google Docs.

6. In Share, click **More** then **Check In Google Doc**.

This video shows you how to create content.

### Creating files from a template {#createfilefromtemplate}

As well as creating files from scratch, you can also create files from templates.

> **Note:** Templates are only available if your Alfresco administrator has [set some up for you](TODO:../concepts/templated-nodes-intro.md).

1. Select the folder where you want to add the content.

    The file list displays the current contents of the selected folder. The files you create will be added here.

2. Click **Create** then **Create document from template**.

    A list of available templates will be displayed.

3. Select the template.

    A new file based on the template is added to the document library.
