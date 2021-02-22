---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Template models

A model consists of a number of objects or hierarchy of objects from which a template file retrieves values that can be used to dynamically generate the output. The model is like the API for the template page: it provides the objects from which properties and values can be accessed.

The Alfresco repository provides a “default” model that is always available when rendering templates via the JSF Template component and the template servlet. The web script framework provides additional model objects relevant to processing output for Remote APIs. Programmatically, it is also possible to define a custom model that can be merged into the default model to provide additional model objects. Custom Java objects can be configured via Spring to make them available to template models within the repository and/or the web script framework.

-   **[Default model](../references/APIfreemarker-defaultmodel.md)**  

-   **[TemplateNode Model API](../references/APIfreemarker-TempNodeAPI.md)**  

-   **[Advanced TemplateNode API](../references/APIfreemarker-AdvTempNodeAPI.md)**  

-   **[Version History API](../references/APIfreemarker-versionhistAPI.md)**  

-   **[Classification API](../references/APIfreemarker-classificationAPI.md)**  

-   **[XML Content Processing API](../references/APIfreemarker-XMLcontprocAPI.md)**  

-   **[Workflow API](../references/APIfreemarker-workflowAPI.md)**  


**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/APIfreemarker-intro.md)

