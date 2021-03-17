---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, LDAP, SASL, authentication]
---

# Checking the supported SASL authentication mechanisms

This section describes how to check for which Simple Authentication and Security Layer \(SASL\) authentication mechanisms are supported.

1.  Using an LDAP browser, such as the one from Softerra, check the values of the `supportedSASLMechanisms` attributes on the root node of your LDAP server.

    **Note:** The simple authentication method will not be reported because it is not a SASL mechanism.

2.  If you use OpenLDAP, you can also query using `ldapsearch`. For example:

    ```
    ldapsearch -h localhost -p 389 -x -b "" -s base -LLL supportedSASLMechanisms
    dn:
    supportedSASLMechanisms: DIGEST-MD5
    supportedSASLMechanisms: NTLM
    supportedSASLMechanisms: CRAM-MD5
    ```


**Parent topic:**[Configuring LDAP](../concepts/auth-ldap-intro.md)

