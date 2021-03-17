---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring the Alfresco Transformation client

You can configure the Alfresco Transformation client by defining several parameters.

There are three ways that you can configure the Alfresco Transformation client:

-   Using the alfresco-global.properties file
-   Using a JMX client, if you have installed the Oracle Java SE Development Kit \(JDK\)
-   Using the default-configuration.properties file

**Transformation timeout considerations**

There are a number of timeout settings in Alfresco Content Services that affect the Document Transformation Engine. These are the defaults:

```
content.transformer.default.timeoutMs=120000
transformserver.transformationTimeout=300
transformer.timeout.default=300
```

`content.transformer.default.timeoutMs` is the system transformation timeout \(set to 120000 milliseconds by default\), but the Document Transformation Engine is controlled by `transformserver.transformationTimeout` and `transformer.timeout.default`. This means that with the default settings, Alfresco Content Services stops processing after 120 seconds, where the Document Transformation Engine attempts to transform a document for up to 300 seconds and any results returned after 120 seconds are ignored.

If you set the following:

```
transformserver.transformationTimeout=120
transformer.timeout.default=120
```

the Document Transformation Engine stops processing at the same time as the default system transformation timeout.

**Parent topic:**[Configuring the Document Transformation Engine](../concepts/transerv-config.md)

## Configuration using the global properties file

You configure the Alfresco Transformation client by adding the relevant properties to the global properties file.

1.  Open the alfresco-global.properties file.

2.  Add the required properties for configuration settings on the Alfresco Transformation client.

3.  Save the alfresco-global.properties file, and then restart your server.


The following table shows an overview of the available properties:

|Property|Default value|Description|
|--------|-------------|-----------|
|`transformserver.aliveCheckTimeout`|2|Sets the timeout for the connection tester in seconds. If the Document Transformation Engine does not answer in this time interval, it is considered to be off line.|
|`transformserver.test.cronExpression`|0/10 \* \* \* \* ?|Sets the cron expression that defines how often the connection tester will check. The default value is every 10 seconds.|
|`transformserver.disableSSLCertificateValidation`|false|Set this property to true to allow self-signed certificates \(that is, it is not issued by an official Cert Authority\).|
|`transformserver.username`|alfresco|The user name used to connect to the Document Transformation Engine. **Note:** **Do not change** this default.

|
|`transformserver.password`|alfresco|The password used to connect to the Document Transformation Engine. **Note:** **Always change the password from the default.**

|
|`transformserver.qualityPreference`|QUALITY|There are two values for this property: -   QUALITY: optimizes the preview for quality.
-   SIZE: optimizes the preview for size. This is interesting if you have a lot of big Office documents, for example, PPT \> 100 MB.

|
|`transformserver.transformationTimeout`|300|Sets the time in seconds to wait for the transformation to complete before assuming that it has hung and therefore stop the transformation. If you are transforming very large or complex files, this time can be increased.|
|`transformserver.url`| |The URL of your Document Transformation Engine \(or the network load balancer if you are using more then one transformation engine\). Use https:// if you want to use encrypted communication between the Alfresco Content Services server and the Document Transformation Engine.|
|`transformserver.usePDF_A`|false|Use this setting to transform PDF to PDF/A or to keep PDF/A in PDF/A format.|

In a normal setup, you will always overwrite the transformserver.password and transformserver.url properties. If you want to use SSL encryption with the default certificate of the transformation engine, make sure that you set `transformserver.disableSSLCertificateValidation=true`.

## Configuration using JMX

The Alfresco Transformation client configuration parameters are exposed as JMX MBeans, which means that you can view and set the parameters using a JMX client. 

See [Runtime administration with a JMX client](../concepts/jmx-intro-config.md) for instructions on how to connect a JMX client to your server.

## Configuration using the default configuration properties file

You can configure values in the Alfresco Transformation client by adding the relevant properties to the transformation engine configuration file C:\\Program Files \(x86\)\\TransformationServer\\tomcat\\webapps\\transformation-server\\WEB-INF\\classes\\default-configuration.properties.

The following table shows an overview of the available properties:

|Property|Default value|Description|
|--------|-------------|-----------|
|`transformer.timeout.default`|300|Sets the transformer timeout value in seconds.|
|`transformer.timeout.word`| |Sets the timeout value in seconds for Word document transformation to complete.|
|`transformer.timeout.excel`| |Sets the timeout value in seconds for Excel document transformation to complete.|
|`transformer.timeout.powerpoint`| |Sets the timeout value in seconds for Powerpoint transformation to complete.|
|`transformer.word.exportMarkup`|true|When you work with a Microsoft Word document, you can add markup, for example, using Track changes and Highlight Changes options. This property controls whether or not to include the markup in the transformed Word document. To remove the markup from the transformed Word document, set the property to false.|
|`transformer.excel.maxRows`

|1000|This property determines the maximum number of rows of an Excel document that will be handled. Everything above will be ignored.

|

Use the code sample to set these document transformation timeouts:

```
# transformer timeout in seconds
transformer.timeout.default=300
transformer.timeout.word = ${transformer.timeout.default}
transformer.timeout.excel = ${transformer.timeout.default}
transformer.timeout.powerpoint = ${transformer.timeout.default}
```

