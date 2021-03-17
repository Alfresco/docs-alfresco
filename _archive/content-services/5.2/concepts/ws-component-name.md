---
author: Alfresco Documentation
---

# Naming conventions

Web script component file names adhere to the naming conventions defined by the Web Script Framework.

## Description documents

Web script description document file names have the following structure:

`<web script id>.<http method>.desc.xml`

-   `<web script id>` identifies the web script and must be unique within a web script package. A web script is uniquely identified by its web script package and web script ID. For example:`/org/alfresco/tutorials/helloworld`
-   `<http method>` specifies which HTTP method initiates the web script. Typically, this is GET, but other common methods include POST, PUT, and DELETE. A web script that only queries the repository is bound to the HTTP GET method.
-   All description document file names end with `.desc.xml,` indicating to the Web Script Framework the file is actually a description document that defines a web script. In the XML description document, web script descriptors have a root `<webscript>` element within which everything is defined.

The `<shortname>` and `<description>` elements provide human readable titles for the web script. You can see these in web script documentation and the web script index at: http://localhost:8080/alfresco/service/index

## JavaScript based Controllers

Controller script file names have the following structure:

`<web script id>.<http method>[.<format>].js`

-   `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
-   `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
-   `<format>` is an **optional** parameter in the controller name that can be used to specify a format of a POSTed request body. Out-of-the-box the Web Script framework provides the JSON \(format = `json`\), Atom Feed \(format = `atomfeed`\), Atom Entry \(format = `atomentry`\), and Atom \(format = `atom`\) formats. To get access to the POSTed data we can then use the `json`, `feed`, and `entry` JavaScript root objects in the controller. The Atom format provides both `feed` and `entry` root objects in the controller.
-   All controller script file names end with .js indicating to the Web Script Framework that the file is a controller script.

## Java based Controllers

To bind a Spring bean to a Web Script it is only necessary to create a bean with an `id` of the following structure:

`id="webscript.<packageId>.<web script id>.<httpMethod>"`

## FreeMarker Templates - View

Template file names have the following structure:

`<web script id>.<httpMethod>.<format>.ftl`

-   `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
-   `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
-   `<format>` specifies the format of the response template whose value is one of the following:
-   -   **html** =\> text/html
-   **text** =\> text/plain
-   **xml** =\> text/xml
-   **atom** =\> application/atom+xml
-   **atomentry** =\> application/atom+xml;type=entry
-   **atomfeed** =\> application/atom+xml;type=feed
-   **rss** =\> application/rss+xml
-   **json** =\> application/json
-   **opensearchdescription** =\> application/opensearchdescription+xml
-   **mediawiki** =\> text/plain \(Media Wiki markup\)
-   **portlet** =\> text/html \(head & tail chopped\)
-   **fbml** =\> text/html
-   **php** =\> text/html
-   **js** =\> text/javascript
-   **calendar** =\> text/calendar
-   All template file names end with .ftl indicating to the Web Script Framework that the file is a FreeMarker template.
-   Multiple response format files can be used for a Web Script implementation.

## FreeMarker Templates - Response status

Response status code document file names adhere to a naming convention as defined by the Web Script Framework. The appropriate response status code template is searched for in the following order:

1.  A template located in the same folder as the web script description document for rendering a specific status code response, which adheres to the naming convention `<web script id>.<http method>.<format>.<status code>.ftl`
2.  A template located in the same folder as the web script description document for rendering a response of any status code, which adheres to the naming convention `<web script id>.<http method>.<format>.status.ftl`
3.  A package-level template located in the package of the web script but, if not found, is searched for in the parent package hierarchy, up to the root package for rendering a response of any status code, which adheres to the naming convention `<format>.status.ftl`
4.  A template located in the root package for rendering an HTML response for the specific status code, which adheres to the naming convention `<status code>.ftl`
5.  A template located in the root package for rendering an HTML response of any status code, which adheres to the naming convention:`status.ftl`

## Message Bundles

Web Script responses may be localized. Resource file names have the following structure:

`<web script id>.<httpMethod>[_<locale>].properties`

-   `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
-   `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
-   \_<locale\> specifies the what localized bundle the file provides, such as for example French: helloworld.get**\_fr**.properties
-   All message bundle file names end with .properties indicating to the Web Script Framework that the file belongs to a resource bundle.

## Configuration

Configuration is accessed via the `config` root object, which is available during both controller script and template execution. Configuration file names have the following structure:

`<web script id>.<httpMethod>.config.xml`

-   `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
-   `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
-   All configuration file names end with config.xml indicating to the Web Script Framework that the file is a file with external configuration.

**Parent topic:**[Web Script Framework](../concepts/ws-framework.md)

