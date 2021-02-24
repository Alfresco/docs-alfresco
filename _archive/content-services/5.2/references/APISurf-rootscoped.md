---
author: Alfresco Documentation
---

# Surf root objects

There are a number of root API objects available. Depending on the context of the object being processed \(such as a page, template, or component\), the objects available will differ slightly. For instance, when a page is the current context, the "config" object will not be available as there is no configuration at the page level. The context for rendering will be one of: the current page, the template for the page, or a component bound within the template.

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
|`instance`|The currently rendering model object \(along with rendering context\). This object is always available and will be one of a page, template, or component.|
|`sitedata`|Utility for working with the Surf platform object model. This object is always available.|
|`remote`|The Web Script Framework remote helper object. This object is available for Web script components. It provides a simple API for making remote HTTP RESTful calls from web tier JavaScript and retrieving the response content and status code.|
|`locale`|The current locale for the user request thread, as a string in Java Locale format.|
|`htmlid`|The page unique HTML ID string.|
|`url`|URL model for the current page request.|
|`head`|Concatenated component `.head` template output.|
|`app`|Helper object for dealing with the web application's environment.|
|`msg`|FreeMarker method object to resolve internationalization message IDs into label strings.|

-   **[context](../references/APISurf-context.md)**  
 The context object provides a single point of reference for information about the user, the current rendering page, template, and other context. It provides this information so that individual rendering pieces do not need to calculate it themselves.
-   **[user](../references/APISurf-user.md)**  
The user object provides a number of properties describing the user.
-   **[content](../references/APISurf-content.md)**  
The `content` object provides a number of properties that describe a piece of content, such as a document.
-   **[page](../references/APISurf-page.md)**  
The page object provides a number of properties describing a page.
-   **[template](../references/APISurf-template.md)**  
The template object provides a single property.
-   **[config](../references/APISurf-config.md)**  
The configuration object contains component configuration in XML format.
-   **[theme](../references/APISurf-theme.md)**  
The current theme ID string.
-   **[instance](../references/APISurf-instance.md)**  
When rendering a page, the `instance` object will represent the current page model object. When rendering a template, the `instance` object will represent the current template model object. The parent `page` object will also be available as usual if the template is running within the context of a page.
-   **[sitedata](../references/APISurf-sitedata.md)**  
The sitedata object provides information about a site such as its configuration and root page.
-   **[remote](../references/APISurf-Remote-remote.md)**  
The remote object stores details of endpoints.
-   **[locale](../references/APISurf-locale.md)**  
The current locale for the user request thread, as a string in Java Locale format.
-   **[htmlid](../references/APISurf-htmlid.md)**  
`htmlid` is a generated value that is a guaranteed safe and unique string that can be used as an HTML element ID for an element within the current component, template, or page. For example, it could be used as the ID for a DIV element surrounding the component markup, passed in to client-side JavaScript to allow easy dynamic manipulation of the component markup by using Ajax updates or similar.
-   **[url](../references/APISurf-url.md)**  
The `url` object provides the following properties.
-   **[head](../references/APISurf-head.md)**  
The `head` object.
-   **[app](../references/APISurf-App-app.md)**  
The `app` object can be used on both the production and preview tiers to gain access to the correct web application mount points and more.
-   **[msg](../references/APISurf-msg.md)**  
The `msg` object is a FreeMarker method object used for resolving i18n message IDs into label strings. It provides access to the combined i18n label bundle for the application and component.

**Parent topic:**[Spring Surf API](../references/APISurfPlatform-intro.md)

