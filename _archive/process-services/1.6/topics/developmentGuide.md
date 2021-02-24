---
author: Alfresco Documentation
---

# Developer guide

This guide describes how to develop extensions and customize Alfresco Process Services.

Before beginning this guide, you should read the *Administration Guide* to make sure you have an understanding of how Alfresco Process Services are installed and configured.

-   **[Alfresco Process Services high-level architecture](../topics/high_level_architecture.md)**  
The following diagram gives a high-level overview of the technical components in Alfresco Process Services.
-   **[Embed Process Services in another application](../topics/embed_process_services.md)**  
The components of the Alfresco Process Services app can be included in an existing or other application by referencing the correct Maven dependencies and adding the necessary Spring configuration beans. To help you get started, an example application has been created, called activiti-app-embedded-example. If you don’t have this example project as part of the Alfresco Process Services download, ask for a copy from your Alfresco account or sales representative.
-   **[Maven modules](../topics/maven_modules.md)**  
When customizing, overriding, or creating new logic in Alfresco Process Services, it is useful to be able to develop against the relevant Maven modules.
-   **[Start and task form customization](../topics/start_and_task_form_customization.md)**  

-   **[Custom form fields](../topics/custom_form_fields.md)**  
Custom form field types can be added through custom *form stencils*. A form stencil is based on the default form stencil and can have default form field types removed, reordered, tweaked \(changing the name, icon, and so on.\) or have new form field types.
-   **[Custom web resources](../topics/custom_web_resources.md)**  
If you want to add additional JavaScript functionality or override CSS rules, you can configure lists of additional web resources that are loaded by the browser for each Alfresco Process Services app. You do this by configuring a new resource in the tomcat/webapps/activiti-app folder.
-   **[Document Templates](../topics/document_templates.md)**  
Use the **Generate Document** task to generate a PDF or Microsoft Word document based on a Word document template \(.docx\). You can insert process variables in the MS Word template that will be replaced with actual values during document transformation.
-   **[Custom Logic](../topics/custom_logic.md)**  

-   **[Custom Data Models](../topics/custom_data_models.md)**  
You can create Custom Data Models that connect to external sources and perform custom data operations when working with entity objects.
-   **[Custom reports](../topics/custom_reports.md)**  

-   **[Cookie configuration](../topics/cookie_configuration.md)**  
Alfresco Process Services uses an HTTP cookie to store a user session. You can use multiple cookies for different browsers and devices. The application uses a database table to store the cookie values \(called *tokens* internally\), to allow a shared persistent session store in a multi-node setup.
-   **[Custom identity synchronization](../topics/custom_identity_synchronization.md)**  
Alfresco Process Services needs user, group, and membership information in its database. The main reason is performance \(for example quick user/group searches\) and data consistency \(for example models are linked to users through foreign keys\). In the Process Services logic, this is typically referred to as Identity Management \(IDM\).
-   **[Security configuration overrides](../topics/security_configuration_overrides.md)**  
Configure security with the `com.activiti.conf.SecurityConfiguration` class. It allows you to switch between database and LDAP/Active Directory authentication out of the box. It also configures REST endpoints under "/app" to be protected using a cookie-based approach with tokens and REST endpoints under "*/api*" to be protected by Basic Auth.
-   **[REST API](../topics/rest_api.md)**  
Alfresco Process Services comes with a REST API. The REST API is an enterprise equivalent of the Open Source REST API, exposing the generic Process Engine operations. It also includes a dedicated set of REST API endpoints for features specific to Alfresco Process Services.

**Parent topic:**[Alfresco Process Services](../concepts/welcome.md)

