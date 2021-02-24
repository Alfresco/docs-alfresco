---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, pass-through, passthru, authentication]
---

# Configuring pass-through

The pass-through \(`passthru`\) subsystem can be used to replace the standard Alfresco user database with a Windows server/domain controller, or list of servers, to authenticate users accessing Alfresco. This saves having to create user accounts within Alfresco.

The subsystem also supports optional NTLM Single Sign-On \(SSO\) functions for WebDav and the Alfresco Explorer and Share clients and direct CIFS authentication for the CIFS server. This method of authentication is much more secure than simple LDAP-based authentication or form-based authentication.

**Note:** Only NTLM v1 is supported in this configuration. As NTLMv2 has been designed to avoid "man-in-the-middle" attacks, it would be impossible to use in this pass through style.

-   **[Pass-through configuration properties](../concepts/auth-passthru-props.md)**  
The `passthru` subsystem supports domain level properties.
-   **[Domain level properties](../concepts/auth-passthru-domainprops.md)**  
The following properties control the set of domain controllers used for authentication. The three properties are mutually exclusive. For example, to set the `passthru.authentication.servers` property, set `passthru.authentication.domain` to be empty and `passthru.authentication.useLocalServer` to be false.
-   **[Other pass-through properties](../concepts/auth-passthru-otherprops.md)**  
The pass-through subsystem supports the following additional properties.
-   **[Domain mappings](../concepts/auth-passthru-domainmap.md)**  
Domain mappings are used to determine the domain a client is a member of when the client does not specify its domain in the login request. If the client uses a numeric IP address to access the web server it will not send the domain in the NTLM request as the browser assumes it is an Internet address.
-   **[Example: customizing the pass-through subsystem](../tasks/auth-example-passthu.md)**  
The authentication capabilities offered by the ldap-ad subsystem type cannot support CIFS and NTLM authentication. Instead, you would have to use form-based login for all users, and only Alfresco internal users could access CIFS. This is the compromise you would have to make if the directory server did not support any other authentication protocol. But for Active Directory, which also supports NTLM and Kerberos authentication, you can overcome this limitation by using either the Pass-through or the Kerberos subsystem types.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

