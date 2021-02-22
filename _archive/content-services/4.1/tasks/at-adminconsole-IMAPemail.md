---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [email, IMAP]
---

# Managing IMAP emails

This section describes how to set the options for emails sent using IMAP.

1.  Open the Admin Console, and then click **Email \(IMAP\)**.

2.  On the Email \(IMAP\) page, click **Edit**.

    You see the Edit: Email \(IMAP\) page.

3.  Set the IMAP properties:

    The IMAP properties let you configure the IMAP Home space, which is used to store user mailboxes.

    |Global property|Description|
    |---------------|-----------|
    |**Enabled**|Enables or disables the IMAP subsystem.|
    |**Mail from Default**|This is the default email address that is displayed if you are using an email client to view a document that does not have a "From" address.|
    |**Mail to Default**|This is the default email address that is displayed if you are using an email client to view a document that does not have a "To" address.|
    |**Extraction Enabled**|If an incoming email has an attachment, should it be extracted and stored in the repository as a separate document.|
    |**Host**|This sets the host name of your IMAP server. Replace this value with the IP address \(or corresponding DNS address\) of your external IP interface. A value of 0.0.0.0 in Unix will make it listen on the specified port on all IP interfaces.|
    |**Port**|This is the port number, for example 143.|

4.  To activate IMAP emails, select the **Enabled** checkbox.

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

