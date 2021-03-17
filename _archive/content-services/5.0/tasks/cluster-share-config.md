---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: clusters
---

# Configuring Share clustering

These steps are required for cluster configuration for Share. If you are using an HTTP load-balancing mechanism in front of a clustered installation, ‘sticky’ routing must be enabled for the HTTP requests made by the Share tier to the repository tier \(the /alfresco application\).

This can be achieved in one of two ways:

1.  Hard-wire each /share instance to its own /alfresco instance, bypassing the load balancer.

    This can be achieved by populating each share-config-custom.xml file with a host name and port number that is not behind your load balancing mechanism.

2.  If NTLM or Kerberos authentication is enabled with SSO, then Share will use cookie-based sessions and you can configure your load balancer to use sticky routing using the JSESSIONID cookie.

    To enable NTLM or Kerberos with SSO, refer to the instructions in [Configuring authentication](../concepts/auth-config-examples.md) to configure alfrescoNtlm, passthru, or Kerberos authentication, and set either `ntlm.authentication.sso.enabled=true` or `kerberos.authentication.sso.enabled=true`\).

    **Note:** If you are configuring a cluster, refer to [Setting up high availability systems](../concepts/ha-intro.md).


**Parent topic:**[Setting up Share cluster](../concepts/cluster-share.md)

**Related information**  


[Configuring the Share default port](share-change-port.md)

