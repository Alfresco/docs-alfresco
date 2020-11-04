---
title: Organizing content
---

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

    **Important:** To move several files or folders at once, or to move content to another site library, use the **Move to** action.

    To upload a new version of an existing file you need to use the **Upload New Version** option. If you drag and drop a file that has the same name as a file already in the drop location, it'll be added as a new file with "-1" appended to the file name.

### Moving content

You can move content to relocate it to another location within the current library or to a library in a different site.

1. Hover over a file/folder in the library and click **More** then **Move to**.

    When you move a folder, all of its content moves with it.

2. Hover over a file/folder and click **More** then **Move to**.

    When you move a folder, all of its content moves with it.

    > **Note:** In some views you'll need to click the ![Information icon](../../../]({% link content-services/images/ico-information.png %}) information icon.

3. Choose the site and folder where you want to place the content.

    > **Note:** You can only move content to sites that you have permission to access.

4. Click **Move**.

You can move multiple files/folders at once by selecting them and using the **Move to** option on the **Selected Items** menu.

### Copying content

You can copy content between locations, within a site or across different sites.

1. Find the file or folder you want to copy.

    When you copy a folder, you also copy its contents.

2. Hover over a file/folder and click **Copy to**.

    > **Note:** In some views you'll need to click the ![Information icon](../../../]({% link content-services/images/ico-information.png %}) information icon.

    > **Note:** You're copying only the current version. The version history and comments are not carried over with the content.

3. Choose the site and folder where you want to place a copy of the content.

    > **Note:** You can only copy content to sites that you have permission to access.

4. Click **Copy**.

    A copy of the content is created. This is considered a new file so appears as version 1.0, with you as the creator.

You can move multiple items at once by selecting them and using the **Move to** option on the **Selected Items** menu.

### Creating links to content

You can create links to content between Alfresco locations, within a site or across different sites. This is similar to copying content, but instead of creating a new copy, you create a link to the existing file.

1. Find the file or folder you want to create a link to.

2. Hover over a file/folder and click **Copy to**.

    > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Choose the site and folder where you want to create a link to the content.

    > **Note:** You can only create links in sites that you have permission to access.

4. Click **Create Link**.

    A link to the content is created. Links to other content have "Link to" added to their name and are represented by the ![Linked file]({% link content-services/images/ico-copied-file.png %}) and ![Linked Folder]({% link content-services/images/ico-copied-folder.png %}) icons.

When you click on a linked file or folder, or select **Locate Linked Item**, the original file or folder will be shown in its original site.

> **Note:** You can hover over a link and select **Delete Link** to remove it

CAUTION:

If you're using something other than Alfresco Share to acces

### Unzipping content

You can unzip .zip and .acp files to add their contents to a folder in Alfresco Share.

This means that you don't need to download a zip file to see its contents. You can quickly upload multiple files at the same time in a zip file, and then unzip them to your preferred location.

1. Click on a zip or acp file to open the file preview.

2. Click **Unzip to**.

3. Choose the site and folder where you want to unzip the files to.

    > **Note:** You can only unzip files to sites that you have permission to access.

4. Click **Unzip**.

    The files are unzipped and you can access them in the folder you chose to put them in. The zip file is still available in its original location.

    > **Note:** If you have a zip that contains several thousand files, it might take more than 10 seconds to complete. If this is the case, you might see a message saying that the unzip operation could not be completed. This message is issued because Share has not had confirmation that the unzip operation has completed within 10 seconds. Check the folder where you wanted to unzip the files, to see if the unzip operation completed successfully.

    > **Note:** Alfresco administrators can also use the [Bulk Import tool](../concepts/Bulk-Import-Tool.md) to import multiple files.

### Renaming content

You can quickly rename files and folders.

1. Find the file/folder you want to rename.

2. Hover your cursor over the content name to display the ![Configure icon]({% link content-services/images/ico-configure.png %}) edit icon.

    > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Click this icon to enter editing mode.

4. Change the name and click **Save** (or press ENTER).

    > **Note:** Don't change or delete the filename extension.

    The updated name is shown in the file list.

    > **Note:** You can also rename a file or folder by editing its properties.

### Tagging and categorizing content

You can tag and categorize similar or related content making it easy to find the content again.

Clicking on a category or tag in the explorer panel displays all content associated with that tag or category.

Tags are unstructured and useful for searches, whereas categories actually help you to structure the organization of your content.

Tags and categories are a form of social indexing, and when a tag and category is created it's then available across all your sites and can be reused by all users.

**Tags**

Anyone can create tags and then tag content with them. You can tag:

* Files and folders
* Wiki pages
* Blog posts
* Discussion topics
* Calendar events
* Site links

Tagging can be done when you create content, or you can edit existing content to add or remove tags. You can create your own tags or select from a list of tags already used in the current site.

In the **Document Library** you can manage tags in the item list or by editing the content properties. In all the other site features such as wiki pages and blogs you manage tags in the Tags section when creating or editing content, as follows:

    * **Add a new tag**

    Type a tag in the field provided and then click **Add**. To create several tags at once, separate each tag with a space. To add a multi-word tag, place it in quotation marks (for example, "draft material").

    * **Add an existing tag**

    Click **Choose from popular tags in this site** to display the tags already used in the current site, then click the tag you want to use.

    * **Remove a tag**

    In the list of associated tags, click ![Delete button]({% link content-services/images/ico-delete.png %}) to remove an existing tag.

> **Note:** Data lists don't support tagging.

You can also search for content using tags as the search term.

**Categories**

Unlike tags, which are not in a hierarchy and can be created by anyone, categories must be managed by an administrator.

An example of categories, would be to have Regions as a top level category, then sub-categories of Africa, Asia, Europe, Latin America, North America, and Oceania, then further sub-categories of each of their countries.

Categories can only be associated with library items and folders. Content needs to be enabled for categorizing before you can add it to a category, see [Managing Aspects](library-item-manage-aspects.md).

#### Tagging content

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

#### Categorizing content

You can categorize files and folders to group similar content into pre-defined categories.

1. Hover over the content you want to categorize.

    > **Note:** You can only categorize content that has the **No Categories** label or displays existing categories. See [Managing Aspects](library-item-manage-aspects.md) for more details on enabling content to be categorizable with the classifiable aspect.

2. Click **Edit Properties**.

3. Click the Categories **Select** option.

    The available categories are displayed. You can click on a category to display any sub-categories. Categories are available for use across all sites and by all users.

4. Click **+** next to each category you want to add. You can categorize files using parent categories and their sub-categories.

5. Click **OK** the click **Save**.

When you click on a category, either next to content in the document library or in the explorer panel, all content in that category is displayed in the document library.
When you click on a tag, either next to content in the document library or in the explorer panel, all content with that tag is displayed in the Document Library.

You can also search for content using tags as the search term.
