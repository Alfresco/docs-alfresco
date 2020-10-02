---
title: Configure Process Services
---

Configure Process Services using a properties file named `activiti-app.properties`. This file must be placed on the 
application server’s classpath to be found.

Additionally, the properties file is available with the following options:

* An `activiti-app.properties` file with default values in the WAR file (or exploded WAR folder) under the `WEB-INF/classes/META-INF/activiti-app` folder.
* An `activiti-app.properties` file with custom values on the classpath. For example, the `WEB-INF/classes` folder of the WAR, the `/lib` folder of Tomcat, or other places specific to the web container being used.

The values of a configuration file on the classpath have precedence over the values in the 
`WEB-INF/classes/META-INF/activiti-app/activiti-app.properties` file.

For the Process Services user interface, there is an additional configuration file named `app-cfg.js`. 
This file is located inside the .war file’s `script` directory.

At a minimum, the application requires the following settings to run:

* A database connection that is configured either [Using JDBC Connection Parameters](#jdbcparams) or [Using a JNDI Data Source](#jndiparams)
* An accurate Hibernate dialect - see [Hibernate Settings](#hibernateparams)

All other properties use the default settings, and this will be allow the application to start up and run.

## General server settings

By default, the following properties are defined:

|Property|Description|Default|
|--------|-----------|-------|
|server.contextroot|The context root on which the user accesses the application. This is used in various places to generate URLs to correct resources.|`activiti-app`|
|security.rememberme.key|Used for cookie validation. In a multi-node setup, all nodes must have the same value for this property.|`somekey`|
|security.csrf.disabled|When `true`, the cross-site forgery (CSRF) protection is disabled.|`false`|
|security.signup.disabled|When `true`, the Process Services sign up functionality is disabled. An error message sign up is not possible will be displayed.|`false`|

## Encrypting configuration properties

You can encrypt sensitive properties in the `activiti-app.properties`, `activiti-admin.properties` and `activiti-ldap.properties` configuration files.

1.  Download Jasypt [http://www.jasypt.org/download.html](http://www.jasypt.org/download.html).

2.  Extract the zip file and grant yourself full run permissions on its `bin` directory.

    You need to know what encryption algorithms are supported. If you’re using the JVM to which the application will be deployed you can do this using the listAlgorithms tool that Jasypt provides: [http://www.jasypt.org/cli.html](http://www.jasypt.org/cli.html)

    >**Note:** Certain algorithms such as `SHA1 (PBEWITHSHA1ANDDESEDE)` and `MD5 (PBEWithMD5AndDES)` are available on most JVMs but more secure algorithms require modifications to the JRE policies.

3.  Choose an algorithm.

    If you do not specify an algorithm to Jasypt, then you effectively obtain the default of `PBEWithMD5AndDES`. Some algorithms may appear in the list but may not be usable as the JRE policy blocks them.

    If you want to increase your range of choices then you can modify the JRE policies: [https://www.ca.com/us/services-support/ca-support/ca-support-online/knowledge-base-articles.tec1698523.html](https://www.ca.com/us/services-support/ca-support/ca-support-online/knowledge-base-articles.tec1698523.html)There is an equivalent for the IBM JRE: [https://www-01.ibm.com/marketing/iwm/iwm/web/reg/pick.do?source=jcesdk.](https://www-01.ibm.com/marketing/iwm/iwm/web/reg/pick.do?source=jcesdk.)

    Algorithms using AES are generally considered most secure. TripleDES also passes security checks at present. You should consult your security department for advice specific to your organization and the needs of your server.

4.  Use the Jasypt tools to encrypt the value.

    You can use the encrypt script that comes with Jasypt to encrypt the value against your chosen secret password. In addition to their documentation, see this guide: [http://www.programering.com/a/MjN1kTNwATg.html](http://www.programering.com/a/MjN1kTNwATg.html).

    We recommend to avoid using quotes. Also check that you can decrypt the value, preferably using the intended JRE.

5.  Deploy the application.

    See the application installation instructions.

6.  Set the value in the properties file.

    If the property is called datasource.password, remove the existing entry and put in a new entry of the form `datasource.password=ENC(<ENCRYPTEDPASSWORD>)` where `ENCRYPTEDPASSWORD` is the value encrypted by Jasypt.

7.  Configure your application server to set the encryption algorithm and secret encryption password.

    If, for example, you are using Tomcat on Unix then you could include a shell script called `setenv.sh` in tomcat_home/bin with the following content:

    ```text
    export JAVA_OPTS="$JAVA_OPTS -Djasypt.encryptor.password=secretpassword -Djasypt.encryptor.algorithm=PBEWITHSHA1ANDDESEDE"
    ```

    This assumes that your password is `secretpassword` and you are using the algorithm `PBEWITHSHA1ANDDESEDE`. The configuration could alternatively be done in `startup.sh`.

    If you then run using `catalina.sh` you will see the secret password in the logging on application startup. This is a Tomcat feature, which you can disable by removing `<Listener className="org.apache.catalina.startup.VersionLoggerListener" />` from your Tomcat's `server.xml` [https://stackoverflow.com/questions/35485826/turn-off-tomcat-logging-via-spring-boot-application](https://stackoverflow.com/questions/35485826/turn-off-tomcat-logging-via-spring-boot-application)You may initially, however, want to leave this on for diagnostic purposes until you’ve proven you’ve got encryption working. For an example of this, see [https://stackoverflow.com/questions/17019233/pass-user-defined-environment-variable-to-tomcat](https://stackoverflow.com/questions/17019233/pass-user-defined-environment-variable-to-tomcat)

    For other servers there will be other ways of setting environment/JVM variables. These values can be read as JVM parameters, environment variables or as property file entries (though you would not want to put the secret encryption password in a property file). Therefore, with WebSphere they could set using JVM parameter config [http://www-01.ibm.com/support/docview.wss?uid=swg21417365](http://www-01.ibm.com/support/docview.wss?uid=swg21417365) or environment variable config [https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/welcvariables.html.](https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/welcvariables.html.)

8.  Start the application.

    The application should now start as normal. If it doesn’t, try without the encrypted values and without the encryption parameters to determine whether the problem is related to the encryption setup. Check that you are able to encrypt and decrypt with Jasypt to rule out any issues due to copy-paste errors. 

9.  Logging.

    Some property values (though not sensitive ones) are logged by Alfresco applications if the log level is set high. If you want to restrict this then reduce the log level in`log4j.properties`

## Database configuration

Set the following properties to change the database.

### Using JDBC Connection Parameters {#jdbcparams}

|Property|Description|
|--------|-----------|
|datasource.driver|The JDBC driver used to connect to the database. Note that the driver must be on the classpath of the web application.|
|datasource.url|The JDBC URL used to connect to the database.|
|datasource.username|The user of the database system that is used to connect to the database.|
|datasource.password|The password of the above user.|

Example:

```text
datasource.driver=com.mysql.jdbc.Driver
datasource.url=jdbc:mysql://127.0.0.1:3306/activiti?characterEncoding=UTF-8

datasource.username=alfresco
datasource.password=alfresco
```

**Connection Pooling**

When using JDBC Connection Parameters, you can configure the following connection pool settings 
to suit the anticipated load:

|Property|Description|Value|
|--------|-----------|-----|
|datasource.min-pool-size|The minimum number of connections in the connection pool.|`5`|
|datasource.max-pool-size|The maximum number of connections in the connection pool.|`100`|
|datasource.acquire-increment|The number of additional connections the system will try to acquire each time the connection pool is exhausted.|`5`|
|datasource.preferred-test-query|The query used to verify that the connection is still valid|No default value (not a required property). The value depends on the database: `select 1` for H2, MySQL, PostgreSQL and Microsoft SQL Server, `SELECT 1 FROM DUAL` for Oracle and `SELECT current date FROM sysibm.sysdummy1` for DB2.|
|datasource.test-connection-on-checkin|Boolean value. If `true`, an operation will be performed asynchronously on every connection checkin to verify that the connection is valid. For best performance, a proper `datasource.preferred-test-query` should be set.|`true`|
|datasource.test-connection-on-checkout|Boolean value. If `true`, an operation will be performed asynchronously on every connection checkout to verify that the connection is valid. Testing Connections on checkout is the simplest and most reliable form of Connection testing. For best performance, a proper `datasource.preferred-test-query` should be set.|`true`|
|datasource.max-idle-time|The number of seconds a connection can be pooled before being discarded.|`1800`|
|datasource.max-idle-time-excess-connections|Number of seconds that connections in excess of `minPoolSize` should be permitted to remain idle in the pool before being discarded. The intention is that connections remain in the pool during a load spike.|`1800`|

The connection pooling framework used is [C3P0](http://www.mchange.com/projects/c3p0/). It has extensive documentation 
on the settings described above.

### Using a JNDI Data source {#jndiparams}

If a JNDI data source is configured in the web container or application server, 
the JNDI name should be set with the following properties:

|Property|Description|Value|
|--------|-----------|-----|
|datasource.jndi.name|The JNDI name of the datasource. This varies depending on the application server or web container.|`jdbc/activitiDS`|
|datasource.jndi.resourceRef|Set whether the look up occurs in a J2EE container, that is, if the prefix `java:comp/env/` needs to be added if the JNDI name doesn’t already contain it.|`true`|

Example (on JBoss EAP 6.3):

```text
datasource.jndi.name=java:jboss/datasources/activitiDS
```

### Hibernate settings {#hibernateparams}

The Process Services specific logic is written using JPA 2.0 with Hibernate as implementation. Note that the 
Process Engine itself uses [MyBatis](http://mybatis.github.io/mybatis-3/) for full control of each SQL query.

Set the following properties.

|Property|Description|Mandatory|
|--------|-----------|---------|
|hibernate.dialect|The dialect implementation that Hibernate uses. This is database specific.|`Yes`. Very important to set the correct dialect, otherwise the app might not boot up.|

The following values are used to test Process Services.

|Database|Dialect|
|--------|-------|
|H2|`org.hibernate.dialect.H2Dialect`|
|MySQL|`org.hibernate.dialect.MySQLDialect`|
|Oracle|`org.hibernate.dialect.Oracle10gDialect`|
|SQL Server|`org.hibernate.dialect.SQLServerDialect`|
|DB2|`org.hibernate.dialect.DB2Dialect`|
|PostgreSQL|`org.hibernate.dialect.PostgreSQLDialect`|

Optionally, the `hibernate.show_sql` property can be set to `true` if the SQL being executed needs to be printed 
to the log.

## Language Support

The Process Services interface is supported for use with a number of languages that have been through a 
quality assurance (QA) and linguistic testing cycle.

Process Services is supported with the following languages:

* US English
* Swedish
* Spanish
* French
* Italian
* Japanese
* Norwegian Bokmå
* Dutch
* Brazilian Portuguese
* Russian
* Simplified Chinese

To change the display language for Process Services, configure the appropriate language in your browser settings.

## Identity Service

Process Services can be configured to authenticate using the Identity Service.

The [Identity Service](TODO_LINK:https://docs.alfresco.com/identity/concepts/identity-overview.html) allows you to 
configure user authentication between a supported LDAP provider or SAML identity provider and the Identity Service 
for Single Sign On (SSO) capabilities.

The Identity Service needs to be [deployed](TODO_LINK:https://docs.alfresco.com/identity/concepts/identity-deploy.html) and 
[configured](TODO_LINK:https://docs.alfresco.com/identity/concepts/identity-configure.html) with an identity provider before 
being set up with other Alfresco products.

Once the Identity Service has been deployed, you will need to [configure Process Services](#identityprops) to authenticate with it.

>**Note:** Please refer to the [supported platforms](https://www.alfresco.com/services/subscription/supported-platforms) page to see which parts of Process Services are compatible with the Identity Service.

>**Note:** Process Services requires an email address as the user name when logging into the Identity Service.

### Process Services properties for Identity Service {#identityprops}

Use this information to configure Process Services to authenticate via Identity Service.

Configure the `activiti-identity-service.properties` file using the below properties:

>**Note:** A [full list of possible properties](https://www.keycloak.org/docs/4.8/securing_apps/index.html#_java_adapter_config) is also available.

|Property|Description|Notes|
|--------|-----------|-----|
|keycloak.enabled|Enable or disable authentication via the Identity Service.|Required.|
|keycloak.realm|Name of the realm configured in the Identity Service.|Required.|
|keycloak.auth-server-url|Base URL of the Identity Service server. Will be in the format `https://{server}:{port}/auth`|Required.|
|keycloak.ssl-required|Whether communication to and from the Identity Service server is over HTTPS. Possible values are `all` for all requests, `external` for external requests or `none`.|**Important:** this property needs to match the equivalent setting for **Require SSL** in your realm within the Identity Service administration console.|
|keycloak.resource|The **Client ID** for the client created within your realm that points to Process Services.|Required.|
|keycloak.principal-attribute|The attribute used to populate the field `UserPrincipal` with. If this is `null` it will default to `sub`.|**Important:** this property needs to be set to `email` to work with Process Services.|
|keycloak.public-client|The adapter will not send credentials for the client to the Identity Service if this is set to `true`.|Optional.|
|keycloak.credentials.secret|The secret key for this client if the access type is not set to `public`.| |
|keycloak.always-refresh-token|The token will be refreshed for every request if this is set to `true`.| |
|keycloak.autodetect-bearer-only|This should be set to true if your application serves both a web application and web services. It allows for the redirection of unauthorized users of the web application to the Identity Service sign in page, but send a HTTP 401 to unauthenticated SOAP or REST clients.|Required.|
|keycloak.token-store|The location of where the account information token is stored. Possible values are `cookie` or `session`.|Required.|
|keycloak.enable-basic-auth|Whether basic authentication is supported by the adapter. If set to `true` then a secret must also be provided.|Optional.|
|activiti.use-browser-based-logout|Sets whether signing out of Process Services calls the Identity Service `logout URL`.If set to `true`, set the **Admin URL** to `https://{server}:{port}/activiti-app/` under the client settings in the Identity Service management console.|Optional.|

## Configuring Kerberos against Active Directory (AD)

Process Services support for Kerberos SSO allows customers with existing Kerberos AD infrastructure to quickly 
and easily set up Windows-based SSO for their users’ access. It’s established as a security standard in many 
organizations and does not require additional infrastructure. It allows users secure access to the 
Process Services app (`activiti-app`) without explicit login through a web browser.

You must first set up accounts for use on a Microsoft Active Directory domain controller. It is important to 
identify each of the servers in your cluster that will be running the Process Services (`activiti-app.war`) web application. 
These instructions also apply to simple non-clustered installations, where a single `activiti-app.war` runs on a single host.

These instructions use the following naming conventions for the example server, `server1.alfresco.org`:

* `<host>` is the server host name (without domain name suffix). For example, `server1`.
* `<hostnetbios>` is the resolved value of the `cifs.serverName` property if the server is part of the Active Directory domain (typically the host name with the letter 'A' appended) or the host name otherwise (without domain name suffix). For example, `server1A`.
* `<domain>` is the DNS domain. For example, `alfresco.org`.
* `<domainnetbios>` is the Windows domain NetBIOS name. For example, `alfresco`.
* `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

**Prerequisites**

You must ensure that you have configured LDAP (LDAP synchronization in particular). You can use Kerberos SSO in 
combination with LDAP authentication and also database authentication. You can use both of these as fallback scenarios 
in the case that the user's browser does not support Kerberos authentication.

Kerberos SSO configuration can be divided into three parts:

* (1) Steps to configure Active Directory and are performed by an Administrator against the domain controllers
* (2) Steps to configure the machine where Process Services is hosted (for example, creating the `krb5.ini` file)
* (3) Steps to set configuration properties

1.  Create accounts for the SSO authentication filters by repeating the following steps for each server in the cluster that will be running the activiti-app.war file.

    1.  In the Active Directory Users and Computers application, choose **Action > New > User**, then enter the full name as HTTP <host> and the user log in name as http<host>.

    2.  Click **Next**.

    3.  Enter a password.

    4.  Enable **Password never expires** and disable **User must change password at next logon**.

    5.  Click **Next**.

    6.  Click **Finish**.

    7.  Right-click the new user account name, and then select **Properties**.

    8.  Select the **Account** tab and enable the **Do not require Kerberos preauthentication** option in the **Account Options** section.

    9.  From the command prompt, use the `ktpass` utility to generate key tables for this account as shown:

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

2.  On each server in the cluster that will be running the APS web application (`activiti-app.war`), repeat the following steps:

    1.  Set up the Kerberos ini file to point to the Windows domain controller.

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

    2.  Set up the Java login configuration file.

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

    3.  Enable the login configuration file by adding the following line to the main Java security configuration file, usually at `java\lib\security\java.security`.

        ```
        login.config.url.1=file:${java.home}/lib/security/java.login.config
        ```

    4.  If the Process Services server is not part of the Active Directory domain, ensure that its clock is kept in sync with the domain controller's, for example, by configuring the domain controller as an NTP server.

3.  To complete Kerberos SSO enablement, perform the following configuration steps after completing the actions described in step 1 and step 2 above:

    >**Note:** Use the same server as that used in part 2 of Kereberos SSO configuration to carry out these steps.

    1.  Open the `<InstallLocation>/tomcat/lib/activiti-ldap.properties` file.

        >**Note:** You will need to create this file if it does not already exist.

    2.  Specify the configuration settings listed in the table below.

    |Property name|Description|Default value|
    |-------------|-----------|-------------|
    |kerberos.authentication.enabled|A switch for activating functionality for Kerberos SSO authentication. This applies to both the APS user interface and the REST API.|`FALSE`|
    |kerberos.authentication.principal|The Service Principal Name (SPN). For example, `HTTP/alfresco.test.activiti.local`.|None|
    |kerberos.authentication.keytab|The file system path to the key table file. For example, `C:/alfresco/alfrescohttp.keytab`.|None|
    |kerberos.authentication.krb5.conf|The file system path to the local server. For example, `C:/Windows/krb5.ini`.|None|
    |kerberos.allow.ldap.authentication.fallback|Determines whether to allow login for unsupported client browsers using LDAP credentials.|`FALSE`|
    |kerberos.allow.database.authentication.fallback|Determines whether to allow login for unsupported client browsers using database credentials.|`FALSE`|
    |kerberos.allow.samAccountName.authentication|Authentication of the user id using the short form (for example username instead of username@domain.com).|`FALSE`|
    |security.authentication.use-externalid|A setting that enables the use of Kerberos authentication.|`FALSE`|

## Configuring the OAuth 2 client for the APS app

To use the OAuth 2 client for authenticating login to the APS web application, you first need to configure it using 
the information obtained by the OAuth 2 authorization server.

The following entries show the properties you need to edit in `activiti-app.properties` and how you might set them 
for a typical configuration.

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
|security.oauth2.client.accessTokenUri|Endpoint for token requests as described in the OAuth 2 specification. Once login access to the application on the authorisation server has been allowed, the server provides the client (APS application) with the access token. This is exchanged with the authorisation server residing on the Uri set within this property.|
|security.oauth2.client.userInfoUri|Uri of the user. This is used to retrieve user details from the authorisation server.|

>**Note:** The user name used for Process Services application login should also exist on the external authentication server. Note also that the Process Services user name is an email address.

## Configuring CORS

To enable Cross Origin Resource Sharing (CORS) in Process Services, set the `cors.enabled` property to true in the 
`activiti-app.properties` file.

>**Note:** This feature is only supported on Tomcat application server.

```text
# CORS CONFIGURATION
#
cors.enabled=true
```

When CORS is enabled, CORS requests can be made to all endpoints under `/activiti-app/api`.

Also, some additional properties are made available which can be configured to further fine tune CORS. 
This will make CORS available only to certain origins or to restrict the valid HTTP methods that can be used and 
headers that can be sent with CORS-enabled requests.

```text
cors.enabled=false
cors.allowed.origins=*
cors.allowed.methods=GET,POST,HEAD,OPTIONS,PUT,DELETE
cors.allowed.headers=Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token
cors.exposed.headers=Access-Control-Allow-Origin,Access-Control-Allow-Credentials
cors.support.credentials=truecors.preflight.maxage=10
```

|Property|Description|
|--------|-----------|
|cors.allowed.origins|Specifies the hosts allowed in cross origin requests. By default, the value is set to `*`, which permits clients hosted on any server to access the resources. Alternatively, you can specify a host, for example, [http://www.example.org:8080](http://www.example.org:8080), which will only allow requests from this host.<br><br>Multiple entries or wildcards are not allowed for this setting.<br><br>In general, it is recommended to restrict `{{allowedOrigins}}` to only allow origins within your organization to make requests.|
|cors.allowed.methods|Configures which HTTP requests are permitted. GET, POST, HEAD, OPTIONS, PUT, DELETE|
|cors.allowed.headers|Specifies the headers that can be set manually or programmatically in the request headers in addition to the ones set by the user agent (for example, Connection). The default values are: <br><br>Authorization<br><br>Content-Type<br><br>Cache-Control<br><br>X-Requested-With<br><br>Accept<br><br>Origin<br><br>Access-Control-Request-Method<br><br>Access-Control-Request-Headers<br><br>X-CSRF-Token|
|cors.exposed.headers|Allows you to whitelist the headers that the client can access from the server. The default value exposes the following headers:<br><br>Access-Control-Allow-Origin<br><br>Access-Control-Allow-Credentials|
|cors.support.credentials|Determines whether HTTP cookie and HTTP Authentication-based credentials are allowed. The default value is `true`.|
|cors.preflight.maxage|Preflighted requests use the `OPTIONS` method to first verify the resource availability and then request it. This property determines the maximum time (in minutes) for caching a preflight request. The default value is `10`.|

To disable CORS set the following property in the `activiti-app.properties` file:

```text
cors.enabled=false
```

## Business Calendar settings

Business Calendar is used to calculate relative due dates for tasks. To exclude weekends when calculating a task’s 
relative due date, set the `calendar.weekends` property as follows:

```text
# Weekend days comma separated (day's first 3 letters in capital)
calendar.weekends=SAT,SUN
```

## Login session

It is possible to invalidate the current Process Services app login session when you close the web browser. 
By default, closing the web browser will maintain the session cookie and will keep the current login session open.

To invalidate the login session, do the following:

1.  Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.

2.  Locate and set `security.use-http-session` to true.

    ```text
    security.use-http-session=true
    ```

    Set this property to `false` if you do not wish to enable this behavior.

## Initial user created on first start up

When the application starts for the first time, it will verify that there is at least one user in the system. 
If not, a user with superuser rights will be created.

The default user ID to sign in with is `admin@app.activiti.com` using password `admin`. 
This should be changed after signing in for the first time.

The initial user details can be modified (must be done `before` first start up) with following properties:

|Property|Description|
|--------|-----------|
|admin.email|The email address used to create the first user, which also acts as the sign in identifier.|
|admin.group|Capabilities in Process Services are managed by adding users into certain groups. The first user will have all capabilities enabled. This property defines the name of the group to which the first user will be added. By default it is `Superusers`.|

## Email Server configuration

The application sends out emails to users on various events. For example, when a task is assigned to the user.

Set the following properties to configure the email server:

|Property|Description|
|--------|-----------|
|email.enabled|Enables or disables the email functionality as a whole. By default, it is set to `false`, therefore make sure to set it to `true` when you require the email functionality.|
|email.host|The host address of the email server.|
|email.port|The port on which the email server is running.|
|email.useCredentials|Boolean value. Indicates if the email server needs credentials to make a connection. If so, both username and password need to be set.|
|email.username|The username used as credentials when `email.useCredentials` is `true`.|
|email.password|The password used as credentials when `email.useCredentials` is `true`.|
|email.ssl|Defines if SSL is needed for the connection to the email server.|
|email.tls|Defines if TLS is needed for the connection to the email server. This needs to be `true` when Google mail is used as the mail server for example.|
|email.from.default|The email address that is used in the `from` field of any email sent.|
|email.from.default.name|The name that is used in the `from` field of the email sent.|
|email.feedback.default|Some emails will have a feedback email address that people can use to send feedback. This property defines this.|

Emails are created by a template engine. The emails can contain various links to the runtime system to bring the 
user straight to the correct page in the web application.

Set the following property to correct the links. The example in the following table uses `localhost` as host address 
and `/activiti-app` as the context root:

|Property|Example|
|--------|-------|
|email.base.url|[http://localhost:8080/activiti-app](http://localhost:8080/activiti-app)|

## Elasticsearch configuration

Elasticsearch is used in Process Services as a data store for generating analytics and reports. 
[Elasticsearch](http://www.elasticsearch.org/) is an open source data store for [JSON](http://www.json.org/) documents. 
Its main features include fast full text search and analytics.

Process Services uses a REST connection to communicate with a remote instance of Elasticsearch. The application creates 
a Java Low Level REST client, which allows you to configure Process Services to index event data into a remote 
Elasticsearch service. The REST client internally uses the Apache HTTP Async Client to send HTTP requests. 
This allows communication with an Elasticsearch cluster through HTTP.

A REST connection between Elasticsearch and Process Services has three points to be aware of:

* REST operations made using the native transport protocol are not supported. The Elasticsearch service exposes only the REST API and not the transport protocol. Operations must therefore be run across an HTTP connection.
* No data is stored on the server on which the application is running. The data fully resides within the Elasticsearch cluster in the remote environment.
* In multi-tenant setups, four indexes are created per tenant.

For more details regarding the REST client, see [Java Low Level REST Client](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-low.html).

If migrating from an embedded Elasticsearch instance, see [rebuilding Elasticsearch instances](#elasticrebuild) 
after configuring a connection to an external Elasticsearch instance via REST.

For information about the compatibility between the REST client and the remote Elasticsearch cluster environment, 
see [Communicating with an Elasticsearch Cluster using HTTP](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/_motivations_around_a_new_java_client.html).

### Elasticsearch configuration properties 

The following properties need to be configured in `activiti-app.properties` for Elasticsearch:

|Property|Description|Example value|
|--------|-----------|-------------|
|elastic-search.server.type|The server type for Elasticsearch configuration. Set this to **rest** to enable the REST client implementation.|`rest`|
|elastic-search.rest-client.port|The port running Elasticsearch.|`9200`|
|elastic-search.rest-client.connect-timeout|Connection timeout for the REST client.|`1000`|
|elastic-search.rest-client.socket-timeout|Socket timeout for the REST client.|`5000`|
|elastic-search.rest-client.address|IP address of the REST client.|`localhost`|
|elastic-search.rest-client.schema|Sets whether the connection uses http or https.|`http`|
|elastic-search.rest-client.auth.enabled|Sets whether authentication is enabled for the REST connection.|`false`|
|elastic-search.rest-client.username|The username of the Elasticsearch user.|`admin`|
|elastic-search.rest-client.password|The password for the Elasticsearch user.|`esadmin`|
|elastic-search.rest-client.keystore|The keystore used to encrypt the connection to the Elasticsearch instance.|``|
|elastic-search.rest-client.keystore.type|The type of keystore used for encryption.|`jks`|
|elastic-search.rest-client.keystore.password|The password of keystore used for encryption.|``|
|elastic-search.default.index.name|The default prefix for the default tenant.|`activiti`|
|elastic-search.tenant.index.prefix|The prefix used for indexing in multi-tenant setups.|`activiti-tenant-`|

Backing up the data stored in Elasticsearch is described in detail in the 
[Elastic search documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html). 
When using the **snapshot** functionality of ElasticSearch, you must enable the HTTP interface and create firewall 
rules to prevent the general public from accessing it.

### Event processing for analytics

The event processing is closely related to the [Elasticsearch configuration](elasticsearch_configuration.md).

The main concept is depicted in the following diagram.

![analytics-event-processing]({% link process-services/images/analytics-event-processing.png %})

1.  The Process Engine is configured to generate events related to process execution (for example, processes started, task completed, and so on). These events are stored in the database such that there is no problem with database transactions. Meaning, writing the events to the database succeeds or fails with the regular process execution data.
2.  A component called **event processor** will asynchronously check for new entries in the database table for the events. The events will be processed and transformed to JSON.
3.  The JSON event is asynchronously sent to Elasticsearch. From that point on the data will show up in the reports.

The event processor is architected to work without collisions in a multi-node clustered setup. Each of the event processors will first try to lock events before processing them. If a node goes down during event processing (after locking), an **expired events processor** component will pick them up and process them as regular events.

The event processing can be configured, however leaving the default values as they are helps cater for typical scenarios.

|Property|Description|Default|
|--------|-----------|-------|
|event.generation.enabled|Set to false if no events need to be generated. Do note that the reporting/analytics event data is then lost forever.|`true`|
|event.processing.enabled|Set to false to not do event processing. This can be useful in a clustered setup where only some nodes do the processing.|`true`|
|event.processing.blocksize|The number of events that are attempted to be locked and fetched to be processed in one transaction. Larger values equate to more memory usage, but less database traffic.|`100`|
|event.processing.cronExpression|The cron expression that defines how often the events generated by the Process Engine are processed (that is, read from the database and fed into Elastic Search). By default 30 seconds. If events do not need to appear quickly in the analytics, it is advised to make this less frequent to put less load on the database.|`0/30 \* \* \* \* ?`|
|event.processing.expired.cronExpression|The cron expression that defines how often **expired** events are processed. These are events that were locked, but never processed (such as when the node processing them went down).|`0 0/30 \* \* \* ?`|
|event.processing.max.locktime|The maximum time an event can be **locked** before it is seen as expired. After that it can be taken by another processor. Expressed in milliseconds.|`600000`|
|event.processing.processed.events.action|To keep the database table where the Process Engine writes the events small and efficient, processed events are either moved to another table or deleted. Possible values are *move* and *delete*. Move is the safe option, as it allows for reconstructing the Elasticsearch index if the index was to get corrupted for some reason.|`move`|
|event.processing.processed.action.cronExpression|The cron expression that defines how often the action above happens.|`0 25/45 \* \* \* ?`|

### Rebuilding the indexes {#elasticrebuild}

Occasionally, an Elasticsearch index can get corrupted and become unusable. All data that are sent to Elasticsearch 
is stored in the relational database (except if the property `event.processing.processed.events.action` has been set 
to delete, in which case the data is lost).

You might have to rebuild the indexes when changing the core Elasticsearch settings (for example, number of shards).

Events are stored in the **ACT_EVT_LOG** table before they are processed. The **IS_PROCESSED_** flag is set to `0` when 
inserting an event and changing it to `1` to process for ElasticSearch. An asynchronous component will move those table 
rows with `1` for the flag to the **PROCESSED_ACTIVITI_EVENTS**.

Therefore, to rebuild the Elasticsearch index, you must do the following:

* Remove the data from Elasticsearch (deleting the data folders for example in the embedded mode)
* Copy the rows from `PROCESSED_ACTIVITI_EVENTS` to `ACT_EVT_LOG` and setting the `IS_PROCESSED` flag to `0` again.

Note also, due to historical reasons, the `DATA_` column has different types in `ACT_EVT_LOG` (byte array) and 
`PROCESSED_ACTIVITI_EVENTS` (long text). So a data type conversion is needed when moving rows between those tables.

See the example-apps folder that comes with Process Services. It has an event-backup-example folder, in which a 
Maven project can be found that carries out the data type conversion. You can also use this to back up and restore events. 
Note that this example uses Java, but it can also be done with other languages. It first writes the content of 
`PROCESSED_ACTIVITI_EVENTS` to a .csv file. This is also useful when this table becomes too big in size: store the 
data in a file and remove the rows from the database table.

## Application Access and default example app

It is possible to configure whether users get access to the model editors (the **App Designer** application) and the 
analytics application.

Access to the default application is configured through *capabilities*. In the admin UI, it is possible to 
create *system groups*. These groups have a set of capabilities. All users part of that group have those capabilities.

The following settings configure app access when a new user is created in the system (manual or through LDAP sync). 
To enable access, set the property `app.[APP-NAME].default.enabled` to `true`. If `true`, a newly created user will 
be given access to this app.

The access is configured by adding the user to a group with a certain capability that enabled the app. The name of 
that group can be configured using the `app.[APP-NAME].default.capabilities.group` property. If this property is set, 
and the `app.[APP-NAME].default.enabled property` is set to `true`, the group with this name will be used to add the 
user to and provide access to the app. If the group does not exist, it is created. If the property is commented, 
and `app.[APP-NAME].default.enabled property`, a default name is used.

Currently possible app names: `{ analytics | kickstart }`

|Property|default|
|--------|-------|
|app.analytics.default.enabled|`true`|
|app.analytics.default.capabilities.group|`analytics-users`|
|app.kickstart.default.enabled|`true`|
|app.kickstart.default.capabilities.group|`kickstart-users`|

The following setting, if set to `true`, will create a default example app with some simple review and approve 
processes for every newly created user.

|Property|default|
|--------|-------|
|app.review-workflows.enabled|`false`|

## Group Manager Involvement

When a task is created that has one or more candidate groups assigned, the group managers for those groups will be 
automatically involved with the created task. To stop group managers from being involved, set the following 
property to `false`.

|Property|default|
|--------|-------|
|app.runtime.groupTasks.involveGroupManager.enabled|`true`|

>**Note:** Users that do not have a primary group defined may not have a group manager. To define the primary group, go to **Identity Management > Users > Select an action > Change primary group**.

## Process Definition Cache

The Process Engine operates in a stateless way. However, there is data that will never change, which makes it a 
prime candidate for caching.

A process definition is an example of such *static data*. When you deploy a BPMN 2.0 XML file to the Process Engine, 
the engine parses it to something it can execute, and stores the XML and some data, such as the description, business key, 
in the database. Such a process definition will never change. Once it’s in the database, the stored data will remain the 
same until the process definition is deleted.

On top of that, parsing a BPMN 2.0 XML to something executable is quite a costly operation compared with other engine operations. 
This is why the Process Engine internally uses a process definition cache to store the parsed version of the BPMN 2.0 XML.

![activiti-proc-def-cache]({% link process-services/images/activiti-proc-def-cache.png %})

In a multi-node setup, each node will have a cache of process definitions. When a node goes down and comes up, 
it will rebuild the cache as it handles process instances, tasks. and so on.

The process definition cache size can be set by the following property:

|Property|Description|Default|
|--------|-----------|-------|
|activiti.process-definitions.cache.max|The number of process definitions kept in memory. When the system needs to cope with many process definitions concurrently, it is advised to make this value higher than the default.|`128`|

## Content Storage

Process Services enables you to upload content, such as attaching a file to a task or a form.

Content can be stored locally by setting the property below to `fs`. Alternatively, you can use Amazon S3 for 
content storage by setting it to `s3`.

```text
contentstorage.type
```

To configure file system for content storage, set the following properties in the `activiti-app.properties` file:

>**Note:** Please note that the property file located at `tomcat/lib/activiti-app.properties` has priority over the one found at `/tomcat/webapps/activiti-app/WEB-INF/classes/META-INF/activiti-app.properties`.

|Property|Description|Example|
|--------|-----------|-------|
|contentstorage.fs.rootFolder|Name and location of the root folder. **Important:** When using multiple instances of the application, make sure that this path references a shared network drive. This is so that all nodes are able to access all content as the application is stateless and any server can handle any request.|`/data`|
|contentstorage.fs.createRoot|Sets whether the root folder is created by default.|`true`|
|contentstorage.fs.depth|Depth of the folder tree.|`4`|
|contentstorage.fs.blockSize|Maximum number of files in a single folder.|`1024`|

To configure Amazon S3 for content storage, set the following properties in the `activiti-app.properties` file:

|Property|Description|
|--------|-----------|
|`contentstorage.s3.accessKey`|Set to the S3 access key. The access key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).|
|`contentstorage.s3.secretKey`|Set to the S3 secret key.The secret key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).|
|`contentstorage.s3.bucketName`|Set to the S3 bucket name.The bucket name must be unique among all Amazon Web Services users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. See [S3 bucket restrictions](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for more information on bucket naming.|
|`contentstorage.s3.objectKeyPrefix`|Set to your AWS object prefix.|

Alfresco Content Services is also storage mechanism, and you can find more information in 
[Connecting to external content systems](#connecting2externalsys).

## Microsoft Office integration

The Microsoft Office integration (opening an Office document directly from the browser) doesn’t need any specific 
configuration. However, the protocol used for the integration mandates the use of **HTTPS** servers by default. 
This means that Process Services must run on a server that has HTTPS and its certificates are correctly configured.

If this is not possible for some reason, change the setting on the machines for **each** user to make this feature work.

For Windows, see:

[http://support.microsoft.com/kb/2123563](http://support.microsoft.com/kb/2123563)

For OS X, execute following terminal command:

```bash
defaults -currentHost write com.microsoft.registrationDB hkey_current_user\\hkey_local_machine\\software\\microsoft\\office\\14.0\\common\\internet\\basicauthlevel -int 2
```

Note that this is not a recommended approach from a security point of view.

## Logging back-end metrics

The application uses SLF4J bounded to Log4j. The `log4j.properties` configuration file can be found in the 
`WEB-INF/classes` folder of the WAR file.

See [SLF4J](http://www.slf4j.org/) and [Log4j](http://logging.apache.org/log4j/) for more information.

For all REST API endpoints available in the application, metrics are gathered about run-time performance. 
These statistics can be written to the log.

|Property|Description|Default|
|--------|-----------|-------|
|metrics.console.reporter.enabled|Boolean value. If `true`, the REST API endpoint statistics will be logged.|`false`|
|metrics.console.reporter.interval|The interval of logging in seconds. Do note that these logs are quite large, so this should not be set to be too frequent.|`60`|

>**Note** that the statistics are based on the run-time timings since the last start up. When the server goes down, the metrics are lost.

Example output for one REST API endpoint:

```text
com.activiti.runtime.rest.TaskQueryResource.listTasks
  count = 4
  mean rate = 0.03 calls/second
  1-minute rate = 0.03 calls/second
  5-minute rate = 0.01 calls/second
  15-minute rate = 0.00 calls/second
  min = 5.28 milliseconds
  max = 186.55 milliseconds
  mean = 50.74 milliseconds
  stddev = 90.54 milliseconds
  median = 5.57 milliseconds
  75% <= 141.34 milliseconds
  95% <= 186.55 milliseconds
  98% <= 186.55 milliseconds
  99% <= 186.55 milliseconds
  99.9% <= 186.55 milliseconds
```

## Process and Task Query lists

Process Services provides REST API operations that allow you to query tasks, process instances, historic tasks and 
historic process instances. You can also request to include task and process variables by using the parameters 
`includeTaskLocalVariables` and `includeProcessVariables` and setting their values to `true`. When executing REST API calls 
that include these variables, the result sets could be quite large and you may wish to limit or control the list size 
provided in the response. The following table shows the properties you can set in the `activiti-app.properties` 
file to configure this.

|Property name|Description|
|-------------|-----------|
|query.task.limit|Limits the number of tasks returned from the query `GET /runtime/tasks`.|
|query.execution.limit|Limits the number of process instances returned from the query `GET /runtime/process-instances`.|
|query.historic.task.limit|Limits the number of historic tasks returned from the query `POST /enterprise/historic-tasks/query`.|
|query.historic.process.limit|Limits the number of historic process instances returned from the query `POST /enterprise/historic-process-instances/query`.|

>**Note:** Note the following points:

* You cannot specify the `includeTaskLocalVariables` parameter when using the process and historic process query operations. This is only available for `GET /runtime/tasks` and `POST /enterprise/historic-tasks/query`. You can use the `includeProcessVariables` parameter for all queries specified in the table and apply the corresponding property configuration.
* If the property configuration for a query limit is not enabled in `activiti-app.properties`, the default limit for the number of instances returned is `20000`.
* If you omit the `includeTaskLocalVariables` and `includeProcessVariables` parameters or set them to `false`, the request excludes the variables from the response and does not apply the query limit configurations.
* Setting higher limits for the process or task query properties results in more records fetched from the database. This is likely to mean that you experience slower REST API response times.

## External Identity Management (LDAP/Active Directory)

It’s possible to hook up a centralized user data store with Process Services. Any server supporting the LDAP protocol 
can be used. Special configuration options and logic has been included to work with Active Directory (AD) systems too.

From a high-level overview, the external Identity Management (IDM) integration works as follows:

* Periodically, all user and group information is synchronized asynchronously. This means that all data for users 
(name, email address, group membership and so on) is copied to the Process Services database. This is done to improve 
performance and to efficiently store more user data that doesn’t belong to the IDM system.

* If the user logs in to Process Services, the authentication request is passed to the IDM system. On successful 
authentication there, the user data corresponding to that user is fetched from the Process Services database and used 
for the various requests. Note that no passwords are saved in the database when using an external IDM.

Note that the LDAP sync only needs to be activated and configured on one node in the cluster (but it works when 
activated on multiple nodes, but this will of course lead to higher traffic for both the LDAP system and the database).

The configuration of the external IDM authentication/synchronization is done in the same way as the regular properties. 
There is a properties file named `activiti-ldap.properties` in the `WEB-INF/classes/META-INF/` folder in the WAR file. 
The values in a file with the same name on the classpath have precedence over the default values in the former file.

In addition, in the same folder, the `example-activiti-ldap-for-ad.properties` file contains an example configuration 
for an Active Directory system.

### Server connection config

The following code snippet shows the properties involved in configuring a connection to an LDAP server 
(Active Directory is similar). These are the typical parameters used when connecting with an LDAP server. 
Advanced parameters are commented out in the example below:

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

It is possible to configure connection pooling for the LDAP/AD connections. This is an advanced feature and is only 
needed when creating a connection to the IDM system has an impact on system performance.

The connection pooling is implemented using the Spring-LDAP framework. Below are all the properties that it is 
possible to configure. These follow the semantics of the properties possible for Spring-LDAP and are described 
[here](http://docs.spring.io/spring-ldap/docs/2.0.2.RELEASE/reference/#pooling).

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

### Authentication config

To enable authentication via LDAP or AD, set the following property:

```text
ldap.authentication.enabled=true
```

In some organizations, a case insensitive log in is allowed with the LDAP ID. By default, this is disabled. 
To enable, set following property to `false`.

```text
ldap.authentication.casesensitive=false
```

Next, set the following property to specify the user ID pattern for an authenticating LDAP user:

```text
ldap.authentication.dnPattern=uid={0},ou=users,dc=alfresco,dc=com
```

However, if the users are in structured folders (organizational units for example), a direct pattern cannot be used. 
In this case, leave the property either empty or comment it out. Now, a query will be performed using the 
`ldap.synchronization.personQuery` (see below) with the `ldap.synchronization.userIdAttributeName` to find the user 
and their distinguished (DN) name. That DN will then be used to sign in.

When using Active Directory, two additional properties need to be set:

```text
ldap.authentication.active-directory.enabled=true
ldap.authentication.active-directory.domain=alfresco.com
```

The first property enables Active Directory support and the second property is the domain of the user ID 
(that is, `userId@domain`) to sign in using Active Directory.

If the domain does not match with the `rootDn`, it is possible to set is explicitly:

```text
ldap.authentication.active-directory.rootDn=DC=somethingElse,DC=com
```

And also the filter that is used (which defaults to a `userPrincipalName` comparison) can be changed:

```text
ldap.authentication.active-directory.searchFilter=(&(objectClass=user)(userPrincipalName={0}))
```

The following property can be set to `true` to allow for basic authentication to be used as a fallback for 
LDAP authentication. This allows for system or service users to be utilized for certain actions, 
such as making specific REST API calls:

```text
ldap.allow.database.authenticaion.fallback=true
```

### Synchronization config

The synchronization component will periodically query the IDM system and change the user and group database. 
There are two synchronization *modes*: full and differential.

Full synchronization queries **all** data from the IDM and checks every user, group, and membership to be valid. 
The resource usage is heavier than the differential synchronization in this type of synchronization and therefore, 
it is usually only triggered on the very first sync when Process Services starts up and is configured to use an 
external IDM. This is so that all users and groups are available in the database.

**To enable full synchronization**:

The frequency in which it runs is set using a cron expression:

```text
ldap.synchronization.full.enabled=true
ldap.synchronization.full.cronExpression=0 0 0 * * ?
```

Differential synchronization is *lighter*, in terms of performance, as it only queries the users and groups that have 
changed since the last synchronization. One downside is that it cannot detect deletions of users and groups. Consequently, 
a full synchronization needs to run periodically (but less than a differential synchronization typically) to 
account for these deletions.

```text
ldap.synchronization.differential.enabled=true
ldap.synchronization.differential.cronExpression=0 0 */4 * * ?
```

Do note that all synchronization results are logged, both in the regular logging and in a database table named `IDM_SYNC_LOG`.

The synchronization logic builds on two elements:

* Queries that return the correct user/group/membership data
* A mapping of LDAP attributes to attributes used within the Process Services system

There are a lot of properties to configure, so do base your configuration on one of the two files in the `META-INF` folder, 
as these contain default values. You only need to add the specific properties to your custom configuration file if 
the default values are not appropriate.

**Generic Synchronization settings**

These are settings that are generic or shared between user and group objects. For each property, an example setting of 
a *regular* LDAP system (that is, ApacheDS) and Active Directory is shown.

|Property|Description|LDAP Example|Active Directory Example|
|--------|-----------|------------|------------------------|
|ldap.synchronization.distinguishedNameAttributeName|The attribute that is the **disinguished name** in the system.|`dn`|`dn`|
|ldap.synchronization.modifyTimestampAttributeName|The name of the **operational** attribute recording the last update time for a group or user. Important for the differential query.|`modifyTimestamp`|`whenChanged`|
|ldap.synchronization.createTimestampAttributeName|The name of the operational attribute recording the create time for a group or user. Important for the differential query.|`createTimestamp`|`whenCreated`|
|ldap.synchronization.timestampFormat|The timestamp format. This is specific to the directory servers and can vary.|`yyyyMMddHHmmss.SSS’Z'`|`yyyyMMddHHmmss'.0Z'`|
|ldap.synchronization.timestampFormat.locale.language|The timestamp format locale language for parsing. Follows the `java.util.Locale semantics`.|`en`|`en`|
|ldap.synchronization.timestampFormat.locale.country|The timestamp format locale country. Follows the `java.util.Locale` semantics.|`GB`|`GB`|
|ldap.synchronization.timestampFormat.timezone|The timestamp format timezone. Follows the `java.text.SimpleDateFormat` semantics.|`GMT`|`GMT`|

**User Synchronization Settings**

|Property|Description|LDAP Example|Active Directory Example|
|--------|-----------|------------|------------------------|
|ldap.synchronization.users.ignoreCase|If this property is set to `true` then the synchronization will ignore the case that users are stored in within the source database when syncing users.| | |
|ldap.synchronization.userSearchBase|The user search base restricts the LDAP user query to a sub section of a tree on the LDAP server.|`ou=users,dc=alfresco,dc=com`|`ou=users,dc=alfresco,dc=com`|
|ldap.synchronization.syncAdditionalUsers|Set to `true` if users outside of the `userSearchBase` but included in the `groupSearchBase` should be synchronized.|`false`|`false`|
|ldap.synchronization.personQuery|The query to select all objects that represent the users to import (used in the **full synchronization query**).|`(objectclass\=inetOrgPerson)`|`(&(objectclass\=user)(userAccountControl\:1.2.840.113556.1.4.803\:\=512))`|
|ldap.synchronization.personDifferentialQuery|The query to select objects that represent the users to import that have changed since a certain time (used in the **differential synchronization query**).| | |
|ldap.synchronization.userIdAttributeName|The attribute name on people objects found in LDAP to use as the user ID in Alfresco|`uid`|`cn`|
|ldap.synchronization.userFirstNameAttributeName|The attribute on person objects in LDAP to map to the first name property of a user|`givenName`|`givenName`|
|ldap.synchronization.userLastNameAttributeName|The attribute on person objects in LDAP to map to the last name property of a user|`sn`|`cn`|
|ldap.synchronization.userEmailAttributeName|The attribute on person objects in LDAP to map to the email property of a user|`mail`|`mail`|
|ldap.synchronization.userType|The person type in the directory server.|`inetOrgPerson`|`user`|

You can configure which users should be made administrators in the system. Delimit multiple entries with a `;` (Semi-colon) as commas can’t be used.

>**Notes**:
>
>* No trimming of spaces will be applied.
>* The property value must be an exact string match to the user DN value not an LDAP/AD query string.

```text
ldap.synchronization.tenantAdminDn=uid=joram,ou=users,dc=alfresco,dc=com;uid=tijs,ou=users,dc=alfresco,dc=com
```

When using multi-tenancy, the administrator of all tenants can be configured as follows. Similar rules for delimiting apply as above.

>**Note:** The property value must be an exact string match to the user DN value not an LDAP/AD query string.

```text
ldap.synchronization.tenantManagerDn=uid=joram,ou=users,dc=alfresco,dc=com
```

It’s important to set at least `1` user with admin rights. Otherwise no user will be able to sign into the system and administer it.

**Group Synchronization Settings**

|Property|Description|LDAP Example|Active Directory Example|
|--------|-----------|------------|------------------------|
|ldap.synchronization.groupSearchBase|The group search base restricts the LDAP group query to a sub section of a tree on the LDAP server.|`ou=groups,dc=alfresco,dc=com`|`ou=groups,dc=alfresco,dc=com`|
|ldap.synchronization.groupQuery|The query to select all objects that represent the groups to import (used in **full synchronization**).|`(objectclass\=groupOfNames)`|`(objectclass\=group)`|
|ldap.synchronization.groupDifferentialQuery|The query to select objects that represent the groups to import that have changed since a certain time (used in the **differential synchronization**).|||
|ldap.synchronization.groupIdAttributeName|The attribute on LDAP group objects to map to the authority name property in Process Services.|`cn`|`cn`|
|ldap.synchronization.groupMemberAttributeName|The attribute in LDAP on group objects that defines the DN for its members. This is an important setting as is defines **group memberships** of users and **parent-child** relations between groups.|`member`|`member`|
|ldap.synchronization.groupType|The group type in LDAP.|`groupOfNames`|`group`|

**Adding users to an LDAP group**

Active Directory sets a limit on the number of attributes stored in a group that are retrievable in a single query. 
To overcome this, you can use incremental retrieval of data. This involves limiting the number of attribute values in 
a single query. To reduce the number of times the query is required to contact the server, set the number of values 
requested as close, as possible, to the maximum.

Process Services provides the capability to configure the number of group members retrieved per query subject to the 
limitations imposed by Active Directory. Follow these steps to enable this:

1.  Open the `<InstallLocation>/tomcat/webapps/activiti-app/WEB-INF/classes/META-INF/activiti-app/activiti-ldap.properties` file.
2.  Set the following property to `true`.

    ```text
    ldap.synchronization.groupMemberRangeEnabled=true
    ```

3.  Set the maximum number of members to retrieve in a single query.

    ```text
    ldap.synchronization.groupMemberRangeSize=1500
    ```

    >**Note:** This value should not exceed the limit set by Active Directory. If this is greater than the Active Directoy limit, no members are returned. See [https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx) for information related to the maximum number of values returned in a single query in Active Directory. For further information regarding the behavior of the range attribute see [https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx).

>**Note:** If you set the enablement property to `true`, the default value for `ldap.synchronization.groupMemberRangeSize` is set to `1000`.

**Paging**

It is possible to use paging when connecting to an LDAP server (some even mandate this).

To enable paging when fetching users or groups, set following properties:

```text
ldap.synchronization.paging.enabled=true
ldap.synchronization.paging.size=500
```

By default, paging is disabled.

**Batch insert**

It is possible to tweak the *batch size* when doing an LDAP sync.

The *insert* batch size limits the amount of data being inserted in one transaction (for example, 100 users per transactions are inserted). 
By default, this is 5. The *query* batch size is used when data is fetched from the Process Services database 
(for example, fetching users to check for deletions when doing a full sync).

```text
ldap.synchronization.db.insert.batch.size=100
ldap.synchronization.db.query.batch.size=100
```

## Connecting to external content systems {#connecting2externalsys}
### Configure an Alfresco Content Services connection
#### Configure an Alfresco Content Services connection using Single Sign On (SSO)
##### Configure Single Sign On properties
#### Configure an Alfresco Content Services connection using basic authentication
### Configure a Box connection
### Configure a Google Drive connection
## Validator configuration
### Disabling tasks
### Limit functionality
## License configuration
## Multi-schema multi-tenancy (MS-MT)
### MS-MT known limitations
### MS-MT Technical implementation
### Getting started with MS-MT
### Behavior in a multi-node setup
### MS-MT configuration properties
### Pluggability
## Cross-Site Request Forgery (CSRF)