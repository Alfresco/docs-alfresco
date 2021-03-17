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

2.  If NTLM or Kerberos authentication is enabled with SSO, or external authentication is enabled, then Share will use cookie-based sessions and you can configure your load balancer to use sticky routing using the JSESSIONID cookie.

    Depending on whether you want to enable NTLM or Kerberos authentication, or external authentication, perform either of the following two steps:

    -   **To enable NTLM or Kerberos authentication:** Refer to the instructions in [Configuring authentication](../concepts/auth-config-examples.md) to configure alfrescoNtlm, passthru, or Kerberos authentication, and set either `ntlm.authentication.sso.enabled=true` or `kerberos.authentication.sso.enabled=true`.
    -   **To enable external authentication:**Alternatively, if you enable external authentication, Share will still support manual log ins in the absence of any SSO mechanism, but will still use the necessary cookie-based sessions. To enable external authentication, follow the instructions in [Configuring the Share default port](share-change-port.md) and then set the following in alfresco-global.properties:

        ```
        authentication.chain=alfrescoNtlm1:alfrescoNtlm,external1:external
        external.authentication.proxyUserName=
        ```


**Note:** If you are configuring a Share cluster within a load-balancing environment, you must configure Hazelcast between the Share instances in order to provide multicast messaging between the web-tier nodes. For more information, see [Configuring Hazelcast between Share instances](../concepts/hazelcast-cluster-share.md).

**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

**Related information**  


[Configuring the Share default port](share-change-port.md)

