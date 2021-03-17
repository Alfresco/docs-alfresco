---
author: Alfresco Documentation
---

# shortname

The `shortname` element in a web descriptor file provides a human readable name for the web script. The `shortname` element is required.

The `shortname` element has no attributes.

`shortname` element example:

```

<webscript kind="org.alfresco.repository.content.stream">
  **<shortname\>Thumbnails</shortname\>**
  <description>Get a named thumbnail for a content resource</description>
  <url>/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>  
  <url>/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>
  <format default="">argument</format>
  <authentication>guest</authentication>
  <transaction>required</transaction>
</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

