---
title: Setting up authentication and sync
---

Use this information to manage user authentication. Set up if users should be authenticated with the database, ldap, 
SSO etc. Set up how user and group information should be synced (imported) with Content Services. Users and groups can
also be managed from the Share [Admin Tools]({% link content-services/latest/admin/users-groups.md %}), but it's more 
common to sync with a Directory Service, which is discussed here.

Authentication subsystems and authentication chains are discussed first as an understanding of those is necessary 
when configuring authentication and synchronization.

## Authentication subsystems

Authentication is one of the categories of the Content Services subsystem. An authentication subsystem is a coordinated 
stack of compatible components responsible for providing authentication and identity-related functionality to 
Content Services.

Content Services offers multiple implementations of the authentication subsystem, each engineered to work with one 
of the different types of back-end authentication server that you have available in your enterprise.

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

>**Note:** Some authentication functions can only be targeted at a single subsystem instance in the authentication chain. This is a restriction imposed by the authentication protocols themselves. For this reason, Content Services targets these ‘direct’ authentication functions at the first member of the authentication chain that has them enabled. 

### Authentication subsystem types

A number of alternative authentication subsystem types exist for the most commonly used authentication protocols. 
These are each identified by a unique type name.

The following table shows the authentication subsystem types supplied and the optional features they support.

|Type|Description|Single Sign-On (SSO) support|User registry entry|
|----|-----------|------------------------------|-------------------|
|alfrescoNtlm|Native Alfresco Content Services authentication|No|No|
|ldap|Authentication and user registry export through the LDAP protocol (for example, OpenLDAP)|No|Yes|
|ldap-ad|Authentication and user registry export from Active Directory through the LDAP protocol|No|Yes|
|kerberos|Authentication through a Kerberos realm|Yes, SPNEGO|No|
|external|Authentication using an external SSO mechanism|Yes|No|
|identity-service|Authentication using the Identity Service|Yes|No|
|SAML|Authentication through the SAML open standard|Yes|No|

