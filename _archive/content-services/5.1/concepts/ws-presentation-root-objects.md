---
author: Alfresco Documentation
---

# Root objects

Web scripts written to run in the presentation tier have access to presentation-tier root objects, not available in the repository context.

When running a web script in the presentation tier, the web script has access to numerous root objects that are only available in the presentation tier. Likewise, some root objects that are available to web scripts when running in the repository tier are not available to web scripts running in the presentation tier. For example, objects associated with core repository concepts, such as nodes, are not directly available to web scripts running in the presentation tier.

**Parent topic:**[Presentation-tier web scripts](../concepts/ws-presentation-intro.md)

[Surf root objects](../references/APISurf-rootscoped.md)

[JavaScript repository root objects](../references/API-JS-rootscoped.md)

[FreeMarker template root objects](../references/API-FreeMarker-defaultmodel.md)

