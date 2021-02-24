---
author: Alfresco Documentation
---

# Web scripts

Web scripts provide a way to write small extensions to Alfresco using JavaScript and FreeMarker.

Web scripts can run in the [repository tier](ws-overview.md), or the [presentation tier](ws-presentation-intro.md).

**Important:** For Alfresco One 5.0 and Alfresco Community 5.0 the Rhino JavaScript engine was upgraded to version 1.7R4. This can in certain rare circumstances break existing web script code. This can happen where JavaScript-based web scripts pass a string to the model, prior to it being passed to the FreeMarker template. The string must be fully converted, using the `toString()` method. If you notice that previously working web scripts no longer work, then this possible reason should be investigated.

-   **[Repository-tier web scripts](../concepts/ws-overview.md)**  
Alfresco web scripts provide a unique way to programmatically interact with the Alfresco content application server. Unlike other interfaces exposed by Alfresco, web scripts offer a RESTful API for the content residing in the content repository. The REST \(Representational State Transfer\) web architecture is based on HTTP requests and responses, URIs \(Uniform Resource Identifiers\), and document types.
-   **[Presentation-tier web scripts](../concepts/ws-presentation-intro.md)**  
Web scripts can be written that run in the presentation tier.

**Parent topic:**[Developing Extensions](../concepts/dev-extensions.md)

