---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Overview, Content Modeling, Infrastructure]
keyword: [Infrastructure, deployment]
---

# Deployment options

You can deploy Alfresco in many different forms and topologies. Because its infrastructure foundation protects Alfresco from the environment within which it executes, you can choose components such as operating system, database, application server, web browser, and authentication system. Alfresco is designed to scale down as well as up.

## Embedded Alfresco

An embedded Alfresco is contained directly within a host where the host communicates with Alfresco through its embedded API, meaning the host and Alfresco reside in the same process. Typical hosts include content-rich client applications that require content-oriented storage, retrieval, and services, but can also include hosts such as test harnesses and samples. A client may choose to embed the Alfresco web application framework or content application server, or both, treating Alfresco as a third-party library. In any case, the client can pick and mix the services of Alfresco to embed, allowing very small-footprint versions of Alfresco. The host is responsible for the startup and shutdown of Alfresco.

## Alfresco content application server

An Alfresco content application server is a stand-alone server capable of servicing requests over remote protocols. A single server can support any number of different applications and clients where new applications may be arbitrarily added. Clients communicate with Alfresco through its Remote API and protocol bindings, although you may configure a server to omit or prohibit specific access points. This type of deployment takes advantage of an application server where Alfresco is bundled as a web application. Application server features, such as transaction management and resource pooling, are injected into the Alfresco infrastructure foundation, allowing Alfresco to take advantage of them.

For example, you can embed the Alfresco content application server inside Apache Tomcat for the lightest-weight deployment, as well as inside Java Enterprise Edition–compliant application servers from JBoss, Oracle, or IBM to take advantage of advanced capabilities such as distributed transactions.

## Clustered Alfresco

To support large-scale systems, you can cluster Alfresco. This lets you set up multiple Alfresco servers to work with each other, allowing client requests to be fulfilled across a number of processors. You can cluster both the Alfresco web application framework and content application server, allowing each tier to scale out independently. Each node of a clustered Alfresco content application server shares the same content repository store, although the store itself may be replicated across the nodes, if required. Caches and search indexes are also distributed, meaning that a clustered content application server looks and acts like a single content application server.

Typically, a load balancer is placed in front of the clustered Alfresco content application server to distribute requests across the nodes. This setup also supports Cloud deployments. Alfresco provides images and tools for easily deploying a clustered Alfresco content application server across multiple Amazon EC2 virtual nodes.

## Backup server

This is a special case of the clustered deployment where, in case of failure, an application can switch to a backup version of the deployed stack. Depending upon configuration, the backup version may be available immediately on failure \(known as hot backup\) or shortly after failure, following some configuration changes \(known as warm backup\). One of the nodes in the cluster is designated the master, which supports the live application, while the other node is designated the slave, which keeps itself replicated with the master. The slave remains read-only until the point of switchover.

## Multi-tenancy

Multi-tenancy allows a single Alfresco content application server \(clustered or not\) to support multiple tenants, where a tenant such as a customer, company, or organization believes they are the only user of the server as they connect to a logical partition. Physically, all tenants share the same infrastructure, such as deployed nodes in a cluster and content, repository storage. However, data maintained by one tenant cannot be read or manipulated by another tenant. A deployment of this type eases administration and reduces the cost associated with maintaining many different applications and user bases, in particular when upgrading core services or performing backups, as this only needs to be done once for all tenants.

Alfresco provides administration tools for managing tenants, including the creation of tenants at runtime. In conjunction with clustering, multi-tenancy provides an ideal deployment option for the Cloud.

**Parent topic:**[Architecture](../concepts/alfresco-arch-about.md)

