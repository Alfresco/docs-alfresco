---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM Connector module, Extensions/Third Party]
keyword: [XAM, Connector, Centera, ContentStore]
---

# Setting up the XAMContentStore as the primary store

These steps describe how to set up the XAMContentStore to be the primary store for all content. This setup relates to new content and cannot be done retrospectively, unless all content is moved from the file system to XAM.

1.  Create a bean called `fileContentStore` that uses the XAMContentStore.

2.  Copy the `org_alfresco_module_xamconnector_xamContentStore` bean to a custom context and rename it `fileContentStore`.


**Parent topic:**[Installing and configuring Alfresco XAM Connector](../concepts/xam-intro.md)

