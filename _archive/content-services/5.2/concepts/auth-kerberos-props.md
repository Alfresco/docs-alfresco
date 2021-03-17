---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Kerberos configuration properties

To enable full Kerberos support in Alfresco Content Services, the CIFS server and the SSO authentication filters each need a Kerberos service ticket.

The Kerberos subsystem supports the following properties:

-   **kerberos.authentication.realm**

    The Kerberos realm with which to authenticate. The realm should be the domain name in upper case; for example, if the domain is `alfresco.org` then the realm should be `ALFRESCO.ORG`.

-   **kerberos.authentication.sso.enabled**

    A value of `true` enables SPNEGO/Kerberos based Single Sign On \(SSO\) functionality in the web client. If the value is `false` and no other members of the authentication chain support SSO, password-based login is used.

-   **kerberos.authentication.sso.fallback.enabled**

    If SSO fails, a fallback authentication mechanism is used. The default value is `true`.

-   **kerberos.authentication.authenticateCIFS**

    A value of `true` enables Kerberos authentication in the CIFS server. If the value is `false` and no other members of the authentication chain support CIFS authentication, the CIFS server is disabled.

-   **kerberos.authentication.user.configEntryName**

    The name of the entry in the JAAS configuration file that is used for password-based authentication. The default value `Alfresco` is recommended.

-   **kerberos.authentication.cifs.configEntryName**

    The name of the entry in the JAAS configuration file that is used for CIFS authentication. The default value `AlfrescoCIFS` is recommended.

-   **kerberos.authentication.http.configEntryName**

    The name of the entry in the JAAS configuration file that is used for web-based Single-Sign On \(SSO\). The default value `AlfrescoHTTP` is recommended.

-   **kerberos.authentication.defaultAdministratorUserNames**

    A comma separated list of user names that are treated as administrators by default.

-   **kerberos.authentication.browser.ticketLogons**

    Authentication using a ticket parameter in the request URL. The default value is `true`. Note that WebDAV URLs always accept ticket parameters.

-   **kerberos.authentication.stripUsernameSuffix**

    A value of `true` strips the `@domain` suffix from Kerberos authenticated user names in CIFS, SPP, WebDAV and the Web Client. A value of `false` enables a multi-domain customer to use the `@domain` suffix.


For Kerberos to work with user names that contain non-ASCII characters, add the following option to `JAVA_OPTS` for the Share JVM:

```
-Dsun.security.krb5.msinterop.kstring=true
```

**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

**Related information**  


[Configuring Kerberos](../tasks/adminconsole-directorymgt-kerberos.md)

