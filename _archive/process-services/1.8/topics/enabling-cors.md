---
author: Alfresco Documentation
source: 
---

# Configuring CORS

To enable Cross Origin Resource Sharing \(CORS\) in Alfresco Process Services, set the `cors.enabled` property to true in the activiti-app.properties file.

**Note:** This feature is only supported on Tomcat application server.

```
# CORS CONFIGURATION
 #
 cors.enabled=true
```

When CORS is enabled, CORS requests can be made to all endpoints under \{\{/activiti-app/api\}\}.

Also, some additional properties are made available which can be configured to further fine tune CORS. This will make CORS available only to certain origins or to restrict the valid HTTP methods that can be used and headers that can be sent with CORS-enabled requests.

```
cors.enabled=false
        cors.allowed.origins=*
        cors.allowed.methods=GET,POST,HEAD,OPTIONS,PUT,DELETE
        cors.allowed.headers=Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token
        cors.exposed.headers=Access-Control-Allow-Origin,Access-Control-Allow-Credentials
        cors.support.credentials=truecors.preflight.maxage=10
```

|Property|Description|
|--------|-----------|
|`cors.allowed.origins`|Specifies the hosts allowed in cross origin requests. By default, the value is set to `*`, which permits clients hosted on any server to access the resources.Alternatively, you can specify a host, for example, [http://www.example.org:8080](http://www.example.org:8080), which will only allow requests from this host.

Multiple entries or wildcards are not allowed for this setting.

In general, it is recommended to restrict \{\{allowedOrigins\}\} to only allow origins within your organization to make requests.

|
|`cors.allowed.methods`|Configures which HTTP requests are permitted.-   GET
-   POST
-   HEAD
-   OPTIONS
-   PUT
-   DELETE

|
|`cors.allowed.headers`|Specifies the headers that can be set manually or programmatically in the request headers in addition to the ones set by the user agent \(for example, Connection\). The default values are:-   Authorization
-   Content-Type
-   Cache-Control
-   X-Requested-With
-   Accept
-   Origin
-   Access-Control-Request-Method
-   Access-Control-Request-Headers
-   X-CSRF-Token

|
|`cors.exposed.headers`|Allows you to whitelist the headers that the client can access from the server. The default value exposes the following headers:-   Access-Control-Allow-Origin
-   Access-Control-Allow-Credentials

|
|`cors.support.credentials`|Determines whether HTTP cookie and HTTP Authentication-based credentials are allowed. The default value is true.|
|`cors.preflight.maxage`|Preflighted requests use the `OPTIONS` method to first verify the resource availability and then request it. This property determines the maximum time \(in minutes\) for caching a preflight request. The default value is 10.|

To disable CORS set the following property in the activiti-app.properties file:

```
cors.enabled=false
```

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

