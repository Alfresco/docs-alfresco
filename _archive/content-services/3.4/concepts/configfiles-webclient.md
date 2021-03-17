---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: Explorer configuration
---

# Configuration files

The configuration files contain configurations that either augment or replace the standard configuration. The system configuration files are located in <configRoot\>\\classes\\alfresco\\web-client-config-\*

**Replacing a configuration**

To replace the configuration, add a `replace=“true”` attribute to the configuration element. For example: `<config evaluator="xx" condition=“yy” replace=“true”>`

**Attention:** Any configuration within a section marked this way completely replaces any configuration found in the Alfresco-maintained files.

For example, to replace the list of languages shown in the login page, add the following:

```
<config evaluator="string-compare" condition="Languages" replace="true"> 
 <languages> 
    <language locale="fr_FR">French</language> 
    <language locale="de_DE">German</language> 
 </languages> 
</config>
```

**Modifying one property**

The attribute `replace` completely replaces the configuration. To modify one property, you can add the changed piece.

For example, to add another language, you need a single `<language>` item. The other `<language>` items remain enabled. For example, if you want Spanish in addition to English and German:

```
<config evaluator="string-compare" condition="Languages"> 
 <languages> 
   <language locale="es_ES">Spanish</language> 
   ..
 </languages> 
</config>
```

For example configurations, see [Configuring Explorer.](../tasks/webclient-customize.md)

**Parent topic:**[Customizing configuration files](../tasks/config-config.md)

