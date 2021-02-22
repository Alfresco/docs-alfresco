---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Multi-tenancy administration

When a tenant is created and enabled, the tenant administrator can access the Alfresco administration features, like the Admin Console, or the Share Admin Tools, within the context of their tenant domain.

For example, if a tenant/organization called acme is created, the tenant administrator can log in as admin@acme and create users such as alice@acme, and bob@acme.

The administration features available to the tenant administrator include:

-   Manage system users \(including user Usages and Quotas\)
-   Manage user groups
-   Category management
-   Export and import
-   System information
-   Node browser

For more information on administration, see [Using the Admin Console](at-adminconsole.md) and [Using the Share Admin Tools](admintools.md).

-   **[Multi-tenancy implementation](../concepts/mt-implement.md)**  
To implement multi-tenancy, Alfresco has been logically partitioned such that each tenant has access to their own set of tenant-specific stores. These stores are typically routed to their own physical root directory. This also means that indexes are partitioned, since Alfresco maintains an index per store.

**Parent topic:**[Setting up multi-tenancy](../concepts/mt-intro.md)

