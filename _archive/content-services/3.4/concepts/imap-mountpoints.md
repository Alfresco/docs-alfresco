---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: IMAP protocol email mount points
---

# IMAP mount points

IMAP mount points are used to control which folders are available using IMAP and the mode in which they are accessed. Modes are used to define the type of interaction available.

The IMAP integration offers the following access modes:

-   **Archive**

    Allows emails to be written to and read from Alfresco by the IMAP client by drag and drop, copy/paste, and so on, from the email client.

-   **Virtual**

    Documents managed by Alfresco may be viewed as emails from the IMAP client. Documents are shown as virtual emails with the ability to view metadata and trigger actions on the document, using links included in the email body.

-   **Mixed**

    A combination of both archive and virtual modes, that is, both document access and email management are available.


By default, a single mount point called AlfrescoIMAP is defined for Company Home and you can change it or add more mount points.

**Parent topic:**[Configuring IMAP Protocol support](../concepts/imap-intro.md)

