---
author: Alfresco Documentation
---

# Installing and configuring Centera Connector

The Centera Connector module provides integration between Alfresco and Content Addressable Storage \(CAS\) systems.

CAS systems store and locate files using addresses based on the file's content, rather than a physical location address. CAS systems are typically used for long-term storage of content that does not require frequent access or where it is stored for regulatory purposes.

When a CAS system stores content, it generates a unique key or hash, which is based on the content. The hash is generated from the content properties, such as the name, date, or content itself.

An example hash might be `EQM2GC012MC77e72B24N2MMFU59G418ACSAIE70BAS340TN3E1JJL`. This hash is then used as the address of the stored content, and which is then used to retrieve the content. When a request is made to the CAS using this address, it returns the associated content.

The benefits of using CAS systems are:

-   Content can be located easily even in large volumes of data
-   Content integrity: if stored content has been altered then there is a mismatch between the hash passed as the address and hash computed on the fly
-   Avoids redundancy by recognizing that the hash is already present and so does not store it again

The Centera Connector module addresses the Centera store directly through its native API.

The module uses a series of properties to control the way that you access the store. A feature of this module allows you to set retention policies, such as, preventing content from being deleted for a period of time \(for example, retaining invoices for seven years\).

The Centera Connector module can be applied to Alfresco Enterprise 4.1.7 or later.

-   **[Software prerequisites for Centera Connector module](../concepts/centera-required-software.md)**  
The Centera Connector module supports the EMC Centera.
-   **[Setting up the Centera environment on Windows](../tasks/centera-setup-windows.md)**  
Create the environment on Windows for checking the Centera connection.
-   **[Setting up the Centera environment on Linux](../tasks/centera-setup-linux.md)**  
Create the environment on Linux for checking the Centera connection.
-   **[Configuring the Centera connection](../tasks/centera-connection-config.md)**  
You can configure the Centera Connector module to alter the behavior of the connection.
-   **[Installing the Centera Connector module](../tasks/centera-install-amp.md)**  
These steps describe how to install the Centera Connector module to an instance of Alfresco.
-   **[Working with the Centera Connector module](../tasks/centera-connector-module-test.md)**  
Test that the Centera Connector module is working correctly with Alfresco.
-   **[Setting up the CenteraContentStore as the main store](../tasks/centera-contentstore-primary.md)**  
To set up the CenteraContentStore to be the main store, it is recommended that you also configure the primary store as a CachingContentStore.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

