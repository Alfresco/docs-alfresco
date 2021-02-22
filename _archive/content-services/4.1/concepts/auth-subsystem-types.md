---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book Wiki
audience: 
category: [Authentication and Security, Authentication, Developer]
keyword: [authentication subsystem types, authentication]
---

# Authentication subsystem types

A number of alternative authentication subsystem types exist for the most commonly used authentication protocols. These are each identified by a unique type name.

The following table shows the authentication subsystem types supplied with Alfresco and the optional features they support.

|Type|Description|Single sign-on \(SSO\) support|CIFS authentication|User registry entry|
|----|-----------|------------------------------|-------------------|-------------------|
|`alfrescoNtlm`|Native Alfresco authentication|Yes, NTLM|Yes|No|
|`ldap`|Authentication and user registry export through the LDAP protocol \(for example, OpenLDAP\)|No|No|Yes|
|`ldap-ad`|Authentication and user registry export from Active Directory through the LDAP protocol|No|No|Yes|
|`passthru`|Authentication through a Windows domain server|Yes, NTLM|Yes|No|
|`kerberos`|Authentication through a Kerberos realm|Yes, SPNEGO|Yes|No|
|`external`|Authentication using an external SSO mechanism|Yes|No|No|

**Important:** If you configure a single authentication subsystem of a type that does not support CIFS authentication \(for example, LDAP\), then the CIFS server will be automatically disabled. If you want CIFS and LDAP, then you must set up an authentication chain.

**Parent topic:**[Authentication subsystems](../concepts/auth-subsystem-intro.md)

