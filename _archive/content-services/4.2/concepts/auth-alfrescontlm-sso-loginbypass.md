---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Share SSO login bypass

When configuring Share authentication as NTLM SSO, you can bypass the SSO authentication so that it is possible to login as a different user than the one used in the Windows version.

To log in with another user credential to Share, use:

```
http://localhost:8080/share/page?f=default&pt=login
```

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

