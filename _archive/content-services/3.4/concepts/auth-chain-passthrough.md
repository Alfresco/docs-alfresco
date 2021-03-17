---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: authentication subsystem chain pass-through single sign-on NTLM SPNEGO CIFS
---

# Pass-through functions

Pass-through functions cannot be chained and instead pass through to a single member of the chain, which handles them directly.

Examples of pass-through functions are:

-   NTLM / SPNEGO - based Single Sign-On \(SSO\)
-   CIFS Authentication

Such pass-through functions are handled by the first member of the chain that supports that function and has it enabled.

**Note:** This means that only a subset of your user base may be able to use SSO and CIFS.

**Parent topic:**[Authentication chain functions](../concepts/auth-chain-functions.md)

