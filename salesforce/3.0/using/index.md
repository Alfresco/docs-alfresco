---
title: Using Salesforce Connector
---

With the Salesforce Connector you can upload, create, and delete files, and link Alfresco content with Salesforce records. You can also browse and search Alfresco directly from within Salesforce.

There are two methods you can use to work with your Alfresco content in Salesforce. If your Salesforce administrator has added the Alfresco app to your Salesforce settings, you can use Alfresco:

1. Directly in a Salesforce record (if the Alfresco app has been added to the record layout)
2. By using the **Alfresco Repository** tab on the Salesforce toolbar. Use this method if you need to associate or link files with Salesforce records.

Salesforce administrators can use this information to install and configure the Salesforce Connector: [Installing and configuring the Salesforce Connector]({% link salesforce/3.0/install/index.md %}).

## Working with Alfresco content in a Salesforce record

You can work with your Alfresco files directly from a Salesforce record.

The Alfresco app can be added to any record type that supports layouts (for example; Accounts, Cases, and Opportunities), if it's been added by your Salesforce administrator. You'll see a section containing Alfresco content if the app has been added to the record type. The name of this section depends on what your Salesforce administrator has called it. In this task, we'll call it the Alfresco section.

1. In Salesforce, click the record that you want to work with. For example, this might be a specific account from the **Accounts** tab in Salesforce.
2. In the **Alfresco** section, enter your Alfresco login details. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco]({% link content-services/latest/using/share.md %}) for more information.
3. In the **Alfresco** section you can:

    * **Search** for content using the search box.
    * **Create** a new folder or text document in Alfresco.
        Click the name of a folder and it opens in the current Salesforce view. Click a file and it opens a new Alfresco window showing the full details of that file. As you are already logged in to Alfresco, you don't need to enter your Alfresco login details again.
    * Click **Upload** to navigate to content on your device and upload it.
    * **Add** one or more files by dragging and dropping directly into the window. A new window tells you whether each file or folder has been added successfully.

    There's also a breadcrumb trail of folders to help you navigate.

    File actions include **Download**, **View in Browser**, and **Remove Association** if a file or folder has been linked with the record. See [Linking Alfresco content with a Salesforce record](#linkingrecord) for more information about linking content with records.

    >**Note:** You can also delete content that you have created or have permission to delete.

    >**Note:** While you are editing a file, associated files are not visible. After you have checked the file in, any file associations are then shown.

    ![View of Alfresco in a record]({% link salesforce/images/salesforce-record-files.png %})

## Using the Alfresco Repository tab in Salesforce

You can use the **Alfresco Repository** tab to link a file or folder with a record, to add files or folders to Alfresco, and to find content.

1. In Salesforce, click **Alfresco Content Connector**. This is available from the **Force.com** App Menu.

2. Click the **Alfresco Repository** tab.

    Log in to Alfresco. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco]({% link content-services/latest/using/share.md %}) for more information.

    An Alfresco view is displayed, with tabs for **Personal Files**, **Repository**, **Sites**, and **Search**.

    ![salesforce-repo-completed]({% link salesforce/images/salesforce-repo-completed.png %})

3. On each tab you can:

    * **Search** for content using the search box.
    * **Create** a new folder or text document in Alfresco.

        Click the name of a folder and it opens in the current Salesforce view. Click a file and it opens a new Alfresco window showing the full details of that file. As you are already logged in to Alfresco, you don't need to enter your Alfresco login details again.

    * Click **Upload** to navigate to content on your device and upload it.
    * **Add** one or more files by dragging and dropping directly into the window. A new window tells you whether each file or folder has been added successfully.

    There's also a breadcrumb trail of folders to help you navigate.

4. On each file or folder you can use the same actions that are available in Alfresco. For example, folder actions include **Download as Zip** and **Delete Folder**.

    There is an additional action, **Associate with Salesforce Record**. This allows you to link a file with a specific record in Salesforce. You can select from a list of recently viewed records. See [Linking Alfresco content with a Salesforce record](#linkingrecord) for more information.

5. **Personal Files** tab: You can add files here that are stored in Alfresco, but are not shared with other users. Any files and folders that you add here are shown in the **Library > Personal Files** folder.

6. **Repository** tab: This is a view of the full Alfresco repository, and is most useful for system administrators. This is the same structure that you see if you click **Repository** from the toolbar in Alfresco.

7. **Sites** tab: This is a list of your Alfresco sites, and the place that most users look for their content. You need to be a member (or creator) of a site for it to be displayed here. If you click a site, it opens the contents into a new tab that has the same name as your site.

    For example, if I am a member of a site called **Salesforce default**, a new tab called **Salesforce default** is displayed where I can see folders and files:

    ![salesforce-sites]({% link salesforce/images/salesforce-sites.png %})

8. **Search** tab: Search in the repository or sites in Alfresco. The search uses the Alfresco faceted search and filtering. The usual Alfresco actions are available for any files or folders that are returned in the search results.

## Linking Alfresco content with a Salesforce record {#linkingrecord}

Use the **Alfresco Repository** tab and **Associate with Salesforce Record** option to associate or link a file with a record in Salesforce.

When you are working with a Salesforce record, there might be marketing, customer-related or other files that you want to store alongside the record. Use this option to link your Alfresco files with your records. When you link a file, the record ID is stored in the parent folder.

1. In Salesforce, click **Alfresco Content Connector**. This is available from the **Force.com** App Menu.

2. Click the **Alfresco Repository** tab.

3. Enter your Alfresco login details. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco]({% link content-services/latest/using/share.md %}) for more information.

    An Alfresco view is displayed, with tabs for **Personal Files**, **Repository**, **Sites**, and **Search**.

4. Find the file or folder you require by searching or navigating. Right-click the file, select the record that you want to link from **Most recently used records** and click **+** and **OK** to link the record with the Alfresco content.

    On every file that you see in the **Alfresco** section, you have the option to **Associate with Salesforce Record**. This allows you to link content with a specific record in Salesforce. When you use this action, you can select from a list of recently viewed records to associate with:

    ![salesforce-associate]({% link salesforce/images/salesforce-associate.png %})

    To better identify the record that you require, you can hover over a recently used record to see the Record ID, Record Type and Site that relate to that record.

    ![salesforce-link]({% link salesforce/images/salesforce-link.png %}){:height="18px" width="18px"} denotes that the file is now linked with a record. Also, in the **Alfresco** section of the Salesforce record itself, you'll see the same file is displayed as a linked file.

5. Go to the Salesforce record that you used to link to your Alfresco content.

    In the Alfresco section of the record, you'll see the file is displayed as a linked file.

    ![salesforce-record-files]({% link salesforce/images/salesforce-record-files.png %})

6. Click the folder to open it in Alfresco.
