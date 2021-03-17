---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [SSO, NTLM, configuration, authentication]
---

# Share SSO login bypass

When configuring Share authentication as NTLM SSO, you can bypass the SSO authentication so that it is possible to login as a different user than the one used in the Windows version.

1.  Enable NTLM SSO.

2.  To login with another user to Share, use: http://localhost:8080/share/page?f=default&pt=login.

3.  To logout from Share back to the NTLM, use: http://localhost:8080/share/logout.


**Parent topic:**[Configuring alfrescoNtlm](../concepts/auth-alfrescontlm-intro.md)

