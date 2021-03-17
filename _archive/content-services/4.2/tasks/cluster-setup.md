---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting up repository server cluster

This topic describes the steps for setting up a repository cluster.

By default, all Enterprise servers connected to the same database will form a repository cluster.

Follow these steps for each server in the cluster:

1.  Install and configure repository server. See [Installing the Alfresco WAR](alf-war-install.md) for deploying Alfresco \(alfresco.war\). In addition, ensure that:

    -   The content store is available to all members in the cluster. For example, an NFS server mounted locally can be referred to by the `dir.root` property.
    -   Each cluster member must be set up to access the same database, using the same database properties as in alfresco-global.properties.
    -   Deploy a Solr indexing server for use across the cluster and configure the properties of each cluster member to utilize this Solr server.
2.  Ensure that port number 5701 \(the default clustering port\) is accessible on each repository server by all the other repository servers in the cluster.

3.  Specify a wildcard \(for example, `10.50.*.*`\) or exact \(for example, `192.168.1.100`\) IP address of the network interface for clustering to use.

    The advantage of using a wildcard IP address is that the configuration may be used on multiple servers without local changes. The java property name to use is `alfresco.cluster.interface` \(optional\).

4.  Set the following java property to activate Hazelcast’s own JMX reporting \(optional\).

    ```
    hazelcast.jmx=true
    ```

5.  For security reasons, set the cluster password with the following java property:

    ```
    alfresco.hazelcast.password
    ```


**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

