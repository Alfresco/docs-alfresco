---
title: Manage content
---

Content can be added, viewed and organized easily in Alfresco Share.

## Adding content

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

### Creating files from a template {#createfilefromtemplate}

As well as creating files from scratch, you can also create files from templates.

> **Note:** Templates are only available if your Alfresco administrator has [set some up for you]({% link content-services/6.1/admin/templates.md %}).

1. Select the folder where you want to add the content.

    The file list displays the current contents of the selected folder. The files you create will be added here.

2. Click **Create** then **Create document from template**.

    A list of available templates will be displayed.

3. Select the template.

    A new file based on the template is added to the document library.

## Viewing content

To get a closer look at a file or folder without downloading it, you can view it on the file preview screen. This gives you more detail, a preview, and access to social features, actions, and version history.

### Viewing folder details

View the details page for a folder to conveniently see all information and actions in one place.

1. Hover over a folder in the file list in the document library.

    > **Note:** Make sure you haven't selected **Hide Folders** in the Options menu.

2. Click ![View Details icon]({% link content-services/images/view-folder-detail-icon.png %}) **View Details**.

    The Folder Details page displays all folder information, including properties and permissions. This page includes social features and folder actions.

Click the folder in the breadcrumb trail at the top of the screen to return to the item list for that folder.

### Viewing a file

You can preview files by clicking on the thumbnail or name in the document library. All file details and actions are available on this one screen.

The preview screen is split into four sections.

#### Info and options

The info includes the file location and name, version number, the user who last modified the file, and the date/time of the modification. An icon to the left of these shows the file type.Above this info is a link to return to the document library.

With the options you can:

* Click ![Like icon]({% link content-services/images/ico-download.png %}) to download a file.
* Click ![Like icon]({% link content-services/images/like-icon.png %}) to like a file. You can click it again to unlike it.
* Click ![Favorite icon]({% link content-services/images/favorite-icon.png %}) to favorite a file. You can click it again to unfavorite it.
* Click ![Comment icon]({% link content-services/images/comment-icon.png %}) to comment on a file. When you've entered your comment click **Add Comment**.
* Click ![Share icon]({% link content-services/images/ico-share.png %}) to share a file. You can copy a link or share it directly on social media.

#### Preview

The preview options depend on what kind of file you're previewing.

A video preview has standard video playback controls.

When you preview a Microsoft Office, PDF, or other text-based file type (not an image or video) then you can zoom in and out, click **Maximize** to view a larger preview, and scroll between pages of multi-page files.

> **Note:** The zoom level and current page number are saved for the next time you preview this item.

You can also:

* **Download** ![Like icon]({% link content-services/images/ico-download.png %}) the file in its original format or as a PDF.
* Click ![Advanced Search icon]({% link content-services/images/ico-link.png %}) to share a link to the file, and even select to **Link to current page**.
* Click ![Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) to search for text within the file.

#### Comments

Comments are beneath the preview. Here you can add a comment, as well as edit and delete comments you've added.

> **Note:** You can't add a comment if you have Consumer permission levels for the site.

The comment list displays the 10 most recent comments. Click previous (<<) and next (>>) to see more comments.

#### Actions and details list

The actions and details are grouped in sections that you can expand and collapse.

> **Note:** The viewing options are saved for the next time you preview this file.

* **Document Actions** - All actions available for the file.
* **Tags** - Tags associated with the item. Click ![Configure icon]({% link content-services/images/ico-configure.png %}) to display the Edit Properties page. On this page click **Select** beneath the **Tags** label to edit the tags. You can add and remove existing tags, and create new tags.
* **Share** - Select and copy this link to share it with others.
* **Properties** - Click ![Configure icon]({% link content-services/images/ico-configure.png %}) to edit the properties of the file.
* **Permissions** - Click ![Permissions icon]({% link content-services/images/ico-manage-permissions.png %}) to edit the permissions for this file.
* **Workflows** - Displays tasks that this file is included in. The profile picture of the user who started the task and the task type are shown. Click ![Tasks icon]({% link content-services/images/ico-workflow.png %}) to start a new task for this file, and click a task description to view the task.
* **Version History** - Displays previous versions. Click ![Upload version icon]({% link content-services/images/ico-version-upload.png %}) to upload a new version, ![Replace version icon]({% link content-services/images/ico-version-revert.png %}) to replace the current version with a previous version, ![Download icon]({% link content-services/images/ico-version-download.png %}) to download a previous version, or ![Version properties icon]({% link content-services/images/ico-version-properties.png %}) to view previous version properties.

