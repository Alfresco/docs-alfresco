---
title: Configure Process Services
---

Configure Process Services using a properties file named `activiti-app.properties`. This file must be placed on the application server’s classpath to be found.

Additionally, the properties file is available with the following options:

* An `activiti-app.properties` file with default values in the WAR file (or exploded WAR folder) under the `WEB-INF/classes/META-INF/activiti-app` folder.
* An `activiti-app.properties` file with custom values on the classpath. For example, the `WEB-INF/classes` folder of the WAR, the `/lib` folder of Tomcat, or other places specific to the web container being used.

The values of a configuration file on the classpath have precedence over the values in the `WEB-INF/classes/META-INF/activiti-app/activiti-app.properties` file.

For the Process Services user interface, there is an additional configuration file named `app-cfg.js`. This file is located inside the .war file’s `script` directory.

At a minimum, the application requires the following settings to run:

* A [database connection]({% link process-services/2.0/config/database.md %}) using a JDBC connection or JNDI data source.
* An accurate [Hibernate dialect]({% link process-services/2.0/config/database.md %}#hibernate-settings).

All other properties use the default settings, and this will be allow the application to start up and run.

## General settings

By default, the following properties are defined:

|Property|Description|
|--------|-----------|
|server.contextroot|The context root on which the user accesses the application. This is used in various places to generate URLs to correct resources. The default value is `activiti-app`. |
|security.rememberme.key|Used for cookie validation. In a multi-node setup, all nodes must have the same value for this property.|
|security.csrf.disabled|When `true`, the cross-site forgery (CSRF) protection is disabled. The default value is `false`. |
|security.signup.disabled|When `true`, the Process Services sign up functionality is disabled. An error message sign up is not possible will be displayed. The default value is `false`. |

## Encrypt configuration properties

You can encrypt sensitive properties in the `activiti-app.properties`, `activiti-admin.properties` and `activiti-ldap.properties` configuration files.

1. Download Jasypt [http://www.jasypt.org/download.html](http://www.jasypt.org/download.html){:target="_blank"}.

2. Extract the zip file and grant yourself full run permissions on its `bin` directory.

    You need to know what encryption algorithms are supported. If you’re using the JVM to which the application will be deployed you can do this using the listAlgorithms tool that Jasypt provides: [http://www.jasypt.org/cli.html](http://www.jasypt.org/cli.html){:target="_blank"}.

    >**Note:** Certain algorithms such as `SHA1 (PBEWITHSHA1ANDDESEDE)` and `MD5 (PBEWithMD5AndDES)` are available on most JVMs but more secure algorithms require modifications to the JRE policies.

3. Choose an algorithm.

    If you do not specify an algorithm to Jasypt, then you effectively obtain the default of `PBEWithMD5AndDES`. Some algorithms may appear in the list but may not be usable as the JRE policy blocks them.

    If you want to increase your range of choices then you can modify the JRE policies: [https://www.ca.com/us/services-support/ca-support/ca-support-online/knowledge-base-articles.tec1698523.html](https://www.ca.com/us/services-support/ca-support/ca-support-online/knowledge-base-articles.tec1698523.html){:target="_blank"}. There is an equivalent for the IBM JRE: [https://www-01.ibm.com/marketing/iwm/iwm/web/reg/pick.do?source=jcesdk.](https://www-01.ibm.com/marketing/iwm/iwm/web/reg/pick.do?source=jcesdk){:target="_blank"}.

    Algorithms using AES are generally considered most secure. TripleDES also passes security checks at present. You should consult your security department for advice specific to your organization and the needs of your server.

4. Use the Jasypt tools to encrypt the value.

    You can use the encrypt script that comes with Jasypt to encrypt the value against your chosen secret password. In addition to their documentation, see this guide: [http://www.programering.com/a/MjN1kTNwATg.html](http://www.programering.com/a/MjN1kTNwATg.html){:target="_blank"}.

    We recommend to avoid using quotes. Also check that you can decrypt the value, preferably using the intended JRE.

5. Deploy the application.

    See the application installation instructions.

6. Set the value in the properties file.

    If the property is called datasource.password, remove the existing entry and put in a new entry of the form `datasource.password=ENC(<ENCRYPTEDPASSWORD>)` where `ENCRYPTEDPASSWORD` is the value encrypted by Jasypt.

7. Configure your application server to set the encryption algorithm and secret encryption password.

    If, for example, you are using Tomcat on Unix then you could include a shell script called `setenv.sh` in tomcat_home/bin with the following content:

    ```text
    export JAVA_OPTS="$JAVA_OPTS -Djasypt.encryptor.password=secretpassword -Djasypt.encryptor.algorithm=PBEWITHSHA1ANDDESEDE"
    ```

    This assumes that your password is `secretpassword` and you are using the algorithm `PBEWITHSHA1ANDDESEDE`. The configuration could alternatively be done in `startup.sh`.

    If you then run using `catalina.sh` you will see the secret password in the logging on application startup. This is a Tomcat feature, which you can disable by removing `<Listener className="org.apache.catalina.startup.VersionLoggerListener" />` from your Tomcat's `server.xml` [https://stackoverflow.com/questions/35485826/turn-off-tomcat-logging-via-spring-boot-application](https://stackoverflow.com/questions/35485826/turn-off-tomcat-logging-via-spring-boot-application){:target="_blank"} You may initially, however, want to leave this on for diagnostic purposes until you’ve proven you’ve got encryption working. For an example of this, see [https://stackoverflow.com/questions/17019233/pass-user-defined-environment-variable-to-tomcat](https://stackoverflow.com/questions/17019233/pass-user-defined-environment-variable-to-tomcat){:target="_blank"}.

    For other servers there will be other ways of setting environment/JVM variables. These values can be read as JVM parameters, environment variables or as property file entries (though you would not want to put the secret encryption password in a property file). Therefore, with WebSphere they could set using JVM parameter config [http://www-01.ibm.com/support/docview.wss?uid=swg21417365](http://www-01.ibm.com/support/docview.wss?uid=swg21417365){:target="_blank"} or environment variable config [https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/welcvariables.html.](https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/welcvariables.html){:target="_blank"}.

8. Start the application.

    The application should now start as normal. If it doesn’t, try without the encrypted values and without the encryption parameters to determine whether the problem is related to the encryption setup. Check that you are able to encrypt and decrypt with Jasypt to rule out any issues due to copy-paste errors. 

9. Logging.

    Some property values (though not sensitive ones) are logged by Alfresco applications if the log level is set high. If you want to restrict this then reduce the log level in`log4j.properties`

## CORS

To enable Cross Origin Resource Sharing (CORS) in Process Services, set the `cors.enabled` property to true in the
`activiti-app.properties` file.

>**Note:** This feature is only supported on Tomcat application server.

```text
# CORS CONFIGURATION
#
cors.enabled=true
```

When CORS is enabled, CORS requests can be made to all endpoints under `/activiti-app/api`.

Also, some additional properties are made available which can be configured to further fine tune CORS. This will make CORS available only to certain origins or to restrict the valid HTTP methods that can be used and headers that can be sent with CORS-enabled requests.

```text
cors.enabled=false
cors.allowed.origin.patterns=*
cors.allowed.methods=GET,POST,HEAD,OPTIONS,PUT,DELETE
cors.allowed.headers=Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token
cors.exposed.headers=Access-Control-Allow-Origin,Access-Control-Allow-Credentials
cors.support.credentials=truecors.preflight.maxage=10
```

|Property|Description|
|--------|-----------|
|cors.allowed.origins|Specifies A list of origins for which cross-origin requests are permitted. A value specified may be a specific domain, e.g `https://domain32.com`, or the CORS defined special value `*` for all origins. For matched pre-flight and actual requests the Access-Control-Allow-Origin response header can be either be the matched domain value or to `*`. **Note:** The CORS spec does not allow `*` when `allowCredentials` is set to `true` and `cors.allowed.origin.patterns` should be used instead.|
|cors.allowed.origin.patterns|Alternative to `cors.allowed.origins` supports the more flexible origins patterns and `*` can be used anywhere in the host name in addition to port lists. For example: `https://*.domain32.com` domains ending with `domain32.com`, `https://*.domain32.com:[8080,8081]` domains ending with `domain32.com` on port `8080` or port `8081`, and `https://*.domain32.com:[*]`- domains ending with domain32.com on any port, including the default port. In contrast to `cors.allowed.origins` which only supports `*` and cannot be used with `allowCredentials`, when a `cors.allowed.origin.patterns` is matched, the Access-Control-Allow-Origin response header is set to the matched origin and not `*` including the pattern. `cors.allowed.origin.patterns` can be used together with `setAllowCredentials(java.lang.Boolean)` set to true.|
|cors.allowed.methods|Configures which HTTP requests are permitted. GET, POST, HEAD, OPTIONS, PUT, DELETE|
|cors.allowed.headers|Specifies the headers that can be set manually or programmatically in the request headers in addition to the ones set by the user agent (for example, Connection). The default values are: <br><br>Authorization<br><br>Content-Type<br><br>Cache-Control<br><br>X-Requested-With<br><br>Accept<br><br>Origin<br><br>Access-Control-Request-Method<br><br>Access-Control-Request-Headers<br><br>X-CSRF-Token|
|cors.exposed.headers|Allows you to whitelist the headers that the client can access from the server. The default value exposes the following headers:<br><br>Access-Control-Allow-Origin<br><br>Access-Control-Allow-Credentials|
|cors.support.credentials|Determines whether HTTP cookie and HTTP Authentication-based credentials are allowed. The default value is `true`.|
|cors.preflight.maxage|Preflighted requests use the `OPTIONS` method to first verify the resource availability and then request it. This property determines the maximum time (in minutes) for caching a preflight request. The default value is `10`.|

To disable CORS set the following property in the `activiti-app.properties` file:

```text
cors.enabled=false
```

## Cross-Site Request Forgery (CSRF)

Cross-Site Request Forgery, also referred to as CSRF, is one of the most common form of attacks plaguing web browsers. This type of attack results in a malicious request being submitted on a user’s behalf without their consent.

Typically, when the CSRF setting is enabled and an HTTP request against a web application is made, then the token values sent from the client to the server are validated to prevent unauthorized requests that were not generated by the server. The CSRF tokens are usually stored on the server and verified every time a request is sent. However, in Process Services, this feature has been implemented slightly differently, wherein, CSRF tokens are generated on the client instead of the server and placed in a cookie `CSRF-TOKEN` and a header `X-CSRF-TOKEN`. The server side then verifies if the header and cookie values match.

Where:

* `X-CSRF-TOKEN` = header value
* `CSRF-TOKEN` = cookie value

This provides extra security as the cookie that belongs to Process Services can only be accessed for pages generated 
or served by the Process Services domain.

>**Note:** The CSRF protection is only available for resources used by the web application, such as the private REST API (not public REST API).

By default, the CSRF protection setting is enabled in Process Services, however to disable it, make the following changes:

1. Open the `activiti-app.properties` file from the `<ActivitiInstall>/tomcat/lib` folder.
2. Locate the `security.csrf.disabled` setting and then modify it to `true`. For example: `security.csrf.disabled=true`

## License configuration

If you start up the application without a license, it will enter read only mode; however, you can upload a license from the user interface at a later stage. In this situation, use the following configuration properties to configure the license.

|Property|Description|
|--------|-----------|
|license.multi-tenant|If no license is available on first bootstrap this property decides if system will go into single or multi-tenant mode. The default value is `false`. |
|license.default-tenant|If no license is available on first bootstrap this property decides the name of the default tenant. The default value is `tenant`. |
|license.allow-upload|Decides if license uploads should be allowed in the system or not. The default value is `true`. |

## Cookie configuration

Process Services uses an HTTP cookie to store a user session. You can use multiple cookies for different browsers and devices. The application uses a database table to store the cookie values (called **tokens** internally), to allow a shared persistent session store in a multi-node setup.

It’s possible to change the settings regarding cookies:

|Property|description|default|
|--------|-----------|-------|
|security.cookie.max-age|The maximum age of a cookie, expressed in seconds. The max-age determines the period in which the browser will send the cookie with the requests.|2678400 (31 days)|
|security.cookie.refresh-age|The age of a cookie before it is refreshesd. Refreshing means a new token will be created and a new cookie will be returned which the browser will use for subsequent requests. Setting the refresh-age low, will result in many new database rows when the user is using the application.To avoid that a user is suddenly logged out when using the application when reaching the max-age above, tokens are refreshed after this period (expressed in seconds).|86400 (1 day)|

By default, cookies will have the `secure` flag set, when the request being made is HTTPS. If you only want to use the remember-me cookie over HTTPS (i.e. make the *secure* flag mandatory), set the property `security.cookie.always-secure` to `true`.

To avoid that the persistent token table gets too full, a background job periodically removes obsolete cookie token values. Possible settings:

|Property|description|default|
|--------|-----------|-------|
|security.cookie.database-removal.max-age|The maximum age an entry in the database needs to have to be removed.|Falls back to the `security.cookie.max-age` setting if not found. This effectively means that cookies which are no longer valid could be removed immediately from the database table.|
|security.cookie.database-removal.cronExpression|The cron expression determining when the obsolete database table entries for the cookie values will be checked for removal.|`0 0 1 * * ?` (01:00 at night)|
