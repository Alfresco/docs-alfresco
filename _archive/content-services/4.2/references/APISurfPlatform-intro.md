---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Development
option: Surf Platform API
---

# Alfresco Surf Platform API reference

The Surf Platform API lets you build user interfaces for your Web applications using server-side scripts and templates. This is the full list of the objects and methods that compose the Surf Platform API.

-   **[Surf platform](../concepts/APISurf-intro.md)**  
When building new presentation templates or web components, developers may choose to use Alfresco's FreeMarker and JavaScript technologies. These are the default and preferred way to build high performance and lightweight web parts. They are easy to build and require no server restarts.
-   **[Surf root-scoped objects](../references/APISurf-rootscoped.md)**  
There are a number of root-scoped API objects available. Depending on the context of the object being processed \(such as a page, template, or component\), the objects available will differ slightly. For instance, when a page is the current context, the "config" object will not be available as there is no configuration at the page level. The context for rendering will be one of: the current page, the template for the page, or a component bound within the template.
-   **[Return types](../references/APISurf-returntypes.md)**  
A number of different objects can be returned from the various APIs provided by the root-scoped objects. They include important concepts such as Model Objects, which generically wrap the XML configuration for any Surf object, and Connectors, which enable RESTful style calls to configured remote endpoints.
-   **[Rendering objects](../references/APISurf-renderingobjects.md)**  
There are multiple steps to the Surf page rendering process. At specific stages different objects are in context to scripts and, therefore, different root objects are available to each of those rendering objects.

**Parent topic:**[Alfresco API Reference](../concepts/API-intro-4.md)

