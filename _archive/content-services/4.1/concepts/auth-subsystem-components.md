---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: authentication subsystem types
---

# Authentication subsystem components

This section describes the main components of an authentication subsystem.

-   **authentication component**

    Handles the specifics of talking to the back-end authentication system.

-   **authentication Data Access Object \(DAO\)**

    Decides what user management functions are allowed, if any. For example, the ability to create a user.

-   **authentication service**

    Wraps the authentication component and DAO with higher-level functions.

-   **user registry export service \(optional\)**

    Allows Alfresco to obtain user attributes, such as email address, organization, and groups automatically.

-   **authentication filters**

    Provide form or SSO-based login functions for the following:

    -   web client
    -   WebDAV
    -   Web scripts
    -   SharePoint Protocol
-   **file server authenticators**

    Provide authentication functions for the following:

    -   CIFS protocol \(optional\)
    -   FTP protocol

**Parent topic:**[Authentication subsystems](../concepts/auth-subsystem-intro.md)

