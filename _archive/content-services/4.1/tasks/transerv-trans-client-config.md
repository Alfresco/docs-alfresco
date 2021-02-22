---
author: Alfresco Documentation
---

# Configuring the Transformation Client

This section describes how to configure the Transformation Client by defining several parameters like using HTTP or HTTPS, quality settings, and so on.

There are two ways that you can configure the Alfresco Transformation Client:

-   Using the alfresco-global.properties file
-   Using a JMX client

**Parent topic:**[Configuring the Alfresco Transformation Server](../concepts/transerv-config.md)

## Configuration using the global properties file

You configure the Transformation Client by adding the relevant properties to the Alfresco global properties file.

1.  Open the alfresco-global.properties file.

2.  Add the required properties for configuration settings on the Transformation Client.

3.  Save the alfresco-global.properties file, and then restart your Alfresco server.


The following table shows an overview of the available properties:

|Property|Default value|Description|
|--------|-------------|-----------|
|`transformserver.aliveCheckTimeout`|2|Sets the timeout for the connection tester in seconds. If the transformation server does not answer in this time interval, it is considered to be off line.|
|`transformserver.test.cronExpression`|0/10 \* \* \* \* ?|Sets the cron expression that defines how often the connection tester will check. The default is every 10 seconds.|
|`transformserver.disableSSLCertificateValidation`|false|Set this property to true to allow self-signed certificates \(that is, it is not issued by an official Cert Authority\).|
|`transformserver.username`|alfresco|The user name used to connect to the Transformation Server. **Note:** **Do not change** this default.

|
|`transformserver.password`|alfresco|The password used to connect to the Transformation Server. **Note:** **Always change the password from the default.**

|
|`transformserver.qualityPreference`|QUALITY|There are two values for this property: -   QUALITY: optimizes the SWF preview for quality.
-   SIZE: optimizes the SWF preview for size. This is interesting if you have a lot of big office docs, for example, PPT \> 100 MB.

|
|`transformserver.transformationTimeout`|300|Sets the time in seconds to wait for the transformation to complete before assuming that it has hung and therefore stop the transformation. If you are transforming very large or complex files, this time may need to be increased.|
|`transformserver.url`| |The URL of your Transformation Server \(or the network load balancer if you are using more then one Transformation Server\). Use https:// if you want to use encrypted communication between the Alfresco server and the Transformation Server.|

In a normal setup, you will always overwrite the transformserver.password and transformserver.url properties. If you want to use SSL encryption with the default certificate of the transformation server, make sure that you set `transformserver.disableSSLCertificateValidation=true`.

## Configuration using JMX

The Transformation Client configuration parameters are exposed as JMX MBeans, which means that you can view and set the parameters using a JMX client. 

See [Runtime administration with a JMX client](../concepts/jmx-intro-config.md) for instructions on how to connect a JMX client to your Alfresco server.

