---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Caching content store \(CCS\)

This information provides an overview on Caching content store \(CCS\) and describes how to configure it.

-   **[CachingContentStore class overview](../concepts/ccs-overview.md)**  
The `CachingContentStore` class adds transparent caching to any ContentStore implementation. Wrapping a slow ContentStore in a `CachingContentStore` improves access speed in many use cases. Example use cases include document storage using a XAM appliance or cloud-based storage, such as Amazon's S3.
-   **[CachingContentStore properties](../concepts/ccs-props.md)**  
There are a number of properties that you can configure for the `CachingContentStore` class.
-   **[Configuring CachingContentStore](../tasks/ccs-config.md)**  
You can configure the `CachingContentStore` class.

**Parent topic:**[Content store types](../concepts/cs-types.md)