### View a file in a browser

While the preview feature lets you view a file in Alfresco Share, you also have the option of viewing it in your default browser.

1. Hover over a file in the document library.

2. Click **View in Browser**.

    A new browser window opens displaying the selected file. For some file types, such as Microsoft Office documents, Share launches the file in its associated program.

### View a file on Google Maps

When a file has geolocation data attached to it you can view the file location on Google Maps directly from Alfresco Share.

1. Hover over a file that has the Geolocation Metadata available icon ![Geolocation metadata icon]({% link content-services/images/geographic-icon.png %}).

2. Click **More** then **View on Google Maps**.

    The location attached to the file is shown in Google Maps, together with a preview of the file and a summary of the geolocation data.

## Organizing content

With different people creating folders and adding files, you want to keep on top of it. Alfresco Share has multiple features available to help you keep content labelled, organized, and filed correctly.

### Dragging and dropping content

The drag and drop functionality lets you easily move content around the library.

> **Note:** You can't drag and drop content in Table, Audio, or Media views.

1. In the library click the thumbnail of the file or folder you want to move. Don't release the mouse button.

    When you move a folder, all of its content moves with it.

2. Drag the content to its new location. This can be a folder in the explorer panel or breadcrumb path, or onto another folder in the library.

    > **Note:** The target folder must be visible before you do the move. When you are positioned over the folder it is highlighted.

    The target folder appears highlighted in the tree or the breadcrumb path.

3. Release the mouse button to move the content.

    >**Important:** To move several files or folders at once, or to move content to another site library, use the **Move to** action.

    To upload a new version of an existing file you need to use the **Upload New Version** option. If you drag and drop a file that has the same name as a file already in the drop location, it'll be added as a new file with `-1` appended to the file name.

## Moving content

You can move content to relocate it to another location within the current library or to a library in a different site.

1. Hover over a file/folder in the library and click **More** then **Move to**.

    When you move a folder, all of its content moves with it.

2. Hover over a file/folder and click **More** then **Move to**.

    When you move a folder, all of its content moves with it.

    > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Choose the site and folder where you want to place the content.

    > **Note:** You can only move content to sites that you have permission to access.

4. Click **Move**.

You can move multiple files/folders at once by selecting them and using the **Move to** option on the **Selected Items** menu.

## Copying content

You can copy content between locations, within a site or across different sites.

1. Find the file or folder you want to copy.

    When you copy a folder, you also copy its contents.

2. Hover over a file/folder and click **Copy to**.

    > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

    > **Note:** You're copying only the current version. The version history and comments are not carried over with the content.

3. Choose the site and folder where you want to place a copy of the content.

    > **Note:** You can only copy content to sites that you have permission to access.

4. Click **Copy**.

    A copy of the content is created. This is considered a new file so appears as version 1.0, with you as the creator.

You can move multiple items at once by selecting them and using the **Move to** option on the **Selected Items** menu.

## Creating links to content

You can create links to content between Alfresco locations, within a site or across different sites. This is similar to copying content, but instead of creating a new copy, you create a link to the existing file.

1. Find the file or folder you want to create a link to.

2. Hover over a file/folder and click **Copy to**.

    > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Choose the site and folder where you want to create a link to the content.

    > **Note:** You can only create links in sites that you have permission to access.

