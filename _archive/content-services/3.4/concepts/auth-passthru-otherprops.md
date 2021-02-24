---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, pass-through, passthru, authentication]
---

# Other pass-through properties

The pass-through subsystem supports the following additional properties.

-   **ntlm.authentication.sso.enabled**

    A Boolean that when true enables NTLM based Single Sign On \(SSO\) functionality in the Web clients. When false and no other members of the authentication chain support SSO, password-based login will be used.

-   **ntlm.authentication.mapUnknownUserToGuest**

    Identifies whether unknown users are automatically logged on as the Alfresco guest user during Single Sign-On \(SSO\).

-   **passthru.authentication.authenticateCIFS**

    A Boolean that when true enables pass-through authentication for the CIFS server. When false and no other members of the authentication chain support CIFS authentication, the CIFS server will be disabled.

-   **passthru.authentication.authenticateFTP**

    A Boolean that when true enables pass-through authentication for the FTP server. The provided password is hashed and checked directly against the domain server securely using NTLM. When false and no other members of the authentication chain support FTP authentication, standard chained authentication will be used.

-   **passthru.authentication.guestAccess**

    Identifies whether to allow guest access to Alfresco if the authenticating server indicates the login was allowed guest access.

-   **passthru.authentication.defaultAdministratorUserNames**

    A comma separated list of user names who should be considered administrators by default. It is often useful to add the administrator user to this list.

-   **passthru.authentication.connectTimeout**

    The timeout value when opening a session to an authentication server, in milliseconds. The default is 5000.

-   **passthru.authentication.offlineCheckInterval**

    Specifies how often pass through servers that are marked as offline are checked to see if they are now online. The default check interval is 5 minutes. The check interval is specified in seconds.

-   **passthru.authentication.protocolOrder**

    Specifies the type of protocols and the order of connection for pass through authentication sessions. The default is to use NetBIOS, if that fails then try to connect using native SMB/port 445. Specify either a single protocol type or a comma delimited list with a primary and secondary protocol type. The available protocol types are NetBIOS for NetBIOS over TCP and TCPIP for native SMB.


**Parent topic:**[Configuring pass-through](../concepts/auth-passthru-intro.md)

