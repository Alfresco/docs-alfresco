---
author: Alfresco Documentation
---

# Configuring the OAuth 2 client

To use the OAuth 2 client from your REST applications, you first need to configure it using the information obtained by the OAuth 2 authorization server.

To configure the OAuth 2 client, add the following properties to the activiti-app.properties file:

```
security.oauth2.authentication.enabled=true
security.oauth2.client.clientId=alfresco
security.oauth2.client.clientSecret=secret
security.oauth2.client.checkToken=http://localhost:9191/oauth/check_token
```

|Property|Description|
|--------|-----------|
|`security.oauth2.authentication.enabled`|Enables or disables the OAuth 2 client. To enable the OAuth 2 client, set this property to `true`. To disable it, set this property to `false`.

|
|`security.oauth2.client.clientId`|Specifies the credentials used by the Alfresco Process Services OAuth 2 client to communicate with the OAuth 2 Authorization server.|
|`security.oauth2.client.clientSecret`|Specifies the credentials used by the Alfresco Process Services OAuth 2 client to communicate with the OAuth 2 Authorization server.|
|`security.oauth2.client.checkToken`|Configures the OAuth 2 Authorization to be used. It contains the authorization URL obtained from the Authorization server.|

**Parent topic:**[Configuring OAuth 2 for the Alfresco Process Services](../concepts/config-OAuth.md)

