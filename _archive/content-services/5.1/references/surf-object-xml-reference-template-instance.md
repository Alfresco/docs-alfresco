---
author: Alfresco Documentation
---

# Template instance

Template instances wrap configuration around a template file. The template file receives all the properties of the template instance and can use these properties to inform its rendering logic. This empowers a single template file to render differently based on the configuration stored in the template instance.

For simple cases where the template instance is not required to store additional configuration, it may remain a very lightweight pointer to the template file. For more advanced cases, the template instance may store render-time information concerning how to lay out elements on the page.

## Locations

-   `classpath:/alfresco/site-data/template-instances`
-   `classpath:/alfresco/web-extension/site-data/template-instances`

## Definition

```

          
<template-instance>
  <template-type>TEMPLATE_TYPE_ID</template-type>
</template-instance>
          
        
```

## Properties

-   `<template-type>` - the ID of the template type used to render this template instance. If a template path is provided here, the template type is assumed to be FreeMarker and the path is used for rendering.

## Example - landing template with configuration

```

          
classpath:/alfresco/web-extension/site-data/template-instances/landing1.xml

<?xml version="1.0" encoding="utf-8" ?>
<template-instance>
  <id>landing1</id>
  <template-type>landing</template-type>
  <properties>
    <columns>2</columns>
    <rows>3</rows>
  </properties>
</template-instance>
          
        
```

**Parent topic:**[Surf object XML quick reference \(siteData\)](../references/surf-object-xml-reference.md)

