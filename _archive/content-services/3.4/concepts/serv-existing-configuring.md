---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [API/Script, Services]
option: services
---

# Configuring and extending existing services

Alfresco uses the Spring framework to implement a modular architecture, where services are bound together through their interfaces and configured using Spring’s declarative dependency injection. This allows you to configure, extend, and replace existing services, and introduce new services.

The specific details vary from service to service. For example, you can define new transformers by extending the `baseContentTransformer`. This defines how the new transformer is invoked, the source and target MIME types it supports, and the transformer’s availability. This is done through configuration that extends the existing service. The underlying service itself requires no modification or additional code.

-   **[Extending RuntimeExecutableContentTransformer](../tasks/serv-runtimetransformer-extend.md)**  
This example extends the `RuntimeExecutableContentTransformer` using Spring configuration.

**Parent topic:**[Configuring and extending Alfresco services](../concepts/serv-using-about.md)

