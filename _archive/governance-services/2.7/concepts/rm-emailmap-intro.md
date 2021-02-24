---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Administration, Records Management]
option: Records Management
---

# Email Mappings

One of the many ways that you can file data in the Records Management system is by storing inbound emails as records.

The IMAP protocol allows email applications that support IMAP to connect to and interact with Alfresco repositories directly from the mail application.

Alfresco has multiple maps between email headers and Alfresco metadata properties set up by default. You can view these with the Email Mappings tool.

This means that when an email is saved to Records Management, metadata from the email header is captured and mapped to metadata for the record.

For example, an email `Subject` heading is mapped by default to the Alfresco property `title`. This is displayed as in the Email Mappings tool as `messageSubject` to `cm:title`. The email header field `messageSubject` is on the left and is separated by the word “to”, which indicates that it is mapped to a property `cm:title`.

When you're viewing emails within the Records Management system, the `title` property shows the email’s `Subject` heading.

As well as the default mappings, you can also add your own or delete existing ones.



-   **[Adding an email map](../tasks/rm-emailmap-add.md)**  
The pre-defined email mappings cover the most commonly used email headers. You can include additional email header mappings using the Email Mappings tool.
-   **[Deleting an email map](../tasks/rm-emailmap-delete.md)**  
You can delete an email map whenever it's no longer needed.

**Parent topic:**[Administering](../concepts/rm-admin-intro.md)

