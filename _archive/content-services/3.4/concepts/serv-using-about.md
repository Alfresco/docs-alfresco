---
author: [Alfresco Documentation, Documentation]
source: Professional Alfresco Book
audience: 
category: [API/Script, Services]
keyword: [remote api, embedded api]
---

# Configuring and extending Alfresco services

Services are core to the Alfresco content application server and are used by all applications working against the server. These applications include the Alfresco Explorer and Alfresco Share clients, Virtual File System interfaces such as CIFS, WebDAV, and APIs.

The APIs fall into two main categories:

-   Embedded APIs are available directly against the server
-   Remote APIs run on a separate tier

You can use these APIs as appropriate to access and extend Alfresco out-of-the-box services.

-   **[Using Embedded APIs](../concepts/serv-api-embedded-about.md)**  
Embedded APIs are used by custom extensions executed directly against the content application server.
-   **[Using Remote APIs](../concepts/serv-api-remote-about.md)**  
 Remote APIs allow clients connecting from a separate tier to communicate with the Alfresco content application server. Remote APIs are based on web services and RESTful and CMIS protocols, and are language agnostic, allowing you to develop against these APIs using a range of languages including Java, PHP, Ruby, and .NET.
-   **[Configuring and extending existing services](../concepts/serv-existing-configuring.md)**  
Alfresco uses the Spring framework to implement a modular architecture, where services are bound together through their interfaces and configured using Spring’s declarative dependency injection. This allows you to configure, extend, and replace existing services, and introduce new services.
-   **[Building Alfresco services](../concepts/serv-building-about.md)**  
Alfresco services are typically built using three tiers: core Java, a public script service, and a RESTful API.
-   **[Alfresco content services](../concepts/serv-about.md)**  
 Services address the core use cases for content management applications including the logical organization of content, file management, version control, and security. Services also support the control of content through workflow and process management, and social and collaborative applications.

**Parent topic:**[Customizing and extending](../concepts/ch-customize.md)

