---
title: Working with content
---

Before you begin working with content, we'll look at the two different concepts of content there are in Alfresco Share.

The first is content that is actually part of Alfresco Share features themselves, such as updates to a wiki, a new blog posts, or forum discussions.

The second is content items such as documents, spreadsheets, or images that are stored in the Document Library. These can be uploaded or created directly from Alfresco Share.

So now that you know the differences in content types, it's time to start adding content to your site.

-   **[Adding content]({% link content-services/5.2/using/content/manage.md %}#adding-content)**  
First you'll look at adding content items such as documents, spreadsheets, presentations, and images to a site.
-   **[Editing content]({% link content-services/5.2/using/content/files-folders.md %}#editing-content)**  
Updating your content in Alfresco Share is easy to do and you can even select whether to edit in Microsoft Office, offline, or in Google Docs.
-   **[Creating content]({% link content-services/5.2/using/content/manage.md %}#creating-content)**  
As well as uploading content, you can also create content right in Alfresco Share.

## Content

A site document library is where you store and manage content, such as documents, images, and videos.

You can upload content to share and work on with other site members. Users can view and work on this content, depending upon their permission settings.

Document library activities appear in the Site Content dashlet so you can see at a glance the content that's been added and updated.

You can also store content in the My Files and Shared Files areas and in the Repository, see [Working with content outside the library](#working-with-files-outside-the-library) for more.

-   **[The Document Library](#the-document-library)**  
Access the site Document Library to view and work with the content in the current site.
-   **[Adding content]({% link content-services/5.2/using/content/manage.md %}#adding-content)**  
You build up site content by creating an organized folder structure then adding content to it.
-   **[Viewing content]({% link content-services/5.2/using/content/manage.md %}#viewing-content)**  
To get a closer look at a file or folder without downloading it, you can view it on the file preview screen. This gives you more detail, a preview, and access to social features, actions, and version history.
-   **[Working with files and folders]({% link content-services/5.2/using/content/files-folders.md %}#working-with-files-and-folders)**  
Once files are added to a site, site members can access and work with them. In addition to adding more files, members can view, download, edit, and delete files.
-   **[Applying rules to folders]({% link content-services/5.2/using/content/rules.md %}#applying-rules-to-folders)**  
In the library you can define folder rules to manage your content automatically. You can come up with many creative solutions to make sure specific content processes are automated all without you having to do the work yourself.
-   **[Organizing content]({% link content-services/5.2/using/content/manage.md %}#organizing-content)**  
With different people creating folders and adding files, you want to keep on top of it. Alfresco Share has multiple features available to help you keep content labelled, organized, and filed correctly.
-   **[Using social features]({% link content-services/5.2/using/content/manage.md %}#using-social-features)**  
In Alfresco you can use social features to like, favorite, and comment on files and folders.
-   **[Working with files outside the library](#working-with-files-outside-the-library)**  
While the Document Library is the focal point for working with content in Alfresco Share, there are also a few other areas available to you.
-   **[Working with replicated content]({% link content-services/5.2/using/content/files-folders.md %}#working-with-replicated-content)**  
Alfresco Content Services administrators can configure Alfresco Content Services systems so that content is replicated across multiple repositories. Files and folders created as the result of a replication job display the **Transferred from another Repository** icon in the file list.

## The Document Library

Access the site Document Library to view and work with the content in the current site.

1.  In a site click **Document Library** to access the library.

    > **Note:** In each site the component names can be customized. If the site manager has done this, the link in the navigation bar might have a label other than **Document Library**.

    The item list takes up most of the library main page. You can filter the item list and navigate the library using the explorer panel on the left side of the page.

2.  By default items are shown in the **Detailed View**. Click **Options** to select a different view, see [Library Options]({% link content-services/5.2/using/content/index.md %}#library-view-options) for more details.

    > **Note:** In the **Options** menu you can also show and hide folders, switch to fullscreen view, and set up an RSS feed.

3.  Use the sort menu at the top of the list to change the criteria used to sort the items and click the ![Sort icon]({% link content-services/images/sort-icon.png %}) icon to toggle between ascending and descending sort order.

    > **Note:** The view options you select (library view, sort order, hide/show folder selection) are specific to your user account. These settings are carried over from the current site to all other sites that you view. They are saved between sessions and remain the preferred view until you change it.

4.  In the list views position your cursor over a piece of content item to display the available actions. This also displays the version number, which is set to 1.0 when a new item is uploaded to the library.

    > **Note:** If you're using a Mac then it might seem that not all of the actions are available. This is because with a Mac sometimes the scrollbars are hidden. To display the scrollbars go **System Preferences** > **General** and select to always show scroll bars.

    In the other views, click the ![Information icon]({% link content-services/images/ico-information.png %}) information button for an item to display the item details, version, actions, and social features.


-   **[Exploring the library](#exploring-the-library)**  
You can filter which items you see in the library using the explorer panel on the left side of the library. This can help you to locate specific items in the library.
-   **[Library view options](#library-view-options)**  
The **Options** menu in the **Document Library** lets you customize how you view content.

## Exploring the library

You can filter which items you see in the library using the explorer panel on the left side of the library. This can help you to locate specific items in the library.

The **Documents** list in the explorer panel provides the following views:

-   **All Documents**

    Displays all files in the library

-   **I'm Editing**

    Displays the files you currently have checked out

-   **Others are Editing**

    Displays the files checked out by other site members

-   **Recently Modified**

    Displays files modified in the past seven days

-   **Recently Added**

    Displays files added to the library in the past seven days

-   **My Favorites**

    Displays the files you have marked as favorites


The **Library** section displays the folder structure in a tree view. The symbol ![]({% link content-services/images/Subfolders.png %}) indicates a library folder contains subfolders. Click on a folder to expand or collapse it.

The **Categories** tree lets you filter the library contents by category. Click a category to expand the branch; click it again to collapse it.

The **Tags** list displays the tags currently associated with one or more files. The number following the tag tells you how many files have that tag.

>**Tip:** When you filter content using **Tags** view, items have additional **Locate File** and **Locate Folder** actions to show the actual location of content in the library tree.

The breadcrumb path above the file list displays your current position in the tree. Each breadcrumb item is a link so you can easily return to any part of the current navigation path. You can:

-   Click a link to return to the corresponding folder.
-   Click ![Navigate Up]({% link content-services/images/navigate-up-icon.png %}) to display the contents of the folder one level higher.
-   Click **Options** then **Hide Breadcrumb** / **Show Breadcrumb** to hide/show the breadcrumb path.

For each piece of content (folders and files) you view in the**Document Library** you can:

-   Click the name of an file to display the file preview screen for that files.
-   Click the name of a folder to view its contents. You can see your current location in the breadcrumb path.

All files and folders have multiple options that are displayed when you hover over them.

## Library view options

The **Options** menu in the **Document Library** lets you customize how you view content.

The default view for the library is **Detailed View**. This view displays the basic details for each file or folder as well as a thumbnail, description, tags, and social features (Favorite, Like, Comment, and Share). **Simple View** just displays the basic details..

You can use the other view options to get a more visual representation of site content, or to view content in a more basic table format.

At the bottom of the **Options** menu you can click to **Set** or **Remove** the current view as the default view for the folder you're in.

In all viewing options, just click an file name to open the file preview screen. Click a folder name to open that folder so you can view its contents.

With **Media View** and **Audio View** you'll see extra file information.

If you select one of the more visually rich views, the way you interact with content changes slightly. Here are some useful features you'll find in these views.

-   **Resize the thumbnails**

    ![Size slider]({% link content-services/images/GV-slider.png %})

    Use the resizing bar to make the thumbnails larger and smaller. This lets you choose how much detail you see in the main view so you can either quickly scan many smaller images or preview larger ones without needing to view the details page.

-   **Display the information panel**

    Click the ![Information icon]({% link content-services/images/ico-information.png %}) Information icon to display content details and available actions.

-   **Select content**

    Click the check box on an item or folder to select it. In **Gallery View** you can select multiple items, in **Filmstrip View** just one.


In the **Options** menu you can also show and hide folders or the breadcrumb trail, switch to full screen or full window view

You can even set up an **RSS Feed** for the folder, see [Subscribing to an RSS feed]({% link content-services/5.2/using/share.md %}#subscribing-to-an-rss-feed).

## Working with files outside the library

While the Document Library is the focal point for working with content in Alfresco Share, there are also a few other areas available to you.

Each of these areas can be accessed wherever you are in Share, from the links at the top of the screen.

The **My Files** and **Shared Files** areas are locations with Share, whereas the **Repository** is an overview of everything in your Alfresco Content Services system.

-   **My Files**: This is an area that only you can access. No-one else can see the files here and every user has their own, unique **My Files** area. It's great for saving draft content to, removing the need for trying to remember where you saved it on your laptop, or was it saved to your mobile...
-   **Shared Files**: This area can be accessed by everyone in your organization. It's a great way to quickly share files with other users that's not ready to be uploaded to a site yet.
-   **Repository**: The area lets you view all Alfresco Content Services content you have access to - all the sites, all the system files, everything is available here. You can work just as you would in a site Document Library but here you have a higher view of everything that's available. It's also very handy for Alfresco administrators who want to work with system files.

-   **[My Files](#my-files)**  
**My Files** is a unique area in Alfresco Share where you can create and store content, and no other users can access it.
-   **[Shared Files](#shared-files)**  
**Shared Files** is a unique area in Alfresco Share where you can create, store and share content, without adding it to a site Document Library.
-   **[Repository](#repository)**  
The **Repository** displays all the Alfresco Content Services content that you have access to, including content of all sites that you're a member of.

## My Files

**My Files** is a unique area in Alfresco Share where you can create and store content, and no other users can access it.

So rather than saving content on your laptop or tablet, you can save it in Share and still keep it private until it's ready to be shared.

You can access the **My Files** area from anywhere in Share by clicking **My Files** at the top of the screen.

The functionality available in the **My Files** area is identical to what you find in the Document Library, see [Working with content in a library]({% link content-services/5.2/using/content/index.md %}#content) for details.

## Shared Files

**Shared Files** is a unique area in Alfresco Share where you can create, store and share content, without adding it to a site Document Library.

Any content that you create or add to **Shared Files** is visible to all other users in your organization. It is in effect a shared drive, so you can quickly share content with colleagues without uploading it to a site, emailing it, or needing to find a pen drive.

You can access the **Shared Files** area from anywhere in Share by clicking **Shared Files** at the top of the screen.

The functionality available in the **Shared Files** area is identical to what you find in the Document Library, see [Working with content in a library]({% link content-services/5.2/using/content/index.md %}#content) for details.

## Repository

The **Repository** displays all the Alfresco Content Services content that you have access to, including content of all sites that you're a member of.

> **Note:** If the **Repository** isn't available on the toolbar, contact your system administrator.

The **Repository** includes all of the usual document library functionality with the exception of the **Edit Offline** action and the ability to create Google Docs content.

Just as in a document library, the explorer panel includes navigation and filtering options. This lets you filter the repository contents by category or tag, or you can browse the repository file structure. You can also choose to view the content items currently checked out to you (**I'm Editing** view) or those that you've specifically flagged as favorites (**My Favorites** view).

The functionality available within the Repository library is identical to what you find in a site library. See [Working with content in a library]({% link content-services/5.2/using/content/index.md %}#content) for details on performing specific actions within the **Repository**.