>**Important:** Support for Microsoft Office depends on the authentication mechanism provided by the `external` subsystem. See [External authentication and SSO](#extauthsso) for more information.

>**Important:** SAML Single Sign On can be used for Content Services and Alfresco Office Services. SAML Single Sign On is not fully implemented when mapping a PC network drive over WebDAV, i.e. to either `<alfresco_host>/alfresco/webdav` or `<alfresco_host>/alfresco/aos` endpoints. As a workaround, a PC user should use SAML to login to Content Services before mapping the drive, otherwise the map request may fail.

>**Note:** If you are using a proxy (load balancer) with Kerberos authentication, either:

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

    Allows Alfresco Content Services to obtain user attributes, such as email address, organization, and groups automatically.

* **authentication filters**

    Provide form or SSO-based login functions for the following:

    * web client
    * WebDAV
    * web scripts
    * SharePoint protocol

* **file server authenticators**

    Provide authentication functions for the FTP protocol.

## Authentication chain

The authentication subsystem types allow you to integrate Content Services with the authentication servers 
in your environment. However, if integrating with only one of these systems is not sufficient, you might want to 
combine multiple authentication protocols against a collection of servers.

Authentication and identity management functionality is provided by a prioritized list, or chain, of configurable subsystems. 
The built-in authentication chain is a priority-ordered list of authentication subsystem instances. 
Content Services composes together the functions of the subsystems in this list into a more powerful conglomerate.

An authentication subsystem provides the following functionality:

* Password-based authentication for web browsing, SharePoint, FTP, and WebDAV
* Web browser and SharePoint Single Sign on (SSO)
* User register export (the automatic population of the user and authority database)

Several alternative authentication subsystems exist for the most commonly used authentication protocols. 
These subsystems enable you to tie Content Services to some of the most widely used authentication infrastructures. 
If you include more than one of these subsystems in the chain, you can create complex authentication scenarios.

### Chained functions

Chained functions combine together functions of more than one subsystem.

For example, when a user login, Content Services tries to match the user's credentials against each of the subsystems 
in the chain in order.

* If a chain member accepts the credentials, the log in succeeds
* If no chain member accepts, the log in fails

User registry export is also chained. During a synchronize operation, users and groups are exported from each member 
of the chain supporting user registry export (that is, those of type LDAP) and imported into Content Services. 
Ordering in the chain is used to resolve conflicts between users and groups existing in the same directory.

>**Note:** If you need to federate against multiple authentication subsystems, it is recommended to use the Identity Service rather than defining multiple subsystems on the authentication chain.

### Default authentication chain

The default product configuration has a simple chain with one member. This is an instance of the `alfrescoNtlm` 
subsystem type with and ID of `alfrescoNtlm1`.

This is expressed in the built-in defaults in the `repository.properties` file as:

```text
authentication.chain=alfrescoNtlm1:alfrescoNtlm
```

You can configure the properties of `alfrescoNtlm1` using the `alfresco-global.properties` file.

### Configuring the authentication chain

You can add to or completely replace the default authentication chain.

Chained functions combine authentication subsystems. The chain is controlled by the `authentication.chain` global property. 
When a user logs in, Content Services tries the user's credentials against each of the subsystems in the order specified 
in the chain, until the credentials are accepted (the login is successful) or until each subsystem has been tried 
(and the login fails).

If Kerberos is configured along with basic authentication in a chain, all the calls to the repository will only support 
Kerberos. The response from the server only contains the `WWW-Authenticate: Negotiate` header.

To enable the fallback mechanism for basic authentication, do the following:

* Set the following property (`true`, by default):

    ```text
    kerberos.authentication.sso.fallback.enabled=true
    ```

* Send a basic authentication header in all the requests.

    ```text
    Authorization: Basic <encoded_string>
    ```

    where `<encoded_string>` is a base64 encoded username and password separated by a single colon (:). For more information, see [Basic Authentication Scheme](https://tools.ietf.org/html/rfc2617#section-2).


1.  Open the `alfresco-global.properties` file.

2.  Locate, or if it does not already exist, create the `authentication.chain` global property.

    This is a comma separated list of the form:

    ```text
    instance_name1:type1,...,instance_namen:typen
    ```

    for example,

    ```text
    authentication.chain=alfrescoNtlm1:alfrescoNtlm
    ```

3.  Set the property to the required values.

    The default authentication chain specifies one instance of the `alfrescoNtlm` subsystem type with ID `alfrescoNtlm1`.

    For example, set the property to the following value:

    ```text
    alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
    ```

    When you navigate to the `Alfresco:Type=Configuration,Category=Authentication,id1=manager` MBean in global property overrides, a new authentication subsystem instance called `ldap1` is created and added to the end of the authentication chain.

4.  Save the file.

The following examples specify an advanced Active Directory chain, and an advanced LDAP chain.

You can integrate Content Services with Active Directory so that:

* Built-in Content Services users and Windows users can log in, with Content Services taking precedence
* LDAP synchronizes user and group details

1.  Configure the following authentication chain:

    ```text
    alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
    ```

2.  Activate chained password-based login and target synchronization (but not authentication) at `ldap1` by setting the following properties:
    * ****
    * **ldap1**

        `ldap.authentication.active=false`
        `ldap.synchronization.active=true`

You can integrate Content Services with two LDAP directories so that:

* User passwords are validated directly against the LDAP servers for web, SharePoint and FTP login
* LDAP is used to synchronize user and group details from both directories
* Users in the first directory, `ldap1`, take precedence over those in the second directory, `ldap2`

>**Note:** If you are only using a single LDAP provider in your authentication chain, the properties can be included in the `alfresco-global.properties` file. But if you need to include the configuration for more than one LDAP provider, then you need to separate the properties in distinct subsystem configuration in `<configRootShare>/classes/alfresco/subsystems/Authentication/<LDAP Provider Name>/ldap-authentication.properties`.

1.  In the `alfresco-global.properties`, specify this setting:

    ```text
    authentication.chain=ldap1:ldap,ldap2:ldap
    ```

2.  Copy [ldap-authentication.properties](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/subsystems/Authentication/ldap/ldap-authentication.properties) to both the `<classpathRoot>/alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties` and `<classpathRoot>/alfresco/extension/subsystems/Authentication/ldap/ldap2/ldap-authentication.properties` files.
3.  Edit the properties for `ldap1` and `ldap2` with appropriate settings to complete the configuration. See [LDAP configuration properties](#ldapconfprops) for information on each of the properties.

## Configuring authentication subsystems

A number of examples demonstrate how to express various authentication configuration requirements in subsystem instances 
in the authentication chain. They also explain how the authentication chain integrates the functions of multiple subsystem 
instances into a more powerful conglomerate, letting you cater for even the most complex authentication scenarios. 

These examples demonstrate the flexibility and power of an authentication chain. You can combine the strengths of a variety 
of different authentication protocols and keep the user database synchronized almost transparently.

The authentication configuration examples adopt the following structured approach:

1.  Decide the authentication chain composition (required subsystem types, instance names, order of precedence) and express this in the `alfresco-global.properties` file.
2.  For each subsystem instance:
    1.  Locate the properties files for its subsystem type. These properties files define the configurable properties for that subsystem type and their default values.
    2.  Create a folder named after the subsystem instance under the extension folders.
    3.  Copy the properties files into your new folder.
    4.  Edit the properties files to record the required configuration of the subsystem instance.

### Configuring external authentication

Use this information to enable the external authentication subsystem using the `alfresco-global.properties` file and the 
[Repository Admin Console]({% link content-services/latest/admin/admin-console.md %}).

**Configuring/enabling external authentication subsystem using the `alfresco-global.properties` file:**

1.  Open the `alfresco-global.properties` file.
2.  Set the following properties to enable external authentication:

    ```text
    authentication.chain=external1:external
    external.authentication.proxyUserName=
    external.authentication.enabled=true
    external.authentication.defaultAdministratorUserNames=admin
    external.authentication.proxyHeader=X-Alfresco-Remote-User
    ```

    >**Note:** The default setting for `external.authentication.proxyUserName` is `alfresco-system`. This should only be specified if you are using SSL. See [External authentication and SSO](#extauthsso) for more information.

3.  Save the `alfresco-global.properties` file.
4.  Restart the Content Services server.

For more information on the external authentication properties, see [external configuration properties](#extauthprops).

**Configuring/enabling external authentication subsystem using the Repository Admin Console:**

To enable external authentication subsystem using the Admin Console, see [configuring external authentication](#configextauthrepoconsole).

#### External authentication and SSO {#extauthsso}

Use this information to understand what we mean by External Authentication and how Single Sign-On (SSO) can be used 
with this authentication type.

##### What is external authentication?

External authentication uses the Central Authentication Service (CAS), which enables Single Sign-On (SSO), 
and allows a user to authenticate with a CAS, instead of directly with Content Services. For example, this might be 
using the `mod_cas` Apache module. For more information about `mod_cas`, see 
[CAS Apache Module](http://mod-cas.sourceforge.net/).

CAS is usually used with a proxy, for example, the [Apache mod_proxy](https://httpd.apache.org/docs/current/mod/mod_proxy.html) module.

External authentication is set with the `authentication.chain` parameter in your `alfresco-global.properties` file to use 
the `external` authentication subsystem.

To provide SSO, an external authentication system (or CAS) can be integrated Content Services. For example, 
the identity of the logged-in user is extracted by the CAS, passed to Content Services servlets and extracted using the 
`HttpServletRequest.getRemoteUser()` method. As a result, when a user connects to Share they are shown their user dashboard, 
but will not see the Share login page.

The subsystem also allows a proxy user to be configured, so that requests made through this proxy user are made in the name 
of an alternative user, whose name is carried in a configured HTTP request header. This allows, for example, the 
Alfresco Share application and other Surf applications to act as a client to an SSO-protected Content Services application 
and assert the user name in a secure manner.

A disabled user can still login to Alfresco using external authentication. If the external control synchronization is 
configured appropriately, a user's status of disabled can be synchronized via the LDAP directory. In summary, if an 
administrator wants to prevent a user from authenticating to Alfresco, then the user should be disabled in Alfresco 
either directly, or in the LDAP directory that is referenced by the `ldap.synchronization.userAccountStatusProperty` property.

If troubleshooting a user login issue, first check Alfresco to see if the user account is enabled, and then step through 
the authentication chain to see if the user can successfully authenticate using one of the members of the chain.

For example, if external authentication is the only authentication system in the chain and auto-create missing people 
is enabled, then the users will be able to authenticate automatically. In other words, users that are not already 
synchronized to Alfresco will be auto-created and enabled, by default. If the user is subsequently set to disabled 
(either directly via APIs or via LDAP synchronization), then the user will no longer be able to access Alfresco. 
The user will also appear as disabled in **Share > Admin Tools > Users**.

>**Note:** Activating external authentication makes Content Services accept external authentication tokens. Make sure that no untrusted direct access to Content Services HTTP or AJP ports is allowed.

Here are two scenarios where external authentication is configured with Content Services and Share. In both scenarios, 
an HTTP or HTTPS request is sent to an authentication proxy. If authentication is OK, the proxy passes the request to 
Share using the AJP protocol.

In the first scenario, the Share [endpoint-url](surf-connectors-endpoints.md) (http://localhost:8080/alfresco/wcs) 
sends the request directly to Content Services using HTTP and a User Header. No certificate is used and the 
`external.authentication.proxyUserName` is blank:

```text
external.authentication.proxyUserName=
```

Alfresco Content Services trusts the header (defined by `external.authentication.proxyHeader`) sent by Share. This scenario is typically used if you want to prohibit direct access to Alfresco Content Services and enforce using the proxy, for example, by using firewall rules to the proxy.

![external-direct]({% link content-services/images/external-direct.png %})

In the second scenario, the Share [endpoint-url](TODO:surf-connectors-endpoints.md) (http://your.server.com/alfresco/wcs) sends the request back to Apache, using HTTP and a User Header (defined by `external.authentication.proxyHeader`), and a certificate. `external.authentication.proxyUserName` is set:

```
external.authentication.proxyUserName=alfresco-system
```

Apache uses the certificate to check that the request is coming from Share with the correct user (that is, the value of `external.authentication.proxyUserName`) and forwards the request to Alfresco Content Services. This scenario is typically used to allow direct access to Share, using HTTPS and the originator (the proxy) sends a client certificate when establishing the SSL tunnel.

![external-indirect]({% link content-services/images/external-indirect.png %})

[Default authentication chain](auth-subsystem-defaultauth.md) and [Configuring external authentication](auth-external-intro.md) provide more information on the parameter and the external authentication subsystem.

Using the `external` authentication subsystem means that:

* The complexity of authentication moves to an external software layer (a proxy). Alfresco Content Services listens to the authenticated user name that it receives using a custom HTTP header, or it reads the CGI REMOTE_USER variable that can be passed using the AJP protocol.
* [Configuring external authentication](../tasks/adminconsole-directorymgt-external.md) (using the Admin Console) provides more information on configuring the `external` authentication subsystem.
* Most of the responsibility for authentication is not controlled by Alfresco Content Services, but controlled by the external software layer. Unless there is a problem when the authenticated user name is transmitted, the issue is located in the external software layer. In these cases, work with your proxy vendor or implementer of the authentication proxy to resolve the issue.

##### How is Single Sign-On (SSO) related to external authentication?

SSO is a property of an authentication scheme. You can use more than one method to set up SSO. For example:

* If you are using Kerberos, you can use either the `kerberos` authentication subsystem, or the `external` authentication subsystem with a proxy that handles Kerberos authentication.
* If you are using CAS, you must use the `external` authentication subsystem with a proxy that handles CAS authentication.

In summary, external authentication and SSO are not interdependent: you can set up external authentication that is not SSO (for example, using an Apache proxy with a `mod_auth_basic` setting), and you can set up an SSO system that is not using the `external` authentication subsystem (for example, using the `kerberos` authentication subsystem).

See [Authentication subsystem types](auth-subsystem-types.md) for a listing of the authentication subsystems and the features that they support.

## How is Alfresco Office Services related to external authentication?

There are some limitations when using Microsoft SharePoint support, as provided by Alfresco Office Services, with the Alfresco `external` authentication subsystem. External authentication can work well when using a web browser client, but not when using the MS Office client. This is because no authentication information is sent with the file URL, and MS Office does not store authentication information, so starts a new authentication process.

An example of this is when using CAS. CAS authenticates using an HTML form and a web browser that follows an HTTP redirect. The web authentication works correctly, but MS Office authentication will not work because it does not permit completion of the form. This problem is caused by the limited set of authentication protocols that MS Office supports.

MS Office supports the following authentication mechanisms:

* HTTP Basic
* HTTP Digest
* NTLM
* Kerberos

NTLM and Kerberos can be used in an SSO environment.

For more information about Alfresco Office Services limitations, see [Considerations when using Alfresco Office Services](https://docs.alfresco.com/aos/concepts/aos-issues.html).

#### External configuration properties {#extauthprops}
#### Configuring Alfresco Share to use an external SSO
#### Setting SSO with client certificates
### Configuring alfrescoNtlm
#### alfrescoNtlm configuration properties
### Configuring LDAP
#### LDAP configuration properties {#ldapconfprops}
#### Checking the supported SASL authentication mechanisms
#### Synchronizing user account status
#### Example: authentication and synchronization with one ldap-ad subsystem
##### Applying the ldap-ad example
#### Example: authentication and synchronization with two ldap-ad subsystems
### Configuring Kerberos
#### Enabling Kerberos authentication
##### Step 1. Configuring Kerberos with Active Directory
##### Step 2. Configuring Kerberos on Alfresco server
##### Step 3. Configuring Alfresco Share Kerberos SSO
##### Step 4. Kerberos client configuration
#### Kerberos configuration properties
#### Configuring cross-domain support for Kerberos
#### Debugging Kerberos
### Configuring Identity Service
#### Identity Service configuration properties

## Configuring synchronization
### Synchronization triggers
### Synchronization deletion
### Collision resolution
### Synchronization configuration properties

## Managing authentication directories {#manageauthdirs}
### Managing the authentication chain
#### Managing authentication directories using Admin Console
##### Configuring OpenLDAP or Oracle Directory Server
##### Configuring LDAP (Active Directory)
##### Configuring Kerberos
##### Configuring external authentication {#configextauthrepoconsole}
##### Configuring alfrescoNtlm
#### Managing synchronization settings
### Managing browser based automatic login


