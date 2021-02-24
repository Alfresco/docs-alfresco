---
author: Alfresco Documentation
---

# Registering with an OAuth 2 Authorization server

When using an OAuth 2 server, you need to register your application with the authorization server.

This will vary from server to server but the server will invariably provide:

-   a client Id to identify your application. This is often a part of the URLs provided by the server.
-   the client secret that must be kept secret.
-   an authorization URL to use in your application.

All these components are used in configuring the OAuth 2 client. For more information, see [Configuring the OAuth 2 module](config-OAuth-client.md).

You may use an OAuth 2 Authorization server of your choice but for applications involving Alfresco Content Services, it is recommended that you use the Alfresco OAuth 2 Authorization server. To know more about installing and configuring the Alfresco OAuth 2 Authorization server, see [Configuring the Alfresco OAuth 2 Authorization server](config-OAuth-server.md).

Note that OAuth 2 is an authorization system and not an identity management system. Although it eliminates the need for custom applications to login via the REST API, it still requires all users to have a profile in Alfresco Process Services with a user name that matches the user name of the OAuth 2 Authorization server. However, there is no need for the passwords to match. Passwords are only useful if you want to allow users to log in to the standard Alfresco Content Services application.

You can use LDAP sync or the Alfresco Content Services Security Extensions to have a single identity service for both the Alfresco Content Services profiles and the OAuth 2 Authorization server.

**Parent topic:**[Configuring OAuth 2 for the Alfresco Process Services](../concepts/config-OAuth.md)

