---
author: Alfresco Documentation
---

# Configuring the OAuth 2 client for the APS app

To use the OAuth 2 client for authenticating login to the APS web application, you first need to configure it using the information obtained by the OAuth 2 authorization server.

The following entries show the properties you need to edit in activiti-app.properties and how you might set them for a typical configuration.

```
security.oauth2.authentication.enabled=true
security.oauth2.client.clientId=<client_id>
security.oauth2.client.clientSecret=<secret_key>
security.oauth2.client.userAuthorizationUri=https://github.com/login/oauth/authorize
security.oauth2.client.tokenName=oauth_token
security.oauth2.client.accessTokenUri=https://github.com/login/oauth/access_token
security.oauth2.client.userInfoUri=https://api.github.com/user
```

|Property|Description|
|--------|-----------|
|`security.oauth2.authentication.enabled`|Enables or disables the OAuth 2 client. To enable the OAuth 2 client, set this property to `true`. To disable it, set this property to `false`.

|
|`security.oauth2.client.clientId`|Client ID provided by the OAuth 2 Authorization server.|
|`security.oauth2.client.clientSecret`|Client Secret provided by the OAuth 2 Authorization server.|
|`security.oauth2.client.checkToken`|Configures the OAuth 2 Authorization to be used. Only set this property if you are using an internal authentication server. It contains the authorization URL obtained from the Authorization server. Example: security.oauth2.client.checkToken=http://localhost:9999/oauth/check\_token|
|`security.oauth2.client.userAuthorizationUri`|Implementation of the Authorization endpoint from the OAuth 2 specification. Accepts authorization requests, and handles user approval if the grant type is authorization code.|
|`security.oauth2.client.tokenName`|Name of the token that will be used as parameter in the request.|
|`security.oauth2.client.accessTokenUri`|Endpoint for token requests as described in the OAuth 2 specification. Once login access to the application on the authorisation server has been allowed, the server provides the client \(APS application\) with the access token. This is exchanged with the authorisation server residing on the Uri set within this property.|
|`security.oauth2.client.userInfoUri`|Uri of the user. This is used to retrieve user details from the authorisation server.|

**Note:** The user name used for Process Services application login should also exist on the external authentication server. Note also that the Process Services user name is an email address.

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

