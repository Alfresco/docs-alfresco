---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, external, authentication]
---

# External configuration properties

The external subsystem supports the following properties.

-   **external.authentication.enabled**

    A Boolean property that when true indicates that this subsystem is active and will trust remote user names asserted to it by the application server.

-   **external.authentication.defaultAdministratorUserNames**

    A comma separated list of user names who should be considered administrators by default.

-   **external.authentication.proxyUserName**

    The name of the remote user that should be considered the proxy user. The default is `alfresco-system`. Requests made by this user will be made under the identity of the user named in the HTTP Header indicated by the `external.authentication.proxyHeader` property. If not set, then the HTTP Header indicated by the `external.authentication.proxyHeader` property is always assumed to carry the user name.

    **Note:** This is not secure unless this application is not directly accessible by other clients.

-   **external.authentication.proxyHeader**

    The name of the HTTP header that carries the name of a proxied user. The default is `X-Alfresco-Remote-User`, as used by Share.

-   **external.authentication.userIdPattern**

    An optional regular expression to be used to extract a user ID from the HTTP header. The portion of the header matched by the first bracketed group in the regular expression will become the user name. If not set \(the default\), then the entire header contents are assumed to be the proxied user name.


**Parent topic:**[Configuring external authentication](../concepts/auth-external-intro.md)

