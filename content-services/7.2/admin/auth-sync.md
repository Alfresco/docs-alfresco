---
title: Set up authentication and sync
---

Use this information to manage user authentication. Set up if users should be authenticated with the database, LDAP, SSO etc. Set up how user and group information should be synced (imported) with Content Services. Users and groups can also be managed from the Share [Admin Tools]({% link content-services/7.2/admin/users-groups.md %}), but it's more common to sync with a Directory Service, which is discussed here.

Authentication subsystems and authentication chains are discussed first as an understanding of those is necessary when configuring authentication and synchronization.

## Authentication subsystems

Authentication is one of the categories of the Content Services subsystem. An authentication subsystem is a coordinated stack of compatible components responsible for providing authentication and identity-related functionality to Content Services.

Content Services offers multiple implementations of the authentication subsystem, each engineered to work with one of the different types of back-end authentication server that you have available in your enterprise.

An authentication subsystem provides the following functions:

* Password-based authentication for web browsing, Microsoft SharePoint protocol, FTP, and WebDAV
* Web browser, Microsoft SharePoint protocol, and WebDAV Single Sign-On (SSO)
* User registry export (the automatic population of the user and authority database)

The main benefits of the authentication subsystem are:

* Subsystems for all supported authentication types are pre-wired and there is no need to edit template configuration.
* There is no danger of compatibility issues between sub-components, as these have all been pre-selected.
* Common parameters are shared and specified in a single place. There is no need to specify the same parameters to different components in multiple configuration files.
* There is no need to edit the `web.xml` file. The `web.xml` file uses generic filters that call into the authentication subsystem. The `alfresco.war` file is a portable unit of deployment.
* You can swap from one type of authentication to another by activating a different authentication subsystem.
* Your authentication configuration will remain standard and, therefore, more manageable to support.
* Authentication subsystems are easily chained

> **Note:** Some authentication functions can only be targeted at a single subsystem instance in the authentication chain. This is a restriction imposed by the authentication protocols themselves. For this reason, Content Services targets these ‘direct’ authentication functions at the first member of the authentication chain that has them enabled.

### Authentication subsystem types {#authsubsystypes}

A number of alternative authentication subsystem types exist for the most commonly used authentication protocols. These are each identified by a unique type name.

The following table shows the authentication subsystem types supplied and the optional features they support.

| Type | Description | Single Sign-On (SSO) support | User registry entry |
| ---- | ----------- | ---------------------------- | ------------------- |
| alfrescoNtlm | Native Content Services authentication | No | No |
| ldap | Authentication and user registry export through the LDAP protocol (for example, OpenLDAP) | No | Yes |
| ldap-ad | Authentication and user registry export from Active Directory through the LDAP protocol | No | Yes |
| kerberos | Authentication through a Kerberos realm | Yes, SPNEGO | No |
| external | Authentication using an external SSO mechanism | Yes | No |
| identity-service | Authentication using the Identity Service | Yes | No |
| SAML | Authentication through the SAML open standard | Yes | No |

