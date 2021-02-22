---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Building the File Plan

The File Plan is built up by adding levels made up of categories and folders.

Only a few users have the capability to add folders and categories, and this is tightly controlled to make sure that your system remains compliant. Capabilities are assigned to user roles in the Records Management Console. You might be assigned the capability to create folders but not categories, or just have the capability to add records.

**Note:** Capabilities given to a role are not the same as permissions. Capabilities define what you can do in the Records Management site, whereas permissions are specific to sections of the File Plan. Permissions are applied at category and folder level using the **Manage Permissions** option, and you use these to decide which users can see specific sections of the File Plan, and if they can read and file in that section. See [Managing permissions](rm-manage-permissions.md) for further details.

When you create a container \(category or folder\) the system records the date of creation and the user who created it. This information is recorded in the object's metadata. Metadata can be thought of as a set of properties, and are where all key information about an item, folder, or category is stored. Record categories carry the most metadata as they hold the disposition instructions for the whole category.

The following rules are enforced when working with the File Plan structure:

-   The top level of the File Plan can only contain record categories.
-   A category can contain other categories and folders.
-   A folder can contain only records.

-   **[Loading test data](../tasks/rm-load-testdata.md)**  
You can load Records Management test data which creates a sample File Plan that you can use to get started.
-   **[Adding a record category](../tasks/rm-recordcategory-add.md)**  
You can create a record category at the top level in the File Plan or within another record category.
-   **[Adding a record folder](../tasks/rm-recordfolder-add.md)**  
You can add record folders within a record category.

**Parent topic:**[Using Records Management](../concepts/rm-intro.md)

