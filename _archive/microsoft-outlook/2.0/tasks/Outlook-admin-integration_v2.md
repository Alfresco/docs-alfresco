---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring email integration and metadata settings in Alfresco Share

You can configure email integration settings for Alfresco Outlook Integration using Share Admin Tools. These settings define global controls across your enterprise and are applied immediately.

1.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and under Email Client there are the following options for configuration:

    -   **Email Integration Settings**: server and client setup, email settings, and custom metadata
    -   **Email Access Tokens**: view and remove active users
    -   **Email Licenses**: view and register server and client licenses
    -   **Email System Info**: view version, license, server and installed module information
2.  Select Email Integration Settings from the Tools menu and click **Edit**.

3.  In the Browse sites field you can specify which sites are displayed when you select an email and use the **Archive Directly** right click option in the Alfresco Outlook Client.

    Options are **All public sites**, **My sites** or **Favorite sites**.

    **Note:** Outlook users are able to change this and other settings locally for the Alfresco Outlook Client. See [Configuring extended settings in Outlook](Outlook-config-extended_v2.md) for more information.

4.  In the Prevent email duplication in field, choose to check the uniqueness of files and at what level. Select between **None**, **Repository**, **Site**, or **Folder**.

5.  Select **Allow overwriting** if you want files to be overwritten when they are duplicates of a previously archived file.

6.  Specify a number in Explorer tree page size to limit the number of files and folders visible at a time in the Explore view of the Alfresco sidebar in Outlook.

    **Note:** Entering a value of 0 removes any limit on the number of files and folders displayed.

7.  Specify a number in the Maximum number of search results field to limit the number of results returned in the Alfresco sidebar in Outlook.

    **Note:** Entering a value of 0 removes any limit.

8.  Select **Automatically convert emails \(EML, MSG\) uploaded using Share, CIFS, WebDAV, FTP** if you want every email \(EML / MSG\) which is uploaded from Share, CIFS, WebDAV, or FTP \(for example, uploading using an integrated WebDAV folder in the Windows tree structure\) to be converted in exactly the same way, as if it were uploaded through Outlook.

    The Module version field displays the version of the Alfresco Outlook Client.

9.  Select **Auto configure all clients** if you want every connected client with an installed Alfresco Outlook Client to receive the configuration settings automatically.

    If you select this option, the **Allow overwriting** and **Configuration XML content** fields are active. If you check **Allow overwriting**, users are able to change their settings locally. Paste the XML code that contains the configuration settings for the Alfresco Outlook Client into the **Configuration XML content** field, or load and edit the default configuration template by clicking **Load default configuration template**.

10. Select **Enable attachment stripping** to upload attachments to the selected site in the Alfresco repository. In the email they are replaced with a link to the repository file.

    If **Enable attachment stripping** is enabled, the **Target site** field becomes mandatory \(in order that the files are stored in the designated repository\).

11. Click **Select** next to the **Target site** field to specify the Alfresco site where you want to store attachments. Click the plus \(+\) sign next to your chosen site, and **OK** to add it.

    Only one site can be specified in this field.

12. Select one or both of the stripping rules:

    Wildcard characters cannot be used in these fields, and if selected, they cannot be left blank.

    1.  **Strip attachments when all recipients have the following domain**: type the required domain dame

    2.  **Strip attachments when recipient list contains the following email address**: type the required email address

13. Specify a number in the Min size in KB field. This number controls the minimum size of attachment that is stripped; for example, to exclude company logos or very small attachments.

14. Click **Manage** to prevent stripping of media in the email signature.

    Enter a space delimited list of file extensions or files that you do not want stripped from the email, for example;

    ```
    test.docx *.txt *.xlsx
    ```

15. Click Enable custom labels for Email as Link action to define properties that determine what text is shown when you select Email as link in Alfresco.

    1.  Specify the Subject text that you would like to be displayed in the Email as link in subject prefix field.

    2.  Specify the Action text that you would like to identify in the Email as link action text; for example, Click to view file \{0\} displays the file name at the end of the label.

16. Click Enable custom metadata support and paste your XML content into the Configuration XML content field.

    You can use the default configuration template for testing purposes, and edit this if you prefer. If your XML is not valid, you will not be allowed to save your settings.

    See [Configuring metadata for Outlook](Outlook-config-metadata.md) for more detailed guidance on adding metadata.

17. Click **Apply** to save your settings.


-   **[Configuring metadata for Outlook](../tasks/Outlook-config-metadata.md)**  
You can configure templates for adding metadata to files, emails and attachments in Outlook.

**Parent topic:**[Configuring Outlook settings in Alfresco Share and Microsoft Outlook](../concepts/Outlook-config-intro_v2.md)

