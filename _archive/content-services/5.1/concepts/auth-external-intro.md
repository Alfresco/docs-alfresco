---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, external, authentication]
---

# Configuring external authentication

Use this information to enable the external authentication subsystem using the alfresco-global.properties file and the Admin Console in Share.

**Configuring/enabling external authentication subsystem using the alfresco-global.properties file:**

To enable external authentication subsystem:

1.  Open the alfresco-global.properties file.
2.  Set the following properties to enable external authentication:

    ```
    authentication.chain=external1:external
    external.authentication.proxyUserName=
    external.authentication.enabled=true
    external.authentication.defaultAdministratorUserNames=admin
    external.authentication.proxyHeader=X-Alfresco-Remote-User
    ```

    **Note:** The default setting for `external.authentication.proxyUserName` is `alfresco-system`. This should only be specified if you are using SSL. See [External authentication and SSO](auth-basics.md) for more information.

3.  Save the alfresco-global.properties file.
4.  Restart the Alfresco server.

For more information on the external authentication properties, see [external configuration properties](auth-external-props.md).

**Configuring/enabling external authentication subsystem using the Share Admin Console:**

To enable external authentication subsystem using the Share Admin Console, see [configuring external authentication](../tasks/adminconsole-directorymgt-external.md).

-   **[External authentication and SSO](../concepts/auth-basics.md)**  
Use this information to understand what we mean by External Authentication and how Single Sign-On \(SSO\) can be used with this authentication type.
-   **[External configuration properties](../concepts/auth-external-props.md)**  
The external subsystem supports a number of properties.
-   **[Configuring Alfresco Share to use an external SSO](../tasks/auth-alfrescoexternal-sso.md)**  
Alfresco Share can be configured to accept a user name from an HTTP header provided by an external authentication system for Single Sign on \(SSO\).
-   **[Setting Alfresco SSO with client certificates](../tasks/alf-sso-client-certificate.md)**  
Use this information to set up Alfresco SSO with client certificates.

**Parent topic:**[Configuring authentication subsystems](../concepts/auth-config-examples.md)

**Related information**  


[Configuring Alfresco Share to use an external SSO](../tasks/auth-alfrescoexternal-sso.md)

