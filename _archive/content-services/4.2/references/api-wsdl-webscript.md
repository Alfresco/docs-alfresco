---
author: Alfresco Documentation
---

# webscript

The `webscript` element in a web descriptor file provides the root XML element. The `webscript` element is required.

The `webscript` element has the following attributes:

-   **`kind` \(optional\)**

    Different kinds of web scripts can be created. When this attribute is specified it allows a web script kind other than the default to be specified. An example kind is `org.alfresco.repository.content.stream`. This kind of web script returns a binary stream from the repository back to the client. This might be useful for returning a thumbnail binary to the client for example. It is also possible to create additional web script kinds according to your needs.


`webscript` element example:

```

**<webscript kind="org.alfresco.repository.content.stream"\>**
  <shortname>Thumbnails</shortname>
  <description>Get a named thumbnail for a content resource</description>
  <url>/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>  
  <url>/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>
  <format default="">argument</format>
  <authentication>guest</authentication>
  <transaction>required</transaction>
</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

