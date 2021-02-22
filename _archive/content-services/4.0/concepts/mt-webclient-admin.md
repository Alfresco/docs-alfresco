---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: multi-tenancy administration
---

# Multi-tenancy administration

Once a tenant is created and enabled, the tenant administrator can log into Explorer and access the Administration Console within the context of their tenant domain.

For example, if a tenant/organization called acme is created, the tenant administrator can log in as admin@acme and create users such as alice@acme, and bob@acme.

The administration features currently available to the tenant administrator include:

-   Manage system users \(including user Usages and Quotas\)
-   Manage user groups
-   Category management
-   Export and import
-   System information
-   Node browser

-   **[Multi-tenancy implementation](../concepts/mt-implement.md)**  
To implement multi-tenancy, Alfresco has been logically partitioned such that each tenant has access to their own set of tenant-specific stores. These stores are typically routed to their own physical root directory. This also means that indexes are partitioned, since Alfresco maintains an index per store.

**Parent topic:**[Setting up Alfresco multi-tenancy](../concepts/mt-intro.md)

