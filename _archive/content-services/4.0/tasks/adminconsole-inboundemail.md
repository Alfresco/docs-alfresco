---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [email, outbound]
---

# Managing inbound emails

This section describes how to set the options for inbound emails. You need to set these properties to activate sending and receiving site invites, and also for receiving activity notification emails.

1.  Open the Admin Console, and then click **Email \(Inbound\)**.

2.  On the Email \(Inbound\) page, click **Edit**.

    You see the Edit: Email \(Inbound\) page.

3.  Set the general inbound email properties:

    |General property|Example setting|What is it?|
    |----------------|---------------|-----------|
    |**Enabled**|Yes|This is used to enable or disable the inbound email properties.|
    |**Unknown User**|anonymous|This is the user name to authenticate as when the sender address is not recognized.|
    |**Allowed Senders**| |This provides a comma-separated list of email REGEX patterns of allowed senders. If there are any values in the list, then all sender email addresses must match. For example:.\*\\@alfresco\\.com, .\*\\@alfresco\\.org.|
    |**Blocked Senders**| |This provides a comma-separated list of email REGEX patterns of blocked senders. If the sender email address matches this, then the message will be rejected. For example:.\*\\@hotmail\\.com, .\*\\@googlemail\\.com.|
    |**Domain**|alfresco.com|This is the default domain for the email server.|
    |**Port**|25|This is the default port number for the email server.|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

