---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [logo, Application]
---

# Managing categories

Manage your categories on the Category Manager page.

1.  Open the Admin Console, and then click **Category Manager**.

    The Category Manager page shows a tree structure of the categories created in the system. The top level is called **Category Root** and by default, the following sub-categories are listed:

    -   **Languages**
    -   **Regions**
    -   **Software Document Classification**
    -   **Tags**
2.  Click the category icons \(![](../images/category-icon.jpg)\) to expand the list of categories.

    When you hover over the category name, you see the available action icons for: **Edit category** \(![](../images/adminconsole-category-edit.jpg)\), **Add category** \(![](../images/adminconsole-category-add.jpg)\), and **Delete category** \(![](../images/adminconsole-category-delete.jpg)\).

3.  To edit a category, click the **Edit Category** icon, edit the category name inline, and then click **Save**.

4.  To add a category, click the **Add Category** icon, enter a name in the **Category name** field, and then click **OK**.

    When using Solr, there maybe a delay before the new category appears in a search query until after Solr has been reindexed. Categories are eventually consistent.

5.  To delete a category, click the **Delete Category** icon, and then click **Delete** to confirm that you wish to delete the category.

    The category is deleted from the system. Any content is removed from that category label.


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

