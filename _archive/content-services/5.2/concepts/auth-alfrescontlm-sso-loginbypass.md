---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Share SSO log in bypass

When configuring Share authentication as NTLM SSO, you can bypass the SSO authentication so that it is possible to log in as a different user than the one used in the Windows version.

To log in with another user credential to Share, use:

```
http://localhost:8080/share/page?f=default&pt=login
```

**Parent topic:**[Configuring authentication subsystems](../concepts/auth-config-examples.md)

