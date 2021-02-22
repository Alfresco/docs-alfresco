---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: email groups permissions
---

# Groups and permissions for email

An email arriving at the Alfresco email server is unauthenticated. An authentication group, `EMAIL_CONTRIBUTORS` , must be created to allow permissions to be handled at a high level by the administrator.

When an email comes into the system, the only identification is the sender's email address. The user is look-up is based on the email address.

-   If a matching user is not found, then the current user is assumed to be unknown, if unknown exists
-   If unknown does not exist, then the email is rejected as authentication will not be possible
-   If the user selected is not part of email contributor's group, then the email is rejected

The current request's user is set and all subsequent processes are run as the authenticated user. If any type of authentication error is generated, then the email is rejected. The authentication will also imply that the authenticated user may not have visibility of the target node, in which case the email is also rejected. Effectively, this means that the target recipient of the email does not exist, at least not for the sender.

The current default server configuration creates the `EMAIL_CONTRIBUTORS` group and adds the `admin` user to this group.

**Parent topic:**[Configuring email](../concepts/email-intro.md)

