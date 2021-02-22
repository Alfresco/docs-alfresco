---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [alfrescoNtlm, configuration, authentication]
---

# Configuring alfrescoNtlm

`alfrescoNtlm` is the subsystem configured by default in the Alfresco authentication chain. It performs authentication based on user and password information stored in the Alfresco repository. It is capable of supporting both form-based login and NTLM-based Single Sign-On \(SSO\), as well as providing authentication for the CIFS server.

**Note:** The NTLM SSO functions are disabled by default, which means there are no assumptions about the availability of a Windows domain. You can activate SSO with a single property, without any changes to the web.xml file or further file server configuration.

-   **[NTLM](../concepts/auth-alfrescontlm-ntlm.md)**  
The alfrescoNtlm subsystem supports optional NTLM Single Sign-On \(SSO\) functions for WebDAV and the Alfresco Explorer client.
-   **[alfrescoNtlm configuration properties](../concepts/auth-alfrescontlm-props.md)**  
The alfrescoNtlm subsystem supports the following properties.
-   **[Configuring Alfresco Share SSO to use NTLM](../tasks/auth-alfrescontlm-sso.md)**  
This section describes how to configure NTLM with Alfresco Share SSO.
-   **[Share SSO login bypass](../tasks/auth-alfrescontlm-sso-loginbypass.md)**  
When configuring Share authentication as NTLM SSO, you can bypass the SSO authentication so that it is possible to login as a different user than the one used in the Windows version.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

