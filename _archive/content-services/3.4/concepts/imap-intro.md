---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: IMAP protocol email
---

# Configuring IMAP Protocol support

IMAP protocol support allows email applications that support IMAP \(including Outlook, Apple Mail, Thunderbird, and so on\) to connect to and interact with Alfresco repositories.

Each user has their own set of mailboxes stored within Alfresco, for example, they have their own INBOX. Users can manage emails within Alfresco ECM, and the workflow, transformation, and permissions features are available.

In addition, Share sites can be nominated as IMAP Favorites. This means that the site contents show as a set of IMAP folders. Non-favorite sites are not shown.

A metadata extractor for IMAP emails \(RFC822 messages\) can extract values from the contents of the email message and store the values as Alfresco properties.

-   **[Enabling the IMAP Protocol](../tasks/imap-enable.md)**  
The IMAP protocol server is disabled by default. You need to enable the IMAP protocol server to start interaction between the email client and the Alfresco repository.
-   **[IMAP subsystem properties](../concepts/IMAP-subsystem-props.md)**  
The following properties can be configured for the IMAP subsystem.
-   **[IMAP mount points](../concepts/imap-mountpoints.md)**  
IMAP mount points are used to control which folders are available using IMAP and the mode in which they are accessed. Modes are used to define the type of interaction available.
-   **[Virtual view email format](../concepts/imap-virtual-view.md)**  
The virtualized view uses presentation templates to generate the mail body and display document metadata, action links \(for download, view, webdav, folder\) and Start Workflow form \(HTML view only\).
-   **[Marking sites as IMAP favorites](../tasks/imap-site-fav.md)**  
To have access to Alfresco Share sites using IMAP, the site\(s\) need to be added to your list of sites using Share IMAP Favorites.

**Parent topic:**[Administering](../concepts/ch-administering.md)

