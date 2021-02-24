---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: email server service
---

# InboundSMTP configuration properties

The InboundSMTP email subsystem type allows you to configure the behavior of the email server and service.

The following properties can be set for Inbound SMTP email.

-   **email.inbound.unknownUser=anonymous**

    Specifies the user name to authenticate as when the sender address is not recognized.

-   **email.inbound.enabled=true**

    Enables or disables the inbound email service. The service could be used by processes other than the email server \(for example, direct RMI access\), so this flag is independent of the email service.

-   **email.server.enabled=true**

    Enables the email server.

-   **email.server.port=25**

    Specifies the default port number for the email server.

-   **email.server.domain=alfresco.com**

    Specifies the default domain for the email server.

-   **email.server.allowed.senders=.\***

    Provides a comma-separated list of email REGEX patterns of allowed senders. If there are any values in the list, then all sender email addresses must match. For example: .\*\\@alfresco\\.com, .\*\\@alfresco\\.org.

-   **email.server.blocked.senders=**

    Provides a comma-separated list of email REGEX patterns of blocked senders. If the sender email address matches this, then the message will be rejected. For example: .\*\\@hotmail\\.com, .\*\\@googlemail\\.com.


**Parent topic:**[Configuring email](../concepts/email-intro.md)

