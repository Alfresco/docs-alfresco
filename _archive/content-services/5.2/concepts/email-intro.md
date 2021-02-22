---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Configuring inbound and outbound email

The email subsystem allows you to configure the outbound and inbound SMTP email settings to interact with Alfresco Content Services.

There are two methods of running email server:

-   Running the email server process in the same JVM context as the repository
-   Running the email server remotely and communicate with the repository using Remote Method Invocation \(RMI\)

-   **[Managing inbound emails](../tasks/adminconsole-inboundemail.md)**  
Set these inbound email properties in the Admin Console to activate sending and receiving site invites, and also for receiving activity notification emails.
-   **[Inbound SMTP configuration properties](../concepts/email-inboundsmtp-props.md)**  
The Inbound SMTP email subsystem type allows you to configure the behavior of the email server and service.
-   **[Managing outbound emails](../tasks/adminconsole-outboundemail.md)**  
Set these outbound email properties in the Admin Console to manage all emails sent from Alfresco Content Services to users such as site invitations, activity notifications, and workflow tasks.
-   **[Outbound SMTP configuration properties](../concepts/email-outboundsmtp-props.md)**  
The following properties can be configured for the Outbound SMTP subsystem type.
-   **[Handling messages by target node type](../concepts/email-target-node.md)**  
Default behaviors for incoming email to different types of referenced nodes.
-   **[Groups and permissions for email](../concepts/email-groupspermissions.md)**  
An email arriving at the Alfresco Content Services email server is unauthenticated. An authentication group, `EMAIL_CONTRIBUTORS`, must exist to allow permissions to be handled at a high level by the administrator.

**Parent topic:**[Configuring email](../concepts/email.md)

