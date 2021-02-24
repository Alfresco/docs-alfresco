---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [alfrescoNtlm, NTLM, configuration, authentication]
---

# alfrescoNtlm configuration properties

The alfrescoNtlm subsystem supports the following properties.

-   **ntlm.authentication.sso.enabled**

    A Boolean that when true enables NTLM based Single Sign On \(SSO\) functionality in the Web clients. When false and no other members of the authentication chain support SSO, password-based login will be used.

-   **ntlm.authentication.mapUnknownUserToGuest**

    Specifies whether unknown users are automatically logged on as the Alfresco guest user during Single Sign-On \(SSO\).

-   **alfresco.authentication.authenticateCIFS**

    A Boolean that when true enables Alfresco-internal authentication for the CIFS server. When false and no other members of the authentication chain support CIFS authentication, the CIFS server will be disabled.

-   **alfresco.authentication.allowGuestLogin**

    Specifies whether to allow guest access to Alfresco.


**Note:** If you add extra administrator users in the authority-services-context.xml file and are using alfrescoNtlm, the extra users \(other than the admin user\) will no longer have administrator rights until you add them to the `ALFRESCO_ADMINISTRATORS` group using the Administration Console.

**Parent topic:**[Configuring alfrescoNtlm](../concepts/auth-alfrescontlm-intro.md)

