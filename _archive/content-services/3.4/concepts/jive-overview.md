---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: 
---

# Alfresco Jive integration overview

Alfresco Enterprise is a content platform that can co-exist with social business systems such as Jive, adding content management and retention capabilities to those systems. The integration brings together the enterprise-class system of record capabilities of Alfresco to a system of engagement through Jive's social capabilities.

The main capabilities of the Jive Toolkit are:

-   Cross-platform publishing: Documents can be created in Alfresco and published to Jive or created in Jive and published to Alfresco. Additionally, within Jive, users can bring in existing Alfresco documents, so users are free to work wherever they choose \(Jive or Alfresco\) while still taking advantage of the strengths of each system.
-   Common user database and taxonomy: By using LDAP, Jive and Alfresco will use a common user store database to ensure that document authors are synced between systems.

The Jive integration with Alfresco consists of a Jive Toolkit, which is a set of pre-built components that enables Jive to store documents in Alfresco, but still offering the same social features as native Jive documents.

When you link a document between Alfresco and Jive, the document is visible and accessible in the Jive UI in exactly the same way as any native document, but the content of the document is stored and managed in Alfresco only.

This also means that all downstream events \(updates, metadata modifications, or deletes, for example\) can be handled in the same way, irrespective of how the content was linked between the two systems.

-   **[Alfresco Jive Toolkit architecture](../concepts/jive-arch.md)**  
This section describes the Alfresco Jive Toolkit architecture.
-   **[Alfresco Jive Toolkit full text indexing](../concepts/jive-FT-indexing.md)**  
Content that is integrated between Alfresco and Jive is fully indexed in both systems.
-   **[Alfresco Jive Toolkit access control and identity](../concepts/jive-access-control.md)**  


**Parent topic:**[Installing and configuring the Alfresco Jive Toolkit](../concepts/jive-intro.md)

