---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# config

Each component may have a snippet of XML configuration associated with it. The configuration can be any XML content and should be placed within a file named `<yourcomponent>.<method>.config.xml`. This object provides access to either the XML text content \(for script model\) or XML DOM \(for FreeMarker template model\) within the configuration.

For JavaScript access, the most common mechanism to process the XML config is to use the E4X XML DOM object.

For example, given the following XML configuration file `filters.get.config.xml`:

```
<filters>
   <filter id="all" label="All" />
   <filter id="new" label="New" />
   <filter id="drafts" label="Drafts" />
</filters>
```

Would be retrieved via the config .script accessor and processed in JavaScript:

```
var cfg = new XML(config.script);
   for each(var filter in cfg..filter)
   {
      var id = filter.@id.toString();
      var label: filter.@label.toString();
      // do some work with the values
   }
```

Within a FreeMarker template the built-in XML DOM node object can be used. For example:

```
<#list config.script["filters"]["filter"].@id as f>${f}</#list>
```

The application global configuration and scoped configuration can be accessed via the “global” and “scoped” accessors. For example:

```
<#assign helpPages = config.scoped["HelpPages"]["help-pages"]>
<#-- Global flags retrieved from web-framework-config-application -->
<#assign DEBUG=(config.global.flags.childrenMap["client-debug"][0].value = "true")>

```

See the online FreeMarker documentation for more information on XML DOM processing.

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

