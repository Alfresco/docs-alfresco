---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [clusters, URL, cache]
---

# Configuring the cache peer URLs

This section describes how to control the cache peer URLs.

If the cache clustering tests fail, enable debug so that you can track the issues. Refer to [Tracking clustering issues](cluster-track-issue.md).

If the cache peer URLs generated do not contain the correct host name or IP address of the sending server, then other machines will not be able to connect back. This occurs when the JVM call to get the current host name produces an incorrect result. That is, a host name that is not recognized in the cluster \(this is typically `localhost`\). This can be resolved at a system level, but can also be changed for the Alfresco cluster.

To change the host name and/or port values that the caches broadcast to the cluster:

1.  Open the ehcache-custom-xml file.

    **Note:** This file is created when initiating the cluster by making a copy of the ehcache-custom.xml.sample.cluster file and calling it ehcache-custom-xml.

2.  Locate the cacheManagerPeerProviderFactory definition.

3.  Comment out the `cacheManagerPeerListenerFactory` definition, and uncomment the second `cacheManagerPeerListenerFactory` definition.

    This extended definition allows additional properties to be set.

4.  Set the additional properties in the alfresco-global.properties file.

    For example, set the host name of the current server using the following property setting:

    ```
    alfresco.ehcache.rmi.hostname=1.2.3.4 
    ```

    This should be set to the IP address that other cluster members should use to communicate with this node.

    The other properties available are:

    -   **remoteObjectPort**

        This is the port number on which the remote nodes registry receive messages. The default is 0 \(zero\) which will select a free port.

    -   **port**

        The port that this node listens on. The default is 0 \(zero\) which will select a free port.

    -   **socketTimeoutMillis**

        The number of ms client sockets will stay open when sending messages to remote nodes. The default is 5 seconds, which should be long enough.

5.  If the debug logging shows that the IP address or host name being sent or received by JGroups is wrong, set the JGroups bind address to the address that other members of the cluster should use to communicate with this node \(`alfresco.jgroups.bind_address`\). Refer to [Configuring JGroups](jgroups-config.md).


**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

