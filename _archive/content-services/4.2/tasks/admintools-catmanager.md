---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Managing categories

Use the Category Manager to add, edit, and delete content categories.

1.  Click **Admin Tools**, and then click **Category Manager**.

    The Category Manager page shows a tree structure of the categories created in the system. The top level is called **Category Root** and by default, the following sub-categories are listed:

    -   **Languages**
    -   **Regions**
    -   **Software Document Classification**
    -   **Tags**
    You can categorize files using parent categories and their child categories.

2.  Click the category icons \(![](../images/category-icon.jpg)\) to expand the list of categories.

    When you hover over the category name, you see the available action icons for: **Edit category** \(![Edit](../images/ico-configure.png)\), **Add category** \(![Add](../images/ico-admin-add.png)\), and **Delete category** \(![Delete](../images/ico-delete.png)\).

3.  To edit a category, click the **Edit Category** icon, edit the category name inline, and then click **Save**.

4.  To add a category, click the **Add Category** icon, enter a name in the **Category name** field, and then click **OK**.

    When using Solr, there maybe a delay before the new category appears in a search query until after Solr has been reindexed. Categories are eventually consistent. Categories are available for use across all sites and by all users.

5.  To delete a category, click the **Delete Category** icon, and then click **Delete** to confirm that you wish to delete the category.

    The category is deleted from the system. Any content is removed from that category label.


See [Tagging and categorizing content](site-content-tag.md) for more about using categories.

**Parent topic:**[Using the Alfresco Admin Tools](../concepts/admintools.md)

