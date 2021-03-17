---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Scripts, API/Script]
option: [web script components, file names]
---

# Naming conventions

Web script component file names adhere to the naming conventions defined by the Web Script Framework.

## Description documents

Web script description document file names have the following structure:

`<web script id>.<http method>.desc.xml`

-   `<web script id>` identifies the web script and must be unique within a web script package. A web script is uniquely identified by its web script package and web script ID. For example:`/org/example/dir`
-   `<http method>` specifies which HTTP method initiates the web script. Typically, this is GET, but other common methods include POST, PUT, and DELETE. A web script that only queries the Alfresco content repository is bound to the HTTP GET method.
-   All description document file names end with `.desc.xml,` indicating to the Web Script Framework the file is actually a description document that defines a web script. In the XML description document, web script descriptors have a root `<webscript>` element within which everything is defined.

The `<shortname>` and `<description>` elements provide human readable titles for the web script. You can see these in web script documentation and the web script index at: http://localhost:8080/alfresco/service/

## Controller scripts

Controller script file names have the following structure:

`<web script id>.<http method>.js`

-   `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
-   `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
-   All controller script file names end with .js indicating to the Web Script Framework that the file is a controller script.

## Response status code templates

Response status code document file names adhere to a naming convention as defined by the Web Script Framework. The appropriate response status code template is searched for in the following order:

1.  A template located in the same folder as the web script description document for rendering a specific status code response, which adheres to the naming convention `<web script id>.<http method>.<format>.<status code>.ftl`
2.  A template located in the same folder as the web script description document for rendering a response of any status code, which adheres to the naming convention `<web script id>.<http method>.<format>.status.ftl`
3.  A package-level template located in the package of the web script but, if not found, is searched for in the parent package hierarchy, up to the root package for rendering a response of any status code, which adheres to the naming convention `<format>.status.ftl`
4.  A package-level template located in the package of the web script but, if not found, is searched for in the parent package hierarchy, up to the root package for rendering a response of any status code; it adheres to the naming convention: `<format>.status.ftl`
5.  A template located in the root package for rendering an HTML response for the specific status code, which adheres to the naming convention `<status code>.ftl`
6.  A template located in the root package for rendering an HTML response of any status code, which adheres to the naming convention:`status.ftl`

**Parent topic:**[Web Script Framework](../concepts/ws-framework.md)

