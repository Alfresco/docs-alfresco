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

-   **Clustering**

    The MT features have been designed and implemented to work in a clustered configuration.

-   **Cache size**

    If you wish to support a large number of tenants \(for example, greater than 99\), then must review and increase the cache size for all of the tenant caches. The cache sizes are by default configured to 100 \(including the default domain\) in the <configRoot\>/cache-context.xml file. Change the cache size in the ehcache-custom-cluster.xml.sample.cluster file.

    Tenant-based caches currently include:

    -   `webScriptsRegistryCache (RepositoryContainer)`
    -   `prefixesCache (NamespaceDAOImpl)`
    -   `urisCache (NamespaceDAOImpl)`
    -   `compiledModelsCache (DictionaryDAOImpl)`
    -   `uriToModelsCache (DictionaryDAOImpl)`
    -   `messagesCache (MessageServiceImpl)`
    -   `loadedResourceBundlesCache (MessageServiceImpl)`
    -   `resourceBundleBaseNamesCache (MessageServiceImpl)`
-   **Modules**

    Alfresco supports the ability to pre-package AMPs \(Alfresco Module Packages\) into the Alfresco WAR, which are installed into the default domain on start up. In a multi-tenant environment, the module is also installed into each tenant domain when the tenant is created or imported.


**Parent topic:**[Multi-tenancy administration](../concepts/mt-webclient-admin.md)

