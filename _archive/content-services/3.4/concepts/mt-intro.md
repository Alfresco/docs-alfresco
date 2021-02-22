---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: multi-tenancy
---

# Setting up Alfresco multi-tenancy

Alfresco supports a single-instance, single-tenant \(ST\) environment where each tenant \(for example, customer, company, or organization\) runs a single instance that is installed on one server or across a cluster of servers.

Alfresco also supports multi-tenancy \(MT\) features that enable Alfresco to be configured as a true single-instance, multi-tenant environment. Multi-tenancy allows multiple, independent tenants to be hosted on a single instance, which can be installed either on a single server or across a cluster of servers. The Alfresco instance is logically partitioned such that it will appear to each tenant that they are accessing a completely separate instance of Alfresco.

-   **[Enabling multi-tenancy](../tasks/mt-enable.md)**  
You can configure a multi-tenant \(MT\) environment by renaming three sample MT extension files, and then restarting Alfresco.
-   **[Managing tenants](../tasks/mt-config.md)**  
The default Alfresco administrator user has access to the default environment and can be considered to be a "super tenant". The administrator can manage tenants using the Tenant Administration Console.
-   **[Multi-tenancy administration](../concepts/mt-webclient-admin.md)**  
Once a tenant is created and enabled, the tenant administrator can log into Explorer and access the Administration Console within the context of their tenant domain.
-   **[Features not currently supported in a multi-tenant environment](../concepts/mt-not-implemented.md)**  
The following features and components are not supported in a multi-tenant production environment:

**Parent topic:**[Administering](../concepts/ch-administering.md)

