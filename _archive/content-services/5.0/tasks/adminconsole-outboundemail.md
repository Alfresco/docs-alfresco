---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Admin Console: Managing outbound emails

Set these outbound email properties to manage all emails sent from Alfresco to users such as site invitations, activity notifications, and workflow tasks.

1.  Open the Admin Console.

2.  In the Email Services section, click **Outbound Email**.

    You see the Outbound Email page.

3.  Set the email properties:

    |Outbound Email property|Example setting|What is it?|
    |-----------------------|---------------|-----------|
    |**Hostname**|smtp.example.com|This is the name of the SMTP\(S\) host server.|
    |**Encoding**|UTF-8|This is the email encoding type. The default is UTF-8.|
    |**Editable Sender Address**| |This check box enables the From field in outbound emails to be edited to differ from the Default Sender's Address. When you deselect this check box, the Default Sender's Address is always used. You should deselect this option if your email server security settings require the From field to match the user name used for email server authentication.|
    |**Email Server Port**|25|This is the default port number for the email server.|
    |**Default Sender's Address**|alfresco@demo.alfresco.org|The default address that is used in the From field of outbound emails if no alternative is available.|
    |**Email Protocol**|SMTP|Select a protocol from the list. This is the protocol that will be used when sending email.|
    |**Username**|anonymous|The account user name that connects to the SMTP server. The user name and password are only required if your server requires them for authentication.|
    |**Password**| |The account user password.|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: Email services](../concepts/adminconsole-emailservices.md)

**Parent topic:**[Configuring email](../concepts/email-intro.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

[OutboundSMTP configuration properties](../concepts/email-outboundsmtp-props.md)

