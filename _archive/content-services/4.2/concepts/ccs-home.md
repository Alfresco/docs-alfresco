---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Caching Content Store \(CCS\)

This section provides an overview on Caching Content Store \(CCS\) and describes how to configure it.

-   **[CachingContentStore class overview](../concepts/ccs-overview.md)**  
The `CachingContentStore` class adds transparent caching to any ContentStore implementation. Wrapping a slow ContentStore in a `CachingContentStore` improves access speed in many use cases. Example use cases include document storage using a XAM appliance or cloud-based storage, such as Amazon's S3.
-   **[CachingContentStore properties](../concepts/ccs-props.md)**  
This topic describes the properties that you can configure for the `CachingContentStore` class.
-   **[Configuring CachingContentStore](../tasks/ccs-config.md)**  
This topic describes how to configure the `CachingContentStore` class.

**Parent topic:**[Content store types](../concepts/cs-types.md)

