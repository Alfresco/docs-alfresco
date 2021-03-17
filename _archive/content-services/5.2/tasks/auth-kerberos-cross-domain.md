---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring cross-domain support for Kerberos

Use this information to configure Kerberos authentication in a multi-domain environment.

Configuring cross-domain support for Kerberos SSO requires two-way trust between the active domains.

1.  Add realm information for the trusted domain into your `krb5.ini` file:

    In the `[realms]` section, where `domain2.local` is the name of your second trusted domain:

    ```
    [realms]
    ...
    DOMAIN2.LOCAL = {     
    kdc = ad2.domain2.local:88     
    admin_server = ad2.domain2.local:749     
    default_domain = domain2.local    
    }
    ```

    and in the `[domain_realm]` section:

    ```
    [domain_realm]    
    ... 
    .domain2.local = DOMAIN2.LOCAL    
    domain2.local = DOMAIN2.LOCAL
    ```

2.  Restart the server.

    When the server has restarted, check that you can access Alfresco Share from both domains.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

