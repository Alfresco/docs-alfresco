---
title: Surf JavaScript root objects reference
---

There are a number of root API objects available. Depending on the context of the object being processed (such as a Surf page, 
template, or component), the objects available will differ slightly. For instance, when a page is the current context, 
the `config` object will not be available as there is no configuration at the page level. The context for rendering will 
be one of: the current page, the template for the page, or a component bound within the template.

Following is the complete list of Surf platform root-scope objects.

|Type|Description|
|----|-----------|
|`context`|The request context of the current page. This object is always available.|
|`user`|The current user. This object is always available.|
|`content`|The current content instance. This object is available if the dispatcher is rendering a page for a given content object ID.|
|`page`|Information relating to the current page object. This object is available for pages, templates, and components within a page.|
|`template`|The template for the current page. This object is available for templates and components within the template.|
|`config`|An object representing component level XML configuration.|
|`theme`|The current theme ID string. This object is always available.|
|`instance`|The currently rendering model object (along with rendering context). This object is always available and will be one of a page, template, or component.|
|`sitedata`|Utility for working with the Surf platform object model. This object is always available.|
|`remote`|The Web Script Framework remote helper object. This object is available for Web script components. It provides a simple API for making remote HTTP RESTful calls from web tier JavaScript and retrieving the response content and status code.|
|`locale`|The current locale for the user request thread, as a string in Java Locale format.|
|`htmlid`|The page unique HTML ID string.|
|`url`|URL model for the current page request.|
|`head`|Concatenated component `.head` template output.|
|`app`|Helper object for dealing with the web application's environment.|
|`msg`|FreeMarker method object to resolve internationalization message IDs into label strings.|
