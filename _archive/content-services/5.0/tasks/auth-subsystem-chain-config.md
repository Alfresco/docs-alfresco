---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: authentication subsystem chain
---

# Configuring the authentication chain

You can add to or completely replace the default authentication chain.

Chained functions combine authentication subsystems. The chain is controlled by the `authentication.chain` global property. When a user logs in, Alfresco tries the user's credentials against each of the subsystems in the order specified in the chain, until the credentials are accepted \(the login is successful\) or until each subsystem has been tried \(and the login fails\).

Some functions cannot be chained \(passthru function\), for example, CIFS authentication, and NTLM / SPEGNO based Single Sign-On \(SSO\). These functions are handled by the first subsystem in the chain that supports that function and has it enabled. This means that only a subset of your users might be able to use SSO and CIFS.

If Kerberos is configured along with basic authentication in a chain, all the calls to the repository will only support Kerberos. The response from the server only contains the `WWW-Authenticate: Negotiate` header.

To enable the fallback mechanism for basic authentication, do the following:

-   Set the following property \(`true`, by default\):

    ```
    kerberos.authentication.sso.fallback.enabled=true
    ```

-   Send a basic authentication header in all the requests.

    ```
    Authorization: Basic <encoded_string>
    ```

    where `<encoded_string>` is a base64 encoded username and password separated by a single colon \(:\). For more information, see [Basic Authentication Scheme](https://tools.ietf.org/html/rfc2617#section-2).


To configure the authentication chain, follow the steps below:

1.  Open the alfresco-global.properties file.

2.  Locate, or if it does not already exist, create the `authentication.chain` global property.

    This is a comma separated list of the form:

    ```
    instance_name1:type1,...,instance_namen:typen
    ```

    for example,

    ```
    authentication.chain=alfrescoNtlm1:alfrescoNtlm
    ```

3.  Set the property to the required values.

    The default authentication chain specifies one instance of the alfrescoNtlm subsystem type with ID `alfrescoNtlm1`.

    For example, set the property to the following value:

    ```
    alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
    ```

    When you navigate to the `Alfresco:Type=Configuration,Category=Authentication,id1=manager` MBean in global property overrides, a new authentication subsystem instance called `ldap1` is created and added to the end of the authentication chain.

4.  Save the file.


The following examples specify an advanced Active Directory chain, and an advanced LDAP chain.

You can integrate Alfresco with Active Directory so that:

-   Built-in Alfresco users and Windows users can log in, with Alfresco taking precedence
-   The Windows domain server handles CIFS authentication directly
-   LDAP synchronizes user and group details

1.  Configure the following authentication chain:

    ```
    alfrescoNtlm1:alfrescoNtlm,passthru1:passthru,ldap1:ldap
    ```

2.  Deactivate SSO in order to activate chained password-based log in, target CIFS at `passthru1` and target synchronization \(but not authentication\) at `ldap1` by setting the following properties:
    -   **alfrescoNtlm1**

        `ntlm.authentication.sso.enabled=false`

        `alfresco.authentication.authenticateCIFS=false`

    -   **passthru1**

        `ntlm.authentication.sso.enabled=false`

        `passthru.authentication.authenticateCIFS=true`

    -   **ldap1**

        `ldap.authentication.active=false`

        `ldap.synchronization.active=true`


You can integrate Alfresco with two LDAP directories so that:

-   User passwords are validated directly against the LDAP servers for web, SharePoint and FTP login
-   The CIFS server is deactivated because neither server can handle CIFS-style authentication
-   LDAP is used to synchronize user and group details from both directories
-   Users in the first directory, `ldap1`, take precedence over those in the second directory, `ldap2`

**Note:** If you are only using a single LDAP provider in your authentication chain, the properties can be included in the alfresco-global.properties file. But if you need to include the configuration for more than one LDAP provider, then you need to separate the properties in distinct subsystem configuration in <configRootShare\>/classes/alfresco/subsystems/Authentication/<LDAP Provider Name\>/ldap-authentication.properties.

1.  In the alfresco-global.properties, specify this setting:

    ```
    authentication.chain=ldap1:ldap,ldap2:ldap
    ```

2.  Copy [ldap-authentication.properties](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/subsystems/Authentication/ldap/ldap-authentication.properties) to both the <classpathRoot\>/alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties and <classpathRoot\>/alfresco/extension/subsystems/Authentication/ldap/ldap2/ldap-authentication.properties files.
3.  Edit the properties for `ldap1` and `ldap2` with appropriate settings to complete the configuration. See [LDAP configuration properties](../concepts/auth-ldap-props.md) for information on each of the properties.



**Parent topic:**[Alfresco authentication chain](../concepts/auth-subsystem-chain.md)

