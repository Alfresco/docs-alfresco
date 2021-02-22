---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Configuring the Alfresco Transformation Client

You can configure the Alfresco Transformation Client by defining several parameters; for example, by using HTTP or HTTPS.

There are three ways that you can configure the Alfresco Transformation Client:

-   Using the alfresco-global.properties file
-   Using a JMX client, if you have installed the Oracle Java SE Development Kit \(JDK\)
-   Using the default-configuration.properties file

**Transformation timeout considerations**

There are a number of timeout settings in Alfresco that affect the Document Transformation Server. These are the defaults:

```
content.transformer.default.timeoutMs=120000
transformserver.transformationTimeout=300
transformer.timeout.default=300
```

`content.transformer.default.timeoutMs` is the system transformation timeout \(set to 120000 milliseconds by default\), but the Document Transformation Server is controlled by `transformserver.transformationTimeout` and `transformer.timeout.default`. This means that with the default settings, Alfresco stops processing after 120 seconds, where the Document Transformation Server attempts to transform a document for up to 300 seconds and any results returned after 120 seconds are ignored by Alfresco.

If you set the following:

```
transformserver.transformationTimeout=120
transformer.timeout.default=120
```

the Document Transformation Server stops processing at the same time as the default Alfresco system transformation timeout.

**Parent topic:**[Configuring the Document Transformation Server](../concepts/transerv-config.md)

## Configuration using the global properties file

You configure the Alfresco Transformation Client by adding the relevant properties to the Alfresco global properties file.

1.  Open the alfresco-global.properties file.

2.  Add the required properties for configuration settings on the Alfresco Transformation Client.

3.  Save the alfresco-global.properties file, and then restart your Alfresco server.


The following table shows an overview of the available properties:

|Property|Default value|Description|
|--------|-------------|-----------|
|`transformserver.aliveCheckTimeout`|2|Sets the timeout for the connection tester in seconds. If the Document Transformation Server does not answer in this time interval, it is considered to be off line.|
|`transformserver.test.cronExpression`|0/10 \* \* \* \* ?|Sets the cron expression that defines how often the connection tester will check. The default value is every 10 seconds.|
|`transformserver.disableSSLCertificateValidation`|false|Set this property to true to allow self-signed certificates \(that is, it is not issued by an official Cert Authority\).|
|`transformserver.username`|alfresco|The user name used to connect to the Document Transformation Server. **Note:** **Do not change** this default.

|
|`transformserver.password`|alfresco|The password used to connect to the Document Transformation Server. **Note:** **Always change the password from the default.**

|
|`transformserver.qualityPreference`|QUALITY|There are two values for this property: -   QUALITY: optimizes the preview for quality.
-   SIZE: optimizes the preview for size. This is interesting if you have a lot of big Office documents, for example, PPT \> 100 MB.

|
|`transformserver.transformationTimeout`|300|Sets the time in seconds to wait for the transformation to complete before assuming that it has hung and therefore stop the transformation. If you are transforming very large or complex files, this time can be increased.|
|`transformserver.url`| |The URL of your Document Transformation Server \(or the network load balancer if you are using more then one transformation server\). Use https:// if you want to use encrypted communication between the Alfresco server and the Document Transformation Server.|
|`transformserver.usePDF_A`|false|Use this setting to transform PDF to PDF/A or to keep PDF/A in PDF/A format.|

In a normal setup, you will always overwrite the transformserver.password and transformserver.url properties. If you want to use SSL encryption with the default certificate of the transformation server, make sure that you set `transformserver.disableSSLCertificateValidation=true`.

## Configuration using JMX

The Alfresco Transformation Client configuration parameters are exposed as JMX MBeans, which means that you can view and set the parameters using a JMX client. 

See [Runtime administration with a JMX client](../concepts/jmx-intro-config.md) for instructions on how to connect a JMX client to your Alfresco server.

## Configuration using the default configuration properties file

You can configure timeout values in the Alfresco Transformation Client by adding the relevant properties to the transformation server configuration file, for example; C:\\Program Files \(x86\)\\TransformationServer\\tomcat\\webapps\\transformation-server\\WEB-INF\\classes\\default-configuration.properties.

Use the code sample to set these timeouts:

```

# transformer timeout in seconds
transformer.timeout.default=300
transformer.timeout.word = ${transformer.timeout.default}
transformer.timeout.excel = ${transformer.timeout.default}
transformer.timeout.powerpoint = ${transformer.timeout.default}
```