4. Click **Create Link**.

    A link to the content is created. Links to other content have "Link to" added to their name and are represented by the ![Linked file]({% link content-services/images/ico-copied-file.png %}) and ![Linked Folder]({% link content-services/images/ico-copied-folder.png %}) icons.

When you click on a linked file or folder, or select **Locate Linked Item**, the original file or folder will be shown in its original site.

You can hover over a link and select **Delete Link** to remove it.

> **Note:** If you're using something other than Alfresco Share to access content, for example Alfresco Desktop Sync, then linked files might not be visible.

## Unzipping content

You can unzip `.zip` and `.acp` files to add their contents to a folder in Alfresco Share.

This means that you don't need to download a zip file to see its contents. You can quickly upload multiple files at the same time in a zip file, and then unzip them to your preferred location.

1. Click on a zip or acp file to open the file preview.

2. Click **Unzip to**.

3. Choose the site and folder where you want to unzip the files to.

    > **Note:** You can only unzip files to sites that you have permission to access.

4. Click **Unzip**.

    The files are unzipped and you can access them in the folder you chose to put them in. The zip file is still available in its original location.

    > **Note:** If you have a zip that contains several thousand files, it might take more than 10 seconds to complete. If this is the case, you might see a message saying that the unzip operation could not be completed. This message is issued because Share has not had confirmation that the unzip operation has completed within 10 seconds. Check the folder where you wanted to unzip the files, to see if the unzip operation completed successfully.

    > **Note:** Alfresco administrators can also use the [Bulk Import tool]({% link content-services/6.1/admin/import-transfer.md %}) to import multiple files.

## Renaming content

You can quickly rename files and folders.

1. Find the file/folder you want to rename.

2. Hover your cursor over the content name to display the ![Configure icon]({% link content-services/images/ico-configure.png %}) edit icon.

    > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Click this icon to enter editing mode.

4. Change the name and click **Save** (or press ENTER).

    > **Note:** Don't change or delete the filename extension.

    The updated name is shown in the file list.

    > **Note:** You can also rename a file or folder by editing its properties.

## Tagging and categorizing content {#tagcategorizecontent}

You can tag and categorize similar or related content making it easy to find the content again.

Clicking on a category or tag in the explorer panel displays all content associated with that tag or category.

Tags are unstructured and useful for searches, whereas categories actually help you to structure the organization of your content.

Tags and categories are a form of social indexing, and when a tag and category is created it's then available across all your sites and can be reused by all users.

### Tags

Anyone can create tags and then tag content with them. You can tag:

* Files and folders
* Wiki pages
* Blog posts
* Discussion topics
* Calendar events
* Site links

Tagging can be done when you create content, or you can edit existing content to add or remove tags. You can create your own tags or select from a list of tags already used in the current site.

In the **Document Library** you can manage tags in the item list or by editing the content properties. In all the other site features such as wiki pages and blogs you manage tags in the Tags section when creating or editing content, as follows:

* **Add a new tag**: Type a tag in the field provided and then click **Add**. To create several tags at once, separate each tag with a space. To add a multi-word tag, place it in quotation marks (for example, "draft material").
* **Add an existing tag**: Click **Choose from popular tags in this site** to display the tags already used in the current site, then click the tag you want to use.
* **Remove a tag**: In the list of associated tags, click ![Delete button]({% link content-services/images/ico-delete.png %}) to remove an existing tag.

> **Note:** Data lists don't support tagging.

You can also search for content using tags as the search term.

### Categories

Unlike tags, which are not in a hierarchy and can be created by anyone, categories must be managed by an administrator.

An example of categories, would be to have Regions as a top level category, then sub-categories of Africa, Asia, Europe, Latin America, North America, and Oceania, then further sub-categories of each of their countries.

