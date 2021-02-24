---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring email integration settings in Alfresco Share

You can configure email integration settings for Alfresco Outlook Integration using Share Admin Tools. These settings define global controls across your enterprise.

1.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and under Email Client there are the following options for configuration:

    -   **Email Integration Settings**: view and edit global site, email and document library settings
    -   **Email Access Tokens**: view and remove active users
    -   **Email Licenses**: view and register server and client licenses
    -   **Email System Info**: view version, license, server and installed module information
2.  Select Email Integration Settings from the Tools menu and click **Edit**.

3.  In the Browse sites field you can specify the navigation area for the Alfresco Outlook Client.

    Options are **All public sites**, **My sites** or **Favorite sites**.

    **Note:** Outlook users are able to change settings locally for the Alfresco Outlook Client.

4.  In the Prevent email duplication in field, choose to check the uniqueness of documents and at what level. Select between **None**, **Repository**, **Site**, or **Folder**.

5.  Select **Allow overwriting** if you want documents to be overwritten when they are duplicates of a previously archived file.

6.  Specify a number in the Limit of returning nodes field to limit the number of sites, directories and documents displayed in the Alfresco Outlook Client.

    **Note:** Entering a value of 0 removes any limit on the number of sites, directories and documents displayed.

7.  Select **Automatically convert emails \(EML, MSG\) uploaded using Share, CIFS, WebDAV, FTP, NFS** if you want every email \(EML / MSG\) which is uploaded from Share, CIFS, WebDAV, FTP, or NFS \(for example, uploading using an integrated WebDAV folder in the Windows tree structure\) to be converted in exactly the same way, as if it were uploaded through Outlook.

    The Module version field displays the version of the Alfresco Outlook Client.

8.  Select **Auto configure all clients** if you want every connected client with an installed Alfresco Client to receive the configuration settings automatically.

    If you select this option, the **Allow overwriting** and **Configuration XML content** fields are active. If you check **Allow overwriting**, users are able to change their settings locally. Paste the XML code that contains the configuration settings for the Alfresco Outlook Client into the **Configuration XML content** field, or load and edit the default configuration template by clicking **Load default configuration template**.

    For more information about configuration templates, see [Alfresco Outlook Integration configuration templates](../references/Outlook-config-templates.md).

9.  Select **Enable attachment stripping** to upload attachments to the selected site in the Alfresco repository. In the email they are replaced with a link to the repository file.

    If **Enable attachment stripping** is enabled, the **Target site** field becomes mandatory \(in order that the files are stored in the designated repository\).

10. Click **Select** next to the **Target site** field to specify the Alfresco site where you want to store attachments. Click the plus \(+\) sign next to your chosen site, and **OK** to add it.

    Only one site can be specified in this field.

11. Select one or both of the stripping rules:

    Wildcard characters cannot be used in these fields, and if selected, they cannot be left blank.

    1.  **Strip attachments when all recipients have the following domain**: type the required domain dame

    2.  **Strip attachments when recipient list contains the following email address**: type the required email address

12. Click **Apply** to save your settings.


Your email integration settings are now configured in Alfresco Share.

**Parent topic:**[Configuring Alfresco Outlook Integration in Alfresco Share and in Microsoft Outlook](../concepts/Outlook-config-intro.md)

