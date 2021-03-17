---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
---

# Setting up multi-tenancy

Alfresco supports a single-instance, single-tenant \(ST\) environment where each tenant \(for example, customer, company, or organization\) runs a single instance that is installed on one server or across a cluster of servers.

Alfresco also supports multi-tenancy \(MT\) features that enable Alfresco to be configured as a true single-instance, multi-tenant environment. Multi-tenancy allows multiple, independent tenants to be hosted on a single instance, which can be installed either on a single server or across a cluster of servers. The Alfresco instance is logically partitioned such that it will appear to each tenant that they are accessing a completely separate instance of Alfresco.

-   **[Enabling multi-tenancy](../concepts/mt-enable.md)**  
In Alfresco, the multi-tenancy feature is pre-configured out-of-the-box, although it is not enabled by default.
-   **[Managing tenants](../tasks/mt-config.md)**  
The default Alfresco administrator user has access to the default environment and can be considered to be a "super tenant". Use the Tenant Console in the Admin Console to manage tenants.
-   **[Multi-tenancy administration](../concepts/mt-webclient-admin.md)**  
When a tenant is created and enabled, the tenant administrator can access the Alfresco administration features, like the Admin Console, or the Share Admin Tools, within the context of their tenant domain.
-   **[Features not supported in a multi-tenant environment](../concepts/mt-not-implemented.md)**  
There are some features and components that are not supported in a multi-tenant production environment.

**Parent topic:**[Administering](../concepts/ch-administering.md)

