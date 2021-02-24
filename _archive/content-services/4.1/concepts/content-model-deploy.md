---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: deploy content model
---

# Deploying a content model

A content model is defined in its entirety as a single XML document that must comply with the content metamodel XSD schema provided by the Alfresco content repository. Each model contains a set of related and coherent definitions and is deployed as a unit.

You can deploy several content models to the content repository. Definitions in one content model may depend on definitions in another content model, allowing for the sharing of definitions.

There are two approaches to deploying a content model into the content repository:

1.  **Bootstrap**
2.  **Dynamic**

-   **[Deploying a content model - bootstrap approach](../tasks/deploy-bootstrap.md)**  
The bootstrap approach to deploying a content model involves modifying Alfresco content repository XML configuration files to register the content model.
-   **[Deploying a content model - dynamic approach](../tasks/deploy-dynamic.md)**  
When deploying a model, the bootstrap approach places content model XML files into the classpath. The dynamic approach places the files in the content repository itself under Company Home/Data Dictionary/Models.

**Parent topic:**[Content modeling](../concepts/content-modeling-about.md)

