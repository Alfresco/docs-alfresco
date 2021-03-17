---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# NTLM subsystem

The `alfrescoNtlm` subsystem supports optional NTLM Single Sign-On \(SSO\) functions for WebDAV.

**Note:** NTLM v2 is supported, which is more secure that the NTLM v1. If the client does not support NTLMv2, it will automatically downgrade to NTLMv1.

By using NTLM authentication to access Alfresco Content Services WebDAV sites, the web browser can automatically log in.

When SSO is enabled, Internet Explorer will use your Windows login credentials when requested by the web server. Firefox and Mozilla also support the use of NTLM but you need to add the URI to the site that you want to access to `network.automatic-ntlm-auth.trusted-uris` option \(available through writing `about:config` in the URL field\) to allow the browser to use your current credentials for login purposes.

The Opera web browser does not support NTLM authentication. The browser is detected and will be sent to the usual Alfresco Content Services logon page.

In this configuration, Alfresco Content Services must still store its own copy of your MD4 password hash. In order to remove this need and authenticate directly with a Windows domain controller, consider using the pass-through subsystem.

**Parent topic:**[Configuring alfrescoNtlm](../concepts/auth-alfrescontlm-intro.md)

