---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: authentication subsystem default chain
---

# Default authentication chain

The default product configuration has a simple chain with one member. This is an instance of the `alfrescoNtlm` subsystem type with and ID of `alfrescoNtlm1`.

This is expressed in the built-in defaults in the repository.properties file as:

```
authentication.chain=alfrescoNtlm1:alfrescoNtlm
```

You can configure the properties of `alfrescoNtlm1` using the global properties file.

**Note:** This subsystem instance does not have SSO enabled, by default.

To switch from password-based login to NTLM-based SSO, set the following property in the alfresco-global.properties file.

```
ntlm.authentication.sso.enabled=true
```

This basic use of NTLM requires Alfresco to store its own copies of your MD4 password hash, which means your user ID and password must be the same in both Alfresco and your Windows domain.

For direct authentication with a Windows domain server, without the need to synchronize accounts in Alfresco and the domain, use the pass-through \(`passthru`\) subsystem type.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

