---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Admin Console: Managing inbound emails

Set these inbound email properties to activate sending and receiving site invites, and also for receiving activity notification emails.

1.  Open the Admin Console.

2.  In the Email Services section, click **Inbound Email**.

    You see the Inbound Email page.

3.  Set the email properties:

    |Inbound Email property|Example setting|What is it?|
    |----------------------|---------------|-----------|
    |**Enabled**|No|Use check box to enable or disable the inbound email service. By default, it is not enabled.|
    |**Unknown User**|anonymous|This is the user name to authenticate as when the sender address is not recognized.|
    |**Allowed Senders**|.\*|To allow senders, enter a comma-separated list of email REGEX patterns of allowed senders. If there are any values in the list, then all sender email addresses must match. For example:.\*\\@alfresco\\.com, .\*\\@alfresco\\.org.|
    |**Overwrite Duplicates**|Yes|By default, duplicate messages to a folder will overwrite each other. Deselect this check box to keep duplicate messages and apply a unique number.|
    |**Maximum Server Connections**|3|This provides the maximum number of connections allowed in order to control the performance of the system. To prioritize the email subsystem higher, increase this number. The default setting is 3.|
    |**SMTP Authentication Enabled**|No|Use this check box to enable or disable the authentication of inbound email against the repository.|
    |**Email Server Port**|25|This is the default port number for the email server.|
    |**Email Server Domain**|alfresco.com|This is the default domain for the email server.|
    |**Blocked Senders**| |To block senders, enter a comma-separated list of email REGEX patterns, for example: .\*\\@hotmail\\.com, .\*\\@googlemail\\.com. If the sender email address matches a listed value, then the message will be rejected.|
    |**Email Authentication Group**|EMAIL\_CONTRIBUTORS|This is the name of the group in which users must be a member to add content to the repository by email. The default group is EMAIL\_CONTRIBUTORS.|
    |**Transport Layer Security \(TLS\)**|Enabled|This enables the TLS protocol, which upgrades a plain text connection to an encrypted TLS or SSL connection instead of using a separate port for encrypted communication. Select the TLS support setting:    -   **Disabled**: TLS support is disabled
    -   **Hidden**: On the EHLO command, server support for TLS is hidden, though TLS will still be accepted if the client uses it
    -   **Enabled**: On the EHLO command, server support for TLS is announced
    -   **Required**: TLS authentication is required
|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: Email services](../concepts/adminconsole-emailservices.md)

**Parent topic:**[Configuring email](../concepts/email-intro.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

