---
author: Alfresco Documentation
---

# Web script description document

A web script description document is an XML file that describes the URI and HTTP method that initiates the web script. For example, the web script is given a short name and description, along with authentication and transactional needs. URI bindings are described as URI templates.

A detailed reference of elements in the web script description document can be found in the [Web Script Description Language Reference](../references/api-wsdl-webscript-descriptor-language-reference.md).

An example of a web script description document follows:

```


<webscript>
  <shortname>Blog Search Sample</shortname>
  <description>Sample that finds all blog entries whose content contains the specified search term</description>
   <url>/sample/blog/search?q={searchTerm}</url>
   <url>/sample/blog/search.atom?q={searchTerm}</url>
   <url>/sample/b/s?q={searchTerm}</url>
   <url>/sample/b/s.atom?q={searchTerm}</url>
   <format default="html">extension</format>
   <authentication>guest</authentication>
   <transaction>required</transaction>
</webscript>

      
```

**Parent topic:**[Web script components](../concepts/ws-components.md)

