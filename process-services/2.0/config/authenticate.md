---
title: Configure authentication
---

The authentication methods that can be configured for Process Services are:

* [The Identity Service](#identity-service)
* [OAuth 2](#oauth-2)
* [LDAP and Active Directory](#ldap-and-active-directory)
* [Kerberos and Active Directory](#kerberos-and-active-directory)

## Identity Service

Process Services can be configured to authenticate using the [Identity Service]({% link identity-service/1.2/index.md %}).

The Identity Service allows you to configure user authentication between a supported LDAP provider or SAML identity provider and the Identity Service for Single Sign On (SSO) capabilities.

The Identity Service needs to be [deployed]({% link identity-service/1.2/install/index.md %}) and [configured]({% link identity-service/1.2/config/index.md %}) with an identity provider before being set up with other Alfresco products.

Once the Identity Service has been deployed, you will need to [configure Process Services](#properties) to authenticate with it.

>**Note:** Please refer to the [supported platforms]({% link process-services/2.0/support/index.md %}) page to see which parts of Process Services are compatible with the Identity Service.

>**Note:** Process Services requires an email address as the user name when logging into the Identity Service.

### Properties

Use this information to configure Process Services to authenticate via Identity Service.

Configure the `activiti-identity-service.properties` file using the below properties:

> **Note:** A [full list of possible properties](https://www.keycloak.org/docs/latest/securing_apps/index.html#_java_adapter_config) is also available.

|Property|Description|
|--------|-----------|
|keycloak.enabled| *Required.* Enable or disable authentication via the Identity Service.|
|keycloak.realm| *Required.* Name of the realm configured in the Identity Service.|
|keycloak.auth-server-url| *Required.* Base URL of the Identity Service server in the format `https://{server}:{port}/auth`|
|keycloak.ssl-required| *Required.* Whether communication to and from the Identity Service server is over HTTPS. Possible values are `all` for all requests, `external` for external requests or `none`. **Important:** this property needs to match the equivalent setting for **Require SSL** in your realm within the Identity Service administration console.|
|keycloak.resource| *Required.* The **Client ID** for the client created within your realm that points to Process Services.|
|keycloak.principal-attribute| *Required.* The attribute used to populate the field `UserPrincipal` with. This property needs to be set to `email` to work with Process Services.|
|keycloak.public-client| *Optional.* The adapter will not send credentials for the client to the Identity Service if this is set to `true`.|
|keycloak.credentials.secret| *Optional.* The secret key for this client if the access type is not set to `public`.|
|keycloak.always-refresh-token| *Required.* The token will be refreshed for every request if this is set to `true`.|
|keycloak.autodetect-bearer-only| *Required.* This should be set to true if your application serves both a web application and web services. It allows for the redirection of unauthorized users of the web application to the Identity Service sign in page, but send a HTTP 401 to unauthenticated SOAP or REST clients.|
|keycloak.token-store| *Required.* The location of where the account information token is stored. Possible values are `cookie` or `session`.|
|keycloak.enable-basic-auth| *Optional.* Whether basic authentication is supported by the adapter. If set to `true` then a secret must also be provided.|
|activiti.use-browser-based-logout| *Optional.* Sets whether signing out of Process Services calls the Identity Service `logout URL`. If set to `true`, set the **Admin URL** to `https://{server}:{port}/activiti-app/` under the client settings in the Identity Service management console.|
|activiti.identity-service.cookie-auth-enabled| *Optional.* When set to `true` enables cookie-based authentication that will work alongside the Identity Service authentication.|

## OAuth 2

To use the OAuth 2 client for authenticating login to the APS web application, you first need to configure it using
the information obtained by the OAuth 2 authorization server.

The following entries show the properties you need to edit in `activiti-app.properties` and how you might set them for a typical configuration.

```text
security.oauth2.authentication.enabled=true
security.oauth2.client.clientId=<client_id>
security.oauth2.client.clientSecret=<secret_key>
security.oauth2.client.userAuthorizationUri=https://github.com/login/oauth/authorize
security.oauth2.client.tokenName=oauth_token
security.oauth2.client.accessTokenUri=https://github.com/login/oauth/access_token
security.oauth2.client.userInfoUri=https://api.github.com/user
```

|Property|Description|
|--------|-----------|
|security.oauth2.authentication.enabled|Enables or disables the OAuth 2 client. To enable the OAuth 2 client, set this property to `true`. To disable it, set this property to `false`.|
|security.oauth2.client.clientId|Client ID provided by the OAuth 2 Authorization server.|
|security.oauth2.client.clientSecret|Client Secret provided by the OAuth 2 Authorization server.|
|security.oauth2.client.checkToken|Configures the OAuth 2 Authorization to be used. Only set this property if you are using an internal authentication server. It contains the authorization URL obtained from the Authorization server. Example: `security.oauth2.client.checkToken=http://localhost:9999/oauth/check_token`|
|security.oauth2.client.userAuthorizationUri|Implementation of the Authorization endpoint from the OAuth 2 specification. Accepts authorization requests, and handles user approval if the grant type is authorization code.|
|security.oauth2.client.tokenName|Name of the token that will be used as parameter in the request.|
|security.oauth2.client.accessTokenUri|Endpoint for token requests as described in the OAuth 2 specification. Once login access to the application on the authorization server has been allowed, the server provides the client (APS application) with the access token. This is exchanged with the authorization server residing on the Uri set within this property.|
|security.oauth2.client.userInfoUri|Uri of the user. This is used to retrieve user details from the authorization server.|

>**Note:** The user name used for Process Services application login should also exist on the external authentication server. Note also that the Process Services user name is an email address.

## LDAP and Active Directory

It’s possible to hook up a centralized user data store with Process Services. Any server supporting the LDAP protocol
can be used. Special configuration options and logic has been included to work with Active Directory (AD) systems too.

From a high-level overview, the external Identity Management (IDM) integration works as follows:

* Periodically, all user and group information is synchronized asynchronously. This means that all data for users (name, email address, group membership and so on) is copied to the Process Services database. This is done to improve performance and to efficiently store more user data that doesn’t belong to the IDM system.

* If the user logs in to Process Services, the authentication request is passed to the IDM system. On successful authentication there, the user data corresponding to that user is fetched from the Process Services database and used for the various requests. Note that no passwords are saved in the database when using an external IDM.

Note that the LDAP sync only needs to be activated and configured on one node in the cluster (but it works when activated on multiple nodes, but this will of course lead to higher traffic for both the LDAP system and the database).

The configuration of the external IDM authentication/synchronization is done in the same way as the regular properties. There is a properties file named `activiti-ldap.properties` in the `WEB-INF/classes/META-INF/` folder in the WAR file. The values in a file with the same name on the classpath have precedence over the default values in the former file.

In addition, in the same folder, the `example-activiti-ldap-for-ad.properties` file contains an example configuration 
for an Active Directory system.

### Server connection

The following code snippet shows the properties involved in configuring a connection to an LDAP server (Active Directory is similar). These are the typical parameters used when connecting with an LDAP server. Advanced parameters are commented out in the example below:

```text
# The URL to connect to the LDAP server
ldap.authentication.java.naming.provider.url=ldap://localhost:10389

# The default principal to use (only used for LDAP sync)
ldap.synchronization.java.naming.security.principal=uid=admin,ou=system

# The password for the default principal (only used for LDAP sync)
ldap.synchronization.java.naming.security.credentials=secret

# The authentication mechanism to use for synchronization
#ldap.synchronization.java.naming.security.authentication=simple

# LDAPS truststore configuration properties
#ldap.authentication.truststore.path=
#ldap.authentication.truststore.passphrase=
#ldap.authentication.truststore.type=
# Set to 'ssl' to enable truststore configuration via subsystem's properties
#ldap.authentication.java.naming.security.protocol=ssl

# The LDAP context factory to use
#ldap.authentication.java.naming.factory.initial=com.sun.jndi.ldap.LdapCtxFactory

# Requests timeout, in miliseconds, use 0 for none (default)
#ldap.authentication.java.naming.read.timeout=0

# See http://docs.oracle.com/javase/jndi/tutorial/ldap/referral/jndi.html
#ldap.synchronization.java.naming.referral=follow
```

It is possible to configure connection pooling for the LDAP/AD connections. This is an advanced feature and is only needed when creating a connection to the IDM system has an impact on system performance.

The connection pooling is implemented using the Spring-LDAP framework. Below are all the properties that it is possible to configure. These follow the semantics of the properties possible for Spring-LDAP and are described [here](http://docs.spring.io/spring-ldap/docs/2.0.2.RELEASE/reference/#pooling){:target="_blank"}.

```text
# -----------------------
# LDAP CONNECTION POOLING
# -----------------------

# Options=
# nothing filled in: no connection pooling
# 'jdk': use the default jdk pooling mechanism
# 'spring': use the spring ldap connection pooling facilities. These can be configured further below
#ldap.synchronization.pooling.type=spring

# Following settings follow the semantics of org.springframework.ldap.pool.factory.PoolingContextSource
#ldap.synchronization.pooling.minIdle=0
#ldap.synchronization.pooling.maxIdle=8
#ldap.synchronization.pooling.maxActive=0
#ldap.synchronization.pooling.maxTotal=-1
#ldap.synchronization.pooling.maxWait=-1
# Options for exhausted action: fail | block | grow
#ldap.synchronization.pooling.whenExhaustedAction=block
#ldap.synchronization.pooling.testOnBorrow=false
#ldap.synchronization.pooling.testOnReturn=false
#ldap.synchronization.pooling.testWhileIdle=false
#ldap.synchronization.pooling.timeBetweenEvictionRunsMillis=-1
#ldap.synchronization.pooling.minEvictableIdleTimeMillis=1800000
#ldap.synchronization.pooling.numTestsPerEvictionRun=3

# Connection pool validation (see http://docs.spring.io/spring-ldap/docs/2.0.2.RELEASE/reference/#pooling for semantics)
# Used when any of the testXXX above are set to true
#ldap.synchronization.pooling.validation.base=
#ldap.synchronization.pooling.validation.filter=
# Search control: object, oneLevel, subTree
#ldap.synchronization.pooling.validation.searchControlsRefs=
```

### Authentication

To enable authentication via LDAP or AD, set the following property:

```text
ldap.authentication.enabled=true
```

In some organizations, a case insensitive log in is allowed with the LDAP ID. By default, this is disabled. To enable, set following property to `false`.

```text
ldap.authentication.casesensitive=false
```

Next, set the following property to specify the user ID pattern for an authenticating LDAP user:

```text
ldap.authentication.dnPattern=uid={0},ou=users,dc=alfresco,dc=com
```

However, if the users are in structured folders (organizational units for example), a direct pattern cannot be used. In this case, leave the property either empty or comment it out. Now, a query will be performed using the `ldap.synchronization.personQuery` (see below) with the `ldap.synchronization.userIdAttributeName` to find the user and their distinguished (DN) name. That DN will then be used to sign in.

When using Active Directory, two additional properties need to be set:

```text
ldap.authentication.active-directory.enabled=true
ldap.authentication.active-directory.domain=alfresco.com
```

The first property enables Active Directory support and the second property is the domain of the user ID (that is, `userId@domain`) to sign in using Active Directory.

If the domain does not match with the `rootDn`, it is possible to set is explicitly:

```text
ldap.authentication.active-directory.rootDn=DC=somethingElse,DC=com
```

And also the filter that is used (which defaults to a `userPrincipalName` comparison) can be changed:

```text
ldap.authentication.active-directory.searchFilter=(&(objectClass=user)(userPrincipalName={0}))
```

The following property can be set to `true` to allow for basic authentication to be used as a fallback for
LDAP authentication. This allows for system or service users to be utilized for certain actions, such as making specific REST API calls:

```text
ldap.allow.database.authenticaion.fallback=true
```

### Synchronization

The synchronization component will periodically query the IDM system and change the user and group database. There are two synchronization *modes*: full and differential.

Full synchronization queries **all** data from the IDM and checks every user, group, and membership to be valid. The resource usage is heavier than the differential synchronization in this type of synchronization and therefore, it is usually only triggered on the very first sync when Process Services starts up and is configured to use an external IDM. This is so that all users and groups are available in the database.

#### Full synchronization

The frequency in which it runs is set using a cron expression:

```text
ldap.synchronization.full.enabled=true
ldap.synchronization.full.cronExpression=0 0 0 * * ?
```

Differential synchronization is *lighter*, in terms of performance, as it only queries the users and groups that have
changed since the last synchronization. One downside is that it cannot detect deletions of users and groups. Consequently, a full synchronization needs to run periodically (but less than a differential synchronization typically) to account for these deletions.

```text
ldap.synchronization.differential.enabled=true
ldap.synchronization.differential.cronExpression=0 0 */4 * * ?
```

Do note that all synchronization results are logged, both in the regular logging and in a database table named `IDM_SYNC_LOG`.

The synchronization logic builds on two elements:

* Queries that return the correct user/group/membership data
* A mapping of LDAP attributes to attributes used within the Process Services system

There are a lot of properties to configure, so do base your configuration on one of the two files in the `META-INF` folder, as these contain default values. You only need to add the specific properties to your custom configuration file if the default values are not appropriate.

#### Generic synchronization settings

These are settings that are generic or shared between user and group objects. For each property, an example setting of a *regular* LDAP system (that is, ApacheDS) and Active Directory is shown.

|Property|Description|
|--------|-----------|
|ldap.synchronization.distinguishedNameAttributeName|The attribute that is the **Disinguished Name** in the system. For example: `dn`. |
|ldap.synchronization.modifyTimestampAttributeName|The name of the **Operational** attribute recording the last update time for a group or user. Important for the differential query. For example in LDAP: `modifyTimestamp` and in AD: `whenChanged`. |
|ldap.synchronization.createTimestampAttributeName|The name of the operational attribute recording the create time for a group or user. Important for the differential query. For example in LDAP: `createTimestamp` and in AD: `whenCreated`. |
|ldap.synchronization.timestampFormat|The timestamp format. This is specific to the directory servers and can vary. For example in LDAP: `yyyyMMddHHmmss.SSS’Z'` and in AD: `yyyyMMddHHmmss'.0Z'`. |
|ldap.synchronization.timestampFormat.locale.language|The timestamp format locale language for parsing. Follows the `java.util.Locale semantics` For example: `en`. |
|ldap.synchronization.timestampFormat.locale.country|The timestamp format locale country. Follows the `java.util.Locale` semantics. For example: `GB`. |
|ldap.synchronization.timestampFormat.timezone|The timestamp format timezone. Follows the `java.text.SimpleDateFormat` semantics. For example: `GMT`. |

#### User synchronization settings

|Property|Description|
|--------|-----------|
|ldap.synchronization.users.ignoreCase|If this property is set to `true` then the synchronization will ignore the case that users are stored in within the source database when syncing users.|
|ldap.synchronization.userSearchBase|The user search base restricts the LDAP user query to a sub section of a tree on the LDAP server. For example: `ou=users,dc=alfresco,dc=com`. |
|ldap.synchronization.syncAdditionalUsers|Set to `true` if users outside of the `userSearchBase` but included in the `groupSearchBase` should be synchronized.|
|ldap.synchronization.personQuery|The query to select all objects that represent the users to import (used in the **Full Synchronization Query**). For example in LDAP: `(objectclass\=inetOrgPerson)` and in AD: `(&(objectclass\=user)(userAccountControl\:1.2.840.113556.1.4.803\:\=512))`|
|ldap.synchronization.personDifferentialQuery|The query to select objects that represent the users to import that have changed since a certain time (used in the **Differential Synchronization Query**).|
|ldap.synchronization.userIdAttributeName|The attribute name on people objects found in LDAP to use as the user ID in Alfresco. For example in LDAP: `uid` and in AD: `cn`. |
|ldap.synchronization.userFirstNameAttributeName|The attribute on person objects in LDAP to map to the first name property of a user. For example: `givenName`. |
|ldap.synchronization.userLastNameAttributeName|The attribute on person objects in LDAP to map to the last name property of a user. For example in LDAP: `sn` and in AD: `cn`. |
|ldap.synchronization.userEmailAttributeName|The attribute on person objects in LDAP to map to the email property of a user. For example: `mail`. |
|ldap.synchronization.userType|The person type in the directory server. For example in LDAP: `inetOrgPerson` and in AD: `user`. |

You can configure which users should be made administrators in the system. Delimit multiple entries with a `;` (semi-colon) as commas can’t be used.

>**Note**: No trimming of spaces will be applied and the property value must be an exact string match to the user DN value not an LDAP/AD query string.

```text
ldap.synchronization.tenantAdminDn=uid=joram,ou=users,dc=alfresco,dc=com;uid=tijs,ou=users,dc=alfresco,dc=com
```

When using multi-tenancy, the administrator of all tenants can be configured as follows. Similar rules for delimiting apply as above.

>**Note:** The property value must be an exact string match to the user DN value not an LDAP/AD query string.

```text
ldap.synchronization.tenantManagerDn=uid=joram,ou=users,dc=alfresco,dc=com
```

It’s important to set at least `1` user with admin rights. Otherwise no user will be able to sign into the system and administer it.

#### Group synchronization settings

|Property|Description|
|--------|-----------|
|ldap.synchronization.groupSearchBase|The group search base restricts the LDAP group query to a sub section of a tree on the LDAP server. For example: `ou=groups,dc=alfresco,dc=com`. |
|ldap.synchronization.groupQuery|The query to select all objects that represent the groups to import (used in **Full Synchronization**). For example in LDAP: `(objectclass\=groupOfNames)` and in AD: `(objectclass\=group)`. |
|ldap.synchronization.groupDifferentialQuery|The query to select objects that represent the groups to import that have changed since a certain time (used in the **Differential Synchronization**).|
|ldap.synchronization.groupIdAttributeName|The attribute on LDAP group objects to map to the authority name property in Process Services. For example: `cn`. |
|ldap.synchronization.groupMemberAttributeName|The attribute in LDAP on group objects that defines the DN for its members. This is an important setting as is defines **group memberships** of users and **parent-child** relations between groups. For example: `member`. |
|ldap.synchronization.groupType|The group type in LDAP. For example in LDAP: `groupOfNames` and in AD: `group`. |

#### Add users to an LDAP group

Active Directory sets a limit on the number of attributes stored in a group that are retrievable in a single query. To overcome this, you can use incremental retrieval of data. This involves limiting the number of attribute values in
a single query. To reduce the number of times the query is required to contact the server, set the number of values requested as close, as possible, to the maximum.

Process Services provides the capability to configure the number of group members retrieved per query subject to the limitations imposed by Active Directory. Follow these steps to enable this:

1. Open the `<InstallLocation>/tomcat/webapps/activiti-app/WEB-INF/classes/META-INF/activiti-app/activiti-ldap.properties` file.
2. Set the following property to `true`.

    ```text
    ldap.synchronization.groupMemberRangeEnabled=true
    ```

3. Set the maximum number of members to retrieve in a single query.

    ```text
    ldap.synchronization.groupMemberRangeSize=1500
    ```

    >**Note:** This value should not exceed the limit set by Active Directory. If this is greater than the Active Directoy limit, no members are returned. See [https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx){:target="_blank"} for information related to the maximum number of values returned in a single query in Active Directory. For further information regarding the behavior of the range attribute see [https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx){:target="_blank"}.

>**Note:** If you set the enablement property to `true`, the default value for `ldap.synchronization.groupMemberRangeSize` is set to `1000`.

#### Paging

It is possible to use paging when connecting to an LDAP server (some even mandate this).

To enable paging when fetching users or groups, set following properties:

```text
ldap.synchronization.paging.enabled=true
ldap.synchronization.paging.size=500
```

By default, paging is disabled.

#### Batch insert

It is possible to tweak the *batch size* when doing an LDAP sync.

The *insert* batch size limits the amount of data being inserted in one transaction (for example, 100 users per transactions are inserted).By default, this is 5. The *query* batch size is used when data is fetched from the Process Services database (for example, fetching users to check for deletions when doing a full sync).

```text
ldap.synchronization.db.insert.batch.size=100
ldap.synchronization.db.query.batch.size=100
```

## Kerberos and Active Directory

Process Services support for Kerberos SSO allows customers with existing Kerberos AD infrastructure to quickly and easily set up Windows-based SSO for their users’ access. It’s established as a security standard in many organizations and does not require additional infrastructure. It allows users secure access to the Process Services app (`activiti-app`) without explicit login through a web browser.

You must first set up accounts for use on a Microsoft Active Directory domain controller. It is important to identify each of the servers in your cluster that will be running the Process Services (`activiti-app.war`) web application.
These instructions also apply to simple non-clustered installations, where a single `activiti-app.war` runs on a single host.

These instructions use the following naming conventions for the example server, `server1.alfresco.org`:

* `<host>` is the server host name (without domain name suffix). For example, `server1`.
* `<hostnetbios>` is the resolved value of the `cifs.serverName` property if the server is part of the Active Directory domain (typically the host name with the letter 'A' appended) or the host name otherwise (without domain name suffix). For example, `server1A`.
* `<domain>` is the DNS domain. For example, `alfresco.org`.
* `<domainnetbios>` is the Windows domain NetBIOS name. For example, `alfresco`.
* `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

### Prerequisites

You must ensure that you have configured LDAP (LDAP synchronization in particular). You can use Kerberos SSO in combination with LDAP authentication and also database authentication. You can use both of these as fallback scenarios in the case that the user's browser does not support Kerberos authentication.

### Configuration steps

Kerberos SSO configuration can be divided into three parts:

* (1) Steps to configure Active Directory and are performed by an Administrator against the domain controllers
* (2) Steps to configure the machine where Process Services is hosted (for example, creating the `krb5.ini` file)
* (3) Steps to set configuration properties

1. Create accounts for the SSO authentication filters by repeating the following steps for each server in the cluster that will be running the activiti-app.war file.

    1. In the Active Directory Users and Computers application, choose **Action > New > User**, then enter the full name as HTTP <host> and the user log in name as http<host>.

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

        >**Note:** When configuring Kerberos on a cluster through a load balancer, use the proxy name as the Service Principal Names (SPN).

    11. In the Active Directory Users and Computers application, right click on the `http<host>` user and select **Properties**.

    12. Select the **Delegation** tab. If you cannot see the **Delegation** tab, do one or both of the following:

        * Check that you ran the specified `setspn` command correctly. Delegation is only intended to be used by service accounts, which should have registered SPNs, as opposed to a regular user account which typically does not have SPNs.
        * Raise the functional level of your domain to Windows Server 2012 R2 x64. To do this:
            * Open **Active Directory Domains and Trusts**.
            * In the console tree, right-click the applicable domain and then click **Raise Domain Functional Level**.
            * In **Select an available domain functional level**, click **Windows Server 2012**, and then click **Raise**.

    13. In the user **Delegation** tab, select the **Trust this user for delegation to any service (Kerberos only)** check box.

    Copy the key table files created in steps 1 and 2 to the servers they were named after. Copy the files to a protected area, such as `C:\etc\` or `/etc`.

2. On each server in the cluster that will be running the APS web application (`activiti-app.war`), repeat the following steps:

    1. Set up the Kerberos ini file to point to the Windows domain controller.

        The default location is `%WINDIR%\\krb5.ini`, where `%WINDIR%` is the location of your Windows directory, for example, `C:\Windows\krb5.ini`. If the file does not already exist (for example, if the Kerberos libraries are not installed on the target server), you must copy these over or create them from scratch. See [Kerberos Help](http://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/krb5_conf.html) for more information on the `krb5.conf` file. In this example, our Windows domain controller host name is `adsrv.alfresco.org`.

        ```text
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

        >**Note:** Specify the realm in uppercase.

        The Kerberos ini file for Linux is `/etc/krb5.conf`.

    2. Set up the Java login configuration file.

        For JBoss, open the `$JBOSS_HOME/standalone/configuration/standalone.xml` file.

        In the `<subsystem xmlns="urn:jboss:domain:security:1.2">` section, add the following:

        ```xml
        <security-domain name="alfresco" cache-type="default">  
            <authentication>  
                  <login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="sufficient"/>  
            </authentication>  
        </security-domain> 
        ```

        Add the following security-domain sections:

        ```xml
        <security-domain name="AlfrescoHTTP" cache-type="default">
        	<authentication>
        			<login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
        			   <module-option name="debug" value="true"/>
        			   <module-option name="storeKey" value="true"/>
        			   <module-option name="useKeyTab" value="true"/>
        			   <module-option name="doNotPrompt" value="true"/>
        			   <module-option name="isInitiator" value="false"/>
        			   <module-option name="keyTab" value="C:/etc/http<host>.keytab"/>
        			   <module-option name="principal" value="HTTP/<host>.<domain>"/>
        			</login-module>
        	</authentication>
        </security-domain>
        ```

        For other environments, in the Java security folder (for example, `C:\Alfresco\java\lib\security`), create a file named `java.login.config` with entries as shown below.

        ```text
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

        com.sun.net.ssl.client {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
        };

        other {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
        };
        ```

    3. Enable the login configuration file by adding the following line to the main Java security configuration file, usually at `java\lib\security\java.security`.

        ```text
        login.config.url.1=file:${java.home}/lib/security/java.login.config
        ```

    4. If the Process Services server is not part of the Active Directory domain, ensure that its clock is kept in sync with the domain controller's, for example, by configuring the domain controller as an NTP server.

3. To complete Kerberos SSO enablement, perform the following configuration steps after completing the actions described in step 1 and step 2 above:

    >**Note:** Use the same server as that used in part 2 of Kereberos SSO configuration to carry out these steps.

    1. Open the `<InstallLocation>/tomcat/lib/activiti-ldap.properties` file.

        >**Note:** You will need to create this file if it does not already exist.

    2. Specify the configuration settings listed in the table below.

    |Property name|Description|
    |-------------|-----------|
    |kerberos.authentication.enabled|A switch for activating functionality for Kerberos SSO authentication. This applies to both the APS user interface and the REST API. The default value is `FALSE`. |
    |kerberos.authentication.principal|The Service Principal Name (SPN). For example, `HTTP/alfresco.test.activiti.local`.|
    |kerberos.authentication.keytab|The file system path to the key table file. For example, `C:/alfresco/alfrescohttp.keytab`.|
    |kerberos.authentication.krb5.conf|The file system path to the local server. For example, `C:/Windows/krb5.ini`.|
    |kerberos.allow.ldap.authentication.fallback|Determines whether to allow login for unsupported client browsers using LDAP credentials. The default value is `FALSE`. |
    |kerberos.allow.database.authentication.fallback|Determines whether to allow login for unsupported client browsers using database credentials. The default value is `FALSE`. |
    |kerberos.allow.samAccountName.authentication|Authentication of the user id using the short form (for example username instead of username@domain.com). The default value is `FALSE`. |
    |security.authentication.use-externalid|A setting that enables the use of Kerberos authentication. The default value is `FALSE`. |
