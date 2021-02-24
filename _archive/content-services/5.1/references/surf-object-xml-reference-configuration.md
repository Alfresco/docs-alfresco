---
author: Alfresco Documentation
---

# Configuration

Configurastion files let your store arbitrary XML descriptions for use in your custom Surf objects. In most cases, the only time you will need to construct one of these objects is when describing site configuration. An example of a site configuration follows.

## Locations

-   `classpath:/alfresco/site-data/configurations`
-   `classpath:/alfresco/web-extension/site-data/configurations`

## Definition

```

        
<configuration>
  <source-id>SOURCE_ID</source-id>
</configuration>
        
      
```

## Properties

-   `<source-id>` - Tags the configuration as pertaining to an arbitrary ID. Surf will automatically look for configuration where `source-id` is `site`.

## Example - Site configuration

The following file defines the Surf site configuration. It describes a Configuration object that is bound to the site source ID.

```

        
classpath:/alfresco/web-extension/site-data/configurations/default.site.configuration.xml

<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <title>My Web Site</title>
  <source-id>site</source-id>
  <properties>
    <root-page>welcome</root-page>
  </properties>
</component>
        
      
```

**Parent topic:**[Surf object XML quick reference \(siteData\)](../references/surf-object-xml-reference.md)

