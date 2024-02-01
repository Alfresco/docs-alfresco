---
title: Manage the properties for content
---

The following sections describe how to manage properties for your content on Windows and Mac.

{% capture windows %}

You can view, edit, and update file and folder properties (i.e. metadata) from the Windows Explorer menu actions.

By default, you can view and edit general properties, such as Title, Name, Description, and Author (if you have the correct permissions).

1. In your **Alfresco** synced folder, find the file or folder that you want to update.

2. Right-click the item and select **Properties**.

    A window appears displaying a number of properties. For example:

    ![]({% link desktop-sync/images/ds-properties-view-win-1.17.png %}){:height="491px" width="673px"}

    By default, the properties are read-only.

3. Click **Edit** to start editing the content.

    Note that the **Edit** button changes to **Save** (if you have edit permissions on the selected content).

4. In the **General properties** tab, you may see a **Custom Type** field. When custom types have been defined in the Desktop Sync configuration file by your IT team, you'll see them listed in this field.

    * To change the content type, select one from the available options, and then click **Apply**.

        Once you apply the change, a new tab appears with the name of the selected custom type.

    * Click **Edit** to start editing the content.

        > **Note:** If a custom type has already been applied to a synced file that's synced from the repository, and it has no sub-types (i.e. children), then you won't be able to change the type.

5. Click **Save** to update the content.

    New changes are shown in the properties panel for Share or Digital Workspace.

    >**Note:**
    >
    >* The **Edit** button is not available in the following cases:
    >    * If a file is declared as a record. See [Governance Services]({% link desktop-sync/latest/using/ags.md %}) for more.
    >    * If your role is set to Consumer or Collaborator on files. See [Permissions]({% link desktop-sync/latest/using/permissions.md %}) for more.
    >* There are validation checks for all fields.
    >    * For example, if a property is incorrectly left blank when you click **Save**, a red background appears indicating that there's a problem. Correct the content to fix the problem.

### Bulk editing of properties

You can also edit properties (i.e. metadata) in multiple files simultaneously. The steps are similar to what's described earlier.

1. Select multiple files, right-click and select **Properties**.
   * This shows the common properties between all of the selected files.
2. You can now view and edit those common properties.

   For example, if you edit the `Title` field, that title will be updated in all of the selected files.

{% endcapture %}

{% capture mac %}

You can view, edit, and update file and folder properties from the Mac Finder menu actions.

By default, you can view and edit general properties, such as Title, Name, Description, and Author (if you have the correct permissions). If enabled by your IT team, you may be able to view and edit additional properties.

1. In your **Alfresco** synced folder, find the file or folder that you want to update.

2. Right-click the item and select **Properties**.

    A window appears displaying a number of properties. For example:

    ![]({% link desktop-sync/images/ds-properties-view-mac2-1.17.png %}){:height="378px" width="690px"}

    By default, the properties are read-only.

3. Click **Edit** to start editing the content.

    Note that the **Edit** button changes to **Save** (if you have edit permissions on the selected content).

4. In the **General properties** tab, you may see a **Custom Type** field. When custom types have been defined in the Desktop Sync configuration file by your IT team, you'll see them listed in this field.

    1. To change the content type, select one from the available options, and then click **Apply**.

        Once you apply the change, a new tab appears with the name of the selected custom type.

    2. Click **Edit** to start editing the content.

        > **Note:** If a custom type has already been applied to a synced file that's synced from the repository, and it has no sub-types (i.e. children), then you won't be able to change the type.

5. Click **Save** to update the content.

    New changes are shown in the properties panel for Share or Digital Workspace.

    >**Note:**
    >
    >* The **Edit** button is not available in the following cases:
    >    * If a file is declared as a record. See [Governance Services]({% link desktop-sync/latest/using/ags.md %}) for more.
    >    * If your role is set to Consumer or Collaborator on files. See [Permissions]({% link desktop-sync/latest/using/permissions.md %}) for more.
    >* There are validation checks for all fields.
    >    * For example, if a property is incorrectly left blank when you click **Save**, a red background appears indicating that there's a problem. Correct the content to fix the problem.

### Bulk editing of properties

You can also edit properties in multiple files simultaneously. The steps are similar to what's described earlier.

1. Select multiple files, right-click and select **Properties**.
   * This shows the common properties between all of the selected files.
2. You can now view and edit those common properties.

   For example, if you edit the `Title` field, that title will be updated in all of the selected files.

{% endcapture %}

{% include tabs.html tableid="metadata" opt1="Windows" content1=windows opt2="Mac" content2=mac %}
