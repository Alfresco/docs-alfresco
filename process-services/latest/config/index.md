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
### Elasticsearch configuration settings
### Event processing for analytics
### Rebuilding the Elasticsearch indexes
## Application Access and default example app
## Group Manager Involvement
## Process Definition Cache
## Content Storage
## Microsoft Office integration
## Logging back-end metrics
## Process and Task Query lists
## External Identity Management (LDAP/Active Directory)
### Configuring external IDM
### Server connection configuration
### Authentication
### Synchronization
#### Generic Synchronization settings
#### User Synchronization Settings
#### Group Synchronization Settings
#### Adding users to an LDAP group
#### Paging
#### Batch insert
## Connecting to external content systems
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