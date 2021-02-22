---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring Alfresco to work with a web proxy

There are standard JVM system properties that you can use to set proxies for various protocol handlers, such as HTTP and HTTPS. These properties are used by Surf and all other parts of the system that make http call-outs.

All proxies are defined by a host name and a port number. The port number is optional and if not specified, a standard default port will be used.

The following two properties can be set to specify the proxy that will be used by the HTTP protocol handler:

|System Properties|Description|
|-----------------|-----------|
|http.proxyHost|Specifies the host name or IP address for the proxy server.|
|http.proxyPort|Specifies the port number for the proxy server. The default port number is 80.|

The following two properties can be set to specify the proxy that will be used by the HTTPS protocol handler:

|System Properties|Description|
|-----------------|-----------|
|https.proxyHost|Specifies the host name or IP address for the proxy server when using https \(http over SSL\).|
|https.proxyPort|Specifies the port number for the proxy server when using https \(http over SSL\). The default port number is 443.|

For example, the following command directs all http connections to go through the proxy server with the IP address 172.21.1.130, and the port number 8080:

```
java -Dhttp.proxyHost=172.21.1.130 -Dhttp.proxyPort=8080
```

In addition, you can also set the following non-standard properties for authenticated proxies:

|Non-standard Properties|Description|
|-----------------------|-----------|
|http.proxyUser|Specifies the user name to use with an authenticated proxy used by the HTTP protocol handler. It should be left unset if the proxy does not require authentication.|
|http.proxyPassword|Specifies the password to use with an authenticated proxy used by the HTTP protocol handler. It should be left unset if the proxy does not require authentication.|
|https.proxyUser|Specifies the user name to use with an authenticated proxy used by the HTTPS protocol handler. It should be left unset if the proxy does not require authentication.|
|https.proxyPassword|Specifies the password to use with an authenticated proxy used by the HTTPS protocol handler. It should be left unset if the proxy does not require authentication.|

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

**Related information**  


[Controlling JVM system properties](jvm-prop.md)

