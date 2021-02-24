---
author: Alfresco Documentation
---

# Running the Alfresco OAuth 2 Authorization server

You can run the Alfresco OAuth 2 Authorization server as a Java executable from the command line.

```
java -jar alfresco-oauth2-<version>.war
```

The server provides a health check point to use:

```
$ curl -i -H "Authorization: Bearer <access_token>" http://localhost:9191/management/health
```

Here's the sample response:

```
{"status":"UP"}
```

**Parent topic:**[OAuth 2 SSO overview](../concepts/OAuth-overview.md)

