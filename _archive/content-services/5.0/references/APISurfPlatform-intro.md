---
author: Alfresco Documentation
---

# Alfresco Surf API reference for web scripts

The Surf API lets you build user interfaces for your web applications using server-side scripts and templates. This is the full list of the objects and methods that compose the Surf API that can be access from web script JavaScript controllers and FreeMarker templates.

-   **[Surf framework](../concepts/APISurf-intro.md)**  
When building new presentation templates or web components, developers can choose to use Alfresco's FreeMarker and JavaScript technologies. These are the default and preferred way to build high performance and lightweight web parts. They are easy to build and require no server restarts.
-   **[Surf root objects](../references/APISurf-rootscoped.md)**  
There are a number of root API objects available. Depending on the context of the object being processed \(such as a page, template, or component\), the objects available will differ slightly. For instance, when a page is the current context, the "config" object will not be available as there is no configuration at the page level. The context for rendering will be one of: the current page, the template for the page, or a component bound within the template.
-   **[Return types](../references/APISurf-returntypes.md)**  
A number of different objects can be returned from the various APIs provided by the root-scoped objects. They include important concepts such as Model Objects, which generically wrap the XML configuration for any Surf object, and Connectors, which enable RESTful style calls to configured remote endpoints.
-   **[Rendering objects](../references/APISurf-renderingobjects.md)**  
There are multiple steps to the Surf page rendering process. At specific stages different objects are in context to scripts and, therefore, different root objects are available to each of those rendering objects.

**Parent topic:**[Presentation-tier web scripts](../concepts/ws-presentation-intro.md)