Categories can only be associated with library items and folders. Content needs to be enabled for categorizing before you can add it to a category, see [Managing Aspects]({% link content-services/6.1/using/content/files-folders.md %}#applyaspects).

### Tagging content

To make content easier to find you can create and manage tags for files and folders in the document library.

1. In the library find the content you want to tag.

2. Hover your cursor over a tag to display the ![Tag icon]({% link content-services/images/ico-configure.png %}) tag icon, or if the content has no tags hover your cursor over the label **No Tags**.

    > **Note:** In some views this option isn't available or you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Click ![Tag icon]({% link content-services/images/ico-configure.png %}).

4. Create and manage the tags:

    * **Create a new tag:** Type the tag name; it can be one or more words. Press ENTER.
        > **Note:** A list of possible matches might appear as you type. These are tags already used in this site. You can select a tag from this list to add it.
    * **Edit an existing tag:** Click a tag to enter editing mode. Change the tag name and press ENTER.
    * **Remove a tag:** Click the **X** to the right of a tag to remove it.

5. Click **Save**.

### Categorizing content

You can categorize files and folders to group similar content into pre-defined categories.

1. Hover over the content you want to categorize.

    > **Note:** You can only categorize content that has the **No Categories** label or displays existing categories. See [Managing Aspects]({% link content-services/6.1/using/content/files-folders.md %}#applyaspects) for more details on enabling content to be categorizable with the classifiable aspect.

2. Click **Edit Properties**.

3. Click the Categories **Select** option.

    The available categories are displayed. You can click on a category to display any sub-categories. Categories are available for use across all sites and by all users.

4. Click **+** next to each category you want to add. You can categorize files using parent categories and their sub-categories.

5. Click **OK** the click **Save**.

When you click on a category, either next to content in the document library or in the explorer panel, all content in that category is displayed in the document library. When you click on a tag, either next to content in the document library or in the explorer panel, all content with that tag is displayed in the Document Library.

You can also search for content using tags as the search term.

### Favoriting content

Use the **Favorite** action to mark library content that you access often. This adds the file or folder to the **My Favorites** view in the explorer panel where you can easily find it.

You can favorite both file and folders.

>**Tip:** In some views this option isn't available or you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}){:height="18px" width="18px"} information icon.

1. In the library find the content you want to favorite.

2. Click ![Favorite icon]({% link content-services/images/favorite-icon.png %}){:height="18px" width="18px"} **Favorite**.

    You'll see the icon change.

    >**Note:** Click the **Favorite** icon again if you want to remove the content from your list of favorites.

### Locate items and folders

When you filter library content using one of the **Documents** or **Tags** explorer views, it is not possible to tell where a file or folder is within the library folder structure. The **Locate File** and **Locate Folder** actions reveal the actual location of a file or folder in the library.

This option is only available if a **Documents** view (All Documents, I'm Editing, Others are Editing, Recently Modified, Recently Added, or My Favorites) or **Tag** view is selected in the explorer pane.

1. Hover the cursor over a file or folder to display the available actions.

    >**Tip:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}){:height="18px" width="18px"} information icon.

2. Depending on the type of content you have selected, click **Locate File** or **Locate Folder**.

The view updates to show the file/folder in its library location.

### Multi-selecting content

You can perform a single action on several pieces of content at once. You can select any number of files and folders in the same view.

1. Select content in the Document Library. You can do this in two ways:

    * Click the check box of each file and folder you want to select.
    * Open the **Select** menu and click an option: **Documents**, **Folders**, or **All**.

    In the Select menu, click **None** to clear your selections; click **Invert Selection** to toggle the check boxes to their opposite state.

2. Open the **Selected Items** menu and click the action you want to perform.

## Deleting content

Delete content to remove it from a site library.

1. Hover over an file/folder in the library and click **More** then either **Delete Document** or **Delete Folder**.

    When you delete a folder you also delete all of its contents. This includes any content created by others users, even if you don't have permissions to directly delete them.

    >**Tip:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}){:height="18px" width="18px"} information icon.

    A message prompts you to confirm the deletion.

2. Click **Delete**.

The content is moved to your trashcan. From there you can recover it or delete it permanently.

