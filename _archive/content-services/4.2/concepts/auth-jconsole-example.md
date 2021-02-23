---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: JConsole runtime administration
---

# Authentication chain example with JConsole

This section describes an example walk through of setting up an authentication chain using the JMX client, JConsole.

The first time you access a vanilla Alfresco installation through Alfresco Explorer, you see a Guest home page. The login is identified as the user guest and it is unauthenticated with limited access to the Alfresco functionality.

When you login as a user with administrator privileges, you can create additional users and assign passwords. By default, users and passwords are managed from within Alfresco. Unauthenticated users, like guest, still have limited access.

The default authentication within Alfresco is adequate for small-scale environments, however, you may prefer to choose an authentication method that will scale up to a production environment. For example, you may wish to:

-   Disable the unauthenticated guest user access
-   Enable automatic sign-on using operating system credentials or a single sign-on \(SSO\) server, which removes the need for a login page
-   Delegate authentication responsibility to a central directory server, which removes the need to set up users manually with the **Users** tool.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

