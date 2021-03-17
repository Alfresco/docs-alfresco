---
author: Alfresco Documentation
---

# Component

Component instances describe bindings between a region and a rendering engine that is responsible for generating the component's markup. Typically the rendering engine is the Surf web script engine.

## Locations

-   `classpath:/alfresco/site-data/components`
-   `classpath:/alfresco/web-extension/site-data/components`

## Definition

```

          
<component>
  <!-- Required -->
  <scope>page | template | global</scope>
  <region-id>REGION_ID</region-id>
  <source-id>SOURCE_ID</source-id>

  <!-- Optional -->
  <url>URL</url>
  <component-type-id>COMPONENT_TYPE_ID</component-type-id>
  <chrome>CHROME_ID</chrome>
</component>
          
        
```

## Properties

-   `<id>` - Component IDs follow a convention:
    -   For page and template scoped region bindings the convention is `<scope>.<region-id>.<source-id>`
    -   For bindings to regions in the global scope the convention is `global.<region-id>`
-   `<scope>` - The scope of the binding \(page, template, global\)
-   `<region-id>` - The name of the region that is being bound.
-   `<source-id>` - The ID of the page or template instance to which the component is bound. For the global scope this should be set to `global`.

## Optional properties

-   `<url>` - The web script URL \(if a web script is being rendered\)
-   `<component-type-id>` - The ID of the component type for this component.
-   `<chrome>` - The ID of the Chrome used to frame this component's presentation.

## Example - Page scope binding

This component binds the web script with the URL `/sample/content` to the paged-scoped region named `content` on the page `home`. It therefore has the ID `page.content.home`.

```

    
    classpath:/alfresco/web-extension/site-data/compnents/page.content.home.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>page.content.home</id>
      <scope>page</scope>
      <region-id>content</region-id>
      <source-id>home</source-id>
      <url>/sample/content</url>
    </component>
    
  
```

## Example - Template scope binding

This example binds the web script with the URL `/sample/header` to the template-scoped region named `header` on the `home` template. It therefore has the ID `template.header.home`.

```

    
    classpath:/alfresco/web-extension/site-data/compnents/template.header.home.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>template.header.home</id>
      <scope>template</scope>
      <region-id>header</region-id>
      <source-id>home</source-id>
      <url>/sample/header</url>
    </component>
    
  
```

## Example - Global scope binding

This example binds the web script with the URL `/sample/footer` to the global-scoped region named `footer`. It therefore has the ID `global.footer`.

```

    
    classpath:/alfresco/web-extension/site-data/compnents/global.footer.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>global.footer</id>
      <scope>global</scope>
      <region-id>footer</region-id>
      <source-id>global</source-id>
      <url>/sample/footer</url>
    </component>
    
  
```

## Example - Custom page scope binding

This example binds the web script with the URL `/sample/content` to the page-scoped region named `content` on the page `home`. It informs Surf to wrap the Component with a custom component Chrome when it renders. It also provides a few custom properties that the web script can use while it executes

```

    
    classpath:/alfresco/web-extension/site-data/compnents/page.content.home.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>page.content.home</id>
      <scope>page</scope>
      <region-id>content</region-id>
      <source-id>home</source-id>
      <url>/sample/content</url>
      <chrome>sample-chrome</chrome>
      <properties>
        <view>FULL</view>
        <style>formal</style>
      </properties>
    </component>
    
  
```

**Parent topic:**[Surf object XML quick reference \(siteData\)](../references/surf-object-xml-reference.md)

