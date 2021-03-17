---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the email client with IMAP

IMAP protocol support allows email applications that support IMAP \(including Outlook, Apple Mail, Thunderbird, and so on\) to connect to and interact with Alfresco repositories.

Each user has their own set of mailboxes stored in Alfresco, for example, they have their own INBOX. Users can manage emails in Alfresco ECM, and the workflow, transformation, and permissions features are available.

In addition, Share sites can be nominated as IMAP Favorites. This means that the site contents show as a set of IMAP folders. Non-favorite sites are not shown.

A metadata extractor for IMAP emails \(RFC822 messages\) can extract values from the contents of the email message and store the values as Alfresco properties.

**Note:** Be careful when deciding what mount points you provide. When an IMAP client mounts a mount point, it issues a `LSUB "" *` command. This retrieves the entire tree of folders below the mount point. 

For information about working with Alfresco and Microsoft Outlook, see [Installing and configuring Alfresco Outlook Integration](Outlook-install-intro.md).

-   **[Enabling the IMAP protocol using alfresco-global.properties](../tasks/imap-enable.md)**  
The IMAP protocol server is disabled by default. You need to enable the IMAP protocol server to start interaction between the email client and the Alfresco repository.
-   **[Enabling the IMAP Service using the Admin Console](../tasks/adminconsole-IMAPservice.md)**  
The IMAP server allows email applications that support IMAP to connect to and interact with Alfresco repositories directly from the mail client. You ca use IMAP Service in the Admin Console to configure IMAP, instead of editing your alfresco-global.properties file.
-   **[IMAP subsystem properties](../concepts/IMAP-subsystem-props.md)**  
The following properties can be configured for the IMAP subsystem.
-   **[IMAP mount points](../concepts/imap-mountpoints.md)**  
IMAP mount points are used to control which folders are available using IMAP and the mode in which they are accessed. Modes are used to define the type of interaction available.
-   **[Virtual view email format](../concepts/imap-virtual-view.md)**  
The virtualized view uses presentation templates to generate the mail body and display document metadata, action links \(for download, view, webdav, folder\) and Start Workflow form \(HTML view only\).
-   **[Marking sites as IMAP favorites](../tasks/imap-site-fav.md)**  
To have access to Alfresco Share sites using IMAP, the site\(s\) need to be added to your list of sites using Share IMAP Favorites.

**Parent topic:**[Configuring email](../concepts/email.md)

