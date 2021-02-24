---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting up repository server cluster

Follow these steps to set up a repository cluster.

By default, all Enterprise servers connected to the same database will form a repository cluster.

Follow these steps for each server in the cluster:

1.  Install and configure the repository server. See the install documentation for deploying Alfresco Content Services \(alfresco.war\). In addition, ensure that:

    -   The content store is available to all members in the cluster.
    -   Each cluster member must be set up to access the same database, using the same database properties as in alfresco-global.properties.
    -   Deploy a Solr indexing server for use across the cluster and configure the properties of each cluster member to utilize this Solr server.
2.  Ensure that port number 5701 \(the default clustering port\) is accessible on each repository server by all the other repository servers in the cluster.

3.  Specify a wildcard \(for example, `10.50.*.*`\) or exact \(for example, `192.168.1.100`\) IP address of the network interface for clustering to use.

    The advantage of using a wildcard IP address is that the configuration can be used on multiple servers without local changes. The java property name to use is `alfresco.cluster.interface` \(optional\).

4.  Set the following java property to activate Hazelcast’s own JMX reporting \(optional\).

    ```
    hazelcast.jmx=true
    ```

5.  For security reasons, set the cluster password with the following java property:

    ```
    alfresco.hazelcast.password
    ```

    **Note:** If you are creating three clusters on the same network it is important to ensure they have different passwords to help distinguish them apart.


**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

