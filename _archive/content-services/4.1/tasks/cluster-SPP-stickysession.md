---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: clusters
---

# Setting up sticky sessions with SharePoint Protocol Support

This section describes how to configure sticky sessions in a high availability environment with the SharePoint Protocol Support embedded Jetty server.

The SharePoint Protocol Support module uses an embedded jetty server \(running on port 7070\) which receives the client's SharePoint Protocol requests and then communicates with the Alfresco services. When using a clustered environment \(for example, two nodes with shared content\) using a load balancer between the nodes and the clients, you should set sticky sessions for the SharePoint Protocol Support module.

1.  Open the alfresco-global.properties file for each cluster node.

2.  Set the `vti.server.sessionIdManager.workerName` property for the VTI server. For example:

    For Alfresco node 1:

    ```
    vti.server.sessionIdManager.workerName=Alfresco1
    ```

    For Alfresco node 2:

    ```
    vti.server.sessionIdManager.workerName=Alfresco2
    ```

    **Note:** The `workerName` property does not support the character . \(dot\). For example, `vti.server.sessionIdManager.workerName=alfresco.com` is not permitted.

3.  Configure the load balancer stickiness.

    For example, in apache 2.2 using `mod_proxy` and `mod_proxy_balancer`.

    ```
    # map to cluster with session affinity (sticky sessions) 
    ProxyPass /balancer ! 
    ProxyPass / balancer://my_cluster/ stickysession=VTISESSIONID nofailover=On 
    
    <Proxy balancer://my_cluster> 
        BalancerMember http://yourjetty1:7070 route=Alfresco1 
        BalancerMember http://yourjetty2:7070 route=Alfresco2 
    </Proxy>
    ```


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

