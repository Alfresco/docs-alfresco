---
author: Alfresco Documentation
---

# Deploying a content model

A content model is defined in its entirety as a single XML document that must comply with the content metamodel XSD schema provided by the Alfresco content repository. Each model contains a set of related and coherent definitions and is deployed as a unit.

You can deploy several content models to the content repository. Definitions in one content model can depend on definitions in another content model, allowing for the sharing of definitions.

You can deploy a content model into the content repository using the bootstrap method, which requires a reboot; or the dynamic method, which does not require a reboot. You can also manage models using the Admin Console.

-   **[Deploying a content model: bootstrap approach](../tasks/deploy-bootstrap.md)**  
The bootstrap approach to deploying a content model involves modifying Alfresco content repository XML configuration files to register the content model.
-   **[Deploying a content model: dynamic approach](../tasks/deploy-dynamic.md)**  
When deploying a model, the bootstrap approach places content model XML files into the classpath. The dynamic approach places the files in the content repository itself under Data Dictionary/Models.
-   **[Managing models using the Admin Console \(Enterprise ONLY\)](../tasks/adminconsole-modelconsole.md)**  
Use the Model and Messages Console in the Admin Console to manage models.
-   **[Content models and multi-tenancy](../references/dev-extension-points-content-model-multi-tenancy.md)**  
Dynamic content models are available on a per-tenant basis in an on-premise multi-tenancy installation.

**Parent topic:**[Content Model - Defining and Deploying](../references/dev-extension-points-content-model-define-and-deploy.md)

