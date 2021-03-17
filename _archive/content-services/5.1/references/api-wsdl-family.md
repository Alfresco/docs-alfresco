---
author: Alfresco Documentation
---

# family

The `family` element allows a web script developer to categorize their web scripts. Any value can be assigned to family and any number of families can be assigned to the web script, providing a freeform tagging mechanism. The web script index provides views for navigating web scripts by family. The family tag can be repeated if the script belongs to multiple families. The `family` element is optional.

An example usage of the `family` element follows:

```

<webscript>
  <shortname>Example Family Usage</shortname>
  <url>/family</url>
 **<family\>CMIS</family\>
  <family\>Dashlet</family\>**
</webscript>
        
```

CAUTION:

Do not use '.' in family names. For example, `my.family` would cause an error if using the family name to navigate to the script.

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