> **Important:** Support for Microsoft Office depends on the authentication mechanism provided by the `external` subsystem. See [External authentication and SSO](#extauthsso) for more information.

> **Important:** SAML Single Sign On can be used for Content Services and Alfresco Office Services. SAML Single Sign On is not fully implemented when mapping a PC network drive over WebDAV, i.e. to either `<alfresco_host>/alfresco/webdav` or `<alfresco_host>/alfresco/aos` endpoints. As a workaround, a PC user should use SAML to login to Content Services before mapping the drive, otherwise the map request may fail.

> **Note:** If you're using a proxy (load balancer) with Kerberos authentication, either:

* Use the `external` authentication subsystem and set up the proxy to implement `kerberos`
* Set up the `kerberos` authentication subsystem and create the Service Principal Name (SPN) in Active Directory to include the proxy DNS name

### Authentication subsystem components

There are a number of main components in an authentication subsystem.

* **authentication component**

    Handles the specifics of talking to the back-end authentication system.

* **authentication Data Access Object (DAO)**

    Decides what user management functions are allowed, if any. For example, the ability to create a user.

* **authentication service**

    Wraps the authentication component and DAO with higher-level functions.

* **user registry export service (optional)**

    Allows Content Services to obtain user attributes, such as email address, organization, and groups automatically.

* **authentication filters**

    Provide form or SSO-based login functions for the following:

        * web client
        * WebDAV
        * web scripts
        * SharePoint protocol

* **file server authenticators**

    Provide authentication functions for the FTP protocol.

## Authentication chain

The authentication subsystem types allow you to integrate Content Services with the authentication servers in your environment. However, if integrating with only one of these systems is not sufficient, you might want to combine multiple authentication protocols against a collection of servers.

Authentication and identity management functionality is provided by a prioritized list, or chain, of configurable subsystems. The built-in authentication chain is a priority-ordered list of authentication subsystem instances. Content Services composes together the functions of the subsystems in this list into a more powerful conglomerate.

An authentication subsystem provides the following functionality:

* Password-based authentication for web browsing, SharePoint, FTP, and WebDAV
* Web browser and SharePoint Single Sign on (SSO)
* User register export (the automatic population of the user and authority database)

Several alternative authentication subsystems exist for the most commonly used authentication protocols. These subsystems enable you to tie Content Services to some of the most widely used authentication infrastructures. If you include more than one of these subsystems in the chain, you can create complex authentication scenarios.

### Chained functions {#authchain}

Chained functions combine together functions of more than one subsystem.

For example, when a user login, Content Services tries to match the user's credentials against each of the subsystems in the chain in order.

* If a chain member accepts the credentials, the log in succeeds
* If no chain member accepts, the log in fails

User registry export is also chained. During a synchronize operation, users and groups are exported from each member of the chain supporting user registry export (that is, those of type LDAP) and imported into Content Services. Ordering in the chain is used to resolve conflicts between users and groups existing in the same directory.

> **Note:** If you need to federate against multiple authentication subsystems, it is recommended to use the Identity Service rather than defining multiple subsystems on the authentication chain.

### Default authentication chain {#defaultauthchain}

The default product configuration has a simple chain with one member. This is an instance of the `alfrescoNtlm` subsystem type with and ID of `alfrescoNtlm1`.

This is expressed in the built-in defaults in the `repository.properties` file as:

    ```bash
    authentication.chain=alfrescoNtlm1:alfrescoNtlm
    ```

You can configure the properties of `alfrescoNtlm1` using the `alfresco-global.properties` file.

### Configure the authentication chain

You can add to or completely replace the default authentication chain.

Chained functions combine authentication subsystems. The chain is controlled by the `authentication.chain` global property.
When a user logs in, Content Services tries the user's credentials against each of the subsystems in the order specified
in the chain, until the credentials are accepted (the login is successful) or until each subsystem has been tried
(and the login fails).

If Kerberos is configured along with basic authentication in a chain, all the calls to the repository will only support
Kerberos. The response from the server only contains the `WWW-Authenticate: Negotiate` header.

To enable the fallback mechanism for basic authentication, do the following:

* Set the following property (`true`, by default):

    ```bash
    kerberos.authentication.sso.fallback.enabled=true
    ```

* Send a basic authentication header in all the requests.

    ```bash
    Authorization: Basic <encoded_string>
    ```

    where `<encoded_string>` is a base64 encoded username and password separated by a single colon (:). For more information, see [Basic Authentication Scheme](https://tools.ietf.org/html/rfc2617#section-2).

1. Open the `alfresco-global.properties` file.

2. Locate, or if it does not already exist, create the `authentication.chain` global property.

    This is a comma separated list of the form:

    ```bash
    instance_name1:type1,...,instance_namen:typen
    ```

    for example,

    ```bash
    authentication.chain=alfrescoNtlm1:alfrescoNtlm
    ```

3. Set the property to the required values.

    The default authentication chain specifies one instance of the `alfrescoNtlm` subsystem type with ID `alfrescoNtlm1`.

    For example, set the property to the following value:

    ```bash
    alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
    ```

    When you navigate to the `Alfresco:Type=Configuration,Category=Authentication,id1=manager` MBean in global property overrides, a new authentication subsystem instance called `ldap1` is created and added to the end of the authentication chain.

4. Save the file.

The following examples specify an advanced Active Directory chain, and an advanced LDAP chain.

You can integrate Content Services with Active Directory so that:

* Built-in Content Services users and Windows users can log in, with Content Services taking precedence
* LDAP synchronizes user and group details

1. Configure the following authentication chain:

    ```bash
    alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
    ```

2. Activate chained password-based login and target synchronization (but not authentication) at `ldap1` by setting the following properties:

    * **ldap1**

        `ldap.authentication.active=false`
        `ldap.synchronization.active=true`

You can integrate Content Services with two LDAP directories so that:

* User passwords are validated directly against the LDAP servers for web, SharePoint and FTP login
* LDAP is used to synchronize user and group details from both directories
* Users in the first directory, `ldap1`, take precedence over those in the second directory, `ldap2`

> **Note:** If you're only using a single LDAP provider in your authentication chain, the properties can be included in the `alfresco-global.properties` file. But if you need to include the configuration for more than one LDAP provider, then you need to separate the properties in distinct subsystem configuration in `<configRootShare>/classes/alfresco/subsystems/Authentication/<LDAP Provider Name>/ldap-authentication.properties`.

1. In the `alfresco-global.properties`, specify this setting:

    ```bash
    authentication.chain=ldap1:ldap,ldap2:ldap
    ```

2. Copy [ldap-authentication.properties](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/subsystems/Authentication/ldap/ldap-authentication.properties) to both the `<classpathRoot>/alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties` and `<classpathRoot>/alfresco/extension/subsystems/Authentication/ldap/ldap2/ldap-authentication.properties` files.
3. Edit the properties for `ldap1` and `ldap2` with appropriate settings to complete the configuration. See [LDAP configuration properties](#ldapconfprops) for information on each of the properties.

## Configure authentication subsystems {#configauthsubsystems}

A number of examples demonstrate how to express various authentication configuration requirements in subsystem instances
in the authentication chain. They also explain how the authentication chain integrates the functions of multiple subsystem
instances into a more powerful conglomerate, letting you cater for even the most complex authentication scenarios.

These examples demonstrate the flexibility and power of an authentication chain. You can combine the strengths of a variety
of different authentication protocols and keep the user database synchronized almost transparently.

The authentication configuration examples adopt the following structured approach:

1. Decide the authentication chain composition (required subsystem types, instance names, order of precedence) and express this in the `alfresco-global.properties` file.
2. For each subsystem instance:
    1. Locate the properties files for its subsystem type. These properties files define the configurable properties for that subsystem type and their default values.
    2. Create a folder named after the subsystem instance under the extension folders.
    3. Copy the properties files into your new folder.
    4. Edit the properties files to record the required configuration of the subsystem instance.

### Configure external authentication

Use this information to enable the external authentication subsystem using the `alfresco-global.properties` file and the [Repository Admin Console]({% link content-services/7.2/admin/admin-console.md %}).

**Configuring/enabling external authentication subsystem using the `alfresco-global.properties` file:**

1. Open the `alfresco-global.properties` file.
2. Set the following properties to enable external authentication:

        ```bash
        authentication.chain=external1:external
        external.authentication.proxyUserName=
        external.authentication.enabled=true
        external.authentication.defaultAdministratorUserNames=admin
        external.authentication.proxyHeader=X-Alfresco-Remote-User
        ```

    > **Note:** The default setting for `external.authentication.proxyUserName` is `alfresco-system`. This should only be specified if you're using SSL. See [External authentication and SSO](#extauthsso) for more information.

3. Save the `alfresco-global.properties` file.
4. Restart the Content Services server.

For more information on the external authentication properties, see [external configuration properties](#extauthprops).

**Configuring/enabling external authentication subsystem using the Repository Admin Console:**

To enable external authentication subsystem using the Admin Console, see [configuring external authentication](#configextauthrepoconsole).

#### External authentication and SSO {#extauthsso}

Use this information to understand what we mean by External Authentication and how Single Sign-On (SSO) can be used with this authentication type.

##### What is external authentication?

External authentication uses the Central Authentication Service (CAS), which enables Single Sign-On (SSO), and allows a user to authenticate with a CAS, instead of directly with Content Services. For example, this might be using the `mod_cas` Apache module. For more information about `mod_cas`, see [CAS Apache Module](http://mod-cas.sourceforge.net/){:target="_blank"}.

CAS is usually used with a proxy, for example, the [Apache mod_proxy](https://httpd.apache.org/docs/current/mod/mod_proxy.html){:target="_blank"} module.

External authentication is set with the `authentication.chain` parameter in your `alfresco-global.properties` file to use the `external` authentication subsystem.

To provide SSO, an external authentication system (or CAS) can be integrated Content Services. For example, the identity of the logged-in user is extracted by the CAS, passed to Content Services servlets and extracted using the `HttpServletRequest.getRemoteUser()` method. As a result, when a user connects to Share they're shown their user dashboard, but won't see the Share login page.

The subsystem also allows a proxy user to be configured, so that requests made through this proxy user are made in the name of an alternative user, whose name is carried in a configured HTTP request header. This allows, for example, the Alfresco Share application and other Surf applications to act as a client to an SSO-protected Content Services application and assert the user name in a secure manner.

A disabled user can still login to Alfresco using external authentication. If the external control synchronization is configured appropriately, a user's status of disabled can be synchronized via the LDAP directory. In summary, if an administrator wants to prevent a user from authenticating to Alfresco, then the user should be disabled in Alfresco either directly, or in the LDAP directory that is referenced by the `ldap.synchronization.userAccountStatusProperty` property.

If troubleshooting a user login issue, first check Alfresco to see if the user account is enabled, and then step through the authentication chain to see if the user can successfully authenticate using one of the members of the chain.

For example, if external authentication is the only authentication system in the chain and auto-create missing people is enabled, then the users will be able to authenticate automatically. In other words, users that are not already synchronized to Alfresco will be auto-created and enabled, by default. If the user is subsequently set to disabled (either directly via APIs or via LDAP synchronization), then the user will no longer be able to access Alfresco. The user will also appear as disabled in **Share > Admin Tools > Users**.

> **Note:** Activating external authentication makes Content Services accept external authentication tokens. Make sure that no untrusted direct access to Content Services HTTP or AJP ports is allowed.

Here are two scenarios where external authentication is configured with Content Services and Share. In both scenarios, an HTTP or HTTPS request is sent to an authentication proxy. If authentication is OK, the proxy passes the request to Share using the AJP protocol.

In the first scenario, the Share [endpoint-url]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#connectors-and-endpoints-connectorsendpoints) (`http://localhost:8080/alfresco/wcs`) sends the request directly to Content Services using HTTP and a User Header. No certificate is used and the `external.authentication.proxyUserName` is blank:

    ```bash
    external.authentication.proxyUserName=
    ```

Content Services trusts the header (defined by `external.authentication.proxyHeader`) sent by Share. This scenario is typically used if you want to prohibit direct access to Content Services and enforce using the proxy, for example, by using firewall rules to the proxy.

![external-direct]({% link content-services/images/external-direct.png %})

In the second scenario, the Share [endpoint-url]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#connectors-and-endpoints-connectorsendpoints) (`http://your.server.com/alfresco/wcs`) sends the request back to Apache, using HTTP and a User Header (defined by `external.authentication.proxyHeader`), and a certificate. `external.authentication.proxyUserName` is set:

    ```bash
    external.authentication.proxyUserName=alfresco-system
    ```

Apache uses the certificate to check that the request is coming from Share with the correct user (that is, the value of `external.authentication.proxyUserName`) and forwards the request to Content Services. This scenario is typically used to allow direct access to Share, using HTTPS and the originator (the proxy) sends a client certificate when establishing the SSL tunnel.

![external-indirect]({% link content-services/images/external-indirect.png %})

[Default authentication chain](#defaultauthchain) and [Configuring external authentication](#configextauthrepoconsole)
provide more information on the parameter and the external authentication subsystem.

Using the `external` authentication subsystem means that:

* The complexity of authentication moves to an external software layer (a proxy). Content Services listens to the authenticated user name that it receives using a custom HTTP header, or it reads the CGI `REMOTE_USER` variable that can be passed using the AJP protocol.
* [Configuring external authentication](#configextauthrepoconsole) (using the Admin Console) provides more information on configuring the `external` authentication subsystem.
* Most of the responsibility for authentication is not controlled by Content Services, but controlled by the external software layer. Unless there is a problem when the authenticated user name is transmitted, the issue is located in the external software layer. In these cases, work with your proxy vendor or implementer of the authentication proxy to resolve the issue.

##### How is Single Sign-On (SSO) related to external authentication?

SSO is a property of an authentication scheme. You can use more than one method to set up SSO. For example:

* If you're using Kerberos, you can use either the `kerberos` authentication subsystem, or the `external` authentication subsystem with a proxy that handles Kerberos authentication.
* If you're using CAS, you must use the `external` authentication subsystem with a proxy that handles CAS authentication.

In summary, external authentication and SSO are not interdependent: you can set up external authentication that is not SSO (for example, using an Apache proxy with a `mod_auth_basic` setting), and you can set up an SSO system that is not using the `external` authentication subsystem (for example, using the `kerberos` authentication subsystem).

See [Authentication subsystem types](#authsubsystypes) for a listing of the authentication subsystems and the features that they support.

## How is Alfresco Office Services related to external authentication?

There are some limitations when using Microsoft SharePoint support, as provided by Alfresco Office Services, with the Alfresco `external` authentication subsystem. External authentication can work well when using a web browser client, but not when using the MS Office client. This is because no authentication information is sent with the file URL, and MS Office does not store authentication information, so starts a new authentication process.

An example of this is when using CAS. CAS authenticates using an HTML form and a web browser that follows an HTTP redirect. The web authentication works correctly, but MS Office authentication won't work because it does not permit completion of the form. This problem is caused by the limited set of authentication protocols that MS Office supports.

MS Office supports the following authentication mechanisms:

* HTTP Basic
* HTTP Digest
* NTLM
* Kerberos

NTLM and Kerberos can be used in an SSO environment.

For more information about Alfresco Office Services limitations, see
[Considerations when using Alfresco Office Services]({% link microsoft-office/latest/index.md %}).

#### External configuration properties {#extauthprops}

The external subsystem supports a number of properties.

|Property|Description|
|--------|-----------|
|external.authentication.enabled|A Boolean property that when true indicates that this subsystem is active and will trust remote user names asserted to it by the application server. |
|external.authentication.defaultAdministratorUserNames|A comma separated list of user names who should be considered administrators by default. |
|external.authentication.proxyUserName|The name of the remote user that should be considered the proxy user. Requests made by this user will be made under the identity of the user named in the HTTP Header indicated by the `external.authentication.proxyHeader` property. If not set, then the HTTP Header indicated by the `external.authentication.proxyHeader` property is always assumed to carry the user name.<br><br>**Note:** The default setting for `external.authentication.proxyUserName` is `alfresco-system`, but this should only be specified if you're using SSL. See [External authentication and SSO](#extauthsso) for more information. |
|external.authentication.proxyHeader|The name of the HTTP header that carries the name of a proxied user. The default is `X-Alfresco-Remote-User`, as used by Share. |
|external.authentication.userIdPattern|An optional regular expression to be used to extract a user ID from the HTTP header. The portion of the header matched by the first bracketed group in the regular expression will become the user name. If not set (the default), then the entire header contents are assumed to be the proxied user name.<br><br>For example, use the following setting:<br><br>```external.authentication.userIdPattern=^(.+)@.+$```<br><br>This regular expression will extract everything before the @ sign. For example: `john.doe@alfresco.com => john.doe` or `john@alfresco.com => john`. |

#### Configure Alfresco Share to use an external SSO

Alfresco Share can be configured to accept a user name from an HTTP header provided by an external authentication system
for Single Sign on (SSO).

This task assumes that you've already set up external authentication, as specified in [External configuration properties](#extauthprops).

1. Go to the Share `<web-extension>` directory.

2. Open the `share-config-custom.xml` file.

3. Uncomment the second `<config evaluator="string-compare" condition="Remote">` section.

    > **Note:** There are multiple Remote configuration sections in this file. If you have multiple sections in a configuration file, then the last section is used.

    In this uncommented Remote section:

    1. Set the `alfrescoHeader` connector to use the same value that you defined for your external SSO property in [External configuration properties](#extauthprops):

        Change the `<userHeader>` property to the same value as the `external.authentication.proxyHeader`. This sets the same HTTP header value for both Alfresco Share and the repository.

    2. Set the `alfresco` endpoint to use the `alfrescoHeader` connector:

        1. Change the `<connector-id>` value from `alfrescoCookie` to `alfrescoHeader`
        2. Change the `<endpoint-url>` value to your Alfresco server URL; for example, `http://localhost:8080/alfresco/s`.

    > **Note:** Below is an example file. Review the entries for `userHeader`, `connector-id` and `endpoint-url`.

        ```xml
          <!--
                Overriding endpoints to reference an Alfresco server with external SSO
                enabled
                NOTE: If utilizing a load balancer between web-tier and repository
                cluster,the "sticky sessions" feature of your load balancer must be used.

                NOTE: If alfresco server location is not localhost:8080 then also combine
                changes from the"example port config" section below.
                *Optional* keystore contains SSL client certificate + trusted CAs.
                Used to authenticate share to an external SSO system such as CAS
                Remove the keystore section if not required.

                NOTE: For Kerberos SSO rename the "KerberosDisabled" condition above to
                "Kerberos"

                NOTE: For external SSO, switch the endpoint connector to "AlfrescoHeader"
                    and set the userHeader to the name of the HTTP header
                    that the external SSO uses to provide the authenticated user name.
        -->

        <config evaluator="string-compare" condition="Remote">
            <remote>

                <connector>
                    <id>alfrescoHeader</id>
                    <name>Alfresco Connector</name>
                    <description>Connects to an Alfresco instance using header and cookie-based authentication</description>
                    <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class>
                    <userHeader>X-Alfresco-Remote-User</userHeader>
                </connector>

                <endpoint>
                    <id>alfresco</id>
                    <name>Alfresco - user access</name>
                    <description>Access to Alfresco Repository WebScripts that require user authentication</description>
                    <connector-id>alfrescoHeader</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                </endpoint>

                <endpoint>
                    <id>alfresco-feed</id>
                    <parent-id>alfresco</parent-id>
                    <name>Alfresco Feed</name>
                    <description>Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description>
                    <connector-id>alfrescoHeader</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                </endpoint>

                <endpoint>
                    <id>alfresco-api</id>
                    <parent-id>alfresco</parent-id>
                    <name>Alfresco Public API - user access</name>
                    <description>Access to Alfresco Repository Public API that require user authentication.
                                This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                    <connector-id>alfrescoHeader</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                </endpoint>
            </remote>
        </config>
        ```

    This is another example file, using the cookie session based endpoint.

        ```xml
        <!--
                Overriding endpoints to reference an Alfresco server with external SSO
                enabled
                NOTE: If utilzing a load balancer between web-tier and repository
                cluster,the "sticky sessions" feature of your load balancer must be used.

                NOTE: If alfresco server location is not localhost:8080 then also combine
                changes from the"example port config" section below.
                *Optional* keystore contains SSL client certificate + trusted CAs.
                Used to authenticate share to an external SSO system such as CAS
                Remove the keystore section if not required.

                NOTE: For Kerberos SSO rename the "KerberosDisabled" condition above to
                "Kerberos"

                NOTE: For external SSO, switch the endpoint connector to "AlfrescoHeader"
                    and set the userHeader to the name of the HTTP header
                    that the external SSO uses to provide the authenticated user name.
        -->

        <config evaluator="string-compare" condition="Remote">
            <remote>
                <ssl-config>
                    <keystore-path>alfresco/web-extension/alfresco-system.p12</keystore-path>
                    <keystore-type>pkcs12</keystore-type>
                    <keystore-password> alfresco-system</keystore-password>

                    <truststore-path> alfresco/web-extension/ssl-truststore</truststore-path>
                    <truststore-type>JCEKS</truststore-type>
                    <truststore-password>password</truststore-password>

                    <verify-hostname>true</verify-hostname>
                </ssl-config>

                <connector>
                    <id>alfrescoCookie</id>
                    <name>Alfresco Connector</name>
                    <description>Connects to an Alfresco instance using cookie-based
                                authentication
                    </description>
                    <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class>
                </connector>

                <endpoint>
                    <id>alfresco</id>
                    <name>Alfresco - user access</name>
                    <description>Access to Alfresco Repository WebScripts that require user authentication</description>
                    <connector-id>alfrescoCookie</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                </endpoint>

                <endpoint>
                    <id>alfresco-api</id>
                    <parent-id>alfresco</parent-id>
                    <name>Alfresco Public API - user access</name>
                    <description>Access to Alfresco Repository Public API that require user authentication.
                                This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                    <connector-id>alfrescoCookie</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                </endpoint>
            </remote>
        </config>
        ```

4. Save the file and then restart Share.

    Activating external authentication makes Content Services accept external authentication tokens, make sure that no untrusted direct access to Alfresco HTTP or AJP ports is allowed.

You have configured Share to use an external SSO.

#### Set SSO with client certificates

Use this information to set up SSO with client certificates.

1. Setup Apache as proxy server in front of Content Services and configure it to use SSL as described in [Configuring SSL for a production environment]({% link content-services/7.2/config/repository.md %}#ssl-repo).

2. Activate external authentication as described in [Configuring external authentication](#configextauthrepoconsole).

3. To extend the SSL configuration in httpd.conf to request client authentication and forward the user name as HTTP header, add this configuration to the `<VirtualHost>` node:

        ```bash
        SSLVerifyClient         require
        SSLCACertificateFile    /path/to/your/enterprise-CA.pem
        RequestHeader           append  X-Alfresco-Remote-User  "%{SSL_CLIENT_S_DN_Email}e"
        ```

    This will accept all client certificates that have been signed by the CA identified by the certificate stored in `enterprise-CE.pem`. It will use the email address stored in this certificate as the user name.

### Configure alfrescoNtlm

`alfrescoNtlm` is the subsystem configured by default in the Content Services authentication chain. It performs
authentication based on user and password information stored in the repository database.

The `alfrescoNtlm` subsystem supports the following properties:

| Property | Description |
| -------- | ----------- |
| alfresco.authentication.allowGuestLogin | Specifies whether to allow guest access. |

> **Note:** If you add extra administrator users in the `authority-services-context.xml` file and are using `alfrescoNtlm`, the extra users (other than the admin user) will no longer have administrator rights until you add them to the `ALFRESCO_ADMINISTRATORS` group.

### Configure LDAP

An LDAP subsystem supports two main functions:

* user authentication - checking a user's ID and password using an LDAP bind operation
* user registry export - exposing information about users and groups to the synchronization subsystem

Either of these functions can be used in isolation or in combination. When LDAP authentication is used without user registry export, default Content Services person objects are created automatically for all those users who successfully login. However, they won't be populated with attributes without user registry export enabled. LDAP user registry export is most likely to be used without LDAP authentication when chained with other authentication subsystems. For example, Kerberos against Active Directory, and possibly Samba on top of OpenLDAP.

The user registry export function assumes that groups are stored in LDAP as an object that has a repeating attribute, which defines the distinguished names of other groups, or users. This is supported in the standard LDAP schema using the `groupOfNames` type. See the example LDIF file in [OpenLDAP tips]({% link content-services/7.2/admin/troubleshoot.md %}#openldap-tips).

#### LDAP configuration properties {#ldapconfprops}

Both the `ldap` and `ldap-ad` subsystem types support the following configurable properties.

> **Note:** The defaults for `ldap` are typical for OpenLDAP and Oracle Directory Server, and the defaults for `ldap-ad` are typical for Active Directory.

**LDAP authentication properties**

> **Note:** The `create.missing.people` property in the Alfresco global properties file is set to true by default in Alfresco. This can have the affect of creating users unexpectedly. To avoid this you can override the default setting by changing the property to `create.missing.people property=false`. You can also deselect **Auto Create People on Login** in the Alfresco Admin Console. To do this navigate to **Synchronization Settings** > **Auto Create People on Login**.

| Property | Description |
| -------- | ----------- |
|ldap.authentication.active|This Boolean flag, when `true` enables use of this LDAP subsystem for authentication. It might be that this subsystem should only be used for user registry export, in which case this flag should be set to `false` and you would have to chain an additional subsystem such kerberos to provide authentication functions. |
|ldap.authentication.java.naming.referral|This property specifies how the referrals sent by AD in the search results are handled by Alfresco. The recommended values are:<br><br>`ignore`<br><br>If `ldap.authentication.java.naming.referral=ignore`, the following exception will be thrown when a referral is encountered:<br><br>```javax.naming.PartialResultException: Unprocessed Continuation Reference(s); remaining name 'dc=alfness,dc=com'```<br><br>`follow`<br><br>If `ldap.authentication.java.naming.referral=follow`, Alfresco will automatically follow the referral. To be successful, make sure Alfresco can access the referred server. If this property has not been set, then the default is to follow the referrals.<br><br>`throw`<br><br>If `ldap.authentication.java.naming.referral=throw`, the following exception will be thrown:<br><br>```com.sun.jndi.ldap.LdapReferralException: Continuation Reference; remaining name 'dc=alfness,dc=com'```<br><br>For more information, see [Referrals in the JNDI](https://docs.oracle.com/javase/jndi/tutorial/ldap/referral/jndi.html). |
|ldap.authentication.java.naming.security.authentication|The mechanism to use to authenticate with the LDAP server. This should be set to one of the standard values listed here or one of the values supported by the LDAP provider. Oracle's LDAP provider supports the following SASL mechanisms. The recommended values are:<br><br>`simple`<br><br>The basic LDAP authentication mechanism requiring the user name and password to be passed over the wire unencrypted. You might be able to add SSL for secure access, otherwise this should only be used for testing.<br><br>`DIGEST-MD5`<br><br>More secure RFC 2831 Digest Authentication. Note that with Active Directory, this requires your user accounts to be set up with reversible encryption, not the default setting. |
|ldap.authentication.java.naming.read.timeout|Specifies the read timeout in milliseconds for LDAP operations. If Content Services can't get a LDAP response within that period, it aborts the read attempt. The integer should be greater than zero. If the integer is less than or equal to zero, no read timeout is specified, which is equivalent to waiting for the response infinitely until it is received. |
|ldap.authentication.userNameFormat|Specifies how to map the user identifier entered by the user to that passed through to LDAP.<br><br>If set to an empty string (the default for the ldap subsystem), an LDAP query involving `ldap.synchronization.personQuery` and `ldap.synchronization.userIdAttributeName` will be performed to resolve the DN from the user ID dynamically. This allows directories to be structured and does not require the user ID to appear in the DN.<br><br>If set to a non-empty value, the substring `%s` in this value will be replaced with the entered user ID to produce the ID passed to LDAP. This restricts LDAP user names to a fixed format. The recommended format of this value depends on your LDAP server.<br><br>**Active Directory**<br><br>There are two alternatives:<br><br>*User Principal Name (UPN)*<br><br>These are generally in the format of `<sAMAccountName>@<UPN Suffix>`. If you're unsure of the correct suffix to use, use an LDAP browser, such as Softerra, to browse to a user account and find its `userPrincipalName` attribute. For example:<br><br>```%s@domain```<br><br>*DN*<br><br>This requires the user to authenticate with part of their DN, so might require use of their common name (CN) rather than their login ID. It also might not work with structured directory layouts containing multiple organization units (OUs). For example:<br><br>```cn=%s,ou=xyz,dc=domain```<br><br>**OpenLDAP**<br><br>The format used depends on the value chosen for `ldap.authentication.java.naming.security.authentication`.<br><br>`simple`<br><br>This must be a DN and would be something like the following:<br><br>```uid=%s,ou=People,dc=company,dc=com```<br><br>`DIGEST-MD5`<br><br>Use this value to pass through the entered value as-is:<br><br>```%s```<br><br>When authenticating against LDAP, users are not always in the same subtree of LDAP. In this situation, it is necessary to support authentication against multiple branches of LDAP. For example, some users who can authenticate using `cn=%s,ou=myCity,ou=myState,o=myCompany` but others can authenticate using `cn=%s,ou=ANOTHERCity,ou=myState,o=myCompany`. Set `ldap.authentication.userNameFormat` to be empty (the default), and then it'll derive a query from your personQuery to look up a user by UID. This ensures that you can support users in any branch structure.<br><br>|
|ldap.authentication.allowGuestLogin|Identifies whether to allow unauthenticated users to log in as the 'guest' user. |
|ldap.authentication.java.naming.factory.initial|The LDAP context factory to use. There is no need to change this unless you do not want to use the default Oracle LDAP context factory. |
|ldap.authentication.java.naming.provider.url|The URL to connect to the LDAP server, containing its name and port. The standard ports for LDAP are 389 (and 636 for SSL). For example: `ldap://openldap.domain.com:389`|
|ldap.authentication.escapeCommasInBind|Escape commas in the entered user ID when authenticating with the LDAP server? Useful when using simple authentication and the CN is part of the DN and contains commas. |
|ldap.authentication.escapeCommasInUid|Escape commas in the entered user ID when deriving an internal user ID. Useful when using simple authentication and the CN is part of the DN and contains commas, and the escaped \, is pulled in as part of a synchronize operation. If this option is set to `true` it'll break the default home folder provider as space names can't contain \ (backslash character). |
|ldap.authentication.defaultAdministratorUserNames|A comma separated list of user names to be considered administrators by default. If you're using LDAP for all your users, this maps an LDAP user to be an administrator user. This administrator user can then configure the other admin users or groups by add users and/or groups to the `ALFRESCO_ADMINISTRATORS` group using the Share Admin Tools.<br><br>If you already have a group of administrators in LDAP, you can add the required LDAP group(s)to the `ALFRESCO_ADMINISTRATORS` group. This can be set without a server restart. |
|ldap.authentication.java.naming.security.protocol|This sets the security protocol to use for connecting with the LDAP server. This property has a single value of `ssl`. Set this property to `ssl` if the configuration of truststore is required. Leave this property unused if the truststore configuration is not required (the connection is not secured).<br><br>**Note:** In order to enable SSL, import the SSL certificate from the LDAP provider into a Java truststore and the `truststore.path`, `truststore.passphrase`, and `truststore.type`properties. To download the certificate, use the following command:<br><br>```openssl s_client -connect ldap.foxpass.com:636 > my-ldap.crt```<br><br>To import the certificate into a new keystore, use the following command:<br><br>```keytool -importcert -alias LDAP.HOST.FQDN -file my-ldap.crt -keystore my-keystore-filename -storepass my-pass -storetype JCEKS```|
|ldap.authentication.truststore.path|The path to the truststore file on the file system. |
|ldap.authentication.truststore.passphrase|The password for the truststore. |
|ldap.authentication.truststore.type|The type of the truststore, as specified when generating with keytool or another keystore manager. Must be a standard Java Cryptography Keystore. |

**LDAP synchronization properties**

| Property | Description |
| -------- | ----------- |
|ldap.synchronization.active|This flag enables use of the LDAP subsystem for user registry export functions and decides whether the subsystem will contribute data to the synchronization subsystem. It might be that this subsystem should only be used for authentication, in which case this flag should be set to `false`. |
|ldap.synchronization.java.naming.security.authentication|The authentication mechanism used to connect to the LDAP server when performing user registry exports. In versions earlier than 3.4 versions, this property was the same as `ldap.authentication.java.naming.security.authentication`. The property should use one of the standard values covered in the [Oracle documentation](https://download.oracle.com/javase/6/docs/technotes/guides/jndi/spec/jndi/properties.html#pgfId=999247){:target="_blank"} or one of the values supported by the LDAP provider. Oracle's LDAP provider supports the [SASL mechanisms](https://download.oracle.com/javase/6/docs/technotes/guides/jndi/jndi-ldap.html#SASL). Recommended values are:<br><br>`none`<br><br>Use this option if your LDAP server supports connection without a password. Set to none to allow synchronization by using anonymous bind (note that you'll not also need to set the following two properties). <br><br>`simple`<br><br>This option is the basic LDAP authentication mechanism requiring the user name and password to be passed over the wire unencrypted. You might be able to add SSL for secure access; otherwise, use this option for testing only.<br><br>`DIGEST-MD5`<br><br>This option provides a more secure ([RFC 2831](https://www.ietf.org/rfc/rfc2831.txt)) digest authentication. With Active Directory, this requires your user accounts to be set up with reversible encryption, not the default setting. |
|ldap.synchronization.java.naming.security.principal|The LDAP user to connect as for the export operation, if one is required by the `ldap.synchronization.java.naming.security.authentication` authentication mechanism. This should be in the same format as `ldap.authentication.userNameFormat` but with a real user ID instead of `%s`.<br><br>This is the default principal to use (only used for LDAP sync when `ldap.synchronization.java.naming.security.authentication=simple`): `ldap.synchronization.java.naming.security.principal=cn\=Manager,dc\=company,dc\=com` |
|ldap.synchronization.java.naming.security.credentials|The password for this user, if required. The password for the default principal (only used for LDAP sync when `ldap.synchronization.java.naming.security.authentication=simple`)  ldap.synchronization.java.naming.security.credentials=secret |
|ldap.synchronization.queryBatchSize|If set to a positive integer, this property indicates that RFC 2696 paged results should be used to split query results into batches of the specified size. This overcomes any size limits imposed by the LDAP server. The default value of 1000 matches the default result limitation imposed by Active Directory. If set to zero or less, paged results won't be used. |
|ldap.synchronization.groupQuery|The query to select all objects that represent the groups to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. |
|ldap.synchronization.groupDifferentialQuery|The query to select objects that represent the groups to export that have changed since a certain time. Should use the placeholder `{0}` in place of a timestamp in the format specified by `ldap.synchronization.timestampFormat`. The timestamp substituted will be the maximum value of the attribute named by `ldap.synchronization.modifyTimestampAttributeName` the last time groups were queried. This query is used in differential synchronization mode, which by default is triggered whenever a user is successfully authenticated that does not yet exist. |
|ldap.synchronization.personQuery|The query to select all objects that represent the users to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. |
|ldap.synchronization.personDifferentialQuery|The query to select objects that represent the users to export that have changed since a certain time. Should use the placeholder `{0}` in place of a timestamp in the format specified by `ldap.synchronization.timestampFormat`. The timestamp substituted will be the maximum value of the attribute named by `ldap.synchronization.modifyTimestampAttributeName` the last time users were queried. This query is used in differential synchronization mode, which by default is triggered whenever a user is successfully authenticated that does not yet exist. |
|ldap.synchronization.groupSearchBase|The DN below which to run the group queries. |
|ldap.synchronization.userSearchBase|The DN below which to run the user queries. |
|ldap.synchronization.modifyTimestampAttributeName|The name of the operational attribute recording the last update time for a group or user. |
|ldap.synchronization.timestampFormat|The timestamp format. This varies between directory servers.<br><br>**Active Directory**<br><br>`yyyyMMddHHmmss'.0Z'`<br><br>**OpenLDAP**<br><br>`yyyyMMddHHmmss'Z'`|
|ldap.synchronization.userIdAttributeName|The attribute name on people objects found in LDAP to use as the uid. |
|ldap.synchronization.userFirstNameAttributeName|The attribute on person objects in LDAP to map to the first name property. |
|ldap.synchronization.userLastNameAttributeName|The attribute on person objects in LDAP to map to the last name property. |
|ldap.synchronization.userEmailAttributeName|The attribute on person objects in LDAP to map to the email property. |
|ldap.synchronization.userOrganizationalIdAttributeName|The attribute on person objects in LDAP to map to the organizational ID property. |
|ldap.synchronization.defaultHomeFolderProvider|The default home folder provider to use for people created using LDAP import. |
|ldap.synchronization.groupIdAttributeName|The attribute on LDAP group objects to map to the group name. |
|ldap.synchronization.groupType|The group type in LDAP. The default value is `groupOfNames`. |
|ldap.synchronization.personType|The person type in LDAP. The default value is `inetOrgPerson`. This value only need changing if the `objectclass` for mapping groups and users differs from the default provided by Content Services. Check the documentation of the LDAP server being accessed. |
|ldap.synchronization.groupMemberAttributeName|The attribute in LDAP on group objects that defines the DN for its members. |

**LDAP connection pooling configuration properties**

| Property | Description |
| -------- | ----------- |
|ldap.synchronization.com.sun.jndi.ldap.connect.pool|Use this property to enable or disable connection pooling for synchronization. |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.authentication|A list of space-separated authentication types of connections that may be pooled. Valid types are `none`, `simple`, and `DIGEST-MD5`. |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.debug|A string that indicates the level of debug output to produce. Valid values are `fine` (trace connection creation and removal) and `all` (all debugging information). |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.initsize|The string representation of an integer that represents the number of connections per connection identity to create when initially creating a connection for the identity. |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.maxsize|The string representation of an integer that represents the maximum number of connections per connection identity that can be maintained concurrently. An empty value means no maximum size. |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.prefsize|The string representation of an integer that represents the preferred number of connections per connection identity that should be maintained concurrently. An empty value means no preferred size. |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.protocol|A list of space-separated protocol types of connections that may be pooled. Valid types are `plain` and `ssl`. |
|ldap.pooling.com.sun.jndi.ldap.connect.pool.timeout|The string representation of an integer that represents the number of milliseconds that an idle connection may remain in the pool without being closed and removed from the pool. # Empty value means no timeout, connection stays in pool forever. Bad connections are automatically detected and removed from the pool by the LDAP provider|
|ldap.pooling.com.sun.jndi.ldap.connect.timeout|The string representation of an integer that represents the number of milliseconds to specify how long to wait for a pooled connection. An empty value means the application will wait indefinitely. |

#### Check supported SASL authentication mechanisms

You can check which Simple Authentication and Security Layer (SASL) authentication mechanisms are supported.

1. Using an LDAP browser, such as the one from Softerra, check the values of the `supportedSASLMechanisms` attributes on the root node of your LDAP server.

    > **Note:** The simple authentication method won't be reported because it's not a SASL mechanism.

2. If you use OpenLDAP, you can also query using `ldapsearch`. For example:

        ```bash
        ldapsearch -h localhost -p 389 -x -b "" -s base -LLL supportedSASLMechanisms
        dn:
        supportedSASLMechanisms: DIGEST-MD5
        supportedSASLMechanisms: NTLM
        supportedSASLMechanisms: CRAM-MD5
        ```

#### Synchronize user account status

Use this information to synchronize the enabled or disabled directory user status after an LDAP sync.

Different LDAP directories store data in different formats. For example, Active Directory has an attribute called `userAccountControl` where the second bit (`0x2`) is an [`ACCOUNTDISABLE` flag](https://support.microsoft.com/en-gb/help/305144){:target="_blank"}, Oracle Directory Server has an attribute called `pwdAccountLockedTime`, and LDAP systems derived from Netscape Directory Server (NDS) have a `nsAccountLock` attribute.

The values of these attributes need to be mapped onto a boolean property on the `cm:person` node. To do this,
configure the attributes as follows:

1. Download the [default-synchronization.properties](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/subsystems/Synchronization/default/default-synchronization.properties) file.
2. Open the `<classpathRoot>/alfresco-global.properties` file.
3. Add one of these entries to your configuration, depending on the directory server used. For example:

    * For LDAP-AD, add the following properties to the `alfresco-global.properties` file:

      ```bash
      synchronization.externalUserControl=true
      synchronization.externalUserControlSubsystemName=ldap1
      ```

    * For OpenLDAP, add the following properties to the `alfresco-global.properties` file:

        ```bash
        synchronization.externalUserControl=true
        synchronization.externalUserControlSubsystemName=ldap1
        ldap.synchronization.userAccountStatusProperty=pwdAccountLockedTime
        ldap.synchronization.disabledAccountPropertyValue=000001010000Z
        ```

    * For Netscape Directory Server systems (Oracle, Red Had, 389 DS), add the following properties to the `alfresco-global.properties` file:

        ```bash
        synchronization.externalUserControl=true
        synchronization.externalUserControlSubsystemName=ldap1
        ldap.synchronization.userAccountStatusProperty=nsAccountLock
        ldap.synchronization.disabledAccountPropertyValue=true
        ```

4. Copy this file into the `<extension>` directory.
5. Read the above mentioned property from LDAP and set it in `ldap.synchronization.userAccountStatusProperty`. For example:

    ```bash
    ldap.synchronization.userAccountStatusProperty=nsAccountLock
    ```

6. The next configuration is how to process the value of that property into a boolean true/false value. To do that there is an adapter bean `userAccountStatusInterpreter` that is plugged into the `userRegistry` bean via spring.

    This configuration parameter `ldap.synchronization.userAccountStatusInterpreter` can either be `ldapadUserAccountStatusInterpreter` or `ldapUserAccountStatusInterpreter`. This setting instructs the system how to process the value for `ldap.synchronization.userAccountStatusProperty`.

    * For LDAP-AD:

        ```bash
        ldap.synchronization.userAccountStatusInterpreter=ldapadUserAccountStatusInterpreter
        ```

    * For non-AD LDAP:

        ```bash
        ldap.synchronization.userAccountStatusInterpreter=ldapUserAccountStatusInterpreter
        ```

#### Example: authentication and synchronization with one ldap-ad subsystem

This example addresses the more advanced goal of delegating authentication responsibility to a centralized directory server. Most organizations maintain their user database in a directory server supporting the LDAP protocol, such as Active Directory or OpenLDAP.

When integrated with an LDAP server, Content Services can delegate both the password checking and account setup to the LDAP server, thus opening up Content Services to your entire enterprise. This avoids the need for an administrator to manually set up user accounts or to store passwords outside of the directory server.

To integrate with a directory server, you simply need to include an instance of the `ldap` or `ldap-ad` subsystem types in the authentication chain. Both subsystem types offer exactly the same capabilities and should work with virtually any directory server supporting the LDAP protocol. Their only differences are the default values configured for their attributes. The `ldap` type is pre-configured with defaults appropriate for OpenLDAP, whereas `ldap-ad` is pre-configured with defaults appropriate for Active Directory.

There are two choices in this scenario: replace or add to the authentication chain.

* Replace the authentication chain

    You could remove `alfinst` from the previous example and instead add an instance of `ldap-ad`. This would hand over all authentication responsibility to Active Directory and would mean that the built-in accounts, such as admin and guest, could not be used.

    In this scenario, it would be important to configure at least one user who exists in Active Directory as an administrator and enable the guest account in Active Directory, if guest access were required.

* Add to the authentication chain

    You could instead supplement the existing capabilities of `alfinst` by inserting an `ldap-ad` instance before or after `alfinst` in the chain. This means that you could use the built-in accounts alongside those accounts in the directory server.

    In this scenario, where you chose to position your ldap-ad instance in the chain determines how overlaps or collisions between user accounts are resolved. If an admin account existed in both Content Services and Active Directory, then admin would be Content Services if `alfinst` came first, or Active Directory if the ldap-ad instance came first.

This example uses an Active Directory server and configures an instance of the `ldap-ad` subsystem.

1. This example uses the second option to append an instance of `ldap-ad` to the authentication chain. This instance name is ldap1 and is declared by changing the `authentication.chain` property in the alfresco-global.properties file.

2. Undo any previous modifications to `alfinst`.

3. Add the following properties to `alfresco-global.properties` to configure the `ldap-ad` authentication subsystem:

    ```bash
    authentication.chain=alfinst:alfrescoNtlm,ldap1:ldap-ad

    ldap.authentication.allowGuestLogin=false
    ldap.authentication.userNameFormat=%s@domain.com
    ldap.authentication.java.naming.provider.url=ldap://domaincontroller.domain.com:389
    ldap.authentication.defaultAdministratorUserNames=Administrator,alfresco
    ldap.synchronization.java.naming.security.principal=alfresco@domain.com
    ldap.synchronization.java.naming.security.credentials=secret
    ldap.synchronization.groupSearchBase=ou=Security Groups,ou=Alfresco\,dc=domain,dc=com
    ldap.synchronization.userSearchBase=ou=User Accounts,ou=Alfresco,dc=domain,dc=com
    ```
    There are a large number of configurable properties for `ldap-ad`, which demonstrates the flexibility of Alfresco’s LDAP infrastructure. Luckily, because `ldap-ad` already has sensible defaults configured for a typical Active Directory set up, there are only a few edits you must make to tailor the subsystem instance to your needs.

    The following table is a summary of the settings that have been changed:

    | Property | Description |
    | -------- | ----------- |
    | ldap.authentication.allowGuestLogin | Enables / disables unauthenticated access. |
    | ldap.authentication.userNameFormat | A template that defines how user IDs are expanded into Active Directory User Principal Names (UPNs) containing a placeholder `%`s, which stands for the unexpanded user ID. A UPN generally consists of the user’s account ID followed by an `@` sign and then the domain’s UPN suffix. You can check the appropriate UPN suffix for your domain by connecting to the directory with an LDAP browser, browsing to a user account, and looking at the value of the `userPrincipalName` attribute. |
    | ldap.authentication.java.naming.provider.url | An LDAP URL containing the host name and LDAP port number (usually 389) of your Active Directory server |
    | ldap.authentication.defaultAdministratorUserNames | A list of user IDs who should be given administrator privileges by default. Another administrator can include more users as administrators by adding those users to the `ALFRESCO_ADMINISTRATORS` group. |
    | ldap.synchronization.java.naming.security.principal | The UPN for an account with privileges to see all users and groups. This account is used to retrieve the details of all users and groups in the directory so that it can synchronize its internal user and authority database. Passwords are never compromised and remain in the directory server. |
    | ldap.synchronization.java.naming.security.credentials | The password for the previous account|
    | ldap.synchronization.groupSearchBase | The Distinguished Name (DN) of the Organizational Unit (OU) below which security groups can be found. You can determine the appropriate DN by browsing to security groups in an LDAP browser. |
    | ldap.synchronization.userSearchBase | The distinguished name (DN) of the Organizational Unit (OU) below which user accounts can be found. You can determine the appropriate DN by browsing to user accounts in an LDAP browser. |

##### Apply ldap-ad example

This example demonstrates how you can further delegate authentication responsibility to Active Directory, without the automatic sign-on capabilities that are available to internal users.

1. Restart the server.

    If you watch the output from Tomcat in the `alfresco.log` in the installation directory, you'll eventually see lines similar to the following:

    ```bash
    13:01:31,225 INFO
    [org.alfresco.repo.management.subsystems.ChildApplicationContextFactory]
    Starting 'Synchronization' subsystem, ID: [Synchronization, default]

    ...

    13:01:49,084 INFO
    [org.alfresco.repo.security.sync.ChainingUserRegistrySynchronizer]
    Finished synchronizing users and groups with user registry 'ldap1'

    13:01:49,084 INFO
    [org.alfresco.repo.security.sync.ChainingUserRegistrySynchronizer]
    177 user(s) and 19 group(s) processed

    13:01:49,131 INFO
    [org.alfresco.repo.management.subsystems.ChildApplicationContextFactory]
    Startup of 'Synchronization' subsystem, ID: [Synchronization, default] complete
    ```

    This is output is from the Synchronization subsystem, the subsystem responsible for synchronizing the internal user and authority database with all user registries in the authentication chain. Since the authentication chain now provides a user registry, the Synchronization subsystem has some work to do when Content Services starts up.

2. From the example logs, notice that the Synchronization subsystem automatically created 177 users and 19 groups using attributes, such as email address and group memberships, retrieved from Active Directory through an LDAP query. This reduces the workload of the administrator user.

    > **Note:** The Synchronization subsystem uses an incremental timestamp-based synchronization strategy, meaning that it only queries for changes since the last synchronization run. So after the first start up, further synchronization runs can be almost instantaneous. Because synchronization runs are also triggered by a scheduled nightly job and whenever an unknown user successfully authenticates, you should find that Content Services always stays synchronized with hardly any effort.

    Now, if you enter the URL: `http://localhost:8080/share` into your browser, you can log in using the ID and password of any of the Active Directory users.

    >**Important:** Passwords are validated through an LDAP bind operation on Active Directory in real time. Passwords for Active Directory users are not stored locally.

3. Navigate to a user profile.

    Notice that attributes such as email address were populated automatically from Active Directory.

#### Example: authentication and synchronization with two ldap-ad subsystems

This example uses one Active Directory server and shows authentication as well as user registry export (synchronization) from two ldap-ad subsystems.

The two ldap-ad subsystems used are ad1 and ad2. Both these subsystems use the same Active Directory server but different locations within it (search bases).

1. Add the following properties to the `alfresco-global.properties` file.

    ```bash
    authentication.chain=alfinst:alfrescoNtlm,ad1:ldap-ad,ad2:ldap-ad
    ```

2. Create the properties files to configure `ad1`:

    ```bash
    mkdir <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad1

    cd /d <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad1

    copy <InstallLocation>\tomcat\webapps\alfresco\WEB-INF\lib*.properties
    ```

    A single file called `ldap-ad-authentication.properties` now appears in the `ad1` directory. You can edit this file to define your LDAP set up.

    The following lines show the set of properties you'll typically need to edit and how you might set them for a domain controller for a fictitious domain called `domain.com` for `ldap-ad` subsystem `ad1`.

    ```bash
    ldap.authentication.allowGuestLogin=false
    ldap.authentication.userNameFormat=%s@domain.com
    ldap.authentication.java.naming.provider.url=ldap://domaincontroller.domain.com:389
    ldap.authentication.defaultAdministratorUserNames=Administrator,alfresco
    ldap.synchronization.java.naming.security.principal=alfresco@domain.com
    ldap.synchronization.java.naming.security.credentials=secret
    ldap.synchronization.groupSearchBase=ou=ad1,ou=Alfresco\
    ,dc=domain,dc=com
    ldap.synchronization.userSearchBase=ou=ad1,ou=Alfresco,dc=domain,dc=com
    ```

3. Create the properties files to configure `ad2`:

    ```bash
    mkdir <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad2

    cd /d <installLocation>\tomcat\shared\classes\alfresco\extension\subsystems\
    Authentication\ldap-ad\ad2

    copy <InstallLocation>\tomcat\webapps\alfresco\WEB-INF\lib*.properties
    ```

    A single file called `ldap-ad-authentication.properties` now appears in your `ad2` directory. You can edit this file to define your LDAP set up.

    The following lines show the set of properties you'll typically need to edit and how you might set them for a domain controller for a fictitious domain called `domain.com` for `ldap-ad` subsystem `ad2`.

    ```bash
    ldap.authentication.allowGuestLogin=false
    ldap.authentication.userNameFormat=%s@domain.com
    ldap.authentication.java.naming.provider.url=ldap://domaincontroller.domain.com:389
    ldap.authentication.defaultAdministratorUserNames=Administrator,alfresco
    ldap.synchronization.java.naming.security.principal=alfresco@domain.com
    ldap.synchronization.java.naming.security.credentials=secret
    ldap.synchronization.groupSearchBase=ou=ad2,ou=Alfresco\
    ,dc=domain,dc=com
    ldap.synchronization.userSearchBase=ou=ad2,ou=Alfresco,dc=domain,dc=com
    ```

### Configure Kerberos

The Java Authentication and Authorization Service (JAAS) is used within the Kerberos subsystem to support Kerberos authentication of user names and passwords. You can choose to use Kerberos against an Active Directory server in preference to LDAP or alfrescoNtlm as it provides strong encryption without using SSL. It would still be possible to export user registry information using a chained LDAP subsystem.

Use this information to enable Kerberos with SSO.

If you want to enable Kerberos without SSO, you'll be authenticated using LDAP AD and the password will be sent to the LDAP AD in clear text.

This information assumes that your LDAP AD server is active and available and will be used for two reasons in Alfresco.

1. For importing users - Active Directory is used for importing the users in Alfresco.
2. For communicating with the Key Distribution Center (KDC) - In most cases, KDC runs on the Active Directory server, so it needs to be accessible by Alfresco. When Alfresco receives a Kerberos authentication request, it uses Active Directory to import all the users that you're authenticating against into Alfresco.

Active Directory is not used for LDAP authentication; it is used for Kerberos authentication.

#### Enable Kerberos authentication

Use this information to enable and configure Kerberos authentication.

> **Note:** These instructions assume that you want to use SSO Kerberos.

Kerberos configuration requires the following main tasks.

* Step 1: [Active Directory configuration (by Windows administrators)](#configkerberos-step1)
* Step 2: [Configuring Alfresco on a single node using the Admin Console (by Alfresco administrator)](#configkerberos-step2)
* Step 3: [Configuring Alfresco Share Kerberos SSO](#configkerberos-step3)
* Step 4: [Client configuration (by enterprise system administrator or Alfresco Administrator)](#configkerberos-step4)

**How Kerberos sits in the overall authentication chain?**

If you use Kerberos for authentication and LDAP AD for synchronizing the user accounts in to Alfresco, you must disable LDAP authentication. If you're using SSO and do not disable LDAP authentication, Kerberos authentication will fail.

In order to use all the benefits of Kerberos SSO, enable Kerberos using Directory Management in the Admin Console.

1. In the **Repo Admin Console**, click **Directory Management** under Directories.

    You see the **Directory Management** page.

2. Under **Authentication Chain**, specify a name and set the type to **Kerberos**.

    > **Note:** When you add the authentication types, make sure they're in the following order: Kerberos, LDAP AD, and alfrescoNtlm.

3. Click **Add**, and then **Save** to add the new Kerberos type element in the authentication chain list.

    ![directory-mgmt]({% link content-services/images/directory-mgmt.png %})

4. Select **Kerberos** from **Browser Based Automatic Login**.

5. For configuring Kerberos configure Kerberos using the configuration properties in the Admin Console, see [Configuring Kerberos](#manageauthdirsconfigkerberso).

##### Step 1. Configure Kerberos with Active Directory {#configkerberos-step1}

You can set up accounts for use by Content Services on a Windows domain controller running Active Directory.

These instructions also apply to simple non-clustered installations, where a single `alfresco.war` and `share.war` run on a single host.

These instructions use the following naming conventions for the example server, `server1.alfresco.org`:

* `<host>` is the server host name (without domain name suffix). For example, `server1`.
* `<domain>` is the DNS domain. For example, `alfresco.org`.
* `<domainnetbios>` is the Windows domain NetBIOS name. For example, `alfresco`.
* `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

Follow these instructions to configure Kerberos with Microsoft Windows Active Directory:

1. Create accounts for the SSO authentication filters for the server that will run either the repository tier web application (`alfresco.war`) or the Share web application (`share.war`).

    1. In the Active Directory Users and Computers application, navigate to the **Action > New > User** menu, then enter the full name as `HTTP <host>` and the user login name as `http<host>`.

    2. Click **Next**.

    3. Enter a password.

    4. Enable **Password never expires** and disable **User must change password at next logon**.

    5. Click **Next**.

    6. Click **Finish**.

    7. Right-click the new user account name, and then select **Properties**.

    8. Select the **Account** tab and enable the **Do not require Kerberos preauthentication** option in the **Account Options** section.

    9. From the command prompt, use the `ktpass` utility to generate key tables for this account as shown:

        ```bash
        ktpass -princ HTTP/<host>.<domain>@<REALM> -pass <password> -mapuser
        <domainnetbios>\http<host> -crypto all -ptype KRB5_NT_PRINCIPAL -out
        c:\temp\http<host>.keytab -kvno 0
        ```

    10. Create the Service Principal Names (SPN) for the account using the `setspn` utility.

        ```bash
        setspn -a HTTP/<host> http<host>
        setspn -a HTTP/<host>.<domain> http<host>
        ```

    11. In the Active Directory Users and Computers application, right click on the `http<host>` user and select **Properties**.

    12. Select the **Delegation** tab. If you can't see the **Delegation** tab, do one or both of the following:

        * Check that you ran the specified `setspn` command correctly. Delegation is only intended to be used by service accounts, which should have registered SPNs, as opposed to a regular user account which typically does not have SPNs.
        * Raise the functional level of your domain to Windows Server 2012 R2 x64. To do this:
            * Open **Active Directory Domains and Trusts**.
            * In the console tree, right-click the applicable domain and then click **Raise Domain Functional Level**.
            * In **Select an available domain functional level**, click **Windows Server 2012**, and then click **Raise**.

    13. In the user **Delegation** tab, select the **Trust this user for delegation to any service (Kerberos only)** check box.

2. Copy the key table files created in step 1 to the servers they were named after. Copy the files to a protected area, such as `C:\etc\` or `/etc`.

##### Step 2. Configure Kerberos on Alfresco server {#configkerberos-step2}

As an Alfresco administrator, you need to configure Kerberos on the Alfresco server that will be running either the repository tier web application (`alfresco.war`) or the Share web application (`share.war`).

These instructions use the following naming conventions for the example server, `server1.alfresco.org`:

* `<host>` is the server host name (without domain name suffix). For example, `server1`.
* `<domain>` is the DNS domain. For example, `alfresco.org`.
* `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

In this example, our Windows domain controller/ Active Directory/ KDC host name is `adsrv.alfresco.org`. The Kerberos ini file for Linux is `/etc/krb5.conf`.

1. Set up the Kerberos ini file to point to the Windows domain controller.

    The default location is `%WINDIR%\krb5.ini`, where `%WINDIR%` is the location of your Windows directory, for example, `C:\Windows\krb5.ini`. If the file does not already exist (for example, if the Kerberos libraries are not installed on the target server), you must copy these over or create them from scratch. See [Kerberos Help](http://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/krb5_conf.html) for more information on the `krb5.conf` file.

    ```bash
    [libdefaults]
    default_realm = ALFRESCO.ORG
    default_tkt_enctypes = rc4-hmac
    default_tgs_enctypes = rc4-hmac
    [realms]
    ALFRESCO.ORG = {
       kdc = adsrv.alfresco.org
       admin_server = adsrv.alfresco.org
    }
    [domain_realm]
    adsrv.alfresco.org = ALFRESCO.ORG
    .adsrv.alfresco.org = ALFRESCO.ORG
    ```

    > **Note:** Specify the realm in uppercase.

2. Set up the Java login configuration file.

    For Tomcat, in the Java security folder (for example, `<installLocation>/java/conf/security`), create a file named `java.login.config` with entries as shown in the following example.

    Only include `ShareHTTP` if the server is to run the Share web application (`share.war`). The `AlfrescoHTTP` is always needed.

    ```json
    Alfresco {
       com.sun.security.auth.module.Krb5LoginModule sufficient;
    };
    AlfrescoHTTP
    {
       com.sun.security.auth.module.Krb5LoginModule required
       storeKey=true
       useKeyTab=true
       doNotPrompt=true
       keyTab="C:/etc/http<host>.keytab"
       principal="HTTP/<host>.<domain>";
    };
    ShareHTTP
    {
       com.sun.security.auth.module.Krb5LoginModule required
       storeKey=true
       useKeyTab=true
       doNotPrompt=true
       keyTab="C:/etc/http<host>.keytab"
       principal="HTTP/<host>.<domain>";
    };

    com.sun.net.ssl.client {
       com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    other {
       com.sun.security.auth.module.Krb5LoginModule sufficient;
    };
    ```

3. To enable the login configuration file, locate and edit the following line in the main Java security configuration file, `java\conf\security\java.security`.

    ```bash
    login.config.url.1=file:/<installLocation>/java/conf/security/java.login.config
    ```

    > **Note:** Make sure that you provide the full file path instead of using variables.

4. If the Content Services server is not part of the Active Directory domain, ensure that its clock is kept in sync with the domain controller's, for example, by configuring the domain controller as an NTP server.

5. To complete the Kerberos SSO tasks on the Alfresco server, see [Configuring Alfresco Share Kerberos SSO](#configkerberos-step3).

6. Use **Directory Management** in the **Repo Admin Console** to [enable Kerberos authentication](#manageauthdirsconfigkerberso) and specify the HTTP password.

    > **Note:** Do not change the values of **User Config Entry Name** and **Kerberos Authentication Realm**. If you do make a change, the values must match the entries in the Java login configuration file.

##### Step 3. Configure Alfresco Share Kerberos SSO {#configkerberos-step3}

You can configure the Alfresco Share server and Active Directory server to work with Kerberos Single Sign On (SSO).

1. Configure the Content Services server.

2. Configure Share.

    1. Go to the Share `<web-extension>` directory.

    2. Open the `share-config-custom.xml` file.

    3. Replace the `realm` and `endpoint-spn` options with the correct values for the AlfrescoHTTP user (used to create the keytab files). The `realm` value should be capitalized.

    4. Uncomment both the `<config evaluator="string-compare" condition="Remote">` sections.

        ```xml
           <config evaluator="string-compare" condition="Remote">
              <remote>
                 <endpoint>
                    <id>alfresco-noauth</id>
                    <name>Alfresco - unauthenticated access</name>
                    <description>Access to Alfresco Repository WebScripts that do not require authentication</description>
                    <connector-id>alfresco</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>none</identity>
                 </endpoint>
                 <endpoint>
                    <id>alfresco</id>
                    <name>Alfresco - user access</name>
                    <description>Access to Alfresco Repository WebScripts that require user authentication</description>
                    <connector-id>alfresco</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>user</identity>
                 </endpoint>
                 <endpoint>
                    <id>alfresco-feed</id>
                    <name>Alfresco Feed</name>
                    <description>Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description>
                    <connector-id>http</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <basic-auth>true</basic-auth>
                    <identity>user</identity>
                 </endpoint>

                <endpoint>
                   <id>alfresco-api</id>
                   <parent-id>alfresco</parent-id>
                   <name>Alfresco Public API - user access</name>
                   <description>Access to Alfresco Repository Public API that require user authentication.
                     This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                   <connector-id>alfresco</connector-id>
                   <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                   <identity>user</identity>
                </endpoint>
              </remote>
           </config>
           <config evaluator="string-compare" condition="Remote">
              <remote>
                 <ssl-config>
                     <keystore-path>alfresco/web-extension/alfresco-system.p12</keystore-path>
                     <keystore-type>pkcs12</keystore-type>
                     <keystore-password> alfresco-system</keystore-password>

                     <truststore-path> alfresco/web-extension/ssl-truststore</truststore-path>
                     <truststore-type>JCEKS</truststore-type>
                     <truststore-password>password</truststore-password>

                     <verify-hostname>true</verify-hostname>
                 </ssl-config>

                 <connector>
                    <id>alfrescoCookie</id>
                    <name>Alfresco Connector</name>
                    <description>Connects to an Alfresco instance using cookie-based authentication</description>
                    <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class>
                 </connector>
                 <connector>
                    <id>alfrescoHeader</id>
                    <name>Alfresco Connector</name>
                    <description>Connects to an Alfresco instance using header and cookie-based authentication</description>
                    <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class>
                    <userHeader>SsoUserHeader</userHeader>
                 </connector>
                 <endpoint>
                    <id>alfresco</id>
                    <name>Alfresco - user access</name>
                    <description>Access to Alfresco Repository WebScripts that require user authentication</description>
                    <connector-id>alfrescoCookie</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/wcs</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                 </endpoint>
                 <endpoint>
                    <id>alfresco-api</id>
                    <parent-id>alfresco</parent-id>
                    <name>Alfresco Public API - user access</name>
                    <description>Access to Alfresco Repository Public API that require user authentication.
                      This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                    <connector-id>alfresco</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                    <identity>user</identity>
                    <external-auth>true</external-auth>
                 </endpoint>
              </remote>
           </config>
        ```

        > **Note:** To make sure the XML code looks correct, use an XML validator before saving the file.

    5. Locate the `<!-- Kerberos settings -->` section and replace `condition=KerberosDisabled` with `condition=Kerberos`.

        ```xml
        <!-- Kerberos settings -->
           <!-- To enable kerberos rename this condition to "Kerberos" -->
           <config evaluator="string-compare" condition="Kerberos" replace="true">
              <kerberos>
        ```

    6. Make sure you've set up the Java login configuration file for Share to work, as shown in [Configuring Kerberos on Alfresco server](#configkerberos-step2).

    7. Restart the Content Services server.

3. Make sure you've configured Active Directory. See [Configuring Kerberos with Active Directory](#configkerberos-step1).

4. Configure the Kerberos client. See [Kerberos client configuration](#configkerberos-step4).

##### Step 4. Kerberos client configuration {#configkerberos-step4}

Configure the Kerberos client authentication on Windows using Chrome, Internet Explorer, WebDav, and Firefox browsers.

This task can be performed by the enterprise system administrator or the Alfresco Administrator as a part of the group policy. The enterprise domain/system administrator needs to configure the Kerberos client on each machine. The Alfresco administrator can then check, in a test environment ,if the client is working properly.

> **Note:** If you're using Mac OS X, note that Microsoft Office for Mac does not support Kerberos protocol as a method of authentication.

**Kerberos client configuration for Chrome**

When using Chrome on Windows to access Share, if the command-line switch is not present, the permitted list consists of those servers in the Local Machine or Local Intranet security zone. This is the behavior in Internet Explorer. For example, when the host in the URL includes a "`.`" character, it is outside the Local Intranet security zone. Treating servers that bypass proxies as being in the Intranet zone is currently not supported.

On Windows, HTTP authentication is achieved by adding the Kerberos delegation server allowlist policy, `AuthNegotiateDelegateAllowlist`. Note that the `AuthNegotiateDelegateAllowlist` policy:

* Specifies the servers that Chrome may delegate to
* Has a Windows registry location of `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\AuthNegotiateDelegateAllowlist`
* Has separate multiple server names with commas
* Allows wildcards (*)
* If you do not set this policy, Chrome does not delegate user credentials, even if a server is detected as Intranet

To set the `AuthNegotiateDelegateAllowlist` policy, follow these steps:

1. Download the Administrative policy template from [http://dl.google.com/dl/edgedl/chrome/policy/policy_templates.zip](http://dl.google.com/dl/edgedl/chrome/policy/policy_templates.zip).
2. Use the command line, `gpedit.msc` to open the local group policy management.
3. In the **Group Policy Editor** console tree, navigate to **Local Computer Policy > Computer Configuration > Administrative Templates**.
4. Right click on **Administrative Templates**.
5. Click **Add/Remove Templates**.
6. Click the **Add** button.
7. Select `windows/adm/en-US/chrome.adm` from the `policy_templates.zip` download.
8. In the **Local Computer Policy Editor** console tree, navigate to **Local Computer Policy > Computer Configuration > Administrative Templates > Classic Administrative Templates (ADM) > Google > Google Chrome > Policies for HTTP Authentication > Kerberos delegation server allowlist**.
9. On the **Kerberos delegation server allowlist** window, click **Enabled**.
10. Specify your Share server name(s) as value in **Kerberos delegation server allowlist**.
11. To activate the policy, open Chrome.
12. Type `chrome://policy` to list the settings as viewed by Chrome.

When using Chrome on Linux as your client, follow these steps:

1. Create a ticket on the Linux client.

    ```bash
    kinit -f -p user1
    klist Ticket cache: FILE:/tmp/krb5cc_1000 Default principal: user1@EXAMPLE.FOO
    Valid starting Expires Service principal 14/12/2012 12:10 14/12/2012 22:10 krbtgt/EXAMPLE.FOO@EXAMPLE.FOO renew until 15/12/2012 12:10
    ```

2. To use Alfresco Share, use:

    ```bash
    google-chrome --auth-server-allowlist=madona:8080 --auth-negotiate-delegate-allowlist=madona:8080
    http://madona:8080/alfresco
    ```

**Kerberos client configuration for Internet Explorer**

To configure Internet Explorer to use Kerberos authentication, rather than NTLM, ensure that:

* Content Services web server is in the Local Intranet security zone.

    Check **Tools > Internet Options > Security > Local Intranet > Sites > Advanced**, and then add the necessary domain name, for example, `http://server.com` or `http://*.company.com`.

* Automatic log on is enabled.

    Check **Tools > Internet Options > Security > Local Intranet > Custom Level > User Authentication > Logon**, and then select **Automatic logon with current user name and password**.

> **Note:** Microsoft Office for Mac does not support Kerberos protocol as a method of authentication.

**Kerberos client configuration for Firefox**

To ensure that Firefox works with Windows on the Share URL with Kerberos SSO, modify the following variables in the `about:config` special URL:

```bash
network.negotiate-auth.delegation-uris
network.negotiate-auth.trusted-uris
network.negotiate-auth.using-native-gsslib
```

For example:

![auth-kerberos-clientconfig]({% link content-services/images/auth-kerberos-clientconfig.png %})

When using Firefox on Linux, add your server name to `network.negotiate-auth.trusted-uris` and get a Kerberos ticket
using the `kinit` command:

```bash
kinit -f <username>
```

For example, `kinit -f user1`, where `user1` is an Active Directory user. If the client and the server are on the
same machine, go to the external interface. The loopback interface won't be able to authenticate.
View your tickets using `klist`.

> **Note:** The ticket might correspond to a different user than your Linux user name.

**Kerberos client configuration for WebDav**

To enable a Windows Vista or Windows 7 computer to use WebDav access to a fully qualified domain name (FQDN) site,
ensure that you create a registry entry:

1. Click **Start**, type regedit in the **Start Search** box, and click **ENTER**.
2. Locate and click the following registry subkey:

    ```bash
    HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters
    ```

3. From the **Edit** menu, point to **New**, and click **Multi-String Value**.
4. Type `AuthForwardServerList`, and then press **ENTER**.
5. From the **Edit** menu, click **Modify**.
6. In the **Value data** box, type the URL of the server that hosts the Web share, and click **OK**.

    > **Note:** You can type a list of URLs in the **Value** data  box. For example, the following is a sample URL list:

    ```bash
    http://*.domain.local
    *.domain.local
    ```

7. Exit Registry Editor.
8. Restart the WebClient (WebDav) service after you modify the registry.

    After creating this registry entry, WebDav works with the following URLs:

    ```http
    http://alfvo.domaim.local:8080/alfresco/webdav
    http://alfvo:8080/alfresco/webdav
    ```

    > **Note:** Use and test Microsoft Office option: Open a document in Alfresco Share, click Edit in MS Office. The expected result is that the document should open.

#### Kerberos configuration properties

To enable full Kerberos support in Content Services and the SSO authentication filters, each need a Kerberos service ticket.

The Kerberos subsystem supports the following properties:

| Property | Description |
| -------- | ----------- |
| kerberos.authentication.realm | The Kerberos realm with which to authenticate. The realm should be the domain name in upper case; for example, if the domain is `alfresco.org` then the realm should be `ALFRESCO.ORG`. |
| kerberos.authentication.sso.enabled | A value of `true` enables SPNEGO/Kerberos based Single Sign On (SSO) functionality in the web client. If the value is `false` and no other members of the authentication chain support SSO, password-based login is used. |
| kerberos.authentication.sso.fallback.enabled | If SSO fails, a fallback authentication mechanism is used. The default value is `true`. |
| kerberos.authentication.user.configEntryName | The name of the entry in the JAAS configuration file that is used for password-based authentication. The default value `Alfresco` is recommended. |
| kerberos.authentication.http.configEntryName | The name of the entry in the JAAS configuration file that is used for web-based Single-Sign On (SSO). The default value `AlfrescoHTTP` is recommended. |
| kerberos.authentication.defaultAdministratorUserNames | A comma separated list of user names that are treated as administrators by default. |
| kerberos.authentication.browser.ticketLogons | Authentication using a ticket parameter in the request URL. The default value is `true`. Note that WebDAV URLs always accept ticket parameters. |
| kerberos.authentication.stripUsernameSuffix | A value of `true` strips the `@domain` suffix from Kerberos authenticated user names in SPP, WebDAV and the Web Client. A value of `false` enables a multi-domain customer to use the `@domain` suffix. |

For Kerberos to work with user names that contain non-ASCII characters, add the following option to `JAVA_OPTS` for the Share JVM:

```bash
-Dsun.security.krb5.msinterop.kstring=true
```

#### Configure cross-domain support for Kerberos

Use this information to configure Kerberos authentication in a multi-domain environment.

Configuring cross-domain support for Kerberos SSO requires two-way trust between the active domains.

1. Add realm information for the trusted domain into your `krb5.ini` file:

    In the `[realms]` section, where `domain2.local` is the name of your second trusted domain:

    ```bash
    [realms]
    ...
    DOMAIN2.LOCAL = {
    kdc = ad2.domain2.local:88
    admin_server = ad2.domain2.local:749
    default_domain = domain2.local
    }
    ```

    and in the `[domain_realm]` section:

    ```bash
    [domain_realm]
    ...
    .domain2.local = DOMAIN2.LOCAL
    domain2.local = DOMAIN2.LOCAL
    ```

2. Restart the server.

    When the server has restarted, check that you can access Alfresco Share from both domains.

#### Debug Kerberos

If you've configured Share correctly, you should see your user dashboard in Share.

You can debug Kerberos issues using the log4j properties file. This file is located at `<installLocation>/tomcat/shared/classes/alfresco/extension/custom-log4j.properties.sample`.

Rename the `custom-log4j.properties.sample` file to `custom-log4j.properties` file and add the required configuration. For example:

```bash
log4j.logger.org.alfresco.web.app.servlet.KerberosAuthenticationFilter=debug
log4j.logger.org.alfresco.repo.webdav.auth.KerberosAuthenticationFilter=debug
```

The following is a sample login output:

```bash
18:46:27,915 DEBUG [app.servlet.KerberosAuthenticationFilter] New Kerberos auth request from 192.168.4.95 (192.168.4.95:38750)
18:46:28,063 DEBUG [app.servlet.KerberosAuthenticationFilter] User user1 logged on via Kerberos

```

### Configure Identity Service

Content Services can be configured to authenticate using the Identity Service by configuring the authentication chain and `alfresco-global.properties` file.

The [Identity Service]({% link identity-service/latest/index.md %}) allows you to configure user authentication between a supported LDAP provider or SAML identity provider and the Identity Service for Single Sign On (SSO) capabilities.

The Identity Service needs to be [deployed]({% link identity-service/latest/install/index.md %}) and [configured]({% link identity-service/latest/config/index.md %}) with an identity provider before being set up with other Alfresco products.

Once the Identity Service has been deployed, there are two steps to configure Content Services to authenticate with it:

* Configure the [authentication chain](#authchain) to the only supported value for the Identity Service: `authentication.chain=identity-service1:identity-service,alfrescoNtlm1:alfrescoNtlm`

    >**Important:** The authentication chain can't contain any other values, such as Kerberos or SAML, when using the Identity Service.

* Configure the [`alfresco-global.properties` file](#isprops)

> **Note:** See the [supported platforms]({% link content-services/7.2/support/index.md %}) page for the compatibility between Content Services and Identity Service.

#### Identity Service configuration properties {#isprops}

Use this information to configure Content Services to authenticate using Identity Service.

Configure the `alfresco-global.properties` file using the below properties:

> **Note:** See the Keycloak documentation for a [full list of possible properties](https://www.keycloak.org/docs/4.8/securing_apps/index.html#_java_adapter_config).

| Property | Description |
| -------- | ----------- |
| identity-service.authentication.enabled | Enable or disable authentication via the Identity Service. The default value  is `true`. |
| identity-service.authentication.validation.failure.silent | Sets whether token validation failure is silent. The default value  is `true`. |
| identity-service.authentication.defaultAdministratorUserNames | The default administrator user name. The default value  is `admin`. |
| identity-service.authentication.allowGuestLogin | Sets whether guest logins are allowed. The default value  is `true`. |
| identity-service.authentication.enable-username-password-authentication | Enable username and login password authentication. The default value  is `true`. |
| identity-service.enable-basic-auth | Enable or disable basic authentication fallback. If set to `true` then a secret must also be provided. The default value  is `true`. |
| identity-service.auth-server-url | Base URL of the Identity Service server in the format `https://{server}:{port}/auth`. The default value is `http://localhost:8180/auth`. |
| identity-service.realm | Name of the realm configured in the Identity Service. The default value  is `alfresco`. |
| identity-service.ssl-required | Sets whether communication to and from the Identity Service server is over HTTPS. Possible values are `all` for all requests, `external` for external requests or `none`. This property needs to match the equivalent setting for **Require SSL** in your realm within the Identity Service administration console. The default value  is `none`. |
| identity-service.resource | The **Client ID** for the client created within your realm that points to Content Services. The default value  is `alfresco`. |
| identity-service.public-client | The adapter won't send credentials for the client to the Identity Service if this is set to `true`. The default value  is `true`. |

## Configure synchronization

The synchronization subsystem manages the synchronization of Content Services with all the user
registries (LDAP servers) in the authentication chain.

The synchronization subsystem supports three modes of synchronization:

| Synchronization mode | Description |
| -------------------- | ----------- |
| Full | All users and groups are queried, regardless of when they were last modified. All local copies of these users and groups already existing are then updated and new copies are made of new users and groups. Since processing all users and groups in this manner can be fairly time consuming, this mode of synchronization is usually only triggered on the very first sync when the subsystem first starts up. However, synchronization can also be triggered in this mode by the scheduled synchronization job, if `synchronization.synchronizeChangesOnly` is set to false. |
| Differential | Only those users and groups changed since the last query are queried and created/updated locally. This differential mode is much faster than full synchronization. By default, it is triggered when the subsystem starts up after the first time and also when a user is successfully authenticated who does not yet have a local person object in Content Services. This means that new users, and their group information, are pulled over from LDAP servers as and when required with minimal overhead. |
| Differential With Removals | All users and groups are queried to determine which ones no longer exist and can be disabled or deleted locally. In order to synchronize the attributes of the remaining users and groups, a differential sync is performed so only those users and groups that have changed since the last sync are updated or added locally. |

### Synchronization triggers

Synchronization can be triggered by each of the following events:

|Synchronization trigger|Description|
|-----------------------|-----------|
|Startup|On system startup or restart of the Synchronization subsystem, a differential sync is triggered (unless disabled with configuration). |
|Authentication|On successful authentication of a user who does not yet exist locally, a differential sync is triggered (unless disabled with configuration). |
|Schedule|A scheduled job triggers synchronization in differential with removals mode every 24 hours. This can instead by scheduled in full mode if you set the `synchronization.synchronizeChangesOnly` property to false. The scheduling of this job can also be altered. |

### Synchronization deletion {#syncdeletedesc}

Users and groups removed from the LDAP directory or query are only identified when synchronization is triggered by the schedule job in either full mode or differential with removals mode.

Users and groups created as a result of a synchronization operation are tagged with an originating zone ID. This records the ID of the authentication subsystem instance that the user or group was queried from. On synchronization with a zone, only those users and groups tagged with that zone are candidates for deletion. This avoids accidental deletion of built-in groups, such as `ALFRESCO_ADMINISTRATORS`.

When a removed user or group is detected, Content Services will behave in one of two ways, depending on the value of the `synchronization.allowDeletions` property. When `true` (the default value), Content Services simply deletes the user or group from the local repository. When false, the user or group is simply untagged from its zone, thus converting it to a local user or group. A removed user also loses its memberships from any of the LDAP groups they were in, whereas, a removed group is cleared of all their members. As the user or group is retained in the repository, this setting has the advantage that the site memberships for that user or group are remembered, should they later be reactivated.

### Collision resolution {#synccollisiondesc}

If there are overlaps between the contents of two user registries in the authentication chain (for example, where two user registries both contain a user with the same user name), then the registry that occurs earlier in the authentication chain will be given precedence. This means that exactly the same order of precedence used during authentication will be used during synchronization.

For example, if user `A` is queried from zone `Z1` but already exists in zone `Z2`:

* `A` is ignored if `Z1` is later in the authentication chain than `Z2`
* `A` is moved to `Z1` if `Z2` does not exist in the authentication chain or `Z1` is earlier in the authentication chain and the `synchronization.allowDeletions` property is `false`.
* `A` is deleted from `Z2` and recreated in `Z1`if `Z1` is earlier in the authentication chain and the `synchronization.allowDeletions` property is `true`.

### Synchronization configuration properties

The synchronization subsystem manages synchronization by configuring the subsystem's properties.

The following properties can be configured for the synchronization subsystem.

|Property|Description|
|--------|-----------|
|synchronization.synchronizeChangesOnly|Specifies whether the scheduled synchronization job is run in differential mode. The default is true, which means that the scheduled sync job is run in differential mode (rather than full mode). Regardless of this setting a differential sync can still be triggered when a user who does not yet exist is successfully authenticated. |
|synchronization.allowDeletions|Specifies if deletion of local users and groups is allowed. See the information about [Synchronization deletion](#syncdeletedesc) and [Collision resolution](#synccollisiondesc) for the circumstances under which this can happen. The default is true. If false, then no sync job will be allowed to delete users or groups during the handling of removals or collision resolution. |
|synchronization.import.cron|Specifies a cron expression defining when the scheduled synchronization job should run, by default at midnight every day.<br><br>For more information about the cron expression, see the [CronTrigger tutorial](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/tutorial-lesson-06.html). |
|synchronization.syncOnStartup|Specifies whether to trigger a differential sync when the subsystem starts up. The default is true. This ensures that when user registries are first configured, the bulk of the synchronization work is done on server startup, rather than on the first login. |
|synchronization.syncWhenMissingPeopleLogIn|Specifies whether to trigger a differential sync when a user, who does not yet exist, is successfully authenticated. The default is true. If there are users created in the LDAP server that do not already exist, when you start Content Services, a differential synchronization is triggered. |
|synchronization.autoCreatePeopleOnLogin|Specifies whether to create a user with default properties when a user is successfully authenticated, who does not yet exist, and was not returned by a differential sync (if enabled with the specified property). The default is true. Setting this to false allows you to restrict Content Services to a subset of those users who could be authenticated by LDAP; only those created by synchronization are allowed to log in. You can control the set of users in this more restricted set by overriding the user query properties of the LDAP authentication subsystem. |

## Manage authentication directories {#manageauthdirs}

Use **Directory Management** in the Repo Admin Console to set up authentication chains, and configure external SSO and FTP authentication. The Directory Management feature gives you the ability to configure and test connections to various directory services.

The Directory Management page provides an interface for you to:

* create, configure and manage internal directories, OpenLDAP and Active Directory
* configure authentication chain options for services, such as browser SSO
* test connections to various services before activating them in the authentication chain
* manage common user synchronization settings
* easily set up directory services without using property files

### Manage the authentication chain

Use these instructions to add and configure the authentication chain.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Authentication Chain** section, specify the name of the new directory in the **Name:** field.

4. Specify the authentication subsystem type from the **Type:** menu.

    > **Note:** If you've an **External** authentication type, the relevant directory will always appear as the first item in the chain.

5. Click **Add**.

    The new authentication chain appears in the table.

    The Authentication Chain table has the following fields:

    * **Order**: Use the up and down arrows to reorder the authentication chain.
    * **Name**: Specifies the name of the authentication chain.
    * **Type**: Specifies the authentication subsystem type, such as OpenLDAP, Active Directory, Kerberos, and External.
    * **Enables**: Specifies if authentication is enabled or not.
    * **Synchronized**: Specifies if the authentication chain is synchronized or not.
    * **Actions**: Enables you to perform specific actions on the selected authentication chain, such as:
        * **Edit**: Enables you to configure the authentication directories. See [Managing authentication directories](#manageauthadmin) for more information.
        * **Test**: Enables you to run an authentication test. To process the test request, you need a valid user name and password.
        * **Reset**: Enables you to reset the directory to its initial settings or default values. You will lose all changes you've made to this directory since it was created.
        * **Remove**: Removes the directory from the authentication chain list.
        * **Test synchronize**: Enables you to check if synchronization is configured correctly.

    > **Note:** You can only edit a directory after it has been added and saved. If you haven't yet saved the entry, the only option available is Remove.

6. To manage synchronization with all the user registries (LDAP servers) in the authentication chain, click **Synchronization Settings**.

    You see the Synchronization Settings page. See [Synchronization Settings](#managesyncsettings) for more information.

7. To start the user directory sync of all users and groups, click **Run Synchronize**.

8. Click **Save** to apply the changes you've made to the authentication chain.

    If you do not want to save the changes, click **Cancel**.

#### Manage authentication directories using Admin Console {#manageauthadmin}

The authentication subsystem support certain properties that can be configured to integrate the subsystem with
Content Services. You can manage the various subsystems using their configuration properties.

Click the relevant authentication directory for more information.

##### Configure OpenLDAP or Oracle Directory Server

Use these instructions to configure OpenLDAP or Oracle Directory Server using the configuration properties in the Admin Console.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Authentication Chain** section, under **Actions**, click **Edit** for the OpenLDAP or Oracle Directory Server directory.

    > **Note:** You can only edit a directory after it has been added and saved. If you haven't yet saved the entry, the only option available is Remove.

    You see the **Edit LDAP Directory** page.

4. Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |Authentication Enabled|Yes|This specifies that the directory will be used to authenticate users. |
    |User Name Format|-|This specifies how to map the user identifier entered by the user to that passed through to LDAP. |
    |LDAP Server URL|ldap://ldap.domain.com:389|This specifies the URL of your LDAP server, containing its name and port. The standard ports for LDAP are 389 (and 636 for SSL)|
    |Security|simple|This specifies the mechanism used authenticate with the LDAP server. It should be one of the standard values provided here or one of the values supported by the LDAP provider. See [LDAP configuration properties](#ldapconfprops) for more information. |
    |Default Administrator User Names|-|This specifies a comma separated list of user names to be considered administrators by default. If you're using LDAP for all your users, this maps an LDAP user to be an administrator user. |
    |Authenticate FTP|Yes|This enables authentication for FTP access. |
    |Synchronization Enabled|Yes|This enables user and group synchronization. It might be that this connection should only be used for authentication, in which case this flag should be set to false. |
    |Security Principal Name|cn=Manager,dc=company,dc=com|This specifies the LDAP user to connect for the export operation, if one is required by the `ldap.synchronization.java.naming.security.authentication` authentication mechanism. This should be in the same format as `ldap.authentication.userNameFormat` but with a real user ID instead of `%s`. |
    |Security|simple|This specifies the mechanism to use to authenticate with the LDAP Synchronization server. It should be one of the standard values provided here or one of the values supported by the LDAP provider. See [LDAP configuration properties](#ldapconfprops) for more information. |
    |Group query|(objectclass=groupOfNames)|This specifies the query to select all objects that represent the groups to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. The default is `(objectclass=groupOfNames)`. |
    |Security Principal Credentials|secret|This specifies the password for the default principal (only used for LDAP sync). |
    |User Search Base|ou=People,dc=company,dc=com|This specifies the DN below which to run the user queries. |
    |Group Search Base|ou=Groups,dc=company,dc=com|This specifies the DN below which to run the group queries. |
    |Person Differential Query|(&(objectclass=inetOrgPerson)(!(modifyTimestamp<={0})))|This specifies the query to select the objects that represent the users to export that have changed since a certain time. It should use the placeholder {0} in place of a timestamp in the format specified by `ldap.synchronization.timestampFormat`. This query is used in differential synchronization mode, which by default is triggered whenever a user, that does not yet exist, is successfully authenticated. |
    |Person Query|(objectclass=inetOrgPerson)|This specifies the query to select all objects that represent the users to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. |

    > **Note:** The Edit LDAP Directory page also displays certain advanced LDAP synchronization properties. It is recommended that you do not change these settings.

5. Click **Save** to apply the changes you've made to the OpenLDAP or Oracle Directory Server directory.

    If you do not want to save the changes, click **Close**.

##### Configure LDAP (Active Directory)

Use these instructions to configure LDAP-AD using the configuration properties in the Admin Console.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Authentication Chain** section, under **Actions**, click **Edit** for the LDAP (Active Directory) directory.

    > **Note:** You can only edit a directory after it has been added and saved. If you haven't yet saved the entry, the only option available is Remove.

    You see the **Edit LDAP-AD Directory** page.

4. Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |Authentication Enabled|Yes|This specifies that the directory will be used to authenticate users. |
    |User Name Format|%s@domain|This specifies how to map the user identifier entered by the user to that passed through to LDAP. |
    |LDAP Server URL|ldap://$LDAP_HOST:$LDAP_HOST_PORT|This specifies the URL of your LDAP server, containing its name and port. The standard ports for LDAP are 389 (and 636 for SSL)|
    |Security|simple|This specifies the mechanism used authenticate with the LDAP server. It should be one of the standard values provided here or one of the values supported by the LDAP provider. See [LDAP configuration properties](#ldapconfprops) for more information. |
    |Default Administrator User Names|Administrator|This specifies a comma separated list of user names to be considered administrators by default. If you're using LDAP for all your users, this maps an LDAP user to be an administrator user. |
    |Authenticate FTP|Yes|This enables authentication for FTP access. |
    |Synchronization Enabled|Yes|This enables user and group synchronization. It might be that this connection should only be used for authentication, in which case this flag should be set to false. |
    |Security Principal Name|cn=Manager,dc=company,dc=com|This specifies the LDAP user to connect for the export operation, if one is required by the `ldap.synchronization.java.naming.security.authentication` authentication mechanism. This should be in the same format as `ldap.authentication.userNameFormat` but with a real user ID instead of `%s`. |
    |Security|simple|This specifies the mechanism to use to authenticate with the LDAP Synchronization server. It should be one of the standard values provided here or one of the values supported by the LDAP provider. See [LDAP configuration properties](#ldapconfprops) for more information. |
    |Group query|(objectclass=group)|This specifies the query to select all objects that represent the groups to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. The default is `(objectclass=groupOfNames)`. |
    |Security Principal Credentials|secret|This specifies the password for the default principal (only used for LDAP sync). |
    |User Search Base|ou=People,dc=company,dc=com|This specifies the DN below which to run the user queries. |
    |Group Search Base|ou=Groups,dc=company,dc=com|This specifies the DN below which to run the group queries. |
    |Person Differential Query|(&(objectclass\=user)(userAccountControl\:1.2.840.113556.1.4.803\:\=512)(!(whenChanged<\={0})))|The query to select the objects that represent the users to import to Content Services that have changed since a certain time. It should use the placeholder {0} in place of a timestamp in the format specified by `ldap.synchronization.timestampFormat`. This query is used in differential synchronization mode, which by default is triggered whenever a user, that does not yet exist, is successfully authenticated. |
    |Person Query|(objectclass=user)|This specifies the query to select all objects that represent the users to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. |

    > **Note:** The Edit LDAP Directory page also displays certain advanced LDAP synchronization properties. It is recommended that you do not change these settings.

5. Click **Save** to apply the changes you've made to LDAP Active Directory.

    If you do not want to save the changes, click **Close**.

##### Configure Kerberos {#manageauthdirsconfigkerberso}

Use these instructions to configure Kerberos using the configuration properties in the Admin Console.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Authentication Chain** section, under **Actions**, click **Edit** for the Kerberos directory.

    > **Note:** You can only edit a directory after it has been added and saved. If you haven't yet saved the entry, the only option available is Remove.

    You see the **Edit Kerberos Directory** page.

4. Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |User Config Entry Name|Alfresco|This specifies the entry in the JAAS configuration file that should be used for password-based authentication. The recommended default value is Alfresco. |
    |Administrator User Names|-|This specifies a comma separated list of user names to be considered administrators by default. |
    |Kerberos Authentication Realm|ALFRESCO.ORG|This specifies the Kerberos realm used for authentication. The realm should be the domain in upper case. For example, if the domain is `alfresco.org`, then the realm should be `ALFRESCO.ORG`. |
    |HTTP Config Entry Name|AlfrescoHTTP|This specifies the entry in the JAAS configuration file used for web-based SSO. The recommended default value is `AlfrescoHTTP`. |
    |Strip Username Suffix|Yes|This specifies that the @domain suffix is stripped from Kerberos authenticated user names in SPP, WebDAV, and the Web Client. If not selected, multi-domain users can use the @domain suffix. |
    |HTTP Password|secret|This specifies the password for the HTTP Kerberos principal. Click **Show Password** to reveal the password. Click **Hide Password** to hide the password. |
    |Authenticate FTP|Yes|This enables authentication for FTP access. |

5. Click **Save** to apply the changes you've made to the Kerberos directory.

    If you do not want to save the changes, click **Close**.

##### Configure external authentication {#configextauthrepoconsole}

Use these instructions to configure external authentication using the configuration properties in the Admin Console.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Authentication Chain** section, if no element of type **External** exists in the authentication chain list, follow the steps below to add a new External type element:

    1. Specify a name in the Name text box.

    2. Set type to `External`.

    3. Click **Add**.

    4. Click **Save** to add the new External type element in the authentication chain list.

4. In the **Authentication Chain** section, under **Actions**, click **Edit** for the External directory.

    > **Note:** You can only edit a directory after it has been added and saved. If you haven't yet saved the entry, the only option available is Remove.

    You see the **Edit External Directory** page.

5. Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |Authentication Enabled|Yes|This enables the external directory user authentication. When enabled, Content Services accepts external authentication tokens; ensure that no untrusted direct access to Alfresco's HTTP or AJP ports is allowed. |
    |Proxy Username|alfresco-system|This specifies the remote user that is considered as the proxy user. **Note:** The default setting for `external.authentication.proxyUserName` is `alfresco-system`. This should only be specified if you're using SSL. See [External authentication and SSO](#extauthsso) for more information. |
    |Administrator User Names|-|This specifies a comma separated list of user names to be considered administrators by default. |
    |Proxy Header|X-Alfresco-Remote-User|This specifies the HTTP header that carries the name of a proxied user. The default is `X-Alfresco-Remote-User`. |
    |User ID Pattern|-|This specifies an optional regular expression used to extract a user ID from the HTTP header. The portion of the header matched by the first bracketed group in the regular expression becomes the user name. If not set, the entire header contents are assumed to be the proxied user name. |

6. Click **Save** to apply the changes you've made to the External authentication directory.

    If you do not want to save the changes, click **Close**.

##### Configure alfrescoNtlm

Use these instructions to configure alfrescoNtlm using the configuration properties in the Admin Console.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Authentication Chain** section, under **Actions**, click **Edit** for the alfrescoNtlm1 directory.

    You see the **Edit Internal Alfresco Directory** page.

4. Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |Allow Guest Login|Yes|This enables guest access. |
    |Authenticate FTP|Yes|This enables authentication for FTP access. |

5. Click **Save** to apply the changes you've made to the internal authentication directory.

    If you do not want to save the changes, click **Close**.

#### Manage synchronization settings {#managesyncsettings}

The synchronization settings manage the synchronization of Content Services with all the user registries
(LDAP servers) in the authentication chain. Use this information to configure the synchronization subsystem.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. Under the **Authentication Chain** section, click **Synchronization Settings**.

    You see the **Synchronization Settings** page.

4. Set the synchronization properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |Sync on Startup|Yes|This triggers synchronization when the subsystem starts up. This ensures that when the user registries are first configured, bulk of synchronization work is done on server startup, rather than on the first login. |
    |Sync When Missing People Login|Yes|This triggers synchronization when a user, who does not yet exist, is successfully authenticated. The default is `true`. |
    |Allow Deletions|Yes|This triggers deletion of the local users and groups during synchronization when handling removals or collision resolution. The default is `true`. If `false`, then no sync job will be allowed to delete users or groups during the handling of removals or collision resolution. |
    |Logging Interval|100|This specifies the number of user or group entries processed during synchronization before the progress is logged at INFO level. It requires the following default entry in log4j.properties: `log4j.logger.org.alfresco.repo.security.sync=info`<br><br>The default is `100`. |
    |Auto Create People On Login|Yes|This specifies whether to create a user with default properties, when a user is successfully authenticated, who does not yet exist, and was not returned by synchronization (if enabled with the **Sync When Missing People Login** property). The default is `true`. |
    |Sync Changes Only|Yes|This triggers a differential synchronization. Deselect this option, to run full synchronization. Regardless of this setting, a differential synchronization can still be triggered when a user, who does not yet exist, is successfully authenticated. |
    |Import CRON Expression|0 0 0 * * ?|This specifies a cron expression which defines when the scheduled synchronization job should run. By default, this is every 24 hours at midnight. |
    |Sync Worker Threads|1|This specifies the number of worker threads used for synchronization. The default is `1`. |

    > **Note:** Settings are common to all the directories for which synchronization is enabled.

5. Click **Save** to apply the changes you've made to the authentication chain.

    If you do not want to save the changes, click **Close**.

### Manage browser based automatic login

Use this information to configure the external authentication subsystem.

1. Open the **Repo Admin Console**.

2. In the **Directories** section, click **Directory Management**.

    You see the **Directory Management** page.

3. In the **Browser Based Automatic Login** section, select a directory to automatically log users by using a browser. Alternatively, select **Disabled** to disable automatic login.

    > **Note:** You can configure other forms of SSO using the external authentication type, such as CAS or Siteminder.

4. Click **Save** to apply the changes you've made to the authentication chain.

    If you do not want to save the changes, click **Cancel**.
