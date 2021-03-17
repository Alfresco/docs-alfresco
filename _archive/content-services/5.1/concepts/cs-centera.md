---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Alfresco EMC Centera Connector

The Alfresco EMC Centera Connector module provides integration between Alfresco and Content Addressable Storage \(CAS\) systems.

CAS systems store and locate files using addresses based on the file's content, rather than a physical location address. CAS systems are typically used for long-term storage of content that does not require frequent access or where it is stored for regulatory purposes.

When a CAS system stores content, it generates a unique key or hash, which is based on the content. The hash is generated from the content properties, such as the name, date, or content itself.

An example hash might be EQM2GC012MC77e72B24N2MMFU59G418ACSAIE70BAS340TN3E1JJL. This hash is then used as the address of the stored content, and which is then used to retrieve the content. When a request is made to the CAS using this address, it returns the associated content.

The benefits of using CAS systems are:

-   Content can be located easily even in large volumes of data

-   Content integrity: if stored content has been altered then there is a mismatch between the hash passed as the address and hash computed on the fly

-   Avoids redundancy by recognizing that the hash is already present and so does not store it again


For more information on installing and configuring the Alfresco EMC Centera Connector, and setting up `CenteraContentStore` as your main content store, see [Installing and configuring the Alfresco EMC Centera Connector](centera-intro.md).

**Parent topic:**[Content store types](../concepts/cs-types.md)