>**Note:** If the file has been [declared as a record]({% link governance-services/3.2/using/easy-access-records.md %}#declaring-a-file-as-a-record) then the record is still available in the [Records Management site]({% link governance-services/3.2/using/overview.md %}).

### Recovering deleted content

If you need to recover content that you've deleted, then it's easy to get it back from your trashcan.

1. Open the user menu on the toolbar and click **My Profile** then the **Trashcan** tab.

    >**Tip:** All content that you've deleted is listed here. You can enter a content name in the search field and click **Search** to look for specific content.

2. Click **Recover** next to an item to recover it.

The selected content is restored to the location that you deleted it from. You can also recover multiple items by selecting them and clicking **Selected Items** then **Recover**.

### Emptying your trashcan

When you delete content, it is moved to your trashcan. By emptying your trashcan you can permanently remove content.

>**Important:** After you empty your trashcan or delete content from it, the content is permanently gone; you can't get it back again.

1. Open the user menu on the toolbar and click **My Profile** then the **Trashcan** tab.

    >**Tip:** All content that you've deleted is listed here. You can enter a content name in the search field and click **Search** to look for specific content.

2. Click **Empty** then **OK**.

    By default only 1000 items are deleted at a time.

The content is permanently deleted. You can also permanently delete specific items by clicking **Delete** next to them, or delete multiple items by selecting them and clicking **Selected Items** then **Delete**.

## Social features for content

In Alfresco you can use social features to like, favorite, and comment on files and folders.

These social features are available in the file preview screen, in the Site Content dashlet, and in several of the Document Library views. You can select to view just favorite files in several of your user and site dashlets.

* Click ![Like icon]({% link content-services/images/like-icon.png %}) to like an file/folder. You can click it again to unlike it.
* Click ![Favorite icon]({% link content-services/images/favorite-icon.png %}) to favorite an file/folder. You can click it again to unfavorite it.
* Click ![Comment icon]({% link content-services/images/comment-icon.png %}) **Comment** to comment on an file/folder. When you've entered your comment click **Add**.

> **Note:** You can't add comments if your permission level on the site is set to Consumer. Speak to your Alfresco administrator if you need to change your permission level.

### Managing your comments

Adding comments to content is a convenient way of giving feedback. You can edit and delete any comments that you added.

You can't add comments if your permission level on the site is set to Consumer. Speak to your Alfresco administrator if you need to change your permission level.

Only site managers can edit and delete another user's comments.

#### Adding a comment

You can add comments to folders and individual files to give other users information or notes.

You can comment on both files and folders. This feature is available in a file preview screen, in the Site Content dashlet, and in several of the Document Library views.

> **Note:** You can't add comments if your permission level on the site is set to Consumer. Speak to your administrator if you need to change your permission level.

1. Find the content (file or folder) you want to comment on.

2. Click **Comment**.

    The comment box on the file preview screen opens.

3. Enter your comment.

    The text box includes features to format the text; insert bulleted and numbered lists; change the font color; and help with editing.

4. Click **Add Comment**.

    Your comment appears at the top of the list. You have the option to edit comments you've made, and site managers can edit any comments.

#### Editing a comment

You can edit a comment to change what it says.

1. Find the content (file or folder) that you commented on and click on it to open it in the file preview screen.

2. Click the ![Edit Comment icon]({% link content-services/images/ico-configure.png %}) edit comment icon for the comment you want to edit.

    This icon is available only to the user who created the comment and site managers. The comment list displays the last ten comments added.

3. Edit the comment.

4. Click **Save**.

    The user name and profile picture beside the comment indicate who added it. These details are not replaced with your own if you are editing another user's comment.

#### Deleting a comment

You can delete a comment that you created, and site managers can delete any comment.

1. Find the content (file or folder) that you commented on and click on it to open it in the file preview screen.

2. Click the ![Delete icon]({% link content-services/images/ico-delete.png %}) Delete Comment icon for the comment you want to delete.

    This icon is available only to the user who created the comment and site managers. The comment list displays the last ten comments added.

    A message prompts you to confirm the deletion of the selected comment.

3. Click **Delete**.
