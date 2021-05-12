---
title: Share Admin Tools
---

Share Admin Tools help you to manage your administration operations.

Administrators can use the Share Admin Tools to create and manage users and groups directly in Share, set application preferences, manage categories and tags, and browse the system information in the node browser.

> **Note:** You can find additional admin tools in the [Repository Administration Console]({% link content-services/5.2/admin/admin-console.md %}).

Admin Tools is visible on the toolbar if you are an Administrator or a user who is a member of the `ALFRESCO_ADMINISTRATORS` or `ALFRESCO_MODEL_ADMINISTRATORS` groups. If you are a member of `SITES_ADMINISTRATORS`, you'll have an additional Sites Manager option on the toolbar instead of Admin Tools.

## Overview

You can see the **Admin Tools** option on the menu bar if you are an administrator user or a user who is a member of the `ALFRESCO_ADMINISTRATORS` group. Use the links to see more information about each tool.

1.  Click **Admin Tools**.

    The tools are listed on the left-side of the page. The first set of tools are for general Alfresco Content Services administration:

    -   **Application**: [Managing Alfresco Share features](#managing-alfresco-share-features)
    -   **Category Manager**: [Managing categories](#managing-categories)
    -   **Module Browser**: [Viewing module packages]({% link content-services/5.2/install/index.md %}#viewing-module-packages)
    -   **Node Browser**: [Using the Node Browser in Share Admin Tools]({% link content-services/5.2/admin/troubleshoot.md %}#using-the-node-browser-in-share-admin-tools)
    -   **Tag Manager**: [Tag Manager](#tag-manager)
    -   **Model Manager**: [Content modeling with Model Manager]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager)
    -   **Sites Manager**: [Sites Manager](#sites-manager)
    The remaining tools are grouped into the following categories:

    -   **Repository**
        -   **Replication Jobs**: [Managing replication jobs]({% link content-services/5.2/admin/replication.md %}#managing-replication-jobs)
    -   **Users and Groups**
        -   **Groups**: [Managing groups]({% link content-services/5.2/admin/users-groups.md %}#managing-groups)
        -   **Users**: [Managing users]({% link content-services/5.2/admin/users-groups.md %}#managing-users)
2.  Select an Admin Tool from the left side to see the page for each tool.


## Managing Alfresco Share features {#managing-alfresco-share-features}

Use the Admin Tools to manages features of Alfresco Share such as look and feel, tagging, categories, and sites.

-   **[Changing the Alfresco Share theme](#changing-the-alfresco-share-theme)**  
The look and feel of the user interface is set by a theme. The Application tool lets you select a color scheme for the user interface.
-   **[Changing the Alfresco Share logo](#changing-the-alfresco-share-logo)**  
You can change the Alfresco logo to another image file.
-   **[Using templates]({% link content-services/5.2/admin/templates.md %})**  
With templated nodes and space templates you can store content and folder templates in repositories that users can then use to create content.
-   **[Tag manager](#tag-manager)**  
Tags can be added to content within the Document Library. Use the Tag Manager page to view, edit, and delete all the tags that have been created by users.
-   **[Category Manager](#category-manager)**  
Use the Category Manager to add, edit, and delete content categories.
-   **[Sites Manager](#sites-manager)**  
The Sites Manager is used for maintaining sites. You have control over the visibility of all sites as well as deleting sites or making yourself a site manager.

### Changing the Alfresco Share theme {#changing-the-alfresco-share-theme}

The look and feel of the user interface is set by a theme. The Application tool lets you select a color scheme for the user interface.

1.  Click **Admin Tools**, and then click Application.

2.  On the Options page, select a theme from the list.

    Choose one of the available themes:

    -   **Green Theme**
    -   **Blue Theme**
    -   **Light Theme**
    -   **Yellow Theme**
    -   **Google Docs Theme**
    -   **High Contrast Theme**
3.  Click **Apply**.

    The new theme applies the CSS and image assets across all pages.


The page refreshes to display with the selected theme. The changed theme affects all users from the next time they sign in and persists across sessions.

A new installation uses the default theme.

> **Note:** Site managers can customize the theme for an individual site. If a site theme has been changed, this will override any theme setting made in the **Admin Tools**.

### Changing the Alfresco Share logo {#changing-the-alfresco-share-logo}

You can change the Alfresco logo to another image file.

1.  Click **Admin Tools**, and then click **Application**.

2.  On the Options page, click **Upload**.

    You'll see the Upload File window.

3.  Click **Select files to upload**.

4.  Choose a file and click **Open**.

    You can choose to upload any image you like but there are some recommendations for suitable sizes for the image. The maximum recommended image height for your image file is 48 pixels.

    The file you chose shows in the Upload File window. If it's not the right file, click **Remove** to select another file.

5.  Click **Upload File(s)**.

6.  When you see that the file is successfully uploaded, click **OK**.

7.  Click **Apply**.

    The newly uploaded file now becomes the logo.

8.  If you wish to change the logo back to the default logo, click **Reset** to display the original logo, and then click **Apply**.

## Tag Manager

Tags can be added to content within the Document Library. Use the Tag Manager page to view, edit, and delete all the tags that have been created by users.

1.  Click **Admin Tools**, and then click **Tag Manager**.

    The Tag Manager page shows a list of the tags that have been created, the name of the user who created or modified the tag, and the date on which the change was made.

    If there are no tags in the system, you see the message: **No tags found**.

    When you hover over the right hand **Actions** column, you see the available action icons for: **Edit tag** (![Edit]({% link content-services/images/ico-configure.png %})) and **Delete tag** (![Delete]({% link content-services/images/ico-delete.png %})).

    1.  To edit a tag, click the **Edit tag** icon, edit the tag name in the **Rename Tag** field, and then click **OK**.

    2.  To delete a tag, click the **Delete tag** icon, and then click **Delete** to confirm that you wish to delete the tag.

        The tag is deleted from the system and removed from any content where it was previously tagged.

2.  Click the tag name to see a list of the repository content that uses this tag.

3.  Click the user name to see the profile of the user who last modified the tag.


See [Tagging and categorizing content]({% link content-services/5.2/using/content/manage.md %}#tagging-and-categorizing-content) for more about using tags.

## Category Manager

Use the Category Manager to add, edit, and delete content categories.

1.  Click **Admin Tools**, and then click **Category Manager**.

    The Category Manager page shows a tree structure of the categories created in the system. The top level is called **Category Root** and by default, the following sub-categories are listed:

    -   **Languages**
    -   **Regions**
    -   **Software Document Classification**
    -   **Tags**
    You can categorize files using parent categories and their child categories.

2.  Click the category icons (![Category]({% link content-services/images/category-icon.jpg %})) to expand the list of categories.

    When you hover over the category name, you see the available action icons for: **Edit category** (![Edit]({% link content-services/images/ico-configure.png %})), **Add category** (![Add]({% link content-services/images/ico-admin-add.png %})), and **Delete category** (![Delete]({% link content-services/images/ico-delete.png %})).

3.  To edit a category, click the **Edit Category** icon, edit the category name inline, and then click **Save**.

4.  To add a category, click the **Add Category** icon, enter a name in the **Category name** field, and then click **OK**.

    When using Solr, there maybe a delay before the new category appears in a search query until after Solr has been reindexed. Categories are eventually consistent. Categories are available for use across all sites and by all users.

5.  To delete a category, click the **Delete Category** icon, and then click **Delete** to confirm that you wish to delete the category.

    The category is deleted from the system. Any content is removed from that category label.


See [Tagging and categorizing content]({% link content-services/5.2/using/content/manage.md %}#tagging-and-categorizing-content) for more about using categories.

## Sites Manager

The Sites Manager is used for maintaining sites. You have control over the visibility of all sites as well as deleting sites or making yourself a site manager.

> **Note:** Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups. If you are in the `ALFRESCO_ADMINISTRATORS` group, you can access the Site Manager through the **Admin Tools** on the toolbar. If you are a member of `SITE_ADMINISTRATORS` group, you'll have an additional **Sites Manager** option on the toolbar.

The Sites Manager displays the names and status of created sites, regardless of their visibility setting. You can use the **Visibility** menu to change the visibility of any site, for example, change the site visibility to either **Public**, **Moderated**, or **Private**. Any visibility change you make to a site is made immediately.

With the **Actions** menu, there are two options:

-   **Delete Site**
-   **Become Site Manager**

You can delete any of the sites in the Site Manager list by selecting **Delete Site** from the **Actions** menu. This action deletes all site details and content.

The I'm a Site Manager column shows the sites where you have the Site Manager permission. If you aren't already a manager of a site, then select **Become Site Manager** from the **Actions** menu.

  
