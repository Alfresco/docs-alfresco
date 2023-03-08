---
title: Process Services ReST API
---

Process Services comes with a ReST API. The ReST API exposes the generic Process Engine operations. It also includes a dedicated set of ReST API endpoints for features specific to Process Services.

**Important:** An internal ReST API also exists that is used as ReST endpoints by the JavaScript user interface. Do NOT use this API as the ReST API URLs might modify the product to use unsupported features. In addition, the internal ReST API uses a different authentication mechanism tailored towards web browser use.

## Enabling CORS

Solutions that use Process Services REST APIs may be in a different domain or port. This is known as Cross Origin Resource Sharing (CORS).

By default, CORS is not allowed to provide a high level of security. This can be alleviated by using web proxies which consolidate different domains and ports or by enabling CORS in Process Services configuration. For more information, see [Configuring CORS]({% link process-services/2.0/config/index.md %}#cors).

## ReST API Authorization

The REST API uses authorization rules to determine a user’s access control for a process instance or task.

You can use any of the following methods for REST API user authentication:

* Basic authentication
* [OAuth 2 SSO](#oauth-2-sso-overview)
* Impersonation

If you are using basic authentication, you must set all requests with the `Authorization` header.

If you are using OAuth 2 to authenticate users for SSO, see [OAuth 2 SSO](#oauth-2-sso-overview) for more information.

If you choose to use Impersonation, you can impersonate a user with an Admin account to authenticate and set a different user for authorization. To enable this, add the `activiti-user` and `activiti-user-value-type` request headers to the REST API. Where, `activiti-user` should be set to the required user account identifier and `activiti-user-value-type` to the user account identifier type. The header `activiti-user-value-type` can be one of the following values:

* `userIdType`: User’s database ID
* `userEmailType`: User’s Email address
* `userExternalIdType`: User’s ID in an external authentication service such as LDAP or Active Directory

For example, in the `external-form-example` Web application, an Admin account is used for authentication and a different user account to implement authorization.

>**Note:** You must have an Admin role to be able to add the above request headers. In addition, the users should have already been added to Process Services manually, or by synchronization with LDAP or Active Directory.

### OAuth 2 SSO overview

The OAuth 2.0 authorization framework enables an application to access protected resources on behalf of a user without storing a password.

OAuth 2.0 defines four roles:

* **Resource owner**: Specifies the user who authorizes an application to access their account or protected resources (REST APIs).
* **Resource server**: Specifies the server hosting the protected resources (REST APIs). In this case, it is Process Services.
* **Client**: Specifies your build application that makes protected resource (REST APIs) requests on behalf of the resource owner. Before it may do so, it must be authorized by the resource owner.
* **Authorization server**: Specifies the server issuing access tokens to the client after successfully authenticating against Ping Identity, Azure Identity Services, or Site Minder.

OAuth 2 SSO support in Process Services introduces a new set of components that allow developers to leverage the Alfresco REST APIs using OAuth 2 authorization.

![oauth-overview]({% link process-services/images/oauth-overview.png %}){:height="356px" width="700px"}

The addition of OAuth 2 in Process Services is the first step towards a single standards-authorization and identity services across the Alfresco Digital Business Platform. Using OAuth you can have:

* a standard-based authorization infrastructure to integrate applications and solutions using Process Services REST APIs with other enterprise applications which use OAuth.

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

The OAuth 2 module is an integrated library of the Process Services. It Is automatically installed as part of the `activiti-app` web application.

Installing Alfresco OAuth 2 Authorization server

The Alfresco OAuth 2 Authorization server is available as a java web archive (WAR) available to Process Services via [Alfresco's maven repository](https://artifacts.alfresco.com/nexus/content/repositories/activiti-enterprise-releases/org/alfresco/alfresco-oauth2/1.0.0/alfresco-oauth2-1.0.0.war){:target="_blank"}.

#### Configuring OAuth 2 for the Process Services

To configure OAuth 2, you need to register your application with an OAuth 2 Authorization server and then configure the OAuth 2 client using the `activiti-app.properties` file.

**Registering with an OAuth 2 Authorization server**

When using an OAuth 2 server, you need to register your application with the authorization server.

This will vary from server to server but the server will invariably provide:

* a client Id to identify your application. This is often a part of the URLs provided by the server.
* the client secret that must be kept secret.
* an authorization URL to use in your application.

All these components are used in configuring the OAuth 2 client. For more information, see *Configuring the OAuth 2 client* below.

You may use an OAuth 2 Authorization server of your choice but for applications involving Alfresco Content Services, it is recommended that you use the Alfresco OAuth 2 Authorization server. To know more about installing and configuring the Alfresco OAuth 2 Authorization server, see [Configuring the Alfresco OAuth 2 Authorization server](#configoauthserver).

Note that OAuth 2 is an authorization system and not an identity management system. Although it eliminates the need for custom applications to login via the REST API, it still requires all users to have a profile in Process Services with a user name that matches the user name of the OAuth 2 Authorization server. However, there is no need for the passwords to match. Passwords are only useful if you want to allow users to log in to the standard Alfresco Content Services application.

You can use LDAP sync or the Alfresco Content Services Security Extensions to have a single identity service for both the Alfresco Content Services profiles and the OAuth 2 Authorization server.

**Configuring the OAuth 2 client**

To use the OAuth 2 client from your REST applications, you first need to configure it using the information obtained by the OAuth 2 authorization server.

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

After successfully configuring the Process Services OAuth 2 module, you can develop, test, and deploy the applications using the Process Services REST APIs and OAuth 2.

As a developer, you can integrate the OAuth 2 flow, which starts with getting the authorization token. For browser, mobile, and other UI-based applications, this will usually be done using a login UI interface provided by the service to the user. For communication purpose, the server-side applications will use the client secret.

OAuth 2 caters for four authorization scenarios called *grant types*. These are:

* **Authorization Code** for applications running on a web server, browser, or mobile app.
* **Password** for logging in with a user name and password.
* **Client credentials** for application access by confidential clients.
* **Implicit** that has been superseded by the Authorization Code scenario with a no secret code.

As a developer, you can choose the scenario that best suits your use case and the specific problem you are trying to solve. This will be a direct call between your code and the authorization server.

After obtaining the token, you integrate it and use it as a part of calling the Process Services REST APIs. This is done by adding the token as an Authorization header.

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

When a REST request is made using the OAuth 2 header, Process Services acts as the Resource Server of the OAuth 2 specification. Using the OAuth 2 module Process Services attempts to validate the token against the OAuth 2 Authorization server. This is done using the URL specified in the `security.oauth2.client.checkToken` property of the `activiti-app.properties` file.

Here's an example of the HTTP call made by Process Services OAuth 2 module to validate the token:

```bash
POST /introspect HTTP/1.1
Host: ${security.oauth2.client.checkToken}
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW <- base 64 encoding ${security.oauth2.client.clientId}:${security.oauth2.client.clientSecret}

token=CHECK_ACCESS_TOKEN
```

The Authorization server responds with a JSON object as specified in the [Introspection Response of the OAuth 2 specification](https://tools.ietf.org/html/rfc7662#section-2.2){:target="_blank"}. One of the properties of the object is the user name, which matches the user name found in the user database of Process Services. This allows the process service to identify which registered user is the one associated to the REST request.

Spring security is used to call the OAuth 2 server and validate the token. Token validation is an area that has been standardised recently. For more information, see [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662){:target="_blank"}. Commercial OAuth 2 servers or services may not be yet compliant with the standard. For more information, see [http://stackoverflow.com/questions/12296017](http://stackoverflow.com/questions/12296017/how-to-validate-an-oauth-2-0-access-token-for-a-resource-server){:target="_blank"}.

For non-standard validation approaches, you may use `apiSecurityOverride` of the security extensibility provided by Process Services and override the `com.activiti.security.oauth2.Oauth2RequestHeaderService` class using `@Component(value = "ActivitiOauth2RequestHeaderService")`.

#### Configuring the Alfresco OAuth 2 Authorization server {#configoauthserver}

You can configure the Alfresco OAuth 2.0 Authorization server using the `application.properties` file.

You can provide the `application.properties` file in the following locations:

* A `/config` subdirectory of the current directory
* The current directory
* A classpath `/config` package
* The classpath root

The server loads the properties from the `application.properties` file in order of precedence. The properties defined in locations higher in the list override those defined in lower locations.

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

The Alfresco OAuth 2 Authorization server can be used as part of the OAuth 2 flows. The server needs to be used in conjunction with the LDAP sync for users from the Alfresco Content Services LDAP directory.

Use this information to know how the different scenarios are supported.

**Authorization code grant type** 

```html
http://tools.ietf.org/html/rfc6749#section-4.1
```

The authorization code grant type is used to obtain both access tokens and refresh tokens. It is optimized for confidential clients, such as server side application. Since this is a redirection-based flow, the client must be capable of interacting with the resource owner's `user-agent` (typically, a web browser) and capable of receiving incoming requests (via redirection) from the Authorization server.

*Authorization Request:*

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

![auth-endpoint]({% link process-services/images/auth-endpoint.png %}){:height="286px" width="560px"}

The Authorization server authenticates the resource owner.

![resource-owner]({% link process-services/images/resource-owner.png %}){:height="382px" width="560px"}

The Authorization server establishes whether the resource owner grants or denies the client's access request.

![client-access-request]({% link process-services/images/client-access-request.png %}){:height="353px" width="560px"}

Assuming the resource owner grants access, the authorization server redirects the user-agent back to the client using 
the redirection URI provided earlier.

*Response:*

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

*Access Token Request:*

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

*Response:*

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

The implicit grant type ([http://tools.ietf.org/html/rfc6749#section-4.2](http://tools.ietf.org/html/rfc6749#section-4.2){:target="_blank"} ) is used to obtain access tokens (it does not support the issuance of refresh tokens) and is optimized for public clients known to operate a particular redirection URI. These clients are typically implemented in a browser using a scripting language such as JavaScript clients or mobile applications. This flow is recommended when storing client id and client secret is not recommended

*Authorization request:*

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
|redirect_uri|*Optional*. Specifies the redirection endpoint after authentication.|
|scope|*Optional*. Specifies if the client is not authenticating with the Authorization server.|
|state|*Required*. Specifies an opaque value used by the client to maintain state between the request and callback sent for preventing cross-site request forgery.|

*Response:*

If the resource owner grants access request, the Authorization server issues an access token and delivers it to the client. The following response is sent:

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

The [resource owner password credentials grant type](http://tools.ietf.org/html/rfc6749#section-4.3){:target="_blank"} is suitable in cases where the resource owner has a trust relationship with the client, such as the device operating system or a highly privileged application.

*Access Token Request:*

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

*Response:*

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

**Fetching `access_token` by submitting `refresh_token`**

*Request:*

Here's an example request:

```bash
curl  -XPOST -vu alfrescoapp:secret
'http://localhost:9191/oauth/token?grant_type=refresh_token&refresh_token=<refresh_token>'
```

where:

|Parameter|Description|
|---------|-----------|
|grant_type|*Required*. This value Value MUST be set to `refresh_token`.|
|refresh_token|*Required*. Specifies the refresh token issued to the client.|

*Response:*

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

**Access secure resource**

*Request:*

```bash
curl -i -H "Authorization: Bearer <access_token>"
http://localhost:9191/secure
```

*Response:*

```text
Secure Hello!
```


**Client credentials**

The [client credentials grant type](http://tools.ietf.org/html/rfc6749#section-4.4){:target="_blank"} is not currently implemented.

**External Token**

As defined in the [OAuth 2 specification](https://tools.ietf.org/html/rfc6749#section-4.5){:target="_blank"}, it is possible to define custom grant. You can override the generation of the token using the `grant_type`, `external_auth`. Additionally, you can submit the token and the refresh token. This grant type can be used in the scenario where the OAuth server is already present and you want to use the proxy part of this server.

Set the following properties:

```text
authentication.oauth.client.accessTokenUri= http://AUTH_SERVER/oauth/token
authentication.oauth.client.userAuthorizationUri=http://AUTH_SERVER/oauth/authorize
authentication.oauth.client.clientId=  YOUR_CLIENT
authentication.oauth.client.clientSecret= YOUR_SECRET
```

*Access Token Request:*

Here's an example access token request:

```bash
curl -XPOST -vu alfrescoapp:secret 
'http://localhost:9191/oauth/token?username=admin&password=admin&access_token=YOUR_CUSTOM_TOKEN&
refresh_token=YOUR_CUSTOM_REFRESH_TOKEN&grant_type=external_token'
```

where:

|Parameter|Description|
|---------|-----------|
|`grant_type`|*Required*. This value MUST be set to `external_token`.|
|`username`|*Required*. Specifies the resource owner username.|
|`password`|*Required*. Specifies the resource owner password.|
|`scope`|*Optional*. Specifies if the client is not authenticating with the Authorization server.|

*Response:*

```json
{    
     "access_token":"821c99d4-2c9f-4990-b68d-18eacaff54b2",
     "token_type":"bearer"
     "refresh_token":"e6f8624f-213d-4343-a971-980e83f734be",
     "expires_in":1799,
     "scope":"read write"
}
```

## Using the ReST API Explorer

Process Services comes with a built-in REST API Explorer. This lets you discover and test the REST APIs of a locally running Process Services instance.

The REST API Explorer is based on the [OpenAPI (Swagger) initiative](https://openapis.org/){:target="_blank"} and provides an interface for the REST API. You can browse the available API endpoints and test operations available within a particular API group.

Access the REST API Explorer at this link: `http://localhost:8080/activiti-app/api-explorer.html`.

There is also a public [REST API Explorer](https://activiti.alfresco.com/activiti-app/api-explorer.html){:target="_blank"}.

This screenshot shows what the REST API Explorer looks like:

![api-explorer-home-page]({% link process-services/images/api-explorer-home-page.png %}){:height="388px" width="574px"}

Click on a link to view the available operations for a particular group of APIs.

For example, to explore the operations on a specific entity, **Admin Tenants: Manage Tenants API**, just click on it:

![manage-tenants-api-operations]({% link process-services/images/manage-tenants-api-operations.png %}){:height="272px" width="743px"}

Click on an operation to test it against the locally running Process Services instance.

![test-manage-tenants]({% link process-services/images/test-manage-tenants.png %})

When you click **Try it out!**, you'll see the following response:

![rest-api-result]({% link process-services/images/rest-api-result.png %}){:height="740px" width="900px"}

## RAML support

Process Services provides a RAML file that works with popular REST API development tools.

The RAML file complements the REST API Explorer, providing a best-in-class enterprise tooling for APIs.

RESTful API Modeling Language (RAML) is a language to describe RESTful APIs. The language is YAML-based with a json
format available, and it provides the constructs to describe RESTful or practically-RESTful APIs. Practically-RESTful APIs are those that do not comply with the all constraints of REST.

The language aims to promote reuse, discovery and pattern-sharing, as well as merit-based emergence of patterns. Tooling for RAML varies from modeling to software life cycle management and API description conversion. For more information about RAML, see [https://raml.org](https://raml.org){:target="_blank"}.

Process Services provides a description of all enterprise REST APIs using RAML and in json format. The description follows RAML 0.8 but can easily be converted to the recent RAML 1.0 standard by using tools like Apimatic.

You can access the RAML description of all Enterprise REST APIs in Process Services using the following URL:

```html
http(s)://<Process Services host>:port/activiti-app/raml/activiti.raml
```

This URL returns the entire RAML description of the enterprise APIs.

**Using the RAML file for Process Services**

The Process Services RAML file can be used with tools supporting RAML to integrate it in API life cycle of enterprise systems.

Mulesoft provides a free RAML IDE called API Workbench. This is a plugin for the free editor, Atom, that can be used to view the Process Services RAML file. For information on how to download and setup the Atom plugin, see [http://apiworkbench.com/docs](http://apiworkbench.com/docs){:target="_blank"}.

In addition, Mulesoft provides a web-based RAML API designer that can be used to combine Process Services REST APIs in RAML-based API and system design. See [https://www.mulesoft.com/platform/api/anypoint-designer](https://www.mulesoft.com/platform/api/anypoint-designer){:target="_blank"}.

For a full list of tools that can use RAML throughout the entire application development life cycle see [http://raml.org/projects/projects](http://raml.org/projects/projects){:target="_blank"}.

## Process Services ReST API

The REST API exposes data and operations that are specific to Process Services.

In contrast to the Process Engine REST API, the Process Services REST API can be called using any user. The following sections describe the supported REST API endpoints.

### Server Information

To retrieve information about the Process Services version, use the following command:

```bash
GET api/enterprise/app-version
```

**Response:**

```json
{
   "edition": "Alfresco Activiti Enterprise BPM Suite",
   "majorVersion": "1",
   "revisionVersion": "0",
   "minorVersion": "2",
   "type": "bpmSuite",
}
```

### Profile

This operation returns account information for the current user. This is useful to get the name, email, the groups that the user is part of, the user picture, and so on.

```bash
GET api/enterprise/profile
```

**Response:**

```json
{
     "tenantId": 1,
     "firstName": "John",
     "password": null,
     "type": "enterprise",
     "company": null,
     "externalId": null,
     "capabilities": null,
     "tenantPictureId": null,
     "created": "2015-01-08T13:22:36.198+0000",
     "pictureId": null,
     "latestSyncTimeStamp": null,
     "tenantName": "test",
     "lastName": "Doe",
     "id": 1000,
     "lastUpdate": "2015-01-08T13:34:22.273+0000",
     "email": "johndoe@alfresco.com",
     "status": "active",
     "fullname": "John Doe",
     "groups": [
          {
               "capabilities": null,
               "name": "analytics-users",
               "tenantId": 1,
               "users": null,
               "id": 1,
               "groups": null,
               "externalId": null,
               "status": "active",
               "lastSyncTimeStamp": null,
               "type": 0,
               "parentGroupId": null
          },
          {
               "capabilities": null,
               "name": "Engineering",
               "tenantId": 1,
               "users": null,
               "id": 2000,
               "groups": null,
               "externalId": null,
               "status": "active",
               "lastSyncTimeStamp": null,
               "type": 1,
               "parentGroupId": null
          },
          {
               "capabilities": null,
               "name": "Marketing",
               "tenantId": 1,
               "users": null,
               "id": 2001,
               "groups": null,
               "externalId": null,
               "status": "active",
               "lastSyncTimeStamp": null,
               "type": 1,
               "parentGroupId": null
          }
     ]
}
```

To update user information (first name, last name or email):

```bash
POST api/enterprise/profile
```

The body of the request should resemble the following text:

```json
{
    "firstName" : "John",
    "lastName" : "Doe",
    "email" : "john@alfresco.com",
    "company" : "Alfresco"
}
```

To get the user picture, use following REST call:

```bash
GET api/enterprise/profile-picture
```

To change this picture, do an HTTP POST to the same URL, with the picture as multipart file in the body.

Finally, to change the password:

```bash
POST api/enterprise/profile-password
```

with a json body that looks like

```json
{
    "oldPassword" : "12345",
    "newPassword" : "6789"
}
```

### Runtime Apps

When a user logs into Process Services, the landing page is displayed containing all the apps that the user is allowed to see and use.

The corresponding REST API request to get this information is:

```bash
GET api/enterprise/runtime-app-definitions
```

**Response:**

```json
{
     "size": 3,
     "total": 3,
     "data": [
          {
               "deploymentId": "26",
               "name": "HR processes",
               "icon": "glyphicon-cloud",
               "description": null,
               "theme": "theme-6",
               "modelId": 4,
               "id": 1
          },
          {
               "deploymentId": "2501",
               "name": "Sales onboarding",
               "icon": "glyphicon-asterisk",
               "description": "",
               "theme": "theme-1",
               "modelId": 1002,
               "id": 1000
          },
          {
               "deploymentId": "5001",
               "name": "Engineering app",
               "icon": "glyphicon-asterisk",
               "description": "",
               "theme": "theme-1",
               "modelId": 2001,
               "id": 2000
          }
     ],
     "start": 0
}
```

The `id` and `modelId` property of the apps are important here, as they are used in various operations described below.

### App Definitions List

When a user logs into Process Services, the landing page is displayed containing all the apps that the user is allowed to see and use.

The corresponding REST API request to get this information is:

```bash
GET api/enterprise/runtime-app-definitions
```

**Response:**

```json
{
     "size": 3,
     "total": 3,
     "data": [
          {
               "deploymentId": "26",
               "name": "HR processes",
               "icon": "glyphicon-cloud",
               "description": null,
               "theme": "theme-6",
               "modelId": 4,
               "id": 1
          },
          {
               "deploymentId": "2501",
               "name": "Sales onboarding",
               "icon": "glyphicon-asterisk",
               "description": "",
               "theme": "theme-1",
               "modelId": 1002,
               "id": 1000
          },
          {
               "deploymentId": "5001",
               "name": "Engineering app",
               "icon": "glyphicon-asterisk",
               "description": "",
               "theme": "theme-1",
               "modelId": 2001,
               "id": 2000
          }
     ],
     "start": 0
}
```

The `id` and `modelId` property of the apps are important here, as they are used in various operations described below.

### App Import And Export

It is possible to export app definitions and import them again. From the REST API point of view, this is useful to bootstrap an environment (for users or continuous integration).

To export an app definition, you need the `modelId` from a runtime app or the `id` of an app definition model, and call:

```bash
GET api/enterprise/app-definitions/{modelId}/export
```

This will return a zip file containing the app definition model and all related models (process definitions and forms).

To import an app again, post the zip file as multipart file to:

```bash
POST api/enterprise/app-definitions/import
```

To import an app to an existing app definition to create a new version instead of importing a new app definition, post the zip file as multipart file to:

```bash
POST api/enterprise/app-definitions/{modelId}/import
```

### App Publish and Deploy

Before an app model can be used, it needs to be published. This can be done through following call:

```bash
POST api/enterprise/app-definitions/{modelId}/publish
```

A JSON body is required for the call. You can either use an empty one or the following example:

```json
{
    "comment": "",
    "force": false
}
```

To add it to your landing page, `deploy` the published app:

```bash
POST api/enterprise/runtime-app-definitions
```

Where, `appDefinitions` is an array of IDs, for example:

```json
{
    "appDefinitions" : [{"id" : 1}, {"id" : 2}]
}
```

### Process Definition Models List

To retrieve a list of process definition models:

```bash
GET api/enterprise/models?filter=myprocesses&modelType=0&sort=modifiedDesc
```

The request parameters

* `filter` : Possible values: `myprocesses`, `sharedWithMe`, `sharedWithOthers`, `favorite`.
* `modelType` : Must be `0` for process definition models.
* `sort` : Possible values: `modifiedDesc`, `modifiedAsc`, `nameAsc`, `nameDesc` (default `modifiedDesc`).

### Model Details and History

Both app definition and process definition models are versioned.

To retrieve details about a particular model (process, form, decision rule or app):

```bash
GET api/enterprise/models/{modelId}
```

**Example response:**

```json
{
     "createdBy": 1,
     "lastUpdatedBy": 1,
     "lastUpdatedByFullName": " Administrator",
     "name": "aad",
     "id": 2002,
     "referenceId": null,
     "favorite": false,
     "modelType": 0,
     "comment": "",
     "version": 3,
     "lastUpdated": "2015-01-10T16:24:27.893+0000",
     "stencilSet": 0,
     "description": "",
     "createdByFullName": " Administrator",
     "permission": "write",
     "latestVersion": true
}
```

The response shows the current version of the model.

To retrieve a thumbnail of the model:

```bash
GET api/enterprise/models/{modelId}/thumbnail
```

To get the version information for a model:

```bash
GET api/enterprise/models/{modelId}/history
```

**Example response:**

```json
{
     "size": 2,
     "total": 2,
     "data": [
          {
               "createdBy": 1,
               "lastUpdatedBy": 1,
               "lastUpdatedByFullName": " Administrator",
               "name": "aad",
               "id": 3000,
               "referenceId": null,
               "favorite": null,
               "modelType": 0,
               "comment": "",
               "version": 2,
               "lastUpdated": "2015-01-10T16:15:50.579+0000",
               "stencilSet": 0,
               "description": "",
               "createdByFullName": " Administrator",
               "permission": null,
               "latestVersion": false
          },
          {
               "createdBy": 1,
               "lastUpdatedBy": 1,
               "lastUpdatedByFullName": " Administrator",
               "name": "aad",
               "id": 2000,
               "referenceId": null,
               "favorite": null,
               "modelType": 0,
               "comment": null,
               "version": 1,
               "lastUpdated": "2015-01-10T16:07:41.831+0000",
               "stencilSet": 0,
               "description": "",
               "createdByFullName": " Administrator",
               "permission": null,
               "latestVersion": false
          }
     ],
     "start": 0
}
```

To get a particular older version:

```bash
GET api/enterprise/models/{modelId}/history/{modelHistoryId}
```

To create a new model:

```bash
POST api/enterprise/models/
```

with a json body that looks like:

```json
{
    "modelType": 0,
    "name": "My process",
    "description": "This is my favourite process!"
}
```

The modelType property defines the kind of model that is created:

* 0 is a BPMN 2.0 process model
* 1 is a step process model
* 2 is a form model
* 3 is an app model
* 4 is a decision table model

Following properties are optional:

* *stencilSet* : the identifier of the stencilset in case a non-default stencilset needs to be used.

To update the details of a model:

```bash
PUT api/enterprise/models/{modelId}
```

with a json body that looks like:

```json
{
    "name": "New name",
    "description": "New description"
}
```

To favorite a model:

```bash
PUT api/enterprise/models/{modelId}
```

with as json body:

```json
{
    "favorite": true
}
```

To delete a model:

```bash
DELETE api/enterprise/models/{modelId}
```

To duplicate a model:

```bash
POST api/enterprise/models/{modelId}/clone
```

with as json body:

```json
{
    "name": "Cloned model"
}
```

To convert a step process to a BPMN 2.0 process, add `"modelType" : 0` to the body.

### BPMN 2.0 Import and Export

To export a process definition model to a BPMN 2.0 XML file:

```bash
GET api/enterprise/models/{processModelId}/bpmn20
```

For a previous version of the model:

```bash
GET api/enterprise/models/{processModelId}/history/{processModelHistoryId}/bpmn20
```

To import a BPMN 2.0 xml file:

```bash
POST api/enterprise/process-models/import
```

With the BPMN 2.0 XML file in the body as a multipart file and the file as value for the `file` property.

### Process Definitions

Get a list of process definitions (visible within the tenant of the user):

```bash
GET api/enterprise/process-definitions
```

**Example response:**

```json
{
     "size": 5,
     "total": 5,
     "data": [
          {
            "id": "demoprocess:1:7504",
            "name": "Demo process",
            "description": null,
            "key": "demoprocess",
            "category": "http://www.activiti.org/test",
            "version": 1,
            "deploymentId": "7501",
            "tenantId": "tenant_1",
            "hasStartForm": true
          },
          ...
     ],
     "start": 0
}
```

Following parameters are available:

* `latest`: A boolean value, indicating that only the latest versions of process definitions must be returned.
* `appDefinitionId`: Returns process definitions that belong to a certain app.

To get the candidate starters associated to a process definition:

```bash
GET api/enterprise/process-definitions/{processDefinitionId}/identitylinks/{family}/{identityId}
```

Where:

* `processDefinitionId`: The ID of the process definition to get the identity links for.
* `family`: Indicates groups or users, depending on the type of identity link.
* `identityId`: The ID of the identity.

To add a candidate starter to a process definition:

```bash
POST api/enterprise/process-definitions/{processDefinitionId}/identitylinks
```

**Request body (user)**:

```json
{
    "user" : "1"
}
```

**Request body (group)**:

```json
{
    "group" : "1001"
}
```

To delete a candidate starter from a process definition:

```bash
DELETE api/enterprise/process-definitions/{processDefinitionId}/identitylinks/{family}/{identityId}
```

### Start Form

When process definition has a start form (`hasStartForm` is `true` as in the call above), the start form can be 
retrieved as follows:

```bash
GET api/enterprise/process-definitions/{process-definition-id}/start-form
```

**Example response:**

```json
{
  "processDefinitionId": "p1:2:2504",
  "processDefinitionName": "p1",
  "processDefinitionKey": "p1",
  "fields": [
    {
      "fieldType": "ContainerRepresentation",
      "id": "container1",
      "name": null,
      "type": "container",
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "optionType": null,
      "hasEmptyValue": null,
      "options": null,
      "restUrl": null,
      "restIdProperty": null,
      "restLabelProperty": null,
      "layout": null,
      "sizeX": 0,
      "sizeY": 0,
      "row": 0,
      "col": 0,
      "visibilityCondition": null,
      "fields": {
        "1": [
          {
            "fieldType": "FormFieldRepresentation",
            "id": "label1",
            "name": "Label1",
            "type": "text",
            "value": null,
            "required": false,
            "readOnly": false,
            "overrideId": false,
            "placeholder": null,
            "optionType": null,
            "hasEmptyValue": null,
            "options": null,
            "restUrl": null,
            "restIdProperty": null,
            "restLabelProperty": null,
            "layout": {
              "row": 0,
              "column": 0,
              "colspan": 1
            },
            "sizeX": 1,
            "sizeY": 1,
            "row": 0,
            "col": 0,
            "visibilityCondition": null
          }
        ],
        "2": [ ]
      }
    },
    {
      "fieldType": "DynamicTableRepresentation",
      "id": "label21",
      "name": "Label 21",
      "type": "dynamic-table",
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "optionType": null,
      "hasEmptyValue": null,
      "options": null,
      "restUrl": null,
      "restIdProperty": null,
      "restLabelProperty": null,
      "layout": {
        "row": 10,
        "column": 0,
        "colspan": 2
      },
      "sizeX": 2,
      "sizeY": 2,
      "row": 10,
      "col": 0,
      "visibilityCondition": null,
      "columnDefinitions": [
        {
          "id": "p2",
          "name": "c2",
          "type": "String",
          "value": null,
          "optionType": null,
          "options": null,
          "restUrl": null,
          "restIdProperty": null,
          "restLabelProperty": null,
          "required": true,
          "editable": true,
          "sortable": true,
          "visible": true
        }
      ]
    }
  ],
  "outcomes": [ ]
}
```

Note: To retrieve field values such as the `typeahead` field, use the following REST endpoint:

```bash
GET api/enterprise/process-definitions/{processDefinitionId}/start-form-values/{field}
```

This returns a list of form values.

### Start Process Instance

To start process instances, use:

```bash
POST api/enterprise/process-instances
```

With a json body that contains following properties:

* `processDefinitionId`: The process definition identifier. Do not use it with processDefinitionKey.
* `processDefinitionKey`: The process definition key. Do not use it with `processDefinitionId`.
* `name`: The name to give to the created process instance.
* `values`: A JSON object with the form field Id and form field values. The Id of the form field is retrieved from the start form call (see above).
* `outcome`: If the start form has outcomes, this is one of those values.
* `variables`: Contains a JSON array of variables. Values and outcomes can’t be used with variables.

The response will contain the process instance details including the ID.

Once started, the completed form (if defined) can be fetched using:

```bash
GET /enterprise/process-instances/{processInstanceId}/start-form
```

### Process Instance List

To get the list of process instances:

```bash
POST api/enterprise/process-instances/query
```

with a json body containing the query parameters. The following parameters are possible:

* `processDefinitionId`
* `appDefinitionId`
* state (possible values are `running`, `completed` and `all`)
* sort (possible values are `created-desc`, `created-asc`, `ended-desc`, `ended-asc`)
* start (for paging, default 0)
* size (for paging, default 25)

**Example response:**

```json
{
    "size": 6,
    "total": 6,
    "start": 0,
    "data":[
            {"id": "2511", "name": "Test step - January 8th 2015", "businessKey": null, "processDefinitionId": "teststep:3:29"...},
            ...
    ]
}
```

To get a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}
```

To get diagram for a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}/diagram
```

To delete a Process Instance:

```bash
DELETE api/enterprise/process-instances/{processInstanceId}
```

To suspend a process instance:

```bash
PUT api/enterprise/process-instances/{processInstanceId}/suspend
```

To activate a process instance:

```bash
PUT api/enterprise/process-instances/{processInstanceId}/activate
```

Where, `processinstanceId` is the Id of the process instance.

### Get Process Instance Details

```bash
GET api/enterprise/process-instances/{processInstanceId}
```

### Delete a Process Instance

```bash
DELETE api/enterprise/process-instances/{processInstanceId}
```

### Process Instance Audit Log As JSON

If you need the audit log information as a JSON you can use the next URL:

```bash
GET api/enterprise/process-instances/{process-instance-id}/audit-log
```

**Response**

**`200 Ok`**

Returns a JSON string representing the full audit log for the requested process instance. For example:

```json
{
  "processInstanceId": "5",
  "processInstanceName": "myProcessInstance",
  "processDefinitionName": "TEST decision process",
  "processDefinitionVersion": "1",
  "processInstanceStartTime": "Wed Jan 20 16:18:46 EET 2016",
  "processInstanceEndTime": null,
  "processInstanceInitiator": "Mr Activiti",
  "entries": [
    {
      "index": 1,
      "type": "startForm",
      "timestamp": "Wed Jan 20 16:18:46 EET 2016",
      "selectedOutcome": null,
      "formData": [
        {
          "fieldName": "Text1",
          "fieldId": "text1",
          "value": "TEST"
        }
      ],
      "taskName": null,
      "taskAssignee": null,
      "activityId": null,
      "activityName": null,
      "activityType": null
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:05 GMT 2017",
      "durationInMillis": 1
    },
    {
      "index": 2,
      "type": "activityExecuted",
      "timestamp": "Wed Jan 20 16:18:46 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": null,
      "activityId": "startEvent1",
      "activityName": "",
      "activityType": "startEvent"
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    },
    {
      "index": 3,
      "type": "activityExecuted",
      "timestamp": "Wed Jan 20 16:18:47 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": null,
      "activityId": "sid-15E18ED8-252F-4A24-9E93-68F53FE28535",
      "activityName": "",
      "activityType": "serviceTask"
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    },
    {
      "index": 4,
      "type": "activityExecuted",
      "timestamp": "Wed Jan 20 16:18:48 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": null,
      "activityId": "sid-001FD811-C171-40E3-9C62-602621672022",
      "activityName": "",
      "activityType": "userTask"
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    },
    {
      "index": 5,
      "type": "taskCreated",
      "timestamp": "Wed Jan 20 16:18:48 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": "Mr Activiti",
      "activityId": null,
      "activityName": null,
      "activityType": null
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    }
  ],
  "decisionInfo": {
    "calculatedValues": [
      {
        "name": "outputVariable1",
        "value": "1.0"
      }
    ],
    "appliedRules": [
      {
        "title": "Rule 1 (TEST Decision Table 1)",
        "expressions": [
          {
            "type": "CONDITION",
            "variable": "text1",
            "value": "== 'TEST'"
          },
          {
            "type": "OUTCOME",
            "variable": "outputVariable1",
            "value": "1"
          }
        ]
      }
    ]
  }
}
```

### Process instance variables

A process instance can have several variables.

To get process instance variables:

```bash
GET api/enterprise/process-instances/{processInstanceId}/variables
```

Where, `processInstanceId` is the Id of the process instance.

To create process instance variables:

```bash
POST api/enterprise/process-instances/{processInstanceId}/variables
```

To update existing variables in a process instance:

```bash
PUT api/enterprise/process-instances/{processInstanceId}/variables
```

**Example response**:

```json
{
     "name":"myVariable",
     "type":"string",
     "value":"myValue"
}
```

Where:

* `name` - Name of the variable
* `type` - Type of variable, such as string
* `value` - Value of the variable

To update a single variable in a process instance:

```bash
PUT api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

To get a single variable in a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

To get all process instance variables:

```bash
GET api/enterprise/process-instances/{processInstanceId}/variables
```

To get a specific process instance variable:

```bash
GET api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

To delete a specific process instance variable:

```bash
DELETE api/enterprise/process-instances/{processInstanceId}/variables/{variableName}
```

### Process Instance Identity links

Either the users or groups involved with a process instance.

To create an identity link of a process instance:

```bash
POST api/enterprise/process-instances/{processInstanceId}/identitylinks
```

**Example request**:

```json
{
     "user": "1",
     "type": "customType"
}
```

Get identity links of a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}/identitylinks
```

Get identity links by family type of a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}/identitylinks/{family}
```

Where, `Family` should contain users or groups, depending on the identity you want to link.

To get involved people in a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}/identitylinks
```

You can get identity links for either user or groups. For example:

```bash
GET api/enterprise/process-instances/{processInstanceId}/identitylinks/users
GET api/enterprise/process-instances/{processInstanceId}/identitylinks/groups
```

### Task List

To return a list of tasks, use:

```bash
POST api/enterprise/tasks/query
```

which includes a JSON body containing the query parameters.

The following parameters are available:

* `appDefinitionId`
* `processInstanceId`
* `processDefinitionId`
* `text` (the task name will be filtered with this, using *like* semantics : `%text%`)
* `assignment`
    * `assignee` : where the current user is the assignee
    * `candidate`: where the current user is a task candidate
    * `group_x`: where the task is assigned to a group where the current user is a member of. The groups can be fetched through the profile REST endpoint
    * no value: where the current user is involved
* `state` (`completed` or `active`)
* `includeProcessVariables` (set to `true` to include process variables in the response)
* `includeTaskLocalVariables` (set to `true` to include task variables in the response)
* `sort` (possible values are `created-desc`, `created-asc`, `due-desc`, `due-asc`)
* `start` (for paging, default 0)
* `size` (for paging, default 25)

**Example response:**

```json
{
    "size": 6,
    "total": 6,
    "start": 0,
    "data":[
            {
                "id": "2524",
                "name": "Task",
                "description": null,
                "category": null,
                "assignee":{"id": 1, "firstName": null, "lastName": "Administrator", "email": "admin@app.activiti.com"},
                "created": "2015-01-08T10:58:37.193+0000",
                "dueDate": null,
                "endDate": null,
                "duration": null,
                "priority": 50,
                "processInstanceId": "2511",
                "processDefinitionId": "teststep:3:29",
                "processDefinitionName": "Test step",
                "processDefinitionDescription": null,
                "processDefinitionKey": "teststep",
                "processDefinitionCategory": "http://www.activiti.org/test",
                "processDefinitionVersion": 3,
                "processDefinitionDeploymentId": "26",
                "formKey": "5"
            }
            ...
    ]
}
```

### Task Details

```bash
GET api/enterprise/tasks/{taskId}
```

Response is similar to the list response.

### Task Form

```bash
GET api/enterprise/task-forms/{taskId}
```

The response is similar to the response from the Start Form.

To retrieve Form field values that are populated through a REST back-end:

```bash
GET api/enterprise/task-forms/{taskId}/form-values/{field}
```

Which returns a list of form field values

To complete a Task form:

```bash
POST api/enterprise/task-forms/{taskId}
```

with a json body that contains:

* `values`: A json object with the form field ID - form field values. The Id of the form field is retrieved from the start form call (see above).
* `outcome`: Retrieves outcome values if defined in the Start form.

To save a Task form:

```bash
POST api/enterprise/task-forms/{taskid}/save-form
```

**Example response**:

```json
{

"values": {"formtextfield":"snicker doodle"},
"numberfield":"6",
"radiobutton":"red"

}
```

Where the json body contains:

* `values` : A json object with the form field ID - form field values. The Id of the form field is retrieved from the Start Form call (see above).

To retrieve a list of variables associated with a Task form:

```bash
GET api/enterprise/task-forms/{taskid}/variables
```

**Example response**

```json
[
  {
    "id": "initiator",
    "type": "string",
    "value": "3205"
  },
  {
    "id": "FormField2",
    "type": "string",
    "value": "TestVariable2"
  },
  {
    "id": "FormField1",
    "type": "string",
    "value": "TestVariable1"
  }
]
```

### Create a Standalone Task

To create a task (for the user in the authentication credentials) that is not associated with a process instance:

```bash
POST api/enterprise/tasks
```

with a json body that contains the following properties:

* `name`
* `description`

### Task Actions

To update the details of a task:

```bash
PUT api/enterprise/tasks/{taskId}
```

with a json body that can contain `name`, `description` and `dueDate` (ISO 8601 string)

For example:

**Example request body:**

```json
{
  "name" : "IchangedTaskName",
  "description" : "description-updated",
  "dueDate" : "2015-01-11T22:59:59.000Z",
  "priority":10,
  "formKey": "100"
}
```

To delegate a task:

```bash
PUT api/enterprise/tasks/{taskId}/action/delegate
```

**Example request body**:

```json
{
     "userId": "1000"
}
```

To resolve a task:

```bash
PUT api/enterprise/tasks/{taskId}/action/resolve
```

To complete a task (standalone or without a task form) (**Note**: No json body needed!):

```bash
PUT api/enterprise/tasks/{taskId}/action/complete
```

To claim a task (in case the task is assigned to a group):

```bash
PUT api/enterprise/tasks/{taskId}/action/claim
```

No json body needed. The task will be claimed by the user in the authentication credentials.

To assign a task to a user:

```bash
PUT api/enterprise/tasks/{taskId}/action/assign
```

with a json body that contains the `assignee` property set to the `ID` of a user.

To involve a user with a task:

```bash
PUT api/enterprise/tasks/{taskId}/action/involve
```

with a json body that contains the `userId` property set to the `ID` of a user.

To remove an involved user from a task:

```bash
PUT api/enterprise/tasks/{taskId}/action/remove-involved
```

with a json body that contains the `userId` property set to the `ID` of a user.

To attach a form to a task:

```bash
PUT api/enterprise/tasks/{taskId}/action/attach-form
```

with a json body that contains the `formId` property set to the the `ID` of a form.

To attach a form to a task:

```bash
DELETE api/enterprise/tasks/{taskId}/action/remove-form
```

### Task Variables

To create new task variables:

```bash
POST api/enterprise/tasks/{taskId}/variables
```

To get all task variables:

```bash
GET api/enterprise/tasks/{taskId}/variables
```

To get a task variable by name:

```bash
GET api/enterprise/tasks/{taskId}/variables/{variableName}
```

To update an existing task variable:

```bash
PUT api/enterprise/tasks/{taskId}/variables/{variableName}
```

**Example response**:

```json
{
     "name":"myVariable",
     "scope":"local",
     "type":"string",
     "value":"myValue"
}
```

Where:

* `name` - Name of the variable.
* `scope` - Global or local. If global is provided, then the variable will be a process-instance variable.
* `type` - Type of variable, such as string.
* `value` - Value of the variable.

To delete a task variable:

```bash
DELETE api/enterprise/tasks/{taskId}/variables/{variableName}
```

To delete all task variables:

```bash
DELETE api/enterprise/tasks/{taskId}/variables
```

Where, `taskId` is the ID of the task.

### Task Identity links

To get all identity links for a task:

```bash
GET api/enterprise/tasks/{taskId}/identitylinks
```

To create an identity link on a task:

```bash
POST api/enterprise/tasks/{taskId}/identitylinks
```

**Example response**:

```json
{
     "user": "1",
     "type": "customType"
}
```

To get a single identity link on a task:

```bash
GET api/enterprise/tasks/{taskId}/identitylinks/{family}/{identityId}/{type}
```

To delete an identity link on a task:

```bash
DELETE api/enterprise/tasks/{taskId}/identitylinks/{family}/{identityId}/{type}
```

Where:

* `taskId`: The ID of the task.
* `family`: Indicates either groups or users, depending on the type of identity.
* `identityId`: The ID of the identity.
* `type`: The type of identity link.

### User Task Filters

Custom task queries can be saved as a user task filter. To get the list of task filters for the authenticated user:

```bash
GET api/enterprise/filters/tasks
```

with an option request parameter `appId` to limit the results to a specific app.

To get a specific user task filter:

```bash
GET api/enterprise/filters/tasks/{userFilterId}
```

To create a new user task filter:

```bash
POST api/enterprise/filters/tasks
```

with a json body that contains following properties:

* `name` : Name of the filter.
* `appId` : App ID where the filter can be used.
* `icon` : Path of the icon image.
* `filter`
    * `sort` : Possible values: created-desc, created-asc, due-desc, due-asc.
    * `state` : Open, completed.
    * `assignment` : Involved, assignee, or candidate.

To update a user task filter:

```bash
PUT api/enterprise/filters/tasks/{userFilterId}
```

with a json body that contains following properties:

* `name` : Name of the filter
* `appId` : App ID where the filter can be used.
* `icon` : Path of the icon image.
* `filter`
    * `sort` : Created-desc, created-asc, due-desc, due-asc.
    * `state` : Open, completed.
    * `assignment` : Involved, assignee, or candidate

To delete a user task filter:

```bash
DELETE api/enterprise/filters/tasks/{userFilterId}
```

To order the list of user task filters:

```bash
PUT api/enterprise/filters/tasks
```

with a json body that contains following properties:

* `order` : Array of user task filter IDs.
* `appId` : App ID.

To get a list of user process instance filters

```bash
GET api/enterprise/filters/processes
```

with an option request parameter `appId` to limit the results to a specific app.

To get a specific user process instance task filter:

```bash
GET api/enterprise/filters/processes/{userFilterId}
```

To create a user process instance task filter:

```bash
PUT  api/enterprise/filters/processes
```

with a json body that contains following properties:

* `name` : Name of the filter.
* `appId` : App ID where the filter can be used.
* `icon` : Path of the icon image.
* `filter`
    * `sort` : Created-desc, created-asc.
    * `state` : Running, completed, or all.

To update a user process instance task filter:

```bash
PUT  api/enterprise/filters/processes/{userFilterId}
```

with a json body that contains following properties:

* `name` : Name of the filter.
* `appId` : App ID, where the filter can be used.
* `icon` : Path of the icon image.
* `filter`
    * `sort` : Possible values: created-desc, created-asc.
    * `state` : Running, completed, or all.

To delete a user process instance task filter

```bash
DELETE  api/enterprise/filters/processes/{userFilterId}
```

### Comments

Comments can be added to a process instance or a task.

To get the list of comments:

```bash
GET api/enterprise/process-instances/{processInstanceId}/comments
```

```bash
GET api/enterprise/tasks/{taskId}/comments
```

To create a comments:

```bash
POST api/enterprise/process-instances/{processInstanceId}/comments
```

```bash
POST api/enterprise/tasks/{taskId}/comments
```

with in the json body one property called `message`, with a value that is the comment text.

### Checklists

You can add checklists to a task for tracking purposes.

To get a checklist:

```bash
GET api/enterprise/tasks/{taskId}/checklist
```

To create a checklist:

```bash
POST api/enterprise/tasks/{taskId}/checklist
```

**Example request body:**

```json
{
    "assignee": {"id": 1001},
    "name": "mySubtask",
    "parentTaskId": "20086"
}
```

To change the order of the items on a checklist:

```bash
PUT api/enterprise/tasks/{taskId}/checklist
```

with a json body that contains an ordered list of checklist items ids:

* `order` : Array of checklist item ids

### Task Audit Info (as JSON)

To obtain the audit information for a specific task in JSON format, use the following URL:

```bash
GET api/enterprise/tasks/{taskId}/audit
```

**Response**

***200 Ok***

If everything works as expected and the task is accessible to the current user, then the response will be as follows:

```json
{
  "taskId": "18",
  "taskName": null,
  "processInstanceId": "5",
  "processDefinitionName": "TEST decision process",
  "processDefinitionVersion": 1,
  "assignee": "Mr Activiti",
  "startTime": "Wed Jan 20 22:03:05 EET 2016",
  "endTime": "Wed Jan 20 22:03:09 EET 2016",
  "formData": [],
  "selectedOutcome": null,
  "comments": []
}
```

## Process Engine ReST API

The Process Engine REST API is a supported equivalent of the Activiti Open Source API. This means that all operations described in the [Activiti User Guide](http://activiti.org/userguide/index.html#_rest_api){:target="_blank"} are available as documented there, except for REST endpoints that are not relevant for the enterprise product (for example, forms, as they are implemented differently).

This REST API is available on `<your-server-and-context-root>/api/`

For example, fetching process definitions is described as an HTTP GET on `repository/process-definitions`. This maps to:

```xml
<your-server-and-context-root>/api/repository/process-definitions
```

>**Note:** You can control access to the Engine API using the “Access the Activiti REST API” capability (**Identity Management -> Capabilities**). This matches the Activiti Engine (Java) API, which is agnostic of user permissions. This means that when calling any of the operations, the tenant identifier must **always be provided in the url**, even if the system does not have multitenancy (there will always be one tenant in that case):

For example `<your-server-and-context-root>/api/repository/process-definitions?tenantId=tenant_1`

## Historic processes and tasks

This section covers the examples for querying historic process instances and task instances in the Process Services API. You can query for historic process instances and tasks to get information about ongoing and past process instances, or tasks.

### Historic process instance queries

To run a historic process instance query:

```bash
POST api/enterprise/historic-process-instances/query
```

To run a historic task instance query:

```bash
POST api/enterprise/historic-tasks/query
```

### Get historic process instances

The following table lists the request parameters to be used in the JSON body POST. For example, to filter historic process instances that completed before the given date (`startedBefore`):

```bash
POST api/enterprise/historic-process-instances/query
```

With a JSON body request:

```json
{
"startedBefore":"2016-06-16",
}
```

Example response:

```json
{
"size": 25,
"total": 200,
"start": 0,
  "data": [
    {
      "id": "2596",
      "name": "Date format example - June 7th 2016",
      "businessKey": null,
      "processDefinitionId": "dateformatexample:1:2588",
      "tenantId": "tenant_1",
      "started": "2016-06-07T14:18:34.433+0000",
      "ended": null,
      "startedBy": {
        "id": 1,
        "firstName": null,
        "lastName": "Administrator",
        "email": "admin@app.activiti.com"
      },
{
"id": "2596",
. . .
```

Where, `size` is the size of the page or number of items per page. By default, the value is `25`, `start` is the page to start on. Pages are counted from 0-N. By default, the value is 0, which means 0 will be the first page.

|`processInstanceId`|An ID of the historic process instance.|
|`processDefinitionKey`|The process definition key of the historic process instance.|
|`processDefinitionId`|The process definition id of the historic process instance.|
|`businessKey`|The business key of the historic process instance.|
|`involvedUser`|An involved user of the historic process instance. Where, `InvolvedUser` is the ID of the user.|
|`finished`|Indicates if the historic process instance is complete. Where, the value may only be `True`, as the default values are `True` or `False`.|
|`superProcessInstanceId`|An optional parent process id of the historic process instance.|
|`excludeSubprocesses`|Returns only historic process instances which aren’t sub-processes.|
|`finishedAfter`|Returns historic process instances that finished after the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.|
|`finishedBefore`|Returns historic process instances that finished before the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.|
|`startedAfter`|Returns historic process instances that were started after the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.|
|`startedBefore`|Returns historic process instances that were started before the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.|
|`startedBy`|Returns only historic process instances that were started by the selected user.|
|`includeProcessVariables`|Indicates if the historic process instance variables should be returned.|
|`tenantId`|Returns instances with the given `tenantId`.|
|`tenantIdLike`|Returns instances with a `tenantId` like the given value.|
|`withoutTenantId`|If true, only returns instances without a `tenantId` set. If false, the `withoutTenantId` parameter is ignored.|

### Get historic task instances

The following table lists the request parameters that can be used in the JSON body POST. For example, in case of `taskCompletedAfter`:

```bash
POST api/enterprise/historic-tasks/query
```

With a json body request:

```json
{
"taskCompletedAfter":"2016-06-16",
"size":50,
"start":0
}
```

Example response:

```json
{
  "size": 4,
  "total": 4,
  "start": 0,
  "data": [
    {
      "id": "7507",
      "name": "my task",
      "assignee": {
        "id": 1000,
        "firstName": "Homer",
        "lastName": "Simpson",
        "email": "homer.simpson@gmail.com"
      },
      "created": "2016-06-17T15:14:26.938+0000",
      "dueDate": null,
      "endDate": "2016-06-17T16:09:39.197+0000",
      "duration": 3312259,
      "priority": 50,
. . .
```

|`taskId`|An ID of the historic task instance.|
|`processInstanceId`|The process instance id of the historic task instance.|
|`processDefinitionKey`|The process definition key of the historic task instance.|
|`processDefinitionKeyLike`|The process definition key of the historic task instance, which matches the given value.|
|`processDefinitionId`|The process definition id of the historic task instance.|
|`processDefinitionName`|The process definition name of the historic task instance.|
|`processDefinitionNameLike`|The process definition name of the historic task instance, which matches the given value.|
|`processBusinessKey`|The process instance business key of the historic task instance.|
|`processBusinessKeyLike`|The process instance business key of the historic task instance that matches the given value.|
|`executionId`|The execution id of the historic task instance.|
|`taskDefinitionKey`|The task definition key for tasks part of a process|
|`taskName`|The task name of the historic task instance.|
|`taskNameLike`|The task name with like operator for the historic task instance.|
|`taskDescription`|The task description of the historic task instance|
|`taskDescriptionLike`|The task description with like operator for the historic task instance.|
|`taskDefinitionKey`|The task identifier from the process definition for the historic task instance.|
|`taskDeleteReason`|The task delete reason of the historic task instance.|
|`taskDeleteReasonLike`|The task delete reason with like operator for the historic task instance.|
|`taskAssignee`|The assignee of the historic task instance.|
|`taskAssigneeLike`|The assignee with like operator for the historic task instance.|
|`taskOwner`|The owner of the historic task instance.|
|`taskOwnerLike`|The owner with like operator for the historic task instance.|
|`taskInvolvedUser`|An involved user of the historic task instance. Where, *InvolvedUser* is the User ID.|
|`taskPriority`|The priority of the historic task instance.|
|`finished`|Indicates if the historic task instance is complete.|
|`processFinished`|Indicates if the process instance of the historic task instance is finished.|
|`parentTaskId`|An optional parent task ID of the historic task instance.|
|`dueDate`|Returns only historic task instances that have a due date equal to this date.|
|`dueDateAfter`|Returns only historic task instances that have a due date after this date.|
|`dueDateBefore`|Returns only historic task instances that have a due date before this date.|
|`withoutDueDate`|Returns only historic task instances that have no due-date. When false value is provided, this parameter is ignored.|
|`taskCompletedOn`|Returns only historic task instances that have been completed on this date.|
|`taskCompletedAfter`|Returns only historic task instances that have been completed after this date.|
|`taskCompletedBefore`|Return only historic task instances that have been completed before this date.|
|`taskCreatedOn`|Returns only historic task instances that were created on this date.|
|`taskCreatedBefore`|Returns only historic task instances that were created before this date.|
|`taskCreatedAfter`|Returns only historic task instances that were created after this date.|
|`includeTaskLocalVariables`|Indicates if the historic task instance local variables should be returned.|
|`includeProcessVariables`|Indicates if the historic task instance global variables should be returned.|
|`tenantId`|Returns historic task instances with the given tenantId.|
|`tenantIdLike`|Returns historic task instances with a tenantId like the given value.|
|`withoutTenantId`|If `true`, only returns historic task instances without a `tenantId` set. If `false`, `withoutTenantId` is ignored.|

### User and Group lists

A common use case is when a user wants to select another user or group, for example, when assigning a task.

To retrieve users:

```bash
GET api/enterprise/users
```

Use the following parameters:

* `filter`: Filters by the user’s first and last name.
* `email`: Retrieves users by email
* `externalId`: Retrieves users by their external ID.
* `externalIdCaseInsensitive`: Retrieves users by external ID, ignoring case.
* `externalId`: Retrieves users by their external ID (set by the LDAP sync, if used)
* `excludeTaskId`: Excludes users that are already part of this task.
* `excludeProcessId`: Excludes users that are already part of this process instance.

**Example response:**

```json
{
    "size": 2,
    "total": 2,
    "start": 0,
    "data": [
        {
            "id": 1,
            "firstName": null,
            "lastName": "Administrator",
            "email": "admin@app.activiti.com"
        },
        {
            "id": 1000,
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@alfresco.com"
        }
    ]
}
```

To retrieve a picture of a user:

```bash
GET api/enterprise/users/{userId}/picture
```

To retrieve groups:

```bash
GET api/enterprise/groups
```

with optional parameter `filter` that filters by group name.

Additional options:

* `externalId`: Retrieves a group by their external ID.
* `externalIdCaseInsensitive`: Retrieves a group by their external ID, ignoring case.

**Example response:**

```json
{
     "size": 2,
     "total": 2,
     "data": [
          {
               "externalId": null,
               "name": "Engineering",
               "id": 2000
          },
          {
               "externalId": null,
               "name": "Marketing",
               "id": 2001
          }
     ],
     "start": 0
}
```

Get the users for a given group:

```bash
GET api/enterprise/groups/{groupId}/users
```

**Example response:**

```json
{
     "size": 3,
     "total": 3,
     "data": [
          {
               "email": "john@alfresco.com",
               "lastName": "Test",
               "firstName": "John",
               "id": 10
          },
          {
               "email": "mary@alfresco.com",
               "lastName": "Test",
               "firstName": "Mary",
               "id": 8
          },
          {
               "email": "patrick@alfresco.com",
               "lastName": "Test",
               "firstName": "Patrick",
               "id": 9
          }
     ],
     "start": 0
}
```

With a json body that contains:

* `order` : An array of user task filter IDs

### Content

Content such as documents and other files can be attached to process instances and tasks.

To retrieve the content attached to a process instance:

```bash
GET api/enterprise/process-instances/{processInstanceId}/content
```

By default, this will return all content: The related content (for example content uploaded via the UI in the "related content" section of the task detail page) and the field content (content uploaded as part of a form).

To only return the related content, add `?isRelatedContent=true` to the url. Similarly, add `?isRelatedContent=false` when the return response should include only field content.

Similarly, for a task:

```bash
GET api/enterprise/tasks/{taskId}/content
```

By default, this will return all content: The related content (for example content uploaded via the UI in the "related content" section of the task detail page) and the field content (content uploaded as part of a form).

To only return the related content, add `?isRelatedContent=true` to the url. Similarly, add `?isRelatedContent=false` when the return response should include only field content.

**Example response:**

```json
{
  "size": 5,
  "total": 5,
  "start": 0,
  "data": [
    {
      "id": 4000,
      "name": "tasks.PNG",
      "created": "2015-01-01T01:01:01.000+0000",
      "createdBy": {
        "id": 1,
        "firstName": "null",
        "lastName": "Admin",
        "email": "admin@app.activiti.com",
        "pictureId": 5
      },
      "relatedContent": true,
      "contentAvailable": true,
      "link": false,
      "mimeType": "image/png",
      "simpleType": "image",
      "previewStatus": "queued",
      "thumbnailStatus": "queued"
    }
        ]
}
```

To get content metadata:

```bash
GET api/enterprise/content/{contentId}
```

To delete content:

```bash
DELETE api/enterprise/content/{contentId}
```

To get the actual bytes for content:

```bash
GET api/enterprise/content/{contentId}/raw
```

To upload content to a process instance:

```bash
POST api/enterprise/process-instances/{processInstanceId}/raw-content
```

where the body contains a *multipart file*. Add the `isRelatedContent` parameter to the url to set whether the content 
is *related* or not. For a process instance, this currently won’t have any influence on what is visible in the UI. Note that the default value for this parameter is `false`.

To upload content to a task:

```bash
POST api/enterprise/tasks/{taskId}/raw-content
```

where the body contains a *multipart file*. Add the `isRelatedContent` parameter to the url to set whether the content is *related* or not. If `true`, the content will show up in the "related content" section of the task details. Note that the default value for this parameter is `false`.

To relate content (eg from Alfresco) to a process instance:

```bash
POST api/enterprise/process-instances/{processInstanceId}/content
```

where the json body contains following properties:

* name
* link (boolean)
* source
* sourceId
* mimeType
* linkUrl

Add the `isRelatedContent` parameter to the url to set whether the content is related or not. If `true`, the content will show up in the "related content" section of the task details. Note that the default value for this parameter is `true` (different from the call above with regular content!).

**Example body (from Alfresco OnPremise):**

```json
{
   "name":"Image.png",
   "link":true,
   "source":"alfresco-1",
   "sourceId":"30358280-88de-436e-9d4d-8baa9dc44f17@swsdp",
   "mimeType":"image/png"
}
```

To upload content for a task:

```bash
POST api/enterprise/process-instances/{taskId}/content
```

Where the json body contains following properties:

* name
* link (boolean)
* source
* sourceId
* mimeType
* linkUrl

In case of a start form with content fields, there is no task or process instance to relate to.

Following REST endpoints can be used:

```bash
POST api/enterprise/content/raw
```

### Thumbnails

To retrieve the thumbnail of a certain piece of content:

```bash
GET api/enterprise/content/{contentId}/rendition/thumbnail
```

### Identity Management

For more info about Identity Management, see [this]({% link process-services/2.0/using/process/index.md %}#identity-management) section.

#### Tenants

Following REST endpoints are **only available for users that are either a tenant admin or a tenant manager**.

Get all tenants (tenant manager only):

```bash
GET api/enterprise/admin/tenants
```

Create a new tenant (tenant manager only):

```bash
POST api/enterprise/admin/tenants
```

the json body of this post contains two properties: `name` and `active` (boolean).

Update a tenant:

```bash
PUT api/enterprise/admin/tenants/{tenantId}
```

the json body of this post contains two properties: `name` and `active` (boolean).

Get tenant details:

```bash
GET api/enterprise/admin/tenants/{tenantId}
```

Delete a tenant:

```bash
DELETE api/enterprise/admin/tenants/{tenantId}
```

Get tenant events:

```bash
GET api/enterprise/admin/tenants/{tenantId}/events
```

Get tenant logo:

```bash
GET api/enterprise/admin/tenants/{tenantId}/logo
```

Change tenant logo:

```bash
POST api/enterprise/admin/tenants/{tenantId}/logo
```

where the body is a multi part file.

>**Note:** The *Create a new tenant* and *Delete a tenant* endpoints are not available where you have installed a *single-tenant* license.

#### Users

Following REST endpoints are **only available for users that are either a tenant admin or a tenant manager**.

Get a list of users:

```bash
GET api/enterprise/admin/users
```

with parameters

* `filter` : Filters by user name.
* `status` : Possible values are `pending`, `inactive`, `active`, `deleted`.
* `sort` : Possible values are `createdAsc`, `createdDesc`, `emailAsc` or `emailDesc` (default `createdAsc`).
* `start` : Used for paging.
* `size` : Use for paging.

To create a new user:

```bash
POST api/enterprise/admin/users
```

with a json body that **must** have following properties:

* email
* firstName
* lastName
* password
* status (possible values are `pending`, `inactive`, `active`, `deleted`)
* type (enterprise or trial. Best to set this to enterprise)
* tenantId

Update user details:

```bash
PUT api/enterprise/admin/users/{userId}
```

with a json body containing `email`, `firstName` and `lastName`

Update user password:

```bash
PUT api/enterprise/admin/users
```

with a json body like

```json
{
        "users" : [1098, 2045, 3049]
        "password" : "123"
}
```

Note that the `users` property is an array of user ids. This allows for bulk changes.

Update user status:

```bash
PUT api/enterprise/admin/users
```

with a json body like

```json
{
        "users" : [1098, 2045, 3049]
        "status" : "inactive"
}
```

Note that the `users` property is an array of user ids. This allows for bulk changes.

Update user tenant id (only possible for _tenant manager):

```bash
PUT api/enterprise/admin/users
```

with a json body like

```json
{
        "users" : [1098, 2045, 3049]
        "tenantId" : 1073
}
```

Note that the `users` property is an array of user ids. This allows for bulk changes.

#### Groups

The following REST endpoints are **only available for users that are either a tenant admin or a tenant manager**.

Internally, there are two types of groups:

* **Functional groups**: Map to organizational units.
* **System groups**: Provide users capabilities. When you assign a capability to a group, every member of that group is assigned with the capability.

Get all groups:

```bash
GET api/enterprise/admin/groups
```

Optional parameters:

* `tenantId` : Useful to a Tenant Manager user
* `functional` (boolean): Only return functional groups if true

Get group details:

```bash
GET api/enterprise/admin/groups/{groupId}
```

**Example response:**

```json
{
     "capabilities": [{
          "name": "access-reports",
          "id": 1
     }],
     "name": "analytics-users",
     "tenantId": 1,
     "users": [
          {
               "tenantId": 1,
               "firstName": null,
               "password": null,
               "type": "enterprise",
               "company": null,
               "externalId": null,
               "capabilities": null,
               "tenantPictureId": null,
               "created": "2015-01-08T08:30:25.164+0000",
               "pictureId": null,
               "latestSyncTimeStamp": null,
               "tenantName": null,
               "lastName": "Administrator",
               "id": 1,
               "lastUpdate": "2015-01-08T08:30:25.164+0000",
               "email": "admin@app.activiti.com",
               "fullname": " Administrator",
               "groups": null
          },
          {
               "tenantId": 1,
               "firstName": "John",
               "password": null,
               "type": "enterprise",
               "company": null,
               "externalId": null,
               "capabilities": null,
               "tenantPictureId": null,
               "created": "2015-01-08T13:22:36.198+0000",
               "pictureId": null,
               "latestSyncTimeStamp": null,
               "tenantName": null,
               "lastName": "Doe",
               "id": 1000,
               "lastUpdate": "2015-01-08T13:34:22.273+0000",
               "email": "johndoe@alfresco.com",
               "fullname": "John Doe",
               "groups": null
          }
     ],
     "id": 1,
     "groups": [],
     "externalId": null,
     "status": "active",
     "lastSyncTimeStamp": null,
     "type": 0,
     "parentGroupId": null
}
```

Use the optional request parameter `includeAllUsers` (boolean value, by default true) to avoid getting all the users at once (not ideal if there are many users).

Use the following call:

```bash
GET api/enterprise/admin/groups/{groupId}/users?page=2&pageSize=20
```

Create new group:

```bash
POST api/enterprise/admin/groups
```

Where the json body contains following properties:

* `name`
* `tenantId`
* type (0 for system group, 1 for functional group)
* `parentGroupId` (only possible for functional groups. System groups can’t be nested)

Update a group:

```bash
PUT api/enterprise/admin/groups/{groupId}
```

Only the `name` property can be in the json body.

Delete a group:

```bash
DELETE api/enterprise/admin/groups/{groupId}
```

Add a user to a group:

```bash
POST api/enterprise/admin/groups/{groupId}/members/{userId}
```

Delete a user from a group:

```bash
DELETE api/enterprise/admin/groups/{groupId}/members/{userId}
```

Get the list of possible capabilities for a system group:

```bash
GET api/enterprise/admin/groups/{groupId}/potential-capabilities
```

Add a capability from previous list to the group:

```bash
POST api/enterprise/admin/groups/{groupId}/capabilities
```

where the json body contains one property `capabilities` that is an array of strings.

Remove a capability from a group:

```bash
DELETE api/enterprise/admin/groups/{groupId}/capabilities/{groupCapabilityId}
```

#### Alfresco Content Services repositories

A tenant administrator can configure one or more Alfresco Content Services repositories to use when working with content. To retrieve the repositories configured for the tenant of the user used to do the request:

```bash
GET api/enterprise/profile/accounts/alfresco
```

which returns something like:

```json
{
     "size": 2,
     "total": 2,
     "data": [
          {
               "name": "TS",
               "tenantId": 1,
               "id": 1,
               "accountUsername": "jbarrez",
               "created": "2015-03-26T14:24:35.506+0000",
               "shareUrl": "http://ts.alfresco.com/share",
               "lastUpdated": "2015-03-26T15:37:21.174+0000",
               "repositoryUrl": "http://ts.alfresco.com/alfresco",
               "alfrescoTenantId": ""
          },
          {
               "name": "TsTest",
               "tenantId": 1,
               "id": 1000,
               "accountUsername": "jbarrez",
               "created": "2015-03-26T15:37:36.448+0000",
               "shareUrl": "http://tstest.alfresco.com/share",
               "lastUpdated": "2015-03-26T15:37:36.448+0000",
               "repositoryUrl": "http://tstest.alfresco.com/alfresco",
               "alfrescoTenantId": ""
          }
     ],
     "start": 0
}
```
