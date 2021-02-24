---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: JGroups clusters configuring
---

# Configuring JGroups

This section describes how to initialize clustering with JGroups. The configuration settings for JGroups clustering are set in a file called<configRoot\>/alfresco/jgroups/alfresco-jgroups-XYZ.xml, where XYZ is the name of the protocol being used.

To initialize JGroups clustering, you must set the following property:

```
alfresco.cluster.name=<mycluster>
```

Where `<mycluster>` is the name used by JGroups to distinguish unique inter-server communication. This allows machines to use the same protocol stacks, but to ignore broadcasts from different clusters.

You can also create a cluster from the Java command line option:

```
-Dalfresco.cluster.name=mycluster
```

1.  Open the alfresco-global.properties file.

2.  Set the general properties for the required protocol stack.

    The general properties for both protocol stacks are:

    |General property|Description|
    |----------------|-----------|
    |`alfresco.jgroups.bind_address`|The address to which you bind local sockets.|
    |`alfresco.jgroups.bind_interface`|The interface to which you bind local sockets.|

    The default is UDP and is specified in the system repository.properties file. The JGroups configuration file is built using the protocol string `alfresco.jgroups.defaultProtocol=UDP`.

3.  To select the TCP communication method, add the following property:

    `alfresco.jgroups.defaultProtocol=TCP`

    To select the FILE\_PING communication method, add the following property in the alfresco-global.properties file:

    `alfresco.jgroups.defaultProtocol=TCP-FPING`

4.  Set the property definitions for the chosen stack.

    The protocol stacks can be redefined using any of the standard JGroups transport protocols.

    The properties for the TCP stack are:

    |TCP property|Description|
    |------------|-----------|
    |`alfresco.tcp.start_port`|The port that the server will start listening on. The default is 7800.|
    |`alfresco.tcp.initial_hosts`|A list of hosts and start ports that must be pinged. This can call potential members of the cluster, including the current server and servers that might not be available. The port listed in square brackets is the port to start pinging. The default is `localhost[7800]`.For example: `HOST_A[7800],HOST_B[7800]`

Note that `HOST_A` and `HOST_B` must be IP addresses, rather than host names.

|
    |`alfresco.tcp.port_range`|The number of increments to make to each host's port number during scanning. Each host has a port number in square brackets, for example, 7800. If the host does not respond to the ping message, the port number will be increased and another attempt made.|

    The property for the FILE\_PING stack is:

    |FILE\_PING property|Description|
    |-------------------|-----------|
    |`alfresco.fping.shared.dir`|Specifies the shared directory used by all cluster members to record their membership of the cluster and discover other members of the cluster. The default is $\{dir.contentstore\}.|

    The properties for the UDP stack are:

    |UDP property|Description|
    |------------|-----------|
    |`alfresco.udp.mcast_addr`|The multicast address to broadcast on. The default is 230.0.0.1.|
    |`alfresco.udp.mcast_port`|The port to use for UDP multicast broadcasts. The default is 4446.|
    |`alfresco.udp.ip_ttl`|The multicast "time to live" to control the packet scope. The default is 2.|

5.  \(Optional\) To specify your own JGroups configuration file, add the following properties:

    ```
    alfresco.jgroups.configLocation=classpath:some-classpath.xml
    alfresco.jgroups.configLocation=file:*some-file-path*.xml
    ```

    Where some-file-path is the name of your configuration file.

6.  Save the alfresco-global.properties file.


**Parent topic:**[Initiating clustering](../tasks/jgroups-repo.md)

