---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring Hazelcast between Share instances using TCP Direct

Although by default Hazelcast uses multicast for discovery, it can also be configured to only use TCP/IP for environments where multicast is not available or preferred. This topic describes how to configure Hazelcast between Share instances using TCP Direct.

As shown in the configuration below, while the `enable` attribute of multicast is set to `false`, tcp-ip has to be set to `true`. For the none-multicast option, all or subset of cluster members' hostnames and/or IP addresses must be listed. Note that all of the cluster members do not have to be listed there but at least one of them has to be active in the cluster when a new member joins.

Follow the steps below to configure Hazelcast for full TCP/IP cluster:

1.  Disable the `multicast` discovery option.

2.  Enable the `tcp-ip` joiner.

3.  Provide a list of cluster members in the `<hz:members>` configuration element.

    ```
    <hz:multicast enabled="false"
        multicast-group="224.2.2.3"
        multicast-port="54327"/>
    <hz:tcp-ip enabled="true">
        <hz:members>10.10.1.2, 10.10.1.3</hz:members>
    </hz:tcp-ip>
    ```

    For more information, see [http://www.hazelcast.org/docs/1.9.4/manual/html/ch13.html](http://www.hazelcast.org/docs/1.9.4/manual/html/ch13.html).


**Parent topic:**[Setting up Share cluster](../concepts/cluster-share.md)

**Related information**  


[Configuring Hazelcast between Share instances using multicast](../concepts/hazelcast-cluster-share.md)

