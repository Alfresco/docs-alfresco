---
author: Alfresco Documentation
---

# Using the OAuth 2 module

After successfully configuring the Alfresco Process Services OAuth 2 module, you can develop, test, and deploy the applications using the Alfresco Process Services REST APIs and OAuth 2.

As a developer, you can integrate the OAuth 2 flow, which starts with getting the authorization token. For browser, mobile, and other UI-based applications, this will usually be done using a login UI interface provided by the service to the user. For communication purpose, the server-side applications will use the client secret.

OAuth 2 caters for four authorization scenarios called *grant types*. These are:

-   **Authorization Code** for applications running on a web server, browser, or mobile app.
-   **Password** for logging in with a user name and password.
-   **Client credentials** for application access by confidential clients.
-   **Implicit** that has been superseded by the Authorization Code scenario with a no secret code.

As a developer, you can choose the scenario that best suits your use case and the specific problem you are trying to solve. This will be a direct call between your code and the authorization server.

After obtaining the token, you integrate it and use it as a part of calling the Alfresco Process Services REST APIs. This is done by adding the token as an Authorization header.

```
Authorization: Bearer <token>
```

For example, to call the rest API for the `app-version`, either use:

```
GET /activiti-app/api/enterprise/app-version HTTP/1.1
Host: activiti.example.com
Authorization: Bearerd1c7dc0b-b1e1-4039-923e-55199473bd5b
```

or use:

```
$  curl -i -H "Authorization: Bearer d1c7dc0b-b1e1-4039-923e-55199473bd5b"
        http://localhost:8080/activiti-app/api/enterprise/app-version
```

When a REST request is made using the OAuth 2 header, Alfresco Process Services acts as the Resource Server of the OAuth 2 specification. Using the OAuth 2 module Alfresco Process Services attempts to validate the token against the OAuth 2 Authorization server. This is done using the URL specified in the `security.oauth2.client.checkToken` property of the activiti-app.properties file.

Here's an example of the HTTP call made by Alfresco Process Services OAuth 2 module to validate the token:

```
POST /introspect HTTP/1.1
Host: ${security.oauth2.client.checkToken}
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW <- base 64 encoding ${security.oauth2.client.clientId}:${security.oauth2.client.clientSecret}

token=CHECK_ACCESS_TOKEN
```

The Authorization server responds with a JSON object as specified in the [Introspection Response of the OAuth 2 specification](https://tools.ietf.org/html/rfc7662#section-2.2). One of the properties of the object is the user name, which matches the user name found in the user database of Alfresco Process Services. This allows the process service to identify which registered user is the one associated to the REST request.

Spring security is used to call the OAuth 2 server and validate the token. Token validation is an area that has been standardised recently. For more information, see [OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662). Commercial OAuth 2 servers or services may not be yet compliant with the standard. For more information, see[http://stackoverflow.com/questions/12296017](http://stackoverflow.com/questions/12296017/how-to-validate-an-oauth-2-0-access-token-for-a-resource-server).

For non-standard validation approaches, you may use `apiSecurityOverride` of the security extensibility provided by Alfresco Process Services and override the `com.activiti.security.oauth2.Oauth2RequestHeaderService` class using `@Component(value = "ActivitiOauth2RequestHeaderService")`.

**Parent topic:**[Configuring OAuth 2 for the Alfresco Process Services](../concepts/config-OAuth.md)

