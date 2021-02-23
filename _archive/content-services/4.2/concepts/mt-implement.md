---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: multi-tenancy implementation
---

# Multi-tenancy implementation

To implement multi-tenancy, Alfresco has been logically partitioned such that each tenant has access to their own set of tenant-specific stores. These stores are typically routed to their own physical root directory. This also means that indexes are partitioned, since Alfresco maintains an index per store.

All Alfresco-related services are partitioned including node services, security services, workflow services, search and index services, and dictionary services. To support Alfresco Share in a multi-tenant environment, additional partitioned services include site services, activity services, invite services, and AVM services.

The metadata is logically partitioned within the database schema.

Logging enables nested diagnostic context \(NDC\). For a single tenant environment, the log output will show the user name context. For a multi-tenant environment, the log output also shows the tenant context.

-   **Modules**

    Alfresco supports the ability to pre-package AMPs \(Alfresco Module Packages\) into the Alfresco WAR, which are installed into the default domain on start up. In a multi-tenant environment, the module is also installed into each tenant domain when the tenant is created or imported.


**Parent topic:**[Multi-tenancy administration](../concepts/mt-webclient-admin.md)

