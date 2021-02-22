---
author: Alfresco Documentation
---

# Deployment options

You can deploy Alfresco Content Services in many different forms and topologies. Because its infrastructure foundation protects Alfresco Content Services from the environment within which it executes, you can choose components such as operating system, database, application server, web browser, and authentication system. It's designed to scale down as well as up.

## Embedded Alfresco Content Services

An embedded Alfresco Content Services is contained directly within a host where the host communicates with Alfresco Content Services through its embedded API, meaning the host and Alfresco Content Services reside in the same process. Typical hosts include content-rich client applications that require content-oriented storage, retrieval, and services, but can also include hosts such as test harnesses and samples. A client can choose to embed the web application framework or content application server, or both, treating Alfresco Content Services as a third-party library. In any case, the client can pick and mix the services to embed, allowing very small-footprint versions. The host is responsible for the start up and shutdown of Alfresco Content Services.

## Content application server

An content application server is a stand-alone server capable of servicing requests over remote protocols. A single server can support any number of different applications and clients where new applications can be arbitrarily added. Clients communicate through its Remote API and protocol bindings, although you can configure a server to omit or prohibit specific access points. This type of deployment takes advantage of an application server where Alfresco Content Services is bundled as a web application. Application server features, such as transaction management and resource pooling, are injected into the infrastructure foundation, allowing Alfresco Content Services to take advantage of them.

For example, you can embed the content application server inside Apache Tomcat for the lightest-weight deployment, as well as inside Java Enterprise Edition compliant application servers from JBoss, Oracle, or IBM to take advantage of advanced capabilities such as distributed transactions.

## Clustered

To support large-scale systems, you can cluster Alfresco Content Services. This lets you set up multiple servers to work with each other, allowing client requests to be fulfilled across a number of processors. You can cluster both the web application framework and content application server, allowing each tier to scale out independently. Each node of a clustered content application server shares the same content repository store, although the store itself can be replicated across the nodes, if required. Caches and search indexes are also distributed, meaning that a clustered content application server looks and acts like a single content application server.

Typically, a load balancer is placed in front of the clustered content application server to distribute requests across the nodes. This setup also supports Cloud deployments. Alfresco Content Services provides images and tools for easily deploying a clustered content application server across multiple Amazon EC2 virtual nodes.

## Backup server

This is a special case of the clustered deployment where, in case of failure, an application can switch to a backup version of the deployed stack. Depending upon configuration, the backup version might be available immediately on failure \(known as hot backup\) or shortly after failure, following some configuration changes \(known as warm backup\). One of the nodes in the cluster is designated the master, which supports the live application, while the other node is designated the slave, which keeps itself replicated with the master. The slave remains read-only until the point of switchover.

## Multi-tenancy

Multi-tenancy allows a single content application server \(clustered or not\) to support multiple tenants, where a tenant such as a customer, company, or organization believes they are the only user of the server as they connect to a logical partition. Physically, all tenants share the same infrastructure, such as deployed nodes in a cluster and content, repository storage. However, data maintained by one tenant cannot be read or manipulated by another tenant. A deployment of this type eases administration and reduces the cost associated with maintaining many different applications and user bases, in particular when upgrading core services or performing backups, as this only needs to be done once for all tenants.

Alfresco Content Services provides administration tools for managing tenants, including the creation of tenants at runtime. In conjunction with clustering, multi-tenancy provides an ideal deployment option for the Cloud.

**Parent topic:**[Alfresco Content Services architecture overview](../concepts/alfresco-arch-about.md)

