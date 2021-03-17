---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Authentication for Alfresco Cloud

You can register your application with Alfresco to use our authentication.

An Alfresco application uses the [OAuth 2.0 authorization code flow](http://tools.ietf.org/html/draft-ietf-oauth-v2-31) to authenticate itself with Alfresco Cloud and to allow users to authorize the application to access data on their behalf.

You first register your application on the [Alfresco Developer site](https://developer.alfresco.com). You provide a callback URI, and a scope. Registration will provide you with an API key and a key secret which are required by your application to authorize itself. When a user runs your application, the application requests an authorization code from Alfresco using its API key, key secret, callback URI and scope. Alfresco will inform the user that your application wishes to access resources, and asks the user to grant or deny access.

If the user grants access, Alfresco returns an authorization code to the application. Your application then exchanges the authorization code for an access token. Your application can then call the Alfresco CMIS API and the Alfresco REST API with the access token.

-   **[Registering your application](../../../pra/1/concepts/pra-registration.md)**  
To use the Alfresco REST API, your application must first be registered with the Alfresco Developer Portal.
-   **[Authorization](../../../pra/1/concepts/pra-authorize.md)**  
Your application uses the information registered with Alfresco to request authorization from the user.
-   **[Refreshing an access token](../../../pra/1/concepts/pra-refresh-token.md)**  
After one hour, your application's access token becomes invalid. You can use the refresh token to request a new access token without having to re-authenticate with the user. The refresh token is valid for 28 days or until a new access token is requested.

**Parent topic:**[How does an application do work on behalf of a user?](../../../pra/1/concepts/pra-authentication.md)

