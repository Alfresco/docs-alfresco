---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administraton
option: clustering EHcache multicast discovery
---

# Using EHCache multicast discovery

This section describes how to configure cluster discovery to use the EHCache multicast. Use this if you do not wish to use JGroups.

1.  Open the <extension\>/ehcache-custom.xml file.

2.  Replace the `cacheManagerPeerProviderFactory` with the following:

    ```
    <cacheManagerPeerProviderFactory
                class="net.sf.ehcache.distribution.RMICacheManagerPeerProviderFactory"
                properties="peerDiscovery=automatic,
                            multicastGroupAddress=230.0.0.1,
                            multicastGroupPort=4446"/>
    
    ```

    **Note:** You must also set the `alfresco.cluster.name` property in order to activate index tracking.

    **Attention:** If you have several alfresco clusters on the same network, ensure that the addresses and ports used for Ehcache UDP broadcasts \(using the `multicastGroupAddress` and `multicastGroupPort` parameters\) are unique to each cluster. If you use the same parameters for all the clusters, each cluster will try to communicate with the other clusters, leading to potential issues.

    For example, you may have a testing or validation Alfresco cluster environment and a production Alfresco cluster environment on the same network. When you copy or transfer your testing configuration files to the production environment, you must change the parameters.

3.  Save the file.


**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

