---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: clusters
---

# Initiating clustering

This topic describes the process of initiating clustering and the options available for configuring Alfresco clustering.

When setting up cluster communications, Alfresco requires servers to discover other instances of Alfresco on a network. In older Alfresco releases, this discovery process used a UDP multicast message \(provided by EHCache\). Servers in the cluster picked up the message and used the information to set up inter-server communication for inter-cache communication. For details, see the [Using EHCache multicast discovery](ehcache-setup.md) topic.

To provide a more flexible cluster discovery process, JGroups is integrated into the repository. JGroups is a toolkit for multicast communication between servers. It allows inter-server communication using a highly configurable transport stack, which includes UDP and TCP protocols. Additionally, JGroups manages the underlying communication channels, and cluster entry and exit.

Alfresco uses JGroups to send the initial broadcast messages announcing a server's availability. After initial setup, it is possible for a server to enter a cluster by setting the `alfresco.cluster.name` property. Follow the steps below to initiate clustering in Alfresco:

1.  Locate the ehcache-custom.xml.sample.cluster file.

2.  Copy the file to <classpathRoot\>/alfresco/extension/ehcache-custom.xml.

3.  Remove the following default definition of `cacheManagerPeerListenerFactory`:

    ```
     <cacheManagerPeerListenerFactory 
                class="net.sf.ehcache.distribution.RMICacheManagerPeerListenerFactory" 
                properties="socketTimeoutMillis=10000" 
                />
    ```

4.  Uncomment the extended definition by removing the comment lines `<!`-- and --`!>` before and after the following section:

    ```
    <cacheManagerPeerListenerFactory 
                class="net.sf.ehcache.distribution.RMICacheManagerPeerListenerFactory" 
                properties="hostName=${alfresco.ehcache.rmi.hostname}, 
                port=${alfresco.ehcache.rmi.port}, 
                
              remoteObjectPort=${alfresco.ehcache.rmi.remoteObjectPort}, 
              socketTimeoutMillis=${alfresco.ehcache.rmi.socketTimeoutMillis}" />
    ```

5.  Save the ehcache-custom.xml file.

6.  Set the following properties in the alfresco-global.properties file:

    |Parameter|Description|
    |---------|-----------|
    |alfresco.cluster.name|Specifies the name of the cluster. This property is mandatory. Without it, neither JGroups nor index tracking will be enabled.|
    |index.recovery.mode|Set this to AUTO to ensure indexes are refreshed properly on startup.|
    |alfresco.ehcache.rmi.hostname|The externally resolvable DNS name or IP address that other cluster members should use to send this one cache invalidation messages. This would normally be the server’s host name. If you use a public IP v4 address, see the section on [Using IP v4 addresses](../concepts/troubleshooting-conf.md).|
    |alfresco.rmi.services.external.host|The externally resolvable DNS name or IP address that external JMX and RMI clients, such as JConsole should use to contact this one. Set this to the same value as alfresco.ehcache.rmi.hostname.|
    |alfresco.ehcache.rmi.port|Specifies the fixed port number to which to bind the ehcache RMI registry.|
    |alfresco.ehcache.rmi.remoteObjectPort|Specifies the fixed port number through which to receive cache invalidation messages.|
    |

    For example:

    ```
    alfresco.cluster.name=cluster1
    alfresco.jgroups.defaultProtocol=TCP
    alfresco.tcp.start_port=7800
    alfresco.tcp.initial_hosts=server1.company.com[7800]
    alfresco.ehcache.rmi.hostname=server2.company.com
    alfresco.rmi.services.external.host=server2.company.com
    alfresco.ehcache.rmi.port=40001
    alfresco.ehcache.rmi.remoteObjectPort=45001 
    ```

    **Note:** You need to set any JGroups properties, especially if the TCP stack is required.

7.  Restart each Alfresco server in the cluster and test that they are communicating using the test described in the [Testing cache clustering](cluster-test.md) topic.

8.  Configure the content stores.


-   **[Configuring JGroups](../tasks/jgroups-config.md)**  
This section describes how to initialize clustering with JGroups. The configuration settings for JGroups clustering are set in a file called<configRoot\>/alfresco/jgroups/alfresco-jgroups-XYZ.xml, where XYZ is the name of the protocol being used.
-   **[Clustering through shared content stores](../tasks/cluster-shared.md)**  
This section describes how to configure clustering through shared content stores.

**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

