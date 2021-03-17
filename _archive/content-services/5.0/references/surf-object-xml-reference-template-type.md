---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Template type

Template types contain information that is common across many template instances of the same type. A template type defines one or more rendering processors. It maye also define properties that all template instances of the given type will receive at render time.

When the framework needs to render a teplate instance, it considers the template type and merges its properties forward. The `uri` of the template instance overrides the `uri` of the template type.

## Locations

-   `classpath:/alfresco/site-data/template-types`
-   `classpath:/alfresco/web-extension/site-data/template-types`

## Definition

```

          
<template-type>
  <!-- Required "view" processor -->
  <processor mode="view">
    <id>PROCESSOR_ID</id>
    
    <!-- Optional Uri -->
    <uri>PROCESSOR_URI</uri>
</template-type>
          
        
```

## Properties

-   `<processor>` - identifies the rendition processor to use. Valid PROCESSOR\_ID values include `freemarker`, `jsp`, and a custom ID. With the FreeMarker processor, PROCESSOR\_URI should identify the path to the FTL file relative to the /templates directory. With the JSP processor, PROCESSOR\_URI should identify the path to the JSP file relative to the web application root.

## Example - FreeMarker template processor

The following file defines a template type that is used by template instances to invoke the FreeMarker processor.

```

          
classpath:/alfresco/web-extension/site-data/template-types/freemarker.xml
            
<?xml version="1.0" encoding="utf-8" ?>
<template-type>
  <id>freemarker</id>
  <title>FreeMarker Template Type</title>
  <processor mode="view">
    <id>freemarker</id>
  </processor>
</template-type>  
          
        
```

**Parent topic:**[Surf object XML quick reference \(siteData\)](../references/surf-object-xml-reference.md)

