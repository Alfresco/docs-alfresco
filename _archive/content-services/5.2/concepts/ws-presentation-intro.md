---
author: Alfresco Documentation
---

# Presentation-tier web scripts

Web scripts can be written that run in the presentation tier.

Web scripts can be developed that run in the presentation tier. You could have the repository running on one server \(say at port 8080\) and the presentation tier running on another server \(say on port 8081\). These two tiers can communicate - for example, Share accesses the repository via the Repository REST API. When running a web script in the presentation tier, the web script has access to numerous root objects that are only available in the presentation tier. Likewise, some root objects that are available to web scripts when running in the repository tier are not available to web scripts running in the presentation tier. For example, objects associated with core repository concepts, such as nodes, are not directly available to web scripts running in the presentation tier.

-   **[Web script locations](../concepts/ws-presentation-locations.md)**  
Web scripts need to be located on the application server classpath.
-   **[Root objects](../concepts/ws-presentation-root-objects.md)**  
Web scripts written to run in the presentation tier have access to presentation-tier root objects, not available in the repository context.
-   **[Surf tutorials](../concepts/surf-tutorials.md)**  
Tutorials demonstrating how to use Surf.
-   **[FreeMarker extensibility directives in Web Script templates](../concepts/dev-extensions-share-tutorials-fm-models-about.md)**  
Extensibility directives provide a way of dynamically editing HTML through configuration.

**Parent topic:**[Surf web scripts](../concepts/dev-extensions-share-surf-web-scripts.md)

[Repository-tier web scripts](ws-overview.md)

