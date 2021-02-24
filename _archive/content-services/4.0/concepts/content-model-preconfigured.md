---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content model
---

# Out-of-the-box models

The content repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.

-   **Data Dictionary model**: The base model upon which all other models depend \(located in the file dictionaryModel.xml\), the Data Dictionary model provides definitions for the fundamental data types, such as `d:text` and `d:boolean`. It exposes the namespace URI `www.alfresco.org/model/dictionary/1.0` with prefix `d`.
-   **System model**: The content repository depends on a system model \(located in the file systemModel.xml\) that provides definitions for types used by the implementation of the content repository, such as `sys:base`, `sys:root`, and `sys:reference`. In most cases, it should not be required to refer to definitions in the system model from your own custom models. It exposes the namespace URI www.alfresco.org/model/system/1.0 with prefix `sys`.
-   **ECM domain model**: The ECM domain model \(located in the file contentModel.xml\) provides definitions for types influenced by the CMIS and JCR standards, such as `cm:folder`, `cm:content`, `cm:versionable`, and `cm:auditable`. All Alfresco content application server services, protocols, and clients are focused on these types. It exposes the namespace www.alfresco.org/model/content/1.0 with prefix `cm`.

**Parent topic:**[Content modeling](../concepts/content-modeling-about.md)

