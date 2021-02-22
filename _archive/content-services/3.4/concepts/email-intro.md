---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: email server service
---

# Configuring email

The email subsystem allows you to configure the outbound and inbound SMTP email settings to interact with Alfresco.

There are two methods of running Alfresco email server:

-   Running the email server process in the same JVM context as the repository
-   Running the email server remotely and communicate with the repository using Remote Method Invocation \(RMI\)

-   **[OutboundSMTP configuration properties](../concepts/email-outboundsmtp-props.md)**  
The following properties can be configured for the OutboundSMTP subsystem type.
-   **[InboundSMTP configuration properties](../concepts/email-inboundsmtp-props.md)**  
The InboundSMTP email subsystem type allows you to configure the behavior of the email server and service.
-   **[Configuring the RMI email service](../tasks/email-rmi.md)**  
You can run the email server remotely on a separate JVM and server, and have it interact with the Alfresco server using Remote Method Invocation \(RMI\).
-   **[Handling messages by target node type](../concepts/email-target-node.md)**  
This section describes the default behaviors for incoming email to different types of referenced nodes.
-   **[Groups and permissions for email](../concepts/email-groupspermissions.md)**  
An email arriving at the Alfresco email server is unauthenticated. An authentication group, `EMAIL_CONTRIBUTORS` , must be created to allow permissions to be handled at a high level by the administrator.

**Parent topic:**[Administering](../concepts/ch-administering.md)

