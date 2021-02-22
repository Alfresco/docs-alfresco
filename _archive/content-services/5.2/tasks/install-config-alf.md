---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Installing and configuring Alfresco Content Services Nodes

Use this information to install and configure nodes in a cluster based on the scenario described in Scenario: Clustering for high throughput.

1.  Install the Alfresco Content Services nodes. See [Installing in a distributed environment](../concepts/install-distributedinstance.md) for more information.

2.  Set up multiple Alfresco Content Services instances in a clustered environment. See [Set up clustering](../concepts/ha-intro.md) for more information.

3.  Open the alfresco-global.properties file.

    1.  Set the following repository properties.

        ```
        dir.root=<ALFRESCO_HOME>/alf_data
        dir.remote=/nfs/or/samba/share/common/for/all/nodes
        dir.contentstore=${dir.remote}/contentstore
        dir.contentstore.deleted=${dir.remote}/contentstore.deleted
        dir.cachedcontent=${dir.remote}/cachedcontent
        ```

    2.  Set the following clustering property.

        ```
        alfresco.hazelcast.password=bm0013 (Specifies a password for secutiry reasons (optional)).
        ```

    3.  Set the following search properties.

        ```
        index.subsystem.name=solr
        dir.keystore=${dir.root}/keystore (Specifies the path to keystore file. This is optional, required only if SSL communication is being used.)
        solr.port=80 (Specifies the Solr load balancer port.)
        solr.secureComms=none (for HTTP transport between Alfresco and SOLR), ssl for HTTPS transport
        solr.port.ssl=8443 (Specifies the Solr load balancer ssl port.)
        solr.host=172.31.50.59 (Specifies the Solr load balancer IP address or hostname.)
        ```


**Parent topic:**[Scenario: Clustering for high throughput](../concepts/cluster-scenario-throughput.md)

