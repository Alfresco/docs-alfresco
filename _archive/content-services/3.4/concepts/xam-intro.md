---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM, Extensions/Third Party]
keyword: [XAM, CAS, Content Addressable Storage]
---

# Installing and configuring Alfresco XAM Connector

The Alfresco XAM Connector module provides integration between Alfresco and Content Addressable Storage \(CAS\) systems. XAM is a series of APIs developed to interface with different storage vendor's CAS systems.

CAS systems store and locate files using addresses based on the file’s content, rather than a physical location address. CAS systems are typically used for long-term storage of content that does not require frequent access or where it is stored for regulatory purposes.

When a CAS system stores content, it generates a unique key or hash, which is based on the content. The hash is generated from the content properties, such as the name, date, or content itself. An example hash might be `d8668fbab44d88f8601e625fd88dee84`. This hash is then used as the address of the stored content, and which is then used to retrieve the content. When a request is made to the CAS using this address, it returns the associated content.

The benefits of using CAS systems are:

-   Content can be located easily even in large volumes of data
-   Content integrity: if stored content has been altered then there is a mismatch between the hash passed as the address and hash computed on the fly
-   Avoids redundancy by recognizing that the hash is already present and so does not store it again

The Alfresco XAM Connector module integrates Alfresco with a XAM-enabled Content Access Store \(CAS\). Currently, this module supports the EMC Centera store.

The module uses a series of properties to control the way that you access the store, and so on. There is also a feature of this module that allows you to set retention policies, such as, preventing content from being deleted for a period of time \(for example, retaining invoices for seven years\).

The XAM Connector module can be applied to Alfresco Enterprise 3.3.5 or later.

-   **[Software prerequisites for XAM Connector module](../concepts/xam-required-software.md)**  
The Alfresco XAM Connector module supports the EMC Centera.
-   **[Setting up the Centera test environment](../tasks/xam-centera-test.md)**  
These steps describe how to set up the test environment for Centera to integrate with the Alfresco XAM Connector module.
-   **[Configuring the XAM connection](../tasks/xam-connection-config.md)**  
These steps describe how to configure the XAM connection.
-   **[Installing the XAM Connector module](../tasks/xam-install-amp.md)**  
These steps describe how to install the XAM Connector module to an instance of Alfresco.
-   **[Setting up the XAMContentStore as the primary store](../tasks/xam-contentstore-primary.md)**  
These steps describe how to set up the XAMContentStore to be the primary store for all content. This setup relates to new content and cannot be done retrospectively, unless all content is moved from the file system to XAM.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

