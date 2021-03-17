---
author: Alfresco Documentation
---

# description

The `description` element in a web descriptor file provides documentation for the web script. The `description` element is optional.

The `description` element has no attributes.

`description` element example:

```

<webscript kind="org.alfresco.repository.content.stream">
  <shortname>Thumbnails</shortname>
  **<description\>Get a named thumbnail for a content resource</description\>**
  <url>/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>  
  <url>/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>
  <format default="">argument</format>
  <authentication>guest</authentication>
  <transaction>required</transaction>
</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

