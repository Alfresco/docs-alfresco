---
author: Alfresco Documentation
audience: [, ]
category: 
option: 
---

# Working with Alfresco content in a Salesforce record

You can work with your Alfresco files directly from a Salesforce record.

The Alfresco app can be added to any record type that supports layouts \(for example; Accounts, Cases, and Opportunities\), if it's been added by your Salesforce administrator. You'll see a section containing Alfresco content if the app has been added to the record type. The name of this section depends on what your Salesforce administrator has called it. In this task, we'll call it the Alfresco section.

1.  In Salesforce, click the record that you want to work with. For example, this might be a specific account from the Accounts tab in Salesforce.
2.  In the Alfresco section, enter your Alfresco login details. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco](http://docs.alfresco.com/5.1/tasks/gs-login.html) for more information.
3.  In the Alfresco section you can:

    -   Search for content using the search box.
    -   Create a new folder or text document in Alfresco.

        Click the name of a folder and it opens in the current Salesforce view. Click a file and it opens a new Alfresco window showing the full details of that file. As you are already logged in to Alfresco, you don't need to enter your Alfresco login details again.

    -   Click Upload to navigate to content on your device and upload it.
    -   Add one or more files by dragging and dropping directly into the window. A new window tells you whether each file or folder has been added successfully.
    There's also a breadcrumb trail of folders to help you navigate.

    File actions include Download, View in Browser, and Remove Association if a file or folder has been linked with the record. See [Linking Alfresco content with a Salesforce record](../tasks/salesforce-associate-with-record.md) for more information about linking content with records.

    **Note:** You can also delete content that you have created or have permission to delete.

    **Note:** While you are editing a file, associated files are not visible. After you have checked the file in, any file associations are then shown.

    ![View of Alfresco in a record](../images/salesforce-record-files.png)


The content that you see is stored in a site that has been specified by your system administrator and in that site is a folder for the Salesforce object type. For example, if the Salesforce object is Account, your system administrator might have created a folder called Account to hold this content. See [5. Alfresco Setup tab: Adding an Alfresco site and mapping metadata in Salesforce](../tasks/salesforce-ent-add-site.md) for more information.

**Parent topic:**[Using Alfresco Content Connector for Salesforce](../concepts/salesforce-ent-using.md)

