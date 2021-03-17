---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Kerberos configuration properties

To enable full Kerberos support in Alfresco requires that the CIFS server and the SSO authentication filters each have a Kerberos service ticket.

The Kerberos subsystem supports the following properties.

-   **kerberos.authentication.realm**

    The Kerberos realm with which to authenticate. The realm should be the domain upper cased; an example is that if the domain is `alfresco.org` then the realm should be `ALFRESCO.ORG`.

-   **kerberos.authentication.sso.enabled**

    A Boolean that when true enables SPNEGO/Kerberos based Single Sign On \(SSO\) functionality in the web client. When false and no other members of the authentication chain support SSO, password-based login will be used.

-   **kerberos.authentication.authenticateCIFS**

    A Boolean that when true enables Kerberos authentication in the CIFS server. When false and no other members of the authentication chain support CIFS authentication, the CIFS server will be disabled.

-   **kerberos.authentication.user.configEntryName**

    The name of the entry in the JAAS configuration file that should be used for password-based authentication. The default value `Alfresco` is recommended.

-   **kerberos.authentication.cifs.configEntryName**

    The name of the entry in the JAAS configuration file that should be used for CIFS authentication. The default value `AlfrescoCIFS` is recommended.

-   **kerberos.authentication.http.configEntryName**

    The name of the entry in the JAAS configuration file that should be used for web-based single-sign on \(SSO\). The default value `AlfrescoHTTP` is recommended.

-   **kerberos.authentication.cifs.password**

    The password for the CIFS Kerberos principal.

-   **kerberos.authentication.http.password**

    The password for the HTTP Kerberos principal.

-   **kerberos.authentication.defaultAdministratorUserNames**

    A comma separated list of user names who should be considered administrators by default.

-   **kerberos.authentication.browser.ticketLogons**

    Authentication with Alfresco using a ticket parameter in the request URL. Default is true. Note that WebDAV URLs always accept ticket parameters.

-   **kerberos.authentication.stripUsernameSuffix**

    A value of `true` strips the `@domain` suffix from Kerberos authenticated user names in CIFS, SPP, WebDAV and the Web Client. A value of `false` enables a multi-domain customer to use the `@domain` suffix.


**Note:** The value of `kerberos.authentication.stripUsernameSuffix` property in alfresco-global.properties should be consistent with the value of `</stripUserNameSuffix>` property in share-config-custom.xml. So, if you set the `kerberos.authentication.stripUsernameSuffix=true`, then you should set the following property in share-config-custom.xml:

```
<stripUserNameSuffix>true</stripUserNameSuffix>
```

For Kerberos to work with user names that contain non-ASCII characters, add the following option to JAVA\_OPTS for the Share JVM:

```
-Dsun.security.krb5.msinterop.kstring=true
```

**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

