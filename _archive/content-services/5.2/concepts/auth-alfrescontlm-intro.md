---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring alfrescoNtlm

`alfrescoNtlm` is the subsystem configured by default in the Alfresco Content Services authentication chain. It performs authentication based on user and password information stored in the repository. It is capable of supporting both form-based login and NTLM-based Single Sign-On \(SSO\), as well as providing authentication for the CIFS server.

**Note:** The NTLM SSO functions are disabled by default, which means there are no assumptions about the availability of a Windows domain. You can activate SSO with a single property, without any changes to the web.xml file or further file server configuration.

-   **[NTLM subsystem](../concepts/auth-alfrescontlm-ntlm.md)**  
The `alfrescoNtlm` subsystem supports optional NTLM Single Sign-On \(SSO\) functions for WebDAV.
-   **[alfrescoNtlm configuration properties](../concepts/auth-alfrescontlm-props.md)**  
The alfrescoNtlm subsystem supports the following properties.
-   **[Configuring Alfresco Share SSO to use NTLM](../tasks/auth-alfrescontlm-sso.md)**  
Use this information to configure NTLM with Alfresco Share SSO.

**Parent topic:**[Configuring authentication subsystems](../concepts/auth-config-examples.md)

