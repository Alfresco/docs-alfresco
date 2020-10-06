---
title: Process Services ReST API
---

Process Services comes with a ReST API. The ReST API exposes the generic Process Engine operations. It also includes a 
dedicated set of ReST API endpoints for features specific to Process Services.

**Important:** An internal ReST API also exists that is used as ReST endpoints by the JavaScript user interface. 
Do NOT use this API as the ReST API URLs might modify the product to use unsupported features. In addition, 
the internal ReST API uses a different authentication mechanism tailored towards web browser use.

## Enabling CORS

Solutions that use Process Services REST APIs may be in a different domain or port. This is known as 
Cross Origin Resource Sharing (CORS).

By default, CORS is not allowed to provide a high level of security. This can be alleviated by using web proxies which 
consolidate different domains and ports or by enabling CORS in Process Services configuration. For more information, 
see [Configuring CORS]({% link process-services/latest/config/index.md %}#configuring-cors).

## ReST API Authorization

The REST API uses authorization rules to determine a user’s access control for a process instance or task.

You can use any of the following methods for REST API user authentication:

* Basic authentication
* [OAuth 2 SSO](#oauth-2-sso-overview)
* Impersonation

If you are using basic authentication, you must set all requests with the `Authorization` header.

If you are using OAuth 2 to authenticate users for SSO, see [OAuth 2 SSO](#oauth-2-sso-overview) for more information.

If you choose to use Impersonation, you can impersonate a user with an Admin account to authenticate and set a different 
user for authorization. To enable this, add the `activiti-user` and `activiti-user-value-type` request headers to the 
REST API. Where, `activiti-user` should be set to the required user account identifier and `activiti-user-value-type` to 
the user account identifier type. The header `activiti-user-value-type` can be one of the following values:

* `userIdType`: User’s database ID
* `userEmailType`: User’s Email address
* `userExternalIdType`: User’s ID in an external authentication service such as LDAP or Active Directory

For example, in the `external-form-example` Web application, an Admin account is used for authentication and a 
different user account to implement authorization.

>**Note:** You must have an Admin role to be able to add the above request headers. In addition, the users should have already been added to Process Services manually, or by synchronization with LDAP or Active Directory.

### OAuth 2 SSO overview

The OAuth 2.0 authorization framework enables an application to access protected resources on behalf of a user 
without storing a password.

OAuth 2.0 defines four roles:

* **Resource owner**: Specifies the user who authorizes an application to access their account or protected resources (REST APIs).
* **Resource server**: Specifies the server hosting the protected resources (REST APIs). In this case, it is Process Services.
* **Client**: Specifies your build application that makes protected resource (REST APIs) requests on behalf of the resource owner. Before it may do so, it must be authorized by the resource owner.
* **Authorization server**: Specifies the server issuing access tokens to the client after successfully authenticating against Ping Identity, Azure Identity Services, or Site Minder.

OAuth 2 SSO support in Process Services introduces a new set of components that allow developers to leverage the 
Alfresco REST APIs using OAuth 2 authorization.

![oauth-overview]({% link process-services/images/oauth-overview.png %})

The addition of OAuth 2 in Process Services is the first step towards a single standards-authorization and 
identity services across the Alfresco Digital Business Platform. Using OAuth you can have:

* a standard-based authorization infrastructure to integrate applications and solutions using Process Services 
REST APIs with other enterprise applications which use OAuth.

* configurable integration with OAuth authorization servers that can issue OAuth 2 tokens, such as Ping Identity, Azure Identity Services, or Site Minder, with support for custom and JWT tokens.
* a unified OAuth 2 stack to facilitate OAuth 2 SSO for ADF and other applications across both Process Services and Alfresco Content Services.

#### OAuth 2 SSO features

Use this information to understand the features of OAuth 2 SSO for Process Services.

OAuth 2 introduces the following new features:

* A **built-in OAuth 2 client** delivered as a part of the Process Services. The client can request and handle OAuth 2 tokens from the OAuth 2.0 Authorization Servers.
* The **Alfresco OAuth 2 Authorization Server** - a fully functioning lightweight micro service that simplifies development, testing, and deployment of REST based applications using OAuth 2 for authorization.
* A special **OAuth 2 gateway** to Alfresco Content Services that allows use of OAuth 2 authorization to Alfresco Content Services.

>**Note:** OAuth 2 SSO does not eliminate the issues of different identity systems and requires user synchronization with the Process Services user database.

#### Installing OAuth 2 SSO for Process Services

Use this information to install OAuth 2 SSO for Process Services.

Installing OAuth 2 module:

The OAuth 2 module is an integrated library of the Process Services. It Is automatically installed as part of 
the `activiti-app` web application.

Installing Alfresco OAuth 2 Authorization server

The Alfresco OAuth 2 Authorization server is available as a java web archive (WAR) available to Process Services 
via [Alfresco's maven repository](https://artifacts.alfresco.com/nexus/content/repositories/activiti-enterprise-releases/org/alfresco/alfresco-oauth2/1.0.0/alfresco-oauth2-1.0.0.war).

#### Configuring OAuth 2 for the Process Services

To configure OAuth 2, you need to register your application with an OAuth 2 Authorization server and then configure 
the OAuth 2 client using the `activiti-app.properties` file.

**Registering with an OAuth 2 Authorization server**

When using an OAuth 2 server, you need to register your application with the authorization server.

This will vary from server to server but the server will invariably provide:

* a client Id to identify your application. This is often a part of the URLs provided by the server.
* the client secret that must be kept secret.
* an authorization URL to use in your application.

All these components are used in configuring the OAuth 2 client. For more information, see 
*Configuring the OAuth 2 client* below.

You may use an OAuth 2 Authorization server of your choice but for applications involving Alfresco Content Services, 
it is recommended that you use the Alfresco OAuth 2 Authorization server. To know more about installing and configuring 
the Alfresco OAuth 2 Authorization server, see [Configuring the Alfresco OAuth 2 Authorization server](#configoauthserver).

Note that OAuth 2 is an authorization system and not an identity management system. Although it eliminates the need for 
custom applications to login via the REST API, it still requires all users to have a profile in Process Services with a 
user name that matches the user name of the OAuth 2 Authorization server. However, there is no need for the passwords to match. 
Passwords are only useful if you want to allow users to log in to the standard Alfresco Content Services application.

You can use LDAP sync or the Alfresco Content Services Security Extensions to have a single identity service for both the 
Alfresco Content Services profiles and the OAuth 2 Authorization server.

**Configuring the OAuth 2 client**

To use the OAuth 2 client from your REST applications, you first need to configure it using the information obtained 
by the OAuth 2 authorization server.

To configure the OAuth 2 client, add the following properties to the `activiti-app.properties` file:

```text
security.oauth2.authentication.enabled=true
security.oauth2.client.clientId=alfresco
security.oauth2.client.clientSecret=secret
security.oauth2.client.checkToken=http://localhost:9191/oauth/check_token
```

|Property|Description|
|--------|-----------|
|security.oauth2.authentication.enabled|Enables or disables the OAuth 2 client. To enable the OAuth 2 client, set this property to `true`. To disable it, set this property to `false`.|
|security.oauth2.client.clientId|Specifies the credentials used by the Process Services OAuth 2 client to communicate with the OAuth 2 Authorization server.|
|security.oauth2.client.clientSecret|Specifies the credentials used by the Process Services OAuth 2 client to communicate with the OAuth 2 Authorization server.|
|security.oauth2.client.checkToken|Configures the OAuth 2 Authorization to be used. It contains the authorization URL obtained from the Authorization server.|
|security.oauth2.basicAuth.enabled|Enables or disables basic authentication when OAuth 2 is configured. The default value is `false`.|

**Using the OAuth 2 module**

After successfully configuring the Process Services OAuth 2 module, you can develop, test, and deploy the applications 
using the Process Services REST APIs and OAuth 2.

As a developer, you can integrate the OAuth 2 flow, which starts with getting the authorization token. For browser, 
mobile, and other UI-based applications, this will usually be done using a login UI interface provided by the service 
to the user. For communication purpose, the server-side applications will use the client secret.

OAuth 2 caters for four authorization scenarios called *grant types*. These are:

* **Authorization Code** for applications running on a web server, browser, or mobile app.
* **Password** for logging in with a user name and password.
* **Client credentials** for application access by confidential clients.
* **Implicit** that has been superseded by the Authorization Code scenario with a no secret code.

As a developer, you can choose the scenario that best suits your use case and the specific problem you are trying to 
solve. This will be a direct call between your code and the authorization server.

After obtaining the token, you integrate it and use it as a part of calling the Process Services REST APIs. 
This is done by adding the token as an Authorization header.

```text
Authorization: Bearer <token>
```

For example, to call the rest API for the `app-version`, either use:

```bash
GET /activiti-app/api/enterprise/app-version HTTP/1.1
Host: activiti.example.com
Authorization: Bearerd1c7dc0b-b1e1-4039-923e-55199473bd5b
```

or use:

```bash
$  curl -i -H "Authorization: Bearer d1c7dc0b-b1e1-4039-923e-55199473bd5b"
        http://localhost:8080/activiti-app/api/enterprise/app-version
```

When a REST request is made using the OAuth 2 header, Process Services acts as the Resource Server of the OAuth 2 specification. 
Using the OAuth 2 module Process Services attempts to validate the token against the OAuth 2 Authorization server. 
This is done using the URL specified in the `security.oauth2.client.checkToken` property of the `activiti-app.properties` file.

Here's an example of the HTTP call made by Process Services OAuth 2 module to validate the token:

```bash
POST /introspect HTTP/1.1
Host: ${security.oauth2.client.checkToken}
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW <- base 64 encoding ${security.oauth2.client.clientId}:${security.oauth2.client.clientSecret}

token=CHECK_ACCESS_TOKEN
```

The Authorization server responds with a JSON object as specified in the [Introspection Response of the OAuth 2 specification](https://tools.ietf.org/html/rfc7662#section-2.2). 
One of the properties of the object is the user name, which matches the user name found in the user database of Process Services. 
This allows the process service to identify which registered user is the one associated to the REST request.

Spring security is used to call the OAuth 2 server and validate the token. Token validation is an area that has been standardised recently. 
For more information, see [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662). Commercial OAuth 2 servers or 
services may not be yet compliant with the standard. For more information, 
see [http://stackoverflow.com/questions/12296017](http://stackoverflow.com/questions/12296017/how-to-validate-an-oauth-2-0-access-token-for-a-resource-server).

For non-standard validation approaches, you may use `apiSecurityOverride` of the security extensibility provided by 
Process Services and override the `com.activiti.security.oauth2.Oauth2RequestHeaderService` class using `@Component(value = "ActivitiOauth2RequestHeaderService")`.

#### Configuring the Alfresco OAuth 2 Authorization server {#configoauthserver}

You can configure the Alfresco OAuth 2.0 Authorization server using the `application.properties` file.

You can provide the `application.properties` file in the following locations:

* A `/config` subdirectory of the current directory
* The current directory
* A classpath `/config` package
* The classpath root

The server loads the properties from the `application.properties` file in order of precedence. The properties defined in 
locations higher in the list override those defined in lower locations.

The properties file contains the following properties

|Property|Description|Default Value|
|--------|-----------|-------------|
|Server.port|Specifies the port on which the Authorization server runs.|`9191`|
|zuul.routes.ecm.url|Specifies the end-point URL for Alfresco Cloud Services installation to use.|`http://localhost:8080`|
|zuul.routes.bpm.url|Specifies the end-point URL for Process Services installation to use.|`http://localhost:9999`|
|zuul.routes.ecm.path|Specifies the default path for ECM requests. For example, `http://localhost:9191/ecm/alfresco/api/-default-/public/alfresco/versions/1/people`.|`/ecm`|
|zuul.routes.bpm.path|Specifies the default path for the BPM requests. For example, `http://localhost:9191/bpm/activiti-app/api/enterprise/app-version`.|`/bpm`|
|authentication.oauth.jwt|Enables or disables the use of JWT tokens. Set it to `true` to instruct the server to use JWT tokens. Set it to `false` to configure the server to use the proprietary Alfresco token.|`false`|
|authentication.oauth.corsFilter|Enable (`true`) or disable (`false`) CORS requests.|`false`|
|authentication.oauth.ecm|Enables (`true`) or disable (`false`) authentication against Alfresco Content Services.|`true`|
|authentication.oauth.bpm|Enables (`true`) or disable (`false`) authentication against Process Services.|`true`|
|authentication.oauth.tokenValidityInSeconds|Specifies the token lifetime or the lifetime in seconds of the access token.|`604800`|

#### Running the Alfresco OAuth 2 Authorization server

You can run the Alfresco OAuth 2 Authorization server as a Java executable from the command line.

```bash
java -jar alfresco-oauth2-<version>.war
```

The server provides a health check point to use:

```bash
$ curl -i -H "Authorization: Bearer <access_token>" http://localhost:9191/management/health
```

Here's the sample response:

```json
{"status":"UP"}
```

#### Using the Alfresco OAuth 2 Authorization server

The Alfresco OAuth 2 Authorization server can be used as part of the OAuth 2 flows. The server needs to be used in 
conjunction with the LDAP sync for users from the Alfresco Content Services LDAP directory.

Use this information to know how the different scenarios are supported.

**Authorization code grant type**
- - - - - - - - - - - - - - - - - 
```html
http://tools.ietf.org/html/rfc6749#section-4.1
```

The authorization code grant type is used to obtain both access tokens and refresh tokens. It is optimized for 
confidential clients, such as server side application. Since this is a redirection-based flow, the client must be 
capable of interacting with the resource owner's `user-agent` (typically, a web browser) and capable of receiving 
incoming requests (via redirection) from the Authorization server.

**Authorization Request**

Here's an example of the authorization request:

```bash
curl  -XPOST -vu alfrescoapp:secret 'http://localhost:9191/authorize?response_type=code&client_id=alfrescoapp&state=xyz&
redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
```

where:

|Parameter|Description|
|---------|-----------|
|response_type|*Required*. This value must be set to `**code**`.|
|client_id|*Required*. Specifies the client identifier.|
|redirect_uri|*Required*. Specifies the redirection endpoint after authentication.|
|state|*Optional*. Specifies an opaque value used by the client to maintain state between the request and callback sent for preventing cross-site request forgery.|

Your OAuth 2 module initiates the flow by directing the resource owner's user-agent to the authorization endpoint.

![auth-endpoint]({% link process-services/images/auth-endpoint.png %})

The Authorization server authenticates the resource owner.

![resource-owner]({% link process-services/images/resource-owner.png %})

The Authorization server establishes whether the resource owner grants or denies the client's access request.

![client-access-request]({% link process-services/images/client-access-request.png %})

Assuming the resource owner grants access, the authorization server redirects the user-agent back to the client using 
the redirection URI provided earlier.

*Response*

Here's an example of the authorization response:

```html
HTTP/1.1 302 Found Location:
http://example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz
```

where:

|Parameter|Description|
|---------|-----------|
|code|*Required*. Specifies the authorization code generated by the authorization server. The authorization code MUST expire shortly after it is issued to mitigate the risk of leaks. A maximum authorization code lifetime of 10 minute is RECOMMENDED. The client MUST NOT use the authorization code more than once.|
|state|*Required*. Specifies if this parameter was present in the client authorization request. It specifies the exact value received from the client.|

**Access Token Request**

The client makes a request to the token endpoint in order to get the `access_token`:

```bash
curl  -XPOST -vu alfrescoapp:secret
http://localhost:9191/grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
```

where:

|Parameter|Description|
|---------|-----------|
|grant_type|*Required*. This value must be set to `**authorization_code**`.|
|code|*Required*. Specifies the authorization code received from the Authorization server.|
|redirect_uri|*Required*. Specifies the redirection endpoint after authentication.|
|client_id|*Required*. Specifies if the client is not authenticating with the Authorization server.|

*Response*

Here's an example of response:

```json
{
   "access_token":"2YotnFZFEjr1zCsicMWpAA",
   "token_type":"example",
   "expires_in":3600, 
   "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
   "example_parameter":"example_value"
}
```

**Implicit grant type**
- - - - - - - - - - - - - - - - - 
The implicit grant type ([http://tools.ietf.org/html/rfc6749#section-4.2](http://tools.ietf.org/html/rfc6749#section-4.2) ) 
is used to obtain access tokens (it does not support the issuance of refresh tokens) and is optimized for public clients 
known to operate a particular redirection URI. These clients are typically implemented in a browser using a scripting 
language such as JavaScript clients or mobile applications. This flow is recommended when storing client id and client secret is not recommended

**Authorization request**

Here's an example of the authorization request:

```bash
curl  -XPOST -vu alfrescoapp:secret 'http://localhost:9191//authorize?response_type=token&
client_id=alfrescoapp&state=xyz&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb'
```

where:

|Parameter|Description|
|---------|-----------|
|response_type|*Required*. This value MUST be set to `token`.|
|client_id|*Required*. Specifies the client identifier.|
|redirect_uri|*Optional*Specifies the redirection endpoint after authentication.|
|scope|*Optional*. Specifies if the client is not authenticating with the Authorization server.|
|state|*Required*. Specifies an opaque value used by the client to maintain state between the request and callback sent for preventing cross-site request forgery.|

*Response*

If the resource owner grants access request, the Authorization server issues an access token and delivers it to the 
client. The following response is sent:

```html
HTTP/1.1 302 Found Location:
http://example.com/cb#access_token=91202244-431f-444a-b053-7f50716f2012&state=xyz&token_type=bearer&expires_in=3600
```

where:

|Parameter|Description|
|---------|-----------|
|access_token|*Required*. Specifies the access token issued by the Authorization server.|
|token_type|*Required*. Specifies the type of token.|
|expires_in|*Recommended*. Specifies the lifetime in seconds of the access token.|
|scope|*Optional*. Specifies if the client is not authenticating with the Authorization server.|
|state|*Recommended*. Specifies an opaque value used by the client to maintain state between the request and callback sent for preventing cross-site request forgery.|

**Resource owner password credentials grant type**
- - - - - - - - - - - - - - - - - 

The [resource owner password credentials grant type](http://tools.ietf.org/html/rfc6749#section-4.3) is suitable in 
cases where the resource owner has a trust relationship with the client, such as the device operating system or a 
highly privileged application.

**Access Token Request**

Here's an example of the access token request:

```
curl  -XPOST -vu alfrescoapp:secret 
'http://localhost:9191/oauth/token?username=admin&password=tiger&grant_type=password'
```

where:

|Parameter|Description|
|---------|-----------|
|grant_type|*Required*. This value MUST be set to `password`.|
|username|*Required*. Specifies the resource owner username.|
|password|*Required*. Specifies the resource owner password.|
|scope|*Optional*. Specifies if the client is not authenticating with the Authorization server.|

*Response*

Here's an example response:

```json
{
   "access_token":"821c99d4-2c9f-4990-b68d-18eacaff54b2",
   "token_type":"bearer"
   "refresh_token":"e6f8624f-213d-4343-a971-980e83f734be",
   "expires_in":1799,
   "scope":"read write"
}
```

* **Fetching `access_token` by submitting `refresh_token`**
    * **Request**

        Here's an example request:

        ```
        curl  -XPOST -vu alfrescoapp:secret
        'http://localhost:9191/oauth/token?grant_type=refresh_token&refresh_token=<refresh_token>'
        ```

        where:

        |Parameter|Description|Notes|
        |---------|-----------|-----|
        |`grant_type`|This value Value MUST be set to `refresh_token`.|Required|
        |`refresh_token`|Specifies the refresh token issued to the client.|Required|

    * **Response**

        Here's an example response:

        ```
        {
              "access_token":"821c99d4-2c9f-4990-b68d-18eacaff54b2",
              "token_type":"bearer"
              "refresh_token":"e6f8624f-213d-4343-a971-980e83f734be",
              "expires_in":1799,
              "scope":"read write"
        }
        ```

* **Access secure resource**
    * **Request**

        ```
        curl -i -H "Authorization: Bearer <access_token>"
        http://localhost:9191/secure
        ```

    * **Response**

        ```
        Secure Hello!
        ```


**Client credentials**

The [client credentials grant type](http://tools.ietf.org/html/rfc6749#section-4.4) is not currently implemented.

* **External Token**

    As defined in the [OAuth 2 specification](https://tools.ietf.org/html/rfc6749#section-4.5), it is possible to define custom grant. You can override the generation of the token using the `grant_type`, `external_auth`. Additionally, you can submit the token and the refresh token. This grant type can be used in the scenario where the OAuth server is already present and you want to use the proxy part of this server.

    Set the following properties:

    ```
    authentication.oauth.client.accessTokenUri= http://AUTH_SERVER/oauth/token
    authentication.oauth.client.userAuthorizationUri=http://AUTH_SERVER/oauth/authorize
    authentication.oauth.client.clientId=  YOUR_CLIENT
    authentication.oauth.client.clientSecret= YOUR_SECRET
    ```

    **Access Token Request**

    Here's an example access token request:

    ```
    curl -XPOST -vu alfrescoapp:secret 
    'http://localhost:9191/oauth/token?username=admin&password=admin&access_token=YOUR_CUSTOM_TOKEN&
    refresh_token=YOUR_CUSTOM_REFRESH_TOKEN&grant_type=external_token'
    ```

    where:

    |Parameter|Description|Notes|
    |---------|-----------|-----|
    |`grant_type`|This value MUST be set to `external_token`.|Required|
    |`username`|Specifies the resource owner username.|Required|
    |`password`|Specifies the resource owner password.|Required|
    |`scope`|Specifies if the client is not authenticating with the Authorization server.|Optional|

* **Response**

    ```
    {    
         "access_token":"821c99d4-2c9f-4990-b68d-18eacaff54b2",
         "token_type":"bearer"
         "refresh_token":"e6f8624f-213d-4343-a971-980e83f734be",
         "expires_in":1799,
         "scope":"read write"
    }
    ```

## Using the ReST API Explorer
## RAML support
## Process Services ReST API
### Server Information
### Profile
### Runtime Apps
### App Definitions List
### App Import And Export
### App Publish and Deploy
### Process Definition Models List
### Model Details and History
### BPMN 2.0 Import and Export
### Process Definitions
### Start Form
### Start Process Instance
### Process Instance List
### Get Process Instance Details
### Delete a Process Instance
### Process Instance Audit Log As JSON
### Process instance variables
### Process Instance Identity links
### Task List
### Task Details
### Task Form
### Create a Standalone Task
### Task Actions
### Task Variables
### Task Identity links
### User Task Filters
### Comments
### Checklists
### Task Audit Info (as JSON)
## Process Engine ReST API


## Historic processes and tasks
### Historic process instance queries
### Get historic process instances
### Get historic task instances
### User and Group lists
### Content
### Thumbnails
### Identity Management
#### Tenants
#### Users
#### Groups
#### Alfresco Content Services repositories
