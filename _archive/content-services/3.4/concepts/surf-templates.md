---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
option: Surf templates
---

# Templates and Surf

Templates are transformers that generate markup for the browser to render.

This markup is generally HTML for a website. Templates are applied to the current request context or model. Templates are often files that contain a composite of the output markup and processing tags. The tags execute and generate markup that is injected into the template at the location of the tag. This pattern is common for template types such as FreeMarker, PHP, and XSL.

Surf supports several useful tags out of the box. One commonly used tag is the region tag, which tells the template to look up a component and render its output at the location of the tag.

Here is an example of what a FreeMarker template responsible for rendering a page looks like in Surf:

```
<html>
   <head>
       ${head}
   </head>
   <body>
      <div class=”header”>
         <@region id=”header” />
      </div>
      <div class=”body”>
         <@region id=”body” />
      </div>
   </body>
</html>
```

A Spring project generally maintains these template files as part of its project resources. They can reside under the WEB-INF directory or inside the classpath. Alfresco users can also manage these files inside a content application server.

**Parent topic:**[Presentation content](../concepts/surf-pres-content.md)

