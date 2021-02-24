---
author: Alfresco Documentation
---

# Alfresco Services

Services are core to the Alfresco content application server and are used by all applications communicating with the server.

There are a wide range of services running on top of the core repository. These services range for core services such as the Document Folder Service, and then higher level services such as the Tagging Service and Site Service.

If required, it is possible to write new services in Java.

-   **[Configuring and extending existing services](../concepts/serv-existing-configuring.md)**  
Alfresco uses the Spring framework to implement a modular architecture, where services are bound together through their interfaces and configured using Spring’s declarative dependency injection. This allows you to configure, extend, and replace existing services, and introduce new services.
-   **[Building Alfresco services](../concepts/serv-building-about.md)**  
Alfresco services are typically built using three tiers: core Java, a public script service, and a RESTful API.
-   **[Alfresco content services](../concepts/serv-about.md)**  
Services address the core use cases for content management applications including the logical organization of content, file management, version control, and security. Services also support the control of content through workflow and process management, and social and collaborative applications.

**Parent topic:**[Architectural Overview](../concepts/dev-arch-overview.md)

