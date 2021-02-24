---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Index tab

The Index tab defines the Alfresco document type used for released documents, and the mappings between Kofax index fields and Alfresco properties.

![Index tab](../images/rm-AlfRelscript-index.png)

Each row defines the mapping between an Alfresco property and a Kofax indexing field. The **Content Type** and Alfresco Fields values available can be controlled through configuration.

-   **Content Type**

    The Alfresco content type that will be used for documents created by the Release script. It can be a custom content type or content.

-   **Alfresco Fields**

    Use the drop-down list to pick Alfresco properties based on the available types and aspects that will be populated with Kofax Capture index data.

-   **Kofax Fields**

    Use the drop-down list to pick the Kofax Capture field to map to the Alfresco property. The **Text Constant** field can provide a fixed text value for the field.


**Important:** You must define an Alfresco **Name** field and an Alfresco **Content** field, as shown in the previous figure. The **Content** field is used to store the image file, such as Image \(TIF\), PDF, or Text \(OCR\).

**Parent topic:**[Alfresco Kofax Release script configuration tabs](../concepts/kofax-relscript-config.md)

