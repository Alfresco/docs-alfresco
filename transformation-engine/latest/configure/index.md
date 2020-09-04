---
title: Configure the Document Transformation Engine
---

The standalone Document Transformation Engine can be configured using the Web Console.

The Transformation Engine client can be configured using a properties file or JMX.

## Configure the standalone Document Transformation Engine

Use this information to configure the standalone Document Transformation Engine. You only need to change the password of the transformation service.

1. Open your browser and navigate to `http://<transformation-host\>:<port\>/transformation-server/settings` or `https://` if you are using SSL.

2. Enter your login name and a password.

    By default, the login name is set to `alfresco`, and the password is set to `alfresco`. The login name `alfresco` cannot be changed.

3. Enter a new password, and then click **Change** to save the password.

4. To set up SSL with the Document Transformation Engine, update or replace the keystore in the default location: `C:\\Program Files (x86)\\TransformationServer\\tomcat\\conf\\.keystore` using the method described in [Configuring SSL for a test environment](LINK).

    See [Managing Alfresco keystores](LINK) for more information about keystores.

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

If you set the following:

```bash
transformserver.transformationTimeout=120
transformer.timeout.default=120
```

the Document Transformation Engine stops processing at the same time as the default system transformation timeout.

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

See [Using a JMX client to change settings dynamically](LINK) for instructions on how to connect a JMX client to your server.

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
