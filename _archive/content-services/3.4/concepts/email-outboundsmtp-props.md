---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: email server service
---

# OutboundSMTP configuration properties

The following properties can be configured for the OutboundSMTP subsystem type.

**Note:** You must set the Outbound email configuration for Share invitations to work correctly. If you do not set the email configuration, when you invite a user to a site, the user will not receive the assigned task notification.

-   **mail.host=yourmailhost.com**

    Specifies the name of the SMTP host.

-   **mail.port=25**

    Specifies the port number on which the SMTP service runs \(the default is 25\).

-   **mail.username=username**

    Specifies the user name of the account from which you want email to be sent.

-   **mail.password=password**

    Specifies the password for the user name.

-   **mail.encoding=UTF-8**

    Specifies UTF-8 encoding for email.

-   **mail.from.default=admin@alfresco.com**

    Specifies the email address from which all email notifications are sent.

-   **mail.smtp.auth=false**

    Specifies whether you authorization is required.

-   **mail.protocol=smtp**

    Specifies the default protocol to be used for email.

-   **mail.smtps.starttls.enable=false**

    Specifies the use of `STARTTLS` command. If true, enables the use of the `STARTTLS` command to switch the connection to a TLS-protected connection before issuing any login commands. Defaults to false.

-   **mail.smtps.auth=false**

    Specifies the use of SMTPS authentication. If true, attempt to authenticate the user using the `AUTH` command. Defaults to false.


The following properties can be set to define a test message when the subsystem starts.

-   **mail.testmessage.send=false**

    Defines whether or not to send a test message.

-   **mail.testmessage.to=**

    Specifies the recipient of the test message.

-   **mail.testmessage.subject=Outbound SMTP**

    Specifies the message subject of the test message.

-   **mail.testmessage.text=Outbound SMTP email subsystem is working.**

    Specifies the message body of the test message.


**Parent topic:**[Configuring email](../concepts/email-intro.md)

