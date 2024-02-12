---
title: Configure the Document Transformation Engine
---

The standalone Document Transformation Engine can be configured using the Web Console. You only need to change the password of the transformation service.

1. Open your browser and navigate to `http://<transformation-host>:<port>/transformation-server/#/settings` or `https://` if you are using SSL.

2. Enter your login name and a password.

    By default, the login name is set to `alfresco`, and the password is set to `alfresco`. The login name `alfresco` cannot be changed.

3. Enter a new password, and then click **Change** to save the password.

<!-- WILL NEED ADDING BACK IN FOR 3.2.1
4. To set up SSL with the Document Transformation Engine, update or replace the keystore in the default location: `C:\\Program Files (x86)\\TransformationServer\\tomcat\\conf\\.keystore` using the method described in [Configuring SSL for a test environment]({% link content-services/latest/admin/security.md %}#managealfkeystores).

    See [Managing Alfresco keystores]({% link content-services/latest/config/repository.md %}#configure-ssl-for-a-test-environment) for more information about keystores.

## Configure the Alfresco Transformation client

There are three ways to configure the Alfresco Transformation client:

* Using the `alfresco-global.properties` file
* Using a JMX client, if you have installed the Oracle Java SE Development Kit (JDK)
* Using the `default-configuration.properties` file

### Transformation timeout considerations

There are a number of timeout settings in Alfresco Content Services that affect the Document Transformation Engine. These are the defaults:

```bash
content.transformer.default.timeoutMs=120000
transformserver.transformationTimeout=300
transformer.timeout.default=300
```

`content.transformer.default.timeoutMs` is the system transformation timeout (set to 120000 milliseconds by default), but the Document Transformation Engine is controlled by `transformserver.transformationTimeout` and `transformer.timeout.default`. This means that with the default settings, Alfresco Content Services stops processing after 120 seconds, whereas the Document Transformation Engine attempts to transform a document for up to 300 seconds and any results returned after 120 seconds are ignored.

Set the following to configure the Document Transformation Engine to stop processing at the same time as the default system transformation timeout:

```bash
transformserver.transformationTimeout=120
transformer.timeout.default=120
```

### Configuration using the `global-properties.file`

You configure the Alfresco Transformation client by adding the relevant properties to the global properties file.

1. Open the `alfresco-global.properties` file.

2. Add the required properties for configuration settings on the Alfresco Transformation client.

3. Save the `alfresco-global.properties` file, and then restart your server.

The following table shows an overview of the available properties:

| Property | Description |
| -------- | ----------- |
|transformserver.aliveCheckTimeout | Sets the timeout for the connection tester in seconds. If the Document Transformation Engine does not answer in this time interval, it is considered to be off line. The default value is `2`. |
| transformserver.test.cronExpression | Sets the cron expression that defines how often the connection tester will check. The default is every 10 seconds: `0/10 * * * * ?` |
| transformserver.disableSSLCertificateValidation | Set this property to true to allow self-signed certificates (that is, it is not issued by an official Cert Authority). The default is `false`.|
| transformserver.username | The user name used to connect to the Document Transformation Engine. **Note:** **Do not change** from the default `alfresco`. |
| transformserver.password | The password used to connect to the Document Transformation Engine. **Note:** **Always change** the password from the default `alfresco`. |
| transformserver.qualityPreference | There are two values for this property. The default is `QUALITY`. {::nomarkdown}<ul><li>QUALITY: optimizes the preview for quality.</li><li>SIZE: optimizes the preview for size. This is interesting if you have a lot of big Office documents, for example, PPT file over 100 MB.</li></ul>{:/} |
| transformserver.transformationTimeout | Sets the time in seconds to wait for the transformation to complete before assuming that it has hung and therefore stop the transformation. If you are transforming very large or complex files, this time can be increased. The default is `300`. |
| transformserver.url | The URL of your Document Transformation Engine (or the network load balancer if you are using more then one transformation engine). Use `https://` if you want to use encrypted communication between the Alfresco Content Services server and the Document Transformation Engine. |
| transformserver.usePDF_A | Use this setting to transform PDF to PDF/A or to keep PDF/A in PDF/A format. The default is `false`. |

In a normal setup, you will always overwrite the `transformserver.password` and `transformserver.url` properties. If you want to use SSL encryption with the default certificate of the transformation engine, make sure that you set `transformserver.disableSSLCertificateValidation=true`.

### Configuration using JMX

The Alfresco Transformation client configuration parameters are exposed as JMX MBeans, which means that you can view and set the parameters using a JMX client.

See [Using a JMX client to change settings dynamically]({% link content-services/latest/config/index.md %}#using-jmx-client-to-change-settings-dynamically) for instructions on how to connect a JMX client to your server.

### Configuration using the default configuration properties file

You can configure timeout values in the Alfresco Transformation client by adding the relevant properties to the transformation engine configuration file in `C:\\Program Files (x86)\\TransformationServer\\tomcat\\webapps\\transformation-server\\WEB-INF\\classes\\default-configuration.properties`.

Use the code sample to set these timeouts:

```bash
# transformer timeout in seconds
transformer.timeout.default=300
transformer.timeout.word = ${transformer.timeout.default}
transformer.timeout.excel = ${transformer.timeout.default}
transformer.timeout.powerpoint = ${transformer.timeout.default}
```
-->

## Configure DTE with SSL

Below is a very basic example of how to configure Secure Sockets Layer (SSL) for DTE. It forms a good starting point for customers with experience and competencies in DevOps.

1. Edit `C:\Program Files (x86)\TransformationServer\tomcat\conf\server.xml`:

    For example:

    1. Comment out this connector:

        ```xml
        <Connector executor="tomcatThreadPool"
                port="${https.port}" protocol="org.apache.coyote.http11.Http11NioProtocol"
                SSLEnabled="true">
            <SSLHostConfig>
                <Certificate certificateKeystoreFile="conf/.keystore" certificateKeystorePassword="tomcat" type="RSA" />
            </SSLHostConfig>
        </Connector>
        ```

    2. Uncomment this Connector:

        ```xml
        <Connector executor="tomcatThreadPool"
            port="${https.port}" protocol="org.apache.coyote.http11.Http11NioProtocol"
            SSLEnabled="true" scheme="https" secure="true"
            clientAuth="false" sslProtocol="TLS"
            keystoreFile="PATH_TO_KEYSTORE" keystorePass="KEYSTORE_PASSWORD" />
        ```

2. Check the REST configuration URL under: `https://<dte-hostname>:8443/transformation-server/#/settings`:

    This should be set to: `https://<dte-hostname>:8443`.

3. Edit `alfresco-global.properties`:

    Change `localTransform.transform-dte.url=http://<dte-hostname>:8080/transform-dte`

    to `localTransform.transform-dte.url=https://<dte-hostname>:8443/transform-dte`

For more information on configuring SSL on Tomcat, see the Tomcat documentation [SSL/TLS Configuration How-To](https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html){:target="_blank"}.

## Configure HTML Sanitizer

There are multiple modes you can choose from.

| Mode | Description |
| ---- | ----------- |
| Blacklist | This is the default setting. You can choose which HTML parts and attributes are not allowed. Ths setting is empty by default, but it stops Server-Side Request Forgery (SSRF) attacks. |
| Whitelist | You can choose which HTML parts and attributes are allowed. This setting is empty by default, but it stops SSRF attacks. |
| None | `None` means there is no sanitization provided at all. SSRF attacks are possible when using this mode, as it re-enables features like embedded script execution or iframe preview. <br><br>**Note:** This mode is not recommended. Administrators - use this setting at your own risk. |

Default configuration:

```xml
# Configuration for HTML sanitizer
# Sample configuration for HTML sanitizer
# Modes are WHITELIST, BLACKLIST, NONE (Use at own risk, not recommended)
sanitizer.mode=BLACKLIST
# Only works with BLACKLIST mode. Sample: sanitizer.disallowed.elements=a,script,iframe,style
sanitizer.disallowed.elements=
# Only works with BLACKLIST mode. Sample: sanitizer.disallowed.attributes=a.onclick,a.onmouseover,img.onerror,button.onclick (element.attribute)
sanitizer.disallowed.attributes=
# Only works with WHITELIST mode. Sample: sanitizer.allowed.elements=p,div,span,ul,ol,li,h1,h2,h3,a
sanitizer.allowed.elements=
# Only works with WHITELIST mode. Sample: sanitizer.allowed.attributes=a.href,a.target,img.src,img.alt,div.class (element.attribute)
sanitizer.allowed.attributes=
```

Below are some examples of how to configure the new HTML sanitizer which comes with DTE 2.4.2.

Configuration for `BLACKLIST` mode:

```xml
# Configuration for HTML sanitizer
# Sample configuration for HTML sanitizer
# Modes are WHITELIST, BLACKLIST, NONE (Use at own risk, not recommended)
sanitizer.mode=BLACKLIST
# Only works with BLACKLIST mode. Sample: sanitizer.disallowed.elements=a,script,iframe,style
sanitizer.disallowed.elements=a,script,iframe,style
# Only works with BLACKLIST mode. Sample: sanitizer.disallowed.attributes=a.onclick,a.onmouseover,img.onerror,button.onclick (element.attribute)
sanitizer.disallowed.attributes=img.onerror
```

* This mode explicitly disables the following HTML elements: `a`, `script`, `iframe`, and `style`.
* It also explicitly disables the `onError` attribute in `img` elements.

**Note:** Most of these elements are already sanitized by choosing "BLACKLIST" mode, which also prevents potential SSRF attacks.

Configuration for `WHITELIST` mode:

```xml
# Configuration for HTML sanitizer
# Sample configuration for HTML sanitizer
# Modes are WHITELIST, BLACKLIST, NONE (Use at own risk, not recommended)
sanitizer.mode=WHITELIST
# Only works with WHITELIST mode. Sample: sanitizer.allowed.elements=p,div,span,ul,ol,li,h1,h2,h3,a
sanitizer.allowed.elements=p,div,span,ul,ol,li,h1,h2,h3,a
# Only works with WHITELIST mode. Sample: sanitizer.allowed.attributes=a.href,a.target,img.src,img.alt,div.class (element.attribute)
sanitizer.allowed.attributes=img.src
```

* This mode explicitly disables the following HTML elements: `p`, `div`, `span`, `ul`, `ol`, `li`, `h1`, `h2`, `h3`, and `a`.
* It also explicitly disables the `src` attribute in `img` elements.

**Note:** You cannot enable SSRF critical elements with the whitelist.

Configuration for `None` mode:

```xml
# Configuration for HTML sanitizer
# Sample configuration for HTML sanitizer
# Modes are WHITELIST, BLACKLIST, NONE (Use at own risk, not recommended)
sanitizer.mode=NONE
```

**Important:** This mode is not recommended. Use this at your own risk.

* This mode re-enables all HTML features such as embedded script tag execution or preview of iframes.
* However, this comes with the cost of potential SSRF attacks.
* If you choose to select this mode, the behavior is exactly the same as before version 2.4.2.
