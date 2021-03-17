---
author: Alfresco Documentation
source: 
---

# Configuring the Alfresco OAuth 2 Authorization server

You can configure the Alfresco OAuth 2.0 Authorization server using the application.properties file.

You can provide the application.properties file in the following locations:

-   A /config subdirectory of the current directory
-   The current directory
-   A classpath /config package
-   The classpath root

The server loads the properties from the application.properties file in order of precedence. The properties defined in locations higher in the list override those defined in lower locations.

The properties file contains the following properties

|Property|Description|Default Value|
|--------|-----------|-------------|
|`Server.port`|Specifies the port on which the Authorization server runs.|`9191`|
|`zuul.routes.ecm.url`|Specifies the end-point URL for Alfresco Cloud Services installation to use.|`http://localhost:8080`|
|`zuul.routes.bpm.url`|Specifies the end-point URL for Alfresco Process Services installation to use.|`http://localhost:9999`|
|`zuul.routes.ecm.path`|Specifies the default path for ECM requests. For example, http://localhost:9191/ecm/alfresco/api/-default-/public/alfresco/versions/1/people.|`/ecm`|
|`zuul.routes.bpm.path`|Specifies the default path for the BPM requests. For example, http://localhost:9191/bpm/activiti-app/api/enterprise/app-version.|`/bpm`|
|`authentication.oauth.jwt`|Enables or disables the use of JWT tokens. Set it to `true` to instruct the server to use JWT tokens. Set it to `false` to configure the server to use the proprietary Alfresco token.|`false`|
|`authentication.oauth.corsFilter=true`|Enable \(true\) or disable \(false\) CORS requests.|`false`|
|`authentication.oauth.ecm`|Enables \(true\) or disables \(false\) authentication against Alfresco Content Services.|`true`|
|`authentication.oauth.bpm`|Enables \(true\) or disables \(false\) authentication against Alfresco Process Services.|`true`|
|`authentication.oauth.tokenValidityInSeconds`|Specifies the token lifetime or the lifetime in seconds of the access token.|`604800`|

**Parent topic:**[OAuth 2 SSO overview](../concepts/OAuth-overview.md)

