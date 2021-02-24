---
author: [Alfresco Documentation, Alfresco Documentation]
source: Community web scripts
audience: 
category: [API/Script, Web Script]
option: [web script, family]
---

# Family

The `family` option allows a web script developer to categorize their web scripts. Any value may be assigned to family and any number of families may be assigned to the web script, providing a freeform tagging mechanism. The web script index provides views for navigating web scripts by family.

An example usage of the `family` option follows:

```
<webscript>
  <shortname>Example Family Usage</shortname>
  <url>/family</url>
 **<family\>CMIS</family\>
  <family\>Dashlet</family\>**
</webscript>
```

**Parent topic:**[Advanced options](../references/api-ws-AdvancedOptions.md)

