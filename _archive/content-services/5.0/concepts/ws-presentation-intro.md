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
-   **[Surf Framework Guide](../concepts/surf-fwork-intro.md)**  
Alfresco Surf lets you build user interfaces for web applications using server-side scripts and templates without Java coding, recompilation, or server restarts. Surf follows a content-driven approach, where scripts and templates are simple files on disk so that you can make changes to a live site in a text editor.
-   **[Alfresco Surf API reference for web scripts](../references/APISurfPlatform-intro.md)**  
The Surf API lets you build user interfaces for your web applications using server-side scripts and templates. This is the full list of the objects and methods that compose the Surf API that can be access from web script JavaScript controllers and FreeMarker templates.
-   **[Alfresco Share JavaScript API reference](../references/API-JS-Share-intro.md)**  
Alfresco Share provides an extensive set of JavaScript APIs. This includes both client-side and server-side APIs.
-   **[Surf tutorials](../concepts/surf-tutorials.md)**  
Tutorials demonstrating how to use Surf.

**Parent topic:**[Web scripts](../concepts/ws-webscripts.md)

[Repository-tier web scripts](ws-overview.md)

