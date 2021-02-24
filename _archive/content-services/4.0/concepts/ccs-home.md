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
To demonstrate step-by-step configuration of the `CachingContentStore` class, the spring context file, caching-content-store-context.xml.sample is used as a starting point for adding caching to a content store. Once configured, you can activate the sample file by removing the .sample file extension and placing it in your Alfresco installation extension directory at <ALFRESCO\_HOME\>/tomcat/shared/classes/alfresco/extension.

**Parent topic:**[Managing content stores](../concepts/manage-cs-home.md)

