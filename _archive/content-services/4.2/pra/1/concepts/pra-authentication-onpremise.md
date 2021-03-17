---
author: Alfresco Documentation
---

# Authentication for Alfresco on-premise

You use HTTP basic access authentication to provide your username and password to the Alfresco server.

So if you invoke an API method in your client application, you provide an HTTP Authorization header with the username and password combined into a string `"username:password"`. For example if your username is `fred` and your password is `mypassword` the Authorization string is `"fred:mypassword"`. The authorization header must be base-64 encoded.

**Parent topic:**[How does an application do work on behalf of a user?](../../../pra/1/concepts/pra-authentication.md)

